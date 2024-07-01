import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";

const { Content, Footer, Header, Sider } = Layout;

const MainLayout = () => {
  // const items: MenuProps["items"] = [
  //   {
  //     key: "Dashboard",
  //     label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
  //   },
  //   {
  //     key: 3,
  //     label: "User Management",
  //     children: [
  //       {
  //         key: "Create Admin",
  //         label: <NavLink to={"/admin/create-admin"}>Create Admin</NavLink>,
  //       },
  //       {
  //         key: "Create Faculty",
  //         label: <NavLink to={"/admin/create-faculty"}>Create Faculty</NavLink>,
  //       },
  //       {
  //         key: "Create Student",
  //         label: <NavLink to={"/admin/create-student"}>Create Student</NavLink>,
  //       },
  //     ],
  //   },
  // ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
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
          items={adminSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
