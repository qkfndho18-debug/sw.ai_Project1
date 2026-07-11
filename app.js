/* ==============================================
   StudyBloom — app.js
   Full-featured SPA: all Python modules → JS
   ============================================== */

'use strict';

// ================================================
// DATA TABLES
// ================================================

const QUESTIONS = [
  {
    text: "새로운 내용을 공부할 때 나는?",
    choices: ["원리를 먼저 이해한다.", "예제를 많이 풀어본다.", "일단 시작하면서 익힌다.", "여러 과목을 번갈아 공부한다."],
    types: ["탐구형", "반복형", "몰입형", "균형형"]
  },
  {
    text: "시험공부를 할 때 나는?",
    choices: ["개념부터 정리한다.", "문제를 많이 푼다.", "시험 직전에 집중한다.", "과목별로 시간을 나눈다."],
    types: ["탐구형", "반복형", "몰입형", "균형형"]
  },
  {
    text: "모르는 문제가 나오면?",
    choices: ["왜 틀렸는지 분석한다.", "비슷한 문제를 더 푼다.", "일단 넘어간다.", "다른 과목을 하다가 다시 본다."],
    types: ["탐구형", "반복형", "몰입형", "균형형"]
  },
  {
    text: "가장 좋아하는 공부 방식은?",
    choices: ["이해하며 공부", "반복 연습", "짧고 집중", "계획적으로 여러 과목"],
    types: ["탐구형", "반복형", "몰입형", "균형형"]
  },
  {
    text: "공부가 잘 되는 시간은?",
    choices: ["충분히 준비했을 때", "꾸준히 반복할 때", "마감 직전", "계획대로 진행할 때"],
    types: ["탐구형", "반복형", "몰입형", "균형형"]
  }
];

const TYPE_INFO = {
  탐구형: {
    emoji: "🔍",
    desc: "원리를 깊이 이해하고 탐구하는 학습자예요.",
    tips: ["개념을 먼저 이해하기", "친구에게 설명하며 공부하기", "오답 원인 분석하기"],
    plan: ["📘 수학 개념 정리 (30분)", "📝 개념 노트 작성 (20분)", "📗 예제 문제 풀이 (30분)", "📙 오답 원인 분석 (20분)"]
  },
  반복형: {
    emoji: "🔁",
    desc: "꾸준한 반복으로 탄탄하게 실력을 쌓아요.",
    tips: ["문제를 많이 풀기", "오답 반복 풀기", "매일 꾸준히 복습하기"],
    plan: ["📘 수학 문제 20문제", "📗 영어 단어 암기", "📙 오답 다시 풀기", "📝 복습 문제 풀이"]
  },
  몰입형: {
    emoji: "⚡",
    desc: "짧고 강하게 집중하는 몰입형 학습자예요.",
    tips: ["25분 집중 공부", "짧은 휴식 갖기", "시험 전 핵심 정리"],
    plan: ["⏰ 25분 집중 공부", "☕ 5분 휴식", "⏰ 25분 집중 공부", "📝 핵심 내용 정리"]
  },
  균형형: {
    emoji: "🌈",
    desc: "여러 과목을 균형 있게 공부하는 학습자예요.",
    tips: ["과목을 번갈아 공부하기", "공부 계획표 만들기", "하루 목표 설정하기"],
    plan: ["📘 수학 30분", "📗 영어 30분", "📙 국어 30분", "📕 과학 30분"]
  }
};

const LEVEL_NAMES = {
  1: "🌱 새싹",
  2: "🌿 새순",
  3: "🌳 성장",
  4: "🌲 큰나무",
  5: "👑 학습마스터"
};

const LEVEL_TREES = {
  1: "🌱",
  2: "🌿\n🌿",
  3: "🌳",
  4: "🌲🌲",
  5: "🌳🌳🌳\n✨👑✨"
};

const SUBJECTS = ["국어", "영어", "수학", "사회", "과학"];

// General / 기타 pool — used when a student has no exam subjects selected,
// or as a source for custom "기타" subjects.
const QUIZ_GENERAL = [
  { q: "대한민국의 수도는?",                     c: ["부산","인천","서울","대전"],        a: 2 },
  { q: "1시간은 몇 분인가요?",                   c: ["30분","45분","60분","90분"],        a: 2 },
  { q: "세계에서 가장 높은 산은?",               c: ["K2","에베레스트","마나슬루","킬리만자로"], a: 1 },
  { q: "다음 중 소수(prime number)는?",          c: ["4","6","7","9"],                  a: 2 },
  { q: "이진법에서 10은 십진법으로 얼마?",        c: ["2","4","8","10"],                 a: 0 },
  { q: "1년은 몇 개월인가요?",                   c: ["10개월","11개월","12개월","13개월"], a: 2 }
];

