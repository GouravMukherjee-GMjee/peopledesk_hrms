/* =============== files: downloads, PDF, CSV =============== */
async function saveFile(name, data) {
  let dl = null;
  try {
    dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
  } catch (e) {}
  if (!dl) {
    toast('Downloads work inside the Claude viewer');
    return false;
  }
  try {
    await dl.save({ filename: name, data });
    toast('Saved ' + name);
    return true;
  } catch (e) {
    if (!(e && e.code === 'declined')) toast('Could not save ' + name);
    return false;
  }
}
const csvCell = v => {
  v = v == null ? '' : String(v);
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
};
const toCSV = (heads, rows) =>
  '\ufeff' + [heads, ...rows].map(r => r.map(csvCell).join(',')).join('\r\n');
const slug = s =>
  String(s)
    .trim()
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '');
/* a small PDF writer: A4, built-in fonts, ASCII text */
const pdfTxt = s =>
  String(s)
    .replace(/₹/g, 'Rs ')
    .replace(/[–—]/g, '-')
    .replace(/[·•]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/[^\x20-\x7E]/g, '?')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
const pdfW = (s, size, bold) => String(s).length * size * (bold ? 0.56 : 0.5);
function PDF() {
  const pages = [[]];
  let cur = pages[0];
  const api = {
    page() {
      cur = [];
      pages.push(cur);
    },
    rect(x, y, w, h, rgb) {
      cur.push(`${rgb.join(' ')} rg ${x} ${y} ${w} ${h} re f`);
    },
    line(x1, y1, x2, y2, rgb = [0.85, 0.87, 0.91], w = 0.8) {
      cur.push(`${w} w ${rgb.join(' ')} RG ${x1} ${y1} m ${x2} ${y2} l S`);
    },
    text(x, y, s, size = 10, o = {}) {
      const w = pdfW(s, size, o.bold),
        px = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
      cur.push(
        `BT /${o.bold ? 'F2' : 'F1'} ${size} Tf ${(o.color || [0.08, 0.125, 0.21]).join(' ')} rg ${px.toFixed(1)} ${y} Td (${pdfTxt(s)}) Tj ET`
      );
    },
    build() {
      let out = '%PDF-1.4\n';
      const off = [0],
        N = pages.length;
      const obj = (n, body) => {
        off[n] = out.length;
        out += `${n} 0 obj\n${body}\nendobj\n`;
      };
      obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
      obj(
        2,
        `<< /Type /Pages /Kids [${pages.map((_, i) => `${5 + i * 2} 0 R`).join(' ')}] /Count ${N} >>`
      );
      obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
      obj(
        4,
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
      );
      pages.forEach((ops, i) => {
        const s = ops.join('\n');
        obj(
          5 + i * 2,
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`
        );
        obj(6 + i * 2, `<< /Length ${s.length} >>\nstream\n${s}\nendstream`);
      });
      const xr = out.length,
        total = 5 + N * 2;
      out += `xref\n0 ${total}\n0000000000 65535 f \n`;
      for (let n = 1; n < total; n++) out += String(off[n]).padStart(10, '0') + ' 00000 n \n';
      out += `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`;
      return new Blob([out], { type: 'application/pdf' });
    }
  };
  return api;
}
const NAVY = [0.063, 0.133, 0.29],
  INK = [0.08, 0.125, 0.21],
  MUT = [0.34, 0.42, 0.52],
  SOFT = [0.91, 0.93, 0.99],
  WHT = [1, 1, 1],
  PALE = [0.78, 0.84, 0.94];
const wrapText = (t, n) => {
  const out = [];
  let ln = '';
  String(t)
    .split(/\s+/)
    .forEach(w => {
      if ((ln + ' ' + w).trim().length > n) {
        out.push(ln);
        ln = w;
      } else ln = (ln + ' ' + w).trim();
    });
  if (ln) out.push(ln);
  return out;
};
function payslipPDF(e, label) {
  const s = slip(e.ctc),
    P = PDF();
  P.rect(0, 772, 595, 70, NAVY);
  P.text(40, 812, 'GMux Pvt. Ltd.', 18, { bold: 1, color: WHT });
  P.text(40, 794, 'Sector 18, Gurugram, Haryana', 9, { color: PALE });
  P.text(555, 812, 'PAYSLIP', 14, { bold: 1, color: WHT, align: 'right' });
  P.text(555, 794, label, 10, { color: PALE, align: 'right' });
  [
    ['Employee', e.name],
    ['Employee ID', e.id],
    ['Designation', e.title],
    ['Department', e.dept],
    ['Date of joining', fdate(e.join)],
    ['Pay days', '30 of 30'],
    ['Bank account', 'HDFC XXXX4821'],
    ['PAN', 'ABCPV****K']
  ].forEach(([a, b], i) => {
    const x = i % 2 ? 310 : 40,
      y = 738 - Math.floor(i / 2) * 36;
    P.text(x, y, a, 8.5, { color: MUT });
    P.text(x, y - 14, b, 11, { bold: 1 });
  });
  P.line(40, 598, 555, 598);
  const tbl = (x, title, items, totalLbl, total) => {
    P.rect(x, 560, 240, 24, [0.96, 0.97, 0.99]);
    P.text(x + 10, 568, title, 10, { bold: 1 });
    items.forEach(([a, b], i) => {
      P.text(x + 10, 540 - i * 24, a, 10);
      P.text(x + 230, 540 - i * 24, inr(b), 10, { align: 'right' });
      P.line(x, 530 - i * 24, x + 240, 530 - i * 24);
    });
    const y = 540 - items.length * 24 - 4;
    P.text(x + 10, y, totalLbl, 10, { bold: 1 });
    P.text(x + 230, y, inr(total), 10, { bold: 1, align: 'right' });
  };
  tbl(
    40,
    'Earnings',
    [
      ['Basic salary', s.basic],
      ['House rent allowance', s.hra],
      ['Special allowance', s.special]
    ],
    'Gross earnings',
    s.m
  );
  tbl(
    315,
    'Deductions',
    [
      ['Provident fund (12%)', s.pf],
      ['Professional tax', s.pt],
      ['Income tax (TDS)', s.tds]
    ],
    'Total deductions',
    s.ded
  );
  P.rect(40, 372, 515, 64, SOFT);
  P.text(58, 410, 'Net pay', 11, { color: MUT });
  P.text(58, 390, 'Credited to the bank account above', 9, { color: MUT });
  P.text(537, 394, inr(s.net), 24, { bold: 1, align: 'right', color: [0.1, 0.27, 0.72] });
  P.text(
    40,
    340,
    'This is a computer-generated payslip and does not need a signature. Figures are illustrative.',
    8,
    { color: MUT }
  );
  return P.build();
}
function docPDF(title, meta, sections) {
  const P = PDF();
  let y = 750;
  const head = () => {
    P.rect(0, 782, 595, 60, NAVY);
    P.text(40, 812, 'GMux Pvt. Ltd.', 14, { bold: 1, color: WHT });
    P.text(555, 812, meta || '', 9, { color: PALE, align: 'right' });
    y = 750;
  };
  head();
  P.text(40, y, title, 20, { bold: 1 });
  y -= 14;
  P.line(40, y, 555, y);
  y -= 28;
  sections.forEach(([h, t]) => {
    if (h) {
      if (y < 120) {
        P.page();
        head();
      }
      P.text(40, y, h, 12, { bold: 1 });
      y -= 18;
    }
    wrapText(t, 92).forEach(ln => {
      if (y < 70) {
        P.page();
        head();
      }
      P.text(40, y, ln, 10.5);
      y -= 15;
    });
    y -= 10;
  });
  return P.build();
}
function downloadPayslip(id, label) {
  const e = employees.find(x => x.id === id);
  saveFile(`Payslip-${slug(e.name)}-${slug(label)}.pdf`, payslipPDF(e, label));
}
function exportEmps() {
  const adm = canField('salary'),
    heads = [
      'ID',
      'Name',
      'Job title',
      'Department',
      'Work type',
      'Location',
      'Status',
      'Date of joining',
      ...(adm ? ['Annual CTC (INR)'] : [])
    ];
  saveFile(
    'Employees-' + iso(TODAY) + '.csv',
    toCSV(
      heads,
      filteredEmps().map(e => [
        e.id,
        e.name,
        e.title,
        e.dept,
        e.type,
        e.loc,
        e.status,
        e.join,
        ...(adm ? [e.ctc] : [])
      ])
    )
  );
}
function attCSV(empId) {
  const b = new Date(NOW.getFullYear(), NOW.getMonth() + S.calOff, 1),
    y = b.getFullYear(),
    m = b.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    e = employees.find(x => x.id === empId),
    rows = [];
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(empId, y, m, d);
    rows.push([
      `${y}-${pad(m + 1)}-${pad(d)}`,
      DOWN[o.dt.getDay()],
      o.hol || STN[o.st],
      o.in != null ? tm(o.in) : '',
      o.out != null ? tm(o.out) : '',
      o.mins != null ? (o.mins / 60).toFixed(2) : '',
      o.late || '',
      o.ot ? Math.round(o.ot) : '',
      o.mode,
      o.loc,
      o.note
    ]);
  }
  saveFile(
    `Attendance-${slug(e.name)}-${MON[m].slice(0, 3)}-${y}.csv`,
    toCSV(
      [
        'Date',
        'Day',
        'Status',
        'Clock in',
        'Clock out',
        'Hours',
        'Late (min)',
        'Overtime (min)',
        'Work mode',
        'Location',
        'Note'
      ],
      rows
    )
  );
}
function teamCSV() {
  const sd = S.attDate ? new Date(S.attDate + 'T00:00:00') : TODAY,
    td = [sd.getFullYear(), sd.getMonth(), sd.getDate()];
  saveFile(
    'Team-attendance-' + iso(sd) + '.csv',
    toCSV(
      ['ID', 'Employee', 'Department', 'Status', 'First punch', 'Hours', 'Late (min)'],
      scoped().map(e => {
        const o = dayInfo(e.id, ...td);
        return [
          e.id,
          e.name,
          e.dept,
          STN[o.st],
          o.in != null ? tm(o.in) : '',
          o.mins != null ? (o.mins / 60).toFixed(2) : '',
          o.late || ''
        ];
      })
    )
  );
}
