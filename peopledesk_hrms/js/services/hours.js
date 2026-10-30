/* =====================================================================
   Working hours, overtime and comp-off: policy, daily hours, entries, requests
   One model for the dashboard, the ledger, the use-my-time flow and the manager queue.
   Hours come from the same punches as Attendance (dayInfo): app, biometric or web.
   Screens: features/hours/hours-page.js, hours-flow.js and settings/ot-policy.js.
   ===================================================================== */
const OT_CAT = { weekday: 'Weekday overtime', holiday: 'Holiday work', off: 'Weekly-off work' };
const OT_CAT_S = { weekday: 'Weekday', holiday: 'Holiday', off: 'Weekly off' };
/* ledger status: [label, chip tone]. Every status is a word, never a colour alone. */
const OT_ST = {
  auto: ['Auto-calculated', 'mute'],
  pending: ['Pending', 'warn'],
  rejected: ['Rejected', 'bad'],
  available: ['Available', 'ok'],
  inreq: ['In request', 'info'],
  comp: ['Used as comp-off', 'info'],
  paid: ['Paid', 'info'],
  expired: ['Expired', 'mute']
};
const OT_PREFIX = { OT: 'Overtime approval', CO: 'Comp-off', PY: 'Extra pay' };
const otpDefaults = () => ({
  breakMin: 45, // unpaid break taken out of every day
  minMin: 30, // overtime under this many minutes is not recorded
  round: 15, // recorded in steps of this many minutes (rounded down)
  dailyCap: 4, // hours a day that count as weekday overtime
  weeklyCap: 12,
  rate: { weekday: 1.5, holiday: 2, off: 2 },
  approve: { weekday: 1, holiday: 1, off: 1 },
  comp: { half: 4, full: 8, expiry: 90 },
  mode: 'choose', // choose | comp | pay
  cutoff: 25, // entries after this day of the month move to next month's payroll
  payDays: 26, // hourly pay = basic / payDays / payHours
  payHours: 8,
  over: [], // per role or department: { type, key, mode, weekday, holiday, off }
  meta: { by: 'System defaults', at: '' }
});
S.otp = otpDefaults();
S.ot = { entries: {}, reqs: [], n: { OT: 0, CO: 0, PY: 0 }, seeded: 0 };

/* ---------- formats ---------- */
const fhm = m => {
  m = Math.round(m || 0);
  const s = m < 0 ? '−' : '',
    a = Math.abs(m);
  return s + Math.floor(a / 60) + 'h ' + pad(a % 60) + 'm';
};
const fsg = m => (m > 0 ? '+' : '') + fhm(m);
const fdy = n => (n === 0.5 ? 'Half day' : n === 1 ? '1 day' : n + ' days');
const addD = (dt, n) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);
const wkStart = dt => addD(dt, -((dt.getDay() + 6) % 7));
const fdd = dt =>
  DOWN[dt.getDay()].slice(0, 3) + ' ' + dt.getDate() + ' ' + MON[dt.getMonth()].slice(0, 3);
const fddy = dt => fdd(dt) + ' ' + dt.getFullYear();
const monLbl = dt => MON[dt.getMonth()] + ' ' + dt.getFullYear();
const isoD = s => new Date(s + 'T00:00:00');

