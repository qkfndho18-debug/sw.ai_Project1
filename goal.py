"""
goal.py

StudyBloom
학생 목표 관리 클래스
"""

import os


class Goal:

    def __init__(self):

        self.filename = "data/goals.txt"

        if not os.path.exists("data"):
            os.mkdir("data")

        if not os.path.exists(self.filename):
            open(self.filename, "w", encoding="utf-8").close()

        self.goals = []


    # -----------------------------
    # 목표 입력
    # -----------------------------

    def set_goal(self):

        print("\n========== 목표 설정 ==========")

        self.goals.clear()

        while True:

            goal = input("목표 입력 (종료: 엔터) : ")

            if goal == "":
                break

            self.goals.append({
                "goal": goal,
                "completed": False
            })

        print("\n목표가 저장되었습니다.")


    # -----------------------------
    # 목표 출력
    # -----------------------------

    def show_goal(self):

        print("\n========== 나의 목표 ==========")

        if len(self.goals) == 0:

            print("설정된 목표가 없습니다.")
            return

        for i, goal in enumerate(self.goals, start=1):

            state = "✅" if goal["completed"] else "⬜"

            print(f"{i}. {state} {goal['goal']}")


    # -----------------------------
    # 목표 완료 체크
    # -----------------------------

    def complete_goal(self):

        if len(self.goals) == 0:

            print("완료할 목표가 없습니다.")
            return

        self.show_goal()

        try:

            num = int(input("\n완료한 목표 번호 : "))

            if 1 <= num <= len(self.goals):

                self.goals[num - 1]["completed"] = True

                print("목표 완료!")

            else:

                print("잘못된 번호입니다.")

        except:

            print("숫자를 입력하세요.")


    # -----------------------------
    # 목표 달성률
    # -----------------------------

    def progress(self):

        if len(self.goals) == 0:

            return 0

        completed = 0

        for goal in self.goals:

            if goal["completed"]:

                completed += 1

        return int((completed / len(self.goals)) * 100)


    # -----------------------------
    # 진행률 출력
    # -----------------------------

    def show_progress(self):

        percent = self.progress()

        bar = "█" * (percent // 10)

        empty = "░" * (10 - (percent // 10))

        print("\n========== 목표 달성률 ==========")

        print(f"[{bar}{empty}] {percent}%")



    # -----------------------------
    # 목표 저장
    # -----------------------------

    def save_goal(self, student):

        with open(self.filename, "a", encoding="utf-8") as file:

            for goal in self.goals:

                file.write(
                    f"{student.name},{goal['goal']},{goal['completed']}\n"
                )


    # -----------------------------
    # 목표 불러오기
    # -----------------------------

    def load_goal(self, student):

        self.goals.clear()

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                name, goal, completed = line.strip().split(",")

                if name == student.name:

                    self.goals.append({

                        "goal": goal,

                        "completed": completed == "True"

                    })


    # -----------------------------
    # 목표 삭제
    # -----------------------------

    def delete_goal(self):

        if len(self.goals) == 0:

            print("삭제할 목표가 없습니다.")
            return

        self.show_goal()

        try:

            num = int(input("\n삭제할 목표 번호 : "))

            if 1 <= num <= len(self.goals):

                del self.goals[num - 1]

                print("삭제되었습니다.")

            else:

                print("잘못된 번호입니다.")

        except:

            print("숫자를 입력하세요.")