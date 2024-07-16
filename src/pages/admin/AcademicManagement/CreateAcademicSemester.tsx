import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((num) => ({
  value: String(currentYear + num),
  label: String(currentYear + num),
}));
console.log(yearOptions);

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data?.name - 1)]?.label;
    const semesterData = {
      name,
      code: nameOptions[Number(data?.name) - 1]?.value,
      year: data?.year,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect options={nameOptions} name={"name"} label={"Name"} />
          <PHSelect options={yearOptions} name={"year"} label={"Year"} />
          <PHSelect
            options={nameOptions}
            name={"startMonth"}
            label={"Start Month"}
          />
          <PHSelect
            options={nameOptions}
            name={"endMonth"}
            label={"End Month"}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
