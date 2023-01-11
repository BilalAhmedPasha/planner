import { Badge, Button, Dropdown, Layout, Menu, Space, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../../../components/SideMenu";
import { DELETE, SUCCESS } from "../../../constants/app.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import { defaultTaskNav1, defaultTaskNav2 } from "./defaultTaskNav.config";
import ListDialog from "../ListDialog";
import { deleteListAction } from "../state/userLists/userLists.actions";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { deleteTagAction } from "../state/userTags/userTags.actions";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import TagDialog from "../TagDialog";
import { Link } from "react-router-dom";
import {
  UnorderedListOutlined,
  TagOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";

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

const moreMenuItems = ({ onMoreClick, currentItem }) => {
  return (
    <Menu onClick={(e) => onMoreClick({ e, currentItem })}>
      <Menu.Item key="edit">{"Edit"}</Menu.Item>
      <Menu.Item key="delete">{"Delete"}</Menu.Item>
    </Menu>
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
              <Link to={`/tasks/${key}/${each.redirectUrl}`}>{each.label}</Link>
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

const TaskNav = ({ messageApi, setCurrentTitle }) => {
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

  const handleMenuClick = (e) =>
    setCurrentTitle(e.domEvent.currentTarget.textContent);

  return (
    <Layout.Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      width="18vw"
    >
      <Spin spinning={isLoadingTags || isLoadingLists} size="large">
        <SideMenu
          headerMenu={defaultTaskNav1}
          footerMenu={defaultTaskNav2}
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
          onClick={handleMenuClick}
          setCurrentTitle={setCurrentTitle}
        >
          {renderMenuItems(defaultTaskNav1)}
          <Menu.Divider />
          {renderSubMenuItems({
            items: lists,
            itemCount: totalLists,
            key: "lists",
            title: "Lists",
            onAddClick: (e) => {
              e.stopPropagation();
              setListFormType(CREATE);
              setOpenListDialog(true);
            },
            icon: <UnorderedListOutlined />,
            onMoreClick: handleMoreMenu,
          })}
          {renderSubMenuItems({
            items: tags,
            itemCount: totalTags,
            key: "tags",
            title: "Tags",
            onAddClick: (e) => {
              e.stopPropagation();
              setTagFormType(CREATE);
              setOpenTagDialog(true);
            },
            icon: <TagOutlined />,
            onMoreClick: handleMoreMenu,
          })}
          <Menu.Divider />
          {renderMenuItems(defaultTaskNav2)}
        </SideMenu>
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

export default TaskNav;