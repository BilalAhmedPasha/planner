import { Button, Modal, Tag, theme, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DEFAULT_BADGE_COLOR } from "../../../../constants/color.constants";
import { LISTS, SUCCESS, TAGS } from "../../../../constants/app.constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import PrimaryTaskListItemDetail from "./PrimaryDetails";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckBoxDropdown from "./CheckBoxDropdown";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import { DeleteOutlined, DeleteFilled, UndoOutlined } from "@ant-design/icons";
import {
  hardDeleteSingleTaskAction,
  restoreTaskAction,
  softDeleteTaskAction,
} from "../../state/userTasks/userTasks.actions";

const renderTags = ({ item, tags, colorBorder, setSelectedTaskDetails }) => {
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
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTaskDetails([]);
              }}
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
const Item = ({
  user,
  messageApi,
  taskDetails,
  selectedTaskDetails,
  setSelectedTaskDetails,
  setShowCheckBoxMenu,
  showCheckBoxMenu,
}) => {
  const [modal, contextHolder] = Modal.useModal();
  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

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
    token: { colorBorder, colorTextLabel, colorError },
  } = theme.useToken();

  const currentURL = useLocation();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ marginTop: "0.15rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CheckBoxDropdown
          user={user}
          taskDetails={taskDetails}
          showCheckBoxMenu={showCheckBoxMenu}
          setShowCheckBoxMenu={setShowCheckBoxMenu}
          checkBoxContent={checkBoxContent}
          setCheckBoxContent={setCheckBoxContent}
        />
      </div>

      <div
        style={{ marginLeft: "1rem", flexGrow: 1, overflow:"hidden" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowCheckBoxMenu(false);
          if (e.nativeEvent.shiftKey) {
            setSelectedTaskDetails((prevState) => {
              if (!prevState.find((each) => each.id === taskDetails.id)) {
                return [...prevState, taskDetails];
              } else {
                if (selectedTaskDetails.length !== 1) {
                  return prevState.filter((each) => each.id !== taskDetails.id);
                } else {
                  return [...prevState];
                }
              }
            });
          } else {
            const urlPath = currentURL.pathname.split("/");
            if (
              urlPath.length >= 4 &&
              (urlPath[2] === LISTS || urlPath[2] === TAGS)
            ) {
              navigateTo(
                `/${urlPath[1]}/${urlPath[2]}/${urlPath[3]}/${taskDetails.id}`
              );
            } else {
              navigateTo(`/${urlPath[1]}/${urlPath[2]}/${taskDetails.id}`);
            }
          }
        }}
      >
        <PrimaryTaskListItemDetail
          taskDetails={taskDetails}
          selectedTaskDetail={selectedTaskDetails}
          setSelectedTaskDetails={setSelectedTaskDetails}
          lists={lists}
          handleTaskRestore={handleTaskRestore}
          showSoftDeleteConfirm={showSoftDeleteConfirm}
          handleSoftDelete={handleSoftDelete}
          showHardDeleteConfirm={showHardDeleteConfirm}
          handleHardDelete={handleHardDelete}
          setShowCheckBoxMenu={setShowCheckBoxMenu}
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
            setSelectedTaskDetails: setSelectedTaskDetails,
          })}
        </div>
      </div>

      <div>
        {taskDetails.isDeleted ? (
          <Button
            type="text"
            icon={
              <UndoOutlined
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? colorBorder
                      : colorTextLabel,
                  opacity: selectedTaskDetails?.length > 1 ? 0.3 : 1,
                  transition: "0.3s all ease",
                }}
              />
            }
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleTaskRestore({
                currentItem: taskDetails,
                restoreTaskAction: restoreTaskAction,
                successMessage: "Task restored",
                failureMessage: "Failed to restore task",
              });
            }}
            disabled={selectedTaskDetails?.length > 1}
          />
        ) : (
          <Button
            type="text"
            icon={
              <DeleteOutlined
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? colorBorder
                      : colorTextLabel,
                  opacity: selectedTaskDetails?.length > 1 ? 0.3 : 1,
                  transition: "0.3s all ease",
                }}
              />
            }
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              showSoftDeleteConfirm({
                content: "Delete this task?",
                handleSoftDelete: handleSoftDelete,
                currentItem: taskDetails,
                softDeleteAction: softDeleteTaskAction,
                successMessage: "Task deleted",
                failureMessage: "Failed to delete task",
              });
            }}
            disabled={selectedTaskDetails?.length > 1}
          />
        )}
        {taskDetails.isDeleted ? (
          <Button
            type="text"
            icon={
              <DeleteFilled
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? colorBorder
                      : colorError,
                  opacity: selectedTaskDetails?.length > 1 ? 0.3 : 1,
                  transition: "0.3s all ease",
                }}
              />
            }
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              showHardDeleteConfirm({
                content: "Delete this task permanently?",
                handleHardDelete: handleHardDelete,
                currentItem: taskDetails,
                hardDeleteAction: hardDeleteSingleTaskAction,
                successMessage: "Task deleted",
                failureMessage: "Failed to delete task",
              });
            }}
            disabled={selectedTaskDetails?.length > 1}
          />
        ) : null}
      </div>

      {contextHolder}
    </div>
  );
};
export default Item;
