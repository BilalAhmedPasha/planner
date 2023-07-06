import { Menu } from "antd";
import { ReactNode } from "react";

interface SideMenuProps {
  onClick: () => {};
  selectedAppMenuKey: string;
  openSubMenuKeys: string[];
  children: ReactNode;
}

const SideMenu = ({
  onClick,
  selectedAppMenuKey,
  openSubMenuKeys,
  children,
}: SideMenuProps) => {
  return (
    <Menu
      theme="light"
      defaultChecked={false}
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[selectedAppMenuKey]}
      selectedKeys={[selectedAppMenuKey]}
      openKeys={openSubMenuKeys}
    >
      {children}
    </Menu>
  );
};

export default SideMenu;
