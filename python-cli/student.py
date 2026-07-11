"""
student.py

학생 정보를 관리하는 클래스
StudyBloom 프로젝트
"""

class Student:
    def __init__(self, name, grade):
        """
        학생 객체 생성
        """

        self.name = name          # 이름
        self.grade = grade        # 학년

        # 레벨 시스템
        self.level = 1
        self.exp = 0

        # 학습 성향
        self.study_type = ""

        # 성향 점수
        self.type_score = {
            "탐구형": 0,
            "반복형": 0,
            "몰입형": 0,
            "균형형": 0
        }

        # 공부 기록
        self.study_history = []



    # ----------------------------
    # 학생 정보 출력
    # ----------------------------
    def show_info(self):

        print("\n==========================")
        print("학생 정보")
        print("==========================")

        print(f"이름 : {self.name}")
        print(f"학년 : {self.grade}")

        print(f"레벨 : Lv.{self.level}")
        print(f"경험치 : {self.exp}")

        print(f"학습 성향 : {self.study_type}")

        print("==========================")



    # ----------------------------
    # 경험치 추가
    # ----------------------------
    def add_exp(self, amount):

        self.exp += amount

        print(f"\n✨ 경험치 +{amount}")

        while self.exp >= self.level * 20:

            self.exp -= self.level * 20
            self.level += 1

            print("🎉 레벨업!")
            print(f"현재 레벨 : {self.level}")



    # ----------------------------
    # 공부 기록 추가
    # ----------------------------
    def add_record(self, subject, time):

        record = {
            "subject": subject,
            "time": time
        }

        self.study_history.append(record)

        print("\n공부 기록이 저장되었습니다.")



    # ----------------------------
    # 공부 기록 출력
    # ----------------------------
    def show_records(self):

        print("\n========== 공부 기록 ==========")

        if len(self.study_history) == 0:
            print("공부 기록이 없습니다.")
            return

        total = 0

        for i, record in enumerate(self.study_history, start=1):

            print(f"{i}. {record['subject']} - {record['time']}분")
            total += record["time"]

        print("-------------------------------")
        print(f"총 공부시간 : {total}분")
        print("===============================")



    # ----------------------------
    # 학습 성향 저장
    # ----------------------------
    def set_study_type(self, result):

        self.study_type = result



    # ----------------------------
    # 성향 점수 저장
    # ----------------------------
    def set_type_score(self, score):

        self.type_score = score



    # ----------------------------
    # 성향 결과 출력
    # ----------------------------
    def show_type_result(self):

        print("\n==============================")
        print("학습 성향 분석 결과")
        print("==============================")

        for key, value in self.type_score.items():

            print(f"{key} : {value}점")

        print("------------------------------")
        print(f"추천 성향 : {self.study_type}")
        print("==============================")