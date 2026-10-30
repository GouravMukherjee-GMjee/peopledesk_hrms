/* Runs on PeopleDesk pages only (see "matches" in manifest.json). It is a thin relay between the page and the
   extension: it forwards four message types and nothing else. It never reads the page, the DOM, cookies or
   any other site. */
(function () {
  const FROM_PAGE = 'peopledesk-hrms',
    TO_PAGE = 'peopledesk-ext',
    TYPES = ['ping', 'connect', 'snapshot', 'signout'];
  const toPage = r => {
    if (r && typeof r.type === 'string')
      window.postMessage(Object.assign({}, r, { source: TO_PAGE }), location.origin);
  };
  const send = (type, payload) =>
    chrome.runtime.sendMessage({ type, payload }).then(toPage, () => {
      /* the extension was reloaded: this page needs a refresh, nothing to do here */
    });
  window.addEventListener('message', ev => {
    const d = ev.data;
    if (ev.source !== window || ev.origin !== location.origin) return;
    if (!d || d.source !== FROM_PAGE || !TYPES.includes(d.type)) return;
    send(d.type, d.payload);
  });
  send('ping');
})();
