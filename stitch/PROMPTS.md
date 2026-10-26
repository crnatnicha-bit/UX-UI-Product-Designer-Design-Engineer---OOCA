# Stitch prompts — ร้านลับริมทาง

ใช้กับ https://stitch.withgoogle.com (โหมด **Mobile**) วาง **Style prompt** ก่อน แล้วสร้างทีละจอด้วยพรอมต์ของแต่ละจอ
แนบรูป `assets/mooca-hug.png`, `mooca-happy.png`, `mooca-sad.png` เป็นรูปอ้างอิงได้ (ใช้ได้เฉพาะงาน assignment นี้)
เมื่อเสร็จ ใช้ **Copy to Figma** ของ Stitch เพื่อส่งเข้าไฟล์ Figma (ลิงก์ที่ต้องส่ง ooca)

---

## Style prompt (ใช้ครั้งแรก)

```
Mobile app, 360x760, Thai language UI. Brand: ooca (Thai mental-health platform).
Font: Prompt ONLY (no Noto Sans Thai, no Public Sans). Use exactly this type scale and no other sizes:
display 24/600, title & question 18/600, primary button 19/600, body 16/300, UI & options 15/500,
small 14, caption 12/500, micro 10. Text colors: #1E2B2A headings, #355956 body, #3F6866 secondary,
#5C7472 captions, #00796B turquoise text, #1868C6 options & links. Icons: Material Symbols Outlined only.
Colors: primary turquoise #00C4B3, primary button #009688 with white 19px semibold text,
option/link blue #1868C6, text gray #355956 and #3F6866, danger #C64A46, marigold #F9A000 / #F8E4B3,
light turquoise #DBF0EE / #B3EDE8, page bg white, soft gradient #D7FFFC→#FFFFFF.
Shapes: every tappable element is a pill (radius 24), cards radius 16–24, never sharp corners.
Shadows tinted turquoise: 0 8px 16px rgba(0,196,179,0.12).
Mascot "Mooca" (official ooca CI — match exactly, NOT a furry monster, no horns, no fur, no watercolor):
a fluffy white cumulus cloud as the big head (bumpy outline, light lavender-blue outline/shadow #C9D3EA),
short white rounded body with stubby arms and legs, two small navy dot eyes #1F4FA8, small curved smile,
pink blush cheeks, mustard-orange knitted scarf #F2A81D with fringe.
Friend "Sunny": small round yellow sun #FFE45C, orange outline and short rays, rosy cheeks, tiny arms.
Poses: HAPPY (rainbow behind, Sunny waving) / HUGGING Sunny / SAD (cloud turns lavender #C5C9EA,
one blue teardrop, Sunny comforting on its head). Style: clean flat 2D vector, pastel, sticker-like.
Use the attached images.
Tone: gentle, storybook, calm, no clinical language. Illustrated scene card (328x250, radius 24) on top,
story text and pill answer options below. Answer options: white pill, 1.5px #1868C6 border, blue centered text.
Top bar: round back button (36px, #F6F6F6), thin turquoise progress bar, "n/5" label.
```

## 01 · Intro
```
Intro screen. Soft turquoise-to-white gradient background. Large Mooca (happy, with sun and rainbow) centered near top.
Title (black, centered): "มีร้านลับเล็กๆ รอคุณอยู่ระหว่างทาง"
Body (teal gray, centered): "ว่ากันว่าร้านนี้จะปรากฏให้เห็น เฉพาะคนที่กำลังแบกอะไรบางอย่างไว้ในใจ ไม่มีคำตอบถูกหรือผิด แค่เลือกสิ่งที่ใกล้ใจที่สุด"
Three small outlined chips: "~2 นาที" "ไม่เก็บข้อมูล" "ไม่ใช่การวินิจฉัย".
Bottom: full-width primary pill button "เริ่มเดิน", caption "ไม่ต้องสมัคร ไม่ต้องพิมพ์อะไร".
```

## 02 · Opening (ไม่มีตัวเลือก)
```
Opening scene, no choices. Tall illustrated card: rainy grey-blue city street at dusk, rain streaks, sad Mooca walking.
Centered story text 18px: "เย็นวันธรรมดา ฝนตกปรอยๆ คุณเดินกลับบ้านทางเดิมที่ผ่านทุกวัน…"
Bottom outlined turquoise pill button "เดินต่อ". Top bar with back button only.
```

