/* =====================================================================
   v38 · payroll: validation, variance, maker-checker, lock and payment states
   ===================================================================== */
S.pay = Object.assign(
  { prep: null, appr: null, locked: false, ack: {}, log: [], bank: null, res: {} },
  S.pay || {}
);
const CYC = { a: '2026-10-01', b: '2026-10-31', n: 'October 2026' };
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'];
(function seedBank() {
  employees.forEach(e => {
    if (e.bank !== undefined) return;
    if (e.id === 'E-1016') {
      e.bank = null;
      return;
    }
    const h = [...e.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7);
    e.bank = {
      b: e.id === 'E-1003' ? 'HDFC Bank' : BANKS[h % BANKS.length],
      l4: e.id === 'E-1003' ? '4821' : String(1000 + (h % 8999)),
      ifsc: 'HDFC0001234'.replace('HDFC', ['HDFC', 'ICIC', 'SBIN', 'UTIB', 'KKBK'][h % 5]),
      fail: e.id === 'E-1012'
    };
  });
  const m = emp('E-1010');
  if (m && m.panMissing === undefined) m.panMissing = true;
})();
const PREV = { 'E-1011': { lop: 1 }, 'E-1013': { ctc: 420000 }, 'E-1015': { ctc: 372000 } };
function prevSlip(e) {
  if (e.join >= CYC.a) return null;
  const p = PREV[e.id] || {},
    s = slipWith(p.ctc || e.ctc, ST()),
    lop = ((p.lop || 0) * s.m) / 30;
  return { ...s, lop, net: s.net - lop };
}
const payTot = (l, prev) =>
  l.reduce(
    (a, e) => {
      const s = prev ? prevSlip(e) : slip(e.ctc);
      if (!s) return a;
      a.g += s.m;
      a.d += s.ded + (s.lop || 0);
      a.n += s.net;
      a.c++;
      return a;
    },
    { g: 0, d: 0, n: 0, c: 0 }
  );
