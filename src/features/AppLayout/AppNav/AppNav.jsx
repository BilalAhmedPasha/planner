import { useEffect } from "react";
import { Avatar, Dropdown, Layout, Menu, Modal } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { UserAuth } from "../../../context/AuthContext";
import { defaultAppNav } from "./defaultAppNav.config";
import { LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import { removeUserSettingAction } from "../state/userSettings/userSettings.actions";

const renderMenuItems = (itemsArray) => {
  return itemsArray.map((each) => {
    return (
      <Menu.Item key={each.redirectUrl} icon={<each.icon />} title="">
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const AppNav = ({ setCurrentTitle }) => {
  const { logOut, user } = UserAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  }, [history, user]);

  const handleSignOut = async () => {
    try {
      await logOut();
      dispatch(removeUserSettingAction());
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

  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () => {
    modal.confirm({
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

  const url = useLocation();
  let selectedAppMenuKey = "/tasks/all";
  const currentPathName = url.pathname.split("/");
  if (currentPathName[1] === "calendar") {
    selectedAppMenuKey = "/calendar";
  } else if (currentPathName[1] === "habits") {
    selectedAppMenuKey = "/habits";
  }

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
      collapsedWidth={50}
      collapsed
    >
      <Dropdown menu={menuProps} placement="bottomLeft" trigger={["click"]}>
        <Avatar
          size={45}
          shape="square"
          src={user?.photoURL}
          style={{ margin: "0.15rem", cursor: "pointer" }}
        />
      </Dropdown>
      <SideMenu
        onClick={handleMenuClick}
        selectedAppMenuKey={selectedAppMenuKey}
      >
        {renderMenuItems(defaultAppNav)}
      </SideMenu>
      {contextHolder}
    </Layout.Sider>
  );
};

export default AppNav;
