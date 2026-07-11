# StudyBloom

## 프로젝트 소개
학생 맞춤형 자기주도 학습 관리 프로그램 (Python CLI)

학생의 학습 성향을 분석하고 개인 맞춤형 공부 계획을 추천합니다.

## 실행 방법
```bash
python main.py
```

## 프로젝트 구조
- `main.py` — 진입점 및 메인 메뉴 루프
- `student.py` — 학생 정보 (이름, 학년, 레벨, 경험치)
- `analyzer.py` — 학습 성향 검사 및 분석
- `planner.py` — 맞춤 공부 계획 생성
- `record.py` — 공부 기록 저장/조회 (`data/records.txt`)
- `level.py` — 레벨/경험치 시스템
- `quiz.py` — 오늘의 퀴즈
- `feedback.py` — AI 학습 코치 피드백
- `goal.py` — 목표 설정 및 관리 (`data/goals.txt`)
- `achievement.py` — 업적(배지) 시스템
- `streak.py` — 연속 공부일 관리 (`data/streak.txt`)
- `statistics.py` — 학습 통계 분석
- `challenge.py` — 오늘의 챌린지

이와 별도로 `index.html` / `app.js` / `style.css`로 구성된 **웹 버전(SPA)** 이 있으며, `python -m http.server 5000`으로 서빙됩니다. 데이터는 브라우저 `localStorage`에 저장됩니다 (Python 버전의 `data/*.txt`와는 별개).

## 웹 버전 주요 기능 (app.js)
- 로그인 화면에서 이름/학년과 함께 **시험 날짜(D-day)**, **시험 과목**(국어/영어/수학/사회/과학 + 기타 직접입력)을 선택
- 성향 검사 완료 시 성향(탐구형/반복형/몰입형/균형형) × 시험 과목 × 시험일까지 남은 기간을 기반으로 **날짜별 맞춤 학습 계획**을 자동 생성 (`generateStudyPlan`, `sb_plan_<이름>`에 저장). 시험 3일 전부터는 "총정리" 모드로 전환됨
- 대시보드에 **📅 계획 탭**을 추가: 월별 캘린더에서 날짜를 클릭하면 해당 날짜의 학습 계획 상세를 확인 가능. "시험 정보 수정"으로 시험일/과목을 언제든 변경하면 계획이 재생성됨
- 홈 탭에 D-day 배너 표시
- **오늘의 퀴즈**는 학생이 선택한 시험 과목(`QUIZ_BY_SUBJECT`) 중 하나를 무작위로 골라 출제하며, 문제 위에 과목 태그를 표시. 시험 과목이 없으면 일반 상식(`QUIZ_GENERAL`) 문제 출제
- 모바일 대응: 터치 타깃 확대(버튼/탭 최소 44px), iOS 확대 방지를 위한 입력창 폰트 16px, 캘린더/배너/설정 폼의 모바일 전용 레이아웃

## 데이터 저장
`data/` 폴더에 텍스트 파일로 저장됩니다 (Python CLI 버전, 첫 실행 시 자동 생성). 웹 버전은 `localStorage`를 사용합니다.

## 의존성
Python 버전: 표준 라이브러리만 사용 (`os`, `random`, `datetime`). 웹 버전: 순수 HTML/CSS/JS, 별도 패키지 설치 불필요.

## User preferences
- Keep the existing OOP structure and Korean language throughout the codebase.
