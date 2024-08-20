import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";

import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
export const OfferCourse = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [id, setId] = useState("");
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicFacultiesOption = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
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
            name={"academicSemester"}
            label={"Academic Semester"}
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
