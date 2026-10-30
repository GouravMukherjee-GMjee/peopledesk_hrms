/* =============== card title icons ===============
   Puts a consistent icon chip before every card title (".card .head h2").
   Matching is by keyword so new cards pick up a sensible icon without extra wiring. */
const CARD_ICON = [
  [/payslip|salary|pay\b|payment|payroll|bank/i, 'wallet'],
  [/leave|holiday|calendar|attendance|punch|rest between/i, 'cal'],
  [/shift|my day|today|clock/i, 'clock'],
  [/team|who.s out|people|workforce|employee|joiners|exits|departments|accounts|role|personal|employment/i, 'users'],
  [/approval|attention|assigned|waiting|requests|corrections|checks/i, 'approve'],
  [/announce|celebrat|notif/i, 'bell'],
  [/review|objective|rating|cycle|performance|goal/i, 'target'],
  [/document|report|history|log|career|journey|verification|incident/i, 'file'],
  [/security|safety|policy|emergency|system change/i, 'shield'],
  [/location|reporting|org/i, 'orgchart'],
  [/asset|issue and return|browser extension/i, 'box'],
  [/glance|dashboard|projected/i, 'chart'],
  [/ask |assistant/i, 'help']
];
const CARD_HUE = {
  wallet: '#16a34a',
  cal: '#2563eb',
  clock: '#0891b2',
  users: '#7c3aed',
  approve: '#ea580c',
  bell: '#db2777',
  target: '#4f46e5',
  file: '#0d9488',
  shield: '#dc2626',
  orgchart: '#ca8a04',
  box: '#9333ea',
  chart: '#0284c7',
  help: '#65a30d',
  grid: '#64748b'
};
function cardIcon(title) {
  const m = CARD_ICON.find(([re]) => re.test(title));
  return m ? m[1] : 'grid';
}
function decorateCards(root = document.getElementById('view')) {
  if (!root) return;
  let n;
  root.querySelectorAll('.card > .head h2, .card > .head > h2').forEach(h => {
    if (h.querySelector('.cti')) return;
    h.insertAdjacentHTML(
      'afterbegin',
      `<span class="cti" style="--h:${CARD_HUE[(n = cardIcon(h.textContent))]}" aria-hidden="true">${ic(n, 16)}</span>`
    );
  });
}

/* long table cells are cut with an ellipsis, so give them a tooltip with the full text */
function decorateTables(root = document.getElementById('view')) {
  if (!root) return;
  root.querySelectorAll('.rt td').forEach(td => {
    if (!td.title && td.scrollWidth > td.clientWidth + 1) td.title = td.textContent.trim();
  });
}
