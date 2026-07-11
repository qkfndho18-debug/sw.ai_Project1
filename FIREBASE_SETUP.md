# 🔥 Firebase 설정 체크리스트

StudyBloom을 GitHub Pages에 올리기 전, Firebase Console에서 아래 단계를 순서대로 진행하세요.
전부 완료하면 `firebase.js`의 `firebaseConfig` 값만 채우면 됩니다.

## 1. Firebase 프로젝트 만들기

- [ ] [Firebase Console](https://console.firebase.google.com)에 접속해서 로그인
- [ ] **"프로젝트 추가"** 클릭 → 프로젝트 이름 입력 (예: `studybloom`)
- [ ] Google Analytics는 사용하지 않아도 무방 (끄고 진행 가능)
- [ ] 프로젝트 생성 완료까지 대기

## 2. 웹 앱 등록

- [ ] 프로젝트 개요 화면에서 **`</>`(웹) 아이콘** 클릭
- [ ] 앱 닉네임 입력 (예: `studybloom-web`) — Firebase Hosting은 사용하지 않으므로 관련 체크박스는 선택하지 않아도 됩니다
- [ ] **"앱 등록"** 클릭하면 `firebaseConfig` 객체가 표시됩니다 — 이 값을 복사해두세요

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

- [ ] 복사한 값을 프로젝트의 `firebase.js` 상단 `firebaseConfig` 객체에 그대로 붙여넣기 (`YOUR_API_KEY` 등 placeholder를 실제 값으로 교체)

## 3. Firestore Database 만들기

- [ ] 좌측 메뉴 **빌드 > Firestore Database** 클릭
- [ ] **"데이터베이스 만들기"** 클릭
- [ ] 위치(location)는 한 번 정하면 변경할 수 없으니 서비스 대상 지역과 가까운 곳으로 선택 (예: `asia-northeast3 (서울)`)
- [ ] 보안 규칙 모드 선택 화면에서는 우선 **"테스트 모드"**로 시작해도 되지만, 아래 4단계에서 이 프로젝트에 맞는 규칙으로 바로 교체하는 것을 권장합니다

## 4. 보안 규칙(Rules) 적용

- [ ] Firestore Database 화면에서 **"규칙(Rules)"** 탭 클릭
- [ ] 이 프로젝트의 `firestore.rules` 파일 내용을 그대로 복사해서 붙여넣기
- [ ] **"게시(Publish)"** 클릭

> ⚠️ 이 프로젝트는 로그인 기능이 없어서 규칙이 `allow read, write: if true`로 열려 있습니다. 개인/학습용 프로젝트에는 충분하지만, 여러 명이 실제로 쓰는 서비스로 키우려면 Firebase Authentication을 추가하고 규칙을 더 좁히는 것을 권장합니다.

## 5. (선택) 데이터 구조 확인

Firestore는 스키마를 미리 만들 필요가 없습니다 — 앱에서 첫 학생이 로그인하면 아래 구조가 자동으로 생성됩니다.

```
students (컬렉션)
└── {학생 이름} (문서)         예: "홍길동"
    ├── name, grade, level, exp
    ├── studyType, typeScore
    ├── examDate, examSubjects[]
    ├── quizCount, streakDates[]
    ├── plan { "YYYY-MM-DD": {...} }
    │
    ├── goals (서브컬렉션)
    │   └── {자동 생성 ID} (문서) — text, completed, createdAt
    │
    └── records (서브컬렉션)
        └── {자동 생성 ID} (문서) — subject, time, date, createdAt
```

- [ ] 로컬(Replit) 또는 GitHub Pages에서 앱을 실행 → 학생 등록 → Firestore Database의 "데이터" 탭에서 `students` 컬렉션이 자동 생성되는지 확인

## 6. GitHub Pages에 배포

- [ ] GitHub 저장소에 이 프로젝트 전체(루트의 `index.html`, `style.css`, `app.js`, `firebase.js` 포함)를 push
- [ ] GitHub 저장소 **Settings > Pages**로 이동
- [ ] **Source**를 `Deploy from a branch`로 설정, 브랜치는 `main`(또는 사용 중인 브랜치), 폴더는 `/ (root)` 선택 후 저장
- [ ] 몇 분 후 표시되는 `https://<사용자명>.github.io/<저장소명>/` 주소로 접속해 확인
- [ ] 접속 후 로그인 화면이 정상적으로 뜨고, 학생 등록 시 Firestore에 데이터가 저장되는지 확인 (5단계와 동일한 방식으로 콘솔에서 확인)

## 7. 도메인/CORS 관련 참고

- [ ] Firestore는 별도의 CORS 설정이 필요 없습니다 — Firebase SDK가 처리합니다. `firebaseConfig`만 정확하면 GitHub Pages 도메인에서 바로 동작합니다
- [ ] `apiKey`는 브라우저에 노출되어도 되는 값입니다(비밀키가 아님). 실제 접근 제어는 3~4단계의 Firestore 보안 규칙이 담당합니다

---

체크리스트를 모두 완료하면 별도 서버나 Python 없이, GitHub Pages(정적 호스팅) + Firebase Firestore(데이터베이스)만으로 StudyBloom이 완전히 동작합니다.
