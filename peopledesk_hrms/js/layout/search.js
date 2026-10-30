/* ---------- search: pages, people, requests by reference, policies, recent ---------- */
S.recent = [];
function recent(k, id, t, s) {
  if (!id) return;
  S.recent = [{ k, id, t, s }, ...S.recent.filter(x => !(x.k === k && x.id === id))].slice(0, 5);
}
{
  const _g = go;
  go = function (p) {
    _g.apply(this, arguments);
    if (S.authed && PG[p] && p !== 'dashboard') recent('page', p, label(p), 'Page');
  };
}
{
  const _e = empProfile;
  empProfile = function (id) {
    _e.apply(this, arguments);
    const e = emp(id);
    if (e) recent('emp', id, e.name, e.title);
  };
}
const POLDOCS = () => {
  const w = W(),
    s = ST();
  return [
    [
      'Leave policy: notice for earned leave',
      `${w.noticeEL} working days before the first day.`,
      'cal'
    ],
    [
      'Leave policy: medical certificate',
      `Sick leave over ${w.certDays} days needs a medical certificate.`,
      'cal'
    ],
    ['Leave policy: carry forward', `Earned leave up to ${w.carryEL} days carries forward.`, 'cal'],
    [
      'Work calendar',
      `Office staff work ${w.week.Office} days a week and plant staff ${w.week.Plant}. Company holidays are not charged as leave.`,
      'cal'
    ],
    ['Late-mark grace', `${w.grace} minutes after shift start before a late mark.`, 'clock'],
    ['Probation', `${w.probation} months from the date of joining.`, 'userplus'],
    [
      'Provident fund',
      s.pf.on
        ? `${s.pf.rate}% of basic pay, up to a monthly ceiling of ${inr(s.pf.ceil)}.`
        : 'Not deducted.',
      'wallet'
    ],
    [
      'Professional tax',
      s.pt.on ? `${inr(s.pt.amt)} a month in this demo.` : 'Not deducted.',
      'wallet'
    ]
  ];
};
{
  const _r = cmdRender;
  cmdRender = function (q0) {
    const raw = q0.trim(),
      act = raw.startsWith('>'),
      q = (act ? raw.slice(1) : raw).trim().toLowerCase();
    if (act) return _r(q0);
    _r(q0);
    const base = cmdItems.slice(),
      extra = [];
    if (!q && S.recent.length)
      extra.push(
        ...S.recent.map(x => ({
          g: 'Recent',
          t: x.t,
          s: x.s,
          i: x.k === 'emp' ? 'user' : x.k === 'req' ? 'inbox' : PG[x.id] ? PG[x.id][1] : 'file',
          fn: () => {
            closeModal();
            x.k === 'page'
              ? go(x.id)
              : x.k === 'emp'
                ? empProfile(x.id)
                : reqDetail(x.id.split(':')[0], +x.id.split(':')[1]);
          }
        }))
      );
    if (q.length >= 2) {
      allReq()
        .filter(
          ({ k, r }) =>
            (inScope(KIND[k].res, r.emp) || r.emp === me().id) && can(KIND[k].res, 'view')
        )
        .filter(({ k, r }) =>
          (refOf(k, r) + ' ' + emp(r.emp).name + ' ' + reqSummary(k, r)).toLowerCase().includes(q)
        )
        .slice(0, 4)
        .forEach(({ k, r }) =>
          extra.push({
            g: 'Requests',
            t: refOf(k, r) + ' · ' + emp(r.emp).name,
            s: KIND[k].n + ' · ' + reqSummary(k, r) + ' · ' + stOf(k, r),
            i: 'inbox',
            fn: () => {
              closeModal();
              reqDetail(k, r.id);
            }
          })
        );
      S.tickets
        .filter(
          t =>
            (t.emp === me().id || inScope('requests', t.emp)) &&
            (t.id + ' ' + t.cat).toLowerCase().includes(q)
        )
        .slice(0, 3)
        .forEach(t =>
          extra.push({
            g: 'Requests',
            t: t.id + ' · ' + t.cat,
            s: 'Helpdesk · ' + t.st,
            i: 'receipt',
            fn: () => {
              closeModal();
              go('requests');
              ticketDetail(t.id);
            }
          })
        );
      POLDOCS()
        .filter(([a, b]) => (a + ' ' + b).toLowerCase().includes(q))
        .slice(0, 3)
        .forEach(([a, b, i]) =>
          extra.push({
            g: 'Policies',
            t: a,
            s: b,
            i,
            fn: () => {
              overlay(
                a,
                `<p>${esc(b)}</p><p class="muted small" style="margin-top:10px">This comes from Settings and changes when the policy changes.</p>`,
                `<button class="btn primary" onclick="closeModal()">Close</button>`
              );
            }
          })
        );
    }
    const seen = new Set(base.map(x => x.g + x.t));
    const ex = extra.filter(x => !seen.has(x.g + x.t));
    cmdItems = (q ? [...base, ...ex] : [...ex, ...base]).slice(0, 12);
    cmdIdx = 0;
    cmdPaint();
  };
}
{
  const _p = cmdPaint;
  cmdPaint = function () {
    let g = '',
      h = '';
    cmdItems.forEach((it, i) => {
      if (it.g !== g) {
        g = it.g;
        h += `<div class="cmd-g">${g} <span class="muted">(${cmdItems.filter(x => x.g === g).length})</span></div>`;
      }
      h += `<button class="cmd-i ${i === cmdIdx ? 'on' : ''}" onclick="cmdRun(${i})" onmousemove="cmdIdx=${i}">${it.e ? av(it.e.name, 32) : `<span class="ai t-brand" style="width:32px;height:32px">${ic(it.i || 'file', 18)}</span>`}<span><b style="display:block">${esc(it.t)}</b><span class="muted small">${esc(it.s)}</span></span></button>`;
    });
    $('#cr').innerHTML =
      h ||
      `<div class="empty"><b>No matches</b>Try a name, role, page, policy or request number.</div>`;
  };
}
