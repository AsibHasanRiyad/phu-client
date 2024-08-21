import { Button, Col, Row } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);
  // console.log(academicDepartmentData);
  return (
    <Row gutter={[16, 16]}>
      {academicDepartmentData?.data?.map((data) => (
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          key={data?._id}
        >
          <Button
            type="primary"
            style={{ width: "100%", padding: "24px", fontSize: "18px" }}
          >
            {data.name}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default AcademicDepartment;
