import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await changePassword(data);

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ minHeight: "100vh" }}>
      <PHForm onSubmit={onsubmit}>
        <PHInput
          type={"password"}
          name={"oldPassword"}
          label={"Old Password "}
        />

        <PHInput
          type={"password"}
          name={"newPassword"}
          label={"New Password"}
        />

        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
