/* =============== shell =============== */
/* navigation history: every move to a new page or sub-view remembers where you came from */
const snap = () => ({
  page: S.page,
  tab: { ...S.tab },
  q: S.q,
  deptF: S.deptF,
  statF: S.statF,
  rday: S.rday
});
function pushHist() {
  S.hist.push(snap());
  if (S.hist.length > 25) S.hist.shift();
}
function openSub(k, v) {
  closeModal();
  pushHist();
  S.tab[k] = v;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
}
function back() {
  const h = S.hist.pop();
  if (!h) return;
  closeModal();
  ddClose();
  S.page = h.page;
  S.tab = h.tab;
  S.q = h.q;
  S.deptF = h.deptF;
  S.statF = h.statF;
  S.rday = h.rday;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
  enterView();
}
function enterView() {
  const v = $('#view');
  v.classList.remove('enter');
  void v.offsetWidth;
  v.classList.add('enter');
}
const ping = el => {
  if (!el) return;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 450);
};
const buzz = () => {
  try {
    if (navigator.vibrate) navigator.vibrate(12);
  } catch (e) {}
};
function drawChrome() {
  const nav = navFor(),
    u = me(),
    badge = {
      leave: pendingLv().length,
      safety: S.incidents.filter(i => i.st !== 'Closed').length
    };
  const btn = id => {
    const n = badge[id] && isMgr() ? `<span class="bd">${badge[id]}</span>` : '';
    return `<button class="nav-btn ${S.page === id ? 'on' : ''}" onclick="go('${id}')" title="${label(id)}" ${S.page === id ? 'aria-current="page"' : ''}>${ic(PG[id][1])}<span class="nl">${label(id)}</span>${n}</button>`;
  };
  $('#side').innerHTML =
    `<button class="logo" onclick="go('dashboard')" aria-label="PeopleDesk, go to dashboard">${logoTile(36)}${logoWord(17)}</button>` +
    `<div class="side-nav-scroll">${nav
      .map(
        ([g, ids]) => (nav.length > 1 ? `<div class="gl-t">${g}</div>` : '') + ids.map(btn).join('')
      )
      .join('')}</div>`;
  const mob = mobFor(),
    rest = flat().filter(x => !mob.includes(x));
  $('#bnav').innerHTML =
    mob
      .map(
        id =>
          `<button class="${S.page === id ? 'on' : ''}" onclick="go('${id}')" ${S.page === id ? 'aria-current="page"' : ''}><span class="bi">${ic(PG[id][1], 22)}</span>${shortLbl(id)}</button>`
      )
      .join('') +
    `<button class="${rest.includes(S.page) ? 'on' : ''}" onclick="moreMenu()"><span class="bi">${ic('more', 22)}</span>More</button>`;
  const bk = S.hist.length ? S.hist[S.hist.length - 1] : null;
  $('#mlogo').innerHTML = bk
    ? `<button class="icon-btn mback" onclick="back()" aria-label="Back to ${esc(label(bk.page))}">${ic('arrow', 20)}</button>`
    : logoTile(34) + '<span class="mt">' + logoWord(15) + '</span>';
  $('#role').innerHTML = PERSONAS.map(p => `<option value="${p.k}">${p.n}</option>`).join('');
  $('#role').value = S.persona;
  $('#rolechip').innerHTML = `<span>${persona().n}</span>${ic('chev', 14)}`;
  $('#rolechip').setAttribute('aria-label', persona().n + ', previewing as. Change preview');
  $('#theme').innerHTML = ic(isDark() ? 'sun' : 'moon', 18);
  $('#avbtn').innerHTML = av(u.name, 36);
  $('#avbtn').setAttribute('aria-label', initials(u.name) + ' account menu');
  const unread = S.notifs.filter(n => n.u && notifOk(n)).length,
    bd = $('#bdot');
  bd.hidden = !unread;
  bd.textContent = unread > 9 ? '9+' : unread;
  $('#bell').setAttribute(
    'aria-label',
    unread ? `Notifications, ${unread} unread` : 'Notifications'
  );
  $('#app').classList.toggle('col', S.collapsed);
  document.documentElement.style.setProperty('--tbh', ($('.top').offsetHeight || 56) + 'px');
  $('#collapse').innerHTML = ic('panel', 18);
}
const logoMark = h =>
  `<svg width="${((h * 194.9) / 243.1).toFixed(1)}" height="${h}" viewBox="0 0 194.9 243.1" aria-hidden="true"><use href="#pd-mark"/></svg>`;
