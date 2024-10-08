import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
const { Sider } = Layout;

const USER_ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  console.log(user);

  let sidebarItems;
  switch ((user as TUser)!.role) {
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
      break;
    case USER_ROLE.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, USER_ROLE.FACULTY);
      break;
    case USER_ROLE.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        PH University
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
