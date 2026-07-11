"""
achievement.py

StudyBloom
업적(배지) 시스템
"""


class Achievement:

    def __init__(self):

        self.achievements = {

            "첫 공부": False,
            "공부왕": False,
            "레벨업": False,
            "퀴즈왕": False,
            "목표 달성": False,
            "1000분 달성": False

        }


    # --------------------------------
    # 업적 확인
    # --------------------------------

    def check(self, student, total_time, quiz_count, goal_percent):

        # 첫 공부
        if total_time > 0:
            self.achievements["첫 공부"] = True

        # 공부왕
        if total_time >= 500:
            self.achievements["공부왕"] = True

        # 1000분 공부
        if total_time >= 1000:
            self.achievements["1000분 달성"] = True

        # 레벨업
        if student.level >= 3:
            self.achievements["레벨업"] = True

        # 퀴즈왕
        if quiz_count >= 10:
            self.achievements["퀴즈왕"] = True

        # 목표 달성
        if goal_percent == 100:
            self.achievements["목표 달성"] = True


    # --------------------------------
    # 업적 출력
    # --------------------------------

    def show(self):

        print("\n==============================")
        print("🏅 나의 업적")
        print("==============================")

        for name, unlocked in self.achievements.items():

            if unlocked:
                print(f"✅ {name}")

            else:
                print(f"⬜ {name}")

        print("==============================")


    # --------------------------------
    # 획득한 업적 개수
    # --------------------------------

    def count(self):

        total = 0

        for value in self.achievements.values():

            if value:
                total += 1

        return total


    # --------------------------------
    # 업적 달성률
    # --------------------------------

    def progress(self):

        total = len(self.achievements)

        unlocked = self.count()

        return int(unlocked / total * 100)


    # --------------------------------
    # 업적 진행률 출력
    # --------------------------------

    def show_progress(self):

        percent = self.progress()

        bar = "█" * (percent // 10)

        empty = "░" * (10 - (percent // 10))

        print("\n========== 업적 달성률 ==========")

        print(f"[{bar}{empty}] {percent}%")