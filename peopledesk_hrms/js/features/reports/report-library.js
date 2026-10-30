/* =============== reports =============== */
const monthDays = (id, fn) => {
  const y = NOW.getFullYear(),
    m = NOW.getMonth();
  for (let d = 1; d <= NOW.getDate(); d++) fn(dayInfo(id, y, m, d));
};
const leaveUsed = (id, k) =>
  (id === 'E-1003'
    ? POLICY[k].u
    : hsh(id, 0, 0, k.charCodeAt(0)) % (k === 'EL' ? 6 : k === 'CL' ? 5 : 3)) +
  S.leaves
    .filter(l => l.emp === id && l.type === k && l.status === 'Approved' && l.id !== 5)
    .reduce((a, l) => a + l.days, 0);
const REPORTS = [
  {
    t: 'Monthly attendance register',
    d: `Present, absent, leave and late days for ${MON[NOW.getMonth()]} ${NOW.getFullYear()}`,
    f: 'attendance-register',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'Department',
        'Present',
        'Half days',
        'Absent',
        'Leave',
        'Late marks',
        'Overtime (h)'
      ],
      rows: scoped().map(e => {
        let P = 0,
          D = 0,
          A = 0,
          L = 0,
          late = 0,
          ot = 0;
        monthDays(e.id, o => {
          if (o.st === 'P') P++;
          else if (o.st === 'D') D++;
          else if (o.st === 'A') A++;
          else if (o.st === 'L' && !o.pend) L++;
          if (o.late) late++;
          ot += o.ot || 0;
        });
        return [e.id, e.name, e.dept, P, D, A, L, late, (ot / 60).toFixed(1)];
      })
    })
  },
  {
    t: 'Leave balance summary',
    d: 'Days left per leave type, as of today',
    f: 'leave-balances',
    build: () => ({
      heads: ['ID', 'Employee', 'Casual left', 'Sick left', 'Earned left'],
      rows: scoped().map(e => [
        e.id,
        e.name,
        ...['CL', 'SL', 'EL'].map(k => Math.max(0, POLICY[k].t - leaveUsed(e.id, k)))
      ])
    })
  },
  {
    t: 'Payroll register and bank advice',
    d: 'Gross, deductions and net pay for the current cycle',
    f: 'payroll-register',
    build: () => {
      const rows = employees.map(e => {
        const s = slip(e.ctc);
        return [
          e.id,
          e.name,
          'XXXX' + String(1000 + (hsh(e.id, 0, 0, 1) % 9000)),
          Math.round(s.m),
          Math.round(s.ded),
          Math.round(s.net)
        ];
      });
      rows.push(['', 'Total', '', ...[3, 4, 5].map(c => rows.reduce((a, r) => a + r[c], 0))]);
      return {
        heads: [
          'ID',
          'Employee',
          'Bank account',
          'Gross (INR)',
          'Deductions (INR)',
          'Net pay (INR)'
        ],
        rows
      };
    }
  },
  {
    t: 'PF, ESI and professional tax',
    d: 'Statutory contributions for the current cycle',
    f: 'statutory-statement',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'PF wage',
        'PF employee 12%',
        'PF employer 12%',
        'ESI employee',
        'ESI employer',
        'Professional tax'
      ],
      rows: employees.map(e => {
        const s = slip(e.ctc),
          w = Math.min(s.basic, 15000),
          esi = s.m <= 21000;
        return [
          e.id,
          e.name,
          Math.round(w),
          Math.round(w * 0.12),
          Math.round(w * 0.12),
          esi ? Math.round(s.m * 0.0075) : 0,
          esi ? Math.round(s.m * 0.0325) : 0,
          s.pt
        ];
      })
    })
  },
  {
    t: 'Overtime by department',
    d: 'Overtime hours and estimated cost this month',
    f: 'overtime-by-department',
    build: () => ({
      heads: ['Department', 'People', 'Overtime (h)', 'Estimated cost (INR)'],
      rows: DEPTS.map(dp => {
        const es = employees.filter(e => e.dept === dp);
        let min = 0,
          cost = 0;
        es.forEach(e => {
          let m = 0;
          monthDays(e.id, o => {
            m += o.ot || 0;
          });
          min += m;
          cost += (m / 60) * (slip(e.ctc).basic / 208) * 2;
        });
        return [dp, es.length, (min / 60).toFixed(1), Math.round(cost)];
      }).filter(r => r[1])
    })
  },
  {
    t: 'Incident and safety statistics',
    d: 'All reported incidents by type',
    f: 'incident-statistics',
    build: () => ({
      heads: ['Type', 'Reported', 'High severity', 'Still open'],
      rows: [...new Set(S.incidents.map(i => i.type))].map(t => {
        const l = S.incidents.filter(i => i.type === t);
        return [
          t,
          l.length,
          l.filter(i => i.sev === 'High').length,
          l.filter(i => i.st !== 'Closed').length
        ];
      })
    })
  },
  {
    t: 'Headcount and attrition trend',
    d: 'Last six months',
    f: 'headcount-trend',
    build: () => ({
      heads: ['Month', 'Headcount', 'Joiners', 'Leavers', 'Attrition %'],
      rows: [
        ['May', 10, 1, 0, '0.0'],
        ['Jun', 11, 1, 0, '0.0'],
        ['Jul', 12, 1, 0, '0.0'],
        ['Aug', 13, 1, 0, '0.0'],
        ['Sep', 14, 1, 0, '0.0'],
        ['Oct', 16, 2, 0, '0.0']
      ]
    })
  },
  {
    t: 'Asset register',
    d: 'Every asset with its serial number, status, holder and warranty',
    f: 'asset-register',
    build: () => ({
      heads: [
        'Tag',
        'Type',
        'Make and model',
        'Serial number',
        'Status',
        'Assigned to',
        'Issued on',
        'Warranty until'
      ],
      rows: assetScope()
        .slice()
        .sort((a, b) => a.tag.localeCompare(b.tag))
        .map(a => {
          const h = a.holder ? aEmp(a.holder) : null,
            iss = a.holder
              ? [...a.hist].reverse().find(x => x.t === 'Issued' && x.emp === a.holder)
              : null;
          return [
            a.tag,
            a.type,
            aname(a),
            a.serial,
            a.status,
            h ? h.name : '',
            iss ? iss.date : '',
            a.warranty || ''
          ];
        })
    })
  },
  {
    t: 'Assets issued per employee',
    d: 'Which laptop, phone, cards and peripherals each person holds right now',
    f: 'assets-per-employee',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'Department',
        'Laptop serial',
        'Phone',
        'ID card',
        'Access card',
        'Peripherals'
      ],
      rows: scoped().map(e => {
        const cur = S.assets.filter(a => a.holder === e.id),
          one = t => {
            const a = cur.find(x => x.type === t);
            return a ? a.serial : '';
          };
        return [
          e.id,
          e.name,
          e.dept,
          one('Laptop'),
          one('Mobile phone'),
          one('ID card'),
          one('Access card'),
          cur.filter(a => !ONE_EACH.includes(a.type)).length
        ];
      })
    })
  }
];
function openReport(i) {
  const r = REPORTS[i],
    { heads, rows } = r.build();
  const num = heads.map(
    (_, c) =>
      rows.length > 0 && rows.every(x => /^[\d,.]+$/.test(String(x[c]).trim()) || x[c] === '')
  );
  overlay(
    r.t,
    `<p class="muted" style="margin-bottom:6px">${esc(r.d)}</p><p class="small muted" style="margin-bottom:12px">${rows.length} row${rows.length === 1 ? '' : 's'}</p>${rtable(
      heads.map((h, c) => ({ h, c: num[c] ? 'num' : '', keep: 1 })),
      rows.map(x => ({
        cells: x.map(v => esc(typeof v === 'number' ? v.toLocaleString('en-IN') : v))
      })),
      { et: 'No data for this report' }
    )}`,
    `<button class="btn" onclick="closeModal()">Close</button><button class="btn primary" onclick="downloadReport(${i})">${ic('download', 16)}Download CSV</button>`,
    { side: true, wide: true, keepFocus: !!$('#layer .ov') }
  );
}
function downloadReport(i) {
  const r = REPORTS[i],
    { heads, rows } = r.build();
  saveFile(`${r.f}-${iso(TODAY)}.csv`, toCSV(heads, rows));
}
