/* js/core/helpers.js */
/* =============== helpers =============== */
const ICON = {
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  orgchart:
    'M10 2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M3 16h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z M17 16h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z M12 8v4 M5 16v-2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2',
  swap: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3',
  approve:
    'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 3h6v4H9z M9 14l2 2 4-4',
  users:
    'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2 M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M21 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  laptop:
    'M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16',
  smartphone: 'M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M12 18h.01',
  idcard:
    'M16 10h2 M16 14h2 M6.17 15a3 3 0 0 1 5.66 0 M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M22 9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z',
  ccard: 'M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z M1 10h22',
  mouse: 'M12 2a7 7 0 0 0-7 7v6a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7z M12 6v4',
  monitor:
    'M20 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8 21h8 M12 17v4',
  headphones:
    'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
  box: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12',
  gift: 'M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
  userplus:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M19 8v6 M22 11h-6',
  cal: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  wallet: 'M20 7H5a2 2 0 0 1 0-4h13v4 M3 5v14a2 2 0 0 0 2 2h15V7 M16 14h.01',
  brief: 'M3 7h18v13H3z M8 7V4h8v3 M3 13h18',
  target:
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
  chart: 'M3 3v18h18 M7 15l4-4 3 3 5-6',
  sliders: 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  more: 'M5 12h.01 M12 12h.01 M19 12h.01',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  plus: 'M12 5v14 M5 12h14',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18 M6 6l12 12',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  pin: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8',
  receipt: 'M4 2v20l3-2 2 2 3-2 3 2 2-2 3 2V2l-3 2-2-2-3 2-3-2-2 2z M8 9h8 M8 13h5',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01',
  alert:
    'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z M12 9v4 M12 17h.01',
  up: 'M7 17L17 7 M8 7h9v9',
  dn: 'M17 7L7 17 M16 17H7V8',
  panel: 'M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M9 4v16',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  list: 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  eyeoff:
    'M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9 M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2 M14.1 14.1a3 3 0 1 1-4.2-4.2 M1 1l22 22',
  lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6',
  key: 'M21 2l-2 2 M11.4 11.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8z M15.5 7.5l3 3L22 7l-3-3',
  camera:
    'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  chev: 'M6 9l6 6 6-6'
};
const ic = (n, s = 20) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON[n]}"/></svg>`;
const $ = s => document.querySelector(s);
const esc = s =>
  String(s).replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const inrC = n =>
  n >= 1e7
    ? '₹' + (n / 1e7).toFixed(2) + ' Cr'
    : n >= 1e5
      ? '₹' + (n / 1e5).toFixed(1) + ' L'
      : n >= 1e4
        ? '₹' + (n / 1e5).toFixed(2) + ' L'
        : inr(n);
const AVC = [
  '#3969D0',
  '#2A8077',
  '#7058C0',
  '#B2552B',
  '#A8467A',
  '#2F7A97',
  '#667F2E',
  '#A24A3D'
];
const colorOf = s => AVC[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % AVC.length];
const initials = n =>
  n
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
const av = (n, sz = 36) => {
  const ph = typeof employees !== 'undefined' && (employees.find(e => e.name === n) || {}).photo;
  if (ph)
    return `<div class="avatar has-photo" style="width:${sz}px;height:${sz}px"><img src="${ph}" alt=""></div>`;
  return `<div class="avatar" style="background:${colorOf(n)};width:${sz}px;height:${sz}px;font-size:${Math.round(sz * 0.36)}px">${initials(n)}</div>`;
};
const person = (e, sub) =>
  `<div class="person">${av(e.name)}<div><b>${esc(e.name)}</b><span>${esc(sub ?? e.title)}</span></div></div>`;
const chip = (t, k, nb) => `<span class="chip ${k}${nb ? ' nb' : ''}">${esc(t)}</span>`;
const STK = {
  Active: 'ok',
  Approved: 'ok',
  Present: 'ok',
  Paid: 'ok',
  Closed: 'ok',
  Resolved: 'ok',
  Verified: 'ok',
  Complete: 'ok',
  'On leave': 'info',
  Submitted: 'info',
  'Awaiting approval': 'warn',
  Pending: 'warn',
  Probation: 'warn',
  'In review': 'warn',
  'In progress': 'warn',
  Investigating: 'warn',
  'Half day': 'warn',
  Rejected: 'bad',
  Absent: 'bad',
  Open: 'bad',
  'Not started': 'mute',
  Assigned: 'mute',
  'Re-upload requested': 'warn',
  'In stock': 'info',
  Repair: 'warn',
  Lost: 'bad',
  Retired: 'mute'
};
const stChip = s => chip(s, STK[s] || 'mute');
const fdate = d =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
const NOW = new Date(),
  TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
const iso = d =>
  d.getFullYear() +
  '-' +
  String(d.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(d.getDate()).padStart(2, '0');
const pad = n => String(n).padStart(2, '0');
const hm = d => pad(d.getHours()) + ':' + pad(d.getMinutes());
const dow = () => (NOW.getDay() + 6) % 7;

/* ---- charts ---- */
let _spn = 0;
function trend(end, n = 12, seed = 1, rise = 0.14) {
  /* sample trend that ends exactly on today's value */
  let s = seed * 7919 + 13;
  const r = () => (s = (s * 16807) % 2147483647) / 2147483647,
    start = end * (1 - rise),
    out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push(start + (end - start) * t + (i && i < n - 1 ? (r() - 0.5) * Math.abs(end) * 0.07 : 0));
  }
  out[n - 1] = end;
  return out;
}
function sparkline(v, col, label) {
  const W = 120,
    H = 40,
    pad = 5,
    mx = Math.max(...v),
    mn = Math.min(...v),
    rg = Math.max(mx - mn, Math.abs(mx) * 0.12) || 1,
    lo = (mx + mn) / 2 - rg / 2,
    X = i => (i / (v.length - 1)) * W,
    Y = x => pad + (H - pad * 2) * (1 - (x - lo) / rg),
    id = 'spg' + ++_spn,
    f = n =>
      n.toFixed(
        1
      ); /* small swings stay small: the curve never fills the height unless the change is real */
  let d = `M0 ${f(Y(v[0]))}`;
  for (let i = 1; i < v.length; i++) {
    const x0 = X(i - 1),
      x1 = X(i),
      m = (x0 + x1) / 2;
    d += ` C${f(m)} ${f(Y(v[i - 1]))} ${f(m)} ${f(Y(v[i]))} ${f(x1)} ${f(Y(v[i]))}`;
  }
  const last = Y(v[v.length - 1]),
    r1 = n => Math.round(n * 10) / 10;
  return `<div class="sp" style="--sc:${col}" role="img" aria-label="${esc(label || 'Trend')}: trend over ${v.length} periods, from ${r1(v[0])} to ${r1(v[v.length - 1])}"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".30"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path d="${d} L${W} ${H} L0 ${H} Z" fill="url(#${id})"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg><i class="sp-dot" style="top:${f((last / H) * 100)}%"></i></div>`;
}
const kbar = (p, l) => {
  p = Math.max(0, Math.min(100, p || 0));
  return `<div class="kb" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p)}"${l ? ` aria-label="${esc(l)}"` : ''}><i style="width:${p.toFixed(1)}%"></i></div>${l ? `<div class="kbl"><span>${l}</span></div>` : ''}`;
};
function ring(p, txt, sub, color = 'var(--brand)') {
  const C = 2 * Math.PI * 30;
  return `<div class="ring"><svg viewBox="0 0 76 76" width="80" height="80" role="img" aria-label="${esc(sub)}: ${esc(txt)}"><circle cx="38" cy="38" r="30" fill="none" style="stroke:var(--line)" stroke-width="8"/><circle cx="38" cy="38" r="30" fill="none" style="stroke:${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${((C * Math.max(p, 0.01)) / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 38 38)"/><text x="38" y="44" text-anchor="middle" class="rn">${txt}</text></svg><span class="small muted">${sub}</span></div>`;
}
/* width (in SVG units) of a chart card: share = fraction of the content row the card takes */
function chartWidth(share, stackAt) {
  if (innerWidth <= 900) return innerWidth <= 520 ? 330 : 520;
  const root = getComputedStyle(document.documentElement),
    gap = parseFloat(root.getPropertyValue('--gap')) || 14,
    pad = parseFloat(root.getPropertyValue('--pad')) || 16,
    ct = document.querySelector('.content'),
    side = ct ? parseFloat(getComputedStyle(ct).paddingLeft) || 24 : 24;
  const bar = innerWidth - document.documentElement.clientWidth,
    avail = Math.min(
      2200,
      innerWidth -
        bar -
        (document.querySelector('.side')
          ? document.querySelector('.side').getBoundingClientRect().width
          : S.collapsed
            ? 76
            : 256) -
        side * 2
    );
  if (stackAt && innerWidth <= stackAt) share = 1; // the row collapses to one column at this width
  const card = share >= 1 ? avail : (avail - gap) * share;
  return Math.round(Math.max(300, Math.min(1300, card - pad * 2)));
}
function barChart(vals, labels, o = {}) {
  const W = o.w || chartWidth(o.share || 0.5, o.stackAt),
    H = o.h || (innerWidth <= 520 ? 170 : W > 800 ? 270 : 230),
    L = 30,
    B = 26,
    T = 18,
    R = 6,
    max = o.max || 100,
    ph = H - B - T,
    n = vals.length,
    bw = (W - L - R) / n,
    w = Math.min(bw * 0.58, Math.min(60, Math.max(34, W / 16)));
  let g = '';
  for (let i = 0; i <= 4; i++) {
    const y = T + ph - (ph * i) / 4;
    g += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" class="gl"/><text x="${L - 6}" y="${y + 3.5}" text-anchor="end" class="ax">${Math.round((max * i) / 4)}</text>`;
  }
  vals.forEach((v, i) => {
    const x = L + bw * i + (bw - w) / 2;
    if (v == null)
      g += `<rect x="${x}" y="${T + ph - 4}" width="${w}" height="4" rx="2" class="bf"/>`;
    else {
      const h = Math.max(2, (ph * v) / max),
        y = T + ph - h,
        lo = o.low != null && v < o.low,
        cls = lo ? 'bl' : o.today === undefined || i === o.today ? 'bt' : 'bp';
      g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" class="${cls}"><title>${labels[i]}: ${v}${o.unit || ''}</title></rect>`;
      if (o.all || o.today === undefined || i === o.today || lo) {
        const ty = o.target != null ? T + ph - (ph * o.target) / max : -99,
          hit = Math.abs(y - 5 - ty) < 14;
        g += hit
          ? `<text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" class="bv" style="fill:#fff">${v}${o.unit || ''}</text>`
          : `<text x="${x + w / 2}" y="${y - 5}" text-anchor="middle" class="bv">${v}${o.unit || ''}</text>`;
      }
    }
    g += `<text x="${x + w / 2}" y="${H - 8}" text-anchor="middle" class="ax ${i === o.today ? 'axt' : ''}">${labels[i]}</text>`;
  });
  if (o.target != null) {
    const y = T + ph - (ph * o.target) / max;
    g += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" class="tg"/><text x="${W - R}" y="${y - 5}" text-anchor="end" class="ax" style="fill:var(--teal-ink)">Target ${o.target}${o.unit || ''}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" class="svgc" role="img" aria-label="${esc(o.label || 'Bar chart')}">${g}</svg>`;
}
function donut(items, center, fn) {
  const tot = items.reduce((a, i) => a + i.v, 0),
    r = 46,
    C = 2 * Math.PI * r;
  let off = 0;
  const segs = items
    .map(i => {
      const len = (C * i.v) / tot;
      const s = `<circle cx="60" cy="60" r="${r}" fill="none" style="stroke:${i.c}" stroke-width="16" stroke-dasharray="${(len - 1.5).toFixed(1)} ${(C - len + 1.5).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 60 60)"><title>${esc(i.l)}: ${i.v}</title></circle>`;
      off += len;
      return s;
    })
    .join('');
  return `<div class="dl"><svg viewBox="0 0 120 120" width="132" height="132" role="img" aria-label="${esc(center)}">${segs}<text x="60" y="63" text-anchor="middle" class="dn1">${tot}</text><text x="60" y="78" text-anchor="middle" class="ax">${center}</text></svg><ul>${items.map(i => (fn ? `<li><button type="button" class="lk" title="Show ${esc(i.l)}" data-n="${esc(i.l)}" onclick="${fn}(this.dataset.n)"><i style="background:${i.c}"></i><span>${esc(i.l)}</span><b>${i.v}</b></button></li>` : `<li><i style="background:${i.c}"></i>${esc(i.l)}<b>${i.v}</b></li>`)).join('')}</ul></div>`;
}

/* ---- ui components ---- */
const backName = () => {
  const h = S.hist && S.hist[S.hist.length - 1];
  return h ? label(h.page) : '';
};
const backBtn = () =>
  S.hist && S.hist.length
    ? `<button class="icon-btn back-ic" onclick="back()" aria-label="Back to ${esc(backName())}" title="Back to ${esc(backName())}">${ic('arrow', 18)}</button>`
    : '';
const TABN = {
  st: {
    users: 'Users',
    roles: 'Roles and access',
    integrations: 'Integrations',
    ext: 'Browser extension',
    policy: 'Work policies',
    security: 'Security',
    statutory: 'Statutory',
    prefs: 'Preferences',
    otpol: 'Overtime and comp-off'
  },
  rq: { claims: 'Expense claims', help: 'Helpdesk', docs: 'Documents' },
  lv: { approve: 'Team requests', mine: 'My requests' },
  hr: {
    hours: 'Hours',
    ot: 'Overtime',
    bal: 'Extra time',
    off: 'Holiday and weekly-off work',
    req: 'My requests',
    team: 'Team approvals'
  }
};
function subCrumb() {
  const p = S.page,
    t = S.tab;
  if (p === 'payroll' && S.role !== 'employee' && t.pr === 'me')
    return { t: 'My payslip', link: 1 };
  if (p === 'performance' && S.role !== 'employee' && t.pf === 'me')
    return { t: 'My goals', link: 1 };
  if (p === 'settings') return { t: TABN.st[t.st] || TABN.st.roles };
  if (p === 'requests') return { t: TABN.rq[t.rq || 'claims'] };
  if (p === 'hours') return { t: TABN.hr[t.hr || 'hours'] || TABN.hr.hours };
  if (p === 'leave' && isMgr()) return { t: TABN.lv[t.lv || 'approve'] };
  return null;
}
function crumbRoot() {
  closeCrumbMenu();
  const h = S.hist[S.hist.length - 1];
  if (h && h.page === S.page && !h.tab.pr && !h.tab.pf) {
    back();
    return;
  } // came from this page's main view: just step back
  S.tab.pr = '';
  S.tab.pf = '';
  delete S.tab.st;
  delete S.tab.rq;
  delete S.tab.lv;
  render();
  window.scrollTo(0, 0);
}
function closeCrumbMenu(focusBtn) {
  if (!crumbOpen) return;
  const o = crumbOpen;
  crumbOpen = null;
  o.pop.remove();
  document.removeEventListener('mousedown', o.out, true);
  document.removeEventListener('keydown', o.key, true);
  removeEventListener('resize', o.rs);
  removeEventListener('scroll', o.rs, true);
  o.btn.setAttribute('aria-expanded', 'false');
  if (focusBtn && document.contains(o.btn)) o.btn.focus();
}
function crumbMenu(btn, gi) {
  if (crumbOpen) {
    const same = crumbOpen.btn === btn;
    closeCrumbMenu();
    if (same) return;
  }
  const g = navFor()[gi];
  if (!g) return;
  const pop = document.createElement('div');
  pop.className = 'dd-pop cm';
  pop.setAttribute('role', 'menu');
  pop.setAttribute('aria-label', g[0]);
  pop.innerHTML = g[1]
    .map(
      id =>
        `<button class="cm-i ${id === S.page ? 'on' : ''}" role="menuitem" data-p="${id}">${ic(PG[id][1], 18)}<span>${esc(label(id))}</span>${id === S.page ? `<span class="ck">${ic('check', 14)}</span>` : ''}</button>`
    )
    .join('');
  document.body.appendChild(pop);
  const r = btn.getBoundingClientRect();
  pop.style.left = Math.max(8, r.left - 6) + 'px';
  pop.style.top = r.bottom + 6 + 'px';
  const items = [...pop.querySelectorAll('.cm-i')];
  pop.onclick = e => {
    const b = e.target.closest('.cm-i');
    if (!b) return;
    const p = b.dataset.p;
    closeCrumbMenu();
    if (p === S.page) {
      crumbRoot();
    } else go(p);
  };
  const o = {
    pop,
    btn,
    t: performance.now(),
    out: e => {
      if (!pop.contains(e.target) && !btn.contains(e.target)) closeCrumbMenu();
    },
    rs: e => {
      // close when the page scrolls or resizes, not for unrelated scrollers or the reset right after navigating
      if (e && e.type === 'scroll') {
        if (performance.now() - o.t < 250) return;
        const t = e.target;
        if (!t || pop.contains(t)) return;
        if (t !== document && t !== document.documentElement && !(t.contains && t.contains(btn)))
          return;
      }
      closeCrumbMenu();
    },
    key: e => {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeCrumbMenu(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(i + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(i - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Tab') closeCrumbMenu();
    }
  };
  crumbOpen = o;
  btn.setAttribute('aria-expanded', 'true');
  document.addEventListener('mousedown', o.out, true);
  document.addEventListener('keydown', o.key, true);
  addEventListener('resize', o.rs);
  addEventListener('scroll', o.rs, true);
  (items.find(x => x.classList.contains('on')) || items[0]).focus();
}
function crumbs() {
  if (S.page === 'dashboard') return '';
  const nv = navFor(),
    g = nv.find(x => x[1].includes(S.page)),
    sub = subCrumb(),
    it = [{ t: 'Home', a: "go('dashboard')" }];
  if (g && nv.length > 1) it.push({ t: g[0], menu: nv.indexOf(g) });
  it.push({ t: label(S.page), a: sub ? 'crumbRoot()' : '' });
  if (sub) it.push({ t: sub.t });
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${it
    .map((c, i) => {
      const last = i === it.length - 1;
      return `<li>${c.menu !== undefined && !last ? `<button aria-haspopup="menu" aria-expanded="false" onclick="crumbMenu(this,${c.menu})">${esc(c.t)}${ic('chev', 12)}</button>` : c.a && !last ? `<button onclick="${c.a}">${esc(c.t)}</button>` : `<span${last ? ' aria-current="page"' : ''}>${esc(c.t)}</span>`}</li>`;
    })
    .join('')}</ol></nav>`;
}
const ph = (t, s, a = '') =>
  `<div class="phw">${S.hist.length ? `<button class="pgback" onclick="back()">← Back to ${esc(label(S.hist[S.hist.length - 1].page))}</button>` : ''}<div class="ph"><div class="pt"><div><h1>${t}</h1>${s ? `<p>${s}</p>` : ''}</div></div>${a ? `<div class="acts">${a}</div>` : ''}</div></div>`;
const delta = (t, good, icon) =>
  `<span class="pill ${good === null ? 'neu' : good ? 'up' : 'dn'}">${icon ? ic(icon, 12) : ''}${t}</span>`;
function kpi(o) {
  const t = (o.tone || '').replace('t-', ''),
    k = t ? ` k-${t}` : '',
    col = o.sc || (t ? `var(--${t})` : 'var(--brand)');
  const foot = o.spark ? sparkline(o.spark, col, o.l) : o.bar != null ? kbar(o.bar, o.bl) : '';
  const inner = `<div class="kh">${o.icon ? `<span class="ki">${ic(o.icon, 20)}</span>` : ''}<span class="kl">${o.l}</span>${o.def ? kinfoBtn(o) : ''}</div><div class="kn"><span class="n">${o.v}</span>${o.p ? `<span class="kp">${o.p}</span>` : ''}</div>${o.d || o.sample ? `<div class="kd">${o.sample ? '<span class="ksm">Sample</span> ' : ''}${o.d || ''}</div>` : ''}${foot ? `<div class="kf">${foot}</div>` : ''}`;
  return o.go && flat().includes(o.go)
    ? `<div class="card kpi${k} clk" role="link" tabindex="0" title="Open ${esc(label(o.go))}" onclick="go('${o.go}')" onkeydown="if(event.key==='Enter')go('${o.go}')">${inner}</div>`
    : `<div class="card kpi${k}">${inner}</div>`;
}

/* a table scrolls inside its own box (header stays put) instead of making the whole page scroll */
function fitTables() {
  const pad = innerWidth <= 900 ? 96 : 48;
  document.querySelectorAll('#view .tw').forEach(t => {
    const tb = t.querySelector('table');
    if (!tb) return;
    if (getComputedStyle(tb).display !== 'table') {
      t.style.maxHeight = '';
      t.classList.remove('vs');
      return;
    } // phone cards keep the page scroll
    t.style.maxHeight = 'none';
    const r = t.getBoundingClientRect(),
      card = t.closest('.card'),
      below = card ? Math.max(0, card.getBoundingClientRect().bottom - r.bottom) : 0;
    const mh = Math.max(260, Math.round(innerHeight - (r.top + scrollY) - below - pad));
    if (r.height > mh + 1) {
      t.style.maxHeight = mh + 'px';
      t.classList.add('vs');
    } else {
      t.style.maxHeight = '';
      t.classList.remove('vs');
    }
  });
  if (window.enhanceScrollers) enhanceScrollers(document.getElementById('view'));
}
addEventListener('resize', () => {
  clearTimeout(fitTables.t);
  fitTables.t = setTimeout(fitTables, 120);
});
function rtable(heads, rows, o = {}) {
  if (heads.some(h => h.hid)) {
    const k = heads.map((h, i) => (h.hid ? -1 : i)).filter(i => i >= 0);
    rows = rows.map(r => (r.cells ? { ...r, cells: k.map(i => r.cells[i]) } : r));
    heads = k.map(i => heads[i]);
  }
  const scope = heads[0] && heads[0].sel,
    sids = scope ? rows.filter(r => r.sid != null).map(r => r.sid) : [],
    picked = new Set(S.sel && S.sel.scope === scope ? S.sel.ids : []);
  const all =
    scope && sids.length
      ? `<input class="selc" id="selall" type="checkbox" aria-label="Select all pending" ${sids.every(i => picked.has(i)) ? 'checked' : ''} onclick="event.stopPropagation()" onchange="selAll('${scope}',[${sids.join(',')}],this.checked)">`
      : '';
  const cell0 = (r, c) =>
    scope
      ? `<div class="c0"><span class="selw">${r.sid != null ? `<input class="selc" type="checkbox" data-sid="${r.sid}" aria-label="Select this request" ${picked.has(r.sid) ? 'checked' : ''} onclick="event.stopPropagation()" onchange="selToggle('${scope}',${r.sid},this.checked)">` : ''}</span><div class="c0b">${c}</div></div>`
      : c;
  return `<div class="tw"><table class="rt${o.keep || heads.some(h => h.keep) ? ' keep' : ''}${o.cls ? ' ' + o.cls : ''}"><thead><tr>${heads
    .map((h, i) => {
      const pre = i === 0 && scope ? `<span class="selw">${all}</span>` : '',
        wrap = x => (pre ? `<div class="c0">${pre}<div class="c0b">${x}</div></div>` : x);
      if (!h.sk || !o.sortFn)
        return `<th class="${h.c || ''}${h.xm ? ' xm' : ''}">${wrap(h.h || '<span class="sr">Actions</span>')}</th>`;
      const st = o.sort === h.sk ? 'ascending' : o.sort === '-' + h.sk ? 'descending' : 'none';
      return `<th class="${h.c || ''}${h.xm ? ' xm' : ''}" aria-sort="${st}">${wrap(`<button class="thb" onclick="${o.sortFn}('${h.sk}')" title="Sort by ${esc(h.h)}">${h.h}<span class="sar">${ic('chev', 14)}</span></button>`)}</th>`;
    })
    .join(
      ''
    )}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr ${r.click ? `class="click${r.cls ? ' ' + r.cls : ''}" tabindex="0" onclick="${r.click}" onkeydown="if(event.key==='Enter'&&event.target===this)${r.click}"` : r.cls ? `class="${r.cls}"` : ''}>${r.cells.map((c, i) => `<td class="${heads[i].c || ''} ${heads[i].xm ? 'xm' : ''}" data-label="${esc(heads[i].h)}" ${heads[i].act ? 'data-act' : ''}>${i === 0 ? cell0(r, c) : c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${heads.length}" class="empty"><span class="ei">${ic('inbox', 22)}</span><b>${o.et || 'Nothing here yet'}</b>${o.em || ''}</td></tr>`}</tbody></table></div>`;
}
const tabs = (k, items, def) => {
  const cur = S.tab[k] ?? def,
    many = items.length > 3;
  return `<div class="tabs${many ? ' many' : ''}" role="tablist">${items.map(([v, l]) => `<button class="tab ${cur === v ? 'on' : ''}" role="tab" aria-selected="${cur === v}" onclick="setTab('${k}','${v}')">${l}</button>`).join('')}</div>${many ? `<div class="tabsel"><label class="sr" for="ts-${k}">Section</label><select id="ts-${k}" onchange="setTab('${k}',this.value)">${items.map(([v, l]) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>` : ''}`;
};
const curTab = (k, def) => S.tab[k] ?? def;
function setTab(k, v) {
  S.tab[k] = v;
  render();
}

/* js/core/data.js */
/* =============== data =============== */
const DEPTS = [
  'Production',
  'Quality',
  'Maintenance',
  'Stores & Logistics',
  'HR & Admin',
  'Finance',
  'IT',
  'Sales'
];
const DC = [
  'var(--brand)',
  'var(--teal)',
  '#8B74D1',
  'var(--amber)',
  '#C9608F',
  '#4B93AD',
  '#7F9F4A',
  'var(--red)'
];
const E = (id, name, dept, title, type, join, ctc, status, loc) => ({
  id,
  name,
  dept,
  title,
  type,
  join,
  ctc,
  status,
  loc,
  email: name.toLowerCase().replace(/ /g, '.') + '@gmux.in',
  phone:
    '+91 98' +
    String(10000000 + (Math.abs([...id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 89999999))
});
const DOB = {
  'E-1001': '1988-03-21',
  'E-1002': '1984-12-04',
  'E-1003': '1995-10-14',
  'E-1004': '1992-11-02',
  'E-1005': '1990-10-12',
  'E-1006': '1994-06-17',
  'E-1007': '1987-10-27',
  'E-1008': '1991-08-05',
  'E-1009': '1993-10-09',
  'E-1010': '1996-12-11',
  'E-1011': '1989-04-08',
  'E-1012': '1986-01-22',
  'E-1013': '1991-05-30',
  'E-1014': '1985-09-19',
  'E-1015': '1983-07-14',
  'E-1016': '1998-02-26'
};
const dobOf = e => e.dob || DOB[e.id] || '';
const JOIN_FIX = {
  'E-1016': ['2025-02-03', '2026-10-01'],
  'E-1010': ['2024-01-15', '2026-10-01'],
  'E-1013': ['2020-10-05', '2020-10-09'],
  'E-1006': ['2021-09-06', '2021-10-13']
};
let employees = [
  E(
    'E-1001',
    'Neha Kapoor',
    'HR & Admin',
    'HR Head',
    'Office',
    '2018-04-02',
    2400000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1002',
    'Arjun Mehta',
    'Production',
    'Production Manager',
    'Plant',
    '2016-08-16',
    1800000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1003',
    'Riya Verma',
    'Finance',
    'Accounts Executive',
    'Office',
    '2022-01-10',
    1408920,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1004',
    'Sandeep Yadav',
    'Production',
    'Machine Operator',
    'Plant',
    '2020-06-01',
    360000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1005',
    'Imran Khan',
    'Maintenance',
    'Fitter',
    'Plant',
    '2019-02-18',
    408000,
    'On leave',
    'Manesar Plant'
  ),
  E(
    'E-1006',
    'Pooja Nair',
    'Quality',
    'QA Engineer',
    'Plant',
    '2021-10-13',
    840000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1007',
    'Vikram Singh',
    'Stores & Logistics',
    'Stores Supervisor',
    'Plant',
    '2017-11-20',
    540000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1008',
    'Kavita Joshi',
    'Sales',
    'Sales Manager',
    'Office',
    '2019-07-08',
    1500000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1009',
    'Rahul Desai',
    'IT',
    'Systems Administrator',
    'Office',
    '2023-03-27',
    960000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1010',
    'Meera Iyer',
    'HR & Admin',
    'HR Executive',
    'Office',
    '2026-10-01',
    600000,
    'Probation',
    'Gurugram HQ'
  ),
  E(
    'E-1011',
    'Manoj Kumar',
    'Production',
    'Line Operator',
    'Plant',
    '2021-04-12',
    336000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1012',
    'Sunita Devi',
    'Production',
    'Packer',
    'Plant',
    '2022-08-22',
    300000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1013',
    'Aditya Rao',
    'Quality',
    'Quality Inspector',
    'Plant',
    '2020-10-09',
    456000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1014',
    'Farah Siddiqui',
    'Finance',
    'Finance Manager',
    'Office',
    '2015-05-25',
    1650000,
    'Active',
    'Gurugram HQ'
  ),
  E(
    'E-1015',
    'Deepak Chauhan',
    'Maintenance',
    'Electrician',
    'Plant',
    '2018-12-03',
    420000,
    'Active',
    'Manesar Plant'
  ),
  E(
    'E-1016',
    'Tanvi Shah',
    'Sales',
    'Sales Executive',
    'Office',
    '2026-10-01',
    660000,
    'Probation',
    'Gurugram HQ'
  )
];
const USER = { admin: 'E-1001', manager: 'E-1002', employee: 'E-1003' };
const POLICY = {
  CL: { n: 'Casual leave', t: 12, u: 3, c: 'var(--brand)' },
  SL: { n: 'Sick leave', t: 8, u: 1, c: 'var(--teal)' },
  EL: { n: 'Earned leave', t: 18, u: 4, c: 'var(--amber)' }
};
function seedAssets() {
  const A = [],
    cnt = {};
  let n = 1000;
  const CODE = {
    Laptop: 'LT',
    'Mobile phone': 'PH',
    'ID card': 'ID',
    'Access card': 'AC',
    Monitor: 'MN',
    'Keyboard & mouse': 'KM',
    Headset: 'HS',
    'Handheld scanner': 'SC'
  };
  const p2 = v => String(v).padStart(2, '0'),
    ymd = x => x.getFullYear() + '-' + p2(x.getMonth() + 1) + '-' + p2(x.getDate());
  const shift = (d, days) => {
    const x = new Date(d + 'T00:00:00');
    x.setDate(x.getDate() + days);
    return ymd(x);
  };
  const yrs = (d, y) => {
    const x = new Date(d + 'T00:00:00');
    x.setFullYear(x.getFullYear() + y);
    x.setDate(x.getDate() - 1);
    return ymd(x);
  };
  let sn = 0;
  const SER = p => {
    sn++;
    return p + '-' + ((((sn + 3) * 48271 + 17) % 899999) + 100000).toString(36).toUpperCase();
  };
  const add = (type, make, model, sp, date) => {
    cnt[type] = (cnt[type] || 0) + 1;
    const a = {
      id: 'AST-' + ++n,
      type,
      make,
      model,
      serial: SER(sp),
      tag: 'GM-' + CODE[type] + '-' + p2(0) + String(cnt[type]).padStart(2, '0'),
      status: 'In stock',
      cond: 'Good',
      holder: null,
      ack: true,
      purchased: date,
      warranty: ['Laptop', 'Monitor'].includes(type)
        ? yrs(date, 3)
        : ['Mobile phone', 'Handheld scanner'].includes(type)
          ? yrs(date, 2)
          : '',
      hist: [
        { t: 'Added', date, emp: null, cond: 'New', note: 'Added to inventory', by: 'Neha Kapoor' }
      ]
    };
    A.push(a);
    return a;
  };
  const issue = (a, e, date, note, cond) => {
    a.status = 'Assigned';
    a.holder = e.id;
    a.cond = 'Good';
    a.hist.push({
      t: 'Issued',
      date,
      emp: e.id,
      cond: cond || 'New',
      note: note || '',
      by: 'Neha Kapoor'
    });
  };
  const ret = (a, e, date, cond, note) => {
    a.hist.push({ t: 'Returned', date, emp: e.id, cond, note, by: 'Neha Kapoor' });
    a.holder = null;
    a.status = 'In stock';
  };
  const LAP = [
    ['Dell', 'Latitude 5440', 'DL5440'],
    ['Lenovo', 'ThinkPad T14 Gen 4', 'TP14G4'],
    ['HP', 'EliteBook 840 G10', 'HP840']
  ];
  const E_ = id => employees.find(x => x.id === id);
  employees.forEach((e, i) => {
    const j = e.join,
      plant = e.type === 'Plant',
      old = j < '2022-06-01';
    const idc = add('ID card', 'GMux', 'RFID photo ID card', 'IDC', shift(j, -5));
    issue(idc, e, j, '');
    const ac = add(
      'Access card',
      'HID',
      plant ? 'Plant gate access card' : 'Office proximity access card',
      'ACC',
      shift(j, -5)
    );
    if (e.id === 'E-1003') issue(ac, e, '2023-06-20', 'Replacement for a lost card');
    else issue(ac, e, j, '');
    if (!plant) {
      const m = LAP[i % 3];
      let pd = old ? '2023-' + p2((i % 9) + 1) + '-14' : shift(j, -10);
      if (e.id === 'E-1008') pd = '2023-11-14';
      if (e.id === 'E-1003') pd = '2024-02-20';
      const lp = add('Laptop', m[0], m[1], m[2], pd);
      issue(lp, e, e.id === 'E-1003' ? '2024-03-04' : shift(pd, 4), old ? 'Laptop refresh' : '');
      if (e.id === 'E-1010') lp.ack = false;
      issue(
        add('Keyboard & mouse', 'Logitech', 'MK270 wireless combo', 'LGM', shift(j, -3)),
        e,
        j,
        ''
      );
      if (['IT', 'Finance', 'HR & Admin'].includes(e.dept))
        issue(add('Monitor', 'Dell', 'P2422H 24-inch monitor', 'DLM', shift(j, -8)), e, j, '');
      if (e.dept === 'Sales' || (e.dept === 'HR & Admin' && e.id !== 'E-1001'))
        issue(add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', shift(j, -4)), e, j, '');
    }
    if (/Manager|Head|Supervisor/.test(e.title) || e.dept === 'Sales')
      issue(
        add('Mobile phone', 'Samsung', 'Galaxy A35 5G', 'SGA', shift(j, -2)),
        e,
        shift(j, 7),
        'With company SIM'
      );
    if (e.dept === 'Stores & Logistics')
      issue(
        add('Handheld scanner', 'Zebra', 'TC21 handheld scanner', 'ZBR', shift(j, -6)),
        e,
        j,
        ''
      );
  });
  // a little history so the issue and return trail is real
  const riya = E_('E-1003'),
    farah = E_('E-1014'),
    rahul = E_('E-1009');
  {
    const o = add('Laptop', 'HP', 'EliteBook 840 G9', 'HP840', '2022-01-03');
    issue(o, riya, '2022-01-10', '');
    ret(o, riya, '2024-03-02', 'Good', 'Replaced with a newer model');
    o.hist.push({
      t: 'Retired',
      date: '2024-04-10',
      emp: null,
      cond: 'Good',
      note: 'Removed from use',
      by: 'Neha Kapoor'
    });
    o.status = 'Retired';
  }
  {
    const o = add('Access card', 'HID', 'Office proximity access card', 'ACC', '2022-01-05');
    issue(o, riya, '2022-01-10', '');
    o.hist.push({
      t: 'Lost',
      date: '2023-06-19',
      emp: riya.id,
      cond: '',
      note: 'Reported lost, card blocked',
      by: 'Neha Kapoor'
    });
    o.holder = null;
    o.status = 'Lost';
  }
  {
    const o = add('Laptop', 'Lenovo', 'ThinkPad T470', 'TP470', '2018-03-05');
    issue(o, farah, '2018-03-12', '');
    ret(o, farah, '2023-04-18', 'Good', 'Replaced during the refresh');
    o.hist.push({
      t: 'Retired',
      date: '2023-05-02',
      emp: null,
      cond: 'Good',
      note: 'Removed from use',
      by: 'Neha Kapoor'
    });
    o.status = 'Retired';
  }
  {
    const lp = A.find(a => a.type === 'Laptop' && a.holder === 'E-1009');
    ret(lp, rahul, '2026-10-02', 'Fair', 'Battery swelling');
    lp.hist.push({
      t: 'Repair',
      date: '2026-10-02',
      emp: null,
      cond: 'Fair',
      note: 'Sent to the vendor for a battery replacement',
      by: 'Neha Kapoor'
    });
    lp.status = 'Repair';
    lp.cond = 'Fair';
    const lo = add('Laptop', 'Dell', 'Latitude 3440', 'DL3440', '2025-06-10');
    issue(lo, rahul, '2026-10-02', 'Loaner while the laptop is repaired', 'Good');
  }
  {
    const h = add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', '2026-09-20');
    issue(h, riya, '2026-10-05', '');
    h.ack = false;
  }
  // spare stock
  add('Laptop', 'Dell', 'Latitude 5440', 'DL5440', '2026-08-20');
  add('Laptop', 'Lenovo', 'ThinkPad T14 Gen 4', 'TP14G4', '2026-08-20');
  add('Mobile phone', 'Samsung', 'Galaxy A35 5G', 'SGA', '2026-08-20');
  for (let k = 0; k < 3; k++)
    add('Access card', 'HID', 'Office proximity access card', 'ACC', '2026-07-15');
  for (let k = 0; k < 2; k++) add('ID card', 'GMux', 'RFID photo ID card', 'IDC', '2026-07-15');
  for (let k = 0; k < 2; k++)
    add('Keyboard & mouse', 'Logitech', 'MK270 wireless combo', 'LGM', '2026-06-10');
  add('Monitor', 'Dell', 'P2422H 24-inch monitor', 'DLM', '2026-05-12');
  add('Headset', 'Jabra', 'Evolve2 40 headset', 'JBR', '2026-09-20');
  return A;
}
const HOLIDAYS = [
  { m: 9, d: 2, n: 'Gandhi Jayanti' },
  { m: 9, d: 20, n: 'Dussehra' },
  { m: 10, d: 8, n: 'Diwali' },
  { m: 11, d: 25, n: 'Christmas' }
];
const SHIFTS = {
  G: 'General 9:00–18:00',
  A: 'Morning 06:00–14:00',
  B: 'Afternoon 14:00–22:00',
  C: 'Night 22:00–06:00',
  O: 'Weekly off'
};
const S = {
  role: 'admin',
  loginRole: 'admin',
  authed: false,
  assets: seedAssets(),
  wished: {},
  attEmp: '',
  attDate: '',
  remember: true,
  reviews: {},
  candF: '',
  hist: [],
  calOff: 0,
  dayOv: {},
  regs: [
    {
      id: 1,
      emp: 'E-1004',
      date: '2026-10-06',
      type: 'Missed punch-out',
      in: '06:05',
      out: '14:10',
      reason: 'Forgot to punch out at the gate',
      status: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1012',
      date: '2026-10-05',
      type: 'Late mark waiver',
      in: '06:20',
      out: '14:05',
      reason: 'Bus breakdown on the highway',
      status: 'Pending'
    }
  ],
  lstep: 'creds',
  otp: {},
  creds: { admin: 'demo1234', manager: 'demo1234', employee: 'demo1234' },
  mustChange: { admin: false, manager: false, employee: true },
  sec: { twoFA: { admin: 1, manager: 1, employee: 0 }, minLen: 8, timeout: 30 },
  page: 'dashboard',
  tab: {},
  q: '',
  deptF: 'All',
  statF: 'All',
  view: 'list',
  collapsed: false,
  clock: { in: null, out: null, mode: 'Office' },
  leaves: [
    {
      id: 1,
      emp: 'E-1003',
      type: 'CL',
      from: '2026-10-12',
      to: '2026-10-13',
      days: 2,
      reason: 'Family function',
      status: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1004',
      type: 'SL',
      from: '2026-10-09',
      to: '2026-10-09',
      days: 1,
      reason: 'Fever',
      status: 'Pending'
    },
    {
      id: 3,
      emp: 'E-1008',
      type: 'EL',
      from: '2026-10-26',
      to: '2026-10-30',
      days: 5,
      reason: 'Vacation',
      status: 'Pending'
    },
    {
      id: 4,
      emp: 'E-1005',
      type: 'SL',
      from: '2026-10-06',
      to: '2026-10-09',
      days: 4,
      reason: 'Surgery recovery',
      status: 'Approved'
    },
    {
      id: 5,
      emp: 'E-1003',
      type: 'EL',
      from: '2026-08-17',
      to: '2026-08-19',
      days: 3,
      reason: 'Travel',
      status: 'Approved'
    },
    {
      id: 6,
      emp: 'E-1011',
      type: 'CL',
      from: '2026-09-14',
      to: '2026-09-14',
      days: 1,
      reason: 'Personal work',
      status: 'Rejected'
    }
  ],
  payStep: 1,
  cands: [
    { id: 1, n: 'Ishaan Malhotra', r: 'CNC Programmer', st: 0, src: 'Naukri' },
    { id: 2, n: 'Priya Bansal', r: 'HR Executive', st: 0, src: 'LinkedIn' },
    { id: 3, n: 'Gaurav Tiwari', r: 'CNC Programmer', st: 1, src: 'Referral' },
    { id: 4, n: 'Ayesha Khan', r: 'Safety Officer', st: 1, src: 'Naukri' },
    { id: 5, n: 'Rohit Saxena', r: 'CNC Programmer', st: 2, src: 'Agency' },
    { id: 6, n: 'Nisha Pillai', r: 'Safety Officer', st: 2, src: 'LinkedIn' },
    { id: 7, n: 'Karan Bedi', r: 'Sales Executive', st: 3, src: 'Referral' },
    { id: 8, n: 'Zoya Ansari', r: 'Accounts Executive', st: 4, src: 'Campus' }
  ],
  stages: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'],
  goals: [
    { id: 1, t: 'Close month-end books within 4 working days', p: 70, due: '2026-12-31' },
    { id: 2, t: 'Automate vendor payment reconciliation', p: 35, due: '2026-11-30' },
    { id: 3, t: 'Complete GST compliance certification', p: 90, due: '2026-10-31' }
  ],
  roster: {},
  incidents: [
    {
      id: 'INC-031',
      type: 'Near miss',
      loc: 'Press Shop',
      sev: 'Medium',
      date: '2026-10-05',
      by: 'Aditya Rao',
      st: 'Investigating',
      d: 'Guard interlock failed during die change; operator stepped back in time.'
    },
    {
      id: 'INC-030',
      type: 'First aid',
      loc: 'Assembly Line 2',
      sev: 'Low',
      date: '2026-09-28',
      by: 'Sunita Devi',
      st: 'Closed',
      d: 'Minor hand cut treated at dispensary.'
    },
    {
      id: 'INC-029',
      type: 'Property damage',
      loc: 'Stores Yard',
      sev: 'Low',
      date: '2026-09-19',
      by: 'Vikram Singh',
      st: 'Closed',
      d: 'Forklift clipped rack end; no injuries.'
    },
    {
      id: 'INC-028',
      type: 'Lost time',
      loc: 'Welding Bay',
      sev: 'High',
      date: '2026-08-22',
      by: 'Arjun Mehta',
      st: 'Closed',
      d: 'Wrist sprain, 3 days lost. Fixture redesigned.'
    }
  ],
  courses: [
    { n: 'Fire safety and evacuation', req: 'Plant', done: 92, exp: '2027-02-14' },
    { n: 'Forklift operation licence', req: 'Stores', done: 78, exp: '2026-11-05' },
    { n: 'Lockout / tagout (LOTO)', req: 'Maintenance', done: 85, exp: '2026-12-01' },
    { n: 'First aid and CPR', req: 'Plant', done: 64, exp: '2026-10-28' },
    { n: 'POSH awareness', req: 'All staff', done: 97, exp: '2027-04-01' },
    { n: 'Information security basics', req: 'Office', done: 88, exp: '2027-01-20' }
  ],
  mine: {
    'Fire safety and evacuation': 100,
    'POSH awareness': 100,
    'Information security basics': 60
  },
  claims: [
    {
      id: 1,
      emp: 'E-1003',
      cat: 'Travel',
      amt: 2450,
      date: '2026-10-03',
      note: 'Client visit, Faridabad',
      st: 'Pending'
    },
    {
      id: 2,
      emp: 'E-1008',
      cat: 'Meals',
      amt: 1180,
      date: '2026-10-01',
      note: 'Customer lunch',
      st: 'Approved'
    },
    {
      id: 3,
      emp: 'E-1004',
      cat: 'Fuel',
      amt: 900,
      date: '2026-09-29',
      note: 'Site visit, two-wheeler',
      st: 'Pending'
    },
    {
      id: 4,
      emp: 'E-1003',
      cat: 'Internet',
      amt: 699,
      date: '2026-09-12',
      note: 'Broadband, September',
      st: 'Approved'
    }
  ],
  tickets: [
    {
      id: 'REQ-118',
      emp: 'E-1003',
      cat: 'Salary certificate',
      pr: 'Normal',
      st: 'In progress',
      d: '2026-10-06'
    },
    {
      id: 'REQ-117',
      emp: 'E-1009',
      cat: 'IT support: laptop battery',
      pr: 'High',
      st: 'Submitted',
      d: '2026-10-06'
    },
    {
      id: 'REQ-112',
      emp: 'E-1003',
      cat: 'Address proof letter',
      pr: 'Normal',
      st: 'Resolved',
      d: '2026-09-20'
    }
  ],
  notifs: [
    {
      t: '2 leave requests are waiting for your approval',
      s: 'Riya Verma and Sandeep Yadav',
      time: 'Just now',
      u: 1,
      p: 'leave'
    },
    {
      t: 'Incident INC-031 needs an investigation report',
      s: 'Press Shop · Near miss',
      time: '2 hours ago',
      u: 1,
      p: 'safety'
    },
    {
      t: 'October payroll is ready for review',
      s: 'Attendance is locked for 16 employees',
      time: 'Yesterday',
      u: 1,
      p: 'payroll'
    },
    {
      t: 'First aid certificates expire Oct 28',
      s: '14 employees need renewal',
      time: 'Yesterday',
      u: 0,
      p: 'training'
    }
  ],
  perms: {
    Employees: [1, 1, 0],
    Attendance: [1, 1, 1],
    'Leave approvals': [1, 1, 0],
    Payroll: [1, 0, 1],
    Recruitment: [1, 0, 0],
    'Performance reviews': [1, 1, 1],
    'Shift roster': [1, 1, 0],
    'Safety incidents': [1, 1, 1],
    Reports: [1, 1, 0],
    Settings: [1, 0, 0],
    'Assets and equipment': [1, 1, 1]
  }
};
(function () {
  const plant = employees.filter(e => e.type === 'Plant'),
    base = ['G', 'A', 'A', 'B', 'B', 'C', 'A', 'B', 'C'];
  plant.forEach((e, i) => {
    S.roster[e.id] = [0, 1, 2, 3, 4, 5, 6].map(d =>
      d === 6 ? 'O' : d === 5 && i % 3 === 0 ? 'O' : base[i % base.length]
    );
  });
  S.roster['E-1004'][6] = 'A';
  S.roster['E-1011'][6] = 'B';
  S.roster['E-1004'][2] = 'C';
})();

/* js/core/page-registry.js */
/* =============== navigation =============== */
const PG = {
  dashboard: ['Dashboard', 'home'],
  employees: ['Employees', 'users'],
  attendance: ['Attendance', 'clock'],
  hours: ['Hours & overtime', 'chart'],
  leave: ['Leave', 'cal'],
  payroll: ['Payroll', 'wallet'],
  recruit: ['Recruitment', 'brief'],
  performance: ['Performance', 'target'],
  roster: ['Shift roster', 'grid'],
  safety: ['Safety', 'shield'],
  training: ['Training', 'book'],
  reports: ['Reports', 'chart'],
  requests: ['Requests', 'receipt'],
  settings: ['Settings', 'sliders'],
  profile: ['My profile', 'user'],
  assets: ['Assets', 'laptop'],
  approvals: ['Approvals', 'approve'],
  org: ['Organization', 'orgchart'],
  lifecycle: ['Joiners & leavers', 'swap'],
  audit: ['Audit log', 'list']
};
const LBL = {
  manager: { employees: 'My team', assets: 'Team assets', payroll: 'My payslips' },
  employee: { dashboard: 'Home', payroll: 'Payslips', performance: 'Goals' }
};
const shortLbl = id =>
  S.role === 'manager' && id === 'employees' ? 'Team' : label(id).split(' ')[0];
const label = id => (LBL[S.role] && LBL[S.role][id]) || PG[id][0];

/* js/components/overlay.js */
/* =============== overlay system =============== */
let lastFocus = null,
  ddOpen = null,
  crumbOpen = null;
function overlay(title, body, foot, o = {}) {
  if (!$('#layer .ov')) lastFocus = document.activeElement;
  const re = !!$('#layer .ov'); // swapping content inside an open overlay: no re-animation
  const hdr = o.bare
    ? ''
    : `<div class="mh"><span class="grab"></span><h2>${esc(title)}</h2>${o.lock ? '' : `<button class="icon-btn mx" onclick="dismissModal()" aria-label="Close">${ic('x', 18)}</button>`}</div>`;
  $('#layer').innerHTML =
    `<div class="ov ${re ? 're' : ''} ${o.side ? 'drawer' : ''} ${o.cmd ? 'pal' : ''}" ${o.lock ? 'data-lock="1"' : 'onmousedown="if(event.target===this)dismissModal()"'}><div class="modal${o.wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}">${hdr}<div class="mb" ${o.bare ? 'style="padding:0"' : ''}>${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}</div></div>`;
  lockPage();
  {
    const m = $('#layer .modal'),
      sc = m && m.querySelector('.mb');
    if (m && sc) {
      const upd = () => {
        m.classList.toggle('st', sc.scrollTop > 2);
        m.classList.toggle('sb', sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2);
        if (sc.scrollHeight > sc.clientHeight + 1) {
          sc.tabIndex = 0;
          sc.setAttribute('role', 'region');
          sc.setAttribute('aria-label', title + ' content');
        } else {
          sc.removeAttribute('tabindex');
          sc.removeAttribute('role');
          sc.removeAttribute('aria-label');
        }
      };
      sc.addEventListener('scroll', upd, { passive: true });
      upd();
      setTimeout(upd, 80);
      setTimeout(upd, 300);
    }
  }
  if (!o.bare && !o.lock && isMobileUI()) {
    const m = $('#layer .modal'),
      h = $('#layer .mh');
    if (m && h) attachSwipe(m, h, dismissModal);
  }
  if (!o.keepFocus) {
    const f =
      $('#layer [autofocus]') ||
      $('#layer input:not([type=checkbox]), #layer select, #layer textarea') ||
      $('#layer .mh button');
    if (f) f.focus();
  }
}
function lockPage() {
  if (document.body.style.overflow === 'hidden') return;
  const w = innerWidth - document.documentElement.clientWidth; // width of the page scrollbar about to disappear
  document.body.style.overflow = 'hidden';
  if (w > 0) document.documentElement.style.paddingRight = w + 'px';
}
function unlockPage() {
  document.body.style.overflow = '';
  document.documentElement.style.paddingRight = '';
}
function closeModal() {
  S.dayOpen = null;
  $('#layer').innerHTML = '';
  unlockPage();
  if (lastFocus && document.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
  lastFocus = null;
}
document.addEventListener('keydown', e => {
  if (ddOpen) return;
  if (
    e.key === '?' &&
    S.authed &&
    !$('#layer .ov') &&
    !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName || '') &&
    !e.target.isContentEditable
  ) {
    e.preventDefault();
    showKeys();
    return;
  }
  if (e.altKey && e.key === 'ArrowLeft' && S.authed && S.hist.length && !$('#layer .ov')) {
    e.preventDefault();
    back();
    return;
  }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCmd();
    return;
  }
  const ovs = document.querySelectorAll('#layer .ov'),
    ov = ovs[ovs.length - 1];
  if (!ov) return;
  if (e.key === 'Escape') {
    if (ov.id === 'discard') {
      keepEditing();
      return;
    }
    if (!ov.dataset.lock) dismissModal();
    return;
  }
  if (e.key === 'Tab') {
    const f = [
      ...ov.querySelectorAll(
        'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex="0"]'
      )
    ].filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const a = f[0],
      z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      z.focus();
    } else if (!e.shiftKey && document.activeElement === z) {
      e.preventDefault();
      a.focus();
    }
  }
});
function toast(m, undo, kind) {
  buzz();
  const t = document.createElement('div'),
    act = kind && kind.label ? kind : null,
    err = kind === 'err';
  t.className = 'toast' + (err ? ' err' : '');
  t.innerHTML = `${ic(err ? 'alert' : 'check', 16)}<span>${esc(m)}</span>${undo ? '<button class="tbtn">Undo</button>' : ''}${act ? `<button class="tbtn">${esc(act.label)}</button>` : ''}`;
  if (undo)
    t.querySelector('button').onclick = () => {
      undo();
      t.remove();
    };
  if (act)
    t.querySelector('button').onclick = () => {
      act.fn();
      t.remove();
    };
  $('#toasts').appendChild(t);
  setTimeout(() => t.remove(), undo ? 5500 : act || err ? 6500 : 3000);
}
let FIRST_BAD = null;
function chk(id, ok, msg) {
  const el = $('#' + id),
    er = $('#' + id + '-e');
  if (el) {
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (er) el.setAttribute('aria-describedby', er.id);
  }
  if (er) er.textContent = ok ? '' : msg;
  if (!ok && el && !FIRST_BAD) {
    FIRST_BAD = el;
    setTimeout(() => {
      FIRST_BAD = null;
    }, 0);
    const t = (el.parentElement && el.parentElement.querySelector('.dd-btn')) || el;
    try {
      t.focus({ preventScroll: false });
    } catch (e) {}
  } // the first invalid field takes focus so screen readers land on the error
  return ok;
}
const fld = (id, label, inner, cls = '') =>
  `<div class="field ${cls}"><label for="${id}">${label}</label>${inner}<div class="err" id="${id}-e" role="alert"></div></div>`;

/* js/core/storage.js */
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

/* js/components/dropdowns.js */
/* =============== themed dropdowns, scroll hints, swipe =============== */
const isMobileUI = () => innerWidth <= 900 || matchMedia('(pointer:coarse)').matches;
function ddLabel(sel) {
  let t = sel.getAttribute('aria-label');
  if (!t && sel.id) {
    const l = document.querySelector(`label[for="${sel.id}"]`);
    if (l) t = l.textContent.trim();
  }
  if (!t) {
    const l = sel.closest('.field');
    const lb = l && l.querySelector('label');
    if (lb) t = lb.textContent.trim();
  }
  return t || 'Choose an option';
}
function enhanceSelect(sel) {
  if (sel.dataset.enh) return;
  sel.dataset.enh = '1';
  const wrap = document.createElement('div');
  wrap.className = 'dd' + (sel.classList.contains('sel') ? ' dd-s' : '');
  sel.parentNode.insertBefore(wrap, sel);
  wrap.appendChild(sel);
  sel.classList.add('dd-native');
  sel.tabIndex = -1;
  sel.setAttribute('aria-hidden', 'true');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'dd-btn';
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="dd-t"></span>' + ic('chev', 16);
  if (sel.id) {
    btn.id = sel.id + '-dd';
    const l = document.querySelector(`label[for="${sel.id}"]`);
    if (l)
      l.addEventListener('click', e => {
        e.preventDefault();
        btn.focus();
      });
  }
  wrap.appendChild(btn);
  const sync = () => {
    const o = sel.options[sel.selectedIndex];
    btn.firstChild.textContent = o ? o.textContent : '';
    btn.disabled = sel.disabled;
    btn.setAttribute('aria-label', ddLabel(sel) + ': ' + (o ? o.textContent : ''));
  };
  sync();
  const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  Object.defineProperty(sel, 'value', {
    get() {
      return d.get.call(this);
    },
    set(v) {
      d.set.call(this, v);
      sync();
    },
    configurable: true
  });
  sel.addEventListener('change', sync);
  btn.onclick = () => ddToggle(sel, btn, sync);
  btn.onkeydown = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      ddToggle(sel, btn, sync);
    }
  };
}
function ddClose(focusBtn) {
  if (!ddOpen) return;
  const o = ddOpen;
  ddOpen = null;
  o.pop.remove();
  document.removeEventListener('keydown', ddKeys, true);
  document.removeEventListener('mousedown', o.out, true);
  removeEventListener('resize', o.rs);
  removeEventListener('scroll', o.sc, true);
  o.btn.setAttribute('aria-expanded', 'false');
  if (focusBtn && document.contains(o.btn)) o.btn.focus();
}
function ddAct(i) {
  const o = ddOpen;
  if (!o) return;
  o.act = i;
  o.list.querySelectorAll('.dd-o').forEach((el, k) => el.classList.toggle('act', k === i));
  o.list.setAttribute('aria-activedescendant', 'ddo' + i);
  const el = o.list.children[i];
  if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
}
function ddKeys(e) {
  const o = ddOpen;
  if (!o) return;
  const n = o.opts.length;
  const move = d => {
    let i = o.act,
      g = 0;
    do {
      i = (i + d + n) % n;
      g++;
    } while (o.opts[i].disabled && g < n);
    ddAct(i);
  };
  const eat = () => {
    e.preventDefault();
    e.stopPropagation();
  };
  if (e.key === 'ArrowDown') {
    eat();
    move(1);
  } else if (e.key === 'ArrowUp') {
    eat();
    move(-1);
  } else if (e.key === 'Home') {
    eat();
    ddAct(0);
  } else if (e.key === 'End') {
    eat();
    ddAct(n - 1);
  } else if (e.key === 'Enter' || e.key === ' ') {
    eat();
    o.pick(o.act);
  } else if (e.key === 'Escape') {
    eat();
    ddClose(true);
  } else if (e.key === 'Tab') {
    ddClose();
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    o.buf = (o.buf || '') + e.key.toLowerCase();
    clearTimeout(o.bt);
    o.bt = setTimeout(() => (o.buf = ''), 600);
    const i = o.opts.findIndex(x => x.textContent.trim().toLowerCase().startsWith(o.buf));
    if (i >= 0) ddAct(i);
  }
}
function ddToggle(sel, btn, sync) {
  if (ddOpen) {
    const same = ddOpen.btn === btn;
    ddClose();
    if (same) return;
  }
  const mob = isMobileUI(),
    opts = [...sel.options],
    cur = Math.max(0, sel.selectedIndex);
  const item = (o, i) =>
    `<div class="dd-o${i === cur ? ' sel' : ''}${o.disabled ? ' dis' : ''}" role="option" id="ddo${i}" data-i="${i}" aria-selected="${i === cur}">${esc(o.textContent)}<span class="dd-ck">${ic('check', 16)}</span></div>`;
  const pop = document.createElement('div'),
    lab = ddLabel(sel);
  pop.innerHTML = mob
    ? `<div class="dd-sheet" role="dialog" aria-modal="true" aria-label="${esc(lab)}"><span class="grab"></span><div class="dd-sh">${esc(lab)}</div><div class="dd-list" role="listbox" tabindex="0">${opts.map(item).join('')}</div></div>`
    : `<div class="dd-list" role="listbox" tabindex="0" aria-label="${esc(lab)}">${opts.map(item).join('')}</div>`;
  pop.className = mob ? 'dd-sheet-ov' : 'dd-pop';
  document.body.appendChild(pop);
  const list = pop.querySelector('.dd-list');
  const pick = i => {
    if (opts[i].disabled) return;
    sel.selectedIndex = i;
    sync();
    ddClose(true);
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const out = e => {
    if (!pop.contains(e.target) && !btn.contains(e.target)) ddClose();
  };
  const rs = () => ddClose(),
    sc = e => {
      if (!pop.contains(e.target)) ddClose();
    };
  ddOpen = { pop, btn, list, opts, act: cur, pick, out, rs, sc };
  btn.setAttribute('aria-expanded', 'true');
  list.onclick = e => {
    const el = e.target.closest('.dd-o');
    if (el) pick(+el.dataset.i);
  };
  list.onmousemove = e => {
    const el = e.target.closest('.dd-o');
    if (el && +el.dataset.i !== ddOpen.act) ddAct(+el.dataset.i);
  };
  document.addEventListener('keydown', ddKeys, true);
  if (mob) {
    pop.onclick = e => {
      if (e.target === pop) ddClose(true);
    };
    attachSwipe(pop.querySelector('.dd-sheet'), pop.querySelector('.dd-sh'), () => ddClose(true));
  } else {
    document.addEventListener('mousedown', out, true);
    addEventListener('resize', rs);
    addEventListener('scroll', sc, true);
    const r = btn.getBoundingClientRect();
    pop.style.minWidth = Math.max(r.width, 180) + 'px';
    const h = pop.offsetHeight,
      w = pop.offsetWidth,
      below = innerHeight - r.bottom - 10,
      above = r.top - 10;
    const up = h > below && above > below;
    list.style.maxHeight = Math.max(140, Math.min(300, (up ? above : below) - 14)) + 'px';
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px';
    pop.style[up ? 'bottom' : 'top'] = (up ? innerHeight - r.top + 6 : r.bottom + 6) + 'px';
  }
  list.focus();
  ddAct(cur);
}
/* swipe-down to close a bottom sheet */
const swipeMath = {
  rub: d => (d < 0 ? -Math.pow(-d, 0.6) * 1.2 : d),
  dismiss: (dy, v, h) => dy > h * 0.3 || v > 0.6
}; // elastic when dragged up; closes on distance (30%) or on a quick flick
function attachSwipe(panel, handle, close) {
  let y0 = null,
    dy = 0,
    last = 0,
    lastT = 0,
    v = 0;
  handle.addEventListener(
    'touchstart',
    e => {
      y0 = e.touches[0].clientY;
      dy = 0;
      last = y0;
      lastT = performance.now();
      v = 0;
      panel.style.transition = 'none';
    },
    { passive: true }
  );
  handle.addEventListener(
    'touchmove',
    e => {
      if (y0 == null) return;
      const y = e.touches[0].clientY,
        now = performance.now();
      dy = y - y0;
      v = (y - last) / Math.max(1, now - lastT);
      last = y;
      lastT = now;
      panel.style.transform = `translateY(${swipeMath.rub(dy)}px)`;
    },
    { passive: true }
  );
  handle.addEventListener('touchend', () => {
    if (y0 == null) return;
    y0 = null;
    const out = swipeMath.dismiss(dy, v, panel.getBoundingClientRect().height);
    panel.style.transition = out
      ? 'transform .22s cubic-bezier(.4,0,1,1)'
      : 'transform .3s cubic-bezier(.2,1.2,.4,1)';
    if (out) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(close, 200);
    } else panel.style.transform = '';
  });
}
/* edge-fade hints for horizontal scrollers (styled on touch devices only) */
const HS = '.tabs,.ut,.kan,.attn,.statrow,.tw',
  hsSet = new Set();
function hsUpdate(el) {
  const l = el.scrollLeft > 2,
    r = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  el.classList.toggle('sh-l', l);
  el.classList.toggle('sh-r', r);
  if (el.classList.contains('kan')) kdots(el);
  if (el.classList.contains('tw')) {
    const sc =
      el.scrollWidth > el.clientWidth + 1 ||
      el.scrollHeight > el.clientHeight + 1 ||
      el.classList.contains('vs');
    if (sc) {
      el.tabIndex = 0;
      el.setAttribute('role', 'region');
      el.setAttribute('aria-label', 'Scrollable table');
    } else if (el.getAttribute('role') === 'region') {
      el.removeAttribute('tabindex');
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  }
}
function hsInit(el) {
  if (el.dataset.hs) return;
  el.dataset.hs = '1';
  hsSet.add(el);
  el.addEventListener('scroll', () => hsUpdate(el), { passive: true });
  if (window.ResizeObserver) new ResizeObserver(() => hsUpdate(el)).observe(el);
}
function kdots(el) {
  const d = document.querySelector('#kdots');
  if (!d) return;
  const w = (el.children[0] ? el.children[0].offsetWidth : 1) + 12,
    i = Math.min(4, Math.round(el.scrollLeft / w));
  d.querySelectorAll('button').forEach((b, k) => {
    b.classList.toggle('on', k === i);
    b.setAttribute('aria-current', k === i ? 'true' : 'false');
  });
}
function kanGo(i) {
  const k = document.querySelector('.kan');
  if (k)
    k.scrollTo({
      left: i * ((k.children[0] ? k.children[0].offsetWidth : 0) + 12),
      behavior: 'smooth'
    });
}
let enhQ = false;
function enhanceAll() {
  document.querySelectorAll('table:not([aria-label])').forEach(t => {
    const card = t.closest('.card'),
      h = card && card.querySelector('h2'),
      mh = t.closest('.modal') && t.closest('.modal').querySelector('h2,.mh b'),
      v = document.querySelector('#view h1');
    t.setAttribute(
      'aria-label',
      (
        ((h && h.textContent) || (mh && mh.textContent) || (v && v.textContent) || 'Table') + ''
      ).trim()
    );
  });
  document.querySelectorAll('select:not([data-enh])').forEach(enhanceSelect);
  document.querySelectorAll(HS).forEach(hsInit);
  hsSet.forEach(el => {
    if (!el.isConnected) hsSet.delete(el);
    else hsUpdate(el);
  });
}
function initEnhance() {
  new MutationObserver(() => {
    if (enhQ) return;
    enhQ = true;
    queueMicrotask(() => {
      enhQ = false;
      enhanceAll();
    });
  }).observe(document.body, { childList: true, subtree: true });
  enhanceAll();
}

/* js/layout/shell.js */
/* =============== shell =============== */
/* navigation history: every move to a new page or sub-view remembers where you came from */
const snap = () => ({
  page: S.page,
  tab: { ...S.tab },
  q: S.q,
  deptF: S.deptF,
  statF: S.statF,
  rday: S.rday
});
function pushHist() {
  S.hist.push(snap());
  if (S.hist.length > 25) S.hist.shift();
}
function openSub(k, v) {
  closeModal();
  pushHist();
  S.tab[k] = v;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
}
function back() {
  const h = S.hist.pop();
  if (!h) return;
  closeModal();
  ddClose();
  S.page = h.page;
  S.tab = h.tab;
  S.q = h.q;
  S.deptF = h.deptF;
  S.statF = h.statF;
  S.rday = h.rday;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
  enterView();
}
function enterView() {
  const v = $('#view');
  v.classList.remove('enter');
  void v.offsetWidth;
  v.classList.add('enter');
}
const ping = el => {
  if (!el) return;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 450);
};
const buzz = () => {
  try {
    if (navigator.vibrate) navigator.vibrate(12);
  } catch (e) {}
};
function drawChrome() {
  const nav = navFor(),
    u = me(),
    badge = {
      leave: pendingLv().length,
      safety: S.incidents.filter(i => i.st !== 'Closed').length
    };
  const btn = id => {
    const n = badge[id] && isMgr() ? `<span class="bd">${badge[id]}</span>` : '';
    return `<button class="nav-btn ${S.page === id ? 'on' : ''}" onclick="go('${id}')" title="${label(id)}" ${S.page === id ? 'aria-current="page"' : ''}>${ic(PG[id][1])}<span class="nl">${label(id)}</span>${n}</button>`;
  };
  $('#side').innerHTML =
    `<button class="logo" onclick="go('dashboard')" aria-label="PeopleDesk, go to dashboard">${logoTile(36)}${logoWord(17)}</button>` +
    `<div class="side-nav-scroll">${nav
      .map(
        ([g, ids]) => (nav.length > 1 ? `<div class="gl-t">${g}</div>` : '') + ids.map(btn).join('')
      )
      .join('')}</div>`;
  const mob = mobFor(),
    rest = flat().filter(x => !mob.includes(x));
  $('#bnav').innerHTML =
    mob
      .map(
        id =>
          `<button class="${S.page === id ? 'on' : ''}" onclick="go('${id}')" ${S.page === id ? 'aria-current="page"' : ''}><span class="bi">${ic(PG[id][1], 22)}</span>${shortLbl(id)}</button>`
      )
      .join('') +
    `<button class="${rest.includes(S.page) ? 'on' : ''}" onclick="moreMenu()"><span class="bi">${ic('more', 22)}</span>More</button>`;
  const bk = S.hist.length ? S.hist[S.hist.length - 1] : null;
  $('#mlogo').innerHTML = bk
    ? `<button class="icon-btn mback" onclick="back()" aria-label="Back to ${esc(label(bk.page))}">${ic('arrow', 20)}</button>`
    : logoTile(34) + '<span class="mt">' + logoWord(15) + '</span>';
  $('#role').innerHTML = PERSONAS.map(p => `<option value="${p.k}">${p.n}</option>`).join('');
  $('#role').value = S.persona;
  $('#rolechip').innerHTML = `<span>${persona().n}</span>${ic('chev', 14)}`;
  $('#rolechip').setAttribute('aria-label', persona().n + ', previewing as. Change preview');
  $('#theme').innerHTML = ic(isDark() ? 'sun' : 'moon', 18);
  $('#avbtn').innerHTML = av(u.name, 36);
  $('#avbtn').setAttribute('aria-label', initials(u.name) + ' account menu');
  const unread = S.notifs.filter(n => n.u && notifOk(n)).length,
    bd = $('#bdot');
  bd.hidden = !unread;
  bd.textContent = unread > 9 ? '9+' : unread;
  $('#bell').setAttribute(
    'aria-label',
    unread ? `Notifications, ${unread} unread` : 'Notifications'
  );
  $('#app').classList.toggle('col', S.collapsed);
  document.documentElement.style.setProperty('--tbh', ($('.top').offsetHeight || 56) + 'px');
  $('#collapse').innerHTML = ic('panel', 18);
}
const logoMark = h =>
  `<svg width="${((h * 194.9) / 243.1).toFixed(1)}" height="${h}" viewBox="0 0 194.9 243.1" aria-hidden="true"><use href="#pd-mark"/></svg>`;
const logoWord = h =>
  `<span class="lw"><svg width="${((h * 889.7) / 156.1).toFixed(1)}" height="${h}" viewBox="0 0 889.7 156.1" aria-hidden="true"><use href="#pd-word"/></svg></span>`;
const logoTile = s =>
  `<span class="ltile" style="width:${s}px;height:${s}px">${logoMark(Math.round(s * 0.62))}</span>`;
const coMark = s =>
  `<span class="ltile co" style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.34)}px">GM</span>`;
function moreMenu() {
  const mob = mobFor();
  const gs = navFor()
    .map(([g, ids]) => [g, ids.filter(x => !mob.includes(x))])
    .filter(x => x[1].length);
  overlay(
    'All modules',
    gs
      .map(
        ([g, ids]) =>
          `<div class="mnav-g">${g}</div><div class="mnav">${ids.map(id => `<button onclick="go('${id}')">${ic(PG[id][1], 24)}${label(id)}</button>`).join('')}</div>`
      )
      .join('')
  );
}
function isDark() {
  const t = document.documentElement.dataset.theme;
  return t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('pd-theme', t);
  } catch (e) {}
  $('#theme').innerHTML = ic(t === 'dark' ? 'sun' : 'moon', 18);
  const lt = $('.lg-theme');
  if (lt) lt.innerHTML = ic(t === 'dark' ? 'sun' : 'moon', 18);
}
function showKeys() {
  const rows = [
    ['Search people and pages', '<kbd>Ctrl</kbd> <kbd>K</kbd>'],
    ['Go back to the previous page', '<kbd>Alt</kbd> <kbd>←</kbd>'],
    ['Show this list', '<kbd>?</kbd>'],
    ['Close a dialog or dropdown', '<kbd>Esc</kbd>'],
    ['Move through dropdown options', '<kbd>↑</kbd> <kbd>↓</kbd>'],
    ['Choose the highlighted option', '<kbd>Enter</kbd>'],
    ['Jump to a dropdown option by typing', '<kbd>A</kbd>–<kbd>Z</kbd>']
  ];
  overlay(
    'Keyboard shortcuts',
    `<div class="keys list">${rows.map(([a, k]) => `<div class="li"><span class="grow">${a}</span><span>${k}</span></div>`).join('')}</div>`,
    `<button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function account() {
  const u = me(),
    tf = S.sec.twoFA.hr;
  overlay(
    'Account',
    `<div class="acct"><div class="acct-hero"><span class="acct-av">${av(u.name, 68)}</span><b class="acct-n">${esc(u.name)}</b><span class="acct-t">${esc(u.title)}</span><div class="chips2 ctr">${chip(u.id, 'mute', 1)}${chip('Viewing as ' + roleName(S.role), 'info', 1)}</div><button class="btn sm" onclick="closeModal();go('profile')">${ic('user', 14)}View full profile</button></div>
   <div class="sec"><div class="sec-t">Preview as</div>${roleCards(S.persona, 'switchRole')}</div>
   <div class="sec"><div class="sec-t">Security and preferences</div><div class="grp">
    <div class="li"><span class="ai t-green">${ic('shield', 16)}</span><div class="grow"><b>Two-step verification</b><div class="muted small">A code is asked for when you sign in</div></div>${chip(tf ? 'On' : 'Off', tf ? 'ok' : 'mute')}</div>
    <div class="li"><span class="ai t-amber">${ic('key', 16)}</span><div class="grow"><b>Password</b><div class="muted small">Use a strong password you do not reuse</div></div><button class="btn sm" onclick="changePw()">Change</button></div>
    <div class="li"><span class="ai t-violet">${ic('moon', 16)}</span><div class="grow"><b>Dark mode</b><div class="muted small">Easier on the eyes at night</div></div><label class="sw"><input type="checkbox" ${isDark() ? 'checked' : ''} onchange="setTheme(this.checked?'dark':'light')" aria-label="Dark mode"><span></span></label></div>
    <div class="li desk"><span class="ai t-brand">${ic('list', 16)}</span><div class="grow"><b>Keyboard shortcuts</b><div class="muted small">Press ? anywhere to see them</div></div><button class="btn sm" onclick="showKeys()">View</button></div></div></div></div>`,
    `<button class="btn bad so-l" onclick="signOut()">${ic('logout', 16)}Sign out</button><button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function openNotifs() {
  overlay(
    'Notifications',
    `<div>${S.notifs.map((n, i) => (notifOk(n) ? `<div class="ntf" role="button" tabindex="0" style="cursor:pointer" onclick="S.notifs[${i}].u=0;go('${n.emp ? n.p || 'dashboard' : isMgr() || n.p === 'payroll' ? n.p : 'dashboard'}')" onkeydown="if(event.key==='Enter')this.click()"><span class="u ${n.u ? '' : 'r'}"></span><div class="grow"><b>${n.t}</b><div class="muted small">${n.s} · ${n.time}</div></div></div>` : '')).join('') || '<div class="empty"><b>No notifications</b>Nothing needs your attention.</div>'}</div>`,
    `<button class="btn" onclick="S.notifs.forEach(n=>n.u=0);closeModal();render();toast('All notifications marked as read')">Mark all as read</button>`,
    { side: true }
  );
}
/* command palette */
let cmdIdx = 0,
  cmdItems = [];
function openCmd() {
  overlay(
    'Search',
    `<input id="cq" class="cmd-in" placeholder="Search, or type &gt; for actions" autocomplete="off" aria-label="Search" autofocus><div id="cr" class="cmd-list"></div>`,
    null,
    { cmd: true, bare: true }
  );
  cmdRender('');
  const i = $('#cq');
  i.oninput = e => {
    cmdIdx = 0;
    cmdRender(e.target.value);
  };
  i.onkeydown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdIdx = Math.min(cmdIdx + 1, cmdItems.length - 1);
      cmdPaint();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdIdx = Math.max(cmdIdx - 1, 0);
      cmdPaint();
    } else if (e.key === 'Enter' && cmdItems[cmdIdx]) {
      e.preventDefault();
      cmdRun(cmdIdx);
    }
  };
}
const ACTIONS = () => [
  {
    t: 'Apply for leave',
    i: 'cal',
    fn: () => {
      closeModal();
      go('leave');
      applyLeave();
    }
  },
  {
    t: S.clock.in && !S.clock.out ? 'Clock out' : 'Clock in',
    i: 'clock',
    fn: () => {
      closeModal();
      toggleClock();
    }
  },
  ...[
    can('employees', 'create') && {
      t: 'Add employee',
      i: 'plus',
      fn: () => {
        closeModal();
        go('employees');
        addEmp();
      }
    },
    can('recruit', 'create') && {
      t: 'Add candidate',
      i: 'plus',
      fn: () => {
        closeModal();
        go('recruit');
        addCand();
      }
    },
    can('assets', 'create') && {
      t: 'Add asset',
      i: 'plus',
      fn: () => {
        closeModal();
        go('assets');
        addAsset();
      }
    },
    can('lifecycle', 'create') && {
      t: 'Start offboarding',
      i: 'userplus',
      fn: () => {
        closeModal();
        go('lifecycle');
        startOff();
      }
    },
    can('approvals', 'view') && {
      t: 'Open approvals',
      i: 'inbox',
      fn: () => {
        closeModal();
        go('approvals');
      }
    },
    isMgr() && {
      t: 'Delegate my approvals',
      i: 'users',
      fn: () => {
        closeModal();
        delegOpen();
      }
    }
  ].filter(Boolean),
  {
    t: 'Download latest payslip',
    i: 'download',
    fn: () => {
      closeModal();
      downloadPayslip(me().id, 'September 2026');
    }
  },
  {
    t: isDark() ? 'Switch to light mode' : 'Switch to dark mode',
    i: isDark() ? 'sun' : 'moon',
    fn: () => {
      closeModal();
      setTheme(isDark() ? 'light' : 'dark');
    }
  },
  {
    t: 'Sign out',
    i: 'logout',
    fn: () => {
      closeModal();
      signOut();
    }
  }
];
function cmdRender(q0) {
  const raw = q0.trim(),
    act = raw.startsWith('>'),
    q = (act ? raw.slice(1) : raw).trim().toLowerCase();
  const actions = ACTIONS()
    .filter(a => !q || a.t.toLowerCase().includes(q))
    .map(a => ({ g: 'Actions', t: a.t, s: 'Run action', i: a.i, fn: a.fn }));
  if (act) {
    cmdItems = actions.slice(0, 9);
    cmdPaint();
    return;
  }
  const pages = flat()
    .filter(id => !q || label(id).toLowerCase().includes(q))
    .map(id => ({ g: 'Pages', t: label(id), s: 'Go to page', i: PG[id][1], fn: () => go(id) }));
  const ppl = (
    isMgr() && q
      ? scoped().filter(e => (e.name + e.title + e.dept + e.id).toLowerCase().includes(q))
      : []
  )
    .slice(0, 5)
    .map(e => ({
      g: 'People',
      t: e.name,
      s: e.title + ' · ' + e.dept,
      e,
      fn: () => {
        closeModal();
        empProfile(e.id);
      }
    }));
  cmdItems = [...ppl, ...pages, ...(q ? actions : [])].slice(0, 9);
  cmdPaint();
}
function cmdPaint() {
  let g = '',
    h = '';
  cmdItems.forEach((it, i) => {
    if (it.g !== g) {
      g = it.g;
      h += `<div class="cmd-g">${g}</div>`;
    }
    h += `<button class="cmd-i ${i === cmdIdx ? 'on' : ''}" onclick="cmdRun(${i})" onmousemove="cmdIdx=${i}">${it.e ? av(it.e.name, 32) : `<span class="ai t-brand" style="width:32px;height:32px">${ic(it.i, 18)}</span>`}<span><b style="display:block">${esc(it.t)}</b><span class="muted small">${esc(it.s)}</span></span></button>`;
  });
  $('#cr').innerHTML = h || `<div class="empty"><b>No matches</b>Try a name, role or page.</div>`;
}
function cmdRun(i) {
  cmdItems[i].fn();
}

let bucket = innerWidth <= 520 ? 0 : innerWidth <= 900 ? 1 : 2,
  rz;
let lastW = innerWidth;
addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    const b = innerWidth <= 520 ? 0 : innerWidth <= 900 ? 1 : 2,
      moved = Math.abs(innerWidth - lastW) >= 80;
    if (S.authed && (b !== bucket || moved)) {
      render();
    }
    bucket = b;
    if (moved) lastW = innerWidth;
  }, 200);
});
function render() {
  ddClose();
  closeCrumbMenu();
  drawChrome();
  if (!flat().includes(S.page) && !S.denied) S.page = 'dashboard';
  const P = {
    dashboard,
    employees: employeesPage,
    attendance,
    hours: hoursPage,
    leave,
    payroll,
    recruit,
    performance: performancePage,
    roster,
    safety,
    training,
    reports,
    requests,
    settings,
    profile: profilePage,
    assets: assetsPage,
    approvals: approvalsPage,
    org: orgPage,
    lifecycle: lifecyclePage,
    audit: auditPage
  };
  const same = render.page === S.page;
  if (!same || !S.sel) S.sel = { scope: '', ids: [] };
  else pruneSel();
  const a = document.activeElement,
    fid =
      same && a && a.id && /^(INPUT|TEXTAREA)$/.test(a.tagName) && a.closest('#view') ? a.id : null,
    fsel = fid && a.selectionStart != null ? [a.selectionStart, a.selectionEnd] : null,
    SC = '#view .tw,#view .kan,#view .cal,#view .tabs',
    sx = same ? [...document.querySelectorAll(SC)].map(e => e.scrollLeft) : [];
  $('#view').innerHTML =
    (S.denied && !flat().includes(S.page) ? deniedPage() : P[S.page]()) + selBar();
  $('#view').classList.toggle('dashboard-view', S.page === 'dashboard');
  if (same) {
    // a state update must not throw away where you were
    const n = fid && document.getElementById(fid);
    if (n && n !== document.activeElement) {
      n.focus({ preventScroll: true });
      if (fsel && n.setSelectionRange)
        try {
          n.setSelectionRange(fsel[0], fsel[1]);
        } catch (e) {}
    }
    [...document.querySelectorAll(SC)].forEach((e, i) => {
      if (sx[i]) e.scrollLeft = sx[i];
    });
  }
  decorateCards();
  decorateTables();
  $('#crumbbar').innerHTML = crumbs();
  document.documentElement.style.setProperty('--shh', ($('#stickyhead').offsetHeight || 90) + 'px');
  render.page = S.page;
  fitTables();
  requestAnimationFrame(fitTables);
  document.title =
    (S.denied && !flat().includes(S.page) ? 'Access denied' : label(S.page)) + ' · PeopleDesk';
  try {
    if (location.hash !== '#/' + S.page) history.replaceState(null, '', '#/' + S.page);
  } catch (e) {}
  tick();
  persist();
}

const notifOk = n =>
  n.emp ? n.emp === me().id : !n.p ||
  (okPage(n.p) &&
    S.role !== 'employee' &&
    !(n.p === 'payroll' && !(can('payroll', 'edit') || can('payroll', 'approve'))) &&
    !(n.p === 'safety' && !can('safety', 'approve')));

/* js/core/shared-logic.js */
/* =============== shared logic =============== */
function presentToday(sc) {
  const on = sc.filter(e => e.status === 'On leave').length,
    ab = sc.some(e => e.id === 'E-1011') ? 1 : 0,
    pr = sc.length - on - ab;
  return { on, ab, pr, pct: Math.round((pr / Math.max(sc.length, 1)) * 100) };
}
function weekAtt(sc) {
  const base = [94, 96, 92, 95, 93, 71, 0],
    ti = dow();
  return base.map((v, i) => (i < ti ? v : i === ti ? presentToday(sc).pct : null));
}
const holList = () => {
  const list = HOLIDAYS.map(h => ({ ...h, date: new Date(NOW.getFullYear(), h.m, h.d) }))
    .filter(h => h.date >= TODAY)
    .slice(0, 4);
  return `<div class="list">${
    list
      .map(h => {
        const dd = Math.round((h.date - TODAY) / 864e5);
        return `<div class="li"><div class="grow"><b>${h.n}</b></div><span class="muted small">${h.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>${chip(dd === 0 ? 'Today' : 'in ' + dd + ' d', 'mute', 1)}</div>`;
      })
      .join('') || '<div class="empty">No upcoming holidays.</div>'
  }</div>`;
};
const ANN = [
  [
    'Diwali shutdown schedule',
    'Plant lines stop Nov 7 at 14:00 and resume Nov 11. Office closed Nov 8–10.',
    '2 days ago'
  ],
  [
    'Q3 appraisal cycle opens Oct 15',
    'Managers: finish goal check-ins before the window opens.',
    '4 days ago'
  ],
  [
    'Safety week Oct 19–23',
    'Mock fire drill on Wednesday at 11:00. Attendance is mandatory.',
    '1 week ago'
  ]
];
const annList = () =>
  `<div class="list">${ANN.map((a, i) => [a, i])
    .slice(0, innerWidth <= 520 ? 2 : ANN.length)
    .map(
      ([a, i]) =>
        `<button class="annb" onclick="annView(${i})"><div class="grow"><b>${a[0]}</b><div class="muted small">${a[1]}</div></div><span class="muted small" style="white-space:nowrap">${a[2]}</span></button>`
    )
    .join('')}</div>`;
function pendingList(n) {
  const p = pendingLv().slice(0, n);
  if (!p.length)
    return `<div class="empty"><b>All caught up</b>No leave requests are waiting.</div>`;
  return `<div class="list">${p
    .map(l => {
      const e = employees.find(x => x.id === l.emp);
      return `<div class="li" style="flex-wrap:wrap"><div class="grow" style="min-width:180px">${person(e, `${POLICY[l.type].n} · ${l.days} day${l.days > 1 ? 's' : ''} · ${fdate(l.from).replace(/ 20\d\d/, '')}`)}</div><div class="acts" style="gap:6px"><button class="btn ok sm" onclick="event.stopPropagation();decide(${l.id},'Approved')" aria-label="Approve ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm ico" onclick="event.stopPropagation();decide(${l.id},'Rejected')" aria-label="Reject ${esc(e.name)}">${ic('x', 14)}</button></div></div>`;
    })
    .join('')}</div>`;
}

/* js/components/card-icons.js */
/* =============== card title icons ===============
   Puts a consistent icon chip before every card title (".card .head h2").
   Matching is by keyword so new cards pick up a sensible icon without extra wiring. */
const CARD_ICON = [
  [/payslip|salary|pay\b|payment|payroll|bank/i, 'wallet'],
  [/leave|holiday|calendar|attendance|punch|rest between/i, 'cal'],
  [/shift|my day|today|clock/i, 'clock'],
  [/team|who.s out|people|workforce|employee|joiners|exits|departments|accounts|role|personal|employment/i, 'users'],
  [/approval|attention|assigned|waiting|requests|corrections|checks/i, 'approve'],
  [/announce|celebrat|notif/i, 'bell'],
  [/review|objective|rating|cycle|performance|goal/i, 'target'],
  [/document|report|history|log|career|journey|verification|incident/i, 'file'],
  [/security|safety|policy|emergency|system change/i, 'shield'],
  [/location|reporting|org/i, 'orgchart'],
  [/asset|issue and return|browser extension/i, 'box'],
  [/glance|dashboard|projected/i, 'chart'],
  [/ask |assistant/i, 'help']
];
const CARD_HUE = {
  wallet: '#16a34a',
  cal: '#2563eb',
  clock: '#0891b2',
  users: '#7c3aed',
  approve: '#ea580c',
  bell: '#db2777',
  target: '#4f46e5',
  file: '#0d9488',
  shield: '#dc2626',
  orgchart: '#ca8a04',
  box: '#9333ea',
  chart: '#0284c7',
  help: '#65a30d',
  grid: '#64748b'
};
function cardIcon(title) {
  const m = CARD_ICON.find(([re]) => re.test(title));
  return m ? m[1] : 'grid';
}
function decorateCards(root = document.getElementById('view')) {
  if (!root) return;
  let n;
  root.querySelectorAll('.card > .head h2, .card > .head > h2').forEach(h => {
    if (h.querySelector('.cti')) return;
    h.insertAdjacentHTML(
      'afterbegin',
      `<span class="cti" style="--h:${CARD_HUE[(n = cardIcon(h.textContent))]}" aria-hidden="true">${ic(n, 16)}</span>`
    );
  });
}

/* long table cells are cut with an ellipsis, so give them a tooltip with the full text */
function decorateTables(root = document.getElementById('view')) {
  if (!root) return;
  root.querySelectorAll('.rt td').forEach(td => {
    if (!td.title && td.scrollWidth > td.clientWidth + 1) td.title = td.textContent.trim();
  });
}

/* js/components/icon-tooltips.js */
/* icon-only controls (no visible text) show a small tooltip with their name on hover and keyboard focus */
(function () {
  const SEL = 'button, a, [role="button"], [role="link"], .icon-btn, .pf-avbtn';
  let tip, cur, timer;

  function label(el) {
    if (el.matches('[aria-expanded]') && el.closest('.dd')) return '';
    if (el.textContent.trim()) return '';
    return el.dataset.tip || el.getAttribute('aria-label') || el.getAttribute('title') || '';
  }
  function ensure() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'ic-tip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    return tip;
  }
  function show(el) {
    const t = label(el);
    if (!t) return;
    /* swap the native title for ours so the browser doesn't show two tooltips */
    if (el.hasAttribute('title')) {
      el.dataset.tip = el.getAttribute('title');
      el.removeAttribute('title');
    }
    cur = el;
    const n = ensure();
    n.textContent = t;
    n.classList.add('on');
    const r = el.getBoundingClientRect(),
      w = n.offsetWidth,
      h = n.offsetHeight;
    let left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let top = r.bottom + 8;
    if (top + h > innerHeight - 8) top = r.top - h - 8;
    n.style.left = left + 'px';
    n.style.top = top + 'px';
  }
  function hide() {
    clearTimeout(timer);
    cur = null;
    if (tip) tip.classList.remove('on');
  }
  document.addEventListener('mouseover', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el || el === cur) return;
    clearTimeout(timer);
    timer = setTimeout(() => show(el), 250);
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (el && !el.contains(e.relatedTarget)) hide();
  });
  document.addEventListener('focusin', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (el && el.matches(':focus-visible')) show(el);
  });
  document.addEventListener('focusout', hide);
  document.addEventListener('click', hide, true);
  document.addEventListener('scroll', hide, true);
  document.addEventListener('keydown', e => e.key === 'Escape' && hide());
})();

/* js/components/home-blocks.js */
/* =============== home screens: building blocks =============== */
const TD = () => [TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()];
const fshort = s => fdate(s).replace(/ 20\d\d/, '');
function jumpTo(id) {
  const e = document.getElementById(id);
  if (!e) return;
  e.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth',
    block: 'center'
  });
  e.classList.add('flash');
  setTimeout(() => e.classList.remove('flash'), 1500);
}
/* employee: this week's punches and hours */
function myWeekCard(id) {
  const mon = new Date(TODAY);
  mon.setDate(TODAY.getDate() - ((TODAY.getDay() + 6) % 7));
  let got = 0,
    want = 0;
  const rows = [...Array(7)].map((_, i) => {
    const dt = new Date(mon);
    dt.setDate(mon.getDate() + i);
    const o = dayInfo(id, dt.getFullYear(), dt.getMonth(), dt.getDate()),
      isT = dt.getTime() === TODAY.getTime();
    if (dt <= TODAY && ['P', 'D', 'A'].includes(o.st) && !o.live) want += o.end - o.start;
    if (o.mins != null && !o.live) got += o.mins;
    const label =
      o.st === 'L' && o.pend
        ? 'Leave pending'
        : o.hol
          ? o.hol
          : o.st === 'L' && o.leave && POLICY[o.leave.type]
            ? POLICY[o.leave.type].n
            : STN[o.st];
    let chips = chip(
      o.st === 'L' && o.pend ? 'Leave pending' : o.hol ? 'Holiday' : STN[o.st],
      STK2[o.st]
    );
    if (o.late) chips += chip('Late', 'warn', 1);
    if (o.miss) chips += chip('No clock-out', 'bad', 1);
    if (o.reg && o.reg.status === 'Pending') chips += chip('Correction pending', 'info', 1);
    const dash = '<span class="muted">—</span>';
    return {
      click: `attDay('${id}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`,
      cls: isT ? 'today' : '',
      cells: [
        `<span class="dcell"><span class="sd s-${o.st || 'F'}" aria-hidden="true"></span><span class="dtx"><b>${DOWN[dt.getDay()].slice(0, 3)} ${dt.getDate()}</b><small class="dlbl">${esc(label)}${o.late ? ' · late' : ''}</small></span></span>`,
        o.in != null ? tm(o.in) : dash,
        o.out != null ? tm(o.out) : o.live ? '<span class="muted">Working</span>' : dash,
        o.mins != null ? `<b>${dur(o.mins)}</b>` : dash,
        chips
      ]
    };
  });
  const pct = want ? Math.min(100, Math.round((got / want) * 100)) : 0,
    end = new Date(mon);
  end.setDate(mon.getDate() + 6);
  return `<div class="card"><div class="head"><div><h2>My attendance this week</h2><p class="sub">${fday(mon)} – ${fday(end)} · select a day for details</p></div><button class="link" onclick="go('attendance')">Full calendar</button></div>
   ${rtable([{ h: 'Day', keep: 1 }, { h: 'Clock in' }, { h: 'Clock out' }, { h: 'Hours', c: 'num' }, { h: 'Status', xm: 1 }], rows)}
   <div class="wkfoot"><div class="tools"><span class="muted">Hours worked so far</span><b>${dur(got)} <span class="muted" style="font-weight:400">of ${dur(want)}</span></b></div><div class="bar ${pct < 85 ? 'a' : ''}"><i style="width:${pct}%"></i></div></div></div>`;
}
const fday = dt => dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
/* employee: compact month calendar, every day opens the same day details */
function myMonthCard(id) {
  const y = TODAY.getFullYear(),
    m = TODAY.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    first = new Date(y, m, 1).getDay(),
    cnt = { P: 0, A: 0, L: 0, late: 0 };
  let cells = '';
  for (let i = 0; i < (first + 6) % 7; i++) cells += '<span></span>';
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(id, y, m, d),
      isT = o.dt.getTime() === TODAY.getTime();
    if (o.st === 'P' || o.st === 'D') cnt.P++;
    else if (o.st === 'A') cnt.A++;
    else if (o.st === 'L' && !o.pend) cnt.L++;
    if (o.late) cnt.late++;
    cells += `<button class="md ${o.st || 'F'}${isT ? ' today' : ''}${o.late ? ' late' : ''}" onclick="attDay('${id}',${y},${m},${d})">${d}<span class="sr">, ${esc(o.hol || STN[o.st])}${o.late ? ', late' : ''}. Open details</span></button>`;
  }
  const nh = HOLIDAYS.map(h => ({ ...h, date: new Date(TODAY.getFullYear(), h.m, h.d) })).filter(
      h => h.date >= TODAY
    )[0],
    nd = nh ? Math.round((nh.date - TODAY) / 864e5) : 0;
  const nextH = nh
    ? `<div class="mnext">${ic('cal', 16)}<span>Next holiday: <b>${esc(nh.n)}</b>, ${nh.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · ${nd === 0 ? 'today' : 'in ' + nd + ' d'}</span></div>`
    : '';
  return `<div class="card mcard"><div class="head"><div><h2>${MON[m]} ${y}</h2><p class="sub">Your attendance this month</p></div><button class="link" onclick="go('attendance')">Calendar</button></div>
   <div class="mstat">${[
     ['Present', cnt.P, 'green'],
     ['Absent', cnt.A, 'red'],
     ['Leave', cnt.L, 'brand'],
     ['Late', cnt.late, 'amber']
   ]
     .map(
       ([l, n, t]) =>
         `<div class="ms"><b>${n}</b><span><i style="background:var(--${t})"></i>${l}</span></div>`
     )
     .join('')}</div>
   <div class="mcal" role="group" aria-label="${MON[m]} ${y} attendance">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span class="dh" aria-hidden="true">${x}</span>`).join('')}${cells}</div>${nextH}</div>`;
}
/* employee: everything that is waiting on them or on their manager */
function attentionItems(id) {
  const it = [],
    e = employees.find(x => x.id === id);
  for (let k = 1; k <= 7; k++) {
    const dt = new Date(TODAY);
    dt.setDate(TODAY.getDate() - k);
    const y = dt.getFullYear(),
      m = dt.getMonth(),
      d = dt.getDate(),
      o = dayInfo(id, y, m, d),
      ds = DOWN[dt.getDay()].slice(0, 3) + ' ' + d + ' ' + MON[m].slice(0, 3);
    if (o.reg && o.reg.status === 'Pending') continue;
    if (o.st === 'A')
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'alert',
        t: `Absent on ${ds}`,
        s: 'No punches recorded. Request a correction if this is wrong.',
        cta: 'Fix',
        act: `attReg('${id}',${y},${m},${d})`
      });
    else if (o.miss)
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'clock',
        t: `Missing clock-out on ${ds}`,
        s: 'Add the time so your hours and pay are correct.',
        cta: 'Fix',
        act: `attReg('${id}',${y},${m},${d})`
      });
  }
  S.regs
    .filter(r => r.emp === id && r.status === 'Pending')
    .forEach(r => {
      const dt = new Date(r.date + 'T00:00:00');
      it.push({
        pri: 3,
        tone: 'amber',
        icon: 'clock',
        t: `Correction for ${fshort(r.date)} is pending`,
        s: `${r.type} · waiting for your manager`,
        cta: 'View',
        act: `attDay('${id}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`
      });
    });
  S.leaves
    .filter(l => l.emp === id && l.status === 'Pending')
    .forEach(l =>
      it.push({
        pri: 3,
        tone: 'amber',
        icon: 'cal',
        t: `Leave ${fshort(l.from)}${l.to !== l.from ? ' – ' + fshort(l.to) : ''} is waiting for approval`,
        s: `${POLICY[l.type].n} · ${l.days} day${l.days > 1 ? 's' : ''}`,
        cta: 'View',
        act: `leaveDetail(${l.id})`
      })
    );
  S.claims
    .filter(c => c.emp === id && c.st === 'Pending')
    .forEach(c =>
      it.push({
        pri: 3,
        tone: 'teal',
        icon: 'receipt',
        t: `Expense claim of ${inr(c.amt)} is pending`,
        s: `${c.cat} · ${c.note}`,
        cta: 'View',
        act: `claimDetail(${c.id})`
      })
    );
  S.courses
    .filter(c => ['All staff', e.type === 'Plant' ? 'Plant' : 'Office'].includes(c.req))
    .forEach(c => {
      const p = S.mine[c.n] || 0;
      if (p < 100)
        it.push({
          pri: 2,
          tone: 'brand',
          icon: 'book',
          t: `Finish “${c.n}”`,
          s: `${p}% done · renew by ${fshort(c.exp)}`,
          cta: 'Continue',
          act: "go('training')"
        });
    });
  vdocsOf(e)
    .filter(d => d.st === 'Re-upload requested')
    .forEach(d =>
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'file',
        t: `HR needs a new ${d.n}`,
        s: d.note || 'The file could not be verified',
        cta: 'Upload',
        act: `uploadDoc('${id}','${d.k}')`
      })
    );
  assetsOf(id)
    .cur.filter(a => !a.ack)
    .forEach(a => {
      const i = [...a.hist].reverse().find(h => h.t === 'Issued' && h.emp === id);
      it.push({
        pri: 2,
        tone: 'brand',
        icon: 'laptop',
        t: `Confirm you received your ${aname(a)}`,
        s: `${a.type} · issued ${i ? fshort(i.date) : ''} · serial ${a.serial}`,
        cta: 'Confirm',
        act: `ackAsset('${a.id}')`
      });
    });
  return it.sort((a, b) => a.pri - b.pri);
}
function needsAttentionCard(id) {
  const all = attentionItems(id),
    items = all.slice(0, 5);
  if (!items.length)
    return `<div class="card"><div class="head"><div><h2>Needs your attention</h2><p class="sub">Things waiting on you</p></div></div><div class="empty"><span class="ei">${ic('check', 22)}</span><b>You're all caught up</b>Nothing needs your action right now.</div></div>`;
  return `<div class="card"><div class="head"><div><h2>Needs your attention</h2><p class="sub">Open items for you and your manager</p></div>${chip(all.length + (all.length > 1 ? ' items' : ' item'), 'warn', 1)}</div>
   <div class="list">${items.map(x => `<div class="li${x.pri === 1 ? ' crit' : ''}" style="flex-wrap:wrap"><span class="ai t-${x.tone}">${ic(x.icon, 18)}</span><div class="grow" style="min-width:150px"><b>${x.t}</b><div class="muted small">${esc(x.s)}</div></div><button class="btn sm" onclick="${x.act}">${x.cta}</button></div>`).join('')}</div>${all.length > 5 ? `<p class="muted small" style="margin-top:10px">+ ${all.length - 5} more</p>` : ''}</div>`;
}
/* manager and admin: their own clock-in, without leaving home */
function myDayCard() {
  const c = S.clock,
    u = me(),
    o = dayInfo(u.id, ...TD()),
    state = c.out
      ? chip('Day complete', 'ok')
      : c.in
        ? chip('Clocked in', 'ok')
        : chip('Not clocked in', 'mute');
  return `<div class="card myday"><div class="head"><div><h2>My day</h2><p class="sub">${esc(o.shiftTxt)}</p></div><button class="link" onclick="go('attendance')">My attendance</button></div>
   <div class="mdt">${state}${c.in ? `<span class="muted small">${esc(c.mode)}</span>` : ''}</div><div class="timer sm" id="timer">00:00:00</div><div class="ck-sub" id="tsub"></div>${vstrip(c.mode)}
   <div class="field" style="margin-bottom:14px"><label for="mode">Work mode</label><select id="mode" onchange="S.clock.mode=this.value;vstripUpdate()" ${c.in ? 'disabled' : ''}>${['Office', 'Plant gate (biometric)', 'Work from home', 'On-site visit'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
   <button class="btn big primary full" onclick="toggleClock()" ${c.out ? 'disabled' : ''}>${c.out ? 'Done for today' : c.in ? 'Clock out' : 'Clock in'}</button></div>`;
}
/* manager and admin: who is absent, late or on leave right now */
function teamTodayCard() {
  const team = scoped().filter(e => e.id !== me().id),
    td = TD(),
    rows = team.map(e => dayInfo(e.id, ...td)),
    n = { P: 0, late: 0, L: 0, A: 0 };
  rows.forEach(o => {
    if (o.st === 'P' || o.st === 'D') n.P++;
    if (o.late) n.late++;
    if (o.st === 'L') n.L++;
    if (o.st === 'A') n.A++;
  });
  const key = o => (o.st === 'A' ? 0 : o.late ? 1 : 2),
    ex = rows
      .filter(o => o.st === 'A' || o.st === 'L' || o.late)
      .sort((a, b) => key(a) - key(b))
      .slice(0, 5);
  const row = o => {
    const e = o.e,
      chipx =
        o.st === 'A'
          ? chip('Absent', 'bad')
          : o.st === 'L'
            ? chip('On leave', 'info')
            : chip('Late ' + o.late + ' min', 'warn'),
      sub =
        o.st === 'A'
          ? 'No punch recorded'
          : o.st === 'L'
            ? o.leave && POLICY[o.leave.type]
              ? POLICY[o.leave.type].n
              : 'Leave'
            : `In at ${tm(o.in)}`;
    return `<button class="cname ex" onclick="attDay('${e.id}',${td.join(',')})">${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span>${esc(e.dept)} · ${sub}</span></span>${chipx}</button>`;
  };
  return `<div class="card"><div class="head"><div><h2>Team today</h2><p class="sub">${team.length} people · select a person for details</p></div><button class="link" onclick="go('attendance')">Details</button></div>
   <div class="mstat">${[
     ['Present', n.P, 'green'],
     ['Late', n.late, 'amber'],
     ['On leave', n.L, 'brand'],
     ['Absent', n.A, 'red']
   ]
     .map(
       ([l, v, t]) =>
         `<div class="ms"><b>${v}</b><span><i style="background:var(--${t})"></i>${l}</span></div>`
     )
     .join('')}</div>
   ${ex.length ? `<div class="list">${ex.map(row).join('')}</div>` : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>Everyone is in</b>No absences or late arrivals today.</div>`}</div>`;
}
/* manager and admin: leave, attendance corrections and expense claims in one list */

/* js/components/table-controls.js */
/* =============== bulk selection, density and column controls =============== */
const SEL_NOUN = { leave: 'leave request', reg: 'correction', claim: 'claim', ap: 'request' };
function pruneSel() {
  const s = S.sel;
  if (!s || !s.scope) return;
  const live = id =>
    s.scope === 'ap'
      ? (() => {
          const k = ['', 'leave', 'claim', 'reg'][Math.floor(id / 1e13)],
            x = KIND[k] && KIND[k].list().find(r => r.id === id % 1e13);
          return !!x && stOf(k, x) === 'Pending';
        })()
      : s.scope === 'leave'
        ? (S.leaves.find(x => x.id === id) || {}).status === 'Pending'
        : s.scope === 'claim'
          ? (S.claims.find(x => x.id === id) || {}).st === 'Pending'
          : (S.regs.find(x => x.id === id) || {}).status === 'Pending';
  s.ids = s.ids.filter(live);
  if (!s.ids.length) S.sel = { scope: '', ids: [] };
}
function selBar() {
  const s = S.sel;
  if (!s || !s.ids.length) return '';
  return `<div class="selbar" id="selbar" role="region" aria-label="Bulk actions"><b aria-live="polite">${s.ids.length} selected</b><button class="btn ok sm" onclick="bulkDecide('${s.scope}','Approved')">${ic('check', 14)}Approve</button><button class="btn bad sm" onclick="bulkDecide('${s.scope}','Rejected')">${ic('x', 14)}Reject</button><button class="btn sm" onclick="selClear()">Clear</button></div>`;
}
function renderSel() {
  // update in place so keyboard focus stays on the checkbox
  const bar = document.getElementById('selbar'),
    html = selBar();
  if (bar) {
    if (html) bar.outerHTML = html;
    else bar.remove();
  } else if (html) $('#view').insertAdjacentHTML('beforeend', html);
  const ids = new Set(S.sel.ids),
    boxes = [...document.querySelectorAll('#view input.selc[data-sid]')];
  boxes.forEach(b => {
    b.checked = ids.has(+b.dataset.sid);
  });
  syncSel();
}
function syncSel() {
  const boxes = [...document.querySelectorAll('#view tbody input.selc[data-sid]')],
    n = boxes.filter(b => b.checked).length,
    all = document.getElementById('selall');
  if (all) {
    all.checked = boxes.length > 0 && n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
  }
}
function selToggle(scope, id, on) {
  if (!S.sel || S.sel.scope !== scope) S.sel = { scope, ids: [] };
  const s = new Set(S.sel.ids);
  if (on) s.add(id);
  else s.delete(id);
  S.sel.ids = [...s];
  renderSel();
}
function selAll(scope, ids, on) {
  S.sel = { scope, ids: on ? [...ids] : [] };
  renderSel();
}
function selClear() {
  S.sel = { scope: '', ids: [] };
  renderSel();
}
function setDensity(v) {
  document.documentElement.dataset.density = v;
  try {
    localStorage.setItem('pd-density', v);
  } catch (e) {}
  render();
}
const ECOLS = [
  ['id', 'ID'],
  ['dept', 'Department'],
  ['loc', 'Location'],
  ['status', 'Status']
];
S.cols = S.cols || { id: 1, dept: 1, loc: 1, status: 1 };
const colOn = k => S.cols[k] !== 0;
function saveCols() {
  try {
    localStorage.setItem('pd-cols', JSON.stringify(S.cols));
  } catch (e) {}
}
function toggleCol(k) {
  S.cols[k] = colOn(k) ? 0 : 1;
  saveCols();
  render();
}
function resetCols() {
  S.cols = { id: 1, dept: 1, loc: 1, status: 1 };
  saveCols();
  render();
}
const colsCtl = () => {
  const d = document.documentElement.dataset.density || 'normal';
  return `<span class="colw desk"><button class="btn sm" aria-haspopup="true" aria-label="Display options" title="Display options" aria-expanded="${!!S.colMenu}" onclick="S.colMenu=!S.colMenu;render()">${ic('sliders', 14)}<span class="lbl">Display</span></button>${
    S.colMenu
      ? `<div class="colpop" role="group" aria-label="Display options">${
          S.page === 'employees'
            ? `<div class="colsec">Sort by</div><div class="sortl" role="radiogroup" aria-label="Sort by">${Object.entries(
                SORTS
              )
                .map(
                  ([v, l]) =>
                    `<button role="radio" aria-checked="${(S.sort || 'name') === v}" class="${(S.sort || 'name') === v ? 'on' : ''}" onclick="S.sort='${v}';render()">${l}</button>`
                )
                .join('')}</div>`
            : ''
        }<div class="colsec">Row density</div><div class="denseg" role="radiogroup" aria-label="Row density">${[
          ['compact', 'Compact'],
          ['normal', 'Normal'],
          ['comfortable', 'Roomy']
        ]
          .map(
            ([v, l]) =>
              `<button role="radio" aria-checked="${d === v}" class="${d === v ? 'on' : ''}" onclick="setDensity('${v}')">${l}</button>`
          )
          .join(
            ''
          )}</div><div class="colsec">Columns</div>${ECOLS.map(([k, l]) => `<label class="colrow"><input type="checkbox" ${colOn(k) ? 'checked' : ''} onchange="toggleCol('${k}')"> ${l}</label>`).join('')}<button class="btn sm" onclick="resetCols()">Reset columns</button></div>`
      : ''
  }</span>`;
};
addEventListener('click', e => {
  if (S.colMenu && !e.target.closest('.colw')) {
    S.colMenu = false;
    render();
  }
});
addEventListener('keydown', e => {
  if (e.key === 'Escape' && S.colMenu) {
    S.colMenu = false;
    render();
  }
});
try {
  const d = localStorage.getItem('pd-density');
  if (d) document.documentElement.dataset.density = d;
  const cc = localStorage.getItem('pd-cols');
  if (cc) S.cols = JSON.parse(cc);
} catch (e) {}

/* js/components/attendance-checks.js */
/* =============== punch verification, rest gaps, leave projection, team overlap, salary bar =============== */
function punchChecks(mode) {
  const sync = (NOW.getMinutes() % 6) + 1;
  if (mode === 'Plant gate (biometric)')
    return [
      ['ok', 'Biometric device ok', 'Gate 2 · synced ' + sync + ' min ago', 'Device'],
      ['ok', 'Inside plant geofence', 'Manesar Plant · 35 m from the gate', 'Geofence']
    ];
  if (mode === 'Work from home')
    return [
      ['ok', 'Home location captured', 'Inside your approved WFH area', 'Location'],
      ['warn', 'Remote network', 'Not on the office network · your manager is notified', 'Network']
    ];
  if (mode === 'On-site visit')
    return [
      ['ok', 'GPS captured', 'Accuracy about 12 m', 'GPS'],
      ['warn', 'Outside the office geofence', 'Logged as an on-site visit', 'Geofence']
    ];
  return [
    ['ok', 'Inside the office geofence', 'Gurugram HQ · 40 m from the entrance', 'Geofence'],
    ['ok', 'Office network', 'Corporate Wi-Fi verified', 'Network']
  ];
}
const vstrip = mode =>
  `<div class="vstrip" id="vstrip" role="group" aria-label="Punch verification">${punchChecks(mode)
    .map(
      ([k, t, s, sh]) =>
        `<span class="vchip ${k}" title="${esc(t + ': ' + s)}">${ic(k === 'ok' ? 'check' : 'alert', 12)}<b><span class="lg">${t}</span><span class="sh">${sh}</span></b><small>${esc(s)}</small></span>`
    )
    .join('')}</div>`;
function vstripUpdate() {
  const e = document.getElementById('vstrip');
  if (e) e.outerHTML = vstrip(S.clock.mode);
}
/* roster: how long is the gap between two shifts? */
const restGap = (prev, next) => {
  const a = SHT[prev],
    b = SHT[next];
  if (!a || !b) return 99;
  const s = a.s[0] + a.s[1] / 60,
    e0 = a.e[0] + a.e[1] / 60,
    end = e0 <= s ? e0 + 24 : e0;
  return Math.round((24 + b.s[0] + b.s[1] / 60 - end) * 10) / 10;
};
function restCard() {
  const plant = scoped().filter(e => e.type === 'Plant'),
    start = new Date(TODAY);
  start.setDate(start.getDate() - dow());
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
  const out = [];
  plant.forEach(e => {
    const r = S.roster[e.id] || [];
    for (let i = 1; i < 7; i++)
      if (
        (r[i - 1] === 'C' && ['A', 'B', 'G'].includes(r[i])) ||
        (r[i - 1] === 'B' && r[i] === 'A')
      )
        out.push({ e, i, gap: restGap(r[i - 1], r[i]), from: r[i - 1], to: r[i] });
  });
  if (!out.length) return '';
  const dn = i => days[i].toLocaleDateString('en-IN', { weekday: 'short' });
  return `<div class="card" id="restcard"><div class="head"><div><h2>Rest between shifts</h2><p class="sub">The statutory minimum is 11 hours</p></div>${chip(out.length + ' short', 'warn', 1)}</div><div class="list">${out
    .map(x => {
      const pct = Math.max(2, Math.round((Math.min(x.gap, 11) / 11) * 100)),
        short = Math.round((11 - x.gap) * 10) / 10;
      return `<div class="li" style="flex-wrap:wrap"><div class="grow" style="min-width:180px">${person(x.e, `${dn(x.i - 1)} ${x.from} → ${dn(x.i)} ${x.to}`)}</div><div style="flex:1 1 220px"><div class="rbar" role="img" aria-label="${x.gap} hours of rest, ${short} hours short of 11"><i style="width:${pct}%"></i></div><small class="muted">${x.gap} h rest · ${short} h short of 11 h</small></div>${isMgr() ? `<button class="btn sm" onclick="cycleShift('${x.e.id}',${x.i})">Change shift</button>` : ''}</div>`;
    })
    .join('')}</div></div>`;
}
/* leave: what will my balance be on a later date? */
function projRows(id, toIso) {
  const bal = balances(id),
    to = new Date(toIso + 'T00:00:00'),
    months = Math.max(
      0,
      (to.getFullYear() - TODAY.getFullYear()) * 12 + to.getMonth() - TODAY.getMonth()
    );
  return Object.keys(POLICY).map(k => {
    const acc = k === 'EL' ? months * 1.5 : 0,
      planned = S.leaves
        .filter(
          l =>
            l.emp === id &&
            l.type === k &&
            ['Approved', 'Pending'].includes(l.status) &&
            l.from > iso(TODAY) &&
            l.from <= toIso
        )
        .reduce((a, l) => a + l.days, 0),
      cap = k === 'EL' ? 30 : POLICY[k].t;
    return {
      k,
      today: bal[k].left,
      acc,
      planned,
      proj: Math.max(0, Math.min(cap, bal[k].left + acc - planned))
    };
  });
}
function projCard() {
  const id = me().id,
    end = iso(new Date(TODAY.getFullYear(), 11, 31)),
    d = S.projTo && S.projTo <= end && S.projTo > iso(TODAY) ? S.projTo : end,
    rows = projRows(id, d),
    f = x => (Math.round(x * 10) / 10).toString();
  const el = rows.find(r => r.k === 'EL');
  return `<div class="card" id="projcard"><div class="head"><div><h2>Projected leave balance</h2><p class="sub">Earned leave adds 1.5 days a month. Planned leave is subtracted.</p></div><div class="field" style="margin:0"><label class="sr" for="pj-d">Project to</label><input id="pj-d" type="date" min="${iso(new Date(TODAY.getTime() + 864e5))}" max="${end}" value="${d}" onchange="S.projTo=this.value;render()"></div></div>
   <p style="margin-bottom:10px">By <b>${fdate(d)}</b> you will have <b>${f(el.proj)} days</b> of earned leave.</p>
   ${rtable(
     [
       { h: 'Leave type' },
       { h: 'Today', c: 'num' },
       { h: 'Added', c: 'num' },
       { h: 'Planned', c: 'num' },
       { h: 'Projected', c: 'num' }
     ],
     rows.map(r => ({
       cells: [
         POLICY[r.k].n,
         f(r.today),
         r.acc ? '+' + f(r.acc) : '—',
         r.planned ? '−' + f(r.planned) : '—',
         `<b>${f(r.proj)}</b>`
       ]
     })),
     { et: 'Nothing to project' }
   )}</div>`;
}
/* leave: who else in the team is already off? */
function teamOverlap(empId, from, to, excludeId) {
  const e = employees.find(x => x.id === empId);
  return S.leaves.filter(
    l =>
      l.id !== excludeId &&
      l.emp !== empId &&
      employees.find(x => x.id === l.emp).dept === e.dept &&
      ['Approved', 'Pending'].includes(l.status) &&
      l.from <= to &&
      l.to >= from
  );
}
const overlapText = list =>
  list
    .map(l => {
      const p = employees.find(x => x.id === l.emp),
        r = l.from === l.to ? fshort(l.from) : fshort(l.from) + ' – ' + fshort(l.to);
      return `${p.name} (${r}${l.status === 'Pending' ? ', pending' : ''})`;
    })
    .join(', ');
/* pay: where does the gross go? */
function salaryBar(s) {
  const parts = [
      ['Take-home', s.net, 'var(--brand)'],
      ['Provident fund', s.pf, 'var(--teal)'],
      ['Professional tax', s.pt, 'var(--amber)'],
      ['Income tax (TDS)', s.tds, 'var(--red)']
    ].filter(p => p[1] > 0.5),
    pc = v => Math.round((v / s.m) * 1000) / 10;
  return `<div class="sbar-w"><div class="sbar" role="img" aria-label="${esc(`Of ${inr(s.m)} gross: ` + parts.map(p => `${p[0]} ${inr(p[1])} (${pc(p[1])}%)`).join(', '))}">${parts.map(p => `<i style="flex:${p[1]} 0 0;background:${p[2]}" title="${esc(p[0])} ${inr(p[1])}"></i>`).join('')}</div>
   <ul class="sleg">${parts.map(p => `<li><i style="background:${p[2]}"></i>${p[0]} <b>${inr(p[1])}</b> <span class="muted">${pc(p[1])}%</span></li>`).join('')}</ul></div>`;
}

/* js/features/profile/career-documents.js */
/* =============== career journey and document verification =============== */
const VDOCS = [
  ['aadhaar', 'Government ID (Aadhaar)'],
  ['pan', 'PAN card'],
  ['bank', 'Bank account proof'],
  ['nda', 'Signed NDA']
];
const DOCURL = {}; // previews of files uploaded in this session (kept in memory only)
const dayAdd = (d, n) => {
  const x = new Date(d + 'T00:00:00');
  x.setDate(x.getDate() + n);
  return iso(x);
};
const fmtSize = n =>
  n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
function vdocsOf(e) {
  const v = e.vdocs || {};
  return VDOCS.map(([k, n]) => {
    const s = v[k] || {},
      h = hsh2(e.id + k),
      init = !s.st && k !== 'bank';
    return {
      k,
      n,
      st: s.st || (k === 'bank' ? 'Pending' : 'Verified'),
      file: s.file || {
        name: `${k}-${e.id.toLowerCase()}.${k === 'bank' || k === 'nda' ? 'pdf' : 'jpg'}`,
        size: `${120 + (h % 380)} KB`,
        up: dayAdd(e.join, 2)
      },
      by: s.by || (init ? 'HR, at onboarding' : ''),
      on: s.on || (init ? dayAdd(e.join, 3) : ''),
      note: s.note || ''
    };
  });
}
function setDoc(empId, k, patch) {
  const e = aEmp(empId),
    cur = vdocsOf(e).find(d => d.k === k);
  e.vdocs = e.vdocs || {};
  e.vdocs[k] = { st: cur.st, file: cur.file, by: cur.by, on: cur.on, note: cur.note, ...patch };
}
function vdocRows(e, o = {}) {
  return vdocsOf(e)
    .map(
      d =>
        `<div class="li" style="flex-wrap:wrap"><span class="ai t-${d.st === 'Verified' ? 'teal' : d.st === 'Pending' ? 'brand' : 'red'}" style="width:32px;height:32px">${ic(d.st === 'Verified' ? 'check' : 'file', 16)}</span><div class="grow" style="min-width:150px"><button class="cname" style="width:auto" onclick="docPreview('${e.id}','${d.k}')"><span class="cn"><b>${d.n}</b><span>${esc(d.file.name)} · ${d.file.size}</span></span></button>${d.note && d.st !== 'Verified' ? `<div class="muted small">${esc(d.note)}</div>` : ''}</div>${stChip(d.st)}${o.self && d.st !== 'Verified' ? `<button class="btn sm ${d.st === 'Re-upload requested' ? 'primary' : ''}" onclick="uploadDoc('${e.id}','${d.k}')">${d.st === 'Re-upload requested' ? 'Upload again' : 'Replace'}</button>` : ''}</div>`
    )
    .join('');
}
function docMock(k, e) {
  const hd = { aadhaar: '#E4572E', pan: '#2B5FB4', bank: '#1F7A5C', nda: '#6B4FBB' }[k],
    title = {
      aadhaar: 'Government of India',
      pan: 'Income Tax Department',
      bank: 'Bank statement',
      nda: 'Non-disclosure agreement'
    }[k];
  const photo =
    k === 'aadhaar' || k === 'pan'
      ? `<rect x="22" y="70" width="58" height="72" rx="6" fill="#D7DEEA"/><circle cx="51" cy="94" r="14" fill="#B4BFD2"/><rect x="31" y="114" width="40" height="22" rx="10" fill="#B4BFD2"/>`
      : '';
  const x0 = photo ? 96 : 24,
    lines = [0, 1, 2, 3, 4]
      .map(
        i =>
          `<rect x="${x0}" y="${72 + i * 18}" width="${(i % 2 ? 150 : 190) - (photo ? 0 : 0)}" height="8" rx="4" fill="#E2E7F0"/>`
      )
      .join('');
  return `<svg class="dmock" viewBox="0 0 320 210" role="img" aria-label="Sample preview of ${esc(VDOCS.find(d => d[0] === k)[1])} for ${esc(e.name)}"><rect x="1" y="1" width="318" height="208" rx="12" fill="#fff" stroke="#D5DBE6"/><path d="M1 13a12 12 0 0 1 12-12h294a12 12 0 0 1 12 12v30H1z" fill="${hd}"/><text x="22" y="30" font-size="14" font-weight="700" fill="#fff" font-family="Public Sans,system-ui,sans-serif">${title}</text>${photo}${lines}${k === 'nda' ? `<path d="M180 176c10-14 18 8 28-6s16 6 26-4" stroke="#6B4FBB" stroke-width="2" fill="none"/>` : ''}<text x="160" y="140" font-size="34" font-weight="800" fill="#0B1B3F" opacity=".07" text-anchor="middle" transform="rotate(-18 160 120)" font-family="Public Sans,system-ui,sans-serif">SAMPLE</text></svg>`;
}
function docPreview(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    adm = S.role === 'admin',
    self = empId === me().id,
    url = DOCURL[empId + '|' + k];
  const act = adm
    ? d.st === 'Verified'
      ? `<button class="btn" onclick="docReview('${empId}','${k}','Pending')">Mark as pending</button>`
      : `<button class="btn bad" onclick="docAskReupload('${empId}','${k}')">Request re-upload</button><button class="btn primary" onclick="docReview('${empId}','${k}','Verified')">Approve document</button>`
    : self && d.st !== 'Verified'
      ? `<button class="btn primary" onclick="uploadDoc('${empId}','${k}')">${d.st === 'Re-upload requested' ? 'Upload a new file' : 'Replace file'}</button>`
      : `<button class="btn" onclick="closeModal()">Close</button>`;
  const row = (a, b) =>
    `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  overlay(
    d.n,
    `<div class="dsplit"><div class="dprev">${url ? `<img class="dimg" src="${url}" alt="Uploaded ${esc(d.n)}">` : docMock(k, e)}<p class="muted small" style="margin-top:8px;text-align:center">${url ? 'File uploaded in this session' : 'Sample preview. Files are not stored in this demo.'}</p></div>
   <div class="dmeta"><div class="person" style="margin-bottom:10px">${av(e.name, 34)}<div><b>${esc(e.name)}</b><span>${esc(e.title)}</span></div></div><div style="margin-bottom:6px">${stChip(d.st)}</div>
   <div class="list">${row('File', esc(d.file.name))}${row('Size', d.file.size)}${row('Uploaded', fdate(d.file.up))}${row('Reviewed by', d.by ? esc(d.by) : 'Not reviewed yet')}${row('Reviewed on', d.on ? fdate(d.on) : '—')}</div>${d.note ? `<div class="chip ${d.st === 'Verified' ? 'info' : 'warn'} nb" style="margin-top:10px;padding:7px 12px;white-space:normal;border-radius:12px;line-height:1.4;align-items:flex-start">${esc(d.note)}</div>` : ''}</div></div>`,
    act,
    { wide: true }
  );
}
function docAfter(empId) {
  closeModal();
  render();
  if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
}
function docReview(empId, k, st) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    prev = e.vdocs ? JSON.stringify(e.vdocs[k] || null) : null;
  setDoc(empId, k, {
    st,
    by: st === 'Pending' ? '' : me().name,
    on: st === 'Pending' ? '' : iso(TODAY),
    note: ''
  });
  docAfter(empId);
  toast(`${d.n} ${st === 'Verified' ? 'approved' : 'marked as pending'}`, () => {
    if (prev) e.vdocs[k] = JSON.parse(prev);
    else delete e.vdocs[k];
    render();
    if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
  });
}
function docAskReupload(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k);
  overlay(
    'Request re-upload',
    `<p class="muted" style="margin-bottom:14px">${esc(e.name.split(' ')[0])} will see this on their home screen and can upload a new file.</p><div class="fg">${fld('ru-r', 'Reason', `<select id="ru-r"><option value="">Choose a reason</option><option>The image is blurry</option><option>Wrong document</option><option>Document has expired</option><option>Name does not match our records</option><option>Pages are missing</option></select>`, 'full')}${fld('ru-n', 'Note (optional)', '<input id="ru-n" placeholder="Anything that will help them fix it" autocomplete="off">', 'full')}</div>`,
    `<button class="btn" onclick="docPreview('${empId}','${k}')">Back</button><button class="btn primary" onclick="docSendReupload('${empId}','${k}')">Send request</button>`
  );
}
function docSendReupload(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    r = $('#ru-r').value;
  if (!chk('ru-r', !!r, 'Choose a reason so they know what to fix')) return;
  const n = $('#ru-n').value.trim(),
    prev = e.vdocs && e.vdocs[k] ? JSON.stringify(e.vdocs[k]) : null;
  setDoc(empId, k, {
    st: 'Re-upload requested',
    by: me().name,
    on: iso(TODAY),
    note: r + (n ? '. ' + n : '')
  });
  docAfter(empId);
  toast(`Re-upload requested for ${d.n}`, () => {
    if (prev) e.vdocs[k] = JSON.parse(prev);
    else delete e.vdocs[k];
    render();
    if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
  });
}
function uploadDoc(empId, k) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*,application/pdf';
  inp.id = 'docfile';
  inp.hidden = true;
  document.body.appendChild(inp);
  inp.onchange = () => {
    const f = inp.files[0];
    inp.remove();
    if (!f) return;
    if (/^image\//.test(f.type) && f.size <= 3 * 1048576)
      DOCURL[empId + '|' + k] = URL.createObjectURL(f);
    else delete DOCURL[empId + '|' + k];
    setDoc(empId, k, {
      st: 'Pending',
      file: { name: f.name, size: fmtSize(f.size), up: iso(TODAY) },
      by: '',
      on: '',
      note: ''
    });
    closeModal();
    render();
    toast('Uploaded. HR will review it soon');
  };
  inp.click();
}
function journey(e) {
  const j = e.join,
    t0 = iso(TODAY),
    y = TODAY.getFullYear(),
    conf = new Date(j + 'T00:00:00');
  conf.setMonth(conf.getMonth() + 6);
  const confD = iso(conf),
    docs = vdocsOf(e),
    vc = docs.filter(d => d.st === 'Verified').length,
    apr = `${y}-04-01`,
    nxt = `${y}-10-15`,
    elig = j < apr;
  const steps = [
    {
      t: 'Offer accepted',
      d: dayAdd(j, -14),
      done: dayAdd(j, -14) <= t0,
      s: 'Offer letter signed'
    },
    { t: 'Joined GMux', d: j, done: j <= t0, s: `${e.title} · ${e.dept}` },
    {
      t: 'Documents verified',
      d: dayAdd(j, 3),
      done: vc === docs.length && dayAdd(j, 3) <= t0,
      s: vc === docs.length ? 'All documents verified' : `${vc} of ${docs.length} verified`
    },
    {
      t: e.status === 'Probation' || confD > t0 ? 'Confirmation' : 'Confirmed',
      d: confD,
      done: e.status !== 'Probation' && confD <= t0,
      s: e.status === 'Probation' ? 'Probation ends and HR confirms' : 'Probation completed'
    },
    {
      t: 'Annual appraisal',
      d: apr,
      done: elig && apr <= t0,
      skip: !elig,
      s: elig ? `Completed for ${y}` : 'Not eligible until next year'
    },
    { t: 'Next review cycle', d: nxt, done: nxt <= t0, s: 'Q3 appraisal cycle opens' }
  ];
  let now = false;
  steps.forEach(s => {
    s.state = s.skip ? 'skip' : s.done ? 'done' : !now ? ((now = true), 'now') : 'next';
  });
  return steps;
}
function journeyCard(e) {
  const st = journey(e);
  return `<div class="card" id="journey"><div class="head"><div><h2>Career journey</h2><p class="sub">Key milestones from offer to review</p></div></div><ol class="jr">${st.map(s => `<li class="${s.state}"${s.state === 'now' ? ' aria-current="step"' : ''}><span class="jd" aria-hidden="true">${s.state === 'done' ? ic('check', 12) : ''}</span><div><b>${s.t}</b><span>${fdate(s.d)}</span><small>${esc(s.s)}</small></div></li>`).join('')}</ol></div>`;
}

/* js/features/assets/assets.js */
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

/* js/features/profile/profile.js */
/* =============== my profile =============== */
const hsh2 = s => [...String(s)].reduce((a, ch) => (Math.imul(a, 31) + ch.charCodeAt(0)) >>> 0, 7);
function profOf(e) {
  const h = hsh2(e.id),
    p = e.prof || {},
    last = e.name.split(' ').slice(-1)[0];
  const AREAS = [
    'Sector 56, Gurugram, Haryana',
    'DLF Phase 3, Gurugram, Haryana',
    'Sushant Lok 1, Gurugram, Haryana',
    'Palam Vihar, Gurugram, Haryana',
    'Sector 14, Faridabad, Haryana',
    'Sector 62, Noida, Uttar Pradesh',
    'Sector 5, Manesar, Haryana'
  ];
  const REL = ['Spouse', 'Parent', 'Sibling'],
    FN = ['Anil', 'Sunita', 'Rakesh', 'Meena', 'Vijay', 'Seema', 'Mohan', 'Anita'];
  return {
    phone: e.phone,
    addr: p.addr || `${10 + (h % 180)}, ${AREAS[h % AREAS.length]}`,
    blood: p.blood || ['O+', 'A+', 'B+', 'AB+', 'O-', 'B-'][h % 6],
    ecName: p.ecName || `${FN[(h >>> 3) % FN.length]} ${last}`,
    ecRel: p.ecRel || REL[(h >>> 5) % 3],
    ecPhone: p.ecPhone || '+91 9' + String(100000000 + ((Math.imul(h, 48271) >>> 0) % 899999999))
  };
}
function profRows(e) {
  const pf = profOf(e),
    dob = dobOf(e),
    sh = SHT[baseShift(e)],
    st = sh.s[0] * 60 + sh.s[1],
    en = sh.e[0] * 60 + sh.e[1];
  let prob = '';
  if (e.status === 'Probation') {
    const d = new Date(e.join + 'T00:00:00');
    d.setMonth(d.getMonth() + 6);
    prob = fdate(iso(d));
  }
  return {
    personal: [
      ['Full name', e.name],
      ['Employee ID', e.id],
      ['Date of birth', dob ? fdate(dob) : 'Not added'],
      ['Blood group', pf.blood],
      ['Work email', e.email],
      ['Phone', pf.phone],
      ['Current address', pf.addr]
    ],
    emergency: [
      ['Name', pf.ecName],
      ['Relationship', pf.ecRel],
      ['Phone', pf.ecPhone]
    ],
    job: [
      ['Designation', e.title],
      ['Department', e.dept],
      ['Work type', e.type === 'Plant' ? 'Plant / shop floor' : 'Office'],
      ['Location', e.loc],
      ['Reports to', reportsTo(e)],
      ['Status', e.status],
      ['Date of joining', fdate(e.join)],
      ['Tenure', tenure(e.join)],
      ...(prob ? [['Probation ends', prob]] : []),
      ['Notice period', e.type === 'Plant' ? '30 days' : '60 days'],
      ['Shift', `${sh.n} · ${tm(st)}–${tm(en)}`]
    ]
  };
}
const pRow = (a, b) =>
  `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${a === 'Status' ? stChip(b) : esc(String(b))}</b></div>`;
function reqCourses(e) {
  return S.courses
    .map((c, i) => ({ c, i }))
    .filter(
      ({ c }) =>
        ['All staff', e.type === 'Plant' ? 'Plant' : 'Office'].includes(c.req) ||
        (c.req === 'Maintenance' && e.dept === 'Maintenance') ||
        (c.req === 'Stores' && e.dept === 'Stores & Logistics')
    );
}
const trainPct = (e, c, i) => {
  if (e.id === 'E-1003') return S.mine[c.n] || 0;
  const v = Math.max(0, Math.min(100, c.done + ((hsh(e.id, 0, 0, i + 7) % 61) - 30)));
  return v >= 94 ? 100 : v;
};
function profilePage() {
  const e = me(),
    r = profRows(e),
    t = S.tab.prof || 'personal',
    s = slip(e.ctc);
  const hero = `<div class="card prof-hero"><div class="pf-top"><button class="pf-avbtn" onclick="photoDialog()" aria-label="Change profile photo" title="Change profile photo">${av(e.name, 84)}<span class="pf-cam">${ic('camera', 15)}</span></button><div class="ph-main"><h2>${esc(e.name)}</h2><p class="muted">${esc(e.title)} · ${esc(e.dept)}</p><div class="chips2" style="margin-top:8px">${stChip(e.status)}${chip(e.id, 'mute', 1)}${chip(roleName(S.role), 'info', 1)}</div></div>
    <div class="ph-facts">${[
      ['Location', e.loc],
      ['Reports to', reportsTo(e)],
      ['Joined', fdate(e.join)],
      ['Tenure', tenure(e.join)]
    ]
      .map(([a, v]) => `<div class="pfact"><span>${a}</span><b>${esc(v)}</b></div>`)
      .join('')}</div>
<div class="ph-acts"><button class="btn primary ibtn" onclick="editMyProfile()" title="Edit my details" aria-label="Edit my details">${ic('sliders', 16)}</button><button class="btn ibtn" onclick="S.attEmp='';go('attendance')" title="My attendance" aria-label="My attendance">${ic('clock', 16)}</button><button class="btn ibtn" onclick="downloadProfile()" title="Download PDF" aria-label="Download PDF">${ic('download', 16)}</button></div></div></div>`;
  let body = '';
  if (t === 'personal')
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>Personal details</h2><p class="sub">How we know and reach you</p></div><button class="link" onclick="editMyProfile()">Edit</button></div><div class="list">${r.personal.map(x => pRow(...x)).join('')}</div></div>
    <div class="card"><div class="head"><div><h2>Emergency contact</h2><p class="sub">Called only in an emergency</p></div><button class="link" onclick="editMyProfile()">Edit</button></div><div class="list">${r.emergency.map(x => pRow(...x)).join('')}</div></div></div>`;
  else if (t === 'job') {
    const y = TODAY.getFullYear(),
      m = TODAY.getMonth(),
      n = new Date(y, m + 1, 0).getDate(),
      mc = { P: 0, A: 0, L: 0, late: 0 };
    for (let d = 1; d <= n; d++) {
      const o = dayInfo(e.id, y, m, d);
      if (o.st === 'P' || o.st === 'D') mc.P++;
      else if (o.st === 'A') mc.A++;
      else if (o.st === 'L' && !o.pend) mc.L++;
      if (o.late) mc.late++;
    }
    const b = balances(e.id),
      req = reqCourses(e);
    body =
      journeyCard(e) +
      `<div class="row c2"><div class="card"><div class="head"><div><h2>Employment</h2><p class="sub">Managed by HR</p></div></div><div class="list">${r.job.map(x => pRow(...x)).join('')}</div></div>
    <div class="card"><div class="head"><div><h2>At a glance</h2><p class="sub">${MON[m]} ${y}</p></div></div>
     <div class="mstat">${[
       ['Present', mc.P, 'green'],
       ['Absent', mc.A, 'red'],
       ['Leave', mc.L, 'brand'],
       ['Late', mc.late, 'amber']
     ]
       .map(
         ([l, v, tn]) =>
           `<div class="ms"><b>${v}</b><span><i style="background:var(--${tn})"></i>${l}</span></div>`
       )
       .join('')}</div>
     <div class="csec">Leave balance</div><div class="list">${Object.entries(b)
       .map(([k, v]) => pRow(POLICY[k].n, `${v.left} of ${v.t} days left`))
       .join('')}</div>
     <div class="csec">Required training</div><div class="list">${
       req.length
         ? req
             .map(({ c, i }) => {
               const p = trainPct(e, c, i);
               return `<div class="li"><div class="grow"><b>${esc(c.n)}</b><div class="bar ${p < 50 ? 'a' : ''}" style="margin-top:6px"><i style="width:${p}%"></i></div></div>${p >= 100 ? chip('Done', 'ok', 1) : `<b class="small" style="width:40px;text-align:right">${p}%</b>`}</div>`;
             })
             .join('')
         : '<div class="muted small">No required courses.</div>'
     }</div></div></div>`;
  } else if (t === 'assets') {
    const x = assetParts(e, { self: true });
    body = `<div class="row c21"><div class="card"><div class="head"><div><h2>Assigned to me</h2><p class="sub">${x.cur.length} item${x.cur.length === 1 ? '' : 's'} · serial numbers and issue dates</p></div></div>${x.curH}</div>
    <div class="card"><div class="head"><div><h2>Issue and return history</h2><p class="sub">Earlier assets</p></div></div>${x.pastH}</div></div>`;
  } else if (t === 'prefs') body = extPrefsPage();
  else if (t === 'pay')
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>Salary</h2><p class="sub">Visible only to you and HR</p></div><button class="link" onclick="go('payroll')">Payslips</button></div><div class="list">${[
      ['Annual CTC', inr(e.ctc)],
      ['Monthly gross', inr(s.m)],
      ['Deductions', inr(s.ded)],
      ['Net pay per month', inr(s.net)]
    ]
      .map(x => pRow(...x))
      .join('')}</div>
    <h3 class="dsub">Where your gross pay goes</h3>${salaryBar(s)}<div class="acts" style="margin-top:14px"><button class="btn" onclick="downloadPayslip('${e.id}','September 2026')">${ic('download', 16)}Latest payslip (PDF)</button></div></div>
    <div class="card"><div class="head"><div><h2>Bank and statutory</h2><p class="sub">Sensitive numbers are masked</p></div></div><div class="list">${[
      ['Bank', 'HDFC Bank'],
      ['Account number', 'XXXX XXXX 4821'],
      ['PAN', 'ABCPV****K'],
      ['UAN', '1008 **** 4521'],
      ['Provident fund', `${inr(s.pf)} per month`]
    ]
      .map(x => pRow(...x))
      .join('')}</div>
    <p class="muted small" style="margin-top:12px">To change bank or tax details, raise a request and HR will verify it.</p><div class="acts" style="margin-top:10px"><button class="btn" onclick="S.tab={rq:'help'};go('requests')">Raise a request</button></div></div></div>`;
  else
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>My documents</h2><p class="sub">Issued by HR</p></div></div><div class="list">${[
      ['offer', 'Offer letter'],
      ['appoint', 'Appointment letter'],
      ['form16', 'Form 16 · FY 2025-26'],
      ['idcard', 'ID card copy']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-brand" style="width:32px;height:32px">${ic('file', 16)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button> <button class="btn sm ico" onclick="downloadDoc('${k}')" aria-label="Download ${n}" title="Download PDF">${ic('download', 14)}</button></div>`
      )
      .join('')}</div></div>
    <div class="card"><div class="head"><div><h2>Verification</h2><p class="sub">Documents HR has checked</p></div></div><div class="list">${vdocRows(e, { self: true })}</div></div></div>`;
  return (
    ph('My profile', 'Your personal, employment and pay information') +
    hero +
    tabs(
      'prof',
      [
        ['personal', 'Personal'],
        ['job', 'Employment'],
        ['assets', 'Assets'],
        ['pay', 'Pay and bank'],
        ['docs', 'Documents'],
        ['prefs', 'Preferences']
      ],
      'personal'
    ) +
    body
  );
}
function downloadProfile() {
  const e = me(),
    r = profRows(e),
    secs = [],
    add = (t, rows) => {
      secs.push([t, '']);
      rows.forEach(([a, b]) => secs.push(['', `${a}: ${b}`]));
    };
  add('Personal details', r.personal);
  add('Emergency contact', r.emergency);
  add('Employment', r.job);
  saveFile(
    `Profile-${slug(e.name)}.pdf`,
    docPDF('Employee profile', `${e.id} · ${fdate(iso(TODAY))}`, secs)
  );
}
function editMyProfile() {
  const e = me(),
    pf = profOf(e),
    opt = (arr, v) => arr.map(s => `<option ${s === v ? 'selected' : ''}>${s}</option>`).join('');
  overlay(
    'Edit my details',
    `<p class="muted" style="margin-bottom:14px">Name, job and pay details are managed by HR. Update how we can reach you.</p><div class="fg">${fld('mp', 'Phone', `<input id="mp" type="tel" value="${esc(pf.phone)}" inputmode="tel" autocomplete="tel">`)}${fld('mb', 'Blood group', `<select id="mb">${opt(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], pf.blood)}</select>`)}${fld('ma', 'Current address', `<textarea id="ma" rows="2">${esc(pf.addr)}</textarea>`, 'full')}${fld('mn', 'Emergency contact name', `<input id="mn" value="${esc(pf.ecName)}">`)}${fld('mr', 'Relationship', `<select id="mr">${opt(['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'], pf.ecRel)}</select>`)}${fld('mq', 'Emergency contact phone', `<input id="mq" type="tel" value="${esc(pf.ecPhone)}">`, 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveMyProfile()">Save changes</button>`,
    { keepFocus: !!$('#layer .ov') }
  );
}
function saveMyProfile() {
  const e = me(),
    ph0 = $('#mp').value.trim(),
    ec = $('#mq').value.trim(),
    dg = s => s.replace(/\D/g, '').length;
  if (
    ![
      chk('mp', dg(ph0) >= 10 && dg(ph0) <= 13, 'Enter a valid phone number'),
      chk('ma', !!$('#ma').value.trim(), 'Enter your address'),
      chk('mn', !!$('#mn').value.trim(), 'Enter a contact name'),
      chk('mq', dg(ec) >= 10 && dg(ec) <= 13, 'Enter a valid phone number')
    ].every(Boolean)
  )
    return;
  e.phone = ph0;
  e.prof = {
    addr: $('#ma').value.trim(),
    blood: $('#mb').value,
    ecName: $('#mn').value.trim(),
    ecRel: $('#mr').value,
    ecPhone: ec
  };
  closeModal();
  render();
  toast('Your details were updated');
}

/* js/features/profile/photo.js */
/* ---------- profile photo: choose, crop to a square, preview, save or remove ---------- */
const PHOTO_MAX_MB = 5,
  PHOTO_PX = 256;
let photoDraft = null;
function photoBody() {
  const e = me(),
    shown = photoDraft || e.photo;
  return `<div class="ph-up">
    <div class="ph-prev">${shown ? `<img src="${shown}" alt="Photo preview">` : av(e.name, 160)}</div>
    <div class="ph-side">
      <p class="muted small">Use a clear, front-facing photo. JPG, PNG or WebP up to ${PHOTO_MAX_MB} MB. It is cropped to a square.</p>
      <label class="btn" for="ph-file">${ic('download', 15)}Choose photo</label>
      <input id="ph-file" class="sr" type="file" accept="image/jpeg,image/png,image/webp" onchange="photoPick(this.files[0])">
      <div id="ph-err" class="ph-err" role="alert"></div>
    </div>
  </div>`;
}
function photoFoot() {
  const e = me();
  return `${e.photo || photoDraft ? `<button class="btn bad" onclick="photoRemove()">Remove photo</button>` : ''}<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="photoSave()" ${photoDraft ? '' : 'disabled'}>Save photo</button>`;
}
function photoDialog() {
  photoDraft = null;
  overlay('Profile photo', photoBody(), photoFoot(), { keepFocus: !!$('#layer .ov') });
}
function photoRefresh(err) {
  const m = $('#layer .mb'),
    f = $('#layer .mf');
  if (m) m.innerHTML = photoBody();
  if (f) f.innerHTML = photoFoot();
  if (err) $('#ph-err').textContent = err;
}
function photoPick(file) {
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return photoRefresh('Choose a JPG, PNG or WebP image.');
  if (file.size > PHOTO_MAX_MB * 1024 * 1024)
    return photoRefresh(`That file is larger than ${PHOTO_MAX_MB} MB. Choose a smaller photo.`);
  const rd = new FileReader();
  rd.onerror = () => photoRefresh('We could not read that file. Try another photo.');
  rd.onload = () => {
    const img = new Image();
    img.onerror = () => photoRefresh('That file is not a valid image.');
    img.onload = () => {
      const s = Math.min(img.width, img.height),
        c = document.createElement('canvas');
      c.width = c.height = PHOTO_PX;
      c.getContext('2d').drawImage(
        img,
        (img.width - s) / 2,
        (img.height - s) / 2,
        s,
        s,
        0,
        0,
        PHOTO_PX,
        PHOTO_PX
      );
      photoDraft = c.toDataURL('image/jpeg', 0.85);
      photoRefresh();
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}
function photoSave() {
  if (!photoDraft) return;
  me().photo = photoDraft;
  photoDraft = null;
  audit('Profile photo changed', me().name + ' · ' + me().id);
  persist();
  closeModal();
  render();
  toast('Profile photo updated');
}
function photoRemove() {
  const e = me();
  delete e.photo;
  photoDraft = null;
  audit('Profile photo removed', e.name + ' · ' + e.id);
  persist();
  closeModal();
  render();
  toast('Profile photo removed');
}

/* js/features/dashboard/people-highlights.js */
/* =============== people highlights: birthdays, work anniversaries, new joiners =============== */
function nextOcc(ds) {
  const [, m, d] = ds.split('-').map(Number);
  let dt = new Date(TODAY.getFullYear(), m - 1, d);
  if (dt < TODAY) dt = new Date(TODAY.getFullYear() + 1, m - 1, d);
  return dt;
}
function celebrations(horizon) {
  const out = [];
  employees.forEach(e => {
    const b = dobOf(e);
    if (b) {
      const dt = nextOcc(b),
        days = Math.round((dt - TODAY) / 864e5);
      if (days <= horizon) out.push({ e, kind: 'bday', days, dt });
    }
    if (e.join) {
      const jd = new Date(e.join + 'T00:00:00'),
        dt = nextOcc(e.join),
        days = Math.round((dt - TODAY) / 864e5),
        yrs = dt.getFullYear() - jd.getFullYear();
      if (yrs >= 1 && days <= horizon) out.push({ e, kind: 'anniv', days, dt, yrs });
    }
  });
  return out.sort((a, b) => a.days - b.days || a.e.name.localeCompare(b.e.name));
}
const newJoiners = () =>
  employees
    .filter(e => {
      const j = new Date(e.join + 'T00:00:00');
      return j.getFullYear() === TODAY.getFullYear() && j.getMonth() === TODAY.getMonth();
    })
    .sort((a, b) => (a.join < b.join ? -1 : 1));
function wish(key, first, kind) {
  S.wished[key] = 1;
  render();
  setTimeout(() => ping(document.querySelector('#celebrations button[disabled]')), 0);
  toast(`${kind === 'bday' ? 'Birthday' : 'Work anniversary'} wishes sent to ${first}`);
}
function celebrationsCard() {
  const all = celebrations(7),
    today = all.filter(x => x.days === 0),
    soon = all.filter(x => x.days > 0),
    mine = me().id;
  const row = x => {
    const e = x.e,
      first = e.name.split(' ')[0],
      key = e.id + x.kind + x.dt.getFullYear(),
      sent = S.wished[key],
      when =
        x.days === 1
          ? 'Tomorrow'
          : DOWN[x.dt.getDay()].slice(0, 3) +
            ' ' +
            x.dt.getDate() +
            ' ' +
            MON[x.dt.getMonth()].slice(0, 3),
      lbl = x.kind === 'bday' ? 'Birthday' : `${x.yrs} year${x.yrs > 1 ? 's' : ''} at GMux`;
    const right =
      x.days > 0
        ? chip(when, 'mute', 1)
        : e.id === mine
          ? chip("That's you", 'mute', 1)
          : `<button class="btn sm" ${sent ? 'disabled' : ''} onclick="wish('${key}','${esc(first)}','${x.kind}')">${sent ? 'Sent' : 'Wish'}</button>`;
    return `<div class="li"><span class="ai ${x.kind === 'bday' ? 't-amber' : 't-violet'}">${ic(x.kind === 'bday' ? 'gift' : 'award', 18)}</span><div class="grow"><b>${esc(e.name)}</b><div class="muted small">${lbl} · ${esc(e.dept)}</div></div>${right}</div>`;
  };
  const body = all.length
    ? `${today.length ? `<div class="csec">Today</div><div class="list">${today.map(row).join('')}</div>` : ''}${
        soon.length
          ? `<div class="csec">Next 7 days</div><div class="list">${soon
              .slice(0, 6 - Math.min(today.length, 3))
              .map(row)
              .join('')}</div>`
          : ''
      }`
    : `<div class="empty"><span class="ei">${ic('gift', 22)}</span><b>No celebrations this week</b>No birthdays or work anniversaries in the next 7 days.</div>`;
  return `<div class="card" id="celebrations"><div class="head"><div><h2>Celebrations</h2><p class="sub">Birthdays and work anniversaries</p></div>${today.length ? chip(today.length + ' today', 'warn', 1) : ''}</div>${body}</div>`;
}
function newJoinersCard() {
  const list = newJoiners(),
    mgr = S.role !== 'employee';
  const body = list.length
    ? `<div class="list">${list
        .map(e => {
          const j = new Date(e.join + 'T00:00:00'),
            fut = j > TODAY,
            can = S.role === 'admin' || (mgr && scoped().some(x => x.id === e.id));
          const inner = `${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(e.dept)}</span></span>`;
          return `<div class="li">${can ? `<button class="cname" onclick="empProfile('${e.id}')">${inner}</button>` : `<div class="cname" style="cursor:default">${inner}</div>`}${chip((fut ? 'Joins ' : 'Joined ') + fshort(e.join), 'mute', 1)}</div>`;
        })
        .join('')}</div>`
    : `<div class="empty"><span class="ei">${ic('userplus', 22)}</span><b>No new joiners this month</b>New hires will show up here.</div>`;
  return `<div class="card" id="newjoiners"><div class="head"><div><h2>New joiners</h2><p class="sub">${MON[TODAY.getMonth()]} ${TODAY.getFullYear()}</p></div>${list.length ? chip(list.length + (list.length > 1 ? ' people' : ' person'), 'mute', 1) : ''}</div>${body}</div>`;
}

/* js/features/dashboard/dashboard.js */
/* =============== dashboard =============== */
function deptJump(n) {
  S.deptF = n;
  S.statF = 'All';
  S.q = '';
  go('employees');
}
function dashboard() {
  const u = me(),
    h = NOW.getHours(),
    g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening',
    dateStr = NOW.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  if (S.role === 'employee') {
    const bal = balances(u.id),
      sl = slip(u.ctc);
    return `<div class="hero">${clockCard(true, g + ', ' + u.name.split(' ')[0], dateStr + ' · General shift 09:00–18:00')}</div>
    <div class="qa">${[
      ['Apply for leave', 'cal', 'applyLeave()'],
      ['View payslip', 'wallet', "go('payroll')"],
      ['Raise a request', 'receipt', "go('requests')"],
      ['Update my goals', 'target', "go('performance')"]
    ]
      .map(
        ([l, i, a]) =>
          `<button onclick="${a}"><span class="ai t-brand">${ic(i, 18)}</span>${l}</button>`
      )
      .join('')}</div>
    ${needsAttentionCard(u.id)}
    <div class="row c21 wkrow">${myWeekCard(u.id)}${myMonthCard(u.id)}</div>
    <div class="row c21"><div class="card"><div class="head"><div><h2>Leave balance</h2><p class="sub">Days remaining this year</p></div><button class="link" onclick="go('leave')">Details ${ic('arrow', 14)}</button></div>
      <div class="rings">${Object.entries(bal)
        .map(([k, v]) => ring((v.left / v.t) * 100, v.left, POLICY[k].n, POLICY[k].c))
        .join('')}</div></div>
     <div class="card"><div class="head"><div><h2>Latest payslip</h2><p class="sub">September 2026</p></div>${chip('Paid', 'ok')}</div><div class="kpi"><span class="n">${inr(sl.net)}</span></div><p class="muted small" style="margin:4px 0 14px">Credited on 30 Sep</p><button class="btn" onclick="go('payroll')">Open payslip</button></div></div>
    <div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>
    <div class="row c2"><div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div><div class="card"><div class="head"><h2>Upcoming holidays</h2></div>${holList()}</div></div>`;
  }
  const sc = scoped(),
    p = presentToday(sc),
    pl = pendingLv().length,
    ap = approvalItems().length,
    open = S.incidents.filter(i => i.st !== 'Closed').length;
  const attn = [
    ap && {
      t: 't-amber',
      i: 'cal',
      b: `${ap} approval${ap > 1 ? 's' : ''}`,
      s: 'Waiting for you',
      a: "jumpTo('approvals')"
    },
    S.role === 'admin' && {
      t: 't-brand',
      i: 'wallet',
      b: 'Payroll in review',
      s: 'Cut-off in 3 days',
      p: 'payroll'
    },
    open && {
      crit: 1,
      t: 't-red',
      i: 'shield',
      b: `${open} open incident${open > 1 ? 's' : ''}`,
      s: 'Investigation due',
      p: 'safety'
    },
    { t: 't-teal', i: 'book', b: '14 renewals due', s: 'First aid · by Oct 28', p: 'training' }
  ].filter(Boolean);
  const dep = DEPTS.map((d, i) => ({
    l: d,
    v: sc.filter(e => e.dept === d).length,
    c: DC[i]
  })).filter(x => x.v);
  const ti = dow(),
    sh = ['A', 'B', 'C', 'G'].map(k => [
      k,
      sc.filter(e => (S.roster[e.id] || [])[ti] === k).length
    ]),
    shm = Math.max(...sh.map(x => x[1]), 1);
  return (
    ph(
      `${g}, ${u.name.split(' ')[0]}`,
      `${dateStr} · ${S.role === 'admin' ? 'Company overview' : 'Production, Quality and Maintenance'}`,
      S.role === 'admin'
        ? `<button class="btn" onclick="go('payroll')">${ic('wallet', 16)}Run payroll</button><button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>`
        : `<button class="btn primary" onclick="go('roster')">${ic('grid', 16)}Open roster</button>`
    ) +
    `<div class="attn">${attn.map(a => `<button class="att${a.crit ? ' crit' : ''}" onclick="${a.a || `go('${a.p}')`}"><span class="ai ${a.t}">${ic(a.i, 18)}</span><span><b>${a.b}</b><small>${a.s}</small></span></button>`).join('')}</div>
  <div class="row c4">
   ${kpi({ go: 'employees', l: 'Headcount', v: sc.length, icon: 'users', tone: 't-brand', spark: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16].map(x => Math.round((x * sc.length) / 16)), p: delta('+2', true, 'up'), d: 'new this quarter' })}
   ${kpi({ go: 'attendance', l: 'Present today', v: p.pr + `<small> / ${sc.length}</small>`, icon: 'check', tone: 't-green', spark: [93, 95, 92, 96, 94, 91, 94, 95, 93, 96, 92, 95, 94, p.pct], p: delta(p.pct + '%', p.pct >= 90 ? true : null), d: 'attendance, last 14 days' })}
   ${kpi({ go: 'leave', l: 'On leave', v: p.on, icon: 'cal', tone: 't-amber', spark: [2, 1, 1, 2, 2, 1, 0, 1, 1, 2, 1, 1, 0, p.on], p: delta(pl + ' pending', null), d: 'waiting for approval' })}
   ${kpi({ go: 'recruit', l: 'Open positions', v: S.role === 'admin' ? 3 : 1, icon: 'brief', tone: 't-violet', spark: [4, 6, 5, 8, 7, 9, 8, Math.max(S.cands.length, 1)], d: S.cands.length + ' candidates in the pipeline' })}
  </div>
  <div class="row c3">${myDayCard()}${teamTodayCard()}<div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div><button class="link" onclick="go('leave')">Leave</button></div>${whoOut()}</div></div>
  <div class="row c2">
   <div class="card"><div class="head"><div><h2>Attendance this week</h2><p class="sub">Percent of staff present each day</p></div>${chip('Today ' + p.pct + '%', 'info', 1)}</div>${barChart(weekAtt(sc), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { share: 1 / 2, stackAt: 900, today: ti, target: 95, unit: '%', low: 80, label: 'Attendance this week' })}</div>
   ${approvalsCard()}
  </div>
  <div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>
  <div class="row c3">
   <div class="card"><div class="head"><div><h2>Workforce</h2><p class="sub">Headcount by department</p></div></div>${donut(dep, 'people', 'deptJump')}</div>
   <div class="card"><div class="head"><div><h2>Today's shifts</h2><p class="sub">People assigned across the plant</p></div><button class="link" onclick="go('roster')">Roster</button></div><div class="list">${sh.map(([k, n]) => `<div class="li"><span class="shift ${k}" style="cursor:default;width:30px;height:28px">${k}</span><div class="grow"><div class="small">${SHIFTS[k]}</div><div class="bar ${k === 'C' ? '' : k === 'B' ? 'a' : 't'}" style="margin-top:5px"><i style="width:${(n / shm) * 100}%"></i></div></div><b>${n}</b></div>`).join('')}</div></div>
   <div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div>
  </div>`
  );
}

/* js/features/employees/employees.js */
/* =============== employees =============== */
const SORTS = {
  name: 'Name A–Z',
  '-name': 'Name Z–A',
  dept: 'Department A–Z',
  '-dept': 'Department Z–A',
  '-join': 'Newest joined',
  join: 'Longest serving'
};
function sortEmps(list) {
  const k = S.sort || 'name',
    d = k[0] === '-' ? -1 : 1,
    f = k.replace('-', '');
  const key = e => (f === 'name' ? e.name : f === 'dept' ? e.dept + ' ' + e.name : e.join);
  return [...list].sort((a, b) => (key(a) < key(b) ? -d : key(a) > key(b) ? d : 0));
}
function sortEmp(k) {
  const cur = S.sort || 'name';
  S.sort = cur === k ? '-' + k : k;
  render();
}
function filteredEmps() {
  return sortEmps(
    scoped().filter(
      e =>
        (S.deptF === 'All' || e.dept === S.deptF) &&
        (S.statF === 'All' || e.status === S.statF) &&
        (!S.q || (e.name + e.title + e.id + e.dept).toLowerCase().includes(S.q.toLowerCase()))
    )
  );
}
function empList(f) {
  if (S.view === 'cards')
    return f.length
      ? `<div class="pgrid">${f.map(e => `<div class="pcard" role="button" tabindex="0" onclick="empProfile('${e.id}')" onkeydown="if(event.key==='Enter')this.click()">${av(e.name, 56)}<div><b>${esc(e.name)}</b><span class="t">${esc(e.title)}</span></div><span class="muted small">${e.dept}</span>${stChip(e.status)}</div>`).join('')}</div>`
      : `<div class="empty"><b>No employees match</b>Try a different search or filter.</div>`;
  return rtable(
    [
      { h: 'Employee', sk: 'name', keep: 1 },
      { h: 'ID', xm: 1, hid: !colOn('id') },
      { h: 'Department', sk: 'dept', xm: 1, hid: !colOn('dept') },
      { h: 'Location', xm: 1, hid: !colOn('loc') },
      { h: 'Status', hid: !colOn('status') }
    ],
    f.map(e => ({
      click: `empProfile('${e.id}')`,
      cells: [person(e), e.id, e.dept, e.loc, stChip(e.status)]
    })),
    {
      et: 'No employees match',
      em: 'Try a different search or filter.',
      sort: S.sort || 'name',
      sortFn: 'sortEmp'
    }
  );
}
function employeesPage() {
  const base = scoped();
  return (
    ph(
      S.role === 'admin' ? 'Employees' : 'My team',
      `${base.length} people across ${new Set(base.map(e => e.dept)).size} departments`,
      `<button class="btn" onclick="exportEmps()">${ic('download', 16)}Export CSV</button>` +
        (S.role === 'admin'
          ? `<button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>`
          : '')
    ) +
    `<div class="row c4 statrow">${(() => {
      const N = base.length || 1,
        o = base.filter(e => e.type === 'Office').length,
        pl = base.filter(e => e.type === 'Plant').length,
        pr = base.filter(e => e.status === 'Probation').length,
        sh = x => Math.round((x / N) * 100) + '% of people';
      return [
        kpi({
          l: 'Total people',
          v: base.length,
          icon: 'users',
          tone: 't-brand',
          spark: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16].map(x =>
            Math.round((x * base.length) / 16)
          ),
          p: delta('+2', true, 'up'),
          d: 'new this quarter'
        }),
        kpi({
          l: 'Office',
          v: o,
          icon: 'brief',
          tone: 't-teal',
          bar: (o / N) * 100,
          bl: sh(o),
          d: 'Gurugram HQ'
        }),
        kpi({
          l: 'Plant and shop floor',
          v: pl,
          icon: 'box',
          tone: 't-amber',
          bar: (pl / N) * 100,
          bl: sh(pl),
          d: 'Manesar Plant'
        }),
        kpi({
          l: 'On probation',
          v: pr,
          icon: 'userplus',
          tone: 't-violet',
          bar: (pr / N) * 100,
          bl: sh(pr),
          d: 'confirmation pending'
        })
      ].join('');
    })()}</div>
  <div class="card"><div class="tools"><label class="sbox">${ic('search', 16)}<input id="q" placeholder="Search name, role or ID" value="${esc(S.q)}" oninput="S.q=this.value;renderList()" aria-label="Search employees"></label>
   <select class="sel" onchange="S.deptF=this.value;render()" aria-label="Department">${['All', ...DEPTS].map(d => `<option value="${d}" ${S.deptF === d ? 'selected' : ''}>${d === 'All' ? 'All departments' : d}</option>`).join('')}</select>
   <div class="tabs" role="group" aria-label="Status">${['All', 'Active', 'Probation', 'On leave'].map(s => `<button class="tab ${S.statF === s ? 'on' : ''}" onclick="S.statF='${s}';render()">${s}</button>`).join('')}</div>
   <div class="grow"></div>
   ${viewsSel()}<span class="muted small nw" id="ecount" aria-label="${filteredEmps().length} of ${base.length} employees" title="Employees shown">${filteredEmps().length} of ${base.length}</span>${S.view === 'cards' ? '' : colsCtl()}
   <div class="tabs desk" role="group" aria-label="View"><button class="tab ${S.view === 'list' ? 'on' : ''}" onclick="S.view='list';render()" aria-label="List view">${ic('list', 16)}</button><button class="tab ${S.view === 'cards' ? 'on' : ''}" onclick="S.view='cards';render()" aria-label="Card view">${ic('grid', 16)}</button></div></div>
   <div id="elist">${empList(filteredEmps())}</div></div>`
  );
}
function renderList() {
  $('#elist').innerHTML = empList(filteredEmps());
  {
    const e = $('#ecount'),
      n = filteredEmps().length,
      N = scoped().length;
    e.textContent = `${n} of ${N}`;
    e.setAttribute('aria-label', `${n} of ${N} employees`);
  }
}
function tenure(j) {
  const m = Math.max(0, Math.round((TODAY - new Date(j + 'T00:00:00')) / 2629800000)),
    y = Math.floor(m / 12);
  return (y ? y + ' yr ' : '') + (m % 12) + ' mo';
}
function empProfile(id, t = 'overview') {
  const e = employees.find(x => x.id === id),
    row = (a, b) =>
      `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  let body = '';
  if (t === 'overview')
    body = `<div class="list">${row('Employee ID', e.id)}${row('Work type', e.type === 'Plant' ? 'Plant / shop floor' : 'Office')}${row('Location', e.loc)}${row('Reports to', reportsTo(e))}${row('Email', esc(e.email))}${row('Phone', e.phone)}</div>`;
  else if (t === 'job') {
    const b = balances(e.id);
    body = `<div class="list">${row('Department', e.dept)}${row('Designation', esc(e.title))}${row('Date of joining', fdate(e.join))}${row('Tenure', tenure(e.join))}${row('Annual CTC', canField('salary', e.id) ? inr(e.ctc) : restricted())}${row('Work calendar', calLabel(e))}${e.type === 'Plant' ? row('Current shift', SHIFTS[(S.roster[e.id] || [])[dow()]] || '—') : ''}${
      e.id === USER.employee
        ? Object.entries(b)
            .map(([k, v]) => row(POLICY[k].n, `${v.left} of ${v.t} left`))
            .join('')
        : ''
    }</div>`;
  } else if (t === 'assets') {
    const x = assetParts(e, { admin: S.role === 'admin', after: id });
    body = `${S.role === 'admin' ? `<div class="acts" style="margin-bottom:12px"><button class="btn primary sm" onclick="issueAsset(null,'${id}','${id}')">${ic('plus', 14)}Issue asset</button></div>` : ''}${x.curH}<h3 class="dsub">Issue and return history</h3>${x.pastH}`;
  } else if (!canField('ids', e.id))
    body = `<div class="empty"><span class="ei">${ic('lock', 22)}</span><b>Identity documents are restricted</b>You do not have access to identity documents. Ask your HR Admin if you need them.</div>`;
  else
    body = `<div class="list"><div class="li"><span class="ai t-brand" style="width:32px;height:32px">${ic('file', 16)}</span><div class="grow"><b>Offer letter</b></div>${stChip('Verified')}</div>${vdocRows(e, {})}</div>${S.role === 'admin' ? '<p class="muted small" style="margin-top:10px">Select a document to preview it, approve it, or ask for a new upload.</p>' : ''}`;
  overlay(
    'Employee profile',
    `<div class="person" style="margin-bottom:16px">${av(e.name, 56)}<div><b style="font-size:16px">${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span><div style="margin-top:6px;display:flex;gap:6px">${stChip(e.status)}${chip(e.id, 'mute', 1)}</div></div></div>
   <div class="ut" role="tablist">${[
     ['overview', 'Overview'],
     ['job', 'Employment'],
     ['assets', 'Assets'],
     ['docs', 'Documents']
   ]
     .map(
       ([v, l]) =>
         `<button class="${t === v ? 'on' : ''}" role="tab" aria-selected="${t === v}" onclick="empProfile('${id}','${v}')">${l}</button>`
     )
     .join('')}</div>${body}`,
    `${isMgr() ? `<button class="btn" onclick="S.attEmp='${id}';S.calOff=0;closeModal();go('attendance')">${ic('cal', 15)}View attendance</button>` : ''}${S.role === 'admin' ? `<button class="btn" onclick="editEmp('${id}')">Edit details</button>` : ''}<button class="btn" onclick="closeModal()">Close</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function editEmp(id) {
  const e = employees.find(x => x.id === id),
    opt = (arr, v) => arr.map(s => `<option ${s === v ? 'selected' : ''}>${s}</option>`).join('');
  overlay(
    'Edit employee',
    `<div class="fg">${fld('et', 'Job title', `<input id="et" value="${esc(e.title)}">`)}${fld('ed', 'Department', `<select id="ed">${opt(DEPTS, e.dept)}</select>`)}${fld('es', 'Status', `<select id="es">${opt(['Active', 'Probation', 'On leave'], e.status)}</select>`)}${fld('el', 'Location', `<select id="el">${opt(['Gurugram HQ', 'Manesar Plant'], e.loc)}</select>`)}${fld('ec', 'Annual CTC (₹)', `<input id="ec" type="number" min="0" value="${e.ctc}">`, 'full')}${fld('edob', 'Date of birth', `<input id="edob" type="date" value="${dobOf(e)}">`, 'full')}</div>`,
    `<button class="btn" onclick="empProfile('${id}')">Cancel</button><button class="btn primary" onclick="saveEditEmp('${id}')">Save changes</button>`,
    { side: true, keepFocus: true }
  );
}
function saveEditEmp(id) {
  const e = employees.find(x => x.id === id),
    t = $('#et').value.trim(),
    c = +$('#ec').value;
  if (
    ![
      chk('et', !!t, 'Enter a job title'),
      chk('ec', c > 0, 'Enter the annual CTC in rupees')
    ].every(Boolean)
  )
    return;
  e.title = t;
  e.dept = $('#ed').value;
  e.status = $('#es').value;
  e.loc = $('#el').value;
  e.ctc = c;
  {
    const nd = $('#edob').value;
    if (nd) e.dob = nd;
  }
  e.type = e.loc === 'Manesar Plant' ? 'Plant' : 'Office';
  if (e.type === 'Plant' && !S.roster[e.id]) S.roster[e.id] = ['G', 'G', 'G', 'G', 'G', 'G', 'O'];
  render();
  empProfile(id);
  toast('Changes saved');
}
function addEmp() {
  overlay(
    'Add employee',
    `<div class="fg">${fld('n', 'Full name', '<input id="n" placeholder="e.g. Anita Rao" autocomplete="off">')}${fld('t', 'Job title', '<input id="t" placeholder="e.g. Welder">')}
   ${fld('d', 'Department', `<select id="d">${DEPTS.map(d => `<option>${d}</option>`).join('')}</select>`)}${fld('ty', 'Work type', '<select id="ty"><option>Office</option><option>Plant</option></select>')}
   ${fld('j', 'Date of joining', `<input id="j" type="date" value="${iso(NOW)}">`)}${fld('c', 'Annual CTC (₹)', '<input id="c" type="number" min="0" inputmode="numeric" placeholder="480000">')}${fld('dob', 'Date of birth (optional)', '<input id="dob" type="date">', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveEmp()">Save employee</button>`
  );
}
function saveEmp() {
  const n = $('#n').value.trim(),
    t = $('#t').value.trim(),
    c = +$('#c').value;
  const ok = [
    chk('n', !!n, "Enter the employee's full name"),
    chk('t', !!t, 'Enter a job title'),
    chk('c', c > 0, 'Enter the annual CTC in rupees')
  ].every(Boolean);
  if (!ok) return;
  const id = 'E-' + (1001 + employees.length),
    ty = $('#ty').value;
  employees.push(
    E(
      id,
      n,
      $('#d').value,
      t,
      ty,
      $('#j').value,
      c,
      'Probation',
      ty === 'Plant' ? 'Manesar Plant' : 'Gurugram HQ'
    )
  );
  if ($('#dob').value) employees[employees.length - 1].dob = $('#dob').value;
  if (ty === 'Plant') S.roster[id] = ['G', 'G', 'G', 'G', 'G', 'G', 'O'];
  closeModal();
  render();
  toast(n + ' added to employees');
}

/* js/features/attendance/attendance.js */
/* =============== attendance =============== */
function clockCard(dark, title, sub) {
  const c = S.clock,
    state = c.out
      ? chip('Day complete', dark ? 'glass' : 'ok')
      : c.in
        ? chip('Clocked in', dark ? 'glass' : 'ok')
        : chip('Not clocked in', dark ? 'glass' : 'mute');
  return `<div class="clockc ${dark ? 'dark' : ''}"><div>${title ? `<h1>${title}</h1><p>${sub}</p><div style="height:14px"></div>` : ''}<div style="display:flex;gap:10px;align-items:center;margin-bottom:4px">${state}${c.in ? `<span class="small" style="opacity:.8">${esc(c.mode)}</span>` : ''}</div><div class="timer" id="timer">00:00:00</div><div class="ck-sub" id="tsub"></div>${vstrip(c.mode)}</div>
   <div class="ck-r"><div class="field" style="margin:0;min-width:180px"><label for="mode" style="${dark ? 'color:#C1CBE2;' : ''}font-weight:500;font-size:13px">Work mode</label><select id="mode" onchange="S.clock.mode=this.value;vstripUpdate()" ${c.in ? 'disabled' : ''}>${['Office', 'Plant gate (biometric)', 'Work from home', 'On-site visit'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
   <button class="btn big ${dark ? 'light' : 'primary'}" onclick="toggleClock()" ${c.out ? 'disabled' : ''}>${c.out ? 'Done for today' : c.in ? 'Clock out' : 'Clock in'}</button></div></div>`;
}
function toggleClock() {
  const c = S.clock;
  if (!c.in) {
    c.in = new Date();
    toast(
      'Clocked in at ' +
        hm(c.in) +
        (c.in.getHours() * 60 + c.in.getMinutes() > 555 ? '. Marked late (after 09:15).' : '')
    );
  } else if (!c.out) {
    c.out = new Date();
    toast('Clocked out at ' + hm(c.out));
  }
  render();
}
function tick() {
  const t = $('#timer');
  if (!t) return;
  const c = S.clock,
    sub = $('#tsub');
  if (!c.in) {
    t.textContent = '00:00:00';
    if (sub) sub.textContent = 'Tap Clock in when you start your shift';
    return;
  }
  const end = c.out || new Date(),
    s = Math.max(0, Math.floor((end - c.in) / 1000));
  t.textContent =
    pad(Math.floor(s / 3600)) + ':' + pad(Math.floor((s % 3600) / 60)) + ':' + pad(s % 60);
  if (sub)
    sub.textContent = c.out
      ? `Worked ${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m today`
      : 'Clocked in at ' + hm(c.in) + ' · location verified (simulated)';
}
setInterval(tick, 1000);
/* ---- attendance: one model for every day, used by the calendar, the day view and the team table ---- */
const MON = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DOWN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHT = {
  G: { s: [9, 0], e: [18, 0], n: 'General' },
  A: { s: [6, 0], e: [14, 0], n: 'Morning' },
  B: { s: [14, 0], e: [22, 0], n: 'Afternoon' },
  C: { s: [22, 0], e: [6, 0], n: 'Night' }
};
const STN = {
  N: 'Not joined',
  P: 'Present',
  A: 'Absent',
  L: 'On leave',
  H: 'Holiday',
  W: 'Weekly off',
  D: 'Half day',
  T: 'Not clocked in',
  '': 'Upcoming'
};
const STK2 = {
  N: 'mute',
  P: 'ok',
  A: 'bad',
  L: 'info',
  H: 'warn',
  W: 'mute',
  D: 'warn',
  T: 'mute',
  '': 'mute'
};
const tm = min => {
  const x = ((Math.round(min) % 1440) + 1440) % 1440;
  return pad(Math.floor(x / 60)) + ':' + pad(x % 60);
};
const dur = min => {
  const h = Math.floor(min / 60),
    m = Math.round(min % 60);
  return h ? `${h}h ${pad(m)}m` : `${m}m`;
};
const toMin = s => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};
const hsh = (id, y, m, d) => {
  let h = 7;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 100003;
  return (h + d * 131 + m * 37 + y * 3) % 9973;
};
const baseShift = e => {
  if (e.type !== 'Plant') return 'G';
  const r = S.roster[e.id] || [];
  return r.find(x => x && x !== 'O') || 'G';
};
const leaveOn = (id, dt) => {
  const s = iso(dt);
  return S.leaves.find(
    l =>
      l.emp === id &&
      l.status !== 'Rejected' &&
      l.status !== 'Cancelled' &&
      l.from <= s &&
      s <= l.to
  );
};
function dayInfo(empId, y, m, d) {
  const e = employees.find(x => x.id === empId),
    dt = new Date(y, m, d),
    s = iso(dt),
    plant = e.type === 'Plant';
  const sh = SHT[baseShift(e)],
    start = sh.s[0] * 60 + sh.s[1],
    end = sh.e[0] * 60 + sh.e[1] + (sh.e[0] <= sh.s[0] ? 1440 : 0);
  const o = {
    empId,
    e,
    y,
    m,
    d,
    dt,
    iso: s,
    st: '',
    in: null,
    out: null,
    mins: null,
    late: 0,
    early: 0,
    ot: 0,
    mode: '',
    loc: '',
    note: '',
    start,
    end,
    shiftName: sh.n,
    shiftTxt: `${sh.n} · ${tm(start)}–${tm(end)}`,
    leave: null,
    pend: false,
    hol: null,
    live: false,
    miss: false,
    reg: null,
    ov: false
  };
  if (e.join && dt < new Date(e.join + 'T00:00:00')) {
    o.st = 'N';
    o.note = 'Not joined yet';
    return o;
  } // nothing before the joining date
  const hol = HOLIDAYS.find(h => h.m === m && h.d === d);
  if (hol) {
    o.st = 'H';
    o.hol = hol.n;
    o.offWork = offWorkOf(o);
    return o;
  }
  if (!worksDay(e, dt)) {
    o.st = 'W';
    o.offWork = offWorkOf(o);
    return o;
  }
  const lv = leaveOn(empId, dt);
  if (lv) {
    o.st = 'L';
    o.leave = lv;
    o.pend = lv.status === 'Pending';
    return o;
  }
  o.reg = S.regs.filter(r => r.emp === empId && r.date === s).slice(-1)[0] || null;
  if (dt > TODAY) return o;
  const hh = hsh(empId, y, m, d),
    place = mode => {
      o.mode = mode;
      o.loc =
        mode === 'Work from home'
          ? 'Home · IP verified'
          : plant
            ? 'Manesar Plant · Gate 2'
            : 'Gurugram HQ · geofence verified';
    };
  if (dt.getTime() === TODAY.getTime()) {
    const nowM = NOW.getHours() * 60 + NOW.getMinutes();
    if (empId === me().id) {
      const c = S.clock;
      if (!c.in) {
        o.st = 'T';
        return o;
      }
      o.st = 'P';
      o.in = c.in.getHours() * 60 + c.in.getMinutes();
      place(c.mode);
      const t = c.out || new Date(),
        outM = t.getHours() * 60 + t.getMinutes();
      if (c.out) o.out = outM;
      else o.live = true;
      o.mins = Math.max(0, outM - o.in);
    } else {
      if (e.status === 'On leave') {
        o.st = 'L';
        o.leave = { type: 'SL', status: 'Approved', reason: 'Medical leave', from: s, to: s };
        return o;
      }
      if (empId === 'E-1011') {
        o.st = 'A';
        return o;
      }
      o.st = 'P';
      o.in = start - 10 + (hh % 22);
      o.live = true;
      place(plant ? 'Plant gate (biometric)' : 'Office');
      o.mins = Math.max(0, nowM - o.in);
    }
    dayFlags(o);
    return o;
  }
  const ov = S.dayOv[empId + '|' + s],
    reg = o.reg;
  const forceP = !!reg && ['Missed punch-out', 'Late mark waiver'].includes(reg.type);
  const r = hh % 13;
  let kind = 'P';
  if (!ov && !forceP) {
    if (r === 0) kind = 'A';
    else if (r === 4 || (r === 9 && d % 2)) {
      o.st = 'L';
      o.leave = {
        type: 'CL',
        status: 'Approved',
        reason: 'Casual leave',
        from: s,
        to: s,
        synthetic: true
      };
      return o;
    } else if (hh % 17 === 5) kind = 'D';
  }
  if (kind === 'A') {
    o.st = 'A';
    return o;
  }
  o.st = kind;
  const late =
    !ov && (hh % 7 === 2 || (reg && reg.type === 'Late mark waiver' && reg.status !== 'Approved'));
  const early = !ov && hh % 11 === 3;
  place(plant ? 'Plant gate (biometric)' : hh % 9 === 1 ? 'Work from home' : 'Office');
  o.in = start + (late ? 18 + (hh % 22) : -12 + (hh % 19));
  if (ov) {
    o.in = toMin(ov.in);
    o.out = toMin(ov.out);
    if (o.out <= o.in) o.out += 1440;
    o.ov = true;
    o.note = ov.note || 'Regularized';
  } else if (kind === 'D') {
    o.out = o.in + 240 + (hh % 25);
    o.note = 'Half day';
  } else if (reg && reg.type === 'Missed punch-out' && reg.status !== 'Approved') {
    o.out = null;
    o.miss = true;
  } else o.out = end + (early ? -(55 + (hh % 35)) : hh % 4 === 1 ? 45 + (hh % 9) * 15 : hh % 44);
  if (o.out != null) o.mins = o.out - o.in;
  dayFlags(o, ov && ov.waiveLate);
  if (ov && ov.waiveLate) o.note = 'Late mark waived';
  return o;
}
function dayCell(o) {
  const lab =
    {
      P: 'Present',
      A: 'Absent',
      L: o.pend ? 'Pending' : 'Leave',
      H: 'Holiday',
      D: 'Half day',
      T: 'Not in yet'
    }[o.st] || '';
  const sh = { P: 'P', A: 'A', L: 'L', H: 'H', D: '½', T: '·' }[o.st] || '';
  const pend = o.reg && o.reg.status === 'Pending';
  const sr = `, ${DOWN[o.dt.getDay()]} ${o.d} ${MON[o.m]}${o.hol ? ', ' + o.hol : ''}${o.in != null ? `, in ${tm(o.in)}` : ''}${o.out != null ? `, out ${tm(o.out)}` : ''}${o.late ? ', late' : ''}${pend ? ', correction pending' : ''}. Open details`;
  const mk =
    (o.late ? '<i class="mk" title="Late"></i>' : '') +
    (pend ? '<i class="mk q" title="Correction pending"></i>' : '');
  return `<button class="d ${o.st || 'F'}${o.pend ? ' pend' : ''}${o.dt.getTime() === TODAY.getTime() ? ' today' : ''}" onclick="attDay('${o.empId}',${o.y},${o.m},${o.d})"><b>${o.d}</b><span data-s="${sh}">${lab}</span><span class="sr">${esc(sr)}</span>${mk ? `<em class="mks">${mk}</em>` : ''}</button>`;
}
function calMove(n) {
  S.calOff = n === 0 ? 0 : Math.max(-12, Math.min(6, S.calOff + n));
  render();
}
function attendance() {
  const u = me(),
    team = scoped(),
    canPick = isMgr();
  const eid = canPick && S.attEmp && team.some(x => x.id === S.attEmp) ? S.attEmp : u.id,
    pe = employees.find(x => x.id === eid),
    other = eid !== u.id;
  const b = new Date(NOW.getFullYear(), NOW.getMonth() + S.calOff, 1),
    y = b.getFullYear(),
    m = b.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    first = new Date(y, m, 1).getDay();
  const cells = [],
    cnt = { P: 0, A: 0, L: 0, late: 0 };
  for (let i = 0; i < (first + 6) % 7; i++) cells.push('<div></div>');
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(eid, y, m, d);
    if (o.st === 'P' || o.st === 'D') cnt.P++;
    else if (o.st === 'A') cnt.A++;
    else if (o.st === 'L' && !o.pend) cnt.L++;
    if (o.late) cnt.late++;
    cells.push(dayCell(o));
  }
  const c = S.clock,
    td = TD();
  const sd =
      S.attDate && /^\d{4}-\d{2}-\d{2}$/.test(S.attDate)
        ? new Date(S.attDate + 'T00:00:00')
        : TODAY,
    sdv = [sd.getFullYear(), sd.getMonth(), sd.getDate()],
    isT = sd.getTime() === TODAY.getTime();
  let acts;
  if (!other)
    acts = [
      c.in && { t: 'Clock in', w: hm(c.in), s: c.mode },
      c.out && { t: 'Clock out', w: hm(c.out), s: 'Shift ended' }
    ].filter(Boolean);
  else {
    const o = dayInfo(eid, ...td);
    acts = [
      o.in != null && { t: 'Clock in', w: tm(o.in), s: o.mode },
      o.out != null && { t: 'Clock out', w: tm(o.out), s: 'Shift ended' }
    ].filter(Boolean);
  }
  const me0 = dayInfo(eid, ...td);
  const picker = canPick
    ? `<div class="card pickbar"><div class="field" style="margin:0"><label for="atte">Show attendance for</label><select id="atte" onchange="S.attEmp=this.value;S.calOff=0;render()"><option value="">Me (${esc(u.name)})</option>${team
        .filter(e => e.id !== u.id)
        .map(
          e =>
            `<option value="${e.id}" ${e.id === eid ? 'selected' : ''}>${esc(e.name)} · ${esc(e.dept)}</option>`
        )
        .join(
          ''
        )}</select></div>${other ? `<button class="btn" onclick="S.attEmp='';render()">Back to my attendance</button>` : ''}</div>`
    : '';
  const rows = team.map(e => dayInfo(e.id, ...sdv)),
    n = { P: 0, late: 0, L: 0, A: 0 };
  rows.forEach(o => {
    if (o.st === 'P' || o.st === 'D') n.P++;
    if (o.late) n.late++;
    if (o.st === 'L') n.L++;
    if (o.st === 'A') n.A++;
  });
  return (
    ph(
      'Attendance',
      other
        ? `${pe.name} · ${pe.title} · ${MON[NOW.getMonth()]} ${NOW.getFullYear()}`
        : `${MON[NOW.getMonth()]} ${NOW.getFullYear()} · ${me0.shiftTxt}`
    ) +
    `${other ? '' : `<div class="card">${clockCard(false)}</div>`}${picker}
  <div class="row c4 statrow">${(() => {
    const D = cnt.P + cnt.A + cnt.L || 1,
      sh = x => Math.round((x / D) * 100) + '% of days';
    return [
      kpi({
        l: 'Days present',
        v: cnt.P,
        icon: 'check',
        tone: 't-green',
        bar: (cnt.P / D) * 100,
        bl: sh(cnt.P),
        d: 'this month'
      }),
      kpi({
        l: 'Absent',
        v: cnt.A,
        icon: 'x',
        tone: 't-red',
        bar: (cnt.A / D) * 100,
        bl: sh(cnt.A),
        d: 'without leave'
      }),
      kpi({
        l: 'On leave',
        v: cnt.L,
        icon: 'cal',
        tone: 't-brand',
        bar: (cnt.L / D) * 100,
        bl: sh(cnt.L),
        d: 'approved leave'
      }),
      kpi({
        l: 'Late marks',
        v: cnt.late,
        icon: 'clock',
        tone: 't-amber',
        bar: (cnt.late / D) * 100,
        bl: sh(cnt.late),
        d: 'arrived after grace time'
      })
    ].join('');
  })()}</div>
  <div class="row c21">
   <div class="card"><div class="head"><div><h2>${other ? esc(pe.name.split(' ')[0]) + "'s calendar" : 'Monthly calendar'}</h2><p class="sub">${other ? 'Read only · ' : ''}Select a day to see punch times and details</p></div>
     <div class="mnv"><button class="icon-btn" onclick="calMove(-1)" aria-label="Previous month">${ic('chev', 16)}</button><b>${MON[m]} ${y}</b><button class="icon-btn" onclick="calMove(1)" aria-label="Next month">${ic('chev', 16)}</button>${S.calOff ? `<button class="btn sm" onclick="calMove(0)">This month</button>` : ''}</div><button class="icon-btn" onclick="attCSV('${eid}')" aria-label="Download ${MON[m]} ${y} as CSV" title="Download as CSV">${ic('download', 16)}</button></div>
    <div class="legend lgd"><span><i style="background:var(--green-soft)"></i>Present</span><span><i style="background:var(--red-soft)"></i>Absent</span><span><i style="background:var(--brand-soft)"></i>Leave</span><span><i style="background:var(--amber-soft)"></i>Half day or holiday</span><span><span class="mk"></span>Late</span><span><span class="mk q"></span>Correction pending</span></div>
    <div class="cal" role="group" aria-label="${MON[m]} ${y} attendance">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<div class="dh">${x}</div>`).join('')}${cells.join('')}</div></div>
   <div class="card"><div class="head"><div><h2>Today's punches</h2><p class="sub">${other ? esc(pe.name) + ' · ' : ''}${NOW.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p></div><button class="link" onclick="attDay('${eid}',${td.join(',')})">Details</button></div>${acts.length ? `<div class="tl">${acts.map(a => `<div class="ev"><span class="pt"></span><div><b>${a.t} · ${a.w}</b><div class="muted small">${esc(a.s)}</div></div></div>`).join('')}</div>` : `<div class="empty"><b>No punches yet</b>${other ? 'Nothing recorded for ' + esc(pe.name.split(' ')[0]) + ' today.' : 'Clock in to start your day.'}</div>`}</div>
  </div>
  ${regCard()}
  ${
    canPick
      ? `<div class="card"><div class="head"><div><h2>${isT ? 'Team today' : 'Team attendance'}</h2><p class="sub">${team.length} people · ${isT ? 'today' : fdate(iso(sd))} · select a person for their day details</p></div>
    <div class="tools" style="margin:0;gap:8px;flex-wrap:nowrap"><div class="field" style="margin:0"><label class="sr" for="tdate">Date</label><input id="tdate" type="date" value="${iso(sd)}" onchange="S.attDate=this.value===iso(TODAY)?'':this.value;render()"></div>${isT ? '' : `<button class="btn sm" onclick="S.attDate='';render()">Today</button>`}<button class="btn sm" onclick="teamCSV()">${ic('download', 14)}Download CSV</button></div></div>
   <div class="mstat">${[
     ['Present', n.P, 'green'],
     ['Late', n.late, 'amber'],
     ['On leave', n.L, 'brand'],
     ['Absent', n.A, 'red']
   ]
     .map(
       ([l, v, t]) =>
         `<div class="ms"><b>${v}</b><span><i style="background:var(--${t})"></i>${l}</span></div>`
     )
     .join('')}</div>
   ${rtable(
     [
       { h: 'Employee', keep: 1 },
       { h: 'Department', xm: 1 },
       { h: 'First punch', c: 'num' },
       { h: 'Hours', c: 'num', xm: 1 },
       { h: 'Status' }
     ],
     team.map((e, i) => {
       const o = rows[i];
       return {
         click: `attDay('${e.id}',${sdv.join(',')})`,
         cells: [
           person(e),
           e.dept,
           o.in != null ? tm(o.in) : '—',
           o.mins != null ? dur(o.mins) : '—',
           chip(STN[o.st], STK2[o.st])
         ]
       };
     }),
     { et: 'No team members' }
   )}</div>`
      : ''
  }`
  );
}
/* ---- day details ---- */
function attDay(empId, y, m, d) {
  const nd = new Date(y, m, d);
  y = nd.getFullYear();
  m = nd.getMonth();
  d = nd.getDate();
  S.dayOpen = [empId, y, m, d];
  const o = dayInfo(empId, y, m, d),
    e = o.e,
    self = empId === me().id,
    pending = o.reg && o.reg.status === 'Pending';
  let chips = chip(o.st === 'L' && o.pend ? 'Leave pending' : STN[o.st], STK2[o.st]);
  if (o.late) chips += ' ' + chip('Late by ' + o.late + ' min', 'warn', 1);
  if (o.early) chips += ' ' + chip('Left ' + o.early + ' min early', 'warn', 1);
  if (o.ot) chips += ' ' + chip('Overtime ' + dur(o.ot), 'info', 1);
  if (o.miss) chips += ' ' + chip('Missing clock-out', 'bad');
  if (o.reg)
    chips += ' ' + chip('Correction ' + o.reg.status.toLowerCase(), STK[o.reg.status] || 'mute');
  const tile = (l, v, s, cls) =>
    `<div class="dtile"><span>${l}</span><b>${v}</b><small class="${cls || ''}">${s || '&nbsp;'}</small></div>`;
  const row = (a, b) =>
    `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  let tiles = '',
    rows = [];
  if (['P', 'D', 'A', 'T', ''].includes(o.st)) {
    const inV = o.in != null ? tm(o.in) : '—',
      outV = o.out != null ? tm(o.out) + (o.out >= 1440 ? ' +1' : '') : o.live ? 'Working' : '—';
    const inS =
      o.in != null
        ? o.late
          ? 'Late by ' + o.late + ' min'
          : 'On time'
        : o.st === 'A'
          ? 'No punch recorded'
          : o.st === 'T'
            ? 'Shift starts ' + tm(o.start)
            : 'Scheduled ' + tm(o.start);
    const outS =
      o.out != null
        ? o.early
          ? 'Early by ' + o.early + ' min'
          : o.ot
            ? 'Overtime ' + dur(o.ot)
            : 'Shift ends ' + tm(o.end)
        : o.live
          ? 'Still on shift'
          : o.miss
            ? 'Not recorded'
            : o.st === '' || o.st === 'T'
              ? 'Scheduled ' + tm(o.end)
              : '';
    const len = o.end - o.start,
      hS = o.live
        ? 'So far today'
        : o.mins != null
          ? o.st === 'D'
            ? 'Half day'
            : o.mins >= len - 15
              ? 'Full shift'
              : 'Short by ' + dur(len - o.mins)
          : '';
    tiles = `<div class="dtiles">${tile('Clock in', inV, inS, o.late ? 'bad' : '')}${tile('Clock out', outV, outS, o.early || o.miss ? 'bad' : '')}${tile('Hours worked', o.mins != null ? dur(o.mins) : '—', hS)}${tile('Shift', o.shiftName, `${tm(o.start)}–${tm(o.end)}`)}</div>`;
    if (o.mode) rows.push(row('Work mode', esc(o.mode)), row('Location', esc(o.loc)));
    if (o.note) rows.push(row('Note', esc(o.note)));
  }
  if (o.st === 'L' && o.leave) {
    const L = o.leave;
    rows.push(
      row('Leave type', POLICY[L.type] ? POLICY[L.type].n : 'Leave'),
      row('Request', stChip(L.status)),
      row('Reason', esc(L.reason || '—'))
    );
    if (L.from)
      rows.push(row('Dates', fdate(L.from) + (L.to && L.to !== L.from ? ' – ' + fdate(L.to) : '')));
  }
  if (o.st === 'H') rows.push(row('Holiday', esc(o.hol)), row('Pay', 'Paid company holiday'));
  if (o.st === 'W') rows.push(row('Schedule', 'Weekly off. No shift planned.'));
  if (o.st === 'N') rows.push(row('Status', 'Not joined yet'), row('Joining date', fdate(e.join)));
  const ev = [];
  if (o.in != null) ev.push([`Clock in · ${tm(o.in)}`, `${o.mode} · ${o.loc}`]);
  if (o.out != null)
    ev.push([
      `Clock out · ${tm(o.out)}${o.out >= 1440 ? ' (next day)' : ''}`,
      o.ov
        ? 'Corrected after approval'
        : 'Recorded at ' + (e.type === 'Plant' ? 'the plant gate' : 'the office')
    ]);
  else if (o.miss) ev.push(['No clock-out recorded', 'Needs a correction so pay is not affected']);
  else if (o.live)
    ev.push([`Still working · ${dur(o.mins)} so far`, 'Updates when the shift ends']);
  const log = ev.length
    ? `<h3 class="dsub">Punch log</h3><div class="tl">${ev.map(([a, b]) => `<div class="ev"><span class="pt"></span><div><b>${a}</b><div class="muted small">${esc(b)}</div></div></div>`).join('')}</div>`
    : o.st === 'A'
      ? `<div class="empty"><b>No punches recorded</b>This day counts as absent unless a correction is approved.</div>`
      : '';
  let regB = '';
  if (o.reg) {
    const r = o.reg,
      canDecide = isMgr() && r.status === 'Pending' && !self;
    regB = `<div class="rbox"><div class="tools" style="justify-content:space-between;margin:0 0 6px"><b>Correction request</b>${stChip(r.status)}</div><div class="muted small">${esc(r.type)} · requested ${r.in}–${r.out}</div><p style="margin-top:6px">${esc(r.reason)}</p>${canDecide ? `<div class="acts" style="margin-top:12px"><button class="btn ok sm" onclick="decideReg(${r.id},'Approved')">Approve</button><button class="btn bad sm" onclick="decideReg(${r.id},'Rejected')">Reject</button></div>` : ''}</div>`;
  }
  const canReq = self && ['A', 'P', 'D'].includes(o.st) && !pending;
  const actions =
    (canReq
      ? `<button class="btn ${o.st === 'A' || o.late || o.miss ? 'primary' : ''}" onclick="attReg('${empId}',${y},${m},${d})">Request correction</button>`
      : '') +
    (self && o.st === ''
      ? `<button class="btn primary" onclick="applyLeave('${o.iso}')">Apply for leave</button>`
      : '') +
    (self && o.st === 'T'
      ? `<button class="btn primary" onclick="toggleClock();attDay('${empId}',${y},${m},${d})">Clock in now</button>`
      : '');
  overlay(
    'Attendance details',
    `<div class="dnav"><button class="icon-btn" onclick="attDay('${empId}',${y},${m},${d - 1})" aria-label="Previous day">${ic('chev', 16)}</button><div style="text-align:center"><b style="font-size:18px">${DOWN[o.dt.getDay()]}</b><div class="muted">${d} ${MON[m]} ${y}</div></div><button class="icon-btn" onclick="attDay('${empId}',${y},${m},${d + 1})" aria-label="Next day">${ic('chev', 16)}</button></div>
   ${self ? '' : `<div class="person" style="margin-bottom:12px">${av(e.name, 38)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span></div></div>`}
   <div style="display:flex;gap:6px;flex-wrap:wrap">${chips}</div>${tiles}${rows.length ? `<div class="list" style="margin-top:10px">${rows.join('')}</div>` : ''}${log}${regB}`,
    `<button class="btn" onclick="closeModal()">Close</button>${actions}`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function attReg(empId, y, m, d) {
  const o = dayInfo(empId, y, m, d),
    types = ['Absent / no punch', 'Missed punch-out', 'Late mark waiver', 'Wrong punch time'];
  const type = o.st === 'A' ? types[0] : o.miss ? types[1] : o.late ? types[2] : types[3];
  overlay(
    'Request a correction',
    `<p class="muted" style="margin-bottom:14px">${DOWN[o.dt.getDay()]}, ${d} ${MON[m]} ${y} · ${o.shiftTxt}</p><div class="fg">${fld('rt', 'What needs correcting?', `<select id="rt">${types.map(t => `<option ${t === type ? 'selected' : ''}>${t}</option>`).join('')}</select>`, 'full')}${fld('ri', 'Clock in', `<input id="ri" type="time" value="${tm(o.in != null ? o.in : o.start)}">`)}${fld('ro', 'Clock out', `<input id="ro" type="time" value="${tm(o.out != null ? o.out : o.end)}">`)}${fld('rr', 'Reason', '<textarea id="rr" rows="3" placeholder="Tell your manager what happened"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="attDay('${empId}',${y},${m},${d})">Back</button><button class="btn primary" onclick="saveReg('${empId}',${y},${m},${d})">Send request</button>`,
    { side: true, keepFocus: true }
  );
}
function saveReg(empId, y, m, d) {
  const i = $('#ri').value,
    o2 = $('#ro').value,
    r = $('#rr').value.trim();
  if (
    ![
      chk('ri', !!i, 'Enter the clock-in time'),
      chk(
        'ro',
        !!o2 && o2 !== i,
        o2 === i && o2 ? 'Clock-out must be different from clock-in' : 'Enter the clock-out time'
      ),
      chk('rr', !!r, 'Add a reason for your manager')
    ].every(Boolean)
  )
    return;
  S.regs.push({
    id: Date.now(),
    emp: empId,
    date: iso(new Date(y, m, d)),
    type: $('#rt').value,
    in: i,
    out: o2,
    reason: r,
    status: 'Pending'
  });
  render();
  attDay(empId, y, m, d);
  toast('Correction sent to your manager');
}
function regCard() {
  const mine = me().id,
    list = S.regs
      .filter(
        r =>
          S.role === 'admin' ||
          r.emp === mine ||
          (S.role === 'manager' && scoped().some(e => e.id === r.emp))
      )
      .slice()
      .reverse();
  const rows = list.map(r => {
    const e = employees.find(x => x.id === r.emp),
      dt = new Date(r.date + 'T00:00:00'),
      act = isMgr() && r.status === 'Pending' && r.emp !== mine;
    return {
      sid: act ? r.id : null,
      click: `attDay('${r.emp}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`,
      cells: [
        person(e),
        esc(r.type),
        fdate(r.date),
        `${r.in} – ${r.out}`,
        esc(r.reason),
        stChip(r.status),
        act
          ? `<button class="btn ok sm" onclick="event.stopPropagation();decideReg(${r.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decideReg(${r.id},'Rejected')">Reject</button>`
          : ''
      ]
    };
  });
  return `<div class="card"><div class="head"><div><h2>Corrections</h2><p class="sub">${isMgr() ? 'Missed punches and late marks waiting for review' : 'Corrections you have asked for. Open a calendar day to request one.'}</p></div></div>${rtable([{ h: 'Employee', sel: isMgr() && 'reg' }, { h: 'Type' }, { h: 'Date' }, { h: 'Requested' }, { h: 'Reason', xm: 1 }, { h: 'Status' }, { h: '', act: 1 }], rows, { et: 'No correction requests', em: 'Open a day in the calendar and choose Request correction.' })}</div>`;
}

/* js/features/leave/leave-page.js */
/* =============== leave =============== */
function leave() {
  const u = me(),
    bal = balances(u.id),
    t = curTab('lv', isMgr() ? 'approve' : 'mine'),
    mine = S.leaves.filter(l => l.emp === u.id);
  const appr = S.leaves.filter(l => inScope('leave', l.emp) && l.emp !== u.id);
  const hd =
    t === 'approve' && isMgr()
      ? [
          { h: 'Employee', sel: 'leave' },
          { h: 'Department', xm: 1 },
          { h: 'Type' },
          { h: 'Dates' },
          { h: 'Days', c: 'num', xm: 1 },
          { h: 'Reason' },
          { h: 'Status' },
          { h: '', act: 1 }
        ]
      : [
          { h: 'Type' },
          { h: 'Dates' },
          { h: 'Days', c: 'num', xm: 1 },
          { h: 'Reason' },
          { h: 'Status' },
          { h: '', act: 1 }
        ];
  const rows = (t === 'approve' && isMgr() ? appr : mine).map(l => {
    const e = employees.find(x => x.id === l.emp),
      d =
        fdate(l.from).replace(/ 20\d\d/, '') +
        (l.days > 1 ? ' – ' + fdate(l.to).replace(/ 20\d\d/, '') : '');
    return t === 'approve' && isMgr()
      ? {
          sid: l.status === 'Pending' ? l.id : null,
          click: `leaveDetail(${l.id})`,
          cells: [
            person(e),
            esc(e.dept),
            POLICY[l.type].n,
            d,
            l.days,
            esc(l.reason),
            stChip(l.status),
            l.status === 'Pending'
              ? `<button class="btn ok sm" onclick="event.stopPropagation();decide(${l.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decide(${l.id},'Rejected')">Reject</button>`
              : ''
          ]
        }
      : {
          click: `leaveDetail(${l.id})`,
          cells: [
            POLICY[l.type].n,
            d,
            l.days,
            esc(l.reason),
            stChip(l.status),
            l.status === 'Pending'
              ? `<button class="btn sm" onclick="event.stopPropagation();cancelLeave(${l.id})">Cancel request</button>`
              : ''
          ]
        };
  });
  return (
    ph(
      'Leave',
      isMgr() ? 'Balances, requests and approvals' : 'Balances, requests and holidays',
      `<button class="btn primary" onclick="applyLeave()">${ic('plus', 16)}Apply for leave</button>`
    ) +
    `<div class="row c3 lvrow">${Object.entries(bal)
      .map(
        ([k, v]) =>
          `<div class="card lvc ${{ CL: 'k-brand', SL: 'k-teal', EL: 'k-amber' }[k]}" style="display:flex;align-items:center;gap:18px">${ring((v.left / v.t) * 100, v.left, 'days left', POLICY[k].c)}<div><h2>${POLICY[k].n}</h2><p class="sub">${v.t - v.left} of ${v.t} days used</p></div></div>`
      )
      .join('')}</div>
  <div class="card"><div class="head">${
    isMgr()
      ? tabs(
          'lv',
          [
            ['approve', `Team requests${pendingLv().length ? ` (${pendingLv().length})` : ''}`],
            ['mine', 'My requests']
          ],
          'approve'
        )
      : '<h2>My requests</h2>'
  }</div>${rtable(hd, rows, { et: 'No leave requests yet', em: 'Use Apply for leave to send one to your manager.' })}</div>
  <div class="row c3"><div class="card"><div class="head"><h2>Company holidays</h2></div>${holList()}</div>
  <div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div></div>${whoOut()}</div>
  <div class="card"><div class="head"><h2>Leave policy</h2></div><div class="list"><div class="li"><span class="grow">Carry forward</span><b>Earned leave, up to 30 days</b></div><div class="li"><span class="grow">Sick leave over 2 days</span><b>Medical certificate</b></div><div class="li"><span class="grow">Notice for earned leave</span><b>3 working days</b></div></div></div></div>`
  );
}
function whoOut() {
  const end = new Date(TODAY);
  end.setDate(end.getDate() + 14);
  const a = iso(TODAY),
    b = iso(end),
    u = me();
  const vis = l => {
    const e = employees.find(x => x.id === l.emp);
    return (
      S.role === 'admin' ||
      (S.role === 'manager' && scoped().some(x => x.id === l.emp)) ||
      l.emp === u.id ||
      (S.role === 'employee' && e.dept === u.dept)
    );
  };
  const list = S.leaves
    .filter(l => ['Approved', 'Pending'].includes(l.status) && l.to >= a && l.from <= b && vis(l))
    .sort((x, y) => (x.from < y.from ? -1 : 1))
    .slice(0, 5);
  if (!list.length)
    return `<div class="empty"><b>Everyone is in</b>No approved leave in the next two weeks.</div>`;
  return `<div class="list">${list
    .map(l => {
      const e = employees.find(x => x.id === l.emp),
        sh = x => fdate(x).replace(/ 20\d\d/, '');
      return `<div class="li"><div class="grow">${person(e, sh(l.from) + (l.to !== l.from ? ' – ' + sh(l.to) : ''))}</div>${l.status === 'Pending' ? chip('Pending', 'warn') : chip(POLICY[l.type].n, 'info', 1)}</div>`;
    })
    .join('')}</div>`;
}
{
  const _l = leave;
  leave = function () {
    return _l() + projCard();
  };
}

/* js/features/payroll/payroll-employee.js */
/* =============== payroll =============== */
const PSTEPS = ['Attendance locked', 'Review changes', 'Approve payroll', 'Release payments'];
const PSTAT = ['Not started', 'In review', 'Awaiting approval', 'Approved', 'Paid'];
function payrollOld() {
  if (payrollGuard()) {
    const u = me(),
      s = slip(u.ctc);
    return (
      ph(S.role === 'employee' ? 'Payslips' : 'My payslip', 'September 2026', '') +
      `<div class="card slipdoc"><div class="sh"><div class="person">${coMark(40)}<div><b style="font-size:16px">GMux Pvt. Ltd.</b><span>Sector 18, Gurugram, Haryana</span></div></div><div class="sr" style="text-align:right"><b style="font-size:16px">Payslip</b><span class="muted small" style="display:block">September 2026</span></div></div>
     <div class="sb"><div class="kv2">${[
       ['Employee', esc(u.name)],
       ['Employee ID', u.id],
       ['Designation', esc(u.title)],
       ['Department', u.dept],
       ['Date of joining', fdate(u.join)],
       ['Pay days', '30 of 30'],
       ['Bank account', 'HDFC ····4821'],
       ['PAN', 'ABCPV····K']
     ]
       .map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`)
       .join('')}</div>
     <div class="slip"><div><h2 style="margin-bottom:6px">Earnings</h2><table><tbody><tr><td>Basic salary</td><td class="num">${inr(s.basic)}</td></tr><tr><td>House rent allowance</td><td class="num">${inr(s.hra)}</td></tr><tr><td>Special allowance</td><td class="num">${inr(s.special)}</td></tr><tr class="tot"><td>Gross earnings</td><td class="num">${inr(s.m)}</td></tr></tbody></table></div>
     <div><h2 style="margin-bottom:6px">Deductions</h2><table><tbody><tr><td>Provident fund (12%)</td><td class="num">${inr(s.pf)}</td></tr><tr><td>Professional tax</td><td class="num">${inr(s.pt)}</td></tr><tr><td>Income tax (TDS)</td><td class="num">${inr(s.tds)}</td></tr><tr class="tot"><td>Total deductions</td><td class="num">${inr(s.ded)}</td></tr></tbody></table></div></div>
     ${salaryBar(s)}<div class="net"><div><span class="muted small" style="display:block">Net pay</span><b>${inr(s.net)}</b></div><button class="btn" onclick="downloadPayslip('${u.id}','September 2026')">${ic('download', 16)}Download PDF</button></div>
     <p class="muted small" style="margin-top:14px">This is an illustrative calculation. Statutory rates are configured in Settings by your payroll team.</p></div></div>
    <div class="card"><div class="head"><h2>Earlier payslips</h2></div><div class="list">${['August', 'July', 'June'].map(mn => `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${mn} 2026</b></div><b class="num">${inr(s.net)}</b><button class="btn sm ico" onclick="downloadPayslip('${u.id}','${mn} 2026')" aria-label="Download ${mn} 2026 payslip" title="Download PDF">${ic('download', 14)}</button></div>`).join('')}</div></div>`
    );
  }
  return '';
}

/* js/features/recruitment/recruitment.js */
/* =============== recruitment =============== */
function recruit() {
  const ks = Math.min(S.kstage || 0, 4),
    roles = [
      ['CNC Programmer', 'Production', '2 openings'],
      ['Safety Officer', 'Plant', '1 opening'],
      ['Sales Executive', 'Sales', '1 opening']
    ];
  return (
    ph(
      'Recruitment',
      S.candF
        ? `Showing ${S.candF} only. Use the role filter to show everyone.`
        : 'Select a candidate for details. Drag between stages or use the arrows.',
      `<button class="btn primary" onclick="addCand()">${ic('plus', 16)}Add candidate</button>`
    ) +
    `<div class="tools rc-filter"><label class="dd"><span class="sr">Filter by role</span><select class="sel" onchange="S.candF=this.value;render()"><option value="">All roles (${S.cands.length})</option>${roles.map(r => `<option value="${r[0]}" ${S.candF === r[0] ? 'selected' : ''}>${r[0]} (${S.cands.filter(c => c.r === r[0]).length})</option>`).join('')}</select></label><span class="chip info">${S.cands.filter(c => !S.candF || c.r === S.candF).length} candidates</span><span class="chip ok">${S.cands.filter(c => c.st === 4 && (!S.candF || c.r === S.candF)).length} hired</span>${S.candF ? `<button class="link" onclick="S.candF='';render()">Clear filter</button>` : ''}</div>
  <div class="kstages" role="tablist" aria-label="Pipeline stages">${S.stages.map((s, i) => `<button role="tab" aria-selected="${i === ks}" class="${i === ks ? 'on' : ''}" onclick="S.kstage=${i};render()">${s}<span>${S.cands.filter(c => c.st === i && (!S.candF || c.r === S.candF)).length}</span></button>`).join('')}</div>
  <div class="kan" id="kan">${S.stages
    .map(
      (st, i) =>
        `<div class="kcol${i === ks ? ' on' : ''}" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropCand(event,${i})" aria-label="${st} column"><h2>${st}<span class="chip mute nb">${S.cands.filter(c => c.st === i && (!S.candF || c.r === S.candF)).length}</span></h2>${
          S.cands
            .filter(c => c.st === i && (!S.candF || c.r === S.candF))
            .map(
              c =>
                `<div class="cand" onclick="candDetail(${c.id})" draggable="true" ondragstart="event.dataTransfer.setData('text/plain','${c.id}')"><button class="cname" onclick="event.stopPropagation();candDetail(${c.id})">${av(c.n, 32)}<span class="cn"><b>${esc(c.n)}</b><span>${esc(c.r)}</span></span></button><div class="tools" style="justify-content:space-between;margin:0"><span class="muted small">${esc(c.src)}</span><span style="display:flex;gap:6px">${i > 0 ? `<button class="btn sm ico" onclick="event.stopPropagation();moveCand(${c.id},-1)" aria-label="Move ${esc(c.n)} back"><span style="display:inline-flex;transform:scaleX(-1)">${ic("arrow", 14)}</span></button>` : ''}${i < 4 ? `<button class="btn sm primary ico" onclick="event.stopPropagation();moveCand(${c.id},1)" aria-label="Move ${esc(c.n)} forward">${ic('arrow', 14)}</button>` : ''}</span></div></div>`
            )
            .join('') ||
          '<div class="muted small" style="padding:10px;text-align:center">No candidates</div>'
        }</div>`
    )
    .join('')}</div>`
  );
}
function moveCand(id, d) {
  const c = S.cands.find(x => x.id === id);
  c.st = Math.max(0, Math.min(4, c.st + d));
  render();
  if (c.st === 4) toast(c.n + ' marked as hired. Start onboarding.');
}
function dropCand(e, i) {
  e.preventDefault();
  const c = S.cands.find(x => x.id === +e.dataTransfer.getData('text/plain'));
  if (c) {
    c.st = i;
    render();
    toast(`${c.n} moved to ${S.stages[i]}`);
  }
}
function addCand() {
  overlay(
    'Add candidate',
    `<div class="fg">${fld('cn', 'Name', '<input id="cn" autocomplete="off">', 'full')}${fld('cr', 'Applying for', '<select id="cr"><option>CNC Programmer</option><option>Safety Officer</option><option>Sales Executive</option><option>HR Executive</option></select>')}${fld('cs', 'Source', '<select id="cs"><option>Naukri</option><option>LinkedIn</option><option>Referral</option><option>Agency</option><option>Campus</option></select>')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveCand()">Add candidate</button>`
  );
}
function saveCand() {
  const n = $('#cn').value.trim();
  if (!chk('cn', !!n, "Enter the candidate's name")) return;
  S.cands.push({ id: Date.now(), n, r: $('#cr').value, st: 0, src: $('#cs').value });
  closeModal();
  render();
  toast(n + ' added to Applied');
}

/* js/features/performance/performance.js */
/* =============== performance =============== */
function performancePage() {
  if (S.role === 'employee' || S.tab.pf === 'me') {
    return (
      ph(
        S.role === 'employee' ? 'Goals' : 'My goals',
        'Q4 2026 · update progress before your check-in',
        ''
      ) +
      `<div class="row c21"><div class="card"><div class="head"><h2>Objectives</h2></div><div class="list">${S.goals.map(g => `<div class="li" style="display:block"><div class="tools" style="justify-content:space-between;margin-bottom:8px"><b>${esc(g.t)}</b>${chip(g.p + '%', g.p >= 80 ? 'ok' : g.p >= 50 ? 'info' : 'warn', 1)}</div><div class="bar ${g.p >= 80 ? 'g' : ''}"><i style="width:${g.p}%"></i></div><div class="tools" style="justify-content:space-between;margin:10px 0 0"><span class="muted small">Due ${fdate(g.due)}</span><input type="range" min="0" max="100" step="5" value="${g.p}" aria-label="Progress for ${esc(g.t)}" onchange="setGoal(${g.id},this.value)" style="width:170px;accent-color:var(--brand)"></div></div>`).join('')}</div></div>
    <div class="card"><div class="head"><h2>Review cycle</h2></div><div class="list"><div class="li"><span class="grow">Self review</span>${chip('Opens Oct 15', 'mute', 1)}</div><div class="li"><span class="grow">Manager review</span>${chip('Oct 25', 'mute', 1)}</div><div class="li"><span class="grow">Calibration</span>${chip('Nov 5', 'mute', 1)}</div></div><p class="muted small" style="margin-top:14px">Last rating: <b style="color:var(--text)">Exceeds expectations</b> (H1 2026)</p></div></div>`
    );
  }
  const dist = [
      ['Outstanding', 8],
      ['Exceeds', 31],
      ['Meets', 46],
      ['Needs improvement', 12],
      ['Unsatisfactory', 3]
    ],
    cyc = DEPTS.slice(0, 6).map((d, i) => [d, [88, 64, 72, 41, 95, 57][i]]);
  return (
    ph(
      'Performance',
      'H2 2026 review cycle',
      S.role === 'manager'
        ? `<button class="btn" onclick="openSub('pf','me')">My goals</button>`
        : ''
    ) +
    `<div class="row c2"><div class="card"><div class="head"><div><h2>Self reviews submitted</h2><p class="sub">By department</p></div></div><div class="list">${cyc.map(([d, p]) => `<div class="li bl"><span class="small">${d}</span><div class="bar ${p < 50 ? 'a' : ''}"><i style="width:${p}%"></i></div><b class="num">${p}%</b></div>`).join('')}</div></div>
  <div class="card"><div class="head"><div><h2>Rating distribution</h2><p class="sub">Last completed cycle, % of staff</p></div></div><div class="list">${dist.map(([l, p]) => `<div class="li bl"><span class="small">${l}</span><div class="bar t"><i style="width:${p * 2}%"></i></div><b class="num">${p}%</b></div>`).join('')}</div></div></div>
  <div class="card"><div class="head"><h2>Reviews waiting on you</h2></div>${rtable(
    [{ h: 'Employee' }, { h: 'Department' }, { h: 'Status' }, { h: '', act: 1 }],
    scoped()
      .filter(e => e.id !== me().id)
      .slice(0, 4)
      .map((e, i) => ({
        click: `reviewForm('${e.id}')`,
        cells: [
          person(e),
          e.dept,
          stChip(S.reviews[e.id] ? 'Submitted' : i % 2 ? 'Pending' : 'In progress'),
          `<button class="btn sm" onclick="event.stopPropagation();reviewForm('${e.id}')">${S.reviews[e.id] ? 'View' : 'Start review'}</button>`
        ]
      }))
  )}</div>`
  );
}
function setGoal(id, v) {
  S.goals.find(g => g.id === id).p = +v;
  render();
  toast('Progress saved');
}

/* js/features/roster/roster.js */
/* =============== roster =============== */
function roster() {
  const plant = employees.filter(
    e => e.type === 'Plant' && (S.role === 'admin' || scoped().some(x => x.id === e.id))
  );
  const start = new Date(TODAY);
  start.setDate(start.getDate() - dow());
  const days = [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    }),
    ti = dow();
  const cover = days.map((_, i) =>
    ['A', 'B', 'C'].map(s => plant.filter(e => (S.roster[e.id] || [])[i] === s).length)
  );
  const conflict = (r, i) =>
    i > 0 &&
    ((r[i - 1] === 'C' && ['A', 'B', 'G'].includes(r[i])) || (r[i - 1] === 'B' && r[i] === 'A'));
  let nConf = 0;
  const rows = plant
    .map(e => {
      const r = S.roster[e.id] || [],
        w = r.filter(x => x !== 'O').length,
        hrs = w * 8,
        ot = Math.max(0, hrs - 48);
      return `<tr><td>${person(e, e.title)}</td>${r
        .map((s, i) => {
          const cf = conflict(r, i);
          if (cf) nConf++;
          return `<td class="${i === ti ? 'today' : ''}"><button class="shift ${s} ${cf ? 'cf' : ''}" ${isMgr() ? '' : 'disabled'} onclick="cycleShift('${e.id}',${i})" title="${cf ? 'Less than 11 hours rest before this shift' : SHIFTS[s]}" aria-label="${esc(e.name)}, ${days[i].toDateString()}, ${SHIFTS[s]}${cf ? ', rest warning' : ''}">${s}</button></td>`;
        })
        .join(
          ''
        )}<td class="num">${hrs}</td><td class="num">${ot ? chip(ot + ' h', 'warn', 1) : '—'}</td></tr>`;
    })
    .join('');
  return (
    ph(
      'Shift roster',
      `${days[0].toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${days[6].toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · select a shift to change it`
    ) +
    `<div class="card"><div class="head desk"><div class="legend">${Object.entries(SHIFTS)
      .map(
        ([k, v]) =>
          `<span><span class="shift ${k}" style="cursor:default;width:24px;height:22px;font-size:11px;border-radius:6px">${k}</span>&nbsp;${v}</span>`
      )
      .join('')}</div></div>
   ${nConf ? `<div class="chip warn nb" style="padding:7px 12px;margin-bottom:14px;white-space:normal;border-radius:12px;line-height:1.4;align-items:flex-start">${ic('alert', 14)}&nbsp;${nConf} shift${nConf > 1 ? 's have' : ' has'} less than 11 hours of rest. Check the outlined shifts.</div>` : ''}
   <div class="mob-only">${rosterMobile(plant, days, ti, conflict)}</div>
   <div class="tw desk"><table class="rost"><thead><tr><th>Employee</th>${days.map((d, i) => `<th class="${i === ti ? 'today' : ''}">${d.toLocaleDateString('en-IN', { weekday: 'short' })}<br><span style="font-weight:400">${d.getDate()}</span></th>`).join('')}<th class="num">Hours</th><th class="num">OT</th></tr></thead><tbody>${rows}
   <tr class="tot"><td>Headcount per shift (A / B / C)</td>${cover.map((c, i) => `<td class="small ${i === ti ? 'today' : ''}">${c.join(' / ')}</td>`).join('')}<td></td><td></td></tr></tbody></table></div>
   <p class="muted small" style="margin-top:12px">Overtime counts hours above 48 a week.</p></div>`
  );
}
function rosterMobile(plant, days, ti, conflict) {
  const di = S.rday == null ? ti : S.rday;
  const dl = days
    .map(
      (d, i) =>
        `<button class="rd ${i === di ? 'on' : ''} ${i === ti ? 'td' : ''}" onclick="S.rday=${i};render()" aria-pressed="${i === di}" aria-label="${d.toDateString()}${i === ti ? ' (today)' : ''}"><span>${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span><b>${d.getDate()}</b></button>`
    )
    .join('');
  const rows = plant
    .map(e => {
      const r = S.roster[e.id] || [],
        s = r[di] || 'O',
        cf = conflict(r, di),
        w = r.filter(x => x !== 'O').length,
        ot = Math.max(0, w * 8 - 48);
      return `<div class="li"><div class="grow">${person(e, SHIFTS[s] + (cf ? ' · short rest' : ''))}</div>${ot ? chip(ot + ' h OT', 'warn', 1) : ''}<button class="shift ${s} ${cf ? 'cf' : ''}" style="width:46px;height:40px" ${isMgr() ? '' : 'disabled'} onclick="cycleShift('${e.id}',${di})" aria-label="${esc(e.name)}, ${SHIFTS[s]}${cf ? ', rest warning' : ''}">${s}</button></div>`;
    })
    .join('');
  const cov = ['A', 'B', 'C']
    .map(
      k =>
        `<span><span class="shift ${k}">${k}</span>${plant.filter(e => (S.roster[e.id] || [])[di] === k).length}</span>`
    )
    .join('');
  return `<div class="rdays" role="group" aria-label="Choose a day">${dl}</div><div class="rcov">${cov}<span>${isMgr() ? 'Tap a shift to change it' : ''}</span></div><div class="list">${rows}</div>`;
}
function cycleShift(id, i) {
  const o = ['G', 'A', 'B', 'C', 'O'],
    r = S.roster[id];
  r[i] = o[(o.indexOf(r[i]) + 1) % o.length];
  render();
}

{
  const _r = roster;
  roster = function () {
    return _r() + restCard();
  };
}

/* js/features/safety/safety.js */
/* =============== safety =============== */
function safety() {
  const open = S.incidents.filter(i => i.st !== 'Closed').length;
  return (
    ph(
      'Safety',
      'Incidents, near misses and compliance',
      `<button class="btn primary" onclick="addInc()">${ic('plus', 16)}Report incident</button>`
    ) +
    `<div class="row c4">${kpi({ l: 'Days without incident', v: '47', icon: 'shield', tone: 't-green', d: 'Lost-time incidents', bar: (47 / 90) * 100, bl: '47 of 90-day target' })}${kpi({ l: 'Open incidents', v: open, icon: 'alert', tone: 't-amber', spark: [3, 3, 3, 2, 3, 2, 2, 2, 1, 2, 1, Math.max(open, 0)], d: 'Need investigation' })}${kpi({ icon: 'check', tone: 't-teal', l: 'PPE compliance', v: '96%', spark: [90, 91, 91, 92, 92, 93, 94, 94, 95, 95, 94, 96], p: delta('+2%', true, 'up'), d: 'vs last audit' })}${kpi({ icon: 'book', tone: 't-violet', l: 'Safety training', v: '84%', p: delta('First aid behind', false, 'dn'), d: 'completion this quarter', bar: 84, bl: '84% of required courses done' })}</div>
  <div class="card"><div class="head"><div><h2>Incident log</h2><p class="sub">Report near misses too. They prevent the next injury.</p></div></div>${rtable(
    [
      { h: 'Ref' },
      { h: 'Type' },
      { h: 'Location' },
      { h: 'Severity' },
      { h: 'Status' },
      { h: 'Date' }
    ],
    S.incidents.map(i => ({
      click: `incView('${i.id}')`,
      cells: [
        `<b>${i.id}</b>`,
        i.type,
        i.loc,
        chip(i.sev, i.sev === 'High' ? 'bad' : i.sev === 'Medium' ? 'warn' : 'mute'),
        stChip(i.st),
        fdate(i.date)
      ]
    }))
  )}</div>`
  );
}
function incView(id) {
  const i = S.incidents.find(x => x.id === id),
    r = (a, b) => `<div class="li"><span class="grow muted">${a}</span><b>${b}</b></div>`;
  overlay(
    i.id + ' · ' + i.type,
    `<div class="list">${r('Location', i.loc)}${r('Reported by', esc(i.by))}${r('Date', fdate(i.date))}${r('Severity', i.sev)}${r('Status', stChip(i.st))}</div><p style="margin-top:16px">${esc(i.d)}</p>`,
    `<button class="btn" onclick="closeModal()">Close</button>${isMgr() && i.st !== 'Closed' ? `<button class="btn primary" onclick="closeInc('${id}')">Mark as closed</button>` : ''}`,
    { side: true }
  );
}
function closeInc(id) {
  S.incidents.find(x => x.id === id).st = 'Closed';
  closeModal();
  render();
  toast('Incident closed');
}
function addInc() {
  overlay(
    'Report an incident',
    `<div class="fg">${fld('it', 'Type', '<select id="it"><option>Near miss</option><option>First aid</option><option>Lost time</option><option>Property damage</option></select>')}${fld('is', 'Severity', '<select id="is"><option>Low</option><option>Medium</option><option>High</option></select>')}
   ${fld('il', 'Where did it happen?', '<input id="il" placeholder="e.g. Press Shop, Line 3">', 'full')}${fld('id', 'What happened?', '<textarea id="id" rows="4"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveInc()">Submit report</button>`
  );
}
function saveInc() {
  const l = $('#il').value.trim(),
    d = $('#id').value.trim();
  if (
    ![chk('il', !!l, 'Enter the location'), chk('id', !!d, 'Describe what happened')].every(Boolean)
  )
    return;
  S.incidents.unshift({
    id: 'INC-0' + (32 + S.incidents.length - 4),
    type: $('#it').value,
    loc: l,
    sev: $('#is').value,
    date: iso(NOW),
    by: me().name,
    st: 'Open',
    d
  });
  closeModal();
  render();
  toast('Incident reported. The EHS team has been notified.');
}

/* js/features/training/training.js */
/* =============== training =============== */
function training() {
  const soon = c => (new Date(c.exp) - NOW) / 864e5 < 60;
  if (S.role === 'employee') {
    return (
      ph('Training', 'Required courses and certificates') +
      `<div class="card"><div class="list">${S.courses
        .filter(c => ['All staff', 'Office'].includes(c.req) || c.n.startsWith('Fire'))
        .map(c => {
          const p = S.mine[c.n] || 0;
          return `<div class="li"><div class="grow"><b>${c.n}</b><div class="bar ${p === 100 ? 'g' : ''}" style="margin-top:7px;max-width:320px"><i style="width:${p}%"></i></div></div>${p === 100 ? chip('Complete', 'ok') : `<button class="btn primary sm" onclick="startCourse('${c.n}')">${p ? 'Continue' : 'Start'}</button>`}</div>`;
        })
        .join('')}</div></div>`
    );
  }
  return (
    ph(
      'Training',
      'Compliance by course. Certificates expiring within 60 days are flagged.',
      `<button class="btn" onclick="toast('Reminders sent to staff with pending courses')">Send reminders</button>`
    ) +
    `<div class="card">${rtable(
      [
        { h: 'Course', keep: 1 },
        { h: 'Applies to', xm: 1 },
        { h: 'Completion' },
        { h: 'Next expiry', xm: 1 }
      ],
      S.courses.map((c, ci) => ({
        click: `courseDetail(${ci})`,
        cells: [
          `<b>${c.n}</b>`,
          c.req,
          `<div style="display:flex;gap:10px;align-items:center;min-width:150px"><div class="bar ${c.done < 70 ? 'r' : c.done < 85 ? 'a' : 't'}" style="flex:1"><i style="width:${c.done}%"></i></div><b>${c.done}%</b></div>`,
          soon(c) ? chip(fdate(c.exp), 'warn') : fdate(c.exp)
        ]
      }))
    )}</div>`
  );
}
function startCourse(n) {
  S.mine[n] = Math.min(100, (S.mine[n] || 0) + 40);
  render();
  toast(S.mine[n] === 100 ? 'Course completed. Certificate issued.' : 'Progress saved');
}

/* js/features/requests/requests.js */
/* =============== requests =============== */
function requests() {
  const t = curTab('rq', 'claims'),
    u = me();
  const sees = x =>
    S.role === 'admin' ||
    x.emp === u.id ||
    (S.role === 'manager' && scoped().some(e => e.id === x.emp));
  let body = '',
    act = '';
  if (t === 'claims') {
    const list = S.claims.filter(sees);
    act = `<button class="btn primary" onclick="addClaim()">${ic('plus', 16)}New claim</button>`;
    body = rtable(
      [
        { h: 'Employee', sel: isMgr() && 'claim' },
        { h: 'Category' },
        { h: 'Note', xm: 1 },
        { h: 'Date' },
        { h: 'Amount', c: 'num' },
        { h: 'Status' },
        { h: '', act: 1 }
      ],
      list.map(c => {
        const e = employees.find(x => x.id === c.emp);
        return {
          sid: isMgr() && c.emp !== me().id && c.st === 'Pending' ? c.id : null,
          click: `claimDetail(${c.id})`,
          cells: [
            person(e),
            c.cat,
            esc(c.note || '–'),
            fdate(c.date),
            inr(c.amt),
            stChip(c.st),
            isMgr() && c.st === 'Pending' && c.emp !== u.id
              ? `<button class="btn ok sm" onclick="event.stopPropagation();decideClaim(${c.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decideClaim(${c.id},'Rejected')">Reject</button>`
              : ''
          ]
        };
      }),
      { et: 'No claims yet', em: 'Add a reimbursement claim with the button above.' }
    );
  } else if (t === 'help') {
    const list = S.tickets.filter(x => S.role === 'admin' || x.emp === u.id);
    act = `<button class="btn primary" onclick="addTicket()">${ic('plus', 16)}New request</button>`;
    body = rtable(
      [
        { h: 'Ref' },
        { h: 'Request' },
        { h: 'Raised by' },
        { h: 'Priority' },
        { h: 'Status' },
        { h: '', act: 1 }
      ],
      list.map(x => {
        const e = employees.find(y => y.id === x.emp);
        return {
          click: `ticketDetail('${x.id}')`,
          cells: [
            `<b>${x.id}</b>`,
            x.cat,
            esc(e.name),
            chip(x.pr, x.pr === 'High' ? 'bad' : 'mute', 1),
            stChip(x.st),
            S.role === 'admin' && x.st !== 'Resolved'
              ? `<button class="btn sm" onclick="event.stopPropagation();resolveTicket('${x.id}')">Mark resolved</button>`
              : ''
          ]
        };
      }),
      { et: 'No requests', em: 'Raise a request for letters, IT or HR help.' }
    );
  } else {
    body = `<div class="row c2"><div><h2 style="margin-bottom:10px">Company policies</h2><div class="list">${[
      ['handbook', 'Employee handbook'],
      ['leave', 'Leave and attendance policy'],
      ['conduct', 'Code of conduct'],
      ['posh', 'POSH policy'],
      ['safety', 'Plant safety manual']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button></div>`
      )
      .join('')}</div></div>
    <div><h2 style="margin-bottom:10px">My documents</h2><div class="list">${[
      ['offer', 'Offer letter'],
      ['appoint', 'Appointment letter'],
      ['form16', 'Form 16 · FY 2025-26'],
      ['idcard', 'ID card copy']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-teal" style="width:34px;height:34px">${ic('file', 18)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button> <button class="btn sm ico" onclick="downloadDoc('${k}')" aria-label="Download ${n}" title="Download PDF">${ic('download', 14)}</button></div>`
      )
      .join('')}</div></div></div>`;
  }
  return (
    ph('Requests', 'Claims, helpdesk and documents', act) +
    `<div class="card"><div class="head">${tabs(
      'rq',
      [
        ['claims', 'Expense claims'],
        ['help', 'Helpdesk'],
        ['docs', 'Documents']
      ],
      'claims'
    )}</div>${body}</div>`
  );
}
function addClaim() {
  overlay(
    'New expense claim',
    `<div class="fg">${fld('cc', 'Category', '<select id="cc"><option>Travel</option><option>Meals</option><option>Fuel</option><option>Medical</option><option>Internet</option><option>Other</option></select>')}${fld('ca', 'Amount (₹)', '<input id="ca" type="number" min="1" inputmode="numeric">')}${fld('cd', 'Expense date', `<input id="cd" type="date" value="${iso(NOW)}">`)}${fld('cn2', 'Note', '<input id="cn2" placeholder="What was this for?">')}</div><p class="hint">Attach receipts in the live version.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveClaim()">Submit claim</button>`
  );
}
function saveClaim() {
  const a = +$('#ca').value,
    n = $('#cn2').value.trim();
  if (
    ![chk('ca', a > 0, 'Enter the amount in rupees'), chk('cn2', !!n, 'Add a short note')].every(
      Boolean
    )
  )
    return;
  S.claims.unshift({
    id: Date.now(),
    emp: me().id,
    cat: $('#cc').value,
    amt: a,
    date: $('#cd').value,
    note: n,
    st: 'Pending'
  });
  closeModal();
  render();
  toast('Claim submitted for approval');
}
function addTicket() {
  overlay(
    'New request',
    `<div class="fg">${fld('tc', 'What do you need?', '<select id="tc"><option>Salary certificate</option><option>Experience letter</option><option>Address proof letter</option><option>ID card replacement</option><option>IT support</option><option>Payroll query</option><option>Other</option></select>', 'full')}${fld('tp', 'Priority', '<select id="tp"><option>Normal</option><option>High</option></select>')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveTicket()">Submit request</button>`
  );
}
function saveTicket() {
  S.tickets.unshift({
    id: 'REQ-' + (119 + S.tickets.length - 3),
    emp: me().id,
    cat: $('#tc').value,
    pr: $('#tp').value,
    st: 'Submitted',
    d: iso(NOW)
  });
  closeModal();
  S.tab.rq = 'help';
  render();
  toast('Request submitted to HR');
}
function resolveTicket(id) {
  const t = S.tickets.find(x => x.id === id),
    p = t.st;
  t.st = 'Resolved';
  render();
  toast(id + ' resolved', () => {
    t.st = p;
    render();
  });
}

/* js/features/reports/reports-page.js */
/* =============== reports =============== */
function reports() {
  const m = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    ch = (arr, lbl, unit, max, sub) =>
      `<div class="card"><div class="head"><div><h2>${lbl}</h2><p class="sub">${sub}</p></div></div>${barChart(arr, m, { max, unit, today: 5, all: true, label: lbl })}</div>`;
  return (
    ph('Reports', 'Workforce analytics for the last six months') +
    `<div class="row c4">${kpi({ icon: 'users', tone: 't-teal', l: 'Attrition, 12 months', v: '8.2%', spark: [11.4, 10.8, 10.4, 10.1, 9.6, 9.4, 9.0, 8.8, 8.6, 8.4, 8.3, 8.2], p: delta('Beats 14% avg', true, 'dn'), d: 'rolling 12 months' })}${kpi({ icon: 'clock', tone: 't-brand', l: 'Average time to hire', v: '26 days', spark: [34, 33, 33, 31, 30, 30, 29, 28, 28, 27, 27, 26], p: delta('4 days faster', true, 'dn'), d: 'vs last quarter' })}${kpi({ icon: 'chart', tone: 't-amber', l: 'Overtime this month', v: '312 h', spark: [250, 262, 270, 255, 268, 280, 274, 286, 290, 286, 298, 312], p: delta('+9%', false, 'up'), d: 'vs September' })}${kpi({ icon: 'wallet', tone: 't-violet', l: 'Cost per hire', v: inr(38500), spark: [38000, 39200, 37500, 38800, 38200, 39000, 38100, 38700, 38300, 38600, 38400, 38500], p: delta('No change', null), d: 'last 12 hires' })}</div>
  <div class="row c2">${ch([93, 92, 94, 91, 95, 94], 'Attendance rate', '%', 100, 'Monthly average')}${ch([10, 11, 12, 13, 14, 16], 'Headcount', '', 20, 'End of month')}</div>
  <div class="card"><div class="head"><div><h2>Standard reports</h2><p class="sub">Open a report to preview it, then download it as a CSV that opens in Excel</p></div></div><div class="list">${REPORTS.map((r, ri) => `<div class="li"><span class="ai t-brand" style="width:34px;height:34px">${ic('file', 18)}</span><span class="grow"><b>${r.t}</b><span class="muted small" style="display:block">${r.d}</span></span><button class="btn sm" onclick="openReport(${ri})">Open</button></div>`).join('')}</div></div>`
  );
}

/* js/core/boot-stubs.js */
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

/* js/services/files.js */
/* =============== files: downloads, PDF, CSV =============== */
async function saveFile(name, data) {
  let dl = null;
  try {
    dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
  } catch (e) {}
  if (!dl) {
    toast('Downloads work inside the Claude viewer');
    return false;
  }
  try {
    await dl.save({ filename: name, data });
    toast('Saved ' + name);
    return true;
  } catch (e) {
    if (!(e && e.code === 'declined')) toast('Could not save ' + name);
    return false;
  }
}
const csvCell = v => {
  v = v == null ? '' : String(v);
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
};
const toCSV = (heads, rows) =>
  '\ufeff' + [heads, ...rows].map(r => r.map(csvCell).join(',')).join('\r\n');
const slug = s =>
  String(s)
    .trim()
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '');
/* a small PDF writer: A4, built-in fonts, ASCII text */
const pdfTxt = s =>
  String(s)
    .replace(/₹/g, 'Rs ')
    .replace(/[–—]/g, '-')
    .replace(/[·•]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/[^\x20-\x7E]/g, '?')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
const pdfW = (s, size, bold) => String(s).length * size * (bold ? 0.56 : 0.5);
function PDF() {
  const pages = [[]];
  let cur = pages[0];
  const api = {
    page() {
      cur = [];
      pages.push(cur);
    },
    rect(x, y, w, h, rgb) {
      cur.push(`${rgb.join(' ')} rg ${x} ${y} ${w} ${h} re f`);
    },
    line(x1, y1, x2, y2, rgb = [0.85, 0.87, 0.91], w = 0.8) {
      cur.push(`${w} w ${rgb.join(' ')} RG ${x1} ${y1} m ${x2} ${y2} l S`);
    },
    text(x, y, s, size = 10, o = {}) {
      const w = pdfW(s, size, o.bold),
        px = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
      cur.push(
        `BT /${o.bold ? 'F2' : 'F1'} ${size} Tf ${(o.color || [0.08, 0.125, 0.21]).join(' ')} rg ${px.toFixed(1)} ${y} Td (${pdfTxt(s)}) Tj ET`
      );
    },
    build() {
      let out = '%PDF-1.4\n';
      const off = [0],
        N = pages.length;
      const obj = (n, body) => {
        off[n] = out.length;
        out += `${n} 0 obj\n${body}\nendobj\n`;
      };
      obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
      obj(
        2,
        `<< /Type /Pages /Kids [${pages.map((_, i) => `${5 + i * 2} 0 R`).join(' ')}] /Count ${N} >>`
      );
      obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
      obj(
        4,
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
      );
      pages.forEach((ops, i) => {
        const s = ops.join('\n');
        obj(
          5 + i * 2,
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`
        );
        obj(6 + i * 2, `<< /Length ${s.length} >>\nstream\n${s}\nendstream`);
      });
      const xr = out.length,
        total = 5 + N * 2;
      out += `xref\n0 ${total}\n0000000000 65535 f \n`;
      for (let n = 1; n < total; n++) out += String(off[n]).padStart(10, '0') + ' 00000 n \n';
      out += `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`;
      return new Blob([out], { type: 'application/pdf' });
    }
  };
  return api;
}
const NAVY = [0.063, 0.133, 0.29],
  INK = [0.08, 0.125, 0.21],
  MUT = [0.34, 0.42, 0.52],
  SOFT = [0.91, 0.93, 0.99],
  WHT = [1, 1, 1],
  PALE = [0.78, 0.84, 0.94];
const wrapText = (t, n) => {
  const out = [];
  let ln = '';
  String(t)
    .split(/\s+/)
    .forEach(w => {
      if ((ln + ' ' + w).trim().length > n) {
        out.push(ln);
        ln = w;
      } else ln = (ln + ' ' + w).trim();
    });
  if (ln) out.push(ln);
  return out;
};
function payslipPDF(e, label) {
  const s = slip(e.ctc),
    P = PDF();
  P.rect(0, 772, 595, 70, NAVY);
  P.text(40, 812, 'GMux Pvt. Ltd.', 18, { bold: 1, color: WHT });
  P.text(40, 794, 'Sector 18, Gurugram, Haryana', 9, { color: PALE });
  P.text(555, 812, 'PAYSLIP', 14, { bold: 1, color: WHT, align: 'right' });
  P.text(555, 794, label, 10, { color: PALE, align: 'right' });
  [
    ['Employee', e.name],
    ['Employee ID', e.id],
    ['Designation', e.title],
    ['Department', e.dept],
    ['Date of joining', fdate(e.join)],
    ['Pay days', '30 of 30'],
    ['Bank account', 'HDFC XXXX4821'],
    ['PAN', 'ABCPV****K']
  ].forEach(([a, b], i) => {
    const x = i % 2 ? 310 : 40,
      y = 738 - Math.floor(i / 2) * 36;
    P.text(x, y, a, 8.5, { color: MUT });
    P.text(x, y - 14, b, 11, { bold: 1 });
  });
  P.line(40, 598, 555, 598);
  const tbl = (x, title, items, totalLbl, total) => {
    P.rect(x, 560, 240, 24, [0.96, 0.97, 0.99]);
    P.text(x + 10, 568, title, 10, { bold: 1 });
    items.forEach(([a, b], i) => {
      P.text(x + 10, 540 - i * 24, a, 10);
      P.text(x + 230, 540 - i * 24, inr(b), 10, { align: 'right' });
      P.line(x, 530 - i * 24, x + 240, 530 - i * 24);
    });
    const y = 540 - items.length * 24 - 4;
    P.text(x + 10, y, totalLbl, 10, { bold: 1 });
    P.text(x + 230, y, inr(total), 10, { bold: 1, align: 'right' });
  };
  tbl(
    40,
    'Earnings',
    [
      ['Basic salary', s.basic],
      ['House rent allowance', s.hra],
      ['Special allowance', s.special]
    ],
    'Gross earnings',
    s.m
  );
  tbl(
    315,
    'Deductions',
    [
      ['Provident fund (12%)', s.pf],
      ['Professional tax', s.pt],
      ['Income tax (TDS)', s.tds]
    ],
    'Total deductions',
    s.ded
  );
  P.rect(40, 372, 515, 64, SOFT);
  P.text(58, 410, 'Net pay', 11, { color: MUT });
  P.text(58, 390, 'Credited to the bank account above', 9, { color: MUT });
  P.text(537, 394, inr(s.net), 24, { bold: 1, align: 'right', color: [0.1, 0.27, 0.72] });
  P.text(
    40,
    340,
    'This is a computer-generated payslip and does not need a signature. Figures are illustrative.',
    8,
    { color: MUT }
  );
  return P.build();
}
function docPDF(title, meta, sections) {
  const P = PDF();
  let y = 750;
  const head = () => {
    P.rect(0, 782, 595, 60, NAVY);
    P.text(40, 812, 'GMux Pvt. Ltd.', 14, { bold: 1, color: WHT });
    P.text(555, 812, meta || '', 9, { color: PALE, align: 'right' });
    y = 750;
  };
  head();
  P.text(40, y, title, 20, { bold: 1 });
  y -= 14;
  P.line(40, y, 555, y);
  y -= 28;
  sections.forEach(([h, t]) => {
    if (h) {
      if (y < 120) {
        P.page();
        head();
      }
      P.text(40, y, h, 12, { bold: 1 });
      y -= 18;
    }
    wrapText(t, 92).forEach(ln => {
      if (y < 70) {
        P.page();
        head();
      }
      P.text(40, y, ln, 10.5);
      y -= 15;
    });
    y -= 10;
  });
  return P.build();
}
function downloadPayslip(id, label) {
  const e = employees.find(x => x.id === id);
  saveFile(`Payslip-${slug(e.name)}-${slug(label)}.pdf`, payslipPDF(e, label));
}
function exportEmps() {
  const adm = canField('salary'),
    heads = [
      'ID',
      'Name',
      'Job title',
      'Department',
      'Work type',
      'Location',
      'Status',
      'Date of joining',
      ...(adm ? ['Annual CTC (INR)'] : [])
    ];
  saveFile(
    'Employees-' + iso(TODAY) + '.csv',
    toCSV(
      heads,
      filteredEmps().map(e => [
        e.id,
        e.name,
        e.title,
        e.dept,
        e.type,
        e.loc,
        e.status,
        e.join,
        ...(adm ? [e.ctc] : [])
      ])
    )
  );
}
function attCSV(empId) {
  const b = new Date(NOW.getFullYear(), NOW.getMonth() + S.calOff, 1),
    y = b.getFullYear(),
    m = b.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    e = employees.find(x => x.id === empId),
    rows = [];
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(empId, y, m, d);
    rows.push([
      `${y}-${pad(m + 1)}-${pad(d)}`,
      DOWN[o.dt.getDay()],
      o.hol || STN[o.st],
      o.in != null ? tm(o.in) : '',
      o.out != null ? tm(o.out) : '',
      o.mins != null ? (o.mins / 60).toFixed(2) : '',
      o.late || '',
      o.ot ? Math.round(o.ot) : '',
      o.mode,
      o.loc,
      o.note
    ]);
  }
  saveFile(
    `Attendance-${slug(e.name)}-${MON[m].slice(0, 3)}-${y}.csv`,
    toCSV(
      [
        'Date',
        'Day',
        'Status',
        'Clock in',
        'Clock out',
        'Hours',
        'Late (min)',
        'Overtime (min)',
        'Work mode',
        'Location',
        'Note'
      ],
      rows
    )
  );
}
function teamCSV() {
  const sd = S.attDate ? new Date(S.attDate + 'T00:00:00') : TODAY,
    td = [sd.getFullYear(), sd.getMonth(), sd.getDate()];
  saveFile(
    'Team-attendance-' + iso(sd) + '.csv',
    toCSV(
      ['ID', 'Employee', 'Department', 'Status', 'First punch', 'Hours', 'Late (min)'],
      scoped().map(e => {
        const o = dayInfo(e.id, ...td);
        return [
          e.id,
          e.name,
          e.dept,
          STN[o.st],
          o.in != null ? tm(o.in) : '',
          o.mins != null ? (o.mins / 60).toFixed(2) : '',
          o.late || ''
        ];
      })
    )
  );
}

/* js/features/help/documents-help.js */
/* =============== documents and help =============== */
const DOCS = {
  handbook: () => ({
    t: 'Employee handbook',
    meta: 'Policy · v4.2 · Updated Apr 2026',
    s: [
      [
        'Welcome',
        'GMux builds and ships industrial components. This handbook explains how we work together, what you can expect from us and what we expect from you.'
      ],
      [
        'Working hours',
        'Office staff work Monday to Friday, 09:00 to 18:00. Plant staff follow the published roster: Morning 06:00-14:00, Afternoon 14:00-22:00 and Night 22:00-06:00. A grace period of 15 minutes applies before a late mark is recorded.'
      ],
      [
        'Attendance and corrections',
        'Clock in and out every day. If a punch is missed or wrong, request a correction from the attendance calendar within three working days so your pay is not affected.'
      ],
      [
        'Conduct and respect',
        'We treat colleagues, customers and visitors with courtesy. Harassment, discrimination and unsafe behaviour are not tolerated and are handled under the Code of Conduct.'
      ],
      [
        'Raising a concern',
        'Speak to your manager first. If that is not possible, contact HR or use the helpdesk. Concerns raised in good faith are never held against you.'
      ]
    ]
  }),
  leave: () => ({
    t: 'Leave and attendance policy',
    meta: 'Policy · v3.1 · Updated Jan 2026',
    s: [
      [
        'Leave entitlement',
        'Each year you receive 12 days of casual leave, 8 days of sick leave and 18 days of earned leave. Unused earned leave carries forward up to 30 days.'
      ],
      [
        'Applying',
        'Apply through PeopleDesk. Earned leave needs three working days of notice. Your manager approves or rejects the request and you are notified immediately.'
      ],
      [
        'Sick leave',
        'Sick leave longer than two days needs a medical certificate, uploaded within three days of returning to work.'
      ],
      [
        'Holidays',
        'The company holiday list is published each year. Plant staff on a holiday roster are paid the overtime rate for hours worked.'
      ]
    ]
  }),
  conduct: () => ({
    t: 'Code of conduct',
    meta: 'Policy · v2.4 · Updated Mar 2026',
    s: [
      [
        'Our principles',
        'Act honestly, protect company and customer information, and look after the safety and dignity of everyone around you.'
      ],
      [
        'Conflicts of interest',
        'Tell HR about any outside work or financial interest that could affect your judgement at GMux.'
      ],
      [
        'Gifts and hospitality',
        'Do not accept gifts above Rs 2,000 in value. Report any offer you are unsure about.'
      ],
      [
        'Consequences',
        'Breaches may lead to disciplinary action, up to and including termination, following a fair process.'
      ]
    ]
  }),
  posh: () => ({
    t: 'Prevention of sexual harassment (POSH) policy',
    meta: 'Policy · v2.0 · Updated Feb 2026',
    s: [
      [
        'Commitment',
        'GMux provides a workplace free from sexual harassment, in line with the POSH Act, 2013.'
      ],
      [
        'Internal Committee',
        'An Internal Committee, led by a senior woman member, receives and inquires into complaints. Its members are listed on the notice boards and on the intranet.'
      ],
      [
        'Making a complaint',
        'A written complaint can be made to the Committee within three months of the incident. Support is available to help you write it.'
      ],
      [
        'Confidentiality',
        'The identity of everyone involved and the details of the inquiry are kept confidential.'
      ]
    ]
  }),
  safety: () => ({
    t: 'Plant safety manual',
    meta: 'Manual · v5.0 · Updated Jun 2026',
    s: [
      [
        'Personal protective equipment',
        'Safety shoes, helmet, eye protection and hearing protection are required on the shop floor. Gloves are required at presses and welding bays.'
      ],
      [
        'Lockout / tagout',
        'Never service a machine until it is isolated, locked and tagged. Only the person who applied a lock may remove it.'
      ],
      [
        'Reporting',
        'Report every incident and near miss within one hour through PeopleDesk or to your supervisor. Near misses help prevent the next injury.'
      ],
      [
        'Emergencies',
        'Know your nearest exit and assembly point. Fire drills are held every quarter and attendance is mandatory.'
      ]
    ]
  }),
  privacy: () => ({
    t: 'Privacy policy',
    meta: 'Legal · Updated Jul 2026',
    s: [
      [
        'What we collect',
        'Information you give us (name, contact details, bank and tax details), and information created while you use PeopleDesk such as attendance punches and leave records.'
      ],
      [
        'How we use it',
        'To run payroll, manage attendance and leave, meet legal obligations and keep our workplaces safe.'
      ],
      [
        'Who can see it',
        'Only people who need it for their role. Managers see their own team. Payroll details are limited to HR and payroll staff.'
      ],
      [
        'Your rights',
        'You may ask to see or correct your personal data by raising a helpdesk request.'
      ]
    ]
  }),
  terms: () => ({
    t: 'Terms of use',
    meta: 'Legal · Updated Jul 2026',
    s: [
      [
        'Using PeopleDesk',
        'PeopleDesk is for GMux employees and authorised partners. Keep your sign-in details private and tell IT at once if you think someone else has used them.'
      ],
      [
        'Acceptable use',
        'Do not try to access data you are not authorised to see, interfere with the service or use it for anything unrelated to your work.'
      ],
      [
        'Availability',
        'We aim to keep PeopleDesk available at all times but may pause it for maintenance with notice.'
      ]
    ]
  }),
  offer: e => ({
    t: 'Offer letter',
    meta: 'Personal document · ' + fdate(e.join),
    s: [
      ['', `Dear ${e.name},`],
      [
        '',
        `We are pleased to offer you the position of ${e.title} in the ${e.dept} department, based at ${e.loc}.`
      ],
      [
        'Compensation',
        `Your annual cost to company is ${inr(e.ctc)}, paid monthly. Statutory deductions apply as per law.`
      ],
      [
        'Joining',
        `Your date of joining is ${fdate(e.join)}. A probation period of six months applies.`
      ],
      ['', `We look forward to working with you.\n\nNeha Kapoor, HR Head, GMux Pvt. Ltd.`]
    ]
  }),
  appoint: e => ({
    t: 'Appointment letter',
    meta: 'Personal document · ' + fdate(e.join),
    s: [
      ['', `Dear ${e.name},`],
      [
        '',
        `With reference to your acceptance of our offer, you are appointed as ${e.title} in ${e.dept} with effect from ${fdate(e.join)}.`
      ],
      [
        'Terms',
        'You will be governed by the policies in the Employee Handbook, as amended from time to time. Either party may end employment with 30 days written notice after confirmation.'
      ],
      ['', `Neha Kapoor, HR Head, GMux Pvt. Ltd.`]
    ]
  }),
  form16: e => {
    const s = slip(e.ctc);
    return {
      t: 'Form 16 summary',
      meta: 'Personal document · FY 2025-26',
      s: [
        ['Employee', `${e.name} (${e.id}), PAN ABCPV****K`],
        ['Gross salary', `${inr(s.m * 12)} for the year`],
        ['Tax deducted at source', `${inr(s.tds * 12)} deducted and deposited`],
        ['Provident fund', `${inr(s.pf * 12)} contributed by you`],
        [
          'Note',
          'This summary is illustrative. Your official Form 16 is issued by the payroll team after the financial year closes.'
        ]
      ]
    };
  },
  idcard: e => ({
    t: 'ID card copy',
    meta: 'Personal document · ' + e.id,
    s: [
      ['Name', e.name],
      ['Employee ID', e.id],
      ['Designation', e.title],
      ['Department', e.dept],
      ['Location', e.loc],
      ['Valid for', 'While in service with GMux Pvt. Ltd.']
    ]
  })
};
function docView(key) {
  const d = DOCS[key](me());
  const body = `<div class="doc"><div class="chips2" style="margin-bottom:6px">${chip(d.meta, 'info', 1)}</div>${d.s
    .map(
      ([h, t]) =>
        `${h ? `<h3>${esc(h)}</h3>` : ''}${String(t)
          .split('\n')
          .map(p => (p ? `<p>${esc(p)}</p>` : ''))
          .join('')}`
    )
    .join('')}</div>`;
  overlay(
    d.t,
    body,
    `<button class="btn" onclick="closeModal()">Close</button><button class="btn primary" onclick="downloadDoc('${key}')">${ic('download', 16)}Download PDF</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function downloadDoc(key) {
  const d = DOCS[key](me());
  saveFile(slug(d.t) + '.pdf', docPDF(d.t, d.meta, d.s));
}
function helpCentre() {
  const q = [
    [
      'How do I clock in?',
      'Open Attendance (or Home on your phone), choose a work mode and select Clock in. Your location is checked against the company geofence.'
    ],
    [
      'I missed a punch. What now?',
      'Open the day in the attendance calendar and choose Request correction. Your manager reviews it, usually within a day.'
    ],
    [
      'How do I apply for leave?',
      'Go to Leave and select Apply for leave. You can also open a future day in the attendance calendar and choose Apply for leave.'
    ],
    [
      'Where is my payslip?',
      'Open Payslips (or Payroll). Each month appears there once payroll is released, and you can download it as a PDF.'
    ],
    [
      'How do I report a safety incident?',
      'Open Safety and select Report incident. Report near misses too, they prevent the next injury.'
    ],
    [
      'Who can see my information?',
      'Your manager sees your team data. Payroll details are limited to HR and payroll staff.'
    ]
  ];
  overlay(
    'Help centre',
    `<p class="muted" style="margin-bottom:8px">Quick answers to common questions.</p>${q.map(([a, b]) => `<details class="faq"><summary>${esc(a)}</summary><p>${esc(b)}</p></details>`).join('')}<div class="rbox"><b>Still stuck?</b><p style="margin-top:6px">Email <b>hr@gmux.in</b> or raise a request from Requests.</p></div>`,
    `<button class="btn primary" onclick="closeModal()">Done</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}

/* js/features/reports/report-library.js */
/* =============== reports =============== */
const monthDays = (id, fn) => {
  const y = NOW.getFullYear(),
    m = NOW.getMonth();
  for (let d = 1; d <= NOW.getDate(); d++) fn(dayInfo(id, y, m, d));
};
const leaveUsed = (id, k) =>
  (id === 'E-1003'
    ? POLICY[k].u
    : hsh(id, 0, 0, k.charCodeAt(0)) % (k === 'EL' ? 6 : k === 'CL' ? 5 : 3)) +
  S.leaves
    .filter(l => l.emp === id && l.type === k && l.status === 'Approved' && l.id !== 5)
    .reduce((a, l) => a + l.days, 0);
const REPORTS = [
  {
    t: 'Monthly attendance register',
    d: `Present, absent, leave and late days for ${MON[NOW.getMonth()]} ${NOW.getFullYear()}`,
    f: 'attendance-register',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'Department',
        'Present',
        'Half days',
        'Absent',
        'Leave',
        'Late marks',
        'Overtime (h)'
      ],
      rows: scoped().map(e => {
        let P = 0,
          D = 0,
          A = 0,
          L = 0,
          late = 0,
          ot = 0;
        monthDays(e.id, o => {
          if (o.st === 'P') P++;
          else if (o.st === 'D') D++;
          else if (o.st === 'A') A++;
          else if (o.st === 'L' && !o.pend) L++;
          if (o.late) late++;
          ot += o.ot || 0;
        });
        return [e.id, e.name, e.dept, P, D, A, L, late, (ot / 60).toFixed(1)];
      })
    })
  },
  {
    t: 'Leave balance summary',
    d: 'Days left per leave type, as of today',
    f: 'leave-balances',
    build: () => ({
      heads: ['ID', 'Employee', 'Casual left', 'Sick left', 'Earned left'],
      rows: scoped().map(e => [
        e.id,
        e.name,
        ...['CL', 'SL', 'EL'].map(k => Math.max(0, POLICY[k].t - leaveUsed(e.id, k)))
      ])
    })
  },
  {
    t: 'Payroll register and bank advice',
    d: 'Gross, deductions and net pay for the current cycle',
    f: 'payroll-register',
    build: () => {
      const rows = employees.map(e => {
        const s = slip(e.ctc);
        return [
          e.id,
          e.name,
          'XXXX' + String(1000 + (hsh(e.id, 0, 0, 1) % 9000)),
          Math.round(s.m),
          Math.round(s.ded),
          Math.round(s.net)
        ];
      });
      rows.push(['', 'Total', '', ...[3, 4, 5].map(c => rows.reduce((a, r) => a + r[c], 0))]);
      return {
        heads: [
          'ID',
          'Employee',
          'Bank account',
          'Gross (INR)',
          'Deductions (INR)',
          'Net pay (INR)'
        ],
        rows
      };
    }
  },
  {
    t: 'PF, ESI and professional tax',
    d: 'Statutory contributions for the current cycle',
    f: 'statutory-statement',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'PF wage',
        'PF employee 12%',
        'PF employer 12%',
        'ESI employee',
        'ESI employer',
        'Professional tax'
      ],
      rows: employees.map(e => {
        const s = slip(e.ctc),
          w = Math.min(s.basic, 15000),
          esi = s.m <= 21000;
        return [
          e.id,
          e.name,
          Math.round(w),
          Math.round(w * 0.12),
          Math.round(w * 0.12),
          esi ? Math.round(s.m * 0.0075) : 0,
          esi ? Math.round(s.m * 0.0325) : 0,
          s.pt
        ];
      })
    })
  },
  {
    t: 'Overtime by department',
    d: 'Overtime hours and estimated cost this month',
    f: 'overtime-by-department',
    build: () => ({
      heads: ['Department', 'People', 'Overtime (h)', 'Estimated cost (INR)'],
      rows: DEPTS.map(dp => {
        const es = employees.filter(e => e.dept === dp);
        let min = 0,
          cost = 0;
        es.forEach(e => {
          let m = 0;
          monthDays(e.id, o => {
            m += o.ot || 0;
          });
          min += m;
          cost += (m / 60) * (slip(e.ctc).basic / 208) * 2;
        });
        return [dp, es.length, (min / 60).toFixed(1), Math.round(cost)];
      }).filter(r => r[1])
    })
  },
  {
    t: 'Incident and safety statistics',
    d: 'All reported incidents by type',
    f: 'incident-statistics',
    build: () => ({
      heads: ['Type', 'Reported', 'High severity', 'Still open'],
      rows: [...new Set(S.incidents.map(i => i.type))].map(t => {
        const l = S.incidents.filter(i => i.type === t);
        return [
          t,
          l.length,
          l.filter(i => i.sev === 'High').length,
          l.filter(i => i.st !== 'Closed').length
        ];
      })
    })
  },
  {
    t: 'Headcount and attrition trend',
    d: 'Last six months',
    f: 'headcount-trend',
    build: () => ({
      heads: ['Month', 'Headcount', 'Joiners', 'Leavers', 'Attrition %'],
      rows: [
        ['May', 10, 1, 0, '0.0'],
        ['Jun', 11, 1, 0, '0.0'],
        ['Jul', 12, 1, 0, '0.0'],
        ['Aug', 13, 1, 0, '0.0'],
        ['Sep', 14, 1, 0, '0.0'],
        ['Oct', 16, 2, 0, '0.0']
      ]
    })
  },
  {
    t: 'Asset register',
    d: 'Every asset with its serial number, status, holder and warranty',
    f: 'asset-register',
    build: () => ({
      heads: [
        'Tag',
        'Type',
        'Make and model',
        'Serial number',
        'Status',
        'Assigned to',
        'Issued on',
        'Warranty until'
      ],
      rows: assetScope()
        .slice()
        .sort((a, b) => a.tag.localeCompare(b.tag))
        .map(a => {
          const h = a.holder ? aEmp(a.holder) : null,
            iss = a.holder
              ? [...a.hist].reverse().find(x => x.t === 'Issued' && x.emp === a.holder)
              : null;
          return [
            a.tag,
            a.type,
            aname(a),
            a.serial,
            a.status,
            h ? h.name : '',
            iss ? iss.date : '',
            a.warranty || ''
          ];
        })
    })
  },
  {
    t: 'Assets issued per employee',
    d: 'Which laptop, phone, cards and peripherals each person holds right now',
    f: 'assets-per-employee',
    build: () => ({
      heads: [
        'ID',
        'Employee',
        'Department',
        'Laptop serial',
        'Phone',
        'ID card',
        'Access card',
        'Peripherals'
      ],
      rows: scoped().map(e => {
        const cur = S.assets.filter(a => a.holder === e.id),
          one = t => {
            const a = cur.find(x => x.type === t);
            return a ? a.serial : '';
          };
        return [
          e.id,
          e.name,
          e.dept,
          one('Laptop'),
          one('Mobile phone'),
          one('ID card'),
          one('Access card'),
          cur.filter(a => !ONE_EACH.includes(a.type)).length
        ];
      })
    })
  }
];
function openReport(i) {
  const r = REPORTS[i],
    { heads, rows } = r.build();
  const num = heads.map(
    (_, c) =>
      rows.length > 0 && rows.every(x => /^[\d,.]+$/.test(String(x[c]).trim()) || x[c] === '')
  );
  overlay(
    r.t,
    `<p class="muted" style="margin-bottom:6px">${esc(r.d)}</p><p class="small muted" style="margin-bottom:12px">${rows.length} row${rows.length === 1 ? '' : 's'}</p>${rtable(
      heads.map((h, c) => ({ h, c: num[c] ? 'num' : '', keep: 1 })),
      rows.map(x => ({
        cells: x.map(v => esc(typeof v === 'number' ? v.toLocaleString('en-IN') : v))
      })),
      { et: 'No data for this report' }
    )}`,
    `<button class="btn" onclick="closeModal()">Close</button><button class="btn primary" onclick="downloadReport(${i})">${ic('download', 16)}Download CSV</button>`,
    { side: true, wide: true, keepFocus: !!$('#layer .ov') }
  );
}
function downloadReport(i) {
  const r = REPORTS[i],
    { heads, rows } = r.build();
  saveFile(`${r.f}-${iso(TODAY)}.csv`, toCSV(heads, rows));
}

/* js/components/detail-panels.js */
/* =============== detail panels for table rows =============== */
const dRow = (a, b) =>
  `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
const whoHead = e =>
  `<div class="person" style="margin-bottom:12px">${av(e.name, 46)}<div><b style="font-size:16px">${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span></div></div>`;
function detail(title, o) {
  overlay(
    title,
    `${o.head || ''}${o.chips ? `<div class="chips2">${o.chips}</div>` : ''}${o.rows ? `<div class="list" style="margin-top:14px">${o.rows.map(r => dRow(...r)).join('')}</div>` : ''}${o.note ? `<div class="rbox"><b>${o.noteT || 'Notes'}</b><p style="margin-top:6px">${o.note}</p></div>` : ''}${o.tl ? `<h3 class="dsub">${o.tlT || 'Activity'}</h3><div class="tl">${o.tl.map(([a, b]) => `<div class="ev"><span class="pt"></span><div><b>${a}</b><div class="muted small">${esc(b)}</div></div></div>`).join('')}</div>` : ''}${o.body || ''}`,
    `<button class="btn" onclick="closeModal()">Close</button>${o.actions || ''}`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function ticketDetail(id) {
  const t = S.tickets.find(x => x.id === id),
    e = employees.find(x => x.id === t.emp),
    msgs = t.msgs || [];
  detail(id, {
    head: whoHead(e),
    chips: stChip(t.st) + ' ' + chip(t.pr + ' priority', t.pr === 'High' ? 'bad' : 'mute', 1),
    rows: [
      ['Request', esc(t.cat)],
      ['Raised', fdate(t.d)]
    ],
    body: `<h3 class="dsub">Conversation</h3>${msgs.length ? msgs.map(m => `<div class="msg"><b>${esc(m.by)}</b> <small>${esc(m.at)}</small><div>${esc(m.txt)}</div></div>`).join('') : `<p class="muted small" style="margin-bottom:10px">No comments yet.</p>`}<div class="field" style="margin-top:12px"><label for="tm">Add a comment</label><textarea id="tm" rows="2" placeholder="Write a message"></textarea><div class="err" id="tm-e" role="alert"></div></div>`,
    actions: `<button class="btn" onclick="sendTicketMsg('${id}')">Send comment</button>${S.role === 'admin' && t.st !== 'Resolved' ? `<button class="btn primary" onclick="closeModal();resolveTicket('${id}')">Mark resolved</button>` : ''}`
  });
}
function sendTicketMsg(id) {
  const v = $('#tm').value.trim();
  if (!chk('tm', !!v, 'Write a message first')) return;
  const t = S.tickets.find(x => x.id === id);
  (t.msgs = t.msgs || []).push({ by: me().name, at: 'Just now', txt: v });
  if (t.st === 'Submitted' && isMgr()) t.st = 'In progress';
  render();
  ticketDetail(id);
  toast('Comment added');
}
function candDetail(id) {
  const c = S.cands.find(x => x.id === id);
  if (!c) return;
  const first = c.n.split(' ')[0].toLowerCase(),
    ph0 = 9800000000 + hsh(String(c.id), 0, 0, 3) * 7;
  detail('Candidate', {
    head: `<div class="person" style="margin-bottom:12px">${av(c.n, 46)}<div><b style="font-size:16px">${esc(c.n)}</b><span>${esc(c.r)}</span></div></div>`,
    chips: chip(S.stages[c.st], c.st === 4 ? 'ok' : 'info') + ' ' + chip(c.src, 'mute', 1),
    rows: [
      ['Applying for', esc(c.r)],
      ['Source', esc(c.src)],
      ['Email', `${first}.${c.n.split(' ').slice(-1)[0].toLowerCase()}@mail.com`],
      ['Phone', `+91 ${ph0}`]
    ],
    tl: S.stages.slice(0, c.st + 1).map((s, i) => [s, i === c.st ? 'Current stage' : 'Completed']),
    actions: `<button class="btn bad" onclick="rejectCand(${id})">Reject</button>${c.st > 0 ? `<button class="btn" onclick="moveCand(${id},-1);candDetail(${id})">Move back</button>` : ''}${c.st < 4 ? `<button class="btn primary" onclick="moveCand(${id},1);candDetail(${id})">Move to ${S.stages[c.st + 1]}</button>` : ''}`
  });
}
function rejectCand(id) {
  const c = S.cands.find(x => x.id === id);
  confirmBox(
    'Reject this candidate?',
    `${esc(c.n)} will be removed from the hiring pipeline.`,
    'Reject candidate',
    () => {
      const i = S.cands.indexOf(c);
      S.cands.splice(i, 1);
      render();
      toast(c.n + ' removed from the pipeline', () => {
        S.cands.splice(i, 0, c);
        render();
      });
    },
    true
  );
}
function payslipDetail(id) {
  const e = employees.find(x => x.id === id),
    s = slip(e.ctc);
  detail('Payslip · October 2026', {
    head: whoHead(e),
    chips: chip(PSTAT[S.payStep], ['mute', 'warn', 'warn', 'info', 'ok'][S.payStep]),
    rows: [
      ['Basic salary', inr(s.basic)],
      ['House rent allowance', inr(s.hra)],
      ['Special allowance', inr(s.special)],
      ['Gross earnings', `<span style="font-size:16px">${inr(s.m)}</span>`],
      ['Provident fund', inr(s.pf)],
      ['Professional tax', inr(s.pt)],
      ['Income tax (TDS)', inr(s.tds)],
      ['Net pay', `<span style="font-size:18px;color:var(--brand-ink)">${inr(s.net)}</span>`]
    ],
    actions: `<button class="btn primary" onclick="downloadPayslip('${id}','October 2026')">${ic('download', 16)}Download PDF</button>`
  });
}
function courseDetail(i) {
  const c = S.courses[i],
    group = employees.filter(
      e =>
        c.req === 'All staff' ||
        (c.req === 'Plant' && e.type === 'Plant') ||
        (c.req === 'Office' && e.type === 'Office') ||
        (c.req === 'Stores' && e.dept === 'Stores & Logistics') ||
        (c.req === 'Maintenance' && e.dept === 'Maintenance')
    );
  const pr = e => {
      if (e.id === 'E-1003') return S.mine[c.n] || 0;
      const v = Math.max(0, Math.min(100, c.done + ((hsh(e.id, 0, 0, i + 7) % 61) - 30)));
      return v >= 94 ? 100 : v;
    },
    list = group.map(e => [e, pr(e)]).sort((a, b) => a[1] - b[1]),
    pending = list.filter(x => x[1] < 100);
  detail(c.n, {
    chips:
      chip(c.req, 'info', 1) +
      ' ' +
      (c.done < 70
        ? chip('Behind', 'bad')
        : c.done < 85
          ? chip('Needs attention', 'warn')
          : chip('On track', 'ok')),
    rows: [
      ['Applies to', c.req],
      ['Completion', c.done + '%'],
      ['Next expiry', fdate(c.exp)],
      ['People assigned', group.length]
    ],
    body: `<h3 class="dsub">${pending.length} still to complete</h3><div class="list">${list
      .slice(0, 8)
      .map(
        ([e, p]) =>
          `<div class="li"><div class="grow">${person(e, e.dept)}</div>${p >= 100 ? chip('Complete', 'ok') : `<div style="width:90px"><div class="bar ${p < 50 ? 'a' : ''}"><i style="width:${p}%"></i></div></div><b class="small" style="width:34px;text-align:right">${p}%</b>`}</div>`
      )
      .join('')}</div>`,
    actions: pending.length
      ? `<button class="btn primary" onclick="closeModal();toast('Reminder sent to ${pending.length} ${pending.length === 1 ? 'person' : 'people'}')">Remind ${pending.length} ${pending.length === 1 ? 'person' : 'people'}</button>`
      : ''
  });
}
function annView(i) {
  const a = ANN[i];
  detail(a[0], {
    chips: chip('Posted ' + a[2], 'mute', 1),
    note: esc(a[1]) + ' Please speak to your manager or HR if you have any questions.',
    noteT: 'Announcement'
  });
}

/* js/features/performance/review.js */
/* =============== performance review =============== */
const RATE = [
  'Needs improvement',
  'Below expectations',
  'Meets expectations',
  'Exceeds expectations',
  'Outstanding'
];
function reviewForm(empId) {
  const e = employees.find(x => x.id === empId),
    r = S.reviews[empId];
  if (r) {
    return detail('Performance review', {
      head: whoHead(e),
      chips: chip('Submitted', 'ok') + ' ' + chip(r.rating + ' · ' + RATE[r.rating - 1], 'info', 1),
      rows: [
        ['Goals', esc(r.goals)],
        ['Reviewed by', esc(r.by)],
        ['Date', fdate(r.date)]
      ],
      note: esc(r.strengths),
      noteT: 'Strengths',
      body: `<div class="rbox"><b>To improve</b><p style="margin-top:6px">${esc(r.improve || 'Nothing noted.')}</p></div>`
    });
  }
  S.rateTmp = 0;
  overlay(
    'Performance review',
    `${whoHead(e)}<div class="field"><label id="rl">Overall rating</label><div class="rate" role="radiogroup" aria-labelledby="rl">${RATE.map((t, i) => `<button type="button" class="rb" role="radio" aria-checked="false" onclick="setRate(${i + 1})"><b>${i + 1}</b><span>${t}</span></button>`).join('')}</div><div class="err" id="rate-e" role="alert"></div></div>
   <div class="fg">${fld('rg', 'Goals this cycle', '<select id="rg"><option>Fully met</option><option>Mostly met</option><option>Partly met</option><option>Not met</option></select>', 'full')}${fld('rs', 'Strengths', '<textarea id="rs" rows="3" placeholder="What did this person do well?"></textarea>', 'full')}${fld('ri2', 'Areas to improve', '<textarea id="ri2" rows="3" placeholder="Where can they grow? (optional)"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveReview('${empId}')">Submit review</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function setRate(n) {
  S.rateTmp = n;
  document
    .querySelectorAll('.rate .rb')
    .forEach((b, i) => b.setAttribute('aria-checked', String(i + 1 === n)));
  $('#rate-e').textContent = '';
}
function saveReview(empId) {
  let ok = true;
  if (!S.rateTmp) {
    $('#rate-e').textContent = 'Choose an overall rating';
    ok = false;
  }
  ok = chk('rs', !!$('#rs').value.trim(), 'Add at least one strength') && ok;
  if (!ok) return;
  S.reviews[empId] = {
    rating: S.rateTmp,
    goals: $('#rg').value,
    strengths: $('#rs').value.trim(),
    improve: $('#ri2').value.trim(),
    by: me().name,
    date: iso(NOW)
  };
  closeModal();
  render();
  toast('Review submitted');
}
function setCandFilter(r) {
  S.candF = S.candF === r ? '' : r;
  render();
}

/* js/features/auth/login-screen.js */
/* =============== login =============== */
const DEMO_PW = 'demo1234';
function setAuth(v) {
  S.authed = v;
  document.body.classList.toggle('locked', !v);
}

function loginArt() {
  const win = (x0, y0, cols, rows, dx, dy, w, h, lit) => {
    let s = '';
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const on = lit.includes(r * cols + c);
        s += `<rect x="${x0 + c * dx}" y="${y0 + r * dy}" width="${w}" height="${h}" rx="2" fill="${on ? '#ECC983' : '#A9BEF0'}" opacity="${on ? 0.95 : 0.3}"/>`;
      }
    return s;
  };
  const bars = [34, 41, 30, 45, 38, 24]
    .map(
      (h, i) =>
        `<rect x="${184 + i * 15}" y="${166 - h}" width="9" height="${h}" rx="2.5" fill="${i === 5 ? '#3969D0' : '#BBC9F0'}"/>`
    )
    .join('');
  return `<svg class="lg-art" viewBox="0 0 560 360" role="img" aria-label="Illustration: a PeopleDesk dashboard showing attendance, shifts, a clock-in, a payslip and a leave approval, in front of a factory and an office tower">
  <defs>
   <radialGradient id="la-g" cx="50%" cy="46%" r="55%"><stop offset="0" stop-color="#5C7FD6" stop-opacity=".45"/><stop offset="1" stop-color="#2B3F69" stop-opacity="0"/></radialGradient>
   <linearGradient id="la-gr" x1="0" x2="1"><stop offset="0" stop-color="#222F52" stop-opacity="0"/><stop offset=".12" stop-color="#222F52"/><stop offset=".88" stop-color="#222F52"/><stop offset="1" stop-color="#222F52" stop-opacity="0"/></linearGradient>
   <filter id="la-s1" x="-25%" y="-25%" width="150%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0A1020" flood-opacity=".42"/></filter>
   <filter id="la-s2" x="-25%" y="-30%" width="150%" height="180%"><feDropShadow dx="0" dy="7" stdDeviation="7" flood-color="#0A1020" flood-opacity=".36"/></filter>
  </defs>
  <ellipse cx="290" cy="170" rx="275" ry="175" fill="url(#la-g)"/>
  <rect x="0" y="322" width="560" height="38" fill="url(#la-gr)" opacity=".4"/>
  <g>
   <polygon points="8,262 8,234 44,262 44,234 80,262 80,234 116,262 116,234 152,262 152,234 164,262 164,322 8,322" fill="#3B5187"/>
   <rect x="126" y="192" width="16" height="72" fill="#465C93"/><rect x="122" y="186" width="24" height="8" rx="3" fill="#5168A0"/>
   <circle cx="138" cy="170" r="9" fill="#7C98DB" opacity=".32"/><circle cx="150" cy="152" r="12" fill="#7C98DB" opacity=".24"/><circle cx="165" cy="132" r="15" fill="#7C98DB" opacity=".16"/>
   ${[22, 50, 78, 106].map(x => `<rect x="${x}" y="284" width="20" height="14" rx="2.5" fill="#86D8CE" opacity=".8"/>`).join('')}
   <rect x="134" y="296" width="22" height="26" rx="2" fill="#2B3F69"/>
  </g>
  <rect x="470" y="176" width="72" height="146" fill="#3B5187"/><rect x="498" y="158" width="18" height="18" fill="#465C93"/><rect x="505" y="146" width="4" height="14" fill="#5168A0"/>
  <rect x="428" y="238" width="48" height="84" fill="#465C93"/>
  ${win(481, 190, 3, 6, 20, 20, 12, 10, [1, 4, 8, 13])}${win(437, 250, 2, 4, 20, 18, 12, 9, [2, 5])}
  <g transform="translate(142 34)" filter="url(#la-s1)">
   <rect width="296" height="218" rx="16" fill="#F8F9FB"/>
   <path d="M0 16a16 16 0 0 1 16-16h264a16 16 0 0 1 16 16v14H0z" fill="#EDF2FC"/>
   <circle cx="18" cy="15" r="3.5" fill="#EFA9A6"/><circle cx="30" cy="15" r="3.5" fill="#ECC983"/><circle cx="42" cy="15" r="3.5" fill="#86CBA9"/>
   <rect x="172" y="9" width="108" height="12" rx="6" fill="#fff"/>
   <path d="M0 30h54v172a16 16 0 0 1-16 16H16A16 16 0 0 1 0 202z" fill="#202E4B"/>
   <rect x="12" y="43" width="30" height="8" rx="4" fill="#fff" opacity=".92"/>
   <rect x="8" y="64" width="38" height="16" rx="8" fill="#3969D0"/><rect x="14" y="70" width="26" height="4" rx="2" fill="#fff" opacity=".9"/>
   ${[92, 108, 124, 140].map(y => `<rect x="12" y="${y}" width="30" height="5" rx="2.5" fill="#fff" opacity=".22"/>`).join('')}
   <rect x="70" y="42" width="96" height="9" rx="4.5" fill="#1D2535"/><rect x="70" y="57" width="62" height="6" rx="3" fill="#C9CFDB"/>
   <rect x="70" y="76" width="92" height="104" rx="12" fill="#fff" stroke="#E0E4EB"/>
   <circle cx="116" cy="123" r="26" fill="none" stroke="#E0E4EB" stroke-width="9"/>
   <circle cx="116" cy="123" r="26" fill="none" stroke="#3969D0" stroke-width="9" stroke-linecap="round" stroke-dasharray="143.8 163.4" transform="rotate(-90 116 123)"/>
   <text x="116" y="128.5" text-anchor="middle" font-size="15" font-weight="700" fill="#1D2535">88%</text>
   <text x="116" y="166" text-anchor="middle" font-size="8.5" fill="#576175">Present today</text>
   <rect x="172" y="76" width="112" height="104" rx="12" fill="#fff" stroke="#E0E4EB"/>
   <text x="184" y="93" font-size="8.5" fill="#576175">This week</text>
   <line x1="184" x2="274" y1="124" y2="124" stroke="#3C9A91" stroke-width="1.4" stroke-dasharray="3 3"/>
   ${bars}
   <rect x="70" y="190" width="22" height="18" rx="5" fill="#E6F4F3"/><text x="81" y="203" text-anchor="middle" font-size="10" font-weight="700" fill="#155B54">A</text>
   <rect x="96" y="190" width="22" height="18" rx="5" fill="#FBF1DA"/><text x="107" y="203" text-anchor="middle" font-size="10" font-weight="700" fill="#633E0D">B</text>
   <rect x="122" y="190" width="22" height="18" rx="5" fill="#202E4B"/><text x="133" y="203" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">C</text>
   <circle cx="232" cy="199" r="9" fill="#3969D0" stroke="#F8F9FB" stroke-width="2"/><circle cx="246" cy="199" r="9" fill="#2A8077" stroke="#F8F9FB" stroke-width="2"/><circle cx="260" cy="199" r="9" fill="#7058C0" stroke="#F8F9FB" stroke-width="2"/><circle cx="274" cy="199" r="9" fill="#EDF2FC" stroke="#F8F9FB" stroke-width="2"/><text x="274" y="202.5" text-anchor="middle" font-size="8" font-weight="700" fill="#234795">+9</text>
  </g>
  <g transform="translate(20 186)" filter="url(#la-s2)">
   <rect width="186" height="60" rx="14" fill="#fff"/><circle cx="31" cy="30" r="16" fill="#E3F2EB"/>
   <path d="M23.5 30.5l5.2 5.2 9.3-10.6" stroke="#2F7F58" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="56" y="27" font-size="12.5" font-weight="700" fill="#1D2535">Clocked in</text><text x="56" y="43" font-size="10.5" fill="#576175">09:02 · Gurugram HQ</text>
  </g>
  <g transform="translate(378 56)" filter="url(#la-s2)">
   <rect width="174" height="68" rx="14" fill="#fff"/><rect x="12" y="14" width="36" height="40" rx="9" fill="#E6F4F3"/>
   <rect x="21" y="25" width="18" height="3" rx="1.5" fill="#155B54"/><rect x="21" y="32" width="18" height="3" rx="1.5" fill="#155B54" opacity=".6"/><rect x="21" y="39" width="11" height="3" rx="1.5" fill="#155B54" opacity=".6"/>
   <text x="58" y="30" font-size="12.5" font-weight="700" fill="#1D2535">Payslip ready</text><text x="58" y="47" font-size="11.5" font-weight="700" fill="#155B54">${inr(slip(employees.find(e => e.id === 'E-1003').ctc).net)} net</text>
  </g>
  <g transform="translate(258 258)" filter="url(#la-s2)">
   <rect width="216" height="62" rx="14" fill="#fff"/><circle cx="31" cy="31" r="16" fill="#3969D0"/><text x="31" y="35.5" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">RV</text>
   <text x="56" y="28" font-size="12" font-weight="700" fill="#1D2535">Leave request</text><text x="56" y="44" font-size="10.5" fill="#576175">Riya · 2 days</text>
   <rect x="158" y="19" width="22" height="24" rx="7" fill="#E3F2EB"/><path d="M164 31l4 4 6-7" stroke="#2F7F58" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <rect x="184" y="19" width="22" height="24" rx="7" fill="#FBEAEA"/><path d="M190.5 26.5l9 9M199.5 26.5l-9 9" stroke="#A8403D" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <circle cx="92" cy="74" r="3.5" fill="#86D8CE" opacity=".75"/><circle cx="520" cy="118" r="2.5" fill="#fff" opacity=".4"/><circle cx="60" cy="130" r="2" fill="#fff" opacity=".35"/>
  <path d="M388 24h10M393 19v10" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".4"/><path d="M112 318h8M116 314v8" stroke="#86D8CE" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
  </svg>`;
}

/* js/features/auth/login-flow.js */
/* =============== login background skyline =============== */
function lgSkyline() {
  let s = 0x9e3779b1;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const H = 170,
    W = 1440;
  let far = '',
    near = '',
    lit = '';
  for (let x = -20; x < W; ) {
    const w = 46 + rnd() * 64,
      h = 40 + rnd() * 74;
    far += `<rect x="${x.toFixed(0)}" y="${(H - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}"/>`;
    x += w + 3 + rnd() * 12;
  }
  // factory with sawtooth roof and chimney (left)
  near += `<path d="M70 ${H}V86l46 34V86l46 34V86l46 34V86l46 34V86l46 34V${H}z"/><rect x="258" y="38" width="20" height="${H - 38}"/><rect x="252" y="30" width="32" height="10" rx="3"/>`;
  for (let i = 0; i < 5; i++)
    lit += `<rect x="${92 + i * 46}" y="136" width="20" height="14" rx="3" fill="#86D8CE" opacity=".5"/>`;
  // mid-rise blocks
  for (let x = 360; x < 1040; ) {
    const w = 52 + rnd() * 50,
      h = 60 + rnd() * 70;
    near += `<rect x="${x.toFixed(0)}" y="${(H - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}"/>`;
    if (rnd() > 0.55)
      lit += `<rect x="${(x + 10).toFixed(0)}" y="${(H - h + 14).toFixed(0)}" width="9" height="7" rx="1.5" fill="#F5C766" opacity=".55"/>`;
    x += w + 8 + rnd() * 16;
  }
  // office towers (right)
  near += `<rect x="1090" y="46" width="86" height="${H - 46}"/><rect x="1196" y="84" width="64" height="${H - 84}"/><rect x="1280" y="62" width="74" height="${H - 62}"/><rect x="1128" y="30" width="6" height="18"/>`;
  for (let r = 0; r < 5; r++)
    for (let k = 0; k < 3; k++)
      lit += `<rect x="${1104 + k * 24}" y="${62 + r * 20}" width="12" height="9" rx="2" fill="${(r * 3 + k) % 4 === 1 ? '#F5C766' : '#fff'}" opacity="${(r * 3 + k) % 4 === 1 ? 0.6 : 0.16}"/>`;
  return `<svg class="lg-sky" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g fill="#fff" opacity=".05">${far}</g><g fill="#fff" opacity=".10">${near}</g>${lit}</svg>`;
}
function renderLogin() {
  $('#login').innerHTML =
    `<button class="icon-btn lg-theme" onclick="setTheme(isDark()?'light':'dark')" aria-label="Toggle dark mode">${ic(isDark() ? 'sun' : 'moon', 18)}</button>
  <aside class="lg-hero" aria-label="About PeopleDesk"><div class="lg-brand">${logoTile(46)}${logoWord(24)}</div>
   <div class="lg-mid"><h2>Every person, shift and payslip in one place.</h2><p class="lead">PeopleDesk keeps office teams and plant floors on the same page, from clock-in to payday.</p>${loginArt()}</div>
   <div><ul class="lg-chips">${[
     ['clock', 'Attendance and shifts'],
     ['wallet', 'Payroll and compliance'],
     ['shield', 'Safety and training']
   ]
     .map(([i, t]) => `<li><span class="fi">${ic(i, 16)}</span>${t}</li>`)
     .join('')}</ul><p class="lg-cp">© 2026 GMux Pvt. Ltd. All rights reserved.</p></div></aside>
  <main class="lg-main"><div class="lg-card" id="lg-card"></div>
   <div class="lg-links"><span class="stt"><i></i>All systems operational</span><button onclick="docView('privacy')">Privacy</button><button onclick="docView('terms')">Terms</button><button onclick="helpCentre()">Help centre</button></div></main>${lgSkyline()}`;
  lgStep('creds');
}
function credsHTML() {
  const u = employees.find(x => x.id === USER.admin),
    rem = S.remember !== false;
  return `<h1>Welcome back</h1><p class="sub0">Sign in to your GMux workspace.</p>${S.loginNote ? `<div class="lg-note" role="status">${ic('clock', 18)}<span>${esc(S.loginNote)}</span></div>` : ''}
   <div class="field" style="margin-top:28px"><label for="lg-id">Work email or employee ID</label><div class="inp">${ic('mail', 18)}<input id="lg-id" value="${rem ? esc(u.email) : ''}" placeholder="name@gmux.in" autocomplete="username" autocapitalize="none" spellcheck="false" inputmode="email" onkeydown="if(event.key==='Enter')doLogin()" oninput="loginClear()"></div><div class="err" id="lg-id-e" role="alert"></div></div>
   <div class="field"><label for="lg-pw">Password</label><div class="inp">${ic('lock', 18)}<input id="lg-pw" type="password" value="${rem ? esc(S.creds.admin) : ''}" placeholder="Enter your password" autocomplete="current-password" onkeydown="capsCheck(event);if(event.key==='Enter')doLogin()" onkeyup="capsCheck(event)" onblur="capsCheck()" oninput="loginClear()"><button class="eye" type="button" id="lg-eye" onclick="togglePw()" aria-label="Show password" aria-pressed="false">${ic('eye', 18)}</button></div><div class="caps" id="lg-caps" hidden>${ic('alert', 14)}Caps Lock is on</div><div class="err" id="lg-pw-e" role="alert"></div></div>
   <div class="lg-row"><label class="chk" title="Keep your sign-in details filled in on this device"><input type="checkbox" id="lg-rm" ${rem ? 'checked' : ''}>Remember me</label><button class="link" type="button" onclick="forgot()">Forgot password?</button></div>
   <div class="lg-alert" id="lg-err" role="alert" hidden></div>
   <button class="btn primary big full" id="lg-go" onclick="doLogin()">Sign in</button>
   <div class="or">or</div>
   <button class="btn big full" onclick="ssoStart()">${ic('key', 18)}Continue with company SSO</button>
   ${S.sec.twoFA.hr ? `<p class="secure">${ic('shield', 14)}Protected with two-step verification</p>` : ''}
   <p class="nacct">Need an account? Contact your HR administrator.</p>`;
}
function loginClear() {
  ['lg-id', 'lg-pw'].forEach(i => chk(i, true, ''));
  const a = $('#lg-err');
  if (a) a.hidden = true;
}
function togglePw() {
  const i = $('#lg-pw'),
    show = i.type === 'password';
  i.type = show ? 'text' : 'password';
  $('#lg-eye').innerHTML = ic(show ? 'eyeoff' : 'eye', 18);
  $('#lg-eye').setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  $('#lg-eye').setAttribute('aria-pressed', String(show));
}
function capsCheck(e) {
  const c = $('#lg-caps');
  if (c) c.hidden = !(e && e.getModifierState && e.getModifierState('CapsLock'));
}
function ssoStart() {
  overlay(
    'Sign in with company SSO',
    `<p class="muted" style="margin-bottom:14px">Enter your company domain and we will take you to your identity provider.</p>${fld('sso', 'Company domain', `<div class="inp">${ic('key', 18)}<input id="sso" value="gmux.in" autocapitalize="none" spellcheck="false" onkeydown="if(event.key==='Enter')ssoGo()" oninput="chk('sso',true,'')"></div>`)}<div class="hint">Works with Microsoft Entra ID, Google Workspace and Okta.</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" id="sso-go" onclick="ssoGo()">Continue</button>`
  );
}
function ssoGo() {
  const v = $('#sso').value.trim().toLowerCase();
  if (
    !chk(
      'sso',
      /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(v),
      'Enter a valid company domain, for example gmux.in'
    )
  )
    return;
  if (!chk('sso', v === 'gmux.in', 'We could not find single sign-on for ' + v + '. Try gmux.in'))
    return;
  const b = $('#sso-go');
  b.disabled = true;
  b.innerHTML = '<span class="spin"></span>Redirecting';
  setTimeout(() => {
    closeModal();
    finishLogin();
  }, 900);
}
function loginFail(msg) {
  const card = $('#lg-card');
  if (card) {
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }
  const a = $('#lg-err');
  a.innerHTML = ic('alert', 18) + '<span>' + msg + '</span>';
  a.hidden = false;
}
function doLogin() {
  const id = $('#lg-id').value.trim().toLowerCase(),
    pw = $('#lg-pw').value,
    u = employees.find(x => x.id === USER.admin);
  const ok = [
    chk('lg-id', !!id, 'Enter your work email or employee ID'),
    chk('lg-pw', !!pw, 'Enter your password')
  ].every(Boolean);
  if (!ok) return;
  if ((id !== u.email.toLowerCase() && id !== u.id.toLowerCase()) || pw !== S.creds.admin) {
    loginFail('The email, employee ID or password is incorrect. Check your details and try again.');
    return;
  }
  S.remember = $('#lg-rm').checked;
  try {
    localStorage.setItem('pd-remember', S.remember ? '1' : '0');
  } catch (e) {}
  const b = $('#lg-go');
  b.disabled = true;
  b.innerHTML = '<span class="spin"></span>Signing in';
  setTimeout(afterCreds, 450);
}
/* ---- sign-in steps: credentials, optional new password, optional 6-digit code ---- */
const OTP_CODE = '482916';
let otpT = null;
function afterCreds() {
  const r = 'admin';
  if (S.mustChange[r]) return lgStep('change');
  if (S.sec.twoFA.hr) return lgStep('otp');
  finishLogin();
}
function finishLogin() {
  clearInterval(otpT);
  idleReset();
  const r = 'admin',
    u = employees.find(x => x.id === USER[r]);
  S.persona = 'hr';
  S.role = uiOf(roleOf(USER[r]));
  S.denied = false;
  S.page = 'dashboard';
  S.tab = {};
  S.q = '';
  S.deptF = 'All';
  S.statF = 'All';
  setAuth(true);
  render();
  window.scrollTo(0, 0);
  toast('Signed in as ' + u.name);
  if (!S.tipShown) {
    S.tipShown = true;
    setTimeout(() => {
      if (S.authed)
        toast(
          isMobileUI()
            ? 'Tip: tap the role chip at the top to preview the five roles.'
            : 'Tip: use Preview as in the top bar to preview the five roles.'
        );
    }, 1600);
  }
}
function lgStep(s) {
  clearInterval(otpT);
  S.lstep = s;
  const c = $('#lg-card');
  if (s === 'creds') {
    c.innerHTML = credsHTML();
    loginClear();
  } else if (s === 'change') {
    c.innerHTML = changeHTML();
    pwLive('lc');
    $('#lcnew').focus();
  } else {
    c.innerHTML = otpHTML();
    otpStart();
    document.querySelector('#otp input').focus();
  }
}
/* password helpers */
const PWR = [
  ['len', 'At least {n} characters'],
  ['case', 'Upper and lower case'],
  ['num', 'A number'],
  ['sym', 'A symbol (recommended)']
];
const eyeB = id =>
  `<button class="eye" type="button" onclick="toggleEye('${id}',this)" aria-label="Show password" aria-pressed="false">${ic('eye', 18)}</button>`;
function toggleEye(id, b) {
  const i = $('#' + id),
    sh = i.type === 'password';
  i.type = sh ? 'text' : 'password';
  b.innerHTML = ic(sh ? 'eyeoff' : 'eye', 18);
  b.setAttribute('aria-label', sh ? 'Hide password' : 'Show password');
  b.setAttribute('aria-pressed', String(sh));
}
const pwInp = (id, ac, x = '') =>
  `<div class="inp">${ic('lock', 18)}<input id="${id}" type="password" autocomplete="${ac}" ${x}>${eyeB(id)}</div>`;
function pwFields(p, cur) {
  return (
    (cur ? fld(p + 'cur', 'Current password', pwInp(p + 'cur', 'current-password')) : '') +
    fld(p + 'new', 'New password', pwInp(p + 'new', 'new-password', `oninput="pwLive('${p}')"`)) +
    `<div class="meter" id="${p}-m" data-l="0"><i></i><i></i><i></i><i></i><span id="${p}-ml">Enter a password</span></div>
    <ul class="rules" id="${p}-r">${PWR.map(([k, t]) => `<li data-k="${k}"><span class="rk">${ic('check', 10)}</span>${t.replace('{n}', S.sec.minLen)}</li>`).join('')}</ul>` +
    fld(
      p + 'conf',
      'Confirm new password',
      pwInp(p + 'conf', 'new-password', `onkeydown="if(event.key==='Enter')saveNewPw('${p}')"`)
    )
  );
}
const pwRules = v => ({
  len: v.length >= S.sec.minLen,
  case: /[a-z]/.test(v) && /[A-Z]/.test(v),
  num: /\d/.test(v),
  sym: /[^A-Za-z0-9]/.test(v)
});
function pwLive(p) {
  const v = $('#' + p + 'new').value,
    r = pwRules(v),
    n = Object.values(r).filter(Boolean).length,
    l = v ? Math.max(1, n) : 0;
  document
    .querySelectorAll('#' + p + '-r li')
    .forEach(li => li.classList.toggle('ok', !!r[li.dataset.k]));
  $('#' + p + '-m').dataset.l = l;
  $('#' + p + '-ml').textContent = ['Enter a password', 'Weak', 'Fair', 'Good', 'Strong'][l];
  chk(p + 'new', true, '');
}
function saveNewPw(p) {
  const v = $('#' + p + 'new').value,
    cf = $('#' + p + 'conf').value,
    rl = pwRules(v),
    cur = $('#' + p + 'cur'),
    old = S.creds.admin;
  let ok = true;
  if (cur) ok = chk(p + 'cur', cur.value === old, 'That is not your current password') && ok;
  ok =
    chk(
      p + 'new',
      rl.len && rl.case && rl.num && v !== old,
      v && v === old
        ? 'Choose a password you have not used before'
        : 'Meet the length, case and number requirements below'
    ) && ok;
  ok = chk(p + 'conf', !!cf && cf === v, 'The two passwords do not match') && ok;
  if (!ok) return;
  if (p === 'cp') {
    S.creds.admin = v;
    closeModal();
    toast('Password changed');
  } else {
    S.creds.admin = v;
    S.mustChange.admin = false;
    toast('Password updated');
    afterCreds();
  }
}
function changeHTML() {
  const e = employees.find(x => x.id === USER.admin);
  return `<button class="backl" onclick="lgStep('creds')">${ic('arrow', 16)}Back to sign in</button>
   <div class="stepic t-brand">${ic('lock', 24)}</div><h1>Set a new password</h1>
   <p class="sub0">Your account uses a temporary password. Choose a new one to continue.</p>
   <div style="margin-top:22px">${pwFields('lc', false)}</div>
   <button class="btn primary big full" onclick="saveNewPw('lc')">Save and continue</button>
   <div class="demo">Signing in as <b>${esc(e.email)}</b>. Your new password replaces the temporary one.</div>`;
}
function changePw() {
  overlay(
    'Change password',
    pwFields('cp', true),
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveNewPw('cp')">Update password</button>`
  );
  pwLive('cp');
}
/* two-step verification */
function otpHTML() {
  const e = employees.find(x => x.id === USER.admin),
    [u, d] = e.email.split('@');
  S.otp = { tries: 0 };
  return `<button class="backl" onclick="lgStep('creds')">${ic('arrow', 16)}Back to sign in</button>
   <div class="stepic t-brand">${ic('shield', 24)}</div><h1>Verify it's you</h1>
   <p class="sub0">Enter the 6-digit code we sent to <b>${esc(u.slice(0, 2))}•••@${esc(d)}</b>.</p>
   <div class="otp" id="otp" role="group" aria-label="6-digit verification code">${[0, 1, 2, 3, 4, 5].map(i => `<input inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="${i ? 'off' : 'one-time-code'}" aria-label="Digit ${i + 1} of 6" oninput="otpIn(${i},this)" onkeydown="otpKey(event,${i})" onpaste="otpPaste(event)">`).join('')}</div>
   <div class="lg-alert" id="otp-err" role="alert" hidden style="margin-top:14px"></div>
   <label class="chk" style="margin-top:18px"><input type="checkbox" id="otp-rm" checked>Remember this device for 30 days</label>
   <button class="btn primary big full" id="otp-go" onclick="otpVerify()" disabled>Verify and sign in</button>
   <p class="small muted" style="text-align:center;margin-top:16px" id="otp-rs"></p>
   <p class="otp-hint">Prototype build: use code <b>${OTP_CODE}</b>. In production the code arrives by SMS or an authenticator app.</p>`;
}
const otpEls = () => [...document.querySelectorAll('#otp input')],
  otpVal = () =>
    otpEls()
      .map(x => x.value)
      .join('');
function otpIn(i, el) {
  el.value = el.value.replace(/\D/g, '').slice(-1);
  el.classList.toggle('filled', !!el.value);
  if (el.value && i < 5) otpEls()[i + 1].focus();
  otpState();
}
function otpKey(e, i) {
  const els = otpEls();
  if (e.key === 'Backspace' && !els[i].value && i > 0) {
    e.preventDefault();
    els[i - 1].value = '';
    els[i - 1].classList.remove('filled');
    els[i - 1].focus();
    otpState();
  } else if (e.key === 'ArrowLeft' && i > 0) {
    e.preventDefault();
    els[i - 1].focus();
  } else if (e.key === 'ArrowRight' && i < 5) {
    e.preventDefault();
    els[i + 1].focus();
  } else if (e.key === 'Enter') otpVerify();
}
function otpPaste(e) {
  const t = (e.clipboardData || window.clipboardData)
    .getData('text')
    .replace(/\D/g, '')
    .slice(0, 6);
  if (!t) return;
  e.preventDefault();
  const els = otpEls();
  t.split('').forEach((d, i) => {
    els[i].value = d;
    els[i].classList.add('filled');
  });
  els[Math.min(t.length, 5)].focus();
  otpState();
}
function otpState() {
  const v = otpVal();
  $('#otp-go').disabled = v.length < 6 || !!S.otp.locked;
  $('#otp').classList.remove('bad');
  $('#otp-err').hidden = true;
  if (v.length === 6) otpVerify();
}
function otpVerify() {
  const v = otpVal();
  if (v.length < 6 || S.otp.busy || S.otp.locked) return;
  if (v !== OTP_CODE) {
    S.otp.tries++;
    const left = 3 - S.otp.tries,
      a = $('#otp-err');
    $('#otp').classList.add('bad');
    a.innerHTML =
      ic('alert', 18) +
      '<span>' +
      (left > 0
        ? `That code is incorrect. ${left} attempt${left > 1 ? 's' : ''} left.`
        : 'Too many incorrect attempts. Go back and sign in again to get a new code.') +
      '</span>';
    a.hidden = false;
    $('#otp-go').disabled = true;
    if (left <= 0) {
      S.otp.locked = true;
      otpEls().forEach(x => (x.disabled = true));
    } else {
      otpEls().forEach(x => {
        x.value = '';
        x.classList.remove('filled');
      });
      otpEls()[0].focus();
    }
    return;
  }
  S.otp.busy = true;
  const b = $('#otp-go');
  b.disabled = true;
  b.innerHTML = '<span class="spin"></span>Verifying';
  setTimeout(finishLogin, 450);
}
function otpStart() {
  clearInterval(otpT);
  let t = 30;
  const paint = () => {
    const el = $('#otp-rs');
    if (!el) {
      clearInterval(otpT);
      return;
    }
    el.innerHTML =
      t > 0
        ? `Resend code in 0:${pad(t)}`
        : `Didn't get it? <button class="link" onclick="otpResend()">Resend code</button>`;
  };
  paint();
  otpT = setInterval(() => {
    t--;
    paint();
    if (t <= 0) clearInterval(otpT);
  }, 1000);
}
function otpResend() {
  toast('A new code has been sent');
  otpStart();
}
function forgot() {
  overlay(
    'Reset your password',
    `<p class="muted" style="margin-bottom:14px">Enter your work email and we'll send a link to reset your password.</p>${fld('fp', 'Work email', '<input id="fp" type="email" inputmode="email" autocomplete="email" placeholder="you@gmux.in">')}`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="sendReset()">Send reset link</button>`
  );
}
function sendReset() {
  const v = $('#fp').value.trim();
  if (!chk('fp', /^\S+@\S+\.\S+$/.test(v), 'Enter a valid email address')) return;
  closeModal();
  toast('If an account exists for ' + v + ', a reset link is on its way');
}
function signOut(reason) {
  closeModal();
  clearTimeout(idleT);
  clearInterval(idleC);
  S.hist = [];
  setAuth(false);
  S.clock = { in: null, out: null, mode: 'Office' };
  S.loginNote = typeof reason === 'string' ? reason : '';
  renderLogin();
  S.loginNote = '';
  window.scrollTo(0, 0);
  if (typeof reason !== 'string') toast('You have been signed out');
}
/* inactivity timeout: warn one minute before signing out */
let idleT = null,
  idleC = null;
const idleMs = () => (S.idleTest ? S.idleTest.total : S.sec.timeout * 60000),
  idleGrace = () => (S.idleTest ? S.idleTest.grace : 60000);
function idleReset() {
  if (!S.authed || $('#layer [data-lock]')) return;
  clearTimeout(idleT);
  idleT = setTimeout(idleWarn, Math.max(500, idleMs() - idleGrace()));
}
function idleWarn() {
  if (!S.authed) return;
  let left = Math.round(idleGrace() / 1000);
  overlay(
    'Are you still there?',
    `<p>For your security, you will be signed out soon because there has been no activity.</p><div class="cnt" id="idle-n" style="margin:14px 0 2px">${left}</div><p class="muted small">seconds until sign out</p>`,
    `<button class="btn" onclick="signOut()">Sign out now</button><button class="btn primary" onclick="idleStay()">Stay signed in</button>`,
    { lock: true }
  );
  clearInterval(idleC);
  idleC = setInterval(() => {
    left--;
    const n = $('#idle-n');
    if (n) n.textContent = Math.max(left, 0);
    if (left <= 0) {
      clearInterval(idleC);
      signOut(
        `You were signed out after ${S.idleTest ? 'a period of' : Math.round(S.sec.timeout) + ' minutes of'} inactivity. Sign in again to continue.`
      );
    }
  }, 1000);
}
function idleStay() {
  clearInterval(idleC);
  closeModal();
  idleReset();
  toast('Session extended');
}
['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(ev =>
  addEventListener(
    ev,
    () => {
      if (S.authed && !$('#layer [data-lock]')) {
        const now = Date.now();
        if (now - (idleReset.last || 0) > 1500) {
          idleReset.last = now;
          idleReset();
        }
      }
    },
    { passive: true, capture: true }
  )
);
/* swipe in from the left edge to go back */
(function () {
  let sx = null,
    sy = 0;
  const hint = document.createElement('div');
  hint.className = 'back-hint';
  hint.innerHTML = ic('arrow', 18);
  document.body.appendChild(hint);
  addEventListener(
    'touchstart',
    e => {
      const t = e.touches[0];
      sx = t.clientX <= 24 ? t.clientX : null;
      sy = t.clientY;
    },
    { passive: true }
  );
  addEventListener(
    'touchend',
    e => {
      if (sx == null) return;
      const t = e.changedTouches[0],
        dx = t.clientX - sx,
        dy = Math.abs(t.clientY - sy);
      sx = null;
      if (dx > 80 && dy < 70 && S.authed && S.hist.length && !$('#layer .ov') && !ddOpen) {
        hint.classList.remove('go');
        void hint.offsetWidth;
        hint.classList.add('go');
        back();
      }
    },
    { passive: true }
  );
})();

/* js/roles/personas.js */
/* =====================================================================
   PeopleDesk governance engine (v38)
   personas · org hierarchy · access model · audit log · policies · work calendar
   ===================================================================== */
const ROLE_DEF = [
  {
    k: 'employee',
    n: 'Employee',
    d: 'Uses self-service for attendance, leave, payslips, documents, requests, goals and training',
    i: 'user'
  },
  {
    k: 'manager',
    n: 'Manager',
    d: "Manages and approves their team's attendance, leave, claims, goals and performance",
    i: 'users'
  },
  {
    k: 'hr',
    n: 'HR',
    d: 'Manages employee records, onboarding and offboarding, policies, documents, recruitment and HR reports',
    i: 'userplus'
  },
  {
    k: 'admin',
    n: 'Admin',
    d: 'Business administrator: approves payroll, manages company-wide policies, reports and business configuration',
    i: 'shield'
  },
  {
    k: 'sysadmin',
    n: 'System Admin',
    d: 'Manages users, roles, security, SSO, integrations and sessions. No employee or payroll data by default',
    i: 'key'
  }
];
const ROLE_KEYS = ROLE_DEF.map(r => r.k),
  ROLES = ROLE_DEF;
const PBASE = [
  { k: 'employee', emp: 'E-1003' },
  { k: 'manager', emp: 'E-1002' },
  { k: 'hr', emp: 'E-1001' },
  { k: 'admin', emp: 'E-1014' },
  { k: 'sysadmin', emp: 'E-1009' }
];
const DEFROLE = { 'E-1001': 'hr', 'E-1014': 'admin', 'E-1009': 'sysadmin' };
Object.assign(S, {
  persona: 'hr',
  roles: {},
  life: { onb: {}, off: {}, exits: [] },
  audit: [],
  auditN: 0,
  orgHist: [],
  deleg: [],
  widgets: {},
  views: [],
  drafts: {},
  prefs: { email: 1, push: 1 },
  save: { st: '', at: '' }
});
const roleDef = k => ROLE_DEF.find(r => r.k === k) || ROLE_DEF[0];
const roleOf = id =>
  (S.roles && S.roles[id]) ||
  DEFROLE[id] ||
  (employees.some(e => e.mgr === id && e.status !== 'Exited') ? 'manager' : 'employee');
const uiOf = r => (r === 'employee' ? 'employee' : r === 'manager' ? 'manager' : 'admin');
const PERSONAS = PBASE.map(b => ({
  k: b.k,
  emp: b.emp,
  get role() {
    return roleOf(b.emp);
  },
  get n() {
    return roleDef(roleOf(b.emp)).n;
  },
  get d() {
    return roleDef(roleOf(b.emp)).d;
  },
  get i() {
    return roleDef(roleOf(b.emp)).i;
  }
}));
const persona = () => PERSONAS.find(p => p.k === S.persona) || PERSONAS[2];
const emp = id => employees.find(e => e.id === id);
function me() {
  return emp(persona().emp);
}
const isMgr = () => S.role !== 'employee';
const roleName = k => roleDef(k).n;
const live = () => employees.filter(e => e.status !== 'Exited');

/* js/roles/org-reporting.js */
/* ---------- organization: reporting lines come from data, not from department names ---------- */
const ORG_SEED = {
  'E-1002': 'E-1001',
  'E-1004': 'E-1002',
  'E-1011': 'E-1002',
  'E-1012': 'E-1002',
  'E-1006': 'E-1002',
  'E-1013': 'E-1006',
  'E-1005': 'E-1002',
  'E-1015': 'E-1002',
  'E-1007': 'E-1001',
  'E-1003': 'E-1014',
  'E-1014': 'E-1001',
  'E-1008': 'E-1001',
  'E-1016': 'E-1008',
  'E-1009': 'E-1001',
  'E-1010': 'E-1001'
};
const mgrOf = e => (e && e.mgr ? emp(e.mgr) : null);
const directs = id => live().filter(e => e.mgr === id);
function lineOf(id) {
  const out = [],
    seen = new Set([id]),
    q = [id];
  while (q.length) {
    const x = q.shift();
    directs(x).forEach(d => {
      if (!seen.has(d.id)) {
        seen.add(d.id);
        out.push(d);
        q.push(d.id);
      }
    });
  }
  return out;
}
const reportsTo = e => {
  const m = mgrOf(e);
  return m ? m.name : 'Board of Directors';
};
const orgCheck = (id, mgr) =>
  id === mgr
    ? 'A person cannot report to themselves'
    : mgr && lineOf(id).some(x => x.id === mgr)
      ? 'That would create a reporting loop'
      : '';

/* js/roles/access-model.js */
/* ---------- access model: resource x action x scope x sensitive fields ---------- */
const ACTS = ['view', 'create', 'edit', 'approve', 'export'],
  ACT_N = { view: 'View', create: 'Create', edit: 'Edit', approve: 'Approve', export: 'Export' },
  ACT_K = 'vceax';
const SCOPES = [
  ['own', 'Own records'],
  ['reports', 'Direct reports'],
  ['line', 'Reporting line'],
  ['dept', 'Department'],
  ['loc', 'Location'],
  ['all', 'Everyone']
];
const SENS = [
  ['salary', 'Salary and pay', 'CTC, payslips and pay variance'],
  ['bank', 'Bank details', 'Account numbers and IFSC'],
  ['ids', 'Identity documents', 'PAN, Aadhaar and passport'],
  ['med', 'Medical information', 'Medical certificates and injury details']
];
const RES = {
  dashboard: ['Dashboard', 'v'],
  approvals: ['Approvals', 'va'],
  employees: ['Employees', 'vcex'],
  org: ['Organization', 've'],
  lifecycle: ['Joiners and leavers', 'vcea'],
  attendance: ['Attendance', 'vceax'],
  hours: ['Hours and overtime', 'vca'],
  leave: ['Leave', 'vcax'],
  payroll: ['Payroll', 'vceax'],
  recruit: ['Recruitment', 'vcex'],
  performance: ['Performance', 'vcea'],
  roster: ['Shift roster', 'vcex'],
  safety: ['Safety', 'vcea'],
  training: ['Training', 'vcex'],
  requests: ['Requests', 'vcax'],
  reports: ['Reports', 'vx'],
  assets: ['Assets', 'vcex'],
  policy: ['Work policies', 've'],
  statutory: ['Statutory settings', 've'],
  users: ['Users and accounts', 've'],
  roles: ['Roles and access', 've'],
  security: ['Security and sessions', 've'],
  integrations: ['Integrations', 've'],
  audit: ['Audit log', 'vx']
};
/* employee | manager | hr | admin | sysadmin */
const PD = {
  dashboard: ['v|own', 'v|line', 'v|all', 'v|all', 'v|own'],
  approvals: ['|own', 'va|line', 'va|all', 'va|all', '|own'],
  employees: ['|own', 'vx|line', 'vcex|all', 'vex|all', '|own'],
  org: ['|own', '|line', 've|all', 've|all', '|own'],
  lifecycle: ['|own', 'va|line', 'vcea|all', 'v|all', '|own'],
  attendance: ['vc|own', 'veax|line', 'vceax|all', 'vx|all', '|own'],
  hours: ['vc|own', 'vca|line', 'vca|all', 'vca|all', '|own'],
  leave: ['vc|own', 'vcax|line', 'vcax|all', 'vax|all', '|own'],
  payroll: ['v|own', 'v|own', 'vce|all', 'veax|all', '|own'],
  recruit: ['|own', '|line', 'vcex|all', 'vx|all', '|own'],
  performance: ['v|own', 'vea|line', 'vcea|all', 'v|all', '|own'],
  roster: ['|own', 'vcex|line', 'vcex|all', 'v|all', '|own'],
  safety: ['vc|own', 'vca|line', 'vcea|all', 'vea|all', '|own'],
  training: ['v|own', 'v|line', 'vcex|all', 'v|all', '|own'],
  requests: ['vc|own', 'vca|line', 'vcax|all', 'v|all', '|own'],
  reports: ['|own', 'vx|line', 'vx|all', 'vx|all', '|own'],
  assets: ['|own', 'vx|line', 'vcex|all', 'vx|all', '|own'],
  policy: ['|own', '|line', 've|all', 've|all', '|own'],
  statutory: ['|own', '|line', 'v|all', 've|all', '|own'],
  users: ['|own', '|line', '|all', '|all', 've|all'],
  roles: ['|own', '|line', '|all', '|all', 've|all'],
  security: ['|own', '|line', '|all', '|all', 've|all'],
  integrations: ['|own', '|line', '|all', '|all', 've|all'],
  audit: ['|own', '|line', 'v|all', 'vx|all', 'v|all']
};
function defaultPerms() {
  const m = {};
  Object.keys(RES).forEach(k => {
    m[k] = {};
    ROLE_KEYS.forEach((r, i) => {
      const [a, s] = PD[k][i].split('|'),
        o = { scope: s };
      ACTS.forEach((x, j) => (o[x] = a.includes(ACT_K[j]) && RES[k][1].includes(ACT_K[j]) ? 1 : 0));
      m[k][r] = o;
    });
  });
  const z = { salary: 0, bank: 0, ids: 0, med: 0 };
  return {
    v: 3,
    m,
    sens: {
      employee: { ...z },
      manager: { ...z },
      hr: { salary: 1, bank: 1, ids: 1, med: 1 },
      admin: { salary: 1, bank: 1, ids: 1, med: 0 },
      sysadmin: { ...z }
    },
    meta: { by: 'System defaults', at: '' }
  };
}
S.perms = defaultPerms();
function can(res, act, p) {
  p = p || persona();
  if (res === 'profile' || (res === 'dashboard' && act === 'view')) return true;
  const r = S.perms.m[res];
  if (!r) return false;
  const g = p.grants && p.grants[res];
  if (g && g.includes(act)) return true;
  const x = r[p.role];
  return !!(x && x[act]);
}
function scopeOf(res, p) {
  p = p || persona();
  const g = p.grants && p.grants[res];
  if (g) return 'all';
  const x = S.perms.m[res] && S.perms.m[res][p.role];
  return x ? x.scope : 'own';
}
function scopeEmps(res) {
  const u = me(),
    sc = scopeOf(res);
  if (sc === 'all') return live();
  if (sc === 'reports') return [u, ...directs(u.id)];
  if (sc === 'line') return [u, ...lineOf(u.id)];
  if (sc === 'dept') return live().filter(e => e.dept === u.dept);
  if (sc === 'loc') return live().filter(e => e.loc === u.loc);
  return [u];
}
const scoped = res => scopeEmps(typeof res === 'string' ? res : 'employees');
const inScope = (res, id) => scopeEmps(res).some(e => e.id === id);
const canField = (f, id) => {
  const p = persona();
  if (id && id === me().id) return true;
  if (p.sens && p.sens[f]) return true;
  const s = S.perms.sens[p.role];
  return !!(s && s[f]);
};
const restricted = () =>
  `<span class="lockv" title="You do not have access to this information">${ic('lock', 14)}Restricted</span>`;
function need(res, act, what) {
  if (can(res, act)) return true;
  const n = RES[res] ? RES[res][0] : res;
  audit('Access denied', n, { res, to: ACT_N[act] });
  toast(`Access denied. You cannot ${what || ACT_N[act].toLowerCase()} in ${n}.`, null, 'err');
  return false;
}
// wrap existing operations so the permission is enforced where the work happens, not only where the button is drawn
const GUARD = {};
function guardFns(list) {
  list.forEach(([fn, res, act, what]) => {
    const orig = window[fn];
    if (typeof orig !== 'function') return;
    GUARD[fn] = [res, act];
    window[fn] = function () {
      if (!need(res, act, what)) return;
      return orig.apply(this, arguments);
    };
  });
}
// controls the person may not use are not drawn at all (the operation itself is refused as well)
function applyPerms(root) {
  if (!root) return;
  root.querySelectorAll('[onclick]').forEach(el => {
    const s = el.getAttribute('onclick') || '',
      re = /\b([A-Za-z_]\w*)\s*\(/g;
    let m;
    while ((m = re.exec(s))) {
      const g = GUARD[m[1]];
      if (g && !can(g[0], g[1])) {
        el.remove();
        return;
      }
    }
  });
}

/* js/services/audit.js */
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

/* js/services/policies.js */
/* ---------- policies: versioned, effective-dated, and read by the calculations ---------- */
const POL_DEF = {
  work: {
    week: { Office: 5, Plant: 6 },
    hours: 9,
    grace: 15,
    ot: '2x',
    fy: 'April',
    probation: 6,
    noticeEL: 3,
    certDays: 2,
    carryEL: 30,
    varPct: 10
  },
  stat: {
    pf: { on: 1, rate: 12, ceil: 15000 },
    esi: { on: 1, emp: 0.75, er: 3.25, ceil: 21000 },
    pt: { on: 1, amt: 200 },
    tds: { on: 1, thresh: 700000, rate: 8 },
    gratuity: 5,
    bonus: 1
  }
};
S.polHist = {};
Object.keys(POL_DEF).forEach(
  k =>
    (S.polHist[k] = [
      {
        eff: '2000-01-01',
        val: JSON.parse(JSON.stringify(POL_DEF[k])),
        by: 'System defaults',
        at: ''
      }
    ])
);
function getPol(k) {
  const h = S.polHist[k],
    t = iso(TODAY),
    ok = h.filter(x => x.eff <= t).sort((a, b) => (a.eff < b.eff ? -1 : a.eff > b.eff ? 1 : 0));
  return (ok.length ? ok[ok.length - 1] : h[0]).val;
}
const W = () => getPol('work'),
  ST = () => getPol('stat');
function polSave(k, val, eff, why) {
  const h = S.polHist[k],
    prev = JSON.stringify(getPol(k)),
    u = me();
  h.push({ eff: eff || iso(TODAY), val, by: u.name, at: new Date().toISOString(), why: why || '' });
  audit('Policy changed', k === 'work' ? 'Work policies' : 'Statutory settings', {
    res: 'settings',
    from: 'previous version',
    to: 'effective ' + fdate(eff || iso(TODAY)),
    reason: why || ''
  });
  return saveGov();
}
const slip = ctc => slipWith(ctc, ST());
function slipWith(ctc, t) {
  const m = ctc / 12,
    basic = m * 0.4,
    hra = basic * 0.5,
    special = m - basic - hra,
    pf = t.pf.on ? (Math.min(basic, t.pf.ceil) * t.pf.rate) / 100 : 0,
    esi = t.esi.on && m <= t.esi.ceil ? (m * t.esi.emp) / 100 : 0,
    pt = t.pt.on ? t.pt.amt : 0,
    tds = t.tds.on ? (Math.max(0, ctc - t.tds.thresh) * t.tds.rate) / 100 / 12 : 0,
    ded = pf + esi + pt + tds;
  return { m, basic, hra, special, pf, esi, pt, tds, ded, net: m - ded };
}

/* js/services/work-calendar.js */
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

/* js/services/saved-state.js */
/* ---------- saved state: everything the Settings screens change survives a refresh ---------- */
const GOVK = 'pd-gov-v1';
const govState = () => ({
  perms: S.perms,
  polHist: S.polHist,
  audit: S.audit,
  auditN: S.auditN,
  orgHist: S.orgHist,
  deleg: S.deleg,
  sec: S.sec,
  roles: S.roles,
  prefs: S.prefs,
  widgets: S.widgets,
  views: S.views,
  drafts: S.drafts,
  pay: S.pay,
  life: S.life,
  ext: S.ext,
  extUser: S.extUser,
  ot: S.ot,
  otp: S.otp
});
function saveGov() {
  if (S.noPersist) return true;
  try {
    localStorage.setItem(GOVK, JSON.stringify(govState()));
    return true;
  } catch (e) {
    return false;
  }
}
function loadGov() {
  try {
    const d = JSON.parse(localStorage.getItem(GOVK) || 'null');
    if (!d) return;
    if (d.perms && d.perms.m && d.perms.v === 3) {
      const def = defaultPerms();
      Object.keys(def.m).forEach(k => {
        if (d.perms.m[k])
          ROLE_KEYS.forEach(r => {
            if (d.perms.m[k][r]) Object.assign(def.m[k][r], d.perms.m[k][r]);
          });
      });
      Object.keys(def.sens).forEach(r => Object.assign(def.sens[r], (d.perms.sens || {})[r] || {}));
      def.meta = d.perms.meta || def.meta;
      S.perms = def;
    }
    if (d.polHist)
      Object.keys(S.polHist).forEach(k => {
        if (Array.isArray(d.polHist[k]) && d.polHist[k].length) S.polHist[k] = d.polHist[k];
      });
    ['audit', 'orgHist', 'deleg', 'views'].forEach(k => {
      if (Array.isArray(d[k])) S[k] = d[k];
    });
    if (typeof d.auditN === 'number') S.auditN = d.auditN;
    ['widgets', 'drafts', 'prefs', 'sec', 'pay', 'life', 'roles', 'extUser', 'ot', 'otp'].forEach(k => {
      if (d[k] && typeof d[k] === 'object') S[k] = Object.assign(S[k] || {}, d[k]);
    });
    S.life = Object.assign({ onb: {}, off: {}, exits: [] }, S.life);
    if (d.ext && d.ext.roles) {
      const def = extDefaults();
      Object.keys(def.roles).forEach(r => {
        const o = (d.ext.roles || {})[r] || {};
        Object.assign(def.roles[r], { avail: o.avail || def.roles[r].avail });
        Object.assign(def.roles[r].fields, o.fields);
        Object.assign(def.roles[r].reminders, o.reminders);
      });
      def.master = d.ext.master === 0 ? 0 : 1;
      def.meta = d.ext.meta || def.meta;
      S.ext = def;
    }
  } catch (e) {}
}
{
  const _p = persist;
  persist = function () {
    _p();
    saveGov();
  };
}
function seedGov() {
  employees.forEach(e => {
    if (e.mgr === undefined) e.mgr = ORG_SEED[e.id] || null;
  });
  S.leaves.forEach(l => {
    if (l.calc) return;
    const e = emp(l.emp);
    if (e) {
      l.days = leaveCalc(e, l.from, l.to, l.half).chargeable;
      l.calc = 1;
    }
  });
}

/* js/roles/navigation.js */
/* ---------- navigation is built from what the person may open ---------- */
const NAVG = [
  ['Overview', ['dashboard', 'approvals', 'profile']],
  ['People', ['employees', 'org', 'lifecycle', 'recruit', 'performance', 'training']],
  ['Time', ['attendance', 'hours', 'leave', 'roster']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Operations', ['safety', 'assets', 'reports']],
  ['Administration', ['settings', 'audit']]
];
const NAVM = [
  ['Overview', ['dashboard', 'approvals', 'profile']],
  ['My team', ['employees', 'performance', 'training', 'lifecycle']],
  ['Time', ['attendance', 'hours', 'leave', 'roster']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Operations', ['safety', 'assets', 'reports']]
];
const NAVE = [
  ['Overview', ['dashboard', 'profile']],
  ['Time and leave', ['attendance', 'hours', 'leave']],
  ['Pay and requests', ['payroll', 'requests']],
  ['Growth and safety', ['performance', 'training', 'safety']]
];
const NAVS = [
  ['Overview', ['dashboard', 'profile']],
  ['Administration', ['settings', 'audit']]
];
const PAGE_RES = {
  settings: ['users', 'roles', 'policy', 'statutory', 'security', 'integrations']
};
const okPage = p =>
  p === 'profile' || (PAGE_RES[p] ? PAGE_RES[p].some(r => can(r, 'view')) : can(p, 'view'));
function navFor() {
  const base =
      persona().role === 'sysadmin'
        ? NAVS
        : S.role === 'admin'
          ? NAVG
          : S.role === 'manager'
            ? NAVM
            : NAVE,
    seen = new Set(),
    g = base.map(([n, ids]) => [n, ids.filter(okPage)]);
  g.forEach(x => x[1].forEach(i => seen.add(i)));
  const extra = Object.keys(PG).filter(p => okPage(p) && !seen.has(p));
  if (extra.length) {
    (g.filter(x => x[1].length).pop() || g[0])[1].push(...extra);
  }
  return g.filter(x => x[1].length);
}
const flat = () => navFor().flatMap(g => g[1]);
function mobFor() {
  const pref =
      S.role === 'employee'
        ? ['dashboard', 'attendance', 'leave', 'payroll']
        : ['dashboard', 'employees', 'attendance', 'leave'],
    all = flat(),
    m = pref.filter(p => all.includes(p));
  for (const p of all) {
    if (m.length >= 4) break;
    if (!m.includes(p) && p !== 'profile') m.push(p);
  }
  return m.slice(0, 4);
}
function deniedPage() {
  const n = PG[S.page] ? PG[S.page][0] : 'This page';
  return `<div class="card denied" role="alert"><span class="dn-i">${ic('lock', 28)}</span><h1>Access denied</h1><p>Your account (<b>${esc(me().name)}</b>, ${esc(persona().n)}) does not have permission to open <b>${esc(n)}</b>.</p><p class="muted small">If you need it for your work, ask your System Admin to grant <b>View</b> access under Settings, then Roles and access.</p><div class="acts"><button class="btn primary" onclick="S.denied=false;go('dashboard')">${ic('home', 16)}Go to home</button></div></div>`;
}
function go(p) {
  closeModal();
  if (!PG[p]) p = 'dashboard';
  if (p === 'dashboard') S.hist = [];
  else if (p !== S.page || S.denied) pushHist();
  S.tab.pr = '';
  S.tab.pf = '';
  S.denied = !okPage(p);
  if (S.denied) audit('Access denied', PG[p][0], { res: p, to: 'View (opened by link)' });
  S.page = p;
  render();
  window.scrollTo(0, 0);
  $('#view').focus({ preventScroll: true });
  enterView();
}
function routeHash() {
  if (!S.authed) return;
  const m = (location.hash || '').match(/^#\/([a-z]+)/);
  if (m && PG[m[1]] && m[1] !== S.page) go(m[1]);
}
addEventListener('hashchange', routeHash);
function setRole(k) {
  const p = PERSONAS.find(x => x.k === k) || PERSONAS.find(x => x.role === k) || PERSONAS[2];
  S.persona = p.k;
  S.role = uiOf(p.role);
  S.denied = false;
  S.attEmp = '';
  S.attDate = '';
  S.hist = [];
  S.page = 'dashboard';
  S.tab = {};
  S.q = '';
  S.deptF = 'All';
  S.statF = 'All';
  closeModal();
  render();
  window.scrollTo(0, 0);
}
function switchRole(k) {
  if (k === S.persona) {
    closeModal();
    return;
  }
  setRole(k);
  toast('Now previewing as ' + persona().n + ' (' + me().name + ')');
}
function roleCards(cur, fn) {
  return `<div class="rolegrp rolelist" role="radiogroup" aria-label="Preview as">${PERSONAS.map(r => `<button type="button" class="rolec rl" role="radio" aria-checked="${cur === r.k}" tabindex="${cur === r.k ? 0 : -1}" title="${esc(emp(r.emp).name)} · ${esc(r.d)}" onclick="${fn}('${r.k}')" onkeydown="roleKey(event,'${fn}')"><span class="rl-i">${ic(r.i, 18)}</span><span class="rl-t"><b>${r.n}</b><span class="rl-p">${esc(emp(r.emp).name)}</span><span class="rl-d">${esc(r.d)}</span></span>${cur === r.k ? `<span class="rl-ck">${ic('check', 16)}</span>` : ''}</button>`).join('')}</div>`;
}
function roleKey(e, fn) {
  const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const b = [...e.currentTarget.parentNode.children],
    i = (b.indexOf(e.currentTarget) + d + b.length) % b.length;
  window[fn](PERSONAS[i].k);
  const n = document.querySelector('.rolegrp .rolec[aria-checked="true"]');
  if (n) n.focus();
}
function roleSheet() {
  overlay(
    'Preview as',
    `<p class="muted small" style="margin-bottom:12px">This is a demo preview. You are switching between sample people to see what each can open and do. Real accounts would sign in as themselves and could not switch.</p>${roleCards(S.persona, 'switchRole')}`,
    `<button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function simulatedInfo() {
  overlay(
    'What is simulated in this demo',
    `<p class="muted small" style="margin-bottom:12px">PeopleDesk is running as a single file in your browser with sample people. Nothing here reaches a real server, bank or identity provider.</p>
  <div class="list"><div class="li"><span class="ai t-amber">${ic('lock', 18)}</span><div class="grow"><b>Sign-in and one-time codes</b><div class="muted small">Passwords and the 6-digit code are fixed demo values. Real security needs a backend.</div></div>${chip('Simulated', 'warn')}</div>
  <div class="li"><span class="ai t-amber">${ic('wallet', 18)}</span><div class="grow"><b>Bank payments</b><div class="muted small">A bank file is generated, but no money moves. Bank responses are simulated.</div></div>${chip('Simulated', 'warn')}</div>
  <div class="li"><span class="ai t-amber">${ic('key', 18)}</span><div class="grow"><b>Permission enforcement</b><div class="muted small">Rules are applied in your browser to show how they behave. In production the server must enforce every rule.</div></div>${chip('Browser only', 'warn')}</div>
  <div class="li"><span class="ai t-green">${ic('check', 18)}</span><div class="grow"><b>Policies, calendars, approvals, audit log</b><div class="muted small">These work on the sample data and are saved in this browser.</div></div>${chip('Working', 'ok')}</div>
  <div class="li"><span class="ai t-brand">${ic('chart', 18)}</span><div class="grow"><b>Trends and benchmarks without a source</b><div class="muted small">Marked Sample wherever they appear.</div></div>${chip('Sample', 'mute')}</div></div>`,
    `<button class="btn primary" onclick="closeModal()">Got it</button>`
  );
}
const demoBar = () =>
  `<span class="db-t"><b>Demo build</b><span class="db-x"> · sample data only · sign-in and payments are simulated</span></span><span class="db-p">Previewing as <b>${esc(me().name)}</b> (${esc(persona().n)})</span><button class="link" onclick="simulatedInfo()">What is simulated?</button>`;

/* js/services/ext-core.js */
/* =====================================================================
   Browser extension widget: shared logic and popup markup.
   Pure functions, no DOM access, no framework. One source of truth for:
   the HRMS (admin preview, settings), the extension (service worker and popup) and the design gallery.
   Edit it here; scripts/build-extension.js copies it into extension/shared/.
   ===================================================================== */
(function (g) {
  'use strict';
  const FIELDS = [
    ['clockIn', 'Clock-in time', 'When your day started'],
    ['expectedOut', 'Expected logout', 'Clock-in time plus your shift length'],
    ['remaining', 'Time remaining', 'A countdown that updates every minute'],
    ['breakStatus', 'Break status', 'Whether a break is in progress'],
    ['overtime', 'Overtime so far', 'Extra time after your shift ends']
  ];
  const REMINDERS = [
    ['m30', '30 minutes before logout'],
    ['m15', '15 minutes before logout'],
    ['end', 'At shift end']
  ];
  const AVAIL = [
    ['off', 'Disabled', 'Employees in this role do not see the extension option at all.'],
    ['optin', 'Allowed (user opt-in)', 'Employees can turn it on from their preferences.'],
    [
      'default',
      'Enabled by default',
      'It starts on for everyone in this role. They can turn it off.'
    ]
  ];
  const SOURCES = { app: 'App', bio: 'Biometric', web: 'Web' };
  const LOW_MIN = 30; // amber when fewer minutes than this are left
  const OT_GRACE = 15; // minutes after expected logout before it counts as extra time
  const TONE = {
    ok: { bg: '#1f7a4d', fg: '#ffffff' },
    warn: { bg: '#f5b942', fg: '#1d2535' },
    info: { bg: '#2f5fc4', fg: '#ffffff' },
    over: { bg: '#6d4fc2', fg: '#ffffff' },
    mute: { bg: '#5b6475', fg: '#ffffff' }
  };

  const pad = n => String(n).padStart(2, '0');
  const esc = s =>
    String(s == null ? '' : s).replace(
      /[&<>"']/g,
      c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
    );
  const fmtTime = d => {
    const h = d.getHours();
    return `${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`;
  };
  const fmtDate = d =>
    d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  const fmtDur = m => {
    m = Math.max(0, Math.round(m));
    return m >= 60 ? `${Math.floor(m / 60)}h ${pad(m % 60)}m` : `${m}m`;
  };
  const fmtDurLong = m => {
    m = Math.max(0, Math.round(m));
    const h = Math.floor(m / 60),
      r = m % 60;
    return [
      h ? `${h} hour${h > 1 ? 's' : ''}` : '',
      r || !h ? `${r} minute${r === 1 ? '' : 's'}` : ''
    ]
      .filter(Boolean)
      .join(' ');
  };
  const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dt = v => (v ? new Date(v) : null);

  /* ---------- icons (stroke icons, 24px grid) ---------- */
  const PATHS = {
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
    check: 'M20 6L9 17l-5-5',
    alert:
      'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z M12 9v4 M12 17h.01',
    lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
    pause: 'M9 5v14 M15 5v14',
    wifioff:
      'M1 1l22 22 M16.7 11.1a11 11 0 0 1 2.9 1.9 M5 12.9a11 11 0 0 1 5.2-2.8 M8.5 16.4a6 6 0 0 1 7 0 M12 20h.01',
    eyeoff:
      'M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9 M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2 M1 1l22 22',
    inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
    plug: 'M9 2v6 M15 2v6 M6 8h12v4a6 6 0 0 1-12 0z M12 18v4',
    coffee:
      'M17 8h1a4 4 0 0 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M6 1v3 M10 1v3 M14 1v3',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
    flag: 'M4 22V4 M4 4h13l-2 4 2 4H4',
    trend: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    refresh:
      'M23 4v6h-6 M1 20v-6h6 M3.5 9a9 9 0 0 1 14.9-3.4L23 10 M1 14l4.6 4.4A9 9 0 0 0 20.5 15',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
  };
  const ico = (n, s = 16) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${PATHS[n] || ''}"/></svg>`;

  /* ---------- the model: one snapshot in, everything the badge, popup and tooltip need ---------- */
  /*  snapshot: { v, name, hrms, updatedAt, enabled, reason('admin'|'user'), fields{}, reminders{}, badge,
                  clockIn, clockOut, expectedOut, source, onBreak, pausedUntil, hiddenDate, offline, error } */
  const STATE = {
    loading: ['Loading', 'mute', 'clock'],
    empty: ['Not connected', 'mute', 'plug'],
    error: ['Can’t refresh', 'warn', 'alert'],
    disabled: ['Not enabled', 'mute', 'lock'],
    paused: ['Paused', 'mute', 'pause'],
    hidden: ['Hidden today', 'mute', 'eyeoff'],
    notin: ['Not clocked in', 'mute', 'clock'],
    working: ['Working', 'ok', 'check'],
    low: ['Under 30 min left', 'warn', 'clock'],
    complete: ['Shift complete', 'info', 'flag'],
    overtime: ['Extra time', 'over', 'trend'],
    offline: ['Offline', 'mute', 'wifioff']
  };
  function model(s, now) {
    now = now || new Date();
    const M = { snap: s, now };
    const done = (key, extra) => {
      const st = STATE[key];
      const tone = st[1];
      return Object.assign(M, { key, label: st[0], tone, glyph: st[2] }, extra, {
        badge: Object.assign({ text: '' }, TONE[tone], (extra && extra.badge) || {})
      });
    };
    if (s === undefined) return done('loading', { tip: 'PeopleDesk: loading…' });
    if (s === null) return done('empty', { tip: 'PeopleDesk: sign in to connect' });
    M.vis = Object.assign(
      { clockIn: 1, expectedOut: 1, remaining: 1, breakStatus: 1, overtime: 1 },
      s.fields
    );
    if (s.error) return done('error', { tip: 'PeopleDesk: couldn’t refresh' });
    if (!s.enabled)
      return done('disabled', {
        tip: 'PeopleDesk: ' + (s.reason === 'user' ? 'turned off' : 'not enabled for your account')
      });
    const pu = dt(s.pausedUntil);
    if (pu && now < pu) return done('paused', { tip: 'PeopleDesk: paused until tomorrow' });
    if (s.hiddenDate === dayKey(now))
      return done('hidden', { tip: 'PeopleDesk: hidden for today' });

    const inAt = dt(s.clockIn),
      outAt = dt(s.clockOut),
      expAt = dt(s.expectedOut);
    Object.assign(M, {
      inAt,
      outAt,
      expAt,
      src: SOURCES[s.source] || '',
      onBreak: !!s.onBreak,
      otMin:
        dt(s.otFrom) && inAt ? Math.max(0, Math.floor(((outAt || now) - dt(s.otFrom)) / 60000)) : 0,
      updatedAt: dt(s.updatedAt)
    });
    let key, extra;
    if (!inAt || dayKey(inAt) !== dayKey(now)) {
      key = 'notin';
      extra = { tip: 'PeopleDesk: not clocked in yet' };
    } else {
      const total = Math.max(1, (expAt - inAt) / 60000),
        left = Math.ceil((expAt - now) / 60000),
        worked = ((outAt || now) - inAt) / 60000,
        pct = Math.max(0, Math.min(100, Math.round((worked / total) * 100)));
      Object.assign(M, { left, pct, worked, total });
      const range = `In ${fmtTime(inAt)}, Out ${fmtTime(expAt)}`;
      if (outAt || (left <= 0 && left > -OT_GRACE)) {
        key = 'complete';
        extra = {
          badge: { text: 'Done' },
          tip: outAt ? `Shift complete. Out ${fmtTime(outAt)}` : `Shift complete. ${range}`
        };
      } else if (left <= -OT_GRACE) {
        const ot = -left;
        key = 'overtime';
        M.over = ot;
        extra = {
          badge: { text: '+' + (ot < 60 ? ot + 'm' : Math.floor(ot / 60) + 'h') },
          tip: `${range}. ${fmtDur(ot)} past your expected logout`
        };
      } else {
        key = left < LOW_MIN ? 'low' : 'working';
        extra = {
          badge: { text: left >= 60 ? Math.floor(left / 60) + 'h' : left + 'm' },
          tip: range
        };
      }
    }
    if (s.offline) {
      M.base = key;
      return done('offline', {
        badge: { text: '?' },
        tip: `PeopleDesk: offline. Last updated ${M.updatedAt ? fmtTime(M.updatedAt) : 'earlier'}`
      });
    }
    return done(key, extra);
  }

  /* ---------- popup markup (360 wide, as tall as its content, never more than 480) ---------- */
  const tag = (t, cls) => `<span class="xw-tag${cls ? ' ' + cls : ''}">${t}</span>`;
  const btn = (act, label, cls, extra = '') =>
    `<button type="button" class="xw-btn ${cls || ''}" data-act="${act}" ${extra}>${esc(label)}</button>`;
  const parts = d => {
    const h = d.getHours();
    return `${pad(h % 12 || 12)}:${pad(d.getMinutes())}<small>${h < 12 ? 'AM' : 'PM'}</small>`;
  };
  function stateBody(m) {
    const k = m.key === 'offline' ? m.base : m.key;
    const say = (icon, title, text) =>
      `<div class="xw-empty"><span class="xw-ei tone-${m.tone}">${ico(icon, 26)}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
    if (m.key === 'loading')
      return `<div class="xw-skel" role="status" aria-label="Loading your attendance"><i></i><i></i><i></i><i></i></div>`;
    if (m.key === 'empty')
      return say(
        'plug',
        'Connect your account',
        'Open PeopleDesk and sign in once. Your clock-in and logout time will appear here.'
      );
    if (m.key === 'error')
      return say(
        'alert',
        'We couldn’t refresh just now',
        'This is on our side. Your attendance is safe and nothing has changed.'
      );
    if (m.key === 'disabled')
      return say(
        'lock',
        m.snap.reason === 'user'
          ? 'Turned off in your preferences'
          : 'Not enabled for your account',
        m.snap.reason === 'user'
          ? 'You can turn it back on in PeopleDesk under Profile, Preferences.'
          : 'Your organisation hasn’t turned this on for your role. Everything is still in PeopleDesk.'
      );
    if (m.key === 'paused')
      return say(
        'pause',
        'Paused until tomorrow',
        'No reminders or badge until tomorrow morning. Your attendance is not affected.'
      );
    if (m.key === 'hidden')
      return say(
        'eyeoff',
        'Hidden for today',
        'Your attendance is not affected. It comes back tomorrow.'
      );
    if (k === 'notin')
      return say(
        'clock',
        'You haven’t clocked in yet',
        'Your times appear here once you clock in from the app, a biometric device or the web.'
      );

    /* a status row, one big time, a progress bar and two tiles. Readable in about two seconds. */
    const v = m.vis,
      stale = m.key === 'offline' ? ' is-stale' : '';
    const left =
      k === 'complete' ? 'Done' : k === 'overtime' ? '+' + fmtDur(m.over) : fmtDur(m.left);
    let hero,
      tIn = v.clockIn ? ['Clocked in', fmtTime(m.inAt), 'info'] : null,
      tLeft = v.remaining ? [k === 'overtime' ? 'Past logout' : 'Time left', left, m.tone] : null;
    if (v.expectedOut)
      hero =
        k === 'complete' && m.outAt
          ? ['Clocked out', parts(m.outAt)]
          : ['Expected logout', parts(m.expAt)];
    else if (v.remaining) ((hero = ['Time left', esc(left)]), (tLeft = null));
    else ((hero = ['Clocked in', parts(m.inAt)]), (tIn = null));
    const tiles = [tIn, tLeft].filter(Boolean);
    const hm = x => Math.floor(x / 60) + 'h ' + pad(x % 60) + 'm';
    const otl =
      v.overtime && m.otMin > 0
        ? `<div class="xw-ot${stale}">${ico('trend', 14)}<span>${m.outAt ? 'Overtime today' : 'Overtime so far'}: <b>${hm(m.otMin)}</b></span></div>`
        : '';
    const brk = v.breakStatus
      ? m.onBreak
        ? tag(ico('coffee', 12) + 'On a break', 'is-on')
        : tag('No break')
      : '';
    const meta = `<div class="xw-meta"><span class="xw-st tone-${m.tone}">${ico(m.glyph, 13)}${esc(m.label)}</span>${m.src ? tag('via ' + esc(m.src)) : ''}${brk}</div>`;
    let prog = '';
    if (v.remaining || v.expectedOut) {
      const aria =
        k === 'complete'
          ? 'Shift complete'
          : k === 'overtime'
            ? 'Past your expected logout'
            : `${fmtDurLong(m.left)} left`;
      prog = `<div class="xw-pg${stale}"><div class="xw-bar tone-${m.tone}" role="progressbar" aria-label="Time worked today" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${m.pct}" aria-valuetext="${esc(m.pct + ' percent of the day. ' + aria)}"><i style="width:${m.pct}%"></i></div><div class="xw-pgl"><span>${fmtDur(m.worked)} worked</span><span>${fmtDur(m.total)} shift</span></div></div>`;
    }
    return `${meta}<div class="xw-hero${stale}"><span class="xw-lbl">${esc(hero[0])}</span><div class="xw-big">${hero[1]}</div></div>${prog}${tiles.length ? `<div class="xw-tiles${stale}">${tiles.map(t => `<div class="xw-tile tone-${t[2]}"><span>${esc(t[0])}</span><b>${esc(t[1])}</b></div>`).join('')}</div>` : ''}${otl}`;
  }
  function popupHTML(m, o) {
    o = o || {};
    const k = m.key === 'offline' ? m.base : m.key;
    const attendance = ['working', 'low', 'complete', 'overtime'].includes(k);
    const upd = m.updatedAt ? fmtTime(m.updatedAt) : '';
    let banner = '';
    if (m.key === 'offline')
      banner = `<div class="xw-ban tone-mute" role="status">${ico('wifioff', 16)}<span><b>You’re offline.</b> Last updated ${esc(upd || 'earlier')}</span></div>`;
    let foot;
    if (m.key === 'loading') foot = '';
    else if (m.key === 'error')
      foot = btn('retry', 'Try again', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'paused')
      foot = btn('prefs', 'Open preferences', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'hidden')
      foot = btn('unhide', 'Show again', 'primary') + btn('open', 'Open HRMS', 'ghost');
    else if (m.key === 'disabled' && m.snap.reason === 'user')
      foot = btn('prefs', 'Open preferences', 'primary');
    else if (attendance)
      foot =
        btn('open', 'Open HRMS', 'primary') +
        `<span class="xw-tipwrap">${btn('hide', 'Hide for today', 'ghost', 'aria-describedby="xw-tip-hide"')}<span class="xw-tip" id="xw-tip-hide" role="tooltip">Your attendance is not affected</span></span>`;
    else foot = btn('open', 'Open HRMS', 'primary');
    const note =
      m.key === 'loading'
        ? ''
        : `<p class="xw-note">${attendance && upd ? 'Updated ' + esc(upd) + ' · ' : ''}Shows attendance only, nothing else</p>`;
    const head = `<header class="xw-h"><div><h1 id="xw-t">Today’s attendance</h1><p>${esc(fmtDate(m.now))}</p></div><div class="xw-ha"><button type="button" class="xw-ib" data-act="retry" aria-label="Refresh" title="Refresh">${ico('refresh', 16)}</button><button type="button" class="xw-ib" data-act="prefs" aria-label="Extension settings" title="Extension settings">${ico('gear', 16)}</button></div></header>`;
    return `<section class="xw" data-state="${m.key}" aria-labelledby="xw-t">${head}${banner}<main class="xw-b">${stateBody(m)}</main>${foot ? `<footer class="xw-f"><div class="xw-fb">${foot}</div>${note}</footer>` : ''}</section>`;
  }

  /* ---------- the toolbar icon with its badge (a picture of what the browser shows) ---------- */
  function toolbarHTML(m) {
    const b = m.snap && m.snap.badge === 0 ? Object.assign({}, m.badge, { text: '' }) : m.badge,
      shape = !b.text ? `<span class="xw-tg">${ico(m.glyph, 9)}</span>` : '';
    return `<span class="xw-tb" role="img" aria-label="Toolbar icon. ${esc(m.tip)}" title="${esc(m.tip)}"><span class="xw-ti">${ico('clock', 18)}</span>${b.text ? `<span class="xw-bdg" style="background:${b.bg};color:${b.fg}">${esc(b.text)}</span>` : shape}</span>`;
  }

  /* ---------- notifications ---------- */
  function notifText(kind, s) {
    const out = s && s.expectedOut ? fmtTime(new Date(s.expectedOut)) : '',
      inn = s && s.clockIn ? fmtTime(new Date(s.clockIn)) : '';
    const vis = Object.assign({ clockIn: 1, expectedOut: 1 }, s && s.fields);
    if (kind === 'in')
      return {
        title: 'You’re clocked in. Have a good day!',
        message:
          [vis.clockIn && inn && `In ${inn}`, vis.expectedOut && out && `Expected logout ${out}`]
            .filter(Boolean)
            .join(' · ') || 'Your day has started.'
      };
    if (kind === 'm30')
      return {
        title: '30 minutes left today',
        message:
          (vis.expectedOut && out ? `Expected logout ${out}. ` : '') +
          'Time to start wrapping up when you’re ready.'
      };
    if (kind === 'm15')
      return {
        title: '15 minutes left today',
        message:
          (vis.expectedOut && out ? `Expected logout ${out}. ` : '') + 'Just a friendly heads-up.'
      };
    return {
      title: 'Shift complete. Thanks for today!',
      message: `You’ve reached your expected logout${vis.expectedOut && out ? ' (' + out + ')' : ''}. Remember to clock out if you haven’t.`
    };
  }
  /* which notifications are due now; `fired` is the list of ids already shown, so each shows once per day */
  function notifsDue(s, now, fired) {
    if (!s || !s.enabled || s.offline || s.error || !s.clockIn) return [];
    const pu = dt(s.pausedUntil);
    if (pu && now < pu) return [];
    if (s.hiddenDate === dayKey(now)) return [];
    const inAt = new Date(s.clockIn);
    if (dayKey(inAt) !== dayKey(now) || s.clockOut) return [];
    const left = Math.ceil((new Date(s.expectedOut) - now) / 60000),
      r = s.reminders || {},
      day = dayKey(now),
      list = [];
    const add = (kind, ok) => {
      const id = `${day}:${kind}`;
      if (ok && !(fired || []).includes(id))
        list.push(Object.assign({ id, kind }, notifText(kind, s)));
    };
    add('in', r.in !== 0 && now - inAt < 10 * 60000);
    add('m30', !!r.m30 && left <= 30 && left > 15);
    add('m15', !!r.m15 && left <= 15 && left > 0);
    add('end', !!r.end && left <= 0 && left > -OT_GRACE);
    return list;
  }

  /* ---------- demo snapshots for previews and the gallery: a fixed day so screenshots are stable ---------- */
  function demo(key, base) {
    const d = base ? new Date(base) : new Date(),
      at = (h, m) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
    const snap = {
      v: 1,
      name: 'Rohan Verma',
      enabled: true,
      fields: { clockIn: 1, expectedOut: 1, remaining: 1, breakStatus: 1, overtime: 1 },
      reminders: { in: 1, m30: 1, m15: 1, end: 1 },
      clockIn: at(9, 12).toISOString(),
      expectedOut: at(18, 12).toISOString(),
      otFrom: at(18, 0).toISOString(),
      source: 'bio',
      onBreak: false,
      updatedAt: at(13, 0).toISOString()
    };
    const T = {
      working: [13, 0],
      low: [17, 50],
      complete: [18, 20],
      overtime: [18, 55],
      notin: [8, 40],
      offline: [14, 5]
    };
    let now = at(...(T[key] || [13, 0]));
    if (key === 'notin') Object.assign(snap, { clockIn: null, expectedOut: null, source: '' });
    if (key === 'complete') Object.assign(snap, { clockOut: at(18, 20).toISOString() });
    if (key === 'offline')
      Object.assign(snap, { offline: true, updatedAt: at(10, 30).toISOString() });
    if (key === 'disabled') Object.assign(snap, { enabled: false, reason: 'admin' });
    if (key === 'user-off') Object.assign(snap, { enabled: false, reason: 'user' });
    if (key === 'error') Object.assign(snap, { error: 1 });
    if (key === 'paused') Object.assign(snap, { pausedUntil: at(23, 59).toISOString() });
    if (key === 'hidden') Object.assign(snap, { hiddenDate: dayKey(d) });
    if (key === 'break') Object.assign(snap, { onBreak: true });
    if (key === 'empty') return { snap: null, now };
    if (key === 'loading') return { snap: undefined, now };
    if (!snap.updatedAt || key !== 'offline') snap.updatedAt = now.toISOString();
    return { snap, now };
  }

  g.PDExt = {
    FIELDS,
    REMINDERS,
    AVAIL,
    SOURCES,
    TONE,
    LOW_MIN,
    esc,
    ico,
    fmtTime,
    fmtDate,
    fmtDur,
    fmtDurLong,
    dayKey,
    model,
    popupHTML,
    toolbarHTML,
    notifText,
    notifsDue,
    demo
  };
})(typeof self !== 'undefined' ? self : this);

/* js/services/ext-widget.js */
/* =====================================================================
   Browser extension widget: policy, personal choice, snapshot and the bridge to the extension
   Effective setting = the role policy allows it AND the person has opted in.
   The extension shows attendance only (clock-in, expected logout, time left). It reads nothing else.
   Needs ext-core.js (PDExt) and runs after saved-state.js. Screens: settings/ext-admin.js,
   profile/ext-prefs.js, ext/ext-setup.js.
   ===================================================================== */
const EXT_STORE = {
  chrome: 'https://chromewebstore.google.com/search/PeopleDesk%20Attendance',
  edge: 'https://microsoftedge.microsoft.com/addons/search/PeopleDesk%20Attendance'
};
const EXT_ASKS = 3; // how many times "Maybe later" brings the prompt back
const extAllOn = keys => Object.fromEntries(keys.map(k => [k, 1]));
const extRolePol = avail => ({
  avail,
  fields: extAllOn(PDExt.FIELDS.map(f => f[0])),
  reminders: extAllOn(PDExt.REMINDERS.map(r => r[0]))
});
function extDefaults() {
  return {
    master: 1,
    roles: {
      employee: extRolePol('optin'),
      manager: extRolePol('optin'),
      hr: extRolePol('optin'),
      admin: extRolePol('optin'),
      sysadmin: extRolePol('off')
    },
    meta: { by: 'System defaults', at: '' }
  };
}
S.ext = extDefaults();
S.extUser = {};
S.extLink = { installed: false, connected: false, version: '', seenAt: 0 };

/* ---------- policy and personal choice ---------- */
const extPol = role => {
  const r = S.ext.roles[role] || (S.ext.roles[role] = extRolePol('off'));
  return r;
};
function extUser(id) {
  id = id || me().id;
  const u =
    S.extUser[id] ||
    (S.extUser[id] = {
      optIn: null, // null = never chosen, so the role default applies
      fields: {},
      reminders: { in: 1 },
      badge: 1,
      sim: 0, // demo only: pretend the extension is connected when no real one answers
      prompt: '', // '' | 'later' | 'never' | 'done'
      asks: 0,
      askAfter: '',
      pausedUntil: ''
    });
  return u;
}
const extAllowed = role => !!S.ext.master && extPol(role || persona().role).avail !== 'off';
function extOn(id, role) {
  role = role || persona().role;
  if (!extAllowed(role)) return false;
  const u = extUser(id),
    a = extPol(role).avail;
  return a === 'default' ? u.optIn !== false : u.optIn === true;
}
/* what this person may see (role policy) and what they chose to show (personal) */
const extFieldOk = (k, role) => !!extPol(role || persona().role).fields[k];
const extFieldOn = (k, id, role) => extFieldOk(k, role) && extUser(id).fields[k] !== 0;
const extRemOk = (k, role) => !!extPol(role || persona().role).reminders[k];
const extRemOn = (k, id, role) =>
  k === 'in' ? extUser(id).reminders.in !== 0 : extRemOk(k, role) && extUser(id).reminders[k] !== 0;
function extStatus() {
  if (!extAllowed()) return ['admin', 'Disabled by admin', 'mute'];
  if (S.extLink.connected || extUser().sim) return ['connected', 'Connected', 'ok'];
  if (S.extLink.installed) return ['installed', 'Installed, not signed in', 'warn'];
  return ['none', 'Not installed', 'mute'];
}

/* ---------- the day as the extension needs it ---------- */
function extSource(mode) {
  /* the sample clock has a work mode, not a device: plant gate = biometric, field work = app, the rest = web */
  return mode === 'Plant gate (biometric)' ? 'bio' : mode === 'On-site visit' ? 'app' : 'web';
}
function extShiftMin(e) {
  const sh = SHT[baseShift(e)],
    s = sh.s[0] * 60 + sh.s[1];
  let n = sh.e[0] * 60 + sh.e[1] - s;
  if (n <= 0) n += 1440;
  return n;
}
function extSnapshot() {
  const u = me(),
    role = persona().role,
    c = S.clock,
    on = extOn(u.id, role),
    x = extUser(u.id);
  const snap = {
    v: 1,
    name: u.name,
    hrms: location.href.split('#')[0],
    updatedAt: new Date().toISOString(),
    enabled: on,
    reason: !extAllowed(role) ? 'admin' : on ? '' : 'user',
    fields: Object.fromEntries(PDExt.FIELDS.map(f => [f[0], extFieldOn(f[0], u.id, role) ? 1 : 0])),
    reminders: Object.fromEntries(
      [['in'], ...PDExt.REMINDERS].map(r => [r[0], extRemOn(r[0], u.id, role) ? 1 : 0])
    ),
    badge: x.badge ? 1 : 0,
    pausedUntil: x.pausedUntil || ''
  };
  if (on && c.in) {
    snap.clockIn = c.in.toISOString();
    snap.clockOut = c.out ? c.out.toISOString() : '';
    snap.expectedOut = new Date(+c.in + extShiftMin(u) * 60000).toISOString();
    snap.source = extSource(c.mode);
    snap.onBreak = !!c.onBreak;
    snap.otFrom = new Date(
      TODAY.getFullYear(),
      TODAY.getMonth(),
      TODAY.getDate(),
      0,
      dayInfo(u.id, ...TD()).end
    ).toISOString();
  }
  return snap;
}

/* ---------- the bridge: this page talks to the extension through postMessage, nothing else ---------- */
const EXT_SRC = 'peopledesk-hrms',
  EXT_BACK = 'peopledesk-ext';
function extPost(type, payload) {
  try {
    window.postMessage(
      { source: EXT_SRC, type, payload },
      location.origin === 'null' ? '*' : location.origin
    );
  } catch (e) {}
}
function extPublish() {
  if (!S.authed) return;
  extPost('snapshot', extSnapshot());
}
function extPing() {
  extPost('ping');
}
let extConnectCb = null;
addEventListener('message', ev => {
  const d = ev.data;
  if (ev.source !== window || !d || d.source !== EXT_BACK) return;
  const l = S.extLink,
    was = l.installed + '|' + l.connected;
  if (d.type === 'hello' || d.type === 'status') {
    l.installed = true;
    l.connected = !!d.connected;
    l.version = String(d.version || '');
    l.seenAt = Date.now();
    if (l.connected) extPublish();
  }
  if (d.type === 'connected') {
    l.installed = l.connected = true;
    if (extConnectCb) extConnectCb(true);
    extPublish();
  }
  if (d.type === 'signedout') l.connected = false;
  if (was !== l.installed + '|' + l.connected && typeof extRepaint === 'function') extRepaint();
});
setInterval(extPublish, 30000);

/* ---------- today's clock survives a refresh (a real punch lives on the server, not in a tab) ---------- */
const EXT_CLK = 'pd-clock-v1';
function extSaveClock() {
  try {
    const c = S.clock;
    localStorage.setItem(
      EXT_CLK,
      JSON.stringify({
        day: iso(new Date()),
        in: c.in ? c.in.toISOString() : '',
        out: c.out ? c.out.toISOString() : '',
        mode: c.mode
      })
    );
  } catch (e) {}
}
function extRestoreClock() {
  try {
    const d = JSON.parse(localStorage.getItem(EXT_CLK) || 'null');
    if (!d || d.day !== iso(new Date()) || !d.in) return;
    S.clock = { in: new Date(d.in), out: d.out ? new Date(d.out) : null, mode: d.mode || 'Office' };
  } catch (e) {}
}
extRestoreClock();
{
  const _t = toggleClock;
  toggleClock = function () {
    _t.apply(this, arguments);
    extSaveClock();
    extPublish();
  };
  const _f = finishLogin;
  finishLogin = function () {
    _f.apply(this, arguments);
    extRestoreClock();
    extPing();
    extPublish();
    setTimeout(extMaybePrompt, 900);
  };
  const _s = setRole;
  setRole = function () {
    _s.apply(this, arguments);
    extPublish();
  };
}

/* ---------- personal choices (Profile, Preferences) ---------- */
function extSave(msg) {
  persist();
  extPublish();
  if (typeof extRefreshPreview === 'function') extRefreshPreview();
  if (msg) toast(msg);
}
function extSetMaster(on) {
  const u = extUser();
  u.optIn = !!on;
  extSave(on ? 'Browser widget on' : 'Browser widget off');
  render();
}
function extSetField(k, on) {
  extUser().fields[k] = on ? 1 : 0;
  extSave();
}
function extSetRem(k, on) {
  extUser().reminders[k] = on ? 1 : 0;
  extSave();
}
function extSetBadge(on) {
  extUser().badge = on ? 1 : 0;
  extSave();
}
function extPause() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  extUser().pausedUntil = d.toISOString();
  extSave('Paused until tomorrow. Your attendance is not affected.');
  render();
}
function extResume() {
  extUser().pausedUntil = '';
  extSave('Widget resumed');
  render();
}
function extSignOutExt() {
  confirmBox(
    'Sign out of the extension?',
    'The extension stops showing your attendance on this browser until you connect it again. Your attendance in PeopleDesk is not affected.',
    'Sign out of extension',
    () => {
      extPost('signout');
      S.extLink.connected = false;
      extUser().sim = 0;
      persist();
      render();
      toast('Signed out of the extension');
    }
  );
}

/* js/services/hours.js */
/* =====================================================================
   Working hours, overtime and comp-off: policy, daily hours, entries, requests
   One model for the dashboard, the ledger, the use-my-time flow and the manager queue.
   Hours come from the same punches as Attendance (dayInfo): app, biometric or web.
   Screens: features/hours/hours-page.js, hours-flow.js and settings/ot-policy.js.
   ===================================================================== */
const OT_CAT = { weekday: 'Weekday overtime', holiday: 'Holiday work', off: 'Weekly-off work' };
const OT_CAT_S = { weekday: 'Weekday', holiday: 'Holiday', off: 'Weekly off' };
/* ledger status: [label, chip tone]. Every status is a word, never a colour alone. */
const OT_ST = {
  auto: ['Auto-calculated', 'mute'],
  pending: ['Pending', 'warn'],
  rejected: ['Rejected', 'bad'],
  available: ['Available', 'ok'],
  inreq: ['In request', 'info'],
  comp: ['Used as comp-off', 'info'],
  paid: ['Paid', 'info'],
  expired: ['Expired', 'mute']
};
const OT_PREFIX = { OT: 'Overtime approval', CO: 'Comp-off', PY: 'Extra pay' };
const otpDefaults = () => ({
  breakMin: 45, // unpaid break taken out of every day
  minMin: 30, // overtime under this many minutes is not recorded
  round: 15, // recorded in steps of this many minutes (rounded down)
  dailyCap: 4, // hours a day that count as weekday overtime
  weeklyCap: 12,
  rate: { weekday: 1.5, holiday: 2, off: 2 },
  approve: { weekday: 1, holiday: 1, off: 1 },
  comp: { half: 4, full: 8, expiry: 90 },
  mode: 'choose', // choose | comp | pay
  cutoff: 25, // entries after this day of the month move to next month's payroll
  payDays: 26, // hourly pay = basic / payDays / payHours
  payHours: 8,
  over: [], // per role or department: { type, key, mode, weekday, holiday, off }
  meta: { by: 'System defaults', at: '' }
});
S.otp = otpDefaults();
S.ot = { entries: {}, reqs: [], n: { OT: 0, CO: 0, PY: 0 }, seeded: 0 };

/* ---------- formats ---------- */
const fhm = m => {
  m = Math.round(m || 0);
  const s = m < 0 ? '−' : '',
    a = Math.abs(m);
  return s + Math.floor(a / 60) + 'h ' + pad(a % 60) + 'm';
};
const fsg = m => (m > 0 ? '+' : '') + fhm(m);
const fdy = n => (n === 0.5 ? 'Half day' : n === 1 ? '1 day' : n + ' days');
const addD = (dt, n) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);
const wkStart = dt => addD(dt, -((dt.getDay() + 6) % 7));
const fdd = dt =>
  DOWN[dt.getDay()].slice(0, 3) + ' ' + dt.getDate() + ' ' + MON[dt.getMonth()].slice(0, 3);
const fddy = dt => fdd(dt) + ' ' + dt.getFullYear();
const monLbl = dt => MON[dt.getMonth()] + ' ' + dt.getFullYear();
const isoD = s => new Date(s + 'T00:00:00');

/* ---------- policy, with per-role and per-department overrides ---------- */
function otPolFor(e) {
  const b = S.otp,
    o = (b.over || []).find(
      x => (x.type === 'dept' && x.key === e.dept) || (x.type === 'role' && x.key === roleOf(e.id))
    );
  if (!o) return b;
  const n = x => (x === '' || x == null || isNaN(+x) ? null : +x);
  return Object.assign({}, b, {
    mode: o.mode || b.mode,
    rate: {
      weekday: n(o.weekday) ?? b.rate.weekday,
      holiday: n(o.holiday) ?? b.rate.holiday,
      off: n(o.off) ?? b.rate.off
    },
    scopeNote:
      (o.type === 'dept' ? 'Department: ' : 'Role: ') +
      (o.type === 'dept' ? o.key : roleName(o.key))
  });
}
/* work on a holiday or weekly off: sample punches, so the sections have something to show */
function offWorkOf(o) {
  if (o.dt > TODAY || o.dt.getTime() === TODAY.getTime()) return null;
  if (o.e.join && o.dt < isoD(o.e.join)) return null;
  const h = hsh(o.empId, o.y, o.m, o.d);
  if (o.st === 'H' ? h % 3 !== 0 : h % 5 !== 0) return null;
  const inn = o.start + (h % 40);
  return { in: inn, out: inn + 240 + ((h >> 3) % 270) };
}
const otRound = (raw, P, cap) => {
  if (raw < P.minMin) return 0;
  let v = Math.floor(raw / P.round) * P.round;
  if (cap) v = Math.min(v, cap);
  return v;
};
function srcOf(o) {
  if (o.dt.getTime() === TODAY.getTime() && o.empId === me().id && S.clock.in)
    return { bio: 'Biometric', app: 'App', web: 'Web' }[extSource(S.clock.mode)];
  return /biometric/.test(o.mode)
    ? 'Biometric'
    : o.mode === 'Work from home'
      ? 'Web'
      : hsh(o.empId, o.y, o.m, o.d) % 3 === 0
        ? 'Web'
        : 'App';
}

/* ---------- one day ---------- */
function hrsDay(empId, dt) {
  const o = dayInfo(empId, dt.getFullYear(), dt.getMonth(), dt.getDate()),
    P = otPolFor(o.e);
  const r = {
    o,
    empId,
    dt,
    iso: o.iso,
    tag: '',
    label: '',
    in: null,
    out: null,
    gross: 0,
    brk: 0,
    worked: 0,
    exp: o.end - o.start - P.breakMin,
    otRaw: 0,
    ot: 0,
    cat: '',
    src: '',
    live: false,
    miss: false,
    off: false
  };
  if (o.st === 'N') return Object.assign(r, { tag: 'none', label: 'Not joined', exp: 0 });
  if (o.st === 'H' || o.st === 'W') {
    Object.assign(r, {
      off: true,
      exp: 0,
      tag: o.st === 'H' ? 'holiday' : 'weekoff',
      label: o.hol || DOWN[dt.getDay()] + ' (weekly off)'
    });
    const w = o.offWork;
    if (w) {
      Object.assign(r, {
        in: w.in,
        out: w.out,
        gross: w.out - w.in,
        worked: w.out - w.in,
        src: srcOf(o),
        cat: o.st === 'H' ? 'holiday' : 'off',
        tag: o.st === 'H' ? 'holwork' : 'offwork'
      });
      r.otRaw = r.worked;
      r.ot = otRound(r.worked, P, 0);
    }
    return r;
  }
  if (o.st === 'L')
    return Object.assign(r, {
      tag: 'leave',
      label: (POLICY[o.leave.type] || { n: 'Leave' }).n,
      exp: 0
    });
  if (o.st === 'A') return Object.assign(r, { tag: 'absent', label: 'No punch recorded' });
  if (o.st === 'T' || (o.st === '' && dt > TODAY))
    return Object.assign(r, {
      tag: dt > TODAY ? 'future' : 'notin',
      label: dt > TODAY ? '' : 'Not clocked in yet'
    });
  r.tag = 'work';
  r.in = o.in;
  r.src = srcOf(o);
  if (o.live) {
    const n = new Date(),
      nm = n.getHours() * 60 + n.getMinutes();
    r.live = true;
    r.out = Math.max(o.in, nm);
  } else if (o.out == null) {
    r.miss = true;
    r.label = 'Punch-out missing';
    return r;
  } else r.out = o.out;
  if (r.out < r.in) r.out += 1440;
  r.gross = r.out - r.in;
  r.brk = o.st === 'D' || r.gross < 240 ? 0 : Math.min(P.breakMin, r.gross);
  r.worked = r.gross - r.brk;
  if (o.st === 'D') r.exp = Math.round(r.exp / 2);
  r.otRaw = Math.max(0, r.out - o.end);
  r.ot = otRound(r.otRaw, P, P.dailyCap * 60);
  if (r.ot) r.cat = 'weekday';
  return r;
}

/* ---------- entries: one per day with recorded extra time ---------- */
function otEntries(empId, days) {
  const e = emp(empId),
    P = otPolFor(e),
    out = [],
    wk = {};
  for (let i = days || 160; i >= 0; i--) {
    const dt = addD(TODAY, -i),
      r = hrsDay(empId, dt);
    if (!r.cat || r.live || r.out == null || !r.ot) continue;
    let m = r.ot,
      capped = false;
    if (r.cat === 'weekday') {
      const k = iso(wkStart(dt)),
        room = Math.max(0, P.weeklyCap * 60 - (wk[k] || 0));
      if (m > room) {
        m = Math.floor(room / P.round) * P.round;
        capped = true;
      }
      wk[k] = (wk[k] || 0) + m;
      if (!m) continue;
    }
    const key = empId + '|' + r.iso,
      x = S.ot.entries[key] || {},
      ex = addD(dt, P.comp.expiry);
    out.push({
      key,
      emp: empId,
      iso: r.iso,
      dt,
      cat: r.cat,
      min: m,
      rate: P.rate[r.cat],
      label: r.label,
      src: r.src,
      in: r.in,
      out: r.out,
      worked: r.worked,
      capped,
      st: x.st || (P.approve[r.cat] ? 'auto' : 'approved'),
      use: x.use || '',
      useSt: x.useSt || '',
      req: x.req || '',
      ureq: x.ureq || '',
      expiry: iso(ex),
      P
    });
  }
  return out;
}
function entStatus(en) {
  if (en.st !== 'approved') return en.st;
  if (en.use) return en.useSt === 'done' ? (en.use === 'comp' ? 'comp' : 'paid') : 'inreq';
  return en.expiry < iso(TODAY) ? 'expired' : 'available';
}
const entApproval = en => (en.st === 'approved' ? ['Approved', 'ok'] : OT_ST[en.st]);
const entMark = (key, patch) => {
  S.ot.entries[key] = Object.assign(S.ot.entries[key] || {}, patch);
};
/* money and payroll month, always shown beside the hours */
function otPay(en) {
  const e = emp(en.emp),
    P = en.P;
  return (slip(e.ctc).basic / P.payDays / P.payHours) * (en.min / 60) * en.rate;
}
const pastCutoff = P => TODAY.getDate() > (P || S.otp).cutoff;
function payMonth(isoDate, P) {
  P = P || S.otp;
  const d = isoD(isoDate),
    mk = (y, m) => new Date(y, m, 1),
    b =
      d.getDate() > P.cutoff
        ? mk(d.getFullYear(), d.getMonth() + 1)
        : mk(d.getFullYear(), d.getMonth()),
    t =
      TODAY.getDate() > P.cutoff
        ? mk(TODAY.getFullYear(), TODAY.getMonth() + 1)
        : mk(TODAY.getFullYear(), TODAY.getMonth()),
    x = b > t ? b : t;
  return { date: x, label: monLbl(x) };
}
/* hours to comp-off days: 4h is a half day, 8h a full day. Anything under 4h is left over. */
function compDays(min, P) {
  const f = P.comp.full * 60,
    h = P.comp.half * 60,
    full = Math.floor(min / f),
    rest = min - full * f,
    half = rest >= h ? 1 : 0;
  return { days: full + half * 0.5, left: rest - (half ? h : 0) };
}

/* ---------- periods and totals ---------- */
function hrsPeriod(per, off) {
  let a, b;
  if (per === 'today') a = b = TODAY;
  else if (per === 'week') {
    a = addD(wkStart(TODAY), off * 7);
    b = addD(a, 6);
  } else {
    a = new Date(TODAY.getFullYear(), TODAY.getMonth() + off, 1);
    b = new Date(a.getFullYear(), a.getMonth() + 1, 0);
  }
  const days = [];
  for (let d = a; d <= b; d = addD(d, 1)) days.push(d);
  return {
    a,
    b,
    days,
    label:
      per === 'today'
        ? 'Today, ' + fdd(TODAY)
        : per === 'week'
          ? (off === 0 ? 'This week' : off === -1 ? 'Last week' : 'Week of ' + fdd(a)) +
            ', ' +
            fdd(a) +
            ' to ' +
            fdd(b)
          : off === 0
            ? 'This month, ' + monLbl(a)
            : monLbl(a)
  };
}
function hrsSummary(empId, days, ents) {
  const map = {};
  ents.forEach(x => (map[x.iso] = x));
  const s = {
    worked: 0,
    exp: 0,
    otWk: 0,
    otOff: 0,
    offMin: 0,
    short: 0,
    absent: 0,
    rows: [],
    live: null
  };
  days.forEach(dt => {
    const r = hrsDay(empId, dt),
      en = map[r.iso];
    r.en = en || null;
    s.rows.push(r);
    if (dt > TODAY) return;
    if (r.off) {
      if (r.cat) {
        s.otOff += en ? en.min : r.ot;
        s.offMin += r.worked;
      }
      return;
    }
    if (r.tag === 'work') {
      s.worked += r.worked;
      s.exp += r.live ? Math.min(r.exp, r.worked) : r.exp;
      s.otWk += en ? en.min : r.live ? r.ot : 0;
      if (!r.live && r.worked - r.exp <= -15) s.short++;
      if (r.live) s.live = r;
    } else if (r.tag === 'absent') {
      s.exp += r.exp;
      s.absent++;
    } else if (r.miss) s.exp += r.exp;
  });
  s.diff = s.worked - s.exp;
  s.ot = s.otWk + s.otOff;
  return s;
}
/* the balance cards, from one list of entries */
function otBalance(ents) {
  const t = iso(TODAY),
    soon = iso(addD(TODAY, 14)),
    z = { avail: 0, pend: 0, used: 0, soon: 0, auto: 0, soonList: [] };
  ents.forEach(en => {
    const st = entStatus(en);
    if (st === 'available') {
      z.avail += en.min;
      if (en.expiry <= soon) {
        z.soon += en.min;
        z.soonList.push(en);
      }
    } else if (st === 'pending' || st === 'inreq') z.pend += en.min;
    else if (st === 'comp' || st === 'paid') z.used += en.min;
    else if (st === 'auto') z.auto += en.min;
  });
  z.soonList.sort((a, b) => (a.expiry < b.expiry ? -1 : 1));
  return z;
}

/* ---------- requests ---------- */
function mkReq(type, empId, keys, o) {
  const id = type + '-' + String(++S.ot.n[type]).padStart(4, '0'),
    e = emp(empId),
    ents = o && o.min != null ? [] : otEntries(empId).filter(x => keys.includes(x.key)),
    cats = [...new Set(ents.map(x => x.cat))];
  const r = Object.assign(
    {
      id,
      type,
      emp: empId,
      keys,
      min: ents.reduce((a, x) => a + x.min, 0),
      cat: cats.length === 1 ? cats[0] : cats.length ? 'mixed' : '',
      reason: '',
      status: 'Pending',
      at: new Date().toISOString(),
      by: e.mgr || 'E-1001',
      decAt: '',
      comment: '',
      dates: [],
      days: 0,
      amount: 0,
      month: ''
    },
    o
  );
  S.ot.reqs.unshift(r);
  return r;
}
const otReq = id => S.ot.reqs.find(r => r.id === id);
function otNotify(empId, t, s) {
  S.notifs.unshift({ t, s, time: 'Just now', u: 1, emp: empId, p: 'hours' });
}
function otDecide(id, ok, comment) {
  const r = otReq(id);
  if (!r || r.status !== 'Pending') return false;
  r.status = ok ? 'Approved' : 'Rejected';
  r.decAt = new Date().toISOString();
  r.comment = comment || '';
  r.by = me().id;
  const h = fhm(r.min);
  r.keys.forEach(k => {
    if (r.type === 'OT') entMark(k, { st: ok ? 'approved' : 'rejected' });
    else if (ok) entMark(k, { useSt: 'done' });
    else entMark(k, { use: '', useSt: '', ureq: '' });
  });
  if (r.type === 'OT')
    otNotify(
      r.emp,
      ok ? 'Overtime approved' : 'Overtime request rejected',
      `${h} · ${r.id}${ok ? ' · ready to use as comp-off or pay' : comment ? ' · ' + comment : ''}`
    );
  else if (r.type === 'CO')
    otNotify(
      r.emp,
      ok ? 'Comp-off approved' : 'Comp-off request rejected',
      `${fdy(r.days)} · ${r.id}${ok ? ' · credited' : ''}`
    );
  else
    otNotify(
      r.emp,
      ok ? 'Extra pay approved' : 'Extra pay request rejected',
      `${h} · ${r.id}${ok ? ' · ' + r.month + ' payroll' : ''}`
    );
  return true;
}
function otCancel(id) {
  const r = otReq(id);
  if (!r || r.status !== 'Pending') return false;
  r.status = 'Cancelled';
  r.decAt = new Date().toISOString();
  r.keys.forEach(k =>
    r.type === 'OT'
      ? entMark(k, { st: 'auto', req: '' })
      : entMark(k, { use: '', useSt: '', ureq: '' })
  );
  return true;
}

/* ---------- sample history, built once from the same punches ---------- */
function otInit() {
  if (S.ot.seeded) return;
  S.ot.seeded = 1;
  const me0 = 'E-1003',
    daysAgo2 = d => Math.round((TODAY - d) / 864e5);
  live()
    .slice(0, 16)
    .forEach(e => {
      otEntries(e.id).forEach(en => {
        if (en.st !== 'auto') return;
        const age = daysAgo2(en.dt),
          h = hsh(e.id, en.dt.getFullYear(), en.dt.getMonth(), en.dt.getDate()),
          r = h % 10;
        if (age <= 2) return;
        let st = 'approved',
          use = '',
          useSt = '';
        if (age <= 14) {
          if (r < 3) return;
          st = r < 6 ? 'pending' : r === 6 ? 'rejected' : 'approved';
        }
        if (st === 'approved' && age > 14) {
          if (r < 2) use = 'comp';
          else if (r < 4) use = 'pay';
          else if (r === 4 && age <= 45) use = 'comp';
          if (use) useSt = r === 4 ? 'pending' : 'done';
        }
        const x = { st, use, useSt };
        if (age <= 45) {
          const q = mkReq('OT', e.id, [en.key], {
            min: en.min,
            cat: en.cat,
            status: st === 'pending' ? 'Pending' : st === 'rejected' ? 'Rejected' : 'Approved',
            at: iso(addD(en.dt, 1)) + 'T10:00:00',
            decAt: st === 'pending' ? '' : iso(addD(en.dt, 2)) + 'T11:30:00',
            comment: st === 'rejected' ? 'Please add the task reference and send it again' : '',
            reason: 'Work completed after shift',
            by: e.mgr || 'E-1001'
          });
          x.req = q.id;
          if (use) {
            const P = en.P,
              c = use === 'comp' ? compDays(en.min, P) : null,
              u = mkReq(use === 'comp' ? 'CO' : 'PY', e.id, [en.key], {
                min: en.min,
                cat: en.cat,
                status: useSt === 'pending' ? 'Pending' : 'Approved',
                at: iso(addD(en.dt, 4)) + 'T09:00:00',
                decAt: useSt === 'pending' ? '' : iso(addD(en.dt, 5)) + 'T12:00:00',
                days: c ? c.days : 0,
                dates: c && c.days ? [iso(addD(en.dt, 12))] : [],
                amount: use === 'pay' ? Math.round(otPay(en)) : 0,
                month: use === 'pay' ? payMonth(iso(en.dt), P).label : '',
                by: e.mgr || 'E-1001'
              });
            x.ureq = u.id;
          }
        }
        entMark(en.key, x);
      });
    });
  /* a few notifications for the sample employee, from their own entries */
  const ents = otEntries(me0),
    ok = ents.filter(x => x.st === 'approved' && !x.use).slice(-1)[0],
    soon = otBalance(ents).soonList[0],
    rej = S.ot.reqs.find(q => q.emp === me0 && q.status === 'Rejected');
  if (rej)
    otNotify(me0, 'Overtime request rejected', `${fhm(rej.min)} · ${rej.id} · ${rej.comment}`);
  if (soon)
    otNotify(
      me0,
      'Comp-off about to expire',
      `${fhm(soon.min)} earned ${fdd(soon.dt)} expires ${fdd(isoD(soon.expiry))}`
    );
  if (ok)
    otNotify(
      me0,
      'Overtime approved',
      `${fhm(ok.min)} on ${fdd(ok.dt)} · ready to use as comp-off or pay`
    );
  S.notifs.slice(0, 3).forEach(n => (n.time = 'Earlier'));
}

/* js/core/engine-boot.js */
/* ---------- boot of the engine ---------- */
seedGov();
loadGov();
seedGov();
S.sec.twoFA = Object.assign(
  { employee: 0, manager: 0, hr: 1, admin: 1, sysadmin: 1 },
  Object.fromEntries(Object.entries(S.sec.twoFA || {}).filter(([k]) => ROLE_KEYS.includes(k)))
);

/* js/components/form-guards.js */
/* =====================================================================
   v38 · forms that protect your work, keyboard-complete tabs and buttons, search that reaches further, saved list views
   ===================================================================== */
/* ---------- unsaved changes ---------- */
function markDirty() {
  const m = document.querySelector('#layer .modal');
  if (m) m.dataset.dirty = '1';
}
{
  const _ov = overlay;
  overlay = function (title, body, foot, o = {}) {
    if (foot) foot = foot.replace(/onclick="closeModal\(\)"/g, 'onclick="dismissModal()"');
    _ov.call(this, title, body, foot, o);
    if (S.authed && !o.cmd && !o.bare) {
      const mb = document.querySelector('#layer .modal .mb');
      if (mb && mb.querySelector('input:not([type=checkbox]):not([type=file]),textarea,select')) {
        mb.addEventListener('input', markDirty);
        mb.addEventListener('change', markDirty);
      }
    }
  };
}
function dismissModal() {
  const m = document.querySelector('#layer .modal');
  if (!m || m.dataset.dirty !== '1' || document.getElementById('discard')) {
    if (!document.getElementById('discard')) closeModal();
    return;
  }
  const d = document.createElement('div');
  d.className = 'ov nest';
  d.id = 'discard';
  d.innerHTML = `<div class="modal sm" role="alertdialog" aria-modal="true" aria-labelledby="dc-t" aria-describedby="dc-d"><div class="mh"><h2 id="dc-t">Discard unsaved changes?</h2></div><div class="mb"><p id="dc-d">What you typed here has not been saved. If you leave now it will be lost.</p></div><div class="mf"><button class="btn" id="dc-keep" onclick="keepEditing()">Keep editing</button><button class="btn bad" onclick="discardGo()">Discard changes</button></div></div>`;
  document.getElementById('layer').appendChild(d);
  document.getElementById('dc-keep').focus();
}
function keepEditing() {
  const d = document.getElementById('discard');
  if (d) d.remove();
  const f = document.querySelector(
    '#layer .modal input:not([type=checkbox]),#layer .modal textarea,#layer .modal select'
  );
  if (f) f.focus();
}
function discardGo() {
  const d = document.getElementById('discard');
  if (d) d.remove();
  closeModal();
}
/* ---------- error summary for forms with several problems ---------- */
function errSum(L) {
  const mb = document.querySelector('#layer .modal .mb');
  if (!mb) return;
  let box = mb.querySelector('.errsum');
  if (L.length < 2) {
    if (box) box.remove();
    return;
  }
  if (!box) {
    box = document.createElement('div');
    box.className = 'errsum';
    box.setAttribute('role', 'alert');
    mb.prepend(box);
  }
  box.innerHTML = `<b>Fix ${L.length} things to continue</b><ul>${L.map(x => {
    const lab = (
      (document.querySelector('label[for="' + x.id + '"]') || {}).textContent || x.id
    ).replace(/\s*\(.*\)/, '');
    return `<li><a href="#${x.id}" onclick="event.preventDefault();document.getElementById('${x.id}').focus()">${esc(lab)}: ${esc(x.msg)}</a></li>`;
  }).join('')}</ul>`;
}
{
  const _c = chk;
  let list = [],
    t = null;
  chk = function (id, ok, msg) {
    const r = _c.apply(this, arguments);
    if (!ok) list.push({ id, msg });
    if (!t)
      t = setTimeout(() => {
        t = null;
        const L = list;
        list = [];
        errSum(L);
      }, 0);
    return r;
  };
}
/* ---------- keyboard: tabs are one tab stop with arrow keys; role=button works with Space and Enter ---------- */
function enhanceTabs(root) {
  (root || document).querySelectorAll('[role=tablist]').forEach((tl, ti) => {
    const tabs = [...tl.querySelectorAll('[role=tab]')];
    if (!tabs.length) return;
    tabs.forEach((b, i) => {
      if (!b.id) b.id = 'tb-' + ti + '-' + i;
      b.tabIndex = b.getAttribute('aria-selected') === 'true' ? 0 : -1;
    });
    if (!tabs.some(b => b.tabIndex === 0)) tabs[0].tabIndex = 0;
    const host = tl.closest('.head') || tl.parentElement,
      panel = host && host.nextElementSibling;
    if (panel && panel.tagName === 'DIV' && !panel.matches('[role=tabpanel]')) {
      panel.setAttribute('role', 'tabpanel');
      if (!panel.id) panel.id = 'tp-' + ti;
      panel.setAttribute(
        'aria-labelledby',
        (tabs.find(b => b.getAttribute('aria-selected') === 'true') || tabs[0]).id
      );
    }
    if (panel && panel.id && panel.getAttribute('role') === 'tabpanel')
      tabs.forEach(b => b.setAttribute('aria-controls', panel.id));
  });
}
document.addEventListener(
  'keydown',
  e => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute('role') === 'tab') {
      const tl = t.closest('[role=tablist]'),
        tabs = [...tl.querySelectorAll('[role=tab]')],
        i = tabs.indexOf(t),
        d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const j =
          e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? tabs.length - 1
              : (i + d + tabs.length) % tabs.length;
        tabs[j].click();
        setTimeout(() => {
          const n =
            document.getElementById(tabs[j].id) ||
            [...document.querySelectorAll('[role=tab][aria-selected=true]')].find(
              x => x.textContent === tabs[j].textContent
            );
          if (n) n.focus();
        }, 60);
      }
      return;
    }
    if (
      t &&
      t.getAttribute &&
      t.getAttribute('role') === 'button' &&
      t.tagName !== 'BUTTON' &&
      (e.key === ' ' || (e.key === 'Enter' && !t.hasAttribute('onkeydown')))
    ) {
      e.preventDefault();
      t.click();
    }
  },
  true
);
{
  const _rn = render;
  render = function () {
    _rn();
    enhanceTabs(document.getElementById('view'));
  };
}
{
  const _ov2 = overlay;
  overlay = function () {
    _ov2.apply(this, arguments);
    enhanceTabs(document.getElementById('layer'));
  };
}

/* js/layout/search.js */
/* ---------- search: pages, people, requests by reference, policies, recent ---------- */
S.recent = [];
function recent(k, id, t, s) {
  if (!id) return;
  S.recent = [{ k, id, t, s }, ...S.recent.filter(x => !(x.k === k && x.id === id))].slice(0, 5);
}
{
  const _g = go;
  go = function (p) {
    _g.apply(this, arguments);
    if (S.authed && PG[p] && p !== 'dashboard') recent('page', p, label(p), 'Page');
  };
}
{
  const _e = empProfile;
  empProfile = function (id) {
    _e.apply(this, arguments);
    const e = emp(id);
    if (e) recent('emp', id, e.name, e.title);
  };
}
const POLDOCS = () => {
  const w = W(),
    s = ST();
  return [
    [
      'Leave policy: notice for earned leave',
      `${w.noticeEL} working days before the first day.`,
      'cal'
    ],
    [
      'Leave policy: medical certificate',
      `Sick leave over ${w.certDays} days needs a medical certificate.`,
      'cal'
    ],
    ['Leave policy: carry forward', `Earned leave up to ${w.carryEL} days carries forward.`, 'cal'],
    [
      'Work calendar',
      `Office staff work ${w.week.Office} days a week and plant staff ${w.week.Plant}. Company holidays are not charged as leave.`,
      'cal'
    ],
    ['Late-mark grace', `${w.grace} minutes after shift start before a late mark.`, 'clock'],
    ['Probation', `${w.probation} months from the date of joining.`, 'userplus'],
    [
      'Provident fund',
      s.pf.on
        ? `${s.pf.rate}% of basic pay, up to a monthly ceiling of ${inr(s.pf.ceil)}.`
        : 'Not deducted.',
      'wallet'
    ],
    [
      'Professional tax',
      s.pt.on ? `${inr(s.pt.amt)} a month in this demo.` : 'Not deducted.',
      'wallet'
    ]
  ];
};
{
  const _r = cmdRender;
  cmdRender = function (q0) {
    const raw = q0.trim(),
      act = raw.startsWith('>'),
      q = (act ? raw.slice(1) : raw).trim().toLowerCase();
    if (act) return _r(q0);
    _r(q0);
    const base = cmdItems.slice(),
      extra = [];
    if (!q && S.recent.length)
      extra.push(
        ...S.recent.map(x => ({
          g: 'Recent',
          t: x.t,
          s: x.s,
          i: x.k === 'emp' ? 'user' : x.k === 'req' ? 'inbox' : PG[x.id] ? PG[x.id][1] : 'file',
          fn: () => {
            closeModal();
            x.k === 'page'
              ? go(x.id)
              : x.k === 'emp'
                ? empProfile(x.id)
                : reqDetail(x.id.split(':')[0], +x.id.split(':')[1]);
          }
        }))
      );
    if (q.length >= 2) {
      allReq()
        .filter(
          ({ k, r }) =>
            (inScope(KIND[k].res, r.emp) || r.emp === me().id) && can(KIND[k].res, 'view')
        )
        .filter(({ k, r }) =>
          (refOf(k, r) + ' ' + emp(r.emp).name + ' ' + reqSummary(k, r)).toLowerCase().includes(q)
        )
        .slice(0, 4)
        .forEach(({ k, r }) =>
          extra.push({
            g: 'Requests',
            t: refOf(k, r) + ' · ' + emp(r.emp).name,
            s: KIND[k].n + ' · ' + reqSummary(k, r) + ' · ' + stOf(k, r),
            i: 'inbox',
            fn: () => {
              closeModal();
              reqDetail(k, r.id);
            }
          })
        );
      S.tickets
        .filter(
          t =>
            (t.emp === me().id || inScope('requests', t.emp)) &&
            (t.id + ' ' + t.cat).toLowerCase().includes(q)
        )
        .slice(0, 3)
        .forEach(t =>
          extra.push({
            g: 'Requests',
            t: t.id + ' · ' + t.cat,
            s: 'Helpdesk · ' + t.st,
            i: 'receipt',
            fn: () => {
              closeModal();
              go('requests');
              ticketDetail(t.id);
            }
          })
        );
      POLDOCS()
        .filter(([a, b]) => (a + ' ' + b).toLowerCase().includes(q))
        .slice(0, 3)
        .forEach(([a, b, i]) =>
          extra.push({
            g: 'Policies',
            t: a,
            s: b,
            i,
            fn: () => {
              overlay(
                a,
                `<p>${esc(b)}</p><p class="muted small" style="margin-top:10px">This comes from Settings and changes when the policy changes.</p>`,
                `<button class="btn primary" onclick="closeModal()">Close</button>`
              );
            }
          })
        );
    }
    const seen = new Set(base.map(x => x.g + x.t));
    const ex = extra.filter(x => !seen.has(x.g + x.t));
    cmdItems = (q ? [...base, ...ex] : [...ex, ...base]).slice(0, 12);
    cmdIdx = 0;
    cmdPaint();
  };
}
{
  const _p = cmdPaint;
  cmdPaint = function () {
    let g = '',
      h = '';
    cmdItems.forEach((it, i) => {
      if (it.g !== g) {
        g = it.g;
        h += `<div class="cmd-g">${g} <span class="muted">(${cmdItems.filter(x => x.g === g).length})</span></div>`;
      }
      h += `<button class="cmd-i ${i === cmdIdx ? 'on' : ''}" onclick="cmdRun(${i})" onmousemove="cmdIdx=${i}">${it.e ? av(it.e.name, 32) : `<span class="ai t-brand" style="width:32px;height:32px">${ic(it.i || 'file', 18)}</span>`}<span><b style="display:block">${esc(it.t)}</b><span class="muted small">${esc(it.s)}</span></span></button>`;
    });
    $('#cr').innerHTML =
      h ||
      `<div class="empty"><b>No matches</b>Try a name, role, page, policy or request number.</div>`;
  };
}

/* js/features/employees/filters.js */
/* ---------- employees: active filters, saved views, result count ---------- */
const BUILTIN_VIEWS = [
  { id: 'plant', n: 'My plant', f: { locF: 'Manesar Plant' } },
  { id: 'prob', n: 'Probation ending', f: { statF: 'Probation' } },
  { id: 'ver', n: 'Pending verification', f: { docF: 1 } }
];
const allViews = () => [...BUILTIN_VIEWS, ...S.views.filter(v => v.res === 'employees')];
{
  const _f = filteredEmps;
  filteredEmps = function () {
    let l = _f();
    if (S.locF) l = l.filter(e => e.loc === S.locF);
    if (S.docF) l = l.filter(e => vdocsOf(e).some(d => d.st === 'Pending'));
    return l;
  };
}
const hasF = () => !!(S.q || S.deptF !== 'All' || S.statF !== 'All' || S.locF || S.docF);
function clearF(k) {
  if (!k || k === 'q') S.q = '';
  if (!k || k === 'dept') S.deptF = 'All';
  if (!k || k === 'stat') S.statF = 'All';
  if (!k || k === 'loc') S.locF = '';
  if (!k || k === 'doc') S.docF = 0;
  render();
}
function viewsSel() {
  return `<label class="dd vsel"><span class="sr">Saved views</span><select class="sel" onchange="applyView(this.value)" aria-label="Saved views"><option value="">Views</option>${allViews()
    .map(v => `<option value="${v.id}">${esc(v.n)}</option>`)
    .join('')}</select></label>`;
}
function fchips() {
  const c = [];
  if (S.q) c.push(['q', 'Search: ' + S.q]);
  if (S.deptF !== 'All') c.push(['dept', S.deptF]);
  if (S.statF !== 'All') c.push(['stat', S.statF]);
  if (S.locF) c.push(['loc', S.locF]);
  if (S.docF) c.push(['doc', 'Documents pending verification']);
  return `<div class="fchips" id="fchips" ${c.length ? '' : 'hidden'}>${c.map(([k, t]) => `<span class="chip info fc">${esc(t)}<button onclick="clearF('${k}')" aria-label="Remove filter ${esc(t)}">${ic('x', 12)}</button></span>`).join('')}${c.length ? `<button class="link" onclick="clearF()">Clear all</button><button class="link" onclick="saveView()">Save this view</button>` : ''}</div>`;
}
function applyView(id) {
  const v = allViews().find(x => x.id === id);
  if (!v) return;
  S.q = v.f.q || '';
  S.deptF = v.f.deptF || 'All';
  S.statF = v.f.statF || 'All';
  S.locF = v.f.locF || '';
  S.docF = v.f.docF || 0;
  render();
  toast('View: ' + v.n);
}
function saveView() {
  overlay(
    'Save this view',
    `<div class="fg">${fld('sv-n', 'Name', `<input id="sv-n" placeholder="For example: Finance, on probation">`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="saveViewGo()">Save</button>`
  );
}
function saveViewGo() {
  const n = $('#sv-n').value.trim();
  if (!chk('sv-n', !!n, 'Give the view a name')) return;
  S.views.push({
    id: 'v' + Date.now(),
    res: 'employees',
    n,
    f: { q: S.q, deptF: S.deptF, statF: S.statF, locF: S.locF, docF: S.docF }
  });
  saveGov();
  closeModal();
  render();
  toast('View saved');
}
{
  const _ep = employeesPage;
  employeesPage = function () {
    let h = _ep();
    return h.replace('<div class="grow"></div>', fchips() + '<div class="grow"></div>');
  };
}
{
  const _rl = renderList;
  renderList = function () {
    _rl();
    const f = document.getElementById('fchips');
    if (f) f.outerHTML = fchips();
  };
}

/* a table that scrolls must be reachable by keyboard even when it has no buttons inside */
function enhanceScrollers(root) {
  (root || document).querySelectorAll('.tw').forEach(t => {
    const sc =
      t.classList.contains('vs') ||
      t.scrollWidth > t.clientWidth + 1 ||
      t.scrollHeight > t.clientHeight + 1;
    if (sc) {
      t.tabIndex = 0;
      t.setAttribute('role', 'region');
      t.setAttribute(
        'aria-label',
        (t.querySelector('table') && t.querySelector('table').getAttribute('aria-label')) ||
          'Scrollable table'
      );
    } else if (!sc && t.getAttribute('role') === 'region' && t.hasAttribute('tabindex')) {
      t.removeAttribute('tabindex');
      t.removeAttribute('role');
    }
  });
}
{
  const _rn3 = render;
  render = function () {
    _rn3();
    enhanceScrollers(document.getElementById('view'));
    requestAnimationFrame(() => enhanceScrollers(document.getElementById('view')));
    clearTimeout(enhanceScrollers.t);
    enhanceScrollers.t = setTimeout(() => enhanceScrollers(document.getElementById('view')), 350);
  };
}
addEventListener('resize', () =>
  setTimeout(() => enhanceScrollers(document.getElementById('view')), 200)
);

/* js/features/settings/roles-access.js */
/* =====================================================================
   v38 · settings that save and change behaviour · organization · audit log
   ===================================================================== */
const nowT = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
const SVST = () => {
  const s = S.save;
  return s.st === 'saving'
    ? 'Saving…'
    : s.st === 'saved'
      ? 'Saved · ' + s.at
      : s.st === 'failed'
        ? 'Could not save. Your browser blocked storage, so changes last only until you close this tab.'
        : '';
};
function paintSave() {
  const el = document.getElementById('svst');
  if (!el) return;
  el.className = 'svst ' + (S.save.st || '');
  el.textContent = SVST();
}
const svBadge = () =>
  `<span class="svst ${S.save.st || ''}" id="svst" role="status" aria-live="polite">${SVST()}</span>`;
function commit() {
  S.save = { st: 'saving', at: '' };
  paintSave();
  setTimeout(() => {
    const ok = saveGov();
    persist();
    S.save = { st: ok ? 'saved' : 'failed', at: nowT() };
    paintSave();
  }, 220);
}
const demoChip = () => chip('Demo only', 'warn', 1);
const lastBy = m =>
  m && m.by && m.at ? `Last changed by ${esc(m.by)} · ${ftime(m.at)}` : 'Still on the defaults';
const polMeta = k => {
  const h = S.polHist[k],
    l = h[h.length - 1];
  return l.at ? { by: l.by, at: l.at } : null;
};

/* ---------- roles and access ---------- */
const LOCK = (res, role, act) =>
  res === 'dashboard' ||
  (role === 'sysadmin' &&
    ((['users', 'roles', 'security'].includes(res) && (act === 'view' || act === 'edit')) ||
      (res === 'audit' && act === 'view')));
function permAct(res, role, act, on) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const x = S.perms.m[res][role],
    old = !!x[act];
  if (LOCK(res, role, act)) {
    render();
    return;
  }
  x[act] = on ? 1 : 0;
  if (act === 'view' && !on) ACTS.forEach(a => (x[a] = 0));
  if (on && act !== 'view') x.view = 1;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Permission changed', `${RES[res][0]} · ${roleName(role)}`, {
    res,
    from: `${ACT_N[act]}: ${old ? 'allowed' : 'not allowed'}`,
    to: `${ACT_N[act]}: ${on ? 'allowed' : 'not allowed'}`
  });
  commit();
  render();
  toast(
    `${RES[res][0]}: ${ACT_N[act].toLowerCase()} ${on ? 'allowed' : 'removed'} for ${roleName(role)}`
  );
}
function permScope(res, role, v) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const x = S.perms.m[res][role],
    old = x.scope;
  if (old === v) return;
  x.scope = v;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Scope changed', `${RES[res][0]} · ${roleName(role)}`, {
    res,
    from: SCOPES.find(s => s[0] === old)[1],
    to: SCOPES.find(s => s[0] === v)[1]
  });
  commit();
  render();
  toast(
    `${RES[res][0]}: ${roleName(role)} now sees ${SCOPES.find(s => s[0] === v)[1].toLowerCase()}`
  );
}
function sensSet(f, role, on) {
  if (!need('roles', 'edit', 'change permissions')) return;
  const o = S.perms.sens[role];
  o[f] = on ? 1 : 0;
  S.perms.meta = { by: me().name, at: new Date().toISOString() };
  audit('Sensitive access changed', `${SENS.find(s => s[0] === f)[1]} · ${roleName(role)}`, {
    res: 'settings',
    from: on ? 'hidden' : 'visible',
    to: on ? 'visible' : 'hidden'
  });
  commit();
  render();
  toast(`${SENS.find(s => s[0] === f)[1]} ${on ? 'visible' : 'hidden'} for ${roleName(role)}`);
}
function permReset() {
  confirmBox(
    'Restore default access?',
    'Every role goes back to its original permissions, scopes and sensitive-field access. This is recorded in the audit log.',
    'Restore defaults',
    () => {
      S.perms = defaultPerms();
      S.perms.meta = { by: me().name, at: new Date().toISOString() };
      audit('Permissions reset', 'All roles', { res: 'settings', to: 'defaults' });
      commit();
      render();
      toast('Default access restored');
    },
    true
  );
}
function rolesTab() {
  const r = curTab('rr', 'manager'),
    scopeOpts = (v, dis) =>
      SCOPES.map(
        ([k, n]) => `<option value="${k}" ${v === k ? 'selected' : ''}>${n}</option>`
      ).join('');
  const rows = Object.keys(RES).map(res => {
    const x = S.perms.m[res][r],
      ap = RES[res][1];
    const cells = ACTS.map((a, i) =>
      ap.includes(ACT_K[i])
        ? `<label class="sw"><input type="checkbox" ${x[a] ? 'checked' : ''} ${LOCK(res, r, a) ? 'disabled title="This always stays on so access to Settings can never be lost"' : ''} onchange="permAct('${res}','${r}','${a}',this.checked)" aria-label="${RES[res][0]}: ${ACT_N[a]} for ${roleName(r)}"><span></span></label>`
        : '<span class="muted" aria-label="Not applicable">–</span>'
    );
    const sc =
      res === 'dashboard'
        ? '<span class="muted small">Own data</span>'
        : `<select class="sel" onchange="permScope('${res}','${r}',this.value)" ${r === 'employee' || r === 'sysadmin' ? 'disabled' : ''} aria-label="${RES[res][0]} scope for ${roleName(r)}">${scopeOpts(x.scope)}</select>`;
    return { cells: [RES[res][0], ...cells, sc] };
  });
  const sens = SENS.map(([f, n, d]) => ({
    cells: [
      `<b>${n}</b> <span class="muted small">${d}</span>`,
      ...['manager', 'hr', 'admin', 'sysadmin'].map(
        rl =>
          `<label class="sw"><input type="checkbox" ${S.perms.sens[rl][f] ? 'checked' : ''} onchange="sensSet('${f}','${rl}',this.checked)" aria-label="${n} for ${roleName(rl)}"><span></span></label>`
      )
    ]
  }));
  return `<div class="svh"><p class="muted small" style="margin:0">Changes apply immediately for everyone, including menus, buttons and exports. <b>In production the server must enforce every rule</b>; this demo applies them in your browser.</p>${svBadge()}</div>
  ${tabs(
    'rr',
    ROLE_DEF.map(x => [x.k, x.n]),
    'manager'
  )}
  <p class="muted small" style="margin:10px 0">${esc(roleDef(r).d)}.${r === 'employee' ? ' Employees always see only their own records.' : r === 'sysadmin' ? ' This role has no employee or payroll data unless you grant it below.' : ' Scope decides whose records this role can see.'}</p>
  ${innerWidth <= 520 ? permPhone(r) : rtable([{ h: 'Resource', keep: 1 }, ...ACTS.map(a => ({ h: ACT_N[a], c: 'num' })), { h: 'Whose records' }], rows, {})}
  <h2 style="margin:24px 0 4px">Sensitive fields</h2><p class="muted small" style="margin-bottom:8px">Hidden fields show as Restricted, even on screens the person can otherwise open.</p>
  ${
    innerWidth <= 520
      ? sensPhone()
      : rtable(
          [
            { h: 'Information', keep: 1 },
            { h: 'Manager', c: 'num' },
            { h: 'HR', c: 'num' },
            { h: 'Admin', c: 'num' },
            { h: 'System Admin', c: 'num' }
          ],
          sens,
          {}
        )
  }
  <div class="svh" style="margin-top:14px"><span class="muted small">${lastBy(S.perms.meta)}</span><button class="btn sm" onclick="permReset()">Restore defaults</button></div>
  <div class="note" style="margin-top:12px"><b>Maker and checker:</b> HR prepares payroll and Admin approves it, so payroll is always checked by a second person. System Admin has no employee or payroll data unless you turn it on above.</div>`;
}

/* js/features/settings/ext-admin.js */
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

/* js/features/profile/ext-prefs.js */
/* =====================================================================
   Profile · Preferences · Browser extension
   Master toggle, what to show, toolbar badge, reminders, pause, sign out. Items the role does not allow are
   shown locked with a reason, so nobody wonders where they went.
   ===================================================================== */
const extLockTip = `<span class="xa-lock" tabindex="0" role="img" aria-label="Not available for your role" aria-describedby="xa-lt">${ic('lock', 15)}<span class="xa-tip" id="xa-lt" role="tooltip">Not available for your role</span></span>`;
function extRow(title, sub, input, lock) {
  return `<div class="li xa-li ${lock ? 'is-lock' : ''}"><div class="grow"><b>${title}</b><div class="muted small">${sub}</div></div>${lock ? extLockTip : ''}${input}</div>`;
}
const extSw = (on, fn, label, dis, fid) =>
  `<label class="sw"><input type="checkbox" role="switch" ${on ? 'checked' : ''} ${dis ? 'disabled' : ''} aria-label="${esc(label)}" ${fid ? `data-fid="${fid}"` : ''} onchange="${fn}"><span></span></label>`;

function extPrefsPage() {
  const e = me(),
    role = persona().role,
    u = extUser(e.id),
    [st, stTxt, stTone] = extStatus(),
    allowed = extAllowed(role),
    on = extOn(e.id, role),
    paused = u.pausedUntil && new Date(u.pausedUntil) > new Date();
  const adminOff = !allowed;
  const banner = adminOff
    ? `<div class="xa-ban tone-mute" role="status">${ic('lock', 18)}<div><b>Disabled by your organisation</b><div class="small">Your admin hasn’t turned the browser widget on for ${esc(roleName(role))}. Everything stays available in PeopleDesk.</div></div></div>`
    : on && st === 'none'
      ? `<div class="xa-ban tone-info" role="status">${ic('download', 18)}<div class="grow"><b>One more step</b><div class="small">Add the extension to your browser to start seeing your logout time.</div></div><button class="btn sm primary" onclick="extSetup(1)">Set up now</button></div>`
      : on && st === 'installed'
        ? `<div class="xa-ban tone-warn" role="status">${ic('alert', 18)}<div class="grow"><b>Installed, but not signed in</b><div class="small">Connect it to your PeopleDesk account.</div></div><button class="btn sm primary" onclick="extSetup(2)">Connect</button></div>`
        : paused
          ? `<div class="xa-ban tone-mute" role="status">${ic('clock', 18)}<div class="grow"><b>Paused until tomorrow</b><div class="small">No badge or reminders today. Your attendance is not affected.</div></div><button class="btn sm" onclick="extResume()">Resume now</button></div>`
          : '';
  const fieldRows = PDExt.FIELDS.map(([k, n, t]) => {
    const ok = extFieldOk(k, role);
    return extRow(
      n,
      ok ? t : 'Your role can’t show this one',
      extSw(
        ok && extFieldOn(k, e.id, role),
        `extSetField('${k}',this.checked)`,
        n,
        !ok || adminOff || !on,
        'f-' + k
      ),
      !ok && !adminOff
    );
  }).join('');
  const remRows = [
    ['in', 'Clock-in confirmation', 'A quick note when your day starts', true],
    ...PDExt.REMINDERS.map(r => [
      r[0],
      r[1],
      'One friendly heads-up, shown once a day',
      extRemOk(r[0], role)
    ])
  ]
    .map(([k, n, t, ok]) =>
      extRow(
        n,
        ok ? t : 'Your role can’t use this one',
        extSw(
          ok && extRemOn(k, e.id, role),
          `extSetRem('${k}',this.checked)`,
          n,
          !ok || adminOff || !on,
          'r-' + k
        ),
        !ok && !adminOff
      )
    )
    .join('');
  const connected = st === 'connected';
  return `<div class="xa-pref">
   <div class="card"><div class="head"><div><h2>Browser extension</h2><p class="sub">See your logout time in your browser, without opening PeopleDesk</p></div><span id="xa-stat">${chip(stTxt, stTone)}</span></div>
    ${banner}
    <div class="list">
      ${extRow('Show in browser', 'Your clock-in time, expected logout and time left, in the toolbar', extSw(on, 'extSetMaster(this.checked)', 'Show in browser', adminOff, 'master'), false)}
    </div>
    <h3 class="xa-h">What to show</h3><div class="list">${fieldRows}${extRow('Toolbar badge', 'Show the time left on the icon, for example “5h” or “42m”', extSw(on && !!u.badge && allowed, 'extSetBadge(this.checked)', 'Toolbar badge', adminOff || !on, 'badge'), false)}</div>
    <h3 class="xa-h">Reminders</h3><div class="list">${remRows}</div>
    <div class="xa-acts">
      <button class="btn" ${on && !paused && !adminOff ? '' : 'disabled'} onclick="extPause()">${ic('clock', 16)}Pause until tomorrow</button>
      <button class="btn" ${connected ? '' : 'disabled'} onclick="extSignOutExt()">${ic('logout', 16)}Sign out of extension</button>
      ${!on || connected || adminOff ? '' : `<button class="btn" onclick="extSetup(1)">Set up the extension</button>`}
    </div>
    <p class="muted small xa-pp">${ic('shield', 14)}The extension shows attendance only. It can’t see your tabs, history or other sites, and hiding it never changes your attendance.</p>
   </div>
   <div class="card xa-me"><div class="head"><div><h2>What you’ll see</h2><p class="sub">Sample times. Updates as you change your choices.</p></div></div><div id="xa-pv">${extPrefPreview()}</div></div></div>`;
}
/* the status chip updates in place when the extension answers, so nothing else on the page jumps */
function extRepaint() {
  const [, t, tone] = extStatus(),
    el = document.getElementById('xa-stat');
  if (el) el.innerHTML = chip(t, tone);
  if (S.page === 'profile' && S.tab.prof === 'prefs' && !$('#layer .ov')) render();
  if (S.extSetup && $('#xs')) extSetupPaint();
}
/* the preview uses sample times, so every switch has a visible effect even before you clock in */
function extPrefPreview() {
  const e = me(),
    role = persona().role,
    u = extUser(e.id),
    on = extOn(e.id, role),
    st = S.extPrefState || 'working',
    key = !extAllowed(role) ? 'disabled' : !on ? 'user-off' : st,
    d = PDExt.demo(key);
  if (d.snap && d.snap.enabled) {
    d.snap.fields = Object.fromEntries(
      PDExt.FIELDS.map(f => [f[0], extFieldOn(f[0], e.id, role) ? 1 : 0])
    );
    d.snap.badge = u.badge ? 1 : 0;
    d.snap.reminders = Object.fromEntries(
      [['in'], ...PDExt.REMINDERS].map(r => [r[0], extRemOn(r[0], e.id, role) ? 1 : 0])
    );
  }
  const m = PDExt.model(d.snap, d.now),
    live = !!(d.snap && d.snap.enabled),
    states = [
      ['working', 'Working'],
      ['low', '30 min left'],
      ['complete', 'Complete'],
      ['offline', 'Offline']
    ],
    notes = live
      ? [['in', 'Clock-in confirmation'], ...PDExt.REMINDERS]
          .filter(r => d.snap.reminders[r[0]])
          .map(r => [r[1], PDExt.notifText(r[0], d.snap)])
      : [];
  const seg = live
    ? `<div class="xv-seg" role="group" aria-label="Preview state">${states.map(([k, n]) => `<button type="button" aria-pressed="${k === st}" onclick="extPrefState('${k}')" data-fid="ps-${k}">${n}</button>`).join('')}</div>`
    : '';
  const list = live
    ? `<details class="xv-n"${S.extNotifOpen ? ' open' : ''} ontoggle="S.extNotifOpen=this.open"><summary><h3>Notifications you’ll get</h3><span class="xv-cnt">${notes.length}</span>${ic('chev', 18)}</summary>${
        notes.length
          ? `<ul>${notes.map(([n, x]) => `<li><span class="xv-ni">${ic('bell', 15)}</span><div><b>${esc(x.title)}</b><span>${esc(x.message)}</span></div></li>`).join('')}</ul>`
          : '<p class="muted small">None. All reminders are off.</p>'
      }</details>`
    : '';
  return `${seg}<div class="xv-stage"><div class="xv-bar"><span class="xv-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="xv-url" aria-hidden="true">${ic('lock', 11)}peopledesk</span>${PDExt.toolbarHTML(m)}</div><div class="xv-pop"><div class="xa-frame" role="img" aria-label="Preview of your extension popup. Status: ${esc(m.label)}."><div inert>${PDExt.popupHTML(m)}</div></div></div></div>${list}`;
}
function extPrefState(k) {
  S.extPrefState = k;
  extRefreshPreview();
}
/* toggling a field redraws only the preview, so keyboard focus stays on the switch */
function extRefreshPreview() {
  const box = document.getElementById('xa-pv');
  if (!box || S.tab.prof !== 'prefs') return;
  const a = document.activeElement,
    fid = a && a.dataset ? a.dataset.fid : '';
  box.innerHTML = extPrefPreview();
  if (fid) {
    const n = box.querySelector(`[data-fid="${fid}"]`);
    if (n) n.focus();
  }
}

/* js/features/ext/ext-setup.js */
/* =====================================================================
   Browser extension: the first-login prompt and the 3-step setup
   Prompt is shown only if the role allows the widget. "Maybe later" asks again in a week (up to EXT_ASKS times),
   "Don't ask again" stops it for good. The same setup can always be opened from Profile, Preferences.
   ===================================================================== */
function extMaybePrompt() {
  if (!S.authed || $('#layer .ov')) return;
  const u = extUser();
  if (!extAllowed(persona().role) || u.prompt === 'never' || u.prompt === 'done') return;
  if (u.optIn === false || extStatus()[0] === 'connected') return;
  if (u.asks >= EXT_ASKS || (u.askAfter && iso(new Date()) < u.askAfter)) return;
  u.asks++;
  const nxt = new Date();
  nxt.setDate(nxt.getDate() + 7);
  u.askAfter = iso(nxt);
  persist();
  const demo = PDExt.demo('working'),
    m = PDExt.model(demo.snap, demo.now);
  overlay(
    'See your logout time without opening HRMS',
    `<div class="xs-art" aria-hidden="true"><div class="xa-tbar"><span class="xa-url">${ic('search', 12)}</span>${PDExt.toolbarHTML(m)}</div><div class="xs-bub">${esc(m.tip)}</div></div>
     <p>Your clock-in time, expected logout and time left sit in your browser toolbar. They update by themselves, whether you clocked in on the mobile app, a biometric device or the web.</p>
     <p class="xa-priv sm">${ic('shield', 16)}<span>Shows attendance only, nothing else.</span></p>
     <label class="chk xs-never"><input type="checkbox" id="xs-never" onchange="extNever(this.checked)">Don’t ask again</label>`,
    `<button class="btn" onclick="closeModal()">Maybe later</button><button class="btn primary" onclick="extSetup(1)" autofocus>Set up now</button>`
  );
}
function extNever(on) {
  extUser().prompt = on ? 'never' : '';
  persist();
}

/* ---------- setup ---------- */
const XS_STEPS = ['Install', 'Connect', 'Choose'];
function extSetup(step) {
  if (!extAllowed(persona().role)) {
    toast('The browser widget isn’t enabled for your role', null, 'err');
    return;
  }
  S.extSetup = { step: step || 1, busy: 0, fail: 0 };
  extPing();
  extSetupPaint();
}
function extStepper(cur) {
  return `<ol class="xs-steps" aria-label="Setup progress">${XS_STEPS.map((n, i) => {
    const k = i + 1,
      st = k < cur ? 'done' : k === cur ? 'now' : '';
    return `<li class="${st}" ${k === cur ? 'aria-current="step"' : ''}><span class="xs-n">${k < cur ? ic('check', 16) : k}</span><span class="xs-l">${n}<span class="sr"> (step ${k} of 3${k < cur ? ', done' : ''})</span></span></li>`;
  }).join('')}</ol>`;
}
/* simple Chrome and Edge marks, drawn here so no image files are needed */
function extBrandIcon(b) {
  const pt = (deg, r) => {
      const a = (deg * Math.PI) / 180;
      return (24 + r * Math.cos(a)).toFixed(2) + ' ' + (24 + r * Math.sin(a)).toFixed(2);
    },
    wedge = (a, z, c) => `<path fill="${c}" d="M24 24L${pt(a, 22)}A22 22 0 0 1 ${pt(z, 22)}Z"/>`;
  return b === 'edge'
    ? `<svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="eg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#0c59a4"/><stop offset="1" stop-color="#2fb5e8"/></linearGradient><linearGradient id="eg2" x1="0" x2="1"><stop offset="0" stop-color="#35c1a0"/><stop offset="1" stop-color="#3dd68c"/></linearGradient></defs><circle cx="24" cy="24" r="22" fill="url(#eg)"/><path d="M8 27c0-9 7-15 16-15 8 0 14 5 14 12H21c-4 0-6 2-6 4 0 4 5 7 11 7 5 0 9-2 12-5-2 8-8 13-16 13C14 43 8 36 8 27z" fill="url(#eg2)" opacity=".95"/></svg>`
    : `<svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">${wedge(210, 330, '#db4437')}${wedge(330, 450, '#f4b400')}${wedge(90, 210, '#0f9d58')}<circle cx="24" cy="24" r="10.5" fill="#fff"/><circle cx="24" cy="24" r="8" fill="#4285f4"/></svg>`;
}
function extBrandBtn(b, mine) {
  const n = b === 'edge' ? 'Microsoft Edge' : 'Google Chrome';
  return `<a class="xs-br${mine ? ' mine' : ''}" href="${EXT_STORE[b]}" target="_blank" rel="noopener noreferrer">${extBrandIcon(b)}<span><b>Add to ${b === 'edge' ? 'Edge' : 'Chrome'}</b><small>${mine ? 'You’re using this browser' : n}</small></span></a>`;
}
function extSetupPaint() {
  const x = S.extSetup;
  if (!x) return;
  const role = persona().role,
    u = extUser(),
    linked = S.extLink.connected || u.sim;
  const mineEdge = /Edg\//.test(navigator.userAgent);
  let t, body, foot;
  if (x.step === 1) {
    t = 'Install the extension';
    body = `<p>Add the PeopleDesk Attendance extension to your browser. It takes about ten seconds.</p>
      ${S.extLink.installed ? `<div class="xa-ban tone-ok" role="status">${ic('check', 18)}<div><b>We found the extension</b><div class="small">Version ${esc(S.extLink.version || '1')} is installed. You can continue.</div></div></div>` : ''}
      <div class="xs-brs">${extBrandBtn(mineEdge ? 'edge' : 'chrome', 1)}${extBrandBtn(mineEdge ? 'chrome' : 'edge', 0)}</div>
      <p class="xs-both">${ic('help', 16)}<span><b>Use both Chrome and Edge?</b> Add it to each one. Then open PeopleDesk in that browser and connect there, once per browser.</span></p>
      <p class="muted small">Tip: after adding it, open the puzzle-piece menu in your toolbar and pin PeopleDesk so the badge stays in view. Already installed? Just continue.</p>`;
    foot = `<button class="btn" onclick="closeModal()">Not now</button><button class="btn primary" onclick="extStep(2)">Continue</button>`;
  } else if (x.step === 2) {
    t = 'Connect your account';
    body = `<p>Connect the extension to your PeopleDesk account so it can show your attendance. You stay signed in as <b>${esc(me().name)}</b>.</p>
      ${
        linked
          ? `<div class="xa-ban tone-ok" role="status">${ic('check', 18)}<div><b>Connected</b><div class="small">${esc(me().email)}${S.extLink.connected ? '' : ' · demo mode'}</div></div></div>`
          : x.busy
            ? `<div class="xa-ban tone-info" role="status"><span class="spin"></span><div><b>Connecting…</b></div></div>`
            : x.fail
              ? `<div class="xa-ban tone-warn" role="alert">${ic('alert', 18)}<div><b>We couldn’t find the extension</b><div class="small">Make sure it’s installed, then refresh this page and try again. To just try the experience, use demo mode.</div></div></div>`
              : ''
      }
      ${linked ? '' : `<div class="xs-stores"><button class="btn primary big" ${x.busy ? 'disabled' : ''} onclick="extConnect()">${x.fail ? 'Try again' : 'Connect to PeopleDesk'}</button>${x.fail ? `<button class="btn big" onclick="extDemoLink()">Use demo mode</button>` : ''}</div>`}`;
    foot = `<button class="btn" onclick="extStep(1)">Back</button><button class="btn primary" ${linked ? '' : 'disabled'} onclick="extStep(3)">Continue</button>`;
  } else if (x.step === 3) {
    t = 'Choose what to show';
    const fr = PDExt.FIELDS.map(([k, n, d]) => {
      const ok = extFieldOk(k, role);
      return extRow(
        n,
        ok ? d : 'Not available for your role',
        extSw(
          ok && extFieldOn(k, null, role),
          `extSetField('${k}',this.checked)`,
          n,
          !ok,
          'f-' + k
        ),
        !ok
      );
    }).join('');
    const rr = [
      ['in', 'Clock-in confirmation', 'A quick note when your day starts', true],
      ...PDExt.REMINDERS.map(r => [r[0], r[1], 'Shown once a day', extRemOk(r[0], role)])
    ]
      .map(([k, n, d, ok]) =>
        extRow(
          n,
          ok ? d : 'Not available for your role',
          extSw(ok && extRemOn(k, null, role), `extSetRem('${k}',this.checked)`, n, !ok, 'r-' + k),
          !ok
        )
      )
      .join('');
    body = `<p class="muted small" style="margin-bottom:8px">You can change any of this later in Profile, Preferences.</p><div class="list">${fr}${extRow('Toolbar badge', 'Show the time left on the icon, like “5h” or “42m”', extSw(!!u.badge, 'extSetBadge(this.checked)', 'Toolbar badge', false, 'badge'), false)}</div><h3 class="xa-h">Reminders</h3><div class="list">${rr}</div>`;
    foot = `<button class="btn" onclick="extStep(2)">Back</button><button class="btn primary" onclick="extFinish()">Finish setup</button>`;
  } else {
    t = 'You’re all set';
    const d = PDExt.demo('working'),
      m = PDExt.model(d.snap, d.now);
    body = `<div class="xs-done"><span class="xs-ok">${ic('check', 30)}</span><h3>The widget is on</h3><p>Next time you clock in, your logout time shows up in your toolbar. Nothing else to do.</p><div class="xs-art"><div class="xa-tbar"><span class="xa-url">${ic('search', 12)}</span>${PDExt.toolbarHTML(m)}</div><div class="xs-bub">${esc(m.tip)}</div></div></div>`;
    foot = `<button class="btn" onclick="closeModal();S.extSetup=null;S.tab.prof='prefs';go('profile')">Open preferences</button><button class="btn primary" onclick="closeModal();S.extSetup=null" autofocus>Done</button>`;
  }
  overlay(
    t,
    `<div id="xs">${x.step <= 3 ? extStepper(x.step) : ''}<div class="xs-b"><h2 class="sr" id="xs-h" tabindex="-1">${esc(t)}</h2>${body}</div></div>`,
    foot,
    { keepFocus: true }
  );
  const h = $('#xs-h');
  if (h) h.focus();
}
function extStep(n) {
  S.extSetup.step = n;
  S.extSetup.fail = S.extSetup.busy = 0;
  extSetupPaint();
}
function extConnect() {
  const x = S.extSetup;
  x.busy = 1;
  x.fail = 0;
  extSetupPaint();
  extConnectCb = ok => {
    clearTimeout(x.t);
    extConnectCb = null;
    x.busy = 0;
    if (S.extSetup === x) extSetupPaint();
  };
  extPost('connect', { name: me().name, hrms: location.href.split('#')[0] });
  x.t = setTimeout(() => {
    extConnectCb = null;
    x.busy = 0;
    x.fail = 1;
    if (S.extSetup === x) extSetupPaint();
  }, 1400);
}
function extDemoLink() {
  extUser().sim = 1;
  persist();
  S.extSetup.fail = 0;
  extSetupPaint();
}
function extFinish() {
  const u = extUser();
  u.optIn = true;
  u.prompt = 'done';
  persist();
  extPublish();
  S.extSetup.step = 4;
  extSetupPaint();
}

/* js/features/hours/hours-page.js */
/* =====================================================================
   Hours and overtime: the page and its tabs
   Hours · Overtime · Extra time (ledger) · Holiday work · My requests · Team approvals
   Answer in three seconds: the four cards under the period switcher say how much was worked,
   what was expected, the difference and the overtime.
   ===================================================================== */
S.hx = {
  per: 'week',
  off: 0,
  f: { mon: '', st: 'all', cat: 'all' },
  tf: { who: 'all', wk: 'all' },
  sel: []
};
const hxChip = code => chip(OT_ST[code][0], OT_ST[code][1]);
const hxApChip = en => {
  const a = entApproval(en);
  return chip(a[0], a[1]);
};
const hxTag = r =>
  ({
    work: ['Working day', 'ok'],
    holwork: ['Holiday work', 'info'],
    offwork: ['Weekly-off work', 'info'],
    leave: ['Leave', 'warn'],
    absent: ['Absent', 'bad'],
    holiday: ['Holiday', 'mute'],
    weekoff: ['Weekly off', 'mute'],
    notin: ['Not clocked in', 'mute'],
    none: ['Not joined', 'mute'],
    future: ['Upcoming', 'mute']
  })[r.tag] || ['', 'mute'];
const hxTagChip = r => {
  const t = hxTag(r);
  return t[0] ? chip(r.miss ? 'Punch-out missing' : t[0], r.miss ? 'warn' : t[1]) : '';
};
const hxSrc = s => (s ? `<span class="hx-src">${esc(s)}</span>` : '');
const hxEmpty = (icon, title, text, act) =>
  `<div class="hx-state"><span class="hx-si">${ic(icon, 26)}</span><h3>${title}</h3><p>${text}</p>${act || ''}</div>`;
const hxError = () =>
  `<div class="hx-state err" role="alert"><span class="hx-si">${ic('alert', 26)}</span><h3>We couldn’t load your hours</h3><p>This is on our side. Your attendance is safe and nothing has changed.</p><button class="btn primary" onclick="S.hrsForce='';render()">Try again</button></div>`;
const hxSkeleton = () =>
  `<div class="hx-sk" role="status" aria-busy="true" aria-label="Loading your hours"><div class="hx-cards">${'<i class="c"></i>'.repeat(4)}</div><i class="b"></i><i class="b s"></i></div>`;
const hxMe = () => {
  const e = me(),
    ents = otEntries(e.id);
  return { e, ents, bal: otBalance(ents) };
};
const hxPlain = (en, k) => (en[k] != null ? en[k] : '');

function hoursPage() {
  otInit();
  const mgr = isMgr() && can('hours', 'approve'),
    pend = mgr ? teamPending().length : 0,
    tl = [
      ['hours', 'Hours'],
      ['ot', 'Overtime'],
      ['bal', 'Extra time'],
      ['off', 'Holiday work'],
      ['req', 'My requests']
    ];
  if (mgr) tl.push(['team', 'Team approvals' + (pend ? ` (${pend})` : '')]);
  const cur = tl.some(x => x[0] === S.tab.hr) ? S.tab.hr : 'hours';
  S.tab.hr = cur;
  let body,
    avail = 0;
  try {
    if (S.hrsForce === 'error') throw new Error('forced');
    if (S.hrsForce === 'loading') body = hxSkeleton();
    else {
      const d = hxMe();
      avail = d.bal.avail;
      body = { hours: hxHours, ot: hxOt, bal: hxBal, off: hxOff, req: hxReq, team: hxTeam }[cur](d);
    }
  } catch (err) {
    body = hxError();
  }
  const act = `<button class="btn primary" ${avail ? '' : 'disabled title="You have no approved extra time to use yet"'} onclick="otUse()">${ic('swap', 16)}Use my extra time</button>`;
  return (
    ph('Hours and overtime', 'Your worked hours, extra time and what you can do with it', act) +
    `<div class="card hx"><div class="head">${tabs('hr', tl, 'hours')}</div>${body}</div>`
  );
}

/* ---------- Hours: period switcher, four cards, then today, week or month ---------- */
function hxPer(k) {
  S.hx.per = k;
  S.hx.off = 0;
  render();
}
function hxNav(n) {
  const lim = S.hx.per === 'week' ? -26 : -11;
  S.hx.off = Math.max(lim, Math.min(0, S.hx.off + n));
  render();
}
function hxCards(sm, per) {
  const d = sm.diff,
    card = (cls, l, v, sub, icon) =>
      `<div class="hx-cd ${cls}"><div class="hx-cl">${icon ? ic(icon, 16) : ''}${l}</div><div class="hx-cv">${v}</div><div class="hx-cs">${sub}</div></div>`;
  return `<div class="hx-cards" role="group" aria-label="Summary">
    ${card('', 'Worked hours', fhm(sm.worked), sm.live ? 'Including today so far' : sm.offMin ? `Plus ${fhm(sm.offMin)} on holidays and weekly offs` : 'On working days', 'clock')}
    ${card('', 'Expected hours', fhm(sm.exp), per === 'month' ? 'To date, after the daily break' : 'After the daily break', 'cal')}
    ${card(d >= 0 ? 'up' : 'dn', 'Difference', fsg(d), d >= 0 ? 'Ahead of what was expected' : 'Behind what was expected', d >= 0 ? 'up' : 'dn')}
    ${card('ot', 'Overtime', fhm(sm.ot), `Weekday ${fhm(sm.otWk)} · Holiday and off ${fhm(sm.otOff)}`, 'chart')}
  </div>`;
}
function hxHours(d) {
  const per = S.hx.per,
    pd = hrsPeriod(per, S.hx.off),
    sm = hrsSummary(d.e.id, pd.days, d.ents);
  const seg = [
    ['today', 'Today'],
    ['week', 'This week'],
    ['month', 'This month']
  ];
  const bar = `<div class="hx-top"><div class="hx-seg" role="group" aria-label="Period">${seg.map(([k, n]) => `<button type="button" aria-pressed="${k === per}" onclick="hxPer('${k}')">${n}</button>`).join('')}</div>
    ${per === 'today' ? `<span class="hx-pl">${esc(pd.label)}</span>` : `<div class="hx-pn"><button class="icon-btn" aria-label="Previous ${per}" onclick="hxNav(-1)">${ic('arrow', 16).replace('<svg', '<svg style="transform:rotate(180deg)"')}</button><span class="hx-pl" aria-live="polite">${esc(pd.label)}</span><button class="icon-btn" aria-label="Next ${per}" ${S.hx.off >= 0 ? 'disabled' : ''} onclick="hxNav(1)">${ic('arrow', 16)}</button></div>`}</div>`;
  return `<div class="hx-body">${bar}${hxCards(sm, per)}${per === 'today' ? hxToday(sm) : per === 'week' ? hxWeek(sm) : hxMonth(sm, pd)}</div>`;
}
function hxToday(sm) {
  const r = sm.rows[0],
    P = otPolFor(r.o.e);
  if (r.tag === 'notin' || (r.tag === 'work' && r.in == null))
    return `<div class="hx-panel">${hxEmpty('clock', 'You haven’t clocked in yet', 'Your hours start counting when you clock in from the app, a biometric device or the web.', `<button class="btn primary" onclick="toggleClock()">Clock in</button>`)}</div>`;
  if (r.off && !r.cat)
    return `<div class="hx-panel">${hxEmpty('cal', r.label, 'Today is not a working day, so nothing is expected.', '')}</div>`;
  if (r.tag === 'leave' || r.tag === 'absent')
    return `<div class="hx-panel">${hxEmpty('cal', r.tag === 'leave' ? 'On leave today' : 'No punch recorded', r.tag === 'leave' ? r.label : 'If this is wrong, raise a query from Attendance.', '')}</div>`;
  const span = r.o.end - r.o.start,
    pct = r.exp ? Math.min(100, Math.round((r.worked / r.exp) * 100)) : 0,
    left = Math.max(0, r.exp - r.worked);
  const f = (l, v, x = '') => `<div class="hx-f"><dt>${l}</dt><dd>${v}${x}</dd></div>`;
  return `<div class="hx-panel hx-today">
   <dl class="hx-facts">
    ${f('Clock in', tm(r.in), hxSrc(r.src))}
    ${f('Clock out', r.live ? '<span class="hx-live">In progress</span>' : tm(r.out))}
    ${f('Break', fhm(r.brk || P.breakMin), '<small>Deducted automatically</small>')}
    ${f('Worked so far', fhm(r.worked))}
    ${f('Expected logout', tm(r.in + span))}
    ${f('Overtime so far', fhm(r.ot))}
   </dl>
   <div class="hx-pg"><div class="hx-track" role="progressbar" aria-label="Worked today against expected" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-valuetext="${fhm(r.worked)} of ${fhm(r.exp)}"><i style="width:${pct}%"></i></div>
    <div class="hx-pgl"><span>${fhm(r.worked)} worked of ${fhm(r.exp)}</span><span>${r.ot ? 'Overtime ' + fhm(r.ot) : left ? fhm(left) + ' to go' : 'Expected hours done'}</span></div></div>
   <div class="hx-acts"><button class="btn" onclick="hrsOpen('${r.iso}')">Today’s details</button></div>
  </div>`;
}
/* the bar chart is plain HTML, so it prints, scales and reads out; the same numbers are in the table below */
function hxWeek(sm) {
  const max = Math.max(720, ...sm.rows.map(r => r.worked)),
    top = Math.ceil(max / 180) * 180,
    pc = v => ((v / top) * 100).toFixed(1) + '%';
  const cols = sm.rows
    .map(r => {
      const fut = r.dt > TODAY,
        ot = r.cat === 'weekday' ? (r.en ? r.en.min : r.live ? r.ot : 0) : 0,
        regular = r.off ? 0 : Math.max(0, r.worked - ot),
        offw = r.off && r.cat ? r.worked : 0,
        tg = hxTag(r),
        sr = `${fddy(r.dt)}, ${tg[0]}${fut ? '' : ', ' + fhm(r.worked) + ' worked' + (r.exp ? ', ' + fhm(r.exp) + ' expected' : '') + (r.ot ? ', ' + fhm(r.ot) + ' overtime' : '')}. Open details`;
      return `<button class="hx-col${r.dt.getTime() === TODAY.getTime() ? ' today' : ''}${fut ? ' fut' : ''}" onclick="hrsOpen('${r.iso}')" aria-label="${esc(sr)}">
       <span class="hx-val">${fut || !r.worked ? '–' : fhm(r.worked)}</span>
       <span class="hx-plot">${r.exp && !fut ? `<i class="hx-exp" style="bottom:${pc(r.exp)}" title="Expected ${fhm(r.exp)}"></i>` : ''}<span class="hx-stack">${ot ? `<i class="hx-ot" style="height:${pc(ot)}"></i>` : ''}${regular ? `<i class="hx-reg" style="height:${pc(regular)}"></i>` : ''}${offw ? `<i class="hx-offw" style="height:${pc(offw)}"></i>` : ''}</span></span>
       <span class="hx-dn"><b>${DOWN[r.dt.getDay()].slice(0, 3)}</b>${r.dt.getDate()}</span>
       <span class="hx-tg">${esc(tg[0] === 'Working day' ? (r.ot ? '+' + fhm(r.ot) : '') : tg[0])}</span></button>`;
    })
    .join('');
  const grid = [0, 1, 2, 3]
    .map(
      i => `<i style="bottom:${(i * 25).toFixed(0)}%"><b>${Math.round((top * i) / 4 / 60)}h</b></i>`
    )
    .join('');
  return `<div class="hx-panel"><div class="hx-ch"><h3>Hours per day</h3><div class="hx-leg" aria-hidden="true"><span><i class="k reg"></i>Worked</span><span><i class="k ot"></i>Overtime</span><span><i class="k offw"></i>Holiday or off work</span><span><i class="k exp"></i>Expected</span></div></div>
    <div class="hx-chart" role="group" aria-label="Bar chart of hours worked each day. The same numbers are in the table below."><div class="hx-grid" aria-hidden="true">${grid}</div><div class="hx-cols">${cols}</div></div>
    <p class="hx-tot"><b>Week total</b> ${fhm(sm.worked)} worked · ${fhm(sm.ot)} overtime${sm.short ? ` · ${sm.short} day${sm.short > 1 ? 's' : ''} short on hours` : ''}</p>
    ${hxAlt(sm)}</div>`;
}
function hxAlt(sm) {
  const rows = sm.rows
    .filter(r => r.dt <= TODAY)
    .map(r => ({
      cells: [
        fdd(r.dt),
        hxTagChip(r),
        r.worked ? fhm(r.worked) : '–',
        r.exp ? fhm(r.exp) : '–',
        r.ot ? fhm(r.ot) : '–',
        `<button class="btn sm" onclick="hrsOpen('${r.iso}')">Details</button>`
      ]
    }));
  return `<details class="hx-alt"><summary>View as a table</summary>${rtable([{ h: 'Day', keep: 1 }, { h: 'Type' }, { h: 'Worked', c: 'num' }, { h: 'Expected', c: 'num', xm: 1 }, { h: 'Overtime', c: 'num' }, { h: '', act: 1 }], rows, { et: 'No days yet' })}</details>`;
}
function hxMonth(sm, pd) {
  const first = (pd.a.getDay() + 6) % 7,
    cells = [];
  for (let i = 0; i < first; i++) cells.push('<i></i>');
  sm.rows.forEach(r => {
    const fut = r.dt > TODAY,
      ot = r.cat === 'weekday' ? (r.en ? r.en.min : r.ot) : 0,
      tg = hxTag(r);
    let lv = 'f',
      txt = '',
      mark = '';
    if (!fut)
      if (r.tag === 'work') {
        lv = r.live ? 'm' : ot ? 'o' : r.worked - r.exp <= -15 ? 's' : 'm';
        txt = fhm(r.worked);
        mark = ot ? '+' + fhm(ot) : lv === 's' ? '▼ ' + fhm(r.worked - r.exp) : '';
      } else if (r.cat) {
        lv = 'w';
        txt = fhm(r.worked);
        mark = r.tag === 'holwork' ? 'Holiday work' : 'Off-day work';
      } else {
        lv =
          { leave: 'l', absent: 'a', holiday: 'x', weekoff: 'x', none: 'n', notin: 'f' }[r.tag] ||
          'f';
        mark =
          r.tag === 'holiday'
            ? 'Holiday'
            : r.tag === 'weekoff'
              ? 'Off'
              : r.tag === 'leave'
                ? 'Leave'
                : r.tag === 'absent'
                  ? 'Absent'
                  : '';
      }
    const sr = `${fddy(r.dt)}, ${tg[0]}${txt ? ', ' + txt + ' worked' : ''}${ot ? ', ' + fhm(ot) + ' overtime' : ''}. Open details`;
    cells.push(
      fut || r.tag === 'none'
        ? `<div class="hx-hc ${lv}" aria-hidden="true"><b>${r.dt.getDate()}</b></div>`
        : `<button class="hx-hc ${lv}${r.dt.getTime() === TODAY.getTime() ? ' today' : ''}" onclick="hrsOpen('${r.iso}')" aria-label="${esc(sr)}"><b>${r.dt.getDate()}</b><span class="v">${txt}</span><span class="m">${esc(mark)}</span></button>`
    );
  });
  const shorts = sm.rows.filter(
    r => !r.off && r.tag === 'work' && !r.live && r.worked - r.exp <= -15 && r.dt <= TODAY
  );
  return `<div class="hx-panel"><div class="hx-ch"><h3>${monLbl(pd.a)}</h3><div class="hx-leg" aria-hidden="true"><span><i class="k m"></i>Met expected</span><span><i class="k s"></i>▼ Short</span><span><i class="k o"></i>+ Overtime</span><span><i class="k w"></i>Holiday or off work</span><span><i class="k l"></i>Leave</span><span><i class="k a"></i>Absent</span></div></div>
   <div class="hx-heat" role="group" aria-label="Calendar of hours worked each day. The same numbers are in the table below."><div class="hx-hd" aria-hidden="true">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<span>${x}</span>`).join('')}</div><div class="hx-hg">${cells.join('')}</div></div>
   <p class="hx-tot"><b>Month total</b> ${fhm(sm.worked)} worked · ${fhm(sm.ot)} overtime · ${sm.short} day${sm.short === 1 ? '' : 's'} short on hours</p>
   ${
     shorts.length
       ? `<div class="hx-shorts"><span class="muted small">Short on hours:</span>${shorts
           .slice(0, 8)
           .map(
             r =>
               `<button class="hx-sh" onclick="hrsOpen('${r.iso}')">${fdd(r.dt)} <b>${fsg(r.worked - r.exp)}</b></button>`
           )
           .join('')}</div>`
       : ''
   }
   ${hxAlt(sm)}</div>`;
}

/* ---------- day detail ---------- */
function hrsOpen(isoStr, empId) {
  empId = empId || me().id;
  const dt = isoD(isoStr),
    r = hrsDay(empId, dt),
    e = r.o.e,
    ent = otEntries(empId).find(x => x.iso === isoStr),
    P = otPolFor(e),
    self = empId === me().id,
    tg = hxTag(r);
  let body = `<div class="hx-dh">${hxTagChip(r)}${ent ? hxApChip(ent) : ''}</div>`;
  if (r.in != null) {
    const out = r.live ? 'In progress' : r.out != null ? tm(r.out) : 'Missing';
    body += `<h3 class="hx-h3">Punches</h3><ol class="hx-tl">
      <li><span class="d"></span><div><b>Clock in · ${tm(r.in)}</b>${hxSrc(r.src)}</div></li>
      ${r.brk ? `<li><span class="d"></span><div><b>Break · ${fhm(r.brk)}</b><small>Deducted automatically</small></div></li>` : ''}
      <li><span class="d${r.live ? ' live' : ''}"></span><div><b>Clock out · ${out}</b>${r.miss ? '<small>No punch-out was recorded</small>' : ''}</div></li></ol>`;
    if (!r.miss)
      body += `<h3 class="hx-h3">Worked and expected</h3><div class="hx-cmp"><div><span>Worked</span><b>${fhm(r.worked)}</b></div><div><span>Expected</span><b>${fhm(r.exp)}</b></div><div class="${r.worked - r.exp >= 0 ? 'up' : 'dn'}"><span>Difference</span><b>${fsg(r.worked - r.exp)}</b></div></div>`;
  } else
    body += `<p class="muted">${esc(r.label || tg[0])}. ${r.tag === 'absent' ? 'No punches were recorded for this day.' : r.off ? 'Not a working day, so no hours are expected.' : ''}</p>`;
  if (ent) {
    const st = entStatus(ent),
      pm = payMonth(ent.iso, ent.P);
    body += `<h3 class="hx-h3">Overtime</h3><dl class="hx-kv">
      <div><dt>Hours</dt><dd><b>${fhm(ent.min)}</b>${ent.capped ? '<small>Capped by the weekly limit</small>' : ''}</dd></div>
      <div><dt>Category</dt><dd>${OT_CAT[ent.cat]}</dd></div>
      <div><dt>Rate</dt><dd>${ent.rate}×</dd></div>
      <div><dt>Status</dt><dd>${hxChip(st)}</dd></div>
      ${st === 'comp' || st === 'expired' ? '' : `<div><dt>Estimated pay</dt><dd>${inr(otPay(ent))} <small>Estimate, confirmed by payroll</small></dd></div><div><dt>Payroll month</dt><dd>${pm.label}</dd></div>`}
      ${st === 'available' ? `<div><dt>Expires</dt><dd>${fddy(isoD(ent.expiry))}</dd></div>` : ''}</dl>`;
  } else if (r.ot === 0 && r.otRaw && r.tag === 'work')
    body += `<p class="muted small">${fhm(r.otRaw)} past shift end is under the ${P.minMin} minute minimum, so no overtime is recorded.</p>`;
  const askBtn =
    ent && self && ent.st === 'auto'
      ? `<button class="btn primary" onclick="closeModal();otAsk(['${ent.key}'])">Request overtime approval</button>`
      : ent && self && entStatus(ent) === 'available'
        ? `<button class="btn primary" onclick="closeModal();otUse(['${ent.key}'])">Use this extra time</button>`
        : '';
  overlay(
    fddy(dt),
    body,
    `<button class="btn" onclick="closeModal();attReg('${empId}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})">Raise a query / regularize</button>${askBtn}`,
    { side: true }
  );
}

/* ---------- Overtime ---------- */
const hxMonths = () =>
  [0, 1, 2, 3, 4, 5].map(i => {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1);
    return [d.getFullYear() + '-' + pad(d.getMonth() + 1), monLbl(d)];
  });
function hxF(k, v) {
  S.hx.f[k] = v;
  render();
}
const hxSum = (ents, f) => ents.filter(f).reduce((a, x) => a + x.min, 0);
function hxOt(d) {
  const f = S.hx.f,
    mon = f.mon || hxMonths()[0][0],
    ws = iso(wkStart(TODAY)),
    all = d.ents,
    mine = all
      .filter(
        x =>
          x.iso.slice(0, 7) === mon &&
          (f.cat === 'all' || x.cat === f.cat) &&
          (f.st === 'all' || entApproval(x)[0].toLowerCase().startsWith(f.st))
      )
      .reverse();
  const live = hrsDay(d.e.id, TODAY),
    todayOt = live.live ? live.ot : 0,
    wk = hxSum(all, x => x.iso >= ws) + todayOt,
    mo = hxSum(all, x => x.iso.slice(0, 7) === iso(TODAY).slice(0, 7)) + todayOt,
    split = c =>
      hxSum(
        all,
        x =>
          x.iso.slice(0, 7) === mon && (c === 'weekday' ? x.cat === 'weekday' : x.cat !== 'weekday')
      ),
    pay = c =>
      all
        .filter(
          x =>
            x.iso.slice(0, 7) === mon &&
            (c === 'weekday' ? x.cat === 'weekday' : x.cat !== 'weekday') &&
            ['auto', 'pending', 'approved'].includes(x.st)
        )
        .reduce((a, x) => a + otPay(x), 0);
  const stat = (l, v, s) =>
    `<div class="hx-cd ot"><div class="hx-cl">${l}</div><div class="hx-cv">${v}</div><div class="hx-cs">${s}</div></div>`;
  const rows = mine.map(en => {
    const st = entStatus(en),
      pm = payMonth(en.iso, en.P),
      act =
        en.st === 'auto'
          ? `<button class="btn sm primary" onclick="event.stopPropagation();otAsk(['${en.key}'])">Request approval</button>`
          : st === 'available'
            ? `<button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'])">Use</button>`
            : `<button class="btn sm" onclick="hrsOpen('${en.iso}')">Details</button>`;
    return {
      click: `hrsOpen('${en.iso}')`,
      cells: [
        `<b>${fddy(en.dt)}</b>`,
        `<b>${fhm(en.min)}</b>`,
        OT_CAT[en.cat],
        en.rate + '×',
        hxApChip(en) +
          (en.use && st !== 'available' ? ` <span class="muted small">${OT_ST[st][0]}</span>` : ''),
        ['comp', 'expired', 'rejected'].includes(st)
          ? '<span class="muted">–</span>'
          : `<b>${inr(otPay(en))}</b> <span class="muted small">· ${pm.label} payroll</span>`,
        act
      ]
    };
  });
  const autos = mine.filter(x => x.st === 'auto').length;
  return `<div class="hx-body"><div class="hx-cards c3">${stat('This week', fhm(wk), 'Weekday, holiday and off-day work')}${stat('This month', fhm(mo), monLbl(TODAY))}${stat('Selected month', fhm(split('weekday') + split('x')), `Weekday ${fhm(split('weekday'))} · Holiday and off ${fhm(split('x'))}`)}</div>
   <div class="hx-est"><div><span>Weekday overtime</span><b>${fhm(split('weekday'))}</b><em>${inr(pay('weekday'))}</em></div><div><span>Holiday and weekly-off work</span><b>${fhm(split('x'))}</b><em>${inr(pay('x'))}</em></div><p class="muted small">Estimate, confirmed by payroll. Based on your basic pay and the rate for each category.</p></div>
   <div class="hx-filters"><div class="field"><label for="hf-m">Month</label><select id="hf-m" onchange="hxF('mon',this.value)">${hxMonths()
     .map(([v, n]) => `<option value="${v}" ${v === mon ? 'selected' : ''}>${n}</option>`)
     .join('')}</select></div>
    <div class="field"><label for="hf-s">Status</label><select id="hf-s" onchange="hxF('st',this.value)">${[
      ['all', 'All'],
      ['auto', 'Auto-calculated'],
      ['pending', 'Pending'],
      ['approved', 'Approved'],
      ['rejected', 'Rejected']
    ]
      .map(([v, n]) => `<option value="${v}" ${f.st === v ? 'selected' : ''}>${n}</option>`)
      .join('')}</select></div>
    <div class="field"><label for="hf-c">Category</label><select id="hf-c" onchange="hxF('cat',this.value)">${[
      ['all', 'All'],
      ['weekday', 'Weekday overtime'],
      ['holiday', 'Holiday work'],
      ['off', 'Weekly-off work']
    ]
      .map(([v, n]) => `<option value="${v}" ${f.cat === v ? 'selected' : ''}>${n}</option>`)
      .join('')}</select></div>
    ${autos ? `<button class="btn" onclick="otAsk(${JSON.stringify(mine.filter(x => x.st === 'auto').map(x => x.key)).replace(/"/g, "'")})">Request approval for ${autos} auto-calculated</button>` : ''}</div>
   ${rows.length ? rtable([{ h: 'Date', keep: 1 }, { h: 'Hours', c: 'num' }, { h: 'Category', xm: 1 }, { h: 'Rate', c: 'num', xm: 1 }, { h: 'Status' }, { h: 'Estimate and payroll month' }, { h: '', act: 1 }], rows, {}) : hxEmpty('inbox', all.length ? 'Nothing matches these filters' : 'No overtime yet', all.length ? 'Try another month or clear a filter.' : 'When you work past your shift end, the extra time shows up here by itself.', '')}</div>`;
}

/* ---------- Extra time: balance cards and ledger ---------- */
function hxBal(d) {
  const b = d.bal,
    cd = (l, v, s, cls) =>
      `<div class="hx-cd ${cls || ''}"><div class="hx-cl">${l}</div><div class="hx-cv">${fhm(v)}</div><div class="hx-cs">${s}</div></div>`,
    P = otPolFor(d.e),
    dys = m => {
      const c = compDays(m, P);
      return c.days ? '≈ ' + fdy(c.days) + ' of comp-off' : 'Under a half day';
    };
  const soon = b.soonList[0],
    daysTo = soon ? Math.round((isoD(soon.expiry) - TODAY) / 864e5) : 0;
  const rows = d.ents
    .slice()
    .reverse()
    .filter(x => x.st === 'approved')
    .map(en => {
      const st = entStatus(en),
        left = Math.round((isoD(en.expiry) - TODAY) / 864e5);
      return {
        click: `hrsOpen('${en.iso}')`,
        cells: [
          `<b>${fddy(en.dt)}</b>`,
          `<b>${fhm(en.min)}</b>`,
          OT_CAT[en.cat],
          fddy(isoD(en.expiry)) +
            (st === 'available'
              ? `<div class="muted small">${left < 0 ? 'Expired' : left === 0 ? 'Today' : 'in ' + left + ' day' + (left === 1 ? '' : 's')}</div>`
              : ''),
          hxChip(st),
          st === 'available'
            ? `<button class="btn sm primary" onclick="event.stopPropagation();otUse(['${en.key}'])">Use</button>`
            : ''
        ]
      };
    });
  return `<div class="hx-body"><div class="hx-cards">${cd('Available to use', b.avail, dys(b.avail), 'ok')}${cd('Pending approval', b.pend, 'Waiting for your manager')}${cd('Used', b.used, 'As comp-off or paid')}${cd('Expiring soon', b.soon, 'Within 14 days', b.soon ? 'warnc' : '')}</div>
   ${b.soon ? `<div class="hx-ban warn" role="alert">${ic('alert', 18)}<div class="grow"><b>${fhm(b.soon)} will expire soon</b><div class="small">The earliest, ${fhm(soon.min)} earned on ${fdd(soon.dt)}, expires on ${fddy(isoD(soon.expiry))} (${daysTo <= 0 ? 'today' : 'in ' + daysTo + ' day' + (daysTo === 1 ? '' : 's')}). Use it as comp-off or extra pay before then.</div></div><button class="btn sm primary" onclick="otUse(${JSON.stringify(b.soonList.map(x => x.key)).replace(/"/g, "'")})">Use now</button></div>` : ''}
   <div class="hx-sec"><h3>Ledger</h3><span class="muted small">Comp-off expires ${P.comp.expiry} days after the day it was earned.</span></div>
   ${rows.length ? rtable([{ h: 'Date earned', keep: 1 }, { h: 'Hours', c: 'num' }, { h: 'Source', xm: 1 }, { h: 'Expires' }, { h: 'Status' }, { h: '', act: 1 }], rows, {}) : hxEmpty('inbox', 'No extra time yet', 'Approved overtime and holiday work are added here, with the date they expire.', `<button class="btn" onclick="S.tab.hr='ot';render()">See overtime</button>`)}</div>`;
}

/* ---------- Holiday and weekly-off work ---------- */
function hxOff(d) {
  const ents = d.ents.filter(x => x.cat !== 'weekday').reverse(),
    P = otPolFor(d.e);
  const rows = ents.map(en => {
    const st = entStatus(en),
      c = compDays(en.min, P),
      act =
        en.st === 'auto'
          ? `<button class="btn sm primary" onclick="event.stopPropagation();otAsk(['${en.key}'])">Request approval</button>`
          : st === 'available'
            ? `<div class="hx-btns"><button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'],'comp')">Comp-off</button><button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'],'pay')">Extra pay</button></div>`
            : '';
    return {
      click: `hrsOpen('${en.iso}')`,
      cells: [
        `<b>${fddy(en.dt)}</b>`,
        esc(en.label),
        `<b>${fhm(en.min)}</b>`,
        c.days ? fdy(c.days) : 'Under a half day',
        en.rate + '×',
        hxChip(st) +
          (st === 'available' || st === 'auto' || st === 'pending'
            ? `<div class="muted small">${payMonth(en.iso, en.P).label} payroll if paid</div>`
            : ''),
        act
      ]
    };
  });
  return `<div class="hx-body"><div class="hx-ban info">${ic('help', 18)}<div class="grow">Work on a holiday or a weekly off is recorded separately, at <b>${P.rate.holiday}×</b> for holidays and <b>${P.rate.off}×</b> for weekly offs. ${P.approve.holiday ? 'Your manager approves it first, then ' : 'Then '}you can take it as comp-off (${P.comp.half}h is a half day, ${P.comp.full}h a full day) or as extra pay.</div></div>
   ${rows.length ? rtable([{ h: 'Date', keep: 1 }, { h: 'Holiday or day' }, { h: 'Hours worked', c: 'num' }, { h: 'Equals', xm: 1 }, { h: 'Rate', c: 'num', xm: 1 }, { h: 'Status' }, { h: '', act: 1 }], rows, {}) : hxEmpty('cal', 'No holiday or weekly-off work', 'If you work on a holiday or a weekly off, it is listed here with the days it earns.', '')}</div>`;
}

/* ---------- My requests ---------- */
function hxTimeline(r) {
  const done = r.status === 'Approved',
    rej = r.status === 'Rejected',
    can_ = r.status === 'Cancelled',
    last =
      r.type === 'CO'
        ? 'Comp-off credited'
        : r.type === 'PY'
          ? `Paid in ${r.month || 'payroll'}`
          : 'Added to your balance',
    steps = [
      ['Submitted', 'done', fdd(isoD(r.at.slice(0, 10)))],
      [
        'Manager review',
        r.status === 'Pending' ? 'now' : 'done',
        r.status === 'Pending'
          ? 'Waiting for ' + (emp(r.by) ? emp(r.by).name : 'your manager')
          : r.decAt
            ? fdd(isoD(r.decAt.slice(0, 10)))
            : ''
      ],
      rej
        ? ['Rejected', 'bad', r.comment || '']
        : can_
          ? ['Cancelled', 'bad', '']
          : ['Approved', done ? 'done' : '', ''],
      rej || can_
        ? null
        : [last, done && r.type !== 'PY' ? 'done' : '', r.type === 'PY' && done ? 'Scheduled' : '']
    ].filter(Boolean);
  return `<ol class="hx-steps" aria-label="Request progress">${steps.map(([n, s, x]) => `<li class="${s}"><span class="n">${s === 'done' ? ic('check', 14) : s === 'bad' ? ic('x', 14) : ''}</span><div><b>${esc(n)}</b>${x ? `<small>${esc(x)}</small>` : ''}</div></li>`).join('')}</ol>`;
}
function hxReq(d) {
  const list = S.ot.reqs.filter(r => r.emp === d.e.id);
  if (!list.length)
    return `<div class="hx-body">${hxEmpty('receipt', 'No requests yet', 'When you ask for overtime approval or use extra time, you can follow it here.', `<button class="btn" onclick="S.tab.hr='ot';render()">See overtime</button>`)}</div>`;
  const tone = { Pending: 'warn', Approved: 'ok', Rejected: 'bad', Cancelled: 'mute' };
  return `<div class="hx-body"><div class="hx-reqs">${list
    .map(r => {
      const ents = r.keys.map(k => k.split('|')[1]).sort(),
        what =
          r.type === 'OT'
            ? 'Approval for ' + (OT_CAT[r.cat] || 'overtime').toLowerCase()
            : r.type === 'CO'
              ? `Comp-off, ${fdy(r.days)}${r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : ''}`
              : `Extra pay, ${inr(r.amount)} in ${r.month} payroll`;
      return `<article class="hx-rq"><header><div><b>${OT_PREFIX[r.type]}</b> <span class="muted">${r.id}</span></div>${chip(r.status, tone[r.status])}</header>
      <p class="hx-rl"><b>${fhm(r.min)}</b> · ${ents.length > 1 ? ents.length + ' days' : fdd(isoD(ents[0]))} · ${esc(what)}</p>${hxTimeline(r)}
      ${r.status === 'Pending' ? `<div class="hx-acts"><button class="btn sm" onclick="otCancelAsk('${r.id}')">Cancel request</button></div>` : ''}</article>`;
    })
    .join('')}</div></div>`;
}

/* ---------- Manager: approvals queue ---------- */
const teamPending = () => {
  const ids = scoped('hours').map(e => e.id);
  return S.ot.reqs.filter(r => r.status === 'Pending' && r.emp !== me().id && ids.includes(r.emp));
};
function hxT(k, v) {
  S.hx.tf[k] = v;
  S.hx.sel = [];
  render();
}
function hxPick(id, on) {
  S.hx.sel = S.hx.sel.filter(x => x !== id);
  if (on) S.hx.sel.push(id);
  render();
}
function hxTeam() {
  const tf = S.hx.tf,
    all = teamPending(),
    ws = iso(wkStart(TODAY)),
    pw = iso(addD(wkStart(TODAY), -7)),
    inWk = r => {
      const d = r.keys[0].split('|')[1];
      return tf.wk === 'all' || (tf.wk === 'this' ? d >= ws : d >= pw && d < ws);
    },
    list = all.filter(r => (tf.who === 'all' || r.emp === tf.who) && inWk(r));
  S.hx.sel = S.hx.sel.filter(id => list.some(r => r.id === id));
  const people = [...new Set(all.map(r => r.emp))].map(id => emp(id));
  const rows = list.map(r => {
    const e = emp(r.emp),
      dts = r.keys.map(k => k.split('|')[1]).sort(),
      en = r.type === 'OT' ? otEntries(r.emp).find(x => x.key === r.keys[0]) : null,
      det =
        r.type === 'OT' && en
          ? `${tm(en.in)} to ${tm(en.out)} ${hxSrc(en.src)}`
          : r.type === 'CO'
            ? `${fdy(r.days)}${r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : ''}`
            : `${inr(r.amount)} in ${esc(r.month)} payroll`;
    return {
      cells: [
        `<label class="hx-ck"><input type="checkbox" ${S.hx.sel.includes(r.id) ? 'checked' : ''} aria-label="Select ${esc(e.name)}, ${r.id}" onchange="hxPick('${r.id}',this.checked)"><span class="person">${av(e.name, 30)}<span><b>${esc(e.name)}</b><span>${esc(e.title)}</span></span></span></label>`,
        `${OT_PREFIX[r.type]} <span class="muted small">${r.id}</span>`,
        dts.length > 1 ? dts.length + ' days' : fdd(isoD(dts[0])),
        `<b>${fhm(r.min)}</b>`,
        r.cat === 'mixed' ? 'Mixed' : OT_CAT[r.cat] || '–',
        esc(r.reason || '–'),
        det,
        `<div class="hx-btns"><button class="btn sm primary" onclick="otApprove('${r.id}')">Approve</button><button class="btn sm" onclick="otRejectAsk('${r.id}')">Reject</button></div>`
      ]
    };
  });
  const n = S.hx.sel.length;
  return `<div class="hx-body"><div class="hx-filters"><div class="field"><label for="tf-w">Team member</label><select id="tf-w" onchange="hxT('who',this.value)"><option value="all">Everyone</option>${people.map(p => `<option value="${p.id}" ${tf.who === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>
    <div class="field"><label for="tf-k">Week</label><select id="tf-k" onchange="hxT('wk',this.value)">${[
      ['all', 'Any week'],
      ['this', 'This week'],
      ['last', 'Last week']
    ]
      .map(([v, l]) => `<option value="${v}" ${tf.wk === v ? 'selected' : ''}>${l}</option>`)
      .join('')}</select></div>
    <div class="hx-bulk" role="group" aria-label="Bulk actions"><span class="muted small" aria-live="polite">${n ? n + ' selected' : list.length + ' pending'}</span><button class="btn" ${list.length ? '' : 'disabled'} onclick="hxPickAll(${list.length && n < list.length})">${n < list.length ? 'Select all' : 'Clear selection'}</button><button class="btn primary" ${n ? '' : 'disabled'} onclick="otBulkApprove()">Approve ${n || ''} selected</button></div></div>
   ${rows.length ? rtable([{ h: 'Employee', keep: 1 }, { h: 'Request' }, { h: 'Date' }, { h: 'Hours', c: 'num' }, { h: 'Category', xm: 1 }, { h: 'Reason', xm: 1 }, { h: 'Punch details', xm: 1 }, { h: '', act: 1 }], rows, {}) : hxEmpty('check', 'You’re all caught up', 'There are no overtime, comp-off or pay requests waiting for you.', '')}</div>`;
}
function hxPickAll(on) {
  S.hx.sel = on
    ? teamPending()
        .filter(r => S.hx.tf.who === 'all' || r.emp === S.hx.tf.who)
        .map(r => r.id)
    : [];
  render();
}

/* js/features/hours/hours-flow.js */
/* =====================================================================
   Hours and overtime: asking for approval, the 3-step "use my extra time" flow, and manager decisions
   Step 1 pick entries · Step 2 comp-off or extra pay · Step 3 review and submit · then a success screen
   Errors shown in context: not enough hours, past the payroll cutoff, policy locked.
   ===================================================================== */

/* ---------- ask for overtime approval ---------- */
function otAsk(keys) {
  const d = hxMe(),
    list = d.ents.filter(x => keys.includes(x.key) && x.st === 'auto');
  if (!list.length) {
    toast('Those entries are already requested', null, 'err');
    return;
  }
  S.oa = { keys: list.map(x => x.key) };
  const tot = list.reduce((a, x) => a + x.min, 0),
    rows = list
      .map(
        x =>
          `<li><div><b>${fddy(x.dt)}</b><span>${OT_CAT[x.cat]} · ${x.rate}×</span></div><div class="r"><b>${fhm(x.min)}</b><span>${inr(otPay(x))} estimate · ${payMonth(x.iso, x.P).label} payroll</span></div></li>`
      )
      .join('');
  overlay(
    'Request overtime approval',
    `<ul class="hx-ls">${rows}</ul><div class="hx-sum"><span>Total</span><b>${fhm(tot)}</b></div>
     <div class="field" style="margin-top:14px"><label for="oa-r">What was the work? (optional)</label><textarea id="oa-r" rows="3" placeholder="For example, month-end closing or a machine breakdown"></textarea></div>
     <p class="muted small">${esc(reportsTo(d.e))} reviews this. It is added to your extra time balance once approved. Estimates are confirmed by payroll.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="otAskSend()">Send request</button>`
  );
}
function otAskSend() {
  const keys = (S.oa && S.oa.keys) || [],
    why = ($('#oa-r') && $('#oa-r').value.trim()) || '',
    d = hxMe(),
    list = d.ents.filter(x => keys.includes(x.key) && x.st === 'auto');
  list.forEach(en => {
    const q = mkReq('OT', d.e.id, [en.key], {
      min: en.min,
      cat: en.cat,
      reason: why || 'Work completed after shift'
    });
    entMark(en.key, { st: 'pending', req: q.id });
  });
  closeModal();
  persist();
  S.tab.hr = 'req';
  render();
  toast(`${list.length} request${list.length === 1 ? '' : 's'} sent to ${reportsTo(d.e)}`);
}
function otCancelAsk(id) {
  confirmBox(
    'Cancel this request?',
    'Your manager will no longer see it. The hours go back to your list and you can ask again.',
    'Cancel request',
    () => {
      if (otCancel(id)) {
        persist();
        render();
        toast('Request cancelled');
      }
    },
    true
  );
}

/* ---------- use my extra time ---------- */
const OU_STEPS = ['Choose hours', 'Comp-off or pay', 'Review'];
function otUse(keys, mode) {
  const d = hxMe(),
    avail = d.ents.filter(x => entStatus(x) === 'available');
  S.ou = {
    step: keys && mode ? 2 : 1,
    keys: keys ? keys.filter(k => avail.some(x => x.key === k)) : [],
    mode: mode || '',
    dates: [],
    ack: false,
    cal: 0,
    err: '',
    done: null
  };
  if (!avail.length) {
    toast('You have no approved extra time to use yet', null, 'err');
    return;
  }
  if (keys && mode && !S.ou.keys.length) S.ou.step = 1;
  otUsePaint();
}
const ouSel = () =>
  hxMe().ents.filter(x => S.ou.keys.includes(x.key) && entStatus(x) === 'available');
function ouStepper(cur) {
  return `<ol class="xs-steps" aria-label="Progress">${OU_STEPS.map((n, i) => {
    const k = i + 1,
      st = k < cur ? 'done' : k === cur ? 'now' : '';
    return `<li class="${st}" ${k === cur ? 'aria-current="step"' : ''}><span class="xs-n">${k < cur ? ic('check', 16) : k}</span><span class="xs-l">${n}<span class="sr"> (step ${k} of 3${k < cur ? ', done' : ''})</span></span></li>`;
  }).join('')}</ol>`;
}
function ouCalendar(e, need) {
  const u = S.ou,
    b = new Date(TODAY.getFullYear(), TODAY.getMonth() + u.cal, 1),
    first = (b.getDay() + 6) % 7,
    n = new Date(b.getFullYear(), b.getMonth() + 1, 0).getDate(),
    cells = [];
  for (let i = 0; i < first; i++) cells.push('<i></i>');
  for (let d = 1; d <= n; d++) {
    const dt = new Date(b.getFullYear(), b.getMonth(), d),
      k = iso(dt),
      sel = u.dates.includes(k),
      kind = dayKind(e, dt),
      ok = dt > TODAY && kind.work && !leaveOn(e.id, dt) && dt <= addD(TODAY, 90),
      full = !sel && u.dates.length >= need;
    cells.push(
      `<button type="button" class="${sel ? 'sel' : ''}" aria-pressed="${sel}" ${!ok || full ? 'disabled' : ''} aria-label="${esc(fddy(dt))}${ok ? '' : ', not available: ' + (dt <= TODAY ? 'past' : kind.work ? 'on leave or too far ahead' : kind.why)}" onclick="ouDate('${k}')">${d}</button>`
    );
  }
  return `<div class="hx-cal"><div class="hx-calh"><button type="button" class="icon-btn" aria-label="Previous month" ${u.cal <= 0 ? 'disabled' : ''} onclick="S.ou.cal--;otUsePaint()">${ic('arrow', 16).replace('<svg', '<svg style="transform:rotate(180deg)"')}</button><b aria-live="polite">${monLbl(b)}</b><button type="button" class="icon-btn" aria-label="Next month" ${u.cal >= 3 ? 'disabled' : ''} onclick="S.ou.cal++;otUsePaint()">${ic('arrow', 16)}</button></div><div class="hx-calw" aria-hidden="true">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span>${x}</span>`).join('')}</div><div class="hx-calg">${cells.join('')}</div></div>`;
}
function ouDate(k) {
  const u = S.ou;
  u.dates = u.dates.includes(k) ? u.dates.filter(x => x !== k) : [...u.dates, k].sort();
  otUsePaint();
}
function ouPick(k, on) {
  const u = S.ou;
  u.keys = u.keys.filter(x => x !== k);
  if (on) u.keys.push(k);
  u.dates = [];
  otUsePaint();
}
function ouAll(on) {
  S.ou.keys = on
    ? hxMe()
        .ents.filter(x => entStatus(x) === 'available')
        .map(x => x.key)
    : [];
  S.ou.dates = [];
  otUsePaint();
}
/* open the calendar on the first month that still has a day to pick (late in a month, that is next month) */
function ouFirstMonth() {
  const e = me();
  for (let i = 1; i <= 90; i++) {
    const dt = addD(TODAY, i);
    if (dayKind(e, dt).work && !leaveOn(e.id, dt))
      return (dt.getFullYear() - TODAY.getFullYear()) * 12 + dt.getMonth() - TODAY.getMonth();
  }
  return 0;
}
function ouMode(m) {
  if (m === 'comp') S.ou.cal = ouFirstMonth();
  S.ou.mode = m;
  S.ou.dates = [];
  S.ou.ack = false;
  otUsePaint();
}
function ouStep(n) {
  S.ou.step = n;
  S.ou.err = '';
  otUsePaint();
}
function otUsePaint() {
  const u = S.ou;
  if (!u) return;
  const d = hxMe(),
    P = otPolFor(d.e),
    avail = d.ents.filter(x => entStatus(x) === 'available').reverse(),
    sel = ouSel(),
    tot = sel.reduce((a, x) => a + x.min, 0),
    cd = compDays(tot, P),
    need = Math.ceil(cd.days),
    appr = reportsTo(d.e);
  let title = 'Use my extra time',
    body = '',
    foot = '';
  if (u.done) {
    const r = u.done;
    title = 'Request sent';
    body = `<div class="xs-done"><span class="xs-ok">${ic('check', 30)}</span><h3>Request submitted</h3><p>Your request <b>${r.id}</b> is with ${esc(appr)}.</p>
      <dl class="hx-kv c"><div><dt>Hours</dt><dd><b>${fhm(r.min)}</b></dd></div><div><dt>${r.type === 'CO' ? 'Comp-off' : 'Extra pay'}</dt><dd>${r.type === 'CO' ? fdy(r.days) + (r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : '') : inr(r.amount)}</dd></div><div><dt>Status</dt><dd>${chip('Pending', 'warn')}</dd></div>${r.type === 'PY' ? `<div><dt>Payroll month</dt><dd>${esc(r.month)}</dd></div>` : ''}</dl></div>`;
    foot = `<button class="btn" onclick="closeModal();S.ou=null">Done</button><button class="btn primary" onclick="closeModal();S.ou=null;S.tab.hr='req';go('hours')">Track request</button>`;
  } else if (u.step === 1) {
    title = 'Choose hours';
    body = `${ouStepper(1)}<div class="hx-sec"><h3>Approved extra time</h3><label class="hx-ck"><input type="checkbox" ${sel.length === avail.length && avail.length ? 'checked' : ''} onchange="ouAll(this.checked)">Select all</label></div>
      <ul class="hx-pk">${avail
        .map(en => {
          const left = Math.round((isoD(en.expiry) - TODAY) / 864e5);
          return `<li><label class="hx-pick ${u.keys.includes(en.key) ? 'on' : ''}"><input type="checkbox" ${u.keys.includes(en.key) ? 'checked' : ''} onchange="ouPick('${en.key}',this.checked)"><span class="g"><b>${fddy(en.dt)}</b><span>${OT_CAT[en.cat]} · ${en.rate}× · expires in ${left} day${left === 1 ? '' : 's'}</span></span><b class="h">${fhm(en.min)}</b></label></li>`;
        })
        .join('')}</ul>
      <div class="hx-run" role="status" aria-live="polite"><span>Selected</span><b>${fhm(tot)}</b><span class="muted">${tot ? (cd.days ? '≈ ' + fdy(cd.days) + ' of comp-off' : 'Under a half day of comp-off') : 'Pick at least one entry'}</span></div>`;
    foot = `<button class="btn" onclick="closeModal();S.ou=null">Cancel</button><button class="btn primary" ${sel.length ? '' : 'disabled'} onclick="ouStep(2)">Continue</button>`;
  } else if (u.step === 2) {
    title = 'Comp-off or extra pay';
    const lockC = P.mode === 'pay',
      lockP = P.mode === 'comp',
      short = tot < P.comp.half * 60,
      noC = lockC || short,
      pay = sel.reduce((a, x) => a + otPay(x), 0),
      months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))],
      cut = pastCutoff(P),
      nm = payMonth(iso(TODAY), P).label;
    const cardC = `<label class="hx-opt ${u.mode === 'comp' ? 'on' : ''} ${noC ? 'dis' : ''}"><input type="radio" name="ou-m" ${u.mode === 'comp' ? 'checked' : ''} ${noC ? 'disabled' : ''} onchange="ouMode('comp')"><span class="oh"><b>Comp-off</b><span>Take time off instead</span></span>
      <span class="hv">${noC ? ic('lock', 18) : fdy(cd.days)}</span>
      ${lockC ? `<span class="ob err" role="alert">${ic('lock', 16)}Your policy allows extra pay only.</span>` : short ? `<span class="ob err" role="alert">${ic('alert', 16)}Not enough hours. Comp-off needs at least ${P.comp.half}h and you chose ${fhm(tot)}.</span>` : `<span class="ob">${P.comp.half}h is a half day, ${P.comp.full}h a full day.${cd.left ? ` ${fhm(cd.left)} is left over and not converted.` : ''} After this, ${fhm(Math.max(0, d.bal.avail - tot))} of extra time is left.</span>`}</label>`;
    const cardP = `<label class="hx-opt ${u.mode === 'pay' ? 'on' : ''} ${lockP ? 'dis' : ''}"><input type="radio" name="ou-m" ${u.mode === 'pay' ? 'checked' : ''} ${lockP ? 'disabled' : ''} onchange="ouMode('pay')"><span class="oh"><b>Extra pay</b><span>Paid with your salary</span></span>
      <span class="hv">${lockP ? ic('lock', 18) : inr(pay)}</span>
      ${lockP ? `<span class="ob err" role="alert">${ic('lock', 16)}Your policy allows comp-off only.</span>` : `<span class="ob">Estimate, confirmed by payroll. Paid in the <b>${months.join(' and ')}</b> payroll.</span>`}</label>`;
    body = `${ouStepper(2)}<p class="muted small" style="margin:0 0 10px">${fhm(tot)} selected from ${sel.length} entr${sel.length === 1 ? 'y' : 'ies'}.${P.mode !== 'choose' ? ' Your organisation has set this to ' + (P.mode === 'comp' ? 'comp-off only' : 'extra pay only') + '.' : ''}</p>
      <div class="hx-opts" role="radiogroup" aria-label="How to use this time">${cardC}${cardP}</div>
      ${u.mode === 'comp' && !noC ? `<div class="hx-sec"><h3>Pick ${need === 1 && cd.days === 0.5 ? 'the day for your half day' : need + ' day' + (need === 1 ? '' : 's')}</h3><span class="muted small" aria-live="polite">${u.dates.length} of ${need} chosen</span></div>${ouCalendar(d.e, need)}` : ''}
      ${u.mode === 'pay' && !lockP && cut ? `<div class="hx-ban err" role="alert">${ic('alert', 18)}<div class="grow"><b>The payroll cutoff has passed</b><div class="small">The cutoff for ${MON[TODAY.getMonth()]} was the ${P.cutoff}th. This will be paid in the ${nm} payroll instead.</div><label class="hx-ck" style="margin-top:8px"><input type="checkbox" ${u.ack ? 'checked' : ''} onchange="S.ou.ack=this.checked;otUsePaint()">I understand it will be paid in ${nm}</label></div></div>` : ''}`;
    const ready =
      (u.mode === 'comp' && !noC && u.dates.length === need) ||
      (u.mode === 'pay' && !lockP && (!cut || u.ack));
    foot = `<button class="btn" onclick="ouStep(1)">Back</button><button class="btn primary" ${ready ? '' : 'disabled'} onclick="ouStep(3)">Continue</button>`;
  } else {
    title = 'Review and submit';
    const comp = u.mode === 'comp',
      pay = sel.reduce((a, x) => a + otPay(x), 0),
      months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))];
    body = `${ouStepper(3)}${u.err ? `<div class="hx-ban err" role="alert">${ic('alert', 18)}<div class="grow">${esc(u.err)}</div></div>` : ''}
      <dl class="hx-kv c"><div><dt>Hours</dt><dd><b>${fhm(tot)}</b> <small>${sel.length} entr${sel.length === 1 ? 'y' : 'ies'}</small></dd></div>
      <div><dt>You chose</dt><dd>${comp ? 'Comp-off' : 'Extra pay'}</dd></div>
      ${comp ? `<div><dt>Comp-off</dt><dd><b>${fdy(cd.days)}</b> on ${u.dates.map(x => fdd(isoD(x))).join(', ')}</dd></div><div><dt>Extra time left</dt><dd>${fhm(Math.max(0, d.bal.avail - tot))}</dd></div>` : `<div><dt>Estimated pay</dt><dd><b>${inr(pay)}</b> <small>Estimate, confirmed by payroll</small></dd></div><div><dt>Payroll month</dt><dd>${months.join(' and ')}</dd></div>`}
      <div><dt>Approver</dt><dd>${esc(appr)}</dd></div><div><dt>Status after submit</dt><dd>${chip('Pending', 'warn')}</dd></div></dl>
      <div class="hx-note">${ic('help', 16)}<span>${comp ? `Comp-off dates are held for you once ${esc(appr)} approves. Unused comp-off expires ${P.comp.expiry} days after the day it was earned.` : `Pay is added to the payroll month shown. Requests made after day ${P.cutoff} of the month go to the next month.`} You can cancel while it is pending.</span></div>`;
    foot = `<button class="btn" onclick="ouStep(2)">Back</button><button class="btn primary" onclick="ouSubmit()">Submit request</button>`;
  }
  overlay(title, `<div id="ou">${body}</div>`, foot, { keepFocus: true, wide: true });
  const f = $('#ou .xs-steps') || $('#ou');
  if (f) {
    f.setAttribute('tabindex', '-1');
    f.focus({ preventScroll: true });
  }
}
function ouSubmit() {
  const u = S.ou,
    d = hxMe(),
    sel = ouSel(),
    P = otPolFor(d.e);
  if (!sel.length || sel.length !== u.keys.length) {
    u.err = 'Some of these hours are no longer available. Go back and choose again.';
    otUsePaint();
    return;
  }
  const tot = sel.reduce((a, x) => a + x.min, 0),
    comp = u.mode === 'comp',
    cd = compDays(tot, P),
    months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))];
  if (comp && (tot < P.comp.half * 60 || u.dates.length !== Math.ceil(cd.days))) {
    u.err = 'Not enough hours for the days you picked. Go back and check.';
    otUsePaint();
    return;
  }
  const r = mkReq(comp ? 'CO' : 'PY', d.e.id, u.keys, {
    min: tot,
    cat: [...new Set(sel.map(x => x.cat))].length === 1 ? sel[0].cat : 'mixed',
    days: comp ? cd.days : 0,
    dates: comp ? u.dates.slice() : [],
    amount: comp ? 0 : Math.round(sel.reduce((a, x) => a + otPay(x), 0)),
    month: comp ? '' : months.join(' and '),
    reason: ''
  });
  sel.forEach(en => entMark(en.key, { use: comp ? 'comp' : 'pay', useSt: 'pending', ureq: r.id }));
  u.done = r;
  persist();
  otUsePaint();
  if (S.page === 'hours') {
    const q = $('#view');
    if (q) render();
  }
}

/* ---------- manager decisions ---------- */
function otApprove(id) {
  if (!need('hours', 'approve', 'approve overtime')) return;
  const r = otReq(id);
  if (!r || !otDecide(id, true, '')) return;
  audit('Overtime approved', `${emp(r.emp).name} · ${r.id}`, { res: 'hours', to: 'Approved' });
  persist();
  render();
  toast(`${r.id} approved`);
}
function otRejectAsk(id) {
  S.orj = id;
  const r = otReq(id),
    e = emp(r.emp);
  overlay(
    'Reject request',
    `<p class="muted">${esc(e.name)} · ${OT_PREFIX[r.type]} · ${fhm(r.min)}</p><div class="field">${''}<label for="rj-c">Why? ${esc(e.name.split(' ')[0])} will see this</label><textarea id="rj-c" rows="3" placeholder="For example, please add the task reference"></textarea><div class="err" id="rj-c-e" role="alert"></div></div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn bad" onclick="otRejectDo()">Reject</button>`
  );
}
function otRejectDo() {
  const c = ($('#rj-c').value || '').trim();
  if (!chk('rj-c', c.length >= 3, 'Add a short reason')) return;
  const r = otReq(S.orj);
  if (!r || !need('hours', 'approve', 'reject overtime')) return;
  otDecide(r.id, false, c);
  audit('Overtime rejected', `${emp(r.emp).name} · ${r.id}`, {
    res: 'hours',
    to: 'Rejected',
    reason: c
  });
  closeModal();
  persist();
  render();
  toast(`${r.id} rejected`);
}
function otBulkApprove() {
  if (!need('hours', 'approve', 'approve overtime')) return;
  const ids = S.hx.sel.slice();
  let n = 0;
  ids.forEach(id => {
    if (otDecide(id, true, '')) {
      n++;
      audit('Overtime approved', id, { res: 'hours', to: 'Approved' });
    }
  });
  S.hx.sel = [];
  persist();
  render();
  toast(`${n} request${n === 1 ? '' : 's'} approved`);
}

/* js/features/settings/ot-policy.js */
/* =====================================================================
   Settings · Overtime and comp-off: the rules behind Hours and overtime
   Every default is shown as an editable assumption. Changes are held as a draft until Save,
   and each saved change is written to the audit log. Rules can be overridden per role or department.
   ===================================================================== */
const otpCore = o => {
  const c = JSON.parse(JSON.stringify(o));
  delete c.meta;
  return c;
};
const otpDraft = () => S.otpDraft || (S.otpDraft = otpCore(S.otp));
const otpDirty = () =>
  !!S.otpDraft && JSON.stringify(S.otpDraft) !== JSON.stringify(otpCore(S.otp));
function otpGet(o, path) {
  return path.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
}
function otpSet(path, v) {
  const d = otpDraft(),
    ks = path.split('.'),
    last = ks.pop(),
    t = ks.reduce((a, k) => a[k], d);
  t[last] =
    typeof t[last] === 'number' || /^-?\d*\.?\d+$/.test(String(v)) ? (v === '' ? '' : +v) : v;
  otpPaintBar();
}
function otpPaintBar() {
  const s = document.getElementById('opx-save'),
    c = document.getElementById('opx-cancel'),
    st = document.getElementById('opx-st');
  if (!s) return;
  const dirty = otpDirty();
  s.disabled = c.disabled = !dirty;
  st.innerHTML = dirty
    ? chip('Unsaved changes', 'warn', 1)
    : `<span class="muted small">${lastBy(S.otp.meta)}</span>`;
}
function otpRepaint() {
  const b = document.getElementById('opx');
  if (b) b.innerHTML = otpInner();
  else render();
}
function otpCancel() {
  S.otpDraft = null;
  otpRepaint();
  toast('Changes discarded');
}
function otpMode(m) {
  otpDraft().mode = m;
  otpPaintBar();
  document
    .querySelectorAll('.opx-mode .xa-rc')
    .forEach(l => l.classList.toggle('on', l.querySelector('input').value === m));
}
function otpApprove(k, on) {
  otpDraft().approve[k] = on ? 1 : 0;
  otpPaintBar();
}
function otpAddOv() {
  const t = $('#ov-t').value,
    k = $('#ov-k').value,
    d = otpDraft();
  if (!k) return;
  const x = {
    type: t,
    key: k,
    mode: $('#ov-m').value,
    weekday: $('#ov-w').value,
    holiday: $('#ov-h').value,
    off: $('#ov-o').value
  };
  d.over = (d.over || []).filter(o => !(o.type === x.type && o.key === x.key)).concat(x);
  otpRepaint();
}
function otpDelOv(i) {
  otpDraft().over.splice(i, 1);
  otpRepaint();
}
function otpOvKeys() {
  const t = $('#ov-t').value;
  $('#ov-k').innerHTML = (
    t === 'role'
      ? ROLE_DEF.map(r => [r.k, r.n])
      : [...new Set(employees.map(e => e.dept))].sort().map(x => [x, x])
  )
    .map(([v, n]) => `<option value="${esc(v)}">${esc(n)}</option>`)
    .join('');
}
const OTP_L = {
  breakMin: 'Daily break (minutes)',
  minMin: 'Minimum overtime (minutes)',
  round: 'Rounding step (minutes)',
  dailyCap: 'Daily overtime cap (hours)',
  weeklyCap: 'Weekly overtime cap (hours)',
  'rate.weekday': 'Weekday rate',
  'rate.holiday': 'Holiday rate',
  'rate.off': 'Weekly-off rate',
  'approve.weekday': 'Weekday approval',
  'approve.holiday': 'Holiday approval',
  'approve.off': 'Weekly-off approval',
  'comp.half': 'Half day (hours)',
  'comp.full': 'Full day (hours)',
  'comp.expiry': 'Comp-off expiry (days)',
  mode: 'Comp-off or pay',
  cutoff: 'Payroll cutoff day',
  payDays: 'Pay base: days per month',
  payHours: 'Pay base: hours per day'
};
function otpChanges(a, b) {
  const out = [];
  Object.keys(OTP_L).forEach(k => {
    const x = otpGet(a, k),
      y = otpGet(b, k);
    if (x !== y)
      out.push([
        OTP_L[k],
        k.startsWith('approve') ? (x ? 'Required' : 'Not required') : x,
        k.startsWith('approve') ? (y ? 'Required' : 'Not required') : y
      ]);
  });
  if (JSON.stringify(a.over || []) !== JSON.stringify(b.over || []))
    out.push([
      'Role and department rules',
      (a.over || []).length + ' rules',
      (b.over || []).length + ' rules'
    ]);
  return out;
}
function otpSave() {
  if (!need('policy', 'edit', 'change overtime settings')) return;
  const d = otpDraft(),
    n = (id, ok, m) => chk(id, ok, m),
    rng = (id, v, lo, hi, m) =>
      n(id, v !== '' && !isNaN(v) && v >= lo && v <= hi, m || `Enter a number from ${lo} to ${hi}`);
  const ok = [
    rng('op-bm', d.breakMin, 0, 120),
    rng('op-mm', d.minMin, 0, 120),
    rng('op-dc', d.dailyCap, 0.5, 12),
    rng('op-wc', d.weeklyCap, d.dailyCap || 0.5, 60, 'Must be at least the daily cap, up to 60'),
    rng('op-rw', d['rate'].weekday, 1, 5),
    rng('op-rh', d['rate'].holiday, 1, 5),
    rng('op-ro', d['rate'].off, 1, 5),
    rng('op-ch', d.comp.half, 1, 12),
    n(
      'op-cf',
      d.comp.full > d.comp.half && d.comp.full <= 12,
      'Full day must be more than a half day, up to 12'
    ),
    rng('op-ce', d.comp.expiry, 7, 365),
    rng('op-co', d.cutoff, 1, 28),
    rng('op-pd', d.payDays, 20, 31),
    rng('op-ph', d.payHours, 6, 12)
  ];
  if (!ok.every(Boolean)) {
    toast('Check the highlighted fields', null, 'err');
    return;
  }
  if (!otpDirty()) return;
  const ch = otpChanges(otpCore(S.otp), d);
  S.otp = Object.assign(JSON.parse(JSON.stringify(d)), {
    meta: { by: me().name, at: new Date().toISOString() }
  });
  S.otpDraft = null;
  audit('Policy changed', 'Overtime and comp-off', {
    res: 'settings',
    from: ch.map(c => `${c[0]}: ${c[1]}`).join('; '),
    to: ch.map(c => `${c[0]}: ${c[2]}`).join('; ')
  });
  commit();
  extPublish();
  render();
  toast(`Saved. ${ch.length} change${ch.length === 1 ? '' : 's'} applied`);
}

function otpInner() {
  const d = otpDraft(),
    can_ = can('policy', 'edit'),
    dis = can_ ? '' : 'disabled',
    num = (id, path, label, hint, step) =>
      fld(
        id,
        label,
        `<input id="${id}" type="number" inputmode="decimal" step="${step || 1}" value="${otpGet(d, path)}" ${dis} oninput="otpSet('${path}',this.value)">${hint ? `<div class="muted small">${hint}</div>` : ''}`
      );
  const rateRow = (k, name, idr) =>
    `<div class="opx-rr"><div class="grow"><b>${name}</b></div>${fld(idr, 'Rate', `<input id="${idr}" type="number" step="0.25" value="${d.rate[k]}" ${dis} oninput="otpSet('rate.${k}',this.value)">`, 'sm')}<label class="opx-ap"><span class="sw"><input type="checkbox" ${d.approve[k] ? 'checked' : ''} ${dis} aria-label="Approval required for ${name.toLowerCase()}" onchange="otpApprove('${k}',this.checked)"><span></span></span>Manager approval</label></div>`;
  const modes = [
    ['choose', 'Employee chooses', 'Each person picks comp-off or pay for every approved entry.'],
    ['comp', 'Comp-off only', 'Extra time can only be taken as time off.'],
    ['pay', 'Pay only', 'Extra time can only be paid.']
  ];
  const ov = (d.over || [])
    .map(
      (o, i) =>
        `<tr><td data-label="Applies to">${o.type === 'dept' ? 'Department' : 'Role'}: <b>${esc(o.type === 'dept' ? o.key : roleName(o.key))}</b></td><td data-label="Comp-off or pay">${o.mode ? { choose: 'Employee chooses', comp: 'Comp-off only', pay: 'Pay only' }[o.mode] : '<span class="muted">Default</span>'}</td><td data-label="Rates" class="num">${['weekday', 'holiday', 'off'].map(k => (o[k] !== '' && o[k] != null ? o[k] + '×' : '<span class="muted">default</span>')).join(' · ')}</td><td data-act data-label=""><button class="btn sm" ${dis} onclick="otpDelOv(${i})">Remove</button></td></tr>`
    )
    .join('');
  return `<div class="svh"><span class="muted small">${can_ ? 'These rules decide how overtime and comp-off are worked out for everyone. Defaults are shown as editable assumptions.' : 'You can view these rules. Ask HR or an Admin to change them.'}</span>${svBadge()}</div>
  <div class="opx">
   <section class="opx-s"><h3>Overtime rules</h3><div class="opx-note">${ic('help', 16)}<span><b>Overtime starts after the shift ends.</b> The shift is the person’s own (for example 9h for the general shift). Hours before that, and breaks, never count.</span></div>
    <div class="fg">${num('op-bm', 'breakMin', 'Daily break (minutes)', 'Taken out of every working day')}${num('op-mm', 'minMin', 'Minimum overtime (minutes)', 'Less than this is not recorded')}
    ${fld('op-rd', 'Rounding step (minutes)', `<select id="op-rd" ${dis} onchange="otpSet('round',this.value)">${[1, 5, 10, 15, 30].map(v => `<option ${d.round === v ? 'selected' : ''}>${v}</option>`).join('')}</select><div class="muted small">Rounded down, for example 47 minutes becomes 45</div>`)}
    ${num('op-dc', 'dailyCap', 'Daily overtime cap (hours)', 'Weekday overtime counted per day', 0.5)}${num('op-wc', 'weeklyCap', 'Weekly overtime cap (hours)', 'Weekday overtime counted per week', 0.5)}</div></section>
   <section class="opx-s"><h3>Rates and approval</h3><p class="muted small">Holiday and weekly-off work is recorded apart from weekday overtime.</p>${rateRow('weekday', 'Weekday overtime', 'op-rw')}${rateRow('holiday', 'Holiday work', 'op-rh')}${rateRow('off', 'Weekly-off work', 'op-ro')}</section>
   <section class="opx-s"><h3>Comp-off</h3><div class="fg">${num('op-ch', 'comp.half', 'Half day (hours)', 'Hours that earn a half day')}${num('op-cf', 'comp.full', 'Full day (hours)', 'Hours that earn a full day')}${num('op-ce', 'comp.expiry', 'Expires after (days)', 'Counted from the day it was earned')}</div>
    <fieldset class="xa-fs opx-mode" ${dis}><legend>Comp-off or pay</legend><div class="xa-radios" role="radiogroup" aria-label="Comp-off or pay">${modes.map(([k, n, t]) => `<label class="xa-rc ${d.mode === k ? 'on' : ''}"><input type="radio" name="otp-m" value="${k}" ${d.mode === k ? 'checked' : ''} onchange="otpMode('${k}')"><span class="xa-rt"><b>${n}</b><span>${t}</span></span></label>`).join('')}</div></fieldset></section>
   <section class="opx-s"><h3>Payroll</h3><div class="fg">${num('op-co', 'cutoff', 'Payroll cutoff (day of month)', 'Entries after this day move to next month')}${num('op-pd', 'payDays', 'Pay base: days per month', 'Hourly pay = basic ÷ days ÷ hours')}${num('op-ph', 'payHours', 'Pay base: hours per day')}</div></section>
   <section class="opx-s"><h3>By role or department</h3><p class="muted small">Give a role or department its own comp-off or pay mode and rates. Anything left as default follows the rules above.</p>
    ${ov ? `<div class="tw"><table class="rt keep"><thead><tr><th>Applies to</th><th>Comp-off or pay</th><th class="num">Weekday · holiday · off</th><th><span class="sr">Actions</span></th></tr></thead><tbody>${ov}</tbody></table></div>` : '<p class="muted small">No overrides. Everyone follows the rules above.</p>'}
    <div class="opx-ov"><div class="field"><label for="ov-t">Applies to</label><select id="ov-t" ${dis} onchange="otpOvKeys()"><option value="role">Role</option><option value="dept">Department</option></select></div><div class="field"><label for="ov-k">Which</label><select id="ov-k" ${dis}>${ROLE_DEF.map(r => `<option value="${r.k}">${r.n}</option>`).join('')}</select></div>
    <div class="field"><label for="ov-m">Comp-off or pay</label><select id="ov-m" ${dis}><option value="">Default</option><option value="choose">Employee chooses</option><option value="comp">Comp-off only</option><option value="pay">Pay only</option></select></div>
    <div class="field"><label for="ov-w">Weekday</label><input id="ov-w" type="number" step="0.25" placeholder="Default" ${dis}></div><div class="field"><label for="ov-h">Holiday</label><input id="ov-h" type="number" step="0.25" placeholder="Default" ${dis}></div><div class="field"><label for="ov-o">Weekly off</label><input id="ov-o" type="number" step="0.25" placeholder="Default" ${dis}></div>
    <button class="btn" ${dis} onclick="otpAddOv()">Add rule</button></div></section>
  </div>
  <div class="xa-bar" role="region" aria-label="Save changes"><span class="xa-bs" id="opx-st" role="status" aria-live="polite">${otpDirty() ? chip('Unsaved changes', 'warn', 1) : `<span class="muted small">${lastBy(S.otp.meta)}</span>`}</span><span class="grow"></span><button class="btn" id="opx-cancel" ${otpDirty() ? '' : 'disabled'} onclick="otpCancel()">Cancel</button><button class="btn primary" id="opx-save" ${otpDirty() && can_ ? '' : 'disabled'} onclick="otpSave()">Save changes</button></div>`;
}
function otPolTab() {
  return `<div id="opx">${otpInner()}</div>`;
}

/* js/features/settings/policies.js */
/* ---------- work policies and statutory settings: versioned, effective-dated, used by the calculations ---------- */
const WL = {
  wOff: 'Office workweek',
  wPl: 'Plant workweek',
  hours: 'Standard hours per day',
  grace: 'Late-mark grace',
  ot: 'Overtime rate',
  fy: 'Financial year starts',
  probation: 'Probation period',
  noticeEL: 'Earned-leave notice',
  certDays: 'Medical certificate after',
  carryEL: 'Earned-leave carry forward',
  varPct: 'Payroll variance alert'
};
function workFlat(w) {
  return {
    wOff: w.week.Office,
    wPl: w.week.Plant,
    hours: w.hours,
    grace: w.grace,
    ot: w.ot,
    fy: w.fy,
    probation: w.probation,
    noticeEL: w.noticeEL,
    certDays: w.certDays,
    carryEL: w.carryEL,
    varPct: w.varPct
  };
}
function workVals() {
  const g = id => {
      const e = document.getElementById(id);
      return e ? e.value : '';
    },
    n = id => +g(id);
  return {
    week: { Office: n('w-off'), Plant: n('w-pl') },
    hours: n('w-h'),
    grace: n('w-g'),
    ot: g('w-ot'),
    fy: g('w-fy'),
    probation: n('w-pr'),
    noticeEL: n('w-ne'),
    certDays: n('w-cd'),
    carryEL: n('w-ce'),
    varPct: n('w-vp')
  };
}
function polDirty(k) {
  const b = document.getElementById('polsave');
  if (!b) return;
  const cur = k === 'work' ? W() : ST(),
    now = k === 'work' ? workVals() : statVals();
  b.disabled =
    JSON.stringify(cur) === JSON.stringify(now) &&
    !(document.getElementById('pol-eff') && document.getElementById('pol-eff').value > iso(TODAY));
}
const diffTxt = (a, b, L) =>
  Object.keys(b)
    .filter(k => a[k] !== b[k])
    .map(k => `${L[k] || k}: ${a[k]} → ${b[k]}`);
function histHTML(k, L, flatFn) {
  const h = S.polHist[k].slice(),
    t = iso(TODAY);
  return `<h2 style="margin:24px 0 4px">Version history</h2><div class="list">${h
    .map((v, i) => ({ v, i }))
    .reverse()
    .map(({ v, i }) => {
      const prev = i ? flatFn(h[i - 1].val) : null,
        d = prev ? diffTxt(prev, flatFn(v.val), L) : ['Starting values'],
        cur = v.val === getPol(k);
      return `<div class="li" style="align-items:flex-start"><div class="grow"><b>${v.eff === '2000-01-01' ? 'Original defaults' : 'From ' + fdate(v.eff)}</b> ${cur ? chip('In force', 'ok', 1) : v.eff > t ? chip('Scheduled', 'info', 1) : ''}<div class="muted small">${v.at ? esc(v.by) + ' · ' + ftime(v.at) + (v.why ? ' · ' + esc(v.why) : '') : 'System'}</div><div class="small" style="margin-top:2px">${d.length ? d.map(esc).join('<br>') : 'No value changed'}</div></div></div>`;
    })
    .join('')}</div>`;
}
function flatStat(s) {
  return {
    pfOn: s.pf.on,
    pfRate: s.pf.rate,
    pfCeil: s.pf.ceil,
    esiOn: s.esi.on,
    esiEmp: s.esi.emp,
    esiEr: s.esi.er,
    esiCeil: s.esi.ceil,
    ptOn: s.pt.on,
    ptAmt: s.pt.amt,
    tdsOn: s.tds.on,
    tdsThresh: s.tds.thresh,
    tdsRate: s.tds.rate,
    gratuity: s.gratuity,
    bonus: s.bonus
  };
}
const SL = {
  pfOn: 'PF on',
  pfRate: 'PF rate %',
  pfCeil: 'PF wage ceiling',
  esiOn: 'ESI on',
  esiEmp: 'ESI employee %',
  esiEr: 'ESI employer %',
  esiCeil: 'ESI wage ceiling',
  ptOn: 'Professional tax on',
  ptAmt: 'Professional tax per month',
  tdsOn: 'TDS on',
  tdsThresh: 'TDS exemption',
  tdsRate: 'TDS rate %',
  gratuity: 'Gratuity years',
  bonus: 'Bonus on'
};
function workTab() {
  const w = W(),
    m = polMeta('work'),
    sel = (id, opts, v) =>
      `<select id="${id}" onchange="polDirty('work')">${opts.map(([k, n]) => `<option value="${k}" ${String(v) === String(k) ? 'selected' : ''}>${n}</option>`).join('')}</select>`,
    num = (id, v, mn, mx) =>
      `<input id="${id}" type="number" min="${mn}" max="${mx}" value="${v}" oninput="polDirty('work')">`,
    dm = ' ' + demoChip();
  return `<div class="svh"><span class="muted small">${lastBy(m)}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Workweek, grace time, notice, certificate rules, probation and the variance alert are read by Leave, Attendance, Payroll and Joiners. Items marked Demo only are stored but not used yet.</p>
  <div class="fg" id="polf">${fld(
    'w-off',
    'Office workweek',
    sel(
      'w-off',
      [
        [5, 'Mon to Fri (5 days)'],
        [6, 'Mon to Sat (6 days)']
      ],
      w.week.Office
    )
  )}${fld(
    'w-pl',
    'Plant workweek',
    sel(
      'w-pl',
      [
        [5, 'Mon to Fri (5 days)'],
        [6, 'Mon to Sat (6 days)']
      ],
      w.week.Plant
    )
  )}
  ${fld('w-h', 'Standard hours per day' + dm, num('w-h', w.hours, 4, 12))}${fld('w-g', 'Late-mark grace (minutes)', num('w-g', w.grace, 0, 60))}
  ${fld(
    'w-ot',
    'Overtime rate' + dm,
    sel(
      'w-ot',
      [
        ['2x', '2x ordinary rate (Factories Act)'],
        ['1.5x', '1.5x ordinary rate']
      ],
      w.ot
    )
  )}${fld(
    'w-fy',
    'Financial year starts' + dm,
    sel(
      'w-fy',
      [
        ['April', 'April'],
        ['January', 'January']
      ],
      w.fy
    )
  )}
  ${fld('w-pr', 'Probation period (months)', num('w-pr', w.probation, 1, 12))}${fld('w-ne', 'Earned-leave notice (working days)', num('w-ne', w.noticeEL, 0, 30))}
  ${fld('w-cd', 'Sick leave needs a medical certificate after (days)', num('w-cd', w.certDays, 1, 7))}${fld('w-ce', 'Earned-leave carry forward cap (days)', num('w-ce', w.carryEL, 0, 90))}
  ${fld('w-vp', 'Payroll variance alert (% change from last month)', num('w-vp', w.varPct, 1, 50))}${fld('pol-eff', 'Effective from', `<input id="pol-eff" type="date" value="${iso(TODAY)}" oninput="polDirty('work')">`)}</div>
  <div class="acts" style="margin-top:6px"><button class="btn primary" id="polsave" disabled onclick="workSave()">Save changes</button></div>${histHTML('work', WL, workFlat)}`;
}
function workSave() {
  if (!need('policy', 'edit', 'change policies')) return;
  const v = workVals(),
    eff = document.getElementById('pol-eff').value || iso(TODAY);
  const ok = [
    chk('w-g', v.grace >= 0 && v.grace <= 60, 'Between 0 and 60 minutes'),
    chk('w-h', v.hours >= 4 && v.hours <= 12, 'Between 4 and 12 hours'),
    chk('w-pr', v.probation >= 1 && v.probation <= 12, 'Between 1 and 12 months'),
    chk('w-ne', v.noticeEL >= 0 && v.noticeEL <= 30, 'Between 0 and 30 days'),
    chk('w-cd', v.certDays >= 1 && v.certDays <= 7, 'Between 1 and 7 days'),
    chk('w-ce', v.carryEL >= 0 && v.carryEL <= 90, 'Between 0 and 90 days'),
    chk('w-vp', v.varPct >= 1 && v.varPct <= 50, 'Between 1 and 50 percent'),
    chk('pol-eff', !!eff, 'Choose an effective date')
  ].every(Boolean);
  if (!ok) return;
  S.save = { st: 'saving', at: '' };
  const okS = polSave('work', v, eff, '');
  commit();
  render();
  toast(eff > iso(TODAY) ? 'Scheduled from ' + fdate(eff) : 'Policies saved and in force');
}
function statVals() {
  const g = id => {
      const e = document.getElementById(id);
      return e ? e.value : '';
    },
    n = id => +g(id),
    c = id => (document.getElementById(id) && document.getElementById(id).checked ? 1 : 0);
  return {
    pf: { on: c('s-pf'), rate: n('s-pfr'), ceil: n('s-pfc') },
    esi: { on: c('s-esi'), emp: n('s-ese'), er: n('s-esr'), ceil: n('s-esc') },
    pt: { on: c('s-pt'), amt: n('s-pta') },
    tds: { on: c('s-tds'), thresh: n('s-tdt'), rate: n('s-tdr') },
    gratuity: n('s-gr'),
    bonus: c('s-bo')
  };
}
function statPrev() {
  const t = statVals(),
    cur = slip(1408920),
    mk = slipWith(1408920, t);
  const d = mk.net - cur.net;
  return `<div class="note" id="stprev"><b>Effect on a sample payslip (Riya Verma, ₹14,08,920 a year):</b> net pay ${inr(cur.net)} → <b>${inr(mk.net)}</b>${Math.abs(d) >= 1 ? ` (${d > 0 ? '+' : '−'}${inr(Math.abs(d))} a month)` : ' (no change)'}</div>`;
}
function statChange() {
  const p = document.getElementById('stprev');
  if (p) p.outerHTML = statPrev();
  polDirty('stat');
}
function statTab() {
  const s = ST(),
    m = polMeta('stat'),
    row = (on, id, title, sub, body) =>
      `<div class="stc"><div class="stc-h"><div class="grow"><b>${title}</b><div class="muted small">${sub}</div></div>${on !== null ? `<label class="sw"><input type="checkbox" id="${id}" ${on ? 'checked' : ''} onchange="statChange()" aria-label="${title} on"><span></span></label>` : ''}</div><div class="fg stc-b">${body}</div></div>`,
    num = (id, v, l, step) =>
      fld(
        id,
        l,
        `<input id="${id}" type="number" step="${step || 1}" min="0" value="${v}" oninput="statChange()">`
      );
  return `<div class="svh"><span class="muted small">${lastBy(m)}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Payslips and the payroll run use these values. Rates shown are examples; confirm current slabs with your compliance advisor.</p>
  ${row(s.pf.on, 's-pf', 'Provident fund (EPF)', 'Employee contribution on basic pay, up to the wage ceiling', num('s-pfr', s.pf.rate, 'Employee rate (%)') + num('s-pfc', s.pf.ceil, 'Monthly wage ceiling (₹)'))}
  ${row(s.esi.on, 's-esi', 'ESI', 'Applies when monthly gross pay is within the ceiling', num('s-ese', s.esi.emp, 'Employee rate (%)', 0.01) + num('s-esr', s.esi.er, 'Employer rate (%)', 0.01) + num('s-esc', s.esi.ceil, 'Monthly wage ceiling (₹)'))}
  ${row(s.pt.on, 's-pt', 'Professional tax', 'A flat monthly amount in this demo; real slabs differ by state', num('s-pta', s.pt.amt, 'Amount per month (₹)'))}
  ${row(s.tds.on, 's-tds', 'TDS on salary', 'Simplified: a flat rate on annual pay above the exemption', num('s-tdt', s.tds.thresh, 'Annual exemption (₹)') + num('s-tdr', s.tds.rate, 'Effective rate (%)'))}
  ${row(null, 's-g', 'Gratuity', 'Payable after the qualifying service period', num('s-gr', s.gratuity, 'Years of service'))}
  ${row(s.bonus, 's-bo', 'Bonus', 'Payment of Bonus Act, where applicable', '')}
  ${statPrev()}<div class="fg" style="margin-top:10px">${fld('pol-eff', 'Effective from', `<input id="pol-eff" type="date" value="${iso(TODAY)}" oninput="polDirty('stat')">`)}</div>
  <div class="acts"><button class="btn primary" id="polsave" disabled onclick="statSave()">Save changes</button></div>${histHTML('stat', SL, x => flatStat(x))}`;
}
function statSave() {
  if (!need('statutory', 'edit', 'change statutory settings')) return;
  const v = statVals(),
    eff = document.getElementById('pol-eff').value || iso(TODAY);
  const ok = [
    chk('s-pfr', v.pf.rate >= 0 && v.pf.rate <= 30, 'Between 0 and 30'),
    chk('s-pfc', v.pf.ceil > 0, 'Enter an amount'),
    chk('s-esc', v.esi.ceil > 0, 'Enter an amount'),
    chk('s-tdr', v.tds.rate >= 0 && v.tds.rate <= 40, 'Between 0 and 40'),
    chk('s-pta', v.pt.amt >= 0 && v.pt.amt <= 2500, 'Up to ₹2,500 a month'),
    chk('pol-eff', !!eff, 'Choose an effective date')
  ].every(Boolean);
  if (!ok) return;
  polSave('stat', v, eff, '');
  commit();
  render();
  toast(
    eff > iso(TODAY)
      ? 'Scheduled from ' + fdate(eff)
      : 'Statutory settings saved. Payslips now use them'
  );
}
function secSet(k, v, label) {
  if (!need('security', 'edit', 'change security settings')) return;
  const old = k.includes('.') ? S.sec.twoFA[k.split('.')[1]] : S.sec[k];
  if (k.startsWith('twoFA.')) S.sec.twoFA[k.split('.')[1]] = v ? 1 : 0;
  else S.sec[k] = v;
  audit('Security setting changed', label, { res: 'settings', from: old, to: v });
  commit();
  toast(label + ' updated');
}
function securityTab() {
  return `<div class="svh"><span class="muted small">Saved in this browser</span>${svBadge()}</div>
  <h2 style="margin:8px 0 4px">Two-step verification</h2><p class="muted small" style="margin-bottom:10px">Ask for a 6-digit code after the password. It is always on for HR, Admin and System Admin accounts. ${demoChip()} The code is a fixed demo value.</p>
  <div class="list">${ROLE_DEF.map(r => `<div class="li"><div class="grow"><b>${r.n}</b><div class="muted small">${r.d}</div></div><label class="sw"><input type="checkbox" ${S.sec.twoFA[r.k] ? 'checked' : ''} ${['hr', 'admin', 'sysadmin'].includes(r.k) ? 'disabled' : ''} onchange="secSet('twoFA.${r.k}',this.checked,'Two-step verification for ${r.n}')" aria-label="Require two-step verification for ${r.n}"><span></span></label></div>`).join('')}</div>
  <h2 style="margin:26px 0 12px">Passwords and sessions</h2>
  <div class="fg">${fld('sc1', 'Minimum password length', `<select id="sc1" onchange="secSet('minLen',+this.value,'Minimum password length')">${[8, 10, 12].map(n => `<option value="${n}" ${S.sec.minLen === n ? 'selected' : ''}>${n} characters</option>`).join('')}</select>`)}
  ${fld('sc2', 'Sign out after inactivity', `<select id="sc2" onchange="secSet('timeout',+this.value,'Session timeout');idleReset()">${[15, 30, 60, 120].map(n => `<option value="${n}" ${S.sec.timeout === n ? 'selected' : ''}>${n} minutes</option>`).join('')}</select>`)}</div>
  <div class="tools"><button class="btn" onclick="forcePwReset()">Require password reset for all staff</button></div>
  <h2 style="margin:22px 0 4px">Active sessions ${demoChip()}</h2><div class="list">
   <div class="li"><span class="ai t-green">${ic('shield', 18)}</span><div class="grow"><b>This browser</b><div class="muted small">Gurugram · current session</div></div>${chip('Current', 'ok')}</div>
   <div class="li"><span class="ai t-brand">${ic('clock', 18)}</span><div class="grow"><b>PeopleDesk app on Android</b><div class="muted small">Sample entry · no real device</div></div><button class="btn sm" onclick="signOutOthers()">Sign out</button></div></div>`;
}
function integrationsTab() {
  const it = [
    ['Bank payments', 'Host-to-host file transfer for salary payouts', 'wallet'],
    ['Identity provider (SSO)', 'SAML or OpenID sign-in for staff', 'key'],
    ['Attendance devices', 'Biometric and gate readers at the plant', 'clock'],
    ['Email and SMS delivery', 'Delivery status for notifications and payslips', 'mail']
  ];
  return `<div class="svh"><span class="muted small">No live connections in this demo</span></div><p class="muted small" style="margin:6px 0 12px">These need a backend and credentials, so they are shown as placeholders. Delivery and sync status would appear here.</p>
  <div class="list">${it.map(([a, b, i]) => `<div class="li"><span class="ai t-brand">${ic(i, 18)}</span><div class="grow"><b>${a}</b><div class="muted small">${b}</div></div>${demoChip()}<button class="btn sm" disabled>Connect</button></div>`).join('')}</div>`;
}
function prefSet(k, v, label) {
  S.prefs[k] = v ? 1 : 0;
  commit();
  toast(label + (v ? ' on' : ' off'));
}
function prefsTab() {
  return `<div class="svh"><span class="muted small">Saved in this browser</span>${svBadge()}</div><div class="list">${[
    [
      'Dark mode',
      'Easier on the eyes on night shifts',
      `<input type="checkbox" ${isDark() ? 'checked' : ''} onchange="setTheme(this.checked?'dark':'light')" aria-label="Dark mode">`
    ],
    [
      'Email notifications',
      `Leave decisions, payslips and approvals ${demoChip()}`,
      `<input type="checkbox" ${S.prefs.email ? 'checked' : ''} onchange="prefSet('email',this.checked,'Email notifications')" aria-label="Email notifications">`
    ],
    [
      'Push notifications on mobile',
      `Reminders to clock in and out ${demoChip()}`,
      `<input type="checkbox" ${S.prefs.push ? 'checked' : ''} onchange="prefSet('push',this.checked,'Push notifications')" aria-label="Push notifications">`
    ]
  ]
    .map(
      ([a, b, i]) =>
        `<div class="li"><div class="grow"><b>${a}</b><div class="muted small">${b}</div></div><label class="sw">${i}<span></span></label></div>`
    )
    .join(
      ''
    )}${S.role === 'admin' ? `<div class="li"><div class="grow"><b>Demo data</b><div class="muted small">Your changes are saved in this browser</div></div><button class="btn sm" onclick="resetDemo()">Reset</button></div>` : ''}</div>`;
}

/* js/features/settings/users.js */
/* ---------- users and accounts (System Admin): names, work emails and roles only ---------- */
const lastSeen = e => {
  const d = [0, 0, 1, 2, 3, 5][hsh(e.id, 0, 0, 7) % 6];
  return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : d + ' days ago';
};
function userRole(id, role) {
  if (!need('users', 'edit', 'change roles')) return;
  const e = emp(id),
    old = roleOf(id);
  if (old === role) return;
  if (id === me().id) {
    toast('You cannot change your own role', null, 'err');
    render();
    return;
  }
  const n = k => live().filter(x => roleOf(x.id) === k).length;
  if ((old === 'sysadmin' && n('sysadmin') <= 1) || (old === 'admin' && n('admin') <= 1)) {
    toast(`At least one ${roleName(old)} must remain`, null, 'err');
    render();
    return;
  }
  confirmBox(
    'Change role?',
    `${e.name} will become ${roleName(role)}. Their menus and permissions change straight away.`,
    'Change role',
    () => {
      S.roles[id] = role;
      audit('Role assigned', e.name, { res: 'users', from: roleName(old), to: roleName(role) });
      persist();
      commit();
      render();
      toast(`${e.name} is now ${roleName(role)}`);
    }
  );
  const o = document.querySelector('#layer .mf .btn:not(.bad):not(.primary)');
}
function userReset(id) {
  if (!need('users', 'edit', 'reset passwords')) return;
  const e = emp(id);
  confirmBox(
    'Send a password reset?',
    `${e.name} will get a link to set a new password. In this demo no email is sent.`,
    'Send reset',
    () => {
      audit('User password reset requested', e.name, { res: 'users' });
      persist();
      toast('Reset requested for ' + e.name);
    }
  );
}
function usersTab() {
  const rows = live().map(e => {
    const r = roleOf(e.id),
      self = e.id === me().id;
    return {
      cells: [
        `<div class="person">${av(e.name, 32)}<div><b>${esc(e.name)}</b><span>${esc(e.email)}</span></div></div>`,
        `<select class="sel" onchange="userRole('${e.id}',this.value)" ${self ? 'disabled title="You cannot change your own role"' : ''} aria-label="Role for ${esc(e.name)}">${ROLE_DEF.map(x => `<option value="${x.k}" ${r === x.k ? 'selected' : ''}>${x.n}</option>`).join('')}</select>`,
        S.sec.twoFA[r] ? chip('Required', 'ok') : chip('Optional', 'mute'),
        lastSeen(e),
        `<button class="btn sm" onclick="userReset('${e.id}')">Reset password</button>`
      ]
    };
  });
  const cnt = k => live().filter(x => roleOf(x.id) === k).length;
  return `<div class="svh"><span class="muted small">${live().length} accounts · ${ROLE_DEF.map(x => cnt(x.k) + ' ' + x.n).join(' · ')}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Assign roles here. Only names and work emails are shown; no employee or payroll data. Last sign-in is sample data in this demo.</p>
  ${rtable([{ h: 'Account', keep: 1 }, { h: 'Role' }, { h: 'Two-step', xm: 1 }, { h: 'Last sign-in', xm: 1 }, { h: '', act: 1 }], rows, {})}`;
}
function settings() {
  const all = [
      ['users', 'Users', 'users'],
      ['roles', 'Roles and access', 'roles'],
      ['policy', 'Work policies', 'policy'],
      ['statutory', 'Statutory', 'statutory'],
      ['security', 'Security', 'security'],
      ['integrations', 'Integrations', 'integrations'],
      ['otpol', 'Overtime and comp-off', 'policy'],
      ['ext', 'Browser extension', 'policy'],
      ['prefs', 'Preferences', null]
    ],
    ok = all.filter(x => !x[2] || can(x[2], 'view'));
  const t = ok.some(x => x[0] === S.tab.st) ? S.tab.st : ok[0][0];
  S.tab.st = t;
  const T = {
    users: usersTab,
    roles: rolesTab,
    policy: workTab,
    statutory: statTab,
    security: securityTab,
    integrations: integrationsTab,
    otpol: otPolTab,
    ext: extAdminTab,
    prefs: prefsTab
  };
  return (
    ph(
      'Settings',
      persona().role === 'sysadmin'
        ? 'Users, roles, security and integrations'
        : 'Policies, statutory settings and preferences'
    ) +
    `<div class="card"><div class="head">${tabs(
      'st',
      ok.map(x => [x[0], x[1]]),
      ok[0][0]
    )}</div>${T[t]()}</div>`
  );
}

/* js/features/org/organization.js */
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

/* js/features/audit/audit-log.js */
/* ---------- audit log ---------- */
function auditF(k, v) {
  S.au = S.au || { q: '', act: 'All', by: 'All' };
  S.au[k] = v;
  render();
}
function auditRows() {
  const f = S.au || { q: '', act: 'All', by: 'All' },
    q = f.q.toLowerCase(),
    sysOnly = persona().role === 'sysadmin';
  return S.audit.filter(
    a =>
      (!sysOnly || a.cat === 'system') &&
      (f.act === 'All' || a.act === f.act) &&
      (f.by === 'All' || a.by === f.by) &&
      (!q ||
        (a.act + ' ' + a.rec + ' ' + a.by + ' ' + a.from + ' ' + a.to + ' ' + a.reason)
          .toLowerCase()
          .includes(q))
  );
}
function auditCSV() {
  if (!need('audit', 'export')) return;
  audit('Export', 'Audit log', { res: 'audit', to: 'CSV' });
  saveFile(
    'Audit-log-' + iso(TODAY) + '.csv',
    toCSV(
      ['ID', 'Time', 'Who', 'Acting as', 'Action', 'Record', 'From', 'To', 'Reason'],
      auditRows().map(a => [a.id, a.at, a.by, a.as, a.act, a.rec, a.from, a.to, a.reason])
    )
  );
}
function auditPage() {
  const f = S.au || (S.au = { q: '', act: 'All', by: 'All' }),
    base = persona().role === 'sysadmin' ? S.audit.filter(a => a.cat === 'system') : S.audit,
    acts = ['All', ...new Set(base.map(a => a.act))],
    bys = ['All', ...new Set(base.map(a => a.by))],
    rows = auditRows();
  return (
    ph(
      'Audit log',
      'Who changed what, and when',
      can('audit', 'export')
        ? `<button class="btn" onclick="auditCSV()">${ic('download', 16)}Export CSV</button>`
        : ''
    ) +
    `<div class="card"><div class="tools"><label class="sbox"><span class="sr">Search the audit log</span>${ic('search', 16)}<input id="au-q" placeholder="Search action, record or person" value="${esc(f.q)}" oninput="auditF('q',this.value)"></label>
   <label class="dd"><span class="sr">Action</span><select class="sel" onchange="auditF('act',this.value)">${acts.map(a => `<option ${a === f.act ? 'selected' : ''}>${esc(a)}</option>`).join('')}</select></label>
   <label class="dd"><span class="sr">Person</span><select class="sel" onchange="auditF('by',this.value)">${bys.map(a => `<option ${a === f.by ? 'selected' : ''}>${esc(a)}</option>`).join('')}</select></label></div>
   <div class="muted small" style="margin:6px 0 8px" aria-live="polite">${rows.length} of ${base.length} entries</div>
   ${rtable(
     [
       { h: 'When', keep: 1 },
       { h: 'Who' },
       { h: 'Role', xm: 1 },
       { h: 'Action' },
       { h: 'Record', xm: 1 },
       { h: 'Change' },
       { h: 'Reason', xm: 1 }
     ],
     rows.map(a => ({
       cells: [
         `<span class="nw">${ftime(a.at)}</span>`,
         esc(a.by),
         esc(a.as),
         `<b>${esc(a.act)}</b>`,
         esc(a.rec),
         a.from || a.to ? `${esc(a.from)}${a.from && a.to ? ' → ' : ''}${esc(a.to)}` : '–',
         esc(a.reason) || '–'
       ]
     })),
     {
       et: 'Nothing recorded yet',
       em: 'Changes to permissions, policies, approvals, payroll and people appear here.'
     }
   )}</div>`
  );
}

/* js/services/enforcement.js */
/* ---------- enforcement where the work happens ---------- */
guardFns([
  ['exportEmps', 'employees', 'export', 'export employees'],
  ['teamCSV', 'employees', 'export', 'export the team'],
  ['attCSV', 'attendance', 'export', 'export attendance'],
  ['assetCSV', 'assets', 'export', 'export assets'],
  ['downloadReport', 'reports', 'export', 'download reports'],
  ['addEmp', 'employees', 'create', 'add employees'],
  ['saveEmp', 'employees', 'create', 'add employees'],
  ['editEmp', 'employees', 'edit', 'edit employees'],
  ['saveEditEmp', 'employees', 'edit', 'edit employees'],
  ['addAsset', 'assets', 'create', 'add assets'],
  ['saveAsset', 'assets', 'create', 'add assets'],
  ['issueAsset', 'assets', 'edit', 'issue assets'],
  ['doIssue', 'assets', 'edit', 'issue assets'],
  ['returnAsset', 'assets', 'edit', 'return assets'],
  ['doReturn', 'assets', 'edit', 'return assets'],
  ['addCand', 'recruit', 'create', 'add candidates'],
  ['saveCand', 'recruit', 'create', 'add candidates'],
  ['moveCand', 'recruit', 'edit', 'move candidates'],
  ['setRate', 'performance', 'edit', 'rate performance'],
  ['saveReview', 'performance', 'edit', 'save reviews'],
  ['cycleShift', 'roster', 'edit', 'change shifts'],
  ['closeInc', 'safety', 'approve', 'close incidents']
]);

function permPhone(r) {
  return `<div class="list">${Object.keys(RES)
    .map(res => {
      const x = S.perms.m[res][r],
        ap = RES[res][1];
      return `<div class="li pm"><div class="grow"><b>${RES[res][0]}</b><div class="pm-a">${ACTS.map((a, i) => (ap.includes(ACT_K[i]) ? `<label class="pm-c"><input type="checkbox" ${x[a] ? 'checked' : ''} ${LOCK(res, r, a) ? 'disabled' : ''} onchange="permAct('${res}','${r}','${a}',this.checked)" aria-label="${RES[res][0]}: ${ACT_N[a]} for ${roleName(r)}"> ${ACT_N[a]}</label>` : '')).join('')}</div>${res === 'dashboard' ? '' : `<select class="sel" onchange="permScope('${res}','${r}',this.value)" ${r === 'employee' || r === 'sysadmin' ? 'disabled' : ''} aria-label="${RES[res][0]} scope for ${roleName(r)}">${SCOPES.map(([k, n]) => `<option value="${k}" ${x.scope === k ? 'selected' : ''}>${n}</option>`).join('')}</select>`}</div></div>`;
    })
    .join('')}</div>`;
}
function sensPhone() {
  return `<div class="list">${SENS.map(([f, n, d]) => `<div class="li pm"><div class="grow"><b>${n}</b><div class="muted small">${d}</div><div class="pm-a">${['manager', 'hr', 'admin', 'sysadmin'].map(rl => `<label class="pm-c"><input type="checkbox" ${S.perms.sens[rl][f] ? 'checked' : ''} onchange="sensSet('${f}','${rl}',this.checked)" aria-label="${n} for ${roleName(rl)}"> ${roleName(rl)}</label>`).join('')}</div></div></div>`).join('')}</div>`;
}

/* js/features/approvals/engine.js */
/* =====================================================================
   v38 · approvals engine (routes, reasons, history, delegation, bulk preview) and leave on the real calendar
   ===================================================================== */
const KIND = {
  leave: {
    n: 'Leave',
    pre: 'LV',
    res: 'leave',
    tone: 't-amber',
    list: () => S.leaves,
    sk: 'status'
  },
  claim: { n: 'Claim', pre: 'CL', res: 'requests', tone: 't-teal', list: () => S.claims, sk: 'st' },
  reg: {
    n: 'Correction',
    pre: 'AR',
    res: 'attendance',
    tone: 't-brand',
    list: () => S.regs,
    sk: 'status'
  }
};
const stOf = (k, r) => r[KIND[k].sk],
  setSt = (k, r, v) => {
    r[KIND[k].sk] = v;
  };
const refOf = (k, r) =>
  r.ref || KIND[k].pre + '-' + String(r.id > 9999 ? r.id % 10000 : r.id).padStart(4, '0');
const nextRef = k => {
  const n =
    KIND[k]
      .list()
      .reduce(
        (m, r) => Math.max(m, +(String(r.ref || '').split('-')[1] || 0), r.id < 9999 ? r.id : 0),
        0
      ) + 1;
  return KIND[k].pre + '-' + String(n).padStart(4, '0');
};
function addWork(dIso, n) {
  const d = new Date(dIso + 'T00:00:00');
  while (n > 0) {
    d.setDate(d.getDate() + 1);
    if (
      d.getDay() !== 0 &&
      d.getDay() !== 6 &&
      !HOLIDAYS.some(h => h.m === d.getMonth() && h.d === d.getDate())
    )
      n--;
  }
  return iso(d);
}
const daysAgo = n => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - n);
  return d;
};
const hDate = a => (a ? ftime(a) : '');
/* routes: manager first, then HR for long leave, large claims and back-dated requests */
function routeFor(k, r) {
  const e = emp(r.emp),
    m = mgrOf(e),
    hr = emp('E-1001'),
    st = [];
  if (m) st.push({ role: 'Manager', who: m.id, n: m.name });
  else st.push({ role: 'HR', who: hr.id, n: hr.name });
  const needHR =
    (k === 'leave' && (r.days >= 5 || r.from < iso(daysAgo(7)))) ||
    (k === 'claim' && r.amt >= 10000);
  if (needHR && st[0].who !== hr.id) st.push({ role: 'HR', who: hr.id, n: hr.name });
  return st;
}
function seedReq() {
  const off = {
    leave: { 1: 1, 2: 3, 3: 0, 4: 8, 5: 60, 6: 40 },
    claim: { 1: 2, 2: 12, 3: 4, 4: 30 },
    reg: {}
  };
  ['leave', 'claim', 'reg'].forEach(k =>
    KIND[k].list().forEach((r, i) => {
      if (r.route) return;
      r.route = routeFor(k, r);
      const s = stOf(k, r),
        back = off[k][r.id] != null ? off[k][r.id] : (i % 3) + 1,
        sub = iso(daysAgo(back));
      r.sub = sub;
      r.due = addWork(sub, 2);
      r.stage = s === 'Approved' ? r.route.length - 1 : 0;
      r.hist = [
        { at: sub + 'T09:30:00', by: emp(r.emp).name, as: 'Requester', act: 'Submitted', note: '' }
      ];
      if (s === 'Approved' || s === 'Rejected') {
        const a = mgrOf(emp(r.emp)) || emp('E-1001');
        r.hist.push({
          at: addWork(sub, 1) + 'T11:00:00',
          by: a.name,
          as: 'Manager',
          act: s,
          note: s === 'Rejected' ? 'Needed on the production line that week' : ''
        });
      }
      if (s === 'Rejected')
        r.rej = {
          by: (mgrOf(emp(r.emp)) || emp('E-1001')).name,
          at: addWork(sub, 1) + 'T11:00:00',
          note: 'Needed on the production line that week'
        };
    })
  );
}
/* who may decide a request right now */
function delegatesOf(toId) {
  const t = iso(TODAY);
  return S.deleg.filter(d => d.to === toId && d.start <= t && t <= d.end);
}
function ensureReq(k, r) {
  if (r.route && r.hist) return;
  r.route = r.route || routeFor(k, r);
  r.stage = r.stage || 0;
  r.sub = r.sub || iso(TODAY);
  r.due = r.due || addWork(r.sub, 2);
  r.hist = r.hist || [
    {
      at: r.sub + 'T09:30:00',
      by: (emp(r.emp) || { name: 'Unknown' }).name,
      as: 'Requester',
      act: 'Submitted',
      note: ''
    }
  ];
}
function canAct(k, r, actor) {
  ensureReq(k, r);
  actor = actor || me();
  const K = KIND[k],
    p = persona();
  if (stOf(k, r) !== 'Pending') return { ok: false, why: 'This request was already decided' };
  if (r.emp === actor.id) return { ok: false, why: 'You cannot approve your own request' };
  if (!can(K.res, 'approve', p))
    return { ok: false, why: 'You do not have permission to approve this' };
  if (
    !inScope(K.res, r.emp) &&
    !(r.route[r.stage] && delegatesOf(actor.id).some(d => d.from === r.route[r.stage].who))
  )
    return { ok: false, why: 'This person is outside your scope' };
  const s = r.route[r.stage] || r.route[r.route.length - 1];
  if (s.who === actor.id) return { ok: true, as: 'Approver' };
  if (delegatesOf(actor.id).some(d => d.from === s.who)) return { ok: true, as: 'Delegate' };
  if (['hr', 'admin'].includes(p.role) && r.due < iso(TODAY))
    return { ok: true, as: 'HR override', esc: true };
  if (['hr', 'admin'].includes(p.role)) return { ok: true, as: 'HR override' };
  return { ok: false, why: `Waiting for ${s.n} (${s.role})` };
}
const isOverdue = (k, r) => stOf(k, r) === 'Pending' && r.due < iso(TODAY);
const allReq = () => ['leave', 'claim', 'reg'].flatMap(k => KIND[k].list().map(r => ({ k, r })));
function queue(tab) {
  const t = iso(TODAY),
    inb = allReq().filter(
      ({ k, r }) =>
        (stOf(k, r) === 'Pending' && inScope(KIND[k].res, r.emp)) ||
        (stOf(k, r) === 'Pending' && canAct(k, r).ok)
    );
  const my = ({ k, r }) => {
    const a = canAct(k, r);
    return a.ok && (a.as !== 'HR override' || a.esc);
  };
  if (tab === 'mine') return inb.filter(x => my(x) && !x.r.ask && x.r.emp !== me().id);
  if (tab === 'overdue') return inb.filter(x => isOverdue(x.k, x.r) && canAct(x.k, x.r).ok);
  if (tab === 'ask') return inb.filter(x => x.r.ask);
  if (tab === 'deleg') return inb.filter(x => canAct(x.k, x.r).as === 'Delegate');
  if (tab === 'all') return inb.filter(x => canAct(x.k, x.r).ok);
  return allReq()
    .filter(
      ({ k, r }) =>
        stOf(k, r) !== 'Pending' &&
        (inScope(KIND[k].res, r.emp) || r.emp === me().id) &&
        can(KIND[k].res, 'approve')
    )
    .sort((a, b) => (b.r.hist[b.r.hist.length - 1].at > a.r.hist[a.r.hist.length - 1].at ? 1 : -1));
}
const nextOwner = (k, r) => {
  const s = r.route[r.stage] || r.route[r.route.length - 1];
  return `${s.n} (${s.role})`;
};
const ageTxt = r => {
  const d = Math.round((TODAY - new Date(r.sub + 'T00:00:00')) / 864e5);
  return d <= 0 ? 'Today' : d === 1 ? '1 day' : d + ' days';
};
function reqSummary(k, r) {
  const e = emp(r.emp);
  if (k === 'leave')
    return `${POLICY[r.type].n} · ${fdays(r.days)} · ${fshort(r.from)}${r.to !== r.from ? ' – ' + fshort(r.to) : ''}${r.half ? ' (' + (r.half === 'first' ? 'first' : 'second') + ' half)' : ''}`;
  if (k === 'claim') return `${r.cat} · ${inr(r.amt)}`;
  return `${r.type} · ${fshort(r.date)}`;
}
function regApply(r) {
  const key = r.emp + '|' + r.date;
  S.dayOv[key] = {
    in: r.in,
    out: r.out,
    note: r.type === 'Late mark waiver' ? 'Late mark waived' : 'Regularized',
    waiveLate: r.type === 'Late mark waiver'
  };
}
/* ---------- decisions ---------- */
function decideCore(k, r, st, note, silent) {
  const K = KIND[k],
    a = canAct(k, r);
  if (!a.ok) return { ok: false, why: a.why };
  const e = emp(r.emp),
    me_ = me(),
    last = r.stage >= r.route.length - 1 || a.as === 'HR override',
    ref = refOf(k, r),
    at = new Date().toISOString();
  let msg = '';
  if (st === 'Approved') {
    if (!last) {
      r.hist.push({
        at,
        by: me_.name,
        as: a.as,
        act: 'Approved (stage ' + (r.stage + 1) + ' of ' + r.route.length + ')',
        note: note || ''
      });
      r.stage++;
      msg = `Approved. Now waiting for ${nextOwner(k, r)}`;
      audit(`${K.n} approved (stage ${r.stage} of ${r.route.length})`, `${e.name} · ${ref}`, {
        res: K.res,
        from: 'Pending',
        to: 'Waiting for ' + r.route[r.stage].n,
        reason: note || ''
      });
    } else {
      setSt(k, r, 'Approved');
      r.hist.push({ at, by: me_.name, as: a.as, act: 'Approved', note: note || '' });
      if (k === 'reg') regApply(r);
      msg = `${K.n} approved`;
      audit(`${K.n} approved`, `${e.name} · ${ref}`, {
        res: K.res,
        from: 'Pending',
        to: 'Approved' + (a.as === 'HR override' ? ' (HR override)' : ''),
        reason: note || ''
      });
    }
  } else {
    setSt(k, r, 'Rejected');
    r.rej = { by: me_.name, at, note };
    r.hist.push({ at, by: me_.name, as: a.as, act: 'Rejected', note });
    msg = `${K.n} rejected`;
    audit(`${K.n} rejected`, `${e.name} · ${ref}`, {
      res: K.res,
      from: 'Pending',
      to: 'Rejected',
      reason: note
    });
  }
  r.ask = null;
  return { ok: true, msg, final: st === 'Rejected' || last };
}
function decideReq(k, id, st, note) {
  const r = KIND[k].list().find(x => x.id === id);
  if (!r) return;
  if (st === 'Rejected' && !(note || '').trim()) {
    if (!canAct(k, r).ok) {
      toast(canAct(k, r).why, null, 'err');
      return;
    }
    return rejectDialog(k, id);
  }
  const dop =
    k === 'reg' && S.dayOpen && document.querySelector('#layer .ov') ? [...S.dayOpen] : null;
  const out = decideCore(k, r, st, note);
  if (!out.ok) {
    toast(out.why, null, 'err');
    return;
  }
  persist();
  closeModal();
  render();
  if (dop) attDay(...dop);
  toast(out.msg, null, { label: 'View', fn: () => reqDetail(k, id) });
}
function rejectDialog(k, id) {
  const r = KIND[k].list().find(x => x.id === id),
    e = emp(r.emp),
    pre = [
      'Not enough notice',
      'Needed on the production line',
      'Balance is not enough',
      'Please resubmit with details'
    ];
  overlay(
    'Reject this request',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)} · ${esc(reqSummary(k, r))}</p><div class="fg">${fld('rj-n', 'Reason for rejecting (required)', `<textarea id="rj-n" rows="3" placeholder="${esc(e.name.split(' ')[0])} will see this reason" oninput="this.dataset.d=1"></textarea>`, 'full')}</div>
   <div class="chips" role="group" aria-label="Common reasons">${pre.map(t => `<button type="button" class="chip mute btnchip" onclick="$('#rj-n').value=this.textContent;$('#rj-n').focus()">${t}</button>`).join('')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="rejectGo('${k}',${id})">Reject request</button>`
  );
}
function rejectGo(k, id) {
  const t = $('#rj-n').value.trim();
  if (!chk('rj-n', !!t, 'A reason is required so the person knows what to change')) return;
  decideReq(k, id, 'Rejected', t);
}
function infoDialog(k, id) {
  const r = KIND[k].list().find(x => x.id === id),
    e = emp(r.emp);
  overlay(
    'Ask for more information',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)} · ${esc(reqSummary(k, r))}. The request stays open and is marked as waiting on ${esc(e.name.split(' ')[0])}.</p><div class="fg">${fld('ai-q', 'Your question', `<textarea id="ai-q" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="infoGo('${k}',${id})">Send question</button>`
  );
}
function infoGo(k, id) {
  const t = $('#ai-q').value.trim();
  if (!chk('ai-q', !!t, 'Write the question')) return;
  const r = KIND[k].list().find(x => x.id === id);
  if (!canAct(k, r).ok) {
    toast(canAct(k, r).why, null, 'err');
    return;
  }
  r.ask = { q: t, by: me().name, at: new Date().toISOString() };
  r.hist.push({
    at: r.ask.at,
    by: me().name,
    as: canAct(k, r).as,
    act: 'Asked for more information',
    note: t
  });
  audit(`${KIND[k].n} information requested`, `${emp(r.emp).name} · ${refOf(k, r)}`, {
    res: KIND[k].res,
    reason: t
  });
  persist();
  closeModal();
  render();
  toast('Question sent. The request is waiting on ' + emp(r.emp).name.split(' ')[0]);
}
function replyGo(k, id) {
  const t = ($('#ri-t') || {}).value;
  if (!chk('ri-t', !!(t || '').trim(), 'Write your reply')) return;
  const r = KIND[k].list().find(x => x.id === id);
  r.hist.push({
    at: new Date().toISOString(),
    by: me().name,
    as: 'Requester',
    act: 'Replied',
    note: t.trim()
  });
  r.ask = null;
  audit(`${KIND[k].n} information provided`, `${emp(r.emp).name} · ${refOf(k, r)}`, {
    res: KIND[k].res,
    reason: t.trim()
  });
  persist();
  closeModal();
  render();
  toast('Reply sent to ' + nextOwner(k, r));
}
function cancelReq(k, id) {
  const r = KIND[k].list().find(x => x.id === id);
  if (r.emp !== me().id || stOf(k, r) !== 'Pending') return;
  confirmBox(
    'Cancel this request?',
    'The approver will no longer see it. This is recorded in the request history.',
    'Cancel request',
    () => {
      setSt(k, r, 'Cancelled');
      r.hist.push({
        at: new Date().toISOString(),
        by: me().name,
        as: 'Requester',
        act: 'Cancelled',
        note: ''
      });
      audit(`${KIND[k].n} cancelled`, `${me().name} · ${refOf(k, r)}`, { res: KIND[k].res });
      persist();
      closeModal();
      render();
      toast('Request cancelled');
    },
    true
  );
}
const cancelLeave = id => cancelReq('leave', id);
/* ---------- bulk: preview first, then apply with a result for every row ---------- */
function bulkItems(scope) {
  const ids = [...S.sel.ids];
  return ids
    .map(sid => {
      if (scope === 'ap') {
        const k = ['', 'leave', 'claim', 'reg'][Math.floor(sid / 1e13)],
          id = sid % 1e13;
        return { k, r: KIND[k].list().find(x => x.id === id) };
      }
      return { k: scope, r: KIND[scope].list().find(x => x.id === sid) };
    })
    .filter(x => x.r);
}
function bulkCheck(x, st) {
  const a = canAct(x.k, x.r);
  if (!a.ok) return { ok: false, why: a.why };
  if (x.k === 'leave' && st === 'Approved') {
    const b = balances(x.r.emp)[x.r.type];
    if (x.r.days > b.left)
      return { ok: false, why: `Balance is ${b.left} days, request is ${x.r.days}` };
    if (x.r.type === 'SL' && x.r.days > W().certDays && !x.r.att)
      return { ok: false, why: 'Medical certificate missing' };
  }
  const last = x.r.stage >= x.r.route.length - 1 || a.as === 'HR override';
  return {
    ok: true,
    note:
      st === 'Approved'
        ? last
          ? 'Approved'
          : 'Moves on to ' + x.r.route[x.r.stage + 1].n + ' (HR)'
        : 'Rejected',
    as: a.as
  };
}
function bulkDecide(scope, st) {
  const items = bulkItems(scope);
  if (!items.length) return;
  const rows = items.map(x => ({ x, c: bulkCheck(x, st) })),
    ok = rows.filter(r => r.c.ok),
    bad = rows.filter(r => !r.c.ok),
    verb = st === 'Approved' ? 'Approve' : 'Reject';
  const line = ({ x, c }) =>
    `<div class="li"><div class="grow"><b>${esc(emp(x.r.emp).name)}</b><div class="muted small">${esc(KIND[x.k].n)} · ${esc(reqSummary(x.k, x.r))}</div></div><span class="small ${c.ok ? '' : 'muted'}" style="text-align:right;max-width:46%">${esc(c.ok ? c.note : c.why)}</span></div>`;
  overlay(
    `${verb} ${ok.length} of ${rows.length}?`,
    `<p class="muted small" style="margin-bottom:10px">Review before anything changes. Each decision is recorded in the audit log.</p>
   ${ok.length ? `<h3 class="dsub">Ready (${ok.length})</h3><div class="list">${ok.map(line).join('')}</div>` : ''}${bad.length ? `<h3 class="dsub" style="margin-top:14px">Needs attention, skipped (${bad.length})</h3><div class="list">${bad.map(line).join('')}</div>` : ''}
   ${st === 'Rejected' && ok.length ? `<div class="fg" style="margin-top:12px">${fld('bk-n', 'Reason shown to each person (required)', `<textarea id="bk-n" rows="2"></textarea>`, 'full')}</div>` : ''}`,
    `<button class="btn" onclick="dismissModal()">Cancel</button>${ok.length ? `<button class="btn ${st === 'Approved' ? 'primary' : 'bad'}" onclick="bulkGo('${scope}','${st}')">${verb} ${ok.length}</button>` : ''}`,
    { wide: true }
  );
}
function bulkGo(scope, st) {
  const note = st === 'Rejected' ? ($('#bk-n').value || '').trim() : '';
  if (st === 'Rejected' && !chk('bk-n', !!note, 'A reason is required')) return;
  const items = bulkItems(scope),
    res = { done: 0, moved: 0, skip: [] };
  items.forEach(x => {
    const c = bulkCheck(x, st);
    if (!c.ok) {
      res.skip.push(x);
      return;
    }
    const o = decideCore(x.k, x.r, st, note);
    if (o.ok) {
      o.final ? res.done++ : res.moved++;
    } else res.skip.push(x);
  });
  S.sel = { scope: '', ids: [] };
  persist();
  closeModal();
  render();
  toast(
    `${res.done} ${st === 'Approved' ? 'approved' : 'rejected'}${res.moved ? `, ${res.moved} moved to the next approver` : ''}${res.skip.length ? `, ${res.skip.length} skipped` : ''}`
  );
}
/* ---------- delegation ---------- */
function delegOpen() {
  const people = live().filter(e => e.id !== me().id);
  overlay(
    'Delegate my approvals',
    `<p class="muted small" style="margin-bottom:10px">While you are away, the person you choose can decide the requests that would come to you. Every decision they make is recorded with their name.</p><div class="fg">${fld('dg-t', 'Delegate to', `<select id="dg-t">${people.map(e => `<option value="${e.id}">${esc(e.name)} · ${esc(e.title)}</option>`).join('')}</select>`, 'full')}${fld('dg-s', 'From', `<input id="dg-s" type="date" value="${iso(TODAY)}">`)}${fld('dg-e', 'Until', `<input id="dg-e" type="date" value="${iso(addWork(iso(TODAY), 5) ? new Date(addWork(iso(TODAY), 5) + 'T00:00:00') : TODAY)}">`)}</div>
   ${
     S.deleg.filter(d => d.from === me().id).length
       ? `<h3 class="dsub">Current delegations</h3><div class="list">${S.deleg
           .filter(d => d.from === me().id)
           .map(
             d =>
               `<div class="li"><div class="grow"><b>${esc(emp(d.to).name)}</b><div class="muted small">${fdate(d.start)} to ${fdate(d.end)}</div></div><button class="btn sm" onclick="delegEnd(${d.id})">End</button></div>`
           )
           .join('')}</div>`
       : ''
   }`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="delegSave()">Delegate</button>`
  );
}
function delegSave() {
  const to = $('#dg-t').value,
    s = $('#dg-s').value,
    e = $('#dg-e').value;
  if (
    ![
      chk('dg-s', !!s, 'Choose a start date'),
      chk('dg-e', !!e && e >= s, 'End date must be on or after the start')
    ].every(Boolean)
  )
    return;
  S.deleg.push({
    id: Date.now(),
    from: me().id,
    to,
    start: s,
    end: e,
    by: me().name,
    at: new Date().toISOString()
  });
  audit('Approvals delegated', me().name, {
    res: 'approvals',
    to: emp(to).name + ', ' + fdate(s) + ' to ' + fdate(e)
  });
  persist();
  closeModal();
  render();
  toast('Delegated to ' + emp(to).name);
}
function delegEnd(id) {
  const d = S.deleg.find(x => x.id === id);
  S.deleg = S.deleg.filter(x => x.id !== id);
  audit('Delegation ended', me().name, { res: 'approvals', to: emp(d.to).name });
  persist();
  closeModal();
  render();
  toast('Delegation ended');
}

/* js/features/approvals/request-detail.js */
/* ---------- request detail: calendar working, route, history, comments ---------- */
function routeHTML(k, r) {
  const s = stOf(k, r);
  return `<ol class="route" aria-label="Approval route">${r.route
    .map((x, i) => {
      const done =
          s === 'Approved' || (s === 'Pending' && i < r.stage) || (s === 'Rejected' && i < r.stage),
        cur = s === 'Pending' && i === r.stage;
      return `<li class="${done ? 'done' : cur ? 'cur' : ''}"><span class="rn">${done ? ic('check', 12) : i + 1}</span><span><b>${esc(x.n)}</b><span class="muted small"> · ${x.role}${cur ? ' · deciding now' : ''}</span></span></li>`;
    })
    .join('')}</ol>`;
}
function histHTMLreq(r) {
  return `<div class="list">${r.hist
    .slice()
    .reverse()
    .map(
      h =>
        `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(h.act)}</b><div class="muted small">${esc(h.by)}${h.as && h.as !== 'Requester' ? ' · ' + esc(h.as) : ''} · ${ftime(h.at)}</div>${h.note ? `<div class="small" style="margin-top:2px">“${esc(h.note)}”</div>` : ''}</div></div>`
    )
    .join('')}</div>`;
}
function reqDetail(k, id) {
  const r = KIND[k].list().find(x => x.id === id);
  if (!r) return;
  const e = emp(r.emp),
    s = stOf(k, r),
    a = canAct(k, r),
    mine = r.emp === me().id,
    row = (x, y) =>
      `<div class="li"><span class="muted grow">${x}</span><b style="text-align:right">${y}</b></div>`;
  let rows = '';
  if (k === 'leave') {
    const c = leaveCalc(e, r.from, r.to, r.half),
      bal = balances(r.emp)[r.type],
      ov = teamOverlap(r.emp, r.from, r.to, r.id);
    rows =
      row('Type', POLICY[r.type].n) +
      row(
        'Dates',
        fdate(r.from) +
          (r.to !== r.from ? ' to ' + fdate(r.to) : '') +
          (r.half ? ' · ' + (r.half === 'first' ? 'first' : 'second') + ' half' : '')
      ) +
      row('Chargeable', fdays(r.days) + ' · ' + calLabel(e)) +
      (c.excluded.length
        ? row('Not charged', c.excluded.map(x => `${fshort(x.date)} (${x.name})`).join(', '))
        : '') +
      row('Reason', esc(r.reason)) +
      (r.att
        ? row(
            'Attachment',
            canField('med', r.emp)
              ? esc(r.att.name) + ' · ' + Math.max(1, Math.round(r.att.size / 1024)) + ' KB'
              : restricted()
          )
        : '') +
      (s === 'Pending'
        ? row('Balance', `${bal.left} left, ${+(bal.left - r.days).toFixed(1)} after this`)
        : '') +
      row('Team overlap', ov.length ? esc(overlapText(ov)) : 'No teammates off on these dates');
  } else if (k === 'claim')
    rows =
      row('Category', r.cat) +
      row('Amount', inr(r.amt)) +
      row('Expense date', fdate(r.date)) +
      row('Note', esc(r.note));
  else
    rows =
      row('Type', r.type) +
      row('Date', fdate(r.date)) +
      row('Times', `${r.in || '–'} to ${r.out || '–'}`) +
      row('Reason', esc(r.reason || ''));
  const askBox = r.ask
    ? `<div class="note ${mine ? '' : 'warn'}" style="margin:12px 0"><b>${esc(r.ask.by)} asked:</b> “${esc(r.ask.q)}”</div>${mine ? `<div class="fg">${fld('ri-t', 'Your reply', `<textarea id="ri-t" rows="3"></textarea>`, 'full')}</div>` : ''}`
    : '';
  const od = s === 'Pending' && r.due < iso(TODAY);
  overlay(
    `${KIND[k].n} request`,
    `<div class="person" style="margin-bottom:12px">${av(e.name, 44)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(refOf(k, r))}</span><div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">${stChip(s)}${r.ask ? chip('Waiting on ' + e.name.split(' ')[0], 'warn', 1) : ''}${od ? chip('Overdue', 'bad', 1) : ''}</div></div></div>
   <div class="list">${rows}</div>${askBox}
   <h3 class="dsub">Approval route</h3>${routeHTML(k, r)}${s === 'Pending' ? `<p class="muted small">Submitted ${ageTxt(r)} ago · decision due ${fdate(r.due)}${a.as === 'HR override' ? ' · you can decide as HR' : ''}${a.as === 'Delegate' ? ' · you are deciding as a delegate' : ''}</p>` : ''}
   ${s === 'Rejected' && r.rej ? `<div class="note bad" style="margin-top:8px"><b>Reason:</b> ${esc(r.rej.note)}</div>` : ''}<h3 class="dsub">History</h3>${histHTMLreq(r)}`,
    `${a.ok ? `<button class="btn ok" onclick="decideReq('${k}',${id},'Approved')">${ic('check', 16)}Approve</button><button class="btn bad" onclick="decideReq('${k}',${id},'Rejected')">Reject</button><button class="btn" onclick="infoDialog('${k}',${id})">Ask for information</button>` : ''}${mine && r.ask ? `<button class="btn primary" onclick="replyGo('${k}',${id})">Send reply</button>` : ''}${mine && s === 'Pending' ? `<button class="btn" onclick="cancelReq('${k}',${id})">Cancel request</button>` : ''}<button class="btn" onclick="closeModal()">Close</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
const leaveDetail = id => reqDetail('leave', id),
  claimDetail = id => reqDetail('claim', id);
{
  const _q = reqDetail;
  reqDetail = function (k, id) {
    _q.apply(this, arguments);
    const r = KIND[k].list().find(x => x.id === id);
    if (r) recent('req', k + ':' + id, refOf(k, r), emp(r.emp).name + ' · ' + reqSummary(k, r));
  };
}

/* js/features/approvals/workspace.js */
/* ---------- approvals workspace ---------- */
function apRows(list, tab) {
  return list.map(({ k, r }) => {
    const e = emp(r.emp),
      a = canAct(k, r),
      od = isOverdue(k, r),
      done = stOf(k, r) !== 'Pending',
      sid = { leave: 1, claim: 2, reg: 3 }[k] * 1e13 + r.id,
      last = r.hist[r.hist.length - 1];
    return {
      click: `reqDetail('${k}',${r.id})`,
      sid: !done && a.ok ? sid : null,
      cells: [
        `<span class="tk ${KIND[k].tone}">${KIND[k].n}</span> ${esc(reqSummary(k, r))}`,
        `${refOf(k, r)}${r.ask ? ' · waiting on requester' : ''}`,
        person(e),
        esc(e.dept),
        done ? stChip(stOf(k, r)) : ageTxt(r),
        done ? esc(last.by) : `${fshort(r.due)}${od ? ' ' + chip('Overdue', 'bad', 1) : ''}`,
        done
          ? fshort(last.at.slice(0, 10))
          : `${r.stage + 1} of ${r.route.length} · ${esc(r.route[r.stage].role)}${a.as && a.as !== 'Approver' ? ' (' + esc(a.as) + ')' : ''}`,
        done || !a.ok
          ? ''
          : `<button class="btn ok sm" onclick="event.stopPropagation();decideReq('${k}',${r.id},'Approved')" aria-label="Approve ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm" onclick="event.stopPropagation();decideReq('${k}',${r.id},'Rejected')" aria-label="Reject ${esc(e.name)}">${ic('x', 14)}<span class="bt">Reject</span></button>`
      ]
    };
  });
}
function approvalsPage() {
  const tabsL = [
      ['mine', 'Waiting for me'],
      ['overdue', 'Overdue'],
      ['ask', 'Waiting on requester'],
      ['deleg', 'Delegated to me'],
      ...(scopeOf('approvals') === 'all' ? [['all', 'All pending']] : []),
      ['done', 'Completed']
    ],
    cur = curTab('ap', 'mine'),
    cnt = t => queue(t).length,
    list = queue(cur).filter(x => (S.apType || 'all') === 'all' || x.k === S.apType),
    done = cur === 'done';
  const hd = [
    { h: 'Request', keep: 1, sel: 'ap' },
    { h: 'Reference', xm: 1 },
    { h: 'Requester', xm: 1 },
    { h: 'Department', xm: 1 },
    { h: done ? 'Decision' : 'Age', xm: !done },
    { h: done ? 'Decided by' : 'Due', xm: 1 },
    { h: done ? 'Decided on' : 'Stage', xm: 1 },
    { h: '', act: 1 }
  ];
  const dl = delegatesOf(me().id);
  return (
    ph(
      'Approvals',
      'Everything that needs a decision from you, with who is next and by when',
      `<button class="btn" onclick="delegOpen()">Delegate approvals</button>`
    ) +
    `${dl.length ? `<div class="note" style="margin-bottom:0">You are covering for ${dl.map(d => esc(emp(d.from).name)).join(', ')} until ${fdate(dl[0].end)}.</div>` : ''}
   <div class="card"><div class="head">${tabs(
     'ap',
     tabsL.map(([v, l]) => [v, l + (v === 'done' ? '' : ` (${cnt(v)})`)]),
     'mine'
   )}<label class="dd"><span class="sr">Request type</span><select class="sel" onchange="S.apType=this.value;render()"><option value="all">All types</option>${Object.keys(
     KIND
   )
     .map(k => `<option value="${k}" ${S.apType === k ? 'selected' : ''}>${KIND[k].n}</option>`)
     .join('')}</select></label></div>
   ${rtable(hd, apRows(list, cur), { scope: 'ap', et: done ? 'No decisions yet' : 'All caught up', em: done ? 'Decided requests appear here.' : 'Nothing is waiting for you in this view.' })}</div>
   <p class="muted small">Overdue requests escalate to HR so nothing waits forever. Rejections need a reason, and every decision is kept in the request history and the audit log.</p>`
  );
}
function approvalItems() {
  return queue('mine')
    .slice()
    .sort((a, b) => (a.r.due < b.r.due ? -1 : 1))
    .map(({ k, r }) => ({
      k: KIND[k].n,
      kind: k,
      id: r.id,
      tone: KIND[k].tone,
      emp: r.emp,
      sub: reqSummary(k, r) + (isOverdue(k, r) ? ' · overdue' : ''),
      open: `reqDetail('${k}',${r.id})`,
      ok: `decideReq('${k}',${r.id},'Approved')`,
      no: `decideReq('${k}',${r.id},'Rejected')`
    }));
}
function approvalsCard() {
  const all = approvalItems(),
    by = k => all.filter(x => x.k === k).length,
    show = all.slice(0, 4);
  const body = show.length
    ? `<div class="list">${show
        .map(x => {
          const e = emp(x.emp);
          return `<div class="li"><button class="cname" style="flex:1 1 230px;width:auto" onclick="${x.open}" aria-label="${esc(e.name)} · ${esc(x.k)} · ${esc(x.sub)}">${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span class="apr-summary" title="${esc(x.sub)}"><span class="tk ${x.tone}">${x.k}</span><span>${esc(x.sub)}</span></span></span></button><div class="acts" style="gap:6px"><button class="btn ok sm" onclick="event.stopPropagation();${x.ok}" aria-label="Approve ${x.k.toLowerCase()} for ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm ico" onclick="event.stopPropagation();${x.no}" aria-label="Reject ${x.k.toLowerCase()} for ${esc(e.name)}">${ic('x', 14)}</button></div></div>`;
        })
        .join('')}</div>`
    : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>All caught up</b>Nothing is waiting for you.</div>`;
  return `<div class="card apr" id="approvals"><div class="head"><div><h2>Needs your approval</h2><p class="sub">Leave, corrections and claims, oldest due first</p></div>${all.length ? chip(all.length + ' waiting', 'warn', 1) : ''}</div>${body}
   <div class="apr-foot"><button class="link" onclick="S.tab.ap='mine';go('approvals')">Open approvals (${all.length})</button><button class="link" onclick="S.tab.ap='overdue';go('approvals')">Overdue (${queue('overdue').length})</button></div></div>`;
}
function pendingLv() {
  return queue('mine')
    .filter(x => x.k === 'leave')
    .map(x => x.r);
}
const apBadge = () => queue('mine').length;

/* js/features/leave/leave-application.js */
/* ---------- leave on the real calendar ---------- */
function balances(id) {
  const o = {};
  for (const k in POLICY) {
    const used = leaveUsed(id, k);
    o[k] = { t: POLICY[k].t, left: Math.max(0, +(POLICY[k].t - used).toFixed(1)), used };
  }
  return o;
}
function lvDraft() {
  S.drafts.leave = {
    t: $('#lt').value,
    f: $('#lf').value,
    to: $('#lto').value,
    r: $('#lr').value,
    h: $('#lh').value
  };
  saveGov();
}
function lvCheck() {
  const e = me(),
    k = $('#lt').value,
    f = $('#lf').value,
    t = $('#lto').value,
    h = $('#lh').value,
    half = f && f === t && h !== 'full' ? h : '';
  if (!f || !t || t < f)
    return { err: ['End date must be on or after the start date'], warn: [], c: null };
  const c = leaveCalc(e, f, t, !!half),
    b = balances(e.id)[k],
    err = [],
    warn = [],
    w = W();
  if (!c.chargeable) err.push('Those dates are all non-working days on your calendar');
  if (c.chargeable > b.left)
    err.push(
      `Not enough balance: you have ${b.left} days of ${POLICY[k].n.toLowerCase()} and this needs ${c.chargeable}`
    );
  if (
    S.leaves.some(
      l => l.emp === e.id && ['Pending', 'Approved'].includes(l.status) && l.from <= t && f <= l.to
    )
  )
    err.push('You already have leave on some of these dates');
  const need = k === 'SL' && c.chargeable > w.certDays;
  if (need && !S.lvAtt)
    err.push(`A medical certificate is required for sick leave over ${w.certDays} days`);
  if (k === 'EL' && c.chargeable && f < addWork(iso(TODAY), w.noticeEL))
    warn.push(
      `Earned leave needs ${w.noticeEL} working days' notice. HR may ask you to change the dates.`
    );
  if (f < iso(daysAgo(7))) warn.push('Requests more than 7 days old also need HR approval.');
  const ov = teamOverlap(e.id, f, t, 0);
  if (ov.length)
    warn.push(
      `${ov.length} teammate${ov.length > 1 ? 's are' : ' is'} also off: ${overlapText(ov)}`
    );
  return {
    err,
    warn,
    c,
    b,
    need,
    route: routeFor('leave', { emp: e.id, days: c.chargeable, from: f }),
    k,
    half
  };
}
function applyLeave(f0) {
  if (typeof f0 !== 'string') f0 = '';
  S.lvAtt = null;
  const d = S.drafts.leave,
    use = d && !f0;
  overlay(
    'Apply for leave',
    `<div class="note" style="margin-bottom:12px">${ic('cal', 14)} Your calendar: <b>${calLabel(me())}</b>. Weekly offs and company holidays are not charged.</div>${use ? `<p class="muted small" style="margin:-2px 0 10px">Resuming your saved draft.</p>` : ''}
   <div class="fg">${fld(
     'lt',
     'Leave type',
     `<select id="lt" onchange="lvPreview()">${Object.entries(POLICY)
       .map(
         ([k, v]) => `<option value="${k}" ${use && d.t === k ? 'selected' : ''}>${v.n}</option>`
       )
       .join('')}</select>`,
     'full'
   )}
   ${fld('lf', 'From', `<input id="lf" type="date" value="${use ? d.f : f0 || iso(NOW)}" oninput="lvPreview()">`)}${fld('lto', 'To', `<input id="lto" type="date" value="${use ? d.to : f0 || iso(NOW)}" oninput="lvPreview()">`)}
   ${fld('lh', 'Day type', `<select id="lh" onchange="lvPreview()"><option value="full">Full day</option><option value="first" ${use && d.h === 'first' ? 'selected' : ''}>First half only</option><option value="second" ${use && d.h === 'second' ? 'selected' : ''}>Second half only</option></select>`, 'full')}
   <div class="full" id="lvp" style="margin:-4px 0 12px"></div>
   ${fld('lr', 'Reason', `<textarea id="lr" rows="3" placeholder="A short note for your approver" oninput="lvDraft()">${use ? esc(d.r) : ''}</textarea>`, 'full')}
   <div class="field full" id="lv-attw"></div></div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="saveLeave()">Submit request</button>`
  );
  lvPreview();
}
function lvPreview() {
  const r = lvCheck();
  if (!r.c) {
    $('#lvp').innerHTML =
      r.err.length && $('#lf').value && $('#lto').value
        ? `<div class="chip bad nb" style="padding:6px 12px">${r.err[0]}</div>`
        : '';
    $('#lv-attw').innerHTML = '';
    return;
  }
  const c = r.c,
    after = +(r.b.left - c.chargeable).toFixed(1),
    ex = c.excluded;
  $('#lvp').innerHTML =
    `<div class="calc"><div class="cr"><span>Chargeable</span><b>${fdays(c.chargeable)}</b></div>${ex.length ? `<div class="cr"><span>Not charged</span><span>${ex.map(x => `${fshort(x.date)} ${x.name}`).join(', ')}</span></div>` : ''}<div class="cr"><span>Balance</span><span>${r.b.left} → <b>${after}</b> days of ${POLICY[r.k].n.toLowerCase()}</span></div><div class="cr"><span>Goes to</span><span>${r.route.map(x => esc(x.n) + ' (' + x.role + ')').join(' then ')}</span></div></div>
   ${r.err.map(m => `<div class="chip bad nb msg">${ic('alert', 14)}&nbsp;${esc(m)}</div>`).join('')}${r.warn.map(m => `<div class="chip warn nb msg" ${/also off/.test(m) ? 'id="lv-overlap"' : ''}>${ic('alert', 14)}&nbsp;${esc(m)}</div>`).join('')}`;
  $('#lv-attw').innerHTML =
    `<label for="lv-file">Attachment${r.need ? ' (required)' : ' (optional)'}</label>${S.lvAtt ? `<div class="attach"><b>${esc(S.lvAtt.name)}</b><span class="muted small">${Math.max(1, Math.round(S.lvAtt.size / 1024))} KB</span><button type="button" class="btn sm" onclick="S.lvAtt=null;lvPreview()">Remove</button></div>` : `<input id="lv-file" type="file" accept=".pdf,.jpg,.jpeg,.png" onchange="lvFile(this)"><div class="muted small" id="lv-prog" role="status"></div>`}<div class="err" id="lv-file-e" role="alert"></div>`;
}
function lvFile(inp) {
  const f = inp.files[0];
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) {
    $('#lv-file-e').textContent = 'Keep the file under 5 MB';
    inp.value = '';
    return;
  }
  const rd = new FileReader(),
    p = $('#lv-prog');
  rd.onprogress = e => {
    if (e.lengthComputable)
      p.textContent = 'Uploading ' + Math.round((e.loaded / e.total) * 100) + '%';
  };
  rd.onload = () => {
    S.lvAtt = { name: f.name, size: f.size };
    lvPreview();
  };
  rd.onerror = () => {
    p.textContent = 'Upload failed. Try again.';
  };
  rd.readAsArrayBuffer(f);
}
function saveLeave() {
  const r = lvCheck(),
    t = $('#lr').value.trim();
  const ok = [
    chk('lr', !!t, 'Add a short reason'),
    chk('lto', !r.err.length, r.err[0] || '')
  ].every(Boolean);
  if (!ok || !r.c) return;
  const u = me(),
    k = r.k,
    f = $('#lf').value,
    to = $('#lto').value,
    l = {
      id: Date.now(),
      ref: nextRef('leave'),
      emp: u.id,
      type: k,
      from: f,
      to,
      days: r.c.chargeable,
      half: r.half || undefined,
      reason: t,
      status: 'Pending',
      att: S.lvAtt || null,
      calc: 1
    };
  l.route = r.route;
  l.stage = 0;
  l.sub = iso(TODAY);
  l.due = addWork(l.sub, 2);
  l.hist = [
    { at: new Date().toISOString(), by: u.name, as: 'Requester', act: 'Submitted', note: t }
  ];
  S.leaves.unshift(l);
  S.drafts.leave = null;
  S.lvAtt = null;
  audit('Leave submitted', `${u.name} · ${l.ref}`, {
    res: 'leave',
    to: `${fdays(l.days)}, ${fdate(f)}${f !== to ? ' to ' + fdate(to) : ''}`
  });
  S.tab.lv = 'mine';
  persist();
  closeModal();
  render();
  toast(
    `Leave request ${l.ref} submitted. Waiting for ${nextOwner('leave', l)}, due ${fshort(l.due)}`,
    null,
    { label: 'View request', fn: () => reqDetail('leave', l.id) }
  );
}
guardFns([
  ['decide', 'leave', 'approve', 'decide leave requests'],
  ['decideClaim', 'requests', 'approve', 'decide claims'],
  ['decideReg', 'attendance', 'approve', 'decide corrections']
]);
function decide(id, s) {
  decideReq('leave', id, s);
}
function decideClaim(id, s) {
  decideReq('claim', id, s);
}
function decideReg(id, s) {
  decideReq('reg', id, s);
}
seedReq();
{
  const _rn = render;
  render = function () {
    _rn();
    applyPerms(document.getElementById('view'));
  };
}
{
  const _ov = overlay;
  overlay = function () {
    _ov.apply(this, arguments);
    applyPerms(document.getElementById('layer'));
  };
}

/* js/features/payroll/payroll.js */
/* =====================================================================
   v38 · payroll: validation, variance, maker-checker, lock and payment states
   ===================================================================== */
S.pay = Object.assign(
  { prep: null, appr: null, locked: false, ack: {}, log: [], bank: null, res: {} },
  S.pay || {}
);
const CYC = { a: '2026-10-01', b: '2026-10-31', n: 'October 2026' };
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'];
(function seedBank() {
  employees.forEach(e => {
    if (e.bank !== undefined) return;
    if (e.id === 'E-1016') {
      e.bank = null;
      return;
    }
    const h = [...e.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7);
    e.bank = {
      b: e.id === 'E-1003' ? 'HDFC Bank' : BANKS[h % BANKS.length],
      l4: e.id === 'E-1003' ? '4821' : String(1000 + (h % 8999)),
      ifsc: 'HDFC0001234'.replace('HDFC', ['HDFC', 'ICIC', 'SBIN', 'UTIB', 'KKBK'][h % 5]),
      fail: e.id === 'E-1012'
    };
  });
  const m = emp('E-1010');
  if (m && m.panMissing === undefined) m.panMissing = true;
})();
const PREV = { 'E-1011': { lop: 1 }, 'E-1013': { ctc: 420000 }, 'E-1015': { ctc: 372000 } };
function prevSlip(e) {
  if (e.join >= CYC.a) return null;
  const p = PREV[e.id] || {},
    s = slipWith(p.ctc || e.ctc, ST()),
    lop = ((p.lop || 0) * s.m) / 30;
  return { ...s, lop, net: s.net - lop };
}
const payTot = (l, prev) =>
  l.reduce(
    (a, e) => {
      const s = prev ? prevSlip(e) : slip(e.ctc);
      if (!s) return a;
      a.g += s.m;
      a.d += s.ded + (s.lop || 0);
      a.n += s.net;
      a.c++;
      return a;
    },
    { g: 0, d: 0, n: 0, c: 0 }
  );
const pctD = (a, b) => (b ? ((a - b) / b) * 100 : 0);
const fpct = x => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x).toFixed(1) + '%';
function payLog(act, note) {
  const u = me();
  S.pay.log.unshift({
    at: new Date().toISOString(),
    by: u.name,
    id: u.id,
    as: persona().n,
    act,
    note: note || ''
  });
  if (S.pay.log.length > 40) S.pay.log.length = 40;
  audit('Payroll: ' + act, CYC.n + ' payroll', { res: 'payroll', reason: note || '' });
  persist();
}
function payCheck() {
  const err = [],
    warn = [],
    L = live(),
    th = W().varPct,
    s = n => (n === 1 ? '' : 's');
  const rg = S.regs.filter(r => r.status === 'Pending' && r.date >= CYC.a && r.date <= CYC.b);
  if (rg.length)
    err.push({
      id: 'reg',
      title: `${rg.length} attendance correction${s(rg.length)} still pending`,
      detail: rg.map(r => emp(r.emp).name + ' · ' + fshort(r.date)).join('; '),
      link: ['Open the first', `reqDetail('reg',${rg[0].id})`]
    });
  const lv = S.leaves.filter(l => l.status === 'Pending' && l.to >= CYC.a && l.from <= CYC.b);
  if (lv.length)
    err.push({
      id: 'lv',
      title: `${lv.length} leave request${s(lv.length)} in ${CYC.n.split(' ')[0]} still pending`,
      detail:
        lv.map(l => emp(l.emp).name + ' · ' + fshort(l.from)).join('; ') +
        '. Pending leave changes pay days.',
      link: ['Open the first', `reqDetail('leave',${lv[0].id})`]
    });
  L.filter(e => !e.bank).forEach(e =>
    err.push({
      id: 'bank-' + e.id,
      title: `${e.name} has no bank account on file`,
      detail: 'Salary cannot be paid until bank details are added.',
      link: ['Add bank details', `bankEdit('${e.id}')`]
    })
  );
  L.filter(e => slip(e.ctc).net <= 0).forEach(e =>
    err.push({
      id: 'neg-' + e.id,
      title: `${e.name} has zero or negative net pay`,
      detail: 'Check deductions against salary.',
      link: ['Open profile', `empProfile('${e.id}','job')`]
    })
  );
  const nj = L.filter(e => e.join >= CYC.a && e.join <= CYC.b);
  if (nj.length)
    warn.push({
      id: 'new',
      title: `${nj.length} new joiner${s(nj.length)}: first payroll`,
      detail:
        nj.map(e => e.name + ' (joined ' + fshort(e.join) + ')').join('; ') +
        '. Check joining forms and documents.',
      link: ['Open joiners', "go('lifecycle')"]
    });
  L.filter(e => e.panMissing).forEach(e =>
    warn.push({
      id: 'pan-' + e.id,
      title: `${e.name}: PAN not on file`,
      detail: 'TDS may be deducted at a higher rate until it is added.',
      link: ['Open profile', `empProfile('${e.id}','docs')`]
    })
  );
  L.forEach(e => {
    const p = prevSlip(e);
    if (!p) return;
    const c = slip(e.ctc),
      v = pctD(c.net, p.net);
    if (Math.abs(v) >= th)
      warn.push({
        id: 'var-' + e.id,
        title: `${e.name}: net pay ${fpct(v)} vs last month`,
        detail: `${inr(p.net)} → ${inr(c.net)}. Alert threshold is ${th}%.`,
        link: ['See what changed', `payVariance('${e.id}')`]
      });
  });
  return { err, warn };
}
function payVariance(id) {
  const e = emp(id),
    p = prevSlip(e),
    c = slip(e.ctc);
  if (!canField('salary', id)) {
    toast('Access denied. Salary details are restricted.', null, 'err');
    return;
  }
  if (!p) {
    overlay(
      'Pay change',
      `<p>${esc(e.name)} joined on ${fdate(e.join)}, so there is no earlier payroll to compare with.</p>`,
      `<button class="btn" onclick="closeModal()">Close</button>`
    );
    return;
  }
  const R = [
    ['Basic salary', p.basic, c.basic],
    ['House rent allowance', p.hra, c.hra],
    ['Special allowance', p.special, c.special],
    ['Provident fund', -p.pf, -c.pf],
    ['ESI', -p.esi, -c.esi],
    ['Professional tax', -p.pt, -c.pt],
    ['Income tax (TDS)', -p.tds, -c.tds],
    ['Unpaid days', -(p.lop || 0), 0]
  ].filter(r => Math.round(r[1]) || Math.round(r[2]));
  overlay(
    'What changed in net pay',
    `<div class="person" style="margin-bottom:12px">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)}</span></div></div>
   ${rtable(
     [
       { h: 'Component', keep: 1 },
       { h: 'September', c: 'num' },
       { h: 'October', c: 'num' },
       { h: 'Change', c: 'num' }
     ],
     [
       ...R.map(r => ({
         cells: [
           r[0],
           inr(r[1]),
           inr(r[2]),
           `<span class="${Math.round(r[2] - r[1]) ? '' : 'muted'}">${Math.round(r[2] - r[1]) ? (r[2] - r[1] > 0 ? '+' : '−') + inr(Math.abs(r[2] - r[1])) : '–'}</span>`
         ]
       })),
       {
         cells: [
           '<b>Net pay</b>',
           `<b>${inr(p.net)}</b>`,
           `<b>${inr(c.net)}</b>`,
           `<b>${fpct(pctD(c.net, p.net))}</b>`
         ]
       }
     ],
     {}
   )}
   <p class="muted small" style="margin-top:10px">September figures are sample data in this demo.${PREV[id] && PREV[id].ctc ? ' Salary was revised from ' + inr(PREV[id].ctc) + ' to ' + inr(e.ctc) + ' a year.' : ''}${PREV[id] && PREV[id].lop ? ' One unpaid day was deducted in September.' : ''}</p>`,
    `<button class="btn" onclick="closeModal()">Close</button>`,
    { wide: true }
  );
}
function bankEdit(id) {
  const e = emp(id);
  if (!need('employees', 'edit', 'edit bank details')) return;
  const b = e.bank || {};
  overlay(
    'Bank details',
    `<p class="muted small" style="margin-bottom:10px">${esc(e.name)}. Only the last 4 digits are kept in this demo.</p><div class="fg">${fld('bk-b', 'Bank', `<select id="bk-b">${BANKS.map(x => `<option ${b.b === x ? 'selected' : ''}>${x}</option>`).join('')}</select>`, 'full')}${fld('bk-a', 'Account number', `<input id="bk-a" inputmode="numeric" autocomplete="off" placeholder="9 to 18 digits">`)}${fld('bk-i', 'IFSC', `<input id="bk-i" value="${esc(b.ifsc || '')}" placeholder="HDFC0001234" style="text-transform:uppercase">`)}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="bankSave('${id}')">Save</button>`
  );
}
function bankSave(id) {
  const a = $('#bk-a').value.replace(/\s/g, ''),
    i = $('#bk-i').value.trim().toUpperCase();
  if (
    ![
      chk('bk-a', /^\d{9,18}$/.test(a), 'Enter 9 to 18 digits'),
      chk('bk-i', /^[A-Z]{4}0[A-Z0-9]{6}$/.test(i), 'Format like HDFC0001234')
    ].every(Boolean)
  )
    return;
  const e = emp(id);
  e.bank = { b: $('#bk-b').value, l4: a.slice(-4), ifsc: i, fail: false };
  audit('Bank details updated', e.name, { res: 'employees', to: '····' + a.slice(-4) });
  persist();
  closeModal();
  render();
  toast(
    'Bank details saved' +
      (S.pay.res[id] && S.pay.res[id].st === 'Failed' ? '. You can retry the payment' : '')
  );
}
/* ---------- the run ---------- */
const PSTAT5 = ['Not started', 'In review', 'Awaiting approval', 'Approved', 'Paid'];
const payState = () =>
  S.payStep >= 4
    ? 'Paid'
    : S.pay.bank
      ? S.pay.bank.state
      : ['Not started', 'Prepared for review', 'Prepared', 'Approved'][S.payStep];
const preparer = () => S.pay.prep && S.pay.prep.by;
function payLock() {
  if (!need('payroll', 'edit', 'lock attendance')) return;
  S.payStep = 1;
  payLog('Attendance locked');
  render();
  toast('Attendance locked for ' + CYC.n);
}
function paySubmit() {
  if (!need('payroll', 'edit', 'submit payroll')) return;
  const c = payCheck();
  if (c.err.length) {
    toast(
      `${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} must be fixed first`,
      null,
      'err'
    );
    return;
  }
  const open = c.warn.filter(w => !S.pay.ack[w.id]);
  if (open.length) {
    toast(`Acknowledge the ${open.length} warning${open.length > 1 ? 's' : ''} first`, null, 'err');
    return;
  }
  overlay(
    'Submit payroll for approval',
    `<p>${live().length} payslips, total net payout <b>${inr(payTot(live()).n)}</b>.</p><p class="muted small" style="margin-top:8px">Someone other than you must approve it. You are recorded as the preparer: <b>${esc(me().name)}</b>.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="paySubmitGo()">Submit for approval</button>`
  );
}
function paySubmitGo() {
  S.pay.prep = { by: me().name, id: me().id, at: new Date().toISOString() };
  S.payStep = 2;
  payLog('Submitted for approval', 'Prepared by ' + me().name);
  closeModal();
  render();
  toast('Submitted. Waiting for a second person to approve');
}
function payApprove() {
  if (!need('payroll', 'approve', 'approve payroll')) return;
  if (S.pay.prep && S.pay.prep.id === me().id) {
    toast(
      'The approver must be a different person from the preparer (' + S.pay.prep.by + ')',
      null,
      'err'
    );
    return;
  }
  const c = payCheck();
  if (c.err.length) {
    overlay(
      'Approval stopped',
      `<p>${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} appeared after submission. Fix ${c.err.length > 1 ? 'them' : 'it'} or return the payroll for changes.</p><div class="list" style="margin-top:10px">${c.err.map(x => `<div class="li"><span class="ai t-red">${ic('alert', 18)}</span><div class="grow"><b>${esc(x.title)}</b><div class="muted small">${esc(x.detail)}</div></div><button class="btn sm" onclick="closeModal();${x.link[1]}">${x.link[0]}</button></div>`).join('')}</div>`,
      `<button class="btn" onclick="closeModal()">Close</button><button class="btn" onclick="closeModal();payReturn()">Return for changes</button>`
    );
    return;
  }
  overlay(
    'Approve ' + CYC.n + ' payroll',
    `<p>Approving locks ${live().length} payslips with a total net payout of <b>${inr(payTot(live()).n)}</b>. Prepared by <b>${esc(S.pay.prep.by)}</b>.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="payApproveGo()">Approve and lock</button>`
  );
}
function payApproveGo() {
  S.pay.appr = { by: me().name, id: me().id, at: new Date().toISOString() };
  S.pay.locked = true;
  S.payStep = 3;
  payLog('Approved and locked', 'Approved by ' + me().name);
  closeModal();
  render();
  toast('Payroll approved and locked');
}
function payReturn() {
  if (!need('payroll', 'approve', 'return payroll')) return;
  overlay(
    'Return for changes',
    `<div class="fg">${fld('pr-n', 'What needs to change (required)', `<textarea id="pr-n" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="payReturnGo()">Return payroll</button>`
  );
}
function payReturnGo() {
  const t = $('#pr-n').value.trim();
  if (!chk('pr-n', !!t, 'Say what needs to change')) return;
  S.pay.prep = null;
  S.payStep = 1;
  S.pay.ack = {};
  payLog('Returned for changes', t);
  closeModal();
  render();
  toast('Returned to the preparer');
}
function payReopen() {
  if (!need('payroll', 'edit', 'reopen payroll')) return;
  if (S.pay.bank) {
    toast('The bank file was already generated. Reopening is no longer possible', null, 'err');
    return;
  }
  overlay(
    'Reopen payroll',
    `<p class="muted small" style="margin-bottom:10px">Reopening unlocks the register, removes the approval and needs a new approval. It is recorded in the audit log.</p><div class="fg">${fld('ro-n', 'Reason (required)', `<textarea id="ro-n" rows="3"></textarea>`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn bad" onclick="payReopenGo()">Reopen</button>`
  );
}
function payReopenGo() {
  const t = $('#ro-n').value.trim();
  if (!chk('ro-n', !!t, 'A reason is required to reopen a locked payroll')) return;
  S.pay.appr = null;
  S.pay.prep = null;
  S.pay.locked = false;
  S.pay.ack = {};
  S.payStep = 1;
  payLog('Reopened', t);
  closeModal();
  render();
  toast('Payroll reopened');
}
function payBankFile() {
  if (!need('payroll', 'edit', 'generate the bank file')) return;
  const t = payTot(live());
  S.pay.bank = {
    ref: 'SAL-OCT26-001',
    at: new Date().toISOString(),
    by: me().name,
    count: t.c,
    total: t.n,
    state: 'Submitted'
  };
  S.pay.res = {};
  payLog(
    'Bank file generated',
    `${S.pay.bank.ref} · ${t.c} payments · ${inr(t.n)} (not yet confirmed by the bank)`
  );
  render();
  toast('Bank file generated. Payment is not confirmed until the bank responds');
}
function payBankCSV() {
  if (!need('payroll', 'export', 'download the bank file')) return;
  audit('Export', 'Bank file ' + S.pay.bank.ref, { res: 'payroll' });
  saveFile(
    S.pay.bank.ref + '.csv',
    toCSV(
      ['Ref', 'Name', 'Bank', 'IFSC', 'Account', 'Net amount'],
      live()
        .filter(e => e.bank)
        .map(e => [
          S.pay.bank.ref,
          e.name,
          e.bank.b,
          e.bank.ifsc,
          '········' + e.bank.l4,
          Math.round(slip(e.ctc).net)
        ])
    )
  );
}
function paySimBank() {
  if (!need('payroll', 'edit', 'record the bank response')) return;
  S.pay.bank.state = 'Processing';
  live().forEach(e => {
    S.pay.res[e.id] =
      e.bank && e.bank.fail ? { st: 'Failed', why: 'Account closed' } : { st: 'Paid', why: '' };
  });
  const f = Object.values(S.pay.res).filter(x => x.st === 'Failed').length;
  S.pay.bank.state = f ? 'Part paid' : 'Paid';
  if (!f) {
    S.payStep = 4;
  }
  payLog(
    'Bank response received (simulated)',
    f ? `${f} payment failed` : 'All payments confirmed'
  );
  render();
  toast(f ? `${f} payment failed. See reconciliation` : 'All payments confirmed');
}
function payRetry() {
  if (!need('payroll', 'edit', 'retry payments')) return;
  let n = 0,
    still = 0;
  Object.keys(S.pay.res).forEach(id => {
    if (S.pay.res[id].st === 'Failed') {
      const e = emp(id);
      if (e.bank && !e.bank.fail) {
        S.pay.res[id] = { st: 'Paid', why: '' };
        n++;
      } else still++;
    }
  });
  if (!Object.values(S.pay.res).some(x => x.st === 'Failed')) {
    S.pay.bank.state = 'Paid';
    S.payStep = 4;
  }
  payLog(
    'Retry run',
    `${n} paid${still ? ', ' + still + ' still failing (update bank details first)' : ''}`
  );
  render();
  toast(
    n
      ? `${n} payment${n > 1 ? 's' : ''} confirmed`
      : 'Nothing to retry until bank details are updated'
  );
}
function payRow(e) {
  const c = slip(e.ctc),
    p = prevSlip(e),
    v = p ? pctD(c.net, p.net) : null,
    res = S.pay.res[e.id],
    sal = canField('salary', e.id);
  return {
    click: sal ? `payslipDetail('${e.id}')` : '',
    cells: [
      person(e),
      e.id,
      e.dept,
      sal ? inr(c.m) : restricted(),
      sal ? inr(c.ded) : restricted(),
      sal ? `<b>${inr(c.net)}</b>` : restricted(),
      !sal
        ? '–'
        : v == null
          ? chip('New joiner', 'info', 1)
          : Math.abs(v) >= W().varPct
            ? `<button class="link" onclick="event.stopPropagation();payVariance('${e.id}')">${fpct(v)}</button>`
            : `<span class="muted">${fpct(v)}</span>`,
      S.payStep >= 3 && S.pay.bank
        ? res
          ? chip(res.st, res.st === 'Paid' ? 'ok' : 'bad') +
            (res.why ? ` <span class="muted small">${esc(res.why)}</span>` : '')
          : chip('Pending', 'mute')
        : ''
    ]
  };
}
function payrollOnly() {
  const st = S.payStep,
    c = payCheck(),
    L = live(),
    tot = payTot(L),
    pt = payTot(
      L.filter(e => prevSlip(e)),
      true
    ),
    cur = payTot(L.filter(e => prevSlip(e))),
    A = can('payroll', 'approve'),
    P = can('payroll', 'edit'),
    same = S.pay.prep && S.pay.prep.id === me().id;
  const btn =
    st === 0
      ? P
        ? `<button class="btn primary" onclick="payLock()">Lock attendance</button>`
        : ''
      : st === 1
        ? P
          ? `<button class="btn primary" onclick="paySubmit()">Submit for approval</button>`
          : ''
        : st === 2
          ? A && !same
            ? `<button class="btn" onclick="payReturn()">Return for changes</button><button class="btn primary" onclick="payApprove()">Approve payroll</button>`
            : `<span class="muted small" style="align-self:center">${same ? 'A different person must approve. You prepared it.' : 'Waiting for an approver'}</span>`
          : st === 3
            ? !S.pay.bank
              ? `${S.pay.locked && P ? `<button class="btn" onclick="payReopen()">Reopen</button>` : ''}${P ? `<button class="btn primary" onclick="payBankFile()">Generate bank file</button>` : ''}`
              : S.pay.bank.state === 'Submitted'
                ? P
                  ? `<button class="btn primary" onclick="paySimBank()">Record bank response ${demoChip()}</button>`
                  : ''
                : P
                  ? `<button class="btn primary" onclick="payRetry()">Retry failed payments</button>`
                  : ''
            : `<button class="btn" disabled>${ic('check', 16)}Payment confirmed</button>`;
  const rep = (x, sev) =>
    `<div class="li chk ${sev}" style="align-items:flex-start"><span class="ai ${sev === 'e' ? 't-red' : 't-amber'}">${ic('alert', 18)}</span><div class="grow"><b>${esc(x.title)}</b><div class="muted small">${esc(x.detail)}</div>${sev === 'w' && st <= 2 ? `<label class="ackl"><input type="checkbox" ${S.pay.ack[x.id] ? 'checked' : ''} onchange="S.pay.ack['${x.id}']=this.checked;persist();render()"> I have reviewed this</label>` : ''}</div><button class="btn sm" onclick="${x.link[1]}">${x.link[0]}</button></div>`;
  const dlt = (a, b, good) => (pt[b] ? delta(fpct(pctD(cur[a], pt[b])), good, 'up') : '');
  return (
    ph(
      'Payroll',
      `${CYC.n} · cycle 1–31 Oct`,
      `<button class="btn" onclick="openSub('pr','me')">My payslip</button>${btn}`
    ) +
    `<div class="card"><div class="steps" role="list" aria-label="Payroll progress">${PSTEPS.map((s, i) => `<div class="step ${i < st ? 'done' : i === st ? 'cur' : ''}" role="listitem" ${i === st ? 'aria-current="step"' : ''}><span class="sn">${i < st ? ic('check', 14) : i + 1}</span><span class="sl">${s}</span></div>`).join('')}</div><div class="mo">Step ${Math.min(st + 1, 4)} of 4 · ${st < 4 ? PSTEPS[st] : 'Complete'} · ${payState()}${S.pay.prep ? ` · prepared by ${esc(S.pay.prep.by)}` : ''}${S.pay.appr ? ` · approved by ${esc(S.pay.appr.by)}` : ''}${S.pay.locked ? ' · locked' : ''}</div></div>
  <div class="row c4">${kpi({ l: 'Gross payroll', v: inrC(tot.g), icon: 'wallet', tone: 't-brand', p: dlt('g', 'g', null), d: 'vs September · sample comparison', spark: trend(tot.g, 7, 4, 0.06), sample: 1 })}${kpi({ l: 'Deductions', v: inrC(tot.d), icon: 'receipt', tone: 't-amber', p: dlt('d', 'd', null), d: 'PF, ESI, PT and TDS', spark: trend(tot.d, 7, 5, 0.05), sample: 1 })}${kpi({ l: 'Net payable', v: inrC(tot.n), icon: 'check', tone: 't-green', p: dlt('n', 'n', null), d: L.length + ' employees · after deductions', spark: trend(tot.n, 7, 6, 0.06), sample: 1 })}${kpi({ icon: 'clock', tone: 't-violet', l: 'Status', v: `<span style="font-size:16px">${chip(payState(), ['mute', 'warn', 'warn', 'info', 'ok'][st])}</span>`, d: 'Pay date 30 Oct', bar: ((st + 1) / PSTAT5.length) * 100, bl: `Step ${st + 1} of ${PSTAT5.length}` })}</div>
  ${st <= 2 ? `<div class="card" id="paychecks"><div class="head"><div><h2>Pre-run checks</h2><p class="sub">${c.err.length ? `<b style="color:var(--red-ink)">${c.err.length} blocking</b>` : 'No blocking issues'} · ${c.warn.length} warning${c.warn.length === 1 ? '' : 's'}${c.warn.length ? ` · ${c.warn.filter(w => S.pay.ack[w.id]).length} acknowledged` : ''}</p></div>${c.err.length ? chip('Cannot approve yet', 'bad', 1) : chip('Ready', 'ok', 1)}</div>${c.err.length || c.warn.length ? `<div class="list">${c.err.map(x => rep(x, 'e')).join('')}${c.warn.map(x => rep(x, 'w')).join('')}</div>` : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>All checks passed</b></div>`}</div>` : ''}
  <div class="row c21"><div class="card"><div class="head"><div><h2>Employee pay</h2><p class="sub">${L.length} employees · variance is against September (sample data)</p></div></div>${rtable(
    [
      { h: 'Employee', keep: 1 },
      { h: 'ID', xm: 1 },
      { h: 'Department', xm: 1 },
      { h: 'Gross', c: 'num' },
      { h: 'Deductions', c: 'num', xm: 1 },
      { h: 'Net pay', c: 'num' },
      { h: 'Change', xm: 1 },
      { h: st >= 3 && S.pay.bank ? 'Payment' : '', xm: 1 }
    ],
    L.map(payRow)
  )}</div>
  <div class="stack">${
    st >= 3
      ? `<div class="card"><div class="head"><h2>Payment</h2>${chip(payState(), S.pay.bank ? (S.pay.bank.state === 'Paid' ? 'ok' : S.pay.bank.state === 'Part paid' ? 'bad' : 'warn') : 'info')}</div>${
          S.pay.bank
            ? `<div class="list"><div class="li"><span class="muted grow">Bank file</span><b>${S.pay.bank.ref}</b></div><div class="li"><span class="muted grow">Payments</span><b>${S.pay.bank.count} · ${inr(S.pay.bank.total)}</b></div><div class="li"><span class="muted grow">Generated</span><b>${ftime(S.pay.bank.at)}</b></div></div>
     ${
       S.pay.bank.state === 'Submitted'
         ? `<p class="note" style="margin-top:10px">Bank file generated. <b>Payment is not confirmed</b> until the bank responds.</p>`
         : (() => {
             const r = Object.entries(S.pay.res),
               pd = r.filter(x => x[1].st === 'Paid'),
               fl = r.filter(x => x[1].st === 'Failed');
             return `<h3 class="dsub">Reconciliation</h3><div class="list"><div class="li"><span class="grow">Paid</span><b>${pd.length} · ${inr(pd.reduce((a, x) => a + slip(emp(x[0]).ctc).net, 0))}</b></div><div class="li"><span class="grow">Failed</span><b style="color:${fl.length ? 'var(--red-ink)' : 'inherit'}">${fl.length} · ${inr(fl.reduce((a, x) => a + slip(emp(x[0]).ctc).net, 0))}</b></div></div>${fl.map(x => `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(emp(x[0]).name)}</b><div class="muted small">${esc(x[1].why)}</div></div><button class="btn sm" onclick="bankEdit('${x[0]}')">Update bank details</button></div>`).join('')}`;
           })()
     }
     <div class="acts" style="margin-top:10px"><button class="btn sm" onclick="payBankCSV()">${ic('download', 14)}Bank file CSV</button></div>`
            : `<p class="muted small">${S.pay.locked ? 'Payroll is locked. Generate the bank file to start payment.' : ''}</p>`
        }</div>`
      : ''
  }
   <div class="card"><div class="head"><div><h2>Payroll history</h2><p class="sub">Every step, with who did it</p></div></div>${
     S.pay.log.length
       ? `<div class="list">${S.pay.log
           .slice(0, 8)
           .map(
             h =>
               `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(h.act)}</b><div class="muted small">${esc(h.by)} · ${ftime(h.at)}</div>${h.note ? `<div class="small">${esc(h.note)}</div>` : ''}</div></div>`
           )
           .join('')}</div>`
       : '<div class="empty">No steps recorded yet.</div>'
   }</div></div></div>`
  );
}
function payrollGuard() {
  return (
    S.role === 'employee' ||
    S.tab.pr === 'me' ||
    (!can('payroll', 'edit') && !can('payroll', 'approve') && scopeOf('payroll') === 'own')
  );
}
function payroll() {
  if (payrollGuard()) return payrollOld();
  return can('payroll', 'view') ? payrollOnly() : deniedPage();
}
guardFns([['payslipDetail', 'payroll', 'view', 'open pay details']]);

/* js/features/dashboard/home.js */
/* =====================================================================
   v38 · an honest, prioritised home screen: KPIs with a period, a definition and a source
   ===================================================================== */
const OPENINGS = [
  { role: 'CNC Programmer', dept: 'Production', n: 2 },
  { role: 'Safety Officer', dept: 'Quality', n: 1 },
  { role: 'Sales Executive', dept: 'Sales', n: 1 }
];
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const monthEnd = back => new Date(TODAY.getFullYear(), TODAY.getMonth() - back + 1, 0);
const headcountSeries = sc => {
  const s = [];
  for (let i = 11; i >= 0; i--) {
    const e = i === 0 ? iso(TODAY) : iso(monthEnd(i));
    s.push(sc.filter(x => x.join <= e).length);
  }
  return s;
};
function dayStats(sc, d) {
  let p = 0,
    a = 0,
    l = 0;
  sc.forEach(e => {
    const o = dayInfo(e.id, d.getFullYear(), d.getMonth(), d.getDate());
    if (o.st === 'P' || o.st === 'T') p++;
    else if (o.st === 'A') a++;
    else if (o.st === 'L') l++;
  });
  return { p, a, l };
}
function attSeries(sc) {
  const out = [];
  for (let i = 20; i >= 0 && out.length < 14; i--) {
    const d = addDays(TODAY, -i),
      s = dayStats(sc, d),
      t = s.p + s.a + s.l;
    if (t && s.p + s.a)
      out.push({ d, pct: Math.round((s.p / Math.max(s.p + s.a + s.l, 1)) * 100), on: s.l });
  }
  return out;
}
const leaveSeries = sc => {
  const out = [];
  for (let i = 13; i >= 0; i--) {
    const d = addDays(TODAY, -i),
      s = iso(d);
    out.push(
      sc.filter(e =>
        S.leaves.some(l => l.emp === e.id && l.status === 'Approved' && l.from <= s && s <= l.to)
      ).length
    );
  }
  return out;
};
const incByMonth = n => {
  const o = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1),
      k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    o.push(S.incidents.filter(x => x.date.startsWith(k)).length);
  }
  return o;
};
const daysSinceLostTime = () => {
  const l = S.incidents
    .filter(i => i.type === 'Lost time')
    .map(i => i.date)
    .sort()
    .pop();
  return l ? Math.round((TODAY - new Date(l + 'T00:00:00')) / 864e5) : null;
};
const openReqs = sc => {
  const deps = new Set(sc.map(e => e.dept));
  return S.role === 'admin' || scopeOf('recruit') === 'all'
    ? OPENINGS
    : OPENINGS.filter(o => deps.has(o.dept));
};
const wgOn = k => S.widgets['h:' + k] !== 0;
function kpiInfo(b) {
  const d = b.dataset;
  overlay(
    d.t,
    `<div class="list"><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Meaning</span><span class="grow">${esc(d.d)}</span></div><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Period</span><span class="grow">${esc(d.p)}</span></div><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Source</span><span class="grow">${esc(d.s)}</span></div></div>${d.m ? `<div class="note" style="margin-top:12px"><b>Sample data.</b> This figure is illustrative in the demo. It is not calculated from records yet.</div>` : ''}`,
    `${d.g ? `<button class="btn" onclick="closeModal();go('${d.g}')">Open ${esc(label(d.g))}</button>` : ''}<button class="btn primary" onclick="closeModal()">Close</button>`
  );
}
const kinfoBtn = o =>
  `<button type="button" class="kinfo" aria-label="How is ${esc(String(o.l).replace(/<[^>]*>/g, ''))} calculated?" data-t="${esc(String(o.l).replace(/<[^>]*>/g, ''))}" data-d="${esc(o.def)}" data-p="${esc(o.per || 'Today')}" data-s="${esc(o.src || 'PeopleDesk records')}" data-m="${o.sample ? 1 : ''}" data-g="${o.go || ''}" onclick="event.stopPropagation();kpiInfo(this)" onkeydown="event.stopPropagation()">${ic('help', 14)}</button>`;
function wCustom() {
  const R =
    S.role === 'employee'
      ? [
          ['people', 'Birthdays, anniversaries and new joiners'],
          ['ann', 'Announcements and holidays']
        ]
      : [
          ['week', 'Attendance this week and who is out'],
          ['people', 'Birthdays, anniversaries and new joiners'],
          ['work', 'Workforce by department'],
          ['shifts', "Today's shifts"],
          ['ann', 'Announcements']
        ];
  overlay(
    'Customize home',
    `<p class="muted small" style="margin-bottom:10px">Urgent items always stay at the top. Hide or reorder what comes after.</p><div class="list">${R.map(([k, n], i) => `<div class="li"><label class="grow" style="display:flex;gap:10px;align-items:center"><input type="checkbox" ${wgOn(k) ? 'checked' : ''} onchange="S.widgets['h:${k}']=this.checked?1:0;saveGov();render();wCustom()"> ${n}</label><button class="btn sm ico" aria-label="Move ${esc(n)} up" ${i === 0 ? 'disabled' : ''} onclick="wMove('${k}',-1)">${ic('up', 14)}</button><button class="btn sm ico" aria-label="Move ${esc(n)} down" ${i === R.length - 1 ? 'disabled' : ''} onclick="wMove('${k}',1)">${ic('dn', 14)}</button></div>`).join('')}</div>`,
    `<button class="btn" onclick="S.widgets={};saveGov();closeModal();render()">Reset</button><button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function wMove(k, d) {
  const key = 'o:' + S.role,
    all = S.role === 'employee' ? ['people', 'ann'] : ['week', 'people', 'work', 'shifts', 'ann'],
    o = (S.widgets[key] || all).filter(x => all.includes(x));
  const i = o.indexOf(k),
    j = i + d;
  if (j < 0 || j >= o.length) return;
  [o[i], o[j]] = [o[j], o[i]];
  S.widgets[key] = o;
  saveGov();
  render();
  wCustom();
}
const wOrder = () => {
  const all =
      S.role === 'employee' ? ['people', 'ann'] : ['week', 'people', 'work', 'shifts', 'ann'],
    o = S.widgets['o:' + S.role];
  return o ? [...o.filter(x => all.includes(x)), ...all.filter(x => !o.includes(x))] : all;
};
function dashboardMgr(u, g, dateStr) {
  const sc = scoped(),
    p = presentToday(sc),
    ap = approvalItems().length,
    open = S.incidents.filter(i => i.st !== 'Closed').length,
    adm = S.role === 'admin';
  const hs = headcountSeries(sc),
    nq = sc.filter(e => e.join >= iso(addDays(TODAY, -90))).length,
    as = attSeries(sc),
    ls = leaveSeries(sc),
    rq = openReqs(sc),
    vac = rq.reduce((a, x) => a + x.n, 0);
  const pc =
      (can('payroll', 'edit') || can('payroll', 'approve')) && S.payStep <= 2 ? payCheck() : null,
    exp = S.courses
      .filter(c => c.exp <= iso(addDays(TODAY, 30)))
      .sort((a, b) => (a.exp < b.exp ? -1 : 1));
  const attn = [
    ap && {
      t: 't-amber',
      i: 'cal',
      b: `${ap} approval${ap > 1 ? 's' : ''}`,
      s: `${queue('overdue').length ? queue('overdue').length + ' overdue · ' : ''}Waiting for you`,
      p: 'approvals'
    },
    pc && {
      t: pc.err.length ? 't-red' : 't-brand',
      i: 'wallet',
      b: pc.err.length
        ? `Payroll: ${pc.err.length} blocking issue${pc.err.length > 1 ? 's' : ''}`
        : 'Payroll in review',
      s: pc.err.length
        ? 'Fix before approval'
        : `${pc.warn.length} warning${pc.warn.length === 1 ? '' : 's'} to acknowledge`,
      p: 'payroll'
    },
    open &&
      can('safety', 'view') && {
        crit: 1,
        t: 't-red',
        i: 'shield',
        b: `${open} open incident${open > 1 ? 's' : ''}`,
        s: 'Investigation due',
        p: 'safety'
      },
    exp.length &&
      can('training', 'view') && {
        t: 't-teal',
        i: 'book',
        b: `${exp.length} certificate${exp.length > 1 ? 's' : ''} expiring`,
        s: `${exp[0].n} · ${fshort(exp[0].exp)}`,
        p: 'training'
      }
  ].filter(Boolean);
  const dep = DEPTS.map((d, i) => ({
      l: d,
      v: sc.filter(e => e.dept === d).length,
      c: DC[i]
    })).filter(x => x.v),
    ti = dow(),
    sh = ['A', 'B', 'C', 'G'].map(k => [
      k,
      sc.filter(e => (S.roster[e.id] || [])[ti] === k).length
    ]),
    shm = Math.max(...sh.map(x => x[1]), 1);
  const W_ = {
    week: `<div class="row c2"><div class="card"><div class="head"><div><h2>Attendance this week</h2><p class="sub">Percent of staff present each day</p></div>${chip('Today ' + p.pct + '%', 'info', 1)}</div>${barChart(weekAtt(sc), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { share: 1 / 2, stackAt: 900, today: ti, target: 95, unit: '%', low: 80, label: 'Attendance this week' })}</div><div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div><button class="link" onclick="go('leave')">Leave</button></div>${whoOut()}</div></div>`,
    people: `<div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>`,
    work: `<div class="card"><div class="head"><div><h2>Workforce</h2><p class="sub">Headcount by department</p></div></div>${donut(dep, 'people', 'deptJump')}</div>`,
    shifts: `<div class="card"><div class="head"><div><h2>Today's shifts</h2><p class="sub">People assigned across the plant</p></div><button class="link" onclick="go('roster')">Roster</button></div><div class="list">${sh.map(([k, n]) => `<div class="li"><span class="shift ${k}" style="cursor:default;width:30px;height:28px">${k}</span><div class="grow"><div class="bar"><i style="width:${(n / shm) * 100}%"></i></div></div><b>${n}</b></div>`).join('')}</div></div>`,
    ann: `<div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div>`
  };
  const order = wOrder().filter(wgOn),
    sec = order.filter(k => k !== 'week' && k !== 'people'),
    cards = sec.map(k => W_[k]).join('');
  return (
    `<div class="acts hometop"><button class="btn" onclick="wCustom()">${ic('sliders', 16)}Customize home</button>${can('payroll', 'view') && adm ? `<button class="btn" onclick="go('payroll')">${ic('wallet', 16)}Run payroll</button>` : ''}${can('employees', 'create') ? `<button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>` : ''}${can('roster', 'view') && !can('employees', 'create') ? `<button class="btn primary" onclick="go('roster')">${ic('grid', 16)}Open roster</button>` : ''}</div>
  <div class="hero">${clockCard(true, `${g}, ${u.name.split(' ')[0]}`, `${dateStr} · ${adm || scopeOf('employees') === 'all' ? 'Company overview' : `Your reporting line, ${sc.length} people`} · ${esc(dayInfo(u.id, ...TD()).shiftTxt)}`)}</div>` +
    `<div class="attn">${attn.map(a => `<button class="att${a.crit ? ' crit' : ''}" onclick="go('${a.p}')"><span class="ai ${a.t}">${ic(a.i, 18)}</span><span><b>${a.b}</b><small>${a.s}</small></span></button>`).join('')}</div>
  <div class="row c4">
   ${kpi({ go: 'employees', l: 'Headcount', v: sc.length, icon: 'users', tone: 't-brand', spark: hs, p: delta('+' + nq, true, 'up'), d: 'joined in the last 90 days', def: 'People in your scope who have joined on or before the date, excluding people who have left.', per: 'Today; trend is month-end for 12 months', src: 'Employee records and joining dates' })}
   ${kpi({ go: 'attendance', l: 'Present today', v: p.pr + `<small> / ${sc.length}</small>`, icon: 'check', tone: 't-green', spark: as.length > 2 ? [...as.slice(0, -1).map(x => x.pct), p.pct] : undefined, p: delta(p.pct + '%', p.pct >= 90 ? true : null), d: 'present, last 14 working days', def: 'People marked present divided by people expected to work. People on leave and weekly offs are not counted as absent.', per: 'Today; trend is the last 14 working days', src: 'Attendance records on each person\u2019s own work calendar' })}
   ${kpi({ go: 'leave', l: 'On leave', v: p.on, icon: 'cal', tone: 't-amber', spark: ls.some(x => x) ? ls : undefined, p: delta(queue('mine').filter(x => x.k === 'leave').length + ' pending', null), d: 'approved leave, last 14 days', def: 'People with approved leave covering the day. Pending requests are shown separately.', per: 'Today; trend is the last 14 days', src: 'Leave requests' })}
   ${kpi({ go: 'recruit', l: 'Open positions', v: vac, icon: 'brief', tone: 't-violet', bar: Math.min(100, (S.cands.length / Math.max(vac * 3, 1)) * 100), bl: `${S.cands.length} candidates for ${vac} openings`, d: `${rq.length} open requisition${rq.length === 1 ? '' : 's'}`, def: 'Vacancies on open requisitions in your scope. The bar compares candidates in the pipeline with three per opening.', per: 'Today', src: 'Recruitment requisitions and candidates' })}
  </div>
  <div class="row c2 ops">${approvalsCard()}${teamTodayCard()}</div>
  ${W_.week}${cards ? `<div class="dashboard-widgets">${cards}</div>` : ''}${order.includes('people') ? W_.people : ''}`
  );
}
{
  const _d = dashboard;
  dashboard = function () {
    const u = me(),
      h = NOW.getHours(),
      g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening',
      ds = NOW.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    if (persona().role === 'sysadmin') return dashboardSys(u, g, ds);
    if (S.role === 'employee') {
      let html = _d();
      const head = `<div class="acts hometop"><button class="btn" onclick="wCustom()">${ic('sliders', 16)}Customize home</button></div>`;
      if (!wgOn('people'))
        html = html.replace(
          /<div class="row c2 ppl">[\s\S]*?<\/div><\/div><\/div>\s*(?=<div class="row c2">)/,
          ''
        );
      return head + html;
    }
    return dashboardMgr(u, g, ds);
  };
}
/* safety and reports KPIs: computed where records exist, marked Sample where they do not */
{
  const _s = safety;
  safety = function () {
    let h = _s();
    const sl = daysSinceLostTime(),
      open = S.incidents.filter(i => i.st !== 'Closed').length,
      done = Math.round(S.courses.reduce((a, c) => a + c.done, 0) / S.courses.length),
      low = S.courses.slice().sort((a, b) => a.done - b.done)[0];
    const row = `<div class="row c4">${kpi({ l: 'Incident-free days', v: sl == null ? '–' : sl, icon: 'shield', tone: 't-green', d: 'Target 90 days', bar: sl == null ? 0 : Math.min(100, (sl / 90) * 100), bl: sl == null ? 'No lost-time incident recorded' : `${sl} of 90-day target`, def: 'Days since the most recent lost-time incident (an injury that caused time away from work).', per: 'Today', src: 'Incident log', go: 'safety' })}${kpi({ l: 'Open incidents', v: open, icon: 'alert', tone: 't-amber', spark: incByMonth(6).some(x => x) ? incByMonth(6) : undefined, d: 'Incidents logged per month, last 6 months', def: 'Incidents not yet closed. The trend is incidents logged each month.', per: 'Today; trend is 6 months', src: 'Incident log' })}${kpi({ l: 'PPE compliance', v: '96%', icon: 'check', tone: 't-teal', sample: 1, d: 'No audit data connected', def: 'Share of audited people wearing required PPE.', per: 'Last audit', src: 'Not connected yet' })}${kpi({ l: 'Safety training', v: done + '%', icon: 'book', tone: 't-violet', p: low && low.done < 75 ? delta(low.n.split(' ')[0] + ' ' + low.n.split(' ')[1] + ' behind', false, 'dn') : '', d: 'average completion across required courses', bar: done, bl: `${done}% of required courses done`, def: 'Average completion across all required safety courses.', per: 'Today', src: 'Training records', go: 'training' })}</div>`;
    return h.replace(/<div class="row c4">[\s\S]*?<\/div>(?=\s*<div class="card">)/, row);
  };
}
{
  const _r = reports;
  reports = function () {
    let h = _r();
    const ex = (S.life.exits || []).filter(x => x.lwd >= iso(addDays(TODAY, -365))).length,
      hc = Math.max(live().length, 1),
      rate = ((ex / hc) * 100).toFixed(1);
    const row = `<div class="row c4">${kpi({ icon: 'users', tone: 't-teal', l: 'Attrition, 12 months', v: rate + '%', d: ex ? `${ex} exit${ex > 1 ? 's' : ''} on ${hc} people` : 'No exits recorded in 12 months', def: 'People who left in the last 12 months divided by current headcount. No outside benchmark is shown because there is no comparable source.', per: 'Last 12 months', src: 'Completed offboarding records', go: 'lifecycle' })}${kpi({ icon: 'clock', tone: 't-brand', l: 'Average time to hire', v: '26 days', sample: 1, d: 'Requisition dates not connected', def: 'Days from requisition opening to offer acceptance.', per: 'Last quarter', src: 'Not connected yet' })}${kpi({ icon: 'chart', tone: 't-amber', l: 'Overtime this month', v: '312 h', sample: 1, d: 'Overtime hours not connected', def: 'Overtime hours approved in the month.', per: 'This month', src: 'Not connected yet' })}${kpi({ icon: 'wallet', tone: 't-violet', l: 'Cost per hire', v: inr(38500), sample: 1, d: 'Hiring costs not connected', def: 'Recruitment spend divided by hires.', per: 'Last 12 hires', src: 'Not connected yet' })}</div>`;
    return h.replace(
      /<div class="row c4">[\s\S]*?<\/div>(?=\s*<div class="card">|\s*<div class="row)/,
      row
    );
  };
}

/* js/features/dashboard/sysadmin-home.js */
/* ---------- System Admin home: accounts, security and integrations only ---------- */
function dashboardSys(u, g, ds) {
  const L = live(),
    cnt = k => L.filter(x => roleOf(x.id) === k).length,
    priv = cnt('hr') + cnt('admin') + cnt('sysadmin'),
    req = L.filter(x => S.sec.twoFA[roleOf(x.id)]).length,
    tp = Math.round((req / Math.max(L.length, 1)) * 100),
    ev = S.audit.filter(a => a.cat === 'system').slice(0, 5),
    mx = Math.max(...ROLE_DEF.map(r => cnt(r.k)), 1);
  return (
    ph(
      `${g}, ${u.name.split(' ')[0]}`,
      `${ds} · System administration`,
      can('users', 'view')
        ? `<button class="btn primary" onclick="S.tab.st='users';go('settings')">${ic('users', 16)}Manage users</button>`
        : ''
    ) +
    `<div class="row c4">
   ${kpi({ l: 'Accounts', v: L.length, icon: 'users', tone: 't-brand', d: 'people with a PeopleDesk account', bar: 100, bl: ROLE_DEF.length + ' roles in use', def: 'Active accounts. Exited people are removed.', per: 'Today', src: 'Users and accounts' })}
   ${kpi({ l: 'Privileged accounts', v: priv, icon: 'key', tone: 't-amber', d: 'HR, Admin and System Admin', bar: (priv / Math.max(L.length, 1)) * 100, bl: Math.round((priv / Math.max(L.length, 1)) * 100) + '% of accounts', def: 'Accounts whose role can change records, pay or settings.', per: 'Today', src: 'Role assignments' })}
   ${kpi({ l: 'Two-step coverage', v: tp + '%', icon: 'shield', tone: 't-green', d: 'accounts that must use a code', bar: tp, bl: `${req} of ${L.length} accounts`, def: 'Share of accounts whose role requires two-step verification.', per: 'Today', src: 'Security settings' })}
   ${kpi({ l: 'Integrations', v: '0 of 4', icon: 'grid', tone: 't-violet', sample: 1, d: 'no live connections in this demo', def: 'Bank, single sign-on, devices and email delivery.', per: 'Today', src: 'Not connected yet' })}
  </div>
  <div class="row c2"><div class="card"><div class="head"><div><h2>Accounts by role</h2><p class="sub">Select a role to review who has it</p></div></div><div class="list">${ROLE_DEF.map(r => `<button class="li cname" style="width:100%" onclick="S.tab.st='users';go('settings')"><span class="grow" style="text-align:left"><b>${r.n}</b><div class="muted small" style="white-space:normal">${esc(r.d)}</div><div class="bar" style="margin-top:6px"><i style="width:${(cnt(r.k) / mx) * 100}%"></i></div></span><b>${cnt(r.k)}</b></button>`).join('')}</div></div>
  <div class="stack"><div class="card"><div class="head"><div><h2>Recent system changes</h2><p class="sub">Roles, permissions and security</p></div><button class="link" onclick="go('audit')">Audit log</button></div>${ev.length ? `<div class="list">${ev.map(a => `<div class="li" style="align-items:flex-start"><div class="grow"><b>${esc(a.act)}</b><div class="muted small">${esc(a.rec)} · ${esc(a.by)} · ${ftime(a.at)}</div></div></div>`).join('')}</div>` : '<div class="empty">No system changes yet.</div>'}</div>
  <div class="card"><div class="head"><div><h2>Security settings</h2><p class="sub">Current policy</p></div><button class="link" onclick="S.tab.st='security';go('settings')">Review</button></div><div class="list"><div class="li"><span class="grow">Minimum password length</span><b>${S.sec.minLen} characters</b></div><div class="li"><span class="grow">Sign out after inactivity</span><b>${S.sec.timeout} minutes</b></div><div class="li"><span class="grow">Single sign-on</span><b>${demoChip()}</b></div></div></div></div></div>`
  );
}

/* js/features/lifecycle/joiners-leavers.js */
/* =====================================================================
   v38 · joiners and leavers: owned, dated tasks; clearance blocks the last day
   ===================================================================== */
const ONB_T = [
  ['docs', 'Collect and verify joining documents', 'hr', 2],
  ['bank', 'Add bank and PAN details', 'emp', 3],
  ['it', 'Create email account and issue a laptop', 'it', 1],
  ['id', 'Issue ID and access card', 'hr', 1],
  ['forms', 'Complete PF and ESI forms', 'emp', 5],
  ['safety', 'Safety induction', 'mgr', 7],
  ['buddy', 'Assign a buddy', 'mgr', 3],
  ['goals', 'Set probation goals', 'mgr', 14]
];
const OFF_T = [
  ['appr', 'Resignation approved by manager and HR', 'mgr', null],
  ['kt', 'Knowledge transfer plan agreed', 'mgr', -14],
  ['assets', 'Return all company assets', 'emp', -2],
  ['access', 'Remove system access (email, VPN, ERP)', 'it', 0],
  ['claims', 'Clear pending claims and advances', 'fin', -3],
  ['exit', 'Exit interview', 'hr', -5],
  ['fnf', 'Full and final settlement handed to payroll', 'fin', 0],
  ['letters', 'Experience and relieving letters', 'hr', 2]
];
const OWNER = { hr: () => emp('E-1001'), it: () => emp('E-1009'), fin: () => emp('E-1014') };
const ownerOf = (t, e) => (t === 'emp' ? e : t === 'mgr' ? mgrOf(e) || emp('E-1001') : OWNER[t]());
function autoDone(kind, e, key) {
  if (kind === 'onb') {
    if (key === 'bank') return !!e.bank && !e.panMissing;
    if (key === 'it')
      return S.assets.some(
        a => a.holder === e.id && a.type === 'Laptop' && a.status === 'Assigned'
      );
    if (key === 'id')
      return S.assets.some(
        a => a.holder === e.id && a.type === 'ID card' && a.status === 'Assigned'
      );
  } else {
    if (key === 'assets') return !S.assets.some(a => a.holder === e.id && a.status === 'Assigned');
    if (key === 'claims') return !S.claims.some(c => c.emp === e.id && c.st === 'Pending');
  }
  return false;
}
const AUTO = { onb: ['bank', 'it', 'id'], off: ['assets', 'claims'] };
const taskState = (kind, id, key) => ((S.life[kind][id] || {}).t || {})[key];
const isDone = (kind, e, key) =>
  AUTO[kind].includes(key) ? autoDone(kind, e, key) : !!taskState(kind, e.id, key);
const canTick = o => can('lifecycle', 'edit') || o.id === me().id;
function lifeTick(kind, id, key, on) {
  const e = emp(id),
    T = (kind === 'onb' ? ONB_T : OFF_T).find(x => x[0] === key),
    o = ownerOf(T[2], e);
  if (!canTick(o)) {
    toast('Only ' + o.name + ' or HR can complete this task', null, 'err');
    render();
    return;
  }
  const r = (S.life[kind][id] = S.life[kind][id] || { t: {} });
  r.t = r.t || {};
  if (on) r.t[key] = { by: me().name, at: new Date().toISOString() };
  else delete r.t[key];
  audit(
    (kind === 'onb' ? 'Onboarding' : 'Offboarding') + ' task ' + (on ? 'completed' : 'reopened'),
    `${e.name} · ${T[1]}`,
    { res: 'lifecycle' }
  );
  persist();
  render();
}
function dueOf(kind, e, T) {
  if (kind === 'onb') return iso(addDays(new Date(e.join + 'T00:00:00'), T[3]));
  const r = S.life.off[e.id];
  if (T[0] === 'appr') return addWork(r.resigned, 2);
  return iso(addDays(new Date(r.lwd + 'T00:00:00'), T[3]));
}
function taskRow(kind, e, T) {
  const key = T[0],
    o = ownerOf(T[2], e),
    done = isDone(kind, e, key),
    st = taskState(kind, e.id, key),
    due = dueOf(kind, e, T),
    od = !done && due < iso(TODAY),
    auto = AUTO[kind].includes(key);
  let extra = '';
  if (kind === 'off' && key === 'assets') {
    const a = S.assets.filter(x => x.holder === e.id && x.status === 'Assigned');
    extra = a.length
      ? `<div class="small" style="margin-top:4px">${a.map(x => `<button class="link" onclick="returnAsset('${x.id}','${e.id}')">${esc(aname(x))}: return</button>`).join(' · ')}</div>`
      : `<div class="muted small">Nothing left to return</div>`;
  }
  if (kind === 'off' && key === 'fnf') {
    const s = slip(e.ctc),
      el = balances(e.id).EL.left,
      enc = (el * s.m) / 30,
      r = S.life.off[e.id],
      req = e.type === 'Plant' ? 30 : 60,
      act = Math.round((new Date(r.lwd) - new Date(r.resigned)) / 864e5),
      sh = Math.max(0, req - act),
      rec = (sh * s.m) / 30;
    extra = canField('salary', e.id)
      ? `<div class="muted small" style="margin-top:4px">Estimate: leave encashment ${inr(enc)} (${el} earned days)${sh ? `, notice shortfall recovery −${inr(rec)} (${sh} days)` : ''}. Payroll confirms the final figure.</div>`
      : '';
  }
  if (kind === 'off' && key === 'claims' && !done)
    extra = `<div class="muted small" style="margin-top:4px">${S.claims.filter(c => c.emp === e.id && c.st === 'Pending').length} claim(s) still pending approval</div>`;
  return `<div class="li" style="align-items:flex-start"><label class="grow" style="display:flex;gap:10px;align-items:flex-start"><input type="checkbox" ${done ? 'checked' : ''} ${auto || !canTick(o) ? 'disabled' : ''} onchange="lifeTick('${kind}','${e.id}','${key}',this.checked)" aria-label="${esc(T[1])}"><span><b style="${done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${esc(T[1])}</b><div class="muted small">${esc(o.name)}${o.id === e.id ? ' (employee)' : ''} · due ${fshort(due)}${auto ? ' · updates itself from ' + (key === 'bank' ? 'profile' : key === 'it' || key === 'id' ? 'assets' : key === 'assets' ? 'assets' : 'claims') : ''}${done && st ? ' · done by ' + esc(st.by) : ''}</div>${extra}</span></label>${od ? chip('Overdue', 'bad', 1) : done ? chip('Done', 'ok', 1) : ''}</div>`;
}
const progress = (kind, e, tasks) => {
  const n = tasks.filter(T => isDone(kind, e, T[0])).length;
  return { n, t: tasks.length, pct: (n / tasks.length) * 100 };
};
function onbCard(e) {
  const pr = progress('onb', e, ONB_T),
    pe = new Date(e.join + 'T00:00:00');
  pe.setMonth(pe.getMonth() + W().probation);
  return `<div class="card"><div class="head"><div class="person">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · joined ${fdate(e.join)} · reports to ${esc(reportsTo(e))}</span></div></div>${pr.n === pr.t ? chip('Complete', 'ok', 1) : chip(pr.n + ' of ' + pr.t + ' done', 'info', 1)}</div>
   <div class="kb" style="margin:2px 0 8px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pr.pct)}" aria-label="Onboarding progress"><i style="width:${pr.pct}%"></i></div><p class="muted small" style="margin-bottom:8px">Probation ends ${fdate(iso(pe))} (${W().probation} months, from Settings)</p><div class="list">${ONB_T.map(T => taskRow('onb', e, T)).join('')}</div></div>`;
}
function offCard(e) {
  const r = S.life.off[e.id],
    tasks = OFF_T,
    pr = progress('off', e, tasks),
    all = pr.n === pr.t,
    left = tasks.filter(T => !isDone('off', e, T[0]));
  return `<div class="card"><div class="head"><div class="person">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(r.reason)} · last working day ${fdate(r.lwd)}</span></div></div>${all ? chip('Cleared', 'ok', 1) : chip(pr.n + ' of ' + pr.t + ' cleared', 'warn', 1)}</div>
   <div class="kb" style="margin:2px 0 8px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pr.pct)}" aria-label="Clearance progress"><i style="width:${pr.pct}%"></i></div><p class="muted small" style="margin-bottom:8px">Resigned ${fdate(r.resigned)}. ${r.note ? esc(r.note) : ''}</p><div class="list">${tasks.map(T => taskRow('off', e, T)).join('')}</div>
   <div class="acts" style="margin-top:12px">${can('lifecycle', 'edit') ? `<button class="btn primary" ${all ? '' : 'disabled'} onclick="offComplete('${e.id}')">Complete exit</button>` : ''}${all ? '' : `<span class="muted small" style="align-self:center">Still open: ${left.map(T => T[1].split(' ').slice(0, 3).join(' ')).join(', ')}. The last day cannot be completed until clearance is done.</span>`}</div></div>`;
}
function startOff() {
  if (!need('lifecycle', 'create', 'start offboarding')) return;
  const opts = live().filter(
    e => e.id !== me().id && !S.life.off[e.id] && inScope('lifecycle', e.id) && e.id !== 'E-1001'
  );
  overlay(
    'Start offboarding',
    `<div class="fg">${fld('of-e', 'Employee', `<select id="of-e" onchange="offDef()">${opts.map(e => `<option value="${e.id}">${esc(e.name)} · ${esc(e.title)}</option>`).join('')}</select>`, 'full')}${fld('of-r', 'Reason', `<select id="of-r"><option>Resignation</option><option>End of contract</option><option>Retirement</option><option>Termination</option></select>`)}${fld('of-d', 'Resignation date', `<input id="of-d" type="date" value="${iso(TODAY)}" oninput="offDef()">`)}${fld('of-l', 'Last working day', `<input id="of-l" type="date">`)}${fld('of-n', 'Note', `<textarea id="of-n" rows="2"></textarea>`, 'full')}</div><p class="muted small" id="of-h"></p>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="offSave()">Start offboarding</button>`
  );
  offDef(true);
}
function offDef(first) {
  const e = emp($('#of-e').value),
    req = e.type === 'Plant' ? 30 : 60,
    d = $('#of-d').value || iso(TODAY);
  if (first || !$('#of-l').dataset.u)
    $('#of-l').value = iso(addDays(new Date(d + 'T00:00:00'), req));
  $('#of-l').oninput = () => {
    $('#of-l').dataset.u = 1;
    offDef();
  };
  const act = Math.round((new Date($('#of-l').value) - new Date(d)) / 864e5);
  $('#of-h').textContent =
    `Notice period for ${e.type === 'Plant' ? 'plant' : 'office'} staff is ${req} days.${act < req ? ` This is ${req - act} days short; the shortfall is recovered in the settlement.` : ''}`;
}
function offSave() {
  const id = $('#of-e').value,
    d = $('#of-d').value,
    l = $('#of-l').value;
  if (
    ![
      chk('of-d', !!d, 'Choose a date'),
      chk('of-l', !!l && l >= d, 'Last working day must be on or after the resignation date')
    ].every(Boolean)
  )
    return;
  const e = emp(id);
  S.life.off[id] = {
    reason: $('#of-r').value,
    resigned: d,
    lwd: l,
    note: $('#of-n').value.trim(),
    by: me().name,
    at: new Date().toISOString(),
    t: {}
  };
  audit('Offboarding started', e.name, {
    res: 'lifecycle',
    to: `last working day ${fdate(l)}`,
    reason: $('#of-r').value
  });
  persist();
  closeModal();
  S.tab.lc = 'off';
  render();
  toast('Offboarding started for ' + e.name + '. Tasks now have owners and due dates');
}
function offComplete(id) {
  if (!need('lifecycle', 'edit', 'complete exits')) return;
  const e = emp(id),
    r = S.life.off[id];
  if (OFF_T.some(T => !isDone('off', e, T[0]))) {
    toast('Clearance is not complete yet', null, 'err');
    return;
  }
  confirmBox(
    'Complete this exit?',
    `${e.name} will be marked as exited from ${fdate(r.lwd)} and removed from active lists, payroll and approvals.`,
    'Complete exit',
    () => {
      e.status = 'Exited';
      e.exit = r.lwd;
      r.done = true;
      S.life.exits.push({ emp: id, name: e.name, lwd: r.lwd, reason: r.reason });
      audit('Exit completed', e.name, { res: 'lifecycle', to: 'Exited on ' + fdate(r.lwd) });
      persist();
      render();
      toast(e.name + ' has exited');
    },
    true
  );
}
function lifecyclePage() {
  const t = curTab('lc', 'onb'),
    sc = live().filter(e => inScope('lifecycle', e.id)),
    joiners = sc
      .filter(e => e.join >= iso(addDays(TODAY, -60)))
      .sort((a, b) => (a.join < b.join ? 1 : -1)),
    offs = Object.keys(S.life.off)
      .map(emp)
      .filter(e => e && !S.life.off[e.id].done && inScope('lifecycle', e.id)),
    gone = (S.life.exits || []).slice().reverse();
  return (
    ph(
      'Joiners and leavers',
      'Onboarding and offboarding tasks with an owner and a due date',
      t === 'off' && can('lifecycle', 'create')
        ? `<button class="btn primary" onclick="startOff()">${ic('plus', 16)}Start offboarding</button>`
        : ''
    ) +
    `<div class="card" style="padding-bottom:0"><div class="head">${tabs(
      'lc',
      [
        ['onb', `Onboarding (${joiners.length})`],
        ['off', `Offboarding (${offs.length})`]
      ],
      'onb'
    )}</div></div>` +
    (t === 'onb'
      ? joiners.length
        ? joiners.map(onbCard).join('')
        : `<div class="card"><div class="empty"><span class="ei">${ic('users', 22)}</span><b>No recent joiners</b>People who joined in the last 60 days appear here with their tasks.</div></div>`
      : (offs.length
          ? offs.map(offCard).join('')
          : `<div class="card"><div class="empty"><span class="ei">${ic('check', 22)}</span><b>Nobody is leaving</b>Start offboarding to assign clearance, asset return and access removal.</div></div>`) +
        (gone.length
          ? `<div class="card"><div class="head"><h2>Recent exits</h2></div><div class="list">${gone
              .slice(0, 6)
              .map(
                x =>
                  `<div class="li"><span class="grow"><b>${esc(x.name)}</b><div class="muted small">${esc(x.reason)}</div></span><span class="muted small">${fdate(x.lwd)}</span></div>`
              )
              .join('')}</div></div>`
          : ''))
  );
}

/* js/core/boot.js */
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

/* js/features/assistant/assistant.js */
/* =====================================================================
   PeopleDesk AI · "Ask PeopleDesk" · core: launcher, drawer, conversation, proposals, hooks.
   A rule-based assistant that answers only from records the signed-in person can already see
   (it calls the app's own can / scopeOf / inScope / canField checks) and never changes data
   without an explicit confirmation card. Intents live in assistant-intents.js.
   Conversation lives in memory only: it is cleared on Clear, sign-out and when the preview role changes.
   ===================================================================== */
(function () {
  'use strict';
  const A = {
    open: false,
    msgs: [],
    flow: null,
    rec: null,
    props: {},
    hand: {},
    n: 0,
    intents: [],
    greeted: false
  };
  const R = () => persona().role;
  const mob = () => innerWidth <= 900;
  const pick = o => (o[R()] !== undefined ? o[R()] : o.any || '');
  Object.assign(ICON, {
    spark:
      'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
    send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
    trash: 'M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6 M10 11v6 M14 11v6',
    copy: 'M9 9h11v11H9z M5 15V5h10',
    newchat:
      'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.4 2.6a2 2 0 0 1 3 3L12 15l-4 1 1-4z',
    link: 'M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1 M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1-1'
  });

  /* handlers are kept in a registry, so no generated text is ever evaluated as code */
  const H = fn => {
    const id = 'h' + ++A.n;
    A.hand[id] = fn;
    return id;
  };
  const btn = (label, fn, cls) =>
    `<button type="button" class="${cls || 'btn sm'}" onclick="PDAI.run('${H(fn)}')">${label}</button>`;
  const L = items => `<ul class="ai-ul">${items.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const P = t => `<p>${t}</p>`;
  const KV = rows =>
    `<dl class="ai-kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  const flag = (sev, t) =>
    `<div class="ai-flag ${sev}">${ic(sev === 'info' ? 'help' : 'alert', 14)}<span>${t}</span></div>`;
  const goPage = (p, pre) => () => {
    if (mob()) closeAI();
    if (pre) pre();
    go(p);
  };
  const SRC = (label, p, pre) => [label, goPage(p, pre)];

  /* ---------- who is being asked about, always checked against the asker's scope ---------- */
  function who(text) {
    const lt = text.toLowerCase(),
      all = employees.filter(e => e.status !== 'Exited');
    let hit = all.find(e => lt.includes(e.name.toLowerCase()));
    if (!hit) {
      const fm = all.filter(e =>
        new RegExp('\\b' + e.name.split(' ')[0].toLowerCase() + "(?:'s|’s)?\\b").test(lt)
      );
      if (fm.length > 1) return { amb: fm };
      hit = fm[0];
    }
    return hit ? { e: hit, ok: hit.id === me().id || inScope('employees', hit.id) } : null;
  }

  /* ---------- dates in plain words ---------- */
  const MONS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const WDS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const mp = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*';
  const mkDate = (d, m) => {
    let x = new Date(TODAY.getFullYear(), m, d);
    if (x < addDays(TODAY, -60)) x = new Date(TODAY.getFullYear() + 1, m, d);
    return iso(x);
  };
  const nextWd = (w, from, incl) => {
    const x = new Date(from);
    if (!incl) x.setDate(x.getDate() + 1);
    while (x.getDay() !== w) x.setDate(x.getDate() + 1);
    return x;
  };
  function parseDates(t) {
    const lt = t.toLowerCase();
    let m = lt.match(/\d{4}-\d{2}-\d{2}/g);
    if (m) return { from: m[0], to: m[1] || m[0] };
    m = lt.match(
      new RegExp(
        '(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp +
          '\\s*(?:-|–|to|until|through)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp
      )
    );
    if (m)
      return { from: mkDate(+m[1], MONS.indexOf(m[2])), to: mkDate(+m[3], MONS.indexOf(m[4])) };
    m = lt.match(
      new RegExp(
        '(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:-|–|to|until|through|and)\\s*(\\d{1,2})(?:st|nd|rd|th)?\\s*' +
          mp
      )
    );
    if (m)
      return { from: mkDate(+m[1], MONS.indexOf(m[3])), to: mkDate(+m[2], MONS.indexOf(m[3])) };
    m =
      lt.match(new RegExp('(\\d{1,2})(?:st|nd|rd|th)?\\s*' + mp)) ||
      lt.match(new RegExp(mp + '\\s*(\\d{1,2})\\b'));
    if (m) {
      const d = isNaN(+m[1]) ? +m[2] : +m[1],
        mo = MONS.indexOf(isNaN(+m[1]) ? m[1] : m[2]);
      return { from: mkDate(d, mo), to: mkDate(d, mo) };
    }
    const wd = [
      ...lt.matchAll(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/g)
    ].map(x => WDS.indexOf(x[1]));
    if (wd.length) {
      const f = nextWd(wd[0], TODAY, false),
        to = wd[1] != null ? nextWd(wd[1], f, true) : f;
      return { from: iso(f), to: iso(to) };
    }
    if (/day after tomorrow/.test(lt))
      return { from: iso(addDays(TODAY, 2)), to: iso(addDays(TODAY, 2)) };
    if (/\btomorrow\b/.test(lt))
      return { from: iso(addDays(TODAY, 1)), to: iso(addDays(TODAY, 1)) };
    if (/\btoday\b/.test(lt)) return { from: iso(TODAY), to: iso(TODAY) };
    return null;
  }

  /* ---------- messages ---------- */
  function say(m) {
    m.who = 'ai';
    m.at = new Date();
    m.id = ++A.n;
    A.msgs.push(m);
    paint();
    return m;
  }
  const deny = (why, extra) => say({ tag: 'denied', html: P(why) + (extra ? P(extra) : '') });
  const TAGS = {
    read: ['Read-only answer', 'spark'],
    draft: ['Draft · review before using', 'file'],
    action: ['Needs your confirmation', 'shield'],
    denied: ["Can't do that", 'lock'],
    info: ['', '']
  };
  const hhmm = d =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const AV = `<span class="ai-av" aria-hidden="true">${ic('spark', 14)}</span>`;
  const ICONFOR = q => {
    q = q.toLowerCase();
    return /leave|holiday/.test(q)
      ? 'cal'
      : /late|attendance|clock|punch/.test(q)
        ? 'clock'
        : /payslip|payroll|salary|variance/.test(q)
          ? 'wallet'
          : /train|certif/.test(q)
            ? 'book'
            : /approv|overdue/.test(q)
              ? 'approve'
              : /cover|roster|shift/.test(q)
                ? 'grid'
                : /document|verif/.test(q)
                  ? 'file'
                  : /onboard|offboard|joiner/.test(q)
                    ? 'swap'
                    : /recruit|pipeline/.test(q)
                      ? 'brief'
                      : /integration|sso|session|security/.test(q)
                        ? 'key'
                        : /permission|role|audit/.test(q)
                          ? 'shield'
                          : /draft|announce|message/.test(q)
                            ? 'receipt'
                            : 'spark';
  };
  function msgHTML(m) {
    if (m.who === 'me')
      return `<div class="ai-mr me"><div class="ai-m ai-u">${esc(m.text)}</div><time class="ai-time">${hhmm(m.at || new Date())}</time></div>`;
    if (m.typing)
      return `<div class="ai-mr">${AV}<div class="ai-m ai-a" aria-label="PeopleDesk AI is typing"><span class="ai-typing"><i></i><i></i><i></i></span></div></div>`;
    if (m.hero)
      return `<div class="ai-hero"><span class="ai-hero-i">${ic('spark', 22)}</span><h3>${m.hero[0]}</h3><p>${m.hero[1]}</p></div><div class="ai-lbl2">Try asking</div><div class="ai-cards">${m.cards.map(([q, fn]) => `<button type="button" class="ai-card" onclick="PDAI.run('${H(fn)}')"><span class="ai-ci">${ic(ICONFOR(q), 16)}</span><span>${esc(q)}</span>${ic('arrow', 14)}</button>`).join('')}</div>`;
    const t = TAGS[m.tag || 'read'],
      p = m.prop && A.props[m.prop];
    let h = `<div class="ai-mr">${AV}<div class="ai-m ai-a k-${m.tag || 'read'}${p ? ' ai-prop' : ''}">`;
    if (t[0])
      h += `<span class="ai-tag">${ic(t[1], 12)}${t[0]}<time>${hhmm(m.at || new Date())}</time></span>`;
    h += m.html || '';
    if (p) h += propHTML(p);
    if (m.draft) {
      const id = 'dr' + m.id;
      h += `<textarea class="ai-draft" id="${id}" aria-label="Draft text. You can edit it." oninput="PDAI.edit(${m.id},this.value)">${esc(m.draft.text)}</textarea><div class="ai-row">${btn(ic('copy', 14) + 'Copy', () => copyText(m.draft.text))}${(m.draft.use || []).map(([l, fn]) => btn(l, () => fn(m.draft.text), 'btn sm primary')).join('')}</div>`;
    }
    if (m.opts && m.opts.length)
      h += `<div class="ai-row">${m.opts.map(([l, fn]) => `<button type="button" class="ai-opt" onclick="PDAI.run('${H(fn)}')">${l}</button>`).join('')}</div>`;
    if (m.nav && m.nav.length)
      h += `<div class="ai-row">${m.nav.map(([l, fn, pri]) => btn(l + ic('arrow', 14), fn, pri === false ? 'btn sm' : 'btn sm primary')).join('')}</div>`;
    if (m.src && m.src.length)
      h += `<div class="ai-row ai-srcs"><span class="ai-lbl">Sources</span>${m.src.map(([l, fn]) => `<button type="button" class="ai-src" onclick="PDAI.run('${H(fn)}')">${ic('link', 12)}${l}</button>`).join('')}</div>`;
    return h + '</div></div>';
  }
  function paint() {
    const lg = document.getElementById('ai-log');
    if (!lg) return;
    const near = lg.scrollHeight - lg.scrollTop - lg.clientHeight < 80 || !lg.dataset.n;
    lg.innerHTML = A.msgs.map(msgHTML).join('');
    lg.dataset.n = A.msgs.length;
    if (near) lg.scrollTop = lg.scrollHeight;
    /* the clear (trash) button only exists once the person has said something */
    const clr = document.getElementById('ai-clear');
    if (clr) clr.hidden = !A.msgs.some(m => m.who === 'me');
  }
  function copyText(t) {
    const ok = () => toast('Draft copied');
    try {
      navigator.clipboard
        .writeText(t)
        .then(ok, () => toast('Select the text and copy it', null, 'err'));
    } catch (e) {
      toast('Select the text and copy it', null, 'err');
    }
  }

  /* ---------- proposals: the only way the assistant changes anything ---------- */
  function propose(p) {
    const id = 'p' + ++A.n;
    A.props[id] = Object.assign({ id, step: 1, state: 'open', vals: {} }, p);
    (p.fields || []).forEach(f => (A.props[id].vals[f.id] = f.value || ''));
    return say({ tag: 'action', html: '', prop: id });
  }
  function propHTML(p) {
    let h = `<div class="ai-pt">${p.title}</div>`;
    if (p.state === 'open') {
      h += KV(p.rows || []) + (p.flags || '');
      (p.fields || []).forEach(f => {
        h += `<div class="ai-pf"><label class="small" for="pf-${p.id}-${f.id}"><b>${f.label}</b></label><textarea id="pf-${p.id}-${f.id}" rows="3" oninput="PDAI.val('${p.id}','${f.id}',this.value)" placeholder="${esc(f.ph || '')}">${esc(p.vals[f.id])}</textarea></div>`;
      });
      if (p.risk === 'high')
        h += `<div class="ai-risk"><b>${ic('alert', 14)} High-impact action</b>${p.impact || ''}</div>`;
      if (p.risk === 'high' && p.step === 2)
        h += `<label class="ai-ack"><input type="checkbox" onchange="document.getElementById('go-${p.id}').disabled=!this.checked"><span>${p.ack || 'I understand the impact above and want to go ahead.'}</span></label><div class="ai-row">${btn(
          'Back',
          () => {
            p.step = 1;
            paint();
          },
          'btn sm'
        )}<button type="button" class="btn sm primary" id="go-${p.id}" disabled onclick="PDAI.confirm('${p.id}')">${p.confirm2 || 'Confirm and run'}</button></div>`;
      else
        h += `<div class="ai-row"><button type="button" class="btn sm primary" onclick="PDAI.confirm('${p.id}')">${p.confirm || 'Confirm'}${p.risk === 'high' ? ' …' : ''}</button>${btn('Cancel', () => cancelProp(p.id), 'btn sm')}</div>`;
    } else if (p.state === 'done') {
      h += `<div class="ai-res ok">${ic('check', 16)}<span>${p.msg}</span></div>`;
      if (p.undo && p.undoOK && p.undoOK())
        h += `<div class="ai-row">${btn('Undo', () => doUndo(p.id), 'btn sm')}</div>`;
      if (p.after)
        h += `<div class="ai-row">${p.after.map(([l, fn]) => btn(l + ic('arrow', 14), fn, 'btn sm')).join('')}</div>`;
    } else if (p.state === 'failed')
      h += `<div class="ai-res bad">${ic('alert', 16)}<span>${p.msg}</span></div><p class="small muted" style="margin-top:6px">Nothing was changed.</p>`;
    else h += `<div class="ai-res mute">${ic('x', 16)}<span>${p.msg}</span></div>`;
    return h;
  }
  function cancelProp(id) {
    const p = A.props[id];
    p.state = 'cancelled';
    p.msg = 'Cancelled. Nothing was changed.';
    paint();
  }
  function confirmProp(id) {
    const p = A.props[id];
    if (!p || p.state !== 'open') return;
    const bad = (p.fields || []).find(f => f.required && !String(p.vals[f.id] || '').trim());
    if (bad) return toast(bad.label + ' is required', null, 'err');
    const c = p.check ? p.check(p.vals) : { ok: true };
    if (!c.ok) {
      p.state = 'failed';
      p.msg = esc(c.why);
      return paint();
    }
    if (p.risk === 'high' && p.step === 1) {
      p.step = 2;
      return paint();
    }
    let r;
    try {
      r = p.run(p.vals);
    } catch (e) {
      console.error(e);
      r = { ok: false, why: 'Something went wrong, so I stopped.' };
    }
    p.state = r.ok ? 'done' : 'failed';
    p.msg = r.ok ? r.msg : esc(r.why);
    if (r.ok) p.after = r.after;
    paint();
  }
  function doUndo(id) {
    const p = A.props[id],
      r = p.undo();
    p.msg = r.ok ? r.msg : p.msg;
    if (r.ok) p.undo = null;
    else toast(r.why || 'This can no longer be undone', null, 'err');
    paint();
  }
  /* every confirmed action leaves a trace in the audit log, separate from the workflow's own entry */
  const auditAI = (act, rec, o) =>
    audit(
      'PeopleDesk AI: ' + act,
      rec,
      Object.assign({ reason: 'Confirmed by ' + me().name + ' in the assistant' }, o)
    );

  /* ---------- context ---------- */
  function ctx() {
    const pg = S.page,
      name =
        pg === 'payroll' && ['hr', 'admin'].includes(R())
          ? 'Payroll review'
          : pg === 'dashboard'
            ? 'Home'
            : label(pg);
    let rec = '';
    const r = A.rec;
    if (r) {
      if (r.t === 'emp') rec = (emp(r.id) || {}).name || '';
      else if (r.t === 'req') {
        const q = KIND[r.k].list().find(x => x.id === r.id);
        rec = q ? `${emp(q.emp).name}'s ${KIND[r.k].n.toLowerCase()}` : '';
      } else rec = r.t === 'cand' ? 'candidate' : r.t === 'ticket' ? 'request ' + r.id : r.t;
    }
    const sel = S.sel && S.sel.ids && S.sel.ids.length ? ` · ${S.sel.ids.length} selected` : '';
    return { page: pg, name, rec, line: `Helping with ${name}${rec ? ' · ' + rec : ''}${sel}` };
  }
  function suggest() {
    const base = {
      employee: [
        'How many earned leaves do I have left?',
        'Help me apply for leave',
        'Why is my attendance showing late?',
        'Explain the deductions in my payslip',
        'What training is due for me?'
      ],
      manager: [
        'Show my pending approvals',
        'Who is on leave next week?',
        'Will my team have enough coverage on Friday?',
        'Summarize team attendance'
      ],
      hr: [
        'Which employees have pending document verification?',
        "What's blocking onboarding?",
        'Summarize recruitment pipeline status',
        'Which certifications are expiring in the next 30 days?'
      ],
      admin: [
        'What is blocking October payroll?',
        'Show payroll variance compared with last month',
        'Which approvals are overdue?',
        'Draft a Diwali shutdown announcement'
      ],
      sysadmin: [
        'Which integrations are failing?',
        'Show recent permission changes',
        'How do I configure SSO?',
        'Which users have active sessions?'
      ]
    }[R()];
    const pg = {
      leave: {
        employee: ['Help me apply for leave', 'Explain the leave policy'],
        any: ['Show my pending approvals', 'Who is on leave next week?']
      },
      attendance: {
        employee: ['Why is my attendance showing late?', 'How do I fix a missed punch?'],
        any: ['Summarize team attendance']
      },
      payroll: {
        employee: ['Explain the deductions in my payslip'],
        admin: [
          'What is blocking October payroll?',
          'Show payroll variance compared with last month'
        ],
        hr: ['What is blocking October payroll?']
      },
      employees: {
        hr: ['Which employees have pending document verification?'],
        any: ['Who from my team is on leave next week?']
      },
      requests: {
        employee: ['What is the status of my requests?', 'How do I raise an expense claim?']
      },
      reports: { any: ['Explain the headcount, attrition and attendance trends'] },
      settings: {
        admin: ['How do I change the leave policy?'],
        sysadmin: ['How do I configure SSO?', 'Explain roles and permissions']
      },
      approvals: { any: ['What needs my attention?', 'Which approvals are overdue?'] }
    }[S.page];
    const extra = pg ? pg[R()] || pg.any || [] : [];
    return [...extra, ...base].filter((x, i, a) => a.indexOf(x) === i).slice(0, 5);
  }
  function chips() {
    const c = [
      ['Explain this page', 'Explain this page'],
      ['What needs my attention?', 'What needs my attention?']
    ];
    if (A.rec) c.push(['Summarize this record', 'Summarize this record']);
    c.push(
      ['Draft a message', 'Draft a message'],
      ['How do I complete this task?', 'How do I complete this task?']
    );
    return c;
  }
  function paintChrome() {
    const cx = document.getElementById('ai-ctx');
    if (cx) cx.textContent = ctx().line;
    const ch = document.getElementById('ai-chips');
    if (ch) ch.hidden = !A.msgs.some(m => m.who === 'me');
    if (ch)
      ch.innerHTML = chips()
        .map(
          ([l, q]) =>
            `<button type="button" onclick="PDAI.ask(${JSON.stringify(q).replace(/"/g, '&quot;')})">${l}</button>`
        )
        .join('');
  }

  /* ---------- panel ---------- */
  function build() {
    if (document.getElementById('ai-fab')) return;
    document.body.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="ai-fab" id="ai-fab" aria-haspopup="dialog" aria-expanded="false" aria-controls="ai-panel" aria-label="Ask PeopleDesk, the assistant" onclick="PDAI.toggle()">${ic('spark', 20)}<span class="ai-fl">Ask PeopleDesk</span></button>
      <div class="ai-scrim" id="ai-scrim" onclick="PDAI.close()"></div>
      <aside class="ai-panel" id="ai-panel" role="dialog" aria-label="Ask PeopleDesk" inert>
        <div class="ai-h"><span class="ai-grab"></span><span class="ai-logo">${ic('spark', 18)}</span><div class="grow"><h2>Ask PeopleDesk</h2><span class="ai-ctx" id="ai-ctx"></span></div>
          <button type="button" class="icon-btn" id="ai-clear" aria-label="Start a new chat" title="New chat" onclick="PDAI.clear()">${ic('newchat', 17)}</button>
          <button type="button" class="icon-btn" aria-label="Close assistant" title="Close" onclick="PDAI.close()">${ic('x', 17)}</button></div>
        <div class="ai-log" id="ai-log" role="log" aria-live="polite" aria-label="Conversation" tabindex="0"></div>
        <div class="ai-chips" id="ai-chips" aria-label="Quick replies"></div>
        <form class="ai-in" onsubmit="PDAI.submit(event)"><label class="sr" for="ai-q">Ask PeopleDesk</label><textarea id="ai-q" rows="1" placeholder="Ask about your work, or say what you need" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();PDAI.submit(event)}" oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"></textarea><button class="btn primary" type="submit" aria-label="Send">${ic('send', 16)}</button></form>
        <p class="ai-foot">Uses only records you can access. Changes need your confirmation.</p>
      </aside>`
    );
    document.getElementById('ai-panel').addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeAI();
      }
    });
  }
  function welcome() {
    const u = me(),
      cap = {
        employee:
          'check leave balances, help you apply for leave, explain late marks and payslip components, and track your requests and training',
        manager:
          'summarise your approvals, check team leave and shift cover, and draft approval or rejection comments',
        hr: 'summarise employee records, document verification, onboarding and offboarding tasks, recruitment and training compliance',
        admin:
          'explain what is blocking payroll, compare it with last month, summarise approvals and attendance, and draft announcements',
        sysadmin:
          'explain roles, permissions and security settings, and review audit and integration status. I do not have access to employee or payroll data'
      }[R()];
    say({
      tag: 'info',
      hero: [`Hi ${esc(u.name.split(' ')[0])}, how can I help?`, `I can ${cap}.`],
      cards: suggest().map(q => [q, () => ask(q)])
    });
  }
  function openAI(q) {
    build();
    A.open = true;
    const p = document.getElementById('ai-panel');
    p.removeAttribute('inert');
    p.classList.add('open');
    document.getElementById('ai-scrim').classList.add('open');
    document.getElementById('ai-fab').setAttribute('aria-expanded', 'true');
    if (!A.msgs.length) welcome();
    paint();
    paintChrome();
    if (q) ask(q);
    else if (!mob()) setTimeout(() => document.getElementById('ai-q').focus(), 60);
  }
  function closeAI() {
    const p = document.getElementById('ai-panel');
    if (!p) return;
    A.open = false;
    p.classList.remove('open');
    p.setAttribute('inert', '');
    document.getElementById('ai-scrim').classList.remove('open');
    const f = document.getElementById('ai-fab');
    f.setAttribute('aria-expanded', 'false');
    f.focus({ preventScroll: true });
  }
  function reset() {
    A.msgs = [];
    A.flow = null;
    A.props = {};
    A.hand = {};
    A.rec = null;
    A.last = null;
    paint();
    if (A.open) {
      welcome();
      paintChrome();
    }
  }

  /* ---------- the conversation ---------- */
  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    if (!A.open) openAI();
    A.msgs.push({ who: 'me', id: ++A.n, text, at: new Date() });
    const typing = { who: 'ai', id: ++A.n, typing: true };
    A.msgs.push(typing);
    paint();
    setTimeout(() => {
      A.msgs = A.msgs.filter(m => m !== typing);
      try {
        route(text);
      } catch (e) {
        console.error(e);
        say({
          tag: 'denied',
          html: P(
            'Something went wrong while I was working on that, so I stopped. Nothing was changed. Please try again or rephrase.'
          )
        });
      }
      paintChrome();
    }, 320);
  }
  function route(text) {
    const lt = text.toLowerCase();
    if (/^(cancel|stop|never ?mind|forget it)\b/.test(lt) && A.flow) {
      A.flow = null;
      return say({ tag: 'info', html: P('Okay, I have stopped that. Nothing was changed.') });
    }
    if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(lt) && lt.length < 30)
      return welcome();
    if (/^(thanks|thank you|thx)/.test(lt))
      return say({
        tag: 'info',
        html: P('You are welcome. Ask me anything else about your work.')
      });
    if (/\b(clear|reset|delete)\b.*\b(chat|conversation|history)\b/.test(lt)) return reset();
    for (const it of A.intents) {
      if (it.when(lt, text)) {
        const gate = it.gate && it.gate(lt);
        if (gate) return deny(gate);
        return it.run(text, lt);
      }
    }
    return K.fallback(text);
  }

  const K = {
    A,
    R,
    mob,
    pick,
    H,
    btn,
    L,
    P,
    KV,
    flag,
    goPage,
    SRC,
    who,
    parseDates,
    nextWd,
    say,
    deny,
    propose,
    auditAI,
    ctx,
    suggest,
    ask,
    openAI,
    closeAI,
    reset,
    paint,
    add: (when, run, gate) => A.intents.push({ when, run, gate }),
    addFirst: (when, run, gate) => A.intents.unshift({ when, run, gate })
  };
  K.fallback = text => {
    say({
      tag: 'info',
      html: P("I'm not sure how to help with that yet. Here are some things I can do for you:"),
      opts: suggest().map(q => [esc(q), () => ask(q)])
    });
  };

  /* ---------- public handle used by inline handlers ---------- */
  window.PDAI = {
    K,
    open: openAI,
    close: closeAI,
    toggle: () => (A.open ? closeAI() : openAI()),
    clear: () => {
      reset();
      toast('New chat started');
    },
    ask,
    run: id => A.hand[id] && A.hand[id](),
    confirm: confirmProp,
    val: (pid, fid, v) => (A.props[pid].vals[fid] = v),
    edit: (mid, v) => {
      const m = A.msgs.find(x => x.id === mid);
      if (m && m.draft) m.draft.text = v;
    },
    submit: e => {
      e.preventDefault();
      const q = document.getElementById('ai-q');
      const v = q.value;
      q.value = '';
      q.style.height = 'auto';
      ask(v);
    },
    page: () => {
      const c = ctx();
      openAI();
      ask('Explain this page');
    }
  };

  /* ---------- hooks into the existing app ---------- */
  const PAGES_WITH_HELP = [
    'dashboard',
    'attendance',
    'leave',
    'payroll',
    'employees',
    'requests',
    'reports',
    'settings',
    'approvals',
    'lifecycle',
    'recruit',
    'roster'
  ];
  const _render = render;
  render = function () {
    _render.apply(this, arguments);
    build();
    const v = document.getElementById('view');
    if (v && PAGES_WITH_HELP.includes(S.page) && S.authed) {
      const host = v.querySelector('.ph .acts, .hometop') || v.querySelector('.ph');
      if (host && !host.querySelector('.ai-ctxbtn')) {
        const b = `<button type="button" class="btn ai-ctxbtn" onclick="PDAI.page()" aria-label="Ask PeopleDesk about this page">${ic('spark', 16)}<span>Ask about this page</span></button>`;
        if (host.classList.contains('ph') && !host.querySelector('.acts'))
          host.insertAdjacentHTML('beforeend', `<div class="acts">${b}</div>`);
        else host.insertAdjacentHTML('afterbegin', b);
      }
    }
    if (A.open) paintChrome();
  };
  const _go = go;
  go = function () {
    A.rec = null;
    return _go.apply(this, arguments);
  };
  const _closeModal = closeModal;
  closeModal = function () {
    A.rec = null;
    const r = _closeModal.apply(this, arguments);
    if (A.open) paintChrome();
    return r;
  };
  /* remember the record the person is looking at, so "summarize this" knows what "this" is */
  [
    ['empProfile', id => ({ t: 'emp', id })],
    ['reqDetail', (k, id) => ({ t: 'req', k, id })],
    ['candDetail', id => ({ t: 'cand', id })],
    ['ticketDetail', id => ({ t: 'ticket', id })],
    ['assetDetail', id => ({ t: 'asset', id })],
    ['incView', id => ({ t: 'inc', id })],
    ['courseDetail', i => ({ t: 'course', i })],
    ['payslipDetail', id => ({ t: 'slip', id })]
  ].forEach(([fn, mk]) => {
    const o = window[fn];
    if (typeof o !== 'function') return;
    window[fn] = function () {
      const r = o.apply(this, arguments);
      A.rec = mk.apply(null, arguments);
      if (A.open) paintChrome();
      return r;
    };
  });
  ['setRole', 'signOut', 'finishLogin'].forEach(fn => {
    const o = window[fn];
    window[fn] = function () {
      const r = o.apply(this, arguments);
      reset();
      if (fn === 'signOut') closeAI();
      return r;
    };
  });
  /* Ctrl+K: Ask PeopleDesk is one of the results */
  const _cmdRender = cmdRender;
  cmdRender = function (q0) {
    _cmdRender(q0);
    const raw = (q0 || '').trim();
    if (raw.startsWith('>')) return;
    const it = {
      g: 'Ask PeopleDesk',
      t: raw ? `Ask: “${raw}”` : 'Ask PeopleDesk',
      s: raw ? 'Get an answer or guided help' : 'Open the assistant for help on this page',
      i: 'spark',
      fn: () => {
        closeModal();
        openAI(raw);
      }
    };
    if (raw) cmdItems.push(it);
    else cmdItems.unshift(it);
    cmdPaint();
  };
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === '/' && S.authed) {
      e.preventDefault();
      A.open ? closeAI() : openAI();
    }
  });
  if (S.authed) build();
  else document.addEventListener('DOMContentLoaded', build);
  build();
})();

/* js/features/assistant/intents.js */
/* =====================================================================
   PeopleDesk AI · intents. Every handler reads through the app's own permission helpers
   (can, scopeOf, inScope, canField, scoped) and cites where the data came from.
   Anything that writes goes through K.propose(): show, confirm, run, audit.
   ===================================================================== */
(function (K) {
  'use strict';
  const {
    R,
    pick,
    L,
    P,
    KV,
    flag,
    SRC,
    say,
    deny,
    propose,
    auditAI,
    who,
    parseDates,
    btn,
    H,
    add,
    addFirst,
    A,
    goPage,
    nextWd
  } = K;
  const nm = s => esc(s);
  const fday = d =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  const range = (f, t) => (f === t ? fday(f) : fday(f) + ' to ' + fday(t));
  const runStr = s => () => {
    if (K.mob()) K.closeAI();
    new Function(s)(); // strings written by the app's own checks (ids only), never user text
  };
  const open = fn => () => {
    if (K.mob()) K.closeAI();
    fn();
  };
  const hasTxt = (lt, re) => re.test(lt);
  const nothing = what => say({ tag: 'read', html: P(what) });
  const noAccess = (what, how) =>
    deny(`${what} is not available to your role (${persona().n}).`, how);
  const person = (text, res) => {
    const w = who(text);
    if (w && w.amb) return { amb: w.amb };
    return w;
  };
  const askWhich = (list, fn) =>
    say({
      tag: 'read',
      html: P('Which one do you mean?'),
      opts: list.map(x => [nm(x.l), () => fn(x.v)])
    });
  const SCOPE_MSG = e =>
    deny(
      `${nm(e.name)} is outside your access. You can only see people in your own scope (${nm(scopeLabel())}).`
    );
  const scopeLabel = () =>
    (SCOPES.find(s => s[0] === scopeOf('employees')) || ['', 'your own records'])[1].toLowerCase();

  /* ---------- page guidance ---------- */
  const PH = {
    dashboard: {
      about: {
        employee:
          'Your home screen: clock in and out, this week and month of attendance, leave balance, your latest payslip, and anything that needs your attention.',
        sysadmin:
          'System home: accounts by role, privileged accounts, two-step coverage and recent system changes.',
        any: "Your home screen: today's clock-in, requests waiting for you, headline numbers (headcount, attendance, leave, openings), team attendance and workforce charts."
      },
      tasks: {
        employee: [
          'Press Clock in when you start your shift.',
          'Use the shortcuts to apply for leave or open your payslip.',
          'Work through “Needs your attention”.'
        ],
        sysadmin: [
          'Open Manage users to review accounts and roles.',
          'Use Security to check two-step coverage and timeouts.'
        ],
        any: [
          'Check the approvals strip and open anything marked overdue.',
          'Select a KPI card to open the page behind it.',
          'Use Customize home to hide or reorder sections.'
        ]
      }
    },
    attendance: {
      about: {
        employee:
          'Your attendance calendar and punches. Select a day to see times, late marks and verification checks.',
        any: 'Attendance for you and your team, with punches, late marks and corrections.'
      },
      tasks: {
        employee: [
          'Select the day in the calendar.',
          'Choose Request correction and say what happened (missed punch, wrong time).',
          'Your manager approves it, then the day updates.'
        ],
        any: [
          'Select a person or a day to see punches.',
          'Open Approvals to decide correction requests.'
        ]
      }
    },
    leave: {
      about: {
        employee:
          'Your leave balances and requests. Weekends, weekly offs and holidays on your calendar are not charged.',
        any: 'Leave balances, your requests and your team requests waiting for approval.'
      },
      tasks: {
        employee: [
          'Choose Apply for leave.',
          'Pick the type and dates. I show the days charged and any teammate clash.',
          'Add a reason (and a certificate for sick leave over the policy limit), then submit.'
        ],
        any: [
          'Open Team requests.',
          'Select a request to see balance, overlaps and route, then approve or reject.'
        ]
      }
    },
    payroll: {
      about: {
        employee: 'Your payslips, with earnings, deductions and net pay.',
        manager: 'Your own payslips. Team pay is not visible to managers.',
        any: 'The monthly payroll run: attendance lock, checks, approval and payment.'
      },
      tasks: {
        employee: ['Select a month to open the payslip.', 'Use Download to save a PDF.'],
        manager: ['Select a month to open your payslip.'],
        any: [
          'Fix every blocking issue under Checks.',
          'Acknowledge warnings, then submit for approval.',
          'A different person approves it, then the bank file is generated.'
        ]
      }
    },
    employees: {
      about: {
        any: 'People in your scope with department, location and status. Open a person for their profile, jobs, assets and documents.'
      },
      tasks: {
        any: [
          'Search or filter, then select a person.',
          'Use the tabs for overview, employment, assets and documents.'
        ]
      }
    },
    requests: {
      about: {
        employee: 'Expense claims, helpdesk requests and document requests, with their status.',
        any: 'Claims, helpdesk tickets and document requests in your scope.'
      },
      tasks: {
        employee: [
          'Choose New claim or New request.',
          'Fill in the details and submit. Your manager or HR picks it up.',
          'Track it from the same page.'
        ],
        any: ['Open a ticket to reply or resolve it.', 'Approve claims from Approvals.']
      }
    },
    reports: {
      about: { any: 'Ready-made reports on workforce, attendance, leave and more, with download.' },
      tasks: {
        any: [
          'Open a report to preview it.',
          'Use Download for CSV or PDF.',
          'Some figures are marked Sample where data is not connected yet.'
        ]
      }
    },
    settings: {
      about: {
        sysadmin: 'Users, roles and access, security and integrations.',
        any: 'Work policies, statutory settings and preferences. Changes are versioned with an effective date.'
      },
      tasks: {
        sysadmin: [
          'Roles and access: set what each role can do and see.',
          'Security: two-step, password length and session timeout.',
          'Integrations: bank, SSO, devices, email (placeholders in this demo).'
        ],
        any: [
          'Pick the tab (Work policies or Statutory).',
          'Change a value and choose when it takes effect.',
          'Add a reason: it is kept in the audit log.'
        ]
      }
    },
    approvals: {
      about: {
        any: 'One queue for leave, claims and attendance corrections waiting for you, oldest due first.'
      },
      tasks: {
        any: [
          'Open a request to see the balance, overlaps and route.',
          'Approve, or reject with a reason the person will see.',
          'Use Overdue to catch late requests.'
        ]
      }
    },
    lifecycle: {
      about: { any: 'Onboarding and offboarding tasks, each with an owner and a due date.' },
      tasks: {
        any: [
          'Tick tasks as they are done (some update themselves).',
          'Clearance must finish before an exit can be completed.'
        ]
      }
    },
    recruit: {
      about: { any: 'The hiring pipeline by stage, with open positions and candidates.' },
      tasks: {
        any: ['Drag a candidate to the next stage.', 'Open a candidate to review or reject.']
      }
    },
    roster: {
      about: { any: 'Shift roster for the week. Cells show the shift; conflicts are highlighted.' },
      tasks: {
        any: ['Select a cell to change a shift.', 'Watch for highlighted conflicts before saving.']
      }
    },
    performance: {
      about: { any: 'Goals and reviews.' },
      tasks: { any: ['Update progress on a goal.', 'Managers open a person to add a review.'] }
    },
    training: {
      about: { any: 'Courses, completion and certificate expiry.' },
      tasks: { any: ['Open a course to start or continue it.', 'Renew anything close to expiry.'] }
    },
    safety: {
      about: { any: 'Incidents and their investigation status.' },
      tasks: {
        any: [
          'Report an incident from the page.',
          'Managers and HR close incidents after investigation.'
        ]
      }
    },
    assets: {
      about: { any: 'Company assets and who holds them.' },
      tasks: {
        any: ['Open an asset for its history.', 'Confirm receipt or return items from the asset.']
      }
    },
    org: {
      about: { any: 'Reporting lines. Reporting changes can take effect on a later date.' },
      tasks: { any: ['Open a person to see their line.'] }
    },
    audit: {
      about: { any: 'A record of who changed what and when.' },
      tasks: { any: ['Filter by action or person.', 'Open a row to see before and after values.'] }
    },
    profile: {
      about: { any: 'Your own details, documents and job history.' },
      tasks: { any: ['Use Edit to update contact details.', 'Upload documents HR asks for.'] }
    }
  };
  const pageHelp = () => {
    const pg = S.page,
      h = PH[pg],
      name = label(pg);
    if (!h) return say({ tag: 'read', html: P(`This is ${nm(name)}.`), src: [SRC(name, pg)] });
    const about = pick(h.about),
      tasks = pick(h.tasks);
    say({
      tag: 'read',
      html:
        P(`<b>${nm(name)}</b>: ${about}`) +
        (tasks && tasks.length ? `<div class="ai-lbl">What you can do here</div>` + L(tasks) : ''),
      src: [SRC(name, pg)]
    });
  };
  add(
    lt =>
      /(explain|describe|what('?s| is)|tell me about).*\b(this|the) (page|screen)\b|what can i do (on|in|here)|help with this page/.test(
        lt
      ),
    pageHelp
  );
  add(
    lt =>
      /how (do|can|should) i (complete|finish|do) this|how do i complete this task|next step/.test(
        lt
      ),
    () => {
      const h = PH[S.page];
      if (!h) return pageHelp();
      const t = pick(h.tasks);
      say({
        tag: 'read',
        html:
          P(`Steps on <b>${nm(label(S.page))}</b>:`) +
          `<ol class="ai-ul">${t.map(x => `<li>${x}</li>`).join('')}</ol>`,
        src: [SRC(label(S.page), S.page)]
      });
    }
  );

  /* ---------- what needs attention ---------- */
  add(
    lt =>
      /what needs my attention|needs (my )?attention|what('?s| is) (pending|urgent)( for me| right now| today)?\??$|anything urgent/.test(
        lt
      ),
    () => {
      const items = [],
        r = R();
      if (r === 'sysadmin') {
        const noMfa = ROLE_DEF.filter(x => x.k !== 'employee' && !S.sec.twoFA[x.k]).map(x => x.n);
        if (noMfa.length)
          items.push({
            t: `Two-step verification is off for: ${nm(noMfa.join(', '))}`,
            go: ['Security', 'settings', () => (S.tab.st = 'security')]
          });
        if (S.sec.minLen < 12)
          items.push({
            t: `Minimum password length is ${S.sec.minLen}. 12 or more is recommended.`,
            go: ['Security', 'settings', () => (S.tab.st = 'security')]
          });
        items.push({
          t: 'Integrations: none are connected in this demo (bank, SSO, devices, email).',
          go: ['Integrations', 'settings', () => (S.tab.st = 'integrations')]
        });
      } else {
        if (can('approvals', 'view')) {
          const ap = queue('mine'),
            od = queue('overdue');
          if (ap.length)
            items.push({
              t: `${ap.length} approval${ap.length > 1 ? 's' : ''} waiting for you${od.length ? `, ${od.length} overdue` : ''}`,
              go: ['Approvals', 'approvals', () => (S.tab.ap = od.length ? 'overdue' : 'mine')]
            });
        }
        if (['hr', 'admin'].includes(r) && can('payroll', 'view') && S.payStep <= 2) {
          const c = payCheck();
          if (c.err.length || c.warn.length)
            items.push({
              t: `Payroll: ${c.err.length} blocking issue${c.err.length === 1 ? '' : 's'} and ${c.warn.length} warning${c.warn.length === 1 ? '' : 's'}`,
              go: ['Payroll', 'payroll']
            });
        }
        const inc = S.incidents.filter(i => i.st !== 'Closed').length;
        if (inc && r !== 'employee' && can('safety', 'view'))
          items.push({
            t: `${inc} open safety incident${inc > 1 ? 's' : ''} need investigation`,
            go: ['Safety', 'safety']
          });
        const exp = S.courses.filter(c => c.exp <= iso(addDays(TODAY, 30)));
        if (exp.length && r !== 'employee' && can('training', 'view'))
          items.push({
            t: `${exp.length} certificate${exp.length > 1 ? 's' : ''} expire within 30 days (${nm(exp.map(c => c.n).join(', '))})`,
            go: ['Training', 'training']
          });
        attentionItems(me().id)
          .slice(0, 5)
          .forEach(x => items.push({ t: `${nm(x.t)}. ${nm(x.s)}`, run: x.act, cta: x.cta }));
      }
      if (!items.length)
        return say({
          tag: 'read',
          html: P('You are all caught up. Nothing needs your action right now.')
        });
      say({
        tag: 'read',
        html:
          P('Here is what needs your attention:') +
          L(
            items.map(
              i =>
                i.t +
                (i.go
                  ? ' ' + btn(i.go[0], K.goPage(i.go[1], i.go[2]), 'btn sm')
                  : i.run
                    ? ' ' + btn(nm(i.cta || 'Open'), runStr(i.run), 'btn sm')
                    : '')
            )
          ),
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );

  /* ---------- leave: balance, policy, guided application ---------- */
  const typeOf = lt =>
    /earned|\bel\b/.test(lt)
      ? 'EL'
      : /casual|\bcl\b/.test(lt)
        ? 'CL'
        : /sick|\bsl\b|fever|medical|unwell/.test(lt)
          ? 'SL'
          : '';
  add(
    lt =>
      /(how many|balance|left|remaining|available).*(leave|casual|sick|earned|\bcl\b|\bsl\b|\bel\b)|leave balance|my leaves?\b/.test(
        lt
      ) && !/apply|help me|policy|who|team|approv/.test(lt),
    (text, lt) => {
      let e = me();
      const w = person(text);
      if (w && w.e && w.e.id !== e.id) {
        if (!w.ok || !can('leave', 'view') || !inScope('leave', w.e.id))
          return w.e ? SCOPE_MSG(w.e) : null;
        e = w.e;
      }
      const b = balances(e.id),
        t = typeOf(lt),
        self = e.id === me().id;
      const order = t ? [t, ...Object.keys(b).filter(k => k !== t)] : Object.keys(b);
      const pend = S.leaves.filter(l => l.emp === e.id && l.status === 'Pending');
      say({
        tag: 'read',
        html:
          (t
            ? P(
                `${self ? 'You have' : nm(e.name) + ' has'} <b>${b[t].left} days</b> of ${POLICY[t].n.toLowerCase()} left (${b[t].used} of ${POLICY[t].t} used this year).`
              )
            : P(`${self ? 'Your' : nm(e.name) + "'s"} leave balance this year:`)) +
          L(order.map(k => `${POLICY[k].n}: <b>${b[k].left}</b> of ${POLICY[k].t} days left`)) +
          (pend.length
            ? P(
                `${pend.length} request${pend.length > 1 ? 's are' : ' is'} still pending (${pend.reduce((a, l) => a + l.days, 0)} days). Pending days are not yet deducted.`
              )
            : ''),
        src: [SRC('Leave balances', 'leave')],
        nav: self ? [['Apply for leave', () => leaveFlow('Apply for leave')]] : []
      });
    }
  );
  add(
    lt =>
      /\bpolic(y|ies)\b|rules? (for|about)|probation|notice period|carry forward|grace period|working hours|medical certificate/.test(
        lt
      ) && !/draft|write/.test(lt),
    (text, lt) => {
      const w = W(),
        parts = [];
      if (
        /leave|casual|sick|earned|carry|certificate|notice/.test(lt) ||
        !/probation|attendance|grace|hours|document/.test(lt)
      )
        parts.push([
          'Leave',
          [
            `Yearly entitlement: ${Object.values(POLICY)
              .map(p => `${p.n} ${p.t} days`)
              .join(', ')}.`,
            `Earned leave needs ${w.noticeEL} working days' notice. Up to ${w.carryEL} earned days can carry forward.`,
            `Sick leave longer than ${w.certDays} days needs a medical certificate.`,
            'Weekly offs and company holidays on your calendar are not charged. Requests older than 7 days also need HR approval.'
          ]
        ]);
      if (/probation/.test(lt))
        parts.push([
          'Probation',
          [
            `Probation is ${w.probation} months from the joining date.`,
            'HR confirms the employee at the end of probation.'
          ]
        ]);
      if (/attendance|grace|hours|late/.test(lt))
        parts.push([
          'Attendance',
          [
            `Standard day is ${w.hours} hours. Grace time is ${w.grace} minutes after shift start; later punches are marked late.`,
            `Working week: Office ${w.week.Office} days, Plant ${w.week.Plant} days. Overtime is paid at ${w.ot}.`
          ]
        ]);
      if (/document/.test(lt))
        parts.push([
          'Documents',
          [
            `HR verifies: ${VDOCS.map(d => d[1]).join(', ')}.`,
            'If a file cannot be verified, HR asks for a new upload.'
          ]
        ]);
      say({
        tag: 'read',
        html:
          parts.map(([h, a]) => `<b>${h}</b>` + L(a)).join('') +
          P(
            '<span class="muted small">This is the policy as configured in PeopleDesk. For exceptions, confirm with HR.</span>'
          ),
        src: [SRC('Settings · Work policies', 'settings', () => (S.tab.st = 'policy'))].filter(s =>
          okPage('settings')
        )
      });
    }
  );

  /* guided leave application: collect type, dates, reason, then show a confirmation card */
  const leaveCheck = s => {
    const e = me(),
      w = W(),
      c = leaveCalc(e, s.from, s.to, !!s.half),
      b = balances(e.id)[s.type],
      err = [],
      warn = [];
    if (s.to < s.from) err.push('The end date is before the start date.');
    if (!c.chargeable)
      err.push(
        'Those dates are all non-working days on your calendar, so nothing would be charged.'
      );
    if (c.chargeable > b.left)
      err.push(
        `Not enough balance: you have ${b.left} days of ${POLICY[s.type].n.toLowerCase()} and this needs ${c.chargeable}.`
      );
    if (
      S.leaves.some(
        l =>
          l.emp === e.id &&
          ['Pending', 'Approved'].includes(l.status) &&
          l.from <= s.to &&
          s.from <= l.to
      )
    )
      err.push('You already have leave on some of these dates.');
    const cert = s.type === 'SL' && c.chargeable > w.certDays;
    if (cert)
      err.push(
        `A medical certificate is required for sick leave over ${w.certDays} days. I cannot attach files, so use the form to add it.`
      );
    if (s.type === 'EL' && c.chargeable && s.from < addWork(iso(TODAY), w.noticeEL))
      warn.push(
        `Earned leave needs ${w.noticeEL} working days' notice. HR may ask you to change the dates.`
      );
    if (s.from < iso(daysAgo(7))) warn.push('Requests more than 7 days old also need HR approval.');
    const ov = teamOverlap(e.id, s.from, s.to, 0);
    if (ov.length)
      warn.push(
        `${ov.length} teammate${ov.length > 1 ? 's are' : ' is'} also off: ${nm(overlapText(ov))}`
      );
    return {
      c,
      b,
      err,
      warn,
      cert,
      route: routeFor('leave', { emp: e.id, days: c.chargeable, from: s.from })
    };
  };
  const reasonOptions = (t, s) => {
    const when = s && s.from ? range(s.from, s.to) : 'the dates above';
    return {
      CL: [
        `I need to take casual leave on ${when} for a personal matter. I will hand over urgent work before I leave.`,
        `Requesting casual leave on ${when} to attend to family commitments.`
      ],
      SL: [
        `I am unwell and have been advised rest on ${when}.`,
        `Requesting sick leave on ${when} as I am not feeling well.`
      ],
      EL: [
        `I would like to use earned leave on ${when} for a planned break. I will complete pending work and hand over before I go.`,
        `Requesting earned leave on ${when} to travel with family.`
      ]
    }[t || 'CL'];
  };
  function leaveFlow(text) {
    const f = A.flow && A.flow.k === 'leave' ? A.flow : (A.flow = { k: 'leave', s: {}, await: '' }),
      s = f.s,
      lt = text.toLowerCase();
    if (!can('leave', 'create')) return deny('You do not have permission to apply for leave.');
    const ty = typeOf(lt);
    if (ty) s.type = ty;
    const d = parseDates(text);
    if (d) {
      s.from = d.from;
      s.to = d.to;
    }
    const nd = lt.match(/\b(\d+(?:\.5)?)\s*days?\b/);
    if (nd && s.from && s.from === s.to) {
      let n = Math.max(1, Math.round(+nd[1])),
        x = new Date(s.from + 'T00:00:00'),
        end = new Date(x);
      while (n > 0) {
        if (worksDay(me(), x)) {
          end = new Date(x);
          n--;
        }
        x.setDate(x.getDate() + 1);
      }
      s.to = iso(end);
    }
    if (/\bhalf[- ]?day|first half|second half\b/.test(lt))
      s.half = /second/.test(lt) ? 'second' : 'first';
    const rs = text.match(/(?:because|reason(?: is|:)?|due to)\s+(.{3,})$/i);
    if (rs) s.reason = rs[1].trim();
    else if (f.await === 'reason' && !d && !ty && text.length > 3)
      s.reason = text.trim().slice(0, 300);
    f.await = '';
    if (!s.type) {
      f.await = 'type';
      const b = balances(me().id);
      return say({
        tag: 'read',
        html: P('Happy to help you apply. Which leave type?'),
        opts: Object.keys(POLICY).map(k => [
          `${POLICY[k].n} (${b[k].left} left)`,
          () => ask2(`${POLICY[k].n}`)
        ])
      });
    }
    if (!s.from) {
      f.await = 'dates';
      return say({
        tag: 'read',
        html: P(
          `For which dates? You can say “3–4 November”, “Monday to Wednesday”, “tomorrow”, or “2 days from Monday”.`
        )
      });
    }
    if (s.half && s.from !== s.to) s.half = '';
    const chk = leaveCheck(s);
    if (chk.err.length) {
      const bad = chk.err;
      f.await = 'dates';
      s.from = s.to = '';
      return say({
        tag: 'denied',
        html:
          P("I can't submit that as it stands:") +
          L(bad.map(nm)) +
          P('Tell me different dates, or open the form to attach a certificate.'),
        nav: [
          [
            'Open the leave form',
            open(() => {
              go('leave');
              applyLeave();
            })
          ]
        ]
      });
    }
    if (!s.reason) {
      f.await = 'reason';
      const o = reasonOptions(s.type, s);
      return say({
        tag: 'read',
        html:
          P(
            `${POLICY[s.type].n}, ${range(s.from, s.to)} (${chk.c.chargeable} working day${chk.c.chargeable === 1 ? '' : 's'}). What is the reason? You can type one, or pick a draft.`
          ) + (chk.warn.length ? chk.warn.map(w => flag('warn', w)).join('') : ''),
        opts: o.map(x => [
          nm(x.length > 70 ? x.slice(0, 67) + '…' : x),
          () => {
            s.reason = x;
            leaveFlow('');
          }
        ])
      });
    }
    proposeLeave(s, chk);
  }
  const ask2 = t => K.ask(t);
  function proposeLeave(s, chk) {
    const e = me(),
      after = +(chk.b.left - chk.c.chargeable).toFixed(1);
    let created = null;
    propose({
      title: `Apply for ${POLICY[s.type].n.toLowerCase()}?`,
      rows: [
        ['Dates', range(s.from, s.to) + (s.half ? ` (${s.half} half)` : '')],
        ['Chargeable', fdays(chk.c.chargeable)],
        ['Balance', `${chk.b.left} → <b>${after}</b> days`],
        ['Goes to', chk.route.map(x => nm(x.n) + ' (' + x.role + ')').join(' then ')],
        ['Reason', nm(s.reason)]
      ],
      flags: chk.warn.map(w => flag('warn', w)).join(''),
      confirm: 'Submit request',
      check: () =>
        can('leave', 'create')
          ? { ok: true }
          : { ok: false, why: 'You no longer have permission to apply for leave.' },
      run: () => {
        const again = leaveCheck(s);
        if (again.err.length) return { ok: false, why: again.err[0] };
        const u = me(),
          l = {
            id: Date.now(),
            ref: nextRef('leave'),
            emp: u.id,
            type: s.type,
            from: s.from,
            to: s.to,
            days: again.c.chargeable,
            half: s.half || undefined,
            reason: s.reason,
            status: 'Pending',
            att: null,
            calc: 1
          };
        l.route = again.route;
        l.stage = 0;
        l.sub = iso(TODAY);
        l.due = addWork(l.sub, 2);
        l.hist = [
          {
            at: new Date().toISOString(),
            by: u.name,
            as: 'Requester',
            act: 'Submitted',
            note: s.reason
          }
        ];
        S.leaves.unshift(l);
        audit('Leave submitted', `${u.name} · ${l.ref}`, {
          res: 'leave',
          to: `${fdays(l.days)}, ${fdate(s.from)}${s.from !== s.to ? ' to ' + fdate(s.to) : ''}`
        });
        auditAI('Leave request submitted', `${u.name} · ${l.ref}`, { res: 'leave' });
        persist();
        render();
        created = l;
        A.flow = null;
        return {
          ok: true,
          msg: `Submitted as <b>${l.ref}</b>. Waiting for ${nm(nextOwner('leave', l))}, due ${fshort(l.due)}.`,
          after: [['View request', open(() => reqDetail('leave', l.id))]]
        };
      },
      undoOK: () => created && created.status === 'Pending' && created.stage === 0,
      undo: () => {
        created.status = 'Cancelled';
        created.hist.push({
          at: new Date().toISOString(),
          by: me().name,
          as: 'Requester',
          act: 'Cancelled',
          note: 'Withdrawn from the assistant'
        });
        audit('Leave cancelled', `${me().name} · ${created.ref}`, { res: 'leave' });
        persist();
        render();
        return {
          ok: true,
          msg: `Withdrawn. ${created.ref} is cancelled and your balance is untouched.`
        };
      }
    });
    A.flow = null;
  }
  const leaveStart = (text, lt) => leaveFlow(text);
  window.__pdaiLeave = leaveStart;
  K.leaveFlow = leaveFlow;
  addFirst(
    lt =>
      A.flow &&
      A.flow.k === 'leave' &&
      !/^(what|how|why|who|which|show|explain)\b|\b(draft|suggest|compose)\b/.test(lt),
    (text, lt) => leaveFlow(text)
  );
  add(
    lt =>
      /\b(apply|applying|request|book|take|need)\b.*\b(leave|day off|days off|time off)\b|help me apply|apply for leave|\bleave from\b|^\s*take .*off\b/.test(
        lt
      ) && !/approve|reject|policy|balance/.test(lt),
    text => leaveFlow(text)
  );

  /* ---------- employee self-service ---------- */
  add(
    lt =>
      /(why|explain|what).*(late|marked|attendance|absent)|late mark|attendance (is )?showing/.test(
        lt
      ) && !/team|summar|company|everyone|trend|attrition|headcount|report/.test(lt),
    () => {
      const u = me(),
        rows = [];
      for (let k = 0; k < 14; k++) {
        const dt = addDays(TODAY, -k),
          o = dayInfo(u.id, dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (o.late > 0 || o.st === 'A' || o.miss) rows.push(o);
      }
      const w = W();
      const li = rows
        .slice(0, 5)
        .map(o =>
          o.st === 'A'
            ? `<b>${fshort(o.iso)}</b>: absent, no punch recorded.`
            : o.miss
              ? `<b>${fshort(o.iso)}</b>: clocked in but no clock-out was recorded.`
              : `<b>${fshort(o.iso)}</b>: you clocked in at ${tm(o.in)}; your shift (${nm(o.shiftName)}) starts at ${tm(o.start)}. That is ${o.late} minutes after start, beyond the ${w.grace}-minute grace time.`
        );
      say({
        tag: 'read',
        html:
          (rows.length
            ? P('In the last 14 days:') + L(li)
            : P(
                `I can't see any late marks, absences or missing punches for you in the last 14 days. A day is marked late when the first punch is more than ${w.grace} minutes after shift start.`
              )) +
          (rows.length
            ? P(
                'If a mark is wrong (for example a missed punch or a gate issue), request a correction and your manager can approve it.'
              )
            : ''),
        src: [SRC('Attendance', 'attendance')],
        nav: rows.length ? [['Open attendance', goPage('attendance')]] : []
      });
    }
  );
  add(
    lt =>
      /regulari[sz]|attendance correction|missed punch|forgot to (clock|punch)|fix (my )?(attendance|punch)/.test(
        lt
      ),
    () =>
      say({
        tag: 'read',
        html:
          P('To correct a day:') +
          `<ol class="ai-ul"><li>Open <b>Attendance</b> and select the day.</li><li>Choose <b>Request correction</b>, pick the type (missed punch-out, wrong time, late mark waiver) and add the real times and a reason.</li><li>Your manager (or HR for older dates) approves it. The day then updates and payroll uses the corrected time.</li></ol>`,
        nav: [['Open attendance', goPage('attendance')]],
        src: [SRC('Attendance', 'attendance')]
      })
  );
  add(
    lt =>
      /clock.?in|clock.?out|\bpunch(es)?\b|geofence|can'?t clock/.test(lt) &&
      !/correction|missed|forgot/.test(lt),
    () => {
      const chk = punchChecks(S.clock.mode);
      say({
        tag: 'read',
        html:
          P(`Your current work mode is <b>${nm(S.clock.mode)}</b>. Clock-in checks right now:`) +
          L(chk.map(([k, t, s]) => `${k === 'ok' ? '✓' : '⚠'} <b>${nm(t)}</b>: ${nm(s)}`)) +
          P(
            'If a check fails, switch the work mode (Office, Plant gate, Work from home, On-site visit) to match where you are, or move closer to the site. If it still fails, ask your manager to approve a correction.'
          ),
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );
  const slipHTML = e => {
    const s = slip(e.ctc),
      t = ST(),
      self = e.id === me().id;
    return (
      KV([
        ['Basic', `${inr(s.basic)} <span class="muted small">40% of monthly pay</span>`],
        ['HRA', `${inr(s.hra)} <span class="muted small">50% of basic</span>`],
        ['Special allowance', `${inr(s.special)} <span class="muted small">the balance</span>`],
        ['Gross', `<b>${inr(s.m)}</b>`]
      ]) +
      KV([
        [
          'PF (employee)',
          `${inr(s.pf)} <span class="muted small">${t.pf.rate}% of basic, capped at ${inr(t.pf.ceil)}</span>`
        ],
        ...(t.esi.on
          ? [
              [
                'ESI',
                s.esi
                  ? inr(s.esi)
                  : '₹0 <span class="muted small">not applicable above the wage ceiling</span>'
              ]
            ]
          : []),
        ['Professional tax', inr(s.pt)],
        [
          'TDS (income tax)',
          `${inr(s.tds)} <span class="muted small">monthly estimate on pay above ${inr(t.tds.thresh)} a year</span>`
        ],
        ['Total deductions', `<b>${inr(s.ded)}</b>`],
        ['Net pay', `<b>${inr(s.net)}</b>`]
      ])
    );
  };
  add(
    lt =>
      /payslip|salary slip|deduction|\bpf\b|provident|\btds\b|\bhra\b|professional tax|take.?home|net pay|basic salary|salary(?! certificate)|\bctc\b|how much (does|is)/.test(
        lt
      ) &&
      !/variance|payroll (status|run)|compare|team|everyone|release|disburse|pay ?out|process|approve|payments?/.test(
        lt
      ),
    (text, lt) => {
      if (R() === 'sysadmin') return deny('System Admin cannot access payslips or salary data.');
      let e = me();
      const w = who(text);
      if (w && w.e && w.e.id !== e.id) {
        if (!w.ok || !can('payroll', 'view') || !canField('salary', w.e.id))
          return deny(
            `You do not have access to ${nm(w.e.name)}'s pay details.`,
            'Pay information is only visible to people with payroll and salary access.'
          );
        e = w.e;
      }
      const focus = /\bpf\b|provident/.test(lt)
        ? 'PF is a retirement saving: 12% of basic (capped) comes off your pay, and your employer adds a matching amount.'
        : /\btds\b|tax/.test(lt)
          ? 'TDS is income tax your employer deducts monthly, estimated from your yearly pay. A missing PAN can make it higher.'
          : /hra/.test(lt)
            ? 'HRA is house rent allowance, 50% of basic. Part of it may be tax-exempt if you pay rent.'
            : /professional/.test(lt)
              ? 'Professional tax is a small fixed state tax deducted every month.'
              : '';
      say({
        tag: 'read',
        html:
          P(
            `${e.id === me().id ? 'Your' : nm(e.name) + "'s"} latest payslip (September 2026), explained:`
          ) +
          slipHTML(e) +
          (focus ? P(focus) : '') +
          P(
            '<span class="muted small">For tax or reimbursement questions, confirm with Finance.</span>'
          ),
        src: [
          SRC('Payslips', 'payroll', () => {
            if (S.role !== 'employee') S.tab.pr = 'me';
          })
        ],
        nav: [
          [
            'Open payslip',
            goPage('payroll', () => {
              if (S.role !== 'employee') S.tab.pr = 'me';
            })
          ]
        ]
      });
    }
  );
  add(
    lt =>
      /(status|track|pending|where is).*(request|claim|ticket|leave|correction)|my requests|my claims/.test(
        lt
      ) && !/approval|team/.test(lt),
    () => {
      const u = me(),
        out = [];
      S.leaves
        .filter(l => l.emp === u.id)
        .slice(0, 4)
        .forEach(l =>
          out.push(
            `<b>Leave</b> ${range(l.from, l.to)} (${POLICY[l.type].n}): ${stChip(l.status)}${l.status === 'Pending' && l.route ? ' waiting for ' + nm(nextOwner('leave', l)) : ''}`
          )
        );
      S.claims
        .filter(c => c.emp === u.id)
        .slice(0, 3)
        .forEach(c => out.push(`<b>Claim</b> ${nm(c.cat)} ${inr(c.amt)}: ${stChip(c.st)}`));
      S.regs
        .filter(r => r.emp === u.id)
        .slice(0, 2)
        .forEach(r =>
          out.push(`<b>Correction</b> ${fshort(r.date)} (${nm(r.type)}): ${stChip(r.status)}`)
        );
      S.tickets
        .filter(t => t.emp === u.id)
        .slice(0, 3)
        .forEach(t => out.push(`<b>${nm(t.id)}</b> ${nm(t.cat)}: ${stChip(t.st)}`));
      say({
        tag: 'read',
        html: out.length ? P('Your recent requests:') + L(out) : P('You have no requests yet.'),
        src: [SRC('Leave', 'leave'), SRC('Requests', 'requests')]
      });
    }
  );
  add(
    lt =>
      /(expense|claim|reimburs)/.test(lt) &&
      /(how|raise|submit|file|new|help|create)/.test(lt) &&
      !/approve|pending/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To raise an expense claim:') +
          `<ol class="ai-ul"><li>Open <b>Requests</b> and choose <b>New claim</b>.</li><li>Pick the category, enter the amount in rupees, the expense date and a short note.</li><li>Submit. Your manager approves it (claims of ₹10,000 or more also need HR).</li></ol>`,
        nav: [
          [
            'Open the claim form',
            open(() => {
              go('requests');
              addClaim();
            })
          ]
        ],
        src: [SRC('Requests', 'requests')]
      })
  );
  add(
    lt =>
      /(helpdesk|ticket|raise a request|salary certificate|experience letter|address proof|id card|document request|it support)/.test(
        lt
      ) &&
      /(how|raise|new|need|help|get|request|create)/.test(lt) &&
      !/draft|write|status/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To ask HR or IT for something (a letter, a certificate, an ID card, IT support):') +
          `<ol class="ai-ul"><li>Open <b>Requests</b> and choose <b>New request</b>.</li><li>Choose what you need and the priority, and describe it.</li><li>Submit. You can follow the status and reply from the same page.</li></ol>`,
        nav: [
          [
            'Open the request form',
            open(() => {
              go('requests');
              addTicket();
            })
          ]
        ],
        opts: [['Draft the message for me', () => K.ask('Draft a helpdesk message')]],
        src: [SRC('Requests', 'requests')]
      })
  );
  add(
    lt => /(update|change|edit).*(profile|address|phone|contact|bank|details)/.test(lt),
    () =>
      say({
        tag: 'read',
        html: P(
          'You can update your contact details yourself from <b>My profile</b> (choose Edit). Bank and identity details are verified by HR: upload the new document and HR will review it.'
        ),
        nav: [['Open my profile', goPage('profile')]],
        src: [SRC('My profile', 'profile')]
      })
  );
  add(
    lt =>
      /training|course|certif|learning/.test(lt) &&
      !/expir|organi[sz]ation|compliance|team|everyone|summar|30 days/.test(lt) &&
      R() === 'employee',
    () => {
      const e = me(),
        rows = reqCourses(e)
          .map(({ c, i }) => ({ c, p: trainPct(e, c, i) }))
          .filter(x => x.p < 100);
      say({
        tag: 'read',
        html: rows.length
          ? P('Training due for you:') +
            L(rows.map(x => `<b>${nm(x.c.n)}</b>: ${x.p}% done, renew by ${fshort(x.c.exp)}`))
          : P('You have completed all your required training.'),
        nav: rows.length ? [['Open training', goPage('training')]] : [],
        src: [SRC('Training', 'training')]
      });
    }
  );
  add(
    lt => /holiday/.test(lt),
    () => {
      const list = HOLIDAYS.map(h => ({ ...h, d: new Date(TODAY.getFullYear(), h.m, h.d) }))
        .filter(h => h.d >= TODAY)
        .slice(0, 4);
      say({
        tag: 'read',
        html: list.length
          ? P('Upcoming company holidays:') +
            L(
              list.map(
                h =>
                  `<b>${nm(h.n)}</b>: ${h.d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} (in ${Math.round((h.d - TODAY) / 864e5)} days)`
              )
            )
          : P('There are no more company holidays listed this year.'),
        src: [SRC('Dashboard · holidays', 'dashboard')]
      });
    }
  );
  add(
    lt => /\b(asset|laptop|equipment|headset|return due)\b/.test(lt) && R() !== 'sysadmin',
    () => {
      const a = assetsOf(me().id);
      say({
        tag: 'read',
        html: a.cur.length
          ? P('Assets issued to you:') +
            L(
              a.cur.map(
                x =>
                  `<b>${nm(aname(x))}</b> (${nm(x.type)}, serial ${nm(x.serial)})${x.ack ? '' : ' · <span style="color:var(--amber-ink)">please confirm receipt</span>'}`
              )
            )
          : P('You have no company assets issued.'),
        src: [SRC('Assets', okPage('assets') ? 'assets' : 'profile')]
      });
    }
  );
  add(
    lt =>
      /(what|which|how many).*(documents?|files?).*(pending|missing|verif|need)|my documents/.test(
        lt
      ) && R() === 'employee',
    () => {
      const d = vdocsOf(me()).filter(x => x.st !== 'Verified');
      say({
        tag: 'read',
        html: d.length
          ? P('Documents that need action:') +
            L(d.map(x => `<b>${nm(x.n)}</b>: ${nm(x.st)}${x.note ? ' · ' + nm(x.note) : ''}`))
          : P('All your documents are verified.'),
        src: [SRC('My profile · documents', 'profile')]
      });
    }
  );

  /* ---------- approvals and requests (manager, HR, admin) ---------- */
  const flagsFor = (k, r) => {
    ensureReq(k, r);
    const out = [],
      e = emp(r.emp);
    if (k === 'leave') {
      const b = balances(r.emp)[r.type],
        w = W();
      if (b.left - r.days < 0)
        out.push(['bad', `Balance is too low: ${b.left} days left, this asks for ${r.days}.`]);
      else if (b.left - r.days <= 1)
        out.push([
          'warn',
          `Low balance: only ${+(b.left - r.days).toFixed(1)} day(s) left after this.`
        ]);
      const ov = teamOverlap(r.emp, r.from, r.to, r.id);
      if (ov.length) out.push(['warn', `Overlaps with ${overlapText(ov)}.`]);
      if (r.type === 'SL' && r.days > w.certDays && !r.att)
        out.push(['warn', `No medical certificate attached (needed over ${w.certDays} days).`]);
      if (r.type === 'EL' && r.from < addWork(r.sub || iso(TODAY), w.noticeEL))
        out.push(['warn', `Short notice for earned leave (${w.noticeEL} working days expected).`]);
      if (r.from < iso(daysAgo(7)))
        out.push(['warn', 'Dated more than 7 days back, so HR also needs to approve.']);
    }
    if (k === 'claim' && r.amt >= 10000)
      out.push(['warn', 'Claims of ₹10,000 or more also need HR approval.']);
    if (k === 'reg')
      out.push([
        'info',
        `${r.type}: times ${r.in || '–'} to ${r.out || '–'}. Reason given: “${r.reason || 'none'}”.`
      ]);
    if (isOverdue(k, r)) out.push(['bad', `Overdue since ${fshort(r.due)}.`]);
    if (r.route && r.route.length > 1)
      out.push([
        'info',
        `Needs ${r.route.length} approvals: ${r.route.map(x => x.role).join(' then ')}.`
      ]);
    return out;
  };
  const sumReq = (k, r) => {
    const e = emp(r.emp),
      fl = flagsFor(k, r);
    return {
      html:
        KV([
          ['Who', `${nm(e.name)} <span class="muted small">${nm(e.title)}, ${nm(e.dept)}</span>`],
          ['Request', nm(reqSummary(k, r))],
          ['Reason', nm(r.reason || r.note || '–')],
          [
            'Status',
            stChip(stOf(k, r)) +
              (stOf(k, r) === 'Pending' && r.route
                ? ' waiting for ' + nm(nextOwner('leave' === k ? k : k, r))
                : '')
          ],
          [
            'Submitted',
            `${fshort(r.sub || iso(TODAY))} (${ageTxt(r)} ago), due ${fshort(r.due || iso(TODAY))}`
          ]
        ]) +
        (fl.length
          ? `<div class="ai-lbl">Worth knowing</div>` +
            fl.map(f => flag(f[0], nm(f[1]).replace(/&#39;/g, "'"))).join('')
          : P(
              '<span class="muted small">Nothing unusual: balance is fine and there are no clashes.</span>'
            )),
      fl
    };
  };
  const findReq = (k, id) => KIND[k].list().find(x => x.id === id);
  const reqAllowed = () => can('approvals', 'view') && R() !== 'employee';
  add(
    lt =>
      /pending approvals?|my approvals|show.*approvals|approvals (waiting|queue)|what.*(waiting for|awaiting) (me|my approval)/.test(
        lt
      ) && !/overdue/.test(lt),
    () => {
      if (!reqAllowed())
        return noAccess(
          'The approvals queue',
          'You can follow your own requests under Requests and Leave instead.'
        );
      const q = approvalItems();
      if (!q.length)
        return say({
          tag: 'read',
          html: P('Nothing is waiting for your approval right now.'),
          src: [SRC('Approvals', 'approvals')]
        });
      say({
        tag: 'read',
        html:
          P(
            `You have <b>${q.length}</b> approval${q.length > 1 ? 's' : ''} waiting, oldest first:`
          ) +
          L(
            q
              .slice(0, 6)
              .map(
                x =>
                  `<b>${nm(emp(x.emp).name)}</b>: ${nm(x.k)}, ${nm(x.sub)} ${btn('Summarize', () => K.ask('Summarize ' + emp(x.emp).name + "'s " + x.kind), 'btn sm')}`
              )
          ) +
          (q.length > 6 ? P(`…and ${q.length - 6} more.`) : ''),
        nav: [['Open approvals', goPage('approvals', () => (S.tab.ap = 'mine'))]],
        src: [SRC('Approvals', 'approvals')]
      });
    }
  );
  add(
    lt => /overdue/.test(lt) && /(approval|request)/.test(lt),
    () => {
      if (!reqAllowed()) return noAccess('Approval queues');
      const q = queue('overdue');
      say({
        tag: 'read',
        html: q.length
          ? P(`<b>${q.length}</b> request${q.length > 1 ? 's are' : ' is'} overdue:`) +
            L(
              q
                .slice(0, 8)
                .map(
                  ({ k, r }) =>
                    `<b>${nm(emp(r.emp).name)}</b>: ${nm(KIND[k].n)}, ${nm(reqSummary(k, r))}, due ${fshort(r.due)}`
                )
            )
          : P('No approvals are overdue.'),
        nav: q.length ? [['Open overdue', goPage('approvals', () => (S.tab.ap = 'overdue'))]] : [],
        src: [SRC('Approvals', 'approvals')]
      });
    }
  );
  const targetReq = (text, lt) => {
    const rec = A.rec && A.rec.t === 'req' ? A.rec : null;
    if (rec && /\bthis\b|^(approve|reject)$/.test(lt)) {
      const r = findReq(rec.k, rec.id);
      return r ? { list: [{ k: rec.k, r }] } : { list: [] };
    }
    const w = who(text),
      kind = /claim|expense/.test(lt)
        ? 'claim'
        : /correct|regulari|punch/.test(lt)
          ? 'reg'
          : /leave/.test(lt)
            ? 'leave'
            : '';
    if (w && w.e && !w.ok) return { out: w.e };
    let list = allReq().filter(
      ({ k, r }) =>
        stOf(k, r) === 'Pending' && (!kind || k === kind) && (!w || !w.e || r.emp === w.e.id)
    );
    if (!w && !kind) list = queue('mine');
    return {
      list: list.filter(({ k, r }) => inScope(KIND[k].res, r.emp) || canAct(k, r).ok),
      w,
      kind
    };
  };
  const proposeDecision = (k, r, st) => {
    const e = emp(r.emp),
      a = canAct(k, r),
      isRej = st === 'Rejected';
    if (!a.ok) return deny(`I can't ${isRej ? 'reject' : 'approve'} that: ${nm(a.why)}.`);
    const fl = flagsFor(k, r);
    propose({
      title: `${isRej ? 'Reject' : 'Approve'} ${nm(e.name)}'s ${KIND[k].n.toLowerCase()}?`,
      rows: [
        ['Request', nm(reqSummary(k, r))],
        ['Reason given', nm(r.reason || r.note || '–')],
        ['Your role', nm(a.as)],
        [
          'Next',
          isRej
            ? 'The request ends and the person is told why.'
            : r.stage >= r.route.length - 1 || a.as === 'HR override'
              ? 'Final approval. The request is approved.'
              : `Moves on to ${nm(r.route[r.stage + 1].n)}.`
        ]
      ],
      flags: fl.map(f => flag(f[0], nm(f[1]).replace(/&#39;/g, "'"))).join(''),
      fields: isRej
        ? [
            {
              id: 'note',
              label: 'Reason for rejecting (the requester will see this)',
              value: draftReject(k, r),
              required: true
            }
          ]
        : [],
      confirm: isRej ? 'Reject request' : 'Approve request',
      check: () => {
        const x = canAct(k, r);
        return x.ok ? { ok: true } : { ok: false, why: x.why };
      },
      run: v => {
        const out = decideCore(k, r, st, isRej ? (v.note || '').trim() : '');
        if (!out.ok) return { ok: false, why: out.why };
        auditAI(`${KIND[k].n} ${isRej ? 'rejected' : 'approved'}`, `${e.name} · ${refOf(k, r)}`, {
          res: KIND[k].res
        });
        persist();
        render();
        return {
          ok: true,
          msg: nm(out.msg) + '.',
          after: [['View request', open(() => reqDetail(k, r.id))]]
        };
      }
    });
  };
  addFirst(
    lt =>
      /\b(approve|reject|decline)\b/.test(lt) &&
      !/draft|write|word|comment|how (do|can)|payroll|announcement|policy|should i|summar|explain|before i/.test(
        lt
      ),
    (text, lt) => {
      const nmM = text.match(/(?:approve|reject|decline)\s+([A-Za-z]+)(?:'s|’s)/i);
      if (nmM && !who(text) && !/^(this|all|the|my|every)$/i.test(nmM[1]))
        return nothing(`I couldn't find anyone named ${nm(nmM[1])} in your records.`);
      const st = /reject|decline/.test(lt) ? 'Rejected' : 'Approved';
      if (/\b(my own|my)\b.*\b(leave|request|claim|correction)\b/.test(lt))
        return deny(
          'You cannot approve or reject your own request. Your approver decides it (you can see who it is waiting for under Requests).'
        );
      if (!reqAllowed())
        return noAccess(
          'Approving or rejecting requests',
          R() === 'sysadmin'
            ? 'System Admin cannot approve any HR workflow.'
            : 'Your manager or HR decides your requests. You can follow them under Requests.'
        );
      if (/\ball\b|everything|every request/.test(lt)) {
        if (st === 'Rejected')
          return deny(
            "I won't reject requests in bulk: each rejection needs its own reason. Open the request, or ask me about one person."
          );
        const items = queue('mine').filter(({ k, r }) => canAct(k, r).ok);
        if (!items.length) return nothing('There is nothing waiting for your approval.');
        return propose({
          title: `Approve all ${items.length} pending requests?`,
          risk: 'high',
          confirm: `Review ${items.length} approvals`,
          confirm2: `Approve ${items.length} requests`,
          rows: items.slice(0, 8).map(({ k, r }) => [nm(emp(r.emp).name), nm(reqSummary(k, r))]),
          impact: `This is a bulk update. It approves ${items.length} requests at once${items.length > 8 ? ' (the first 8 are listed)' : ''}. Requests with warnings (low balance, clashes) are included. Each one is recorded separately in the audit log.`,
          ack: `I have reviewed the list and want to approve all ${items.length} requests.`,
          check: () => ({ ok: true }),
          run: () => {
            let n = 0,
              skip = 0;
            items.forEach(({ k, r }) => {
              const o = decideCore(k, r, 'Approved', '');
              if (o.ok) {
                n++;
                auditAI('Bulk approval', `${emp(r.emp).name} · ${refOf(k, r)}`, {
                  res: KIND[k].res
                });
              } else skip++;
            });
            persist();
            render();
            return {
              ok: true,
              msg: `${n} request${n === 1 ? '' : 's'} approved${skip ? `, ${skip} skipped because they changed` : ''}.`
            };
          }
        });
      }
      const t = targetReq(text, lt);
      if (t.out) return SCOPE_MSG(t.out);
      if (!t.list.length)
        return nothing(
          `I couldn't find a pending request${t.w && t.w.e ? ' from ' + nm(t.w.e.name) : ''} that you can decide. Try “Show my pending approvals”.`
        );
      if (t.list.length === 1) return proposeDecision(t.list[0].k, t.list[0].r, st);
      say({
        tag: 'read',
        html: P(`I found ${t.list.length} requests. Which one?`),
        opts: t.list
          .slice(0, 6)
          .map(({ k, r }) => [
            nm(`${emp(r.emp).name}: ${KIND[k].n}, ${reqSummary(k, r)}`),
            () => proposeDecision(k, r, st)
          ])
      });
    }
  );
  const sumRecord = (text, lt) => {
    const rec = A.rec,
      w = who(text);
    const kind = /claim|expense/.test(lt)
      ? 'claim'
      : /correct|regulari/.test(lt)
        ? 'reg'
        : /leave/.test(lt)
          ? 'leave'
          : '';
    if (w && w.e && !rec) {
      if (!w.ok) return SCOPE_MSG(w.e);
      if (/profile|employee|record|about/.test(lt) && !kind) return showEmp(w.e);
      const list = allReq().filter(
        ({ k, r }) => r.emp === w.e.id && (!kind || k === kind) && stOf(k, r) === 'Pending'
      );
      if (list.length === 1) return showReq(list[0].k, list[0].r);
      if (!list.length && /profile|employee|record|summar/.test(lt)) return showEmp(w.e);
      if (list.length)
        return say({
          tag: 'read',
          html: P('Which request?'),
          opts: list.map(({ k, r }) => [
            nm(KIND[k].n + ': ' + reqSummary(k, r)),
            () => showReq(k, r)
          ])
        });
    }
    if (!rec)
      return say({
        tag: 'read',
        html: P(
          'Open a request, employee or candidate first and I will summarise it. You can also name a person, for example “Summarize Riya’s leave request”.'
        )
      });
    if (rec.t === 'req') {
      const r = findReq(rec.k, rec.id);
      return r && (inScope(KIND[rec.k].res, r.emp) || r.emp === me().id)
        ? showReq(rec.k, r)
        : deny('That request is outside your access.');
    }
    if (rec.t === 'emp') {
      const e = emp(rec.id);
      return e && (e.id === me().id || inScope('employees', e.id))
        ? showEmp(e)
        : deny('That person is outside your access.');
    }
    if (rec.t === 'cand') {
      const c = S.cands.find(x => x.id === rec.id);
      return c && can('recruit', 'view')
        ? say({
            tag: 'read',
            html: KV([
              ['Candidate', nm(c.n)],
              ['Role', nm(c.r)],
              ['Stage', nm(S.stages[c.st])],
              ['Source', nm(c.src)]
            ]),
            src: [SRC('Recruitment', 'recruit')]
          })
        : deny('Recruitment data is not available to your role.');
    }
    if (rec.t === 'ticket') {
      const t = S.tickets.find(x => x.id === rec.id);
      return t && (t.emp === me().id || can('requests', 'approve'))
        ? say({
            tag: 'read',
            html: KV([
              ['Request', nm(t.id)],
              ['Type', nm(t.cat)],
              ['Priority', nm(t.pr)],
              ['Status', stChip(t.st)],
              ['Raised', fshort(t.d)]
            ]),
            src: [SRC('Requests', 'requests')]
          })
        : deny('That request is outside your access.');
    }
    if (rec.t === 'slip')
      return say({
        tag: 'read',
        html: P(
          'This is a payslip. Ask “Explain the deductions in my payslip” for a line-by-line explanation.'
        )
      });
    say({
      tag: 'read',
      html: P(
        'I can summarise requests, employees, candidates and tickets. Open one of those and ask again.'
      )
    });
  };
  const showReq = (k, r) => {
    const s = sumReq(k, r);
    say({
      tag: 'read',
      html: s.html,
      nav:
        stOf(k, r) === 'Pending' && canAct(k, r).ok
          ? [['Open request', open(() => reqDetail(k, r.id))]]
          : [],
      opts:
        stOf(k, r) === 'Pending' && canAct(k, r).ok
          ? [
              ['Draft a rejection comment', () => draftFor('reject', '', { k, r })],
              ['Draft an approval comment', () => draftFor('approve', '', { k, r })]
            ]
          : [],
      src: [SRC(KIND[k].n + ' requests', 'approvals')]
    });
  };
  add(
    lt =>
      /summar(y|i[sz]e)|explain this|tell me about this|what('?s| is) (in )?this (record|request)|why .*(need|needs) attention/.test(
        lt
      ) &&
      !/(team|company|recruitment|pipeline|attendance|training|payroll|trend|week|month|audit|log entry|page)/.test(
        lt
      ),
    sumRecord
  );

  const showEmp = e => {
    if (!(e.id === me().id || inScope('employees', e.id))) return SCOPE_MSG(e);
    const self = e.id === me().id,
      hrView = can('employees', 'edit') || self;
    const rows = [
      ['Role', `${nm(e.title)}, ${nm(e.dept)}`],
      ['Status', stChip(e.status)],
      ['Joined', `${fdate(e.join)} (${tenure(e.join)})`],
      ['Reports to', nm(reportsTo(e))],
      ['Location', nm(e.loc)]
    ];
    let extra = '';
    const lv = S.leaves.filter(l => l.emp === e.id),
      pend = lv.filter(l => l.status === 'Pending').length;
    if (can('leave', 'view') && (self || inScope('leave', e.id)))
      rows.push([
        'Leave',
        `${lv.filter(l => l.status === 'Approved').reduce((a, l) => a + l.days, 0)} days taken in records, ${pend} pending`
      ]);
    if (hrView) {
      const d = vdocsOf(e).filter(x => x.st !== 'Verified');
      rows.push([
        'Documents',
        d.length ? d.map(x => nm(x.n) + ' (' + nm(x.st) + ')').join(', ') : 'All verified'
      ]);
    }
    if (self || (inScope('assets', e.id) && can('assets', 'view'))) {
      const a = assetsOf(e.id).cur;
      rows.push(['Assets', a.length ? a.map(x => nm(aname(x))).join(', ') : 'None issued']);
    }
    if (can('attendance', 'view') && (self || inScope('attendance', e.id))) {
      let late = 0,
        ab = 0;
      for (let k = 0; k < 14; k++) {
        const dt = addDays(TODAY, -k),
          o = dayInfo(e.id, dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (o.late > 0) late++;
        if (o.st === 'A') ab++;
      }
      rows.push([
        'Attendance (14 days)',
        `${late} late mark${late === 1 ? '' : 's'}, ${ab} absence${ab === 1 ? '' : 's'}`
      ]);
    }
    if (can('lifecycle', 'view') && inScope('lifecycle', e.id)) {
      if (S.life.off[e.id] && !S.life.off[e.id].done) {
        const p = progress('off', e, OFF_T);
        extra += P(
          `Offboarding in progress: ${p.n} of ${p.t} clearance tasks done, last day ${fdate(S.life.off[e.id].lwd)}.`
        );
      } else if (e.join >= iso(addDays(TODAY, -60))) {
        const p = progress('onb', e, ONB_T);
        extra += P(`Onboarding: ${p.n} of ${p.t} tasks done.`);
      }
    }
    say({
      tag: 'read',
      html:
        P(`<b>${nm(e.name)}</b>`) +
        KV(rows) +
        extra +
        P(
          '<span class="muted small">Pay, bank and identity details are not included in summaries.</span>'
        ),
      nav: [['Open profile', open(() => empProfile(e.id))]],
      src: [SRC('Employees', 'employees')]
    });
  };

  /* ---------- team: leave, cover, attendance ---------- */
  add(
    lt =>
      /who.*(on leave|out|off|away|absent)|(on leave|out of office)/.test(lt) &&
      !/approve|balance|late/.test(lt),
    (text, lt) => {
      if (R() === 'sysadmin') return deny('System Admin cannot see leave data.');
      let a, b, when;
      if (/next week/.test(lt)) {
        const m = nextWd(1, TODAY, false);
        a = iso(m);
        b = iso(addDays(m, 6));
        when = 'next week';
      } else if (/tomorrow/.test(lt)) {
        a = b = iso(addDays(TODAY, 1));
        when = 'tomorrow';
      } else if (/today|right now/.test(lt)) {
        a = b = iso(TODAY);
        when = 'today';
      } else {
        a = iso(TODAY);
        b = iso(addDays(TODAY, 14));
        when = 'in the next two weeks';
      }
      const inLeaveScope = e =>
        R() === 'employee' ? e.dept === me().dept : inScope('leave', e.id);
      const list = S.leaves
        .filter(l => ['Approved', 'Pending'].includes(l.status) && l.from <= b && l.to >= a)
        .filter(l => {
          const e = emp(l.emp);
          return (
            e &&
            e.status !== 'Exited' &&
            inLeaveScope(e) &&
            (R() !== 'employee' || l.status === 'Approved' || l.emp === me().id)
          );
        });
      say({
        tag: 'read',
        html: list.length
          ? P(`People on leave ${when}:`) +
            L(
              list.map(
                l =>
                  `<b>${nm(emp(l.emp).name)}</b>: ${range(l.from, l.to)} (${POLICY[l.type].n})${l.status === 'Pending' ? ' · <i>pending approval</i>' : ''}`
              )
            )
          : P(
              `Nobody ${R() === 'employee' ? 'in your department ' : 'in your team '}is on leave ${when}.`
            ),
        src: [SRC('Leave', 'leave')]
      });
    }
  );
  const DEPT_KW = [
    ['production', 'Production'],
    ['quality', 'Quality'],
    ['maintenance', 'Maintenance'],
    ['stores|logistics', 'Stores & Logistics'],
    ['\\bhr\\b|admin', 'HR & Admin'],
    ['finance|accounts', 'Finance'],
    ['it department|\\bit team|\\bin it\\b', 'IT'],
    ['sales', 'Sales']
  ];
  add(
    lt =>
      /cover(age)?|enough (people|staff|crew)|short.?staffed|\bshift\b.*(friday|monday|tuesday|wednesday|thursday|saturday|sunday|tomorrow|today)|(friday|monday|tuesday|wednesday|thursday|saturday|sunday|tomorrow).*\bshift\b/.test(
        lt
      ),
    (text, lt) => {
      if (!can('roster', 'view')) return noAccess('Shift coverage');
      const dp = (DEPT_KW.find(([k]) => new RegExp(k).test(lt)) || [0, me().dept])[1];
      const d = parseDates(text) || { from: iso(TODAY) },
        date = new Date(d.from + 'T00:00:00'),
        idx = (date.getDay() + 6) % 7;
      const sh = /morning|\ba shift|shift a\b/.test(lt)
        ? 'A'
        : /afternoon|\bb shift|shift b\b/.test(lt)
          ? 'B'
          : /night|\bc shift|shift c\b/.test(lt)
            ? 'C'
            : /general|\bg shift|shift g\b/.test(lt)
              ? 'G'
              : '';
      const people = scoped('roster').filter(e => e.dept === dp && e.status !== 'Exited');
      if (!people.length) return nothing(`There is nobody from ${nm(dp)} in your roster scope.`);
      const shiftOf = e => (S.roster[e.id] ? S.roster[e.id][idx] : idx >= 5 ? 'O' : 'G');
      const off = e => {
        const l = leaveOn(e.id, date);
        return l && ['Approved', 'Pending'].includes(l.status) ? l : null;
      };
      const shifts = sh ? [sh] : ['A', 'B', 'C', 'G'];
      const rows = shifts
        .map(k => {
          const as = people.filter(e => shiftOf(e) === k),
            ap = as.filter(e => {
              const l = off(e);
              return l && l.status === 'Approved';
            }),
            pe = as.filter(e => {
              const l = off(e);
              return l && l.status === 'Pending';
            });
          return { k, n: as.length, ap, pe, avail: as.length - ap.length };
        })
        .filter(r => r.n);
      if (!rows.length)
        return nothing(
          `${nm(dp)} has nobody rostered on ${sh ? SHIFTS[sh] : 'a working shift'} on ${fday(d.from)}.`
        );
      say({
        tag: 'read',
        html:
          P(`${nm(dp)} on <b>${fday(d.from)}</b>:`) +
          L(
            rows.map(
              r =>
                `<b>${nm(SHIFTS[r.k])}</b>: ${r.n} rostered, <b>${r.avail}</b> available${r.ap.length ? ` (on approved leave: ${nm(r.ap.map(e => e.name).join(', '))})` : ''}${r.pe.length ? `. If pending leave is approved too: <b>${r.avail - r.pe.length}</b> (${nm(r.pe.map(e => e.name).join(', '))})` : ''}`
            )
          ) +
          P(
            '<span class="muted small">PeopleDesk has no minimum crew size configured, so I can’t say whether this is “enough”. Compare it with your plan for that shift.</span>'
          ),
        nav: [['Open roster', goPage('roster')]],
        src: [SRC('Shift roster', 'roster'), SRC('Leave', 'leave')]
      });
    }
  );
  add(
    lt =>
      /(team|company|everyone|staff|today|this week).*(attendance|late|absent|present)|attendance (summary|today|this week)|summar.*attendance|late marks? (this|today)/.test(
        lt
      ) && !/my attendance|why/.test(lt),
    (text, lt) => {
      if (R() === 'employee')
        return noAccess(
          'Team attendance',
          'You can see your own attendance on the Attendance page.'
        );
      if (R() === 'sysadmin') return deny('System Admin cannot see attendance data.');
      if (!can('attendance', 'view')) return noAccess('Attendance');
      const team = scoped('attendance').filter(e => e.id !== me().id),
        td = TD(),
        rows = team.map(e => dayInfo(e.id, ...td));
      const late = rows.filter(o => o.late > 0),
        ab = rows.filter(o => o.st === 'A'),
        lv = rows.filter(o => o.st === 'L'),
        pr = rows.filter(o => ['P', 'D'].includes(o.st));
      const wk = weekAtt(team),
        names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tr = wk
          .map((v, i) => (v == null || (v === 0 && i >= 5) ? '' : `${names[i]} ${v}%`))
          .filter(Boolean)
          .join(', ');
      say({
        tag: 'read',
        html:
          P(
            `${R() === 'manager' ? 'Your team' : 'Everyone in your scope'} today (${team.length} people):`
          ) +
          L([
            `Present: <b>${pr.length}</b>`,
            `On leave: <b>${lv.length}</b>${lv.length ? ' (' + nm(lv.map(o => o.e.name).join(', ')) + ')' : ''}`,
            `Absent, no punch: <b>${ab.length}</b>${ab.length ? ' (' + nm(ab.map(o => o.e.name).join(', ')) + ')' : ''}`,
            `Late today: <b>${late.length}</b>${late.length ? ' (' + nm(late.map(o => `${o.e.name} +${o.late} min`).join(', ')) + ')' : ''}`
          ]) +
          P(`This week so far: ${tr}.`) +
          P(
            '<span class="muted small">Overtime is not connected yet, so it is not included.</span>'
          ),
        src: [SRC('Attendance', 'attendance'), SRC('Dashboard', 'dashboard')],
        nav: [['Open attendance', goPage('attendance')]]
      });
    }
  );
  add(
    lt =>
      /(team|employees?|people).*(incomplete|pending|overdue|behind).*(training|course)|training (compliance|status)|incomplete training|(expir|renew).*(certif|licen|course)|certif.*expir|expir.*30 days/.test(
        lt
      ) && !/^(what|which).*due for me/.test(lt),
    (text, lt) => {
      if (!can('training', 'view')) return noAccess('Training compliance');
      const limit = iso(addDays(TODAY, 30)),
        exp = S.courses.filter(c => c.exp <= limit).sort((a, b) => (a.exp < b.exp ? -1 : 1));
      let h = exp.length
        ? P(`Certificates expiring in the next 30 days:`) +
          L(
            exp.map(
              c =>
                `<b>${nm(c.n)}</b>: expires ${fshort(c.exp)} (${c.done}% of required staff complete)`
            )
          )
        : P('No certificates expire in the next 30 days.');
      if (!/expir|certif/.test(lt) || /incomplete|behind|compliance/.test(lt)) {
        const team = scoped('training').filter(e => e.id !== me().id),
          out = [];
        team.forEach(e =>
          reqCourses(e).forEach(({ c, i }) => {
            const p = trainPct(e, c, i);
            if (p < 60) out.push(`${nm(e.name)}: ${nm(c.n)} (${p}%)`);
          })
        );
        h += out.length
          ? P('People well behind on required courses (under 60%):') + L(out.slice(0, 8))
          : P('Nobody in your scope is far behind on required courses.');
      }
      say({
        tag: 'read',
        html: h,
        nav: [['Open training', goPage('training')]],
        src: [SRC('Training', 'training')]
      });
    }
  );
  add(
    lt =>
      /(pending|incomplete|missing|behind).*(goals?|reviews?)|goals? (pending|status)/.test(lt) &&
      R() !== 'employee',
    () =>
      say({
        tag: 'read',
        html: P(
          "Goal progress is recorded per person on the Performance page. I can't list pending goals across a team yet. Open Performance and select a person to see their goals and add a review."
        ),
        nav: [['Open performance', goPage('performance')]],
        src: [SRC('Performance', 'performance')]
      })
  );

  /* ---------- HR ---------- */
  add(
    lt =>
      /(pending|awaiting|outstanding|missing).*(document|verification)|document verification|unverified|re-?upload/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (!can('employees', 'view')) return noAccess('Document status');
      const rows = [];
      scoped('employees').forEach(e =>
        vdocsOf(e)
          .filter(d => d.st !== 'Verified')
          .forEach(d => rows.push({ e, d }))
      );
      say({
        tag: 'read',
        html: rows.length
          ? P(
              `<b>${rows.length}</b> document${rows.length > 1 ? 's are' : ' is'} not verified yet:`
            ) +
            L(
              rows.slice(0, 10).map(
                ({ e, d }) =>
                  `<b>${nm(e.name)}</b>: ${nm(d.n)} (${nm(d.st)})${d.note ? ' · ' + nm(d.note) : ''} ${btn(
                    'Open',
                    open(() => empProfile(e.id, 'docs')),
                    'btn sm'
                  )}`
              )
            )
          : P('Every document in your scope is verified.'),
        src: [SRC('Employees · documents', 'employees')]
      });
    }
  );
  add(
    lt =>
      /onboard|new joiner|joiners?\b|probation/.test(lt) &&
      /(block|pending|incomplete|missing|status|stuck|what|which|task)/.test(lt) &&
      !/policy|draft|write|checklist.*offboard|offboard/.test(lt),
    (text, lt) => {
      if (!can('lifecycle', 'view')) return noAccess('Onboarding tasks');
      const w = who(text);
      let list = live().filter(
        e => e.join >= iso(addDays(TODAY, -60)) && inScope('lifecycle', e.id)
      );
      if (w && w.e) {
        if (!w.ok || !inScope('lifecycle', w.e.id)) return SCOPE_MSG(w.e);
        list = [w.e];
      } else {
        const cand = S.cands.find(c => lt.includes(c.n.split(' ')[0].toLowerCase()));
        if (cand)
          return say({
            tag: 'read',
            html: P(
              `${nm(cand.n)} is a candidate (${nm(cand.r)}, stage: ${nm(S.stages[cand.st])}), not an employee yet, so there is no onboarding to track. Onboarding tasks start once they join.`
            ),
            src: [SRC('Recruitment', 'recruit')]
          });
      }
      if (!list.length)
        return nothing(
          'Nobody has joined in the last 60 days, so there is no onboarding in progress.'
        );
      say({
        tag: 'read',
        html: list
          .map(e => {
            const open_ = ONB_T.filter(T => !isDone('onb', e, T[0])).map(T => {
                const o = ownerOf(T[2], e),
                  due = dueOf('onb', e, T);
                return `${nm(T[1])} · ${nm(o.name)} · due ${fshort(due)}${due < iso(TODAY) ? ' <b style="color:var(--red-ink)">overdue</b>' : ''}`;
              }),
              bl = [];
            if (!e.mgr) bl.push('No manager assigned');
            const p = progress('onb', e, ONB_T);
            return (
              P(`<b>${nm(e.name)}</b>: ${p.n} of ${p.t} done`) +
              (bl.length ? bl.map(b => flag('bad', b)).join('') : '') +
              (open_.length ? L(open_) : P('All tasks complete.'))
            );
          })
          .join(''),
        nav: [['Open joiners & leavers', goPage('lifecycle')]],
        src: [SRC('Joiners & leavers', 'lifecycle')]
      });
    }
  );
  add(
    lt =>
      /offboard|leaving|resign|exit|last working day/.test(lt) &&
      !/draft|write/.test(lt) &&
      /(checklist|task|list|what|pending|status|create)/.test(lt),
    (text, lt) => {
      if (!can('lifecycle', 'view')) return noAccess('Offboarding tasks');
      const w = who(text),
        offs = Object.keys(S.life.off)
          .map(emp)
          .filter(e => e && !S.life.off[e.id].done && inScope('lifecycle', e.id));
      if (/(create|make|prepare|draft).*checklist|checklist for/.test(lt))
        return offChecklist(text, w);
      say({
        tag: 'read',
        html: offs.length
          ? offs
              .map(e => {
                const p = progress('off', e, OFF_T),
                  left = OFF_T.filter(T => !isDone('off', e, T[0]));
                return (
                  P(
                    `<b>${nm(e.name)}</b>: ${p.n} of ${p.t} cleared, last day ${fdate(S.life.off[e.id].lwd)}`
                  ) + L(left.map(T => `${nm(T[1])} · ${nm(ownerOf(T[2], e).name)}`))
                );
              })
              .join('')
          : P('Nobody is in offboarding right now.'),
        opts: [['Create an offboarding checklist', () => offChecklist('', null)]],
        nav: [['Open joiners & leavers', goPage('lifecycle', () => (S.tab.lc = 'off'))]],
        src: [SRC('Joiners & leavers', 'lifecycle')]
      });
    }
  );
  function offChecklist(text, w) {
    if (w && w.e && !w.ok) return SCOPE_MSG(w.e);
    const d = parseDates(text),
      nextM = new Date(TODAY.getFullYear(), TODAY.getMonth() + 2, 0),
      lwd = d ? d.to : /next month/i.test(text) ? iso(nextM) : iso(addDays(TODAY, 30)),
      who_ = w && w.e ? w.e.name : 'the employee';
    const owner = c =>
      ({
        hr: 'HR',
        it: 'IT',
        fin: 'Finance',
        mgr: 'Manager',
        emp: who_.split(' ')[0] === 'the' ? 'Employee' : who_
      })[c];
    const rows = OFF_T.map(T => ({
      t: T[1],
      o: owner(T[2]),
      due: T[0] === 'appr' ? 'on resignation' : iso(addDays(new Date(lwd + 'T00:00:00'), T[3]))
    }));
    const text_ =
      `Offboarding checklist for ${who_} (last working day ${fdate(lwd)})\n\n` +
      rows
        .map(
          (r, i) =>
            `${i + 1}. ${r.t}\n   Owner: ${r.o} · Due: ${r.due === 'on resignation' ? r.due : fshort(r.due)}`
        )
        .join('\n');
    say({
      tag: 'draft',
      html: P(
        'Here is a checklist built from the standard offboarding tasks, with owners and due dates relative to the last day. It is a draft: nothing has been created in PeopleDesk.'
      ),
      draft: {
        text: text_,
        use: can('lifecycle', 'create')
          ? [
              [
                'Start offboarding in PeopleDesk',
                () =>
                  open(() => {
                    go('lifecycle');
                    S.tab.lc = 'off';
                    render();
                    startOff();
                  })()
              ]
            ]
          : []
      },
      src: [SRC('Joiners & leavers', 'lifecycle')]
    });
  }
  add(
    lt =>
      /recruit|pipeline|candidate|hiring|open position|vacanc/.test(lt) &&
      !/draft|write|interview feedback/.test(lt) &&
      R() !== 'employee',
    () => {
      if (!can('recruit', 'view')) return noAccess('Recruitment');
      const by = S.stages.map((s, i) => [s, S.cands.filter(c => c.st === i)]),
        roles = [...new Set(S.cands.map(c => c.r))];
      const big = by.slice(0, 4).sort((a, b) => b[1].length - a[1].length)[0];
      say({
        tag: 'read',
        html:
          P(
            `<b>${S.cands.length}</b> candidates across ${roles.length} roles (${OPENINGS.reduce((a, o) => a + o.n, 0)} open positions):`
          ) +
          L(
            by.map(
              ([s, l]) =>
                `${nm(s)}: <b>${l.length}</b>${l.length ? ' (' + nm(l.map(c => c.n).join(', ')) + ')' : ''}`
            )
          ) +
          P(
            `Most candidates are waiting at <b>${nm(big[0])}</b> (${big[1].length}). ${S.cands.filter(c => c.st === 0).length > 2 ? 'Screening is the likely bottleneck.' : ''}`
          ) +
          L(roles.map(r => `${nm(r)}: ${S.cands.filter(c => c.r === r).length} candidates`)),
        nav: [['Open recruitment', goPage('recruit')]],
        src: [SRC('Recruitment', 'recruit')]
      });
    }
  );
  add(
    lt =>
      /(summar|tell me|show).*(employee|profile|record|about)|summar(y|i[sz]e) [a-z]+('s)? (profile|record)/.test(
        lt
      ) && !!who(lt),
    (text, lt) => {
      const w = who(text);
      if (w.amb)
        return say({
          tag: 'read',
          html: P('Which person?'),
          opts: w.amb.map(e => [nm(e.name), () => showEmp(e)])
        });
      showEmp(w.e);
    }
  );

  /* ---------- payroll (HR prepares, Admin approves) ---------- */
  const stepName = [
    'Not started',
    'Attendance locked, being prepared',
    'Submitted, waiting for approval',
    'Approved and locked, ready for payment',
    'Paid'
  ];
  const payOK = () =>
    R() === 'sysadmin'
      ? 'System Admin cannot access payroll data.'
      : !can('payroll', 'edit') && !can('payroll', 'approve')
        ? 'The payroll run is not available to your role.'
        : '';
  add(
    lt =>
      (/(what('?s| is)|which).*(block|stuck|holding|wrong|issue|exception)|payroll (status|exception|issue|check|block)|(block|exception).*payroll|payroll exceptions?/.test(
        lt
      ) &&
        !/approve|release|variance/.test(lt)) ||
      /what is blocking/.test(lt),
    (text, lt) => {
      const g = payOK();
      if (g) return deny(g);
      const c = payCheck();
      say({
        tag: 'read',
        html:
          P(`${CYC.n} payroll status: <b>${stepName[S.payStep] || ''}</b>.`) +
          (c.err.length
            ? P(
                `<b>${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''}</b> must be fixed before it can be approved:`
              ) +
              c.err
                .map(
                  x =>
                    `<div class="ai-flag bad">${ic('alert', 14)}<span><b>${nm(x.title)}</b>. ${nm(x.detail)} ${btn(nm(x.link[0]), runStr(x.link[1]), 'btn sm')}</span></div>`
                )
                .join('')
            : P('There are no blocking issues.')) +
          (c.warn.length
            ? P(
                `<b>${c.warn.length} warning${c.warn.length > 1 ? 's' : ''}</b> to review (not blocking, but must be acknowledged):`
              ) +
              L(
                c.warn.map(
                  x =>
                    `${nm(x.title)}. ${nm(x.detail)} ${btn(nm(x.link[0]), runStr(x.link[1]), 'btn sm')}`
                )
              )
            : ''),
        nav: [['Open payroll', goPage('payroll')]],
        src: [SRC('Payroll checks', 'payroll')]
      });
    }
  );
  add(
    lt =>
      /variance|compare.*(last|previous) (month|cycle)|(last|previous) month.*(compar|differ)|payroll (change|differ)|vs last month/.test(
        lt
      ),
    () => {
      const g = payOK();
      if (g) return deny(g);
      if (!canField('salary'))
        return deny('You do not have access to salary figures, so I cannot compare payroll.');
      const cur = payTot(live()),
        prev = payTot(live(), true),
        th = W().varPct;
      const mv = live()
        .map(e => ({ e, p: prevSlip(e), c: slip(e.ctc) }))
        .filter(x => x.p)
        .map(x => ({ ...x, v: pctD(x.c.net, x.p.net) }))
        .sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
      const nj = live().filter(e => e.join >= CYC.a),
        ex = (S.life.exits || []).filter(x => x.lwd >= CYC.a && x.lwd <= CYC.b);
      say({
        tag: 'read',
        html:
          P(`${CYC.n} vs last month (people paid in both):`) +
          KV([
            [
              'Total net pay',
              `${inr(cur.n)} vs ${inr(prev.n)} (<b>${fpct(pctD(cur.n, prev.n))}</b>)`
            ],
            ['Gross', `${inr(cur.g)} vs ${inr(prev.g)}`],
            ['Deductions', `${inr(cur.d)} vs ${inr(prev.d)}`],
            ['Headcount paid', `${cur.c} vs ${prev.c}`]
          ]) +
          (mv.filter(x => Math.abs(x.v) >= 0.1).length
            ? P(`Biggest movers (alert threshold ${th}%):`) +
              L(
                mv
                  .filter(x => Math.abs(x.v) >= 0.1)
                  .slice(0, 4)
                  .map(
                    x =>
                      `<b>${nm(x.e.name)}</b>: ${fpct(x.v)} (${inr(x.p.net)} → ${inr(x.c.net)})${Math.abs(x.v) >= th ? ' · above threshold' : ''}`
                  )
              )
            : P('No individual net pay moved noticeably.')) +
          (nj.length ? P(`New joiners this cycle: ${nm(nj.map(e => e.name).join(', '))}.`) : '') +
          (ex.length ? P(`Exits this cycle: ${ex.length}.`) : ''),
        nav: [['Open payroll', goPage('payroll')]],
        src: [SRC('Payroll', 'payroll')]
      });
    }
  );
  add(
    lt =>
      /(approve|approval of).*payroll|payroll.*(approve|sign off)/.test(lt) &&
      !/how|draft|can i/.test(lt),
    () => proposePayApprove(),
    () => payOK()
  );
  add(
    lt =>
      /(release|pay out|process|send|disburse).*(salary|salaries|payments?|payroll)|(salary|payment)s? release/.test(
        lt
      ),
    () => proposeRelease(),
    () => payOK()
  );
  function proposePayApprove() {
    if (!can('payroll', 'approve'))
      return deny(
        'Only someone with payroll approval permission can approve payroll. Your role can prepare it but not approve it.'
      );
    if (S.payStep !== 2 || !S.pay.prep)
      return say({
        tag: 'denied',
        html: P(
          `Payroll can only be approved once it has been submitted. Current status: <b>${stepName[S.payStep]}</b>.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    if (S.pay.prep.id === me().id)
      return deny(
        `You prepared this payroll, so a different person must approve it (maker-checker rule). Prepared by ${nm(S.pay.prep.by)}.`
      );
    const c = payCheck(),
      t = payTot(live());
    if (c.err.length)
      return say({
        tag: 'denied',
        html:
          P(
            `${c.err.length} blocking issue${c.err.length > 1 ? 's' : ''} appeared after submission, so I cannot approve:`
          ) + L(c.err.map(x => nm(x.title))),
        nav: [['Open payroll', goPage('payroll')]]
      });
    propose({
      title: `Approve ${CYC.n} payroll?`,
      risk: 'high',
      confirm: 'Review approval',
      confirm2: 'Approve and lock payroll',
      rows: [
        ['Payslips', String(t.c)],
        ['Total net payout', `<b>${inr(t.n)}</b>`],
        ['Prepared by', nm(S.pay.prep.by)],
        ['Warnings', c.warn.length ? `${c.warn.length} acknowledged` : 'none']
      ],
      impact: `Approving locks all ${t.c} payslips for ${CYC.n}. After this, changes need payroll to be reopened. This is recorded in the payroll log and the audit log under your name.`,
      ack: `I have reviewed the figures and approve ${CYC.n} payroll for ${inr(t.n)}.`,
      check: () => {
        if (!can('payroll', 'approve'))
          return { ok: false, why: 'You no longer have approval permission.' };
        if (S.payStep !== 2)
          return { ok: false, why: 'Payroll is no longer waiting for approval.' };
        if (S.pay.prep && S.pay.prep.id === me().id)
          return { ok: false, why: 'You prepared this payroll.' };
        return payCheck().err.length
          ? { ok: false, why: 'New blocking issues appeared.' }
          : { ok: true };
      },
      run: () => {
        payApproveGo();
        auditAI('Payroll approved', CYC.n + ' payroll', { res: 'payroll', to: inr(t.n) });
        return {
          ok: true,
          msg: `${CYC.n} payroll approved and locked.`,
          after: [['Open payroll', open(() => go('payroll'))]]
        };
      }
    });
  }
  function proposeRelease() {
    if (!can('payroll', 'edit') && !can('payroll', 'approve'))
      return deny('You do not have permission to release salary payments.');
    if (S.payStep !== 3 || !S.pay.locked)
      return say({
        tag: 'denied',
        html: P(
          `Salary can only be released after payroll is approved and locked. Current status: <b>${stepName[S.payStep]}</b>.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    if (S.pay.bank)
      return say({
        tag: 'denied',
        html: P(
          `A bank file (${nm(S.pay.bank.ref)}) was already generated. Status: ${nm(S.pay.bank.state)}.`
        ),
        nav: [['Open payroll', goPage('payroll')]]
      });
    const t = payTot(live());
    propose({
      title: 'Release salary payments?',
      risk: 'high',
      confirm: 'Review release',
      confirm2: 'Generate bank file and release',
      rows: [
        ['Cycle', CYC.n],
        ['Payments', String(t.c)],
        ['Total', `<b>${inr(t.n)}</b>`]
      ],
      impact: `This generates the bank payment file for ${t.c} employees totalling ${inr(t.n)}. Money moves only when the bank confirms. In this demo the bank response is simulated. It is logged under your name.`,
      ack: `I confirm releasing ${inr(t.n)} to ${t.c} employees for ${CYC.n}.`,
      check: () =>
        S.payStep === 3 && !S.pay.bank && (can('payroll', 'edit') || can('payroll', 'approve'))
          ? { ok: true }
          : { ok: false, why: 'Payroll is no longer ready for release.' },
      run: () => {
        payBankFile();
        auditAI('Salary release started', CYC.n + ' payroll', { res: 'payroll', to: inr(t.n) });
        return {
          ok: true,
          msg: 'Bank file generated. Payment is not confirmed until the bank responds.',
          after: [['Open payroll', open(() => go('payroll'))]]
        };
      }
    });
  }

  /* ---------- admin: company summary, reports, configuration ---------- */
  add(
    lt =>
      /(summar|overview|status).*(company|workforce|business|organi[sz]ation)|company (attendance|summary|overview)|workforce (status|summary)/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (R() === 'sysadmin') return deny('System Admin does not have access to workforce data.');
      const sc = scoped('employees'),
        p = presentToday(sc),
        inc = S.incidents.filter(i => i.st !== 'Closed').length,
        exp = S.courses.filter(c => c.exp <= iso(addDays(TODAY, 30))).length;
      const rows = [
        ['Headcount', String(sc.length)],
        ['Present today', `${p.pr} of ${sc.length} (${p.pct}%)`],
        ['On leave', String(p.on)],
        ['Open positions', String(OPENINGS.reduce((a, o) => a + o.n, 0))]
      ];
      if (can('approvals', 'view'))
        rows.push([
          'Approvals waiting',
          `${queue('mine').length} (${queue('overdue').length} overdue)`
        ]);
      if (can('payroll', 'edit') || can('payroll', 'approve'))
        rows.push(['Payroll', stepName[S.payStep]]);
      if (can('safety', 'view')) rows.push(['Open safety incidents', String(inc)]);
      if (can('training', 'view')) rows.push(['Certificates expiring (30 days)', String(exp)]);
      say({
        tag: 'read',
        html: P('Workforce status for your scope:') + KV(rows),
        nav: [['Open dashboard', goPage('dashboard')]],
        src: [SRC('Dashboard', 'dashboard')]
      });
    }
  );
  add(
    lt =>
      /(trend|attrition|headcount|turnover).*(explain|trend|report)|explain.*(trend|report|attrition)|reports? (summary|overview)/.test(
        lt
      ) && R() !== 'employee',
    () => {
      if (!can('reports', 'view')) return noAccess('Reports');
      const sc = scoped('employees'),
        hs = headcountSeries(sc),
        at = attSeries(sc),
        ex = (S.life.exits || []).filter(x => x.lwd >= iso(addDays(TODAY, -365))).length,
        hc = Math.max(live().length, 1);
      const avg = at.length ? Math.round(at.reduce((a, x) => a + x.pct, 0) / at.length) : null;
      say({
        tag: 'read',
        html:
          P('What the numbers say for your scope:') +
          L(
            [
              `<b>Headcount</b>: ${hs[hs.length - 1]} now, ${hs[0]} twelve months ago (${hs[hs.length - 1] - hs[0] >= 0 ? '+' : ''}${hs[hs.length - 1] - hs[0]}).`,
              `<b>Attrition</b>: ${ex} exit${ex === 1 ? '' : 's'} in 12 months, ${((ex / hc) * 100).toFixed(1)}% of current headcount.`,
              avg != null
                ? `<b>Attendance</b>: ${avg}% average over the last ${at.length} working days.`
                : '',
              `<b>Leave</b>: ${S.leaves.filter(l => l.status === 'Pending').length} requests pending, ${S.leaves.filter(l => l.status === 'Approved').length} approved on record.`,
              `<b>Recruitment</b>: ${S.cands.length} candidates for ${OPENINGS.reduce((a, o) => a + o.n, 0)} open positions.`,
              '<b>Overtime and cost per hire</b>: not connected yet (shown as Sample on Reports).'
            ].filter(Boolean)
          ),
        nav: [['Open reports', goPage('reports')]],
        src: [SRC('Reports', 'reports')]
      });
    }
  );
  add(
    lt =>
      /how (do|can|should) i.*(change|set|configure|update|add|edit).*(leave|polic|calendar|holiday|approval rule|notification|work week|statutory)|configure (policy|policies|approval|notification)/.test(
        lt
      ) && R() !== 'sysadmin',
    () => {
      if (!okPage('settings')) return noAccess('Settings');
      say({
        tag: 'read',
        html:
          P('Policies live in <b>Settings</b>:') +
          `<ol class="ai-ul"><li>Open <b>Settings → Work policies</b> for leave rules, notice, grace time, working week and probation. <b>Statutory</b> covers PF, ESI, professional tax and TDS.</li><li>Change the value and choose the <b>effective date</b>. Past payslips keep the old rule.</li><li>Add a reason. Every change is versioned and written to the audit log.</li></ol>` +
          P(
            'Leave types and approval routing follow these policies plus each person’s reporting line (Organization). I can explain a setting, but I do not change policies myself.'
          ),
        nav: [
          [
            'Open Settings',
            goPage('settings', () => (S.tab.st = can('policy', 'view') ? 'policy' : S.tab.st))
          ]
        ],
        src: [SRC('Settings', 'settings')]
      });
    }
  );

  /* ---------- system admin ---------- */
  const sysOnly = () => R() === 'sysadmin';
  add(
    lt =>
      /integration|sso|single sign|bank (connection|api)|notification.*(deliver|fail)|email.*(deliver|fail)/.test(
        lt
      ) &&
      /(fail|status|broken|down|working|diagnos|which)/.test(lt) &&
      R() !== 'employee',
    () => {
      say({
        tag: 'read',
        html:
          P('<b>0 of 4</b> integrations are connected, so none are failing.') +
          L([
            'Bank payments: not connected',
            'Identity provider (SSO): not connected',
            'Attendance devices: not connected',
            'Email and SMS delivery: not connected'
          ]) +
          P(
            'These are placeholders in this demo build: there is no live delivery or sync status to read. In production, failures would show here with the last error.'
          ),
        nav: okPage('settings')
          ? [['Open integrations', goPage('settings', () => (S.tab.st = 'integrations'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Integrations', 'settings', () => (S.tab.st = 'integrations'))]
          : []
      });
    }
  );
  add(
    lt =>
      /\bsso\b|single sign.?on|saml|openid|identity provider/.test(lt) &&
      /(how|configure|set up|setup|enable)/.test(lt),
    () =>
      say({
        tag: 'read',
        html:
          P('To set up single sign-on (checklist):') +
          `<ol class="ai-ul"><li>Choose the protocol your identity provider supports (SAML 2.0 or OpenID Connect).</li><li>In the provider, register PeopleDesk as an application and note the entity ID, sign-in URL and signing certificate (or client ID and secret).</li><li>In PeopleDesk, open <b>Settings → Integrations → Identity provider</b> and enter those values.</li><li>Map the provider’s email attribute to the PeopleDesk work email and test with one System Admin account before enforcing it.</li><li>Keep password sign-in available for System Admins until SSO is proven.</li></ol>` +
          P(
            '<span class="muted small">In this demo build SSO is a placeholder: the Connect button is disabled and nothing is sent to a provider.</span>'
          ),
        nav: okPage('settings')
          ? [['Open integrations', goPage('settings', () => (S.tab.st = 'integrations'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Integrations', 'settings', () => (S.tab.st = 'integrations'))]
          : []
      })
  );
  add(
    lt =>
      /(recent|latest|show).*(permission|role|access|security|system|config).*(change|update|edit)|permission changes|who changed/.test(
        lt
      ),
    () => {
      if (!can('audit', 'view') && !sysOnly()) return noAccess('The audit log');
      const rows = S.audit
        .filter(a =>
          sysOnly()
            ? a.cat === 'system'
            : /^(Permission|Role|Scope|Sensitive|User|Security|Integration|Access)/.test(a.act)
        )
        .slice(0, 6);
      say({
        tag: 'read',
        html: rows.length
          ? P('Most recent system changes:') +
            L(
              rows.map(
                a =>
                  `<b>${nm(a.act)}</b>: ${nm(a.rec)} · ${nm(a.by)} · ${ftime(a.at)}${a.to ? ' · now ' + nm(a.to) : ''} <span class="muted small">(${nm(a.id)})</span>`
              )
            )
          : P('No permission or security changes have been recorded in this session yet.'),
        nav: [['Open audit log', goPage('audit')]],
        src: [SRC('Audit log', 'audit')]
      });
    }
  );
  add(
    lt => /(explain|what (does|is)|meaning).*(audit|log entry)|audit (log )?entry|aud-\d+/.test(lt),
    (text, lt) => {
      if (!can('audit', 'view')) return noAccess('The audit log');
      const id = (text.match(/AUD-\d+/i) || [])[0],
        pool = sysOnly() ? S.audit.filter(a => a.cat === 'system') : S.audit,
        a = id ? pool.find(x => x.id.toLowerCase() === id.toLowerCase()) : pool[0];
      if (!a)
        return nothing(
          id
            ? `I can't find ${nm(id)} in the audit log you can see.`
            : 'The audit log has no entries yet.'
        );
      say({
        tag: 'read',
        html:
          P(`<b>${nm(a.id)}</b> (${id ? '' : 'the latest entry, '}${ftime(a.at)}):`) +
          KV([
            ['What happened', nm(a.act)],
            ['Record', nm(a.rec || '–')],
            ['Done by', `${nm(a.by)} <span class="muted small">acting as ${nm(a.as)}</span>`],
            ['Change', a.from || a.to ? `${nm(a.from || '–')} → ${nm(a.to || '–')}` : '–'],
            ['Reason', nm(a.reason || 'none given')]
          ]) +
          P(
            `In plain words: ${nm(a.by)} ${/denied/i.test(a.act) ? 'tried something their role is not allowed to do, and it was blocked' : 'made this change'}${a.rec ? ' on ' + nm(a.rec) : ''}.`
          ),
        nav: [['Open audit log', goPage('audit')]],
        src: [SRC('Audit log', 'audit')]
      });
    }
  );
  add(
    lt =>
      /(explain|what).*(role|permission|scope|access)|who can|can (a |an )?(employee|manager|hr|admin|system admin) (see|do|approve|view|edit)/.test(
        lt
      ) && !/audit/.test(lt),
    (text, lt) => {
      const hit = ROLE_DEF.find(r => lt.includes(r.n.toLowerCase())),
        res = Object.keys(RES).find(k =>
          new RegExp(RES[k][0].toLowerCase().split(' ')[0]).test(lt)
        );
      if (hit && res && S.perms.m[res]) {
        const x = S.perms.m[res][hit.k];
        return say({
          tag: 'read',
          html:
            P(`<b>${hit.n}</b> in <b>${RES[res][0]}</b>:`) +
            L([
              `Can: ${
                ACTS.filter(a => x[a])
                  .map(a => ACT_N[a])
                  .join(', ') || 'nothing'
              }`,
              `Scope: ${(SCOPES.find(s => s[0] === x.scope) || ['', x.scope])[1]}`
            ]),
          src: okPage('settings')
            ? [SRC('Settings · Roles and access', 'settings', () => (S.tab.st = 'roles'))]
            : []
        });
      }
      say({
        tag: 'read',
        html:
          P('The five roles in PeopleDesk:') +
          L(ROLE_DEF.map(r => `<b>${r.n}</b>: ${nm(r.d)}`)) +
          P(
            `Access is set per area (view, create, edit, approve, export) and per <b>scope</b>: ${SCOPES.map(s => s[1].toLowerCase()).join(', ')}. Salary, bank, identity and medical details are separate permissions.`
          ),
        src: okPage('settings')
          ? [SRC('Settings · Roles and access', 'settings', () => (S.tab.st = 'roles'))]
          : []
      });
    }
  );
  add(
    lt =>
      (/(active )?sessions?|logged in|signed in|two.?step|mfa|2fa|password (policy|length)|session timeout|inactivity/.test(
        lt
      ) &&
        R() !== 'employee') ||
      /security settings|failed login/.test(lt),
    () => {
      say({
        tag: 'read',
        html:
          P('Security settings right now:') +
          KV([
            ['Minimum password length', `${S.sec.minLen} characters`],
            ['Sign out after inactivity', `${S.sec.timeout} minutes`],
            [
              'Two-step verification',
              ROLE_DEF.map(r => `${r.n}: ${S.sec.twoFA[r.k] ? 'on' : 'off'}`).join(', ')
            ]
          ]) +
          P(
            'Active sessions I can see: <b>this browser</b> (you, current) and one sample Android entry. This demo has no real session tracking or failed-login log.'
          ),
        nav: okPage('settings')
          ? [['Open security', goPage('settings', () => (S.tab.st = 'security'))]]
          : [],
        src: okPage('settings')
          ? [SRC('Settings · Security', 'settings', () => (S.tab.st = 'security'))]
          : []
      });
    }
  );
  add(
    lt =>
      /(integration|checklist|technical|runbook).*(doc|checklist|draft|write)/.test(lt) &&
      sysOnly(),
    () => K.fallback('')
  );
  addFirst(
    lt =>
      sysOnly() &&
      /(salary|payslip|pay slip|bank (account|detail)|payroll|\bctc\b|leave (balance|request)|attendance|expense|claim|candidate|recruit|approve|reject|\blate\b|employee profile|employee record|onboard|offboard|performance|training|holiday|announce|who is on leave|team)/.test(
        lt
      ) &&
      !/(audit|permission|role|\bsso\b|session|integration|security|mfa|two.?step|password|timeout|access|login|log in|configure|account|draft.*(doc|checklist))/.test(
        lt
      ),
    () =>
      deny(
        'As System Admin you cannot use me for employee, payroll, leave, attendance or recruitment data, and you cannot approve HR workflows.',
        'I can help with roles and permissions, security settings, sessions, integrations and the audit log.'
      )
  );

  /* ---------- drafts ---------- */
  const first = e => (e ? e.name.split(' ')[0] : 'there');
  function draftReject(k, r) {
    const e = emp(r.emp),
      fl = flagsFor(k, r),
      why = [];
    if (k === 'leave') {
      const ov = teamOverlap(r.emp, r.from, r.to, r.id);
      if (ov.length)
        why.push(
          `${ov.map(l => emp(l.emp).name).join(' and ')} ${ov.length > 1 ? 'are' : 'is'} already off on those dates and we need enough cover`
        );
      if (balances(r.emp)[r.type].left < r.days)
        why.push(`your ${POLICY[r.type].n.toLowerCase()} balance is not enough`);
    }
    if (k === 'claim') why.push('the details or receipts are not enough for me to approve it yet');
    return `Hi ${first(e)}, thank you for sending this. I can't approve it this time because ${why.length ? why.join(', and ') : '[add your reason]'}. ${k === 'leave' ? 'Could you suggest another date or two? I am happy to look again.' : 'Please add what is missing and send it again.'} Thanks for understanding.`;
  }
  function draftFor(type, text, o) {
    const lt = (text || '').toLowerCase(),
      w = who(text || ''),
      e = w && w.e ? w.e : null,
      tn = e ? first(e) : '[name]';
    const ctx_ =
      o || (A.rec && A.rec.t === 'req' ? { k: A.rec.k, r: findReq(A.rec.k, A.rec.id) } : null);
    let title,
      body,
      use = [],
      tag = 'draft';
    if (type === 'reject') {
      if (ctx_ && ctx_.r && !inScope(KIND[ctx_.k].res, ctx_.r.emp))
        return deny('That request is outside your access.');
      title = 'Rejection comment';
      body =
        ctx_ && ctx_.r
          ? draftReject(ctx_.k, ctx_.r)
          : `Hi ${tn}, thank you for your request. I can't approve it this time because [reason]. Could you suggest another option? Thanks for understanding.`;
      if (ctx_ && ctx_.r)
        use = [['Use in a rejection', t => proposeDecisionWith(ctx_.k, ctx_.r, t)]];
    } else if (type === 'approve') {
      title = 'Approval comment';
      body = `Approved, ${ctx_ && ctx_.r ? first(emp(ctx_.r.emp)) : tn}. Thanks for planning ahead. Please hand over anything urgent before you go, and keep your phone on for emergencies.`;
    } else if (type === 'leave') {
      const t = typeOf(lt) || (A.flow && A.flow.s && A.flow.s.type) || 'CL',
        d =
          parseDates(text) ||
          (A.flow && A.flow.s && A.flow.s.from ? { from: A.flow.s.from, to: A.flow.s.to } : null),
        o2 = reasonOptions(t, d ? { from: d.from, to: d.to } : null);
      title = 'Leave reason';
      body = o2[0] + '\n\nAlternative:\n' + o2[1];
      use = [
        [
          'Apply for leave with this',
          tx => {
            A.flow = { k: 'leave', s: { type: t, reason: tx.split('\n')[0] }, await: '' };
            if (d) {
              A.flow.s.from = d.from;
              A.flow.s.to = d.to;
            }
            leaveFlow('');
          }
        ]
      ];
    } else if (type === 'announce') {
      const d = lt.match(/announcement (?:about|on|for|regarding)\s+(.+)$/i),
        topic = d ? d[1].trim() : /diwali|shutdown/.test(lt) ? 'Diwali shutdown' : '';
      if (/diwali|shutdown/.test(lt) || !topic) {
        title = 'Diwali shutdown schedule';
        body = `Dear all,\n\nPlease note the Diwali shutdown schedule:\n• Plant lines stop on 7 Nov at 14:00 and resume on 11 Nov.\n• The office is closed from 8 to 10 Nov.\n\nPlease finish pending approvals, handovers and safety checks before you leave. Contact your manager for anything urgent.\n\nWishing you and your family a safe and happy Diwali.\n\nHR & Admin`;
      } else {
        title = topic.charAt(0).toUpperCase() + topic.slice(1);
        body = `Dear all,\n\n[Say what is happening, when, and who is affected.]\n\nWhat you need to do:\n• [Action 1]\n• [Action 2]\n\nFor questions, contact HR.\n\nThank you,\nHR & Admin`;
      }
      if (annAllowed()) use = [['Review and send to everyone', tx => proposeAnnounce(title, tx)]];
    } else if (type === 'review') {
      title = 'Performance feedback';
      body = `${e ? e.name : '[Name]'}: summary for this cycle\n\nStrengths: [two or three specific examples with results]\nAreas to grow: [one or two, with the impact they had]\nNext steps: [goals, support or training agreed]\n\nOverall: [one line that is honest and encouraging]`;
    } else if (type === 'checkin') {
      title = 'Goal check-in note';
      body = `Check-in with ${e ? e.name : '[Name]'} on ${fdate(iso(TODAY))}\n\nProgress: [what moved since the last check-in]\nBlockers: [what is in the way]\nAgreed next steps: [action, owner, date]`;
    } else if (type === 'helpdesk') {
      title = 'Helpdesk message';
      body = `Hello,\n\nI would like to request ${/salary certificate/.test(lt) ? 'a salary certificate' : /experience/.test(lt) ? 'an experience letter' : /laptop|it/.test(lt) ? 'IT support for my laptop' : '[what you need]'}. ${/laptop|it/.test(lt) ? 'The issue started on [date] and happens when [what you were doing].' : 'I need it by [date] for [purpose].'}\n\nPlease let me know if you need anything more from me.\n\nThank you,\n${me().name}`;
      use = [
        [
          'Open the request form',
          () =>
            open(() => {
              go('requests');
              addTicket();
            })()
        ]
      ];
    } else if (type === 'docnote') {
      title = 'Document upload note';
      body = `Hi HR, I have uploaded the new ${'[document name]'} you asked for. The previous file was [reason, for example blurred or expired]. Please let me know if anything else is needed.`;
    } else if (type === 'interview') {
      title = 'Interview feedback';
      body = `Candidate: [name] · Role: [role] · Stage: [stage]\n\nTechnical/skills: [rating and one example]\nCommunication: [rating and one example]\nCulture and safety mindset: [observation]\nRecommendation: [Proceed / Hold / Reject] because [reason]`;
    } else {
      title = 'Message';
      body = `Hi ${tn},\n\n[Context in one line.]\n\n[What you need or what is changing, and by when.]\n\nPlease reply if anything is unclear.\n\nThanks,\n${me().name}`;
    }
    say({
      tag: tag,
      html: P(
        `<b>${nm(title)}</b>. This is a draft for you to edit. I have not sent or saved anything.`
      ),
      draft: { text: body, use },
      src: []
    });
  }
  const proposeDecisionWith = (k, r, t) => {
    const a = canAct(k, r);
    if (!a.ok) return deny(nm(a.why));
    proposeDecision(k, r, 'Rejected');
    const p = Object.values(A.props).pop();
    if (p && p.vals) p.vals.note = t;
    K.paint();
  };
  const annAllowed = () => ['hr', 'admin'].includes(R()) && can('employees', 'edit');
  function proposeAnnounce(title, text) {
    if (!annAllowed()) return deny('Only HR and Admin can send company announcements.');
    const body = text.replace(/^[\s\S]*?\n\n/, '').trim() || text,
      n = live().length;
    let sent = null;
    propose({
      title: 'Send this announcement to all employees?',
      risk: 'high',
      confirm: 'Review and send',
      confirm2: `Send to ${n} employees`,
      rows: [
        ['Title', nm(title)],
        ['Recipients', `All employees (${n})`],
        ['Message', nm(body.split('\n').filter(Boolean).slice(0, 3).join(' ')).slice(0, 220) + '…']
      ],
      impact: `Everyone sees this on their home screen and in notifications straight away. You can recall it afterwards, but people may already have read it.`,
      ack: `I have read the preview and want to send it to all ${n} employees.`,
      check: () =>
        annAllowed()
          ? { ok: true }
          : { ok: false, why: 'You no longer have permission to send announcements.' },
      run: () => {
        sent = [title, body.replace(/\n+/g, ' ').slice(0, 160), 'Just now'];
        ANN.unshift(sent);
        S.notifs.unshift({ t: title, s: 'Announcement from ' + me().name, time: 'Just now', u: 1 });
        audit('Announcement sent', title, { res: 'settings', to: `${n} recipients` });
        auditAI('Announcement sent', title, { res: 'settings', to: `${n} recipients` });
        persist();
        render();
        return { ok: true, msg: `Sent to ${n} employees.` };
      },
      undoOK: () => sent && ANN.includes(sent),
      undo: () => {
        const i = ANN.indexOf(sent);
        if (i >= 0) ANN.splice(i, 1);
        S.notifs = S.notifs.filter(x => x.t !== title);
        audit('Announcement recalled', title, { res: 'settings' });
        render();
        return { ok: true, msg: 'Announcement recalled. It is no longer shown on home screens.' };
      }
    });
  }
  addFirst(
    lt => /\b(send|publish|post)\b.*\bannouncement\b/.test(lt) && !/draft|write/.test(lt),
    (text, lt) => {
      if (!annAllowed()) return deny('Only HR and Admin can send company announcements.');
      say({
        tag: 'read',
        html: P('Let me draft it first so you can review the wording and recipients.')
      });
      draftFor('announce', text);
    }
  );
  add(
    lt =>
      /\b(draft|write|compose|word|rephrase|suggest)\b/.test(lt) || /^draft a message$/.test(lt),
    (text, lt) => {
      const type =
        A.flow &&
        A.flow.k === 'leave' &&
        /reason|draft|suggest/.test(lt) &&
        !/reject|announce/.test(lt)
          ? 'leave'
          : /reject|declin/.test(lt)
            ? 'reject'
            : /approv/.test(lt)
              ? 'approve'
              : /leave/.test(lt)
                ? 'leave'
                : /announce|notice|shutdown|diwali|circular/.test(lt)
                  ? 'announce'
                  : /interview/.test(lt)
                    ? 'interview'
                    : /feedback|review|appraisal/.test(lt)
                      ? 'review'
                      : /check.?in|goal/.test(lt)
                        ? 'checkin'
                        : /helpdesk|ticket|it support|certificate|letter/.test(lt)
                          ? 'helpdesk'
                          : /upload|document/.test(lt)
                            ? 'docnote'
                            : /message|email|communicat|team|policy/.test(lt)
                              ? 'message'
                              : '';
      if (!type) {
        const opts = {
          employee: [
            ['Leave reason', 'leave'],
            ['Helpdesk message', 'helpdesk'],
            ['Document upload note', 'docnote']
          ],
          manager: [
            ['Rejection comment', 'reject'],
            ['Approval comment', 'approve'],
            ['Review feedback', 'review'],
            ['Goal check-in note', 'checkin'],
            ['Team message', 'message']
          ],
          hr: [
            ['Employee message', 'message'],
            ['Announcement', 'announce'],
            ['Interview feedback', 'interview'],
            ['Rejection comment', 'reject']
          ],
          admin: [
            ['Announcement', 'announce'],
            ['Employee message', 'message'],
            ['Rejection comment', 'reject']
          ],
          sysadmin: [['Technical note', 'message']]
        }[R()];
        return say({
          tag: 'read',
          html: P('What should I draft?'),
          opts: opts.map(([l, t]) => [l, () => draftFor(t, text)])
        });
      }
      if (type === 'announce' && !['hr', 'admin'].includes(R())) {
        /* employees and managers can still get wording, just no send button */
      }
      draftFor(type, text);
    }
  );

  /* ---------- navigation ---------- */
  const NAVW = [
    [
      /approval/,
      'approvals',
      () => (S.tab.ap = /overdue/.test(window.__pdaiQ || '') ? 'overdue' : 'mine')
    ],
    [
      /payslip/,
      'payroll',
      () => {
        if (S.role !== 'employee') S.tab.pr = 'me';
      }
    ],
    [/payroll|exception/, 'payroll'],
    [/roster|shift/, 'roster'],
    [/leave/, 'leave'],
    [/attendance|punch/, 'attendance'],
    [/employee|people|team/, 'employees'],
    [/report/, 'reports'],
    [/setting|polic/, 'settings'],
    [/audit/, 'audit'],
    [/training|course/, 'training'],
    [/safety|incident/, 'safety'],
    [/asset/, 'assets'],
    [/recruit|candidate/, 'recruit'],
    [/performance|goal/, 'performance'],
    [/request|claim|ticket|helpdesk/, 'requests'],
    [/onboard|offboard|joiner|lifecycle/, 'lifecycle'],
    [/organi[sz]ation|org chart/, 'org'],
    [/profile/, 'profile'],
    [/dashboard|home/, 'dashboard']
  ];
  addFirst(
    lt =>
      /\b(take me|go to|open|show me|navigate|jump to|bring me)\b/.test(lt) &&
      !/summar|explain|draft|who|which|how many/.test(lt),
    (text, lt) => {
      window.__pdaiQ = lt;
      const w = who(text);
      if (
        w &&
        w.e &&
        /\b(this|profile|employee|record|open|take me|go)\b/.test(lt) &&
        !/payslip|leave|attendance/.test(lt)
      ) {
        if (!w.ok || !(can('employees', 'view') || w.e.id === me().id)) return SCOPE_MSG(w.e);
        const e = w.e;
        return (
          say({ tag: 'info', html: P(`Opening ${nm(e.name)}'s profile.`), nav: [], src: [] }),
          open(() => empProfile(e.id))()
        );
      }
      if (/this (employee|person)/.test(lt) && A.rec && A.rec.t === 'emp')
        return open(() => empProfile(A.rec.id))();
      const hit = NAVW.find(([re]) => re.test(lt));
      if (!hit) return K.fallback(text);
      const [, pg, pre] = hit;
      if (!okPage(pg))
        return deny(
          `You do not have access to ${nm(label(pg))}.`,
          'If you need it for your work, ask your System Admin to grant View access.'
        );
      say({ tag: 'info', html: P(`Taking you to <b>${nm(label(pg))}</b>.`) });
      K.goPage(pg, pre)();
    }
  );
  add(
    lt => /^(my )?(approvals|payslips?|leave|attendance|payroll|reports?)$/.test(lt.trim()),
    (text, lt) => {
      const hit = NAVW.find(([re]) => re.test(lt));
      if (hit && okPage(hit[1])) {
        say({ tag: 'info', html: P(`Taking you to <b>${nm(label(hit[1]))}</b>.`) });
        K.goPage(hit[1], hit[2])();
      } else deny('You do not have access to that page.');
    }
  );

  /* ---------- guardrails for things the assistant will not do ---------- */
  addFirst(
    lt =>
      /(delete|remove|deactivate|terminate|disable)\b.*(employee|user|account|person|staff)|bulk (update|change|edit)|change (the )?roles?\b|make .* (an? )?(admin|manager|hr)/.test(
        lt
      ) && !/how|explain|policy/.test(lt),
    () =>
      deny(
        "I can't deactivate or delete people, make bulk updates or change roles. Those high-impact changes need to be done directly in PeopleDesk with the proper approvals.",
        'I can take you to the right screen and explain the steps.'
      )
  );
  addFirst(
    lt =>
      /\bexport|download (all|the)? ?(employees|data|report)/.test(lt) &&
      /employee|people|data|payroll|attendance/.test(lt),
    () => {
      if (!can('employees', 'export'))
        return deny('You do not have permission to export employee data.');
      propose({
        title: 'Export the employee list (CSV)?',
        risk: 'high',
        confirm: 'Review export',
        confirm2: 'Export CSV',
        rows: [
          ['People', String(scoped('employees').length)],
          ['Format', 'CSV, saved to your device']
        ],
        impact:
          'This saves personal details of everyone in your scope to a file on your device. The export is recorded in the audit log.',
        ack: 'I will handle this file under company data-protection rules.',
        check: () =>
          can('employees', 'export')
            ? { ok: true }
            : { ok: false, why: 'You no longer have export permission.' },
        run: () => {
          exportEmps();
          auditAI('Employee export', 'Employee list', { res: 'employees' });
          return { ok: true, msg: 'Export started.' };
        }
      });
    }
  );
  /* conversational helpers for questions that need the person to pick */
  add(
    lt => /^(summar(y|i[sz]e)? ?(this)?( record)?|explain this( record)?)$/.test(lt.trim()),
    sumRecord
  );
  K.draftFor = draftFor;
})(PDAI.K);
