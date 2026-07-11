"""
streak.py

StudyBloom
연속 공부일 관리
"""

import os
from datetime import datetime, timedelta


class Streak:

    def __init__(self):

        self.filename = "data/streak.txt"

        if not os.path.exists("data"):
            os.mkdir("data")

        if not os.path.exists(self.filename):
            open(self.filename, "w", encoding="utf-8").close()


    # ----------------------------------
    # 오늘 공부 기록
    # ----------------------------------

    def save_today(self, student):

        today = datetime.now().strftime("%Y-%m-%d")

        records = []

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                name, date = line.strip().split(",")

                if not (name == student.name and date == today):

                    records.append(line.strip())

        records.append(f"{student.name},{today}")

        with open(self.filename, "w", encoding="utf-8") as file:

            for record in records:

                file.write(record + "\n")


    # ----------------------------------
    # 연속 공부일 계산
    # ----------------------------------

    def calculate(self, student):

        dates = []

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                name, date = line.strip().split(",")

                if name == student.name:

                    dates.append(datetime.strptime(date, "%Y-%m-%d"))

        if len(dates) == 0:

            return 0

        dates.sort(reverse=True)

        streak = 1

        current = dates[0]

        for date in dates[1:]:

            if current - timedelta(days=1) == date:

                streak += 1

                current = date

            else:

                break

        return streak


    # ----------------------------------
    # 연속 공부일 출력
    # ----------------------------------

    def show(self, student):

        streak = self.calculate(student)

        print("\n==============================")
        print("🔥 연속 공부일")
        print("==============================")

        print(f"{streak}일 연속 공부!")

        if streak >= 30:

            print("👑 공부 습관 마스터!")

        elif streak >= 14:

            print("🌟 정말 꾸준합니다!")

        elif streak >= 7:

            print("💪 좋은 습관이 생기고 있어요!")

        elif streak >= 3:

            print("😊 꾸준히 이어가고 있습니다!")

        else:

            print("🌱 오늘부터 습관을 만들어봐요!")

        print("==============================")


    # ----------------------------------
    # 불꽃 출력
    # ----------------------------------

    def show_fire(self, student):

        streak = self.calculate(student)

        fire = "🔥" * min(streak, 10)

        print(f"\n{fire}")