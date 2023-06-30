import { Menu } from "antd";

const SideMenu = ({
  onClick,
  selectedAppMenuKey,
  openSubMenuKeys,
  children,
}) => {
  return (
    <Menu
      theme="light"
      defaultChecked={false}
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[selectedAppMenuKey]}
      selectedKeys={[selectedAppMenuKey]}
      defaultOpenKeys={[openSubMenuKeys]}
    >
      {children}
    </Menu>
  );
};

export default SideMenu;
