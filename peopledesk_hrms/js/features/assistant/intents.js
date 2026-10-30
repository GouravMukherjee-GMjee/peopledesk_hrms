/* =====================================================================
   PeopleDesk AI · intents. Every handler reads through the app's own permission helpers
   (can, scopeOf, inScope, canField, scoped) and cites where the data came from.
   Anything that writes goes through K.propose(): show, confirm, run, audit.
   ===================================================================== */
(function (K) {
  'use strict';
  const {
    R,
    pick,
    L,
    P,
    KV,
    flag,
    SRC,
    say,
    deny,
    propose,
    auditAI,
    who,
    parseDates,
    btn,
    H,
    add,
    addFirst,
    A,
    goPage,
    nextWd
  } = K;
  const nm = s => esc(s);
  const fday = d =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  const range = (f, t) => (f === t ? fday(f) : fday(f) + ' to ' + fday(t));
  const runStr = s => () => {
    if (K.mob()) K.closeAI();
    new Function(s)(); // strings written by the app's own checks (ids only), never user text
  };
  const open = fn => () => {
    if (K.mob()) K.closeAI();
    fn();
  };
  const hasTxt = (lt, re) => re.test(lt);
  const nothing = what => say({ tag: 'read', html: P(what) });
  const noAccess = (what, how) =>
    deny(`${what} is not available to your role (${persona().n}).`, how);
  const person = (text, res) => {
    const w = who(text);
    if (w && w.amb) return { amb: w.amb };
    return w;
  };
  const askWhich = (list, fn) =>
    say({
      tag: 'read',
      html: P('Which one do you mean?'),
      opts: list.map(x => [nm(x.l), () => fn(x.v)])
    });
  const SCOPE_MSG = e =>
    deny(
      `${nm(e.name)} is outside your access. You can only see people in your own scope (${nm(scopeLabel())}).`
    );
  const scopeLabel = () =>
    (SCOPES.find(s => s[0] === scopeOf('employees')) || ['', 'your own records'])[1].toLowerCase();

  /* ---------- page guidance ---------- */
  const PH = {
    dashboard: {
      about: {
        employee:
          'Your home screen: clock in and out, this week and month of attendance, leave balance, your latest payslip, and anything that needs your attention.',
        sysadmin:
          'System home: accounts by role, privileged accounts, two-step coverage and recent system changes.',
        any: "Your home screen: today's clock-in, requests waiting for you, headline numbers (headcount, attendance, leave, openings), team attendance and workforce charts."
      },
      tasks: {
        employee: [
          'Press Clock in when you start your shift.',
          'Use the shortcuts to apply for leave or open your payslip.',
          'Work through “Needs your attention”.'
        ],
        sysadmin: [
          'Open Manage users to review accounts and roles.',
          'Use Security to check two-step coverage and timeouts.'
        ],
        any: [
          'Check the approvals strip and open anything marked overdue.',
          'Select a KPI card to open the page behind it.',
          'Use Customize home to hide or reorder sections.'
        ]
      }
    },
    attendance: {
      about: {
        employee:
          'Your attendance calendar and punches. Select a day to see times, late marks and verification checks.',
        any: 'Attendance for you and your team, with punches, late marks and corrections.'
      },
      tasks: {
        employee: [
          'Select the day in the calendar.',
          'Choose Request correction and say what happened (missed punch, wrong time).',
          'Your manager approves it, then the day updates.'
        ],
        any: [
          'Select a person or a day to see punches.',
          'Open Approvals to decide correction requests.'
        ]
      }
    },
    leave: {
      about: {
        employee:
          'Your leave balances and requests. Weekends, weekly offs and holidays on your calendar are not charged.',
        any: 'Leave balances, your requests and your team requests waiting for approval.'
      },
      tasks: {
        employee: [
          'Choose Apply for leave.',
          'Pick the type and dates. I show the days charged and any teammate clash.',
          'Add a reason (and a certificate for sick leave over the policy limit), then submit.'
        ],
        any: [
          'Open Team requests.',
          'Select a request to see balance, overlaps and route, then approve or reject.'
        ]
      }
    },
    payroll: {
      about: {
        employee: 'Your payslips, with earnings, deductions and net pay.',
        manager: 'Your own payslips. Team pay is not visible to managers.',
        any: 'The monthly payroll run: attendance lock, checks, approval and payment.'
      },
      tasks: {
        employee: ['Select a month to open the payslip.', 'Use Download to save a PDF.'],
        manager: ['Select a month to open your payslip.'],
        any: [
          'Fix every blocking issue under Checks.',
          'Acknowledge warnings, then submit for approval.',
          'A different person approves it, then the bank file is generated.'
        ]
      }
    },
    employees: {
      about: {
        any: 'People in your scope with department, location and status. Open a person for their profile, jobs, assets and documents.'
      },
      tasks: {
        any: [
          'Search or filter, then select a person.',
          'Use the tabs for overview, employment, assets and documents.'
        ]
      }
    },
    requests: {
      about: {
        employee: 'Expense claims, helpdesk requests and document requests, with their status.',
        any: 'Claims, helpdesk tickets and document requests in your scope.'
      },
      tasks: {
        employee: [
          'Choose New claim or New request.',
          'Fill in the details and submit. Your manager or HR picks it up.',
          'Track it from the same page.'
        ],
        any: ['Open a ticket to reply or resolve it.', 'Approve claims from Approvals.']
      }
    },
    reports: {
      about: { any: 'Ready-made reports on workforce, attendance, leave and more, with download.' },
      tasks: {
        any: [
          'Open a report to preview it.',
          'Use Download for CSV or PDF.',
          'Some figures are marked Sample where data is not connected yet.'
        ]
      }
    },
    settings: {
      about: {
        sysadmin: 'Users, roles and access, security and integrations.',
        any: 'Work policies, statutory settings and preferences. Changes are versioned with an effective date.'
      },
      tasks: {
        sysadmin: [
          'Roles and access: set what each role can do and see.',
          'Security: two-step, password length and session timeout.',
          'Integrations: bank, SSO, devices, email (placeholders in this demo).'
        ],
        any: [
          'Pick the tab (Work policies or Statutory).',
          'Change a value and choose when it takes effect.',
          'Add a reason: it is kept in the audit log.'
        ]
      }
    },
    approvals: {
      about: {
        any: 'One queue for leave, claims and attendance corrections waiting for you, oldest due first.'
      },
      tasks: {
        any: [
          'Open a request to see the balance, overlaps and route.',
          'Approve, or reject with a reason the person will see.',
          'Use Overdue to catch late requests.'
        ]
      }
    },
    lifecycle: {
      about: { any: 'Onboarding and offboarding tasks, each with an owner and a due date.' },
      tasks: {
        any: [
          'Tick tasks as they are done (some update themselves).',
          'Clearance must finish before an exit can be completed.'
        ]
      }
    },
    recruit: {
      about: { any: 'The hiring pipeline by stage, with open positions and candidates.' },
      tasks: {
        any: ['Drag a candidate to the next stage.', 'Open a candidate to review or reject.']
      }
    },
    roster: {
      about: { any: 'Shift roster for the week. Cells show the shift; conflicts are highlighted.' },
      tasks: {
        any: ['Select a cell to change a shift.', 'Watch for highlighted conflicts before saving.']
      }
    },
    performance: {
      about: { any: 'Goals and reviews.' },
      tasks: { any: ['Update progress on a goal.', 'Managers open a person to add a review.'] }
    },
    training: {
      about: { any: 'Courses, completion and certificate expiry.' },
      tasks: { any: ['Open a course to start or continue it.', 'Renew anything close to expiry.'] }
    },
    safety: {
      about: { any: 'Incidents and their investigation status.' },
      tasks: {
        any: [
          'Report an incident from the page.',
          'Managers and HR close incidents after investigation.'
        ]
      }
    },
    assets: {
      about: { any: 'Company assets and who holds them.' },
      tasks: {
        any: ['Open an asset for its history.', 'Confirm receipt or return items from the asset.']
      }
    },
    org: {
      about: { any: 'Reporting lines. Reporting changes can take effect on a later date.' },
      tasks: { any: ['Open a person to see their line.'] }
    },
    audit: {
      about: { any: 'A record of who changed what and when.' },
      tasks: { any: ['Filter by action or person.', 'Open a row to see before and after values.'] }
    },
    profile: {
      about: { any: 'Your own details, documents and job history.' },
      tasks: { any: ['Use Edit to update contact details.', 'Upload documents HR asks for.'] }
    }
  };
  const pageHelp = () => {
    const pg = S.page,
      h = PH[pg],
      name = label(pg);
    if (!h) return say({ tag: 'read', html: P(`This is ${nm(name)}.`), src: [SRC(name, pg)] });
    const about = pick(h.about),
      tasks = pick(h.tasks);
    say({
      tag: 'read',
      html:
        P(`<b>${nm(name)}</b>: ${about}`) +
        (tasks && tasks.length ? `<div class="ai-lbl">What you can do here</div>` + L(tasks) : ''),
      src: [SRC(name, pg)]
    });
  };
  add(
    lt =>
      /(explain|describe|what('?s| is)|tell me about).*\b(this|the) (page|screen)\b|what can i do (on|in|here)|help with this page/.test(
        lt
      ),
    pageHelp
  );
  add(
    lt =>
      /how (do|can|should) i (complete|finish|do) this|how do i complete this task|next step/.test(
        lt
      ),
    () => {
      const h = PH[S.page];
      if (!h) return pageHelp();
      const t = pick(h.tasks);
      say({
        tag: 'read',
        html:
          P(`Steps on <b>${nm(label(S.page))}</b>:`) +
          `<ol class="ai-ul">${t.map(x => `<li>${x}</li>`).join('')}</ol>`,
        src: [SRC(label(S.page), S.page)]
      });
    }
  );

  /* ---------- what needs attention ---------- */
  add(
    lt =>
      /what needs my attention|needs (my )?attention|what('?s| is) (pending|urgent)( for me| right now| today)?\??$|anything urgent/.test(
        lt
      ),
    () => {
      const items = [],
        r = R();
      if (r === 'sysadmin') {
        const noMfa = ROLE_DEF.filter(x => x.k !== 'employee' && !S.sec.twoFA[x.k]).map(x => x.n);
        if (noMfa.length)
          items.push({
            t: `Two-step verification is off for: ${nm(noMfa.join(', '))}`,
            go: ['Security', 'settings', () => (S.tab.st = 'security')]
          });
        if (S.sec.minLen < 12)
          items.push({
            t: `Minimum password length is ${S.sec.minLen}. 12 or more is recommended.`,
            go: ['Security', 'settings', () => (S.tab.st = 'security')]
          });
        items.push({
          t: 'Integrations: none are connected in this demo (bank, SSO, devices, email).',
          go: ['Integrations', 'settings', () => (S.tab.st = 'integrations')]
        });
      } else {
        if (can('approvals', 'view')) {
          const ap = queue('mine'),
            od = queue('overdue');
          if (ap.length)
            items.push({
              t: `${ap.length} approval${ap.length > 1 ? 's' : ''} waiting for you${od.length ? `, ${od.length} overdue` : ''}`,
              go: ['Approvals', 'approvals', () => (S.tab.ap = od.length ? 'overdue' : 'mine')]
            });
        }
        if (['hr', 'admin'].includes(r) && can('payroll', 'view') && S.payStep <= 2) {
          const c = payCheck();
          if (c.err.length || c.warn.length)
            items.push({
              t: `Payroll: ${c.err.length} blocking issue${c.err.length === 1 ? '' : 's'} and ${c.warn.length} warning${c.warn.length === 1 ? '' : 's'}`,
              go: ['Payroll', 'payroll']
            });
        }
        const inc = S.incidents.filter(i => i.st !== 'Closed').length;
        if (inc && r !== 'employee' && can('safety', 'view'))
          items.push({
            t: `${inc} open safety incident${inc > 1 ? 's' : ''} need investigation`,
            go: ['Safety', 'safety']
          });
        const exp = S.courses.filter(c => c.exp <= iso(addDays(TODAY, 30)));
        if (exp.length && r !== 'employee' && can('training', 'view'))
          items.push({
            t: `${exp.length} certificate${exp.length > 1 ? 's' : ''} expire within 30 days (${nm(exp.map(c => c.n).join(', '))})`,
            go: ['Training', 'training']
          });
        attentionItems(me().id)
          .slice(0, 5)
          .forEach(x => items.push({ t: `${nm(x.t)}. ${nm(x.s)}`, run: x.act, cta: x.cta }));
      }
      if (!items.length)
        return say({
          tag: 'read',
          html: P('You are all caught up. Nothing needs your action right now.')
        });
      say({
        tag: 'read',
        html:
          P('Here is what needs your attention:') +
          L(
            items.map(
              i =>
                i.t +
                (i.go
                  ? ' ' + btn(i.go[0], K.goPage(i.go[1], i.go[2]), 'btn sm')
                  : i.run
                    ? ' ' + btn(nm(i.cta || 'Open'), runStr(i.run), 'btn sm')
                    : '')
            )
          ),
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );

  /* ---------- leave: balance, policy, guided application ---------- */
  const typeOf = lt =>
    /earned|\bel\b/.test(lt)
      ? 'EL'
      : /casual|\bcl\b/.test(lt)
        ? 'CL'
        : /sick|\bsl\b|fever|medical|unwell/.test(lt)
          ? 'SL'
          : '';
  add(
    lt =>
      /(how many|balance|left|remaining|available).*(leave|casual|sick|earned|\bcl\b|\bsl\b|\bel\b)|leave balance|my leaves?\b/.test(
        lt
      ) && !/apply|help me|policy|who|team|approv/.test(lt),
    (text, lt) => {
      let e = me();
      const w = person(text);
      if (w && w.e && w.e.id !== e.id) {
        if (!w.ok || !can('leave', 'view') || !inScope('leave', w.e.id))
          return w.e ? SCOPE_MSG(w.e) : null;
        e = w.e;
      }
      const b = balances(e.id),
        t = typeOf(lt),
        self = e.id === me().id;
      const order = t ? [t, ...Object.keys(b).filter(k => k !== t)] : Object.keys(b);
      const pend = S.leaves.filter(l => l.emp === e.id && l.status === 'Pending');
      say({
        tag: 'read',
        html:
          (t
            ? P(
                `${self ? 'You have' : nm(e.name) + ' has'} <b>${b[t].left} days</b> of ${POLICY[t].n.toLowerCase()} left (${b[t].used} of ${POLICY[t].t} used this year).`
              )
            : P(`${self ? 'Your' : nm(e.name) + "'s"} leave balance this year:`)) +
          L(order.map(k => `${POLICY[k].n}: <b>${b[k].left}</b> of ${POLICY[k].t} days left`)) +
          (pend.length
            ? P(
                `${pend.length} request${pend.length > 1 ? 's are' : ' is'} still pending (${pend.reduce((a, l) => a + l.days, 0)} days). Pending days are not yet deducted.`
              )
            : ''),
        src: [SRC('Leave balances', 'leave')],
        nav: self ? [['Apply for leave', () => leaveFlow('Apply for leave')]] : []
      });
    }
  );
  add(
    lt =>
      /\bpolic(y|ies)\b|rules? (for|about)|probation|notice period|carry forward|grace period|working hours|medical certificate/.test(
        lt
      ) && !/draft|write/.test(lt),
    (text, lt) => {
      const w = W(),
        parts = [];
      if (
        /leave|casual|sick|earned|carry|certificate|notice/.test(lt) ||
        !/probation|attendance|grace|hours|document/.test(lt)
      )
        parts.push([
          'Leave',
          [
            `Yearly entitlement: ${Object.values(POLICY)
              .map(p => `${p.n} ${p.t} days`)
              .join(', ')}.`,
            `Earned leave needs ${w.noticeEL} working days' notice. Up to ${w.carryEL} earned days can carry forward.`,
            `Sick leave longer than ${w.certDays} days needs a medical certificate.`,
            'Weekly offs and company holidays on your calendar are not charged. Requests older than 7 days also need HR approval.'
          ]
        ]);
      if (/probation/.test(lt))
        parts.push([
          'Probation',
          [
            `Probation is ${w.probation} months from the joining date.`,
            'HR confirms the employee at the end of probation.'
          ]
        ]);
      if (/attendance|grace|hours|late/.test(lt))
        parts.push([
          'Attendance',
          [
            `Standard day is ${w.hours} hours. Grace time is ${w.grace} minutes after shift start; later punches are marked late.`,
            `Working week: Office ${w.week.Office} days, Plant ${w.week.Plant} days. Overtime is paid at ${w.ot}.`
          ]
        ]);
      if (/document/.test(lt))
        parts.push([
          'Documents',
          [
            `HR verifies: ${VDOCS.map(d => d[1]).join(', ')}.`,
            'If a file cannot be verified, HR asks for a new upload.'
          ]
        ]);
      say({
        tag: 'read',
        html:
          parts.map(([h, a]) => `<b>${h}</b>` + L(a)).join('') +
          P(
            '<span class="muted small">This is the policy as configured in PeopleDesk. For exceptions, confirm with HR.</span>'
          ),
        src: [SRC('Settings · Work policies', 'settings', () => (S.tab.st = 'policy'))].filter(s =>
          okPage('settings')
        )
      });
    }
  );

  /* guided leave application: collect type, dates, reason, then show a confirmation card */
  const leaveCheck = s => {
    const e = me(),
      w = W(),
      c = leaveCalc(e, s.from, s.to, !!s.half),
      b = balances(e.id)[s.type],
      err = [],
      warn = [];
    if (s.to < s.from) err.push('The end date is before the start date.');
    if (!c.chargeable)
      err.push(
        'Those dates are all non-working days on your calendar, so nothing would be charged.'
      );
    if (c.chargeable > b.left)
      err.push(
        `Not enough balance: you have ${b.left} days of ${POLICY[s.type].n.toLowerCase()} and this needs ${c.chargeable}.`
      );
    if (
      S.leaves.some(
        l =>
          l.emp === e.id &&
          ['Pending', 'Approved'].includes(l.status) &&
          l.from <= s.to &&
          s.from <= l.to
      )
    )
      err.push('You already have leave on some of these dates.');
    const cert = s.type === 'SL' && c.chargeable > w.certDays;
    if (cert)
      err.push(
        `A medical certificate is required for sick leave over ${w.certDays} days. I cannot attach files, so use the form to add it.`
      );
    if (s.type === 'EL' && c.chargeable && s.from < addWork(iso(TODAY), w.noticeEL))
      warn.push(
        `Earned leave needs ${w.noticeEL} working days' notice. HR may ask you to change the dates.`
      );
    if (s.from < iso(daysAgo(7))) warn.push('Requests more than 7 days old also need HR approval.');
    const ov = teamOverlap(e.id, s.from, s.to, 0);
    if (ov.length)
      warn.push(
        `${ov.length} teammate${ov.length > 1 ? 's are' : ' is'} also off: ${nm(overlapText(ov))}`
      );
    return {
      c,
      b,
      err,
      warn,
      cert,
      route: routeFor('leave', { emp: e.id, days: c.chargeable, from: s.from })
    };
  };
  const reasonOptions = (t, s) => {
    const when = s && s.from ? range(s.from, s.to) : 'the dates above';
    return {
      CL: [
        `I need to take casual leave on ${when} for a personal matter. I will hand over urgent work before I leave.`,
        `Requesting casual leave on ${when} to attend to family commitments.`
      ],
      SL: [
        `I am unwell and have been advised rest on ${when}.`,
        `Requesting sick leave on ${when} as I am not feeling well.`
      ],
      EL: [
        `I would like to use earned leave on ${when} for a planned break. I will complete pending work and hand over before I go.`,
        `Requesting earned leave on ${when} to travel with family.`
      ]
    }[t || 'CL'];
  };
  function leaveFlow(text) {
    const f = A.flow && A.flow.k === 'leave' ? A.flow : (A.flow = { k: 'leave', s: {}, await: '' }),
      s = f.s,
      lt = text.toLowerCase();
    if (!can('leave', 'create')) return deny('You do not have permission to apply for leave.');
    const ty = typeOf(lt);
    if (ty) s.type = ty;
    const d = parseDates(text);
    if (d) {
      s.from = d.from;
      s.to = d.to;
    }
    const nd = lt.match(/\b(\d+(?:\.5)?)\s*days?\b/);
    if (nd && s.from && s.from === s.to) {
      let n = Math.max(1, Math.round(+nd[1])),
        x = new Date(s.from + 'T00:00:00'),
        end = new Date(x);
      while (n > 0) {
        if (worksDay(me(), x)) {
          end = new Date(x);
          n--;
        }
        x.setDate(x.getDate() + 1);
      }
      s.to = iso(end);
    }
    if (/\bhalf[- ]?day|first half|second half\b/.test(lt))
      s.half = /second/.test(lt) ? 'second' : 'first';
    const rs = text.match(/(?:because|reason(?: is|:)?|due to)\s+(.{3,})$/i);
    if (rs) s.reason = rs[1].trim();
    else if (f.await === 'reason' && !d && !ty && text.length > 3)
      s.reason = text.trim().slice(0, 300);
    f.await = '';
    if (!s.type) {
      f.await = 'type';
      const b = balances(me().id);
      return say({
        tag: 'read',
        html: P('Happy to help you apply. Which leave type?'),
        opts: Object.keys(POLICY).map(k => [
          `${POLICY[k].n} (${b[k].left} left)`,
          () => ask2(`${POLICY[k].n}`)
        ])
      });
    }
    if (!s.from) {
      f.await = 'dates';
      return say({
        tag: 'read',
        html: P(
          `For which dates? You can say “3–4 November”, “Monday to Wednesday”, “tomorrow”, or “2 days from Monday”.`
        )
      });
    }
    if (s.half && s.from !== s.to) s.half = '';
    const chk = leaveCheck(s);
    if (chk.err.length) {
      const bad = chk.err;
      f.await = 'dates';
      s.from = s.to = '';
      return say({
        tag: 'denied',
        html:
          P("I can't submit that as it stands:") +
          L(bad.map(nm)) +
          P('Tell me different dates, or open the form to attach a certificate.'),
        nav: [
          [
            'Open the leave form',
            open(() => {
              go('leave');
              applyLeave();
            })
          ]
        ]
      });
    }
    if (!s.reason) {
      f.await = 'reason';
      const o = reasonOptions(s.type, s);
      return say({
        tag: 'read',
        html:
          P(
            `${POLICY[s.type].n}, ${range(s.from, s.to)} (${chk.c.chargeable} working day${chk.c.chargeable === 1 ? '' : 's'}). What is the reason? You can type one, or pick a draft.`
          ) + (chk.warn.length ? chk.warn.map(w => flag('warn', w)).join('') : ''),
        opts: o.map(x => [
          nm(x.length > 70 ? x.slice(0, 67) + '…' : x),
          () => {
            s.reason = x;
            leaveFlow('');
          }
        ])
      });
    }
    proposeLeave(s, chk);
  }
  const ask2 = t => K.ask(t);
  function proposeLeave(s, chk) {
    const e = me(),
      after = +(chk.b.left - chk.c.chargeable).toFixed(1);
    let created = null;
    propose({
      title: `Apply for ${POLICY[s.type].n.toLowerCase()}?`,
      rows: [
        ['Dates', range(s.from, s.to) + (s.half ? ` (${s.half} half)` : '')],
        ['Chargeable', fdays(chk.c.chargeable)],
        ['Balance', `${chk.b.left} → <b>${after}</b> days`],
        ['Goes to', chk.route.map(x => nm(x.n) + ' (' + x.role + ')').join(' then ')],
        ['Reason', nm(s.reason)]
      ],
      flags: chk.warn.map(w => flag('warn', w)).join(''),
      confirm: 'Submit request',
      check: () =>
        can('leave', 'create')
          ? { ok: true }
          : { ok: false, why: 'You no longer have permission to apply for leave.' },
      run: () => {
        const again = leaveCheck(s);
        if (again.err.length) return { ok: false, why: again.err[0] };
        const u = me(),
          l = {
            id: Date.now(),
            ref: nextRef('leave'),
            emp: u.id,
            type: s.type,
            from: s.from,
            to: s.to,
            days: again.c.chargeable,
            half: s.half || undefined,
            reason: s.reason,
            status: 'Pending',
            att: null,
            calc: 1
          };
        l.route = again.route;
        l.stage = 0;
        l.sub = iso(TODAY);
        l.due = addWork(l.sub, 2);
        l.hist = [
          {
            at: new Date().toISOString(),
            by: u.name,
            as: 'Requester',
            act: 'Submitted',
            note: s.reason
          }
        ];
        S.leaves.unshift(l);
        audit('Leave submitted', `${u.name} · ${l.ref}`, {
          res: 'leave',
          to: `${fdays(l.days)}, ${fdate(s.from)}${s.from !== s.to ? ' to ' + fdate(s.to) : ''}`
        });
        auditAI('Leave request submitted', `${u.name} · ${l.ref}`, { res: 'leave' });
        persist();
        render();
        created = l;
        A.flow = null;
        return {
          ok: true,
          msg: `Submitted as <b>${l.ref}</b>. Waiting for ${nm(nextOwner('leave', l))}, due ${fshort(l.due)}.`,
          after: [['View request', open(() => reqDetail('leave', l.id))]]
        };
      },
      undoOK: () => created && created.status === 'Pending' && created.stage === 0,
      undo: () => {
        created.status = 'Cancelled';
        created.hist.push({
          at: new Date().toISOString(),
          by: me().name,
          as: 'Requester',
          act: 'Cancelled',
          note: 'Withdrawn from the assistant'
        });
        audit('Leave cancelled', `${me().name} · ${created.ref}`, { res: 'leave' });
        persist();
        render();
        return {
          ok: true,
          msg: `Withdrawn. ${created.ref} is cancelled and your balance is untouched.`
        };
      }
    });
    A.flow = null;
  }
  const leaveStart = (text, lt) => leaveFlow(text);
  window.__pdaiLeave = leaveStart;
  K.leaveFlow = leaveFlow;
  addFirst(
    lt =>
      A.flow &&
      A.flow.k === 'leave' &&
      !/^(what|how|why|who|which|show|explain)\b|\b(draft|suggest|compose)\b/.test(lt),
    (text, lt) => leaveFlow(text)
  );
  add(
    lt =>
      /\b(apply|applying|request|book|take|need)\b.*\b(leave|day off|days off|time off)\b|help me apply|apply for leave|\bleave from\b|^\s*take .*off\b/.test(
        lt
      ) && !/approve|reject|policy|balance/.test(lt),
    text => leaveFlow(text)
  );

  /* ---------- employee self-service ---------- */
  add(
    lt =>
      /(why|explain|what).*(late|marked|attendance|absent)|late mark|attendance (is )?showing/.test(
        lt
      ) && !/team|summar|company|everyone|trend|attrition|headcount|report/.test(lt),
    () => {
      const u = me(),
        rows = [];
      for (let k = 0; k < 14; k++) {
        const dt = addDays(TODAY, -k),
          o = dayInfo(u.id, dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (o.late > 0 || o.st === 'A' || o.miss) rows.push(o);
      }
      const w = W();
      const li = rows
        .slice(0, 5)
        .map(o =>
          o.st === 'A'
            ? `<b>${fshort(o.iso)}</b>: absent, no punch recorded.`
            : o.miss
              ? `<b>${fshort(o.iso)}</b>: clocked in but no clock-out was recorded.`
              : `<b>${fshort(o.iso)}</b>: you clocked in at ${tm(o.in)}; your shift (${nm(o.shiftName)}) starts at ${tm(o.start)}. That is ${o.late} minutes after start, beyond the ${w.grace}-minute grace time.`
        );
      say({
        tag: 'read',
        html:
          (rows.length
            ? P('In the last 14 days:') + L(li)
            : P(
                `I can't see any late marks, absences or missing punches for you in the last 14 days. A day is marked late when the first punch is more than ${w.grace} minutes after shift start.`
              )) +
          (rows.length
            ? P(
                'If a mark is wrong (for example a missed punch or a gate issue), request a correction and your manager can approve it.'
              )
            : ''),
        src: [SRC('Attendance', 'attendance')],
        nav: rows.length ? [['Open attendance', goPage('attendance')]] : []
      });
    }
  );
  add(
    lt =>
      /regulari[sz]|attendance correction|missed punch|forgot to (clock|punch)|fix (my )?(attendance|punch)/.test(
        lt
      ),
    () =>
      say({
        tag: 'read',
        html:
          P('To correct a day:') +
          `<ol class="ai-ul"><li>Open <b>Attendance</b> and select the day.</li><li>Choose <b>Request correction</b>, pick the type (missed punch-out, wrong time, late mark waiver) and add the real times and a reason.</li><li>Your manager (or HR for older dates) approves it. The day then updates and payroll uses the corrected time.</li></ol>`,
        nav: [['Open attendance', goPage('attendance')]],
        src: [SRC('Attendance', 'attendance')]
      })
  );
  add(
    lt =>
      /clock.?in|clock.?out|\bpunch(es)?\b|geofence|can'?t clock/.test(lt) &&
      !/correction|missed|forgot/.test(lt),
    () => {
      const chk = punchChecks(S.clock.mode);
      say({
        tag: 'read',
        html:
          P(`Your current work mode is <b>${nm(S.clock.mode)}</b>. Clock-in checks right now:`) +
          L(chk.map(([k, t, s]) => `${k === 'ok' ? '✓' : '⚠'} <b>${nm(t)}</b>: ${nm(s)}`)) +
          P(
            'If a check fails, switch the work mode (Office, Plant gate, Work from home, On-site visit) to match where you are, or move closer to the site. If it still fails, ask your manager to approve a correction.'
          ),
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );
  const slipHTML = e => {
    const s = slip(e.ctc),
      t = ST(),
      self = e.id === me().id;
    return (
      KV([
        ['Basic', `${inr(s.basic)} <span class="muted small">40% of monthly pay</span>`],
        ['HRA', `${inr(s.hra)} <span class="muted small">50% of basic</span>`],
        ['Special allowance', `${inr(s.special)} <span class="muted small">the balance</span>`],
        ['Gross', `<b>${inr(s.m)}</b>`]
      ]) +
      KV([
        [
          'PF (employee)',
          `${inr(s.pf)} <span class="muted small">${t.pf.rate}% of basic, capped at ${inr(t.pf.ceil)}</span>`
        ],
        ...(t.esi.on
          ? [
              [
                'ESI',
                s.esi
                  ? inr(s.esi)
                  : '₹0 <span class="muted small">not applicable above the wage ceiling</span>'
              ]
            ]
          : []),
        ['Professional tax', inr(s.pt)],
        [
          'TDS (income tax)',
          `${inr(s.tds)} <span class="muted small">monthly estimate on pay above ${inr(t.tds.thresh)} a year</span>`
        ],
        ['Total deductions', `<b>${inr(s.ded)}</b>`],
        ['Net pay', `<b>${inr(s.net)}</b>`]
      ])
    );
  };
  add(
    lt =>
      /payslip|salary slip|deduction|\bpf\b|provident|\btds\b|\bhra\b|professional tax|take.?home|net pay|basic salary|salary(?! certificate)|\bctc\b|how much (does|is)/.test(
        lt
      ) &&
      !/variance|payroll (status|run)|compare|team|everyone|release|disburse|pay ?out|process|approve|payments?/.test(
        lt
      ),
    (text, lt) => {
      if (R() === 'sysadmin') return deny('System Admin cannot access payslips or salary data.');
      let e = me();
      const w = who(text);
      if (w && w.e && w.e.id !== e.id) {
        if (!w.ok || !can('payroll', 'view') || !canField('salary', w.e.id))
          return deny(
            `You do not have access to ${nm(w.e.name)}'s pay details.`,
            'Pay information is only visible to people with payroll and salary access.'
          );
        e = w.e;
      }
      const focus = /\bpf\b|provident/.test(lt)
        ? 'PF is a retirement saving: 12% of basic (capped) comes off your pay, and your employer adds a matching amount.'
        : /\btds\b|tax/.test(lt)
          ? 'TDS is income tax your employer deducts monthly, estimated from your yearly pay. A missing PAN can make it higher.'
          : /hra/.test(lt)
            ? 'HRA is house rent allowance, 50% of basic. Part of it may be tax-exempt if you pay rent.'
            : /professional/.test(lt)
              ? 'Professional tax is a small fixed state tax deducted every month.'
              : '';
      say({
        tag: 'read',
        html:
          P(
            `${e.id === me().id ? 'Your' : nm(e.name) + "'s"} latest payslip (September 2026), explained:`
          ) +
          slipHTML(e) +
          (focus ? P(focus) : '') +
          P(
            '<span class="muted small">For tax or reimbursement questions, confirm with Finance.</span>'
          ),
        src: [
          SRC('Payslips', 'payroll', () => {
            if (S.role !== 'employee') S.tab.pr = 'me';
          })
        ],
        nav: [
          [
            'Open payslip',
            goPage('payroll', () => {
              if (S.role !== 'employee') S.tab.pr = 'me';
            })
          ]
        ]
      });
    }
  );
  add(
    lt =>
      /(status|track|pending|where is).*(request|claim|ticket|leave|correction)|my requests|my claims/.test(
        lt
      ) && !/approval|team/.test(lt),
    () => {
      const u = me(),
        out = [];
      S.leaves
        .filter(l => l.emp === u.id)
        .slice(0, 4)
        .forEach(l =>
          out.push(
            `<b>Leave</b> ${range(l.from, l.to)} (${POLICY[l.type].n}): ${stChip(l.status)}${l.status === 'Pending' && l.route ? ' waiting for ' + nm(nextOwner('leave', l)) : ''}`
          )
        );
      S.claims
        .filter(c => c.emp === u.id)
        .slice(0, 3)
        .forEach(c => out.push(`<b>Claim</b> ${nm(c.cat)} ${inr(c.amt)}: ${stChip(c.st)}`));
      S.regs
        .filter(r => r.emp === u.id)
        .slice(0, 2)
        .forEach(r =>
          out.push(`<b>Correction</b> ${fshort(r.date)} (${nm(r.type)}): ${stChip(r.status)}`)
        );
      S.tickets
        .filter(t => t.emp === u.id)
        .slice(0, 3)
        .forEach(t => out.push(`<b>${nm(t.id)}</b> ${nm(t.cat)}: ${stChip(t.st)}`));
      say({
        tag: 'read',
        html: out.length ? P('Your recent requests:') + L(out) : P('You have no requests yet.'),
        src: [SRC('Leave', 'leave'), SRC('Requests', 'requests')]
      });
    }
  );
  add(
    lt =>
      /(expense|claim|reimburs)/.test(lt) &&
      /(how|raise|submit|file|new|help|create)/.test(lt) &&
      !/approve|pending/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To raise an expense claim:') +
          `<ol class="ai-ul"><li>Open <b>Requests</b> and choose <b>New claim</b>.</li><li>Pick the category, enter the amount in rupees, the expense date and a short note.</li><li>Submit. Your manager approves it (claims of ₹10,000 or more also need HR).</li></ol>`,
        nav: [
          [
            'Open the claim form',
            open(() => {
              go('requests');
              addClaim();
            })
          ]
        ],
        src: [SRC('Requests', 'requests')]
      })
  );
  add(
    lt =>
      /(helpdesk|ticket|raise a request|salary certificate|experience letter|address proof|id card|document request|it support)/.test(
        lt
      ) &&
      /(how|raise|new|need|help|get|request|create)/.test(lt) &&
      !/draft|write|status/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To ask HR or IT for something (a letter, a certificate, an ID card, IT support):') +
          `<ol class="ai-ul"><li>Open <b>Requests</b> and choose <b>New request</b>.</li><li>Choose what you need and the priority, and describe it.</li><li>Submit. You can follow the status and reply from the same page.</li></ol>`,
        nav: [
          [
            'Open the request form',
            open(() => {
              go('requests');
              addTicket();
            })
          ]
        ],
        opts: [['Draft the message for me', () => K.ask('Draft a helpdesk message')]],
        src: [SRC('Requests', 'requests')]
      })
  );
  add(
    lt => /(update|change|edit).*(profile|address|phone|contact|bank|details)/.test(lt),
    () =>
      say({
        tag: 'read',
        html: P(
          'You can update your contact details yourself from <b>My profile</b> (choose Edit). Bank and identity details are verified by HR: upload the new document and HR will review it.'
        ),
        nav: [['Open my profile', goPage('profile')]],
        src: [SRC('My profile', 'profile')]
      })
  );
  add(
    lt =>
      /training|course|certif|learning/.test(lt) &&
      !/expir|organi[sz]ation|compliance|team|everyone|summar|30 days/.test(lt) &&
      R() === 'employee',
    () => {
      const e = me(),
        rows = reqCourses(e)
          .map(({ c, i }) => ({ c, p: trainPct(e, c, i) }))
          .filter(x => x.p < 100);
      say({
        tag: 'read',
        html: rows.length
          ? P('Training due for you:') +
            L(rows.map(x => `<b>${nm(x.c.n)}</b>: ${x.p}% done, renew by ${fshort(x.c.exp)}`))
          : P('You have completed all your required training.'),
        nav: rows.length ? [['Open training', goPage('training')]] : [],
        src: [SRC('Training', 'training')]
      });
    }
  );
  add(
    lt => /holiday/.test(lt),
    () => {
      const list = HOLIDAYS.map(h => ({ ...h, d: new Date(TODAY.getFullYear(), h.m, h.d) }))
        .filter(h => h.d >= TODAY)
        .slice(0, 4);
      say({
        tag: 'read',
        html: list.length
          ? P('Upcoming company holidays:') +
            L(
              list.map(
                h =>
                  `<b>${nm(h.n)}</b>: ${h.d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} (in ${Math.round((h.d - TODAY) / 864e5)} days)`
              )
            )
          : P('There are no more company holidays listed this year.'),
        src: [SRC('Dashboard · holidays', 'dashboard')]
      });
    }
  );
  add(
    lt => /\b(asset|laptop|equipment|headset|return due)\b/.test(lt) && R() !== 'sysadmin',
    () => {
      const a = assetsOf(me().id);
      say({
        tag: 'read',
        html: a.cur.length
          ? P('Assets issued to you:') +
            L(
              a.cur.map(
                x =>
                  `<b>${nm(aname(x))}</b> (${nm(x.type)}, serial ${nm(x.serial)})${x.ack ? '' : ' · <span style="color:var(--amber-ink)">please confirm receipt</span>'}`
              )
            )
          : P('You have no company assets issued.'),
        src: [SRC('Assets', okPage('assets') ? 'assets' : 'profile')]
      });
    }
  );
  add(
    lt =>
      /(what|which|how many).*(documents?|files?).*(pending|missing|verif|need)|my documents/.test(
        lt
      ) && R() === 'employee',
    () => {
      const d = vdocsOf(me()).filter(x => x.st !== 'Verified');
      say({
        tag: 'read',
        html: d.length
          ? P('Documents that need action:') +
            L(d.map(x => `<b>${nm(x.n)}</b>: ${nm(x.st)}${x.note ? ' · ' + nm(x.note) : ''}`))
          : P('All your documents are verified.'),
        src: [SRC('My profile · documents', 'profile')]
      });
    }
  );

  /* ---------- approvals and requests (manager, HR, admin) ---------- */
  const flagsFor = (k, r) => {
    ensureReq(k, r);
    const out = [],
      e = emp(r.emp);
    if (k === 'leave') {
      const b = balances(r.emp)[r.type],
        w = W();
      if (b.left - r.days < 0)
        out.push(['bad', `Balance is too low: ${b.left} days left, this asks for ${r.days}.`]);
      else if (b.left - r.days <= 1)
        out.push([
          'warn',
          `Low balance: only ${+(b.left - r.days).toFixed(1)} day(s) left after this.`
        ]);
      const ov = teamOverlap(r.emp, r.from, r.to, r.id);
      if (ov.length) out.push(['warn', `Overlaps with ${overlapText(ov)}.`]);
      if (r.type === 'SL' && r.days > w.certDays && !r.att)
        out.push(['warn', `No medical certificate attached (needed over ${w.certDays} days).`]);
      if (r.type === 'EL' && r.from < addWork(r.sub || iso(TODAY), w.noticeEL))
        out.push(['warn', `Short notice for earned leave (${w.noticeEL} working days expected).`]);
      if (r.from < iso(daysAgo(7)))
        out.push(['warn', 'Dated more than 7 days back, so HR also needs to approve.']);
    }
    if (k === 'claim' && r.amt >= 10000)
      out.push(['warn', 'Claims of ₹10,000 or more also need HR approval.']);
    if (k === 'reg')
      out.push([
        'info',
        `${r.type}: times ${r.in || '–'} to ${r.out || '–'}. Reason given: “${r.reason || 'none'}”.`
      ]);
    if (isOverdue(k, r)) out.push(['bad', `Overdue since ${fshort(r.due)}.`]);
    if (r.route && r.route.length > 1)
      out.push([
        'info',
        `Needs ${r.route.length} approvals: ${r.route.map(x => x.role).join(' then ')}.`
      ]);
    return out;
  };
  const sumReq = (k, r) => {
    const e = emp(r.emp),
      fl = flagsFor(k, r);
    return {
      html:
        KV([
          ['Who', `${nm(e.name)} <span class="muted small">${nm(e.title)}, ${nm(e.dept)}</span>`],
          ['Request', nm(reqSummary(k, r))],
          ['Reason', nm(r.reason || r.note || '–')],
          [
            'Status',
            stChip(stOf(k, r)) +
              (stOf(k, r) === 'Pending' && r.route
                ? ' waiting for ' + nm(nextOwner('leave' === k ? k : k, r))
                : '')
          ],
          [
            'Submitted',
            `${fshort(r.sub || iso(TODAY))} (${ageTxt(r)} ago), due ${fshort(r.due || iso(TODAY))}`
          ]
        ]) +
        (fl.length
          ? `<div class="ai-lbl">Worth knowing</div>` +
            fl.map(f => flag(f[0], nm(f[1]).replace(/&#39;/g, "'"))).join('')
          : P(
              '<span class="muted small">Nothing unusual: balance is fine and there are no clashes.</span>'
            )),
      fl
    };
  };
  const findReq = (k, id) => KIND[k].list().find(x => x.id === id);
  const reqAllowed = () => can('approvals', 'view') && R() !== 'employee';
  add(
    lt =>
      /pending approvals?|my approvals|show.*approvals|approvals (waiting|queue)|what.*(waiting for|awaiting) (me|my approval)/.test(
        lt
      ) && !/overdue/.test(lt),
    () => {
      if (!reqAllowed())
        return noAccess(
          'The approvals queue',
          'You can follow your own requests under Requests and Leave instead.'
        );
      const q = approvalItems();
      if (!q.length)
        return say({
          tag: 'read',
          html: P('Nothing is waiting for your approval right now.'),
          src: [SRC('Approvals', 'approvals')]
        });
      say({
        tag: 'read',
        html:
          P(
            `You have <b>${q.length}</b> approval${q.length > 1 ? 's' : ''} waiting, oldest first:`
          ) +
          L(
            q
              .slice(0, 6)
              .map(
                x =>
                  `<b>${nm(emp(x.emp).name)}</b>: ${nm(x.k)}, ${nm(x.sub)} ${btn('Summarize', () => K.ask('Summarize ' + emp(x.emp).name + "'s " + x.kind), 'btn sm')}`
              )
          ) +
          (q.length > 6 ? P(`…and ${q.length - 6} more.`) : ''),
        nav: [['Open approvals', goPage('approvals', () => (S.tab.ap = 'mine'))]],
        src: [SRC('Approvals', 'approvals')]
      });
    }
  );
  add(
    lt => /overdue/.test(lt) && /(approval|request)/.test(lt),
    () => {
      if (!reqAllowed()) return noAccess('Approval queues');
      const q = queue('overdue');
      say({
        tag: 'read',
        html: q.length
          ? P(`<b>${q.length}</b> request${q.length > 1 ? 's are' : ' is'} overdue:`) +
            L(
              q
                .slice(0, 8)
                .map(
                  ({ k, r }) =>
                    `<b>${nm(emp(r.emp).name)}</b>: ${nm(KIND[k].n)}, ${nm(reqSummary(k, r))}, due ${fshort(r.due)}`
                )
            )
          : P('No approvals are overdue.'),
        nav: q.length ? [['Open overdue', goPage('approvals', () => (S.tab.ap = 'overdue'))]] : [],
        src: [SRC('Approvals', 'approvals')]
      });
    }
  );
  const targetReq = (text, lt) => {
    const rec = A.rec && A.rec.t === 'req' ? A.rec : null;
    if (rec && /\bthis\b|^(approve|reject)$/.test(lt)) {
      const r = findReq(rec.k, rec.id);
      return r ? { list: [{ k: rec.k, r }] } : { list: [] };
    }
    const w = who(text),
      kind = /claim|expense/.test(lt)
        ? 'claim'
        : /correct|regulari|punch/.test(lt)
          ? 'reg'
          : /leave/.test(lt)
            ? 'leave'
            : '';
    if (w && w.e && !w.ok) return { out: w.e };
    let list = allReq().filter(
      ({ k, r }) =>
        stOf(k, r) === 'Pending' && (!kind || k === kind) && (!w || !w.e || r.emp === w.e.id)
    );
    if (!w && !kind) list = queue('mine');
    return {
      list: list.filter(({ k, r }) => inScope(KIND[k].res, r.emp) || canAct(k, r).ok),
      w,
      kind
    };
  };
  const proposeDecision = (k, r, st) => {
    const e = emp(r.emp),
      a = canAct(k, r),
      isRej = st === 'Rejected';
    if (!a.ok) return deny(`I can't ${isRej ? 'reject' : 'approve'} that: ${nm(a.why)}.`);
    const fl = flagsFor(k, r);
    propose({
      title: `${isRej ? 'Reject' : 'Approve'} ${nm(e.name)}'s ${KIND[k].n.toLowerCase()}?`,
      rows: [
        ['Request', nm(reqSummary(k, r))],
        ['Reason given', nm(r.reason || r.note || '–')],
        ['Your role', nm(a.as)],
        [
          'Next',
          isRej
            ? 'The request ends and the person is told why.'
            : r.stage >= r.route.length - 1 || a.as === 'HR override'
              ? 'Final approval. The request is approved.'
              : `Moves on to ${nm(r.route[r.stage + 1].n)}.`
        ]
      ],
      flags: fl.map(f => flag(f[0], nm(f[1]).replace(/&#39;/g, "'"))).join(''),
      fields: isRej
        ? [
            {
              id: 'note',
              label: 'Reason for rejecting (the requester will see this)',
              value: draftReject(k, r),
              required: true
            }
          ]
        : [],
      confirm: isRej ? 'Reject request' : 'Approve request',
      check: () => {
        const x = canAct(k, r);
        return x.ok ? { ok: true } : { ok: false, why: x.why };
      },
      run: v => {
        const out = decideCore(k, r, st, isRej ? (v.note || '').trim() : '');
        if (!out.ok) return { ok: false, why: out.why };
        auditAI(`${KIND[k].n} ${isRej ? 'rejected' : 'approved'}`, `${e.name} · ${refOf(k, r)}`, {
          res: KIND[k].res
        });
        persist();
        render();
        return {
          ok: true,
          msg: nm(out.msg) + '.',
          after: [['View request', open(() => reqDetail(k, r.id))]]
        };
      }
    });
  };
  addFirst(
    lt =>
      /\b(approve|reject|decline)\b/.test(lt) &&
      !/draft|write|word|comment|how (do|can)|payroll|announcement|policy|should i|summar|explain|before i/.test(
        lt
      ),
    (text, lt) => {
      const nmM = text.match(/(?:approve|reject|decline)\s+([A-Za-z]+)(?:'s|’s)/i);
      if (nmM && !who(text) && !/^(this|all|the|my|every)$/i.test(nmM[1]))
        return nothing(`I couldn't find anyone named ${nm(nmM[1])} in your records.`);
      const st = /reject|decline/.test(lt) ? 'Rejected' : 'Approved';
      if (/\b(my own|my)\b.*\b(leave|request|claim|correction)\b/.test(lt))
        return deny(
          'You cannot approve or reject your own request. Your approver decides it (you can see who it is waiting for under Requests).'
        );
      if (!reqAllowed())
        return noAccess(
          'Approving or rejecting requests',
          R() === 'sysadmin'
            ? 'System Admin cannot approve any HR workflow.'
            : 'Your manager or HR decides your requests. You can follow them under Requests.'
        );
      if (/\ball\b|everything|every request/.test(lt)) {
        if (st === 'Rejected')
          return deny(
            "I won't reject requests in bulk: each rejection needs its own reason. Open the request, or ask me about one person."
          );
        const items = queue('mine').filter(({ k, r }) => canAct(k, r).ok);
        if (!items.length) return nothing('There is nothing waiting for your approval.');
        return propose({
          title: `Approve all ${items.length} pending requests?`,
          risk: 'high',
          confirm: `Review ${items.length} approvals`,
          confirm2: `Approve ${items.length} requests`,
          rows: items.slice(0, 8).map(({ k, r }) => [nm(emp(r.emp).name), nm(reqSummary(k, r))]),
          impact: `This is a bulk update. It approves ${items.length} requests at once${items.length > 8 ? ' (the first 8 are listed)' : ''}. Requests with warnings (low balance, clashes) are included. Each one is recorded separately in the audit log.`,
          ack: `I have reviewed the list and want to approve all ${items.length} requests.`,
          check: () => ({ ok: true }),
          run: () => {
            let n = 0,
              skip = 0;
            items.forEach(({ k, r }) => {
              const o = decideCore(k, r, 'Approved', '');
              if (o.ok) {
                n++;
                auditAI('Bulk approval', `${emp(r.emp).name} · ${refOf(k, r)}`, {
                  res: KIND[k].res
                });
              } else skip++;
            });
            persist();
            render();
            return {
              ok: true,
              msg: `${n} request${n === 1 ? '' : 's'} approved${skip ? `, ${skip} skipped because they changed` : ''}.`
            };
          }
        });
      }
      const t = targetReq(text, lt);
      if (t.out) return SCOPE_MSG(t.out);
      if (!t.list.length)
        return nothing(
          `I couldn't find a pending request${t.w && t.w.e ? ' from ' + nm(t.w.e.name) : ''} that you can decide. Try “Show my pending approvals”.`
        );
      if (t.list.length === 1) return proposeDecision(t.list[0].k, t.list[0].r, st);
      say({
        tag: 'read',
        html: P(`I found ${t.list.length} requests. Which one?`),
        opts: t.list
          .slice(0, 6)
          .map(({ k, r }) => [
            nm(`${emp(r.emp).name}: ${KIND[k].n}, ${reqSummary(k, r)}`),
            () => proposeDecision(k, r, st)
          ])
      });
    }
  );
  const sumRecord = (text, lt) => {
    const rec = A.rec,
      w = who(text);
    const kind = /claim|expense/.test(lt)
      ? 'claim'
      : /correct|regulari/.test(lt)
        ? 'reg'
        : /leave/.test(lt)
          ? 'leave'
          : '';
    if (w && w.e && !rec) {
      if (!w.ok) return SCOPE_MSG(w.e);
      if (/profile|employee|record|about/.test(lt) && !kind) return showEmp(w.e);
      const list = allReq().filter(
        ({ k, r }) => r.emp === w.e.id && (!kind || k === kind) && stOf(k, r) === 'Pending'
      );
      if (list.length === 1) return showReq(list[0].k, list[0].r);
      if (!list.length && /profile|employee|record|summar/.test(lt)) return showEmp(w.e);
      if (list.length)
        return say({
          tag: 'read',
          html: P('Which request?'),
          opts: list.map(({ k, r }) => [
            nm(KIND[k].n + ': ' + reqSummary(k, r)),
            () => showReq(k, r)
          ])
        });
    }
    if (!rec)
      return say({
        tag: 'read',
        html: P(
          'Open a request, employee or candidate first and I will summarise it. You can also name a person, for example “Summarize Riya’s leave request”.'
        )
      });
    if (rec.t === 'req') {
      const r = findReq(rec.k, rec.id);
      return r && (inScope(KIND[rec.k].res, r.emp) || r.emp === me().id)
        ? showReq(rec.k, r)
        : deny('That request is outside your access.');
    }
    if (rec.t === 'emp') {
      const e = emp(rec.id);
      return e && (e.id === me().id || inScope('employees', e.id))
        ? showEmp(e)
        : deny('That person is outside your access.');
    }
    if (rec.t === 'cand') {
      const c = S.cands.find(x => x.id === rec.id);
      return c && can('recruit', 'view')
        ? say({
            tag: 'read',
            html: KV([
              ['Candidate', nm(c.n)],
              ['Role', nm(c.r)],
              ['Stage', nm(S.stages[c.st])],
              ['Source', nm(c.src)]
            ]),
            src: [SRC('Recruitment', 'recruit')]
          })
        : deny('Recruitment data is not available to your role.');
    }
    if (rec.t === 'ticket') {
      const t = S.tickets.find(x => x.id === rec.id);
      return t && (t.emp === me().id || can('requests', 'approve'))
        ? say({
            tag: 'read',
            html: KV([
              ['Request', nm(t.id)],
              ['Type', nm(t.cat)],
              ['Priority', nm(t.pr)],
              ['Status', stChip(t.st)],
              ['Raised', fshort(t.d)]
            ]),
            src: [SRC('Requests', 'requests')]
          })
        : deny('That request is outside your access.');
    }
    if (rec.t === 'slip')
      return say({
        tag: 'read',
        html: P(
          'This is a payslip. Ask “Explain the deductions in my payslip” for a line-by-line explanation.'
        )
      });
    say({
      tag: 'read',
      html: P(
        'I can summarise requests, employees, candidates and tickets. Open one of those and ask again.'
      )
    });
  };
  const showReq = (k, r) => {
    const s = sumReq(k, r);
    say({
      tag: 'read',
      html: s.html,
      nav:
        stOf(k, r) === 'Pending' && canAct(k, r).ok
          ? [['Open request', open(() => reqDetail(k, r.id))]]
          : [],
      opts:
        stOf(k, r) === 'Pending' && canAct(k, r).ok
          ? [
              ['Draft a rejection comment', () => draftFor('reject', '', { k, r })],
              ['Draft an approval comment', () => draftFor('approve', '', { k, r })]
            ]
          : [],
      src: [SRC(KIND[k].n + ' requests', 'approvals')]
    });
  };
  add(
    lt =>
      /summar(y|i[sz]e)|explain this|tell me about this|what('?s| is) (in )?this (record|request)|why .*(need|needs) attention/.test(
        lt
      ) &&
      !/(team|company|recruitment|pipeline|attendance|training|payroll|trend|week|month|audit|log entry|page)/.test(
        lt
      ),
    sumRecord
  );

  const showEmp = e => {
    if (!(e.id === me().id || inScope('employees', e.id))) return SCOPE_MSG(e);
    const self = e.id === me().id,
      hrView = can('employees', 'edit') || self;
    const rows = [
      ['Role', `${nm(e.title)}, ${nm(e.dept)}`],
      ['Status', stChip(e.status)],
      ['Joined', `${fdate(e.join)} (${tenure(e.join)})`],
      ['Reports to', nm(reportsTo(e))],
      ['Location', nm(e.loc)]
    ];
    let extra = '';
    const lv = S.leaves.filter(l => l.emp === e.id),
      pend = lv.filter(l => l.status === 'Pending').length;
    if (can('leave', 'view') && (self || inScope('leave', e.id)))
      rows.push([
        'Leave',
        `${lv.filter(l => l.status === 'Approved').reduce((a, l) => a + l.days, 0)} days taken in records, ${pend} pending`
      ]);
    if (hrView) {
      const d = vdocsOf(e).filter(x => x.st !== 'Verified');
      rows.push([
        'Documents',
        d.length ? d.map(x => nm(x.n) + ' (' + nm(x.st) + ')').join(', ') : 'All verified'
      ]);
    }
    if (self || (inScope('assets', e.id) && can('assets', 'view'))) {
      const a = assetsOf(e.id).cur;
      rows.push(['Assets', a.length ? a.map(x => nm(aname(x))).join(', ') : 'None issued']);
    }
    if (can('attendance', 'view') && (self || inScope('attendance', e.id))) {
      let late = 0,
        ab = 0;
      for (let k = 0; k < 14; k++) {
        const dt = addDays(TODAY, -k),
          o = dayInfo(e.id, dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (o.late > 0) late++;
        if (o.st === 'A') ab++;
      }
      rows.push([
        'Attendance (14 days)',
        `${late} late mark${late === 1 ? '' : 's'}, ${ab} absence${ab === 1 ? '' : 's'}`
      ]);
    }
    if (can('lifecycle', 'view') && inScope('lifecycle', e.id)) {
      if (S.life.off[e.id] && !S.life.off[e.id].done) {
        const p = progress('off', e, OFF_T);
        extra += P(
          `Offboarding in progress: ${p.n} of ${p.t} clearance tasks done, last day ${fdate(S.life.off[e.id].lwd)}.`
        );
      } else if (e.join >= iso(addDays(TODAY, -60))) {
        const p = progress('onb', e, ONB_T);
        extra += P(`Onboarding: ${p.n} of ${p.t} tasks done.`);
      }
    }
    say({
      tag: 'read',
      html:
        P(`<b>${nm(e.name)}</b>`) +
        KV(rows) +
        extra +
        P(
          '<span class="muted small">Pay, bank and identity details are not included in summaries.</span>'
        ),
      nav: [['Open profile', open(() => empProfile(e.id))]],
      src: [SRC('Employees', 'employees')]
    });
  };

  /* ---------- team: leave, cover, attendance ---------- */
  add(
    lt =>
      /who.*(on leave|out|off|away|absent)|(on leave|out of office)/.test(lt) &&
      !/approve|balance|late/.test(lt),
    (text, lt) => {
      if (R() === 'sysadmin') return deny('System Admin cannot see leave data.');
      let a, b, when;
      if (/next week/.test(lt)) {
        const m = nextWd(1, TODAY, false);
        a = iso(m);
        b = iso(addDays(m, 6));
        when = 'next week';
      } else if (/tomorrow/.test(lt)) {
        a = b = iso(addDays(TODAY, 1));
        when = 'tomorrow';
      } else if (/today|right now/.test(lt)) {
        a = b = iso(TODAY);
        when = 'today';
      } else {
        a = iso(TODAY);
        b = iso(addDays(TODAY, 14));
        when = 'in the next two weeks';
      }
      const inLeaveScope = e =>
        R() === 'employee' ? e.dept === me().dept : inScope('leave', e.id);
      const list = S.leaves
        .filter(l => ['Approved', 'Pending'].includes(l.status) && l.from <= b && l.to >= a)
        .filter(l => {
          const e = emp(l.emp);
          return (
            e &&
            e.status !== 'Exited' &&
            inLeaveScope(e) &&
            (R() !== 'employee' || l.status === 'Approved' || l.emp === me().id)
          );
        });
      say({
        tag: 'read',
        html: list.length
          ? P(`People on leave ${when}:`) +
            L(
              list.map(
                l =>
                  `<b>${nm(emp(l.emp).name)}</b>: ${range(l.from, l.to)} (${POLICY[l.type].n})${l.status === 'Pending' ? ' · <i>pending approval</i>' : ''}`
              )
            )
          : P(
              `Nobody ${R() === 'employee' ? 'in your department ' : 'in your team '}is on leave ${when}.`
            ),
        src: [SRC('Leave', 'leave')]
      });
    }
  );
  const DEPT_KW = [
    ['production', 'Production'],
    ['quality', 'Quality'],
    ['maintenance', 'Maintenance'],
    ['stores|logistics', 'Stores & Logistics'],
    ['\\bhr\\b|admin', 'HR & Admin'],
    ['finance|accounts', 'Finance'],
    ['it department|\\bit team|\\bin it\\b', 'IT'],
    ['sales', 'Sales']
  ];
  add(
    lt =>
      /cover(age)?|enough (people|staff|crew)|short.?staffed|\bshift\b.*(friday|monday|tuesday|wednesday|thursday|saturday|sunday|tomorrow|today)|(friday|monday|tuesday|wednesday|thursday|saturday|sunday|tomorrow).*\bshift\b/.test(
        lt
      ),
    (text, lt) => {
      if (!can('roster', 'view')) return noAccess('Shift coverage');
      const dp = (DEPT_KW.find(([k]) => new RegExp(k).test(lt)) || [0, me().dept])[1];
      const d = parseDates(text) || { from: iso(TODAY) },
        date = new Date(d.from + 'T00:00:00'),
        idx = (date.getDay() + 6) % 7;
      const sh = /morning|\ba shift|shift a\b/.test(lt)
        ? 'A'
        : /afternoon|\bb shift|shift b\b/.test(lt)
          ? 'B'
          : /night|\bc shift|shift c\b/.test(lt)
            ? 'C'
            : /general|\bg shift|shift g\b/.test(lt)
              ? 'G'
              : '';
      const people = scoped('roster').filter(e => e.dept === dp && e.status !== 'Exited');
      if (!people.length) return nothing(`There is nobody from ${nm(dp)} in your roster scope.`);
      const shiftOf = e => (S.roster[e.id] ? S.roster[e.id][idx] : idx >= 5 ? 'O' : 'G');
      const off = e => {
        const l = leaveOn(e.id, date);
        return l && ['Approved', 'Pending'].includes(l.status) ? l : null;
      };
      const shifts = sh ? [sh] : ['A', 'B', 'C', 'G'];
      const rows = shifts
        .map(k => {
          const as = people.filter(e => shiftOf(e) === k),
            ap = as.filter(e => {
              const l = off(e);
              return l && l.status === 'Approved';
            }),
            pe = as.filter(e => {
              const l = off(e);
              return l && l.status === 'Pending';
            });
          return { k, n: as.length, ap, pe, avail: as.length - ap.length };
        })
        .filter(r => r.n);
      if (!rows.length)
        return nothing(
          `${nm(dp)} has nobody rostered on ${sh ? SHIFTS[sh] : 'a working shift'} on ${fday(d.from)}.`
        );
      say({
        tag: 'read',
        html:
          P(`${nm(dp)} on <b>${fday(d.from)}</b>:`) +
          L(
            rows.map(
              r =>
                `<b>${nm(SHIFTS[r.k])}</b>: ${r.n} rostered, <b>${r.avail}</b> available${r.ap.length ? ` (on approved leave: ${nm(r.ap.map(e => e.name).join(', '))})` : ''}${r.pe.length ? `. If pending leave is approved too: <b>${r.avail - r.pe.length}</b> (${nm(r.pe.map(e => e.name).join(', '))})` : ''}`
            )
          ) +
          P(
            '<span class="muted small">PeopleDesk has no minimum crew size configured, so I can’t say whether this is “enough”. Compare it with your plan for that shift.</span>'
          ),
        nav: [['Open roster', goPage('roster')]],
        src: [SRC('Shift roster', 'roster'), SRC('Leave', 'leave')]
      });
    }
  );
  add(
    lt =>
      /(team|company|everyone|staff|today|this week).*(attendance|late|absent|present)|attendance (summary|today|this week)|summar.*attendance|late marks? (this|today)/.test(
        lt
      ) && !/my attendance|why/.test(lt),
    (text, lt) => {
      if (R() === 'employee')
        return noAccess(
          'Team attendance',
          'You can see your own attendance on the Attendance page.'
        );
      if (R() === 'sysadmin') return deny('System Admin cannot see attendance data.');
      if (!can('attendance', 'view')) return noAccess('Attendance');
      const team = scoped('attendance').filter(e => e.id !== me().id),
        td = TD(),
        rows = team.map(e => dayInfo(e.id, ...td));
      const late = rows.filter(o => o.late > 0),
        ab = rows.filter(o => o.st === 'A'),
        lv = rows.filter(o => o.st === 'L'),
        pr = rows.filter(o => ['P', 'D'].includes(o.st));
      const wk = weekAtt(team),
        names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tr = wk
          .map((v, i) => (v == null || (v === 0 && i >= 5) ? '' : `${names[i]} ${v}%`))
          .filter(Boolean)
          .join(', ');
      say({
        tag: 'read',
        html:
          P(
            `${R() === 'manager' ? 'Your team' : 'Everyone in your scope'} today (${team.length} people):`
          ) +
          L([
            `Present: <b>${pr.length}</b>`,
            `On leave: <b>${lv.length}</b>${lv.length ? ' (' + nm(lv.map(o => o.e.name).join(', ')) + ')' : ''}`,
            `Absent, no punch: <b>${ab.length}</b>${ab.length ? ' (' + nm(ab.map(o => o.e.name).join(', ')) + ')' : ''}`,
            `Late today: <b>${late.length}</b>${late.length ? ' (' + nm(late.map(o => `${o.e.name} +${o.late} min`).join(', ')) + ')' : ''}`
          ]) +
          P(`This week so far: ${tr}.`) +
          P(
            '<span class="muted small">Overtime is not connected yet, so it is not included.</span>'
          ),
        src: [SRC('Attendance', 'attendance'), SRC('Dashboard', 'dashboard')],
        nav: [['Open attendance', goPage('attendance')]]
      });
    }
  );
  add(
    lt =>
      /(team|employees?|people).*(incomplete|pending|overdue|behind).*(training|course)|training (compliance|status)|incomplete training|(expir|renew).*(certif|licen|course)|certif.*expir|expir.*30 days/.test(
        lt
      ) && !/^(what|which).*due for me/.test(lt),
    (text, lt) => {
      if (!can('training', 'view')) return noAccess('Training compliance');
      const limit = iso(addDays(TODAY, 30)),
        exp = S.courses.filter(c => c.exp <= limit).sort((a, b) => (a.exp < b.exp ? -1 : 1));
      let h = exp.length
        ? P(`Certificates expiring in the next 30 days:`) +
          L(
            exp.map(
              c =>
                `<b>${nm(c.n)}</b>: expires ${fshort(c.exp)} (${c.done}% of required staff complete)`
            )
          )
        : P('No certificates expire in the next 30 days.');
      if (!/expir|certif/.test(lt) || /incomplete|behind|compliance/.test(lt)) {
        const team = scoped('training').filter(e => e.id !== me().id),
          out = [];
        team.forEach(e =>
          reqCourses(e).forEach(({ c, i }) => {
            const p = trainPct(e, c, i);
            if (p < 60) out.push(`${nm(e.name)}: ${nm(c.n)} (${p}%)`);
          })
        );
        h += out.length
          ? P('People well behind on required courses (under 60%):') + L(out.slice(0, 8))
          : P('Nobody in your scope is far behind on required courses.');
      }
      say({
        tag: 'read',
        html: h,
        nav: [['Open training', goPage('training')]],
        src: [SRC('Training', 'training')]
      });
    }
  );
  add(
    lt =>
      /(pending|incomplete|missing|behind).*(goals?|reviews?)|goals? (pending|status)/.test(lt) &&
      R() !== 'employee',
    () =>
      say({
        tag: 'read',
        html: P(
          "Goal progress is recorded per person on the Performance page. I can't list pending goals across a team yet. Open Performance and select a person to see their goals and add a review."
        ),
        nav: [['Open performance', goPage('performance')]],
        src: [SRC('Performance', 'performance')]
      })
  );

  /* ---------- HR ---------- */
  add(
    lt =>
      /(pending|awaiting|outstanding|missing).*(document|verification)|document verification|unverified|re-?upload/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (!can('employees', 'view')) return noAccess('Document status');
      const rows = [];
      scoped('employees').forEach(e =>
        vdocsOf(e)
          .filter(d => d.st !== 'Verified')
          .forEach(d => rows.push({ e, d }))
      );
      say({
        tag: 'read',
        html: rows.length
          ? P(
              `<b>${rows.length}</b> document${rows.length > 1 ? 's are' : ' is'} not verified yet:`
            ) +
            L(
              rows.slice(0, 10).map(
                ({ e, d }) =>
                  `<b>${nm(e.name)}</b>: ${nm(d.n)} (${nm(d.st)})${d.note ? ' · ' + nm(d.note) : ''} ${btn(
                    'Open',
                    open(() => empProfile(e.id, 'docs')),
                    'btn sm'
                  )}`
              )
            )
          : P('Every document in your scope is verified.'),
        src: [SRC('Employees · documents', 'employees')]
      });
    }
  );
  add(
    lt =>
      /onboard|new joiner|joiners?\b|probation/.test(lt) &&
      /(block|pending|incomplete|missing|status|stuck|what|which|task)/.test(lt) &&
      !/policy|draft|write|checklist.*offboard|offboard/.test(lt),
    (text, lt) => {
      if (!can('lifecycle', 'view')) return noAccess('Onboarding tasks');
      const w = who(text);
      let list = live().filter(
        e => e.join >= iso(addDays(TODAY, -60)) && inScope('lifecycle', e.id)
      );
      if (w && w.e) {
        if (!w.ok || !inScope('lifecycle', w.e.id)) return SCOPE_MSG(w.e);
        list = [w.e];
      } else {
        const cand = S.cands.find(c => lt.includes(c.n.split(' ')[0].toLowerCase()));
        if (cand)
          return say({
            tag: 'read',
            html: P(
              `${nm(cand.n)} is a candidate (${nm(cand.r)}, stage: ${nm(S.stages[cand.st])}), not an employee yet, so there is no onboarding to track. Onboarding tasks start once they join.`
            ),
            src: [SRC('Recruitment', 'recruit')]
          });
      }
      if (!list.length)
        return nothing(
          'Nobody has joined in the last 60 days, so there is no onboarding in progress.'
        );
      say({
        tag: 'read',
        html: list
          .map(e => {
            const open_ = ONB_T.filter(T => !isDone('onb', e, T[0])).map(T => {
                const o = ownerOf(T[2], e),
                  due = dueOf('onb', e, T);
                return `${nm(T[1])} · ${nm(o.name)} · due ${fshort(due)}${due < iso(TODAY) ? ' <b style="color:var(--red-ink)">overdue</b>' : ''}`;
              }),
              bl = [];
            if (!e.mgr) bl.push('No manager assigned');
            const p = progress('onb', e, ONB_T);
            return (
              P(`<b>${nm(e.name)}</b>: ${p.n} of ${p.t} done`) +
              (bl.length ? bl.map(b => flag('bad', b)).join('') : '') +
              (open_.length ? L(open_) : P('All tasks complete.'))
            );
          })
          .join(''),
        nav: [['Open joiners & leavers', goPage('lifecycle')]],
        src: [SRC('Joiners & leavers', 'lifecycle')]
      });
    }
  );
  add(
    lt =>
      /offboard|leaving|resign|exit|last working day/.test(lt) &&
      !/draft|write/.test(lt) &&
      /(checklist|task|list|what|pending|status|create)/.test(lt),
    (text, lt) => {
      if (!can('lifecycle', 'view')) return noAccess('Offboarding tasks');
      const w = who(text),
        offs = Object.keys(S.life.off)
          .map(emp)
          .filter(e => e && !S.life.off[e.id].done && inScope('lifecycle', e.id));
      if (/(create|make|prepare|draft).*checklist|checklist for/.test(lt))
        return offChecklist(text, w);
      say({
        tag: 'read',
        html: offs.length
          ? offs
              .map(e => {
                const p = progress('off', e, OFF_T),
                  left = OFF_T.filter(T => !isDone('off', e, T[0]));
                return (
                  P(
                    `<b>${nm(e.name)}</b>: ${p.n} of ${p.t} cleared, last day ${fdate(S.life.off[e.id].lwd)}`
                  ) + L(left.map(T => `${nm(T[1])} · ${nm(ownerOf(T[2], e).name)}`))
                );
              })
              .join('')
          : P('Nobody is in offboarding right now.'),
        opts: [['Create an offboarding checklist', () => offChecklist('', null)]],
        nav: [['Open joiners & leavers', goPage('lifecycle', () => (S.tab.lc = 'off'))]],
        src: [SRC('Joiners & leavers', 'lifecycle')]
      });
    }
  );
  function offChecklist(text, w) {
    if (w && w.e && !w.ok) return SCOPE_MSG(w.e);
    const d = parseDates(text),
      nextM = new Date(TODAY.getFullYear(), TODAY.getMonth() + 2, 0),
      lwd = d ? d.to : /next month/i.test(text) ? iso(nextM) : iso(addDays(TODAY, 30)),
      who_ = w && w.e ? w.e.name : 'the employee';
    const owner = c =>
      ({
        hr: 'HR',
        it: 'IT',
        fin: 'Finance',
        mgr: 'Manager',
        emp: who_.split(' ')[0] === 'the' ? 'Employee' : who_
      })[c];
    const rows = OFF_T.map(T => ({
      t: T[1],
      o: owner(T[2]),
      due: T[0] === 'appr' ? 'on resignation' : iso(addDays(new Date(lwd + 'T00:00:00'), T[3]))
    }));
    const text_ =
      `Offboarding checklist for ${who_} (last working day ${fdate(lwd)})\n\n` +
      rows
        .map(
          (r, i) =>
            `${i + 1}. ${r.t}\n   Owner: ${r.o} · Due: ${r.due === 'on resignation' ? r.due : fshort(r.due)}`
        )
        .join('\n');
    say({
      tag: 'draft',
      html: P(
        'Here is a checklist built from the standard offboarding tasks, with owners and due dates relative to the last day. It is a draft: nothing has been created in PeopleDesk.'
      ),
      draft: {
        text: text_,
        use: can('lifecycle', 'create')
          ? [
              [
                'Start offboarding in PeopleDesk',
                () =>
                  open(() => {
                    go('lifecycle');
                    S.tab.lc = 'off';
                    render();
                    startOff();
                  })()
              ]
            ]
          : []
      },
      src: [SRC('Joiners & leavers', 'lifecycle')]
    });
  }
  add(
    lt =>
      /recruit|pipeline|candidate|hiring|open position|vacanc/.test(lt) &&
      !/draft|write|interview feedback/.test(lt) &&
      R() !== 'employee',
    () => {
      if (!can('recruit', 'view')) return noAccess('Recruitment');
      const by = S.stages.map((s, i) => [s, S.cands.filter(c => c.st === i)]),
        roles = [...new Set(S.cands.map(c => c.r))];
      const big = by.slice(0, 4).sort((a, b) => b[1].length - a[1].length)[0];
      say({
        tag: 'read',
        html:
          P(
            `<b>${S.cands.length}</b> candidates across ${roles.length} roles (${OPENINGS.reduce((a, o) => a + o.n, 0)} open positions):`
          ) +
          L(
            by.map(
              ([s, l]) =>
                `${nm(s)}: <b>${l.length}</b>${l.length ? ' (' + nm(l.map(c => c.n).join(', ')) + ')' : ''}`
            )
          ) +
          P(
            `Most candidates are waiting at <b>${nm(big[0])}</b> (${big[1].length}). ${S.cands.filter(c => c.st === 0).length > 2 ? 'Screening is the likely bottleneck.' : ''}`
          ) +
          L(roles.map(r => `${nm(r)}: ${S.cands.filter(c => c.r === r).length} candidates`)),
        nav: [['Open recruitment', goPage('recruit')]],
        src: [SRC('Recruitment', 'recruit')]
      });
    }
  );
  add(
    lt =>
      /(summar|tell me|show).*(employee|profile|record|about)|summar(y|i[sz]e) [a-z]+('s)? (profile|record)/.test(
        lt
      ) && !!who(lt),
    (text, lt) => {
      const w = who(text);
      if (w.amb)
        return say({
          tag: 'read',
          html: P('Which person?'),
          opts: w.amb.map(e => [nm(e.name), () => showEmp(e)])
        });
      showEmp(w.e);
    }
  );

  /* ---------- payroll (HR prepares, Admin approves) ---------- */
  const stepName = [
    'Not started',
    'Attendance locked, being prepared',
    'Submitted, waiting for approval',
    'Approved and locked, ready for payment',
    'Paid'
  ];
  const payOK = () =>
    R() === 'sysadmin'
      ? 'System Admin cannot access payroll data.'
      : !can('payroll', 'edit') && !can('payroll', 'approve')
        ? 'The payroll run is not available to your role.'
        : '';
  add(
    lt =>
      (/(what('?s| is)|which).*(block|stuck|holding|wrong|issue|exception)|payroll (status|exception|issue|check|block)|(block|exception).*payroll|payroll exceptions?/.test(
        lt
      ) &&
        !/approve|release|variance/.test(lt)) ||
      /what is blocking/.test(lt),
    (text, lt) => {
      const g = payOK();
      if (g) return deny(g);
      const c = payCheck();
      say({
        tag: 'read',
        html:
          P(`${CYC.n} payroll status: <b>${stepName[S.payStep] || ''}</b>.`) +
          (c.err.length
            ? P(
                `<b>${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''}</b> must be fixed before it can be approved:`
              ) +
              c.err
                .map(
                  x =>
                    `<div class="ai-flag bad">${ic('alert', 14)}<span><b>${nm(x.title)}</b>. ${nm(x.detail)} ${btn(nm(x.link[0]), runStr(x.link[1]), 'btn sm')}</span></div>`
                )
                .join('')
            : P('There are no blocking issues.')) +
          (c.warn.length
            ? P(
                `<b>${c.warn.length} warning${c.warn.length > 1 ? 's' : ''}</b> to review (not blocking, but must be acknowledged):`
              ) +
              L(
                c.warn.map(
                  x =>
                    `${nm(x.title)}. ${nm(x.detail)} ${btn(nm(x.link[0]), runStr(x.link[1]), 'btn sm')}`
                )
              )
            : ''),
        nav: [['Open payroll', goPage('payroll')]],
        src: [SRC('Payroll checks', 'payroll')]
      });
    }
  );
  add(
    lt =>
      /variance|compare.*(last|previous) (month|cycle)|(last|previous) month.*(compar|differ)|payroll (change|differ)|vs last month/.test(
        lt
      ),
    () => {
      const g = payOK();
      if (g) return deny(g);
      if (!canField('salary'))
        return deny('You do not have access to salary figures, so I cannot compare payroll.');
      const cur = payTot(live()),
        prev = payTot(live(), true),
        th = W().varPct;
      const mv = live()
        .map(e => ({ e, p: prevSlip(e), c: slip(e.ctc) }))
        .filter(x => x.p)
        .map(x => ({ ...x, v: pctD(x.c.net, x.p.net) }))
        .sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
      const nj = live().filter(e => e.join >= CYC.a),
        ex = (S.life.exits || []).filter(x => x.lwd >= CYC.a && x.lwd <= CYC.b);
      say({
        tag: 'read',
        html:
          P(`${CYC.n} vs last month (people paid in both):`) +
          KV([
            [
              'Total net pay',
              `${inr(cur.n)} vs ${inr(prev.n)} (<b>${fpct(pctD(cur.n, prev.n))}</b>)`
            ],
            ['Gross', `${inr(cur.g)} vs ${inr(prev.g)}`],
            ['Deductions', `${inr(cur.d)} vs ${inr(prev.d)}`],
            ['Headcount paid', `${cur.c} vs ${prev.c}`]
          ]) +
          (mv.filter(x => Math.abs(x.v) >= 0.1).length
            ? P(`Biggest movers (alert threshold ${th}%):`) +
              L(
                mv
                  .filter(x => Math.abs(x.v) >= 0.1)
                  .slice(0, 4)
                  .map(
                    x =>
                      `<b>${nm(x.e.name)}</b>: ${fpct(x.v)} (${inr(x.p.net)} → ${inr(x.c.net)})${Math.abs(x.v) >= th ? ' · above threshold' : ''}`
                  )
              )
            : P('No individual net pay moved noticeably.')) +
          (nj.length ? P(`New joiners this cycle: ${nm(nj.map(e => e.name).join(', '))}.`) : '') +
          (ex.length ? P(`Exits this cycle: ${ex.length}.`) : ''),
        nav: [['Open payroll', goPage('payroll')]],
        src: [SRC('Payroll', 'payroll')]
      });
    }
  );
  add(
    lt =>
      /(approve|approval of).*payroll|payroll.*(approve|sign off)/.test(lt) &&
      !/how|draft|can i/.test(lt),
    () => proposePayApprove(),
    () => payOK()
  );
  add(
    lt =>
      /(release|pay out|process|send|disburse).*(salary|salaries|payments?|payroll)|(salary|payment)s? release/.test(
        lt
      ),
    () => proposeRelease(),
    () => payOK()
  );
  function proposePayApprove() {
    if (!can('payroll', 'approve'))
      return deny(
        'Only someone with payroll approval permission can approve payroll. Your role can prepare it but not approve it.'
      );
    if (S.payStep !== 2 || !S.pay.prep)
      return say({
        tag: 'denied',
        html: P(
          `Payroll can only be approved once it has been submitted. Current status: <b>${stepName[S.payStep]}</b>.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    if (S.pay.prep.id === me().id)
      return deny(
        `You prepared this payroll, so a different person must approve it (maker-checker rule). Prepared by ${nm(S.pay.prep.by)}.`
      );
    const c = payCheck(),
      t = payTot(live());
    if (c.err.length)
      return say({
        tag: 'denied',
        html:
          P(
            `${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} appeared after submission, so I cannot approve:`
          ) + L(c.err.map(x => nm(x.title))),
        nav: [['Open payroll', goPage('payroll')]]
      });
    propose({
      title: `Approve ${CYC.n} payroll?`,
      risk: 'high',
      confirm: 'Review approval',
      confirm2: 'Approve and lock payroll',
      rows: [
        ['Payslips', String(t.c)],
        ['Total net payout', `<b>${inr(t.n)}</b>`],
        ['Prepared by', nm(S.pay.prep.by)],
        ['Warnings', c.warn.length ? `${c.warn.length} acknowledged` : 'none']
      ],
      impact: `Approving locks all ${t.c} payslips for ${CYC.n}. After this, changes need payroll to be reopened. This is recorded in the payroll log and the audit log under your name.`,
      ack: `I have reviewed the figures and approve ${CYC.n} payroll for ${inr(t.n)}.`,
      check: () => {
        if (!can('payroll', 'approve'))
          return { ok: false, why: 'You no longer have approval permission.' };
        if (S.payStep !== 2)
          return { ok: false, why: 'Payroll is no longer waiting for approval.' };
        if (S.pay.prep && S.pay.prep.id === me().id)
          return { ok: false, why: 'You prepared this payroll.' };
        return payCheck().err.length
          ? { ok: false, why: 'New blocking issues appeared.' }
          : { ok: true };
      },
      run: () => {
        payApproveGo();
        auditAI('Payroll approved', CYC.n + ' payroll', { res: 'payroll', to: inr(t.n) });
        return {
          ok: true,
          msg: `${CYC.n} payroll approved and locked.`,
          after: [['Open payroll', open(() => go('payroll'))]]
        };
      }
    });
  }
  function proposeRelease() {
    if (!can('payroll', 'edit') && !can('payroll', 'approve'))
      return deny('You do not have permission to release salary payments.');
    if (S.payStep !== 3 || !S.pay.locked)
      return say({
        tag: 'denied',
        html: P(
          `Salary can only be released after payroll is approved and locked. Current status: <b>${stepName[S.payStep]}</b>.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    if (S.pay.bank)
      return say({
        tag: 'denied',
        html: P(
          `A bank file (${nm(S.pay.bank.ref)}) was already generated. Status: ${nm(S.pay.bank.state)}.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    const t = payTot(live());
    propose({
      title: 'Release salary payments?',
      risk: 'high',
      confirm: 'Review release',
      confirm2: 'Generate bank file and release',
      rows: [
        ['Cycle', CYC.n],
        ['Payments', String(t.c)],
        ['Total', `<b>${inr(t.n)}</b>`]
      ],
      impact: `This generates the bank payment file for ${t.c} employees totalling ${inr(t.n)}. Money moves only when the bank confirms. In this demo the bank response is simulated. It is logged under your name.`,
      ack: `I confirm releasing ${inr(t.n)} to ${t.c} employees for ${CYC.n}.`,
      check: () =>
        S.payStep === 3 && !S.pay.bank && (can('payroll', 'edit') || can('payroll', 'approve'))
          ? { ok: true }
          : { ok: false, why: 'Payroll is no longer ready for release.' },
      run: () => {
        payBankFile();
        auditAI('Salary release started', CYC.n + ' payroll', { res: 'payroll', to: inr(t.n) });
        return {
          ok: true,
          msg: 'Bank file generated. Payment is not confirmed until the bank responds.',
          after: [['Open payroll', open(() => go('payroll'))]]
        };
      }
    });
  }

  /* ---------- admin: company summary, reports, configuration ---------- */
  add(
    lt =>
      /(summar|overview|status).*(company|workforce|business|organi[sz]ation)|company (attendance|summary|overview)|workforce (status|summary)/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (R() === 'sysadmin') return deny('System Admin does not have access to workforce data.');
      const sc = scoped('employees'),
        p = presentToday(sc),
        inc = S.incidents.filter(i => i.st !== 'Closed').length,
        exp = S.courses.filter(c => c.exp <= iso(addDays(TODAY, 30))).length;
      const rows = [
        ['Headcount', String(sc.length)],
        ['Present today', `${p.pr} of ${sc.length} (${p.pct}%)`],
        ['On leave', String(p.on)],
        ['Open positions', String(OPENINGS.reduce((a, o) => a + o.n, 0))]
      ];
      if (can('approvals', 'view'))
        rows.push([
          'Approvals waiting',
          `${queue('mine').length} (${queue('overdue').length} overdue)`
        ]);
      if (can('payroll', 'edit') || can('payroll', 'approve'))
        rows.push(['Payroll', stepName[S.payStep]]);
      if (can('safety', 'view')) rows.push(['Open safety incidents', String(inc)]);
      if (can('training', 'view')) rows.push(['Certificates expiring (30 days)', String(exp)]);
      say({
        tag: 'read',
        html: P('Workforce status for your scope:') + KV(rows),
        nav: [['Open dashboard', goPage('dashboard')]],
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );
  add(
    lt =>
      /(trend|attrition|headcount|turnover).*(explain|trend|report)|explain.*(trend|report|attrition)|reports? (summary|overview)/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (!can('reports', 'view')) return noAccess('Reports');
      const sc = scoped('employees'),
        hs = headcountSeries(sc),
        at = attSeries(sc),
        ex = (S.life.exits || []).filter(x => x.lwd >= iso(addDays(TODAY, -365))).length,
        hc = Math.max(live().length, 1);
      const avg = at.length ? Math.round(at.reduce((a, x) => a + x.pct, 0) / at.length) : null;
      say({
        tag: 'read',
        html:
          P('What the numbers say for your scope:') +
          L(
            [
              `<b>Headcount</b>: ${hs[hs.length - 1]} now, ${hs[0]} twelve months ago (${hs[hs.length - 1] - hs[0] >= 0 ? '+' : ''}${hs[hs.length - 1] - hs[0]}).`,
              `<b>Attrition</b>: ${ex} exit${ex === 1 ? '' : 's'} in 12 months, ${((ex / hc) * 100).toFixed(1)}% of current headcount.`,
              avg != null
                ? `<b>Attendance</b>: ${avg}% average over the last ${at.length} working days.`
                : '',
              `<b>Leave</b>: ${S.leaves.filter(l => l.status === 'Pending').length} requests pending, ${S.leaves.filter(l => l.status === 'Approved').length} approved on record.`,
              `<b>Recruitment</b>: ${S.cands.length} candidates for ${OPENINGS.reduce((a, o) => a + o.n, 0)} open positions.`,
              '<b>Overtime and cost per hire</b>: not connected yet (shown as Sample on Reports).'
            ].filter(Boolean)
          ),
        nav: [['Open reports', goPage('reports')]],
        src: [SRC('Reports', 'reports')]
      });
    }
  );
  add(
    lt =>
      /how (do|can|should) i.*(change|set|configure|update|add|edit).*(leave|polic|calendar|holiday|approval rule|notification|work week|statutory)|configure (policy|policies|approval|notification)/.test(
        lt
      ) && R() !== 'sysadmin',
    () => {
      if (!okPage('settings')) return noAccess('Settings');
      say({
        tag: 'read',
        html:
          P('Policies live in <b>Settings</b>:') +
          `<ol class="ai-ul"><li>Open <b>Settings → Work policies</b> for leave rules, notice, grace time, working week and probation. <b>Statutory</b> covers PF, ESI, professional tax and TDS.</li><li>Change the value and choose the <b>effective date</b>. Past payslips keep the old rule.</li><li>Add a reason. Every change is versioned and written to the audit log.</li></ol>` +
          P(
            'Leave types and approval routing follow these policies plus each person’s reporting line (Organization). I can explain a setting, but I do not change policies myself.'
          ),
        nav: [
          [
            'Open Settings',
            goPage('settings', () => (S.tab.st = can('policy', 'view') ? 'policy' : S.tab.st))
          ]
        ],
        src: [SRC('Settings', 'settings')]
      });
    }
  );

  /* ---------- system admin ---------- */
  const sysOnly = () => R() === 'sysadmin';
  add(
    lt =>
      /integration|sso|single sign|bank (connection|api)|notification.*(deliver|fail)|email.*(deliver|fail)/.test(
        lt
      ) &&
      /(fail|status|broken|down|working|diagnos|which)/.test(lt) &&
      R() !== 'employee',
    () => {
      say({
        tag: 'read',
        html:
          P('<b>0 of 4</b> integrations are connected, so none are failing.') +
          L([
            'Bank payments: not connected',
            'Identity provider (SSO): not connected',
            'Attendance devices: not connected',
            'Email and SMS delivery: not connected'
          ]) +
          P(
            'These are placeholders in this demo build: there is no live delivery or sync status to read. In production, failures would show here with the last error.'
          ),
        nav: okPage('settings')
          ? [['Open integrations', goPage('settings', () => (S.tab.st = 'integrations'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Integrations', 'settings', () => (S.tab.st = 'integrations'))]
          : []
      });
    }
  );
  add(
    lt =>
      /\bsso\b|single sign.?on|saml|openid|identity provider/.test(lt) &&
      /(how|configure|set up|setup|enable)/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To set up single sign-on (checklist):') +
          `<ol class="ai-ul"><li>Choose the protocol your identity provider supports (SAML 2.0 or OpenID Connect).</li><li>In the provider, register PeopleDesk as an application and note the entity ID, sign-in URL and signing certificate (or client ID and secret).</li><li>In PeopleDesk, open <b>Settings → Integrations → Identity provider</b> and enter those values.</li><li>Map the provider’s email attribute to the PeopleDesk work email and test with one System Admin account before enforcing it.</li><li>Keep password sign-in available for System Admins until SSO is proven.</li></ol>` +
          P(
            '<span class="muted small">In this demo build SSO is a placeholder: the Connect button is disabled and nothing is sent to a provider.</span>'
          ),
        nav: okPage('settings')
          ? [['Open integrations', goPage('settings', () => (S.tab.st = 'integrations'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Integrations', 'settings', () => (S.tab.st = 'integrations'))]
          : []
      })
  );
  add(
    lt =>
      /(recent|latest|show).*(permission|role|access|security|system|config).*(change|update|edit)|permission changes|who changed/.test(
        lt
      ),
    () => {
      if (!can('audit', 'view') && !sysOnly()) return noAccess('The audit log');
      const rows = S.audit
        .filter(a =>
          sysOnly()
            ? a.cat === 'system'
            : /^(Permission|Role|Scope|Sensitive|User|Security|Integration|Access)/.test(a.act)
        )
        .slice(0, 6);
      say({
        tag: 'read',
        html: rows.length
          ? P('Most recent system changes:') +
            L(
              rows.map(
                a =>
                  `<b>${nm(a.act)}</b>: ${nm(a.rec)} · ${nm(a.by)} · ${ftime(a.at)}${a.to ? ' · now ' + nm(a.to) : ''} <span class="muted small">(${nm(a.id)})</span>`
              )
            )
          : P('No permission or security changes have been recorded in this session yet.'),
        nav: [['Open audit log', goPage('audit')]],
        src: [SRC('Audit log', 'audit')]
      });
    }
  );
  add(
    lt => /(explain|what (does|is)|meaning).*(audit|log entry)|audit (log )?entry|aud-\d+/.test(lt),
    (text, lt) => {
      if (!can('audit', 'view')) return noAccess('The audit log');
      const id = (text.match(/AUD-\d+/i) || [])[0],
        pool = sysOnly() ? S.audit.filter(a => a.cat === 'system') : S.audit,
        a = id ? pool.find(x => x.id.toLowerCase() === id.toLowerCase()) : pool[0];
      if (!a)
        return nothing(
          id
            ? `I can't find ${nm(id)} in the audit log you can see.`
            : 'The audit log has no entries yet.'
        );
      say({
        tag: 'read',
        html:
          P(`<b>${nm(a.id)}</b> (${id ? '' : 'the latest entry, '}${ftime(a.at)}):`) +
          KV([
            ['What happened', nm(a.act)],
            ['Record', nm(a.rec || '–')],
            ['Done by', `${nm(a.by)} <span class="muted small">acting as ${nm(a.as)}</span>`],
            ['Change', a.from || a.to ? `${nm(a.from || '–')} → ${nm(a.to || '–')}` : '–'],
            ['Reason', nm(a.reason || 'none given')]
          ]) +
          P(
            `In plain words: ${nm(a.by)} ${/denied/i.test(a.act) ? 'tried something their role is not allowed to do, and it was blocked' : 'made this change'}${a.rec ? ' on ' + nm(a.rec) : ''}.`
          ),
        nav: [['Open audit log', goPage('audit')]],
        src: [SRC('Audit log', 'audit')]
      });
    }
  );
  add(
    lt =>
      /(explain|what).*(role|permission|scope|access)|who can|can (a |an )?(employee|manager|hr|admin|system admin) (see|do|approve|view|edit)/.test(
        lt
      ) && !/audit/.test(lt),
    (text, lt) => {
      const hit = ROLE_DEF.find(r => lt.includes(r.n.toLowerCase())),
        res = Object.keys(RES).find(k =>
          new RegExp(RES[k][0].toLowerCase().split(' ')[0]).test(lt)
        );
      if (hit && res && S.perms.m[res]) {
        const x = S.perms.m[res][hit.k];
        return say({
          tag: 'read',
          html:
            P(`<b>${hit.n}</b> in <b>${RES[res][0]}</b>:`) +
            L([
              `Can: ${
                ACTS.filter(a => x[a])
                  .map(a => ACT_N[a])
                  .join(', ') || 'nothing'
              }`,
              `Scope: ${(SCOPES.find(s => s[0] === x.scope) || ['', x.scope])[1]}`
            ]),
          src: okPage('settings')
            ? [SRC('Settings · Roles and access', 'settings', () => (S.tab.st = 'roles'))]
            : []
        });
      }
      say({
        tag: 'read',
        html:
          P('The five roles in PeopleDesk:') +
          L(ROLE_DEF.map(r => `<b>${r.n}</b>: ${nm(r.d)}`)) +
          P(
            `Access is set per area (view, create, edit, approve, export) and per <b>scope</b>: ${SCOPES.map(s => s[1].toLowerCase()).join(', ')}. Salary, bank, identity and medical details are separate permissions.`
          ),
        src: okPage('settings')
          ? [SRC('Settings · Roles and access', 'settings', () => (S.tab.st = 'roles'))]
          : []
      });
    }
  );
  add(
    lt =>
      (/(active )?sessions?|logged in|signed in|two.?step|mfa|2fa|password (policy|length)|session timeout|inactivity/.test(
        lt
      ) &&
        R() !== 'employee') ||
      /security settings|failed login/.test(lt),
    () => {
      say({
        tag: 'read',
        html:
          P('Security settings right now:') +
          KV([
            ['Minimum password length', `${S.sec.minLen} characters`],
            ['Sign out after inactivity', `${S.sec.timeout} minutes`],
            [
              'Two-step verification',
              ROLE_DEF.map(r => `${r.n}: ${S.sec.twoFA[r.k] ? 'on' : 'off'}`).join(', ')
            ]
          ]) +
          P(
            'Active sessions I can see: <b>this browser</b> (you, current) and one sample Android entry. This demo has no real session tracking or failed-login log.'
          ),
        nav: okPage('settings')
          ? [['Open security', goPage('settings', () => (S.tab.st = 'security'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Security', 'settings', () => (S.tab.st = 'security'))]
          : []
      });
    }
  );
  add(
    lt =>
      /(integration|checklist|technical|runbook).*(doc|checklist|draft|write)/.test(lt) &&
      sysOnly(),
    () => K.fallback('')
  );
  addFirst(
    lt =>
      sysOnly() &&
      /(salary|payslip|pay slip|bank (account|detail)|payroll|\bctc\b|leave (balance|request)|attendance|expense|claim|candidate|recruit|approve|reject|\blate\b|employee profile|employee record|onboard|offboard|performance|training|holiday|announce|who is on leave|team)/.test(
        lt
      ) &&
      !/(audit|permission|role|\bsso\b|session|integration|security|mfa|two.?step|password|timeout|access|login|log in|configure|account|draft.*(doc|checklist))/.test(
        lt
      ),
    () =>
      deny(
        'As System Admin you cannot use me for employee, payroll, leave, attendance or recruitment data, and you cannot approve HR workflows.',
        'I can help with roles and permissions, security settings, sessions, integrations and the audit log.'
      )
  );

  /* ---------- drafts ---------- */
  const first = e => (e ? e.name.split(' ')[0] : 'there');
  function draftReject(k, r) {
    const e = emp(r.emp),
      fl = flagsFor(k, r),
      why = [];
    if (k === 'leave') {
      const ov = teamOverlap(r.emp, r.from, r.to, r.id);
      if (ov.length)
        why.push(
          `${ov.map(l => emp(l.emp).name).join(' and ')} ${ov.length > 1 ? 'are' : 'is'} already off on those dates and we need enough cover`
        );
      if (balances(r.emp)[r.type].left < r.days)
        why.push(`your ${POLICY[r.type].n.toLowerCase()} balance is not enough`);
    }
    if (k === 'claim') why.push('the details or receipts are not enough for me to approve it yet');
    return `Hi ${first(e)}, thank you for sending this. I can't approve it this time because ${why.length ? why.join(', and ') : '[add your reason]'}. ${k === 'leave' ? 'Could you suggest another date or two? I am happy to look again.' : 'Please add what is missing and send it again.'} Thanks for understanding.`;
  }
  function draftFor(type, text, o) {
    const lt = (text || '').toLowerCase(),
      w = who(text || ''),
      e = w && w.e ? w.e : null,
      tn = e ? first(e) : '[name]';
    const ctx_ =
      o || (A.rec && A.rec.t === 'req' ? { k: A.rec.k, r: findReq(A.rec.k, A.rec.id) } : null);
    let title,
      body,
      use = [],
      tag = 'draft';
    if (type === 'reject') {
      if (ctx_ && ctx_.r && !inScope(KIND[ctx_.k].res, ctx_.r.emp))
        return deny('That request is outside your access.');
      title = 'Rejection comment';
      body =
        ctx_ && ctx_.r
          ? draftReject(ctx_.k, ctx_.r)
          : `Hi ${tn}, thank you for your request. I can't approve it this time because [reason]. Could you suggest another option? Thanks for understanding.`;
      if (ctx_ && ctx_.r)
        use = [['Use in a rejection', t => proposeDecisionWith(ctx_.k, ctx_.r, t)]];
    } else if (type === 'approve') {
      title = 'Approval comment';
      body = `Approved, ${ctx_ && ctx_.r ? first(emp(ctx_.r.emp)) : tn}. Thanks for planning ahead. Please hand over anything urgent before you go, and keep your phone on for emergencies.`;
    } else if (type === 'leave') {
      const t = typeOf(lt) || (A.flow && A.flow.s && A.flow.s.type) || 'CL',
        d =
          parseDates(text) ||
          (A.flow && A.flow.s && A.flow.s.from ? { from: A.flow.s.from, to: A.flow.s.to } : null),
        o2 = reasonOptions(t, d ? { from: d.from, to: d.to } : null);
      title = 'Leave reason';
      body = o2[0] + '\n\nAlternative:\n' + o2[1];
      use = [
        [
          'Apply for leave with this',
          tx => {
            A.flow = { k: 'leave', s: { type: t, reason: tx.split('\n')[0] }, await: '' };
            if (d) {
              A.flow.s.from = d.from;
              A.flow.s.to = d.to;
            }
            leaveFlow('');
          }
        ]
      ];
    } else if (type === 'announce') {
      const d = lt.match(/announcement (?:about|on|for|regarding)\s+(.+)$/i),
        topic = d ? d[1].trim() : /diwali|shutdown/.test(lt) ? 'Diwali shutdown' : '';
      if (/diwali|shutdown/.test(lt) || !topic) {
        title = 'Diwali shutdown schedule';
        body = `Dear all,\n\nPlease note the Diwali shutdown schedule:\n• Plant lines stop on 7 Nov at 14:00 and resume on 11 Nov.\n• The office is closed from 8 to 10 Nov.\n\nPlease finish pending approvals, handovers and safety checks before you leave. Contact your manager for anything urgent.\n\nWishing you and your family a safe and happy Diwali.\n\nHR & Admin`;
      } else {
        title = topic.charAt(0).toUpperCase() + topic.slice(1);
        body = `Dear all,\n\n[Say what is happening, when, and who is affected.]\n\nWhat you need to do:\n• [Action 1]\n• [Action 2]\n\nFor questions, contact HR.\n\nThank you,\nHR & Admin`;
      }
      if (annAllowed()) use = [['Review and send to everyone', tx => proposeAnnounce(title, tx)]];
    } else if (type === 'review') {
      title = 'Performance feedback';
      body = `${e ? e.name : '[Name]'}: summary for this cycle\n\nStrengths: [two or three specific examples with results]\nAreas to grow: [one or two, with the impact they had]\nNext steps: [goals, support or training agreed]\n\nOverall: [one line that is honest and encouraging]`;
    } else if (type === 'checkin') {
      title = 'Goal check-in note';
      body = `Check-in with ${e ? e.name : '[Name]'} on ${fdate(iso(TODAY))}\n\nProgress: [what moved since the last check-in]\nBlockers: [what is in the way]\nAgreed next steps: [action, owner, date]`;
    } else if (type === 'helpdesk') {
      title = 'Helpdesk message';
      body = `Hello,\n\nI would like to request ${/salary certificate/.test(lt) ? 'a salary certificate' : /experience/.test(lt) ? 'an experience letter' : /laptop|it/.test(lt) ? 'IT support for my laptop' : '[what you need]'}. ${/laptop|it/.test(lt) ? 'The issue started on [date] and happens when [what you were doing].' : 'I need it by [date] for [purpose].'}\n\nPlease let me know if you need anything more from me.\n\nThank you,\n${me().name}`;
      use = [
        [
          'Open the request form',
          () =>
            open(() => {
              go('requests');
              addTicket();
            })()
        ]
      ];
    } else if (type === 'docnote') {
      title = 'Document upload note';
      body = `Hi HR, I have uploaded the new ${'[document name]'} you asked for. The previous file was [reason, for example blurred or expired]. Please let me know if anything else is needed.`;
    } else if (type === 'interview') {
      title = 'Interview feedback';
      body = `Candidate: [name] · Role: [role] · Stage: [stage]\n\nTechnical/skills: [rating and one example]\nCommunication: [rating and one example]\nCulture and safety mindset: [observation]\nRecommendation: [Proceed / Hold / Reject] because [reason]`;
    } else {
      title = 'Message';
      body = `Hi ${tn},\n\n[Context in one line.]\n\n[What you need or what is changing, and by when.]\n\nPlease reply if anything is unclear.\n\nThanks,\n${me().name}`;
    }
    say({
      tag: tag,
      html: P(
        `<b>${nm(title)}</b>. This is a draft for you to edit. I have not sent or saved anything.`
      ),
      draft: { text: body, use },
      src: []
    });
  }
  const proposeDecisionWith = (k, r, t) => {
    const a = canAct(k, r);
    if (!a.ok) return deny(nm(a.why));
    proposeDecision(k, r, 'Rejected');
    const p = Object.values(A.props).pop();
    if (p && p.vals) p.vals.note = t;
    K.paint();
  };
  const annAllowed = () => ['hr', 'admin'].includes(R()) && can('employees', 'edit');
  function proposeAnnounce(title, text) {
    if (!annAllowed()) return deny('Only HR and Admin can send company announcements.');
    const body = text.replace(/^[\s\S]*?\n\n/, '').trim() || text,
      n = live().length;
    let sent = null;
    propose({
      title: 'Send this announcement to all employees?',
      risk: 'high',
      confirm: 'Review and send',
      confirm2: `Send to ${n} employees`,
      rows: [
        ['Title', nm(title)],
        ['Recipients', `All employees (${n})`],
        ['Message', nm(body.split('\n').filter(Boolean).slice(0, 3).join(' ')).slice(0, 220) + '…']
      ],
      impact: `Everyone sees this on their home screen and in notifications straight away. You can recall it afterwards, but people may already have read it.`,
      ack: `I have read the preview and want to send it to all ${n} employees.`,
      check: () =>
        annAllowed()
          ? { ok: true }
          : { ok: false, why: 'You no longer have permission to send announcements.' },
      run: () => {
        sent = [title, body.replace(/\n+/g, ' ').slice(0, 160), 'Just now'];
        ANN.unshift(sent);
        S.notifs.unshift({ t: title, s: 'Announcement from ' + me().name, time: 'Just now', u: 1 });
        audit('Announcement sent', title, { res: 'settings', to: `${n} recipients` });
        auditAI('Announcement sent', title, { res: 'settings', to: `${n} recipients` });
        persist();
        render();
        return { ok: true, msg: `Sent to ${n} employees.` };
      },
      undoOK: () => sent && ANN.includes(sent),
      undo: () => {
        const i = ANN.indexOf(sent);
        if (i >= 0) ANN.splice(i, 1);
        S.notifs = S.notifs.filter(x => x.t !== title);
        audit('Announcement recalled', title, { res: 'settings' });
        render();
        return { ok: true, msg: 'Announcement recalled. It is no longer shown on home screens.' };
      }
    });
  }
  addFirst(
    lt => /\b(send|publish|post)\b.*\bannouncement\b/.test(lt) && !/draft|write/.test(lt),
    (text, lt) => {
      if (!annAllowed()) return deny('Only HR and Admin can send company announcements.');
      say({
        tag: 'read',
        html: P('Let me draft it first so you can review the wording and recipients.')
      });
      draftFor('announce', text);
    }
  );
  add(
    lt =>
      /\b(draft|write|compose|word|rephrase|suggest)\b/.test(lt) || /^draft a message$/.test(lt),
    (text, lt) => {
      const type =
        A.flow &&
        A.flow.k === 'leave' &&
        /reason|draft|suggest/.test(lt) &&
        !/reject|announce/.test(lt)
          ? 'leave'
          : /reject|declin/.test(lt)
            ? 'reject'
            : /approv/.test(lt)
              ? 'approve'
              : /leave/.test(lt)
                ? 'leave'
                : /announce|notice|shutdown|diwali|circular/.test(lt)
                  ? 'announce'
                  : /interview/.test(lt)
                    ? 'interview'
                    : /feedback|review|appraisal/.test(lt)
                      ? 'review'
                      : /check.?in|goal/.test(lt)
                        ? 'checkin'
                        : /helpdesk|ticket|it support|certificate|letter/.test(lt)
                          ? 'helpdesk'
                          : /upload|document/.test(lt)
                            ? 'docnote'
                            : /message|email|communicat|team|policy/.test(lt)
                              ? 'message'
                              : '';
      if (!type) {
        const opts = {
          employee: [
            ['Leave reason', 'leave'],
            ['Helpdesk message', 'helpdesk'],
            ['Document upload note', 'docnote']
          ],
          manager: [
            ['Rejection comment', 'reject'],
            ['Approval comment', 'approve'],
            ['Review feedback', 'review'],
            ['Goal check-in note', 'checkin'],
            ['Team message', 'message']
          ],
          hr: [
            ['Employee message', 'message'],
            ['Announcement', 'announce'],
            ['Interview feedback', 'interview'],
            ['Rejection comment', 'reject']
          ],
          admin: [
            ['Announcement', 'announce'],
            ['Employee message', 'message'],
            ['Rejection comment', 'reject']
          ],
          sysadmin: [['Technical note', 'message']]
        }[R()];
        return say({
          tag: 'read',
          html: P('What should I draft?'),
          opts: opts.map(([l, t]) => [l, () => draftFor(t, text)])
        });
      }
      if (type === 'announce' && !['hr', 'admin'].includes(R())) {
        /* employees and managers can still get wording, just no send button */
      }
      draftFor(type, text);
    }
  );

  /* ---------- navigation ---------- */
  const NAVW = [
    [
      /approval/,
      'approvals',
      () => (S.tab.ap = /overdue/.test(window.__pdaiQ || '') ? 'overdue' : 'mine')
    ],
    [
      /payslip/,
      'payroll',
      () => {
        if (S.role !== 'employee') S.tab.pr = 'me';
      }
    ],
    [/payroll|exception/, 'payroll'],
    [/roster|shift/, 'roster'],
    [/leave/, 'leave'],
    [/attendance|punch/, 'attendance'],
    [/employee|people|team/, 'employees'],
    [/report/, 'reports'],
    [/setting|polic/, 'settings'],
    [/audit/, 'audit'],
    [/training|course/, 'training'],
    [/safety|incident/, 'safety'],
    [/asset/, 'assets'],
    [/recruit|candidate/, 'recruit'],
    [/performance|goal/, 'performance'],
    [/request|claim|ticket|helpdesk/, 'requests'],
    [/onboard|offboard|joiner|lifecycle/, 'lifecycle'],
    [/organi[sz]ation|org chart/, 'org'],
    [/profile/, 'profile'],
    [/dashboard|home/, 'dashboard']
  ];
  addFirst(
    lt =>
      /\b(take me|go to|open|show me|navigate|jump to|bring me)\b/.test(lt) &&
      !/summar|explain|draft|who|which|how many/.test(lt),
    (text, lt) => {
      window.__pdaiQ = lt;
      const w = who(text);
      if (
        w &&
        w.e &&
        /\b(this|profile|employee|record|open|take me|go)\b/.test(lt) &&
        !/payslip|leave|attendance/.test(lt)
      ) {
        if (!w.ok || !(can('employees', 'view') || w.e.id === me().id)) return SCOPE_MSG(w.e);
        const e = w.e;
        return (
          say({ tag: 'info', html: P(`Opening ${nm(e.name)}'s profile.`), nav: [], src: [] }),
          open(() => empProfile(e.id))()
        );
      }
      if (/this (employee|person)/.test(lt) && A.rec && A.rec.t === 'emp')
        return open(() => empProfile(A.rec.id))();
      const hit = NAVW.find(([re]) => re.test(lt));
      if (!hit) return K.fallback(text);
      const [, pg, pre] = hit;
      if (!okPage(pg))
        return deny(
          `You do not have access to ${nm(label(pg))}.`,
          'If you need it for your work, ask your System Admin to grant View access.'
        );
      say({ tag: 'info', html: P(`Taking you to <b>${nm(label(pg))}</b>.`) });
      K.goPage(pg, pre)();
    }
  );
  add(
    lt => /^(my )?(approvals|payslips?|leave|attendance|payroll|reports?)$/.test(lt.trim()),
    (text, lt) => {
      const hit = NAVW.find(([re]) => re.test(lt));
      if (hit && okPage(hit[1])) {
        say({ tag: 'info', html: P(`Taking you to <b>${nm(label(hit[1]))}</b>.`) });
        K.goPage(hit[1], hit[2])();
      } else deny('You do not have access to that page.');
    }
  );

  /* ---------- guardrails for things the assistant will not do ---------- */
  addFirst(
    lt =>
      /(delete|remove|deactivate|terminate|disable)\b.*(employee|user|account|person|staff)|bulk (update|change|edit)|change (the )?roles?\b|make .* (an? )?(admin|manager|hr)/.test(
        lt
      ) && !/how|explain|policy/.test(lt),
    () =>
      deny(
        "I can't deactivate or delete people, make bulk updates or change roles. Those high-impact changes need to be done directly in PeopleDesk with the proper approvals.",
        'I can take you to the right screen and explain the steps.'
      )
  );
  addFirst(
    lt =>
      /\bexport|download (all|the)? ?(employees|data|report)/.test(lt) &&
      /employee|people|data|payroll|attendance/.test(lt),
    () => {
      if (!can('employees', 'export'))
        return deny('You do not have permission to export employee data.');
      propose({
        title: 'Export the employee list (CSV)?',
        risk: 'high',
        confirm: 'Review export',
        confirm2: 'Export CSV',
        rows: [
          ['People', String(scoped('employees').length)],
          ['Format', 'CSV, saved to your device']
        ],
        impact:
          'This saves personal details of everyone in your scope to a file on your device. The export is recorded in the audit log.',
        ack: 'I will handle this file under company data-protection rules.',
        check: () =>
          can('employees', 'export')
            ? { ok: true }
            : { ok: false, why: 'You no longer have export permission.' },
        run: () => {
          exportEmps();
          auditAI('Employee export', 'Employee list', { res: 'employees' });
          return { ok: true, msg: 'Export started.' };
        }
      });
    }
  );
  /* conversational helpers for questions that need the person to pick */
  add(
    lt => /^(summar(y|i[sz]e)? ?(this)?( record)?|explain this( record)?)$/.test(lt.trim()),
    sumRecord
  );
  K.draftFor = draftFor;
})(PDAI.K);
