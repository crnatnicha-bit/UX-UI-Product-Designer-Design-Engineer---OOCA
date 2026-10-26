// รันใน GitHub Actions: เปิดเทสต์ในเบราว์เซอร์จริง (Chromium) + ตรวจ responsive/a11y ที่ 320 และ 414px
// ใช้: BASE_URL=http://localhost:8080 node scripts/ci-check.mjs
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:8080';
const browser = await chromium.launch();
let failed = false;

// 1) เทสต์ใน tests/index.html (logic, components, flow)
{
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${BASE}/tests/index.html`);
  const res = await page.waitForFunction(() => window.__results, null, { timeout: 120_000 }).then(h => h.jsonValue());
  for (const r of res.results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : `\n    ${r.err}`}`);
  console.log(`\nTests: ${res.pass}/${res.total} passed`);
  if (res.pass !== res.total) failed = true;
  if (errors.length) { console.log('Page errors:', errors); failed = true; }
  await page.close();
}

// 2) ตรวจทุกจอที่ความกว้างมือถือ: ห้ามล้นแนวนอน, ห้ามข้อความถูกตัด, ภาพต้องมี alt, ปุ่มต้องมีชื่อ
const BLOCKING = /scrolls sideways|overflows container|clipped text|without alt|without accessible name/;
for (const width of [320, 414]) {
  const page = await browser.newPage({ viewport: { width, height: 740 } });
  await page.goto(`${BASE}/`);
  await page.waitForSelector('[data-start]');
  for (const f of ['tests/audit.js', 'tests/run-audit.js']) await page.addScriptTag({ url: `${BASE}/${f}` });
  const out = await page.evaluate(() => window.runAudit());
  const issues = Object.entries(out.issues).flatMap(([screen, list]) => list.map(i => `${screen}: ${i}`));
  const blocking = issues.filter(i => BLOCKING.test(i));
  console.log(`\nAudit @${width}px: ${issues.length} note(s), ${blocking.length} blocking`);
  issues.forEach(i => console.log(`  ${BLOCKING.test(i) ? '✗' : '·'} ${i}`));
  if (blocking.length) failed = true;
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
