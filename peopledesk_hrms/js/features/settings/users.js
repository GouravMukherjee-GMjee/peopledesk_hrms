/* ---------- users and accounts (System Admin): names, work emails and roles only ---------- */
const lastSeen = e => {
  const d = [0, 0, 1, 2, 3, 5][hsh(e.id, 0, 0, 7) % 6];
  return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : d + ' days ago';
};
function userRole(id, role) {
  if (!need('users', 'edit', 'change roles')) return;
  const e = emp(id),
    old = roleOf(id);
  if (old === role) return;
  if (id === me().id) {
    toast('You cannot change your own role', null, 'err');
    render();
    return;
  }
  const n = k => live().filter(x => roleOf(x.id) === k).length;
  if ((old === 'sysadmin' && n('sysadmin') <= 1) || (old === 'admin' && n('admin') <= 1)) {
    toast(`At least one ${roleName(old)} must remain`, null, 'err');
    render();
    return;
  }
  confirmBox(
    'Change role?',
    `${e.name} will become ${roleName(role)}. Their menus and permissions change straight away.`,
    'Change role',
    () => {
      S.roles[id] = role;
      audit('Role assigned', e.name, { res: 'users', from: roleName(old), to: roleName(role) });
      persist();
      commit();
      render();
      toast(`${e.name} is now ${roleName(role)}`);
    }
  );
  const o = document.querySelector('#layer .mf .btn:not(.bad):not(.primary)');
}
function userReset(id) {
  if (!need('users', 'edit', 'reset passwords')) return;
  const e = emp(id);
  confirmBox(
    'Send a password reset?',
    `${e.name} will get a link to set a new password. In this demo no email is sent.`,
    'Send reset',
    () => {
      audit('User password reset requested', e.name, { res: 'users' });
      persist();
      toast('Reset requested for ' + e.name);
    }
  );
}
function usersTab() {
  const rows = live().map(e => {
    const r = roleOf(e.id),
      self = e.id === me().id;
    return {
      cells: [
        `<div class="person">${av(e.name, 32)}<div><b>${esc(e.name)}</b><span>${esc(e.email)}</span></div></div>`,
        `<select class="sel" onchange="userRole('${e.id}',this.value)" ${self ? 'disabled title="You cannot change your own role"' : ''} aria-label="Role for ${esc(e.name)}">${ROLE_DEF.map(x => `<option value="${x.k}" ${r === x.k ? 'selected' : ''}>${x.n}</option>`).join('')}</select>`,
        S.sec.twoFA[r] ? chip('Required', 'ok') : chip('Optional', 'mute'),
        lastSeen(e),
        `<button class="btn sm" onclick="userReset('${e.id}')">Reset password</button>`
      ]
    };
  });
  const cnt = k => live().filter(x => roleOf(x.id) === k).length;
  return `<div class="svh"><span class="muted small">${live().length} accounts · ${ROLE_DEF.map(x => cnt(x.k) + ' ' + x.n).join(' · ')}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Assign roles here. Only names and work emails are shown; no employee or payroll data. Last sign-in is sample data in this demo.</p>
  ${rtable([{ h: 'Account', keep: 1 }, { h: 'Role' }, { h: 'Two-step', xm: 1 }, { h: 'Last sign-in', xm: 1 }, { h: '', act: 1 }], rows, {})}`;
}
function settings() {
  const all = [
      ['users', 'Users', 'users'],
      ['roles', 'Roles and access', 'roles'],
      ['policy', 'Work policies', 'policy'],
      ['statutory', 'Statutory', 'statutory'],
      ['security', 'Security', 'security'],
      ['integrations', 'Integrations', 'integrations'],
      ['otpol', 'Overtime and comp-off', 'policy'],
      ['ext', 'Browser extension', 'policy'],
      ['prefs', 'Preferences', null]
    ],
    ok = all.filter(x => !x[2] || can(x[2], 'view'));
  const t = ok.some(x => x[0] === S.tab.st) ? S.tab.st : ok[0][0];
  S.tab.st = t;
  const T = {
    users: usersTab,
    roles: rolesTab,
    policy: workTab,
    statutory: statTab,
    security: securityTab,
    integrations: integrationsTab,
    otpol: otPolTab,
    ext: extAdminTab,
    prefs: prefsTab
  };
  return (
    ph(
      'Settings',
      persona().role === 'sysadmin'
        ? 'Users, roles, security and integrations'
        : 'Policies, statutory settings and preferences'
    ) +
    `<div class="card"><div class="head">${tabs(
      'st',
      ok.map(x => [x[0], x[1]]),
      ok[0][0]
    )}</div>${T[t]()}</div>`
  );
}
