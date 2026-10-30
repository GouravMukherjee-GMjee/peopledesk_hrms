/* =============== detail panels for table rows =============== */
const dRow = (a, b) =>
  `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
const whoHead = e =>
  `<div class="person" style="margin-bottom:12px">${av(e.name, 46)}<div><b style="font-size:16px">${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span></div></div>`;
function detail(title, o) {
  overlay(
    title,
    `${o.head || ''}${o.chips ? `<div class="chips2">${o.chips}</div>` : ''}${o.rows ? `<div class="list" style="margin-top:14px">${o.rows.map(r => dRow(...r)).join('')}</div>` : ''}${o.note ? `<div class="rbox"><b>${o.noteT || 'Notes'}</b><p style="margin-top:6px">${o.note}</p></div>` : ''}${o.tl ? `<h3 class="dsub">${o.tlT || 'Activity'}</h3><div class="tl">${o.tl.map(([a, b]) => `<div class="ev"><span class="pt"></span><div><b>${a}</b><div class="muted small">${esc(b)}</div></div></div>`).join('')}</div>` : ''}${o.body || ''}`,
    `<button class="btn" onclick="closeModal()">Close</button>${o.actions || ''}`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function ticketDetail(id) {
  const t = S.tickets.find(x => x.id === id),
    e = employees.find(x => x.id === t.emp),
    msgs = t.msgs || [];
  detail(id, {
    head: whoHead(e),
    chips: stChip(t.st) + ' ' + chip(t.pr + ' priority', t.pr === 'High' ? 'bad' : 'mute', 1),
    rows: [
      ['Request', esc(t.cat)],
      ['Raised', fdate(t.d)]
    ],
    body: `<h3 class="dsub">Conversation</h3>${msgs.length ? msgs.map(m => `<div class="msg"><b>${esc(m.by)}</b> <small>${esc(m.at)}</small><div>${esc(m.txt)}</div></div>`).join('') : `<p class="muted small" style="margin-bottom:10px">No comments yet.</p>`}<div class="field" style="margin-top:12px"><label for="tm">Add a comment</label><textarea id="tm" rows="2" placeholder="Write a message"></textarea><div class="err" id="tm-e" role="alert"></div></div>`,
    actions: `<button class="btn" onclick="sendTicketMsg('${id}')">Send comment</button>${S.role === 'admin' && t.st !== 'Resolved' ? `<button class="btn primary" onclick="closeModal();resolveTicket('${id}')">Mark resolved</button>` : ''}`
  });
}
function sendTicketMsg(id) {
  const v = $('#tm').value.trim();
  if (!chk('tm', !!v, 'Write a message first')) return;
  const t = S.tickets.find(x => x.id === id);
  (t.msgs = t.msgs || []).push({ by: me().name, at: 'Just now', txt: v });
  if (t.st === 'Submitted' && isMgr()) t.st = 'In progress';
  render();
  ticketDetail(id);
  toast('Comment added');
}
function candDetail(id) {
  const c = S.cands.find(x => x.id === id);
  if (!c) return;
  const first = c.n.split(' ')[0].toLowerCase(),
    ph0 = 9800000000 + hsh(String(c.id), 0, 0, 3) * 7;
  detail('Candidate', {
    head: `<div class="person" style="margin-bottom:12px">${av(c.n, 46)}<div><b style="font-size:16px">${esc(c.n)}</b><span>${esc(c.r)}</span></div></div>`,
    chips: chip(S.stages[c.st], c.st === 4 ? 'ok' : 'info') + ' ' + chip(c.src, 'mute', 1),
    rows: [
      ['Applying for', esc(c.r)],
      ['Source', esc(c.src)],
      ['Email', `${first}.${c.n.split(' ').slice(-1)[0].toLowerCase()}@mail.com`],
      ['Phone', `+91 ${ph0}`]
    ],
    tl: S.stages.slice(0, c.st + 1).map((s, i) => [s, i === c.st ? 'Current stage' : 'Completed']),
    actions: `<button class="btn bad" onclick="rejectCand(${id})">Reject</button>${c.st > 0 ? `<button class="btn" onclick="moveCand(${id},-1);candDetail(${id})">Move back</button>` : ''}${c.st < 4 ? `<button class="btn primary" onclick="moveCand(${id},1);candDetail(${id})">Move to ${S.stages[c.st + 1]}</button>` : ''}`
  });
}
function rejectCand(id) {
  const c = S.cands.find(x => x.id === id);
  confirmBox(
    'Reject this candidate?',
    `${esc(c.n)} will be removed from the hiring pipeline.`,
    'Reject candidate',
    () => {
      const i = S.cands.indexOf(c);
      S.cands.splice(i, 1);
      render();
      toast(c.n + ' removed from the pipeline', () => {
        S.cands.splice(i, 0, c);
        render();
      });
    },
    true
  );
}
function payslipDetail(id) {
  const e = employees.find(x => x.id === id),
    s = slip(e.ctc);
  detail('Payslip · October 2026', {
    head: whoHead(e),
    chips: chip(PSTAT[S.payStep], ['mute', 'warn', 'warn', 'info', 'ok'][S.payStep]),
    rows: [
      ['Basic salary', inr(s.basic)],
      ['House rent allowance', inr(s.hra)],
      ['Special allowance', inr(s.special)],
      ['Gross earnings', `<span style="font-size:16px">${inr(s.m)}</span>`],
      ['Provident fund', inr(s.pf)],
      ['Professional tax', inr(s.pt)],
      ['Income tax (TDS)', inr(s.tds)],
      ['Net pay', `<span style="font-size:18px;color:var(--brand-ink)">${inr(s.net)}</span>`]
    ],
    actions: `<button class="btn primary" onclick="downloadPayslip('${id}','October 2026')">${ic('download', 16)}Download PDF</button>`
  });
}
function courseDetail(i) {
  const c = S.courses[i],
    group = employees.filter(
      e =>
        c.req === 'All staff' ||
        (c.req === 'Plant' && e.type === 'Plant') ||
        (c.req === 'Office' && e.type === 'Office') ||
        (c.req === 'Stores' && e.dept === 'Stores & Logistics') ||
        (c.req === 'Maintenance' && e.dept === 'Maintenance')
    );
  const pr = e => {
      if (e.id === 'E-1003') return S.mine[c.n] || 0;
      const v = Math.max(0, Math.min(100, c.done + ((hsh(e.id, 0, 0, i + 7) % 61) - 30)));
      return v >= 94 ? 100 : v;
    },
    list = group.map(e => [e, pr(e)]).sort((a, b) => a[1] - b[1]),
    pending = list.filter(x => x[1] < 100);
  detail(c.n, {
    chips:
      chip(c.req, 'info', 1) +
      ' ' +
      (c.done < 70
        ? chip('Behind', 'bad')
        : c.done < 85
          ? chip('Needs attention', 'warn')
          : chip('On track', 'ok')),
    rows: [
      ['Applies to', c.req],
      ['Completion', c.done + '%'],
      ['Next expiry', fdate(c.exp)],
      ['People assigned', group.length]
    ],
    body: `<h3 class="dsub">${pending.length} still to complete</h3><div class="list">${list
      .slice(0, 8)
      .map(
        ([e, p]) =>
          `<div class="li"><div class="grow">${person(e, e.dept)}</div>${p >= 100 ? chip('Complete', 'ok') : `<div style="width:90px"><div class="bar ${p < 50 ? 'a' : ''}"><i style="width:${p}%"></i></div></div><b class="small" style="width:34px;text-align:right">${p}%</b>`}</div>`
      )
      .join('')}</div>`,
    actions: pending.length
      ? `<button class="btn primary" onclick="closeModal();toast('Reminder sent to ${pending.length} ${pending.length === 1 ? 'person' : 'people'}')">Remind ${pending.length} ${pending.length === 1 ? 'person' : 'people'}</button>`
      : ''
  });
}
function annView(i) {
  const a = ANN[i];
  detail(a[0], {
    chips: chip('Posted ' + a[2], 'mute', 1),
    note: esc(a[1]) + ' Please speak to your manager or HR if you have any questions.',
    noteT: 'Announcement'
  });
}
