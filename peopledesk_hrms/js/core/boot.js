/* =============== boot (runs last) =============== */
try {
  S.remember = localStorage.getItem('pd-remember') !== '0';
} catch (e) {}
initEnhance();
renderLogin();
/* micro-feedback when the day starts or ends */
{
  const _t = toggleClock;
  toggleClock = function () {
    _t.apply(this, arguments);
    ping(document.getElementById('timer'));
  };
}
{
  const _rl = renderList;
  renderList = function () {
    _rl();
    fitTables();
  };
}
{
  const _r2 = render;
  render = function () {
    _r2();
    syncSel();
  };
}
