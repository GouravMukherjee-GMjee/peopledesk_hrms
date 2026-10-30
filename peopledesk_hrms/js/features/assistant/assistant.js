/* =====================================================================
   PeopleDesk AI · "Ask PeopleDesk" · core: launcher, drawer, conversation, proposals, hooks.
   A rule-based assistant that answers only from records the signed-in person can already see
   (it calls the app's own can / scopeOf / inScope / canField checks) and never changes data
   without an explicit confirmation card. Intents live in assistant-intents.js.
   Conversation lives in memory only: it is cleared on Clear, sign-out and when the preview role changes.
   ===================================================================== */
(function () {
  'use strict';
  const A = {
    open: false,
    msgs: [],
    flow: null,
    rec: null,
    props: {},
    hand: {},
    n: 0,
    intents: [],
    greeted: false
  };
  const R = () => persona().role;
  const mob = () => innerWidth <= 900;
  const pick = o => (o[R()] !== undefined ? o[R()] : o.any || '');
  Object.assign(ICON, {
    spark:
      'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
    send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
    trash: 'M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6 M10 11v6 M14 11v6',
    copy: 'M9 9h11v11H9z M5 15V5h10',
    newchat:
      'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.4 2.6a2 2 0 0 1 3 3L12 15l-4 1 1-4z',
    link: 'M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1 M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1-1'
  });

  /* handlers are kept in a registry, so no generated text is ever evaluated as code */
  const H = fn => {
    const id = 'h' + ++A.n;
    A.hand[id] = fn;
    return id;
  };
  const btn = (label, fn, cls) =>
    `<button type="button" class="${cls || 'btn sm'}" onclick="PDAI.run('${H(fn)}')">${label}</button>`;
  const L = items => `<ul class="ai-ul">${items.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const P = t => `<p>${t}</p>`;
  const KV = rows =>
    `<dl class="ai-kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const flag = (sev, t) =>
    `<div class="ai-flag ${sev}">${ic(sev === 'info' ? 'help' : 'alert', 14)}<span>${t}</span></div>`;
  const goPage = (p, pre) => () => {
    if (mob()) closeAI();
    if (pre) pre();
    go(p);
  };
  const SRC = (label, p, pre) => [label, goPage(p, pre)];

  /* ---------- who is being asked about, always checked against the asker's scope ---------- */
  function who(text) {
    const lt = text.toLowerCase(),
      all = employees.filter(e => e.status !== 'Exited');
    let hit = all.find(e => lt.includes(e.name.toLowerCase()));
    if (!hit) {
      const fm = all.filter(e =>
        new RegExp('\\b' + e.name.split(' ')[0].toLowerCase() + "(?:'s|’s)?\\b").test(lt)
      );
      if (fm.length > 1) return { amb: fm };
      hit = fm[0];
    }
    return hit ? { e: hit, ok: hit.id === me().id || inScope('employees', hit.id) } : null;
  }

  /* ---------- dates in plain words ---------- */
  const MONS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const WDS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const mp = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*';
  const mkDate = (d, m) => {
    let x = new Date(TODAY.getFullYear(), m, d);
    if (x < addDays(TODAY, -60)) x = new Date(TODAY.getFullYear() + 1, m, d);
    return iso(x);
  };
  const nextWd = (w, from, incl) => {
    const x = new Date(from);
    if (!incl) x.setDate(x.getDate() + 1);
    while (x.getDay() !== w) x.setDate(x.getDate() + 1);
    return x;
  };
  function parseDates(t) {
    const lt = t.toLowerCase();
    let m = lt.match(/\d{4}-\d{2}-\d{2}/g);
    if (m) return { from: m[0], to: m[1] || m[0] };
    m = lt.match(
      new RegExp(
        '(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp +
          '\\s*(?:-|–|to|until|through)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp
      )
    );
    if (m)
      return { from: mkDate(+m[1], MONS.indexOf(m[2])), to: mkDate(+m[3], MONS.indexOf(m[4])) };
    m = lt.match(
      new RegExp(
        '(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:-|–|to|until|through|and)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp
      )
    );
    if (m)
      return { from: mkDate(+m[1], MONS.indexOf(m[3])), to: mkDate(+m[2], MONS.indexOf(m[3])) };
    m =
      lt.match(new RegExp('(\\d{1,2})(?:st|nd|rd|th)?\\s*' + mp)) ||
      lt.match(new RegExp(mp + '\\s*(\\d{1,2})\\b'));
    if (m) {
      const d = isNaN(+m[1]) ? +m[2] : +m[1],
        mo = MONS.indexOf(isNaN(+m[1]) ? m[1] : m[2]);
      return { from: mkDate(d, mo), to: mkDate(d, mo) };
    }
    const wd = [
      ...lt.matchAll(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/g)
    ].map(x => WDS.indexOf(x[1]));
    if (wd.length) {
      const f = nextWd(wd[0], TODAY, false),
        to = wd[1] != null ? nextWd(wd[1], f, true) : f;
      return { from: iso(f), to: iso(to) };
    }
    if (/day after tomorrow/.test(lt))
      return { from: iso(addDays(TODAY, 2)), to: iso(addDays(TODAY, 2)) };
    if (/\btomorrow\b/.test(lt))
      return { from: iso(addDays(TODAY, 1)), to: iso(addDays(TODAY, 1)) };
    if (/\btoday\b/.test(lt)) return { from: iso(TODAY), to: iso(TODAY) };
    return null;
  }

  /* ---------- messages ---------- */
  function say(m) {
    m.who = 'ai';
    m.at = new Date();
    m.id = ++A.n;
    A.msgs.push(m);
    paint();
    return m;
  }
  const deny = (why, extra) => say({ tag: 'denied', html: P(why) + (extra ? P(extra) : '') });
  const TAGS = {
    read: ['Read-only answer', 'spark'],
    draft: ['Draft · review before using', 'file'],
    action: ['Needs your confirmation', 'shield'],
    denied: ["Can't do that", 'lock'],
    info: ['', '']
  };
  const hhmm = d =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const AV = `<span class="ai-av" aria-hidden="true">${ic('spark', 14)}</span>`;
  const ICONFOR = q => {
    q = q.toLowerCase();
    return /leave|holiday/.test(q)
      ? 'cal'
      : /late|attendance|clock|punch/.test(q)
        ? 'clock'
        : /payslip|payroll|salary|variance/.test(q)
          ? 'wallet'
          : /train|certif/.test(q)
            ? 'book'
            : /approv|overdue/.test(q)
              ? 'approve'
              : /cover|roster|shift/.test(q)
                ? 'grid'
                : /document|verif/.test(q)
                  ? 'file'
                  : /onboard|offboard|joiner/.test(q)
                    ? 'swap'
                    : /recruit|pipeline/.test(q)
                      ? 'brief'
                      : /integration|sso|session|security/.test(q)
                        ? 'key'
                        : /permission|role|audit/.test(q)
                          ? 'shield'
                          : /draft|announce|message/.test(q)
                            ? 'receipt'
                            : 'spark';
  };
  function msgHTML(m) {
    if (m.who === 'me')
      return `<div class="ai-mr me"><div class="ai-m ai-u">${esc(m.text)}</div><time class="ai-time">${hhmm(m.at || new Date())}</time></div>`;
    if (m.typing)
      return `<div class="ai-mr">${AV}<div class="ai-m ai-a" aria-label="PeopleDesk AI is typing"><span class="ai-typing"><i></i><i></i><i></i></span></div></div>`;
    if (m.hero)
      return `<div class="ai-hero"><span class="ai-hero-i">${ic('spark', 22)}</span><h3>${m.hero[0]}</h3><p>${m.hero[1]}</p></div><div class="ai-lbl2">Try asking</div><div class="ai-cards">${m.cards.map(([q, fn]) => `<button type="button" class="ai-card" onclick="PDAI.run('${H(fn)}')"><span class="ai-ci">${ic(ICONFOR(q), 16)}</span><span>${esc(q)}</span>${ic('arrow', 14)}</button>`).join('')}</div>`;
    const t = TAGS[m.tag || 'read'],
      p = m.prop && A.props[m.prop];
    let h = `<div class="ai-mr">${AV}<div class="ai-m ai-a k-${m.tag || 'read'}${p ? ' ai-prop' : ''}">`;
    if (t[0])
      h += `<span class="ai-tag">${ic(t[1], 12)}${t[0]}<time>${hhmm(m.at || new Date())}</time></span>`;
    h += m.html || '';
    if (p) h += propHTML(p);
    if (m.draft) {
      const id = 'dr' + m.id;
      h += `<textarea class="ai-draft" id="${id}" aria-label="Draft text. You can edit it." oninput="PDAI.edit(${m.id},this.value)">${esc(m.draft.text)}</textarea><div class="ai-row">${btn(ic('copy', 14) + 'Copy', () => copyText(m.draft.text))}${(m.draft.use || []).map(([l, fn]) => btn(l, () => fn(m.draft.text), 'btn sm primary')).join('')}</div>`;
    }
    if (m.opts && m.opts.length)
      h += `<div class="ai-row">${m.opts.map(([l, fn]) => `<button type="button" class="ai-opt" onclick="PDAI.run('${H(fn)}')">${l}</button>`).join('')}</div>`;
    if (m.nav && m.nav.length)
      h += `<div class="ai-row">${m.nav.map(([l, fn, pri]) => btn(l + ic('arrow', 14), fn, pri === false ? 'btn sm' : 'btn sm primary')).join('')}</div>`;
    if (m.src && m.src.length)
      h += `<div class="ai-row ai-srcs"><span class="ai-lbl">Sources</span>${m.src.map(([l, fn]) => `<button type="button" class="ai-src" onclick="PDAI.run('${H(fn)}')">${ic('link', 12)}${l}</button>`).join('')}</div>`;
    return h + '</div></div>';
  }
  function paint() {
    const lg = document.getElementById('ai-log');
    if (!lg) return;
    const near = lg.scrollHeight - lg.scrollTop - lg.clientHeight < 80 || !lg.dataset.n;
    lg.innerHTML = A.msgs.map(msgHTML).join('');
    lg.dataset.n = A.msgs.length;
    if (near) lg.scrollTop = lg.scrollHeight;
    /* the clear (trash) button only exists once the person has said something */
    const clr = document.getElementById('ai-clear');
    if (clr) clr.hidden = !A.msgs.some(m => m.who === 'me');
  }
  function copyText(t) {
    const ok = () => toast('Draft copied');
    try {
      navigator.clipboard
        .writeText(t)
        .then(ok, () => toast('Select the text and copy it', null, 'err'));
    } catch (e) {
      toast('Select the text and copy it', null, 'err');
    }
  }

  /* ---------- proposals: the only way the assistant changes anything ---------- */
  function propose(p) {
    const id = 'p' + ++A.n;
    A.props[id] = Object.assign({ id, step: 1, state: 'open', vals: {} }, p);
    (p.fields || []).forEach(f => (A.props[id].vals[f.id] = f.value || ''));
    return say({ tag: 'action', html: '', prop: id });
  }
  function propHTML(p) {
    let h = `<div class="ai-pt">${p.title}</div>`;
    if (p.state === 'open') {
      h += KV(p.rows || []) + (p.flags || '');
      (p.fields || []).forEach(f => {
        h += `<div class="ai-pf"><label class="small" for="pf-${p.id}-${f.id}"><b>${f.label}</b></label><textarea id="pf-${p.id}-${f.id}" rows="3" oninput="PDAI.val('${p.id}','${f.id}',this.value)" placeholder="${esc(f.ph || '')}">${esc(p.vals[f.id])}</textarea></div>`;
      });
      if (p.risk === 'high')
        h += `<div class="ai-risk"><b>${ic('alert', 14)} High-impact action</b>${p.impact || ''}</div>`;
      if (p.risk === 'high' && p.step === 2)
        h += `<label class="ai-ack"><input type="checkbox" onchange="document.getElementById('go-${p.id}').disabled=!this.checked"><span>${p.ack || 'I understand the impact above and want to go ahead.'}</span></label><div class="ai-row">${btn(
          'Back',
          () => {
            p.step = 1;
            paint();
          },
          'btn sm'
        )}<button type="button" class="btn sm primary" id="go-${p.id}" disabled onclick="PDAI.confirm('${p.id}')">${p.confirm2 || 'Confirm and run'}</button></div>`;
      else
        h += `<div class="ai-row"><button type="button" class="btn sm primary" onclick="PDAI.confirm('${p.id}')">${p.confirm || 'Confirm'}${p.risk === 'high' ? ' …' : ''}</button>${btn('Cancel', () => cancelProp(p.id), 'btn sm')}</div>`;
    } else if (p.state === 'done') {
      h += `<div class="ai-res ok">${ic('check', 16)}<span>${p.msg}</span></div>`;
      if (p.undo && p.undoOK && p.undoOK())
        h += `<div class="ai-row">${btn('Undo', () => doUndo(p.id), 'btn sm')}</div>`;
      if (p.after)
        h += `<div class="ai-row">${p.after.map(([l, fn]) => btn(l + ic('arrow', 14), fn, 'btn sm')).join('')}</div>`;
    } else if (p.state === 'failed')
      h += `<div class="ai-res bad">${ic('alert', 16)}<span>${p.msg}</span></div><p class="small muted" style="margin-top:6px">Nothing was changed.</p>`;
    else h += `<div class="ai-res mute">${ic('x', 16)}<span>${p.msg}</span></div>`;
    return h;
  }
  function cancelProp(id) {
    const p = A.props[id];
    p.state = 'cancelled';
    p.msg = 'Cancelled. Nothing was changed.';
    paint();
  }
  function confirmProp(id) {
    const p = A.props[id];
    if (!p || p.state !== 'open') return;
    const bad = (p.fields || []).find(f => f.required && !String(p.vals[f.id] || '').trim());
    if (bad) return toast(bad.label + ' is required', null, 'err');
    const c = p.check ? p.check(p.vals) : { ok: true };
    if (!c.ok) {
      p.state = 'failed';
      p.msg = esc(c.why);
      return paint();
    }
    if (p.risk === 'high' && p.step === 1) {
      p.step = 2;
      return paint();
    }
    let r;
    try {
      r = p.run(p.vals);
    } catch (e) {
      console.error(e);
      r = { ok: false, why: 'Something went wrong, so I stopped.' };
    }
    p.state = r.ok ? 'done' : 'failed';
    p.msg = r.ok ? r.msg : esc(r.why);
    if (r.ok) p.after = r.after;
    paint();
  }
  function doUndo(id) {
    const p = A.props[id],
      r = p.undo();
    p.msg = r.ok ? r.msg : p.msg;
    if (r.ok) p.undo = null;
    else toast(r.why || 'This can no longer be undone', null, 'err');
    paint();
  }
  /* every confirmed action leaves a trace in the audit log, separate from the workflow's own entry */
  const auditAI = (act, rec, o) =>
    audit(
      'PeopleDesk AI: ' + act,
      rec,
      Object.assign({ reason: 'Confirmed by ' + me().name + ' in the assistant' }, o)
    );

  /* ---------- context ---------- */
  function ctx() {
    const pg = S.page,
      name =
        pg === 'payroll' && ['hr', 'admin'].includes(R())
          ? 'Payroll review'
          : pg === 'dashboard'
            ? 'Home'
            : label(pg);
    let rec = '';
    const r = A.rec;
    if (r) {
      if (r.t === 'emp') rec = (emp(r.id) || {}).name || '';
      else if (r.t === 'req') {
        const q = KIND[r.k].list().find(x => x.id === r.id);
        rec = q ? `${emp(q.emp).name}'s ${KIND[r.k].n.toLowerCase()}` : '';
      } else rec = r.t === 'cand' ? 'candidate' : r.t === 'ticket' ? 'request ' + r.id : r.t;
    }
    const sel = S.sel && S.sel.ids && S.sel.ids.length ? ` · ${S.sel.ids.length} selected` : '';
    return { page: pg, name, rec, line: `Helping with ${name}${rec ? ' · ' + rec : ''}${sel}` };
  }
  function suggest() {
    const base = {
      employee: [
        'How many earned leaves do I have left?',
        'Help me apply for leave',
        'Why is my attendance showing late?',
        'Explain the deductions in my payslip',
        'What training is due for me?'
      ],
      manager: [
        'Show my pending approvals',
        'Who is on leave next week?',
        'Will my team have enough coverage on Friday?',
        'Summarize team attendance'
      ],
      hr: [
        'Which employees have pending document verification?',
        "What's blocking onboarding?",
        'Summarize recruitment pipeline status',
        'Which certifications are expiring in the next 30 days?'
      ],
      admin: [
        'What is blocking October payroll?',
        'Show payroll variance compared with last month',
        'Which approvals are overdue?',
        'Draft a Diwali shutdown announcement'
      ],
      sysadmin: [
        'Which integrations are failing?',
        'Show recent permission changes',
        'How do I configure SSO?',
        'Which users have active sessions?'
      ]
    }[R()];
    const pg = {
      leave: {
        employee: ['Help me apply for leave', 'Explain the leave policy'],
        any: ['Show my pending approvals', 'Who is on leave next week?']
      },
      attendance: {
        employee: ['Why is my attendance showing late?', 'How do I fix a missed punch?'],
        any: ['Summarize team attendance']
      },
      payroll: {
        employee: ['Explain the deductions in my payslip'],
        admin: [
          'What is blocking October payroll?',
          'Show payroll variance compared with last month'
        ],
        hr: ['What is blocking October payroll?']
      },
      employees: {
        hr: ['Which employees have pending document verification?'],
        any: ['Who from my team is on leave next week?']
      },
      requests: {
        employee: ['What is the status of my requests?', 'How do I raise an expense claim?']
      },
      reports: { any: ['Explain the headcount, attrition and attendance trends'] },
      settings: {
        admin: ['How do I change the leave policy?'],
        sysadmin: ['How do I configure SSO?', 'Explain roles and permissions']
      },
      approvals: { any: ['What needs my attention?', 'Which approvals are overdue?'] }
    }[S.page];
    const extra = pg ? pg[R()] || pg.any || [] : [];
    return [...extra, ...base].filter((x, i, a) => a.indexOf(x) === i).slice(0, 5);
  }
  function chips() {
    const c = [
      ['Explain this page', 'Explain this page'],
      ['What needs my attention?', 'What needs my attention?']
    ];
    if (A.rec) c.push(['Summarize this record', 'Summarize this record']);
    c.push(
      ['Draft a message', 'Draft a message'],
      ['How do I complete this task?', 'How do I complete this task?']
    );
    return c;
  }
  function paintChrome() {
    const cx = document.getElementById('ai-ctx');
    if (cx) cx.textContent = ctx().line;
    const ch = document.getElementById('ai-chips');
    if (ch) ch.hidden = !A.msgs.some(m => m.who === 'me');
    if (ch)
      ch.innerHTML = chips()
        .map(
          ([l, q]) =>
            `<button type="button" onclick="PDAI.ask(${JSON.stringify(q).replace(/"/g, '&quot;')})">${l}</button>`
        )
        .join('');
  }

  /* ---------- panel ---------- */
  function build() {
    if (document.getElementById('ai-fab')) return;
    document.body.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="ai-fab" id="ai-fab" aria-haspopup="dialog" aria-expanded="false" aria-controls="ai-panel" aria-label="Ask PeopleDesk, the assistant" onclick="PDAI.toggle()">${ic('spark', 20)}<span class="ai-fl">Ask PeopleDesk</span></button>
      <div class="ai-scrim" id="ai-scrim" onclick="PDAI.close()"></div>
      <aside class="ai-panel" id="ai-panel" role="dialog" aria-label="Ask PeopleDesk" inert>
        <div class="ai-h"><span class="ai-grab"></span><span class="ai-logo">${ic('spark', 18)}</span><div class="grow"><h2>Ask PeopleDesk</h2><span class="ai-ctx" id="ai-ctx"></span></div>
          <button type="button" class="icon-btn" id="ai-clear" aria-label="Start a new chat" title="New chat" onclick="PDAI.clear()">${ic('newchat', 17)}</button>
          <button type="button" class="icon-btn" aria-label="Close assistant" title="Close" onclick="PDAI.close()">${ic('x', 17)}</button></div>
        <div class="ai-log" id="ai-log" role="log" aria-live="polite" aria-label="Conversation" tabindex="0"></div>
        <div class="ai-chips" id="ai-chips" aria-label="Quick replies"></div>
        <form class="ai-in" onsubmit="PDAI.submit(event)"><label class="sr" for="ai-q">Ask PeopleDesk</label><textarea id="ai-q" rows="1" placeholder="Ask about your work, or say what you need" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();PDAI.submit(event)}" oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"></textarea><button class="btn primary" type="submit" aria-label="Send">${ic('send', 16)}</button></form>
        <p class="ai-foot">Uses only records you can access. Changes need your confirmation.</p>
      </aside>`
    );
    document.getElementById('ai-panel').addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeAI();
      }
    });
  }
  function welcome() {
    const u = me(),
      cap = {
        employee:
          'check leave balances, help you apply for leave, explain late marks and payslip components, and track your requests and training',
        manager:
          'summarise your approvals, check team leave and shift cover, and draft approval or rejection comments',
        hr: 'summarise employee records, document verification, onboarding and offboarding tasks, recruitment and training compliance',
        admin:
          'explain what is blocking payroll, compare it with last month, summarise approvals and attendance, and draft announcements',
        sysadmin:
          'explain roles, permissions and security settings, and review audit and integration status. I do not have access to employee or payroll data'
      }[R()];
    say({
      tag: 'info',
      hero: [`Hi ${esc(u.name.split(' ')[0])}, how can I help?`, `I can ${cap}.`],
      cards: suggest().map(q => [q, () => ask(q)])
    });
  }
  function openAI(q) {
    build();
    A.open = true;
    const p = document.getElementById('ai-panel');
    p.removeAttribute('inert');
    p.classList.add('open');
    document.getElementById('ai-scrim').classList.add('open');
    document.getElementById('ai-fab').setAttribute('aria-expanded', 'true');
    if (!A.msgs.length) welcome();
    paint();
    paintChrome();
    if (q) ask(q);
    else if (!mob()) setTimeout(() => document.getElementById('ai-q').focus(), 60);
  }
  function closeAI() {
    const p = document.getElementById('ai-panel');
    if (!p) return;
    A.open = false;
    p.classList.remove('open');
    p.setAttribute('inert', '');
    document.getElementById('ai-scrim').classList.remove('open');
    const f = document.getElementById('ai-fab');
    f.setAttribute('aria-expanded', 'false');
    f.focus({ preventScroll: true });
  }
  function reset() {
    A.msgs = [];
    A.flow = null;
    A.props = {};
    A.hand = {};
    A.rec = null;
    A.last = null;
    paint();
    if (A.open) {
      welcome();
      paintChrome();
    }
  }

  /* ---------- the conversation ---------- */
  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    if (!A.open) openAI();
    A.msgs.push({ who: 'me', id: ++A.n, text, at: new Date() });
    const typing = { who: 'ai', id: ++A.n, typing: true };
    A.msgs.push(typing);
    paint();
    setTimeout(() => {
      A.msgs = A.msgs.filter(m => m !== typing);
      try {
        route(text);
      } catch (e) {
        console.error(e);
        say({
          tag: 'denied',
          html: P(
            'Something went wrong while I was working on that, so I stopped. Nothing was changed. Please try again or rephrase.'
          )
        });
      }
      paintChrome();
    }, 320);
  }
  function route(text) {
    const lt = text.toLowerCase();
    if (/^(cancel|stop|never ?mind|forget it)\b/.test(lt) && A.flow) {
      A.flow = null;
      return say({ tag: 'info', html: P('Okay, I have stopped that. Nothing was changed.') });
    }
    if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(lt) && lt.length < 30)
      return welcome();
    if (/^(thanks|thank you|thx)/.test(lt))
      return say({
        tag: 'info',
        html: P('You are welcome. Ask me anything else about your work.')
      });
    if (/\b(clear|reset|delete)\b.*\b(chat|conversation|history)\b/.test(lt)) return reset();
    for (const it of A.intents) {
      if (it.when(lt, text)) {
        const gate = it.gate && it.gate(lt);
        if (gate) return deny(gate);
        return it.run(text, lt);
      }
    }
    return K.fallback(text);
  }

  const K = {
    A,
    R,
    mob,
    pick,
    H,
    btn,
    L,
    P,
    KV,
    flag,
    goPage,
    SRC,
    who,
    parseDates,
    nextWd,
    say,
    deny,
    propose,
    auditAI,
    ctx,
    suggest,
    ask,
    openAI,
    closeAI,
    reset,
    paint,
    add: (when, run, gate) => A.intents.push({ when, run, gate }),
    addFirst: (when, run, gate) => A.intents.unshift({ when, run, gate })
  };
  K.fallback = text => {
    say({
      tag: 'info',
      html: P("I'm not sure how to help with that yet. Here are some things I can do for you:"),
      opts: suggest().map(q => [esc(q), () => ask(q)])
    });
  };

  /* ---------- public handle used by inline handlers ---------- */
  window.PDAI = {
    K,
    open: openAI,
    close: closeAI,
    toggle: () => (A.open ? closeAI() : openAI()),
    clear: () => {
      reset();
      toast('New chat started');
    },
    ask,
    run: id => A.hand[id] && A.hand[id](),
    confirm: confirmProp,
    val: (pid, fid, v) => (A.props[pid].vals[fid] = v),
    edit: (mid, v) => {
      const m = A.msgs.find(x => x.id === mid);
      if (m && m.draft) m.draft.text = v;
    },
    submit: e => {
      e.preventDefault();
      const q = document.getElementById('ai-q');
      const v = q.value;
      q.value = '';
      q.style.height = 'auto';
      ask(v);
    },
    page: () => {
      const c = ctx();
      openAI();
      ask('Explain this page');
    }
  };

  /* ---------- hooks into the existing app ---------- */
  const PAGES_WITH_HELP = [
    'dashboard',
    'attendance',
    'leave',
    'payroll',
    'employees',
    'requests',
    'reports',
    'settings',
    'approvals',
    'lifecycle',
    'recruit',
    'roster'
  ];
  const _render = render;
  render = function () {
    _render.apply(this, arguments);
    build();
    const v = document.getElementById('view');
    if (v && PAGES_WITH_HELP.includes(S.page) && S.authed) {
      const host = v.querySelector('.ph .acts, .hometop') || v.querySelector('.ph');
      if (host && !host.querySelector('.ai-ctxbtn')) {
        const b = `<button type="button" class="btn ai-ctxbtn" onclick="PDAI.page()" aria-label="Ask PeopleDesk about this page">${ic('spark', 16)}<span>Ask about this page</span></button>`;
        if (host.classList.contains('ph') && !host.querySelector('.acts'))
          host.insertAdjacentHTML('beforeend', `<div class="acts">${b}</div>`);
        else host.insertAdjacentHTML('afterbegin', b);
      }
    }
    if (A.open) paintChrome();
  };
  const _go = go;
  go = function () {
    A.rec = null;
    return _go.apply(this, arguments);
  };
  const _closeModal = closeModal;
  closeModal = function () {
    A.rec = null;
    const r = _closeModal.apply(this, arguments);
    if (A.open) paintChrome();
    return r;
  };
  /* remember the record the person is looking at, so "summarize this" knows what "this" is */
  [
    ['empProfile', id => ({ t: 'emp', id })],
    ['reqDetail', (k, id) => ({ t: 'req', k, id })],
    ['candDetail', id => ({ t: 'cand', id })],
    ['ticketDetail', id => ({ t: 'ticket', id })],
    ['assetDetail', id => ({ t: 'asset', id })],
    ['incView', id => ({ t: 'inc', id })],
    ['courseDetail', i => ({ t: 'course', i })],
    ['payslipDetail', id => ({ t: 'slip', id })]
  ].forEach(([fn, mk]) => {
    const o = window[fn];
    if (typeof o !== 'function') return;
    window[fn] = function () {
      const r = o.apply(this, arguments);
      A.rec = mk.apply(null, arguments);
      if (A.open) paintChrome();
      return r;
    };
  });
  ['setRole', 'signOut', 'finishLogin'].forEach(fn => {
    const o = window[fn];
    window[fn] = function () {
      const r = o.apply(this, arguments);
      reset();
      if (fn === 'signOut') closeAI();
      return r;
    };
  });
  /* Ctrl+K: Ask PeopleDesk is one of the results */
  const _cmdRender = cmdRender;
  cmdRender = function (q0) {
    _cmdRender(q0);
    const raw = (q0 || '').trim();
    if (raw.startsWith('>')) return;
    const it = {
      g: 'Ask PeopleDesk',
      t: raw ? `Ask: “${raw}”` : 'Ask PeopleDesk',
      s: raw ? 'Get an answer or guided help' : 'Open the assistant for help on this page',
      i: 'spark',
      fn: () => {
        closeModal();
        openAI(raw);
      }
    };
    if (raw) cmdItems.push(it);
    else cmdItems.unshift(it);
    cmdPaint();
  };
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === '/' && S.authed) {
      e.preventDefault();
      A.open ? closeAI() : openAI();
    }
  });
  if (S.authed) build();
  else document.addEventListener('DOMContentLoaded', build);
  build();
})();
