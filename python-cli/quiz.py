"""
quiz.py

오늘의 퀴즈
StudyBloom
"""

import random


class Quiz:

    def __init__(self):

        self.quiz = [

            {
                "question":"파이썬에서 리스트를 만드는 기호는?",
                "choice":["① {}", "② []", "③ ()", "④ <>"],
                "answer":2
            },

            {
                "question":"파이썬에서 반복문은?",
                "choice":["① repeat", "② while", "③ loop", "④ repeat until"],
                "answer":2
            },

            {
                "question":"대한민국의 수도는?",
                "choice":["① 부산","② 인천","③ 서울","④ 대전"],
                "answer":3
            },

            {
                "question":"객체지향에서 객체를 만드는 틀은?",
                "choice":["① 변수","② 함수","③ 클래스","④ 리스트"],
                "answer":3
            },

            {
                "question":"Python의 print() 함수는?",
                "choice":[
                    "① 입력",
                    "② 출력",
                    "③ 저장",
                    "④ 삭제"
                ],
                "answer":2
            }

        ]


    # -------------------------
    # 퀴즈 시작
    # -------------------------

    def start_quiz(self):

        print("\n============================")
        print("🧠 오늘의 퀴즈")
        print("============================")

        problem = random.choice(self.quiz)

        print(problem["question"])

        print()

        for choice in problem["choice"]:

            print(choice)

        while True:

            try:

                answer = int(input("\n정답 입력 : "))

                if 1 <= answer <= 4:

                    break

                else:

                    print("1~4만 입력하세요.")

            except:

                print("숫자를 입력하세요.")

        if answer == problem["answer"]:

            print("\n🎉 정답입니다!")

            return True

        else:

            print("\n❌ 오답입니다.")

            print(f"정답은 {problem['answer']}번 입니다.")

            return False


    # -------------------------
    # 경험치 지급
    # -------------------------

    def reward(self, student):

        print("\n⭐ 퀴즈 보상!")

        student.exp += 5

        print("EXP +5")