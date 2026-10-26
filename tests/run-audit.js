// รันตรวจทุกจอที่ความกว้างปัจจุบัน: await runAudit()
window.runAudit = async function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const res = {};
  for (const name of ['intro', 'road', 'door', 'shelf', 'mirror', 'shop', 'gift', 'pass', 'check', 'result', 'safety']) {
    S.a = { door: name === 'pass' ? 'pass' : 'in', shelf: 'jar', mirror: 'good', shop: 'stuck', gift: 'letter' }; S.check = 2;
    go(name); await sleep(650);
    const r = auditScreen(); if (r.issues.length) res[name] = r.issues;
  }
  return { vw: innerWidth, issues: res };
};
