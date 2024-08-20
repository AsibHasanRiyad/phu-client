import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";

import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement";
export const OfferCourse = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [id, setId] = useState("");
  const [courseId, setCourseId] = useState("");
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const { data: academicDepartment } =
    useGetAcademicDepartmentsQuery(undefined);
  const { data: semesterRegistrationData } =
    useGetAllSemesterRegistrationQuery(undefined);
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const { data: courseFacultiesData } = useGetCourseFacultiesQuery({
    courseId,
  });
  console.log(courseFacultiesData, "faculty of course");

  const academicFacultiesOption = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => {
      return {
        value: item._id,
        label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
      };
    }
  );
  console.log(courseId, "Course id");
  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const daysOption = days?.map((item) => ({
    value: item,
    label: item,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            options={academicFacultiesOption}
            name={"academicFaculties"}
            label={"Academic Faculty"}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelect
            name="semesterRegistration"
            label="Semester Registration"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="Course"
            label="Course"
            options={courseOptions}
            onValueChange={setCourseId}
          />
          <PHInput disabled={!id} type="text" label="Test" name="text" />
          <PHInput type="number" label="Section" name="section" />
          <PHInput type="number" label="Max Capacity" name="maxCapacity" />
          <PHSelect
            mode="multiple"
            name="days"
            label="Days"
            options={daysOption}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
