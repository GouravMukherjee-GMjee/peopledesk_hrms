/* =============== performance review =============== */
const RATE = [
  'Needs improvement',
  'Below expectations',
  'Meets expectations',
  'Exceeds expectations',
  'Outstanding'
];
function reviewForm(empId) {
  const e = employees.find(x => x.id === empId),
    r = S.reviews[empId];
  if (r) {
    return detail('Performance review', {
      head: whoHead(e),
      chips: chip('Submitted', 'ok') + ' ' + chip(r.rating + ' · ' + RATE[r.rating - 1], 'info', 1),
      rows: [
        ['Goals', esc(r.goals)],
        ['Reviewed by', esc(r.by)],
        ['Date', fdate(r.date)]
      ],
      note: esc(r.strengths),
      noteT: 'Strengths',
      body: `<div class="rbox"><b>To improve</b><p style="margin-top:6px">${esc(r.improve || 'Nothing noted.')}</p></div>`
    });
  }
  S.rateTmp = 0;
  overlay(
    'Performance review',
    `${whoHead(e)}<div class="field"><label id="rl">Overall rating</label><div class="rate" role="radiogroup" aria-labelledby="rl">${RATE.map((t, i) => `<button type="button" class="rb" role="radio" aria-checked="false" onclick="setRate(${i + 1})"><b>${i + 1}</b><span>${t}</span></button>`).join('')}</div><div class="err" id="rate-e" role="alert"></div></div>
   <div class="fg">${fld('rg', 'Goals this cycle', '<select id="rg"><option>Fully met</option><option>Mostly met</option><option>Partly met</option><option>Not met</option></select>', 'full')}${fld('rs', 'Strengths', '<textarea id="rs" rows="3" placeholder="What did this person do well?"></textarea>', 'full')}${fld('ri2', 'Areas to improve', '<textarea id="ri2" rows="3" placeholder="Where can they grow? (optional)"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveReview('${empId}')">Submit review</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function setRate(n) {
  S.rateTmp = n;
  document
    .querySelectorAll('.rate .rb')
    .forEach((b, i) => b.setAttribute('aria-checked', String(i + 1 === n)));
  $('#rate-e').textContent = '';
}
function saveReview(empId) {
  let ok = true;
  if (!S.rateTmp) {
    $('#rate-e').textContent = 'Choose an overall rating';
    ok = false;
  }
  ok = chk('rs', !!$('#rs').value.trim(), 'Add at least one strength') && ok;
  if (!ok) return;
  S.reviews[empId] = {
    rating: S.rateTmp,
    goals: $('#rg').value,
    strengths: $('#rs').value.trim(),
    improve: $('#ri2').value.trim(),
    by: me().name,
    date: iso(NOW)
  };
  closeModal();
  render();
  toast('Review submitted');
}
function setCandFilter(r) {
  S.candF = S.candF === r ? '' : r;
  render();
}
