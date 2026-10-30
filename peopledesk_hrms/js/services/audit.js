/* ---------- audit log ---------- */
function audit(act, rec, o = {}) {
  const u = me(),
    p = persona();
  S.auditN++;
  S.audit.unshift({
    id: 'AUD-' + String(S.auditN).padStart(4, '0'),
    at: new Date().toISOString(),
    by: u.name,
    byId: u.id,
    as: p.n,
    act,
    rec: rec || '',
    res: o.res || '',
    cat:
      o.cat ||
      (/^(Permission|Scope|Sensitive|Security|User|Role|Session|Integration|Access|Export)/.test(
        act
      )
        ? 'system'
        : ''),
    from: o.from == null ? '' : String(o.from),
    to: o.to == null ? '' : String(o.to),
    reason: o.reason || ''
  });
  if (S.audit.length > 400) S.audit.length = 400;
  saveGov();
}
const ftime = s => {
  const d = new Date(s);
  return (
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
    ', ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
};
