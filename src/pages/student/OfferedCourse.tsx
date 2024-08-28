import { Button, Col, Row } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const singleObject = offeredCourseData?.data?.reduce((acc, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });
    return acc;
  }, {});

  console.log(singleObject);
  const modifiedData = Object.values(singleObject ? singleObject : {});

  return (
    <Row>
      {modifiedData?.map((item, index) => {
        return (
          <Col
            style={{
              marginBottom: "20px",
              border: "2px solid #001529",
              borderRadius: "3px",
            }}
            span={24}
            key={index}
          >
            <Col>
              <h2 style={{ padding: "5px 10px 3px 10px" }}>
                {item?.courseTitle}
              </h2>
            </Col>
            <Col style={{ marginTop: "10px" }}>
              {item?.sections?.map((section) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    key={section._id}
                    style={{
                      paddingBottom: "10px",
                      paddingTop: "5px",
                      borderTop: "solid  2px #001529",
                      padding: "10px 20px 10px 20px",
                    }}
                  >
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Days:
                      {section.days.map((day) => (
                        <span style={{ paddingLeft: "10px" }} key={day}>
                          {day}
                        </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime}</Col>
                    <Col span={5}>End Time: {section?.endTime}</Col>
                    <Button span={5}>Enroll</Button>
                  </Row>
                );
              })}
            </Col>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
