/* =============== assets and equipment =============== */
const ATYPES = [
  'Laptop',
  'Mobile phone',
  'ID card',
  'Access card',
  'Monitor',
  'Keyboard & mouse',
  'Headset',
  'Handheld scanner'
];
const AICON = {
  Laptop: 'laptop',
  'Mobile phone': 'smartphone',
  'ID card': 'idcard',
  'Access card': 'ccard',
  Monitor: 'monitor',
  'Keyboard & mouse': 'mouse',
  Headset: 'headphones',
  'Handheld scanner': 'box'
};
const ACODE = {
  Laptop: 'LT',
  'Mobile phone': 'PH',
  'ID card': 'ID',
  'Access card': 'AC',
  Monitor: 'MN',
  'Keyboard & mouse': 'KM',
  Headset: 'HS',
  'Handheld scanner': 'SC'
};
const ONE_EACH = ['Laptop', 'Mobile phone', 'ID card', 'Access card']; // a person holds one of each at a time
const aname = a => `${a.make} ${a.model}`.trim();
const aEmp = id => employees.find(e => e.id === id);
const aTone = t =>
  t === 'Laptop' || t === 'Mobile phone' ? 'brand' : t.includes('card') ? 'teal' : 'violet';
const wDays = a =>
  a.warranty ? Math.round((new Date(a.warranty + 'T00:00:00') - TODAY) / 864e5) : null;
const wChip = a => {
  const d = wDays(a);
  if (d == null || a.status === 'Retired') return '';
  return d < 0
    ? chip('Out of warranty', 'mute', 1)
    : d <= 60
      ? chip('Warranty ends ' + fshort(a.warranty), 'warn', 1)
      : '';
};
const wSoonChip = a => {
  const d = wDays(a);
  return d != null && d >= 0 && d <= 60 && a.status !== 'Retired'
    ? chip('Warranty ends ' + fshort(a.warranty), 'warn', 1)
    : '';
};
const wSoon = a => (wSoonChip(a) ? ` <span class="wchip">${wSoonChip(a)}</span>` : '');
const aEvents = a =>
  a.hist
    .map((h, i) => ({ h, i }))
    .sort((p, q) => q.h.date.localeCompare(p.h.date) || q.i - p.i)
    .map(x => x.h);
let ASSET_CTX = {},
  ASSET_AFTER = null;