// Subject-specific quiz banks — used for the daily quiz when a student has
// selected exam subjects, so the quiz reinforces what they're actually studying.
const QUIZ_BY_SUBJECT = {
  국어: [
    { q: "다음 중 품사가 다른 하나는?",            c: ["뛰다","걷다","예쁘다","먹다"],       a: 2 },
    { q: "'가는 말이 고와야 오는 말이 곱다'와 뜻이 비슷한 표현은?", c: ["말 한마디로 천 냥 빚을 갚는다","티끌 모아 태산","등잔 밑이 어둡다","우물 안 개구리"], a: 0 },
    { q: "다음 중 높임 표현이 쓰인 문장은?",       c: ["나는 밥을 먹었다","선생님께서 오셨다","친구가 왔다","비가 왔다"], a: 1 },
    { q: "시의 운율을 이루는 요소가 아닌 것은?",   c: ["음보","각운","비유","반복"],         a: 2 },
    { q: "'맑다'의 반의어는?",                    c: ["흐리다","깨끗하다","투명하다","밝다"], a: 0 },
    { q: "다음 중 비유법이 사용된 문장은?",        c: ["하늘이 파랗다","내 마음은 호수다","오늘은 월요일이다","나는 학생이다"], a: 1 },
    { q: "설명문의 주된 목적은?",                  c: ["정보 전달","감정 표현","주장 설득","이야기 전개"], a: 0 },
    { q: "다음 중 맞춤법이 올바른 것은?",          c: ["웬지","왠지","웬듯","왠듣"],         a: 1 }
  ],
  영어: [
    { q: "'apple'의 뜻은?",                       c: ["바나나","사과","포도","딸기"],       a: 1 },
    { q: "다음 중 be동사가 아닌 것은?",            c: ["am","is","are","have"],            a: 3 },
    { q: "'I ___ a student.'에 들어갈 말은?",      c: ["am","is","are","be"],              a: 0 },
    { q: "'go'의 과거형은?",                       c: ["goed","went","gone","going"],       a: 1 },
    { q: "'many'는 어떤 명사와 함께 쓰이나요?",     c: ["단수명사","복수명사","불가산명사","고유명사"], a: 1 },
    { q: "'She is happy.'를 부정문으로 바꾸면?",   c: ["She isn't happy.","She don't happy.","She not happy.","She isn't happy?"], a: 0 },
    { q: "'big'의 비교급은?",                      c: ["bigger","biger","more big","bigest"], a: 0 },
    { q: "'What time is it?'의 알맞은 대답은?",    c: ["It's fine.","It's 3 o'clock.","I'm 12.","It's Monday."], a: 1 }
  ],
  수학: [
    { q: "3 + 5 × 2의 값은?",                     c: ["16","13","10","8"],                a: 1 },
    { q: "다음 중 소수(prime number)는?",          c: ["4","9","11","15"],                 a: 2 },
    { q: "1/2 + 1/4의 값은?",                      c: ["2/6","3/4","2/4","1/8"],            a: 1 },
    { q: "정삼각형의 세 각의 합은?",                c: ["90°","180°","270°","360°"],         a: 1 },
    { q: "5의 제곱은?",                            c: ["10","15","20","25"],               a: 3 },
    { q: "다음 중 짝수는?",                        c: ["7","12","15","21"],                a: 1 },
    { q: "x + 3 = 7일 때, x의 값은?",               c: ["3","4","5","10"],                  a: 1 },
    { q: "원의 지름이 10일 때 반지름은?",           c: ["2","5","10","20"],                 a: 1 }
  ],
  사회: [
    { q: "대한민국의 국회의원 임기는?",             c: ["2년","3년","4년","5년"],            a: 2 },
    { q: "삼권분립에 해당하지 않는 것은?",          c: ["입법부","행정부","사법부","언론부"], a: 3 },
    { q: "세계에서 인구가 가장 많은 나라는?",        c: ["미국","인도","중국","인도네시아"], a: 1 },
    { q: "우리나라의 화폐 단위는?",                 c: ["엔","원","달러","위안"],            a: 1 },
    { q: "다음 중 헌법기관이 아닌 것은?",           c: ["국회","대법원","헌법재판소","시청"], a: 3 },
    { q: "적도에 가까운 지역의 기후 특징은?",        c: ["한대기후","냉대기후","열대기후","건조기후"], a: 2 },
    { q: "민주주의의 기본 원리가 아닌 것은?",        c: ["국민주권","권력분립","법치주의","독재정치"], a: 3 }
  ],
  과학: [
    { q: "물의 화학식은?",                        c: ["CO2","H2O","O2","NaCl"],            a: 1 },
    { q: "지구에서 가장 가까운 행성은?",            c: ["금성","화성","목성","수성"],        a: 0 },
    { q: "식물이 광합성을 할 때 필요한 것은?",       c: ["산소","이산화탄소","질소","수소"],   a: 1 },
    { q: "소리의 속도가 가장 빠른 매질은?",          c: ["공기","물","고체","진공"],          a: 2 },
    { q: "인체에서 혈액을 순환시키는 기관은?",       c: ["폐","심장","위","간"],              a: 1 },
    { q: "다음 중 힘의 단위는?",                    c: ["와트","뉴턴","줄","암페어"],        a: 1 },
    { q: "달이 지구 주위를 도는 주기는 약 며칠?",     c: ["1일","7일","27일","365일"],        a: 2 }
  ]
};

// Legacy alias kept for compatibility with any older references.
const QUIZ_POOL = QUIZ_GENERAL;

const CHALLENGES = [
  { mission: "📖 수학 30분 공부하기",          reward: 10 },
  { mission: "📚 영어 단어 20개 암기하기",      reward: 10 },
  { mission: "📝 오답노트 3문제 작성하기",       reward: 15 },
  { mission: "📗 국어 지문 2개 풀기",           reward: 10 },
  { mission: "🔬 과학 개념 복습 30분",          reward: 10 },
  { mission: "⏰ 1시간 집중 공부하기",          reward: 20 },
  { mission: "📒 오늘 공부 계획 모두 완료하기",  reward: 25 }
];

const QUOTES = [
  "오늘의 노력이 내일의 실력이 됩니다.",
  "조금씩 꾸준히 하는 사람이 가장 멀리 갑니다.",
  "완벽보다 꾸준함이 더 중요합니다.",
  "오늘도 어제보다 조금 더 성장해봅시다!",
  "포기하지 않는 사람이 결국 성공합니다.",
  "오늘 공부한 당신이 정말 멋집니다.",
  "어제보다 조금 더 성장하면 충분합니다."
];

const ACHIEVEMENTS_DEF = [
  { id: "first_study", name: "첫 공부",    emoji: "🌱", check: (s) => s.totalTime > 0 },
  { id: "hard_worker", name: "공부왕",     emoji: "👑", check: (s) => s.totalTime >= 500 },
  { id: "level_up",   name: "레벨업",     emoji: "⬆️", check: (s) => s.student.level >= 3 },
  { id: "quiz_king",  name: "퀴즈왕",     emoji: "🧠", check: (s) => s.quizCount >= 10 },
  { id: "goal_done",  name: "목표 달성",  emoji: "🎯", check: (s) => s.goalPct === 100 && s.goalLen > 0 },
  { id: "marathon",   name: "1000분 달성",emoji: "🏅", check: (s) => s.totalTime >= 1000 }
];

// ================================================
// STUDY PLAN TASK TEMPLATES (by personality type)
// ================================================

// Each template takes a subject name + whether we're in the "final sprint"
// (last 3 days before the exam) and returns a list of { task, minutes }.
const TASK_TEMPLATES = {
  탐구형: (subj, isFinal) => isFinal
    ? [ { task: `${subj} 총정리 & 핵심 개념 훑어보기`, minutes: 30 }, { task: `${subj} 헷갈리는 개념 다시 이해하기`, minutes: 20 } ]
    : [ { task: `${subj} 개념 정리`,        minutes: 30 }, { task: `${subj} 예제 문제 풀이`,  minutes: 20 }, { task: `${subj} 오답 원인 분석`, minutes: 15 } ],
  반복형: (subj, isFinal) => isFinal
    ? [ { task: `${subj} 기출·오답 총정리`, minutes: 35 }, { task: `${subj} 틀렸던 문제 다시 풀기`, minutes: 20 } ]
    : [ { task: `${subj} 문제 20문제 풀기`, minutes: 30 }, { task: `${subj} 오답 다시 풀기`,   minutes: 15 }, { task: `${subj} 복습`,       minutes: 15 } ],
  몰입형: (subj, isFinal) => isFinal
    ? [ { task: `${subj} 25분 집중 총정리`, minutes: 25 }, { task: `5분 휴식`,                minutes: 5 }, { task: `${subj} 핵심만 압축 정리`, minutes: 20 } ]
    : [ { task: `${subj} 25분 집중 공부`,   minutes: 25 }, { task: `5분 휴식`,                minutes: 5 }, { task: `${subj} 핵심 내용 정리`, minutes: 15 } ],
  균형형: (subj, isFinal) => isFinal
    ? [ { task: `${subj} 전 범위 총정리`,   minutes: 35 } ]
    : [ { task: `${subj} 공부`,             minutes: 30 } ]
};

