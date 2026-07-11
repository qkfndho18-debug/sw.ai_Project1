"""
main.py

StudyBloom 실행 파일
"""

from student import Student
from analyzer import Analyzer
from record import RecordManager
from level import LevelSystem
from planner import StudyPlan
from quiz import Quiz
from feedback import Feedback
from goal import Goal
from achievement import Achievement
from streak import Streak
from statistics import Statistics
from challenge import Challenge


# ----------------------------
# 메인 함수
# ----------------------------

def main():

    print("=" * 40)
    print("🌱 Welcome to StudyBloom 🌱")
    print("학생 맞춤형 자기주도 학습 플래너")
    print("=" * 40)

    # ----------------------------
    # 학생 정보 입력
    # ----------------------------

    name = input("\n이름을 입력하세요 : ")
    grade = input("학년을 입력하세요 : ")

    student = Student(name, grade)

    print(f"\n반갑습니다! {student.name} 학생 😊")

    # ----------------------------
    # 보조 모듈 초기화
    # ----------------------------

    record_manager = RecordManager()
    level_system = LevelSystem()
    quiz = Quiz()
    feedback = Feedback()
    goal = Goal()
    achievement = Achievement()
    streak = Streak()
    statistics = Statistics()
    challenge = Challenge()

    # ----------------------------
    # 학습 성향 검사
    # ----------------------------

    analyzer = Analyzer()

    score = analyzer.run_test()

    result = analyzer.get_result(score)

    student.set_study_type(result)
    student.set_type_score(score)

    analyzer.print_result(score, result)

    student.show_info()

    # ----------------------------
    # 오늘의 공부 계획
    # ----------------------------

    planner = StudyPlan()
    planner.make_plan(student.study_type)
    planner.show_plan()
    planner.today_message()

    # ----------------------------
    # 오늘의 챌린지 생성
    # ----------------------------

    challenge.create_challenge()

    # ----------------------------
    # 메인 메뉴
    # ----------------------------

    while True:

        print("\n" + "=" * 40)
        print("📋 메인 메뉴")
        print("=" * 40)
        print("1. 공부 기록 저장")
        print("2. 공부 기록 보기")
        print("3. 학습 통계")
        print("4. 레벨 확인")
        print("5. 오늘의 퀴즈")
        print("6. AI 피드백")
        print("7. 목표 관리")
        print("8. 업적 확인")
        print("9. 연속 공부일")
        print("10. 오늘의 챌린지")
        print("0. 종료")
        print("=" * 40)

        choice = input("번호를 입력하세요 : ").strip()

        # 1. 공부 기록 저장
        if choice == "1":

            subject = input("과목 입력 : ")

            try:
                time = int(input("공부 시간 (분) : "))
            except ValueError:
                print("숫자를 입력하세요.")
                continue

            record_manager.save_record(student, subject, time)
            level_system.add_exp(student, time)
            streak.save_today(student)

        # 2. 공부 기록 보기
        elif choice == "2":

            record_manager.show_records(student)

        # 3. 학습 통계
        elif choice == "3":

            statistics.show_statistics(student)

        # 4. 레벨 확인
        elif choice == "4":

            level_system.show_level(student)
            level_system.show_tree(student)

        # 5. 오늘의 퀴즈
        elif choice == "5":

            correct = quiz.start_quiz()

            if correct:
                quiz.reward(student)

        # 6. AI 피드백
        elif choice == "6":

            total = statistics.total_time(student)
            subject_data = statistics.subject_statistics(student)

            feedback.study_time_feedback(total)
            feedback.subject_feedback(subject_data)
            feedback.type_feedback(student.study_type)
            feedback.ai_coach(student, total)
            feedback.daily_message()

        # 7. 목표 관리
        elif choice == "7":

            while True:

                print("\n--- 목표 관리 ---")
                print("1. 목표 설정")
                print("2. 목표 보기")
                print("3. 목표 완료 체크")
                print("4. 달성률 보기")
                print("5. 목표 삭제")
                print("0. 돌아가기")

                sub = input("번호 입력 : ").strip()

                if sub == "1":
                    goal.set_goal()
                elif sub == "2":
                    goal.show_goal()
                elif sub == "3":
                    goal.complete_goal()
                elif sub == "4":
                    goal.show_progress()
                elif sub == "5":
                    goal.delete_goal()
                elif sub == "0":
                    break
                else:
                    print("올바른 번호를 입력하세요.")

        # 8. 업적 확인
        elif choice == "8":

            total = statistics.total_time(student)
            goal_percent = goal.progress()

            achievement.check(student, total, 0, goal_percent)
            achievement.show()
            achievement.show_progress()

        # 9. 연속 공부일
        elif choice == "9":

            streak.show(student)
            streak.show_fire(student)

        # 10. 오늘의 챌린지
        elif choice == "10":

            challenge.show_challenge()
            challenge.complete(student)
            challenge.show_status()

        # 0. 종료
        elif choice == "0":

            print("\n오늘도 수고했습니다! 🌱")
            print(f"잘 자요, {student.name} 학생!")
            break

        else:

            print("올바른 번호를 입력하세요.")


# ----------------------------
# 프로그램 시작
# ----------------------------

if __name__ == "__main__":
    main()
