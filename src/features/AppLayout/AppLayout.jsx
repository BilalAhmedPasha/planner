import React, { useEffect, useState } from "react";
import { Layout, message, Spin } from "antd";
import { defaultSideNav1, defaultSideNav2 } from "./defaultSideNav.config";
import SideMenu from "../../components/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import { listsSelector } from "./state/userLists/userLists.reducer";
import { tagsSelector } from "./state/userTags/userTags.reducer";
import {
  deleteListAction,
  fetchListsAction,
} from "./state/userLists/userLists.actions";
import {
  deleteTagAction,
  fetchTagsAction,
} from "./state/userTags/userTags.actions";
import ListDialog from "./ListDialog";
import TagDialog from "./TagDialog";
import { DELETE, SUCCESS } from "../../constants/app.constants";
import { EDIT } from "../../constants/formType.constants";

const AppLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListsAction());
    dispatch(fetchTagsAction());
  }, [dispatch]);

  const { lists, isLoadingLists, totalLists } = useSelector(listsSelector);
  const { tags, isLoadingTags, totalTags } = useSelector(tagsSelector);
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const deleteTagSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Tag Deleted",
      duration: 3,
    });
  };
  const deleteTagFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to delete tag",
      duration: 3,
    });
  };

  const deleteListSuccess = () => {
    messageApi.open({
      type: "success",
      content: "List Deleted",
      duration: 3,
    });
  };
  const deleteListFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to delete list",
      duration: 3,
    });
  };

  const handleDeleteTag = (currentTag) => {
    dispatch(deleteTagAction(currentTag)).then((response) => {
      if (response.success === SUCCESS) {
        deleteTagSuccess();
      } else {
        deleteTagFailed();
      }
    });
  };

  const handleDeleteList = (currentTag) => {
    dispatch(deleteListAction(currentTag)).then((response) => {
      if (response.success === SUCCESS) {
        deleteListSuccess();
      } else {
        deleteListFailed();
      }
    });
  };

  const [listFormType, setListFormType] = useState();
  const [listData, setListData] = useState();
  const [tagFormType, setTagFormType] = useState();
  const [tagData, setTagData] = useState();

  const handleMoreMenu = ({ e, currentItem }) => {
    if (e.key === DELETE) {
      if (e.keyPath.includes("tags")) {
        handleDeleteTag(currentItem);
      } else if (e.keyPath.includes("lists")) {
        handleDeleteList(currentItem);
      }
    } else if (e.key === EDIT) {
      if (e.keyPath.includes("tags")) {
        setTagData(currentItem);
        setTagFormType(EDIT);
        setOpenTagDialog(true);
      } else if (e.keyPath.includes("lists")) {
        setListData(currentItem);
        setListFormType(EDIT);
        setOpenListDialog(true);
      }
    }
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
        <Spin spinning={isLoadingTags || isLoadingLists} size="large">
          <SideMenu
            headerMenu={defaultSideNav1}
            footerMenu={defaultSideNav2}
            listConfig={{
              items: lists,
              count: totalLists,
              setOpenDialog: setOpenListDialog,
              handleMoreMenu: handleMoreMenu,
              setListFormType: setListFormType,
              setListData: setListData,
            }}
            tagConfig={{
              items: tags,
              count: totalTags,
              setOpenDialog: setOpenTagDialog,
              handleMoreMenu: handleMoreMenu,
              setTagFormType: setTagFormType,
              setTagData: setTagData,
            }}
          />
          {openListDialog && (
            <ListDialog
              messageApi={messageApi}
              openDialog={openListDialog}
              setOpenDialog={setOpenListDialog}
              formType={listFormType}
              formValues={listData}
            />
          )}
          {openTagDialog && (
            <TagDialog
              messageApi={messageApi}
              openDialog={openTagDialog}
              setOpenDialog={setOpenTagDialog}
              formType={tagFormType}
              formValues={tagData}
            />
          )}
        </Spin>
      </Layout.Sider>
      <Layout.Content className="content">{props.children}</Layout.Content>
      {contextHolder}
    </Layout>
  );
};
export default AppLayout;