// ================================================
// STATE
// ================================================

let student         = null;   // { name, grade, level, exp, studyType, typeScore, examDate, examSubjects, quizCount, streakDates, plan }
let quizIndex       = 0;
let quizScores      = {};
let todayChallenge  = null;
let challengeDone   = false;
let dailyQuiz       = { item: null, subject: null, answered: false, correct: null };
let calendarViewDate = new Date();
let selectedCalendarKey = null;

// In-memory caches for the current student's Firestore subcollections.
// Loaded once at login, kept in sync on every add/update/delete so the UI
// can render synchronously without awaiting a network round-trip each time.
let goalsCache   = [];
let recordsCache = [];

// ================================================
// FIREBASE-BACKED STORAGE HELPERS
// ================================================
// All persistence goes through window.FirebaseDB (see firebase.js), which
// talks to Cloud Firestore. Reads used by render functions are served from
// the in-memory caches above; writes are fire-and-forget against Firestore
// (errors are caught and surfaced via toast so a dropped connection doesn't
// silently lose data).

function requireFirebase() {
  if (!window.FirebaseDB) {
    showToast('⚠️ Firebase 연결에 문제가 있어요. firebase.js 설정을 확인해주세요.');
    throw new Error('FirebaseDB is not available — check firebase.js config/script tag.');
  }
  return window.FirebaseDB;
}

async function saveStudent() {
  if (!student) return;
  try {
    await requireFirebase().saveStudent(student.name, student);
  } catch (e) {
    console.error('saveStudent failed:', e);
    showToast('⚠️ 저장에 실패했어요. 인터넷 연결을 확인해주세요.');
  }
}

function todayStr() {
  return dateKey(new Date());
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function diffDays(a, b) {
  const ms = new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round(ms / 86400000);
}

// ================================================
// EXAM SUBJECT CHIP HELPERS (login + settings forms)
// ================================================

function toggleSubjectChip(el) {
  el.classList.toggle('active');
}

function readSubjectChips(groupId, customInputId) {
  const chips = Array.from(document.querySelectorAll(`#${groupId} .subject-chip.active`))
    .map(c => c.dataset.subj);
  const custom = (document.getElementById(customInputId).value || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  return [...chips, ...custom];
}

function writeSubjectChips(groupId, customInputId, subjects) {
  const known = new Set(SUBJECTS);
  const custom = [];
  document.querySelectorAll(`#${groupId} .subject-chip`).forEach(chip => {
    chip.classList.toggle('active', subjects.includes(chip.dataset.subj));
  });
  subjects.forEach(s => { if (!known.has(s)) custom.push(s); });
  document.getElementById(customInputId).value = custom.join(', ');
}

// ================================================
// STUDY PLAN GENERATION (personality type × exam subjects × D-day)
// ================================================

function buildDayTasks(dayIndex, daysLeft, subjects, type) {
  const list = subjects.length ? subjects : ['전체 과목'];
  const isFinal = daysLeft <= 3;
  let subsToday;
  if (isFinal) {
    subsToday = list; // final sprint — review everything every day
  } else {
    const per = Math.min(2, list.length);
    const start = (dayIndex * per) % list.length;
    subsToday = [];
    for (let i = 0; i < per; i++) subsToday.push(list[(start + i) % list.length]);
  }
  const template = TASK_TEMPLATES[type] || TASK_TEMPLATES['균형형'];
  const tasks = [];
  subsToday.forEach(subj => tasks.push(...template(subj, isFinal)));
  return tasks;
}

function generateStudyPlan(stu) {
  if (!stu.examDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const examDate = new Date(stu.examDate + 'T00:00:00');
  if (isNaN(examDate.getTime()) || examDate < today) return null;

  const totalDays = Math.min(diffDays(examDate, today), 90); // cap to keep plan reasonable
  const subjects  = stu.examSubjects && stu.examSubjects.length ? stu.examSubjects : [];
  const type      = stu.studyType || '균형형';

  const plan = {};
  for (let i = 0; i <= totalDays; i++) {
    const d        = addDays(today, i);
    const key      = dateKey(d);
    const daysLeft = totalDays - i;
    plan[key] = { daysLeft, tasks: buildDayTasks(i, daysLeft, subjects, type) };
  }
  return plan;
}

function regenerateAndSavePlan() {
  const plan = generateStudyPlan(student);
  student.plan = plan;
  saveStudent();
  return plan;
}

// ================================================
// SCREEN NAVIGATION
// ================================================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ================================================
// LOGIN
// ================================================

async function handleLogin() {
  const name     = document.getElementById('input-name').value.trim();
  const grade    = document.getElementById('input-grade').value;
  const examDate = document.getElementById('input-examdate').value || '';
  const examSubjects = readSubjectChips('subject-chip-group', 'input-examsubject-custom');

  if (!name)  { showToast('이름을 입력해주세요! ✏️'); return; }
  if (!grade) { showToast('학년을 선택해주세요! 📚'); return; }

  const loginBtn = document.getElementById('login-submit-btn');
  if (loginBtn) { loginBtn.disabled = true; loginBtn.textContent = '불러오는 중...'; }

  try {
    const existing = await requireFirebase().getStudent(name);
    if (existing) {
      student = existing;
      [goalsCache, recordsCache] = await Promise.all([
        requireFirebase().getGoals(name),
        requireFirebase().getRecords(name)
      ]);
      // Returning student — go straight to dashboard (exam info is managed from the 계획 tab)
      initDashboard();
      showScreen('screen-dashboard');
      showToast(`다시 왔군요, ${student.name}! 반가워요 😊`);
    } else {
      // New student — run quiz first
      student = { name, grade, level: 1, exp: 0, studyType: '', typeScore: {}, examDate, examSubjects, quizCount: 0, streakDates: [], plan: null };
      goalsCache   = [];
      recordsCache = [];
      quizIndex  = 0;
      quizScores = {};
      showScreen('screen-quiz');
      renderQuiz();
    }
  } catch (e) {
    console.error('handleLogin failed:', e);
    showToast('⚠️ 데이터를 불러오지 못했어요. 인터넷 연결을 확인해주세요.');
  } finally {
    if (loginBtn) { loginBtn.disabled = false; loginBtn.textContent = '시작하기 →'; }
  }
}

// ================================================
// STUDY TYPE QUIZ
// ================================================

function renderQuiz() {
  const q     = QUESTIONS[quizIndex];
  const total = QUESTIONS.length;
  const pct   = (quizIndex / total) * 100;

  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `${quizIndex + 1} / ${total}`;
  document.getElementById('quiz-question').textContent = q.text;

  const choicesEl = document.getElementById('quiz-choices');
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice-btn';
    btn.innerHTML = `<span class="choice-num">${i + 1}</span>${choice}`;
    btn.onclick = () => pickQuizChoice(i);
    choicesEl.appendChild(btn);
  });
}

function pickQuizChoice(idx) {
  const type = QUESTIONS[quizIndex].types[idx];
  quizScores[type] = (quizScores[type] || 0) + 20;

  // Highlight selected
  const btns = document.querySelectorAll('#quiz-choices .quiz-choice-btn');
  btns[idx].classList.add('selected');

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < QUESTIONS.length) {
      renderQuiz();
    } else {
      finishQuiz();
    }
  }, 380);
}

