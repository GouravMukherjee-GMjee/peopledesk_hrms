/* =====================================================================
   Browser extension widget: policy, personal choice, snapshot and the bridge to the extension
   Effective setting = the role policy allows it AND the person has opted in.
   The extension shows attendance only (clock-in, expected logout, time left). It reads nothing else.
   Needs ext-core.js (PDExt) and runs after saved-state.js. Screens: settings/ext-admin.js,
   profile/ext-prefs.js, ext/ext-setup.js.
   ===================================================================== */
const EXT_STORE = {
  chrome: 'https://chromewebstore.google.com/search/PeopleDesk%20Attendance',
  edge: 'https://microsoftedge.microsoft.com/addons/search/PeopleDesk%20Attendance'
};
const EXT_ASKS = 3; // how many times "Maybe later" brings the prompt back
const extAllOn = keys => Object.fromEntries(keys.map(k => [k, 1]));
const extRolePol = avail => ({
  avail,
  fields: extAllOn(PDExt.FIELDS.map(f => f[0])),
  reminders: extAllOn(PDExt.REMINDERS.map(r => r[0]))
});
function extDefaults() {
  return {
    master: 1,
    roles: {
      employee: extRolePol('optin'),
      manager: extRolePol('optin'),
      hr: extRolePol('optin'),
      admin: extRolePol('optin'),
      sysadmin: extRolePol('off')
    },
    meta: { by: 'System defaults', at: '' }
  };
}
S.ext = extDefaults();
S.extUser = {};
S.extLink = { installed: false, connected: false, version: '', seenAt: 0 };

/* ---------- policy and personal choice ---------- */
const extPol = role => {
  const r = S.ext.roles[role] || (S.ext.roles[role] = extRolePol('off'));
  return r;
};
function extUser(id) {
  id = id || me().id;
  const u =
    S.extUser[id] ||
    (S.extUser[id] = {
      optIn: null, // null = never chosen, so the role default applies
      fields: {},
      reminders: { in: 1 },
      badge: 1,
      sim: 0, // demo only: pretend the extension is connected when no real one answers
      prompt: '', // '' | 'later' | 'never' | 'done'
      asks: 0,
      askAfter: '',
      pausedUntil: ''
    });
  return u;
}
const extAllowed = role => !!S.ext.master && extPol(role || persona().role).avail !== 'off';
function extOn(id, role) {
  role = role || persona().role;
  if (!extAllowed(role)) return false;
  const u = extUser(id),
    a = extPol(role).avail;
  return a === 'default' ? u.optIn !== false : u.optIn === true;
}
/* what this person may see (role policy) and what they chose to show (personal) */
const extFieldOk = (k, role) => !!extPol(role || persona().role).fields[k];
const extFieldOn = (k, id, role) => extFieldOk(k, role) && extUser(id).fields[k] !== 0;
const extRemOk = (k, role) => !!extPol(role || persona().role).reminders[k];
const extRemOn = (k, id, role) =>
  k === 'in' ? extUser(id).reminders.in !== 0 : extRemOk(k, role) && extUser(id).reminders[k] !== 0;
function extStatus() {
  if (!extAllowed()) return ['admin', 'Disabled by admin', 'mute'];
  if (S.extLink.connected || extUser().sim) return ['connected', 'Connected', 'ok'];
  if (S.extLink.installed) return ['installed', 'Installed, not signed in', 'warn'];
  return ['none', 'Not installed', 'mute'];
}

/* ---------- the day as the extension needs it ---------- */
function extSource(mode) {
  /* the sample clock has a work mode, not a device: plant gate = biometric, field work = app, the rest = web */
  return mode === 'Plant gate (biometric)' ? 'bio' : mode === 'On-site visit' ? 'app' : 'web';
}
function extShiftMin(e) {
  const sh = SHT[baseShift(e)],
    s = sh.s[0] * 60 + sh.s[1];
  let n = sh.e[0] * 60 + sh.e[1] - s;
  if (n <= 0) n += 1440;
  return n;
}
function extSnapshot() {
  const u = me(),
    role = persona().role,
    c = S.clock,
    on = extOn(u.id, role),
    x = extUser(u.id);
  const snap = {
    v: 1,
    name: u.name,
    hrms: location.href.split('#')[0],
    updatedAt: new Date().toISOString(),
    enabled: on,
    reason: !extAllowed(role) ? 'admin' : on ? '' : 'user',
    fields: Object.fromEntries(PDExt.FIELDS.map(f => [f[0], extFieldOn(f[0], u.id, role) ? 1 : 0])),
    reminders: Object.fromEntries(
      [['in'], ...PDExt.REMINDERS].map(r => [r[0], extRemOn(r[0], u.id, role) ? 1 : 0])
    ),
    badge: x.badge ? 1 : 0,
    pausedUntil: x.pausedUntil || ''
  };
  if (on && c.in) {
    snap.clockIn = c.in.toISOString();
    snap.clockOut = c.out ? c.out.toISOString() : '';
    snap.expectedOut = new Date(+c.in + extShiftMin(u) * 60000).toISOString();
    snap.source = extSource(c.mode);
    snap.onBreak = !!c.onBreak;
    snap.otFrom = new Date(
      TODAY.getFullYear(),
      TODAY.getMonth(),
      TODAY.getDate(),
      0,
      dayInfo(u.id, ...TD()).end
    ).toISOString();
  }
  return snap;
}

