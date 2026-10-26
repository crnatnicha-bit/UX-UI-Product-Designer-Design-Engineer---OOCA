// หน้าจอและ flow ของ "ร้านลับริมทาง" — ใช้คอมโพเนนต์จาก components.js และตรรกะจาก logic.js
// ภาพฉากจาก Stitch v2 (มี Mooca อยู่ในภาพแล้ว) ให้ demo ตรงกับดีไซน์ใน Stitch
const SCENE = Object.fromEntries(['intro','road','door','pass','shelf','mirror','shop','gift','safety'].map(k=>[k,`assets/scenes/${k}.jpg`]));

/* ---------- story data ---------- */
// ฉากถนนเป็นแอนิเมชันเปิดเรื่อง (ไม่มีตัวเลือก) — ผู้ใช้เลือกจริง 5 ครั้ง
// ตัวเลือก: [ค่า, ข้อความ, ไอคอน, คลาส]
const SCENES = {
door:{n:1,rain:26,mooca:['sad','left'],alt:'Mooca ยืนตากฝนหน้าร้านเล็กๆ ที่มีแสงวิบวับ',badges:[['tl','drop','ฝนตกปรอยๆ'],['br','sun','แสงอบอุ่น']],story:'ซอกตึกที่ผ่านทุกวัน วันนี้มีร้านเล็กๆ ที่ไม่เคยเห็นมาก่อน แสงข้างในวิบวับลอดผ่านละอองฝน',ask:'คุณจะ…',
  opts:[['in','ผลักประตูเข้าไปเลย','door'],['peek','แง้มประตูดูก่อน','eye'],['look','ยืนมองผ่านกระจกอยู่นาน','window'],['pass','เดินผ่านไป วันนี้ยังไม่ใช่วัน','walk','ghost']],next:Logic.afterDoor},
shelf:{n:2,mooca:['hug','left'],alt:'ชั้นวางของในร้าน มีขวดเมฆฝน เข็มทิศ นาฬิกาทราย โคมไฟ และขนนก',story:'ชั้นวางเต็มไปด้วยของแปลกๆ ที่ส่องแสงจางๆ',ask:'ของชิ้นไหนดึงสายตาคุณก่อน?',
  opts:[['jar','ขวดแก้วที่มีเมฆฝนลอยอยู่ข้างใน','rain'],['compass','เข็มทิศที่เข็มหมุนไม่หยุด','compass'],['hourglass','นาฬิกาทรายที่ทรายไหลเร็วผิดปกติ','hourglass'],['lantern','โคมไฟดวงเล็กที่แสงริบหรี่','lamp'],['feather','ขนนกที่ลอยอยู่เฉยๆ เบาสบาย','feather']],next:()=>'mirror'},
mirror:{n:3,reflect:true,mooca:['hug','left'],alt:'Mooca ยิ้มอยู่หน้ากระจกบานเก่า แต่ภาพในกระจกดูเศร้า',story:'มุมร้านมีกระจกบานเก่า ว่ากันว่ามันสะท้อน<b>ข้างใน</b>ของคนที่ยืนอยู่',ask:'คุณเห็นตัวเองเป็นแบบไหน?',
  opts:[['tired','คนที่ดูเหนื่อยกว่าที่ตัวเองคิด','tired'],['smile','คนที่พยายามยิ้มให้ทุกคน','smile'],['blur','ภาพเบลอๆ มองไม่ชัดว่าเป็นใคร','blur'],['good','คนที่มาไกลกว่าที่ตัวเองคิด','star']],next:()=>'shop'},
shop:{n:4,bubble:true,mooca:['happy','right'],alt:'เคาน์เตอร์ร้าน มีขวดเมฆฝนวางอยู่ Mooca ยิ้มอยู่ข้างๆ',story:'เจ้าของร้าน (พระอาทิตย์ดวงเล็ก) มองของในมือคุณ แล้วถามเบาๆ',ask:'คุณตอบว่า…',
  opts:[['open','เล่าออกไปตรงๆ','msg'],['fine','"ก็เรื่อยๆ" แล้วยิ้ม','smile'],['stuck','อยากเล่า แต่ไม่รู้จะเริ่มตรงไหน','rain'],['change','เปลี่ยนไปคุยเรื่องอื่น','shuffle']],next:()=>'gift'},
gift:{n:5,mooca:['hug','right'],alt:'ฟ้าเปิดหลังฝน มีร่ม กระติกชา และจดหมายวางบนม้านั่ง',badges:[['tl','star','ของขวัญก่อนลา'],['br','sun','ฟ้าเปิดแล้ว']],story:'ฝนซาแล้ว เจ้าของร้านให้เลือกของติดตัวไปหนึ่งชิ้น ไม่คิดเงิน',ask:'คุณเลือกอะไร?',
  opts:[['umbrella','ร่มที่กางออกเองเวลาฝนตก','umbrella'],['tea','กระติกชาที่อุ่นอยู่เสมอ','cup'],['letter','จดหมายผนึก "เปิดเมื่อพร้อม"','letter'],['none','ไม่เป็นไร แค่ได้แวะก็พอแล้ว','heart']],next:()=>'check'}
};

