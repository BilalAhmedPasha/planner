import { useEffect } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Modal, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { UserAuth } from "../../../context/AuthContext";
import { defaultAppNav } from "./defaultAppNav.config";
import { LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import { removeUserSettingAction } from "../state/userSettings/userSettings.actions";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import useWindowSize from "../../../hooks/useWindowSize";
import { isOnVerySmallScreen } from "../../../utils/screen.utils";

const renderMenuItems = (itemsArray) => {
  return itemsArray.map((each) => {
    return (
      <Menu.Item key={each.redirectUrl} icon={<each.icon />} title="">
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const renderThemeChangeButton = ({
  userTheme,
  updateTheme,
  style = { fontSize: "1rem" },
}) => {
  return (
    <Button
      size="large"
      type="text"
      icon={userTheme ? <MdOutlineDarkMode style={style}/> : <MdOutlineLightMode style={style} />}
      style={{ cursor: "pointer" }}
      onClick={updateTheme}
    />
  );
};

const renderAvatarIcon = ({ menuProps, user, size }) => {
  return (
    <Dropdown menu={menuProps} placement="bottomLeft" trigger={["click"]}>
      <Avatar
        size={size}
        shape="square"
        src={user?.photoURL}
        style={{ cursor: "pointer" }}
      />
    </Dropdown>
  );
};

const AppNav = ({
  setCurrentTitle,
  userTheme,
  updateTheme,
  childrenWithProps,
}) => {
  const { logOut, user } = UserAuth();
  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      navigateTo("/login");
    }
  }, [navigateTo, user]);

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

  const screenSize = useWindowSize();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {!isOnVerySmallScreen({ currentWidth: screenSize.width }) && (
        <Layout.Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
          theme="light"
          collapsedWidth={50}
          collapsed
        >
          {renderAvatarIcon({
            menuProps,
            user,
            size: 45,
          })}
          <SideMenu
            onClick={handleMenuClick}
            selectedAppMenuKey={selectedAppMenuKey}
          >
            {renderMenuItems(defaultAppNav)}
          </SideMenu>
          <div style={{ position: "absolute", bottom: 0, margin: "0.3rem" }}>
            {renderThemeChangeButton({ userTheme, updateTheme })}
          </div>
        </Layout.Sider>
      )}
      {contextHolder}
      {childrenWithProps}
      {isOnVerySmallScreen({ currentWidth: screenSize.width }) && (
        <Layout.Footer
          style={{
            width: "100vw",
            zIndex: 20,
            background: colorBgContainer,
            padding: "1rem",
          }}
          theme="light"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {renderAvatarIcon({ menuProps, user, size: 30 })}
            {defaultAppNav.map((each) => {
              return (
                <Link to={each.redirectUrl} key={each.redirectUrl}>
                  <Button
                    size="large"
                    type="text"
                    icon={<each.icon style={{ fontSize: "1.5rem" }} />}
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              );
            })}
            {renderThemeChangeButton({
              userTheme,
              updateTheme,
              style: {
                fontSize: "1.5rem",
              },
            })}
          </div>
        </Layout.Footer>
      )}
    </>
  );
};

export default AppNav;