## 03 · Door 1/5 ★ (hi-fi)
```
Progress 1/5. Illustrated card: a tiny magical shop squeezed between buildings in the rain — dark teal storefront,
turquoise awning, warm glowing window with sparkles, arched door with a small white sign "เปิดอยู่". Sad Mooca at the left.
Story: "ซอกตึกที่ผ่านทุกวัน วันนี้มีร้านเล็กๆ ที่ไม่เคยเห็นมาก่อน แสงข้างในวิบวับ"
Question (blue): "คุณจะ…"
Options: "ผลักประตูเข้าไปเลย" / "แง้มประตูดูก่อน" / "ยืนมองผ่านกระจกอยู่นาน" /
last option dashed gray border (a gentle way out): "เดินผ่านไป วันนี้ยังไม่ใช่วัน"
```

## 04 · Pass (ทางแยก A)
```
Illustrated card: same shop door with a small marigold gift box and a note left on the doorstep, light rain. Mooca hugging sun.
Text: "คุณเดินผ่านไปได้ไม่กี่ก้าว ก็ได้ยินเสียงกระดิ่งเบาๆ" / "เจ้าของร้านวางกล่องเล็กๆ ไว้หน้าประตู พร้อมโน้ตเขียนว่า"
Quote (18px medium, dark teal): "ร้านนี้จะอยู่ตรงนี้ จนกว่าคุณจะพร้อม"
Primary pill button "เปิดกล่อง".
```

## 05 · Shelf 2/5
```
Progress 2/5. Dark teal shop interior with two shelves of glowing curious objects: a glass jar with a rain cloud inside,
a compass spinning, an hourglass with fast sand, a dim little lantern, a floating white feather. Mooca hugging sun at left.
Story: "ชั้นวางเต็มไปด้วยของแปลกๆ ที่ส่องแสงจางๆ"  Question: "ของชิ้นไหนดึงสายตาคุณก่อน?"
Options: "ขวดแก้วที่มีเมฆฝนลอยอยู่ข้างใน" / "เข็มทิศที่เข็มหมุนไม่หยุด" / "นาฬิกาทรายที่ทรายไหลเร็วผิดปกติ" /
"โคมไฟดวงเล็กที่แสงริบหรี่" / "ขนนกที่ลอยอยู่เฉยๆ เบาสบาย"
```

## 06 · Mirror 3/5 ★ (hi-fi)
```
Progress 3/5. Dark teal room, an old arched mirror with a marigold frame and pale turquoise glass with light glare.
Outside the mirror: smiling Mooca at bottom-left. Inside the mirror reflection: a faded SAD Mooca (purple cloud) — contrast is the point.
Story: "มุมร้านมีกระจกบานเก่า ว่ากันว่ามันสะท้อน**ข้างใน**ของคนที่ยืนอยู่"  Question: "คุณเห็นตัวเองเป็นแบบไหน?"
Options: "คนที่ดูเหนื่อยกว่าที่ตัวเองคิด" / "คนที่พยายามยิ้มให้ทุกคน" / "ภาพเบลอๆ มองไม่ชัดว่าเป็นใคร" / "คนที่มาไกลกว่าที่ตัวเองคิด"
(Variant: after choosing "มาไกล…" the reflection becomes happy Mooca; "ภาพเบลอ" → blurred and faded.)
```

## 07 · Shop owner 4/5
```
Progress 4/5. Cozy counter scene; the rain-cloud jar sits on the counter. White speech bubble from the shop owner (a small sun):
"ชิ้นนี้หนักนะ แบกมาไกลไหม? อยากเล่าให้ฟังหน่อยไหม". Happy Mooca at right.
Story: "เจ้าของร้าน (พระอาทิตย์ดวงเล็ก) มองของในมือคุณ แล้วถามเบาๆ"  Question: "คุณตอบว่า…"
Options: "เล่าออกไปตรงๆ" / "\"ก็เรื่อยๆ\" แล้วยิ้ม" / "อยากเล่า แต่ไม่รู้จะเริ่มตรงไหน" / "เปลี่ยนไปคุยเรื่องอื่น"
```

