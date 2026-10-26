// ตรรกะล้วนของ flow (ไม่แตะ DOM) แยกไว้เพื่อให้ทดสอบได้
const Logic = {
  TOTAL: 5,
  // ประตู: "เดินผ่านไป" แยกไปทางแยก A
  afterDoor: v => v === 'pass' ? 'pass' : 'shelf',
  // เช็กใจ: ระดับ 3 (หนักมาก) ไปหน้าความปลอดภัยทันที
  afterCheck: c => c === 3 ? 'safety' : 'loading',
  // ของที่แบกมา: ถ้าเดินผ่านประตูไป ใช้การ์ด "ประตูที่ยังไม่เปิด"
  carryKey: a => a.door === 'pass' ? 'pass' : a.shelf,
  wantsTalk: a => ['stuck', 'open'].includes(a.shop) || a.gift === 'umbrella',
  // next step ตามระดับ: เบา = ชวนกลับมา, กลาง = แบบทดสอบ (หรือผู้เชี่ยวชาญถ้าอยากเล่า), หนัก = ผู้เชี่ยวชาญ + 1323
  nextStep(c, a) {
    if (c >= 2 || (c === 1 && Logic.wantsTalk(a))) return { kind: 'talk', hotline: c >= 2 };
    if (c === 1) return { kind: 'test', hotline: false };
    return { kind: 'light', hotline: false };
  },
  progress: n => Math.round(n / Logic.TOTAL * 100),
  // สลับของบนการ์ด ("ไม่ค่อยตรงกับฉัน") คืน state ใหม่โดยไม่แก้ของเดิม
  swapCarry(a, k) {
    if (k === 'pass') return { ...a, door: 'pass' };
    return { ...a, door: a.door === 'pass' ? 'peek' : a.door, shelf: k };
  }
};
if (typeof module !== 'undefined') module.exports = Logic;
