# StudyBloom

## 프로젝트 소개
학생 맞춤형 자기주도 학습 관리 **웹앱**. 학생의 학습 성향을 분석하고,
시험 날짜/과목에 맞춘 개인별 공부 계획을 자동으로 추천합니다.

## 아키텍처
순수 **정적 HTML/CSS/JS** (프레임워크·서버 없음) + **Firebase Firestore**
데이터 저장. Python/Flask 등 서버 사이드 로직은 전혀 사용하지 않으며,
GitHub Pages 같은 정적 호스팅에 그대로 배포할 수 있도록 설계되어 있습니다.

- `index.html` / `style.css` / `app.js` — 화면과 앱 로직 (기존과 동일)
- `firebase.js` — Firebase Firestore 연동 (CRUD). ES 모듈로 로드되어
  `window.FirebaseDB`에 함수들을 노출하고, 일반 스크립트인 `app.js`가 이를
  호출합니다 (module로 바꾸면 `index.html`의 인라인 `onclick` 핸들러가
  깨지기 때문에 이 방식을 선택함)
- `firestore.rules` — Firebase 콘솔에 붙여넣는 보안 규칙 참고 파일
- `FIREBASE_SETUP.md` — Firebase Console에서 프로젝트 생성부터
  GitHub Pages 배포까지의 단계별 체크리스트
- `.nojekyll` — GitHub Pages가 Jekyll로 파일을 가공하지 않도록 하는 빈 파일
- `python-cli/` — 이 프로젝트의 **초기 프로토타입**이었던 별개의 Python
  OOP CLI 구현. 현재 웹앱과는 완전히 독립적이며 GitHub Pages 배포 대상이
  아님 (참고용으로만 보관)

## 로컬 실행
```bash
python -m http.server 5000
```
(정적 파일 서빙용 편의 명령일 뿐, 애플리케이션 로직은 전부 클라이언트 JS에 있음)

## 데이터 저장 (Firebase Firestore)
로그인 없이 학생 이름을 문서 ID로 사용합니다.
```
students/{학생 이름}
  ├── name, grade, level, exp, studyType, typeScore
  ├── examDate, examSubjects[], quizCount, streakDates[]
  ├── plan { "YYYY-MM-DD": { daysLeft, tasks[] } }
  ├── goals/{goalId}      (서브컬렉션)
  └── records/{recordId}  (서브컬렉션)
```
`app.js`는 로그인 시 학생 문서 + goals + records를 한 번에 불러와
`goalsCache`/`recordsCache`(및 `student` 객체)에 캐시하고, 렌더링은 이
캐시에서 동기적으로 읽습니다. 변경(추가/토글/삭제)이 있을 때만 Firestore에
비동기로 반영합니다.

## Firebase 설정 필요
`firebase.js`의 `firebaseConfig`는 현재 placeholder(`YOUR_API_KEY` 등)
상태입니다. 실제로 데이터를 저장하려면 사용자가 Firebase 콘솔에서 프로젝트를
만들고 값을 채워야 합니다 — 절차는 `FIREBASE_SETUP.md` 참고.

## 의존성
순수 HTML/CSS/JS + Firebase JS SDK v10 (CDN 모듈, `npm install` 불필요).
`python-cli/`는 표준 라이브러리만 사용하는 별개 프로그램입니다.

## User preferences
- Keep the existing OOP structure and Korean language throughout the codebase.
- 배포 타깃은 GitHub Pages (정적 호스팅) + Firebase Firestore. 서버 사이드 코드(Flask 등)는 추가하지 않음.