// ทุกความหมายใช้คำว่า "อาจ" — เป็นภาพสะท้อน ไม่ใช่การตัดสิน
const CARRY={
  jar:{name:'ขวดเมฆฝน',icon:'jar',sub:'ความรู้สึกที่อัดแน่น',mean:'ช่วงนี้อาจมีความรู้สึกหลายอย่างอัดแน่นอยู่ข้างใน จนหาทางระบายไม่เจอ'},
  compass:{name:'เข็มทิศหมุนไม่หยุด',icon:'compass',sub:'ความสับสน',mean:'ช่วงนี้คุณอาจกำลังสับสน ไม่แน่ใจว่าควรไปทางไหนต่อ'},
  hourglass:{name:'นาฬิกาทรายเร่งเวลา',icon:'hourglass',sub:'การถูกเร่ง',mean:'ช่วงนี้คุณอาจรู้สึกถูกเร่ง เหมือนเวลาไม่เคยพอสักที'},
  lantern:{name:'โคมไฟแสงริบหรี่',icon:'lantern',sub:'แรงใจที่ลดลง',mean:'แรงใจของคุณอาจค่อยๆ หมดลง เหมือนใช้พลังมานานโดยไม่ได้เติม'},
  feather:{name:'ขนนกลอยเบาๆ',icon:'feather',sub:'ใจที่เบาสบาย',mean:'วันนี้ใจของคุณอาจค่อนข้างเบา และนั่นเป็นเรื่องดี'},
  pass:{name:'ประตูที่ยังไม่เปิด',icon:'closed',sub:'ยังไม่พร้อมก็ไม่เป็นไร',mean:'อาจมีบางเรื่องที่ยังไม่พร้อมจะมองตรงๆ และนั่นก็ไม่เป็นไรเลย'}
};
const GIFT={
  umbrella:{name:'ร่มที่กางเอง',icon:'umbrella',sub:'อยากมีคนช่วยบังฝน',mean:'คุณอาจอยากมีใครสักคนช่วยบังฝนให้บ้าง'},
  tea:{name:'กระติกชาอุ่น',icon:'tea',sub:'การพักที่อบอุ่น',mean:'ใจของคุณอาจกำลังขอเวลาพักสักหน่อย'},
  letter:{name:'จดหมายเปิดเมื่อพร้อม',icon:'letter',sub:'อยากเข้าใจตัวเอง',mean:'คุณอาจอยากเข้าใจตัวเองให้มากขึ้นอีกนิด'},
  none:{name:'แค่ได้แวะก็พอ',icon:'none',sub:'วันนี้แค่นี้ก็ดีแล้ว',mean:'แค่ได้หยุดพักระหว่างทาง ก็อาจเพียงพอแล้วสำหรับวันนี้'}
};
const DOOR={in:'คุณผลักประตูเข้าไปเลย',peek:'คุณแง้มประตูดูก่อน',look:'คุณยืนมองอยู่นานก่อนจะเข้าไป'};
const MIRROR={tired:'ในกระจก คุณเห็น<b>คนที่เหนื่อยกว่าที่ตัวเองคิด</b>',smile:'ในกระจก คุณเห็น<b>คนที่พยายามยิ้มให้ทุกคน</b>',blur:'ในกระจก คุณเห็น<b>ภาพเบลอที่มองไม่ชัดว่าเป็นใคร</b>',good:'ในกระจก คุณเห็น<b>คนที่มาไกลกว่าที่ตัวเองคิด</b> เก็บภาพนั้นไว้นะ'};
// [ท่าในกระจก, คลาสของฉาก, ข้อความ] — ข้างนอก Mooca ยิ้ม ข้างในกระจกเป็น Sad Mooca จนกว่าจะเลือก
const REFLECT={tired:['sad','r-tired','ภาพในกระจกดูเหนื่อยกว่าที่คิด'],smile:['sad','r-tired','ภาพในกระจกยังพยายามยิ้มอยู่'],blur:['hug','r-blur','ภาพยังเบลออยู่ ไม่เป็นไรนะ'],good:['happy','r-good','ภาพในกระจกยิ้มตอบคุณ']};
const SHOP={open:'และคุณกล้าเล่าออกไปตรงๆ',fine:'แต่ยังตอบเจ้าของร้านว่า "ก็เรื่อยๆ"',stuck:'และ<b>อยากเล่า แต่ยังไม่รู้จะเริ่มตรงไหน</b>',change:'และเลือกเปลี่ยนไปคุยเรื่องอื่นก่อน'};
const SKY=['ฟ้าโปร่ง มีเมฆบางๆ','เมฆครึ้ม แต่มีแสงลอดผ่าน','ฝนตกหนักมาหลายวัน','พายุในใจที่หนักมาก'];
const ORDER=['door','shelf','mirror','shop','gift'];

