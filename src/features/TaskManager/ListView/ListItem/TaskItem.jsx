import { Modal, Tag, theme, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DEFAULT_BADGE_COLOR } from "../../../../constants/color.constants";
import { SUCCESS } from "../../../../constants/app.constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import PrimaryTaskListItemDetail from "./PrimaryTaskListItemDetail";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckBoxDropdown from "./CheckBoxDropdown";

const renderTags = ({ item, tags, colorBorder }) => {
  if (item?.tagIds?.length > 0) {
    const tagsArray = [];
    for (let index = 0; index < 3; index++) {
      const tagDetails = tags.find((each) => each.id === item.tagIds[index]);
      tagDetails &&
        tagsArray.push(
          <Tag
            key={item.tagIds[index]}
            color={
              item.isCompleted || item.isWontDo
                ? colorBorder
                : tagDetails?.color || colorBorder
            }
            closable={false}
          >
            <StyledLink
              to={`/tasks/tags/${item.tagIds[index]}`}
              onClick={(e) => e.stopPropagation()}
            >
              {tagDetails?.label.length > 12
                ? `${tagDetails.label?.slice(0, 10)}...`
                : tagDetails?.label}
            </StyledLink>
          </Tag>
        );
    }
    if (item?.tagIds?.length > 3) {
      tagsArray.push(
        <Tag
          key={"overflow"}
          color={
            item.isCompleted || item.isWontDo
              ? colorBorder
              : DEFAULT_BADGE_COLOR || colorBorder
          }
          closable={false}
        >
          {`+${item.tagIds.length - 3}`}
        </Tag>
      );
    }
    return tagsArray;
  }
};
const StyledLink = styled(Link)`
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;
const TaskItem = ({
  user,
  messageApi,
  taskDetails,
  lists,
  tags,
  selectedTaskDetails,
  setSelectedTaskDetails,
  setShowCheckBoxMenu,
  showCheckBoxMenu,
}) => {
  const [modal, contextHolder] = Modal.useModal();

  const showSoftDeleteConfirm = ({
    content,
    handleSoftDelete,
    currentItem,
    softDeleteAction,
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
        handleSoftDelete({
          currentItem: currentItem,
          softDeleteAction: softDeleteAction,
          successMessage: successMessage,
          failureMessage: failureMessage,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const showHardDeleteConfirm = ({
    content,
    handleHardDelete,
    currentItem,
    hardDeleteAction,
    successMessage,
    failureMessage,
  }) => {
    modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Delete Forever",
      content: content,
      centered: true,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleHardDelete({
          currentItem: currentItem,
          hardDeleteAction: hardDeleteAction,
          successMessage: successMessage,
          failureMessage: failureMessage,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const dispatch = useDispatch();

  const success = ({ messageText }) => {
    messageApi.open({
      type: "success",
      content: messageText,
      duration: 3,
    });
  };
  const failed = ({ messageText }) => {
    messageApi.open({
      type: "error",
      content: messageText,
      duration: 3,
    });
  };

  const url = useLocation();
  const navigateTo = useNavigate();

  const handleSoftDelete = ({
    currentItem,
    softDeleteAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(softDeleteAction(user.uid, currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        success({ messageText: successMessage });
        const parsedURL = url.pathname.split("/");
        if (parsedURL[parsedURL.length - 1] === currentItem.id) {
          const updatedURL = parsedURL.slice(0, -1).join("/");
          setSelectedTaskDetails([]);
          navigateTo(updatedURL);
        }
      } else {
        failed({ messageText: failureMessage });
      }
    });
  };

  const handleHardDelete = ({
    currentItem,
    hardDeleteAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(hardDeleteAction(user.uid, currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        success({ messageText: successMessage });
      } else {
        failed({ messageText: failureMessage });
      }
    });
  };

  const handleTaskRestore = ({
    currentItem,
    restoreTaskAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(restoreTaskAction(user.uid, currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        success({ messageText: successMessage });
      } else {
        failed({ messageText: failureMessage });
      }
    });
  };

  const [checkBoxContent, setCheckBoxContent] = useState(
    taskDetails.isCompleted ? tick : cross
  );

  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ float: "left", marginTop: "0.15rem" }}>
        <CheckBoxDropdown
          user={user}
          taskDetails={taskDetails}
          showCheckBoxMenu={showCheckBoxMenu}
          setShowCheckBoxMenu={setShowCheckBoxMenu}
          checkBoxContent={checkBoxContent}
          setCheckBoxContent={setCheckBoxContent}
        />
      </div>
      <div style={{ marginLeft: "1.75rem" }}>
        <PrimaryTaskListItemDetail
          taskDetails={taskDetails}
          selectedTaskDetail={selectedTaskDetails}
          lists={lists}
          handleTaskRestore={handleTaskRestore}
          showSoftDeleteConfirm={showSoftDeleteConfirm}
          handleSoftDelete={handleSoftDelete}
          showHardDeleteConfirm={showHardDeleteConfirm}
          handleHardDelete={handleHardDelete}
        />
        {taskDetails.description && (
          <div>
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "100%",
              }}
              ellipsis={true}
              type="secondary"
              disabled={taskDetails.isCompleted || taskDetails.isWontDo}
            >
              {taskDetails.description}
            </Typography.Text>
          </div>
        )}
        <div>
          {renderTags({
            item: taskDetails,
            tags: tags,
            colorBorder: colorBorder,
          })}
        </div>
      </div>
      {contextHolder}
    </div>
  );
};
export default TaskItem;
