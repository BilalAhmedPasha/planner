import { Badge, Button, Dropdown, Modal, Space, Tag, Typography } from "antd";
import {
  SyncOutlined,
  NodeExpandOutlined,
  DeleteOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  HIGH_BG_COLOR,
  HIGH_COLOR,
  LOW_BG_COLOR,
  LOW_COLOR,
  MEDIUM_BG_COLOR,
  MEDIUM_COLOR,
  NONE_BG_COLOR,
  NONE_COLOR,
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
  wontDoTaskAction,
} from "../../state/userTasks/userTasks.actions";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import CheckBoxInput from "../../../../components/CheckBox";

const getPriorityColor = ({ item }) => {
  if (item.priority === HIGH) {
    return { color: HIGH_COLOR, bgColor: HIGH_BG_COLOR };
  } else if (item.priority === MEDIUM) {
    return { color: MEDIUM_COLOR, bgColor: MEDIUM_BG_COLOR };
  } else if (item.priority === LOW) {
    return { color: LOW_COLOR, bgColor: LOW_BG_COLOR };
  }
  return { color: NONE_COLOR, bgColor: NONE_BG_COLOR };
};

const renderListName = ({ item, lists }) => {
  const itemInList = lists?.find((each) => each.id === item?.listId);
  return (
    <Typography.Text type="secondary" style={{ textTransform: "capitalize" }}>
      {itemInList?.label || INBOX}
    </Typography.Text>
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
        color="#AB98B8"
        showZero={false}
        offset={[0, 8]}
      >
        <Tag color={tagDetails.color} closable={false}>
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
    return <NodeExpandOutlined style={{ color: "grey" }} />;
  }
};

const renderRepeatIcon = ({ item }) => {
  if (item.isRepeating) {
    return <SyncOutlined style={{ color: "grey" }} />;
  }
};
const renderTaskDate = ({ item }) => {
  if (item.taskDate) {
    return (
      <Typography.Text type="secondary">
        {dayjs(item.taskDate).format("DD MMM")}
      </Typography.Text>
    );
  } else if (item.isMultiDay) {
    return (
      <Typography.Text type="secondary">
        {`${dayjs(item.startMultiDate).format("DD MMM")}-${dayjs(
          item.endMultiDate
        ).format("DD MMM")}`}
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

  const dispatch = useDispatch();
  const softDeleteSuccess = ({ messageText }) => {
    messageApi.open({
      type: "success",
      content: messageText,
      duration: 3,
    });
  };
  const softDeleteFailed = ({ messageText }) => {
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
        softDeleteSuccess({ messageText: successMessage });
      } else {
        softDeleteFailed({ messageText: failureMessage });
      }
    });
  };

  const [showCheckBoxMenu, setShowCheckBoxMenu] = useState(false);
  const [checkBoxContent, setCheckBoxContent] = useState(
    taskDetails.isCompleted ? tick : cross
  );

  const markTaskComplete = (isCompleted) => {
    return dispatch(completeTaskAction(user.uid, taskDetails, isCompleted));
  };

  const markTaskWontDo = (isWontDo) => {
    return dispatch(wontDoTaskAction(user.uid, taskDetails, isWontDo));
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
          <Typography.Text>{`${taskDetails.name}`}</Typography.Text>
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
          {renderListName({ item: taskDetails, lists: lists })}
          {renderTags({
            item: taskDetails,
            tags: tags,
          })}
          {renderChildNodeIcon({ item: taskDetails })}
          {renderRepeatIcon({ item: taskDetails })}
          {renderTaskDate({ item: taskDetails })}
        </Space>
        <Button
          type="text"
          icon={<DeleteOutlined />}
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
        <Button
          type="text"
          icon={<RightOutlined />}
          size="small"
          onClick={(e) => {
            setSelectedCardId(taskDetails.id);
          }}
        />
      </div>
    </div>
  );
};
export default TaskItem;
