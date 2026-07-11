"""
record.py

공부 기록 저장 및 불러오기
StudyBloom
"""

import os
from datetime import datetime


class RecordManager:

    def __init__(self):

        self.filename = "data/records.txt"

        # data 폴더가 없으면 생성
        if not os.path.exists("data"):
            os.mkdir("data")

        # records.txt가 없으면 생성
        if not os.path.exists(self.filename):
            open(self.filename, "w", encoding="utf-8").close()

    # ----------------------------
    # 공부 기록 저장
    # ----------------------------

    def save_record(self, student, subject, time):

        today = datetime.now().strftime("%Y-%m-%d")

        with open(self.filename, "a", encoding="utf-8") as file:

            file.write(
                f"{today},{student.name},{subject},{time}\n"
            )

        print("\n✅ 공부 기록이 저장되었습니다.")

    # ----------------------------
    # 공부 기록 출력
    # ----------------------------

    def show_records(self, student):

        print("\n==============================")
        print("📚 공부 기록")
        print("==============================")

        found = False

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    print(f"{date}")
                    print(f"과목 : {subject}")
                    print(f"공부시간 : {time}분")
                    print("-------------------------")

                    found = True

        if not found:

            print("저장된 기록이 없습니다.")

    # ----------------------------
    # 총 공부시간 계산
    # ----------------------------

    def total_time(self, student):

        total = 0

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    total += int(time)

        return total

    # ----------------------------
    # 공부 과목별 통계
    # ----------------------------

    def subject_statistics(self, student):

        result = {}

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    if subject not in result:

                        result[subject] = 0

                    result[subject] += int(time)

        print("\n==============================")
        print("📊 과목별 공부시간")
        print("==============================")

        if len(result) == 0:

            print("기록이 없습니다.")

            return

        for subject, time in result.items():

            print(f"{subject} : {time}분")