/* ---------- state ---------- */
const app=document.getElementById('app');
let S={a:{},check:null,hist:[]};
let current=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

function go(name,{back=false}={}){
  if(!back&&current) S.hist.push(current);
  current=name;
  const old=app.querySelector('.screen');
  const render=()=>{
    // จอแรกแสดงทันทีโดยไม่ fade-in เพื่อไม่ให้ FCP/LCP ช้า
    const first=!app.firstChild;
    app.innerHTML='';const el=VIEWS[name]();el.classList.add('screen');if(first)el.classList.add('first');if(back)el.classList.add('back-in');app.appendChild(el);el.scrollTop=0;
    // ย้ายโฟกัสไปหัวเรื่องของจอใหม่ เพื่อให้ screen reader อ่านจอใหม่
    const f=el.querySelector('h1,h2,.ask');if(f){f.setAttribute('tabindex','-1');f.focus({preventScroll:true})}
    preloadNext(name);
  };
  if(old&&!reduced){old.classList.add('out');setTimeout(render,200)}else render();
}
function goBack(){const p=S.hist.pop();if(p)go(p,{back:true})}
function h(html){const d=document.createElement('div');d.innerHTML=html.trim();return d.firstElementChild}
function toast(msg){const t=h(UI.Toast(msg));app.appendChild(t);setTimeout(()=>t.remove(),2600)}
// โหลดภาพฉากถัดไปล่วงหน้า เพื่อไม่ให้ภาพกระพริบตอนเปลี่ยนจอ
function preloadNext(name){
  const i=ORDER.indexOf(name); const next=name==='intro'||name==='road'?['road','door']:i>=0?[ORDER[i+1]]:[];
  next.filter(Boolean).forEach(k=>{if(SCENE[k]){const im=new Image();im.decoding='async';im.src=SCENE[k]}});
}
const reset=()=>{S={a:{},check:null,hist:[]};current=null};

