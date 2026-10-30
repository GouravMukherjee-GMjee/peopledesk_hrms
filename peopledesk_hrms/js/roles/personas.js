/* =====================================================================
   PeopleDesk governance engine (v38)
   personas · org hierarchy · access model · audit log · policies · work calendar
   ===================================================================== */
const ROLE_DEF = [
  {
    k: 'employee',
    n: 'Employee',
    d: 'Uses self-service for attendance, leave, payslips, documents, requests, goals and training',
    i: 'user'
  },
  {
    k: 'manager',
    n: 'Manager',
    d: "Manages and approves their team's attendance, leave, claims, goals and performance",
    i: 'users'
  },
  {
    k: 'hr',
    n: 'HR',
    d: 'Manages employee records, onboarding and offboarding, policies, documents, recruitment and HR reports',
    i: 'userplus'
  },
  {
    k: 'admin',
    n: 'Admin',
    d: 'Business administrator: approves payroll, manages company-wide policies, reports and business configuration',
    i: 'shield'
  },
  {
    k: 'sysadmin',
    n: 'System Admin',
    d: 'Manages users, roles, security, SSO, integrations and sessions. No employee or payroll data by default',
    i: 'key'
  }
];
const ROLE_KEYS = ROLE_DEF.map(r => r.k),
  ROLES = ROLE_DEF;
const PBASE = [
  { k: 'employee', emp: 'E-1003' },
  { k: 'manager', emp: 'E-1002' },
  { k: 'hr', emp: 'E-1001' },
  { k: 'admin', emp: 'E-1014' },
  { k: 'sysadmin', emp: 'E-1009' }
];
const DEFROLE = { 'E-1001': 'hr', 'E-1014': 'admin', 'E-1009': 'sysadmin' };
Object.assign(S, {
  persona: 'hr',
  roles: {},
  life: { onb: {}, off: {}, exits: [] },
  audit: [],
  auditN: 0,
  orgHist: [],
  deleg: [],
  widgets: {},
  views: [],
  drafts: {},
  prefs: { email: 1, push: 1 },
  save: { st: '', at: '' }
});
const roleDef = k => ROLE_DEF.find(r => r.k === k) || ROLE_DEF[0];
const roleOf = id =>
  (S.roles && S.roles[id]) ||
  DEFROLE[id] ||
  (employees.some(e => e.mgr === id && e.status !== 'Exited') ? 'manager' : 'employee');
const uiOf = r => (r === 'employee' ? 'employee' : r === 'manager' ? 'manager' : 'admin');
const PERSONAS = PBASE.map(b => ({
  k: b.k,
  emp: b.emp,
  get role() {
    return roleOf(b.emp);
  },
  get n() {
    return roleDef(roleOf(b.emp)).n;
  },
  get d() {
    return roleDef(roleOf(b.emp)).d;
  },
  get i() {
    return roleDef(roleOf(b.emp)).i;
  }
}));
const persona = () => PERSONAS.find(p => p.k === S.persona) || PERSONAS[2];
const emp = id => employees.find(e => e.id === id);
function me() {
  return emp(persona().emp);
}
const isMgr = () => S.role !== 'employee';
const roleName = k => roleDef(k).n;
const live = () => employees.filter(e => e.status !== 'Exited');