function finishQuiz() {
  // Determine dominant type
  const result = Object.entries(quizScores).reduce((best, cur) => cur[1] > best[1] ? cur : best)[0];
  student.studyType = result;
  student.typeScore  = quizScores;
  saveStudent();
  regenerateAndSavePlan();
  showResultScreen(result);
}

// ================================================
// RESULT SCREEN
// ================================================

function showResultScreen(result) {
  const info  = TYPE_INFO[result];
  const total = Object.values(quizScores).reduce((a, b) => a + b, 0);

  document.getElementById('result-emoji').textContent = info.emoji;
  document.getElementById('result-type').textContent  = result;
  document.getElementById('result-desc').textContent  = info.desc;

  // Score bars
  const scoresEl = document.getElementById('result-scores');
  scoresEl.className = 'result-card';
  scoresEl.innerHTML = '<h4>📊 성향 분석 결과</h4>';
  const types = ['탐구형', '반복형', '몰입형', '균형형'];
  types.forEach(t => {
    const score = quizScores[t] || 0;
    const pct   = total > 0 ? Math.round((score / total) * 100) : 0;
    scoresEl.innerHTML += `
      <div class="score-row">
        <span class="score-label">${t}</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width:0" data-w="${pct}%"></div></div>
        <span class="score-pct">${pct}%</span>
      </div>`;
  });

  // Tips
  const tipsEl = document.getElementById('result-tips');
  tipsEl.className = 'result-card';
  tipsEl.innerHTML = '<h4>💡 추천 공부법</h4>' +
    info.tips.map(t => `<div class="tip-item"><span>✔</span><span>${t}</span></div>`).join('');

  // Plan preview — prefer the generated exam-aware plan when available
  const planEl = document.getElementById('result-plan-preview');
  planEl.className = 'result-card';
  const generated = student.plan;
  const todayPlan = generated && generated[todayStr()];
  if (todayPlan) {
    const ddayLine = `<p style="margin-bottom:12px;color:var(--primary);font-weight:700;">🎯 시험 D-${todayPlan.daysLeft} 까지의 맞춤 학습 계획을 만들었어요!</p>`;
    planEl.innerHTML = '<h4>📅 오늘의 학습 계획</h4>' + ddayLine +
      todayPlan.tasks.map((t, i) => `<div class="plan-row"><span class="plan-num">${i + 1}</span><span>${t.task} (${t.minutes}분)</span></div>`).join('');
  } else {
    planEl.innerHTML = '<h4>📅 오늘의 학습 계획</h4>' +
      info.plan.map((p, i) => `<div class="plan-row"><span class="plan-num">${i + 1}</span><span>${p}</span></div>`).join('');
  }

  showScreen('screen-result');

  // Animate bars after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.score-bar-fill').forEach(el => {
        el.style.width = el.dataset.w;
      });
    }, 80);
  });
}

function goToDashboard() {
  initDashboard();
  showScreen('screen-dashboard');
}

// ================================================
// DASHBOARD
// ================================================

function initDashboard() {
  updateHeader();
  if (!todayChallenge) {
    todayChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    challengeDone  = false;
  }
  switchTab('home');
}

function updateHeader() {
  const lv    = Math.min(student.level, 5);
  const name  = LEVEL_NAMES[lv] || `Lv.${student.level}`;
  const needed = student.level * 10;
  const pct   = Math.min((student.exp / needed) * 100, 100);

  document.getElementById('dash-student-name').textContent = `${student.name} (${student.grade})`;
  document.getElementById('dash-level-chip').textContent   = name;
  document.getElementById('dash-exp-bar').style.width      = pct + '%';
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('tab-' + tab);
  if (panel) panel.classList.add('active');

  const renders = {
    home:        renderHome,
    plan:        renderPlanTab,
    record:      renderRecords,
    stats:       renderStats,
    level:       renderLevel,
    quiz:        renderDailyQuiz,
    feedback:    renderFeedback,
    goal:        renderGoals,
    achievement: renderAchievements,
    streak:      renderStreak,
    challenge:   renderChallenge
  };
  if (renders[tab]) renders[tab]();
}

// ================================================
// HOME TAB
// ================================================

