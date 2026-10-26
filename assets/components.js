// คอมโพเนนต์ UI จากดีไซน์ Stitch v2 (ooca CI) — แต่ละตัวคืนค่าเป็น HTML string
const IMG = { hug: 'assets/mooca-hug.png', happy: 'assets/mooca-happy.png', sad: 'assets/mooca-sad.png' };

/* ---------- icons ---------- */
const P = {
  back:'<path d="M15 5l-7 7 7 7"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',chev:'<path d="M9 6l6 6-6 6"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',outward:'<path d="M7 17L17 7M9 7h8v8"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  door:'<path d="M6 21V4h12v17M3 21h18"/><path d="M15 12h.01"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  window:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16M4 12h16"/>',walk:'<circle cx="13" cy="4.5" r="1.5"/><path d="M10 21l2-6 3 3v3M9 12l2-4 3 2 3 1M11 8l-2 4"/>',
  rain:'<path d="M7 15h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 15z"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-4 1 2-5z"/>',hourglass:'<path d="M6 3h12M6 21h12M7 3v2a5 5 0 0 0 10 0V3M7 21v-2a5 5 0 0 1 10 0v2"/>',
  lamp:'<path d="M9 3h6M8 6h8l-1 12H9z"/><path d="M12 10v4"/>',feather:'<path d="M20 4C12 4 6 10 5 19l-1 1M5 19c6-1 11-6 12-13M9 15h5"/>',
  tired:'<circle cx="12" cy="12" r="9"/><path d="M8 10h2M14 10h2M9 16h6"/>',smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/>',
  blur:'<path d="M4 8h16M2 12h20M4 16h16" stroke-dasharray="2 3"/>',star:'<path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
  msg:'<path d="M4 5h16v11H9l-5 4z"/>',shuffle:'<path d="M4 7h12l-3-3M20 17H8l3 3"/>',umbrella:'<path d="M3 12a9 9 0 0 1 18 0zM12 12v7a2 2 0 0 1-4 0"/>',
  cup:'<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M9 3v3M12 3v3"/>',
  letter:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 7l9 6 9-6"/>',pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
  phone:'<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  play:'<circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z"/>',restart:'<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/>',
  air:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>'
};
const I = (k, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[k]}</svg>`;

/* item icons (60x60) สำหรับการ์ดผลลัพธ์ */
const ICON = {
jar:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="12" y="14" width="36" height="40" rx="9" fill="#B3EDE8" fill-opacity=".35" stroke="#B3EDE8"/><rect x="18" y="8" width="24" height="8" rx="3" fill="#F9A000"/><ellipse cx="30" cy="30" rx="11" ry="6" fill="#C7DDF7"/><g stroke="#62A0E9" stroke-width="2" stroke-linecap="round"><line x1="25" y1="40" x2="24" y2="46"/><line x1="31" y1="40" x2="30" y2="46"/><line x1="37" y1="40" x2="36" y2="46"/></g></svg>`,
compass:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="20" fill="#F8E4B3" stroke="#F9A000" stroke-width="3"/><path d="M30 14 l4 16 -4 16 -4 -16Z" fill="#EF7773"/><circle cx="30" cy="30" r="3" fill="#355956"/></svg>`,
hourglass:`<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M16 10 h28 v4 c0 10 -11 13 -11 16 c0 3 11 6 11 16 v4 h-28 v-4 c0 -10 11 -13 11 -16 c0 -3 -11 -6 -11 -16Z" fill="#B3EDE8" fill-opacity=".35" stroke="#B3EDE8"/><path d="M22 47 h16 l-8 -8Z" fill="#F9A000"/><line x1="30" y1="31" x2="30" y2="41" stroke="#F9A000" stroke-width="2"/><rect x="14" y="7" width="32" height="5" rx="2" fill="#F9A000"/><rect x="14" y="48" width="32" height="5" rx="2" fill="#F9A000"/></svg>`,
lantern:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="25" y="6" width="10" height="8" rx="2" fill="#79ADA9"/><rect x="15" y="14" width="30" height="40" rx="8" fill="#355956" stroke="#79ADA9" stroke-width="2"/><circle cx="30" cy="35" r="7" fill="#F9A000" opacity=".5"/></svg>`,
closed:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="14" y="8" width="32" height="46" rx="16" fill="#1F4744" stroke="#79ADA9" stroke-width="2"/><circle cx="39" cy="34" r="2.5" fill="#F9A000"/><path d="M8 54 h44" stroke="#79ADA9" stroke-width="2" stroke-linecap="round"/></svg>`,
umbrella:`<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M6 30 a24 20 0 0 1 48 0Z" fill="#00C4B3"/><path d="M6 30 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0" fill="#B3EDE8"/><line x1="30" y1="8" x2="30" y2="48" stroke="#355956" stroke-width="3" stroke-linecap="round"/><path d="M30 48 a5 5 0 0 1 -10 0" stroke="#355956" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
tea:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="18" y="14" width="24" height="38" rx="7" fill="#00C4B3"/><rect x="20" y="8" width="20" height="8" rx="3" fill="#F9A000"/><rect x="18" y="28" width="24" height="6" fill="#B3EDE8"/><path d="M26 6 q3 -4 0 -6 M34 6 q3 -4 0 -6" stroke="#79ADA9" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
letter:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="8" y="16" width="44" height="30" rx="4" fill="#fff" stroke="#B3EDE8" stroke-width="2"/><path d="M8 18 l22 16 22 -16" stroke="#00C4B3" stroke-width="3" fill="none"/><circle cx="30" cy="34" r="6" fill="#EF7773"/></svg>`,
feather:`<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M12 50 C 18 28, 34 14, 50 8 C 46 28, 32 44, 12 50Z" fill="#fff"/><path d="M12 50 L 42 18" stroke="#B3EDE8" stroke-width="2.5" stroke-linecap="round"/></svg>`,
none:`<svg viewBox="0 0 60 60" aria-hidden="true"><path fill="#F9A000" d="M30 8 l5 15 15 5 -15 5 -5 15 -5 -15 -15 -5 15 -5Z"/><path fill="#00C4B3" d="M46 40 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z"/></svg>`
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const UI = {
  BackButton: () => `<button class="iconbtn" data-back aria-label="ย้อนกลับ">${I('back')}</button>`,

  // แถบบน: ปุ่มย้อนกลับ, ชื่อร้าน, ป้ายขั้น n/5 และแถบความคืบหน้า (เริ่มที่ขั้นก่อนหน้าแล้วค่อยเลื่อน)
  TopBar: n => `<div class="top">${UI.BackButton()}<h1 class="title">ร้านลับริมทาง</h1><span class="step" aria-hidden="true"><i></i>${n}/${Logic.TOTAL}</span></div>
    <div class="progress" role="progressbar" aria-label="ขั้นที่ ${n} จาก ${Logic.TOTAL}" aria-valuemin="0" aria-valuemax="${Logic.TOTAL}" aria-valuenow="${n}"><i style="width:${Logic.progress(n - 1)}%"></i></div>`,

  PlainTop: (right = '', { back = true } = {}) => `<div class="top${right ? '' : ' plain'}">${back ? UI.BackButton() : '<span></span>'}<span class="title">ร้านลับริมทาง</span>${right || '<span></span>'}</div>`,

  Footer: (line = 'ไม่มีคำตอบที่ถูกหรือผิด แค่เลือกสิ่งที่ใกล้ใจที่สุด', icon = 'heart') =>
    `<div class="foot">${line ? `<span class="assure">${I(icon)}${line}</span>` : ''}<span class="brand" aria-hidden="true">• ooca story space •</span></div>`,

  Badges: list => (list || []).map(([pos, ic, t]) => `<span class="badge ${pos}" aria-hidden="true">${I(ic)}${t}</span>`).join(''),

  Mooca: (pose, side, alt = '') => `<img class="mooca ${side}" src="${IMG[pose]}" alt="${esc(alt)}" width="280" height="217" decoding="async">`,

  Rain: (n = 26, rnd = Math.random) => {
    let s = '';
    for (let i = 0; i < n; i++) s += `<i style="left:${rnd() * 110}%;animation-duration:${.8 + rnd() * .6}s;animation-delay:${-rnd() * 2}s"></i>`;
    return `<div class="rain" aria-hidden="true">${s}</div>`;
  },

  // การ์ดฉาก: ภาพจาก Stitch v2 (มี Mooca ในภาพ); รองรับวาง Mooca/ภาพสะท้อนทับได้ถ้าใช้พื้นหลังเปล่า, note = ข้อความใต้ฉากกระจก
  SceneCard: ({ key, bg, mooca, alt = '', rain = 0, badges, reflect = false, note = false, tall = false, eager = false }) =>
    `<div class="scene s-${key}${tall ? ' tall' : ''}" role="img" aria-label="${esc(alt)}"><img class="art" src="${bg}" alt="" width="382" height="512" decoding="async"${eager ? ' fetchpriority="high"' : ''}>${reflect ? `<img class="reflection" src="${IMG.sad}" alt="" width="280" height="217">` : ''}${rain ? UI.Rain(rain) : ''}${mooca ? UI.Mooca(mooca[0], mooca[1]) : ''}${UI.Badges(badges)}${reflect || note ? '<span class="mirror-note" aria-live="polite"></span>' : ''}</div>`,

  // ตัวเลือกคำตอบ: pill ขอบน้ำเงินตาม CI ใช้เหมือนกันทุกฉาก
  OptionButton: ({ v, label, icon, cls = '', selected = false }) =>
    `<button class="opt ${cls}${selected ? ' sel' : ''}" data-v="${v}" aria-pressed="${selected}"><span class="ic">${I(icon)}</span><span class="lbl">${label}</span>${I('chev', 'i chev')}</button>`,

  ScaleOption: ({ i, label, color, danger = false, selected = false }) =>
    `<button class="opt scale${danger ? ' danger' : ''}${selected ? ' sel' : ''}" data-v="${i}" aria-pressed="${selected}"><i class="dot" style="background:${color}" aria-hidden="true"></i><span class="lbl">${label}</span>${I(danger ? 'heart' : 'chev', 'i chev')}</button>`,

  OptionGroup: (label, buttons) => `<div class="opts" role="group" aria-label="${esc(label)}">${buttons.join('')}</div>`,

  Button: ({ label, variant = 'primary', icon, attrs = '' }) => `<button class="btn ${variant}" ${attrs}>${label}${icon ? ' ' + I(icon) : ''}</button>`,

  ItemCard: ({ kind, caption, icon, name, sub }) =>
    `<div class="item ${kind}"><small>${caption}</small><span class="tile">${ICON[icon]}</span><b>${name}</b><em>${sub}</em></div>`,

  SpeechBubble: text => `<div class="bubble"><span class="sun" aria-hidden="true">${I('sun')}</span><span>${text}</span></div>`,

  Toast: msg => `<div class="toast" role="status">${msg}</div>`
};
if (typeof module !== 'undefined') module.exports = { UI, I, ICON, IMG };
