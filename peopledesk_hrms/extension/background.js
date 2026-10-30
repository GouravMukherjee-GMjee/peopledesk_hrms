/* PeopleDesk Attendance: service worker.
   Keeps today's attendance, repaints the toolbar badge once a minute and shows reminders.
   All times are worked out here from the clock-in and expected logout, so the badge keeps counting down even when
   PeopleDesk is closed. It stores attendance only. */
importScripts('shared/ext-core.js');
const E = self.PDExt;
const VERSION = chrome.runtime.getManifest().version;
const store = {
  get: k => chrome.storage.local.get(k),
  set: o => chrome.storage.local.set(o)
};

/* ---------- what we keep ---------- */
const SRC = ['app', 'bio', 'web'];
const okDate = v =>
  typeof v === 'string' && !isNaN(Date.parse(v)) ? new Date(v).toISOString() : '';
const flags = (o, keys) =>
  Object.fromEntries(keys.map(k => [k, o && o[k] === 0 ? 0 : o && o[k] ? 1 : 0]));
/* the page is untrusted input: keep only known fields, with known types */
function clean(p) {
  if (!p || typeof p !== 'object' || p.v !== 1) return null;
  const s = {
    v: 1,
    name: String(p.name || '').slice(0, 80),
    updatedAt: new Date().toISOString(),
    enabled: !!p.enabled,
    reason: p.reason === 'admin' || p.reason === 'user' ? p.reason : '',
    fields: flags(
      p.fields,
      E.FIELDS.map(f => f[0])
    ),
    reminders: flags(p.reminders, ['in', ...E.REMINDERS.map(r => r[0])]),
    badge: p.badge === 0 ? 0 : 1,
    pausedUntil: okDate(p.pausedUntil)
  };
  if (s.enabled && okDate(p.clockIn) && okDate(p.expectedOut)) {
    s.clockIn = okDate(p.clockIn);
    s.clockOut = okDate(p.clockOut);
    s.expectedOut = okDate(p.expectedOut);
    s.source = SRC.includes(p.source) ? p.source : '';
    s.onBreak = !!p.onBreak;
    s.otFrom = okDate(p.otFrom);
  }
  return s;
}
async function state() {
  const d = await store.get(['snap', 'hidden', 'fired', 'origin', 'connected']);
  return d;
}
const withHidden = d => (d.snap ? Object.assign({}, d.snap, { hiddenDate: d.hidden || '' }) : null);

/* ---------- the toolbar icon: the app icon plus a small status shape, so colour is never the only signal ---------- */
function drawIcon(size, m) {
  const c = new OffscreenCanvas(size, size),
    x = c.getContext('2d'),
    r = size * 0.22;
  x.fillStyle = '#3969d0';
  x.beginPath();
  x.roundRect(0, 0, size, size, r);
  x.fill();
  x.strokeStyle = '#fff';
  x.lineWidth = size * 0.09;
  x.lineCap = 'round';
  x.beginPath();
  x.arc(size / 2, size / 2, size * 0.28, 0, Math.PI * 2);
  x.moveTo(size / 2, size * 0.36);
  x.lineTo(size / 2, size / 2);
  x.lineTo(size * 0.6, size * 0.56);
  x.stroke();
  const sh = {
    ok: 'check',
    warn: 'bang',
    info: 'check',
    over: 'plus',
    mute:
      m.key === 'notin'
        ? 'ring'
        : m.key === 'offline'
          ? 'slash'
          : m.key === 'paused'
            ? 'pause'
            : 'dash'
  }[m.tone];
  if (m.key !== 'loading' && m.key !== 'empty') {
    const d = size * 0.5,
      cx = size - d / 2,
      cy = size - d / 2;
    x.fillStyle = m.badge.bg;
    x.beginPath();
    x.arc(cx, cy, d / 2, 0, Math.PI * 2);
    x.fill();
    x.strokeStyle = x.fillStyle = m.badge.fg;
    x.lineWidth = Math.max(1.4, size * 0.07);
    x.beginPath();
    const u = d * 0.2;
    if (sh === 'check')
      (x.moveTo(cx - u, cy), x.lineTo(cx - u * 0.2, cy + u * 0.8), x.lineTo(cx + u, cy - u * 0.7));
    else if (sh === 'bang')
      (x.moveTo(cx, cy - u),
        x.lineTo(cx, cy + u * 0.2),
        x.moveTo(cx, cy + u * 0.8),
        x.lineTo(cx, cy + u * 0.8));
    else if (sh === 'plus')
      (x.moveTo(cx - u, cy), x.lineTo(cx + u, cy), x.moveTo(cx, cy - u), x.lineTo(cx, cy + u));
    else if (sh === 'pause')
      (x.moveTo(cx - u * 0.5, cy - u),
        x.lineTo(cx - u * 0.5, cy + u),
        x.moveTo(cx + u * 0.5, cy - u),
        x.lineTo(cx + u * 0.5, cy + u));
    else if (sh === 'slash') (x.moveTo(cx - u, cy + u), x.lineTo(cx + u, cy - u));
    else if (sh === 'ring') x.arc(cx, cy, u, 0, Math.PI * 2);
    else (x.moveTo(cx - u, cy), x.lineTo(cx + u, cy));
    x.stroke();
  }
  return x.getImageData(0, 0, size, size);
}

