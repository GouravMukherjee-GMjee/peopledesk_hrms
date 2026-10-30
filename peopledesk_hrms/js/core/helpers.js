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