/* ---------- the bridge: this page talks to the extension through postMessage, nothing else ---------- */
const EXT_SRC = 'peopledesk-hrms',
  EXT_BACK = 'peopledesk-ext';
function extPost(type, payload) {
  try {
    window.postMessage(
      { source: EXT_SRC, type, payload },
      location.origin === 'null' ? '*' : location.origin
    );
  } catch (e) {}
}
function extPublish() {
  if (!S.authed) return;
  extPost('snapshot', extSnapshot());
}
function extPing() {
  extPost('ping');
}
let extConnectCb = null;
addEventListener('message', ev => {
  const d = ev.data;
  if (ev.source !== window || !d || d.source !== EXT_BACK) return;
  const l = S.extLink,
    was = l.installed + '|' + l.connected;
  if (d.type === 'hello' || d.type === 'status') {
    l.installed = true;
    l.connected = !!d.connected;
    l.version = String(d.version || '');
    l.seenAt = Date.now();
    if (l.connected) extPublish();
  }
  if (d.type === 'connected') {
    l.installed = l.connected = true;
    if (extConnectCb) extConnectCb(true);
    extPublish();
  }
  if (d.type === 'signedout') l.connected = false;
  if (was !== l.installed + '|' + l.connected && typeof extRepaint === 'function') extRepaint();
});
setInterval(extPublish, 30000);

/* ---------- today's clock survives a refresh (a real punch lives on the server, not in a tab) ---------- */
const EXT_CLK = 'pd-clock-v1';
function extSaveClock() {
  try {
    const c = S.clock;
    localStorage.setItem(
      EXT_CLK,
      JSON.stringify({
        day: iso(new Date()),
        in: c.in ? c.in.toISOString() : '',
        out: c.out ? c.out.toISOString() : '',
        mode: c.mode
      })
    );
  } catch (e) {}
}
function extRestoreClock() {
  try {
    const d = JSON.parse(localStorage.getItem(EXT_CLK) || 'null');
    if (!d || d.day !== iso(new Date()) || !d.in) return;
    S.clock = { in: new Date(d.in), out: d.out ? new Date(d.out) : null, mode: d.mode || 'Office' };
  } catch (e) {}
}
extRestoreClock();
{
  const _t = toggleClock;
  toggleClock = function () {
    _t.apply(this, arguments);
    extSaveClock();
    extPublish();
  };
  const _f = finishLogin;
  finishLogin = function () {
    _f.apply(this, arguments);
    extRestoreClock();
    extPing();
    extPublish();
    setTimeout(extMaybePrompt, 900);
  };
  const _s = setRole;
  setRole = function () {
    _s.apply(this, arguments);
    extPublish();
  };
}

/* ---------- personal choices (Profile, Preferences) ---------- */
function extSave(msg) {
  persist();
  extPublish();
  if (typeof extRefreshPreview === 'function') extRefreshPreview();
  if (msg) toast(msg);
}
function extSetMaster(on) {
  const u = extUser();
  u.optIn = !!on;
  extSave(on ? 'Browser widget on' : 'Browser widget off');
  render();
}
function extSetField(k, on) {
  extUser().fields[k] = on ? 1 : 0;
  extSave();
}
function extSetRem(k, on) {
  extUser().reminders[k] = on ? 1 : 0;
  extSave();
}
function extSetBadge(on) {
  extUser().badge = on ? 1 : 0;
  extSave();
}
function extPause() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  extUser().pausedUntil = d.toISOString();
  extSave('Paused until tomorrow. Your attendance is not affected.');
  render();
}
function extResume() {
  extUser().pausedUntil = '';
  extSave('Widget resumed');
  render();
}
function extSignOutExt() {
  confirmBox(
    'Sign out of the extension?',
    'The extension stops showing your attendance on this browser until you connect it again. Your attendance in PeopleDesk is not affected.',
    'Sign out of extension',
    () => {
      extPost('signout');
      S.extLink.connected = false;
      extUser().sim = 0;
      persist();
      render();
      toast('Signed out of the extension');
    }
  );
}
