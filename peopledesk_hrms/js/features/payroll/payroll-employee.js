/* =============== payroll =============== */
const PSTEPS = ['Attendance locked', 'Review changes', 'Approve payroll', 'Release payments'];
const PSTAT = ['Not started', 'In review', 'Awaiting approval', 'Approved', 'Paid'];
function payrollOld() {
  if (payrollGuard()) {
    const u = me(),
      s = slip(u.ctc);
    return (
      ph(S.role === 'employee' ? 'Payslips' : 'My payslip', 'September 2026', '') +
      `<div class="card slipdoc"><div class="sh"><div class="person">${coMark(40)}<div><b style="font-size:16px">GMux Pvt. Ltd.</b><span>Sector 18, Gurugram, Haryana</span></div></div><div class="sr" style="text-align:right"><b style="font-size:16px">Payslip</b><span class="muted small" style="display:block">September 2026</span></div></div>
     <div class="sb"><div class="kv2">${[
       ['Employee', esc(u.name)],
       ['Employee ID', u.id],
       ['Designation', esc(u.title)],
       ['Department', u.dept],
       ['Date of joining', fdate(u.join)],
       ['Pay days', '30 of 30'],
       ['Bank account', 'HDFC ····4821'],
       ['PAN', 'ABCPV····K']
     ]
       .map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`)
       .join('')}</div>
     <div class="slip"><div><h2 style="margin-bottom:6px">Earnings</h2><table><tbody><tr><td>Basic salary</td><td class="num">${inr(s.basic)}</td></tr><tr><td>House rent allowance</td><td class="num">${inr(s.hra)}</td></tr><tr><td>Special allowance</td><td class="num">${inr(s.special)}</td></tr><tr class="tot"><td>Gross earnings</td><td class="num">${inr(s.m)}</td></tr></tbody></table></div>
     <div><h2 style="margin-bottom:6px">Deductions</h2><table><tbody><tr><td>Provident fund (12%)</td><td class="num">${inr(s.pf)}</td></tr><tr><td>Professional tax</td><td class="num">${inr(s.pt)}</td></tr><tr><td>Income tax (TDS)</td><td class="num">${inr(s.tds)}</td></tr><tr class="tot"><td>Total deductions</td><td class="num">${inr(s.ded)}</td></tr></tbody></table></div></div>
     ${salaryBar(s)}<div class="net"><div><span class="muted small" style="display:block">Net pay</span><b>${inr(s.net)}</b></div><button class="btn" onclick="downloadPayslip('${u.id}','September 2026')">${ic('download', 16)}Download PDF</button></div>
     <p class="muted small" style="margin-top:14px">This is an illustrative calculation. Statutory rates are configured in Settings by your payroll team.</p></div></div>
    <div class="card"><div class="head"><h2>Earlier payslips</h2></div><div class="list">${['August', 'July', 'June'].map(mn => `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${mn} 2026</b></div><b class="num">${inr(s.net)}</b><button class="btn sm ico" onclick="downloadPayslip('${u.id}','${mn} 2026')" aria-label="Download ${mn} 2026 payslip" title="Download PDF">${ic('download', 14)}</button></div>`).join('')}</div></div>`
    );
  }
  return '';
}
