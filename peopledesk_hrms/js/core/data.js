/* =============== data =============== */
const DEPTS = [
  'Production',
  'Quality',
  'Maintenance',
  'Stores & Logistics',
  'HR & Admin',
  'Finance',
  'IT',
  'Sales'
];
const DC = [
  'var(--brand)',
  'var(--teal)',
  '#8B74D1',
  'var(--amber)',
  '#C9608F',
  '#4B93AD',
  '#7F9F4A',
  'var(--red)'
];
const E = (id, name, dept, title, type, join, ctc, status, loc) => ({
  id,
  name,
  dept,
  title,
  type,
  join,
  ctc,
  status,
  loc,
  email: name.toLowerCase().replace(/ /g, '.') + '@gmux.in',
  phone:
    '+91 98' +
    String(10000000 + (Math.abs([...id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 89999999))
});
const DOB = {
  'E-1001': '1988-03-21',
  'E-1002': '1984-12-04',
  'E-1003': '1995-10-14',
  'E-1004': '1992-11-02',
  'E-1005': '1990-10-12',
  'E-1006': '1994-06-17',
  'E-1007': '1987-10-27',
  'E-1008': '1991-08-05',
  'E-1009': '1993-10-09',
  'E-1010': '1996-12-11',
  'E-1011': '1989-04-08',
  'E-1012': '1986-01-22',
  'E-1013': '1991-05-30',
  'E-1014': '1985-09-19',
  'E-1015': '1983-07-14',
  'E-1016': '1998-02-26'
};
const dobOf = e => e.dob || DOB[e.id] || '';
const JOIN_FIX = {
  'E-1016': ['2025-02-03', '2026-10-01'],
  'E-1010': ['2024-01-15', '2026-10-01'],
  'E-1013': ['2020-10-05', '2020-10-09'],
  'E-1006': ['2021-09-06', '2021-10-13']
};
let employees = [
  E(
    'E-1001',
    'Neha Kapoor',
    'HR & Admin',
    'HR Head',
    'Office',
    '2018-04-02',
    2400000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1002',
    'Arjun Mehta',
    'Production',
    'Production Manager',
    'Plant',
    '2016-08-16',
    1800000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1003',
    'Riya Verma',
    'Finance',
    'Accounts Executive',
    'Office',
    '2022-01-10',
    1408920,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1004',
    'Sandeep Yadav',
    'Production',
    'Machine Operator',
    'Plant',
    '2020-06-01',
    360000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1005',
    'Imran Khan',
    'Maintenance',
    'Fitter',
    'Plant',
    '2019-02-18',
    408000,
    'On leave',
    'Manesar Plant'
  ),
  E(
    'E-1006',
    'Pooja Nair',
    'Quality',
    'QA Engineer',
    'Plant',
    '2021-10-13',
    840000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1007',
    'Vikram Singh',
    'Stores & Logistics',
    'Stores Supervisor',
    'Plant',
    '2017-11-20',
    540000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1008',
    'Kavita Joshi',
    'Sales',
    'Sales Manager',
    'Office',
    '2019-07-08',
    1500000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1009',
    'Rahul Desai',
    'IT',
    'Systems Administrator',
    'Office',
    '2023-03-27',
    960000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1010',
    'Meera Iyer',
    'HR & Admin',
    'HR Executive',
    'Office',
    '2026-10-01',
    600000,
    'Probation',
    'Gurugram HQ'
  ),
  E(
    'E-1011',
    'Manoj Kumar',
    'Production',
    'Line Operator',
    'Plant',
    '2021-04-12',
    336000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1012',
    'Sunita Devi',
    'Production',
    'Packer',
    'Plant',
    '2022-08-22',
    300000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1013',
    'Aditya Rao',
    'Quality',
    'Quality Inspector',
    'Plant',
    '2020-10-09',
    456000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1014',
    'Farah Siddiqui',
    'Finance',
    'Finance Manager',
    'Office',
    '2015-05-25',
    1650000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1015',
    'Deepak Chauhan',
    'Maintenance',
    'Electrician',
    'Plant',
    '2018-12-03',
    420000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1016',
    'Tanvi Shah',
    'Sales',
    'Sales Executive',
    'Office',
    '2026-10-01',
    660000,
    'Probation',
    'Gurugram HQ'
  )
];
const USER = { admin: 'E-1001', manager: 'E-1002', employee: 'E-1003' };
const POLICY = {
  CL: { n: 'Casual leave', t: 12, u: 3, c: 'var(--brand)' },
  SL: { n: 'Sick leave', t: 8, u: 1, c: 'var(--teal)' },
  EL: { n: 'Earned leave', t: 18, u: 4, c: 'var(--amber)' }
};
function seedAssets() {
  const A = [],
    cnt = {};
  let n = 1000;
  const CODE = {
    Laptop: 'LT',
    'Mobile phone': 'PH',
    'ID card': 'ID',
    'Access card': 'AC',
    Monitor: 'MN',
    'Keyboard & mouse': 'KM',
    Headset: 'HS',
    'Handheld scanner': 'SC'
  };
  const p2 = v => String(v).padStart(2, '0'),
    ymd = x => x.getFullYear() + '-' + p2(x.getMonth() + 1) + '-' + p2(x.getDate());
  const shift = (d, days) => {
    const x = new Date(d + 'T00:00:00');
    x.setDate(x.getDate() + days);
    return ymd(x);
  };
  const yrs = (d, y) => {
    const x = new Date(d + 'T00:00:00');
    x.setFullYear(x.getFullYear() + y);
    x.setDate(x.getDate() - 1);
    return ymd(x);
  };
  let sn = 0;
  const SER = p => {
    sn++;
    return p + '-' + ((((sn + 3) * 48271 + 17) % 899999) + 100000).toString(36).toUpperCase();
  };
  const add = (type, make, model, sp, date) => {
    cnt[type] = (cnt[type] || 0) + 1;
    const a = {
      id: 'AST-' + ++n,
      type,
      make,
      model,
      serial: SER(sp),
      tag: 'GM-' + CODE[type] + '-' + p2(0) + String(cnt[type]).padStart(2, '0'),
      status: 'In stock',
      cond: 'Good',
      holder: null,
      ack: true,
      purchased: date,
      warranty: ['Laptop', 'Monitor'].includes(type)
        ? yrs(date, 3)
        : ['Mobile phone', 'Handheld scanner'].includes(type)
          ? yrs(date, 2)
          : '',
      hist: [
        { t: 'Added', date, emp: null, cond: 'New', note: 'Added to inventory', by: 'Neha Kapoor' }
      ]
    };
    A.push(a);
    return a;
  };
  const issue = (a, e, date, note, cond) => {
    a.status = 'Assigned';
    a.holder = e.id;
    a.cond = 'Good';
    a.hist.push({
      t: 'Issued',
      date,
      emp: e.id,
      cond: cond || 'New',
      note: note || '',
      by: 'Neha Kapoor'
    });
  };
  const ret = (a, e, date, cond, note) => {
    a.hist.push({ t: 'Returned', date, emp: e.id, cond, note, by: 'Neha Kapoor' });
    a.holder = null;
    a.status = 'In stock';
  };
  const LAP = [
    ['Dell', 'Latitude 5440', 'DL5440'],
    ['Lenovo', 'ThinkPad T14 Gen 4', 'TP14G4'],
    ['HP', 'EliteBook 840 G10', 'HP840']
  ];
  const E_ = id => employees.find(x => x.id === id);
  employees.forEach((e, i) => {
    const j = e.join,
      plant = e.type === 'Plant',
      old = j < '2022-06-01';
    const idc = add('ID card', 'GMux', 'RFID photo ID card', 'IDC', shift(j, -5));
    issue(idc, e, j, '');
    const ac = add(
      'Access card',
      'HID',
      plant ? 'Plant gate access card' : 'Office proximity access card',
      'ACC',
      shift(j, -5)
    );
    if (e.id === 'E-1003') issue(ac, e, '2023-06-20', 'Replacement for a lost card');
    else issue(ac, e, j, '');
    if (!plant) {
      const m = LAP[i % 3];
      let pd = old ? '2023-' + p2((i % 9) + 1) + '-14' : shift(j, -10);
      if (e.id === 'E-1008') pd = '2023-11-14';
      if (e.id === 'E-1003') pd = '2024-02-20';
      const lp = add('Laptop', m[0], m[1], m[2], pd);
      issue(lp, e, e.id === 'E-1003' ? '2024-03-04' : shift(pd, 4), old ? 'Laptop refresh' : '');
      if (e.id === 'E-1010') lp.ack = false;
      issue(
        add('Keyboard & mouse', 'Logitech', 'MK270 wireless combo', 'LGM', shift(j, -3)),
        e,
        j,
        ''
      );
      if (['IT', 'Finance', 'HR & Admin'].includes(e.dept))
        issue(add('Monitor', 'Dell', 'P2422H 24-inch monitor', 'DLM', shift(j, -8)), e, j, '');
      if (e.dept === 'Sales' || (e.dept === 'HR & Admin' && e.id !== 'E-1001'))
        issue(add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', shift(j, -4)), e, j, '');
    }
    if (/Manager|Head|Supervisor/.test(e.title) || e.dept === 'Sales')
      issue(
        add('Mobile phone', 'Samsung', 'Galaxy A35 5G', 'SGA', shift(j, -2)),
        e,
        shift(j, 7),
        'With company SIM'
      );
    if (e.dept === 'Stores & Logistics')
      issue(
        add('Handheld scanner', 'Zebra', 'TC21 handheld scanner', 'ZBR', shift(j, -6)),
        e,
        j,
        ''
      );
  });
  // a little history so the issue and return trail is real
  const riya = E_('E-1003'),
    farah = E_('E-1014'),
    rahul = E_('E-1009');
  {
    const o = add('Laptop', 'HP', 'EliteBook 840 G9', 'HP840', '2022-01-03');
    issue(o, riya, '2022-01-10', '');
    ret(o, riya, '2024-03-02', 'Good', 'Replaced with a newer model');
    o.hist.push({
      t: 'Retired',
      date: '2024-04-10',
      emp: null,
      cond: 'Good',
      note: 'Removed from use',
      by: 'Neha Kapoor'
    });
    o.status = 'Retired';
  }
  {
    const o = add('Access card', 'HID', 'Office proximity access card', 'ACC', '2022-01-05');
    issue(o, riya, '2022-01-10', '');
    o.hist.push({
      t: 'Lost',
      date: '2023-06-19',
      emp: riya.id,
      cond: '',
      note: 'Reported lost, card blocked',
      by: 'Neha Kapoor'
    });
    o.holder = null;
    o.status = 'Lost';
  }
  {
    const o = add('Laptop', 'Lenovo', 'ThinkPad T470', 'TP470', '2018-03-05');
    issue(o, farah, '2018-03-12', '');
    ret(o, farah, '2023-04-18', 'Good', 'Replaced during the refresh');
    o.hist.push({
      t: 'Retired',
      date: '2023-05-02',
      emp: null,
      cond: 'Good',
      note: 'Removed from use',
      by: 'Neha Kapoor'
    });
    o.status = 'Retired';
  }
  {
    const lp = A.find(a => a.type === 'Laptop' && a.holder === 'E-1009');
    ret(lp, rahul, '2026-10-02', 'Fair', 'Battery swelling');
    lp.hist.push({
      t: 'Repair',
      date: '2026-10-02',
      emp: null,
      cond: 'Fair',
      note: 'Sent to the vendor for a battery replacement',
      by: 'Neha Kapoor'
    });
    lp.status = 'Repair';
    lp.cond = 'Fair';
    const lo = add('Laptop', 'Dell', 'Latitude 3440', 'DL3440', '2025-06-10');
    issue(lo, rahul, '2026-10-02', 'Loaner while the laptop is repaired', 'Good');
  }
  {
    const h = add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', '2026-09-20');
    issue(h, riya, '2026-10-05', '');
    h.ack = false;
  }
  // spare stock
  add('Laptop', 'Dell', 'Latitude 5440', 'DL5440', '2026-08-20');
  add('Laptop', 'Lenovo', 'ThinkPad T14 Gen 4', 'TP14G4', '2026-08-20');
  add('Mobile phone', 'Samsung', 'Galaxy A35 5G', 'SGA', '2026-08-20');
  for (let k = 0; k < 3; k++)
    add('Access card', 'HID', 'Office proximity access card', 'ACC', '2026-07-15');
  for (let k = 0; k < 2; k++) add('ID card', 'GMux', 'RFID photo ID card', 'IDC', '2026-07-15');
  for (let k = 0; k < 2; k++)
    add('Keyboard & mouse', 'Logitech', 'MK270 wireless combo', 'LGM', '2026-06-10');
  add('Monitor', 'Dell', 'P2422H 24-inch monitor', 'DLM', '2026-05-12');
  add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', '2026-09-20');
  return A;
}
const HOLIDAYS = [
  { m: 9, d: 2, n: 'Gandhi Jayanti' },
  { m: 9, d: 20, n: 'Dussehra' },
  { m: 10, d: 8, n: 'Diwali' },
  { m: 11, d: 25, n: 'Christmas' }
];
const SHIFTS = {
  G: 'General 9:00–18:00',
  A: 'Morning 06:00–14:00',
  B: 'Afternoon 14:00–22:00',
  C: 'Night 22:00–06:00',
  O: 'Weekly off'
};
const S = {
  role: 'admin',
  loginRole: 'admin',
  authed: false,
  assets: seedAssets(),
  wished: {},
  attEmp: '',
  attDate: '',
  remember: true,
  reviews: {},
  candF: '',
  hist: [],
  calOff: 0,
  dayOv: {},
  regs: [
    {
      id: 1,
      emp: 'E-1004',
      date: '2026-10-06',
      type: 'Missed punch-out',
      in: '06:05',
      out: '14:10',
      reason: 'Forgot to punch out at the gate',
      status: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1012',
      date: '2026-10-05',
      type: 'Late mark waiver',
      in: '06:20',
      out: '14:05',
      reason: 'Bus breakdown on the highway',
      status: 'Pending'
    }
  ],
  lstep: 'creds',
  otp: {},
  creds: { admin: 'demo1234', manager: 'demo1234', employee: 'demo1234' },
  mustChange: { admin: false, manager: false, employee: true },
  sec: { twoFA: { admin: 1, manager: 1, employee: 0 }, minLen: 8, timeout: 30 },
  page: 'dashboard',
  tab: {},
  q: '',
  deptF: 'All',
  statF: 'All',
  view: 'list',
  collapsed: false,
  clock: { in: null, out: null, mode: 'Office' },
  leaves: [
    {
      id: 1,
      emp: 'E-1003',
      type: 'CL',
      from: '2026-10-12',
      to: '2026-10-13',
      days: 2,
      reason: 'Family function',
      status: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1004',
      type: 'SL',
      from: '2026-10-09',
      to: '2026-10-09',
      days: 1,
      reason: 'Fever',
      status: 'Pending'
    },
    {
      id: 3,
      emp: 'E-1008',
      type: 'EL',
      from: '2026-10-26',
      to: '2026-10-30',
      days: 5,
      reason: 'Vacation',
      status: 'Pending'
    },
    {
      id: 4,
      emp: 'E-1005',
      type: 'SL',
      from: '2026-10-06',
      to: '2026-10-09',
      days: 4,
      reason: 'Surgery recovery',
      status: 'Approved'
    },
    {
      id: 5,
      emp: 'E-1003',
      type: 'EL',
      from: '2026-08-17',
      to: '2026-08-19',
      days: 3,
      reason: 'Travel',
      status: 'Approved'
    },
    {
      id: 6,
      emp: 'E-1011',
      type: 'CL',
      from: '2026-09-14',
      to: '2026-09-14',
      days: 1,
      reason: 'Personal work',
      status: 'Rejected'
    }
  ],
  payStep: 1,
  cands: [
    { id: 1, n: 'Ishaan Malhotra', r: 'CNC Programmer', st: 0, src: 'Naukri' },
    { id: 2, n: 'Priya Bansal', r: 'HR Executive', st: 0, src: 'LinkedIn' },
    { id: 3, n: 'Gaurav Tiwari', r: 'CNC Programmer', st: 1, src: 'Referral' },
    { id: 4, n: 'Ayesha Khan', r: 'Safety Officer', st: 1, src: 'Naukri' },
    { id: 5, n: 'Rohit Saxena', r: 'CNC Programmer', st: 2, src: 'Agency' },
    { id: 6, n: 'Nisha Pillai', r: 'Safety Officer', st: 2, src: 'LinkedIn' },
    { id: 7, n: 'Karan Bedi', r: 'Sales Executive', st: 3, src: 'Referral' },
    { id: 8, n: 'Zoya Ansari', r: 'Accounts Executive', st: 4, src: 'Campus' }
  ],
  stages: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'],
  goals: [
    { id: 1, t: 'Close month-end books within 4 working days', p: 70, due: '2026-12-31' },
    { id: 2, t: 'Automate vendor payment reconciliation', p: 35, due: '2026-11-30' },
    { id: 3, t: 'Complete GST compliance certification', p: 90, due: '2026-10-31' }
  ],
  roster: {},
  incidents: [
    {
      id: 'INC-031',
      type: 'Near miss',
      loc: 'Press Shop',
      sev: 'Medium',
      date: '2026-10-05',
      by: 'Aditya Rao',
      st: 'Investigating',
      d: 'Guard interlock failed during die change; operator stepped back in time.'
    },
    {
      id: 'INC-030',
      type: 'First aid',
      loc: 'Assembly Line 2',
      sev: 'Low',
      date: '2026-09-28',
      by: 'Sunita Devi',
      st: 'Closed',
      d: 'Minor hand cut treated at dispensary.'
    },
    {
      id: 'INC-029',
      type: 'Property damage',
      loc: 'Stores Yard',
      sev: 'Low',
      date: '2026-09-19',
      by: 'Vikram Singh',
      st: 'Closed',
      d: 'Forklift clipped rack end; no injuries.'
    },
    {
      id: 'INC-028',
      type: 'Lost time',
      loc: 'Welding Bay',
      sev: 'High',
      date: '2026-08-22',
      by: 'Arjun Mehta',
      st: 'Closed',
      d: 'Wrist sprain, 3 days lost. Fixture redesigned.'
    }
  ],
  courses: [
    { n: 'Fire safety and evacuation', req: 'Plant', done: 92, exp: '2027-02-14' },
    { n: 'Forklift operation licence', req: 'Stores', done: 78, exp: '2026-11-05' },
    { n: 'Lockout / tagout (LOTO)', req: 'Maintenance', done: 85, exp: '2026-12-01' },
    { n: 'First aid and CPR', req: 'Plant', done: 64, exp: '2026-10-28' },
    { n: 'POSH awareness', req: 'All staff', done: 97, exp: '2027-04-01' },
    { n: 'Information security basics', req: 'Office', done: 88, exp: '2027-01-20' }
  ],
  mine: {
    'Fire safety and evacuation': 100,
    'POSH awareness': 100,
    'Information security basics': 60
  },
  claims: [
    {
      id: 1,
      emp: 'E-1003',
      cat: 'Travel',
      amt: 2450,
      date: '2026-10-03',
      note: 'Client visit, Faridabad',
      st: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1008',
      cat: 'Meals',
      amt: 1180,
      date: '2026-10-01',
      note: 'Customer lunch',
      st: 'Approved'
    },
    {
      id: 3,
      emp: 'E-1004',
      cat: 'Fuel',
      amt: 900,
      date: '2026-09-29',
      note: 'Site visit, two-wheeler',
      st: 'Pending'
    },
    {
      id: 4,
      emp: 'E-1003',
      cat: 'Internet',
      amt: 699,
      date: '2026-09-12',
      note: 'Broadband, September',
      st: 'Approved'
    }
  ],
  tickets: [
    {
      id: 'REQ-118',
      emp: 'E-1003',
      cat: 'Salary certificate',
      pr: 'Normal',
      st: 'In progress',
      d: '2026-10-06'
    },
    {
      id: 'REQ-117',
      emp: 'E-1009',
      cat: 'IT support: laptop battery',
      pr: 'High',
      st: 'Submitted',
      d: '2026-10-06'
    },
    {
      id: 'REQ-112',
      emp: 'E-1003',
      cat: 'Address proof letter',
      pr: 'Normal',
      st: 'Resolved',
      d: '2026-09-20'
    }
  ],
  notifs: [
    {
      t: '2 leave requests are waiting for your approval',
      s: 'Riya Verma and Sandeep Yadav',
      time: 'Just now',
      u: 1,
      p: 'leave'
    },
    {
      t: 'Incident INC-031 needs an investigation report',
      s: 'Press Shop · Near miss',
      time: '2 hours ago',
      u: 1,
      p: 'safety'
    },
    {
      t: 'October payroll is ready for review',
      s: 'Attendance is locked for 16 employees',
      time: 'Yesterday',
      u: 1,
      p: 'payroll'
    },
    {
      t: 'First aid certificates expire Oct 28',
      s: '14 employees need renewal',
      time: 'Yesterday',
      u: 0,
      p: 'training'
    }
  ],
  perms: {
    Employees: [1, 1, 0],
    Attendance: [1, 1, 1],
    'Leave approvals': [1, 1, 0],
    Payroll: [1, 0, 1],
    Recruitment: [1, 0, 0],
    'Performance reviews': [1, 1, 1],
    'Shift roster': [1, 1, 0],
    'Safety incidents': [1, 1, 1],
    Reports: [1, 1, 0],
    Settings: [1, 0, 0],
    'Assets and equipment': [1, 1, 1]
  }
};
(function () {
  const plant = employees.filter(e => e.type === 'Plant'),
    base = ['G', 'A', 'A', 'B', 'B', 'C', 'A', 'B', 'C'];
  plant.forEach((e, i) => {
    S.roster[e.id] = [0, 1, 2, 3, 4, 5, 6].map(d =>
      d === 6 ? 'O' : d === 5 && i % 3 === 0 ? 'O' : base[i % base.length]
    );
  });
  S.roster['E-1004'][6] = 'A';
  S.roster['E-1011'][6] = 'B';
  S.roster['E-1004'][2] = 'C';
})();
