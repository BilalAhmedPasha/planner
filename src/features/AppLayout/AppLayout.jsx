import React from "react";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { defaultSideNav1, defaultSideNav2 } from "./defaultSideNav.config";
import {
  TagOutlined,
  UnorderedListOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
];

const listNames = [
  {
    label: "List 1",
    color: "#D87C69",
    redirectUrl: "/list1",
  },
  {
    label: "List 2",
    color: "#96CD6C",
    redirectUrl: "/list2",
  },
];
const tagNames = [
  {
    label: "Tag 1",
    color: "#6CBBCD",
    redirectUrl: "/tag1",
  },
  {
    label: "Tag 2",
    color: "#966CCD",
    redirectUrl: "/tag2",
  },
];

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
const AppLayout = (props) => {
  return (
    <Layout hasSider>
      <Layout.Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "98vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        width={300}
      >
        <Menu theme="light" defaultChecked={false} mode="inline">
          {defaultSideNav1.map((each) => {
            return (
              <Menu.Item key={each.redirectUrl} icon={<each.icon />}>
                <Link to={each.redirectUrl}>{each.label}</Link>
              </Menu.Item>
            );
          })}
          <Menu.Divider />
          <Menu.SubMenu
            key="lists"
            title={
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {"Lists"}
                <Button
                  icon={<PlusOutlined />}
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add list clicked");
                  }}
                />
              </div>
            }
            icon={<UnorderedListOutlined />}
          >
            {listNames.map((each) => {
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
                    <Link to={`/lists${each.redirectUrl}`}>{each.label}</Link>
                    <Space>
                      {renderColorDot(each.color)}
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button
                          icon={<MoreOutlined />}
                          type="text"
                          size="small"
                        />
                      </Dropdown>
                    </Space>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="tags"
            title={
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {"Tags"}
                <Button
                  icon={<PlusOutlined />}
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add tag clicked");
                  }}
                />
              </div>
            }
            icon={<TagOutlined />}
          >
            {tagNames.map((each) => {
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
                    <Link to={`/tags${each.redirectUrl}`}>{each.label}</Link>
                    <Space>
                      {renderColorDot(each.color)}
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button
                          icon={<MoreOutlined />}
                          type="text"
                          size="small"
                        />
                      </Dropdown>
                    </Space>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
          <Menu.Divider />
          {defaultSideNav2.map((each) => {
            return (
              <Menu.Item key={each.redirectUrl} icon={<each.icon />}>
                <Link to={each.redirectUrl}>{each.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Layout.Sider>
      <Layout.Content className="content">{props.children}</Layout.Content>
    </Layout>
  );
};
export default AppLayout;
