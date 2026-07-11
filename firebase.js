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
// 연결(WebChannel)이 차단되어 "client is offline" 오류가 발생할 수 있습니다.
// long-polling으로 자동 전환하도록 설정해 이 문제를 회피합니다.
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
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

// ------------------------------------------------
// 3) app.js에서 쓸 수 있도록 전역에 노출
// ------------------------------------------------
window.FirebaseDB = {
  getStudent,
  saveStudent,
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  getRecords,
  addRecord
};

// firebase.js가 정상적으로 로드되었는지 app.js에서 확인할 수 있는 플래그
window.FirebaseDB.ready = true;
