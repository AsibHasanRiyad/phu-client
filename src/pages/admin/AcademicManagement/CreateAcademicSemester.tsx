import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  const nameOptions = [
    { value: "Autumn", label: "Autumn" },
    { value: "Summer", label: "Summer" },
    { value: "Fall", label: "Fall" },
  ];
  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect options={nameOptions} name={"name"} label={"Name"} />
          {/* <PHSelect name={"year"} label={"Year"} /> */}
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
