// สคริปต์สร้างหน้า Figma ทั้งหน้าในการเรียก use_figma ครั้งเดียว (Figma MCP)
// ไฟล์เป้าหมาย: https://www.figma.com/design/pDBT5Vb6gzHNI1NnwZyWTq
// สร้าง: หัวข้อ, Problem & Approach 4 การ์ด, User Flow + ทางแยก A/B, 11 จอมือถือ 360×760 + โน้ต,
//        Components (Option / Button / Mooca placeholder)
// ถ้า error ระหว่างทาง จะลบทุกอย่างที่สร้างไปแล้ว จึงรันซ้ำได้ปลอดภัย
const page = figma.currentPage;
page.name = 'ร้านลับริมทาง';
const TOP = [];
try {
let maxX = -Infinity; for (const c of page.children) maxX = Math.max(maxX, c.x + c.width);
const X0 = page.children.length ? maxX + 400 : 0;

const fl = await figma.listAvailableFontsAsync();
const ps = fl.filter(f => f.fontName.family === 'Prompt').map(f => f.fontName.style);
const FAM = ps.length ? 'Prompt' : 'Inter';
const pick = (...c) => c.find(s => ps.includes(s)) || ps[0];
const W = FAM === 'Prompt' ? {300: pick('Light','Regular'), 400: pick('Regular'), 500: pick('Medium','Regular'), 600: pick('SemiBold','Semi Bold','Bold')} : {300:'Light',400:'Regular',500:'Medium',600:'Semi Bold'};
await Promise.all([...new Set(Object.values(W))].map(s => figma.loadFontAsync({family: FAM, style: s})).concat([figma.loadFontAsync({family:'Inter',style:'Regular'})]));

const rgb = h => { h = h.replace('#',''); return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255 }; };
const S = (h, o = 1) => [{ type: 'SOLID', color: rgb(h), opacity: o }];
const LG = st => [{ type: 'GRADIENT_LINEAR', gradientTransform: [[0,1,0],[-1,0,1]], gradientStops: st.map(([p,h]) => ({ position: p, color: { ...rgb(h), a: 1 } })) }];
const SH = (a=0.12, y=8, r=16, c={r:0,g:196/255,b:179/255}) => [{ type: 'DROP_SHADOW', color: { ...c, a }, offset: { x: 0, y }, radius: r, spread: 0, visible: true, blendMode: 'NORMAL' }];
function T(str, o = {}) {
  const { size = 15, w = 300, color = '#355956', width = null, align = 'LEFT', lh = null, name, inter } = o;
  const t = figma.createText();
  t.fontName = inter ? {family:'Inter',style:'Regular'} : { family: FAM, style: W[w] };
  t.characters = str; t.fontSize = size; t.fills = S(color); t.textAlignHorizontal = align;
  if (lh) t.lineHeight = { unit: 'PIXELS', value: lh };
  if (width) { t.resize(width, t.height); t.textAutoResize = 'HEIGHT'; }
  if (name) t.name = name;
  return t;
}
const bold = (t, sub, w = 500) => { const i = t.characters.indexOf(sub); if (i >= 0) t.setRangeFontName(i, i + sub.length, { family: FAM, style: W[w] }); return t; };
function AL(dir, props = {}) { const f = figma.createAutoLayout(dir); f.fills = []; f.set(props); return f; }
const pad = (t, r, b, l) => ({ paddingTop: t, paddingRight: r, paddingBottom: b, paddingLeft: l });
function add(p, c, fill) { p.appendChild(c); if (fill) c.layoutSizingHorizontal = 'FILL'; return c; }
function spacer(p) { const s = figma.createFrame(); s.name = 'spacer'; s.fills = []; s.resize(1, 1); p.appendChild(s); s.layoutGrow = 1; return s; }
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/* ---------- SVG art (from prototype) ---------- */
const sparks = pts => pts.map(([x,y,s]) => `<path fill="#FFE27A" d="M${x} ${y-s} l${s*.3} ${s*.7} ${s*.7} ${s*.3} -${s*.7} ${s*.3} -${s*.3} ${s*.7} -${s*.3} -${s*.7} -${s*.7} -${s*.3} ${s*.7} -${s*.3}Z"/>`).join('');
const svg = (s, w = 328, h = 250) => s.replace(/<animate[^>]*\/>/g, '').replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `);
const ICON = {
jar:`<svg viewBox="0 0 60 60"><rect x="12" y="14" width="36" height="40" rx="9" fill="#B3EDE8" fill-opacity=".35" stroke="#B3EDE8"/><rect x="18" y="8" width="24" height="8" rx="3" fill="#F9A000"/><ellipse cx="30" cy="30" rx="11" ry="6" fill="#C7DDF7"/><g stroke="#62A0E9" stroke-width="2" stroke-linecap="round"><line x1="25" y1="40" x2="24" y2="46"/><line x1="31" y1="40" x2="30" y2="46"/><line x1="37" y1="40" x2="36" y2="46"/></g></svg>`,
tea:`<svg viewBox="0 0 60 60"><rect x="18" y="14" width="24" height="38" rx="7" fill="#fff"/><rect x="20" y="8" width="20" height="8" rx="3" fill="#F9A000"/><rect x="18" y="28" width="24" height="6" fill="#B3EDE8"/></svg>`
};
const jarInner = ICON.jar.replace('<svg viewBox="0 0 60 60">','').replace('</svg>','');
const SVG = {
road:`<svg viewBox="0 0 328 250"><rect width="328" height="250" fill="#C3CFDC"/><rect x="0" y="170" width="328" height="80" fill="#9FB0C2"/><path d="M120 250 L150 170 L178 170 L208 250Z" fill="#B6C4D3"/><rect x="160" y="190" width="6" height="14" fill="#fff" opacity=".7"/><rect x="159" y="218" width="8" height="18" fill="#fff" opacity=".7"/><rect x="18" y="80" width="56" height="92" rx="4" fill="#8696AA"/><rect x="250" y="64" width="62" height="108" rx="4" fill="#8696AA"/><rect x="28" y="94" width="12" height="14" fill="#C7D2DE"/><rect x="50" y="94" width="12" height="14" fill="#C7D2DE"/><rect x="262" y="80" width="12" height="14" fill="#F8E4B3"/><rect x="286" y="80" width="12" height="14" fill="#C7D2DE"/></svg>`,
door:`<svg viewBox="0 0 328 250"><rect width="328" height="250" fill="#BCCADA"/><rect x="0" y="200" width="328" height="50" fill="#9FB0C2"/><rect x="54" y="40" width="220" height="164" rx="6" fill="#355956"/><path d="M44 40 h240 l-12 26 h-216Z" fill="#00C4B3"/><g fill="#fff" opacity=".9"><rect x="64" y="48" width="18" height="10" rx="2"/><rect x="100" y="48" width="18" height="10" rx="2"/><rect x="136" y="48" width="18" height="10" rx="2"/><rect x="172" y="48" width="18" height="10" rx="2"/><rect x="208" y="48" width="18" height="10" rx="2"/><rect x="244" y="48" width="18" height="10" rx="2"/></g><rect x="72" y="84" width="96" height="76" rx="6" fill="#F8E4B3"/><rect x="72" y="84" width="96" height="76" rx="6" fill="#F9A000" opacity=".25"/><g fill="#00C4B3"><circle cx="92" cy="104" r="7" opacity=".7"/><circle cx="148" cy="112" r="5" opacity=".6"/><circle cx="120" cy="140" r="8" fill="#F9A000" opacity=".7"/></g><rect x="186" y="84" width="70" height="120" rx="35" fill="#1F4744"/><path d="M192 120 a29 29 0 0 1 58 0 v80 h-58Z" fill="#F8E4B3"/><circle cx="244" cy="162" r="4" fill="#F9A000"/><rect x="196" y="96" width="50" height="16" rx="8" fill="#fff"/>${sparks([[60,34,8],[270,26,6],[182,72,5]])}</svg>`,
doorbox:`<svg viewBox="0 0 328 250"><rect width="328" height="250" fill="#BCCADA"/><rect x="0" y="200" width="328" height="50" fill="#9FB0C2"/><rect x="54" y="40" width="220" height="164" rx="6" fill="#355956"/><path d="M44 40 h240 l-12 26 h-216Z" fill="#00C4B3"/><rect x="186" y="84" width="70" height="120" rx="35" fill="#1F4744"/><path d="M192 120 a29 29 0 0 1 58 0 v80 h-58Z" fill="#F8E4B3"/><rect x="72" y="84" width="96" height="76" rx="6" fill="#F8E4B3"/><rect x="150" y="176" width="36" height="28" rx="4" fill="#F9A000"/><rect x="150" y="176" width="36" height="8" rx="3" fill="#FFE27A"/><rect x="165" y="176" width="6" height="28" fill="#fff" opacity=".7"/><rect x="178" y="160" width="34" height="20" rx="3" fill="#fff" transform="rotate(8 195 170)"/>${sparks([[168,160,7],[120,190,5],[214,150,5]])}</svg>`,
shelf:`<svg viewBox="0 0 328 250"><defs><radialGradient id="sh" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#3F6866"/><stop offset="1" stop-color="#1F3B39"/></radialGradient></defs><rect width="328" height="250" fill="url(#sh)"/><g fill="#4F7F7B"><rect x="16" y="96" width="296" height="8" rx="3"/><rect x="16" y="196" width="296" height="8" rx="3"/></g><rect x="34" y="46" width="44" height="50" rx="10" fill="#B3EDE8" fill-opacity=".35" stroke="#B3EDE8"/><rect x="40" y="38" width="32" height="10" rx="3" fill="#F9A000"/><ellipse cx="56" cy="64" rx="14" ry="8" fill="#C7DDF7"/><g stroke="#62A0E9" stroke-width="2" stroke-linecap="round"><line x1="50" y1="76" x2="48" y2="84"/><line x1="58" y1="76" x2="56" y2="84"/><line x1="66" y1="76" x2="64" y2="84"/></g><circle cx="132" cy="70" r="24" fill="#F8E4B3" stroke="#F9A000" stroke-width="3"/><path d="M132 52 l5 18 -5 18 -5 -18Z" fill="#EF7773"/><circle cx="132" cy="70" r="3" fill="#355956"/><path d="M196 44 h36 v4 c0 14 -14 18 -14 24 c0 6 14 10 14 24 v4 h-36 v-4 c0 -14 14 -18 14 -24 c0 -6 -14 -10 -14 -24Z" fill="#B3EDE8" fill-opacity=".35" stroke="#B3EDE8"/><path d="M204 92 h20 l-10 -10Z" fill="#F9A000"/><line x1="214" y1="72" x2="214" y2="86" stroke="#F9A000" stroke-width="2"/><rect x="194" y="40" width="40" height="5" rx="2" fill="#F9A000"/><rect x="194" y="95" width="40" height="5" rx="2" fill="#F9A000"/><rect x="268" y="40" width="10" height="8" rx="2" fill="#79ADA9"/><rect x="258" y="48" width="30" height="44" rx="8" fill="#355956" stroke="#79ADA9" stroke-width="2"/><circle cx="273" cy="72" r="6" fill="#F9A000" opacity=".4"/><g transform="translate(232 128)"><path d="M0 40 C 8 18, 28 6, 44 0 C 40 18, 26 34, 0 40Z" fill="#fff" opacity=".9"/><path d="M0 40 L 34 10" stroke="#B3EDE8" stroke-width="2"/></g>${sparks([[100,22,8],[300,140,7],[200,160,5]])}</svg>`,
mirror:`<svg viewBox="0 0 328 250"><defs><radialGradient id="mr" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="#3F6866"/><stop offset="1" stop-color="#1A3331"/></radialGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DBF0EE"/><stop offset=".55" stop-color="#B3EDE8"/><stop offset="1" stop-color="#C7DDF7"/></linearGradient></defs><rect width="328" height="250" fill="url(#mr)"/><rect x="0" y="210" width="328" height="40" fill="#2A4E4B"/><path d="M104 214 V86 a60 60 0 0 1 120 0 V214Z" fill="#F9A000"/><path d="M112 210 V88 a52 52 0 0 1 104 0 V210Z" fill="url(#glass)"/><circle cx="164" cy="30" r="7" fill="#FFE27A"/>${sparks([[60,54,8],[276,74,8],[250,184,5],[70,174,5]])}</svg>`,
glare:`<svg viewBox="0 0 328 250"><path d="M130 70 l30 -26 M128 110 l60 -52 M150 150 l58 -50" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"/></svg>`,
shop:`<svg viewBox="0 0 328 250"><defs><radialGradient id="sp" cx=".7" cy=".4" r=".8"><stop offset="0" stop-color="#4F7F7B"/><stop offset="1" stop-color="#1F3B39"/></radialGradient></defs><rect width="328" height="250" fill="url(#sp)"/><rect x="0" y="176" width="328" height="74" fill="#2A4E4B"/><rect x="20" y="168" width="288" height="12" rx="4" fill="#4F7F7B"/><g transform="translate(40 108)">${jarInner}</g><rect x="20" y="20" width="204" height="66" rx="16" fill="#fff"/><path d="M180 86 l14 14 l-2 -14Z" fill="#fff"/>${sparks([[290,30,8],[250,124,5]])}</svg>`,
gift:`<svg viewBox="0 0 328 250"><rect width="328" height="250" fill="#E0F3F3"/><circle cx="70" cy="70" r="34" fill="#FFE27A"/><g stroke="#F9A000" stroke-width="3" stroke-linecap="round"><line x1="70" y1="20" x2="70" y2="28"/><line x1="112" y1="38" x2="106" y2="44"/><line x1="28" y1="38" x2="34" y2="44"/></g><rect x="0" y="190" width="328" height="60" fill="#B3EDE8"/><path d="M20 190 q80 -40 160 0" stroke="#fff" stroke-width="10" fill="none" opacity=".6"/></svg>`
};