/* ---------- repaint: badge, tooltip, icon and any reminder that is due ---------- */
async function refresh() {
  const d = await state(),
    now = new Date(),
    snap = withHidden(d),
    m = E.model(d.connected ? snap : null, now);
  const showText = !snap || snap.badge !== 0;
  await chrome.action.setBadgeText({ text: showText && m.badge.text ? m.badge.text : '' });
  await chrome.action.setBadgeBackgroundColor({ color: m.badge.bg });
  if (chrome.action.setBadgeTextColor) await chrome.action.setBadgeTextColor({ color: m.badge.fg });
  await chrome.action.setTitle({ title: m.tip });
  try {
    await chrome.action.setIcon({ imageData: { 16: drawIcon(16, m), 32: drawIcon(32, m) } });
  } catch (e) {
    /* OffscreenCanvas is missing in very old browsers: the badge text still works */
  }
  if (!d.connected) return;
  const day = E.dayKey(now),
    fired = (d.fired || []).filter(id => id.startsWith(day)),
    due = E.notifsDue(snap, now, fired);
  for (const n of due) {
    fired.push(n.id);
    chrome.notifications.create(n.id, {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: n.title,
      message: n.message,
      priority: 0,
      silent: false
    });
  }
  if (due.length || fired.length !== (d.fired || []).length) await store.set({ fired });
}

/* ---------- messages from the page (through the content script) and from the popup ---------- */
async function onPage(msg, sender) {
  const d = await state(),
    origin = sender.origin || new URL(sender.url).origin;
  const hello = type => ({
    type,
    version: VERSION,
    connected: !!d.connected && d.origin === origin
  });
  if (msg.type === 'ping') return hello('hello');
  if (msg.type === 'connect') {
    const h = String((msg.payload && msg.payload.hrms) || '');
    await store.set({ connected: true, origin, hrms: h.startsWith(origin) ? h : origin });
    await refresh();
    return hello('connected');
  }
  if (!d.connected || d.origin !== origin) return hello('status');
  if (msg.type === 'snapshot') {
    const s = clean(msg.payload);
    if (s) await store.set({ snap: s });
    await refresh();
    return hello('status');
  }
  if (msg.type === 'signout') {
    await chrome.storage.local.clear();
    await refresh();
    return { type: 'signedout', version: VERSION, connected: false };
  }
}
async function onPopup(msg) {
  const d = await state();
  if (msg.type === 'get')
    return { snap: d.connected ? withHidden(d) || null : null, hrms: d.hrms || d.origin || '' };
  if (msg.type === 'hide' || msg.type === 'unhide') {
    await store.set({ hidden: msg.type === 'hide' ? E.dayKey(new Date()) : '' });
    await refresh();
    return { ok: 1 };
  }
  if (msg.type === 'retry') {
    await refresh();
    return { ok: 1 };
  }
}
chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (sender.id !== chrome.runtime.id || !msg || typeof msg.type !== 'string') return;
  /* our own pages (the popup) are told apart by address, a content script by being inside a web page */
  const own = (sender.url || '').startsWith(chrome.runtime.getURL(''));
  (own ? onPopup : onPage)(msg, sender).then(reply, () => reply(null));
  return true;
});

/* ---------- once a minute ---------- */
const arm = () => chrome.alarms.create('tick', { periodInMinutes: 1 });
chrome.runtime.onInstalled.addListener(() => (arm(), refresh()));
chrome.runtime.onStartup.addListener(() => (arm(), refresh()));
chrome.alarms.onAlarm.addListener(a => a.name === 'tick' && refresh());
chrome.notifications.onClicked.addListener(async id => {
  const d = await state();
  if (d.hrms) chrome.tabs.create({ url: d.hrms });
  chrome.notifications.clear(id);
});
refresh();
