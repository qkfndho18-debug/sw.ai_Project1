# 🌱 StudyBloom

## 나만의 자기주도 학습 플래너

**StudyBloom**은 학생의 학습 성향을 분석하고, 시험 날짜·과목에 맞춘 개인
맞춤형 학습 계획을 자동으로 추천해주는 자기주도 학습 관리 웹앱입니다.

이름과 학년, 시험 정보를 입력하면 간단한 성향 검사를 통해 **탐구형 / 반복형
/ 몰입형 / 균형형** 중 자신의 학습 유형을 파악하고, 그 유형과 시험까지 남은
기간(D-day)을 함께 고려한 날짜별 학습 계획을 받아볼 수 있습니다. 이후에는
공부 기록, 목표, 통계, 레벨/경험치, 오늘의 퀴즈, 업적, 연속 공부일(스트릭)
등을 통해 꾸준히 자신의 학습 습관을 관리해나갈 수 있습니다.

---

## 프로젝트가 만들어진 과정

이 프로젝트는 처음에 **Python으로 객체지향(OOP) 구조의 기초 로직**을
설계하는 것에서 출발했습니다. 학생 정보, 성향 분석, 학습 계획, 레벨 시스템,
목표 관리 등 앱에 필요한 각 기능을 하나의 책임을 갖는 클래스로 나누어
작성했습니다.

이후 Replit 환경에서 이 Python 기반 설계를 바탕으로 **HTML/CSS/JavaScript로
이루어진 웹 애플리케이션**으로 새로 구현했습니다. Python 버전의 클래스 구조가
가진 기능과 화면 흐름을 그대로 웹으로 옮기고, 모바일에서도 자연스럽게 쓸 수
있도록 반응형 UI로 다듬었습니다.

데이터 저장 방식도 한 단계 더 발전시켰습니다. 처음에는 브라우저
`localStorage`에 데이터를 저장했지만, 여러 기기에서도 데이터가 유지되도록
**Firebase Firestore**를 데이터베이스로 연동하여 학생 정보·목표·공부
기록이 클라우드에 저장되도록 마이그레이션했습니다.

최종적으로는 별도의 서버 없이 정적 파일만으로 동작하는 구조로 정리하여
**GitHub Pages**에 배포했습니다.

```
Python (OOP 설계) → Replit에서 HTML/CSS/JS로 재구현 → Firebase Firestore 연동 → GitHub Pages 배포
```

---

## Python 기초 설계에서 사용한 클래스 (`python-cli/`)

웹앱을 만들기 전 기초 로직을 설계했던 Python OOP 버전에서 사용한 클래스는
다음과 같습니다. (현재는 웹앱과 독립적인 참고용 프로토타입으로
`python-cli/` 폴더에 보관되어 있습니다.)

| 클래스 | 파일 | 역할 |
|---|---|---|
| `Student` | `student.py` | 학생 정보(이름, 학년, 레벨, 경험치, 학습 성향 등) 관리 |
| `Analyzer` | `analyzer.py` | 학습 성향 검사 문항 제공 및 성향 분석 |
| `StudyPlan` | `planner.py` | 학습 성향에 맞는 맞춤 공부 계획 생성 |
| `RecordManager` | `record.py` | 공부 기록 저장 및 조회 (`data/records.txt`) |
| `LevelSystem` | `level.py` | 공부 시간 기반 경험치 계산 및 레벨/등급 관리 |
| `Quiz` | `quiz.py` | 오늘의 퀴즈 문제 출제 및 채점 |
| `Feedback` | `feedback.py` | 공부 시간·기록을 분석한 맞춤형 피드백 제공 |
| `Goal` | `goal.py` | 목표 설정, 달성 여부 관리 (`data/goals.txt`) |
| `Achievement` | `achievement.py` | 업적(배지) 달성 조건 판별 및 관리 |
| `Streak` | `streak.py` | 연속 공부일(스트릭) 계산 및 관리 |
| `Statistics` | `statistics.py` | 전체/과목별 공부 시간 등 학습 통계 분석 |
| `Challenge` | `challenge.py` | 오늘의 학습 챌린지 미션 제공 |

웹 버전에서는 이 클래스들이 각각 담당하던 역할을 `app.js`의 함수들과
Firebase Firestore의 데이터 구조(`students`, `goals`, `records` 컬렉션)로
재구성해 동일한 기능을 구현했습니다.

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
└── python-cli/         # 초기 Python OOP 설계 버전 (위 클래스 표 참고) — 웹앱과 무관, 배포 대상 아님
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
> 프로젝트 값이 들어 있어야 합니다. 설정 방법은 [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) 참고.

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
- Python 3 (초기 OOP 설계 단계, `python-cli/`)

---

## 향후 개선 계획

- Firebase Authentication 연동 (현재는 이름만으로 식별)
- 학습 통계 그래프 시각화 고도화
- PWA(오프라인 지원) 전환

---

## 개발자

StudyBloom Project
