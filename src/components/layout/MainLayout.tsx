import { Layout, Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";

const { Content, Footer, Header, Sider } = Layout;

const MainLayout = () => {
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Dashboard",
    },
    {
      key: 2,
      label: "Profile",
    },
    {
      key: 3,
      label: "User Management",
      children: [
        {
          key: 21,
          label: "Create User",
        },
        {
          key: 22,
          label: "Create Admin",
        },
      ],
    },
  ];

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
          items={items}
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
