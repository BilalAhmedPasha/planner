import { Badge, Button, Dropdown, Modal, Space, Tag, Typography } from "antd";
import {
  SyncOutlined,
  NodeExpandOutlined,
  DeleteOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  COMPLETED_BG_COLOR,
  COMPLETED_COLOR,
  HIGH_BG_COLOR,
  HIGH_COLOR,
  LOW_BG_COLOR,
  LOW_COLOR,
  MEDIUM_BG_COLOR,
  MEDIUM_COLOR,
  NONE_BG_COLOR,
  NONE_COLOR,
  PRIMARY_BLACK_COLOR,
  TASK_ITEM_BADGE_COLOR,
} from "../../../../constants/color.constants";
import {
  COMPLETED,
  INBOX,
  SUCCESS,
  WONT_DO,
} from "../../../../constants/app.constants";
import dayjs from "../../../../utils/dateTime.uitls";
import { HIGH, LOW, MEDIUM } from "../../../../constants/priority.constants";
import { useDispatch } from "react-redux";
import {
  completeTaskAction,
  softDeleteTaskAction,
  hardDeleteSingleTaskAction,
  restoreTaskAction,
  wontDoTaskAction,
} from "../../state/userTasks/userTasks.actions";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import CheckBoxInput from "../../../../components/CheckBox";
import {
  DATE_FORMAT_IN_TASK_ITEM,
  DAY,
  TIME_ZONE,
} from "../../../../constants/dateTime.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../../constants/repeating.constants";

