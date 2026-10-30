/* ---------- access model: resource x action x scope x sensitive fields ---------- */
const ACTS = ['view', 'create', 'edit', 'approve', 'export'],
  ACT_N = { view: 'View', create: 'Create', edit: 'Edit', approve: 'Approve', export: 'Export' },
  ACT_K = 'vceax';
const SCOPES = [
  ['own', 'Own records'],
  ['reports', 'Direct reports'],
  ['line', 'Reporting line'],
  ['dept', 'Department'],
  ['loc', 'Location'],
  ['all', 'Everyone']
];
const SENS = [
  ['salary', 'Salary and pay', 'CTC, payslips and pay variance'],
  ['bank', 'Bank details', 'Account numbers and IFSC'],
  ['ids', 'Identity documents', 'PAN, Aadhaar and passport'],
  ['med', 'Medical information', 'Medical certificates and injury details']
];
const RES = {
  dashboard: ['Dashboard', 'v'],
  approvals: ['Approvals', 'va'],
  employees: ['Employees', 'vcex'],
  org: ['Organization', 've'],
  lifecycle: ['Joiners and leavers', 'vcea'],
  attendance: ['Attendance', 'vceax'],
  hours: ['Hours and overtime', 'vca'],
  leave: ['Leave', 'vcax'],
  payroll: ['Payroll', 'vceax'],
  recruit: ['Recruitment', 'vcex'],
  performance: ['Performance', 'vcea'],
  roster: ['Shift roster', 'vcex'],
  safety: ['Safety', 'vcea'],
  training: ['Training', 'vcex'],
  requests: ['Requests', 'vcax'],
  reports: ['Reports', 'vx'],
  assets: ['Assets', 'vcex'],
  policy: ['Work policies', 've'],
  statutory: ['Statutory settings', 've'],
  users: ['Users and accounts', 've'],
  roles: ['Roles and access', 've'],
  security: ['Security and sessions', 've'],
  integrations: ['Integrations', 've'],
  audit: ['Audit log', 'vx']
};
/* employee | manager | hr | admin | sysadmin */
const PD = {
  dashboard: ['v|own', 'v|line', 'v|all', 'v|all', 'v|own'],
  approvals: ['|own', 'va|line', 'va|all', 'va|all', '|own'],
  employees: ['|own', 'vx|line', 'vcex|all', 'vex|all', '|own'],
  org: ['|own', '|line', 've|all', 've|all', '|own'],
  lifecycle: ['|own', 'va|line', 'vcea|all', 'v|all', '|own'],
  attendance: ['vc|own', 'veax|line', 'vceax|all', 'vx|all', '|own'],
  hours: ['vc|own', 'vca|line', 'vca|all', 'vca|all', '|own'],
  leave: ['vc|own', 'vcax|line', 'vcax|all', 'vax|all', '|own'],
  payroll: ['v|own', 'v|own', 'vce|all', 'veax|all', '|own'],
  recruit: ['|own', '|line', 'vcex|all', 'vx|all', '|own'],
  performance: ['v|own', 'vea|line', 'vcea|all', 'v|all', '|own'],
  roster: ['|own', 'vcex|line', 'vcex|all', 'v|all', '|own'],
  safety: ['vc|own', 'vca|line', 'vcea|all', 'vea|all', '|own'],
  training: ['v|own', 'v|line', 'vcex|all', 'v|all', '|own'],
  requests: ['vc|own', 'vca|line', 'vcax|all', 'v|all', '|own'],
  reports: ['|own', 'vx|line', 'vx|all', 'vx|all', '|own'],
  assets: ['|own', 'vx|line', 'vcex|all', 'vx|all', '|own'],
  policy: ['|own', '|line', 've|all', 've|all', '|own'],
  statutory: ['|own', '|line', 'v|all', 've|all', '|own'],
  users: ['|own', '|line', '|all', '|all', 've|all'],
  roles: ['|own', '|line', '|all', '|all', 've|all'],
  security: ['|own', '|line', '|all', '|all', 've|all'],
  integrations: ['|own', '|line', '|all', '|all', 've|all'],
  audit: ['|own', '|line', 'v|all', 'vx|all', 'v|all']
};
function defaultPerms() {
  const m = {};
  Object.keys(RES).forEach(k => {
    m[k] = {};
    ROLE_KEYS.forEach((r, i) => {
      const [a, s] = PD[k][i].split('|'),
        o = { scope: s };
      ACTS.forEach((x, j) => (o[x] = a.includes(ACT_K[j]) && RES[k][1].includes(ACT_K[j]) ? 1 : 0));
      m[k][r] = o;
    });
  });
  const z = { salary: 0, bank: 0, ids: 0, med: 0 };
  return {
    v: 3,
    m,
    sens: {
      employee: { ...z },
      manager: { ...z },
      hr: { salary: 1, bank: 1, ids: 1, med: 1 },
      admin: { salary: 1, bank: 1, ids: 1, med: 0 },
      sysadmin: { ...z }
    },
    meta: { by: 'System defaults', at: '' }
  };
}
S.perms = defaultPerms();
function can(res, act, p) {
  p = p || persona();
  if (res === 'profile' || (res === 'dashboard' && act === 'view')) return true;
  const r = S.perms.m[res];
  if (!r) return false;
  const g = p.grants && p.grants[res];
  if (g && g.includes(act)) return true;
  const x = r[p.role];
  return !!(x && x[act]);
}
function scopeOf(res, p) {
  p = p || persona();
  const g = p.grants && p.grants[res];
  if (g) return 'all';
  const x = S.perms.m[res] && S.perms.m[res][p.role];
  return x ? x.scope : 'own';
}
function scopeEmps(res) {
  const u = me(),
    sc = scopeOf(res);
  if (sc === 'all') return live();
  if (sc === 'reports') return [u, ...directs(u.id)];
  if (sc === 'line') return [u, ...lineOf(u.id)];
  if (sc === 'dept') return live().filter(e => e.dept === u.dept);
  if (sc === 'loc') return live().filter(e => e.loc === u.loc);
  return [u];
}
const scoped = res => scopeEmps(typeof res === 'string' ? res : 'employees');
const inScope = (res, id) => scopeEmps(res).some(e => e.id === id);
const canField = (f, id) => {
  const p = persona();
  if (id && id === me().id) return true;
  if (p.sens && p.sens[f]) return true;
  const s = S.perms.sens[p.role];
  return !!(s && s[f]);
};
const restricted = () =>
  `<span class="lockv" title="You do not have access to this information">${ic('lock', 14)}Restricted</span>`;
function need(res, act, what) {
  if (can(res, act)) return true;
  const n = RES[res] ? RES[res][0] : res;
  audit('Access denied', n, { res, to: ACT_N[act] });
  toast(`Access denied. You cannot ${what || ACT_N[act].toLowerCase()} in ${n}.`, null, 'err');
  return false;
}
// wrap existing operations so the permission is enforced where the work happens, not only where the button is drawn
const GUARD = {};
function guardFns(list) {
  list.forEach(([fn, res, act, what]) => {
    const orig = window[fn];
    if (typeof orig !== 'function') return;
    GUARD[fn] = [res, act];
    window[fn] = function () {
      if (!need(res, act, what)) return;
      return orig.apply(this, arguments);
    };
  });
}
// controls the person may not use are not drawn at all (the operation itself is refused as well)
function applyPerms(root) {
  if (!root) return;
  root.querySelectorAll('[onclick]').forEach(el => {
    const s = el.getAttribute('onclick') || '',
      re = /\b([A-Za-z_]\w*)\s*\(/g;
    let m;
    while ((m = re.exec(s))) {
      const g = GUARD[m[1]];
      if (g && !can(g[0], g[1])) {
        el.remove();
        return;
      }
    }
  });
}