/* ---------- policy, with per-role and per-department overrides ---------- */
function otPolFor(e) {
  const b = S.otp,
    o = (b.over || []).find(
      x => (x.type === 'dept' && x.key === e.dept) || (x.type === 'role' && x.key === roleOf(e.id))
    );
  if (!o) return b;
  const n = x => (x === '' || x == null || isNaN(+x) ? null : +x);
  return Object.assign({}, b, {
    mode: o.mode || b.mode,
    rate: {
      weekday: n(o.weekday) ?? b.rate.weekday,
      holiday: n(o.holiday) ?? b.rate.holiday,
      off: n(o.off) ?? b.rate.off
    },
    scopeNote:
      (o.type === 'dept' ? 'Department: ' : 'Role: ') +
      (o.type === 'dept' ? o.key : roleName(o.key))
  });
}
/* work on a holiday or weekly off: sample punches, so the sections have something to show */
function offWorkOf(o) {
  if (o.dt > TODAY || o.dt.getTime() === TODAY.getTime()) return null;
  if (o.e.join && o.dt < isoD(o.e.join)) return null;
  const h = hsh(o.empId, o.y, o.m, o.d);
  if (o.st === 'H' ? h % 3 !== 0 : h % 5 !== 0) return null;
  const inn = o.start + (h % 40);
  return { in: inn, out: inn + 240 + ((h >> 3) % 270) };
}
const otRound = (raw, P, cap) => {
  if (raw < P.minMin) return 0;
  let v = Math.floor(raw / P.round) * P.round;
  if (cap) v = Math.min(v, cap);
  return v;
};
function srcOf(o) {
  if (o.dt.getTime() === TODAY.getTime() && o.empId === me().id && S.clock.in)
    return { bio: 'Biometric', app: 'App', web: 'Web' }[extSource(S.clock.mode)];
  return /biometric/.test(o.mode)
    ? 'Biometric'
    : o.mode === 'Work from home'
      ? 'Web'
      : hsh(o.empId, o.y, o.m, o.d) % 3 === 0
        ? 'Web'
        : 'App';
}

/* ---------- one day ---------- */
function hrsDay(empId, dt) {
  const o = dayInfo(empId, dt.getFullYear(), dt.getMonth(), dt.getDate()),
    P = otPolFor(o.e);
  const r = {
    o,
    empId,
    dt,
    iso: o.iso,
    tag: '',
    label: '',
    in: null,
    out: null,
    gross: 0,
    brk: 0,
    worked: 0,
    exp: o.end - o.start - P.breakMin,
    otRaw: 0,
    ot: 0,
    cat: '',
    src: '',
    live: false,
    miss: false,
    off: false
  };
  if (o.st === 'N') return Object.assign(r, { tag: 'none', label: 'Not joined', exp: 0 });
  if (o.st === 'H' || o.st === 'W') {
    Object.assign(r, {
      off: true,
      exp: 0,
      tag: o.st === 'H' ? 'holiday' : 'weekoff',
      label: o.hol || DOWN[dt.getDay()] + ' (weekly off)'
    });
    const w = o.offWork;
    if (w) {
      Object.assign(r, {
        in: w.in,
        out: w.out,
        gross: w.out - w.in,
        worked: w.out - w.in,
        src: srcOf(o),
        cat: o.st === 'H' ? 'holiday' : 'off',
        tag: o.st === 'H' ? 'holwork' : 'offwork'
      });
      r.otRaw = r.worked;
      r.ot = otRound(r.worked, P, 0);
    }
    return r;
  }
  if (o.st === 'L')
    return Object.assign(r, {
      tag: 'leave',
      label: (POLICY[o.leave.type] || { n: 'Leave' }).n,
      exp: 0
    });
  if (o.st === 'A') return Object.assign(r, { tag: 'absent', label: 'No punch recorded' });
  if (o.st === 'T' || (o.st === '' && dt > TODAY))
    return Object.assign(r, {
      tag: dt > TODAY ? 'future' : 'notin',
      label: dt > TODAY ? '' : 'Not clocked in yet'
    });
  r.tag = 'work';
  r.in = o.in;
  r.src = srcOf(o);
  if (o.live) {
    const n = new Date(),
      nm = n.getHours() * 60 + n.getMinutes();
    r.live = true;
    r.out = Math.max(o.in, nm);
  } else if (o.out == null) {
    r.miss = true;
    r.label = 'Punch-out missing';
    return r;
  } else r.out = o.out;
  if (r.out < r.in) r.out += 1440;
  r.gross = r.out - r.in;
  r.brk = o.st === 'D' || r.gross < 240 ? 0 : Math.min(P.breakMin, r.gross);
  r.worked = r.gross - r.brk;
  if (o.st === 'D') r.exp = Math.round(r.exp / 2);
  r.otRaw = Math.max(0, r.out - o.end);
  r.ot = otRound(r.otRaw, P, P.dailyCap * 60);
  if (r.ot) r.cat = 'weekday';
  return r;
}

