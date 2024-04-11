import { useEffect } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { UserAuth } from "../../../context/AuthContext";
import { defaultAppNav } from "./defaultAppNav.config";
import { LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import { removeUserSettingAction } from "../state/userSettings/userSettings.actions";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: absolute;
    bottom: 0;
    margin: 0.3rem;
`;

const StyledMdOutlineDarkMode = styled(MdOutlineDarkMode)`
    font-size: 1.25rem;
`;

const StyledMdOutlineLightMode = styled(MdOutlineLightMode)`
    font-size: 1.25rem;
`;

const renderMenuItems = (itemsArray) => {
    return itemsArray.map((each) => {
        return (
            <Menu.Item
                key={each.redirectUrl}
                icon={<each.icon id="menu__icon" />}
                title=""
            >
                <Link to={each.redirectUrl}>{each.label}</Link>
            </Menu.Item>
        );
    });
};

const AppNav = ({ setCurrentTitle, userTheme, updateTheme }) => {
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

    return (
        <Layout.Sider
            id="layout__sider"
            theme="light"
            collapsedWidth={50}
            collapsed
        >
            <Dropdown
                menu={menuProps}
                placement="bottomLeft"
                trigger={["click"]}
            >
                <Avatar
                    size={45}
                    shape="square"
                    src={user?.photoURL}
                    id="avatar"
                />
            </Dropdown>
            <SideMenu
                onClick={handleMenuClick}
                selectedAppMenuKey={selectedAppMenuKey}
            >
                {renderMenuItems(defaultAppNav)}
            </SideMenu>
            <StyledDiv>
                <Button
                    size="large"
                    type="text"
                    icon={
                        userTheme ? (
                            <StyledMdOutlineDarkMode />
                        ) : (
                            <StyledMdOutlineLightMode />
                        )
                    }
                    id="theme__button"
                    onClick={updateTheme}
                />
            </StyledDiv>
            {contextHolder}
        </Layout.Sider>
    );
};

export default AppNav;
