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

## 데이터 저장
`data/` 폴더에 텍스트 파일로 저장됩니다. 첫 실행 시 자동 생성됩니다.

## 의존성
표준 라이브러리만 사용 (`os`, `random`, `datetime`). 별도 패키지 설치 불필요.

## User preferences
- Keep the existing OOP structure and Korean language throughout the codebase.
