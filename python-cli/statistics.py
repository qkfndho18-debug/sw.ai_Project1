"""
statistics.py

StudyBloom
학습 통계 분석 클래스
"""

import os


class Statistics:

    def __init__(self):

        self.filename = "data/records.txt"

        if not os.path.exists(self.filename):
            open(self.filename, "w", encoding="utf-8").close()


    # ----------------------------------
    # 전체 공부시간
    # ----------------------------------

    def total_time(self, student):

        total = 0

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    total += int(time)

        return total


    # ----------------------------------
    # 과목별 공부시간
    # ----------------------------------

    def subject_statistics(self, student):

        result = {}

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    if subject not in result:

                        result[subject] = 0

                    result[subject] += int(time)

        return result


    # ----------------------------------
    # 가장 많이 공부한 과목
    # ----------------------------------

    def best_subject(self, student):

        data = self.subject_statistics(student)

        if len(data) == 0:

            return None

        return max(data, key=data.get)


    # ----------------------------------
    # 가장 적게 공부한 과목
    # ----------------------------------

    def weak_subject(self, student):

        data = self.subject_statistics(student)

        if len(data) == 0:

            return None

        return min(data, key=data.get)


    # ----------------------------------
    # 평균 공부시간
    # ----------------------------------

    def average_time(self, student):

        total = 0

        count = 0

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    total += int(time)

                    count += 1

        if count == 0:

            return 0

        return round(total / count, 1)


    # ----------------------------------
    # 공부 횟수
    # ----------------------------------

    def study_count(self, student):

        count = 0

        with open(self.filename, "r", encoding="utf-8") as file:

            for line in file:

                date, name, subject, time = line.strip().split(",")

                if name == student.name:

                    count += 1

        return count


    # ----------------------------------
    # 통계 출력
    # ----------------------------------

    def show_statistics(self, student):

        print("\n==============================")
        print("📊 학습 통계")
        print("==============================")

        print(f"총 공부시간 : {self.total_time(student)}분")

        print(f"평균 공부시간 : {self.average_time(student)}분")

        print(f"공부 횟수 : {self.study_count(student)}회")

        best = self.best_subject(student)

        weak = self.weak_subject(student)

        if best:

            print(f"가장 많이 공부한 과목 : {best}")

        if weak:

            print(f"가장 적게 공부한 과목 : {weak}")

        print("\n과목별 공부시간")

        data = self.subject_statistics(student)

        if len(data) == 0:

            print("기록이 없습니다.")

        else:

            for subject, time in data.items():

                print(f"- {subject} : {time}분")

        print("==============================")