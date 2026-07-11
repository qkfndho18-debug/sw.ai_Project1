"""
challenge.py

StudyBloom
오늘의 학습 챌린지
"""

import random


class Challenge:

    def __init__(self):

        self.challenges = [

            {
                "mission": "📖 수학 30분 공부하기",
                "reward": 10
            },

            {
                "mission": "📚 영어 단어 20개 암기하기",
                "reward": 10
            },

            {
                "mission": "📝 오답노트 3문제 작성하기",
                "reward": 15
            },

            {
                "mission": "📗 국어 지문 2개 풀기",
                "reward": 10
            },

            {
                "mission": "🔬 과학 개념 복습 30분",
                "reward": 10
            },

            {
                "mission": "⏰ 1시간 집중 공부하기",
                "reward": 20
            },

            {
                "mission": "📒 오늘 공부 계획 모두 완료하기",
                "reward": 25
            }

        ]

        self.today = None

        self.completed = False


    # ----------------------------
    # 오늘의 챌린지 생성
    # ----------------------------

    def create_challenge(self):

        self.today = random.choice(self.challenges)

        self.completed = False


    # ----------------------------
    # 오늘의 챌린지 출력
    # ----------------------------

    def show_challenge(self):

        if self.today is None:

            self.create_challenge()

        print("\n==============================")
        print("🎯 오늘의 챌린지")
        print("==============================")

        print(self.today["mission"])

        print(f"\n보상 : EXP +{self.today['reward']}")

        print("==============================")


    # ----------------------------
    # 챌린지 완료
    # ----------------------------

    def complete(self, student):

        if self.completed:

            print("\n이미 완료한 챌린지입니다.")

            return

        answer = input("\n챌린지를 완료했나요? (y/n) : ")

        if answer.lower() == "y":

            self.completed = True

            student.exp += self.today["reward"]

            print("\n🎉 챌린지 완료!")

            print(f"EXP +{self.today['reward']}")

        else:

            print("\n다음에 다시 도전해보세요!")


    # ----------------------------
    # 상태 출력
    # ----------------------------

    def show_status(self):

        print("\n========== 챌린지 상태 ==========")

        if self.completed:

            print("✅ 완료")

        else:

            print("⬜ 진행 중")

        print("==============================")