import { Dropdown, Modal, Tag, theme, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  HIGH_BG_COLOR,
  HIGH_COLOR,
  LOW_BG_COLOR,
  LOW_COLOR,
  MEDIUM_BG_COLOR,
  MEDIUM_COLOR,
  NONE_BG_COLOR,
  NONE_COLOR,
  DEFAULT_BADGE_COLOR,
} from "../../../../constants/color.constants";
import {
  COMPLETED,
  SUCCESS,
  WONT_DO,
} from "../../../../constants/app.constants";
import dayjs from "../../../../utils/dateTime.utils";
import { HIGH, LOW, MEDIUM } from "../../../../constants/priority.constants";
import { useDispatch } from "react-redux";
import {
  completeTaskAction,
  wontDoTaskAction,
} from "../../state/userTasks/userTasks.actions";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import CheckBoxInput from "../../../../components/CheckBox";
import { DAY } from "../../../../constants/dateTime.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../../constants/repeating.constants";
import PrimaryTaskListItemDetail from "./PrimaryTaskListItemDetail";
import styled from "styled-components";
import { Link } from "react-router-dom";

const getPriorityColor = ({ item, completedColor, completedBGColor }) => {
  if (item.isCompleted || item.isWontDo) {
    return { color: completedColor, bgColor: completedBGColor };
  }
  if (item.priority === HIGH) {
    return { color: HIGH_COLOR, bgColor: HIGH_BG_COLOR };
  } else if (item.priority === MEDIUM) {
    return { color: MEDIUM_COLOR, bgColor: MEDIUM_BG_COLOR };
  } else if (item.priority === LOW) {
    return { color: LOW_COLOR, bgColor: LOW_BG_COLOR };
  }
  return { color: NONE_COLOR, bgColor: NONE_BG_COLOR };
};

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

  const handleSoftDelete = ({
    currentItem,
    softDeleteAction,
    successMessage,
    failureMessage,
  }) => {
    dispatch(softDeleteAction(user.uid, currentItem)).then((response) => {
      if (response.success === SUCCESS) {
        success({ messageText: successMessage });
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

  const markTaskComplete = (isCompleted) => {
    const markedTime = dayjs.utc().endOf(DAY).format();
    let shouldCreateNewTask = true;
    let updatedTaskDate = null;
    if (taskDetails.isRepeating) {
      updatedTaskDate = dayjs(taskDetails.taskDate).add(
        1,
        repeatMapping[taskDetails.repeatFrequency]
      );
      let endTaskDate = null;
      if (taskDetails.endBy === END_BY_DATE) {
        endTaskDate = dayjs(taskDetails.endByDate).endOf(DAY);
      } else if (taskDetails.endBy === END_BY_REPEAT_COUNT) {
        endTaskDate = dayjs(taskDetails.endByRepeatCountDate).endOf(DAY);
      }
      if (endTaskDate) {
        if (updatedTaskDate.isAfter(endTaskDate)) {
          shouldCreateNewTask = false;
        }
      }
    }

    return dispatch(
      completeTaskAction(
        user.uid,
        taskDetails,
        isCompleted,
        markedTime,
        updatedTaskDate?.format(),
        shouldCreateNewTask
      )
    );
  };

  const markTaskWontDo = (isWontDo) => {
    const markedTime = dayjs.utc().endOf(DAY).format();
    let shouldCreateNewTask = true;
    let updatedTaskDate = null;

    if (taskDetails.isRepeating) {
      updatedTaskDate = dayjs(taskDetails.taskDate).add(
        1,
        repeatMapping[taskDetails.repeatFrequency]
      );
      let endTaskDate = null;
      if (taskDetails.endBy === END_BY_DATE) {
        endTaskDate = dayjs(taskDetails.endByDate).endOf(DAY);
      } else if (taskDetails.endBy === END_BY_REPEAT_COUNT) {
        endTaskDate = dayjs(taskDetails.endByRepeatCountDate).endOf(DAY);
      }
      if (endTaskDate) {
        if (updatedTaskDate.isAfter(endTaskDate)) {
          shouldCreateNewTask = false;
        }
      }
    }
    return dispatch(
      wontDoTaskAction(
        user.uid,
        taskDetails,
        isWontDo,
        markedTime,
        updatedTaskDate?.format(),
        shouldCreateNewTask
      )
    );
  };

  const handleClick = (e) => {
    e.stopPropagation();
    markTaskComplete(e.target.checked).then((response) => {
      if (response.success === SUCCESS) {
        setShowCheckBoxMenu(false);
        setCheckBoxContent(tick);
      }
    });
  };

  const handleRightClick = ({ e, taskDetails }) => {
    e.preventDefault();
    if (taskDetails.isDeleted) return false;
    setShowCheckBoxMenu(true);
  };

  const handleMenuClick = (e) => {
    if (e.key === COMPLETED) {
      markTaskComplete(!taskDetails.isCompleted).then((response) => {
        if (response.success === SUCCESS) {
          setShowCheckBoxMenu(false);
          setCheckBoxContent(tick);
        }
      });
    } else if (e.key === WONT_DO) {
      markTaskWontDo(!taskDetails.isWontDo).then((response) => {
        if (response.success === SUCCESS) {
          setShowCheckBoxMenu(false);
          setCheckBoxContent(cross);
        }
      });
    }
  };

  const checkBoxMenuItems = [
    {
      label: "Complete",
      key: COMPLETED,
    },
    {
      label: "Won't Do",
      key: WONT_DO,
    },
  ];

  const {
    token: { colorBgContainer, colorBorder, colorBorderSecondary },
  } = theme.useToken();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ float: "left", marginTop: "0.15rem" }}>
        <Dropdown
          menu={{
            items: checkBoxMenuItems,
            onClick: handleMenuClick,
          }}
          placement="bottomLeft"
          open={showCheckBoxMenu}
          disabled={taskDetails.isDeleted}
        >
          <CheckBoxInput
            uniCode={checkBoxContent}
            backgroundColor={
              getPriorityColor({
                item: taskDetails,
                completedColor: colorBorder,
                completedBGColor: colorBorderSecondary,
              }).color
            }
            borderColor={
              getPriorityColor({
                item: taskDetails,
                completedColor: colorBorder,
                completedBGColor: colorBorderSecondary,
              }).color
            }
            checkBoxColor={
              getPriorityColor({
                item: taskDetails,
                completedColor: colorBorder,
                completedBGColor: colorBorderSecondary,
              }).color
            }
            hoverBgColor={
              getPriorityColor({
                item: taskDetails,
                completedColor: colorBorder,
                completedBGColor: colorBorderSecondary,
              }).bgColor
            }
            onChange={handleClick}
            onContextMenu={(e) => handleRightClick({ e, taskDetails })}
            checked={taskDetails.isCompleted || taskDetails.isWontDo}
            disabled={taskDetails.isDeleted}
            colorBgContainer={colorBgContainer}
          />
        </Dropdown>
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
