"""
level.py

StudyBloom
레벨 및 경험치 시스템
"""

class LevelSystem:

    def __init__(self):

        self.level_name = {

            1: "🌱 새싹",
            2: "🌿 새순",
            3: "🌳 성장",
            4: "🌲 큰나무",
            5: "👑 학습마스터"

        }


    # -----------------------------------
    # 공부 시간에 따른 경험치 계산
    # -----------------------------------

    def calculate_exp(self, study_time):

        """
        10분 = 경험치 1
        """

        return study_time // 10


    # -----------------------------------
    # 학생 경험치 추가
    # -----------------------------------

    def add_exp(self, student, study_time):

        exp = self.calculate_exp(study_time)

        student.exp += exp

        print(f"\n✨ 경험치 +{exp}")

        self.level_up(student)


    # -----------------------------------
    # 레벨업 확인
    # -----------------------------------

    def level_up(self, student):

        need_exp = student.level * 10

        while student.exp >= need_exp:

            student.exp -= need_exp

            student.level += 1

            print("\n🎉 LEVEL UP!!")

            print(f"현재 레벨 : Lv.{student.level}")

            if student.level in self.level_name:

                print(self.level_name[student.level])

            need_exp = student.level * 10


    # -----------------------------------
    # 현재 레벨 출력
    # -----------------------------------

    def show_level(self, student):

        print("\n========================")

        print("🌟 MY LEVEL")

        print("========================")

        print(f"Lv.{student.level}")

        if student.level in self.level_name:

            print(self.level_name[student.level])

        print(f"EXP : {student.exp}")

        print(f"다음 레벨까지 {student.level*10-student.exp} EXP")

        print("========================")


    # -----------------------------------
    # 나무 성장 출력
    # -----------------------------------

    def show_tree(self, student):

        print()

        if student.level == 1:

            print("    .")
            print("   /|\\")
            print("    |")
            print("   🌱")

        elif student.level == 2:

            print("    .")
            print("   \\|/")
            print("  \\ | /")
            print("    |")
            print("   🌿")

        elif student.level == 3:

            print("   \\ | /")
            print(" -- 🌳 --")
            print("     |")
            print("     |")

        elif student.level == 4:

            print("   \\ | /")
            print(" --🌳🌳--")
            print("    ||")
            print("    ||")

        else:

            print("✨✨✨✨✨")
            print("🌳🌳🌳")
            print("✨ 학습 마스터 ✨")