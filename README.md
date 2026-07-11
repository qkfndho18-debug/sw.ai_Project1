# 🌱 StudyBloom

## 학생 맞춤형 자기주도 학습 관리 웹앱

StudyBloom은 학생의 학습 성향을 분석하고, 시험 날짜와 시험 과목에 맞춘
개인별 학습 계획을 자동으로 생성해주는 웹 애플리케이션입니다.

**HTML / CSS / JavaScript만으로 동작하는 정적 사이트**이며, 데이터는
**Firebase Firestore**에 저장됩니다. 별도의 서버(Python, Flask 등)가
필요 없어서 GitHub Pages 같은 정적 호스팅에 그대로 배포할 수 있습니다.

---

## 주요 기능

- 👤 **학생 등록** — 이름, 학년, 시험 날짜(D-day), 시험 과목 입력
- 📖 **학습 성향 검사** — 탐구형 / 반복형 / 몰입형 / 균형형 4가지 유형 분석
- 📅 **맞춤 학습 계획 자동 생성** — 성향 × 시험 과목 × 시험까지 남은 기간 기반, 날짜별 캘린더에서 확인
- 📚 **공부 기록** — 과목·시간 기록 및 조회
- 📊 **학습 통계** — 과목별 공부 시간 분석
- 🤖 **AI 학습 코치 피드백**
- ⭐ **레벨/경험치 시스템**
- 🧠 **오늘의 퀴즈** — 선택한 시험 과목 기반 문제 출제
- 🎯 **목표 관리**
- 🏅 **업적(배지) 시스템**
- 🔥 **연속 공부일(스트릭) 관리**
- 🌟 **오늘의 챌린지**

---

## 프로젝트 구조

```
StudyBloom/
├── index.html          # 전체 화면 마크업 (로그인 → 성향검사 → 대시보드)
├── style.css           # 전체 스타일 (모바일 대응 포함)
├── app.js              # 앱 로직 (화면 전환, 학습 계획 생성, 렌더링 등)
├── firebase.js         # Firebase Firestore 연동 (CRUD)
├── firestore.rules     # Firestore 보안 규칙 (Firebase 콘솔에 붙여넣는 참고 파일)
├── FIREBASE_SETUP.md   # Firebase Console 설정 단계별 체크리스트
├── .nojekyll           # GitHub Pages에서 Jekyll 처리를 건너뛰기 위한 파일
└── python-cli/         # (참고용) 초기 프로토타입이었던 Python CLI 버전 — 웹앱과 무관, 배포 대상 아님
```

---

## 데이터 저장 (Firebase Firestore)

로그인 없이 학생 이름을 문서 ID로 사용합니다.

```
students/{학생 이름}
  ├── name, grade, level, exp
  ├── studyType, typeScore
  ├── examDate, examSubjects[]
  ├── quizCount, streakDates[]
  ├── plan { "YYYY-MM-DD": { daysLeft, tasks[] } }
  │
  ├── goals/{goalId}      (서브컬렉션) — text, completed, createdAt
  └── records/{recordId}  (서브컬렉션) — subject, time, date, createdAt
```

---

## 실행 방법 (로컬 개발)

정적 파일이므로 아무 정적 서버로 열면 됩니다. 예:

```bash
python -m http.server 5000
```

브라우저에서 `http://localhost:5000` 접속.

> Firestore와 통신하려면 `firebase.js`의 `firebaseConfig`에 실제 Firebase
> 프로젝트 값을 넣어야 합니다. 설정 방법은 [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) 참고.

---

## GitHub Pages 배포

1. 이 저장소를 GitHub에 push (루트에 `index.html`이 있는 상태 그대로)
2. GitHub 저장소 **Settings → Pages**
3. **Source**: `Deploy from a branch` → 브랜치 `main`, 폴더 `/ (root)` 선택 후 저장
4. 잠시 후 `https://<사용자명>.github.io/<저장소명>/`에서 확인

Firebase 콘솔 설정은 [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)의 체크리스트를 따라 진행하세요.

---

## 사용 기술

- HTML5 / CSS3 / Vanilla JavaScript (프레임워크·빌드 도구 없음)
- Firebase Firestore (Firebase JS SDK v10, CDN 모듈 방식)
- GitHub Pages (정적 호스팅)

---

## 향후 개선 계획

- Firebase Authentication 연동 (현재는 이름만으로 식별)
- 학습 통계 그래프 시각화 고도화
- PWA(오프라인 지원) 전환

---

## 참고: python-cli/ 폴더

`python-cli/` 폴더는 이 프로젝트의 **초기 프로토타입**이었던 객체지향 Python
CLI 버전입니다. 현재 웹앱(`index.html`/`app.js`/`firebase.js`)과는 완전히
독립적이며, GitHub Pages 배포에도 포함되지 않습니다. 참고용으로만 보관되어
있으니 실행하려면 해당 폴더로 이동해 `python main.py`를 실행하세요.