function renderHome() {
  const info = TYPE_INFO[student.studyType] || TYPE_INFO['균형형'];

  // D-day banner
  const bannerEl = document.getElementById('home-dday-banner');
  const plan     = student.plan;
  const todayPlan = plan && plan[todayStr()];
  if (student.examDate && todayPlan) {
    const subjLabel = (student.examSubjects && student.examSubjects.length)
      ? student.examSubjects.join(' · ')
      : '전 과목';
    bannerEl.innerHTML = `
      <div class="dday-banner">
        <span class="dday-badge">${todayPlan.daysLeft === 0 ? '🔥 시험 당일!' : 'D-' + todayPlan.daysLeft}</span>
        <span class="dday-text">${student.examDate} 시험 (${subjLabel})</span>
        <button class="btn-secondary dday-cal-btn" onclick="switchTab('plan')">📅 계획 보기</button>
      </div>`;
  } else {
    bannerEl.innerHTML = `
      <div class="dday-banner dday-empty">
        <span class="dday-text">시험 날짜를 등록하면 D-day 맞춤 학습 계획을 만들어드려요!</span>
        <button class="btn-secondary dday-cal-btn" onclick="switchTab('plan')">📅 등록하기</button>
      </div>`;
  }

  // Study plan — prefer the generated exam-aware plan for today
  document.getElementById('home-plan-list').innerHTML = todayPlan
    ? todayPlan.tasks.map((t, i) => `<div class="plan-list-item"><span class="plan-num">${i + 1}</span><span>${t.task} (${t.minutes}분)</span></div>`).join('')
    : info.plan.map((p, i) => `<div class="plan-list-item"><span class="plan-num">${i + 1}</span><span>${p}</span></div>`).join('');

  // Challenge preview
  const chalEl = document.getElementById('home-challenge-preview');
  if (todayChallenge) {
    chalEl.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:8px;">${todayChallenge.mission}</div>
      <span class="challenge-reward-badge">⭐ EXP +${todayChallenge.reward}</span>
      ${challengeDone
        ? '<div class="challenge-done-msg">✅ 오늘 챌린지 완료!</div>'
        : '<button class="btn-secondary" style="margin-top:6px" onclick="switchTab(\'challenge\')">도전하기 →</button>'}
    `;
  }

  // Quote
  document.getElementById('home-quote').textContent =
    QUOTES[Math.floor(Math.random() * QUOTES.length)];

  // Type info
  document.getElementById('home-type-info').innerHTML = `
    <div class="type-badge">${info.emoji} ${student.studyType || '미검사'}</div>
    <p style="font-size:14px;color:var(--text-mid);line-height:1.6;">${info.desc}</p>
  `;
}

// ================================================
// PLAN / CALENDAR TAB
// ================================================

function renderPlanTab() {
  // Always start the calendar on the month containing today.
  calendarViewDate = new Date();
  selectedCalendarKey = null;
  renderPlanSummary();
  renderCalendarGrid();
  document.getElementById('plan-detail-card').style.display = 'none';
}

function renderPlanSummary() {
  const el = document.getElementById('plan-summary');
  if (student.examDate) {
    const subjLabel = (student.examSubjects && student.examSubjects.length) ? student.examSubjects.join(', ') : '전 과목';
    el.innerHTML = `
      <div class="plan-summary-text">
        <strong>🎯 시험일:</strong> ${student.examDate}<br>
        <strong>📚 시험 과목:</strong> ${subjLabel}
      </div>`;
  } else {
    el.innerHTML = `<div class="plan-summary-text">아직 시험 정보가 없어요. '시험 정보 수정'에서 등록해보세요!</div>`;
  }
}

function openExamSettings() {
  const form = document.getElementById('exam-settings-form');
  const willShow = form.style.display === 'none';
  form.style.display = willShow ? 'block' : 'none';
  if (willShow) {
    document.getElementById('edit-examdate').value = student.examDate || '';
    writeSubjectChips('edit-subject-chip-group', 'edit-examsubject-custom', student.examSubjects || []);
  }
}

function saveExamSettings() {
  const examDate = document.getElementById('edit-examdate').value || '';
  const examSubjects = readSubjectChips('edit-subject-chip-group', 'edit-examsubject-custom');

  if (!examDate) { showToast('시험 날짜를 선택해주세요! 📅'); return; }

  student.examDate     = examDate;
  student.examSubjects = examSubjects;
  saveStudent();
  regenerateAndSavePlan();

  document.getElementById('exam-settings-form').style.display = 'none';
  renderPlanSummary();
  renderCalendarGrid();
  showToast('시험 정보를 저장했어요! 맞춤 계획을 새로 만들었어요 ✨');
}

function changeCalendarMonth(delta) {
  calendarViewDate.setMonth(calendarViewDate.getMonth() + delta);
  renderCalendarGrid();
}

function renderCalendarGrid() {
  const plan = student.plan || {};
  const year  = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth(); // 0-based

  document.getElementById('calendar-month-label').textContent = `${year}년 ${month + 1}월`;

  const firstDay   = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const todayKey     = todayStr();
  const examKey      = student.examDate || null;

  const gridEl = document.getElementById('calendar-grid');
  gridEl.innerHTML = '';

  for (let i = 0; i < startWeekday; i++) {
    const blank = document.createElement('div');
    blank.className = 'calendar-cell empty';
    gridEl.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d   = new Date(year, month, day);
    const key = dateKey(d);
    const dayPlan = plan[key];

    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    if (key === todayKey) cell.classList.add('today');
    if (key === examKey)  cell.classList.add('exam-day');
    if (dayPlan)          cell.classList.add('has-plan');
    if (key === selectedCalendarKey) cell.classList.add('selected');

    cell.innerHTML = `
      <span class="cal-day-num">${day}</span>
      ${dayPlan ? `<span class="cal-dot"></span>` : ''}
      ${key === examKey ? `<span class="cal-exam-tag">시험</span>` : ''}
    `;
    cell.onclick = () => selectCalendarDate(key);
    gridEl.appendChild(cell);
  }
}

function selectCalendarDate(key) {
  selectedCalendarKey = key;
  renderCalendarGrid();

  const plan = student.plan || {};
  const dayPlan = plan[key];
  const detailCard  = document.getElementById('plan-detail-card');
  const detailTitle = document.getElementById('plan-detail-title');
  const detailList  = document.getElementById('plan-detail-list');

  detailCard.style.display = 'block';
  const isExamDay = key === student.examDate;

  if (dayPlan) {
    detailTitle.textContent = isExamDay
      ? `🔥 ${key} — 시험 당일!`
      : `${key} — D-${dayPlan.daysLeft}`;
    detailList.innerHTML = dayPlan.tasks
      .map((t, i) => `<div class="plan-row"><span class="plan-num">${i + 1}</span><span>${t.task} (${t.minutes}분)</span></div>`)
      .join('');
  } else {
    detailTitle.textContent = key;
    detailList.innerHTML = emptyState('📭', student.examDate
      ? '이 날짜에는 준비된 학습 계획이 없어요.<br>시험 범위 밖의 날짜예요.'
      : '시험 정보를 등록하면<br>날짜별 학습 계획이 만들어져요!');
  }

  detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ================================================
// RECORD TAB
// ================================================

async function saveRecord() {
  const subject = document.getElementById('record-subject').value.trim();
  const time    = parseInt(document.getElementById('record-time').value, 10);

  if (!subject)        { showToast('과목을 입력해주세요! 📚'); return; }
  if (!time || time < 1) { showToast('올바른 공부 시간을 입력해주세요!'); return; }

  const record = { date: todayStr(), subject, time };
  try {
    const id = await requireFirebase().addRecord(student.name, record);
    recordsCache.push({ id, ...record });
  } catch (e) {
    console.error('saveRecord failed:', e);
    showToast('⚠️ 기록 저장에 실패했어요. 인터넷 연결을 확인해주세요.');
    return;
  }

  const expGain = Math.floor(time / 10);
  addExp(expGain);
  markStudyDay();

  document.getElementById('record-subject').value = '';
  document.getElementById('record-time').value    = '';

  showToast(`✨ 저장 완료! EXP +${expGain}`);
  renderRecords();
}

function renderRecords() {
  const myRecords = [...recordsCache].reverse();

  const el = document.getElementById('record-list');

  if (myRecords.length === 0) {
    el.innerHTML = emptyState('📚', '아직 공부 기록이 없어요.<br>첫 번째 기록을 저장해보세요!');
    return;
  }

  el.innerHTML = myRecords.map(r => `
    <div class="record-item">
      <div class="record-left">
        <div class="record-subj">${r.subject}</div>
        <div class="record-date">${r.date}</div>
      </div>
      <div class="record-time">${r.time}분</div>
    </div>
  `).join('');
}

// ================================================
// STATS TAB
// ================================================

function renderStats() {
  const records  = recordsCache;
  const total    = records.reduce((s, r) => s + r.time, 0);
  const count    = records.length;
  const avg      = count > 0 ? Math.round(total / count) : 0;

  const subMap = {};
  records.forEach(r => { subMap[r.subject] = (subMap[r.subject] || 0) + r.time; });

  // Summary
  const summaryEl = document.getElementById('stats-summary');
  const best = Object.keys(subMap).length
    ? Object.entries(subMap).sort((a, b) => b[1] - a[1])[0][0]
    : null;
  const weak = Object.keys(subMap).length > 1
    ? Object.entries(subMap).sort((a, b) => a[1] - b[1])[0][0]
    : null;

  summaryEl.innerHTML = `
    <div class="stat-row"><span class="stat-label">총 공부시간</span>   <span class="stat-val">${total}분</span></div>
    <div class="stat-row"><span class="stat-label">공부 횟수</span>     <span class="stat-val">${count}회</span></div>
    <div class="stat-row"><span class="stat-label">평균 공부시간</span> <span class="stat-val">${avg}분</span></div>
    ${best ? `<div class="stat-row"><span class="stat-label">최다 과목</span><span class="stat-val">${best}</span></div>` : ''}
    ${weak ? `<div class="stat-row"><span class="stat-label">최소 과목</span><span class="stat-val">${weak}</span></div>` : ''}
  `;

  // Subject bars
  const subjEl = document.getElementById('stats-subjects');
  if (Object.keys(subMap).length === 0) {
    subjEl.innerHTML = emptyState('📊', '공부 기록을 저장하면<br>통계가 나타납니다!');
    return;
  }

  const maxT = Math.max(...Object.values(subMap));
  subjEl.innerHTML = Object.entries(subMap)
    .sort((a, b) => b[1] - a[1])
    .map(([sub, t]) => {
      const pct = Math.round((t / maxT) * 100);
      return `
        <div class="subj-bar-item">
          <div class="subj-bar-head"><span>${sub}</span><span>${t}분</span></div>
          <div class="subj-bar-bg"><div class="subj-bar-fill" style="width:0" data-w="${pct}%"></div></div>
        </div>`;
    }).join('');

  requestAnimationFrame(() => setTimeout(() => {
    document.querySelectorAll('.subj-bar-fill').forEach(el => { el.style.width = el.dataset.w; });
  }, 80));
}

// ================================================
// LEVEL TAB
// ================================================

function renderLevel() {
  const lv     = Math.min(student.level, 5);
  const needed = student.level * 10;
  const pct    = Math.min((student.exp / needed) * 100, 100);

  document.getElementById('level-tree').innerHTML =
    LEVEL_TREES[lv].replace(/\n/g, '<br>');
  document.getElementById('level-name-badge').textContent =
    LEVEL_NAMES[lv] || `Lv.${student.level}`;
  document.getElementById('level-stat-row').textContent =
    `Lv.${student.level}  ·  EXP: ${student.exp} / ${needed}`;
  document.getElementById('level-xp-fill').style.width = pct + '%';
  document.getElementById('level-xp-label').textContent =
    `다음 레벨까지 ${needed - student.exp} EXP 남았어요`;
}

// ================================================
// DAILY QUIZ TAB
// ================================================

// Picks a random exam subject (if the student has any) so the daily quiz
// reinforces what they're actually being tested on; falls back to a general pool.
function pickQuizForSubject() {
  const subjects = (student.examSubjects || []).filter(s => QUIZ_BY_SUBJECT[s]);
  if (subjects.length === 0) {
    return { subject: null, item: QUIZ_GENERAL[Math.floor(Math.random() * QUIZ_GENERAL.length)] };
  }
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const pool     = QUIZ_BY_SUBJECT[subject];
  return { subject, item: pool[Math.floor(Math.random() * pool.length)] };
}

function renderDailyQuiz() {
  if (!dailyQuiz.item) {
    const picked = pickQuizForSubject();
    dailyQuiz.item     = picked.item;
    dailyQuiz.subject  = picked.subject;
    dailyQuiz.answered = false;
  }
  drawQuizUI();
}

function subjectTagHtml() {
  return dailyQuiz.subject ? `<span class="quiz-subject-tag">${dailyQuiz.subject}</span>` : `<span class="quiz-subject-tag general">상식</span>`;
}

function drawQuizUI() {
  const area = document.getElementById('daily-quiz-area');
  const item = dailyQuiz.item;
  if (!item) return;

  const choiceButtons = item.c.map((choice, i) => {
    let cls = 'quiz-choice-btn';
    if (dailyQuiz.answered && i === item.a) cls += ' correct-ans';
    return `<button class="${cls}" onclick="answerDailyQuiz(${i})" ${dailyQuiz.answered ? 'disabled' : ''}>
      <span class="choice-num">${i + 1}</span>${choice}
    </button>`;
  }).join('');

  const resultBadge = dailyQuiz.answered
    ? (dailyQuiz.correct
        ? `<div class="quiz-result-badge correct">🎉 정답이에요! EXP +5</div>`
        : `<div class="quiz-result-badge wrong">❌ 오답이에요. 정답은 <strong>${item.a + 1}번</strong>이에요.</div>`)
    : '';

  const nextBtn = dailyQuiz.answered
    ? `<button class="btn-secondary" style="margin-top:12px" onclick="nextDailyQuiz()">다음 문제 →</button>`
    : '';

  area.innerHTML = `
    ${subjectTagHtml()}
    <p class="quiz-daily-q">${item.q}</p>
    <div class="quiz-choices">${choiceButtons}</div>
    ${resultBadge}
    ${nextBtn}
  `;
}

async function answerDailyQuiz(idx) {
  if (dailyQuiz.answered) return;
  const item    = dailyQuiz.item;
  const correct = idx === item.a;

  // Show result immediately with correct highlight
  const area     = document.getElementById('daily-quiz-area');
  const choiceBtns = item.c.map((choice, i) => {
    let cls = 'quiz-choice-btn';
    if (i === item.a)  cls += ' correct-ans';
    if (i === idx && !correct) cls += ' selected';
    return `<button class="${cls}" disabled>
      <span class="choice-num">${i + 1}</span>${choice}
    </button>`;
  }).join('');

  const badge = correct
    ? `<div class="quiz-result-badge correct">🎉 정답이에요! EXP +5</div>`
    : `<div class="quiz-result-badge wrong">❌ 오답이에요. 정답은 <strong>${item.a + 1}번</strong>이에요.</div>`;

  area.innerHTML = `
    ${subjectTagHtml()}
    <p class="quiz-daily-q">${item.q}</p>
    <div class="quiz-choices">${choiceBtns}</div>
    ${badge}
    <button class="btn-secondary" style="margin-top:12px" onclick="nextDailyQuiz()">다음 문제 →</button>
  `;

  dailyQuiz.answered = true;
  dailyQuiz.correct  = correct;

  if (correct) {
    addExp(5);
    student.quizCount = (student.quizCount || 0) + 1;
    saveStudent();
    showToast('🧠 정답! EXP +5');
  }
}

function nextDailyQuiz() {
  const picked = pickQuizForSubject();
  dailyQuiz.item     = picked.item;
  dailyQuiz.subject  = picked.subject;
  dailyQuiz.answered = false;
  dailyQuiz.correct  = null;
  drawQuizUI();
}

// ================================================
// FEEDBACK TAB
// ================================================

function renderFeedback() {
  const records  = recordsCache;
  const totalT   = records.reduce((s, r) => s + r.time, 0);
  const subMap   = {};
  records.forEach(r => { subMap[r.subject] = (subMap[r.subject] || 0) + r.time; });

  // AI Coach
  let coachMsg;
  if (student.level <= 2) {
    coachMsg = `${student.name} 학생은 공부 습관을 만들어가는 단계예요. 오늘 목표를 끝까지 완료하는 것부터 시작해봐요!`;
  } else if (student.level <= 4) {
    coachMsg = '꾸준히 성장하고 있어요! 이번 주에는 조금 더 어려운 문제에 도전해보세요.';
  } else {
    coachMsg = '정말 훌륭해요! 후배들에게 공부법을 알려줄 정도의 실력이에요!';
  }
  const recMsg = totalT < 120
    ? '25분 공부 + 5분 휴식을 반복하는 포모도로 공부법을 추천해요.'
    : '충분히 공부했어요. 복습 시간도 꼭 가져보세요.';

  document.getElementById('feedback-coach').innerHTML = `
    <div class="feedback-row"><span class="fb-icon">🤖</span><span>${coachMsg}</span></div>
    <div class="feedback-row"><span class="fb-icon">💬</span><span>${recMsg}</span></div>
  `;

  // Time analysis
  let timeFb;
  if (totalT === 0)       timeFb = '📌 아직 공부 기록이 없어요. 첫 번째 기록을 저장해보세요!';
  else if (totalT < 60)   timeFb = '📌 공부 시간이 조금 부족해요. 내일은 30분만 더 공부해볼까요?';
  else if (totalT < 180)  timeFb = '👏 적당한 공부시간이에요! 꾸준히 유지해보세요.';
  else                    timeFb = '🔥 정말 열심히 공부했어요! 충분한 휴식도 잊지 마세요.';

  document.getElementById('feedback-time').innerHTML = `
    <div class="feedback-row"><span class="fb-icon">⏱️</span><span>총 공부시간: <strong>${totalT}분</strong></span></div>
    <div class="feedback-row"><span class="fb-icon">💡</span><span>${timeFb}</span></div>
  `;

  // Subject feedback
  const subjEl = document.getElementById('feedback-subject');
  if (Object.keys(subMap).length === 0) {
    subjEl.innerHTML = `<div class="feedback-row"><span class="fb-icon">📚</span><span>아직 과목 기록이 없어요.</span></div>`;
  } else {
    const sorted = Object.entries(subMap).sort((a, b) => b[1] - a[1]);
    const most   = sorted[0][0];
    const least  = sorted[sorted.length - 1][0];
    subjEl.innerHTML = `
      <div class="feedback-row"><span class="fb-icon">✅</span><span>가장 많이 공부한 과목: <strong>${most}</strong></span></div>
      ${sorted.length > 1 ? `<div class="feedback-row"><span class="fb-icon">⚠️</span><span>가장 적게 공부한 과목: <strong>${least}</strong></span></div>
      <div class="feedback-row"><span class="fb-icon">💡</span><span>이번 주에는 <strong>${least}</strong> 공부를 조금 더 늘려보세요.</span></div>` : ''}
    `;
  }

  // Type feedback
  const fbByType = {
    탐구형: ["개념을 이해하는 능력이 뛰어나요.", "친구에게 설명하며 공부하면 더 효과적이에요.", "심화 문제에도 도전해보세요!"],
    반복형: ["꾸준한 반복이 가장 큰 장점이에요.", "오답노트를 적극 활용해보세요.", "다양한 유형의 문제도 풀어보세요."],
    몰입형: ["집중력이 매우 좋아요!", "25분 집중 + 5분 휴식을 반복해보세요.", "핵심 내용 요약 정리를 해보세요."],
    균형형: ["여러 과목을 균형 있게 공부해요.", "우선순위를 정하면 더 효율적이에요.", "하루 목표를 구체적으로 세워봐요."]
  };
  const tips = fbByType[student.studyType] || fbByType['균형형'];
  document.getElementById('feedback-type').innerHTML =
    tips.map(t => `<div class="feedback-row"><span class="fb-icon">✔</span><span>${t}</span></div>`).join('');
}

// ================================================
// GOAL TAB
// ================================================

async function addGoal() {
  const input = document.getElementById('goal-input');
  const text  = input.value.trim();
  if (!text) { showToast('목표를 입력해주세요! 🎯'); return; }

  const goal = { text, completed: false };
  try {
    const id = await requireFirebase().addGoal(student.name, goal);
    goalsCache.push({ id, ...goal });
  } catch (e) {
    console.error('addGoal failed:', e);
    showToast('⚠️ 목표 추가에 실패했어요. 인터넷 연결을 확인해주세요.');
    return;
  }
  input.value = '';
  renderGoals();
  showToast('목표가 추가됐어요! 🎯');
}

async function toggleGoal(id) {
  const g = goalsCache.find(g => g.id === id);
  if (!g) return;
  g.completed = !g.completed;
  renderGoals();
  try {
    await requireFirebase().updateGoal(student.name, id, { completed: g.completed });
  } catch (e) {
    console.error('toggleGoal failed:', e);
    showToast('⚠️ 목표 상태 저장에 실패했어요.');
  }
}

async function deleteGoal(id) {
  goalsCache = goalsCache.filter(g => g.id !== id);
  renderGoals();
  try {
    await requireFirebase().deleteGoal(student.name, id);
  } catch (e) {
    console.error('deleteGoal failed:', e);
    showToast('⚠️ 목표 삭제에 실패했어요.');
  }
}

function renderGoals() {
  const goals = goalsCache;
  const listEl = document.getElementById('goal-list');
  const progEl = document.getElementById('goal-progress-section');

  if (goals.length === 0) {
    listEl.innerHTML = emptyState('🎯', '목표를 추가하고 하나씩 달성해보세요!');
    progEl.innerHTML = '';
    return;
  }

  listEl.innerHTML = goals.map((g) => `
    <div class="goal-item">
      <div class="goal-check ${g.completed ? 'done' : ''}" onclick="toggleGoal('${g.id}')">
        ${g.completed ? '✓' : ''}
      </div>
      <span class="goal-text ${g.completed ? 'done' : ''}">${g.text}</span>
      <button class="btn-danger" onclick="deleteGoal('${g.id}')" title="삭제">✕</button>
    </div>
  `).join('');

  const done = goals.filter(g => g.completed).length;
  const pct  = Math.round((done / goals.length) * 100);

  progEl.innerHTML = `
    <div class="goal-progress-wrap">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="font-size:13px;color:var(--text-mid)">달성률</span>
        <span style="font-weight:700;color:var(--primary)">${done} / ${goals.length}  (${pct}%)</span>
      </div>
      <div class="xp-bar-wrap">
        <div class="xp-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,#95D5B2,var(--accent-green))"></div>
      </div>
    </div>
  `;
}

// ================================================
// ACHIEVEMENT TAB
// ================================================

function renderAchievements() {
  const records  = recordsCache;
  const totalT   = records.reduce((s, r) => s + r.time, 0);
  const goals    = goalsCache;
  const goalLen  = goals.length;
  const goalPct  = goalLen > 0 ? Math.round(goals.filter(g => g.completed).length / goalLen * 100) : 0;
  const quizCnt  = student.quizCount || 0;

  const ctx = { student, totalTime: totalT, quizCount: quizCnt, goalPct, goalLen };

  const unlocked = ACHIEVEMENTS_DEF.map(a => ({ ...a, earned: a.check(ctx) }));
  const earnedCnt = unlocked.filter(a => a.earned).length;
  const pct = Math.round((earnedCnt / unlocked.length) * 100);

  document.getElementById('achievement-bar-fill').style.width  = pct + '%';
  document.getElementById('achievement-bar-label').textContent =
    `${earnedCnt} / ${unlocked.length} 달성 (${pct}%)`;

  document.getElementById('achievement-list').innerHTML = unlocked.map(a => `
    <div class="achievement-item ${a.earned ? 'unlocked' : 'locked'}">
      <div class="ach-emoji">${a.emoji}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-status">${a.earned ? '✅ 달성!' : '미달성'}</div>
    </div>
  `).join('');
}

// ================================================
// STREAK TAB
// ================================================

function markStudyDay() {
  if (!student.streakDates) student.streakDates = [];
  const t = todayStr();
  if (!student.streakDates.includes(t)) {
    student.streakDates.push(t);
    saveStudent();
  }
}

function calcStreak() {
  const rawDates = student.streakDates || [];
  if (rawDates.length === 0) return 0;

  const uniqueSorted = [...new Set(rawDates)].sort().reverse(); // most recent first

  // Check if streak is active (last study was today or yesterday)
  const lastDay  = new Date(uniqueSorted[0] + 'T00:00:00');
  const now      = new Date();
  now.setHours(0, 0, 0, 0);
  const gap = Math.round((now - lastDay) / 86400000);
  if (gap > 1) return 0; // streak broken

  let streak = 1;
  for (let i = 0; i < uniqueSorted.length - 1; i++) {
    const d1   = new Date(uniqueSorted[i]     + 'T00:00:00');
    const d2   = new Date(uniqueSorted[i + 1] + 'T00:00:00');
    const diff = Math.round((d1 - d2) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function renderStreak() {
  const streak  = calcStreak();
  const dates   = new Set(student.streakDates || []);

  // Fire icons
  document.getElementById('streak-fire').textContent =
    streak > 0 ? '🔥'.repeat(Math.min(streak, 10)) : '💤';
  document.getElementById('streak-count').textContent = `${streak}일 연속 공부!`;

  let msg = '🌱 오늘부터 습관을 만들어봐요!';
  if      (streak >= 30) msg = '👑 공부 습관 마스터!';
  else if (streak >= 14) msg = '🌟 정말 꾸준해요!';
  else if (streak >= 7)  msg = '💪 좋은 습관이 생기고 있어요!';
  else if (streak >= 3)  msg = '😊 꾸준히 이어가고 있어요!';
  document.getElementById('streak-message').textContent = msg;

  // 30-day calendar
  const calEl = document.getElementById('streak-calendar');
  calEl.innerHTML = '';
  const todayKey = todayStr();
  for (let i = 29; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = `streak-day${dates.has(key) ? ' active' : ''}${key === todayKey ? ' today' : ''}`;
    div.textContent = d.getDate();
    div.title = key;
    calEl.appendChild(div);
  }
}

// ================================================
// CHALLENGE TAB
// ================================================

function renderChallenge() {
  const dispEl   = document.getElementById('challenge-display');
  const actionEl = document.getElementById('challenge-action');

  dispEl.innerHTML = `
    <div class="challenge-mission">${todayChallenge.mission}</div>
    <div class="challenge-reward-badge">⭐ 보상: EXP +${todayChallenge.reward}</div>
  `;

  if (challengeDone) {
    actionEl.innerHTML = `<div class="challenge-done-msg">✅ 오늘의 챌린지 완료! 정말 잘했어요!</div>`;
  } else {
    actionEl.innerHTML = `<button class="btn-primary" onclick="completeChallenge()">챌린지 완료!</button>`;
  }
}

function completeChallenge() {
  if (challengeDone) return;
  challengeDone = true;
  addExp(todayChallenge.reward);
  showToast(`🎉 챌린지 완료! EXP +${todayChallenge.reward}`);
  renderChallenge();
  // Update home tab preview too
  if (document.getElementById('tab-home').classList.contains('active')) renderHome();
}

// ================================================
// EXP & LEVELING
// ================================================

function addExp(amount) {
  student.exp += amount;

  while (student.exp >= student.level * 10) {
    student.exp   -= student.level * 10;
    student.level += 1;
    showToast(`🎉 레벨업! Lv.${student.level} 달성!`);
  }

  saveStudent();
  updateHeader();

  // Refresh level tab if open
  if (document.getElementById('tab-level').classList.contains('active')) renderLevel();
}

// ================================================
// HELPERS
// ================================================

function emptyState(emoji, msg) {
  return `<div class="empty-state"><span class="e-emoji">${emoji}</span><p>${msg}</p></div>`;
}

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}
