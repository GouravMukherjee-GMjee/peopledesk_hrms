/* =====================================================================
   Browser extension: the first-login prompt and the 3-step setup
   Prompt is shown only if the role allows the widget. "Maybe later" asks again in a week (up to EXT_ASKS times),
   "Don't ask again" stops it for good. The same setup can always be opened from Profile, Preferences.
   ===================================================================== */
function extMaybePrompt() {
  if (!S.authed || $('#layer .ov')) return;
  const u = extUser();
  if (!extAllowed(persona().role) || u.prompt === 'never' || u.prompt === 'done') return;
  if (u.optIn === false || extStatus()[0] === 'connected') return;
  if (u.asks >= EXT_ASKS || (u.askAfter && iso(new Date()) < u.askAfter)) return;
  u.asks++;
  const nxt = new Date();
  nxt.setDate(nxt.getDate() + 7);
  u.askAfter = iso(nxt);
  persist();
  const demo = PDExt.demo('working'),
    m = PDExt.model(demo.snap, demo.now);
  overlay(
    'See your logout time without opening HRMS',
    `<div class="xs-art" aria-hidden="true"><div class="xa-tbar"><span class="xa-url">${ic('search', 12)}</span>${PDExt.toolbarHTML(m)}</div><div class="xs-bub">${esc(m.tip)}</div></div>
     <p>Your clock-in time, expected logout and time left sit in your browser toolbar. They update by themselves, whether you clocked in on the mobile app, a biometric device or the web.</p>
     <p class="xa-priv sm">${ic('shield', 16)}<span>Shows attendance only, nothing else.</span></p>
     <label class="chk xs-never"><input type="checkbox" id="xs-never" onchange="extNever(this.checked)">Don’t ask again</label>`,
    `<button class="btn" onclick="closeModal()">Maybe later</button><button class="btn primary" onclick="extSetup(1)" autofocus>Set up now</button>`
  );
}
function extNever(on) {
  extUser().prompt = on ? 'never' : '';
  persist();
}