const logoWord = h =>
  `<span class="lw"><svg width="${((h * 889.7) / 156.1).toFixed(1)}" height="${h}" viewBox="0 0 889.7 156.1" aria-hidden="true"><use href="#pd-word"/></svg></span>`;
const logoTile = s =>
  `<span class="ltile" style="width:${s}px;height:${s}px">${logoMark(Math.round(s * 0.62))}</span>`;
const coMark = s =>
  `<span class="ltile co" style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.34)}px">GM</span>`;
function moreMenu() {
  const mob = mobFor();
  const gs = navFor()
    .map(([g, ids]) => [g, ids.filter(x => !mob.includes(x))])
    .filter(x => x[1].length);
  overlay(
    'All modules',
    gs
      .map(
        ([g, ids]) =>
          `<div class="mnav-g">${g}</div><div class="mnav">${ids.map(id => `<button onclick="go('${id}')">${ic(PG[id][1], 24)}${label(id)}</button>`).join('')}</div>`
      )
      .join('')
  );
}
function isDark() {
  const t = document.documentElement.dataset.theme;
  return t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('pd-theme', t);
  } catch (e) {}
  $('#theme').innerHTML = ic(t === 'dark' ? 'sun' : 'moon', 18);
  const lt = $('.lg-theme');
  if (lt) lt.innerHTML = ic(t === 'dark' ? 'sun' : 'moon', 18);
}
function showKeys() {
  const rows = [
    ['Search people and pages', '<kbd>Ctrl</kbd> <kbd>K</kbd>'],
    ['Go back to the previous page', '<kbd>Alt</kbd> <kbd>←</kbd>'],
    ['Show this list', '<kbd>?</kbd>'],
    ['Close a dialog or dropdown', '<kbd>Esc</kbd>'],
    ['Move through dropdown options', '<kbd>↑</kbd> <kbd>↓</kbd>'],
    ['Choose the highlighted option', '<kbd>Enter</kbd>'],
    ['Jump to a dropdown option by typing', '<kbd>A</kbd>–<kbd>Z</kbd>']
  ];
  overlay(
    'Keyboard shortcuts',
    `<div class="keys list">${rows.map(([a, k]) => `<div class="li"><span class="grow">${a}</span><span>${k}</span></div>`).join('')}</div>`,
    `<button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function account() {
  const u = me(),
    tf = S.sec.twoFA.hr;
  overlay(
    'Account',
    `<div class="acct"><div class="acct-hero"><span class="acct-av">${av(u.name, 68)}</span><b class="acct-n">${esc(u.name)}</b><span class="acct-t">${esc(u.title)}</span><div class="chips2 ctr">${chip(u.id, 'mute', 1)}${chip('Viewing as ' + roleName(S.role), 'info', 1)}</div><button class="btn sm" onclick="closeModal();go('profile')">${ic('user', 14)}View full profile</button></div>
   <div class="sec"><div class="sec-t">Preview as</div>${roleCards(S.persona, 'switchRole')}</div>
   <div class="sec"><div class="sec-t">Security and preferences</div><div class="grp">
    <div class="li"><span class="ai t-green">${ic('shield', 16)}</span><div class="grow"><b>Two-step verification</b><div class="muted small">A code is asked for when you sign in</div></div>${chip(tf ? 'On' : 'Off', tf ? 'ok' : 'mute')}</div>
    <div class="li"><span class="ai t-amber">${ic('key', 16)}</span><div class="grow"><b>Password</b><div class="muted small">Use a strong password you do not reuse</div></div><button class="btn sm" onclick="changePw()">Change</button></div>
    <div class="li"><span class="ai t-violet">${ic('moon', 16)}</span><div class="grow"><b>Dark mode</b><div class="muted small">Easier on the eyes at night</div></div><label class="sw"><input type="checkbox" ${isDark() ? 'checked' : ''} onchange="setTheme(this.checked?'dark':'light')" aria-label="Dark mode"><span></span></label></div>
    <div class="li desk"><span class="ai t-brand">${ic('list', 16)}</span><div class="grow"><b>Keyboard shortcuts</b><div class="muted small">Press ? anywhere to see them</div></div><button class="btn sm" onclick="showKeys()">View</button></div></div></div></div>`,
    `<button class="btn bad so-l" onclick="signOut()">${ic('logout', 16)}Sign out</button><button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function openNotifs() {
  overlay(
    'Notifications',
    `<div>${S.notifs.map((n, i) => (notifOk(n) ? `<div class="ntf" role="button" tabindex="0" style="cursor:pointer" onclick="S.notifs[${i}].u=0;go('${n.emp ? n.p || 'dashboard' : isMgr() || n.p === 'payroll' ? n.p : 'dashboard'}')" onkeydown="if(event.key==='Enter')this.click()"><span class="u ${n.u ? '' : 'r'}"></span><div class="grow"><b>${n.t}</b><div class="muted small">${n.s} · ${n.time}</div></div></div>` : '')).join('') || '<div class="empty"><b>No notifications</b>Nothing needs your attention.</div>'}</div>`,
    `<button class="btn" onclick="S.notifs.forEach(n=>n.u=0);closeModal();render();toast('All notifications marked as read')">Mark all as read</button>`,
    { side: true }
  );
}
/* command palette */
let cmdIdx = 0,
  cmdItems = [];
function openCmd() {
  overlay(
    'Search',
    `<input id="cq" class="cmd-in" placeholder="Search, or type &gt; for actions" autocomplete="off" aria-label="Search" autofocus><div id="cr" class="cmd-list"></div>`,
    null,
    { cmd: true, bare: true }
  );
  cmdRender('');
  const i = $('#cq');
  i.oninput = e => {
    cmdIdx = 0;
    cmdRender(e.target.value);
  };
  i.onkeydown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdIdx = Math.min(cmdIdx + 1, cmdItems.length - 1);
      cmdPaint();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdIdx = Math.max(cmdIdx - 1, 0);
      cmdPaint();
    } else if (e.key === 'Enter' && cmdItems[cmdIdx]) {
      e.preventDefault();
      cmdRun(cmdIdx);
    }
  };
}
const ACTIONS = () => [
  {
    t: 'Apply for leave',
    i: 'cal',
    fn: () => {
      closeModal();
      go('leave');
      applyLeave();
    }
  },
  {
    t: S.clock.in && !S.clock.out ? 'Clock out' : 'Clock in',
    i: 'clock',
    fn: () => {
      closeModal();
      toggleClock();
    }
  },
  ...[
    can('employees', 'create') && {
      t: 'Add employee',
      i: 'plus',
      fn: () => {
        closeModal();
        go('employees');
        addEmp();
      }
    },
    can('recruit', 'create') && {
      t: 'Add candidate',
      i: 'plus',
      fn: () => {
        closeModal();
        go('recruit');
        addCand();
      }
    },
    can('assets', 'create') && {
      t: 'Add asset',
      i: 'plus',
      fn: () => {
        closeModal();
        go('assets');
        addAsset();
      }
    },
    can('lifecycle', 'create') && {
      t: 'Start offboarding',
      i: 'userplus',
      fn: () => {
        closeModal();
        go('lifecycle');
        startOff();
      }
    },
    can('approvals', 'view') && {
      t: 'Open approvals',
      i: 'inbox',
      fn: () => {
        closeModal();
        go('approvals');
      }
    },
    isMgr() && {
      t: 'Delegate my approvals',
      i: 'users',
      fn: () => {
        closeModal();
        delegOpen();
      }
    }
  ].filter(Boolean),
  {
    t: 'Download latest payslip',
    i: 'download',
    fn: () => {
      closeModal();
      downloadPayslip(me().id, 'September 2026');
    }
  },
  {
    t: isDark() ? 'Switch to light mode' : 'Switch to dark mode',
    i: isDark() ? 'sun' : 'moon',
    fn: () => {
      closeModal();
      setTheme(isDark() ? 'light' : 'dark');
    }
  },
  {
    t: 'Sign out',
    i: 'logout',
    fn: () => {
      closeModal();
      signOut();
    }
  }
];
function cmdRender(q0) {
  const raw = q0.trim(),
    act = raw.startsWith('>'),
    q = (act ? raw.slice(1) : raw).trim().toLowerCase();
  const actions = ACTIONS()
    .filter(a => !q || a.t.toLowerCase().includes(q))
    .map(a => ({ g: 'Actions', t: a.t, s: 'Run action', i: a.i, fn: a.fn }));
  if (act) {
    cmdItems = actions.slice(0, 9);
    cmdPaint();
    return;
  }
  const pages = flat()
    .filter(id => !q || label(id).toLowerCase().includes(q))
    .map(id => ({ g: 'Pages', t: label(id), s: 'Go to page', i: PG[id][1], fn: () => go(id) }));
  const ppl = (
    isMgr() && q
      ? scoped().filter(e => (e.name + e.title + e.dept + e.id).toLowerCase().includes(q))
      : []
  )
    .slice(0, 5)
    .map(e => ({
      g: 'People',
      t: e.name,
      s: e.title + ' · ' + e.dept,
      e,
      fn: () => {
        closeModal();
        empProfile(e.id);
      }
    }));
  cmdItems = [...ppl, ...pages, ...(q ? actions : [])].slice(0, 9);
  cmdPaint();
}
function cmdPaint() {
  let g = '',
    h = '';
  cmdItems.forEach((it, i) => {
    if (it.g !== g) {
      g = it.g;
      h += `<div class="cmd-g">${g}</div>`;
    }
    h += `<button class="cmd-i ${i === cmdIdx ? 'on' : ''}" onclick="cmdRun(${i})" onmousemove="cmdIdx=${i}">${it.e ? av(it.e.name, 32) : `<span class="ai t-brand" style="width:32px;height:32px">${ic(it.i, 18)}</span>`}<span><b style="display:block">${esc(it.t)}</b><span class="muted small">${esc(it.s)}</span></span></button>`;
  });
  $('#cr').innerHTML = h || `<div class="empty"><b>No matches</b>Try a name, role or page.</div>`;
}
function cmdRun(i) {
  cmdItems[i].fn();
}

