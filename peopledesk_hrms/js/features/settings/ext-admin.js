/* =====================================================================
   Settings · Browser extension: the admin policy per role, with a live preview of what people will see
   Changes are held as a draft until Save. The preview always shows the draft.
   ===================================================================== */
const extCore = e => ({ master: e.master, roles: e.roles });
const extDraft = () => S.extDraft || (S.extDraft = JSON.parse(JSON.stringify(extCore(S.ext))));
const extDirty = () =>
  !!S.extDraft && JSON.stringify(extCore(S.extDraft)) !== JSON.stringify(extCore(S.ext));
const extAvailName = a => (PDExt.AVAIL.find(x => x[0] === a) || [])[1] || a;

function extAdminRepaint() {
  const box = document.getElementById('xa'),
    a = document.activeElement,
    fid = a && a.dataset ? a.dataset.fid : '';
  if (!box) return render();
  box.innerHTML = extAdminInner();
  if (fid) {
    const n = box.querySelector(`[data-fid="${fid}"]`);
    if (n) n.focus();
  }
}
function extAdMaster(on) {
  extDraft().master = on ? 1 : 0;
  extAdminRepaint();
}
function extAdAvail(role, v) {
  extDraft().roles[role].avail = v;
  extAdminRepaint();
}
function extAdField(role, k, on) {
  extDraft().roles[role].fields[k] = on ? 1 : 0;
  extAdminRepaint();
}
function extAdRem(role, k, on) {
  extDraft().roles[role].reminders[k] = on ? 1 : 0;
  extAdminRepaint();
}
function extAdPrev(k) {
  S.extPrev = k;
  extAdminRepaint();
}
function extAdCancel() {
  S.extDraft = null;
  extAdminRepaint();
  toast('Changes discarded');
}
/* a readable list of what changed, for the audit log and the confirmation */
function extChanges(a, b) {
  const out = [];
  if (a.master !== b.master)
    out.push(['Organisation switch', a.master ? 'On' : 'Off', b.master ? 'On' : 'Off']);
  ROLE_DEF.forEach(r => {
    const x = a.roles[r.k],
      y = b.roles[r.k];
    if (x.avail !== y.avail)
      out.push([r.n + ' availability', extAvailName(x.avail), extAvailName(y.avail)]);
    PDExt.FIELDS.forEach(([k, n]) => {
      if (!!x.fields[k] !== !!y.fields[k])
        out.push([
          `${r.n} · ${n}`,
          x.fields[k] ? 'Visible' : 'Hidden',
          y.fields[k] ? 'Visible' : 'Hidden'
        ]);
    });
    PDExt.REMINDERS.forEach(([k, n]) => {
      if (!!x.reminders[k] !== !!y.reminders[k])
        out.push([
          `${r.n} · reminder: ${n}`,
          x.reminders[k] ? 'Allowed' : 'Not allowed',
          y.reminders[k] ? 'Allowed' : 'Not allowed'
        ]);
    });
  });
  return out;
}
function extAdSave() {
  if (!need('policy', 'edit', 'change the browser extension settings')) return;
  if (!extDirty()) return;
  const ch = extChanges(S.ext, S.extDraft);
  S.ext = Object.assign(JSON.parse(JSON.stringify(S.extDraft)), {
    meta: { by: me().name, at: new Date().toISOString() }
  });
  S.extDraft = null;
  audit('Policy changed', 'Browser extension widget', {
    res: 'settings',
    from: ch.map(c => `${c[0]}: ${c[1]}`).join('; '),
    to: ch.map(c => `${c[0]}: ${c[2]}`).join('; ')
  });
  commit();
  extPublish();
  render();
  toast(`Saved. ${ch.length} change${ch.length === 1 ? '' : 's'} applied`);
}

function extPreviewHTML(role, d) {
  const pol = d.roles[role],
    off = !d.master || pol.avail === 'off';
  let key = off ? 'disabled' : S.extPrev || 'working';
  if (key === 'disabled' && !off) key = 'working';
  const dm = PDExt.demo(key);
  if (dm.snap && dm.snap.fields) dm.snap.fields = Object.assign({}, pol.fields);
  const m = PDExt.model(dm.snap, dm.now),
    shows = PDExt.FIELDS.filter(f => pol.fields[f[0]]).map(f => f[1]),
    states = [
      ['working', 'Working'],
      ['low', 'Under 30 min'],
      ['complete', 'Shift complete'],
      ['offline', 'Offline'],
      ['notin', 'Not clocked in']
    ];
  const alt = off
    ? `Preview for ${roleName(role)}: the extension shows "Not enabled for your account".`
    : `Preview for ${roleName(role)}, state ${m.label}. Shows: ${shows.join(', ') || 'nothing but the status'}.`;
  return `<aside class="xa-prev" aria-label="Live preview">
    <div class="xa-ph"><h3>Live preview</h3><span class="muted small">What a ${esc(roleName(role))} will see</span></div>
    ${
      off
        ? `<p class="xa-pn">${ic('lock', 14)}${!d.master ? 'The organisation switch is off.' : 'This role is set to Disabled.'} The extension shows “Not enabled for your account”.</p>`
        : `<div class="xa-chips" role="group" aria-label="Preview state">${states.map(([k, n]) => `<button type="button" class="xa-pill" aria-pressed="${k === key}" onclick="extAdPrev('${k}')" data-fid="pv-${k}">${n}</button>`).join('')}</div>`
    }
    <div class="xa-tbar"><span class="xa-url">${ic('search', 12)}</span>${PDExt.toolbarHTML(m)}</div>
    <div class="xa-frame" role="img" aria-label="${esc(alt)}"><div inert>${PDExt.popupHTML(m)}</div></div>
    <p class="muted small xa-pf">Updates as you change settings. Reminders allowed: ${
      PDExt.REMINDERS.filter(r => pol.reminders[r[0]])
        .map(r => r[1].toLowerCase())
        .join(', ') || 'none'
    }.</p>
  </aside>`;
}

