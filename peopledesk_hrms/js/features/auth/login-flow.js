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
