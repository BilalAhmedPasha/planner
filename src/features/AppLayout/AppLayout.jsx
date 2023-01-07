import React, { useState } from "react";
import { Layout, Menu } from "antd";
import fixedSideNav from "./fixedSideNav.config";
import { Link } from "react-router-dom";

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
      >
        <Menu theme="light">
          {fixedSideNav.map((each, index) => {
            return (
              <Menu.Item key={index} icon={<each.icon />}>
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