/* ---------- entries: one per day with recorded extra time ---------- */
function otEntries(empId, days) {
  const e = emp(empId),
    P = otPolFor(e),
    out = [],
    wk = {};
  for (let i = days || 160; i >= 0; i--) {
    const dt = addD(TODAY, -i),
      r = hrsDay(empId, dt);
    if (!r.cat || r.live || r.out == null || !r.ot) continue;
    let m = r.ot,
      capped = false;
    if (r.cat === 'weekday') {
      const k = iso(wkStart(dt)),
        room = Math.max(0, P.weeklyCap * 60 - (wk[k] || 0));
      if (m > room) {
        m = Math.floor(room / P.round) * P.round;
        capped = true;
      }
      wk[k] = (wk[k] || 0) + m;
      if (!m) continue;
    }
    const key = empId + '|' + r.iso,
      x = S.ot.entries[key] || {},
      ex = addD(dt, P.comp.expiry);
    out.push({
      key,
      emp: empId,
      iso: r.iso,
      dt,
      cat: r.cat,
      min: m,
      rate: P.rate[r.cat],
      label: r.label,
      src: r.src,
      in: r.in,
      out: r.out,
      worked: r.worked,
      capped,
      st: x.st || (P.approve[r.cat] ? 'auto' : 'approved'),
      use: x.use || '',
      useSt: x.useSt || '',
      req: x.req || '',
      ureq: x.ureq || '',
      expiry: iso(ex),
      P
    });
  }
  return out;
}
function entStatus(en) {
  if (en.st !== 'approved') return en.st;
  if (en.use) return en.useSt === 'done' ? (en.use === 'comp' ? 'comp' : 'paid') : 'inreq';
  return en.expiry < iso(TODAY) ? 'expired' : 'available';
}
const entApproval = en => (en.st === 'approved' ? ['Approved', 'ok'] : OT_ST[en.st]);
const entMark = (key, patch) => {
  S.ot.entries[key] = Object.assign(S.ot.entries[key] || {}, patch);
};
/* money and payroll month, always shown beside the hours */
function otPay(en) {
  const e = emp(en.emp),
    P = en.P;
  return (slip(e.ctc).basic / P.payDays / P.payHours) * (en.min / 60) * en.rate;
}
const pastCutoff = P => TODAY.getDate() > (P || S.otp).cutoff;
function payMonth(isoDate, P) {
  P = P || S.otp;
  const d = isoD(isoDate),
    mk = (y, m) => new Date(y, m, 1),
    b =
      d.getDate() > P.cutoff
        ? mk(d.getFullYear(), d.getMonth() + 1)
        : mk(d.getFullYear(), d.getMonth()),
    t =
      TODAY.getDate() > P.cutoff
        ? mk(TODAY.getFullYear(), TODAY.getMonth() + 1)
        : mk(TODAY.getFullYear(), TODAY.getMonth()),
    x = b > t ? b : t;
  return { date: x, label: monLbl(x) };
}
/* hours to comp-off days: 4h is a half day, 8h a full day. Anything under 4h is left over. */
function compDays(min, P) {
  const f = P.comp.full * 60,
    h = P.comp.half * 60,
    full = Math.floor(min / f),
    rest = min - full * f,
    half = rest >= h ? 1 : 0;
  return { days: full + half * 0.5, left: rest - (half ? h : 0) };
}

