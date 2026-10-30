/* =============== reports =============== */
function reports() {
  const m = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    ch = (arr, lbl, unit, max, sub) =>
      `<div class="card"><div class="head"><div><h2>${lbl}</h2><p class="sub">${sub}</p></div></div>${barChart(arr, m, { max, unit, today: 5, all: true, label: lbl })}</div>`;
  return (
    ph('Reports', 'Workforce analytics for the last six months') +
    `<div class="row c4">${kpi({ icon: 'users', tone: 't-teal', l: 'Attrition, 12 months', v: '8.2%', spark: [11.4, 10.8, 10.4, 10.1, 9.6, 9.4, 9.0, 8.8, 8.6, 8.4, 8.3, 8.2], p: delta('Beats 14% avg', true, 'dn'), d: 'rolling 12 months' })}${kpi({ icon: 'clock', tone: 't-brand', l: 'Average time to hire', v: '26 days', spark: [34, 33, 33, 31, 30, 30, 29, 28, 28, 27, 27, 26], p: delta('4 days faster', true, 'dn'), d: 'vs last quarter' })}${kpi({ icon: 'chart', tone: 't-amber', l: 'Overtime this month', v: '312 h', spark: [250, 262, 270, 255, 268, 280, 274, 286, 290, 286, 298, 312], p: delta('+9%', false, 'up'), d: 'vs September' })}${kpi({ icon: 'wallet', tone: 't-violet', l: 'Cost per hire', v: inr(38500), spark: [38000, 39200, 37500, 38800, 38200, 39000, 38100, 38700, 38300, 38600, 38400, 38500], p: delta('No change', null), d: 'last 12 hires' })}</div>
  <div class="row c2">${ch([93, 92, 94, 91, 95, 94], 'Attendance rate', '%', 100, 'Monthly average')}${ch([10, 11, 12, 13, 14, 16], 'Headcount', '', 20, 'End of month')}</div>
  <div class="card"><div class="head"><div><h2>Standard reports</h2><p class="sub">Open a report to preview it, then download it as a CSV that opens in Excel</p></div></div><div class="list">${REPORTS.map((r, ri) => `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><span class="grow"><b>${r.t}</b><span class="muted small" style="display:block">${r.d}</span></span><button class="btn sm" onclick="openReport(${ri})">Open</button></div>`).join('')}</div></div>`
  );
}
