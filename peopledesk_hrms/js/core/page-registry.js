/* =============== navigation =============== */
const PG = {
  dashboard: ['Dashboard', 'home'],
  employees: ['Employees', 'users'],
  attendance: ['Attendance', 'clock'],
  hours: ['Hours & overtime', 'chart'],
  leave: ['Leave', 'cal'],
  payroll: ['Payroll', 'wallet'],
  recruit: ['Recruitment', 'brief'],
  performance: ['Performance', 'target'],
  roster: ['Shift roster', 'grid'],
  safety: ['Safety', 'shield'],
  training: ['Training', 'book'],
  reports: ['Reports', 'chart'],
  requests: ['Requests', 'receipt'],
  settings: ['Settings', 'sliders'],
  profile: ['My profile', 'user'],
  assets: ['Assets', 'laptop'],
  approvals: ['Approvals', 'approve'],
  org: ['Organization', 'orgchart'],
  lifecycle: ['Joiners & leavers', 'swap'],
  audit: ['Audit log', 'list']
};
const LBL = {
  manager: { employees: 'My team', assets: 'Team assets', payroll: 'My payslips' },
  employee: { dashboard: 'Home', payroll: 'Payslips', performance: 'Goals' }
};
const shortLbl = id =>
  S.role === 'manager' && id === 'employees' ? 'Team' : label(id).split(' ')[0];
const label = id => (LBL[S.role] && LBL[S.role][id]) || PG[id][0];
