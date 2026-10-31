/* ---------- navigation is built from what the person may open ---------- */
const NAVG = [
  ['Overview', ['dashboard', 'approvals', 'profile']],
  ['People', ['employees', 'org', 'lifecycle', 'recruit', 'performance', 'training']],
  ['Time', ['attendance', 'hours', 'leave', 'roster']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Operations', ['safety', 'assets', 'reports']],
  ['Administration', ['settings', 'audit']]
];
const NAVM = [
  ['Overview', ['dashboard', 'approvals', 'profile']],
  ['My team', ['employees', 'performance', 'training', 'lifecycle']],
  ['Time', ['attendance', 'hours', 'leave', 'roster']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Operations', ['safety', 'assets', 'reports']]
];
const NAVE = [
  ['Overview', ['dashboard', 'profile']],
  ['Time and leave', ['attendance', 'hours', 'leave']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Growth and safety', ['performance', 'training', 'safety']]
];
const NAVS = [
  ['Overview', ['dashboard', 'profile']],
  ['Administration', ['settings', 'audit']]
];
const PAGE_RES = {
  settings: ['users', 'roles', 'policy', 'statutory', 'security', 'integrations']
};
const okPage = p =>
  p === 'profile' || (PAGE_RES[p] ? PAGE_RES[p].some(r => can(r, 'view')) : can(p, 'view'));
function navFor() {
  const base =
      persona().role === 'sysadmin'
        ? NAVS
        : S.role === 'admin'
          ? NAVG
          : S.role === 'manager'
            ? NAVM
            : NAVE,
    seen = new Set(),
    g = base.map(([n, ids]) => [n, ids.filter(okPage)]);
  g.forEach(x => x[1].forEach(i => seen.add(i)));
  const extra = Object.keys(PG).filter(p => okPage(p) && !seen.has(p));
  if (extra.length) {
    (g.filter(x => x[1].length).pop() || g[0])[1].push(...extra);
  }
  return g.filter(x => x[1].length);
}
const flat = () => navFor().flatMap(g => g[1]);
function mobFor() {
  const pref =
      S.role === 'employee'
        ? ['dashboard', 'attendance', 'leave', 'payroll']
        : ['dashboard', 'employees', 'attendance', 'leave'],
    all = flat(),
    m = pref.filter(p => all.includes(p));
  for (const p of all) {
    if (m.length >= 4) break;
    if (!m.includes(p) && p !== 'profile') m.push(p);
  }
  return m.slice(0, 4);
}
function deniedPage() {
  const n = PG[S.page] ? PG[S.page][0] : 'This page';
  return `<div class="card denied" role="alert"><span class="dn-i">${ic('lock', 28)}</span><h1>Access denied</h1><p>Your account (<b>${esc(me().name)}</b>, ${esc(persona().n)}) does not have permission to open <b>${esc(n)}</b>.</p><p class="muted small">If you need it for your work, ask your System Admin to grant <b>View</b> access under Settings, then Roles and access.</p><div class="acts"><button class="btn primary" onclick="S.denied=false;go('dashboard')">${ic('home', 16)}Go to home</button></div></div>`;
}
function go(p) {
  closeModal();
  if (!PG[p]) p = 'dashboard';
  if (p === 'dashboard') S.hist = [];
  else if (p !== S.page || S.denied) pushHist();
  S.tab.pr = '';
  S.tab.pf = '';
  S.denied = !okPage(p);
  if (S.denied) audit('Access denied', PG[p][0], { res: p, to: 'View (opened by link)' });
  S.page = p;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
  enterView();
}
function routeHash() {
  if (!S.authed) return;
  const m = (location.hash || '').match(/^#\/([a-z]+)/);
  if (m && PG[m[1]] && m[1] !== S.page) go(m[1]);
}
addEventListener('hashchange', routeHash);
function setRole(k) {
  const p = PERSONAS.find(x => x.k === k) || PERSONAS.find(x => x.role === k) || PERSONAS[2];
  S.persona = p.k;
  S.role = uiOf(p.role);
  S.denied = false;
  S.attEmp = '';
  S.attDate = '';
  S.hist = [];
  S.page = 'dashboard';
  S.tab = {};
  S.q = '';
  S.deptF = 'All';
  S.statF = 'All';
  closeModal();
  render();
  window.scrollTo(0, 0);
}
function switchRole(k) {
  if (k === S.persona) {
    closeModal();
    return;
  }
  setRole(k);
  toast('Now previewing as ' + persona().n + ' (' + me().name + ')');
}
function roleCards(cur, fn) {
  return `<div class="rolegrp rolelist" role="radiogroup" aria-label="Preview as">${PERSONAS.map(r => `<button type="button" class="rolec rl" role="radio" aria-checked="${cur === r.k}" tabindex="${cur === r.k ? 0 : -1}" title="${esc(emp(r.emp).name)} · ${esc(r.d)}" onclick="${fn}('${r.k}')" onkeydown="roleKey(event,'${fn}')"><span class="rl-i">${ic(r.i, 18)}</span><span class="rl-t"><b>${r.n}</b><span class="rl-p">${esc(emp(r.emp).name)}</span><span class="rl-d">${esc(r.d)}</span></span>${cur === r.k ? `<span class="rl-ck">${ic('check', 16)}</span>` : ''}</button>`).join('')}</div>`;
}
function roleKey(e, fn) {
  const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const b = [...e.currentTarget.parentNode.children],
    i = (b.indexOf(e.currentTarget) + d + b.length) % b.length;
  window[fn](PERSONAS[i].k);
  const n = document.querySelector('.rolegrp .rolec[aria-checked="true"]');
  if (n) n.focus();
}
function roleSheet() {
  overlay(
    'Preview as',
    `<p class="muted small" style="margin-bottom:12px">This is a demo preview. You are switching between sample people to see what each can open and do. Real accounts would sign in as themselves and could not switch.</p>${roleCards(S.persona, 'switchRole')}`,
    `<button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function simulatedInfo() {
  overlay(
    'What is simulated in this demo',
    `<p class="muted small" style="margin-bottom:12px">PeopleDesk is running as a single file in your browser with sample people. Nothing here reaches a real server, bank or identity provider.</p>
  <div class="list"><div class="li"><span class="ai t-amber">${ic('lock', 18)}</span><div class="grow"><b>Sign-in and one-time codes</b><div class="muted small">Passwords and the 6-digit code are fixed demo values. Real security needs a backend.</div></div>${chip('Simulated', 'warn')}</div>
  <div class="li"><span class="ai t-amber">${ic('wallet', 18)}</span><div class="grow"><b>Bank payments</b><div class="muted small">A bank file is generated, but no money moves. Bank responses are simulated.</div></div>${chip('Simulated', 'warn')}</div>
  <div class="li"><span class="ai t-amber">${ic('key', 18)}</span><div class="grow"><b>Permission enforcement</b><div class="muted small">Rules are applied in your browser to show how they behave. In production the server must enforce every rule.</div></div>${chip('Browser only', 'warn')}</div>
  <div class="li"><span class="ai t-green">${ic('check', 18)}</span><div class="grow"><b>Policies, calendars, approvals, audit log</b><div class="muted small">These work on the sample data and are saved in this browser.</div></div>${chip('Working', 'ok')}</div>
  <div class="li"><span class="ai t-brand">${ic('chart', 18)}</span><div class="grow"><b>Trends and benchmarks without a source</b><div class="muted small">Marked Sample wherever they appear.</div></div>${chip('Sample', 'mute')}</div></div>`,
    `<button class="btn primary" onclick="closeModal()">Got it</button>`
  );
}
const demoBar = () =>
  `<span class="db-t"><b>Demo build</b><span class="db-x"> · sample data only · sign-in and payments are simulated</span></span><span class="db-p">Previewing as <b>${esc(me().name)}</b> (${esc(persona().n)})</span><button class="link" onclick="simulatedInfo()">What is simulated?</button>`;
