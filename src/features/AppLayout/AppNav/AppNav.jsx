import { useEffect } from "react";
import { Avatar, Dropdown, Layout, Menu, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { UserAuth } from "../../../context/AuthContext";
import { defaultAppNav } from "./defaultAppNav.config";
import { LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../../constants/app.constants";

const renderMenuItems = (itemsArray) => {
  return itemsArray.map((each) => {
    return (
      <Menu.Item key={each.redirectUrl} icon={<each.icon />} title="">
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const SiderNav = ({ setCurrentTitle }) => {
  const { logOut, user } = UserAuth();
  const history = useHistory();

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  }, [history, user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = (e) =>
    setCurrentTitle(e.domEvent.currentTarget.textContent);

  const items = [
    {
      label: "Logout",
      key: LOGOUT,
      icon: <LogoutOutlined />,
      title: null,
    },
  ];

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Are you sure you want to logout?",
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleSignOut();
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const handleAvatarClick = (e) => {
    if (e.key === LOGOUT) {
      showConfirm();
    }
  };

  const menuProps = {
    items,
    onClick: handleAvatarClick,
  };

  return (
    <Layout.Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      collapsedWidth={70}
      collapsed
    >
      <Dropdown menu={menuProps} placement="bottomLeft">
        <Avatar
          size={50}
          shape="square"
          src={user.photoURL}
          style={{ margin: "0.5rem", cursor: "pointer" }}
        />
      </Dropdown>
      <SideMenu onClick={handleMenuClick}>
        {renderMenuItems(defaultAppNav)}
      </SideMenu>
    </Layout.Sider>
  );
};

export default SiderNav;