const pctD = (a, b) => (b ? ((a - b) / b) * 100 : 0);
const fpct = x => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x).toFixed(1) + '%';
function payLog(act, note) {
  const u = me();
  S.pay.log.unshift({
    at: new Date().toISOString(),
    by: u.name,
    id: u.id,
    as: persona().n,
    act,
    note: note || ''
  });
  if (S.pay.log.length > 40) S.pay.log.length = 40;
  audit('Payroll: ' + act, CYC.n + ' payroll', { res: 'payroll', reason: note || '' });
  persist();
}
function payCheck() {
  const err = [],
    warn = [],
    L = live(),
    th = W().varPct,
    s = n => (n === 1 ? '' : 's');
  const rg = S.regs.filter(r => r.status === 'Pending' && r.date >= CYC.a && r.date <= CYC.b);
  if (rg.length)
    err.push({
      id: 'reg',
      title: `${rg.length} attendance correction${s(rg.length)} still pending`,
      detail: rg.map(r => emp(r.emp).name + ' · ' + fshort(r.date)).join('; '),
      link: ['Open the first', `reqDetail('reg',${rg[0].id})`]
    });
  const lv = S.leaves.filter(l => l.status === 'Pending' && l.to >= CYC.a && l.from <= CYC.b);
  if (lv.length)
    err.push({
      id: 'lv',
      title: `${lv.length} leave request${s(lv.length)} in ${CYC.n.split(' ')[0]} still pending`,
      detail:
        lv.map(l => emp(l.emp).name + ' · ' + fshort(l.from)).join('; ') +
        '. Pending leave changes pay days.',
      link: ['Open the first', `reqDetail('leave',${lv[0].id})`]
    });
  L.filter(e => !e.bank).forEach(e =>
    err.push({
      id: 'bank-' + e.id,
      title: `${e.name} has no bank account on file`,
      detail: 'Salary cannot be paid until bank details are added.',
      link: ['Add bank details', `bankEdit('${e.id}')`]
    })
  );
  L.filter(e => slip(e.ctc).net <= 0).forEach(e =>
    err.push({
      id: 'neg-' + e.id,
      title: `${e.name} has zero or negative net pay`,
      detail: 'Check deductions against salary.',
      link: ['Open profile', `empProfile('${e.id}','job')`]
    })
  );
  const nj = L.filter(e => e.join >= CYC.a && e.join <= CYC.b);
  if (nj.length)
    warn.push({
      id: 'new',
      title: `${nj.length} new joiner${s(nj.length)}: first payroll`,
      detail:
        nj.map(e => e.name + ' (joined ' + fshort(e.join) + ')').join('; ') +
        '. Check joining forms and documents.',
      link: ['Open joiners', "go('lifecycle')"]
    });
  L.filter(e => e.panMissing).forEach(e =>
    warn.push({
      id: 'pan-' + e.id,
      title: `${e.name}: PAN not on file`,
      detail: 'TDS may be deducted at a higher rate until it is added.',
      link: ['Open profile', `empProfile('${e.id}','docs')`]
    })
  );
  L.forEach(e => {
    const p = prevSlip(e);
    if (!p) return;
    const c = slip(e.ctc),
      v = pctD(c.net, p.net);
    if (Math.abs(v) >= th)
      warn.push({
        id: 'var-' + e.id,
        title: `${e.name}: net pay ${fpct(v)} vs last month`,
        detail: `${inr(p.net)} → ${inr(c.net)}. Alert threshold is ${th}%.`,
        link: ['See what changed', `payVariance('${e.id}')`]
      });
  });
  return { err, warn };
}
function payVariance(id) {
  const e = emp(id),
    p = prevSlip(e),
    c = slip(e.ctc);
  if (!canField('salary', id)) {
    toast('Access denied. Salary details are restricted.', null, 'err');
    return;
  }
  if (!p) {
    overlay(
      'Pay change',
      `<p>${esc(e.name)} joined on ${fdate(e.join)}, so there is no earlier payroll to compare with.</p>`,
      `<button class="btn" onclick="closeModal()">Close</button>`
    );
    return;
  }
  const R = [
    ['Basic salary', p.basic, c.basic],
    ['House rent allowance', p.hra, c.hra],
    ['Special allowance', p.special, c.special],
    ['Provident fund', -p.pf, -c.pf],
    ['ESI', -p.esi, -c.esi],
    ['Professional tax', -p.pt, -c.pt],
    ['Income tax (TDS)', -p.tds, -c.tds],
    ['Unpaid days', -(p.lop || 0), 0]
  ].filter(r => Math.round(r[1]) || Math.round(r[2]));
  overlay(
    'What changed in net pay',
    `<div class="person" style="margin-bottom:12px">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)}</span></div></div>
   ${rtable(
     [
       { h: 'Component', keep: 1 },
       { h: 'September', c: 'num' },
       { h: 'October', c: 'num' },
       { h: 'Change', c: 'num' }
     ],
     [
       ...R.map(r => ({
         cells: [
           r[0],
           inr(r[1]),
           inr(r[2]),
           `<span class="${Math.round(r[2] - r[1]) ? '' : 'muted'}">${Math.round(r[2] - r[1]) ? (r[2] - r[1] > 0 ? '+' : '−') + inr(Math.abs(r[2] - r[1])) : '–'}</span>`
         ]
       })),
       {
         cells: [
           '<b>Net pay</b>',
           `<b>${inr(p.net)}</b>`,
           `<b>${inr(c.net)}</b>`,
           `<b>${fpct(pctD(c.net, p.net))}</b>`
         ]
       }
     ],
     {}
   )}
   <p class="muted small" style="margin-top:10px">September figures are sample data in this demo.${PREV[id] && PREV[id].ctc ? ' Salary was revised from ' + inr(PREV[id].ctc) + ' to ' + inr(e.ctc) + ' a year.' : ''}${PREV[id] && PREV[id].lop ? ' One unpaid day was deducted in September.' : ''}</p>`,
    `<button class="btn" onclick="closeModal()">Close</button>`,
    { wide: true }
  );
}
function bankEdit(id) {
  const e = emp(id);
  if (!need('employees', 'edit', 'edit bank details')) return;
  const b = e.bank || {};
  overlay(
    'Bank details',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)}. Only the last 4 digits are kept in this demo.</p><div class="fg">${fld('bk-b', 'Bank', `<select id="bk-b">${BANKS.map(x => `<option ${b.b === x ? 'selected' : ''}>${x}</option>`).join('')}</select>`, 'full')}${fld('bk-a', 'Account number', `<input id="bk-a" inputmode="numeric" autocomplete="off" placeholder="9 to 18 digits">`)}${fld('bk-i', 'IFSC', `<input id="bk-i" value="${esc(b.ifsc || '')}" placeholder="HDFC0001234" style="text-transform:uppercase">`)}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="bankSave('${id}')">Save</button>`
  );
}
function bankSave(id) {
  const a = $('#bk-a').value.replace(/\s/g, ''),
    i = $('#bk-i').value.trim().toUpperCase();
  if (
    ![
      chk('bk-a', /^\d{9,18}$/.test(a), 'Enter 9 to 18 digits'),
      chk('bk-i', /^[A-Z]{4}0[A-Z0-9]{6}$/.test(i), 'Format like HDFC0001234')
    ].every(Boolean)
  )
    return;
  const e = emp(id);
  e.bank = { b: $('#bk-b').value, l4: a.slice(-4), ifsc: i, fail: false };
  audit('Bank details updated', e.name, { res: 'employees', to: '····' + a.slice(-4) });
  persist();
  closeModal();
  render();
  toast(
    'Bank details saved' +
      (S.pay.res[id] && S.pay.res[id].st === 'Failed' ? '. You can retry the payment' : '')
  );
}
/* ---------- the run ---------- */
const PSTAT5 = ['Not started', 'In review', 'Awaiting approval', 'Approved', 'Paid'];
const payState = () =>
  S.payStep >= 4
    ? 'Paid'
    : S.pay.bank
      ? S.pay.bank.state
      : ['Not started', 'Prepared for review', 'Prepared', 'Approved'][S.payStep];
const preparer = () => S.pay.prep && S.pay.prep.by;
function payLock() {
  if (!need('payroll', 'edit', 'lock attendance')) return;
  S.payStep = 1;
  payLog('Attendance locked');
  render();
  toast('Attendance locked for ' + CYC.n);
}
function paySubmit() {
  if (!need('payroll', 'edit', 'submit payroll')) return;
  const c = payCheck();
  if (c.err.length) {
    toast(
      `${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} must be fixed first`,
      null,
      'err'
    );
    return;
  }
  const open = c.warn.filter(w => !S.pay.ack[w.id]);
  if (open.length) {
    toast(`Acknowledge the ${open.length} warning${open.length > 1 ? 's' : ''} first`, null, 'err');
    return;
  }
  overlay(
    'Submit payroll for approval',
    `<p>${live().length} payslips, total net payout <b>${inr(payTot(live()).n)}</b>.</p><p class="muted small" style="margin-top:8px">Someone other than you must approve it. You are recorded as the preparer: <b>${esc(me().name)}</b>.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="paySubmitGo()">Submit for approval</button>`
  );
}
function paySubmitGo() {
  S.pay.prep = { by: me().name, id: me().id, at: new Date().toISOString() };
  S.payStep = 2;
  payLog('Submitted for approval', 'Prepared by ' + me().name);
  closeModal();
  render();
  toast('Submitted. Waiting for a second person to approve');
}
function payApprove() {
  if (!need('payroll', 'approve', 'approve payroll')) return;
  if (S.pay.prep && S.pay.prep.id === me().id) {
    toast(
      'The approver must be a different person from the preparer (' + S.pay.prep.by + ')',
      null,
      'err'
    );
    return;
  }
  const c = payCheck();
  if (c.err.length) {
    overlay(
      'Approval stopped',
      `<p>${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} appeared after submission. Fix ${c.err.length > 1 ? 'them' : 'it'} or return the payroll for changes.</p><div class="list" style="margin-top:10px">${c.err.map(x => `<div class="li"><span class="ai t-red">${ic('alert', 18)}</span><div class="grow"><b>${esc(x.title)}</b><div class="muted small">${esc(x.detail)}</div></div><button class="btn sm" onclick="closeModal();${x.link[1]}">${x.link[0]}</button></div>`).join('')}</div>`,
      `<button class="btn" onclick="closeModal()">Close</button><button class="btn" onclick="closeModal();payReturn()">Return for changes</button>`
    );
    return;
  }
  overlay(
    'Approve ' + CYC.n + ' payroll',
    `<p>Approving locks ${live().length} payslips with a total net payout of <b>${inr(payTot(live()).n)}</b>. Prepared by <b>${esc(S.pay.prep.by)}</b>.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="payApproveGo()">Approve and lock</button>`
  );
}
function payApproveGo() {
  S.pay.appr = { by: me().name, id: me().id, at: new Date().toISOString() };
  S.pay.locked = true;
  S.payStep = 3;
  payLog('Approved and locked', 'Approved by ' + me().name);
  closeModal();
  render();
  toast('Payroll approved and locked');
}
function payReturn() {
  if (!need('payroll', 'approve', 'return payroll')) return;
  overlay(
    'Return for changes',
    `<div class="fg">${fld('pr-n', 'What needs to change (required)', `<textarea id="pr-n" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="payReturnGo()">Return payroll</button>`
  );
}
function payReturnGo() {
  const t = $('#pr-n').value.trim();
  if (!chk('pr-n', !!t, 'Say what needs to change')) return;
  S.pay.prep = null;
  S.payStep = 1;
  S.pay.ack = {};
  payLog('Returned for changes', t);
  closeModal();
  render();
  toast('Returned to the preparer');
}
function payReopen() {
  if (!need('payroll', 'edit', 'reopen payroll')) return;
  if (S.pay.bank) {
    toast('The bank file was already generated. Reopening is no longer possible', null, 'err');
    return;
  }
  overlay(
    'Reopen payroll',
    `<p class="muted small" style="margin-bottom:10px">Reopening unlocks the register, removes the approval and needs a new approval. It is recorded in the audit log.</p><div class="fg">${fld('ro-n', 'Reason (required)', `<textarea id="ro-n" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="payReopenGo()">Reopen</button>`
  );
}
function payReopenGo() {
  const t = $('#ro-n').value.trim();
  if (!chk('ro-n', !!t, 'A reason is required to reopen a locked payroll')) return;
  S.pay.appr = null;
  S.pay.prep = null;
  S.pay.locked = false;
  S.pay.ack = {};
  S.payStep = 1;
  payLog('Reopened', t);
  closeModal();
  render();
  toast('Payroll reopened');
}
function payBankFile() {
  if (!need('payroll', 'edit', 'generate the bank file')) return;
  const t = payTot(live());
  S.pay.bank = {
    ref: 'SAL-OCT26-001',
    at: new Date().toISOString(),
    by: me().name,
    count: t.c,
    total: t.n,
    state: 'Submitted'
  };
  S.pay.res = {};
  payLog(
    'Bank file generated',
    `${S.pay.bank.ref} · ${t.c} payments · ${inr(t.n)} (not yet confirmed by the bank)`
  );
  render();
  toast('Bank file generated. Payment is not confirmed until the bank responds');
}
function payBankCSV() {
  if (!need('payroll', 'export', 'download the bank file')) return;
  audit('Export', 'Bank file ' + S.pay.bank.ref, { res: 'payroll' });
  saveFile(
    S.pay.bank.ref + '.csv',
    toCSV(
      ['Ref', 'Name', 'Bank', 'IFSC', 'Account', 'Net amount'],
      live()
        .filter(e => e.bank)
        .map(e => [
          S.pay.bank.ref,
          e.name,
          e.bank.b,
          e.bank.ifsc,
          '········' + e.bank.l4,
          Math.round(slip(e.ctc).net)
        ])
    )
  );
}
function paySimBank() {
  if (!need('payroll', 'edit', 'record the bank response')) return;
  S.pay.bank.state = 'Processing';
  live().forEach(e => {
    S.pay.res[e.id] =
      e.bank && e.bank.fail ? { st: 'Failed', why: 'Account closed' } : { st: 'Paid', why: '' };
  });
  const f = Object.values(S.pay.res).filter(x => x.st === 'Failed').length;
  S.pay.bank.state = f ? 'Part paid' : 'Paid';
  if (!f) {
    S.payStep = 4;
  }
  payLog(
    'Bank response received (simulated)',
    f ? `${f} payment failed` : 'All payments confirmed'
  );
  render();
  toast(f ? `${f} payment failed. See reconciliation` : 'All payments confirmed');
}
function payRetry() {
  if (!need('payroll', 'edit', 'retry payments')) return;
  let n = 0,
    still = 0;
  Object.keys(S.pay.res).forEach(id => {
    if (S.pay.res[id].st === 'Failed') {
      const e = emp(id);
      if (e.bank && !e.bank.fail) {
        S.pay.res[id] = { st: 'Paid', why: '' };
        n++;
      } else still++;
    }
  });
  if (!Object.values(S.pay.res).some(x => x.st === 'Failed')) {
    S.pay.bank.state = 'Paid';
    S.payStep = 4;
  }
  payLog(
    'Retry run',
    `${n} paid${still ? ', ' + still + ' still failing (update bank details first)' : ''}`
  );
  render();
  toast(
    n
      ? `${n} payment${n > 1 ? 's' : ''} confirmed`
      : 'Nothing to retry until bank details are updated'
  );
}
function payRow(e) {
  const c = slip(e.ctc),
    p = prevSlip(e),
    v = p ? pctD(c.net, p.net) : null,
    res = S.pay.res[e.id],
    sal = canField('salary', e.id);
  return {
    click: sal ? `payslipDetail('${e.id}')` : '',
    cells: [
      person(e),
      e.id,
      e.dept,
      sal ? inr(c.m) : restricted(),
      sal ? inr(c.ded) : restricted(),
      sal ? `<b>${inr(c.net)}</b>` : restricted(),
      !sal
        ? '–'
        : v == null
          ? chip('New joiner', 'info', 1)
          : Math.abs(v) >= W().varPct
            ? `<button class="link" onclick="event.stopPropagation();payVariance('${e.id}')">${fpct(v)}</button>`
            : `<span class="muted">${fpct(v)}</span>`,
      S.payStep >= 3 && S.pay.bank
        ? res
          ? chip(res.st, res.st === 'Paid' ? 'ok' : 'bad') +
            (res.why ? ` <span class="muted small">${esc(res.why)}</span>` : '')
          : chip('Pending', 'mute')
        : ''
    ]
  };
}
function payrollOnly() {
  const st = S.payStep,
    c = payCheck(),
    L = live(),
    tot = payTot(L),
    pt = payTot(
      L.filter(e => prevSlip(e)),
      true
    ),
    cur = payTot(L.filter(e => prevSlip(e))),
    A = can('payroll', 'approve'),
    P = can('payroll', 'edit'),
    same = S.pay.prep && S.pay.prep.id === me().id;
  const btn =
    st === 0
      ? P
        ? `<button class="btn primary" onclick="payLock()">Lock attendance</button>`
        : ''
      : st === 1
        ? P
          ? `<button class="btn primary" onclick="paySubmit()">Submit for approval</button>`
          : ''
        : st === 2
          ? A && !same
            ? `<button class="btn" onclick="payReturn()">Return for changes</button><button class="btn primary" onclick="payApprove()">Approve payroll</button>`
            : `<span class="muted small" style="align-self:center">${same ? 'A different person must approve. You prepared it.' : 'Waiting for an approver'}</span>`
          : st === 3
            ? !S.pay.bank
              ? `${S.pay.locked && P ? `<button class="btn" onclick="payReopen()">Reopen</button>` : ''}${P ? `<button class="btn primary" onclick="payBankFile()">Generate bank file</button>` : ''}`
              : S.pay.bank.state === 'Submitted'
                ? P
                  ? `<button class="btn primary" onclick="paySimBank()">Record bank response ${demoChip()}</button>`
                  : ''
                : P
                  ? `<button class="btn primary" onclick="payRetry()">Retry failed payments</button>`
                  : ''
            : `<button class="btn" disabled>${ic('check', 16)}Payment confirmed</button>`;
  const rep = (x, sev) =>
    `<div class="li chk ${sev}" style="align-items:flex-start"><span class="ai ${sev === 'e' ? 't-red' : 't-amber'}">${ic('alert', 18)}</span><div class="grow"><b>${esc(x.title)}</b><div class="muted small">${esc(x.detail)}</div>${sev === 'w' && st <= 2 ? `<label class="ackl"><input type="checkbox" ${S.pay.ack[x.id] ? 'checked' : ''} onchange="S.pay.ack['${x.id}']=this.checked;persist();render()"> I have reviewed this</label>` : ''}</div><button class="btn sm" onclick="${x.link[1]}">${x.link[0]}</button></div>`;
  const dlt = (a, b, good) => (pt[b] ? delta(fpct(pctD(cur[a], pt[b])), good, 'up') : '');
  return (
    ph(
      'Payroll',
      `${CYC.n} · cycle 1–31 Oct`,
      `<button class="btn" onclick="openSub('pr','me')">My payslip</button>${btn}`
    ) +
    `<div class="card"><div class="steps" role="list" aria-label="Payroll progress">${PSTEPS.map((s, i) => `<div class="step ${i < st ? 'done' : i === st ? 'cur' : ''}" role="listitem" ${i === st ? 'aria-current="step"' : ''}><span class="sn">${i < st ? ic('check', 14) : i + 1}</span><span class="sl">${s}</span></div>`).join('')}</div><div class="mo">Step ${Math.min(st + 1, 4)} of 4 · ${st < 4 ? PSTEPS[st] : 'Complete'} · ${payState()}${S.pay.prep ? ` · prepared by ${esc(S.pay.prep.by)}` : ''}${S.pay.appr ? ` · approved by ${esc(S.pay.appr.by)}` : ''}${S.pay.locked ? ' · locked' : ''}</div></div>
  <div class="row c4">${kpi({ l: 'Gross payroll', v: inrC(tot.g), icon: 'wallet', tone: 't-brand', p: dlt('g', 'g', null), d: 'vs September · sample comparison', spark: trend(tot.g, 7, 4, 0.06), sample: 1 })}${kpi({ l: 'Deductions', v: inrC(tot.d), icon: 'receipt', tone: 't-amber', p: dlt('d', 'd', null), d: 'PF, ESI, PT and TDS', spark: trend(tot.d, 7, 5, 0.05), sample: 1 })}${kpi({ l: 'Net payable', v: inrC(tot.n), icon: 'check', tone: 't-green', p: dlt('n', 'n', null), d: L.length + ' employees · after deductions', spark: trend(tot.n, 7, 6, 0.06), sample: 1 })}${kpi({ icon: 'clock', tone: 't-violet', l: 'Status', v: `<span style="font-size:16px">${chip(payState(), ['mute', 'warn', 'warn', 'info', 'ok'][st])}</span>`, d: 'Pay date 30 Oct', bar: ((st + 1) / PSTAT5.length) * 100, bl: `Step ${st + 1} of ${PSTAT5.length}` })}</div>
  ${st <= 2 ? `<div class="card" id="paychecks"><div class="head"><div><h2>Pre-run checks</h2><p class="sub">${c.err.length ? `<b style="color:var(--red-ink)">${c.err.length} blocking</b>` : 'No blocking issues'} · ${c.warn.length} warning${c.warn.length === 1 ? '' : 's'}${c.warn.length ? ` · ${c.warn.filter(w => S.pay.ack[w.id]).length} acknowledged` : ''}</p></div>${c.err.length ? chip('Cannot approve yet', 'bad', 1) : chip('Ready', 'ok', 1)}</div>${c.err.length || c.warn.length ? `<div class="list">${c.err.map(x => rep(x, 'e')).join('')}${c.warn.map(x => rep(x, 'w')).join('')}</div>` : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>All checks passed</b></div>`}</div>` : ''}
  <div class="row c21"><div class="card"><div class="head"><div><h2>Employee pay</h2><p class="sub">${L.length} employees · variance is against September (sample data)</p></div></div>${rtable(
    [
      { h: 'Employee', keep: 1 },
      { h: 'ID', xm: 1 },
      { h: 'Department', xm: 1 },
      { h: 'Gross', c: 'num' },
      { h: 'Deductions', c: 'num', xm: 1 },
      { h: 'Net pay', c: 'num' },
      { h: 'Change', xm: 1 },
      { h: st >= 3 && S.pay.bank ? 'Payment' : '', xm: 1 }
    ],
    L.map(payRow)
  )}</div>
  <div class="stack">${
    st >= 3
      ? `<div class="card"><div class="head"><h2>Payment</h2>${chip(payState(), S.pay.bank ? (S.pay.bank.state === 'Paid' ? 'ok' : S.pay.bank.state === 'Part paid' ? 'bad' : 'warn') : 'info')}</div>${
          S.pay.bank
            ? `<div class="list"><div class="li"><span class="muted grow">Bank file</span><b>${S.pay.bank.ref}</b></div><div class="li"><span class="muted grow">Payments</span><b>${S.pay.bank.count} · ${inr(S.pay.bank.total)}</b></div><div class="li"><span class="muted grow">Generated</span><b>${ftime(S.pay.bank.at)}</b></div></div>
     ${
       S.pay.bank.state === 'Submitted'
         ? `<p class="note" style="margin-top:10px">Bank file generated. <b>Payment is not confirmed</b> until the bank responds.</p>`
         : (() => {
             const r = Object.entries(S.pay.res),
               pd = r.filter(x => x[1].st === 'Paid'),
               fl = r.filter(x => x[1].st === 'Failed');
             return `<h3 class="dsub">Reconciliation</h3><div class="list"><div class="li"><span class="grow">Paid</span><b>${pd.length} · ${inr(pd.reduce((a, x) => a + slip(emp(x[0]).ctc).net, 0))}</b></div><div class="li"><span class="grow">Failed</span><b style="color:${fl.length ? 'var(--red-ink)' : 'inherit'}">${fl.length} · ${inr(fl.reduce((a, x) => a + slip(emp(x[0]).ctc).net, 0))}</b></div></div>${fl.map(x => `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(emp(x[0]).name)}</b><div class="muted small">${esc(x[1].why)}</div></div><button class="btn sm" onclick="bankEdit('${x[0]}')">Update bank details</button></div>`).join('')}`;
           })()
     }
     <div class="acts" style="margin-top:10px"><button class="btn sm" onclick="payBankCSV()">${ic('download', 14)}Bank file CSV</button></div>`
            : `<p class="muted small">${S.pay.locked ? 'Payroll is locked. Generate the bank file to start payment.' : ''}</p>`
        }</div>`
      : ''
  }
   <div class="card"><div class="head"><div><h2>Payroll history</h2><p class="sub">Every step, with who did it</p></div></div>${
     S.pay.log.length
       ? `<div class="list">${S.pay.log
           .slice(0, 8)
           .map(
             h =>
               `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(h.act)}</b><div class="muted small">${esc(h.by)} · ${ftime(h.at)}</div>${h.note ? `<div class="small">${esc(h.note)}</div>` : ''}</div></div>`
           )
           .join('')}</div>`
       : '<div class="empty">No steps recorded yet.</div>'
   }</div></div></div>`
  );
}
function payrollGuard() {
  return (
    S.role === 'employee' ||
    S.tab.pr === 'me' ||
    (!can('payroll', 'edit') && !can('payroll', 'approve') && scopeOf('payroll') === 'own')
  );
}
function payroll() {
  if (payrollGuard()) return payrollOld();
  return can('payroll', 'view') ? payrollOnly() : deniedPage();
}
guardFns([['payslipDetail', 'payroll', 'view', 'open pay details']]);
