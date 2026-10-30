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
