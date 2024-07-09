import { Button } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { handleSubmit, register } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "12345",
  //   },
  // });
  const [login] = useLoginMutation();

  const onsubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("User logging in..");

    // try {
    //   const userInfo = {
    //     id: data.id,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(
    //     setUser({
    //       user: user,
    //       token: res.data.accessToken,
    //     })
    //   );
    //   toast.success("User logged in successfully", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    //   navigate(`/${user.role}/dashboard`);
    // } catch (error) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
  };
  return (
    <PHForm onSubmit={onsubmit}>
      <div>
        <PHInput type={"text"} name={"id"} label={"ID: "} />
      </div>
      <div>
        <PHInput type={"password"} name={"password"} label={"Password: "} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default Login;