/* ---------- Components ---------- */
const comps = AL('VERTICAL', { name: 'Components', itemSpacing: 32, cornerRadius: 24, ...pad(40,40,40,40) });
comps.fills = S('#F6F6F6'); TOP.push(comps);
comps.appendChild(T('Components', { size: 28, w: 600, color: '#000000' }));
const crow = AL('HORIZONTAL', { name: 'component-sets', itemSpacing: 40 }); comps.appendChild(crow);
const setStyle = (set, name, desc) => { set.name = name; set.layoutMode = 'VERTICAL'; set.itemSpacing = 12; set.set(pad(20,20,20,20)); set.primaryAxisSizingMode = 'AUTO'; set.counterAxisSizingMode = 'AUTO'; set.fills = S('#FFFFFF'); set.cornerRadius = 16; set.description = desc; };

// Option
const OPT = { Default: ['#FFFFFF','#1868C6','#1868C6'], Selected: ['#1868C6','#1868C6','#FFFFFF'], Ghost: ['#FFFFFF','#3F6866','#528984'], Danger: ['#FFFFFF','#C64A46','#C64A46'], 'Danger Selected': ['#C64A46','#C64A46','#FFFFFF'] };
const optC = [];
for (const [st, [bg, bd, fg]] of Object.entries(OPT)) {
  const c = figma.createComponent(); c.name = 'State=' + st;
  c.layoutMode = 'HORIZONTAL'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER'; c.itemSpacing = 10;
  c.set(pad(11,16,11,16)); c.cornerRadius = 24; c.resize(296, 48); c.counterAxisSizingMode = 'AUTO';
  c.fills = S(bg); c.strokes = S(bd); c.strokeWeight = 1.5;
  if (st === 'Ghost') c.dashPattern = [6, 4]; else c.effects = SH(0.08, 2, 8, {r:31/255,g:119/255,b:223/255});
  const d = figma.createEllipse(); d.name = 'dot'; d.resize(22, 22); d.fills = S('#FFE27A'); c.appendChild(d); d.visible = false;
  const t = T('ตัวเลือก', { size: 15, w: 500, color: fg, align: 'CENTER', lh: 24, name: 'label' }); c.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL';
  optC.push(c);
}
const optSet = figma.combineAsVariants(optC, crow);
setStyle(optSet, 'Option', 'ตัวเลือกคำตอบ pill ขอบน้ำเงิน #1868C6 (ผ่าน WCAG). Ghost = ทางออกที่ไม่ผิด (เส้นประ), Danger = ระดับหนักมาก → หน้าความปลอดภัย. เมื่อเลือกแล้วตัวเลือกอื่นจาง 45%.');
const kOptL = optSet.addComponentProperty('Label', 'TEXT', 'ตัวเลือก');
const kOptD = optSet.addComponentProperty('Dot', 'BOOLEAN', false);
for (const v of optSet.children) { v.findOne(n => n.name === 'label').componentPropertyReferences = { characters: kOptL }; v.findOne(n => n.name === 'dot').componentPropertyReferences = { visible: kOptD }; }
const Opt = (label, st = 'Default', dot) => { const i = optSet.children.find(v => v.name === 'State=' + st).createInstance(); const p = { [kOptL]: label }; if (dot) p[kOptD] = true; i.setProperties(p); if (dot) { i.findOne(n => n.name === 'dot').fills = S(dot); i.findOne(n => n.name === 'label').textAlignHorizontal = 'LEFT'; } return i; };

