import { Table, TableColumnsType } from "antd";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { TOfferedCourses } from "../../types/studentCourse.type";

const MySchedule = () => {
  const { data, isFetching } = useGetAllEnrolledCoursesQuery(undefined);
  //   console.log(data);
  const tableData = data?.data?.map((item) => ({
    key: item._id,
    title: item?.course?.title,
    section: item?.offeredCourse?.section,
    startTime: item?.offeredCourse?.startTime,
    endTime: item?.offeredCourse?.endTime,
    days: item?.offeredCourse?.days?.map((day: string, index: number) => (
      <span key={index}>{day} </span>
    )),
  }));
  const columns: TableColumnsType<TOfferedCourses> = [
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Section",
      key: "section",
      dataIndex: "section",
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
    {
      title: "Days",
      key: "days",
      dataIndex: "days",
      render: (days) => <>{days}</>,
    },
  ];
  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  );
};

export default MySchedule;