function sceneView(key){
  const c=SCENES[key];
  const light=S.a.shelf==='feather';
  const story=key==='gift'&&S.a.door==='pass'?'คุณเปิดกล่องเล็กๆ ข้างในมีของวางอยู่ 4 ชิ้น พร้อมโน้ตว่า "เลือกติดตัวไปหนึ่งชิ้นนะ"':c.story;
  const el=h(`<section>
    ${UI.TopBar(c.n)}
    ${UI.SceneCard({key,bg:SCENE[key],alt:c.alt,badges:c.badges,note:c.reflect})}
    ${c.bubble?UI.SpeechBubble(light?'"ชิ้นนี้เบาดีนะ วันนี้เป็นยังไงบ้าง? เล่าให้ฟังหน่อยได้ไหม"':'"ชิ้นนี้หนักนะ แบกมาไกลไหม? อยากเล่าให้ฟังหน่อยไหม"'):''}
    <div class="story"><p>${story}</p><h2 class="ask">${c.ask}</h2></div>
    ${UI.OptionGroup(c.ask,c.opts.map(([v,label,icon,cls])=>UI.OptionButton({v,label,icon,cls,selected:S.a[key]===v})))}
    ${UI.Footer()}
  </section>`);
  requestAnimationFrame(()=>{const bar=el.querySelector('.progress i');bar&&(bar.style.width=Logic.progress(c.n)+'%')});
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    S.a[key]=b.dataset.v;
    el.querySelector('.opts').classList.add('locked');
    el.querySelectorAll('.opt').forEach(o=>{o.classList.toggle('sel',o===b);o.setAttribute('aria-pressed',o===b)});
    let wait=420;
    if(key==='mirror'){
      // ภาพในกระจกเปลี่ยนตามคำตอบ ก่อนไปฉากถัดไป
      const [,cls,note]=REFLECT[b.dataset.v], sc=el.querySelector('.scene'), n=el.querySelector('.mirror-note');
      sc.classList.add(cls); n.textContent=note; n.classList.add('on');
      wait=1600;
    }
    setTimeout(()=>go(c.next(b.dataset.v)),wait);
  });
  return el;
}

