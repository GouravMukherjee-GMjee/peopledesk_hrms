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
