// ตัวช่วยตรวจ responsive + accessibility บนหน้าจอปัจจุบัน (รันในเบราว์เซอร์: window.auditScreen())
window.auditScreen = function () {
  const vw = innerWidth, out = { vw, screen: window.current, issues: [] };
  const sc = document.querySelector('.screen');
  if (document.documentElement.scrollWidth > vw + 1) out.issues.push(`page scrolls sideways: ${document.documentElement.scrollWidth}px`);
  const box = (sc || document.body).getBoundingClientRect();
  for (const el of (sc || document.body).querySelectorAll('*')) {
    if (el.closest('.rain,.chiprow,.overlay')) continue;
    const r = el.getBoundingClientRect();
    if (!r.width) continue;
    if (r.right > box.right + 1 || r.left < box.left - 1) { if (!el.closest('.scene')) out.issues.push(`overflows container: ${el.tagName.toLowerCase()}.${el.className.baseVal ?? el.className}`); }
    if (/^(BUTTON|A|TEXTAREA|SUMMARY)$/.test(el.tagName) && (r.height < 44 && r.width < 44 || r.height < 24)) out.issues.push(`small target ${Math.round(r.width)}x${Math.round(r.height)}: ${el.textContent.trim().slice(0, 24)}`);
    if (el.matches('.lbl,.btn,.title,.chip,h1,h2') && el.scrollWidth > el.clientWidth + 1) out.issues.push(`clipped text: ${el.textContent.trim().slice(0, 24)}`);
  }
  for (const img of (sc || document).querySelectorAll('img')) if (!img.hasAttribute('alt')) out.issues.push(`img without alt: ${img.src}`);
  for (const b of (sc || document).querySelectorAll('button,a')) if (!(b.textContent.trim() || b.getAttribute('aria-label'))) out.issues.push('control without accessible name');
  out.issues = [...new Set(out.issues)];
  return out;
};
