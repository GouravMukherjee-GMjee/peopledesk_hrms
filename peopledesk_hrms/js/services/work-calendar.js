/* ---------- one work calendar for leave, attendance and payroll ---------- */
const weekDays = e => (e.week ? +e.week : W().week[e.type] || 5);
function dayKind(e, dt) {
  const h = HOLIDAYS.find(x => x.m === dt.getMonth() && x.d === dt.getDate());
  if (h) return { work: false, why: 'Holiday', name: h.n };
  const w = dt.getDay();
  if (w === 0) return { work: false, why: 'Weekly off', name: 'Sunday' };
  if (w === 6 && weekDays(e) === 5) return { work: false, why: 'Weekly off', name: 'Saturday' };
  return { work: true };
}
function leaveCalc(e, from, to, half) {
  const o = { days: [], excluded: [], total: 0, chargeable: 0 };
  for (
    let x = new Date(from + 'T00:00:00');
    x <= new Date(to + 'T00:00:00');
    x.setDate(x.getDate() + 1)
  ) {
    o.total++;
    const k = dayKind(e, x);
    if (k.work) {
      o.days.push(iso(x));
      o.chargeable++;
    } else o.excluded.push({ date: iso(x), why: k.why, name: k.name });
  }
  if (half && from === to && o.chargeable === 1) o.chargeable = 0.5;
  return o;
}
const workDays = (f, t, e) => leaveCalc(e || me(), f, t).chargeable;
const worksDay = (e, dt) => dayKind(e, dt).work;
const calLabel = e =>
  `${weekDays(e) === 6 ? 'Mon to Sat' : 'Mon to Fri'} week · ${weekDays(e)} working days`;
const fdays = n => (n === 1 ? '1 day' : n + ' days');
function dayFlags(o, waive) {
  const g = W().grace;
  if (o.in != null && o.in - o.start > g && !waive) o.late = o.in - o.start;
  if (o.out != null && o.st !== 'D') {
    if (o.out < o.end - 15) o.early = o.end - o.out;
    if (o.out > o.end + 30) o.ot = o.out - o.end;
  }
}
