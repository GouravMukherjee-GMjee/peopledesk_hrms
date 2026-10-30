/* =====================================================================
   v38 · approvals engine (routes, reasons, history, delegation, bulk preview) and leave on the real calendar
   ===================================================================== */
const KIND = {
  leave: {
    n: 'Leave',
    pre: 'LV',
    res: 'leave',
    tone: 't-amber',
    list: () => S.leaves,
    sk: 'status'
  },
  claim: { n: 'Claim', pre: 'CL', res: 'requests', tone: 't-teal', list: () => S.claims, sk: 'st' },
  reg: {
    n: 'Correction',
    pre: 'AR',
    res: 'attendance',
    tone: 't-brand',
    list: () => S.regs,
    sk: 'status'
  }
};
const stOf = (k, r) => r[KIND[k].sk],
  setSt = (k, r, v) => {
    r[KIND[k].sk] = v;
  };
const refOf = (k, r) =>
  r.ref || KIND[k].pre + '-' + String(r.id > 9999 ? r.id % 10000 : r.id).padStart(4, '0');
const nextRef = k => {
  const n =
    KIND[k]
      .list()
      .reduce(
        (m, r) => Math.max(m, +(String(r.ref || '').split('-')[1] || 0), r.id < 9999 ? r.id : 0),
        0
      ) + 1;
  return KIND[k].pre + '-' + String(n).padStart(4, '0');
};
function addWork(dIso, n) {
  const d = new Date(dIso + 'T00:00:00');
  while (n > 0) {
    d.setDate(d.getDate() + 1);
    if (
      d.getDay() !== 0 &&
      d.getDay() !== 6 &&
      !HOLIDAYS.some(h => h.m === d.getMonth() && h.d === d.getDate())
    )
      n--;
  }
  return iso(d);
}
const daysAgo = n => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - n);
  return d;
};
const hDate = a => (a ? ftime(a) : '');
/* routes: manager first, then HR for long leave, large claims and back-dated requests */
function routeFor(k, r) {
  const e = emp(r.emp),
    m = mgrOf(e),
    hr = emp('E-1001'),
    st = [];
  if (m) st.push({ role: 'Manager', who: m.id, n: m.name });
  else st.push({ role: 'HR', who: hr.id, n: hr.name });
  const needHR =
    (k === 'leave' && (r.days >= 5 || r.from < iso(daysAgo(7)))) ||
    (k === 'claim' && r.amt >= 10000);
  if (needHR && st[0].who !== hr.id) st.push({ role: 'HR', who: hr.id, n: hr.name });
  return st;
}
function seedReq() {
  const off = {
    leave: { 1: 1, 2: 3, 3: 0, 4: 8, 5: 60, 6: 40 },
    claim: { 1: 2, 2: 12, 3: 4, 4: 30 },
    reg: {}
  };
  ['leave', 'claim', 'reg'].forEach(k =>
    KIND[k].list().forEach((r, i) => {
      if (r.route) return;
      r.route = routeFor(k, r);
      const s = stOf(k, r),
        back = off[k][r.id] != null ? off[k][r.id] : (i % 3) + 1,
        sub = iso(daysAgo(back));
      r.sub = sub;
      r.due = addWork(sub, 2);
      r.stage = s === 'Approved' ? r.route.length - 1 : 0;
      r.hist = [
        { at: sub + 'T09:30:00', by: emp(r.emp).name, as: 'Requester', act: 'Submitted', note: '' }
      ];
      if (s === 'Approved' || s === 'Rejected') {
        const a = mgrOf(emp(r.emp)) || emp('E-1001');
        r.hist.push({
          at: addWork(sub, 1) + 'T11:00:00',
          by: a.name,
          as: 'Manager',
          act: s,
          note: s === 'Rejected' ? 'Needed on the production line that week' : ''
        });
      }
      if (s === 'Rejected')
        r.rej = {
          by: (mgrOf(emp(r.emp)) || emp('E-1001')).name,
          at: addWork(sub, 1) + 'T11:00:00',
          note: 'Needed on the production line that week'
        };
    })
  );
}
/* who may decide a request right now */
function delegatesOf(toId) {
  const t = iso(TODAY);
  return S.deleg.filter(d => d.to === toId && d.start <= t && t <= d.end);
}
function ensureReq(k, r) {
  if (r.route && r.hist) return;
  r.route = r.route || routeFor(k, r);
  r.stage = r.stage || 0;
  r.sub = r.sub || iso(TODAY);
  r.due = r.due || addWork(r.sub, 2);
  r.hist = r.hist || [
    {
      at: r.sub + 'T09:30:00',
      by: (emp(r.emp) || { name: 'Unknown' }).name,
      as: 'Requester',
      act: 'Submitted',
      note: ''
    }
  ];
}
function canAct(k, r, actor) {
  ensureReq(k, r);
  actor = actor || me();
  const K = KIND[k],
    p = persona();
  if (stOf(k, r) !== 'Pending') return { ok: false, why: 'This request was already decided' };
  if (r.emp === actor.id) return { ok: false, why: 'You cannot approve your own request' };
  if (!can(K.res, 'approve', p))
    return { ok: false, why: 'You do not have permission to approve this' };
  if (
    !inScope(K.res, r.emp) &&
    !(r.route[r.stage] && delegatesOf(actor.id).some(d => d.from === r.route[r.stage].who))
  )
    return { ok: false, why: 'This person is outside your scope' };
  const s = r.route[r.stage] || r.route[r.route.length - 1];
  if (s.who === actor.id) return { ok: true, as: 'Approver' };
  if (delegatesOf(actor.id).some(d => d.from === s.who)) return { ok: true, as: 'Delegate' };
  if (['hr', 'admin'].includes(p.role) && r.due < iso(TODAY))
    return { ok: true, as: 'HR override', esc: true };
  if (['hr', 'admin'].includes(p.role)) return { ok: true, as: 'HR override' };
  return { ok: false, why: `Waiting for ${s.n} (${s.role})` };
}
const isOverdue = (k, r) => stOf(k, r) === 'Pending' && r.due < iso(TODAY);
const allReq = () => ['leave', 'claim', 'reg'].flatMap(k => KIND[k].list().map(r => ({ k, r })));
function queue(tab) {
  const t = iso(TODAY),
    inb = allReq().filter(
      ({ k, r }) =>
        (stOf(k, r) === 'Pending' && inScope(KIND[k].res, r.emp)) ||
        (stOf(k, r) === 'Pending' && canAct(k, r).ok)
    );
  const my = ({ k, r }) => {
    const a = canAct(k, r);
    return a.ok && (a.as !== 'HR override' || a.esc);
  };
  if (tab === 'mine') return inb.filter(x => my(x) && !x.r.ask && x.r.emp !== me().id);
  if (tab === 'overdue') return inb.filter(x => isOverdue(x.k, x.r) && canAct(x.k, x.r).ok);
  if (tab === 'ask') return inb.filter(x => x.r.ask);
  if (tab === 'deleg') return inb.filter(x => canAct(x.k, x.r).as === 'Delegate');
  if (tab === 'all') return inb.filter(x => canAct(x.k, x.r).ok);
  return allReq()
    .filter(
      ({ k, r }) =>
        stOf(k, r) !== 'Pending' &&
        (inScope(KIND[k].res, r.emp) || r.emp === me().id) &&
        can(KIND[k].res, 'approve')
    )
    .sort((a, b) => (b.r.hist[b.r.hist.length - 1].at > a.r.hist[a.r.hist.length - 1].at ? 1 : -1));
}
const nextOwner = (k, r) => {
  const s = r.route[r.stage] || r.route[r.route.length - 1];
  return `${s.n} (${s.role})`;
};
const ageTxt = r => {
  const d = Math.round((TODAY - new Date(r.sub + 'T00:00:00')) / 864e5);
  return d <= 0 ? 'Today' : d === 1 ? '1 day' : d + ' days';
};
function reqSummary(k, r) {
  const e = emp(r.emp);
  if (k === 'leave')
    return `${POLICY[r.type].n} · ${fdays(r.days)} · ${fshort(r.from)}${r.to !== r.from ? ' – ' + fshort(r.to) : ''}${r.half ? ' (' + (r.half === 'first' ? 'first' : 'second') + ' half)' : ''}`;
  if (k === 'claim') return `${r.cat} · ${inr(r.amt)}`;
  return `${r.type} · ${fshort(r.date)}`;
}
function regApply(r) {
  const key = r.emp + '|' + r.date;
  S.dayOv[key] = {
    in: r.in,
    out: r.out,
    note: r.type === 'Late mark waiver' ? 'Late mark waived' : 'Regularized',
    waiveLate: r.type === 'Late mark waiver'
  };
}
/* ---------- decisions ---------- */
function decideCore(k, r, st, note, silent) {
  const K = KIND[k],
    a = canAct(k, r);
  if (!a.ok) return { ok: false, why: a.why };
  const e = emp(r.emp),
    me_ = me(),
    last = r.stage >= r.route.length - 1 || a.as === 'HR override',
    ref = refOf(k, r),
    at = new Date().toISOString();
  let msg = '';
  if (st === 'Approved') {
    if (!last) {
      r.hist.push({
        at,
        by: me_.name,
        as: a.as,
        act: 'Approved (stage ' + (r.stage + 1) + ' of ' + r.route.length + ')',
        note: note || ''
      });
      r.stage++;
      msg = `Approved. Now waiting for ${nextOwner(k, r)}`;
      audit(`${K.n} approved (stage ${r.stage} of ${r.route.length})`, `${e.name} · ${ref}`, {
        res: K.res,
        from: 'Pending',
        to: 'Waiting for ' + r.route[r.stage].n,
        reason: note || ''
      });
    } else {
      setSt(k, r, 'Approved');
      r.hist.push({ at, by: me_.name, as: a.as, act: 'Approved', note: note || '' });
      if (k === 'reg') regApply(r);
      msg = `${K.n} approved`;
      audit(`${K.n} approved`, `${e.name} · ${ref}`, {
        res: K.res,
        from: 'Pending',
        to: 'Approved' + (a.as === 'HR override' ? ' (HR override)' : ''),
        reason: note || ''
      });
    }
  } else {
    setSt(k, r, 'Rejected');
    r.rej = { by: me_.name, at, note };
    r.hist.push({ at, by: me_.name, as: a.as, act: 'Rejected', note });
    msg = `${K.n} rejected`;
    audit(`${K.n} rejected`, `${e.name} · ${ref}`, {
      res: K.res,
      from: 'Pending',
      to: 'Rejected',
      reason: note
    });
  }
  r.ask = null;
  return { ok: true, msg, final: st === 'Rejected' || last };
}
function decideReq(k, id, st, note) {
  const r = KIND[k].list().find(x => x.id === id);
  if (!r) return;
  if (st === 'Rejected' && !(note || '').trim()) {
    if (!canAct(k, r).ok) {
      toast(canAct(k, r).why, null, 'err');
      return;
    }
    return rejectDialog(k, id);
  }
  const dop =
    k === 'reg' && S.dayOpen && document.querySelector('#layer .ov') ? [...S.dayOpen] : null;
  const out = decideCore(k, r, st, note);
  if (!out.ok) {
    toast(out.why, null, 'err');
    return;
  }
  persist();
  closeModal();
  render();
  if (dop) attDay(...dop);
  toast(out.msg, null, { label: 'View', fn: () => reqDetail(k, id) });
}
function rejectDialog(k, id) {
  const r = KIND[k].list().find(x => x.id === id),
    e = emp(r.emp),
    pre = [
      'Not enough notice',
      'Needed on the production line',
      'Balance is not enough',
      'Please resubmit with details'
    ];
  overlay(
    'Reject this request',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)} · ${esc(reqSummary(k, r))}</p><div class="fg">${fld('rj-n', 'Reason for rejecting (required)', `<textarea id="rj-n" rows="3" placeholder="${esc(e.name.split(' ')[0])} will see this reason" oninput="this.dataset.d=1"></textarea>`, 'full')}</div>
   <div class="chips" role="group" aria-label="Common reasons">${pre.map(t => `<button type="button" class="chip mute btnchip" onclick="$('#rj-n').value=this.textContent;$('#rj-n').focus()">${t}</button>`).join('')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="rejectGo('${k}',${id})">Reject request</button>`
  );
}
function rejectGo(k, id) {
  const t = $('#rj-n').value.trim();
  if (!chk('rj-n', !!t, 'A reason is required so the person knows what to change')) return;
  decideReq(k, id, 'Rejected', t);
}
function infoDialog(k, id) {
  const r = KIND[k].list().find(x => x.id === id),
    e = emp(r.emp);
  overlay(
    'Ask for more information',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)} · ${esc(reqSummary(k, r))}. The request stays open and is marked as waiting on ${esc(e.name.split(' ')[0])}.</p><div class="fg">${fld('ai-q', 'Your question', `<textarea id="ai-q" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="infoGo('${k}',${id})">Send question</button>`
  );
}
function infoGo(k, id) {
  const t = $('#ai-q').value.trim();
  if (!chk('ai-q', !!t, 'Write the question')) return;
  const r = KIND[k].list().find(x => x.id === id);
  if (!canAct(k, r).ok) {
    toast(canAct(k, r).why, null, 'err');
    return;
  }
  r.ask = { q: t, by: me().name, at: new Date().toISOString() };
  r.hist.push({
    at: r.ask.at,
    by: me().name,
    as: canAct(k, r).as,
    act: 'Asked for more information',
    note: t
  });
  audit(`${KIND[k].n} information requested`, `${emp(r.emp).name} · ${refOf(k, r)}`, {
    res: KIND[k].res,
    reason: t
  });
  persist();
  closeModal();
  render();
  toast('Question sent. The request is waiting on ' + emp(r.emp).name.split(' ')[0]);
}
function replyGo(k, id) {
  const t = ($('#ri-t') || {}).value;
  if (!chk('ri-t', !!(t || '').trim(), 'Write your reply')) return;
  const r = KIND[k].list().find(x => x.id === id);
  r.hist.push({
    at: new Date().toISOString(),
    by: me().name,
    as: 'Requester',
    act: 'Replied',
    note: t.trim()
  });
  r.ask = null;
  audit(`${KIND[k].n} information provided`, `${emp(r.emp).name} · ${refOf(k, r)}`, {
    res: KIND[k].res,
    reason: t.trim()
  });
  persist();
  closeModal();
  render();
  toast('Reply sent to ' + nextOwner(k, r));
}
function cancelReq(k, id) {
  const r = KIND[k].list().find(x => x.id === id);
  if (r.emp !== me().id || stOf(k, r) !== 'Pending') return;
  confirmBox(
    'Cancel this request?',
    'The approver will no longer see it. This is recorded in the request history.',
    'Cancel request',
    () => {
      setSt(k, r, 'Cancelled');
      r.hist.push({
        at: new Date().toISOString(),
        by: me().name,
        as: 'Requester',
        act: 'Cancelled',
        note: ''
      });
      audit(`${KIND[k].n} cancelled`, `${me().name} · ${refOf(k, r)}`, { res: KIND[k].res });
      persist();
      closeModal();
      render();
      toast('Request cancelled');
    },
    true
  );
}
const cancelLeave = id => cancelReq('leave', id);
/* ---------- bulk: preview first, then apply with a result for every row ---------- */
function bulkItems(scope) {
  const ids = [...S.sel.ids];
  return ids
    .map(sid => {
      if (scope === 'ap') {
        const k = ['', 'leave', 'claim', 'reg'][Math.floor(sid / 1e13)],
          id = sid % 1e13;
        return { k, r: KIND[k].list().find(x => x.id === id) };
      }
      return { k: scope, r: KIND[scope].list().find(x => x.id === sid) };
    })
    .filter(x => x.r);
}
function bulkCheck(x, st) {
  const a = canAct(x.k, x.r);
  if (!a.ok) return { ok: false, why: a.why };
  if (x.k === 'leave' && st === 'Approved') {
    const b = balances(x.r.emp)[x.r.type];
    if (x.r.days > b.left)
      return { ok: false, why: `Balance is ${b.left} days, request is ${x.r.days}` };
    if (x.r.type === 'SL' && x.r.days > W().certDays && !x.r.att)
      return { ok: false, why: 'Medical certificate missing' };
  }
  const last = x.r.stage >= x.r.route.length - 1 || a.as === 'HR override';
  return {
    ok: true,
    note:
      st === 'Approved'
        ? last
          ? 'Approved'
          : 'Moves on to ' + x.r.route[x.r.stage + 1].n + ' (HR)'
        : 'Rejected',
    as: a.as
  };
}
function bulkDecide(scope, st) {
  const items = bulkItems(scope);
  if (!items.length) return;
  const rows = items.map(x => ({ x, c: bulkCheck(x, st) })),
    ok = rows.filter(r => r.c.ok),
    bad = rows.filter(r => !r.c.ok),
    verb = st === 'Approved' ? 'Approve' : 'Reject';
  const line = ({ x, c }) =>
    `<div class="li"><div class="grow"><b>${esc(emp(x.r.emp).name)}</b><div class="muted small">${esc(KIND[x.k].n)} · ${esc(reqSummary(x.k, x.r))}</div></div><span class="small ${c.ok ? '' : 'muted'}" style="text-align:right;max-width:46%">${esc(c.ok ? c.note : c.why)}</span></div>`;
  overlay(
    `${verb} ${ok.length} of ${rows.length}?`,
    `<p class="muted small" style="margin-bottom:10px">Review before anything changes. Each decision is recorded in the audit log.</p>
   ${ok.length ? `<h3 class="dsub">Ready (${ok.length})</h3><div class="list">${ok.map(line).join('')}</div>` : ''}${bad.length ? `<h3 class="dsub" style="margin-top:14px">Needs attention, skipped (${bad.length})</h3><div class="list">${bad.map(line).join('')}</div>` : ''}
   ${st === 'Rejected' && ok.length ? `<div class="fg" style="margin-top:12px">${fld('bk-n', 'Reason shown to each person (required)', `<textarea id="bk-n" rows="2"></textarea>`, 'full')}</div>` : ''}`,
    `<button class="btn" onclick="dismissModal()">Cancel</button>${ok.length ? `<button class="btn ${st === 'Approved' ? 'primary' : 'bad'}" onclick="bulkGo('${scope}','${st}')">${verb} ${ok.length}</button>` : ''}`,
    { wide: true }
  );
}
function bulkGo(scope, st) {
  const note = st === 'Rejected' ? ($('#bk-n').value || '').trim() : '';
  if (st === 'Rejected' && !chk('bk-n', !!note, 'A reason is required')) return;
  const items = bulkItems(scope),
    res = { done: 0, moved: 0, skip: [] };
  items.forEach(x => {
    const c = bulkCheck(x, st);
    if (!c.ok) {
      res.skip.push(x);
      return;
    }
    const o = decideCore(x.k, x.r, st, note);
    if (o.ok) {
      o.final ? res.done++ : res.moved++;
    } else res.skip.push(x);
  });
  S.sel = { scope: '', ids: [] };
  persist();
  closeModal();
  render();
  toast(
    `${res.done} ${st === 'Approved' ? 'approved' : 'rejected'}${res.moved ? `, ${res.moved} moved to the next approver` : ''}${res.skip.length ? `, ${res.skip.length} skipped` : ''}`
  );
}
/* ---------- delegation ---------- */
function delegOpen() {
  const people = live().filter(e => e.id !== me().id);
  overlay(
    'Delegate my approvals',
    `<p class="muted small" style="margin-bottom:10px">While you are away, the person you choose can decide the requests that would come to you. Every decision they make is recorded with their name.</p><div class="fg">${fld('dg-t', 'Delegate to', `<select id="dg-t">${people.map(e => `<option value="${e.id}">${esc(e.name)} · ${esc(e.title)}</option>`).join('')}</select>`, 'full')}${fld('dg-s', 'From', `<input id="dg-s" type="date" value="${iso(TODAY)}">`)}${fld('dg-e', 'Until', `<input id="dg-e" type="date" value="${iso(addWork(iso(TODAY), 5) ? new Date(addWork(iso(TODAY), 5) + 'T00:00:00') : TODAY)}">`)}</div>
   ${
     S.deleg.filter(d => d.from === me().id).length
       ? `<h3 class="dsub">Current delegations</h3><div class="list">${S.deleg
           .filter(d => d.from === me().id)
           .map(
             d =>
               `<div class="li"><div class="grow"><b>${esc(emp(d.to).name)}</b><div class="muted small">${fdate(d.start)} to ${fdate(d.end)}</div></div><button class="btn sm" onclick="delegEnd(${d.id})">End</button></div>`
           )
           .join('')}</div>`
       : ''
   }`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="delegSave()">Delegate</button>`
  );
}
function delegSave() {
  const to = $('#dg-t').value,
    s = $('#dg-s').value,
    e = $('#dg-e').value;
  if (
    ![
      chk('dg-s', !!s, 'Choose a start date'),
      chk('dg-e', !!e && e >= s, 'End date must be on or after the start')
    ].every(Boolean)
  )
    return;
  S.deleg.push({
    id: Date.now(),
    from: me().id,
    to,
    start: s,
    end: e,
    by: me().name,
    at: new Date().toISOString()
  });
  audit('Approvals delegated', me().name, {
    res: 'approvals',
    to: emp(to).name + ', ' + fdate(s) + ' to ' + fdate(e)
  });
  persist();
  closeModal();
  render();
  toast('Delegated to ' + emp(to).name);
}
function delegEnd(id) {
  const d = S.deleg.find(x => x.id === id);
  S.deleg = S.deleg.filter(x => x.id !== id);
  audit('Delegation ended', me().name, { res: 'approvals', to: emp(d.to).name });
  persist();
  closeModal();
  render();
  toast('Delegation ended');
}
