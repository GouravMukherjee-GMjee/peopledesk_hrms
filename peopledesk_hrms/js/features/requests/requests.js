/* =============== requests =============== */
function requests() {
  const t = curTab('rq', 'claims'),
    u = me();
  const sees = x =>
    S.role === 'admin' ||
    x.emp === u.id ||
    (S.role === 'manager' && scoped().some(e => e.id === x.emp));
  let body = '',
    act = '';
  if (t === 'claims') {
    const list = S.claims.filter(sees);
    act = `<button class="btn primary" onclick="addClaim()">${ic('plus', 16)}New claim</button>`;
    body = rtable(
      [
        { h: 'Employee', sel: isMgr() && 'claim' },
        { h: 'Category' },
        { h: 'Note', xm: 1 },
        { h: 'Date' },
        { h: 'Amount', c: 'num' },
        { h: 'Status' },
        { h: '', act: 1 }
      ],
      list.map(c => {
        const e = employees.find(x => x.id === c.emp);
        return {
          sid: isMgr() && c.emp !== me().id && c.st === 'Pending' ? c.id : null,
          click: `claimDetail(${c.id})`,
          cells: [
            person(e),
            c.cat,
            esc(c.note || '–'),
            fdate(c.date),
            inr(c.amt),
            stChip(c.st),
            isMgr() && c.st === 'Pending' && c.emp !== u.id
              ? `<button class="btn ok sm" onclick="event.stopPropagation();decideClaim(${c.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decideClaim(${c.id},'Rejected')">Reject</button>`
              : ''
          ]
        };
      }),
      { et: 'No claims yet', em: 'Add a reimbursement claim with the button above.' }
    );
  } else if (t === 'help') {
    const list = S.tickets.filter(x => S.role === 'admin' || x.emp === u.id);
    act = `<button class="btn primary" onclick="addTicket()">${ic('plus', 16)}New request</button>`;
    body = rtable(
      [
        { h: 'Ref' },
        { h: 'Request' },
        { h: 'Raised by' },
        { h: 'Priority' },
        { h: 'Status' },
        { h: '', act: 1 }
      ],
      list.map(x => {
        const e = employees.find(y => y.id === x.emp);
        return {
          click: `ticketDetail('${x.id}')`,
          cells: [
            `<b>${x.id}</b>`,
            x.cat,
            esc(e.name),
            chip(x.pr, x.pr === 'High' ? 'bad' : 'mute', 1),
            stChip(x.st),
            S.role === 'admin' && x.st !== 'Resolved'
              ? `<button class="btn sm" onclick="event.stopPropagation();resolveTicket('${x.id}')">Mark resolved</button>`
              : ''
          ]
        };
      }),
      { et: 'No requests', em: 'Raise a request for letters, IT or HR help.' }
    );
  } else {
    body = `<div class="row c2"><div><h2 style="margin-bottom:10px">Company policies</h2><div class="list">${[
      ['handbook', 'Employee handbook'],
      ['leave', 'Leave and attendance policy'],
      ['conduct', 'Code of conduct'],
      ['posh', 'POSH policy'],
      ['safety', 'Plant safety manual']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button></div>`
      )
      .join('')}</div></div>
    <div><h2 style="margin-bottom:10px">My documents</h2><div class="list">${[
      ['offer', 'Offer letter'],
      ['appoint', 'Appointment letter'],
      ['form16', 'Form 16 · FY 2025-26'],
      ['idcard', 'ID card copy']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-teal" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button> <button class="btn sm ico" onclick="downloadDoc('${k}')" aria-label="Download ${n}" title="Download PDF">${ic('download', 14)}</button></div>`
      )
      .join('')}</div></div></div>`;
  }
  return (
    ph('Requests', 'Claims, helpdesk and documents', act) +
    `<div class="card"><div class="head">${tabs(
      'rq',
      [
        ['claims', 'Expense claims'],
        ['help', 'Helpdesk'],
        ['docs', 'Documents']
      ],
      'claims'
    )}</div>${body}</div>`
  );
}
function addClaim() {
  overlay(
    'New expense claim',
    `<div class="fg">${fld('cc', 'Category', '<select id="cc"><option>Travel</option><option>Meals</option><option>Fuel</option><option>Medical</option><option>Internet</option><option>Other</option></select>')}${fld('ca', 'Amount (₹)', '<input id="ca" type="number" min="1" inputmode="numeric">')}${fld('cd', 'Expense date', `<input id="cd" type="date" value="${iso(NOW)}">`)}${fld('cn2', 'Note', '<input id="cn2" placeholder="What was this for?">')}</div><p class="hint">Attach receipts in the live version.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveClaim()">Submit claim</button>`
  );
}
function saveClaim() {
  const a = +$('#ca').value,
    n = $('#cn2').value.trim();
  if (
    ![chk('ca', a > 0, 'Enter the amount in rupees'), chk('cn2', !!n, 'Add a short note')].every(
      Boolean
    )
  )
    return;
  S.claims.unshift({
    id: Date.now(),
    emp: me().id,
    cat: $('#cc').value,
    amt: a,
    date: $('#cd').value,
    note: n,
    st: 'Pending'
  });
  closeModal();
  render();
  toast('Claim submitted for approval');
}
function addTicket() {
  overlay(
    'New request',
    `<div class="fg">${fld('tc', 'What do you need?', '<select id="tc"><option>Salary certificate</option><option>Experience letter</option><option>Address proof letter</option><option>ID card replacement</option><option>IT support</option><option>Payroll query</option><option>Other</option></select>', 'full')}${fld('tp', 'Priority', '<select id="tp"><option>Normal</option><option>High</option></select>')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveTicket()">Submit request</button>`
  );
}
function saveTicket() {
  S.tickets.unshift({
    id: 'REQ-' + (119 + S.tickets.length - 3),
    emp: me().id,
    cat: $('#tc').value,
    pr: $('#tp').value,
    st: 'Submitted',
    d: iso(NOW)
  });
  closeModal();
  S.tab.rq = 'help';
  render();
  toast('Request submitted to HR');
}
function resolveTicket(id) {
  const t = S.tickets.find(x => x.id === id),
    p = t.st;
  t.st = 'Resolved';
  render();
  toast(id + ' resolved', () => {
    t.st = p;
    render();
  });
}
