import { Menu } from "antd";

const SideMenu = ({ onClick, selectedAppMenuKey, children }) => {
  return (
    <Menu
      theme="light"
      defaultChecked={false}
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[selectedAppMenuKey]}
    >
      {children}
    </Menu>
  );
};

export default SideMenu;
