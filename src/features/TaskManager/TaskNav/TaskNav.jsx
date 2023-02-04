import { Badge, Button, Dropdown, Layout, Menu, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../../components/SideMenu";
import {
  DELETE,
  LISTS,
  LOADER_SIZE,
  SUCCESS,
  TAGS,
} from "../../../constants/app.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import { defaultTaskNav1, defaultTaskNav2 } from "./defaultTaskNav.config";
import ListDialogForm from "../ListDialogForm";
import TagDialogForm from "../TagDialogForm";
import { deleteListAction } from "../state/userLists/userLists.actions";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { deleteTagAction } from "../state/userTags/userTags.actions";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  UnorderedListOutlined,
  TagOutlined,
  PlusOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Loading from "../../../components/Loading";
import Spinner from "../../../components/Spinner";

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

const moreMenuItemList = [
  {
    label: "Edit",
    key: EDIT,
  },
  {
    label: "Delete",
    key: DELETE,
  },
];

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
          <Menu.Item key={each.id}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to={`/tasks/${key}/${each.id}`}>{each.label}</Link>
              <Space>
                {renderColorDot(each.color)}
                <Dropdown
                  menu={{
                    items: moreMenuItemList,
                    onClick: (e) => onMoreClick({ e, currentItem: each }),
                  }}
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

const TaskNav = ({
  user,
  messageApi,
  currentSelectedTaskSection,
  setCurrentSelectedTaskSection,
  setSelectedCardId,
  collapsed,
  setSelectedTaskDetails,
}) => {
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

  const history = useHistory();
  const { documentId } = useParams();
  const handleDelete = ({
    currentItem,
    deleteAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(deleteAction(user.uid, currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
        if (documentId === currentItem.id) {
          history.push("/tasks/inbox");
        }
      } else {
        deleteFailed({ messageText: failureMessage });
      }
    });
  };

  const handleMoreMenu = ({ e, currentItem }) => {
    e.domEvent.stopPropagation();
    if (e.key === DELETE) {
      if (e.keyPath.includes(TAGS)) {
        showDeleteConfirm({
          currentItem: currentItem,
          deleteAction: deleteTagAction,
          successMessage: "Tag deleted",
          failureMessage: "Failed to delete tag",
          content:
            "The tag will be deleted and removed in all tasks. Delete the tag?",
          handleDelete: handleDelete,
        });
      } else if (e.keyPath.includes(LISTS)) {
        showDeleteConfirm({
          currentItem: currentItem,
          deleteAction: deleteListAction,
          successMessage: "List deleted",
          failureMessage: "Failed to delete list",
          content:
            "The list will be deleted along with its tasks. Delete the list?",
          handleDelete: handleDelete,
        });
      }
    } else if (e.key === EDIT) {
      if (e.keyPath.includes(TAGS)) {
        setTagData(currentItem);
        setTagFormType(EDIT);
        setOpenTagDialog(true);
      } else if (e.keyPath.includes(LISTS)) {
        setListData(currentItem);
        setListFormType(EDIT);
        setOpenListDialog(true);
      }
    }
  };

  const handleMenuClick = (e) => {
    if (
      e.domEvent.currentTarget.textContent !== currentSelectedTaskSection.label
    ) {
      setCurrentSelectedTaskSection(e.domEvent.currentTarget.textContent);
      setSelectedCardId("");
      setSelectedTaskDetails(null);
    }
  };

  const { confirm } = Modal;

  const showDeleteConfirm = ({
    content,
    handleDelete,
    currentItem,
    deleteAction,
    successMessage,
    failureMessage,
  }) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Delete",
      content: content,
      centered: true,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete({
          currentItem: currentItem,
          deleteAction: deleteAction,
          successMessage: successMessage,
          failureMessage: failureMessage,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const url = useLocation();
  let selectedAppMenuKey = url.pathname;
  let openSubMenuKeys;
  const pathParameters = url?.pathname.split("/");

  useEffect(() => {
    let currentSideMenuItem = [...defaultTaskNav1, ...defaultTaskNav2].filter(
      (each) => each.redirectUrl === selectedAppMenuKey
    );
    if (currentSideMenuItem.length === 0) {
      if (pathParameters[2] === LISTS) {
        currentSideMenuItem = lists.filter(
          (each) => each.id === pathParameters[3]
        );
      } else if (pathParameters[2] === TAGS) {
        currentSideMenuItem = tags.filter(
          (each) => each.id === pathParameters[3]
        );
      }
    }
    setCurrentSelectedTaskSection(currentSideMenuItem[0]);
  }, [
    lists,
    tags,
    pathParameters,
    selectedAppMenuKey,
    setCurrentSelectedTaskSection,
  ]);

  if (pathParameters.length > 3) {
    openSubMenuKeys = pathParameters[2];
    selectedAppMenuKey = pathParameters[3];
  }

  return (
    <Layout.Sider
      theme="light"
      style={{
        overflow: "auto",
        paddingTop: "1vh",
        height: "99vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      width="18vw"
      collapsed={collapsed}
    >
      <Spinner
        spinning={isLoadingLists || isLoadingTags}
        indicator={Loading(LOADER_SIZE)}
      >
        <SideMenu
          selectedAppMenuKey={selectedAppMenuKey}
          openSubMenuKeys={openSubMenuKeys}
          onClick={handleMenuClick}
        >
          {renderMenuItems(defaultTaskNav1)}
          <Menu.Divider />
          {renderSubMenuItems({
            items: lists,
            itemCount: totalLists,
            key: LISTS,
            title: "Lists",
            onAddClick: (e) => {
              e.stopPropagation();
              setListFormType(CREATE);
              setOpenListDialog(true);
            },
            icon: <UnorderedListOutlined />,
            onMoreClick: handleMoreMenu,
            isLoading: isLoadingLists,
          })}
          {renderSubMenuItems({
            items: tags,
            itemCount: totalTags,
            key: TAGS,
            title: "Tags",
            onAddClick: (e) => {
              e.stopPropagation();
              setTagFormType(CREATE);
              setOpenTagDialog(true);
            },
            icon: <TagOutlined />,
            onMoreClick: handleMoreMenu,
            isLoading: isLoadingTags,
          })}
          <Menu.Divider />
          {renderMenuItems(defaultTaskNav2)}
        </SideMenu>
        {openListDialog && (
          <ListDialogForm
            user={user}
            messageApi={messageApi}
            openDialog={openListDialog}
            setOpenDialog={setOpenListDialog}
            formType={listFormType}
            formValues={listData}
          />
        )}
        {openTagDialog && (
          <TagDialogForm
            user={user}
            messageApi={messageApi}
            openDialog={openTagDialog}
            setOpenDialog={setOpenTagDialog}
            formType={tagFormType}
            formValues={tagData}
          />
        )}
      </Spinner>
    </Layout.Sider>
  );
};

export default TaskNav;
