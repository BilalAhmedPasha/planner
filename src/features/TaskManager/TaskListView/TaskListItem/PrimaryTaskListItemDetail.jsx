import { Button, Space, Typography, theme } from "antd";
import { INBOX } from "../../../../constants/app.constants";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "../../../../utils/dateTime.utils";
import {
  SyncOutlined,
  NodeExpandOutlined,
  DeleteOutlined,
  DeleteFilled,
  UndoOutlined,
} from "@ant-design/icons";
import {
  DATE_FORMAT_IN_TASK_ITEM,
  DAY,
  TIME_ZONE,
} from "../../../../constants/dateTime.constants";
import {
  hardDeleteSingleTaskAction,
  restoreTaskAction,
  softDeleteTaskAction,
} from "../../state/userTasks/userTasks.actions";

const StyledLink = styled(Link)`
  align-items: center;
  color: ${(props) => props.color};
  :hover {
    color: ${(props) => props.color};
    text-decoration: underline;
  }
`;

const renderColorDot = (color) => {
  return (
    <span
      style={{
        height: "0.55rem",
        width: "0.55rem",
        borderRadius: "50%",
        backgroundColor: `${color}`,
        display: "inline-block",
      }}
    />
  );
};

const renderChildNodeIcon = ({ item, colorBorder, colorTextLabel }) => {
  if (item.childTaskIds.length > 0) {
    return (
      <NodeExpandOutlined
        style={{
          color:
            item.isCompleted || item.isWontDo ? colorBorder : colorTextLabel,
        }}
      />
    );
  }
};

const renderRepeatIcon = ({ item, colorBorder, colorTextLabel }) => {
  if (item.isRepeating) {
    return (
      <SyncOutlined
        style={{
          color:
            item.isCompleted || item.isWontDo ? colorBorder : colorTextLabel,
        }}
      />
    );
  }
};

const renderList = ({ item, lists, colorBorder, colorTextLabel }) => {
  const itemInList = lists?.find((each) => each.id === item?.listId);
  const listColor =
    item.isCompleted || item.isWontDo ? colorBorder : itemInList?.color;
  return (
    <StyledLink
      to={itemInList ? `/tasks/lists/${itemInList?.id}` : `/tasks/inbox`}
      color={colorTextLabel}
      onClick={(e) => e.stopPropagation()}
    >
      {itemInList?.color ? renderColorDot(listColor) : null}
      <Typography.Text
        type="secondary"
        style={{
          textTransform: "capitalize",
          paddingLeft: "0.3rem",
          cursor: "pointer",
        }}
        disabled={item.isCompleted || item.isWontDo}
      >
        {itemInList?.label || INBOX}
      </Typography.Text>
    </StyledLink>
  );
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

const PrimaryTaskListItemDetail = ({
  taskDetails,
  selectedTaskDetails,
  lists,
  handleTaskRestore,
  showSoftDeleteConfirm,
  handleSoftDelete,
  showHardDeleteConfirm,
  handleHardDelete,
}) => {
  const {
    token: { colorBorder, colorTextLabel, colorError },
  } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography.Text
        style={{
          whiteSpace: "nowrap",
          overflowX: "auto",
        }}
        disabled={taskDetails.isCompleted || taskDetails.isWontDo}
      >{`${taskDetails.name}`}</Typography.Text>
      <div
        style={{
          whiteSpace: "nowrap",
          overflowX: "auto",
          paddingLeft: "0.25rem",
        }}
      >
        <Space size="small" style={{ paddingRight: "0.25rem" }}>
          {renderList({
            item: taskDetails,
            lists: lists,
            colorBorder: colorBorder,
            colorTextLabel: colorTextLabel,
          })}
          {renderChildNodeIcon({
            item: taskDetails,
            colorTextLabel,
            colorBorder,
          })}
          {renderRepeatIcon({
            item: taskDetails,
            colorTextLabel,
            colorBorder,
          })}
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
    </div>
  );
};

export default PrimaryTaskListItemDetail;
