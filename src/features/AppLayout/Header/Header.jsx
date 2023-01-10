import { Avatar, Button, Layout, Space, theme, Typography } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { PoweroffOutlined } from "@ant-design/icons";

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logOut, user } = UserAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <Layout.Header
      className="header"
      style={{
        height: "7vh",
        padding: "0rem 1.5rem",
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <img
            src="../../favicon.ico"
            alt="app_icon"
            width="20rem"
            height="20rem"
          />
          <Typography.Text
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {"Planner"}
          </Typography.Text>
        </Space>
        <Space align="baseline">
          <Avatar size="large" shape="square" src={user.photoURL} />
          <Button
            danger
            type="text"
            size="large"
            icon={<PoweroffOutlined />}
            onClick={handleSignOut}
          />
        </Space>
      </div>
    </Layout.Header>
  );
};

export default Header;
