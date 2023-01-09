import { Layout, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../../components/SideMenu";
import { DELETE, SUCCESS } from "../../../constants/app.constants";
import { EDIT } from "../../../constants/formType.constants";
import { defaultSideNav1, defaultSideNav2 } from "../defaultSideNav.config";
import ListDialog from "../ListDialog";
import { deleteListAction } from "../state/userLists/userLists.actions";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { deleteTagAction } from "../state/userTags/userTags.actions";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import TagDialog from "../TagDialog";

const Sider = ({ messageApi, setCurrentTitle }) => {
  const dispatch = useDispatch();
  const { lists, isLoadingLists, totalLists } = useSelector(listsSelector);
  const { tags, isLoadingTags, totalTags } = useSelector(tagsSelector);

  const [openListDialog, setOpenListDialog] = useState(false);
  const [listFormType, setListFormType] = useState();
  const [listData, setListData] = useState();

  const [openTagDialog, setOpenTagDialog] = useState(false);
  const [tagFormType, setTagFormType] = useState();
  const [tagData, setTagData] = useState();

  const deleteSuccess = ({ messageText }) => {
    messageApi.open({
      type: "success",
      content: messageText,
      duration: 3,
    });
  };
  const deleteFailed = ({ messageText }) => {
    messageApi.open({
      type: "error",
      content: messageText,
      duration: 3,
    });
  };

  const handleDelete = ({
    currentItem,
    deleteAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(deleteAction(currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
      } else {
        deleteFailed({ messageText: failureMessage });
      }
    });
  };

  const handleMoreMenu = ({ e, currentItem }) => {
    if (e.key === DELETE) {
      if (e.keyPath.includes("tags")) {
        handleDelete({
          currentItem: currentItem,
          deleteAction: deleteTagAction,
          successMessage: "Tag deleted",
          failureMessage: "Failed to delete tag",
        });
      } else if (e.keyPath.includes("lists")) {
        handleDelete({
          currentItem: currentItem,
          deleteAction: deleteListAction,
          successMessage: "List deleted",
          failureMessage: "Failed to delete list",
        });
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
    <Layout.Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "90vh",
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
          setCurrentTitle={setCurrentTitle}
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
  );
};

export default Sider;