const VIEWS={
  intro(){
    const el=h(`<section class="intro">
      ${UI.PlainTop('',{back:false})}
      <div class="hero"><img src="${SCENE.intro}" alt="Mooca กับพระอาทิตย์ Sunny และสายรุ้ง" width="512" height="512" fetchpriority="high"></div>
      <h1>มีร้านลับเล็กๆ<br>รอคุณอยู่ระหว่างทาง</h1>
      <p>ว่ากันว่าร้านนี้จะปรากฏให้เห็น เฉพาะคนที่กำลังแบกอะไรบางอย่างไว้ในใจ ไม่มีคำตอบถูกหรือผิด แค่เลือกสิ่งที่ใกล้ใจที่สุด</p>
      <ul class="chips" aria-label="ก่อนเริ่ม"><li class="chip">${I('clock')}~2 นาที</li><li class="chip">${I('lock')}ไม่เก็บข้อมูล</li><li class="chip">${I('heart')}ไม่ใช่การวินิจฉัย</li></ul>
      <div class="bottom">${UI.Button({label:'เริ่มเดิน',icon:'arrow',attrs:'data-start'})}<p class="fine">ไม่ต้องสมัคร ไม่ต้องพิมพ์อะไร</p></div>
    </section>`);
    el.querySelector('[data-start]').onclick=()=>{reset();go('road')};
    return el;
  },
  road(){
    // ฉากเปิดเรื่อง: ไม่มีตัวเลือก ไปต่อเองหลัง 3.5 วิ หรือแตะเพื่อข้าม (ปิดการไปต่อเองเมื่อผู้ใช้ลดการเคลื่อนไหว)
    const el=h(`<section>
      ${UI.PlainTop()}
      ${UI.SceneCard({key:'road',bg:SCENE.road,alt:'Mooca เดินกลับบ้านคนเดียวกลางสายฝน',tall:true,eager:true})}
      <div class="story"><h2 class="lead-story">เย็นวันธรรมดา ฝนตกปรอยๆ<br>คุณเดินกลับบ้านทางเดิมที่ผ่านทุกวัน…</h2></div>
      <div class="foot" style="padding-top:14px">${UI.Button({label:'เดินต่อ',variant:'outline',icon:'arrow',attrs:'data-next'})}</div>
    </section>`);
    const t=reduced?null:setTimeout(()=>{if(current==='road')go('door')},3500);
    // ยกเลิกการไปต่อเองทันทีที่ผู้ใช้โต้ตอบ (WCAG 2.2.1) ให้กด "เดินต่อ" เองแทน
    ['pointerdown','keydown','focusin'].forEach(ev=>el.addEventListener(ev,()=>clearTimeout(t),{once:true}));
    el.querySelector('[data-next]').onclick=()=>{clearTimeout(t);go('door')};
    return el;
  },
  door:()=>sceneView('door'),shelf:()=>sceneView('shelf'),mirror:()=>sceneView('mirror'),shop:()=>sceneView('shop'),gift:()=>sceneView('gift'),
  pass(){
    // ทางแยก A: ไม่มีแถบความคืบหน้า เพราะไม่ใช่ขั้นที่นับ
    const el=h(`<section>
      ${UI.PlainTop()}
      ${UI.SceneCard({key:'pass',bg:SCENE.pass,alt:'Mooca กอดพระอาทิตย์หน้าประตูร้าน มีกล่องของขวัญวางอยู่'})}
      <div class="story"><p>คุณเดินผ่านไปได้ไม่กี่ก้าว ก็ได้ยินเสียงกระดิ่งเบาๆ เจ้าของร้านวางกล่องเล็กๆ ไว้หน้าประตู พร้อมโน้ตเขียนว่า</p></div>
      <figure class="quote"><blockquote><h2>"ร้านนี้จะอยู่ตรงนี้ จนกว่าคุณจะพร้อม"</h2></blockquote><figcaption>จากเจ้าของร้าน</figcaption></figure>
      <div class="foot">${UI.Button({label:'เปิดกล่อง',icon:'star',attrs:'data-next'})}<span class="brand" aria-hidden="true" style="margin-top:8px">• ooca story space •</span></div>
    </section>`);
    el.querySelector('[data-next]').onclick=()=>go('gift');
    return el;
  },
  check(){
    const lv=[['เบาสบาย ฟ้าใส','#FFC93C'],['มีเมฆบ้าง แต่ยังไหว','#62A0E9'],['ครึ้มหนัก ฝนตกมาหลายวัน','#1868C6'],['หนักมาก จนบางครั้งคิดว่าไม่อยากมีชีวิตอยู่','#C64A46']];
    const el=h(`<section>
      ${UI.PlainTop('<span class="pill-label">เกือบเสร็จแล้ว</span>')}
      <div class="checkhead">
        <p class="lead"><span class="float" aria-hidden="true">${I('sun')}</span>ก่อนดูของที่คุณได้จากร้าน ขอถามตรงๆ หนึ่งข้อนะ</p>
        <h2>ช่วงนี้ใจคุณหนักแค่ไหน?</h2>
      </div>
      ${UI.OptionGroup('ช่วงนี้ใจคุณหนักแค่ไหน?',lv.map(([label,color],i)=>UI.ScaleOption({i,label,color,danger:i===3,selected:S.check===i})))}
      <p class="support" role="status" hidden>${I('heart')}ขอบคุณที่ซื่อสัตย์กับหัวใจตัวเองเสมอ</p>
      <div class="foot"><span class="lockline">${I('lock')}คำตอบนี้ใช้แค่แสดงผลบนเครื่องคุณ ไม่มีการบันทึก</span><span class="brand" aria-hidden="true">• ooca story space •</span></div>
    </section>`);
    el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      S.check=+b.dataset.v;
      el.querySelector('.opts').classList.add('locked');
      el.querySelectorAll('.opt').forEach(o=>{o.classList.toggle('sel',o===b);o.setAttribute('aria-pressed',o===b)});
      el.querySelector('.support').hidden=false;
      setTimeout(()=>go(Logic.afterCheck(S.check)),900);
    });
    return el;
  },
  loading(){
    const el=h(`<section class="loading" role="status"><img src="${IMG.hug}" alt="" width="280" height="217"><p>เจ้าของร้านกำลังห่อของให้คุณ</p><div class="dots" aria-hidden="true"><i></i><i></i><i></i></div></section>`);
    setTimeout(()=>{if(current==='loading'){current=null;go('result')}},1400);
    return el;
  },
  result(){
    const a=S.a, pass=a.door==='pass';
    const carryKey=Logic.carryKey(a);
    const carry=CARRY[carryKey], gift=GIFT[a.gift];
    // สรุป 1 ประโยค (แสดงเสมอ) + รายละเอียดเต็ม (ซ่อนไว้ใน "ทำไมถึงได้ของชิ้นนี้?")
    const summary=`${carry.mean} และ${gift.mean}`;
    let why = pass
      ? `วันนี้คุณเลือกเดินผ่านไปก่อน แต่ก็ยังเปิดกล่องที่ร้านทิ้งไว้ให้`
      : `วันนี้${DOOR[a.door]} หยิบ<b>${carry.name}</b>จากชั้นวาง ${MIRROR[a.mirror]} ${SHOP[a.shop]}`;
    why += ` ก่อนกลับคุณเลือก<b>${gift.name}</b>ติดตัวไป`;
    const carryChoices=(pass?['pass']:[]).concat(['jar','compass','hourglass','lantern','feather']);
    const tiny={
      umbrella:[I('msg'),'1 นาที','ส่งข้อความสั้นๆ หาใครสักคนที่ไว้ใจ แค่ "ช่วงนี้เหนื่อยนิดหน่อย" ก็พอ',''],
      tea:[I('air'),'30 วินาที','หายใจช้าๆ ไปพร้อมกับ Mooca 4 รอบ',`<button class="btn" data-breathe>${I('play')}เริ่มหายใจ</button>`],
      letter:[I('pen'),'1 นาที','เขียน 1 ประโยคว่าอะไรหนักที่สุดในตอนนี้ ไม่ต้องสวย แค่ให้มันออกมาจากหัว','<label class="sr-only" for="oneline">เขียนหนึ่งประโยค</label><textarea id="oneline" rows="2" placeholder="พิมพ์ตรงนี้ได้เลย ข้อความจะไม่ถูกบันทึก"></textarea>'],
      none:[I('star'),'พรุ่งนี้','ลองแวะร้านนี้อีกครั้ง ดูว่าของบนชั้นยังเป็นชิ้นเดิมไหม','']
    }[a.gift];
    const c=S.check, ns=Logic.nextStep(c,a);
    const next={
      talk:`<p>ถ้าอยากมีคนช่วยเรียบเรียงเรื่องที่แบกอยู่ นักจิตวิทยาของ ooca พร้อมฟังโดยไม่ตัดสิน</p>
        ${UI.Button({label:'คุยกับผู้เชี่ยวชาญ',icon:'arrow',attrs:'data-cta="talk"'})}
        <button class="link" data-cta="test">อยากรู้ให้ชัดขึ้น? ทำแบบทดสอบความเครียด (4–5 นาที) ${I('outward')}</button>`,
      test:`<p>อยากรู้จักใจตัวเองให้ชัดขึ้นอีกนิดไหม แบบทดสอบความเครียดของ ooca ใช้เวลาแค่ 4–5 นาที</p>
        ${UI.Button({label:'ทำแบบทดสอบความเครียด',icon:'arrow',attrs:'data-cta="test"'})}
        <button class="link" data-cta="talk">หรือคุยกับผู้เชี่ยวชาญ ${I('outward')}</button>`,
      light:`<p>วันนี้ใจคุณค่อนข้างเบา ดีจังเลย ร้านนี้จะอยู่ตรงนี้เสมอ ถ้าวันไหนฝนตกอีก</p>
        ${UI.Button({label:'ชวนกลับมาแวะสัปดาห์หน้า',variant:'outline',attrs:'data-cta="remind"'})}
        <button class="link" data-cta="test">ทำแบบทดสอบความเครียด (4–5 นาที) ${I('outward')}</button>`
    }[ns.kind] + (ns.hotline?'<p class="hot">ถ้ารู้สึกหนักจนรับมือไม่ไหว โทร <a href="tel:1323">1323</a> ได้ตลอด 24 ชม.</p>':'');
    const el=h(`<section class="result" data-next-kind="${ns.kind}">
      <div class="top"><button class="iconbtn" data-home aria-label="ปิดและกลับหน้าแรก">${I('close')}</button><span class="title">ร้านลับริมทาง</span><button class="savebtn" data-cta="save">${I('bookmark')}เก็บการ์ด</button></div>
      <div class="wrap">
        <div class="skyhead"><span class="tag">${I('sun')}ท้องฟ้าในใจวันนี้</span><h1 class="skyline">“${SKY[c]}”</h1></div>
        <div class="items">
          ${UI.ItemCard({kind:'carry',caption:'สิ่งที่คุณแบกมา',icon:carry.icon,name:carry.name,sub:carry.sub})}
          ${UI.ItemCard({kind:'gift',caption:'สิ่งที่ใจต้องการ',icon:gift.icon,name:gift.name,sub:gift.sub})}
        </div>
        <div class="card">
          <p class="summary">${summary}</p>
          <div class="meta">
            <details class="why"><summary>ทำไมถึงได้ของชิ้นนี้? ${I('help')}</summary><p>${why}</p></details>
            <button class="swapbtn" data-swap aria-expanded="false" aria-controls="swap">ไม่ค่อยตรงกับฉัน</button>
          </div>
          <div class="swap" id="swap" hidden>
            <p style="margin-top:12px">เลือกของที่ใกล้ใจคุณกว่าได้เลย</p>
            <div class="chiprow" role="group" aria-label="สิ่งที่คุณแบกมา">${carryChoices.map(k=>`<button class="pick ${k===carryKey?'on':''}" data-carry="${k}" aria-pressed="${k===carryKey}">${ICON[CARRY[k].icon]}<span>${CARRY[k].name}</span></button>`).join('')}</div>
            <div class="chiprow" role="group" aria-label="สิ่งที่ใจต้องการ">${Object.keys(GIFT).map(k=>`<button class="pick ${k===a.gift?'on':''}" data-gift="${k}" aria-pressed="${k===a.gift}">${ICON[GIFT[k].icon]}<span>${GIFT[k].name}</span></button>`).join('')}</div>
          </div>
        </div>
        <div class="tiny"><div class="row"><span class="ic breathe" aria-hidden="true">${tiny[0]}</span><div><h3>สิ่งเล็กๆ ตอนนี้ <em>${tiny[1]}</em></h3><p>${tiny[2]}</p></div></div>${tiny[3]}</div>
        <div class="next"><span class="lab">พื้นที่ดูแลใจ ooca</span>${next}</div>
      </div>
      <div class="foot">
        <button class="btn plain" data-again style="width:auto">${I('restart')}แวะร้านอีกครั้ง</button>
        <span class="assure" style="color:var(--soft)">นี่เป็นภาพสะท้อนจากเรื่องเล่า ไม่ใช่การวินิจฉัย</span>
        <span class="brand" aria-hidden="true">• ooca story space •</span>
      </div>
    </section>`);
    const msgs={talk:'(ต้นแบบ) จะพาไปหน้าเลือกนักจิตวิทยาของ ooca',test:'(ต้นแบบ) จะพาไปแบบทดสอบความเครียดของ ooca',remind:'(ต้นแบบ) ตั้งเตือนให้กลับมาแวะสัปดาห์หน้า',save:'(ต้นแบบ) บันทึกการ์ดเป็นรูปภาพ'};
    el.querySelectorAll('[data-cta]').forEach(b=>b.onclick=()=>toast(msgs[b.dataset.cta]));
    el.querySelector('[data-again]').onclick=()=>{reset();go('intro')};
    el.querySelector('[data-home]').onclick=()=>{reset();go('intro')};
    const br=el.querySelector('[data-breathe]'); if(br) br.onclick=breathe;
    const sw=el.querySelector('[data-swap]'),panel=el.querySelector('.swap');
    sw.onclick=()=>{panel.hidden=!panel.hidden;sw.setAttribute('aria-expanded',!panel.hidden)};
    const rerender=()=>{const y=el.scrollTop;const n=VIEWS.result();n.classList.add('screen');n.style.animation='none';app.replaceChild(n,el);n.querySelector('.swap').hidden=false;n.querySelector('[data-swap]').setAttribute('aria-expanded','true');n.scrollTop=y};
    el.querySelectorAll('[data-carry]').forEach(b=>b.onclick=()=>{S.a=Logic.swapCarry(S.a,b.dataset.carry);rerender()});
    el.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>{S.a={...S.a,gift:b.dataset.gift};rerender()});
    return el;
  },
  safety(){
    const el=h(`<section class="safety">
      ${UI.PlainTop()}
      <div class="hero"><img src="${SCENE.safety}" alt="พระอาทิตย์ Sunny ปลอบ Mooca ที่กำลังเศร้า" width="512" height="512"><span class="badge" aria-hidden="true">${I('sun')}ปลอดภัยนะ</span></div>
      <h1>ขอบคุณที่บอกเรานะ</h1>
      <p class="lead">ความรู้สึกนี้หนักจริงๆ และคุณไม่จำเป็นต้องแบกไว้คนเดียว ตอนนี้มีคนพร้อมคุยกับคุณ</p>
      <div class="stack">
        <a class="btn red" href="tel:1323"><span>${I('phone')}โทร 1323</span><small>สายด่วนสุขภาพจิต · ฟรี 24 ชม.</small></a>
        <button class="btn outline" data-talk>${I('msg')}คุยกับนักจิตวิทยา ooca</button>
        <a class="btn plain" href="tel:1669" style="text-decoration:underline;text-underline-offset:4px">ถ้าอยู่ในอันตรายตอนนี้ โทร 1669</a>
      </div>
      <div class="cont"><button class="link" data-res>ดูของที่ได้จากร้านต่อ ${I('arrow')}</button></div>
      ${UI.Footer('')}
    </section>`);
    el.querySelector('[data-talk]').onclick=()=>toast('(ต้นแบบ) จะพาไปหน้าเลือกนักจิตวิทยาของ ooca');
    el.querySelector('[data-res]').onclick=()=>go('result');
    return el;
  }
};

