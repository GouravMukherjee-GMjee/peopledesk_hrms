/* ---------- boot of the engine ---------- */
seedGov();
loadGov();
seedGov();
S.sec.twoFA = Object.assign(
  { employee: 0, manager: 0, hr: 1, admin: 1, sysadmin: 1 },
  Object.fromEntries(Object.entries(S.sec.twoFA || {}).filter(([k]) => ROLE_KEYS.includes(k)))
);
