import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Space,
} from "antd";
import { useEffect, useMemo, useState } from "react";
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
import {
  defaultTaskNav1,
  defaultTaskNav2,
  moreMenuItemList,
} from "./defaultTaskNav.config";
import ListDialogForm from "./ListDialogForm";
import TagDialogForm from "./TagDialogForm";
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
  CloseOutlined,
} from "@ant-design/icons";
import Loading from "../../../components/Loading";
import Spinner from "../../../components/Spinner";
import { TASK_NAV_BADGE_COLOR } from "../../../constants/color.constants";
import {
  hardDeleteListTaskAction,
  deleteTaskTagAction,
} from "../state/userTasks/userTasks.actions";
import {
  isOnVerySmallScreen,
  taskNavToDrawer,
} from "../../../utils/screen.utils";
import useWindowSize from "../../../hooks/useWindowSize";

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
      <Menu.Item
        key={each.redirectUrl}
        icon={<each.icon style={{ fontSize: "1.10rem" }} />}
        title=""
      >
        <Link to={each.redirectUrl}>{each.label}</Link>
      </Menu.Item>
    );
  });
};

const renderSubMenuItems = ({
  items,
  itemCount,
  key,
  title,
  onAddClick,
  icon,
  onMoreClick,
  setOpenSubMenuKeys,
}) => {
  return (
    <Menu.SubMenu
      key={key}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title}
          <Space>
            <Badge
              count={itemCount}
              showZero
              color={TASK_NAV_BADGE_COLOR}
              overflowCount={10}
            />
            <Button icon={<PlusOutlined />} type="text" onClick={onAddClick} />
          </Space>
        </div>
      }
      icon={icon}
      onTitleClick={(e) => {
        setOpenSubMenuKeys((prevState) => {
          const isOpenAlready = prevState.find((each) => each === e.key);
          if (isOpenAlready) {
            return prevState.filter((each) => each !== e.key);
          } else {
            return [...prevState, e.key];
          }
        });
      }}
    >
      {items.map((each) => {
        return (
          <Menu.Item key={`/tasks/${key}/${each.id}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "auto",
              }}
            >
              <Link to={`/tasks/${key}/${each.id}`}>{each.label}</Link>
              <Space>
                {renderColorDot(each.color)}
                <Dropdown
                  menu={{
                    items: moreMenuItemList,
                    onClick: (e) => {
                      e.domEvent.stopPropagation();
                      onMoreClick({ e, currentItem: each });
                    },
                  }}
                  trigger={["click"]}
                  placement="bottomLeft"
                >
                  <Button
                    icon={<MoreOutlined />}
                    type="text"
                    onClick={(e) => e.stopPropagation()}
                  />
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
  isMenuCollapsed,
  setSelectedTaskDetails,
  isNavDrawerCollapsed,
  setIsNavDrawerCollapsed,
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
    modifyTaskAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(modifyTaskAction(user.uid, currentItem))
      .then((response) => {
        if (response.success === SUCCESS) {
          return dispatch(deleteAction(user.uid, currentItem));
        } else {
          deleteFailed({ messageText: failureMessage });
        }
      })
      .then((response) => {
        if (response.success === SUCCESS) {
          deleteSuccess({ messageText: successMessage });
          if (documentId === currentItem.id) {
            history.push("/tasks/all");
          }
        } else {
          deleteFailed({ messageText: failureMessage });
        }
      })
      .catch(() => {
        deleteFailed({ messageText: failureMessage });
      });
  };

  const handleMoreMenu = ({ e, currentItem }) => {
    e.domEvent.stopPropagation();
    if (e.key === DELETE) {
      if (e.keyPath.includes(TAGS)) {
        showDeleteConfirm({
          currentItem: currentItem,
          deleteAction: deleteTagAction,
          modifyTaskAction: deleteTaskTagAction,
          successMessage: "Tag deleted",
          failureMessage: "Failed to delete tag",
          content: "This tag will be removed in all tasks. Delete the tag?",
          handleDelete: handleDelete,
        });
      } else if (e.keyPath.includes(LISTS)) {
        showDeleteConfirm({
          currentItem: currentItem,
          deleteAction: deleteListAction,
          modifyTaskAction: hardDeleteListTaskAction,
          successMessage: "List deleted",
          failureMessage: "Failed to delete list",
          content:
            "The tasks in this list will be permanently deleted. Delete the list?",
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
      setSelectedTaskDetails([]);
      setIsNavDrawerCollapsed(true);
    }
  };

  const [modal, contextHolder] = Modal.useModal();

  const showDeleteConfirm = ({
    content,
    handleDelete,
    currentItem,
    deleteAction,
    modifyTaskAction,
    successMessage,
    failureMessage,
  }) => {
    modal.confirm({
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
          modifyTaskAction: modifyTaskAction,
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
  const [selectedAppMenuKey, setSelectedAppMenuKey] = useState(url.pathname);
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState(null);
  const pathParameters = useMemo(() => {
    return url?.pathname.split("/");
  }, [url]);

  useEffect(() => {
    let currentSideMenuItem = [...defaultTaskNav1, ...defaultTaskNav2].filter(
      (each) => url.pathname.includes(each.redirectUrl)
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
  }, [lists, tags, pathParameters, setCurrentSelectedTaskSection, url]);

  useEffect(() => {
    if (
      pathParameters.length > 3 &&
      (pathParameters[2] === LISTS || pathParameters[2] === TAGS)
    ) {
      setSelectedAppMenuKey(
        `/${pathParameters[1]}/${pathParameters[2]}/${pathParameters[3]}`
      );
      setOpenSubMenuKeys([pathParameters[2]]);
    } else {
      setSelectedAppMenuKey(`/${pathParameters[1]}/${pathParameters[2]}`);
      setOpenSubMenuKeys([]);
    }
  }, [pathParameters]);

  const taskNavContent = () => {
    return (
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
            setOpenSubMenuKeys: setOpenSubMenuKeys,
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
            setOpenSubMenuKeys: setOpenSubMenuKeys,
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
        {contextHolder}
      </Spinner>
    );
  };

  const screenSize = useWindowSize();
  return taskNavToDrawer({ currentWidth: screenSize.width }) ? (
    <Drawer
      title="Task Menu"
      placement={"left"}
      closable={false}
      open={!isNavDrawerCollapsed}
      bodyStyle={{ padding: "0px", overflow: "auto" }}
      destroyOnClose={true}
      width={
        isOnVerySmallScreen({ currentWidth: screenSize.width }) ? "80vw" : 300
      }
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setIsNavDrawerCollapsed(true)}
        />
      }
      headerStyle={{ height: "2.5rem", padding: "1rem" }}
    >
      {taskNavContent()}
    </Drawer>
  ) : (
    <Layout.Sider
      theme="light"
      style={{
        overflow: "auto",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      width={300}
      collapsed={isMenuCollapsed}
    >
      {taskNavContent()}
    </Layout.Sider>
  );
};

export default TaskNav;
