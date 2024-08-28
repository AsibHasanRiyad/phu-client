import { Button, Col, Flex, Row } from "antd";
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
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement";
import { toast } from "sonner";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";
export const OfferCourse = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [courseId, setCourseId] = useState("");
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const { data: academicDepartment } =
    useGetAcademicDepartmentsQuery(undefined);
  const { data: semesterRegistrationData } =
    useGetAllSemesterRegistrationQuery(undefined);
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const { data: courseFacultiesData, isFetching: facultyFetching } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });
  const [addOfferedCourse] = useAddOfferedCourseMutation();

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
  const courseFacultiesDataOptions = courseFacultiesData?.data?.faculties?.map(
    (item) => {
      return {
        value: item._id,
        label: item.fullName,
      };
    }
  );
  // console.log(courseId, "Course id");
  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const daysOption = days?.map((item) => ({
    value: item,
    label: item,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedStartTime = moment(data.startTime, "HH:mm").format("HH:mm");
    const formattedEndTime = moment(data.endTime, "HH:mm").format("HH:mm");
    console.log(formattedStartTime, formattedEndTime);
    const offerCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
    // console.log(offerCourseData);
    const toastId = toast.loading("Creating.....");

    try {
      const res = await addOfferedCourse(offerCourseData).unwrap();
      // console.log(res);
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center">
      <Col span={12}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <PHSelect
                options={academicFacultiesOption}
                name={"academicFaculty"}
                label={"Academic Faculty"}
              />
            </Col>
            <Col span={12}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
              />
            </Col>
            <Col span={12}>
              <PHSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
              />
            </Col>
            <Col span={12}>
              <PHSelectWithWatch
                name="course"
                label="Course"
                options={courseOptions}
                onValueChange={setCourseId}
              />
            </Col>
            <Col span={12}>
              <PHSelect
                name="faculty"
                label="Faculty"
                options={courseFacultiesDataOptions}
                disabled={!courseId || facultyFetching}
              />
            </Col>
            <Col span={12}>
              <PHInput type="number" label="Section" name="section" />
            </Col>
            <Col span={12}>
              <PHInput type="number" label="Max Capacity" name="maxCapacity" />
            </Col>
            <Col span={12}>
              <PHSelect
                mode="multiple"
                name="days"
                label="Days"
                options={daysOption}
              />
            </Col>
            <Col span={12}>
              <PHTimePicker name="startTime" label="Start Time" />
            </Col>
            <Col span={12}>
              <PHTimePicker name="endTime" label="End Time" />{" "}
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