// Button
const BTN = { Primary: ['#009688', null, '#FFFFFF', 19, 600], Outline: ['#FFFFFF', '#00C4B3', '#009688', 16, 500], Danger: ['#C64A46', null, '#FFFFFF', 16, 500], Plain: [null, null, '#3F6866', 14, 400] };
const btnC = [];
for (const [v, [bg, bd, fg, sz, w]] of Object.entries(BTN)) {
  const c = figma.createComponent(); c.name = 'Variant=' + v;
  c.layoutMode = 'VERTICAL'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER';
  c.set(pad(13,16,13,16)); c.cornerRadius = 24; c.resize(320, 50); c.primaryAxisSizingMode = 'AUTO';
  c.fills = bg ? S(bg) : []; if (bd) { c.strokes = S(bd); c.strokeWeight = 1.5; }
  const t = T('ปุ่ม', { size: sz, w, color: fg, align: 'CENTER', name: 'label' }); c.appendChild(t); t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL';
  const s = T('คำอธิบาย', { size: 12, w: 300, color: fg, align: 'CENTER', name: 'sub' }); c.appendChild(s); s.textAutoResize = 'HEIGHT'; s.layoutSizingHorizontal = 'FILL'; s.visible = false;
  btnC.push(c);
}
const btnSet = figma.combineAsVariants(btnC, crow);
setStyle(btnSet, 'Button', 'ปุ่ม pill. Primary #009688 19/600, Outline ขอบ turquoise, Danger #C64A46 (โทร 1323), Plain สำหรับลิงก์รอง. ห้ามมุมแหลมกับสิ่งที่กดได้.');
const kBL = btnSet.addComponentProperty('Label', 'TEXT', 'ปุ่ม');
const kBS = btnSet.addComponentProperty('Sub', 'TEXT', 'คำอธิบาย');
const kBH = btnSet.addComponentProperty('Has sub', 'BOOLEAN', false);
for (const v of btnSet.children) { v.findOne(n => n.name === 'label').componentPropertyReferences = { characters: kBL }; v.findOne(n => n.name === 'sub').componentPropertyReferences = { characters: kBS, visible: kBH }; }
const Btn = (label, v = 'Primary', sub) => { const i = btnSet.children.find(c => c.name === 'Variant=' + v).createInstance(); const p = { [kBL]: label }; if (sub) { p[kBS] = sub; p[kBH] = true; } i.setProperties(p); return i; };

