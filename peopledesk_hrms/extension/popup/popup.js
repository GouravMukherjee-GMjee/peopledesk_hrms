/* Popup: asks the service worker for today's attendance and draws it with the shared PDExt code.
   The countdown moves by the minute, never by the second. */
const app = document.getElementById('app');
let hrms = '';
const draw = (snap, first) => {
  app.innerHTML = PDExt.popupHTML(PDExt.model(snap, new Date()));
  if (first) {
    const b = app.querySelector('.xw-btn');
    if (b) b.focus();
  }
};
async function load(first) {
  const r = await chrome.runtime.sendMessage({ type: 'get' }).catch(() => null);
  if (!r) return draw({ enabled: true, error: 1 }, first);
  hrms = r.hrms || '';
  draw(r.snap, first);
}
const open = hash => hrms && chrome.tabs.create({ url: hrms + (hash || '') });
app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'open') return open();
  if (a === 'prefs') return open('#/profile');
  if (a === 'hide' || a === 'unhide' || a === 'retry') {
    if (a === 'retry') draw(undefined);
    await chrome.runtime.sendMessage({ type: a }).catch(() => null);
    load(true);
  }
});
draw(undefined);
load(true);
/* redraw on the next whole minute, then every minute while the popup is open */
setTimeout(
  () => {
    load();
    setInterval(load, 60000);
  },
  60000 - (Date.now() % 60000)
);
