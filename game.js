'use strict';
/* ================= كارت الشلة 🐒 — منطق اللعبة ================= */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const toAr = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const MONKEYS = ['🐵', '🐒', '🙈', '🙉', '🙊'];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ================= تصنيفات الكروت (كل سؤال ليه شكله) ================= */
const CATS = [
  { label: 'اختيار صعب', ems: ['⚖️', '🤯', '😅'], grad: ['#f59e0b', '#ef4444'], words: [] },
  { label: 'أكل وكلام', ems: ['🍜', '🥙', '🍟'], grad: ['#f97316', '#facc15'], words: ['اكل', 'أكل', 'الأكل', 'الاكل', 'أكلة', 'اكلة', 'كشري', 'طعمية', 'فراخ', 'بيتزا', 'شاورما', 'محشي', 'جبنة', 'جبنه', 'عيش', 'مطعم', 'بوفيه', 'سندوتش', 'دوق', 'طبق', 'أطباق', 'المطبخ', 'مطبخ', 'شاي', 'عزومة', 'عزومات', 'جعان', 'شبعان', 'كافيه', 'دليفري'] },
  { label: 'مواصلات وسط البلد', ems: ['🚐', '🚕', '🛻'], grad: ['#22d3ee', '#0ea5e9'], words: ['ميكروباص', 'تاكسي', 'أوبر', 'عربية', 'عربيتك', 'مواصلة', 'مواصلات', 'سواق', 'السواق', 'طابور', 'الطريق', 'مشوار', 'ركبت', 'تركب', 'الشارع', 'شارع'] },
  { label: 'فلوس ومصالح', ems: ['💰', '💸', '🤑'], grad: ['#fbbf24', '#f97316'], words: ['فلوس', 'جنيه', 'مليون', 'مفلس', 'فاتورة', 'سلف', 'تسلف', 'يستلف', 'استلف', 'مرتب', 'غني،', 'غني وهو', 'غني فجأة', 'الحساب', 'يدفع', 'تدفع', 'دفعت', 'محفظتك', 'خصم', 'بخيل', 'كريم جدًا', 'فكة', 'يصرف', 'تصرف', 'هدية', 'مصلحته', 'مصلحتك', 'المصلحة', 'اشتري', 'يشتري', 'الحق العرض'] },
  { label: 'سوشيال وسِر', ems: ['📱', '💬', '📸'], grad: ['#a855f7', '#d946ef'], words: ['واتساب', 'رسالة', 'رسايل', 'الرسائل', 'ستوري', 'لايك', 'صورة', 'صور', 'سيلفي', 'إيموجي', 'الجاليري', 'جاليري', 'بروفايل', 'سكرين', 'منشن', 'أونلاين', 'بلوك', 'موبايل', 'البحث', 'جوجل', 'محادثات', 'الكاميرا', 'المكالمات', 'مكالماتك', 'مكالمة', 'شاشة', 'ريلز', 'إنترنت', 'انترنت', 'متابع'] },
  { label: 'فرح وجواز', ems: ['💍', '👰', '🥳'], grad: ['#ec4899', '#f43f5e'], words: ['فرح', 'جواز', 'يتجوز', 'تتجوز', 'اتجوزت', 'عروسة', 'متجوز', 'خطوبة'] },
  { label: 'حب وكراش', ems: ['💘', '😍', '💌'], grad: ['#f43f5e', '#d946ef'], words: ['كراش', 'حب', 'حبيبتك', 'حبيبك', 'إكس', 'الإكس', 'معجب', 'علاقة', 'اعترف', 'وحشتني'] },
  { label: 'العيلة والبيت', ems: ['🏡', '👨‍👩‍👧', '🛋️'], grad: ['#f59e0b', '#ef4444'], words: ['أمك', 'امك', 'ماما', 'مامتك', 'أبوك', 'ابوك', 'والدك', 'أهلك', 'بيتك', 'البيت', 'عيلتك', 'العيلة', 'عيلة', 'خالتك', 'عمتك', 'قرايبك', 'إخواتك', 'أوضتك', 'الجرس', 'الضيوف', 'طفل', 'كهربا', 'الكهرباء'] },
  { label: 'شغل ومستقبل', ems: ['💼', '📈', '🏢'], grad: ['#0ea5e9', '#22d3ee'], words: ['شغل', 'مدير', 'وظيفة', 'يشتغل', 'اشتغل', 'مدرسة', 'شغلانة'] },
  { label: 'مواقف محرجة', ems: ['😳', '🙈', '🫣'], grad: ['#fb7185', '#f97316'], words: ['محرج', 'تحرجك', 'تنشق', 'الأرض', 'الارض'] },
  { label: 'الشلة', ems: ['🐒', '🃏', '🐵'], grad: ['#8b5cf6', '#d946ef'], words: ['الشلة', 'صاحب', 'صحاب', 'مين فينا', 'خروجة'] },
  { label: 'ضحك وفلسفة', ems: ['😂', '🤣', '😜'], grad: ['#a855f7', '#ec4899'], words: [] },
  { label: 'سؤال ناري', ems: ['🔥', '😈', '🌶️'], grad: ['#f43f5e', '#f97316'], words: [] },
  { label: 'سؤال تقيل', ems: ['🤯', '🧠', '👀'], grad: ['#22d3ee', '#8b5cf6'], words: [] },
];
const FB_START = CATS.length - 3;
let fbIdx = 0;