function breathe(){
  const opener=document.activeElement;
  const o=h(`<div class="overlay" role="dialog" aria-modal="true" aria-label="หายใจไปพร้อมกับ Mooca"><div class="breath"><img src="${IMG.hug}" alt="" width="280" height="217"></div><p aria-live="polite">หายใจเข้า…</p><small>รอบที่ 1 / 4</small><button class="btn">พอแค่นี้</button></div>`);
  app.appendChild(o);
  const ball=o.querySelector('.breath'),label=o.querySelector('p'),cnt=o.querySelector('small'),btn=o.querySelector('.btn');
  btn.focus();
  let round=1,inhale=true,stop=false;
  const step=()=>{if(stop)return;ball.style.transform=inhale?'scale(1)':'scale(.6)';label.textContent=inhale?'หายใจเข้า…':'หายใจออก…';cnt.textContent=`รอบที่ ${round} / 4`;
    setTimeout(()=>{if(!inhale){round++; if(round>4){label.textContent='เก่งมาก';cnt.textContent='ใจเบาลงอีกนิดแล้ว';btn.textContent='กลับไปที่การ์ด';return}}inhale=!inhale;step()},4000)};
  requestAnimationFrame(()=>requestAnimationFrame(step));
  const close=()=>{stop=true;o.remove();opener&&opener.focus()};
  btn.onclick=close; o.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){e.preventDefault();btn.focus()}});
}

app.addEventListener('click',e=>{
  if(e.target.closest('[data-back]'))goBack();
  // วงแหวนสะท้อนการแตะ 300ms แบบเดียวกับ Stitch
  const t=e.target.closest('.opt,.btn,.pick,.swapbtn,.savebtn');
  if(t){t.classList.remove('tap');void t.offsetWidth;t.classList.add('tap');setTimeout(()=>t.classList.remove('tap'),300)}
});
go('intro');
