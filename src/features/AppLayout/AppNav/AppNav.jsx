import { Avatar, Button, Layout, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import SideMenu from "../../../components/SideMenu";
import { defaultAppNav } from "./defaultAppNav.config";
const renderMenuItems = (itemsArray) => {
  return itemsArray.map((each) => {
    return (
      <Menu.Item key={each.redirectUrl} icon={<each.icon />}>
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const SiderNav = ({ setCurrentTitle }) => {
  const handleMenuClick = (e) =>
    setCurrentTitle(e.domEvent.currentTarget.textContent);

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
      width="18vw"
      collapsed
    >
      <SideMenu onClick={handleMenuClick}>
        {renderMenuItems(defaultAppNav)}
      </SideMenu>
    </Layout.Sider>
  );
};

export default SiderNav;
