import React, { useEffect, useState } from "react";
import { Layout, message, Spin } from "antd";
import { defaultSideNav1, defaultSideNav2 } from "./defaultSideNav.config";
import SideMenu from "../../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { listsSelector } from "./state/userLists/userLists.reducer";
import { tagsSelector } from "./state/userTags/userTags.reducer";
import { listsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import ListDialog from "./ListDialog";
import TagDialog from "./TagDialog";

const AppLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listsAction());
    dispatch(fetchTagsAction());
  }, [dispatch]);

  const { lists } = useSelector(listsSelector);
  const { tags, isLoadingTags } = useSelector(tagsSelector);
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddList = (e) => {
    console.log("Handle Add List");
    setOpenListDialog(false);
  };

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
        <SideMenu
          headerMenu={defaultSideNav1}
          footerMenu={defaultSideNav2}
          listConfig={{
            items: lists,
            setOpenAddDialog: setOpenListDialog,
          }}
          tagConfig={{
            items: tags,
            setOpenAddDialog: setOpenTagDialog,
          }}
        />
        <ListDialog
          handleAdd={handleAddList}
          openAddDialog={openListDialog}
          setOpenAddDialog={setOpenListDialog}
        />
        <Spin spinning={isLoadingTags} size="large">
          <TagDialog
            messageApi={messageApi}
            openAddDialog={openTagDialog}
            setOpenAddDialog={setOpenTagDialog}
          />
        </Spin>
      </Layout.Sider>
      <Layout.Content className="content">{props.children}</Layout.Content>
      {contextHolder}
    </Layout>
  );
};
export default AppLayout;
