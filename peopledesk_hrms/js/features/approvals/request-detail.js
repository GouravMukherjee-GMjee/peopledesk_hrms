/* ---------- request detail: calendar working, route, history, comments ---------- */
function routeHTML(k, r) {
  const s = stOf(k, r);
  return `<ol class="route" aria-label="Approval route">${r.route
    .map((x, i) => {
      const done =
          s === 'Approved' || (s === 'Pending' && i < r.stage) || (s === 'Rejected' && i < r.stage),
        cur = s === 'Pending' && i === r.stage;
      return `<li class="${done ? 'done' : cur ? 'cur' : ''}"><span class="rn">${done ? ic('check', 12) : i + 1}</span><span><b>${esc(x.n)}</b><span class="muted small"> · ${x.role}${cur ? ' · deciding now' : ''}</span></span></li>`;
    })
    .join('')}</ol>`;
}
function histHTMLreq(r) {
  return `<div class="list">${r.hist
    .slice()
    .reverse()
    .map(
      h =>
        `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(h.act)}</b><div class="muted small">${esc(h.by)}${h.as && h.as !== 'Requester' ? ' · ' + esc(h.as) : ''} · ${ftime(h.at)}</div>${h.note ? `<div class="small" style="margin-top:2px">“${esc(h.note)}”</div>` : ''}</div></div>`
    )
    .join('')}</div>`;
}
function reqDetail(k, id) {
  const r = KIND[k].list().find(x => x.id === id);
  if (!r) return;
  const e = emp(r.emp),
    s = stOf(k, r),
    a = canAct(k, r),
    mine = r.emp === me().id,
    row = (x, y) =>
      `<div class="li"><span class="muted grow">${x}</span><b style="text-align:right">${y}</b></div>`;
  let rows = '';
  if (k === 'leave') {
    const c = leaveCalc(e, r.from, r.to, r.half),
      bal = balances(r.emp)[r.type],
      ov = teamOverlap(r.emp, r.from, r.to, r.id);
    rows =
      row('Type', POLICY[r.type].n) +
      row(
        'Dates',
        fdate(r.from) +
          (r.to !== r.from ? ' to ' + fdate(r.to) : '') +
          (r.half ? ' · ' + (r.half === 'first' ? 'first' : 'second') + ' half' : '')
      ) +
      row('Chargeable', fdays(r.days) + ' · ' + calLabel(e)) +
      (c.excluded.length
        ? row('Not charged', c.excluded.map(x => `${fshort(x.date)} (${x.name})`).join(', '))
        : '') +
      row('Reason', esc(r.reason)) +
      (r.att
        ? row(
            'Attachment',
            canField('med', r.emp)
              ? esc(r.att.name) + ' · ' + Math.max(1, Math.round(r.att.size / 1024)) + ' KB'
              : restricted()
          )
        : '') +
      (s === 'Pending'
        ? row('Balance', `${bal.left} left, ${+(bal.left - r.days).toFixed(1)} after this`)
        : '') +
      row('Team overlap', ov.length ? esc(overlapText(ov)) : 'No teammates off on these dates');
  } else if (k === 'claim')
    rows =
      row('Category', r.cat) +
      row('Amount', inr(r.amt)) +
      row('Expense date', fdate(r.date)) +
      row('Note', esc(r.note));
  else
    rows =
      row('Type', r.type) +
      row('Date', fdate(r.date)) +
      row('Times', `${r.in || '–'} to ${r.out || '–'}`) +
      row('Reason', esc(r.reason || ''));
  const askBox = r.ask
    ? `<div class="note ${mine ? '' : 'warn'}" style="margin:12px 0"><b>${esc(r.ask.by)} asked:</b> “${esc(r.ask.q)}”</div>${mine ? `<div class="fg">${fld('ri-t', 'Your reply', `<textarea id="ri-t" rows="3"></textarea>`, 'full')}</div>` : ''}`
    : '';
  const od = s === 'Pending' && r.due < iso(TODAY);
  overlay(
    `${KIND[k].n} request`,
    `<div class="person" style="margin-bottom:12px">${av(e.name, 44)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(refOf(k, r))}</span><div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">${stChip(s)}${r.ask ? chip('Waiting on ' + e.name.split(' ')[0], 'warn', 1) : ''}${od ? chip('Overdue', 'bad', 1) : ''}</div></div></div>
   <div class="list">${rows}</div>${askBox}
   <h3 class="dsub">Approval route</h3>${routeHTML(k, r)}${s === 'Pending' ? `<p class="muted small">Submitted ${ageTxt(r)} ago · decision due ${fdate(r.due)}${a.as === 'HR override' ? ' · you can decide as HR' : ''}${a.as === 'Delegate' ? ' · you are deciding as a delegate' : ''}</p>` : ''}
   ${s === 'Rejected' && r.rej ? `<div class="note bad" style="margin-top:8px"><b>Reason:</b> ${esc(r.rej.note)}</div>` : ''}<h3 class="dsub">History</h3>${histHTMLreq(r)}`,
    `${a.ok ? `<button class="btn ok" onclick="decideReq('${k}',${id},'Approved')">${ic('check', 16)}Approve</button><button class="btn bad" onclick="decideReq('${k}',${id},'Rejected')">Reject</button><button class="btn" onclick="infoDialog('${k}',${id})">Ask for information</button>` : ''}${mine && r.ask ? `<button class="btn primary" onclick="replyGo('${k}',${id})">Send reply</button>` : ''}${mine && s === 'Pending' ? `<button class="btn" onclick="cancelReq('${k}',${id})">Cancel request</button>` : ''}<button class="btn" onclick="closeModal()">Close</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
const leaveDetail = id => reqDetail('leave', id),
  claimDetail = id => reqDetail('claim', id);
{
  const _q = reqDetail;
  reqDetail = function (k, id) {
    _q.apply(this, arguments);
    const r = KIND[k].list().find(x => x.id === id);
    if (r) recent('req', k + ':' + id, refOf(k, r), emp(r.emp).name + ' · ' + reqSummary(k, r));
  };
}
