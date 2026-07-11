"""
planner.py

학생 맞춤 공부 계획 생성
"""

import random


class StudyPlan:

    def __init__(self):

        self.plan = []



    # -----------------------------
    # 공부 계획 생성
    # -----------------------------
    def make_plan(self, study_type):

        if study_type == "탐구형":

            self.plan = [

                "📘 수학 개념 정리 (30분)",

                "📝 개념 노트 작성 (20분)",

                "📗 예제 문제 풀이 (30분)",

                "📙 오답 원인 분석 (20분)"

            ]


        elif study_type == "반복형":

            self.plan = [

                "📘 수학 문제 20문제",

                "📗 영어 단어 암기",

                "📙 오답 다시 풀기",

                "📝 복습 문제 풀이"

            ]


        elif study_type == "몰입형":

            self.plan = [

                "⏰ 25분 집중 공부",

                "☕ 5분 휴식",

                "⏰ 25분 집중 공부",

                "📝 핵심 내용 정리"

            ]


        elif study_type == "균형형":

            self.plan = [

                "📘 수학 30분",

                "📗 영어 30분",

                "📙 국어 30분",

                "📕 과학 30분"

            ]

        return self.plan



    # -----------------------------
    # 공부 계획 출력
    # -----------------------------
    def show_plan(self):

        print("\n==============================")
        print("📅 오늘의 Study Plan")
        print("==============================")

        for i, item in enumerate(self.plan, start=1):

            print(f"{i}. {item}")



        print("==============================")


    # -----------------------------
    # 오늘의 명언
    # -----------------------------
    def today_message(self):

        message = [

            "오늘의 노력이 내일의 실력이 됩니다.",

            "조금씩 꾸준히 하는 사람이 가장 멀리 갑니다.",

            "완벽보다 꾸준함이 중요합니다.",

            "오늘도 어제보다 조금 더 성장해봅시다!",

            "포기하지 않는 사람이 결국 성공합니다."

        ]

        print("\n💬 오늘의 응원")

        print(random.choice(message))