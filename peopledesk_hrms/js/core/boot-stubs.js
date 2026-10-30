/* =============== settings =============== */
function forcePwReset() {
  confirmBox(
    'Require a password reset?',
    'Everyone, including you, will be asked to set a new password the next time they sign in.',
    'Require reset',
    () => {
      S.mustChange.admin = S.mustChange.manager = S.mustChange.employee = true;
      toast('A password reset is required at next sign-in');
    }
  );
}
function signOutOthers() {
  confirmBox(
    'Sign out other devices?',
    'Your phone and any other browsers will be signed out. This device stays signed in.',
    'Sign out devices',
    () => toast('Other devices have been signed out'),
    true
  );
}
function resetDemo() {
  confirmBox(
    'Reset demo data?',
    'This clears everything you added or changed in this browser and restores the sample data.',
    'Reset data',
    () => {
      S.noPersist = true;
      try {
        localStorage.removeItem('pd-data-v2');
        localStorage.removeItem(GOVK);
      } catch (e) {}
      location.reload();
    },
    true
  );
}
/* =============== boot =============== */
$('#ic-search').innerHTML = ic('search', 18);
$('#ic-bell').innerHTML = ic('bell', 18);
$('#cmd').onclick = openCmd;
$('#bell').onclick = openNotifs;
$('#avbtn').onclick = account;
$('#theme').onclick = () => {
  setTheme(isDark() ? 'light' : 'dark');
  render();
};
$('#role').onchange = e => switchRole(e.target.value);
$('#rolechip').onclick = () => roleSheet();
$('#collapse').onclick = () => {
  S.collapsed = !S.collapsed;
  try {
    localStorage.setItem('pd-col', S.collapsed ? '1' : '');
  } catch (e) {}
  render();
};
try {
  const t = localStorage.getItem('pd-theme');
  if (t) document.documentElement.dataset.theme = t;
  S.collapsed = !!localStorage.getItem('pd-col');
} catch (e) {}