/* ---------- setup ---------- */
const XS_STEPS = ['Install', 'Connect', 'Choose'];
function extSetup(step) {
  if (!extAllowed(persona().role)) {
    toast('The browser widget isn’t enabled for your role', null, 'err');
    return;
  }
  S.extSetup = { step: step || 1, busy: 0, fail: 0 };
  extPing();
  extSetupPaint();
}
function extStepper(cur) {
  return `<ol class="xs-steps" aria-label="Setup progress">${XS_STEPS.map((n, i) => {
    const k = i + 1,
      st = k < cur ? 'done' : k === cur ? 'now' : '';
    return `<li class="${st}" ${k === cur ? 'aria-current="step"' : ''}><span class="xs-n">${k < cur ? ic('check', 16) : k}</span><span class="xs-l">${n}<span class="sr"> (step ${k} of 3${k < cur ? ', done' : ''})</span></span></li>`;
  }).join('')}</ol>`;
}
/* simple Chrome and Edge marks, drawn here so no image files are needed */
function extBrandIcon(b) {
  const pt = (deg, r) => {
      const a = (deg * Math.PI) / 180;
      return (24 + r * Math.cos(a)).toFixed(2) + ' ' + (24 + r * Math.sin(a)).toFixed(2);
    },
    wedge = (a, z, c) => `<path fill="${c}" d="M24 24L${pt(a, 22)}A22 22 0 0 1 ${pt(z, 22)}Z"/>`;
  return b === 'edge'
    ? `<svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="eg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#0c59a4"/><stop offset="1" stop-color="#2fb5e8"/></linearGradient><linearGradient id="eg2" x1="0" x2="1"><stop offset="0" stop-color="#35c1a0"/><stop offset="1" stop-color="#3dd68c"/></linearGradient></defs><circle cx="24" cy="24" r="22" fill="url(#eg)"/><path d="M8 27c0-9 7-15 16-15 8 0 14 5 14 12H21c-4 0-6 2-6 4 0 4 5 7 11 7 5 0 9-2 12-5-2 8-8 13-16 13C14 43 8 36 8 27z" fill="url(#eg2)" opacity=".95"/></svg>`
    : `<svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">${wedge(210, 330, '#db4437')}${wedge(330, 450, '#f4b400')}${wedge(90, 210, '#0f9d58')}<circle cx="24" cy="24" r="10.5" fill="#fff"/><circle cx="24" cy="24" r="8" fill="#4285f4"/></svg>`;
}
function extBrandBtn(b, mine) {
  const n = b === 'edge' ? 'Microsoft Edge' : 'Google Chrome';
  return `<a class="xs-br${mine ? ' mine' : ''}" href="${EXT_STORE[b]}" target="_blank" rel="noopener noreferrer">${extBrandIcon(b)}<span><b>Add to ${b === 'edge' ? 'Edge' : 'Chrome'}</b><small>${mine ? 'You’re using this browser' : n}</small></span></a>`;
}
function extSetupPaint() {
  const x = S.extSetup;
  if (!x) return;
  const role = persona().role,
    u = extUser(),
    linked = S.extLink.connected || u.sim;
  const mineEdge = /Edg\//.test(navigator.userAgent);
  let t, body, foot;
  if (x.step === 1) {
    t = 'Install the extension';
    body = `<p>Add the PeopleDesk Attendance extension to your browser. It takes about ten seconds.</p>
      ${S.extLink.installed ? `<div class="xa-ban tone-ok" role="status">${ic('check', 18)}<div><b>We found the extension</b><div class="small">Version ${esc(S.extLink.version || '1')} is installed. You can continue.</div></div></div>` : ''}
      <div class="xs-brs">${extBrandBtn(mineEdge ? 'edge' : 'chrome', 1)}${extBrandBtn(mineEdge ? 'chrome' : 'edge', 0)}</div>
      <p class="xs-both">${ic('help', 16)}<span><b>Use both Chrome and Edge?</b> Add it to each one. Then open PeopleDesk in that browser and connect there, once per browser.</span></p>
      <p class="muted small">Tip: after adding it, open the puzzle-piece menu in your toolbar and pin PeopleDesk so the badge stays in view. Already installed? Just continue.</p>`;
    foot = `<button class="btn" onclick="closeModal()">Not now</button><button class="btn primary" onclick="extStep(2)">Continue</button>`;
  } else if (x.step === 2) {
    t = 'Connect your account';
    body = `<p>Connect the extension to your PeopleDesk account so it can show your attendance. You stay signed in as <b>${esc(me().name)}</b>.</p>
      ${
        linked
          ? `<div class="xa-ban tone-ok" role="status">${ic('check', 18)}<div><b>Connected</b><div class="small">${esc(me().email)}${S.extLink.connected ? '' : ' · demo mode'}</div></div></div>`
          : x.busy
            ? `<div class="xa-ban tone-info" role="status"><span class="spin"></span><div><b>Connecting…</b></div></div>`
            : x.fail
              ? `<div class="xa-ban tone-warn" role="alert">${ic('alert', 18)}<div><b>We couldn’t find the extension</b><div class="small">Make sure it’s installed, then refresh this page and try again. To just try the experience, use demo mode.</div></div></div>`
              : ''
      }
      ${linked ? '' : `<div class="xs-stores"><button class="btn primary big" ${x.busy ? 'disabled' : ''} onclick="extConnect()">${x.fail ? 'Try again' : 'Connect to PeopleDesk'}</button>${x.fail ? `<button class="btn big" onclick="extDemoLink()">Use demo mode</button>` : ''}</div>`}`;
    foot = `<button class="btn" onclick="extStep(1)">Back</button><button class="btn primary" ${linked ? '' : 'disabled'} onclick="extStep(3)">Continue</button>`;
  } else if (x.step === 3) {
    t = 'Choose what to show';
    const fr = PDExt.FIELDS.map(([k, n, d]) => {
      const ok = extFieldOk(k, role);
      return extRow(
        n,
        ok ? d : 'Not available for your role',
        extSw(
          ok && extFieldOn(k, null, role),
          `extSetField('${k}',this.checked)`,
          n,
          !ok,
          'f-' + k
        ),
        !ok
      );
    }).join('');
    const rr = [
      ['in', 'Clock-in confirmation', 'A quick note when your day starts', true],
      ...PDExt.REMINDERS.map(r => [r[0], r[1], 'Shown once a day', extRemOk(r[0], role)])
    ]
      .map(([k, n, d, ok]) =>
        extRow(
          n,
          ok ? d : 'Not available for your role',
          extSw(ok && extRemOn(k, null, role), `extSetRem('${k}',this.checked)`, n, !ok, 'r-' + k),
          !ok
        )
      )
      .join('');
    body = `<p class="muted small" style="margin-bottom:8px">You can change any of this later in Profile, Preferences.</p><div class="list">${fr}${extRow('Toolbar badge', 'Show the time left on the icon, like “5h” or “42m”', extSw(!!u.badge, 'extSetBadge(this.checked)', 'Toolbar badge', false, 'badge'), false)}</div><h3 class="xa-h">Reminders</h3><div class="list">${rr}</div>`;
    foot = `<button class="btn" onclick="extStep(2)">Back</button><button class="btn primary" onclick="extFinish()">Finish setup</button>`;
  } else {
    t = 'You’re all set';
    const d = PDExt.demo('working'),
      m = PDExt.model(d.snap, d.now);
    body = `<div class="xs-done"><span class="xs-ok">${ic('check', 30)}</span><h3>The widget is on</h3><p>Next time you clock in, your logout time shows up in your toolbar. Nothing else to do.</p><div class="xs-art"><div class="xa-tbar"><span class="xa-url">${ic('search', 12)}</span>${PDExt.toolbarHTML(m)}</div><div class="xs-bub">${esc(m.tip)}</div></div></div>`;
    foot = `<button class="btn" onclick="closeModal();S.extSetup=null;S.tab.prof='prefs';go('profile')">Open preferences</button><button class="btn primary" onclick="closeModal();S.extSetup=null" autofocus>Done</button>`;
  }
  overlay(
    t,
    `<div id="xs">${x.step <= 3 ? extStepper(x.step) : ''}<div class="xs-b"><h2 class="sr" id="xs-h" tabindex="-1">${esc(t)}</h2>${body}</div></div>`,
    foot,
    { keepFocus: true }
  );
  const h = $('#xs-h');
  if (h) h.focus();
}
function extStep(n) {
  S.extSetup.step = n;
  S.extSetup.fail = S.extSetup.busy = 0;
  extSetupPaint();
}
function extConnect() {
  const x = S.extSetup;
  x.busy = 1;
  x.fail = 0;
  extSetupPaint();
  extConnectCb = ok => {
    clearTimeout(x.t);
    extConnectCb = null;
    x.busy = 0;
    if (S.extSetup === x) extSetupPaint();
  };
  extPost('connect', { name: me().name, hrms: location.href.split('#')[0] });
  x.t = setTimeout(() => {
    extConnectCb = null;
    x.busy = 0;
    x.fail = 1;
    if (S.extSetup === x) extSetupPaint();
  }, 1400);
}
function extDemoLink() {
  extUser().sim = 1;
  persist();
  S.extSetup.fail = 0;
  extSetupPaint();
}
function extFinish() {
  const u = extUser();
  u.optIn = true;
  u.prompt = 'done';
  persist();
  extPublish();
  S.extSetup.step = 4;
  extSetupPaint();
}
