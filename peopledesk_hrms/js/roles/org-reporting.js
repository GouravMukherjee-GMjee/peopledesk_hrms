/* ---------- organization: reporting lines come from data, not from department names ---------- */
const ORG_SEED = {
  'E-1002': 'E-1001',
  'E-1004': 'E-1002',
  'E-1011': 'E-1002',
  'E-1012': 'E-1002',
  'E-1006': 'E-1002',
  'E-1013': 'E-1006',
  'E-1005': 'E-1002',
  'E-1015': 'E-1002',
  'E-1007': 'E-1001',
  'E-1003': 'E-1014',
  'E-1014': 'E-1001',
  'E-1008': 'E-1001',
  'E-1016': 'E-1008',
  'E-1009': 'E-1001',
  'E-1010': 'E-1001'
};
const mgrOf = e => (e && e.mgr ? emp(e.mgr) : null);
const directs = id => live().filter(e => e.mgr === id);
function lineOf(id) {
  const out = [],
    seen = new Set([id]),
    q = [id];
  while (q.length) {
    const x = q.shift();
    directs(x).forEach(d => {
      if (!seen.has(d.id)) {
        seen.add(d.id);
        out.push(d);
        q.push(d.id);
      }
    });
  }
  return out;
}
const reportsTo = e => {
  const m = mgrOf(e);
  return m ? m.name : 'Board of Directors';
};
const orgCheck = (id, mgr) =>
  id === mgr
    ? 'A person cannot report to themselves'
    : mgr && lineOf(id).some(x => x.id === mgr)
      ? 'That would create a reporting loop'
      : '';
