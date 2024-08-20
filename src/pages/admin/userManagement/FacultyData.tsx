import {
  Button,
  Modal,
  Pagination,
  Space,
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
import { TStudent } from "../../../types";
import { Link } from "react-router-dom";
export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "user"
>;
const FacultyData = () => {
  const [targetUser, setTargetUser] = useState<string | undefined>();
  const [newStatus, setNewStatus] = useState("");
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    data: facultyData,
    isFetching,
    refetch,
  } = useGetAllFacultyQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = facultyData?.meta;
  const tableData = facultyData?.data?.map(
    ({ _id, fullName, id, email, contactNo, user }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      user,
    })
  );
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
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact Number",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item.user);
        return (
          <Space>
            <Link to={`/admin/faculty-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>

            <Link to={`/admin/update-student/${item?.key}`}>
              {" "}
              <Button>Update</Button>
            </Link>
            {item?.user?.status === "in-progress" ? (
              <Button
                onClick={() => {
                  showModal(item?.user?._id, "blocked");
                }}
              >
                Block
              </Button>
            ) : (
              <Button
                onClick={() => {
                  showModal(item?.user?._id, "in-progress");
                }}
              >
                Unblock
              </Button>
            )}
          </Space>
        );
      },
      width: "10%",
    },
  ];

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: string, status: string) => {
    setTargetUser(id);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(targetUser);
    if (targetUser) {
      try {
        const result = await updateUser({
          id: targetUser,
          status: newStatus,
        }).unwrap();
        if (result?.success === true) {
          refetch();
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Failed to update student:", error);
      }
    }
  };

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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title={"Are you sure you want to block this user?"}
        okText={"Yes"}
      >
        <p style={{ fontSize: "16px", color: "#666" }}>
          You can unblock this user later if you change your mind.
        </p>
      </Modal>
    </div>
  );
};

export default FacultyData;
