import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFaculty } = useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map((item) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating.....");

    try {
      const res = await addAcademicDepartment(data).unwrap();
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Department Name" />
          <PHSelect
            options={academicFacultyOptions}
            name={"academicFaculty"}
            label={"Academic Faculty"}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
