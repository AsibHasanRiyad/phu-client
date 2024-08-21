import { Button, Col, Row } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
  // console.log(academicFacultyData?.data);
  return (
    <Row gutter={[16, 16]}>
      {academicFacultyData?.data?.map((data) => (
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

export default AcademicFaculty;
