/* ==============================================
   StudyBloom — firebase.js
   Firebase Firestore 데이터 레이어 (CRUD)
   ==============================================
   이 파일은 ES 모듈로 로드됩니다 (index.html의
   <script type="module" src="firebase.js">).
   app.js(일반 스크립트)에서 사용할 수 있도록
   window.FirebaseDB 객체에 함수들을 노출합니다.
================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ------------------------------------------------
// 1) Firebase 프로젝트 설정
// ------------------------------------------------
// Firebase 콘솔(https://console.firebase.google.com) > 프로젝트 설정 >
// "내 앱" > 웹 앱 추가에서 발급받은 값을 아래에 붙여넣으세요.
// (자세한 절차는 FIREBASE_SETUP.md 체크리스트를 참고하세요.)
const firebaseConfig = {
  apiKey: "AIzaSyC-gIhs6Ak-6iOKwVYlPIH-Js6oj8HWQEE",
  authDomain: "sw-ai-project1.firebaseapp.com",
  projectId: "sw-ai-project1",
  storageBucket: "sw-ai-project1.firebasestorage.app",
  messagingSenderId: "369033362804",
  appId: "1:369033362804:web:0ae5fff43dc258272e8021",
  measurementId: "G-QZYWBGFT96"
};

const app = initializeApp(firebaseConfig);

// Replit 프리뷰 등 일부 프록시/네트워크 환경에서는 Firestore의 기본 스트리밍
// 연결(WebChannel)이 차단되어 "client is offline" 오류가 발생하거나, 연결
// 방식을 자동으로 판별하는 과정 자체가 멈춰버릴 수 있습니다. 판별 과정 없이
// long-polling을 강제로 사용하도록 설정해 이 문제를 회피합니다.
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
});

// ------------------------------------------------
// 2) Firestore 컬렉션 구조
// ------------------------------------------------
// students/{studentName}                     — 학생 문서 (이름을 문서 ID로 사용)
//   name, grade, level, exp, studyType, typeScore,
//   examDate, examSubjects[], quizCount, streakDates[],
//   plan{ "YYYY-MM-DD": { daysLeft, tasks[] } }, updatedAt
//
// students/{studentName}/goals/{goalId}       — 학생별 목표 서브컬렉션
//   text, completed, createdAt
//
// students/{studentName}/records/{recordId}   — 학생별 공부 기록 서브컬렉션
//   subject, time(분), date("YYYY-MM-DD"), createdAt

function studentRef(name) {
  return doc(db, "students", name);
}

// ---------- 학생(student) CRUD ----------

async function getStudent(name) {
  const snap = await getDoc(studentRef(name));
  return snap.exists() ? snap.data() : null;
}

async function saveStudent(name, data) {
  await setDoc(studentRef(name), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ---------- 목표(goals) CRUD ----------

async function getGoals(name) {
  const snap = await getDocs(collection(db, "students", name, "goals"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function addGoal(name, goal) {
  const ref = await addDoc(collection(db, "students", name, "goals"), {
    ...goal,
    createdAt: serverTimestamp()
  });
  return ref.id;
}

async function updateGoal(name, goalId, updates) {
  await updateDoc(doc(db, "students", name, "goals", goalId), updates);
}

async function deleteGoal(name, goalId) {
  await deleteDoc(doc(db, "students", name, "goals", goalId));
}

// ---------- 공부 기록(records) CRUD ----------

async function getRecords(name) {
  const q    = query(collection(db, "students", name, "records"), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function addRecord(name, record) {
  const ref = await addDoc(collection(db, "students", name, "records"), {
    ...record,
    createdAt: serverTimestamp()
  });
  return ref.id;
}

// ---------- 연결 진단 ----------
// Firestore SDK(WebChannel/long-polling) 연결이 실패했을 때, 같은 프로젝트에
// 대해 일반 REST 방식으로도 접속을 시도해서 원인을 좁힙니다.
// - REST도 실패  → 이 네트워크에서 firestore.googleapis.com 자체가 막혀 있음
// - REST는 성공  → SDK의 스트리밍 연결 방식만 막혀 있음 (방화벽/보안 소프트웨어가
//                  '/Listen/channel' 같은 스트리밍 URL 패턴을 특별히 차단하는 경우가 많음)
async function diagnoseConnection() {
  const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/students?key=${firebaseConfig.apiKey}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    return { restOk: res.ok, status: res.status };
  } catch (e) {
    return { restOk: false, status: null, error: e.message };
  }
}

// ------------------------------------------------
// 4) app.js에서 쓸 수 있도록 전역에 노출
// ------------------------------------------------
window.FirebaseDB = {
  getStudent,
  saveStudent,
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  getRecords,
  addRecord,
  diagnoseConnection
};

// firebase.js가 정상적으로 로드되었는지 app.js에서 확인할 수 있는 플래그
window.FirebaseDB.ready = true;
