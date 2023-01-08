import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { defaultSideNav1, defaultSideNav2 } from "./defaultSideNav.config";
import SideMenu from "../../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { listsSelector } from "./state/userLists/userLists.reducer";
import { tagsSelector } from "./state/userTags/userTags.reducer";
import { listsAction } from "./state/userLists/userLists.actions";
import { tagsAction } from "./state/userTags/userTags.actions";
import ListDialog from "./ListDialog";
import TagDialog from "./TagDialog";

const AppLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listsAction());
    dispatch(tagsAction());
  }, [dispatch]);

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const [openListDialog, setOpenListDialog] = useState(false);
  const handleAddList = (e) => {
    console.log("Handle Add List");
    setOpenListDialog(false);
  };

  const [openTagDialog, setOpenTagDialog] = useState(false);
  const handleAddTag = (e) => {
    console.log("Handle Add Tag");
    setOpenTagDialog(false);
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
            handleAdd: handleAddList,
            openAddDialog: openListDialog,
            setOpenAddDialog: setOpenListDialog,
          }}
          tagConfig={{
            items: tags,
            handleAdd: handleAddTag,
            openAddDialog: openTagDialog,
            setOpenAddDialog: setOpenTagDialog,
          }}
        />
        <ListDialog
          handleAdd={handleAddList}
          openAddDialog={openListDialog}
          setOpenAddDialog={setOpenListDialog}
        />
        <TagDialog
          handleAdd={handleAddTag}
          openAddDialog={openTagDialog}
          setOpenAddDialog={setOpenTagDialog}
        />
      </Layout.Sider>
      <Layout.Content className="content">{props.children}</Layout.Content>
    </Layout>
  );
};
export default AppLayout;
