/* ---------- organization ---------- */
function applyOrgDue() {
  let ch = false;
  S.orgHist.forEach(h => {
    if (!h.applied && h.eff <= iso(TODAY)) {
      const e = emp(h.emp);
      if (e && !orgCheck(e.id, h.to)) {
        e.mgr = h.to || null;
        h.applied = true;
        ch = true;
        audit('Reporting line changed', e.name, {
          res: 'org',
          from: h.fromName,
          to: h.toName,
          reason: 'Scheduled change took effect ' + fdate(h.eff)
        });
      } else h.applied = true;
    }
  });
  if (ch) persist();
}
function orgNode(e, depth, seen) {
  const ds = directs(e.id),
    n = lineOf(e.id).length;
  return `<li><button class="onode" onclick="orgOpen('${e.id}')">${av(e.name, 34)}<span class="on-t"><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(e.dept)}</span></span>${n ? `<span class="chip mute nb">${n}<span class="sr"> in reporting line</span></span>` : ''}${e.week ? chip(e.week + '-day week', 'info', 1) : ''}</button>${ds.length && depth < 8 && !seen.has(e.id) ? `<ul>${ds.map(d => orgNode(d, depth + 1, new Set([...seen, e.id]))).join('')}</ul>` : ''}</li>`;
}
function orgPage() {
  applyOrgDue();
  const all = scopeOf('org') === 'all',
    u = me(),
    roots = all ? live().filter(e => !e.mgr || !emp(e.mgr)) : [u],
    deps = {},
    locs = {};
  live().forEach(e => {
    deps[e.dept] = (deps[e.dept] || 0) + 1;
    locs[e.loc] = (locs[e.loc] || 0) + 1;
  });
  const pend = S.orgHist.filter(h => !h.applied);
  return (
    ph(
      'Organization',
      all ? 'Reporting lines, departments and locations' : 'Your reporting line',
      can('org', 'edit')
        ? `<span class="muted small">Select a person to change their manager or work calendar</span>`
        : ''
    ) +
    `<div class="row c21"><div class="card"><div class="head"><div><h2>Reporting lines</h2><p class="sub">${all ? live().length + ' people' : lineOf(u.id).length + 1 + ' people in your reporting line'}. Approvals and manager access follow this chart.</p></div></div><ul class="otree" aria-label="Organization chart">${roots.map(r => orgNode(r, 0, new Set())).join('')}</ul></div>
  <div class="stack"><div class="card"><div class="head"><h2>Departments</h2></div><div class="list">${Object.entries(
    deps
  )
    .sort()
    .map(([d, n]) => `<div class="li"><span class="grow">${esc(d)}</span><b>${n}</b></div>`)
    .join('')}</div></div>
  <div class="card"><div class="head"><h2>Locations</h2></div><div class="list">${Object.entries(
    locs
  )
    .map(([d, n]) => `<div class="li"><span class="grow">${esc(d)}</span><b>${n}</b></div>`)
    .join('')}</div></div>
  <div class="card"><div class="head"><div><h2>Reporting changes</h2><p class="sub">Effective-dated, newest first</p></div></div>${
    S.orgHist.length
      ? `<div class="list">${S.orgHist
          .slice()
          .reverse()
          .slice(0, 6)
          .map(
            h =>
              `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(emp(h.emp) ? emp(h.emp).name : h.emp)}</b><div class="muted small">${esc(h.fromName)} → ${esc(h.toName)}</div><div class="muted small">From ${fdate(h.eff)} · by ${esc(h.by)}</div></div>${h.applied ? chip('Applied', 'ok', 1) : chip('Scheduled', 'info', 1)}</div>`
          )
          .join('')}</div>`
      : '<div class="empty">No changes yet.</div>'
  }${pend.length ? '' : ''}</div></div></div>`
  );
}
function orgOpen(id) {
  const e = emp(id),
    m = mgrOf(e),
    ds = directs(id);
  overlay(
    'Reporting line',
    `<div class="person" style="margin-bottom:14px">${av(e.name, 48)}<div><b style="font-size:16px">${esc(e.name)}</b><span>${esc(e.title)} · ${esc(e.dept)}</span></div></div><div class="list">
   <div class="li"><span class="muted grow">Reports to</span><b>${m ? esc(m.name) : 'Board of Directors'}</b></div><div class="li"><span class="muted grow">Location</span><b>${esc(e.loc)}</b></div>
   <div class="li"><span class="muted grow">Work calendar</span><b>${calLabel(e)}${e.week ? '' : ' (company default)'}</b></div><div class="li"><span class="muted grow">Direct reports</span><b>${ds.length}</b></div></div>
   ${ds.length ? `<h3 class="dsub">Direct reports</h3><div class="list">${ds.map(d => `<button class="li cname" onclick="orgOpen('${d.id}')">${av(d.name, 30)}<span class="cn"><b>${esc(d.name)}</b><span>${esc(d.title)}</span></span></button>`).join('')}</div>` : ''}`,
    `${can('org', 'edit') ? `<button class="btn primary" onclick="orgEdit('${id}')">Change manager or calendar</button>` : ''}<button class="btn" onclick="closeModal()">Close</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function orgEdit(id) {
  if (!need('org', 'edit', 'change reporting lines')) return;
  const e = emp(id),
    opts = live().filter(x => x.id !== id && !lineOf(id).some(y => y.id === x.id));
  overlay(
    'Change reporting line',
    `<p class="muted small" style="margin-bottom:12px">${esc(e.name)} · ${esc(e.title)}</p><div class="fg">${fld('oe-m', 'Reports to', `<select id="oe-m"><option value="">Board of Directors</option>${opts.map(x => `<option value="${x.id}" ${e.mgr === x.id ? 'selected' : ''}>${esc(x.name)} · ${esc(x.title)}</option>`).join('')}</select>`, 'full')}
   ${fld('oe-d', 'Effective from', `<input id="oe-d" type="date" value="${iso(TODAY)}">`)}${fld('oe-c', 'Work calendar', `<select id="oe-c"><option value="" ${!e.week ? 'selected' : ''}>Company default (${weekDays({ type: e.type })} days)</option><option value="5" ${e.week == 5 ? 'selected' : ''}>Mon to Fri (5 days)</option><option value="6" ${e.week == 6 ? 'selected' : ''}>Mon to Sat (6 days)</option></select>`)}
   ${fld('oe-r', 'Reason', `<textarea id="oe-r" rows="2" placeholder="For the audit log"></textarea>`, 'full')}</div><p class="muted small">The calendar applies straight away to leave and attendance. A manager change with a future date is scheduled and takes effect on that day.</p>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="orgSave('${id}')">Save</button>`
  );
}
function orgSave(id) {
  const e = emp(id),
    to = $('#oe-m').value || null,
    eff = $('#oe-d').value,
    cal = $('#oe-c').value,
    why = $('#oe-r').value.trim();
  const bad = orgCheck(id, to),
    ok = [
      chk('oe-m', !bad, bad),
      chk('oe-d', !!eff, 'Choose a date'),
      chk('oe-r', !!why, 'Add a short reason for the audit log')
    ].every(Boolean);
  if (!ok) return;
  const calOld = e.week || '',
    calNew = cal;
  if (String(calOld) !== String(calNew)) {
    e.week = calNew ? +calNew : undefined;
    if (!calNew) delete e.week;
    audit('Work calendar changed', e.name, {
      res: 'org',
      from: calOld ? calOld + '-day week' : 'company default',
      to: calNew ? calNew + '-day week' : 'company default',
      reason: why
    });
  }
  if ((to || null) !== (e.mgr || null)) {
    const h = {
      emp: id,
      from: e.mgr || null,
      to,
      eff,
      by: me().name,
      at: new Date().toISOString(),
      fromName: reportsTo(e),
      toName: to ? emp(to).name : 'Board of Directors',
      applied: false
    };
    S.orgHist.push(h);
    if (eff <= iso(TODAY)) {
      e.mgr = to;
      h.applied = true;
      audit('Reporting line changed', e.name, {
        res: 'org',
        from: h.fromName,
        to: h.toName,
        reason: why
      });
    } else
      audit('Reporting line scheduled', e.name, {
        res: 'org',
        from: h.fromName,
        to: h.toName + ' from ' + fdate(eff),
        reason: why
      });
  }
  closeModal();
  persist();
  render();
  toast('Saved');
}