// Mooca placeholder
const POSE = { Hug: '3:7416 · hugging sunny', Happy: '3:7482 · happy + รุ้ง', Sad: '3:7557 · sad (เมฆม่วง)' };
const mC = [];
for (const [p, id] of Object.entries(POSE)) {
  const c = figma.createComponent(); c.name = 'Pose=' + p;
  c.layoutMode = 'VERTICAL'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER'; c.itemSpacing = 2;
  c.resize(120, 110); c.cornerRadius = 16; c.clipsContent = true;
  c.fills = S('#DBF0EE', 0.85); c.strokes = S('#79ADA9'); c.strokeWeight = 1.5; c.dashPattern = [4, 4];
  c.appendChild(T('Mooca · ' + p, { size: 12, w: 500, color: '#3F6866', align: 'CENTER', width: 104 }));
  c.appendChild(T(id, { size: 9, color: '#528984', align: 'CENTER', width: 104 }));
  mC.push(c);
}
const mSet = figma.combineAsVariants(mC, crow);
setStyle(mSet, 'Mooca placeholder', 'กรอบแทน Mooca — คัดลอกท่าจริงจากไฟล์ ooca CI (frame "Mooca" 3:6679) มาวางแทน. ใช้ได้เฉพาะงาน assignment นี้.');
const MOOCA = p => mSet.children.find(v => v.name === 'Pose=' + p).createInstance();

/* ---------- Page header + Problem & Approach ---------- */
const title = T('ooca Assignment — "ร้านลับริมทาง"', { size: 44, w: 600, color: '#000000' }); title.x = X0; title.y = 0; TOP.push(title);
const sub = T('2-Minute Mental Health Experience · ประตูบานแรกก่อนแบบทดสอบความเครียดและการคุยกับนักจิตวิทยา', { size: 18, color: '#3F6866' }); sub.x = X0; sub.y = 72; TOP.push(sub);

const prob = AL('HORIZONTAL', { name: 'Problem & Approach', itemSpacing: 24 }); prob.x = X0; prob.y = 160; TOP.push(prob);
const CARDS = [
 ['01 · PROBLEM', 'แบบทดสอบเดิมตอบโจทย์คนที่ "พร้อมแล้ว"', 'แบบทดสอบความเครียดของ ooca ถามตรงเรื่องอาการ ข้อละหน้า 4 ระดับ ใช้ 4–5 นาที\n\nแต่คนที่รู้สึกไม่โอเคและยังไม่พร้อม ไม่อยากเปิดหน้าที่ถามว่า "คุณกำลังเครียดอยู่หรือเปล่า?" — คำถามตรงคือกำแพงแรก'],
 ['02 · USER', 'คนทำงาน 22–35 ที่ "ไม่ค่อยโอเค" แต่อธิบายไม่ได้', 'เหนื่อยสะสม ไม่รู้ว่าแค่เหนื่อยหรือควรขอความช่วยเหลือ ไม่อยากถูกตีตราว่า "มีปัญหา"\n\nมีเวลาน้อย อยากได้อะไรกลับไปทันทีใน 2 นาที โดยไม่ต้องสมัครหรือพิมพ์อะไร'],
 ['03 · APPROACH', 'เล่าเรื่องแทนการถามตรง (projective)', 'ร้านเวทมนตร์ที่ปรากฏเฉพาะคนที่แบกอะไรไว้ในใจ เลือกจริง 5 ครั้ง ~2 นาที\n\nประตู = การเข้าหาความช่วยเหลือ\nชั้นวาง = สิ่งที่แบกอยู่\nกระจก = มุมมองต่อตัวเอง\nเจ้าของร้าน = ความพร้อมจะเล่า\nของฝาก = สิ่งที่ใจต้องการ\n\nได้ "ของจากร้าน" เป็นภาพสะท้อน + สิ่งเล็กๆ ที่ทำได้ทันที + ก้าวต่อไปที่เหมาะกับระดับ'],
 ['04 · PRINCIPLES & SAFETY', 'ประตูบานแรก ไม่ใช่การวินิจฉัย', 'พาไปยังแบบทดสอบเดิมและนักจิตวิทยา ไม่แข่งกับของเดิม\n\nไม่เก็บข้อมูล · ทุกความหมายใช้คำว่า "อาจ" · ปุ่ม "ไม่ค่อยตรงกับฉัน" ให้ผู้ใช้แก้ได้\n\nเช็กใจตรงๆ 1 ข้อก่อนผล — ถ้าตอบ "หนักมาก…" ไปหน้าความปลอดภัยทันที (1323 ฟรี 24 ชม. / 1669)']
];
for (const [k, h, b] of CARDS) {
  const c = AL('VERTICAL', { name: k, itemSpacing: 12, cornerRadius: 24, ...pad(28,28,28,28) });
  c.fills = S('#FFFFFF'); c.effects = SH(); c.strokes = S('#DBF0EE'); c.strokeWeight = 1;
  prob.appendChild(c); c.resize(360, c.height); c.counterAxisSizingMode = 'FIXED'; c.primaryAxisSizingMode = 'AUTO';
  c.appendChild(T(k, { size: 12, w: 500, color: '#009688' }));
  c.appendChild(T(h, { size: 20, w: 600, color: '#000000', width: 304, lh: 30 }));
  c.appendChild(T(b, { size: 14, color: '#3F6866', width: 304, lh: 22 }));
}
prob.counterAxisAlignItems = 'MIN';