/* ---------- periods and totals ---------- */
function hrsPeriod(per, off) {
  let a, b;
  if (per === 'today') a = b = TODAY;
  else if (per === 'week') {
    a = addD(wkStart(TODAY), off * 7);
    b = addD(a, 6);
  } else {
    a = new Date(TODAY.getFullYear(), TODAY.getMonth() + off, 1);
    b = new Date(a.getFullYear(), a.getMonth() + 1, 0);
  }
  const days = [];
  for (let d = a; d <= b; d = addD(d, 1)) days.push(d);
  return {
    a,
    b,
    days,
    label:
      per === 'today'
        ? 'Today, ' + fdd(TODAY)
        : per === 'week'
          ? (off === 0 ? 'This week' : off === -1 ? 'Last week' : 'Week of ' + fdd(a)) +
            ', ' +
            fdd(a) +
            ' to ' +
            fdd(b)
          : off === 0
            ? 'This month, ' + monLbl(a)
            : monLbl(a)
  };
}
function hrsSummary(empId, days, ents) {
  const map = {};
  ents.forEach(x => (map[x.iso] = x));
  const s = {
    worked: 0,
    exp: 0,
    otWk: 0,
    otOff: 0,
    offMin: 0,
    short: 0,
    absent: 0,
    rows: [],
    live: null
  };
  days.forEach(dt => {
    const r = hrsDay(empId, dt),
      en = map[r.iso];
    r.en = en || null;
    s.rows.push(r);
    if (dt > TODAY) return;
    if (r.off) {
      if (r.cat) {
        s.otOff += en ? en.min : r.ot;
        s.offMin += r.worked;
      }
      return;
    }
    if (r.tag === 'work') {
      s.worked += r.worked;
      s.exp += r.live ? Math.min(r.exp, r.worked) : r.exp;
      s.otWk += en ? en.min : r.live ? r.ot : 0;
      if (!r.live && r.worked - r.exp <= -15) s.short++;
      if (r.live) s.live = r;
    } else if (r.tag === 'absent') {
      s.exp += r.exp;
      s.absent++;
    } else if (r.miss) s.exp += r.exp;
  });
  s.diff = s.worked - s.exp;
  s.ot = s.otWk + s.otOff;
  return s;
}
/* the balance cards, from one list of entries */
function otBalance(ents) {
  const t = iso(TODAY),
    soon = iso(addD(TODAY, 14)),
    z = { avail: 0, pend: 0, used: 0, soon: 0, auto: 0, soonList: [] };
  ents.forEach(en => {
    const st = entStatus(en);
    if (st === 'available') {
      z.avail += en.min;
      if (en.expiry <= soon) {
        z.soon += en.min;
        z.soonList.push(en);
      }
    } else if (st === 'pending' || st === 'inreq') z.pend += en.min;
    else if (st === 'comp' || st === 'paid') z.used += en.min;
    else if (st === 'auto') z.auto += en.min;
  });
  z.soonList.sort((a, b) => (a.expiry < b.expiry ? -1 : 1));
  return z;
}

/* ---------- requests ---------- */
function mkReq(type, empId, keys, o) {
  const id = type + '-' + String(++S.ot.n[type]).padStart(4, '0'),
    e = emp(empId),
    ents = o && o.min != null ? [] : otEntries(empId).filter(x => keys.includes(x.key)),
    cats = [...new Set(ents.map(x => x.cat))];
  const r = Object.assign(
    {
      id,
      type,
      emp: empId,
      keys,
      min: ents.reduce((a, x) => a + x.min, 0),
      cat: cats.length === 1 ? cats[0] : cats.length ? 'mixed' : '',
      reason: '',
      status: 'Pending',
      at: new Date().toISOString(),
      by: e.mgr || 'E-1001',
      decAt: '',
      comment: '',
      dates: [],
      days: 0,
      amount: 0,
      month: ''
    },
    o
  );
  S.ot.reqs.unshift(r);
  return r;
}
const otReq = id => S.ot.reqs.find(r => r.id === id);
function otNotify(empId, t, s) {
  S.notifs.unshift({ t, s, time: 'Just now', u: 1, emp: empId, p: 'hours' });
}
function otDecide(id, ok, comment) {
  const r = otReq(id);
  if (!r || r.status !== 'Pending') return false;
  r.status = ok ? 'Approved' : 'Rejected';
  r.decAt = new Date().toISOString();
  r.comment = comment || '';
  r.by = me().id;
  const h = fhm(r.min);
  r.keys.forEach(k => {
    if (r.type === 'OT') entMark(k, { st: ok ? 'approved' : 'rejected' });
    else if (ok) entMark(k, { useSt: 'done' });
    else entMark(k, { use: '', useSt: '', ureq: '' });
  });
  if (r.type === 'OT')
    otNotify(
      r.emp,
      ok ? 'Overtime approved' : 'Overtime request rejected',
      `${h} · ${r.id}${ok ? ' · ready to use as comp-off or pay' : comment ? ' · ' + comment : ''}`
    );
  else if (r.type === 'CO')
    otNotify(
      r.emp,
      ok ? 'Comp-off approved' : 'Comp-off request rejected',
      `${fdy(r.days)} · ${r.id}${ok ? ' · credited' : ''}`
    );
  else
    otNotify(
      r.emp,
      ok ? 'Extra pay approved' : 'Extra pay request rejected',
      `${h} · ${r.id}${ok ? ' · ' + r.month + ' payroll' : ''}`
    );
  return true;
}
function otCancel(id) {
  const r = otReq(id);
  if (!r || r.status !== 'Pending') return false;
  r.status = 'Cancelled';
  r.decAt = new Date().toISOString();
  r.keys.forEach(k =>
    r.type === 'OT'
      ? entMark(k, { st: 'auto', req: '' })
      : entMark(k, { use: '', useSt: '', ureq: '' })
  );
  return true;
}

