"""
main.py

StudyBloom 실행 파일
"""

from student import Student
from analyzer import Analyzer
from record import RecordManager
from level import LevelSystem
from planner import StudyPlan

planner = StudyPlan()

planner.make_plan(student.study_type)

planner.show_plan()

planner.today_message()


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
    # 학습 성향 검사
    # ----------------------------

    analyzer = Analyzer()

    score = analyzer.run_test()

    result = analyzer.get_result(score)

    student.set_study_type(result)

    student.set_type_score(score)

    # ----------------------------
    # 결과 출력
    # ----------------------------

    analyzer.print_result(score, result)

    student.show_info()


# ----------------------------
# 프로그램 시작
# ----------------------------

if __name__ == "__main__":
    main()