/* ---------- User Flow ---------- */
const flow = AL('VERTICAL', { name: 'User Flow', itemSpacing: 28, cornerRadius: 24, ...pad(40,40,40,40) });
flow.fills = S('#FFFFFF'); flow.effects = SH(); flow.x = X0; flow.y = prob.y + prob.height + 120; TOP.push(flow);
flow.appendChild(T('User Flow · เลือกจริง 5 ครั้ง (~2 นาที) + ทางแยก A/B', { size: 28, w: 600, color: '#000000' }));
const Node = (t, s, bg = '#FFFFFF', bd = '#B3EDE8', dash) => {
  const n = AL('VERTICAL', { name: t, itemSpacing: 4, cornerRadius: 16, ...pad(12,14,12,14) });
  n.fills = S(bg); n.strokes = S(bd); n.strokeWeight = 1.5; if (dash) n.dashPattern = [6, 4];
  n.resize(140, 60); n.primaryAxisSizingMode = 'AUTO';
  n.appendChild(T(t, { size: 14, w: 500, color: '#000000', width: 112 }));
  if (s) n.appendChild(T(s, { size: 11, color: '#3F6866', width: 112, lh: 16 }));
  return n;
};
const Row = (label, nodes) => {
  const r = AL('HORIZONTAL', { name: label, itemSpacing: 8, counterAxisAlignItems: 'CENTER' });
  r.appendChild(T(label, { size: 13, w: 500, color: '#009688', width: 110 }));
  nodes.forEach((n, i) => { if (i) r.appendChild(T('→', { size: 20, color: '#79ADA9', inter: true })); r.appendChild(n); });
  flow.appendChild(r); return r;
};
Row('เส้นทางหลัก', [
  Node('Intro', '~2 นาที · ไม่เก็บข้อมูล · ไม่ใช่การวินิจฉัย', '#E0FEFB'), Node('ฉากเปิด', 'ถนนฝนตก ไม่มีตัวเลือก ไปต่อเองใน 3.5 วิ'),
  Node('ประตู 1/5 ★', 'การเข้าหาความช่วยเหลือ', '#E4EFFB', '#8FBBEF'), Node('ชั้นวาง 2/5', 'สิ่งที่แบกอยู่', '#E4EFFB', '#8FBBEF'),
  Node('กระจก 3/5 ★', 'มุมมองต่อตัวเอง', '#E4EFFB', '#8FBBEF'), Node('เจ้าของร้าน 4/5', 'ความพร้อมจะเล่า', '#E4EFFB', '#8FBBEF'),
  Node('ของฝาก 5/5', 'สิ่งที่ใจต้องการ', '#E4EFFB', '#8FBBEF'), Node('เช็กใจ 1 ข้อ', 'ช่วงนี้ใจคุณหนักแค่ไหน?', '#F8E4B3', '#F9A000'),
  Node('ห่อของ', 'หน้าโหลด 1.4 วิ'), Node('ผลลัพธ์ ★', 'ของจากร้าน + สิ่งเล็กๆ + ก้าวต่อไป', '#E0FEFB', '#00C4B3')
]);
Row('ทางแยก A', [Node('ประตู', 'เลือก "เดินผ่านไป วันนี้ยังไม่ใช่วัน"', '#F6F6F6', '#79ADA9', true), Node('กล่องหน้าประตู', '"ร้านนี้จะอยู่ตรงนี้ จนกว่าคุณจะพร้อม"', '#F6F6F6', '#79ADA9', true), Node('ของฝาก 5/5', 'ข้ามชั้นวาง กระจก เจ้าของร้าน'), Node('ผลลัพธ์', 'การ์ด "ประตูที่ยังไม่เปิด"')]);
Row('ทางแยก B', [Node('เช็กใจ', 'เลือก "หนักมาก จนบางครั้งคิดว่าไม่อยากมีชีวิตอยู่"', '#FAD6D5', '#EF7773'), Node('หน้าความปลอดภัย', 'โทร 1323 · นักจิตวิทยา ooca · 1669', '#FAD6D5', '#EF7773'), Node('ผลลัพธ์', '"ดูของที่ได้จากร้านต่อ" (ไม่บังคับ)')]);
Row('Next step', [Node('เบา', 'ชวนกลับมาแวะ + ลิงก์แบบทดสอบ', '#FFFBEA', '#FFE27A'), Node('กลาง', 'แบบทดสอบความเครียดเป็นหลัก (อยากเล่า/ร่ม → ผู้เชี่ยวชาญ)', '#E4EFFB', '#8FBBEF'), Node('หนัก', 'คุยกับนักจิตวิทยา + 1323', '#FAD6D5', '#EF7773')]);