const getPriorityColor = ({ item }) => {
  if (item.isCompleted || item.isWontDo) {
    return { color: COMPLETED_COLOR, bgColor: COMPLETED_BG_COLOR };
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

const renderList = ({ item, lists }) => {
  const itemInList = lists?.find((each) => each.id === item?.listId);
  const listColor =
    item.isCompleted || item.isWontDo ? COMPLETED_COLOR : itemInList?.color;
  return (
    <Space size="small" align="center">
      {itemInList?.color ? renderColorDot(listColor) : null}
      <Typography.Text
        type="secondary"
        style={{ textTransform: "capitalize" }}
        disabled={item.isCompleted || item.isWontDo}
      >
        {itemInList?.label || INBOX}
      </Typography.Text>
    </Space>
  );
};

const renderTags = ({ item, tags }) => {
  if (item?.tagIds?.length > 0) {
    const tagId = item.tagIds[0];
    const tagDetails = tags.find((each) => each.id === tagId);
    return (
      <Badge
        size="small"
        count={item.tagIds.length - 1}
        overflowCount={3}
        color={TASK_ITEM_BADGE_COLOR}
        showZero={false}
        offset={[0, 8]}
        style={{ marginRight: "0.5rem" }}
      >
        <Tag
          color={
            item.isCompleted || item.isWontDo
              ? COMPLETED_COLOR
              : tagDetails.color
          }
          closable={false}
        >
          {tagDetails.label.length > 8
            ? `${tagDetails.label.slice(0, 5)}...`
            : tagDetails.label}
        </Tag>
      </Badge>
    );
  }
};

const renderChildNodeIcon = ({ item }) => {
  if (item.childTaskIds.length > 0) {
    return (
      <NodeExpandOutlined
        style={{
          color:
            item.isCompleted || item.isWontDo
              ? COMPLETED_COLOR
              : COMPLETED_BG_COLOR,
        }}
      />
    );
  }
};

const renderRepeatIcon = ({ item }) => {
  if (item.isRepeating) {
    return (
      <SyncOutlined
        style={{
          color:
            item.isCompleted || item.isWontDo
              ? COMPLETED_COLOR
              : COMPLETED_BG_COLOR,
        }}
      />
    );
  }
};
const renderTaskDate = ({ item }) => {
  const today = dayjs.utc().tz(TIME_ZONE).startOf(DAY);

  const taskDate = dayjs(item.taskDate);
  const startMultiDate = dayjs(item.startMultiDate);
  const endMultiDate = dayjs(item.endMultiDate);

  if (item.taskDate) {
    return (
      <Typography.Text
        type={taskDate.endOf(DAY).isBefore(today) ? "danger" : "secondary"}
        disabled={item.isCompleted || item.isWontDo}
      >
        {taskDate.format(DATE_FORMAT_IN_TASK_ITEM)}
      </Typography.Text>
    );
  } else if (item.isMultiDay) {
    return (
      <Typography.Text
        type={
          startMultiDate.endOf(DAY).isBefore(today) ? "danger" : "secondary"
        }
        disabled={item.isCompleted || item.isWontDo}
      >
        {`${startMultiDate.format(
          DATE_FORMAT_IN_TASK_ITEM
        )}-${endMultiDate.format(DATE_FORMAT_IN_TASK_ITEM)}`}
      </Typography.Text>
    );
  }
};

const TaskItem = ({
  user,
  messageApi,
  taskDetails,
  lists,
  tags,
  setSelectedCardId,
  setSelectedTaskDetails,
}) => {
  const { confirm } = Modal;

  const showSoftDeleteConfirm = ({
    content,
    handleSoftDelete,
    currentItem,
    softDeleteAction,
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
    confirm({
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

  const [showCheckBoxMenu, setShowCheckBoxMenu] = useState(false);
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
    markTaskComplete(e.target.checked).then((response) => {
      if (response.success === SUCCESS) {
        setShowCheckBoxMenu(false);
        setCheckBoxContent(tick);
      }
    });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowCheckBoxMenu((prevState) => !prevState);
  };

  function keyPress(e) {
    if (e.key === "Escape") {
      setShowCheckBoxMenu(false);
    }
  }

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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onClick={() => setShowCheckBoxMenu(false)}
      onKeyDown={keyPress}
    >
      <Space size="middle">
        <Dropdown
          menu={{ items: checkBoxMenuItems, onClick: handleMenuClick }}
          placement="bottomLeft"
          open={showCheckBoxMenu}
          disabled={taskDetails.isDeleted}
        >
          <CheckBoxInput
            uniCode={checkBoxContent}
            backgroundColor={getPriorityColor({ item: taskDetails }).color}
            borderColor={getPriorityColor({ item: taskDetails }).color}
            checkBoxColor={getPriorityColor({ item: taskDetails }).color}
            hoverBGColor={getPriorityColor({ item: taskDetails }).bgColor}
            onChange={handleClick}
            onContextMenu={handleRightClick}
            checked={taskDetails.isCompleted || taskDetails.isWontDo}
            disabled={taskDetails.isDeleted}
          />
        </Dropdown>

        <Space
          size="middle"
          style={{
            flex: "1",
            whiteSpace: "nowrap",
            overflowX: "scroll",
            textOverflow: "ellipsis",
          }}
        >
          <Typography.Text
            disabled={taskDetails.isCompleted || taskDetails.isWontDo}
          >{`${taskDetails.name} (${taskDetails.id})`}</Typography.Text>
        </Space>
      </Space>
      <div
        style={{
          whiteSpace: "nowrap",
          overflowX: "scroll",
          textOverflow: "ellipsis",
          paddingLeft: "0.25rem",
        }}
      >
        <Space size="small" style={{ paddingRight: "0.25rem" }}>
          {renderList({ item: taskDetails, lists: lists })}
          {renderTags({
            item: taskDetails,
            tags: tags,
          })}
          {renderChildNodeIcon({ item: taskDetails })}
          {renderRepeatIcon({ item: taskDetails })}
          {renderTaskDate({ item: taskDetails })}
        </Space>
        {taskDetails.isDeleted ? (
          <Button
            type="text"
            icon={
              <UndoOutlined
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? COMPLETED_COLOR
                      : PRIMARY_BLACK_COLOR,
                }}
              />
            }
            size="small"
            onClick={(e) => {
              handleTaskRestore({
                currentItem: taskDetails,
                restoreTaskAction: restoreTaskAction,
                successMessage: "Task restored",
                failureMessage: "Failed to restore task",
              });
            }}
          />
        ) : (
          <Button
            type="text"
            icon={
              <DeleteOutlined
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? COMPLETED_COLOR
                      : PRIMARY_BLACK_COLOR,
                }}
              />
            }
            size="small"
            onClick={(e) => {
              showSoftDeleteConfirm({
                content: "Delete this task?",
                handleSoftDelete: handleSoftDelete,
                currentItem: taskDetails,
                softDeleteAction: softDeleteTaskAction,
                successMessage: "Task deleted",
                failureMessage: "Failed to delete task",
              });
            }}
          />
        )}
        {taskDetails.isDeleted ? (
          <Button
            type="text"
            icon={
              <DeleteOutlined
                style={{
                  color:
                    taskDetails.isCompleted || taskDetails.isWontDo
                      ? COMPLETED_COLOR
                      : PRIMARY_BLACK_COLOR,
                }}
              />
            }
            size="small"
            onClick={(e) => {
              showHardDeleteConfirm({
                content: "Delete this task permanently?",
                handleHardDelete: handleHardDelete,
                currentItem: taskDetails,
                hardDeleteAction: hardDeleteSingleTaskAction,
                successMessage: "Task deleted",
                failureMessage: "Failed to delete task",
              });
            }}
          />
        ) : null}
        <Button
          type="text"
          icon={
            <RightOutlined
              style={{
                color:
                  taskDetails.isCompleted || taskDetails.isWontDo
                    ? COMPLETED_COLOR
                    : PRIMARY_BLACK_COLOR,
              }}
            />
          }
          size="small"
          onClick={(e) => {
            setSelectedCardId(taskDetails.id);
            setSelectedTaskDetails(taskDetails);
          }}
        />
      </div>
    </div>
  );
};
export default TaskItem;
