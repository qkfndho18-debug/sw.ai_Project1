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

const QUIZ_POOL = [
  { q: "파이썬에서 리스트를 만드는 기호는?",      c: ["{ }","[ ]","( )","< >"],        a: 1 },
  { q: "파이썬에서 반복문 키워드는?",             c: ["repeat","while","loop","each"],  a: 1 },
  { q: "대한민국의 수도는?",                     c: ["부산","인천","서울","대전"],        a: 2 },
  { q: "객체지향에서 객체를 만드는 틀은?",         c: ["변수","함수","클래스","리스트"],    a: 2 },
  { q: "Python의 print() 함수는?",              c: ["입력","출력","저장","삭제"],        a: 1 },
  { q: "HTML의 약자에 포함된 단어는?",           c: ["HyperText","HighText","HeavyText","HardText"], a: 0 },
  { q: "CSS에서 글자 크기를 바꾸는 속성은?",      c: ["font-weight","text-size","font-size","text-style"], a: 2 },
  { q: "다음 중 소수(prime number)는?",          c: ["4","6","7","9"],                  a: 2 },
  { q: "1시간은 몇 분인가요?",                   c: ["30분","45분","60분","90분"],        a: 2 },
  { q: "세계에서 가장 높은 산은?",               c: ["K2","에베레스트","마나슬루","킬리만자로"], a: 1 },
  { q: "JavaScript에서 변수를 선언하는 키워드가 아닌 것은?", c: ["var","let","const","set"], a: 3 },
  { q: "이진법에서 10은 십진법으로 얼마?",        c: ["2","4","8","10"],                 a: 0 }
];

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
// STATE
// ================================================

let student        = null;   // { name, grade, level, exp, studyType, typeScore }
let quizIndex      = 0;
let quizScores     = {};
let todayChallenge = null;
let challengeDone  = false;
let dailyQuiz      = { item: null, answered: false };

// ================================================
// STORAGE HELPERS
// ================================================

