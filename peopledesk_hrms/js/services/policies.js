/* ---------- policies: versioned, effective-dated, and read by the calculations ---------- */
const POL_DEF = {
  work: {
    week: { Office: 5, Plant: 6 },
    hours: 9,
    grace: 15,
    ot: '2x',
    fy: 'April',
    probation: 6,
    noticeEL: 3,
    certDays: 2,
    carryEL: 30,
    varPct: 10
  },
  stat: {
    pf: { on: 1, rate: 12, ceil: 15000 },
    esi: { on: 1, emp: 0.75, er: 3.25, ceil: 21000 },
    pt: { on: 1, amt: 200 },
    tds: { on: 1, thresh: 700000, rate: 8 },
    gratuity: 5,
    bonus: 1
  }
};
S.polHist = {};
Object.keys(POL_DEF).forEach(
  k =>
    (S.polHist[k] = [
      {
        eff: '2000-01-01',
        val: JSON.parse(JSON.stringify(POL_DEF[k])),
        by: 'System defaults',
        at: ''
      }
    ])
);
function getPol(k) {
  const h = S.polHist[k],
    t = iso(TODAY),
    ok = h.filter(x => x.eff <= t).sort((a, b) => (a.eff < b.eff ? -1 : a.eff > b.eff ? 1 : 0));
  return (ok.length ? ok[ok.length - 1] : h[0]).val;
}
const W = () => getPol('work'),
  ST = () => getPol('stat');
function polSave(k, val, eff, why) {
  const h = S.polHist[k],
    prev = JSON.stringify(getPol(k)),
    u = me();
  h.push({ eff: eff || iso(TODAY), val, by: u.name, at: new Date().toISOString(), why: why || '' });
  audit('Policy changed', k === 'work' ? 'Work policies' : 'Statutory settings', {
    res: 'settings',
    from: 'previous version',
    to: 'effective ' + fdate(eff || iso(TODAY)),
    reason: why || ''
  });
  return saveGov();
}
const slip = ctc => slipWith(ctc, ST());
function slipWith(ctc, t) {
  const m = ctc / 12,
    basic = m * 0.4,
    hra = basic * 0.5,
    special = m - basic - hra,
    pf = t.pf.on ? (Math.min(basic, t.pf.ceil) * t.pf.rate) / 100 : 0,
    esi = t.esi.on && m <= t.esi.ceil ? (m * t.esi.emp) / 100 : 0,
    pt = t.pt.on ? t.pt.amt : 0,
    tds = t.tds.on ? (Math.max(0, ctc - t.tds.thresh) * t.tds.rate) / 100 / 12 : 0,
    ded = pf + esi + pt + tds;
  return { m, basic, hra, special, pf, esi, pt, tds, ded, net: m - ded };
}
