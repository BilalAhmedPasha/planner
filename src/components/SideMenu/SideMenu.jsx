import { Avatar, Badge, Button, Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import {
  TagOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { CREATE } from "../../constants/formType.constants";
import { UserAuth } from "../../context/AuthContext";

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

const moreMenuItems = ({ onMoreClick, currentItem }) => {
  return (
    <Menu onClick={(e) => onMoreClick({ e, currentItem })}>
      <Menu.Item key="edit">{"Edit"}</Menu.Item>
      <Menu.Item key="delete">{"Delete"}</Menu.Item>
    </Menu>
  );
};

const renderSubMenuItems = ({
  items,
  itemCount,
  key,
  title,
  onAddClick,
  icon,
  onMoreClick,
}) => {
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
          <Space>
            <Badge
              count={itemCount}
              showZero
              color="#aaaaaa"
              overflowCount={10}
            />
            <Button icon={<PlusOutlined />} type="text" onClick={onAddClick} />
          </Space>
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
                  overlay={() =>
                    moreMenuItems({
                      onMoreClick: onMoreClick,
                      currentItem: each,
                    })
                  }
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

const SideMenu = ({
  headerMenu,
  footerMenu,
  listConfig,
  tagConfig,
  setCurrentTitle,
  onClick,
  children,
}) => {
  return (
    <Menu theme="light" defaultChecked={false} mode="inline" onClick={onClick}>
      {children}
    </Menu>
  );
};

export default SideMenu;
