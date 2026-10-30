/* =====================================================================
   Browser extension widget: shared logic and popup markup.
   Pure functions, no DOM access, no framework. One source of truth for:
   the HRMS (admin preview, settings), the extension (service worker and popup) and the design gallery.
   Edit it here; scripts/build-extension.js copies it into extension/shared/.
   ===================================================================== */
(function (g) {
  'use strict';
  const FIELDS = [
    ['clockIn', 'Clock-in time', 'When your day started'],
    ['expectedOut', 'Expected logout', 'Clock-in time plus your shift length'],
    ['remaining', 'Time remaining', 'A countdown that updates every minute'],
    ['breakStatus', 'Break status', 'Whether a break is in progress'],
    ['overtime', 'Overtime so far', 'Extra time after your shift ends']
  ];
  const REMINDERS = [
    ['m30', '30 minutes before logout'],
    ['m15', '15 minutes before logout'],
    ['end', 'At shift end']
  ];
  const AVAIL = [
    ['off', 'Disabled', 'Employees in this role do not see the extension option at all.'],
    ['optin', 'Allowed (user opt-in)', 'Employees can turn it on from their preferences.'],
    [
      'default',
      'Enabled by default',
      'It starts on for everyone in this role. They can turn it off.'
    ]
  ];
  const SOURCES = { app: 'App', bio: 'Biometric', web: 'Web' };
  const LOW_MIN = 30; // amber when fewer minutes than this are left
  const OT_GRACE = 15; // minutes after expected logout before it counts as extra time
  const TONE = {
    ok: { bg: '#1f7a4d', fg: '#ffffff' },
    warn: { bg: '#f5b942', fg: '#1d2535' },
    info: { bg: '#2f5fc4', fg: '#ffffff' },
    over: { bg: '#6d4fc2', fg: '#ffffff' },
    mute: { bg: '#5b6475', fg: '#ffffff' }
  };

  const pad = n => String(n).padStart(2, '0');
  const esc = s =>
    String(s == null ? '' : s).replace(
      /[&<>"']/g,
      c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
    );
  const fmtTime = d => {
    const h = d.getHours();
    return `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`;
  };
  const fmtDate = d =>
    d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  const fmtDur = m => {
    m = Math.max(0, Math.round(m));
    return m >= 60 ? `${Math.floor(m / 60)}h ${pad(m % 60)}m` : `${m}m`;
  };
  const fmtDurLong = m => {
    m = Math.max(0, Math.round(m));
    const h = Math.floor(m / 60),
      r = m % 60;
    return [
      h ? `${h} hour${h > 1 ? 's' : ''}` : '',
      r || !h ? `${r} minute${r === 1 ? '' : 's'}` : ''
    ]
      .filter(Boolean)
      .join(' ');
  };
  const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dt = v => (v ? new Date(v) : null);

  /* ---------- icons (stroke icons, 24px grid) ---------- */
  const PATHS = {
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
    check: 'M20 6L9 17l-5-5',
    alert:
      'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z M12 9v4 M12 17h.01',
    lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
    pause: 'M9 5v14 M15 5v14',
    wifioff:
      'M1 1l22 22 M16.7 11.1a11 11 0 0 1 2.9 1.9 M5 12.9a11 11 0 0 1 5.2-2.8 M8.5 16.4a6 6 0 0 1 7 0 M12 20h.01',
    eyeoff:
      'M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9 M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2 M1 1l22 22',
    inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
    plug: 'M9 2v6 M15 2v6 M6 8h12v4a6 6 0 0 1-12 0z M12 18v4',
    coffee:
      'M17 8h1a4 4 0 0 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M6 1v3 M10 1v3 M14 1v3',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
    flag: 'M4 22V4 M4 4h13l-2 4 2 4H4',
    trend: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    refresh:
      'M23 4v6h-6 M1 20v-6h6 M3.5 9a9 9 0 0 1 14.9-3.4L23 10 M1 14l4.6 4.4A9 9 0 0 0 20.5 15',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
  };
  const ico = (n, s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${PATHS[n] || ''}"/></svg>`;

  /* ---------- the model: one snapshot in, everything the badge, popup and tooltip need ---------- */
  /*  snapshot: { v, name, hrms, updatedAt, enabled, reason('admin'|'user'), fields{}, reminders{}, badge,
                  clockIn, clockOut, expectedOut, source, onBreak, pausedUntil, hiddenDate, offline, error } */
  const STATE = {
    loading: ['Loading', 'mute', 'clock'],
    empty: ['Not connected', 'mute', 'plug'],
    error: ['Can’t refresh', 'warn', 'alert'],
    disabled: ['Not enabled', 'mute', 'lock'],
    paused: ['Paused', 'mute', 'pause'],
    hidden: ['Hidden today', 'mute', 'eyeoff'],
    notin: ['Not clocked in', 'mute', 'clock'],
    working: ['Working', 'ok', 'check'],
    low: ['Under 30 min left', 'warn', 'clock'],
    complete: ['Shift complete', 'info', 'flag'],
    overtime: ['Extra time', 'over', 'trend'],
    offline: ['Offline', 'mute', 'wifioff']
  };
  function model(s, now) {
    now = now || new Date();
    const M = { snap: s, now };
    const done = (key, extra) => {
      const st = STATE[key];
      const tone = st[1];
      return Object.assign(M, { key, label: st[0], tone, glyph: st[2] }, extra, {
        badge: Object.assign({ text: '' }, TONE[tone], (extra && extra.badge) || {})
      });
    };
    if (s === undefined) return done('loading', { tip: 'PeopleDesk: loading…' });
    if (s === null) return done('empty', { tip: 'PeopleDesk: sign in to connect' });
    M.vis = Object.assign(
      { clockIn: 1, expectedOut: 1, remaining: 1, breakStatus: 1, overtime: 1 },
      s.fields
    );
    if (s.error) return done('error', { tip: 'PeopleDesk: couldn’t refresh' });
    if (!s.enabled)
      return done('disabled', {
        tip: 'PeopleDesk: ' + (s.reason === 'user' ? 'turned off' : 'not enabled for your account')
      });
    const pu = dt(s.pausedUntil);
    if (pu && now < pu) return done('paused', { tip: 'PeopleDesk: paused until tomorrow' });
    if (s.hiddenDate === dayKey(now))
      return done('hidden', { tip: 'PeopleDesk: hidden for today' });

    const inAt = dt(s.clockIn),
      outAt = dt(s.clockOut),
      expAt = dt(s.expectedOut);
    Object.assign(M, {
      inAt,
      outAt,
      expAt,
      src: SOURCES[s.source] || '',
      onBreak: !!s.onBreak,
      otMin:
        dt(s.otFrom) && inAt ? Math.max(0, Math.floor(((outAt || now) - dt(s.otFrom)) / 60000)) : 0,
      updatedAt: dt(s.updatedAt)
    });
    let key, extra;
    if (!inAt || dayKey(inAt) !== dayKey(now)) {
      key = 'notin';
      extra = { tip: 'PeopleDesk: not clocked in yet' };
    } else {
      const total = Math.max(1, (expAt - inAt) / 60000),
        left = Math.ceil((expAt - now) / 60000),
        worked = ((outAt || now) - inAt) / 60000,
        pct = Math.max(0, Math.min(100, Math.round((worked / total) * 100)));
      Object.assign(M, { left, pct, worked, total });
      const range = `In ${fmtTime(inAt)}, Out ${fmtTime(expAt)}`;
      if (outAt || (left <= 0 && left > -OT_GRACE)) {
        key = 'complete';
        extra = {
          badge: { text: 'Done' },
          tip: outAt ? `Shift complete. Out ${fmtTime(outAt)}` : `Shift complete. ${range}`
        };
      } else if (left <= -OT_GRACE) {
        const ot = -left;
        key = 'overtime';
        M.over = ot;
        extra = {
          badge: { text: '+' + (ot < 60 ? ot + 'm' : Math.floor(ot / 60) + 'h') },
          tip: `${range}. ${fmtDur(ot)} past your expected logout`
        };
      } else {
        key = left < LOW_MIN ? 'low' : 'working';
        extra = {
          badge: { text: left >= 60 ? Math.floor(left / 60) + 'h' : left + 'm' },
          tip: range
        };
      }
    }
    if (s.offline) {
      M.base = key;
      return done('offline', {
        badge: { text: '?' },
        tip: `PeopleDesk: offline. Last updated ${M.updatedAt ? fmtTime(M.updatedAt) : 'earlier'}`
      });
    }
    return done(key, extra);
  }

  /* ---------- popup markup (360 wide, as tall as its content, never more than 480) ---------- */
  const tag = (t, cls) => `<span class="xw-tag${cls ? ' ' + cls : ''}">${t}</span>`;
  const btn = (act, label, cls, extra = '') =>
    `<button type="button" class="xw-btn ${cls || ''}" data-act="${act}" ${extra}>${esc(label)}</button>`;
  const parts = d => {
    const h = d.getHours();
    return `${pad(h % 12 || 12)}:${pad(d.getMinutes())}<small>${h < 12 ? 'AM' : 'PM'}</small>`;
  };
  function stateBody(m) {
    const k = m.key === 'offline' ? m.base : m.key;
    const say = (icon, title, text) =>
      `<div class="xw-empty"><span class="xw-ei tone-${m.tone}">${ico(icon, 26)}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
    if (m.key === 'loading')
      return `<div class="xw-skel" role="status" aria-label="Loading your attendance"><i></i><i></i><i></i><i></i></div>`;
    if (m.key === 'empty')
      return say(
        'plug',
        'Connect your account',
        'Open PeopleDesk and sign in once. Your clock-in and logout time will appear here.'
      );
    if (m.key === 'error')
      return say(
        'alert',
        'We couldn’t refresh just now',
        'This is on our side. Your attendance is safe and nothing has changed.'
      );
    if (m.key === 'disabled')
      return say(
        'lock',
        m.snap.reason === 'user'
          ? 'Turned off in your preferences'
          : 'Not enabled for your account',
        m.snap.reason === 'user'
          ? 'You can turn it back on in PeopleDesk under Profile, Preferences.'
          : 'Your organisation hasn’t turned this on for your role. Everything is still in PeopleDesk.'
      );
    if (m.key === 'paused')
      return say(
        'pause',
        'Paused until tomorrow',
        'No reminders or badge until tomorrow morning. Your attendance is not affected.'
      );
    if (m.key === 'hidden')
      return say(
        'eyeoff',
        'Hidden for today',
        'Your attendance is not affected. It comes back tomorrow.'
      );
    if (k === 'notin')
      return say(
        'clock',
        'You haven’t clocked in yet',
        'Your times appear here once you clock in from the app, a biometric device or the web.'
      );

    /* a status row, one big time, a progress bar and two tiles. Readable in about two seconds. */
    const v = m.vis,
      stale = m.key === 'offline' ? ' is-stale' : '';
    const left =
      k === 'complete' ? 'Done' : k === 'overtime' ? '+' + fmtDur(m.over) : fmtDur(m.left);
    let hero,
      tIn = v.clockIn ? ['Clocked in', fmtTime(m.inAt), 'info'] : null,
      tLeft = v.remaining ? [k === 'overtime' ? 'Past logout' : 'Time left', left, m.tone] : null;
    if (v.expectedOut)
      hero =
        k === 'complete' && m.outAt
          ? ['Clocked out', parts(m.outAt)]
          : ['Expected logout', parts(m.expAt)];
    else if (v.remaining) ((hero = ['Time left', esc(left)]), (tLeft = null));
    else ((hero = ['Clocked in', parts(m.inAt)]), (tIn = null));
    const tiles = [tIn, tLeft].filter(Boolean);
    const hm = x => Math.floor(x / 60) + 'h ' + pad(x % 60) + 'm';
    const otl =
      v.overtime && m.otMin > 0
        ? `<div class="xw-ot${stale}">${ico('trend', 14)}<span>${m.outAt ? 'Overtime today' : 'Overtime so far'}: <b>${hm(m.otMin)}</b></span></div>`
        : '';
    const brk = v.breakStatus
      ? m.onBreak
        ? tag(ico('coffee', 12) + 'On a break', 'is-on')
        : tag('No break')
      : '';
    const meta = `<div class="xw-meta"><span class="xw-st tone-${m.tone}">${ico(m.glyph, 13)}${esc(m.label)}</span>${m.src ? tag('via ' + esc(m.src)) : ''}${brk}</div>`;
    let prog = '';
    if (v.remaining || v.expectedOut) {
      const aria =
        k === 'complete'
          ? 'Shift complete'
          : k === 'overtime'
            ? 'Past your expected logout'
            : `${fmtDurLong(m.left)} left`;
      prog = `<div class="xw-pg${stale}"><div class="xw-bar tone-${m.tone}" role="progressbar" aria-label="Time worked today" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${m.pct}" aria-valuetext="${esc(m.pct + ' percent of the day. ' + aria)}"><i style="width:${m.pct}%"></i></div><div class="xw-pgl"><span>${fmtDur(m.worked)} worked</span><span>${fmtDur(m.total)} shift</span></div></div>`;
    }
    return `${meta}<div class="xw-hero${stale}"><span class="xw-lbl">${esc(hero[0])}</span><div class="xw-big">${hero[1]}</div></div>${prog}${tiles.length ? `<div class="xw-tiles${stale}">${tiles.map(t => `<div class="xw-tile tone-${t[2]}"><span>${esc(t[0])}</span><b>${esc(t[1])}</b></div>`).join('')}</div>` : ''}${otl}`;
  }
  function popupHTML(m, o) {
    o = o || {};
    const k = m.key === 'offline' ? m.base : m.key;
    const attendance = ['working', 'low', 'complete', 'overtime'].includes(k);
    const upd = m.updatedAt ? fmtTime(m.updatedAt) : '';
    let banner = '';
    if (m.key === 'offline')
      banner = `<div class="xw-ban tone-mute" role="status">${ico('wifioff', 16)}<span><b>You’re offline.</b> Last updated ${esc(upd || 'earlier')}</span></div>`;
    let foot;
    if (m.key === 'loading') foot = '';
    else if (m.key === 'error')
      foot = btn('retry', 'Try again', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'paused')
      foot = btn('prefs', 'Open preferences', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'hidden')
      foot = btn('unhide', 'Show again', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'disabled' && m.snap.reason === 'user')
      foot = btn('prefs', 'Open preferences', 'primary');
    else if (attendance)
      foot =
        btn('open', 'Open HRMS', 'primary') +
        `<span class="xw-tipwrap">${btn('hide', 'Hide for today', 'ghost', 'aria-describedby="xw-tip-hide"')}<span class="xw-tip" id="xw-tip-hide" role="tooltip">Your attendance is not affected</span></span>`;
    else foot = btn('open', 'Open HRMS', 'primary');
    const note =
      m.key === 'loading'
        ? ''
        : `<p class="xw-note">${attendance && upd ? 'Updated ' + esc(upd) + ' · ' : ''}Shows attendance only, nothing else</p>`;
    const head = `<header class="xw-h"><div><h1 id="xw-t">Today’s attendance</h1><p>${esc(fmtDate(m.now))}</p></div><div class="xw-ha"><button type="button" class="xw-ib" data-act="retry" aria-label="Refresh" title="Refresh">${ico('refresh', 16)}</button><button type="button" class="xw-ib" data-act="prefs" aria-label="Extension settings" title="Extension settings">${ico('gear', 16)}</button></div></header>`;
    return `<section class="xw" data-state="${m.key}" aria-labelledby="xw-t">${head}${banner}<main class="xw-b">${stateBody(m)}</main>${foot ? `<footer class="xw-f"><div class="xw-fb">${foot}</div>${note}</footer>` : ''}</section>`;
  }

  /* ---------- the toolbar icon with its badge (a picture of what the browser shows) ---------- */
  function toolbarHTML(m) {
    const b = m.snap && m.snap.badge === 0 ? Object.assign({}, m.badge, { text: '' }) : m.badge,
      shape = !b.text ? `<span class="xw-tg">${ico(m.glyph, 9)}</span>` : '';
    return `<span class="xw-tb" role="img" aria-label="Toolbar icon. ${esc(m.tip)}" title="${esc(m.tip)}"><span class="xw-ti">${ico('clock', 18)}</span>${b.text ? `<span class="xw-bdg" style="background:${b.bg};color:${b.fg}">${esc(b.text)}</span>` : shape}</span>`;
  }

  /* ---------- notifications ---------- */
  function notifText(kind, s) {
    const out = s && s.expectedOut ? fmtTime(new Date(s.expectedOut)) : '',
      inn = s && s.clockIn ? fmtTime(new Date(s.clockIn)) : '';
    const vis = Object.assign({ clockIn: 1, expectedOut: 1 }, s && s.fields);
    if (kind === 'in')
      return {
        title: 'You’re clocked in. Have a good day!',
        message:
          [vis.clockIn && inn && `In ${inn}`, vis.expectedOut && out && `Expected logout ${out}`]
            .filter(Boolean)
            .join(' · ') || 'Your day has started.'
      };
    if (kind === 'm30')
      return {
        title: '30 minutes left today',
        message:
          (vis.expectedOut && out ? `Expected logout ${out}. ` : '') +
          'Time to start wrapping up when you’re ready.'
      };
    if (kind === 'm15')
      return {
        title: '15 minutes left today',
        message:
          (vis.expectedOut && out ? `Expected logout ${out}. ` : '') + 'Just a friendly heads-up.'
      };
    return {
      title: 'Shift complete. Thanks for today!',
      message: `You’ve reached your expected logout${vis.expectedOut && out ? ' (' + out + ')' : ''}. Remember to clock out if you haven’t.`
    };
  }
  /* which notifications are due now; `fired` is the list of ids already shown, so each shows once per day */
  function notifsDue(s, now, fired) {
    if (!s || !s.enabled || s.offline || s.error || !s.clockIn) return [];
    const pu = dt(s.pausedUntil);
    if (pu && now < pu) return [];
    if (s.hiddenDate === dayKey(now)) return [];
    const inAt = new Date(s.clockIn);
    if (dayKey(inAt) !== dayKey(now) || s.clockOut) return [];
    const left = Math.ceil((new Date(s.expectedOut) - now) / 60000),
      r = s.reminders || {},
      day = dayKey(now),
      list = [];
    const add = (kind, ok) => {
      const id = `${day}:${kind}`;
      if (ok && !(fired || []).includes(id))
        list.push(Object.assign({ id, kind }, notifText(kind, s)));
    };
    add('in', r.in !== 0 && now - inAt < 10 * 60000);
    add('m30', !!r.m30 && left <= 30 && left > 15);
    add('m15', !!r.m15 && left <= 15 && left > 0);
    add('end', !!r.end && left <= 0 && left > -OT_GRACE);
    return list;
  }

  /* ---------- demo snapshots for previews and the gallery: a fixed day so screenshots are stable ---------- */
  function demo(key, base) {
    const d = base ? new Date(base) : new Date(),
      at = (h, m) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
    const snap = {
      v: 1,
      name: 'Rohan Verma',
      enabled: true,
      fields: { clockIn: 1, expectedOut: 1, remaining: 1, breakStatus: 1, overtime: 1 },
      reminders: { in: 1, m30: 1, m15: 1, end: 1 },
      clockIn: at(9, 12).toISOString(),
      expectedOut: at(18, 12).toISOString(),
      otFrom: at(18, 0).toISOString(),
      source: 'bio',
      onBreak: false,
      updatedAt: at(13, 0).toISOString()
    };
    const T = {
      working: [13, 0],
      low: [17, 50],
      complete: [18, 20],
      overtime: [18, 55],
      notin: [8, 40],
      offline: [14, 5]
    };
    let now = at(...(T[key] || [13, 0]));
    if (key === 'notin') Object.assign(snap, { clockIn: null, expectedOut: null, source: '' });
    if (key === 'complete') Object.assign(snap, { clockOut: at(18, 20).toISOString() });
    if (key === 'offline')
      Object.assign(snap, { offline: true, updatedAt: at(10, 30).toISOString() });
    if (key === 'disabled') Object.assign(snap, { enabled: false, reason: 'admin' });
    if (key === 'user-off') Object.assign(snap, { enabled: false, reason: 'user' });
    if (key === 'error') Object.assign(snap, { error: 1 });
    if (key === 'paused') Object.assign(snap, { pausedUntil: at(23, 59).toISOString() });
    if (key === 'hidden') Object.assign(snap, { hiddenDate: dayKey(d) });
    if (key === 'break') Object.assign(snap, { onBreak: true });
    if (key === 'empty') return { snap: null, now };
    if (key === 'loading') return { snap: undefined, now };
    if (!snap.updatedAt || key !== 'offline') snap.updatedAt = now.toISOString();
    return { snap, now };
  }

  g.PDExt = {
    FIELDS,
    REMINDERS,
    AVAIL,
    SOURCES,
    TONE,
    LOW_MIN,
    esc,
    ico,
    fmtTime,
    fmtDate,
    fmtDur,
    fmtDurLong,
    dayKey,
    model,
    popupHTML,
    toolbarHTML,
    notifText,
    notifsDue,
    demo
  };
})(typeof self !== 'undefined' ? self : this);
