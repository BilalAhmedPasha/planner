import { Button, Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import {
  TagOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const renderColorDot = (color) => {
  return (
    <span
      style={{
        height: "0.5rem",
        width: "0.5rem",
        borderRadius: "50%",
        backgroundColor: `${color}`,
        display: "inline-block",
      }}
    />
  );
};

const renderMenuItems = (itemsArray) => {
  return itemsArray.map((each) => {
    return (
      <Menu.Item key={each.redirectUrl} icon={<each.icon />}>
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const moreMenuItems = (
  <Menu
    onClick={(e) => {
      console.log(e.key);
    }}
  >
    <Menu.Item key="edit">{"Edit"}</Menu.Item>
    <Menu.Item key="delete">{"Delete"}</Menu.Item>
  </Menu>
);

const renderSubMenuItems = ({ items, key, title, onAddClick, icon }) => {
  return (
    <Menu.SubMenu
      key={key}
      title={
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title}
          <Button icon={<PlusOutlined />} type="text" onClick={onAddClick} />
        </div>
      }
      icon={icon}
    >
      {items.map((each) => {
        return (
          <Menu.Item key={each.redirectUrl}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to={`/${key}/${each.redirectUrl}`}>{each.label}</Link>
              <Space>
                {renderColorDot(each.color)}
                <Dropdown
                  overlay={moreMenuItems}
                  trigger={["hover"]}
                  placement="bottomLeft"
                >
                  <Button icon={<MoreOutlined />} type="text" size="small" />
                </Dropdown>
              </Space>
            </div>
          </Menu.Item>
        );
      })}
    </Menu.SubMenu>
  );
};

const SideMenu = ({ headerMenu, footerMenu, listConfig, tagConfig }) => {
  return (
    <Menu theme="light" defaultChecked={false} mode="inline">
      {renderMenuItems(headerMenu)}
      <Menu.Divider />
      {renderSubMenuItems({
        items: listConfig.items,
        key: "lists",
        title: "Lists",
        onAddClick: (e) => {
          e.stopPropagation();
          listConfig.setOpenAddDialog(true);
        },
        icon: <UnorderedListOutlined />,
      })}
      {renderSubMenuItems({
        items: tagConfig.items,
        key: "tags",
        title: "Tags",
        onAddClick: (e) => {
          e.stopPropagation();
          tagConfig.setOpenAddDialog(true);
        },
        icon: <TagOutlined />,
      })}
      <Menu.Divider />
      {renderMenuItems(footerMenu)}
    </Menu>
  );
};

export default SideMenu;