function detectCat(q) {
  const t = q.trim();
  // أسئلة «ولا» = اختيار صعب
  if (/\sولا\s/.test(t) && !/^(لو|مين|إيه)/.test(t)) return CATS[0];
  for (let i = 1; i < FB_START; i++) {
    if (CATS[i].words.some(w => t.includes(w))) return CATS[i];
  }
  return CATS[FB_START + (fbIdx++ % 3)];
}

function hexA(h, a) {
  const n = parseInt(h.slice(1), 16);
  return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
}

/* ================= الحالة ================= */
const state = {
  players: [],
  part: 0,
  questions: [],
  turns: [],
  idx: 0,
  flipped: false,
};
try {
  const saved = JSON.parse(localStorage.getItem('shla_players') || '[]');
  if (Array.isArray(saved)) state.players = saved.filter(x => typeof x === 'string' && x.trim()).slice(0, 12);
} catch (e) { /* تجاهل */ }

/* ================= الصوت (Web Audio) ================= */
let AC = null;
let soundOn = localStorage.getItem('shla_sound') !== '0';
function ac() {
  if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
  if (AC && AC.state === 'suspended') AC.resume();
  return AC;
}
function beep(f0, f1, dur, type, vol, delay) {
  const c = ac(); if (!c || !soundOn) return;
  delay = delay || 0;
  const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + dur + 0.06);
}
const sTap  = () => beep(600, 900, .09, 'triangle', .06);
const sAdd  = () => { beep(520, 0, .08, 'sine', .07); beep(780, 0, .1, 'sine', .07, .09); };
const sDel  = () => beep(300, 140, .15, 'sawtooth', .05);
const sFlip = () => { beep(220, 880, .32, 'sine', .09); beep(880, 330, .3, 'triangle', .05, .12); };
const sWin  = () => [523, 659, 784, 1046].forEach((f, i) => beep(f, 0, .22, 'triangle', .09, i * .13));

/* ================= أدوات UI ================= */
let toastTimer = null;
function toast(msg) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.remove('out');
  void el.offsetWidth;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('out'), 2300);
}

function confetti(n) {
  const ems = ['🎉', '🎊', '✨', '🌟', '🃏', '🐒', '⭐'];
  for (let i = 0; i < (n || 44); i++) {
    const s = document.createElement('span');
    s.className = 'confetti';
    s.textContent = ems[Math.floor(Math.random() * ems.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (0.9 + Math.random() * 1.3) + 'rem';
    s.style.animationDuration = (2.4 + Math.random() * 2.2) + 's';
    s.style.animationDelay = (Math.random() * .7) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 5600);
  }
}

function show(sel) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const scr = $(sel);
  scr.classList.add('active');
  scr.scrollTop = 0; // نبدأ كل شاشة من فوق
  window.scrollTo(0, 0);
}

/* ================= اللاعبين ================= */
function savePlayers() { localStorage.setItem('shla_players', JSON.stringify(state.players)); }

function renderPlayers() {
  const list = $('#players-list');
  list.innerHTML = '';
  state.players.forEach((name, i) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.style.setProperty('--h', (i * 47 + 8) % 360);
    const av = document.createElement('span');
    av.className = 'av';
    av.textContent = MONKEYS[i % MONKEYS.length];
    const nm = document.createElement('b');
    nm.textContent = name;
    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'حذف ' + name);
    del.onclick = () => {
      state.players.splice(i, 1);
      sDel(); savePlayers(); renderPlayers();
    };
    chip.appendChild(av); chip.appendChild(nm); chip.appendChild(del);
    list.appendChild(chip);
  });
  const n = state.players.length;
  $('#players-count').textContent =
    n === 0 ? 'لسه مفيش حد… ضيف على الأقل ٢ لاعبين 👀' :
    n === 1 ? 'ضيف كمان واحد على الأقل عشان تبدأوا 😅' :
    toAr(n) + ' لاعبين جاهزين يكسروا الدنيا 🔥';
}

