/* =============== recruitment =============== */
function recruit() {
  const ks = Math.min(S.kstage || 0, 4),
    roles = [
      ['CNC Programmer', 'Production', '2 openings'],
      ['Safety Officer', 'Plant', '1 opening'],
      ['Sales Executive', 'Sales', '1 opening']
    ];
  return (
    ph(
      'Recruitment',
      S.candF
        ? `Showing ${S.candF} only. Use the role filter to show everyone.`
        : 'Select a candidate for details. Drag between stages or use the arrows.',
      `<button class="btn primary" onclick="addCand()">${ic('plus', 16)}Add candidate</button>`
    ) +
    `<div class="tools rc-filter"><label class="dd"><span class="sr">Filter by role</span><select class="sel" onchange="S.candF=this.value;render()"><option value="">All roles (${S.cands.length})</option>${roles.map(r => `<option value="${r[0]}" ${S.candF === r[0] ? 'selected' : ''}>${r[0]} (${S.cands.filter(c => c.r === r[0]).length})</option>`).join('')}</select></label><span class="chip info">${S.cands.filter(c => !S.candF || c.r === S.candF).length} candidates</span><span class="chip ok">${S.cands.filter(c => c.st === 4 && (!S.candF || c.r === S.candF)).length} hired</span>${S.candF ? `<button class="link" onclick="S.candF='';render()">Clear filter</button>` : ''}</div>
  <div class="kstages" role="tablist" aria-label="Pipeline stages">${S.stages.map((s, i) => `<button role="tab" aria-selected="${i === ks}" class="${i === ks ? 'on' : ''}" onclick="S.kstage=${i};render()">${s}<span>${S.cands.filter(c => c.st === i && (!S.candF || c.r === S.candF)).length}</span></button>`).join('')}</div>
  <div class="kan" id="kan">${S.stages
    .map(
      (st, i) =>
        `<div class="kcol${i === ks ? ' on' : ''}" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropCand(event,${i})" aria-label="${st} column"><h2>${st}<span class="chip mute nb">${S.cands.filter(c => c.st === i && (!S.candF || c.r === S.candF)).length}</span></h2>${
          S.cands
            .filter(c => c.st === i && (!S.candF || c.r === S.candF))
            .map(
              c =>
                `<div class="cand" onclick="candDetail(${c.id})" draggable="true" ondragstart="event.dataTransfer.setData('text/plain','${c.id}')"><button class="cname" onclick="event.stopPropagation();candDetail(${c.id})">${av(c.n, 32)}<span class="cn"><b>${esc(c.n)}</b><span>${esc(c.r)}</span></span></button><div class="tools" style="justify-content:space-between;margin:0"><span class="muted small">${esc(c.src)}</span><span style="display:flex;gap:6px">${i > 0 ? `<button class="btn sm ico" onclick="event.stopPropagation();moveCand(${c.id},-1)" aria-label="Move ${esc(c.n)} back"><span style="display:inline-flex;transform:scaleX(-1)">${ic("arrow", 14)}</span></button>` : ''}${i < 4 ? `<button class="btn sm primary ico" onclick="event.stopPropagation();moveCand(${c.id},1)" aria-label="Move ${esc(c.n)} forward">${ic('arrow', 14)}</button>` : ''}</span></div></div>`
            )
            .join('') ||
          '<div class="muted small" style="padding:10px;text-align:center">No candidates</div>'
        }</div>`
    )
    .join('')}</div>`
  );
}
function moveCand(id, d) {
  const c = S.cands.find(x => x.id === id);
  c.st = Math.max(0, Math.min(4, c.st + d));
  render();
  if (c.st === 4) toast(c.n + ' marked as hired. Start onboarding.');
}
function dropCand(e, i) {
  e.preventDefault();
  const c = S.cands.find(x => x.id === +e.dataTransfer.getData('text/plain'));
  if (c) {
    c.st = i;
    render();
    toast(`${c.n} moved to ${S.stages[i]}`);
  }
}
function addCand() {
  overlay(
    'Add candidate',
    `<div class="fg">${fld('cn', 'Name', '<input id="cn" autocomplete="off">', 'full')}${fld('cr', 'Applying for', '<select id="cr"><option>CNC Programmer</option><option>Safety Officer</option><option>Sales Executive</option><option>HR Executive</option></select>')}${fld('cs', 'Source', '<select id="cs"><option>Naukri</option><option>LinkedIn</option><option>Referral</option><option>Agency</option><option>Campus</option></select>')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveCand()">Add candidate</button>`
  );
}
function saveCand() {
  const n = $('#cn').value.trim();
  if (!chk('cn', !!n, "Enter the candidate's name")) return;
  S.cands.push({ id: Date.now(), n, r: $('#cr').value, st: 0, src: $('#cs').value });
  closeModal();
  render();
  toast(n + ' added to Applied');
}
