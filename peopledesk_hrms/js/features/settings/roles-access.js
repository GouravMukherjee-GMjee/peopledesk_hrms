/* =====================================================================
   v38 · settings that save and change behaviour · organization · audit log
   ===================================================================== */
const nowT = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
const SVST = () => {
  const s = S.save;
  return s.st === 'saving'
    ? 'Saving…'
    : s.st === 'saved'
      ? 'Saved · ' + s.at
      : s.st === 'failed'
        ? 'Could not save. Your browser blocked storage, so changes last only until you close this tab.'
        : '';
};
function paintSave() {
  const el = document.getElementById('svst');
  if (!el) return;
  el.className = 'svst ' + (S.save.st || '');
  el.textContent = SVST();
}
const svBadge = () =>
  `<span class="svst ${S.save.st || ''}" id="svst" role="status" aria-live="polite">${SVST()}</span>`;
function commit() {
  S.save = { st: 'saving', at: '' };
  paintSave();
  setTimeout(() => {
    const ok = saveGov();
    persist();
    S.save = { st: ok ? 'saved' : 'failed', at: nowT() };
    paintSave();
  }, 220);
}
const demoChip = () => chip('Demo only', 'warn', 1);
const lastBy = m =>
  m && m.by && m.at ? `Last changed by ${esc(m.by)} · ${ftime(m.at)}` : 'Still on the defaults';
const polMeta = k => {
  const h = S.polHist[k],
    l = h[h.length - 1];
  return l.at ? { by: l.by, at: l.at } : null;
};

/* ---------- roles and access ---------- */
const LOCK = (res, role, act) =>
  res === 'dashboard' ||
  (role === 'sysadmin' &&
    ((['users', 'roles', 'security'].includes(res) && (act === 'view' || act === 'edit')) ||
      (res === 'audit' && act === 'view')));