let bucket = innerWidth <= 520 ? 0 : innerWidth <= 900 ? 1 : 2,
  rz;
let lastW = innerWidth;
addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    const b = innerWidth <= 520 ? 0 : innerWidth <= 900 ? 1 : 2,
      moved = Math.abs(innerWidth - lastW) >= 80;
    if (S.authed && (b !== bucket || moved)) {
      render();
    }
    bucket = b;
    if (moved) lastW = innerWidth;
  }, 200);
});
function render() {
  ddClose();
  closeCrumbMenu();
  drawChrome();
  if (!flat().includes(S.page) && !S.denied) S.page = 'dashboard';
  const P = {
    dashboard,
    employees: employeesPage,
    attendance,
    hours: hoursPage,
    leave,
    payroll,
    recruit,
    performance: performancePage,
    roster,
    safety,
    training,
    reports,
    requests,
    settings,
    profile: profilePage,
    assets: assetsPage,
    approvals: approvalsPage,
    org: orgPage,
    lifecycle: lifecyclePage,
    audit: auditPage
  };
  const same = render.page === S.page;
  if (!same || !S.sel) S.sel = { scope: '', ids: [] };
  else pruneSel();
  const a = document.activeElement,
    fid =
      same && a && a.id && /^(INPUT|TEXTAREA)$/.test(a.tagName) && a.closest('#view') ? a.id : null,
    fsel = fid && a.selectionStart != null ? [a.selectionStart, a.selectionEnd] : null,
    SC = '#view .tw,#view .kan,#view .cal,#view .tabs',
    sx = same ? [...document.querySelectorAll(SC)].map(e => e.scrollLeft) : [];
  $('#view').innerHTML =
    (S.denied && !flat().includes(S.page) ? deniedPage() : P[S.page]()) + selBar();
  $('#view').classList.toggle('dashboard-view', S.page === 'dashboard');
  if (same) {
    // a state update must not throw away where you were
    const n = fid && document.getElementById(fid);
    if (n && n !== document.activeElement) {
      n.focus({ preventScroll: true });
      if (fsel && n.setSelectionRange)
        try {
          n.setSelectionRange(fsel[0], fsel[1]);
        } catch (e) {}
    }
    [...document.querySelectorAll(SC)].forEach((e, i) => {
      if (sx[i]) e.scrollLeft = sx[i];
    });
  }
  decorateCards();
  decorateTables();
  $('#crumbbar').innerHTML = crumbs();
  document.documentElement.style.setProperty('--shh', ($('#stickyhead').offsetHeight || 90) + 'px');
  render.page = S.page;
  fitTables();
  requestAnimationFrame(fitTables);
  document.title =
    (S.denied && !flat().includes(S.page) ? 'Access denied' : label(S.page)) + ' · PeopleDesk';
  try {
    if (location.hash !== '#/' + S.page) history.replaceState(null, '', '#/' + S.page);
  } catch (e) {}
  tick();
  persist();
}

const notifOk = n =>
  n.emp ? n.emp === me().id : !n.p ||
  (okPage(n.p) &&
    S.role !== 'employee' &&
    !(n.p === 'payroll' && !(can('payroll', 'edit') || can('payroll', 'approve'))) &&
    !(n.p === 'safety' && !can('safety', 'approve')));
