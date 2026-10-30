/* =====================================================================
   Profile · Preferences · Browser extension
   Master toggle, what to show, toolbar badge, reminders, pause, sign out. Items the role does not allow are
   shown locked with a reason, so nobody wonders where they went.
   ===================================================================== */
const extLockTip = `<span class="xa-lock" tabindex="0" role="img" aria-label="Not available for your role" aria-describedby="xa-lt">${ic('lock', 15)}<span class="xa-tip" id="xa-lt" role="tooltip">Not available for your role</span></span>`;
function extRow(title, sub, input, lock) {
  return `<div class="li xa-li ${lock ? 'is-lock' : ''}"><div class="grow"><b>${title}</b><div class="muted small">${sub}</div></div>${lock ? extLockTip : ''}${input}</div>`;
}
const extSw = (on, fn, label, dis, fid) =>
  `<label class="sw"><input type="checkbox" role="switch" ${on ? 'checked' : ''} ${dis ? 'disabled' : ''} aria-label="${esc(label)}" ${fid ? `data-fid="${fid}"` : ''} onchange="${fn}"><span></span></label>`;

function extPrefsPage() {
  const e = me(),
    role = persona().role,
    u = extUser(e.id),
    [st, stTxt, stTone] = extStatus(),
    allowed = extAllowed(role),
    on = extOn(e.id, role),
    paused = u.pausedUntil && new Date(u.pausedUntil) > new Date();
  const adminOff = !allowed;
  const banner = adminOff
    ? `<div class="xa-ban tone-mute" role="status">${ic('lock', 18)}<div><b>Disabled by your organisation</b><div class="small">Your admin hasn’t turned the browser widget on for ${esc(roleName(role))}. Everything stays available in PeopleDesk.</div></div></div>`
    : on && st === 'none'
      ? `<div class="xa-ban tone-info" role="status">${ic('download', 18)}<div class="grow"><b>One more step</b><div class="small">Add the extension to your browser to start seeing your logout time.</div></div><button class="btn sm primary" onclick="extSetup(1)">Set up now</button></div>`
      : on && st === 'installed'
        ? `<div class="xa-ban tone-warn" role="status">${ic('alert', 18)}<div class="grow"><b>Installed, but not signed in</b><div class="small">Connect it to your PeopleDesk account.</div></div><button class="btn sm primary" onclick="extSetup(2)">Connect</button></div>`
        : paused
          ? `<div class="xa-ban tone-mute" role="status">${ic('clock', 18)}<div class="grow"><b>Paused until tomorrow</b><div class="small">No badge or reminders today. Your attendance is not affected.</div></div><button class="btn sm" onclick="extResume()">Resume now</button></div>`
          : '';
  const fieldRows = PDExt.FIELDS.map(([k, n, t]) => {
    const ok = extFieldOk(k, role);
    return extRow(
      n,
      ok ? t : 'Your role can’t show this one',
      extSw(
        ok && extFieldOn(k, e.id, role),
        `extSetField('${k}',this.checked)`,
        n,
        !ok || adminOff || !on,
        'f-' + k
      ),
      !ok && !adminOff
    );
  }).join('');
  const remRows = [
    ['in', 'Clock-in confirmation', 'A quick note when your day starts', true],
    ...PDExt.REMINDERS.map(r => [
      r[0],
      r[1],
      'One friendly heads-up, shown once a day',
      extRemOk(r[0], role)
    ])
  ]
    .map(([k, n, t, ok]) =>
      extRow(
        n,
        ok ? t : 'Your role can’t use this one',
        extSw(
          ok && extRemOn(k, e.id, role),
          `extSetRem('${k}',this.checked)`,
          n,
          !ok || adminOff || !on,
          'r-' + k
        ),
        !ok && !adminOff
      )
    )
    .join('');
  const connected = st === 'connected';
  return `<div class="xa-pref">
   <div class="card"><div class="head"><div><h2>Browser extension</h2><p class="sub">See your logout time in your browser, without opening PeopleDesk</p></div><span id="xa-stat">${chip(stTxt, stTone)}</span></div>
    ${banner}
    <div class="list">
      ${extRow('Show in browser', 'Your clock-in time, expected logout and time left, in the toolbar', extSw(on, 'extSetMaster(this.checked)', 'Show in browser', adminOff, 'master'), false)}
    </div>
    <h3 class="xa-h">What to show</h3><div class="list">${fieldRows}${extRow('Toolbar badge', 'Show the time left on the icon, for example “5h” or “42m”', extSw(on && !!u.badge && allowed, 'extSetBadge(this.checked)', 'Toolbar badge', adminOff || !on, 'badge'), false)}</div>
    <h3 class="xa-h">Reminders</h3><div class="list">${remRows}</div>
    <div class="xa-acts">
      <button class="btn" ${on && !paused && !adminOff ? '' : 'disabled'} onclick="extPause()">${ic('clock', 16)}Pause until tomorrow</button>
      <button class="btn" ${connected ? '' : 'disabled'} onclick="extSignOutExt()">${ic('logout', 16)}Sign out of extension</button>
      ${!on || connected || adminOff ? '' : `<button class="btn" onclick="extSetup(1)">Set up the extension</button>`}
    </div>
    <p class="muted small xa-pp">${ic('shield', 14)}The extension shows attendance only. It can’t see your tabs, history or other sites, and hiding it never changes your attendance.</p>
   </div>
   <div class="card xa-me"><div class="head"><div><h2>What you’ll see</h2><p class="sub">Sample times. Updates as you change your choices.</p></div></div><div id="xa-pv">${extPrefPreview()}</div></div></div>`;
}
/* the status chip updates in place when the extension answers, so nothing else on the page jumps */
function extRepaint() {
  const [, t, tone] = extStatus(),
    el = document.getElementById('xa-stat');
  if (el) el.innerHTML = chip(t, tone);
  if (S.page === 'profile' && S.tab.prof === 'prefs' && !$('#layer .ov')) render();
  if (S.extSetup && $('#xs')) extSetupPaint();
}
/* the preview uses sample times, so every switch has a visible effect even before you clock in */
function extPrefPreview() {
  const e = me(),
    role = persona().role,
    u = extUser(e.id),
    on = extOn(e.id, role),
    st = S.extPrefState || 'working',
    key = !extAllowed(role) ? 'disabled' : !on ? 'user-off' : st,
    d = PDExt.demo(key);
  if (d.snap && d.snap.enabled) {
    d.snap.fields = Object.fromEntries(
      PDExt.FIELDS.map(f => [f[0], extFieldOn(f[0], e.id, role) ? 1 : 0])
    );
    d.snap.badge = u.badge ? 1 : 0;
    d.snap.reminders = Object.fromEntries(
      [['in'], ...PDExt.REMINDERS].map(r => [r[0], extRemOn(r[0], e.id, role) ? 1 : 0])
    );
  }
  const m = PDExt.model(d.snap, d.now),
    live = !!(d.snap && d.snap.enabled),
    states = [
      ['working', 'Working'],
      ['low', '30 min left'],
      ['complete', 'Complete'],
      ['offline', 'Offline']
    ],
    notes = live
      ? [['in', 'Clock-in confirmation'], ...PDExt.REMINDERS]
          .filter(r => d.snap.reminders[r[0]])
          .map(r => [r[1], PDExt.notifText(r[0], d.snap)])
      : [];
  const seg = live
    ? `<div class="xv-seg" role="group" aria-label="Preview state">${states.map(([k, n]) => `<button type="button" aria-pressed="${k === st}" onclick="extPrefState('${k}')" data-fid="ps-${k}">${n}</button>`).join('')}</div>`
    : '';
  const list = live
    ? `<details class="xv-n"${S.extNotifOpen ? ' open' : ''} ontoggle="S.extNotifOpen=this.open"><summary><h3>Notifications you’ll get</h3><span class="xv-cnt">${notes.length}</span>${ic('chev', 18)}</summary>${
        notes.length
          ? `<ul>${notes.map(([n, x]) => `<li><span class="xv-ni">${ic('bell', 15)}</span><div><b>${esc(x.title)}</b><span>${esc(x.message)}</span></div></li>`).join('')}</ul>`
          : '<p class="muted small">None. All reminders are off.</p>'
      }</details>`
    : '';
  return `${seg}<div class="xv-stage"><div class="xv-bar"><span class="xv-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="xv-url" aria-hidden="true">${ic('lock', 11)}peopledesk</span>${PDExt.toolbarHTML(m)}</div><div class="xv-pop"><div class="xa-frame" role="img" aria-label="Preview of your extension popup. Status: ${esc(m.label)}."><div inert>${PDExt.popupHTML(m)}</div></div></div></div>${list}`;
}
function extPrefState(k) {
  S.extPrefState = k;
  extRefreshPreview();
}
/* toggling a field redraws only the preview, so keyboard focus stays on the switch */
function extRefreshPreview() {
  const box = document.getElementById('xa-pv');
  if (!box || S.tab.prof !== 'prefs') return;
  const a = document.activeElement,
    fid = a && a.dataset ? a.dataset.fid : '';
  box.innerHTML = extPrefPreview();
  if (fid) {
    const n = box.querySelector(`[data-fid="${fid}"]`);
    if (n) n.focus();
  }
}
