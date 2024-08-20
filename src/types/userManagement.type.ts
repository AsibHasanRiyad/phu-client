import { TUser } from "../redux/features/auth/authSlice";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export interface Root {
  password: string;
  student: TStudent;
}

export interface TStudent {
  _id: string;
  id: string;
  name: Name;
  fullName: string;
  user: TUser;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TFaculty {
  designation: string;
  id: string;
  _id: string;
  name: Name;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNo: string;
  user: TUser;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: string;
  fullName: string;
}

export interface TAdmin {
  designation: string;
  id: string;
  _id: string;
  name: Name;
  fullName: string;
  gender: string;
  user: TUser;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
}
