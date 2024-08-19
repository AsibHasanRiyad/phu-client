/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement";
import { TSemester } from "../../../types";
import moment from "moment";
import { useState } from "react";
export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;
const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();
  const {
    data: semesterData,

    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }: TSemester) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );
  const handleStatus = (data: any) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateRegisteredSemester(updateData);
  };
  const menuProps = {
    items,
    onClick: handleStatus,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      render: (item) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button onClick={() => setSemesterId(item.key)}>Update</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default RegisteredSemester;
