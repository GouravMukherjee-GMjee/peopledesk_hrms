/* =============== saved data, confirm dialog =============== */
function persist() {
  if (S.noPersist) return;
  clearTimeout(persist.t);
  persist.t = setTimeout(() => {
    try {
      localStorage.setItem(
        'pd-data-v2',
        JSON.stringify({
          employees,
          leaves: S.leaves,
          claims: S.claims,
          tickets: S.tickets,
          regs: S.regs,
          dayOv: S.dayOv,
          incidents: S.incidents,
          cands: S.cands,
          goals: S.goals,
          roster: S.roster,
          notifs: S.notifs,
          mine: S.mine,
          courses: S.courses,
          payStep: S.payStep,
          reviews: S.reviews,
          assets: S.assets
        })
      );
    } catch (e) {}
  }, 300);
}
function loadData() {
  try {
    const d = JSON.parse(localStorage.getItem('pd-data-v2') || 'null');
    if (!d) return;
    if (Array.isArray(d.employees) && d.employees.length) employees = d.employees;
    {
      const rv = employees.find(e => e.id === 'E-1003');
      if (rv && rv.ctc === 720000) rv.ctc = 1408920;
    }
    employees.forEach(e => {
      const f = JOIN_FIX[e.id];
      if (f && e.join === f[0]) e.join = f[1];
    }); // sample joining dates updated
    employees.forEach(e => {
      if (e.email) e.email = e.email.replace('@acmeworks.in', '@gmux.in'); // company renamed to GMux
    });
    if (Array.isArray(d.assets) && d.assets.length) {
      S.assets = d.assets; // sample pay updated: net pay is now 1,10,684
      S.assets.forEach(a => {
        if (a.make === 'AcmeWorks') a.make = 'GMux';
        if (a.tag && a.tag.startsWith('AW-')) a.tag = 'GM-' + a.tag.slice(3);
      });
    }
    [
      'leaves',
      'claims',
      'tickets',
      'regs',
      'incidents',
      'cands',
      'goals',
      'notifs',
      'courses'
    ].forEach(k => {
      if (Array.isArray(d[k])) S[k] = d[k];
    });
    ['dayOv', 'roster', 'mine', 'reviews'].forEach(k => {
      if (d[k] && typeof d[k] === 'object') S[k] = d[k];
    });
    if (typeof d.payStep === 'number') S.payStep = d.payStep;
  } catch (e) {}
}
function confirmBox(title, msg, okLabel, fn, danger) {
  window._cf = fn;
  overlay(
    title,
    `<p>${msg}</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn ${danger ? 'bad' : 'primary'}" onclick="closeModal();window._cf&&window._cf()">${esc(okLabel)}</button>`
  );
}
loadData();
