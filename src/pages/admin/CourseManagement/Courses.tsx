/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../constants/global";
import {
  useGetAllFacultyQuery,
  useUpdateUserMutation,
} from "../../../redux/features/admin/userManagement.api";

import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import { TCourse } from "../../../types";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
export type TTableData = Pick<TCourse, "title" | "code" | "credits">;
const Courses = () => {
  const [newStatus, setNewStatus] = useState("");
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    data: courseData,
    isFetching,
    refetch,
  } = useGetAllCoursesQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  // console.log(courseData);
  const metaData = courseData?.meta;
  const tableData = courseData?.data?.map(
    ({ _id, title, code, credits }: TCourse) => ({
      key: _id,
      title,
      code,
      credits,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },
    {
      title: "Action",
      render: (item) => {
        return <AddFaculty courseInfo={item} />;
      },
      width: "10%",
    },
  ];

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
        loading={isFetching || isUpdating}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
        current={page}
      />
    </div>
  );
};

const AddFaculty = ({ courseInfo }) => {
  console.log(courseInfo);
  const { data: allFaculties } = useGetAllFacultyQuery("");
  const facultiesOption = allFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  const [addFaculties] = useAddFacultiesMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handelSubmit = (data) => {
    console.log(data);
    const facultyData = {
      courseId: courseInfo.key,
      data,
    };

    addFaculties(facultyData);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Assign Faculties"
        open={isModalOpen}
        onCancel={onCancel}
        footer={null}
      >
        <PHForm onSubmit={handelSubmit}>
          <PHSelect
            mode="multiple"
            label="Faculty"
            options={facultiesOption}
            name="faculties"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};
export default Courses;
