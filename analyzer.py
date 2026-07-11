"""
analyzer.py

학생의 학습 성향을 분석하는 클래스
StudyBloom 프로젝트
"""

class Analyzer:

    def __init__(self):

        # 질문 목록
        # (질문, 보기, 각 보기의 유형)

        self.questions = [

            (
                "새로운 내용을 공부할 때 나는?",
                [
                    "① 원리를 먼저 이해한다.",
                    "② 예제를 많이 풀어본다.",
                    "③ 일단 시작하면서 익힌다.",
                    "④ 여러 과목을 번갈아 공부한다."
                ],
                ["탐구형", "반복형", "몰입형", "균형형"]
            ),

            (
                "시험공부를 할 때 나는?",
                [
                    "① 개념부터 정리한다.",
                    "② 문제를 많이 푼다.",
                    "③ 시험 직전에 집중한다.",
                    "④ 과목별로 시간을 나눈다."
                ],
                ["탐구형", "반복형", "몰입형", "균형형"]
            ),

            (
                "모르는 문제가 나오면?",
                [
                    "① 왜 틀렸는지 분석한다.",
                    "② 비슷한 문제를 더 푼다.",
                    "③ 일단 넘어간다.",
                    "④ 다른 과목을 하다가 다시 본다."
                ],
                ["탐구형", "반복형", "몰입형", "균형형"]
            ),

            (
                "가장 좋아하는 공부 방식은?",
                [
                    "① 이해하며 공부",
                    "② 반복 연습",
                    "③ 짧고 집중",
                    "④ 계획적으로 여러 과목"
                ],
                ["탐구형", "반복형", "몰입형", "균형형"]
            ),

            (
                "공부가 잘 되는 시간은?",
                [
                    "① 충분히 준비했을 때",
                    "② 꾸준히 반복할 때",
                    "③ 마감 직전",
                    "④ 계획대로 진행할 때"
                ],
                ["탐구형", "반복형", "몰입형", "균형형"]
            )

        ]


    # -------------------------
    # 성향 검사
    # -------------------------

    def run_test(self):

        score = {

            "탐구형":0,
            "반복형":0,
            "몰입형":0,
            "균형형":0

        }

        print("\n==============================")
        print("학습 성향 검사")
        print("==============================")

        for number, question in enumerate(self.questions, start=1):

            print(f"\nQ{number}. {question[0]}")

            for choice in question[1]:
                print(choice)

            while True:

                try:

                    answer = int(input("선택(1~4) : "))

                    if 1 <= answer <= 4:
                        break

                    else:
                        print("1~4만 입력하세요.")

                except ValueError:

                    print("숫자를 입력하세요.")

            study_type = question[2][answer-1]

            score[study_type] += 20

        return score


    # -------------------------
    # 결과 분석
    # -------------------------

    def get_result(self, score):

        result = max(score, key=score.get)

        return result


    # -------------------------
    # 추천 공부법
    # -------------------------

    def get_recommendation(self, study_type):

        recommend = {

            "탐구형":[
                "✔ 개념을 먼저 이해하기",
                "✔ 친구에게 설명하며 공부하기",
                "✔ 오답 원인 분석하기"
            ],

            "반복형":[
                "✔ 문제를 많이 풀기",
                "✔ 오답 반복하기",
                "✔ 매일 꾸준히 복습하기"
            ],

            "몰입형":[
                "✔ 25분 집중 공부",
                "✔ 짧은 휴식",
                "✔ 시험 전 핵심 정리"
            ],

            "균형형":[
                "✔ 과목을 번갈아 공부하기",
                "✔ 공부 계획표 만들기",
                "✔ 하루 목표 설정하기"
            ]

        }

        return recommend[study_type]


    # -------------------------
    # 결과 출력
    # -------------------------

    def print_result(self, score, study_type):

        print("\n==============================")
        print("학습 성향 분석 결과")
        print("==============================")

        total = sum(score.values())

        for key, value in score.items():

            percent = value / total * 100

            print(f"{key} : {percent:.1f}%")

        print("------------------------------")
        print(f"추천 성향 : {study_type}")
        print("==============================")

        print("\n추천 공부법")

        for item in self.get_recommendation(study_type):

            print(item)