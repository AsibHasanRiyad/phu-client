export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: Course;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
  offeredCourse: TOfferedCourses;
};
export type TOfferedCourses =
  | {
      key: string;
      title: string;
      section: number;
      startTime: string;
      endTime: string;
      days: string[];
    }
  | undefined;

export interface Course {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: any[];
  isDeleted: boolean;
  __v: number;
}