/* ---------- sample history, built once from the same punches ---------- */
function otInit() {
  if (S.ot.seeded) return;
  S.ot.seeded = 1;
  const me0 = 'E-1003',
    daysAgo2 = d => Math.round((TODAY - d) / 864e5);
  live()
    .slice(0, 16)
    .forEach(e => {
      otEntries(e.id).forEach(en => {
        if (en.st !== 'auto') return;
        const age = daysAgo2(en.dt),
          h = hsh(e.id, en.dt.getFullYear(), en.dt.getMonth(), en.dt.getDate()),
          r = h % 10;
        if (age <= 2) return;
        let st = 'approved',
          use = '',
          useSt = '';
        if (age <= 14) {
          if (r < 3) return;
          st = r < 6 ? 'pending' : r === 6 ? 'rejected' : 'approved';
        }
        if (st === 'approved' && age > 14) {
          if (r < 2) use = 'comp';
          else if (r < 4) use = 'pay';
          else if (r === 4 && age <= 45) use = 'comp';
          if (use) useSt = r === 4 ? 'pending' : 'done';
        }
        const x = { st, use, useSt };
        if (age <= 45) {
          const q = mkReq('OT', e.id, [en.key], {
            min: en.min,
            cat: en.cat,
            status: st === 'pending' ? 'Pending' : st === 'rejected' ? 'Rejected' : 'Approved',
            at: iso(addD(en.dt, 1)) + 'T10:00:00',
            decAt: st === 'pending' ? '' : iso(addD(en.dt, 2)) + 'T11:30:00',
            comment: st === 'rejected' ? 'Please add the task reference and send it again' : '',
            reason: 'Work completed after shift',
            by: e.mgr || 'E-1001'
          });
          x.req = q.id;
          if (use) {
            const P = en.P,
              c = use === 'comp' ? compDays(en.min, P) : null,
              u = mkReq(use === 'comp' ? 'CO' : 'PY', e.id, [en.key], {
                min: en.min,
                cat: en.cat,
                status: useSt === 'pending' ? 'Pending' : 'Approved',
                at: iso(addD(en.dt, 4)) + 'T09:00:00',
                decAt: useSt === 'pending' ? '' : iso(addD(en.dt, 5)) + 'T12:00:00',
                days: c ? c.days : 0,
                dates: c && c.days ? [iso(addD(en.dt, 12))] : [],
                amount: use === 'pay' ? Math.round(otPay(en)) : 0,
                month: use === 'pay' ? payMonth(iso(en.dt), P).label : '',
                by: e.mgr || 'E-1001'
              });
            x.ureq = u.id;
          }
        }
        entMark(en.key, x);
      });
    });
  /* a few notifications for the sample employee, from their own entries */
  const ents = otEntries(me0),
    ok = ents.filter(x => x.st === 'approved' && !x.use).slice(-1)[0],
    soon = otBalance(ents).soonList[0],
    rej = S.ot.reqs.find(q => q.emp === me0 && q.status === 'Rejected');
  if (rej)
    otNotify(me0, 'Overtime request rejected', `${fhm(rej.min)} · ${rej.id} · ${rej.comment}`);
  if (soon)
    otNotify(
      me0,
      'Comp-off about to expire',
      `${fhm(soon.min)} earned ${fdd(soon.dt)} expires ${fdd(isoD(soon.expiry))}`
    );
  if (ok)
    otNotify(
      me0,
      'Overtime approved',
      `${fhm(ok.min)} on ${fdd(ok.dt)} · ready to use as comp-off or pay`
    );
  S.notifs.slice(0, 3).forEach(n => (n.time = 'Earlier'));
}
