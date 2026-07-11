"""
feedback.py

학생 맞춤형 학습 피드백
StudyBloom
"""

class Feedback:

    def __init__(self):
        pass


    # ---------------------------------------
    # 공부 시간 분석
    # ---------------------------------------

    def study_time_feedback(self, total_time):

        print("\n==============================")
        print("📊 공부시간 분석")
        print("==============================")

        if total_time < 60:

            print("📌 오늘 공부 시간이 조금 부족했어요.")
            print("👉 내일은 30분만 더 공부해볼까요?")

        elif total_time < 180:

            print("👏 적당한 공부시간입니다!")
            print("👉 꾸준히 유지해보세요.")

        else:

            print("🔥 정말 열심히 공부했네요!")
            print("👉 충분한 휴식도 잊지 마세요.")


    # ---------------------------------------
    # 과목별 피드백
    # ---------------------------------------

    def subject_feedback(self, statistics):

        print("\n==============================")
        print("📚 과목별 피드백")
        print("==============================")

        if len(statistics) == 0:

            print("아직 공부 기록이 없습니다.")
            return

        most_subject = max(statistics, key=statistics.get)

        least_subject = min(statistics, key=statistics.get)

        print(f"✅ 가장 많이 공부한 과목 : {most_subject}")

        print(f"⚠ 가장 적게 공부한 과목 : {least_subject}")

        print()

        print(f"💡 이번 주에는 {least_subject} 공부를 조금 더 늘려보세요.")


    # ---------------------------------------
    # 성향별 피드백
    # ---------------------------------------

    def type_feedback(self, study_type):

        print("\n==============================")
        print("🌱 학습 성향 피드백")
        print("==============================")

        if study_type == "탐구형":

            print("✔ 개념을 이해하는 능력이 뛰어납니다.")
            print("✔ 친구에게 설명하며 공부하면 효과가 좋습니다.")
            print("✔ 심화 문제에도 도전해보세요.")

        elif study_type == "반복형":

            print("✔ 꾸준한 반복이 가장 큰 장점입니다.")
            print("✔ 오답노트를 적극 활용해보세요.")
            print("✔ 다양한 유형의 문제도 풀어보세요.")

        elif study_type == "몰입형":

            print("✔ 집중력이 매우 좋습니다.")
            print("✔ 너무 오래 공부하기보다")
            print("✔ 25분 집중 + 5분 휴식을 추천합니다.")

        elif study_type == "균형형":

            print("✔ 여러 과목을 균형 있게 공부합니다.")
            print("✔ 우선순위를 정하면 더 효율적입니다.")


    # ---------------------------------------
    # AI 코치
    # ---------------------------------------

    def ai_coach(self, student, total_time):

        print("\n==============================")
        print("🤖 AI Study Coach")
        print("==============================")

        if student.level <= 2:

            print(f"{student.name} 학생은 아직 공부 습관을 만들어가는 단계입니다.")
            print("오늘 목표를 끝까지 완료하는 것부터 시작해봅시다!")

        elif student.level <= 4:

            print("꾸준히 성장하고 있습니다!")
            print("이번 주에는 조금 더 어려운 문제에 도전해보세요.")

        else:

            print("훌륭합니다!")
            print("후배들에게 공부법을 알려줄 정도의 실력이네요!")



        if total_time < 120:

            print("\n💬 추천")

            print("오늘은 25분 공부 + 5분 휴식을 반복하는")
            print("포모도로 공부법을 추천합니다.")

        else:

            print("\n💬 추천")

            print("충분히 공부했어요.")
            print("복습 시간을 꼭 가져보세요.")


    # ---------------------------------------
    # 오늘의 한마디
    # ---------------------------------------

    def daily_message(self):

        import random

        messages = [

            "오늘의 작은 노력이 미래를 바꿉니다.",

            "포기하지 않는 사람이 결국 성장합니다.",

            "어제보다 조금 더 성장하면 충분합니다.",

            "완벽보다 꾸준함이 더 중요합니다.",

            "오늘 공부한 당신이 정말 멋집니다."

        ]

        print("\n==============================")

        print("🌸 오늘의 응원")

        print("==============================")

        print(random.choice(messages))