/* ---------- Screens ---------- */
const SCR = [];
function Screen(name, fills) {
  const f = figma.createFrame(); f.name = name; f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
  f.resize(360, 760); f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 0; f.cornerRadius = 32; f.clipsContent = true;
  f.fills = fills || S('#FFFFFF'); f.effects = SH(0.18, 16, 32); SCR.push(f); TOP.push(f); return f;
}
function Top(sc, { n, right, back = '‹', link } = {}) {
  const t = AL('HORIZONTAL', { name: 'top', itemSpacing: 12, counterAxisAlignItems: 'CENTER', ...pad(16,20,8,20) }); add(sc, t, true);
  const b = AL('HORIZONTAL', { name: 'iconbtn', primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER', cornerRadius: 18 });
  b.fills = S('#F6F6F6'); b.resize(36, 36); b.appendChild(T(back, { size: 20, color: '#355956', inter: true })); t.appendChild(b);
  if (n) {
    const p = figma.createFrame(); p.name = 'progress'; p.resize(230, 6); p.cornerRadius = 6; p.fills = S('#F1F1F1'); p.clipsContent = true;
    const r = figma.createRectangle(); r.resize(230 * n / 5, 6); r.cornerRadius = 6; r.fills = S('#00C4B3'); p.appendChild(r);
    t.appendChild(p); p.layoutGrow = 1; t.appendChild(T(n + '/5', { size: 12, color: '#3F6866' }));
  } else { spacer(t); if (right) t.appendChild(T(right, { size: 12, color: '#3F6866' })); if (link) { const l = T(link, { size: 13, w: 400, color: '#1868C6' }); l.textDecoration = 'UNDERLINE'; t.appendChild(l); } }
  return t;
}
function Scene(sc, key, { h = 250, mooca, left, rain = 0, top = '#C3CFDC' } = {}) {
  const s = figma.createFrame(); s.name = 'scene'; s.resize(328, h); s.cornerRadius = 24; s.clipsContent = true; s.fills = S(top);
  sc.appendChild(s);
  const a = figma.createNodeFromSvg(svg(SVG[key])); a.name = 'art/' + key; s.appendChild(a); a.x = 0; a.y = h - 250;
  for (let i = 0; i < rain; i++) { const r = figma.createRectangle(); r.name = 'rain'; r.resize(2, 16); r.cornerRadius = 2; r.fills = S('#FFFFFF', 0.75); s.appendChild(r); r.x = rnd() * 326; r.y = rnd() * (h - 16); }
  if (mooca) { const m = MOOCA(mooca); m.resize(100, 92); s.appendChild(m); m.x = left ? 8 : 218; m.y = h - 98; }
  return s;
}
function Body(sc, o = {}) { const b = AL('VERTICAL', { name: 'body', itemSpacing: o.gap || 10, ...pad(o.pt || 18, 20, 24, 20) }); add(sc, b, true); b.layoutSizingVertical = 'FILL'; return b; }
const story = (b, s, o = {}) => add(b, T(s, { size: 15, lh: 24, width: 320, ...o }), true);
const ask = (b, s, o = {}) => add(b, T(s, { size: 18, w: 500, lh: 26, color: '#1868C6', width: 320, ...o }), true);
const opts = (b, list) => { const o = AL('VERTICAL', { name: 'opts', itemSpacing: 10 }); add(b, o, true); for (const x of list) add(o, x, true); return o; };
function sceneScreen(name, n, key, mooca, left, st, q, list, extra = {}) {
  const sc = Screen(name); Top(sc, { n }); const s = Scene(sc, key, { mooca, left, ...extra }); const b = Body(sc);
  const t = story(b, st); if (extra.boldWord) bold(t, extra.boldWord); ask(b, q); opts(b, list); return { sc, s };
}

// 01 intro
const I = Screen('01 · intro', LG([[0,'#D7FFFC'],[0.45,'#E0FEFB'],[1,'#FFFFFF']]));
const hero = AL('VERTICAL', { name: 'hero', ...pad(64,0,8,0) }); I.appendChild(hero); const hm = MOOCA('Happy'); hm.resize(220, 190); hero.appendChild(hm);
const ic = AL('VERTICAL', { name: 'copy', itemSpacing: 8, counterAxisAlignItems: 'CENTER', ...pad(8,24,0,24) }); add(I, ic, true);
add(ic, T('มีร้านลับเล็กๆ\nรอคุณอยู่ระหว่างทาง', { size: 26, w: 600, lh: 36, color: '#000000', align: 'CENTER', width: 312 }), true);
add(ic, T('ว่ากันว่าร้านนี้จะปรากฏให้เห็น เฉพาะคนที่กำลังแบกอะไรบางอย่างไว้ในใจ\nไม่มีคำตอบถูกหรือผิด แค่เลือกสิ่งที่ใกล้ใจที่สุด', { size: 15, lh: 24, color: '#528984', align: 'CENTER', width: 304 }), true);
const chips = AL('HORIZONTAL', { name: 'chips', itemSpacing: 8, ...pad(10,0,0,0) }); ic.appendChild(chips);
for (const c of ['~2 นาที', 'ไม่เก็บข้อมูล', 'ไม่ใช่การวินิจฉัย']) { const k = AL('HORIZONTAL', { name: 'chip', cornerRadius: 24, ...pad(5,10,5,10) }); k.fills = S('#FFFFFF'); k.strokes = S('#B3EDE8'); k.strokeWeight = 1; k.appendChild(T(c, { size: 12, color: '#3F6866' })); chips.appendChild(k); }
spacer(I);
const ib = AL('VERTICAL', { name: 'bottom', itemSpacing: 10, ...pad(20,20,24,20) }); add(I, ib, true);
add(ib, Btn('เริ่มเดิน'), true); add(ib, T('ไม่ต้องสมัคร ไม่ต้องพิมพ์อะไร', { size: 12, color: '#3F6866', align: 'CENTER', width: 320 }), true);

// 02 opening
const O = Screen('02 · opening'); Top(O, {}); Scene(O, 'road', { h: 330, mooca: 'Sad', rain: 34 });
const ob = Body(O, { pt: 20 }); add(ob, T('เย็นวันธรรมดา ฝนตกปรอยๆ\nคุณเดินกลับบ้านทางเดิมที่ผ่านทุกวัน…', { size: 18, lh: 30, align: 'CENTER', width: 320 }), true); spacer(ob); add(ob, Btn('เดินต่อ', 'Outline'), true);

// 03 door
const D = sceneScreen('03 · door 1/5 ★', 1, 'door', 'Sad', true, 'ซอกตึกที่ผ่านทุกวัน วันนี้มีร้านเล็กๆ ที่ไม่เคยเห็นมาก่อน แสงข้างในวิบวับ', 'คุณจะ…',
  [Opt('ผลักประตูเข้าไปเลย'), Opt('แง้มประตูดูก่อน'), Opt('ยืนมองผ่านกระจกอยู่นาน'), Opt('เดินผ่านไป วันนี้ยังไม่ใช่วัน', 'Ghost')], { rain: 26 });
const sign = AL('HORIZONTAL', { name: 'sign', cornerRadius: 8, ...pad(1,10,1,10) }); sign.fills = S('#FFFFFF'); sign.appendChild(T('เปิดอยู่', { size: 9, w: 400, color: '#009688' })); D.s.appendChild(sign); sign.x = 197; sign.y = 96;

// 04 pass (A)
const P = Screen('04 · pass (ทางแยก A)'); Top(P, {}); Scene(P, 'doorbox', { mooca: 'Hug', rain: 14 });
const pb = Body(P); story(pb, 'คุณเดินผ่านไปได้ไม่กี่ก้าว ก็ได้ยินเสียงกระดิ่งเบาๆ'); story(pb, 'เจ้าของร้านวางกล่องเล็กๆ ไว้หน้าประตู พร้อมโน้ตเขียนว่า');
ask(pb, '"ร้านนี้จะอยู่ตรงนี้ จนกว่าคุณจะพร้อม"', { color: '#355956' }); spacer(pb); add(pb, Btn('เปิดกล่อง'), true);

// 05 shelf
sceneScreen('05 · shelf 2/5', 2, 'shelf', 'Hug', true, 'ชั้นวางเต็มไปด้วยของแปลกๆ ที่ส่องแสงจางๆ', 'ของชิ้นไหนดึงสายตาคุณก่อน?',
  [Opt('ขวดแก้วที่มีเมฆฝนลอยอยู่ข้างใน'), Opt('เข็มทิศที่เข็มหมุนไม่หยุด'), Opt('นาฬิกาทรายที่ทรายไหลเร็วผิดปกติ'), Opt('โคมไฟดวงเล็กที่แสงริบหรี่'), Opt('ขนนกที่ลอยอยู่เฉยๆ เบาสบาย')], { top: '#1F3B39' });

// 06 mirror
const M = sceneScreen('06 · mirror 3/5 ★', 3, 'mirror', null, true, 'มุมร้านมีกระจกบานเก่า ว่ากันว่ามันสะท้อนข้างในของคนที่ยืนอยู่', 'คุณเห็นตัวเองเป็นแบบไหน?',
  [Opt('คนที่ดูเหนื่อยกว่าที่ตัวเองคิด'), Opt('คนที่พยายามยิ้มให้ทุกคน'), Opt('ภาพเบลอๆ มองไม่ชัดว่าเป็นใคร'), Opt('คนที่มาไกลกว่าที่ตัวเองคิด')], { boldWord: 'ข้างใน', top: '#1A3331' });
const refl = MOOCA('Sad'); refl.name = 'reflection (Sad Mooca ในกระจก)'; refl.resize(96, 88); M.s.appendChild(refl); refl.x = 116; refl.y = 104; refl.opacity = 0.75;
const gl = figma.createNodeFromSvg(svg(SVG.glare)); gl.name = 'glare'; M.s.appendChild(gl); gl.x = 0; gl.y = 0;
const mo = MOOCA('Hug'); mo.resize(92, 84); M.s.appendChild(mo); mo.x = 8; mo.y = 160;

// 07 shop
const SH7 = sceneScreen('07 · shop 4/5', 4, 'shop', 'Happy', false, 'เจ้าของร้าน (พระอาทิตย์ดวงเล็ก) มองของในมือคุณ แล้วถามเบาๆ', 'คุณตอบว่า…',
  [Opt('เล่าออกไปตรงๆ'), Opt('"ก็เรื่อยๆ" แล้วยิ้ม'), Opt('อยากเล่า แต่ไม่รู้จะเริ่มตรงไหน'), Opt('เปลี่ยนไปคุยเรื่องอื่น')], { top: '#1F3B39' });
const bub = T('"ชิ้นนี้หนักนะ แบกมาไกลไหม?\nอยากเล่าให้ฟังหน่อยไหม"', { size: 13, lh: 20, w: 400, color: '#355956', align: 'CENTER', width: 196 }); bub.name = 'speech'; SH7.s.appendChild(bub); bub.x = 24; bub.y = 33;

// 08 gift
sceneScreen('08 · gift 5/5', 5, 'gift', 'Hug', false, 'ฝนซาแล้ว เจ้าของร้านให้เลือกของติดตัวไปหนึ่งชิ้น ไม่คิดเงิน', 'คุณเลือกอะไร?',
  [Opt('ร่มที่กางออกเองเวลาฝนตก'), Opt('กระติกชาที่อุ่นอยู่เสมอ'), Opt('จดหมายผนึก "เปิดเมื่อพร้อม"'), Opt('ไม่เป็นไร แค่ได้แวะก็พอแล้ว')], { top: '#E0F3F3' });

// 09 check
const C = Screen('09 · check'); Top(C, { right: 'เกือบเสร็จแล้ว' });
const cb = Body(C, { pt: 28 }); story(cb, 'ก่อนดูของที่คุณได้จากร้าน ขอถามตรงๆ หนึ่งข้อนะ', { color: '#3F6866' });
ask(cb, 'ช่วงนี้ใจคุณหนักแค่ไหน?', { size: 22, lh: 32, color: '#000000' });
opts(cb, [Opt('เบาสบาย ฟ้าใส', 'Default', '#FFE27A'), Opt('มีเมฆบ้าง แต่ยังไหว', 'Default', '#C7DDF7'), Opt('ครึ้มหนัก ฝนตกมาหลายวัน', 'Default', '#8FBBEF'), Opt('หนักมาก จนบางครั้งคิดว่าไม่อยากมีชีวิตอยู่', 'Danger', '#EF7773')]);
spacer(cb); add(cb, T('คำตอบนี้ใช้แค่แสดงผลบนเครื่องคุณ ไม่มีการบันทึก', { size: 12, color: '#3F6866', align: 'CENTER', width: 320 }), true);

// 10 result
const R = Screen('10 · result ★ (scroll)', LG([[0,'#DBF0EE'],[0.35,'#FFFFFF'],[1,'#FFFFFF']])); R.primaryAxisSizingMode = 'AUTO';
Top(R, { back: '×', link: 'เก็บการ์ด' });
const wr = AL('VERTICAL', { name: 'wrap', itemSpacing: 12, ...pad(4,20,28,20) }); add(R, wr, true);
const kk = AL('VERTICAL', { name: 'sky', itemSpacing: 2 }); add(wr, kk, true);
kk.appendChild(T('ท้องฟ้าในใจวันนี้', { size: 12, color: '#3F6866' })); kk.appendChild(T('เมฆครึ้ม แต่มีแสงลอดผ่าน', { size: 20, w: 600, lh: 28, color: '#000000' }));
const items = AL('HORIZONTAL', { name: 'items', itemSpacing: 10 }); add(wr, items, true);
for (const [ik, sm, nm, bg] of [['jar', 'สิ่งที่คุณแบกมา', 'ขวดเมฆฝน', '#2A4E4B'], ['tea', 'สิ่งที่ใจต้องการ', 'กระติกชาอุ่น', '#00A396']]) {
  const c = AL('VERTICAL', { name: 'item/' + ik, itemSpacing: 4, counterAxisAlignItems: 'CENTER', cornerRadius: 16, ...pad(12,10,14,10) });
  c.fills = S(bg); c.effects = SH(); items.appendChild(c); c.layoutSizingHorizontal = 'FILL';
  const icn = figma.createNodeFromSvg(svg(ICON[ik], 64, 64)); icn.name = 'icon/' + ik; c.appendChild(icn);
  const s1 = T(sm, { size: 11, color: '#FFFFFF' }); s1.opacity = 0.85; c.appendChild(s1); c.appendChild(T(nm, { size: 15, w: 500, color: '#FFFFFF' }));
}
add(wr, T('ช่วงนี้อาจมีความรู้สึกหลายอย่างอัดแน่นอยู่ข้างใน จนหาทางระบายไม่เจอ และใจของคุณอาจกำลังขอเวลาพักสักหน่อย', { size: 16, w: 400, lh: 26, width: 320 }), true);
const meta = AL('HORIZONTAL', { name: 'meta', primaryAxisAlignItems: 'SPACE_BETWEEN', counterAxisAlignItems: 'CENTER' }); add(wr, meta, true);
const why = T('ทำไมถึงได้ของชิ้นนี้?', { size: 13, w: 400, color: '#1868C6' }); why.textDecoration = 'UNDERLINE'; meta.appendChild(why);
const sw = AL('HORIZONTAL', { name: 'swap', cornerRadius: 24, ...pad(4,12,4,12) }); sw.strokes = S('#528984'); sw.strokeWeight = 1; sw.appendChild(T('ไม่ค่อยตรงกับฉัน', { size: 12, color: '#3F6866' })); meta.appendChild(sw);
const tiny = AL('VERTICAL', { name: 'tiny-step', itemSpacing: 10, cornerRadius: 16, ...pad(12,12,12,12) }); tiny.fills = S('#F8E4B3'); add(wr, tiny, true);
const trow = AL('HORIZONTAL', { name: 'row', itemSpacing: 10, counterAxisAlignItems: 'CENTER' }); add(tiny, trow, true);
const tic = AL('HORIZONTAL', { name: 'ic', primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER', cornerRadius: 18 }); tic.fills = S('#F9A000'); tic.resize(36, 36);
const tsv = figma.createNodeFromSvg(svg(ICON.tea, 24, 24)); tic.appendChild(tsv); trow.appendChild(tic);
trow.appendChild(bold(T('สิ่งเล็กๆ ตอนนี้: หายใจช้าๆ ไปพร้อมกับ Mooca 4 รอบ ใช้เวลาแค่ 30 วินาที', { size: 13, lh: 20, color: '#5C3D00', width: 250 }), 'สิ่งเล็กๆ ตอนนี้:'));
const brb = AL('HORIZONTAL', { name: 'btn/breathe', primaryAxisAlignItems: 'CENTER', cornerRadius: 24, ...pad(9,16,9,16) }); brb.fills = S('#FFFFFF'); brb.appendChild(T('เริ่มหายใจ', { size: 14, w: 500, color: '#7A5200' })); add(tiny, brb, true);
const nx = AL('VERTICAL', { name: 'next-step', itemSpacing: 10, cornerRadius: 16, ...pad(14,14,14,14) }); nx.fills = S('#FFFFFF'); nx.strokes = S('#B3EDE8'); nx.strokeWeight = 1.5; add(wr, nx, true);
add(nx, T('อยากรู้จักใจตัวเองให้ชัดขึ้นอีกนิดไหม แบบทดสอบความเครียดของ ooca ใช้เวลาแค่ 4–5 นาที', { size: 14, lh: 22, width: 290 }), true);
add(nx, Btn('ทำแบบทดสอบความเครียด'), true);
const tk = T('หรือคุยกับผู้เชี่ยวชาญ', { size: 13, w: 400, color: '#1868C6', align: 'CENTER', width: 290 }); tk.textDecoration = 'UNDERLINE'; add(nx, tk, true);
add(wr, T('นี่เป็นภาพสะท้อนจากเรื่องเล่า ไม่ใช่การวินิจฉัย', { size: 12, color: '#3F6866', align: 'CENTER', width: 320 }), true);
add(wr, Btn('แวะร้านอีกครั้ง', 'Plain'), true);

// 11 safety
const F = Screen('11 · safety (ทางแยก B)', S('#FFF8F8')); Top(F, {});
const fh = AL('VERTICAL', { name: 'hero', ...pad(32,0,0,0) }); F.appendChild(fh); const fm = MOOCA('Sad'); fm.resize(190, 170); fh.appendChild(fm);
const fc = AL('VERTICAL', { name: 'copy', itemSpacing: 6, counterAxisAlignItems: 'CENTER', ...pad(12,28,18,28) }); add(F, fc, true);
add(fc, T('ขอบคุณที่บอกเรานะ', { size: 22, w: 600, lh: 32, color: '#000000', align: 'CENTER', width: 304 }), true);
add(fc, T('ความรู้สึกนี้หนักจริงๆ และคุณไม่จำเป็นต้องแบกไว้คนเดียว ตอนนี้มีคนพร้อมคุยกับคุณ', { size: 14, lh: 22, align: 'CENTER', width: 304 }), true);
const st = AL('VERTICAL', { name: 'stack', itemSpacing: 10, ...pad(0,20,0,20) }); add(F, st, true);
add(st, Btn('โทร 1323', 'Danger', 'สายด่วนสุขภาพจิต · ฟรี 24 ชม.'), true); add(st, Btn('คุยกับนักจิตวิทยา ooca', 'Outline'), true); add(st, Btn('ถ้าอยู่ในอันตรายตอนนี้ โทร 1669', 'Plain'), true);
spacer(F);
const fb = AL('VERTICAL', { name: 'bottom', ...pad(20,20,24,20) }); add(F, fb, true);
const fl2 = T('ดูของที่ได้จากร้านต่อ', { size: 13, w: 400, color: '#1868C6', align: 'CENTER', width: 320 }); fl2.textDecoration = 'UNDERLINE'; add(fb, fl2, true);

/* ---------- layout screens + notes ---------- */
const NOTES = [
 'ชิป 3 อันลดความกังวลตั้งแต่แรก: ~2 นาที / ไม่เก็บข้อมูล / ไม่ใช่การวินิจฉัย · ปุ่มหลัก pill #009688 19/600 (ผ่าน WCAG) · Mooca Happy ต้อนรับ',
 'ไม่มีตัวเลือก — ฉากเปิดพาเข้าเรื่อง ไปต่อเองใน 3.5 วิ หรือกด "เดินต่อ" · Mooca Sad เดินตากฝน สะท้อนวันธรรมดาที่เหนื่อย',
 '★ วัดการเข้าหาความช่วยเหลือ · ตัวเลือกสุดท้ายเป็นเส้นประ = ทางออกที่ไม่ผิด → ทางแยก A · เลือกแล้วตัวเลือกอื่นจาง 45% แล้วไปต่อใน 0.4 วิ',
 'ทางแยก A: เคารพการยังไม่พร้อม — ร้านทิ้งกล่องไว้ให้ "ร้านนี้จะอยู่ตรงนี้ จนกว่าคุณจะพร้อม" แล้วข้ามไปเลือกของฝาก',
 'วัดสิ่งที่แบกอยู่: อัดแน่น / สับสน / ถูกเร่ง / หมดแรง / ใจเบา · ของแต่ละชิ้นมีแอนิเมชันเล็กๆ (เข็มหมุน แสงริบหรี่ ขนนกลอย)',
 '★ วัดมุมมองต่อตัวเอง · ข้างนอก Mooca ยิ้ม ข้างในกระจกเป็น Sad Mooca · เลือกแล้วภาพในกระจกเปลี่ยน: มาไกล → Happy, เบลอ → จาง+blur, อื่นๆ → Sad',
 'วัดความพร้อมจะเล่า · ของจากชั้นวางมาอยู่บนเคาน์เตอร์ · ถ้าเลือกขนนก เจ้าของร้านทักว่า "ชิ้นนี้เบาดีนะ วันนี้เป็นยังไงบ้าง?"',
 'วัดสิ่งที่ใจต้องการ: มีคนช่วย / พัก / เข้าใจตัวเอง / โอเค · ฉากสว่างขึ้น ฝนซา = จังหวะผ่อนก่อนเห็นผล',
 'ถามตรง 1 ข้อเพื่อเลือก next step · ข้อสุดท้ายสีแดง #C64A46 → ทางแยก B หน้าความปลอดภัย · คำตอบอยู่บนเครื่องเท่านั้น',
 '★ ลำดับ: ท้องฟ้าในใจ → การ์ด 2 ใบ → สรุป 1 ประโยค → "ทำไมถึงได้ของชิ้นนี้?" → "ไม่ค่อยตรงกับฉัน" → สิ่งเล็กๆ ทำได้ทันที → next step ตามระดับ · ตัวอย่าง: ขวดเมฆฝน + กระติกชา ระดับกลาง',
 'ทางแยก B: ขอบคุณก่อน ไม่ตกใจแทนผู้ใช้ · ปุ่มโทร 1323 เด่นสุด (ฟรี 24 ชม.) · คุยกับนักจิตวิทยา ooca · 1669 กรณีอันตราย · ยังกลับไปดูของจากร้านได้'
];
const sy = flow.y + flow.height + 200;
const sl = T('Screens · มือถือ 360×760  (★ = hi-fi)', { size: 28, w: 600, color: '#000000' }); sl.x = X0; sl.y = sy - 70; TOP.push(sl);
let bottom = 0;
SCR.forEach((f, i) => { f.x = X0 + i * 420; f.y = sy; const n = T(NOTES[i], { size: 13, lh: 20, color: '#3F6866', width: 360 }); n.name = 'note/' + f.name; n.x = f.x; n.y = sy + f.height + 24; TOP.push(n); bottom = Math.max(bottom, n.y + n.height); });
comps.x = X0; comps.y = bottom + 200;

const out = { font: FAM, weights: W, screens: SCR.map(f => ({ id: f.id, name: f.name, h: Math.round(f.height) })), prob: prob.id, flow: flow.id, components: { option: optSet.id, button: btnSet.id, mooca: mSet.id, frame: comps.id }, topCount: TOP.length };
await D.sc.screenshot(); await M.sc.screenshot(); await R.screenshot(); await flow.screenshot();
return out;
} catch (e) { for (const n of TOP) { try { n.remove(); } catch (_) {} } throw e; }
