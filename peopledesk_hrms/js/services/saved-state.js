/* ---------- saved state: everything the Settings screens change survives a refresh ---------- */
const GOVK = 'pd-gov-v1';
const govState = () => ({
  perms: S.perms,
  polHist: S.polHist,
  audit: S.audit,
  auditN: S.auditN,
  orgHist: S.orgHist,
  deleg: S.deleg,
  sec: S.sec,
  roles: S.roles,
  prefs: S.prefs,
  widgets: S.widgets,
  views: S.views,
  drafts: S.drafts,
  pay: S.pay,
  life: S.life,
  ext: S.ext,
  extUser: S.extUser,
  ot: S.ot,
  otp: S.otp
});
function saveGov() {
  if (S.noPersist) return true;
  try {
    localStorage.setItem(GOVK, JSON.stringify(govState()));
    return true;
  } catch (e) {
    return false;
  }
}
function loadGov() {
  try {
    const d = JSON.parse(localStorage.getItem(GOVK) || 'null');
    if (!d) return;
    if (d.perms && d.perms.m && d.perms.v === 3) {
      const def = defaultPerms();
      Object.keys(def.m).forEach(k => {
        if (d.perms.m[k])
          ROLE_KEYS.forEach(r => {
            if (d.perms.m[k][r]) Object.assign(def.m[k][r], d.perms.m[k][r]);
          });
      });
      Object.keys(def.sens).forEach(r => Object.assign(def.sens[r], (d.perms.sens || {})[r] || {}));
      def.meta = d.perms.meta || def.meta;
      S.perms = def;
    }
    if (d.polHist)
      Object.keys(S.polHist).forEach(k => {
        if (Array.isArray(d.polHist[k]) && d.polHist[k].length) S.polHist[k] = d.polHist[k];
      });
    ['audit', 'orgHist', 'deleg', 'views'].forEach(k => {
      if (Array.isArray(d[k])) S[k] = d[k];
    });
    if (typeof d.auditN === 'number') S.auditN = d.auditN;
    ['widgets', 'drafts', 'prefs', 'sec', 'pay', 'life', 'roles', 'extUser', 'ot', 'otp'].forEach(k => {
      if (d[k] && typeof d[k] === 'object') S[k] = Object.assign(S[k] || {}, d[k]);
    });
    S.life = Object.assign({ onb: {}, off: {}, exits: [] }, S.life);
    if (d.ext && d.ext.roles) {
      const def = extDefaults();
      Object.keys(def.roles).forEach(r => {
        const o = (d.ext.roles || {})[r] || {};
        Object.assign(def.roles[r], { avail: o.avail || def.roles[r].avail });
        Object.assign(def.roles[r].fields, o.fields);
        Object.assign(def.roles[r].reminders, o.reminders);
      });
      def.master = d.ext.master === 0 ? 0 : 1;
      def.meta = d.ext.meta || def.meta;
      S.ext = def;
    }
  } catch (e) {}
}
{
  const _p = persist;
  persist = function () {
    _p();
    saveGov();
  };
}
function seedGov() {
  employees.forEach(e => {
    if (e.mgr === undefined) e.mgr = ORG_SEED[e.id] || null;
  });
  S.leaves.forEach(l => {
    if (l.calc) return;
    const e = emp(l.emp);
    if (e) {
      l.days = leaveCalc(e, l.from, l.to, l.half).chargeable;
      l.calc = 1;
    }
  });
}