function permAct(res, role, act, on) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const x = S.perms.m[res][role],
    old = !!x[act];
  if (LOCK(res, role, act)) {
    render();
    return;
  }
  x[act] = on ? 1 : 0;
  if (act === 'view' && !on) ACTS.forEach(a => (x[a] = 0));
  if (on && act !== 'view') x.view = 1;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Permission changed', `${RES[res][0]} · ${roleName(role)}`, {
    res,
    from: `${ACT_N[act]}: ${old ? 'allowed' : 'not allowed'}`,
    to: `${ACT_N[act]}: ${on ? 'allowed' : 'not allowed'}`
  });
  commit();
  render();
  toast(
    `${RES[res][0]}: ${ACT_N[act].toLowerCase()} ${on ? 'allowed' : 'removed'} for ${roleName(role)}`
  );
}
function permScope(res, role, v) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const x = S.perms.m[res][role],
    old = x.scope;
  if (old === v) return;
  x.scope = v;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Scope changed', `${RES[res][0]} · ${roleName(role)}`, {
    res,
    from: SCOPES.find(s => s[0] === old)[1],
    to: SCOPES.find(s => s[0] === v)[1]
  });
  commit();
  render();
  toast(
    `${RES[res][0]}: ${roleName(role)} now sees ${SCOPES.find(s => s[0] === v)[1].toLowerCase()}`
  );
}
function sensSet(f, role, on) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const o = S.perms.sens[role];
  o[f] = on ? 1 : 0;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Sensitive access changed', `${SENS.find(s => s[0] === f)[1]} · ${roleName(role)}`, {
    res: 'settings',
    from: on ? 'hidden' : 'visible',
    to: on ? 'visible' : 'hidden'
  });
  commit();
  render();
  toast(`${SENS.find(s => s[0] === f)[1]} ${on ? 'visible' : 'hidden'} for ${roleName(role)}`);
}
function permReset() {
  confirmBox(
    'Restore default access?',
    'Every role goes back to its original permissions, scopes and sensitive-field access. This is recorded in the audit log.',
    'Restore defaults',
    () => {
      S.perms = defaultPerms();
      S.perms.meta = { by: me().name, at: new Date().toISOString() };
      audit('Permissions reset', 'All roles', { res: 'settings', to: 'defaults' });
      commit();
      render();
      toast('Default access restored');
    },
    true
  );
}
function rolesTab() {
  const r = curTab('rr', 'manager'),
    scopeOpts = (v, dis) =>
      SCOPES.map(
        ([k, n]) => `<option value="${k}" ${v === k ? 'selected' : ''}>${n}</option>`
      ).join('');
  const rows = Object.keys(RES).map(res => {
    const x = S.perms.m[res][r],
      ap = RES[res][1];
    const cells = ACTS.map((a, i) =>
      ap.includes(ACT_K[i])
        ? `<label class="sw"><input type="checkbox" ${x[a] ? 'checked' : ''} ${LOCK(res, r, a) ? 'disabled title="This always stays on so access to Settings can never be lost"' : ''} onchange="permAct('${res}','${r}','${a}',this.checked)" aria-label="${RES[res][0]}: ${ACT_N[a]} for ${roleName(r)}"><span></span></label>`
        : '<span class="muted" aria-label="Not applicable">–</span>'
    );
    const sc =
      res === 'dashboard'
        ? '<span class="muted small">Own data</span>'
        : `<select class="sel" onchange="permScope('${res}','${r}',this.value)" ${r === 'employee' || r === 'sysadmin' ? 'disabled' : ''} aria-label="${RES[res][0]} scope for ${roleName(r)}">${scopeOpts(x.scope)}</select>`;
    return { cells: [RES[res][0], ...cells, sc] };
  });
  const sens = SENS.map(([f, n, d]) => ({
    cells: [
      `<b>${n}</b> <span class="muted small">${d}</span>`,
      ...['manager', 'hr', 'admin', 'sysadmin'].map(
        rl =>
          `<label class="sw"><input type="checkbox" ${S.perms.sens[rl][f] ? 'checked' : ''} onchange="sensSet('${f}','${rl}',this.checked)" aria-label="${n} for ${roleName(rl)}"><span></span></label>`
      )
    ]
  }));
  return `<div class="svh"><p class="muted small" style="margin:0">Changes apply immediately for everyone, including menus, buttons and exports. <b>In production the server must enforce every rule</b>; this demo applies them in your browser.</p>${svBadge()}</div>
  ${tabs(
    'rr',
    ROLE_DEF.map(x => [x.k, x.n]),
    'manager'
  )}
  <p class="muted small" style="margin:10px 0">${esc(roleDef(r).d)}.${r === 'employee' ? ' Employees always see only their own records.' : r === 'sysadmin' ? ' This role has no employee or payroll data unless you grant it below.' : ' Scope decides whose records this role can see.'}</p>
  ${innerWidth <= 520 ? permPhone(r) : rtable([{ h: 'Resource', keep: 1 }, ...ACTS.map(a => ({ h: ACT_N[a], c: 'num' })), { h: 'Whose records' }], rows, {})}
  <h2 style="margin:24px 0 4px">Sensitive fields</h2><p class="muted small" style="margin-bottom:8px">Hidden fields show as Restricted, even on screens the person can otherwise open.</p>
  ${
    innerWidth <= 520
      ? sensPhone()
      : rtable(
          [
            { h: 'Information', keep: 1 },
            { h: 'Manager', c: 'num' },
            { h: 'HR', c: 'num' },
            { h: 'Admin', c: 'num' },
            { h: 'System Admin', c: 'num' }
          ],
          sens,
          {}
        )
  }
  <div class="svh" style="margin-top:14px"><span class="muted small">${lastBy(S.perms.meta)}</span><button class="btn sm" onclick="permReset()">Restore defaults</button></div>
  <div class="note" style="margin-top:12px"><b>Maker and checker:</b> HR prepares payroll and Admin approves it, so payroll is always checked by a second person. System Admin has no employee or payroll data unless you turn it on above.</div>`;
}