## 08 · Gift 5/5
```
Progress 5/5. Bright after-rain scene, pale turquoise sky, warm yellow sun, soft hills. Mooca hugging sun at right.
Story: "ฝนซาแล้ว เจ้าของร้านให้เลือกของติดตัวไปหนึ่งชิ้น ไม่คิดเงิน"  Question: "คุณเลือกอะไร?"
Options: "ร่มที่กางออกเองเวลาฝนตก" / "กระติกชาที่อุ่นอยู่เสมอ" / "จดหมายผนึก \"เปิดเมื่อพร้อม\"" / "ไม่เป็นไร แค่ได้แวะก็พอแล้ว"
```

## 09 · Check (เช็กใจ 1 ข้อ)
```
Plain white screen, top bar with back button and small label "เกือบเสร็จแล้ว".
Small gray intro: "ก่อนดูของที่คุณได้จากร้าน ขอถามตรงๆ หนึ่งข้อนะ"  Big black question 22px: "ช่วงนี้ใจคุณหนักแค่ไหน?"
Four left-aligned pill options, each with a colored dot: yellow "เบาสบาย ฟ้าใส" / light blue "มีเมฆบ้าง แต่ยังไหว" /
blue "ครึ้มหนัก ฝนตกมาหลายวัน" / red-bordered danger option with coral dot "หนักมาก จนบางครั้งคิดว่าไม่อยากมีชีวิตอยู่".
Footer caption: "คำตอบนี้ใช้แค่แสดงผลบนเครื่องคุณ ไม่มีการบันทึก"
```

## 10 · Result ★ (hi-fi, scrollable)
```
Result "gift from the shop" screen, top gradient #DBF0EE→white. Top bar: close "×" and link "เก็บการ์ด".
Small label "ท้องฟ้าในใจวันนี้", heading "เมฆครึ้ม แต่มีแสงลอดผ่าน".
Two item cards side by side: dark teal card with rain-cloud jar icon, caption "สิ่งที่คุณแบกมา", name "ขวดเมฆฝน";
turquoise card with warm tea flask icon, caption "สิ่งที่ใจต้องการ", name "กระติกชาอุ่น".
One-sentence summary: "ช่วงนี้อาจมีความรู้สึกหลายอย่างอัดแน่นอยู่ข้างใน จนหาทางระบายไม่เจอ และใจของคุณอาจกำลังขอเวลาพักสักหน่อย"
Row: underlined blue link "ทำไมถึงได้ของชิ้นนี้?" and small outlined chip "ไม่ค่อยตรงกับฉัน".
Marigold card (#F8E4B3): orange circle icon + "สิ่งเล็กๆ ตอนนี้: หายใจช้าๆ ไปพร้อมกับ Mooca 4 รอบ ใช้เวลาแค่ 30 วินาที", white pill "เริ่มหายใจ".
Next-step card with turquoise border: "อยากรู้จักใจตัวเองให้ชัดขึ้นอีกนิดไหม แบบทดสอบความเครียดของ ooca ใช้เวลาแค่ 4–5 นาที",
primary button "ทำแบบทดสอบความเครียด", link "หรือคุยกับผู้เชี่ยวชาญ".
Caption "นี่เป็นภาพสะท้อนจากเรื่องเล่า ไม่ใช่การวินิจฉัย", text button "แวะร้านอีกครั้ง".
```

## 11 · Safety (ทางแยก B)
```
Very light pink background #FFF8F8. Sad Mooca being comforted by the sun, centered.
Heading: "ขอบคุณที่บอกเรานะ"  Body: "ความรู้สึกนี้หนักจริงๆ และคุณไม่จำเป็นต้องแบกไว้คนเดียว ตอนนี้มีคนพร้อมคุยกับคุณ"
Stack: red pill button #C64A46 "โทร 1323" with sub-line "สายด่วนสุขภาพจิต · ฟรี 24 ชม." /
outlined turquoise pill "คุยกับนักจิตวิทยา ooca" / plain text button "ถ้าอยู่ในอันตรายตอนนี้ โทร 1669".
Bottom link: "ดูของที่ได้จากร้านต่อ". Calm, not alarming.
```
