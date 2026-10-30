/* ---------- System Admin home: accounts, security and integrations only ---------- */
function dashboardSys(u, g, ds) {
  const L = live(),
    cnt = k => L.filter(x => roleOf(x.id) === k).length,
    priv = cnt('hr') + cnt('admin') + cnt('sysadmin'),
    req = L.filter(x => S.sec.twoFA[roleOf(x.id)]).length,
    tp = Math.round((req / Math.max(L.length, 1)) * 100),
    ev = S.audit.filter(a => a.cat === 'system').slice(0, 5),
    mx = Math.max(...ROLE_DEF.map(r => cnt(r.k)), 1);
  return (
    ph(
      `${g}, ${u.name.split(' ')[0]}`,
      `${ds} · System administration`,
      can('users', 'view')
        ? `<button class="btn primary" onclick="S.tab.st='users';go('settings')">${ic('users', 16)}Manage users</button>`
        : ''
    ) +
    `<div class="row c4">
   ${kpi({ l: 'Accounts', v: L.length, icon: 'users', tone: 't-brand', d: 'people with a PeopleDesk account', bar: 100, bl: ROLE_DEF.length + ' roles in use', def: 'Active accounts. Exited people are removed.', per: 'Today', src: 'Users and accounts' })}
   ${kpi({ l: 'Privileged accounts', v: priv, icon: 'key', tone: 't-amber', d: 'HR, Admin and System Admin', bar: (priv / Math.max(L.length, 1)) * 100, bl: Math.round((priv / Math.max(L.length, 1)) * 100) + '% of accounts', def: 'Accounts whose role can change records, pay or settings.', per: 'Today', src: 'Role assignments' })}
   ${kpi({ l: 'Two-step coverage', v: tp + '%', icon: 'shield', tone: 't-green', d: 'accounts that must use a code', bar: tp, bl: `${req} of ${L.length} accounts`, def: 'Share of accounts whose role requires two-step verification.', per: 'Today', src: 'Security settings' })}
   ${kpi({ l: 'Integrations', v: '0 of 4', icon: 'grid', tone: 't-violet', sample: 1, d: 'no live connections in this demo', def: 'Bank, single sign-on, devices and email delivery.', per: 'Today', src: 'Not connected yet' })}
  </div>
  <div class="row c2"><div class="card"><div class="head"><div><h2>Accounts by role</h2><p class="sub">Select a role to review who has it</p></div></div><div class="list">${ROLE_DEF.map(r => `<button class="li cname" style="width:100%" onclick="S.tab.st='users';go('settings')"><span class="grow" style="text-align:left"><b>${r.n}</b><div class="muted small" style="white-space:normal">${esc(r.d)}</div><div class="bar" style="margin-top:6px"><i style="width:${(cnt(r.k) / mx) * 100}%"></i></div></span><b>${cnt(r.k)}</b></button>`).join('')}</div></div>
  <div class="stack"><div class="card"><div class="head"><div><h2>Recent system changes</h2><p class="sub">Roles, permissions and security</p></div><button class="link" onclick="go('audit')">Audit log</button></div>${ev.length ? `<div class="list">${ev.map(a => `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(a.act)}</b><div class="muted small">${esc(a.rec)} · ${esc(a.by)} · ${ftime(a.at)}</div></div></div>`).join('')}</div>` : '<div class="empty">No system changes yet.</div>'}</div>
  <div class="card"><div class="head"><div><h2>Security settings</h2><p class="sub">Current policy</p></div><button class="link" onclick="S.tab.st='security';go('settings')">Review</button></div><div class="list"><div class="li"><span class="grow">Minimum password length</span><b>${S.sec.minLen} characters</b></div><div class="li"><span class="grow">Sign out after inactivity</span><b>${S.sec.timeout} minutes</b></div><div class="li"><span class="grow">Single sign-on</span><b>${demoChip()}</b></div></div></div></div></div>`
  );
}