function addPlayer() {
  const inp = $('#player-input');
  const name = inp.value.trim().replace(/\s+/g, ' ');
  if (!name) { toast('اكتب اسم الأول يا نجم 😅'); return; }
  if (name.length < 2) { toast('الاسم قصير أوي… كتب اسم حقيقي 😅'); return; }
  if (state.players.some(p => p.toLowerCase() === name.toLowerCase())) { toast('الاسم ده موجود خلاص يا نجم 😅'); return; }
  if (state.players.length >= 12) { toast('كفاية ١٢ لاعب… مش حرب عالمية 😂'); return; }
  state.players.push(name);
  savePlayers();
  inp.value = '';
  inp.focus();
  sAdd();
  renderPlayers();
}

/* ================= نظام الأدوار العادل =================
   كل «جولة» بتخلط كل اللاعبين، فكل واحد بياخد دوره
   بالتساوي: الفرق بين أي لاعبين أقصاه كارت واحد. */
function buildTurns(players, total) {
  const turns = [];
  while (turns.length < total) {
    let round = shuffle(players.slice());
    let tries = 0;
    while (players.length > 1 && turns.length && round[0] === turns[turns.length - 1] && tries < 25) {
      round = shuffle(players.slice());
      tries++;
    }
    turns.push.apply(turns, round);
  }
  return turns.slice(0, total);
}

/* ================= اللعبة ================= */
function startPart(partIdx) {
  state.part = partIdx;
  const src = partIdx === 0 ? PART_ONE : PART_TWO;
  state.questions = shuffle(src.slice());
  state.turns = buildTurns(state.players, state.questions.length);
  state.idx = 0;
  show('#screen-game');
  sTap();
  renderTurn();
}

function renderTurn() {
  const q = state.questions[state.idx];
  const player = state.turns[state.idx];
  const cat = detectCat(q);

  // تلوين وش الكارت حسب تصنيف السؤال
  const front = $('#front');
  front.style.setProperty('--c1', cat.grad[0]);
  front.style.setProperty('--c2', cat.grad[1]);
  front.style.background =
    'linear-gradient(168deg, ' + hexA(cat.grad[0], .30) + ', ' + hexA(cat.grad[1], .15) +
    ' 52%, rgba(15,11,38,.97) 100%)';

  $('#cat-emoji').textContent = cat.ems[Math.floor(Math.random() * cat.ems.length)];
  $('#cat-chip').textContent = cat.label;
  $('#q-text').textContent = q;

  // لافتة الدور
  const pi = state.players.indexOf(player);
  $('#turn-avatar').textContent = MONKEYS[(pi < 0 ? 0 : pi) % MONKEYS.length];
  $('#turn-avatar').style.setProperty('--h', (pi * 47 + 8) % 360);
  $('#turn-name').textContent = player;
  const banner = $('#turn-banner');
  banner.classList.remove('pop');
  void banner.offsetWidth;
  banner.classList.add('pop');

  // التقدم
  $('#prog-label').textContent = toAr(state.idx + 1) + ' / ' + toAr(state.questions.length);
  $('#bar-fill').style.width = (state.idx / state.questions.length * 100) + '%';

  // إعادة الكارت لوضعه الأصلي
  state.flipped = false;
  $('#card').classList.remove('flipped');
  $('#next-btn').classList.add('hidden');
  $('#next-btn').textContent = (state.idx === state.questions.length - 1) ? 'خلصنا! شوف النتيجة 🎉' : 'الكارت الجاي 🎴';
  fitQuestion();
}

/* ملاءمة حجم خط السؤال تلقائيًا عشان النص ما يتقطعش أبدًا */
function fitQuestion() {
  const el = $('#q-text');
  if (!el) return;
  const note = document.querySelector('.face.front .f-note');
  el.style.fontSize = '';
  if (note) note.style.display = '';
  for (let pass = 0; pass < 2; pass++) {
    let size = parseFloat(getComputedStyle(el).fontSize);
    const min = pass === 0 ? 13.5 : 12;
    let guard = 60;
    while (el.scrollHeight > el.clientHeight + 1 && size > min && guard--) {
      size -= 0.7;
      el.style.fontSize = size.toFixed(2) + 'px';
    }
    if (el.scrollHeight <= el.clientHeight + 1) return;
    if (note) note.style.display = 'none'; // تمريرة تانية: نكسب فضاء من الملاحظة
    el.style.fontSize = '';
  }
}

function tryFlip() {
  if (state.flipped) return;
  state.flipped = true;
  $('#card').classList.add('flipped');
  sFlip();
  setTimeout(() => {
    const nb = $('#next-btn');
    nb.classList.remove('hidden');
    nb.classList.remove('pop');
    void nb.offsetWidth;
    nb.classList.add('pop');
  }, 500);
}