function extAdminInner() {
  const d = extDraft(),
    role = curTab('xr', 'employee'),
    pol = d.roles[role] || (d.roles[role] = extRolePol('off')),
    off = pol.avail === 'off',
    dirty = extDirty(),
    can_ = can('policy', 'edit'),
    dis = !can_ ? 'disabled' : '';
  const master = `<div class="xa-master ${d.master ? '' : 'is-off'}">
    <div class="grow"><h2 id="xa-mh">Browser extension widget for the whole organisation</h2>
    <p class="muted small">${d.master ? 'On. Each role below decides whether its people can use it.' : 'Off for everyone. People see “Not enabled for your account” and no reminders are sent, whatever the role settings say.'}</p></div>
    <span class="xa-state" aria-hidden="true">${d.master ? 'On' : 'Off'}</span>
    <label class="sw"><input type="checkbox" role="switch" ${d.master ? 'checked' : ''} ${dis} data-fid="master" aria-labelledby="xa-mh" onchange="extAdMaster(this.checked)"><span></span></label></div>`;
  const avail = `<fieldset class="xa-fs" ${dis}><legend>Availability for ${esc(roleName(role))}</legend>
    <div class="xa-radios" role="radiogroup" aria-label="Availability for ${esc(roleName(role))}">${PDExt.AVAIL.map(
      ([k, n, t]) =>
        `<label class="xa-rc ${pol.avail === k ? 'on' : ''}"><input type="radio" name="xa-av" value="${k}" ${pol.avail === k ? 'checked' : ''} data-fid="av-${k}" onchange="extAdAvail('${role}','${k}')"><span class="xa-rt"><b>${n}</b><span>${t}</span></span></label>`
    ).join('')}</div></fieldset>`;
  const checks = (title, sub, items, kind) =>
    `<fieldset class="xa-fs" ${off || !can_ ? 'disabled' : ''}><legend>${title}</legend><p class="muted small">${sub}</p><div class="xa-checks">${items
      .map(
        ([k, n, t]) =>
          `<label class="xa-ck"><input type="checkbox" ${(kind === 'f' ? pol.fields : pol.reminders)[k] ? 'checked' : ''} data-fid="${kind}-${k}" onchange="${kind === 'f' ? 'extAdField' : 'extAdRem'}('${role}','${k}',this.checked)"><span><b>${n}</b>${t ? `<span>${t}</span>` : ''}</span></label>`
      )
      .join('')}</div></fieldset>`;
  const note = `<div class="xa-priv">${ic('shield', 18)}<div><b>Attendance only, no browsing data.</b> The extension shows clock-in time, expected logout and time left. It cannot see tabs, history, pages or anything else in the browser, and it asks for no access to websites. Employees can always see exactly what it shows in the preview.</div></div>`;
  return `<div class="svh"><span class="muted small">Controls who can see their logout time in the browser. The extension never changes attendance.</span>${svBadge()}</div>
  ${master}
  ${tabs(
    'xr',
    ROLE_DEF.map(x => [x.k, x.n]),
    'employee'
  )}
  <div class="xa-grid">
    <div class="xa-form ${d.master ? '' : 'is-dim'}">
      <p class="muted small" style="margin:0 0 14px">Effective setting for a person: <b>this role allows it</b> and <b>they have opted in</b>. Turning it off here hides it from their preferences too.</p>
      ${avail}
      ${off ? `<p class="xa-pn">${ic('lock', 14)}Fields and reminders are paused while this role is Disabled. Your choices are kept.</p>` : ''}
      ${checks('What people can see', 'Employees can hide any of these for themselves, but cannot show more than you allow.', PDExt.FIELDS, 'f')}
      ${checks(
        'Reminders people can switch on',
        'Reminders are off until the person chooses them. Each shows once a day, as a browser notification.',
        PDExt.REMINDERS.map(r => [r[0], r[1], '']),
        'r'
      )}
      ${note}
    </div>
    ${extPreviewHTML(role, d)}
  </div>
  <div class="xa-bar" role="region" aria-label="Save changes"><span class="xa-bs" role="status" aria-live="polite">${dirty ? `${chip('Unsaved changes', 'warn', 1)}` : `<span class="muted small">${lastBy(S.ext.meta)}</span>`}</span><span class="grow"></span>
    <button class="btn" ${dirty ? '' : 'disabled'} onclick="extAdCancel()">Cancel</button><button class="btn primary" ${dirty && can_ ? '' : 'disabled'} onclick="extAdSave()">Save changes</button></div>`;
}
function extAdminTab() {
  return `<div id="xa">${extAdminInner()}</div>`;
}