const LS = {
  get:    (k)    => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set:    (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  remove: (k)    => localStorage.removeItem(k)
};

function saveStudent()       { if (student) LS.set('sb_student_' + student.name, student); }
function loadStudentData(n)  { return LS.get('sb_student_' + n); }
function getRecords()        { return LS.get('sb_records') || []; }
function saveRecords(r)      { LS.set('sb_records', r); }
function getGoals(n)         { return LS.get('sb_goals_' + n) || []; }
function saveGoals(n, g)     { LS.set('sb_goals_' + n, g); }
function getStreakDates(n)   { return LS.get('sb_streak_' + n) || []; }
function saveStreakDates(n,d) { LS.set('sb_streak_' + n, d); }
function getQuizCount(n)     { return LS.get('sb_quiz_' + n) || 0; }
function saveQuizCount(n, c) { LS.set('sb_quiz_' + n, c); }

function todayStr() {
  return new Date().toISOString().slice(0, 10);
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

function handleLogin() {
  const name  = document.getElementById('input-name').value.trim();
  const grade = document.getElementById('input-grade').value;

  if (!name)  { showToast('이름을 입력해주세요! ✏️'); return; }
  if (!grade) { showToast('학년을 선택해주세요! 📚'); return; }

  const existing = loadStudentData(name);
  if (existing) {
    student = existing;
    // Returning student — go straight to dashboard
    initDashboard();
    showScreen('screen-dashboard');
    showToast(`다시 왔군요, ${student.name}! 반가워요 😊`);
  } else {
    // New student — run quiz first
    student = { name, grade, level: 1, exp: 0, studyType: '', typeScore: {} };
    quizIndex  = 0;
    quizScores = {};
    showScreen('screen-quiz');
    renderQuiz();
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

  // Plan preview
  const planEl = document.getElementById('result-plan-preview');
  planEl.className = 'result-card';
  planEl.innerHTML = '<h4>📅 오늘의 학습 계획</h4>' +
    info.plan.map((p, i) => `<div class="plan-row"><span class="plan-num">${i + 1}</span><span>${p}</span></div>`).join('');

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

  // Study plan
  document.getElementById('home-plan-list').innerHTML = info.plan
    .map((p, i) => `<div class="plan-list-item"><span class="plan-num">${i + 1}</span><span>${p}</span></div>`)
    .join('');

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
// RECORD TAB
// ================================================

function saveRecord() {
  const subject = document.getElementById('record-subject').value.trim();
  const time    = parseInt(document.getElementById('record-time').value, 10);

  if (!subject)        { showToast('과목을 입력해주세요! 📚'); return; }
  if (!time || time < 1) { showToast('올바른 공부 시간을 입력해주세요!'); return; }

  const records = getRecords();
  records.push({ date: todayStr(), name: student.name, subject, time });
  saveRecords(records);

  const expGain = Math.floor(time / 10);
  addExp(expGain);
  markStudyDay();

  document.getElementById('record-subject').value = '';
  document.getElementById('record-time').value    = '';

  showToast(`✨ 저장 완료! EXP +${expGain}`);
  renderRecords();
}

function renderRecords() {
  const myRecords = getRecords()
    .filter(r => r.name === student.name)
    .reverse();

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
  const records  = getRecords().filter(r => r.name === student.name);
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

function renderDailyQuiz() {
  if (!dailyQuiz.item) {
    dailyQuiz.item     = QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
    dailyQuiz.answered = false;
  }
  drawQuizUI();
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
    ? `<div class="quiz-result-badge correct">🎉 정답이에요! EXP +5</div>`
    : '';

  const nextBtn = dailyQuiz.answered
    ? `<button class="btn-secondary" style="margin-top:12px" onclick="nextDailyQuiz()">다음 문제 →</button>`
    : '';

  area.innerHTML = `
    <p class="quiz-daily-q">${item.q}</p>
    <div class="quiz-choices">${choiceButtons}</div>
    ${resultBadge}
    ${nextBtn}
  `;
}

function answerDailyQuiz(idx) {
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
    <p class="quiz-daily-q">${item.q}</p>
    <div class="quiz-choices">${choiceBtns}</div>
    ${badge}
    <button class="btn-secondary" style="margin-top:12px" onclick="nextDailyQuiz()">다음 문제 →</button>
  `;

  dailyQuiz.answered = true;

  if (correct) {
    addExp(5);
    const cnt = getQuizCount(student.name) + 1;
    saveQuizCount(student.name, cnt);
    showToast('🧠 정답! EXP +5');
  }
}

function nextDailyQuiz() {
  dailyQuiz.item     = QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
  dailyQuiz.answered = false;
  drawQuizUI();
}

// ================================================
// FEEDBACK TAB
// ================================================

function renderFeedback() {
  const records  = getRecords().filter(r => r.name === student.name);
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

function addGoal() {
  const input = document.getElementById('goal-input');
  const text  = input.value.trim();
  if (!text) { showToast('목표를 입력해주세요! 🎯'); return; }

  const goals = getGoals(student.name);
  goals.push({ text, completed: false });
  saveGoals(student.name, goals);
  input.value = '';
  renderGoals();
  showToast('목표가 추가됐어요! 🎯');
}

function toggleGoal(idx) {
  const goals = getGoals(student.name);
  if (!goals[idx]) return;
  goals[idx].completed = !goals[idx].completed;
  saveGoals(student.name, goals);
  renderGoals();
}

function deleteGoal(idx) {
  const goals = getGoals(student.name);
  goals.splice(idx, 1);
  saveGoals(student.name, goals);
  renderGoals();
}

function renderGoals() {
  const goals = getGoals(student.name);
  const listEl = document.getElementById('goal-list');
  const progEl = document.getElementById('goal-progress-section');

  if (goals.length === 0) {
    listEl.innerHTML = emptyState('🎯', '목표를 추가하고 하나씩 달성해보세요!');
    progEl.innerHTML = '';
    return;
  }

  listEl.innerHTML = goals.map((g, i) => `
    <div class="goal-item">
      <div class="goal-check ${g.completed ? 'done' : ''}" onclick="toggleGoal(${i})">
        ${g.completed ? '✓' : ''}
      </div>
      <span class="goal-text ${g.completed ? 'done' : ''}">${g.text}</span>
      <button class="btn-danger" onclick="deleteGoal(${i})" title="삭제">✕</button>
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
  const records  = getRecords().filter(r => r.name === student.name);
  const totalT   = records.reduce((s, r) => s + r.time, 0);
  const goals    = getGoals(student.name);
  const goalLen  = goals.length;
  const goalPct  = goalLen > 0 ? Math.round(goals.filter(g => g.completed).length / goalLen * 100) : 0;
  const quizCnt  = getQuizCount(student.name);

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
  const dates = getStreakDates(student.name);
  const t     = todayStr();
  if (!dates.includes(t)) {
    dates.push(t);
    saveStreakDates(student.name, dates);
  }
}

function calcStreak() {
  const rawDates  = getStreakDates(student.name);
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
  const dates   = new Set(getStreakDates(student.name));

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
    const key = d.toISOString().slice(0, 10);
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