function showEnd() {
  $('#end-total').textContent = toAr(state.questions.length);
  const counts = {};
  state.turns.forEach(p => { counts[p] = (counts[p] || 0) + 1; });
  $('#end-stats').innerHTML = state.players.map((p, i) =>
    '<span class="e-row"><span class="tav" style="--h:' + ((i * 47 + 8) % 360) + '">' +
    MONKEYS[i % MONKEYS.length] + '</span>' + p + ' قلب <b>' + toAr(counts[p] || 0) + '</b> كارت</span>'
  ).join('');
  $('#btn-other').textContent = state.part === 0 ? 'جرّب الجزء التاني 😈' : 'ارجع للجزء الأول 🔥';
  show('#screen-end');
  confetti();
  sWin();
}

/* ================= الميل (Tilt) 3D ================= */
const fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

if (fine) {
  const scene = $('#scene');
  scene.addEventListener('pointermove', e => {
    const r = scene.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    tilt.tx = -py * 12; tilt.ty = px * 14;
    $('#card').style.setProperty('--gx', (px * 100 + 50).toFixed(1) + '%');
    $('#card').style.setProperty('--gy', (py * 100 + 50).toFixed(1) + '%');
  });
  scene.addEventListener('pointerleave', () => {
    tilt.tx = 0; tilt.ty = 0;
    $('#card').style.setProperty('--gx', '50%');
    $('#card').style.setProperty('--gy', '30%');
  });
  (function loop() {
    tilt.x += (tilt.tx - tilt.x) * .1;
    tilt.y += (tilt.ty - tilt.y) * .1;
    $('#tilt').style.transform = 'rotateX(' + tilt.x.toFixed(2) + 'deg) rotateY(' + tilt.y.toFixed(2) + 'deg)';
    requestAnimationFrame(loop);
  })();

  // Parallax للخلفية
  window.addEventListener('pointermove', e => {
    const mx = (e.clientX / window.innerWidth - .5).toFixed(3);
    const my = (e.clientY / window.innerHeight - .5).toFixed(3);
    document.querySelector('.bg').style.setProperty('--mx', mx);
    document.querySelector('.bg').style.setProperty('--my', my);
  });
}

/* ================= الأحداث ================= */
$('#btn-players').addEventListener('click', () => {
  $('#panel').classList.toggle('hidden');
  sTap();
  if (!$('#panel').classList.contains('hidden')) $('#player-input').focus();
});
$('#btn-add').addEventListener('click', addPlayer);
$('#player-input').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addPlayer(); } });

$('#btn-start').addEventListener('click', () => {
  if (state.players.length < 2) {
    toast('لازم لاعبين ٢ على الأقل عشان تبدأوا 😅');
    const p = $('#panel');
    p.classList.remove('hidden');
    p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
    return;
  }
  sTap();
  show('#screen-parts');
});

$('#btn-back-lobby').addEventListener('click', () => { sTap(); show('#screen-lobby'); });
$$('.part').forEach(b => b.addEventListener('click', () => startPart(+b.dataset.part)));

$('#card').addEventListener('click', tryFlip);
$('#card').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tryFlip(); }
});

$('#next-btn').addEventListener('click', () => {
  if (!state.flipped) return;
  sTap();
  $('#next-btn').classList.add('hidden');
  state.flipped = false;
  $('#card').classList.remove('flipped');
  state.idx++;
  if (state.idx >= state.questions.length) {
    $('#bar-fill').style.width = '100%';
    setTimeout(showEnd, 750);
  } else {
    setTimeout(renderTurn, 460);
  }
});

function goHome() {
  $('#modal').classList.add('hidden');
  show('#screen-lobby');
  renderPlayers();
}
$('#btn-home').addEventListener('click', () => { sTap(); $('#modal').classList.remove('hidden'); });
$('#modal-stay').addEventListener('click', () => { sTap(); $('#modal').classList.add('hidden'); });
$('#modal-leave').addEventListener('click', goHome);

$('#btn-again').addEventListener('click', () => startPart(state.part));
$('#btn-other').addEventListener('click', () => startPart(1 - state.part));
$('#btn-end-home').addEventListener('click', goHome);

function updSoundBtn() { $('#btn-sound').textContent = soundOn ? '🔊' : '🔇'; }
$('#btn-sound').addEventListener('click', () => {
  soundOn = !soundOn;
  localStorage.setItem('shla_sound', soundOn ? '1' : '0');
  updSoundBtn();
  if (soundOn) sTap();
});

/* ================= تشغيل ================= */
renderPlayers();
updSoundBtn();
window.__shla = state; // Handle for debugging/maintenance

// لو خطوط جوجل اتحملت بعد أول رسمة، نعيد ملاءمة السؤال
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    if ($('#screen-game').classList.contains('active')) fitQuestion();
  });
}
