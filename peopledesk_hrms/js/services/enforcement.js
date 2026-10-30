/* ---------- enforcement where the work happens ---------- */
guardFns([
  ['exportEmps', 'employees', 'export', 'export employees'],
  ['teamCSV', 'employees', 'export', 'export the team'],
  ['attCSV', 'attendance', 'export', 'export attendance'],
  ['assetCSV', 'assets', 'export', 'export assets'],
  ['downloadReport', 'reports', 'export', 'download reports'],
  ['addEmp', 'employees', 'create', 'add employees'],
  ['saveEmp', 'employees', 'create', 'add employees'],
  ['editEmp', 'employees', 'edit', 'edit employees'],
  ['saveEditEmp', 'employees', 'edit', 'edit employees'],
  ['addAsset', 'assets', 'create', 'add assets'],
  ['saveAsset', 'assets', 'create', 'add assets'],
  ['issueAsset', 'assets', 'edit', 'issue assets'],
  ['doIssue', 'assets', 'edit', 'issue assets'],
  ['returnAsset', 'assets', 'edit', 'return assets'],
  ['doReturn', 'assets', 'edit', 'return assets'],
  ['addCand', 'recruit', 'create', 'add candidates'],
  ['saveCand', 'recruit', 'create', 'add candidates'],
  ['moveCand', 'recruit', 'edit', 'move candidates'],
  ['setRate', 'performance', 'edit', 'rate performance'],
  ['saveReview', 'performance', 'edit', 'save reviews'],
  ['cycleShift', 'roster', 'edit', 'change shifts'],
  ['closeInc', 'safety', 'approve', 'close incidents']
]);

function permPhone(r) {
  return `<div class="list">${Object.keys(RES)
    .map(res => {
      const x = S.perms.m[res][r],
        ap = RES[res][1];
      return `<div class="li pm"><div class="grow"><b>${RES[res][0]}</b><div class="pm-a">${ACTS.map((a, i) => (ap.includes(ACT_K[i]) ? `<label class="pm-c"><input type="checkbox" ${x[a] ? 'checked' : ''} ${LOCK(res, r, a) ? 'disabled' : ''} onchange="permAct('${res}','${r}','${a}',this.checked)" aria-label="${RES[res][0]}: ${ACT_N[a]} for ${roleName(r)}"> ${ACT_N[a]}</label>` : '')).join('')}</div>${res === 'dashboard' ? '' : `<select class="sel" onchange="permScope('${res}','${r}',this.value)" ${r === 'employee' || r === 'sysadmin' ? 'disabled' : ''} aria-label="${RES[res][0]} scope for ${roleName(r)}">${SCOPES.map(([k, n]) => `<option value="${k}" ${x.scope === k ? 'selected' : ''}>${n}</option>`).join('')}</select>`}</div></div>`;
    })
    .join('')}</div>`;
}
function sensPhone() {
  return `<div class="list">${SENS.map(([f, n, d]) => `<div class="li pm"><div class="grow"><b>${n}</b><div class="muted small">${d}</div><div class="pm-a">${['manager', 'hr', 'admin', 'sysadmin'].map(rl => `<label class="pm-c"><input type="checkbox" ${S.perms.sens[rl][f] ? 'checked' : ''} onchange="sensSet('${f}','${rl}',this.checked)" aria-label="${n} for ${roleName(rl)}"> ${roleName(rl)}</label>`).join('')}</div></div></div>`).join('')}</div>`;
}
