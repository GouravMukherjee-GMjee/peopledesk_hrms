/* ---------- approvals workspace ---------- */
function apRows(list, tab) {
  return list.map(({ k, r }) => {
    const e = emp(r.emp),
      a = canAct(k, r),
      od = isOverdue(k, r),
      done = stOf(k, r) !== 'Pending',
      sid = { leave: 1, claim: 2, reg: 3 }[k] * 1e13 + r.id,
      last = r.hist[r.hist.length - 1];
    return {
      click: `reqDetail('${k}',${r.id})`,
      sid: !done && a.ok ? sid : null,
      cells: [
        `<span class="tk ${KIND[k].tone}">${KIND[k].n}</span> ${esc(reqSummary(k, r))}`,
        `${refOf(k, r)}${r.ask ? ' · waiting on requester' : ''}`,
        person(e),
        esc(e.dept),
        done ? stChip(stOf(k, r)) : ageTxt(r),
        done ? esc(last.by) : `${fshort(r.due)}${od ? ' ' + chip('Overdue', 'bad', 1) : ''}`,
        done
          ? fshort(last.at.slice(0, 10))
          : `${r.stage + 1} of ${r.route.length} · ${esc(r.route[r.stage].role)}${a.as && a.as !== 'Approver' ? ' (' + esc(a.as) + ')' : ''}`,
        done || !a.ok
          ? ''
          : `<button class="btn ok sm" onclick="event.stopPropagation();decideReq('${k}',${r.id},'Approved')" aria-label="Approve ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm" onclick="event.stopPropagation();decideReq('${k}',${r.id},'Rejected')" aria-label="Reject ${esc(e.name)}">${ic('x', 14)}<span class="bt">Reject</span></button>`
      ]
    };
  });
}
function approvalsPage() {
  const tabsL = [
      ['mine', 'Waiting for me'],
      ['overdue', 'Overdue'],
      ['ask', 'Waiting on requester'],
      ['deleg', 'Delegated to me'],
      ...(scopeOf('approvals') === 'all' ? [['all', 'All pending']] : []),
      ['done', 'Completed']
    ],
    cur = curTab('ap', 'mine'),
    cnt = t => queue(t).length,
    list = queue(cur).filter(x => (S.apType || 'all') === 'all' || x.k === S.apType),
    done = cur === 'done';
  const hd = [
    { h: 'Request', keep: 1, sel: 'ap' },
    { h: 'Reference', xm: 1 },
    { h: 'Requester', xm: 1 },
    { h: 'Department', xm: 1 },
    { h: done ? 'Decision' : 'Age', xm: !done },
    { h: done ? 'Decided by' : 'Due', xm: 1 },
    { h: done ? 'Decided on' : 'Stage', xm: 1 },
    { h: '', act: 1 }
  ];
  const dl = delegatesOf(me().id);
  return (
    ph(
      'Approvals',
      'Everything that needs a decision from you, with who is next and by when',
      `<button class="btn" onclick="delegOpen()">Delegate approvals</button>`
    ) +
    `${dl.length ? `<div class="note" style="margin-bottom:0">You are covering for ${dl.map(d => esc(emp(d.from).name)).join(', ')} until ${fdate(dl[0].end)}.</div>` : ''}
   <div class="card"><div class="head">${tabs(
     'ap',
     tabsL.map(([v, l]) => [v, l + (v === 'done' ? '' : ` (${cnt(v)})`)]),
     'mine'
   )}<label class="dd"><span class="sr">Request type</span><select class="sel" onchange="S.apType=this.value;render()"><option value="all">All types</option>${Object.keys(
     KIND
   )
     .map(k => `<option value="${k}" ${S.apType === k ? 'selected' : ''}>${KIND[k].n}</option>`)
     .join('')}</select></label></div>
   ${rtable(hd, apRows(list, cur), { scope: 'ap', et: done ? 'No decisions yet' : 'All caught up', em: done ? 'Decided requests appear here.' : 'Nothing is waiting for you in this view.' })}</div>
   <p class="muted small">Overdue requests escalate to HR so nothing waits forever. Rejections need a reason, and every decision is kept in the request history and the audit log.</p>`
  );
}
function approvalItems() {
  return queue('mine')
    .slice()
    .sort((a, b) => (a.r.due < b.r.due ? -1 : 1))
    .map(({ k, r }) => ({
      k: KIND[k].n,
      kind: k,
      id: r.id,
      tone: KIND[k].tone,
      emp: r.emp,
      sub: reqSummary(k, r) + (isOverdue(k, r) ? ' · overdue' : ''),
      open: `reqDetail('${k}',${r.id})`,
      ok: `decideReq('${k}',${r.id},'Approved')`,
      no: `decideReq('${k}',${r.id},'Rejected')`
    }));
}
function approvalsCard() {
  const all = approvalItems(),
    by = k => all.filter(x => x.k === k).length,
    show = all.slice(0, 4);
  const body = show.length
    ? `<div class="list">${show
        .map(x => {
          const e = emp(x.emp);
          return `<div class="li"><button class="cname" style="flex:1 1 230px;width:auto" onclick="${x.open}" aria-label="${esc(e.name)} · ${esc(x.k)} · ${esc(x.sub)}">${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span class="apr-summary" title="${esc(x.sub)}"><span class="tk ${x.tone}">${x.k}</span><span>${esc(x.sub)}</span></span></span></button><div class="acts" style="gap:6px"><button class="btn ok sm" onclick="event.stopPropagation();${x.ok}" aria-label="Approve ${x.k.toLowerCase()} for ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm ico" onclick="event.stopPropagation();${x.no}" aria-label="Reject ${x.k.toLowerCase()} for ${esc(e.name)}">${ic('x', 14)}</button></div></div>`;
        })
        .join('')}</div>`
    : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>All caught up</b>Nothing is waiting for you.</div>`;
  return `<div class="card apr" id="approvals"><div class="head"><div><h2>Needs your approval</h2><p class="sub">Leave, corrections and claims, oldest due first</p></div>${all.length ? chip(all.length + ' waiting', 'warn', 1) : ''}</div>${body}
   <div class="apr-foot"><button class="link" onclick="S.tab.ap='mine';go('approvals')">Open approvals (${all.length})</button><button class="link" onclick="S.tab.ap='overdue';go('approvals')">Overdue (${queue('overdue').length})</button></div></div>`;
}
function pendingLv() {
  return queue('mine')
    .filter(x => x.k === 'leave')
    .map(x => x.r);
}
const apBadge = () => queue('mine').length;
