import React from "react";
import { Layout, Menu } from "antd";
import { defaultSideNav1, defaultSideNav2 } from "./defaultSideNav.config";
import SideMenu from "../../components/SideMenu";

import { useSelector } from "react-redux";
import { listsSelector } from "./state/userLists/userLists.reducer";
import { tagsSelector } from "./state/userTags/userTags.reducer";

const AppLayout = (props) => {
  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

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
          <SideMenu
            headerMenu={defaultSideNav1}
            footerMenu={defaultSideNav2}
            listItems={lists}
            tagItems={tags}
          />
        </Menu>
      </Layout.Sider>
      <Layout.Content className="content">{props.children}</Layout.Content>
    </Layout>
  );
};
export default AppLayout;
