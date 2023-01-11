import { Menu } from "antd";

const SideMenu = ({ onClick, children }) => {
  return (
    <Menu theme="light" defaultChecked={false} mode="inline" onClick={onClick}>
      {children}
    </Menu>
  );
};

export default SideMenu;
