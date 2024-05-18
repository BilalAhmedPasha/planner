import { Space, Typography, theme } from "antd";
import { INBOX } from "../../../../constants/app.constants";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "../../../../utils/dateTime.utils";
import { SyncOutlined, NodeExpandOutlined } from "@ant-design/icons";
import {
  DATE_FORMAT_IN_TASK_ITEM,
  DAY,
  TIME_ZONE,
} from "../../../../constants/dateTime.constants";

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

const renderList = ({
  item,
  lists,
  colorBorder,
  colorTextLabel,
  setSelectedTaskDetails,
}) => {
  const itemInList = lists?.find((each) => each.id === item?.listId);
  const listColor =
    item.isCompleted || item.isWontDo ? colorBorder : itemInList?.color;
  return (
    <StyledLink
      to={itemInList ? `/tasks/lists/${itemInList?.id}` : `/tasks/inbox`}
      color={colorTextLabel}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedTaskDetails([]);
      }}
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

const PrimaryDetails = ({ taskDetails, setSelectedTaskDetails, lists }) => {
  const {
    token: { colorBorder, colorTextLabel },
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
      <span
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
            setSelectedTaskDetails: setSelectedTaskDetails,
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
      </span>
    </div>
  );
};

export default PrimaryDetails;
