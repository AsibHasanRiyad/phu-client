import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../constants/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";
export type TTableData = Pick<TStudent, "name" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(params);

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },

    {
      title: "Roll Number",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      render: () => (
        <Space>
          <Button>Update</Button>
          <Button>Details</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "10%",
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    filters,

    extra
  ) => {
    if (extra?.name) {
      const queryParams: TQueryParams[] = [];
      extra.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      extra.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
    console.log({ filters, extra });
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default StudentData;