const runAfter = () => {
  const f = ASSET_AFTER;
  ASSET_AFTER = null;
  if (f) f();
};
const aRefresh = () => {
  render();
  runAfter();
};
function assetsOf(id) {
  const cur = S.assets.filter(a => a.holder === id),
    past = [];
  S.assets.forEach(a =>
    a.hist.forEach((h, i) => {
      if (h.t === 'Issued' && h.emp === id) {
        const end = a.hist
          .slice(i + 1)
          .find(x => (x.t === 'Returned' || x.t === 'Lost') && x.emp === id);
        if (end)
          past.push({
            a,
            issued: h.date,
            end: end.date,
            kind: end.t,
            condOut: end.cond,
            note: end.note
          });
      }
    })
  );
  past.sort((x, y) => y.issued.localeCompare(x.issued));
  return { cur, past };
}
function assetLine(a, o = {}) {
  const iss = [...a.hist].reverse().find(h => h.t === 'Issued' && h.emp === a.holder);
  const acts = `${o.self && !a.ack ? `<button class="btn sm primary" onclick="ackAsset('${a.id}')">Confirm receipt</button>` : ''}${o.self ? `<button class="btn sm" onclick="reportAsset('${a.id}')">Report a problem</button>` : ''}${o.admin ? `<button class="btn sm" onclick="returnAsset('${a.id}','${o.after || ''}')">Return</button>` : ''}`;
  return `<div class="li" style="flex-wrap:wrap"><span class="ai t-${aTone(a.type)}">${ic(AICON[a.type], 18)}</span><div class="grow" style="min-width:170px"><button class="cname" style="width:auto" onclick="assetDetail('${a.id}')"><span class="cn"><b>${esc(aname(a))}</b><span>${a.type} · <span class="serial">${esc(a.serial)}</span></span></span></button><div class="muted small" style="margin-top:2px">Tag ${esc(a.tag)}${iss ? ' · issued ' + fdate(iss.date) : ''}</div>${a.ack && !wSoonChip(a) ? '' : `<div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap">${a.ack ? '' : chip('Not yet confirmed', 'warn', 1)}${wSoonChip(a)}</div>`}</div>${acts}</div>`;
}
function assetParts(e, o = {}) {
  const { cur, past } = assetsOf(e.id);
  const curH = cur.length
    ? `<div class="list">${cur.map(a => assetLine(a, o)).join('')}</div>`
    : `<div class="empty"><span class="ei">${ic('laptop', 22)}</span><b>No assets assigned</b>${o.self ? 'Anything issued to you will show up here.' : 'Nothing is issued to this person.'}</div>`;
  const pastH = past.length
    ? `<div class="list">${past.map(p => `<div class="li"><span class="ai t-mute" style="width:32px;height:32px">${ic(AICON[p.a.type], 16)}</span><div class="grow"><b>${esc(aname(p.a))}</b><div class="muted small">${p.a.type} · <span class="serial">${esc(p.a.serial)}</span></div><div class="muted small">${fdate(p.issued)} to ${fdate(p.end)}${p.condOut ? ' · returned ' + p.condOut.toLowerCase() : ''}${p.note ? ' · ' + esc(p.note) : ''}</div></div>${p.kind === 'Lost' ? chip('Lost', 'bad', 1) : chip('Returned', 'mute', 1)}</div>`).join('')}</div>`
    : `<div class="muted small">No previous assets.</div>`;
  return { cur, past, curH, pastH };
}
function assetDetail(id) {
  const a = S.assets.find(x => x.id === id),
    adm = S.role === 'admin',
    h = a.holder ? aEmp(a.holder) : null,
    iss = a.holder ? [...a.hist].reverse().find(x => x.t === 'Issued' && x.emp === a.holder) : null;
  const act = !adm
    ? ''
    : a.status === 'Assigned'
      ? `<button class="btn primary" onclick="returnAsset('${a.id}')">Return</button><button class="btn" onclick="assetStatus('${a.id}','Repair')">Send to repair</button><button class="btn bad" onclick="assetStatus('${a.id}','Lost')">Mark lost</button>`
      : a.status === 'In stock'
        ? `<button class="btn primary" onclick="issueAsset('${a.id}')">Issue to…</button><button class="btn" onclick="assetStatus('${a.id}','Repair')">Send to repair</button><button class="btn" onclick="assetStatus('${a.id}','Retired')">Retire</button>`
        : a.status === 'Repair'
          ? `<button class="btn primary" onclick="assetStatus('${a.id}','In stock')">Mark repaired</button><button class="btn" onclick="assetStatus('${a.id}','Retired')">Retire</button>`
          : '';
  detail('Asset', {
    head: `<div class="person" style="margin-bottom:12px"><span class="ai t-${aTone(a.type)}" style="width:46px;height:46px">${ic(AICON[a.type], 22)}</span><div><b style="font-size:16px">${esc(aname(a))}</b><span>${a.type} · ${esc(a.tag)}</span></div></div>`,
    chips: `${stChip(a.status)}${wChip(a)}${a.holder && !a.ack ? chip('Not yet confirmed', 'warn', 1) : ''}`,
    rows: [
      ['Serial number', `<span class="serial">${esc(a.serial)}</span>`],
      ['Asset tag', esc(a.tag)],
      ['Condition', a.cond],
      ['Purchased', a.purchased ? fdate(a.purchased) : '—'],
      ['Warranty until', a.warranty ? fdate(a.warranty) : '—'],
      ['Assigned to', h ? `${esc(h.name)} · ${esc(h.dept)}` : 'Not assigned'],
      ...(iss ? [['Issued on', fdate(iss.date)]] : [])
    ],
    tlT: 'Issue and return history',
    tl: aEvents(a).map(e => [
      `${e.t}${e.emp && aEmp(e.emp) ? ' · ' + aEmp(e.emp).name : ''}`,
      `${fdate(e.date)}${e.cond ? ' · ' + e.cond : ''}${e.note ? ' · ' + e.note : ''}`
    ]),
    actions: act
  });
}
function issueAsset(aid, empId, afterEmp) {
  ASSET_AFTER = afterEmp ? () => empProfile(afterEmp, 'assets') : null;
  ASSET_CTX = { aid: aid || '' };
  const a0 = aid ? S.assets.find(x => x.id === aid) : null,
    stock = S.assets.filter(a => a.status === 'In stock');
  overlay(
    'Issue asset',
    `<div class="fg">${fld('as-a', 'Asset', a0 ? `<input value="${esc(a0.type)} · ${esc(aname(a0))} · ${esc(a0.tag)}" disabled>` : `<select id="as-a">${stock.length ? stock.map(a => `<option value="${a.id}">${esc(a.type)} · ${esc(aname(a))} · ${esc(a.tag)}</option>`).join('') : '<option value="">No assets in stock</option>'}</select>`, 'full')}
   ${fld('as-e', 'Issue to', `<select id="as-e">${employees.map(e => `<option value="${e.id}" ${e.id === empId ? 'selected' : ''}>${esc(e.name)} · ${esc(e.dept)}</option>`).join('')}</select>`, 'full')}
   ${fld('as-d', 'Issue date', `<input id="as-d" type="date" value="${iso(TODAY)}">`)}${fld('as-c', 'Condition', `<select id="as-c"><option>New</option><option>Good</option><option>Fair</option></select>`)}
   ${fld('as-n', 'Note (optional)', '<input id="as-n" placeholder="e.g. Includes charger and bag" autocomplete="off">', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="doIssue()">Issue asset</button>`
  );
}
function doIssue() {
  const aid = $('#as-a') ? $('#as-a').value : ASSET_CTX.aid,
    a = S.assets.find(x => x.id === aid),
    eid = $('#as-e').value,
    d = $('#as-d').value,
    e = aEmp(eid);
  const dupe =
    a && ONE_EACH.includes(a.type)
      ? S.assets.find(x => x.holder === eid && x.type === a.type)
      : null;
  if (
    ![
      chk('as-a', !!a, 'There is nothing in stock to issue'),
      chk('as-d', !!d, 'Pick the issue date'),
      chk(
        'as-e',
        !dupe,
        `${e ? e.name.split(' ')[0] : 'This person'} already has an active ${a ? a.type.toLowerCase() : 'item'}. Return it first.`
      )
    ].every(Boolean)
  )
    return;
  const snap = JSON.stringify(a);
  a.status = 'Assigned';
  a.holder = eid;
  a.cond = $('#as-c').value;
  a.ack = false;
  a.hist.push({
    t: 'Issued',
    date: d,
    emp: eid,
    cond: a.cond,
    note: $('#as-n').value.trim(),
    by: me().name
  });
  closeModal();
  aRefresh();
  toast(`${aname(a)} issued to ${e.name}`, () => {
    Object.assign(a, JSON.parse(snap));
    aRefresh();
  });
}
function returnAsset(aid, afterEmp) {
  ASSET_AFTER = afterEmp ? () => empProfile(afterEmp, 'assets') : null;
  ASSET_CTX = { aid };
  const a = S.assets.find(x => x.id === aid),
    h = aEmp(a.holder);
  overlay(
    'Return asset',
    `<p class="muted" style="margin-bottom:14px">${esc(aname(a))} · <span class="serial">${esc(a.serial)}</span> from ${esc(h.name)}</p><div class="fg">${fld('rt-d', 'Return date', `<input id="rt-d" type="date" value="${iso(TODAY)}">`)}${fld('rt-c', 'Condition', `<select id="rt-c"><option>Good</option><option>Fair</option><option>Damaged</option></select>`)}${fld('rt-n', 'Note (optional)', '<input id="rt-n" placeholder="e.g. Charger missing" autocomplete="off">', 'full')}</div><p class="muted small">A damaged item goes to repair; anything else goes back to stock.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="doReturn()">Mark as returned</button>`
  );
}
function doReturn() {
  const a = S.assets.find(x => x.id === ASSET_CTX.aid),
    d = $('#rt-d').value,
    cnd = $('#rt-c').value,
    e = aEmp(a.holder);
  if (!chk('rt-d', !!d, 'Pick the return date')) return;
  const snap = JSON.stringify(a);
  a.hist.push({
    t: 'Returned',
    date: d,
    emp: a.holder,
    cond: cnd,
    note: $('#rt-n').value.trim(),
    by: me().name
  });
  a.holder = null;
  a.ack = true;
  a.cond = cnd;
  a.status = cnd === 'Damaged' ? 'Repair' : 'In stock';
  if (cnd === 'Damaged')
    a.hist.push({
      t: 'Repair',
      date: d,
      emp: null,
      cond: 'Damaged',
      note: 'Sent for repair after return',
      by: me().name
    });
  closeModal();
  aRefresh();
  toast(`${aname(a)} returned by ${e.name}`, () => {
    Object.assign(a, JSON.parse(snap));
    aRefresh();
  });
}
function assetStatus(aid, st) {
  const a = S.assets.find(x => x.id === aid),
    snap = JSON.stringify(a),
    h = a.holder,
    t0 = iso(TODAY),
    by = me().name;
  if (st === 'Repair') {
    if (h)
      a.hist.push({ t: 'Returned', date: t0, emp: h, cond: a.cond, note: 'Sent for repair', by });
    a.hist.push({ t: 'Repair', date: t0, emp: null, cond: a.cond, note: 'Sent for repair', by });
  } else if (st === 'Lost')
    a.hist.push({ t: 'Lost', date: t0, emp: h, cond: '', note: 'Reported lost', by });
  else if (st === 'Retired')
    a.hist.push({ t: 'Retired', date: t0, emp: null, cond: a.cond, note: 'Removed from use', by });
  else if (st === 'In stock') {
    a.cond = 'Good';
    a.hist.push({ t: 'Repaired', date: t0, emp: null, cond: 'Good', note: 'Back from repair', by });
  }
  a.status = st;
  a.holder = null;
  a.ack = true;
  closeModal();
  aRefresh();
  toast(`${aname(a)} marked ${st.toLowerCase()}`, () => {
    Object.assign(a, JSON.parse(snap));
    aRefresh();
  });
}
function addAsset() {
  overlay(
    'Add asset',
    `<div class="fg">${fld('na-t', 'Type', `<select id="na-t">${ATYPES.map(t => `<option>${t}</option>`).join('')}</select>`)}${fld('na-c', 'Condition', `<select id="na-c"><option>New</option><option>Good</option><option>Fair</option></select>`)}
   ${fld('na-m', 'Make', '<input id="na-m" placeholder="e.g. Dell" autocomplete="off">')}${fld('na-o', 'Model', '<input id="na-o" placeholder="e.g. Latitude 5440" autocomplete="off">')}
   ${fld('na-s', 'Serial number', '<input id="na-s" placeholder="As printed on the device" autocomplete="off" autocapitalize="characters">', 'full')}
   ${fld('na-p', 'Purchase date', `<input id="na-p" type="date" value="${iso(TODAY)}">`)}${fld('na-w', 'Warranty until (optional)', '<input id="na-w" type="date">')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveAsset()">Add asset</button>`
  );
}
function saveAsset() {
  const t = $('#na-t').value,
    mk = $('#na-m').value.trim(),
    md = $('#na-o').value.trim(),
    sr = $('#na-s').value.trim().toUpperCase(),
    p = $('#na-p').value,
    w = $('#na-w').value;
  if (
    ![
      chk('na-m', !!mk, 'Enter the make'),
      chk('na-o', !!md, 'Enter the model'),
      chk(
        'na-s',
        !!sr && !S.assets.some(a => a.serial.toUpperCase() === sr),
        sr ? 'This serial number is already registered' : 'Enter the serial number'
      ),
      chk('na-p', !!p, 'Pick the purchase date')
    ].every(Boolean)
  )
    return;
  const n = S.assets.filter(a => a.type === t).length + 1,
    a = {
      id: 'AST-' + (1000 + S.assets.length + 1),
      type: t,
      make: mk,
      model: md,
      serial: sr,
      tag: 'GM-' + ACODE[t] + '-' + String(n).padStart(4, '0'),
      status: 'In stock',
      cond: $('#na-c').value,
      holder: null,
      ack: true,
      purchased: p,
      warranty: w,
      hist: [
        {
          t: 'Added',
          date: p,
          emp: null,
          cond: $('#na-c').value,
          note: 'Added to inventory',
          by: me().name
        }
      ]
    };
  while (S.assets.some(x => x.tag === a.tag))
    a.tag = a.tag.replace(/\d+$/, v => String(+v + 1).padStart(4, '0'));
  S.assets.unshift(a);
  closeModal();
  render();
  toast(`${aname(a)} added to inventory`);
}
function ackAsset(id) {
  const a = S.assets.find(x => x.id === id);
  a.ack = true;
  a.hist.push({
    t: 'Acknowledged',
    date: iso(TODAY),
    emp: a.holder,
    cond: '',
    note: 'Confirmed receipt',
    by: me().name
  });
  render();
  toast('Thanks, receipt confirmed');
}
function reportAsset(id) {
  const a = S.assets.find(x => x.id === id),
    n = Math.max(100, ...S.tickets.map(t => +String(t.id).replace(/\D/g, '') || 0)) + 1;
  S.tickets.unshift({
    id: 'REQ-' + n,
    emp: me().id,
    cat: `Asset issue: ${aname(a)} (${a.tag})`,
    pr: 'High',
    st: 'Submitted',
    d: iso(TODAY)
  });
  toast(`Request REQ-${n} raised with IT and HR`);
}
function assetScope() {
  if (S.role === 'admin') return S.assets;
  const ids = scoped().map(e => e.id);
  return S.assets.filter(a => a.holder && ids.includes(a.holder));
}
function assetCSV() {
  const rows = assetScope().map(a => {
    const h = a.holder ? aEmp(a.holder) : null,
      iss = a.holder
        ? [...a.hist].reverse().find(x => x.t === 'Issued' && x.emp === a.holder)
        : null;
    return [
      a.id,
      a.tag,
      a.type,
      a.make,
      a.model,
      a.serial,
      a.status,
      a.cond,
      h ? h.name : '',
      h ? h.id : '',
      iss ? iss.date : '',
      a.purchased,
      a.warranty
    ];
  });
  saveFile(
    'Asset-register-' + iso(TODAY) + '.csv',
    toCSV(
      [
        'Asset ID',
        'Tag',
        'Type',
        'Make',
        'Model',
        'Serial number',
        'Status',
        'Condition',
        'Assigned to',
        'Employee ID',
        'Issued on',
        'Purchased',
        'Warranty until'
      ],
      rows
    )
  );
}
function assetsPage() {
  const adm = S.role === 'admin',
    all = assetScope(),
    st = S.tab.ast || 'All',
    q = (S.aq || '').trim().toLowerCase(),
    ty = S.aType || 'All';
  const need = a =>
    ['Repair', 'Lost'].includes(a.status) ||
    (a.status !== 'Retired' && wDays(a) != null && wDays(a) >= 0 && wDays(a) <= 60);
  let f = all.filter(
    a =>
      (st === 'All' || a.status === st) &&
      (ty === 'All' || a.type === ty) &&
      (!q ||
        [aname(a), a.type, a.tag, a.serial, a.holder ? aEmp(a.holder).name : '']
          .join(' ')
          .toLowerCase()
          .includes(q))
  );
  f = f
    .slice()
    .sort((x, y) => ATYPES.indexOf(x.type) - ATYPES.indexOf(y.type) || x.tag.localeCompare(y.tag));
  const lim = S.aLimit || 25,
    shown = f.slice(0, lim),
    cnt = k => all.filter(a => a.status === k).length;
  const T = all.length || 1,
    nIn = adm ? cnt('In stock') : all.filter(a => !a.ack).length,
    nNeed = all.filter(need).length,
    pc = x => Math.round((x / T) * 100) + '% of all assets',
    tiles = [
      kpi({
        l: 'Total assets',
        v: all.length,
        icon: 'laptop',
        tone: 't-brand',
        spark: [68, 70, 71, 73, 74, 76, 77, all.length],
        p: delta('+4', true, 'up'),
        d: 'added this quarter'
      }),
      kpi({
        l: 'Assigned',
        v: cnt('Assigned'),
        icon: 'user',
        tone: 't-green',
        bar: (cnt('Assigned') / T) * 100,
        bl: pc(cnt('Assigned')),
        d: 'in use by people'
      }),
      kpi({
        l: adm ? 'In stock' : 'Not yet confirmed',
        v: nIn,
        icon: adm ? 'box' : 'clock',
        tone: 't-teal',
        bar: (nIn / T) * 100,
        bl: pc(nIn),
        d: adm ? 'ready to issue' : 'waiting for confirmation'
      }),
      kpi({
        l: 'Needs attention',
        v: nNeed,
        icon: 'alert',
        tone: 't-amber',
        bar: (nNeed / T) * 100,
        bl: pc(nNeed),
        d: 'repair, lost or unconfirmed'
      })
    ];
  const issued = a => {
    const i = a.holder
      ? [...a.hist].reverse().find(x => x.t === 'Issued' && x.emp === a.holder)
      : null;
    return i ? fdate(i.date) : '—';
  };
  const rows = shown.map(a => {
    const h = a.holder ? aEmp(a.holder) : null;
    return {
      click: `assetDetail('${a.id}')`,
      cells: [
        `<div class="person"><span class="ai t-${aTone(a.type)}" style="width:34px;height:34px">${ic(AICON[a.type], 16)}</span><div><b>${esc(aname(a))}</b>${h ? `<span><i class="asub">${esc(h.name)}</i></span>` : ''}</div></div>`,
        a.type,
        `<span class="serial">${esc(a.tag)}</span>`,
        `<span class="serial">${esc(a.serial)}</span>`,
        h ? `<b style="font-weight:600">${esc(h.name)}</b>` : '<span class="muted">Not assigned</span>',
        h ? esc(h.dept) : '–',
        issued(a),
        `${stChip(a.status)}${wSoon(a)}`
      ]
    };
  });
  return (
    ph(
      adm ? 'Assets' : 'Team assets',
      adm
        ? 'Laptops, phones, cards and peripherals issued to people'
        : 'Equipment issued to your team',
      adm
        ? `<button class="btn" onclick="assetCSV()">${ic('download', 16)}Export CSV</button><button class="btn primary" onclick="addAsset()">${ic('plus', 16)}Add asset</button>`
        : `<button class="btn" onclick="assetCSV()">${ic('download', 16)}Export CSV</button>`
    ) +
    `<div class="row c4 statrow">${tiles.join('')}</div>
  <div class="card"><div class="tools" style="margin-bottom:14px"><div class="sbox">${ic('search', 16)}<input id="aq" type="search" placeholder="Search asset, serial number or person" value="${esc(S.aq || '')}" oninput="assetSearch(this.value)" aria-label="Search assets"></div>
    <select id="atype" onchange="S.aType=this.value;S.aLimit=25;render()" aria-label="Asset type"><option value="All">All types</option>${ATYPES.map(t => `<option ${ty === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
    ${tabs(
      'ast',
      [
        ['All', 'All'],
        ['Assigned', 'Assigned'],
        ['In stock', 'In stock'],
        ['Repair', 'Repair'],
        ['Lost', 'Lost'],
        ['Retired', 'Retired']
      ],
      'All'
    ).replace(/setTab\('ast'/g, "S.aLimit=25;setTab('ast'")}</div>
   ${rtable([{ h: 'Asset', keep: 1 }, { h: 'Type', xm: 1 }, { h: 'Tag', xm: 1 }, { h: 'Serial', xm: 1 }, { h: 'Assigned to', xm: 1 }, { h: 'Department', xm: 1 }, { h: 'Issued', xm: 1 }, { h: 'Status' }], rows, { et: 'No assets match', em: 'Try a different search or filter.', cls: 'aw' })}
   ${f.length > lim ? `<div style="text-align:center;margin-top:12px"><button class="btn" onclick="S.aLimit=${lim + 25};render()">Show more (${f.length - lim} left)</button></div>` : ''}
   <p class="muted small" style="margin-top:12px">${f.length} of ${all.length} asset${all.length === 1 ? '' : 's'} · select a row for the serial number and issue and return history</p></div>`
  );
}
function assetSearch(v) {
  S.aq = v;
  S.aLimit = 25;
  render();
  const i = $('#aq');
  if (i) {
    i.focus();
    i.setSelectionRange(v.length, v.length);
  }
}
