import { Badge, Button, Checkbox, Space, Tag, Typography } from "antd";
import styled from "styled-components";
import {
  FlagFilled,
  SyncOutlined,
  NodeExpandOutlined,
  DeleteOutlined,
  RightOutlined,
  ArrowRightOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import { INBOX } from "../../../constants/app.constants";
import dayjs from "../../../utils/dateTime.uitls";
import { HIGH, LOW, MEDIUM } from "../../../constants/priority.constants";

const StyledCheckBox = styled(Checkbox)`
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(1.25);
  }
`;

const renderPriorityFlag = ({ item }) => {
  let priorityColor = NONE_COLOR;
  if (item.priority === HIGH) {
    priorityColor = HIGH_COLOR;
  } else if (item.priority === MEDIUM) {
    priorityColor = MEDIUM_COLOR;
  } else if (item.priority === LOW) {
    priorityColor = LOW_COLOR;
  }
  return (
    <FlagFilled style={{ color: priorityColor, padding: "0rem 0.75rem" }} />
  );
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
  if (item.tagIds.length > 0) {
    const [tagId, tagColor] = item.tagIds[0].split("/");
    const tagDetails = tags.find((each) => each.id === tagId);
    return (
      <Badge
        size="small"
        count={item.tagIds.length - 1}
        overflowCount={3}
        color="#AB98B8"
        showZero={false}
        offset={[0, 2]}
      >
        <Tag color={tagColor} closable={false}>
          {tagDetails.label.length > 5
            ? `${tagDetails.label.slice(0, 3)}...`
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

const TaskItem = ({ taskDetails, lists, tags }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <StyledCheckBox />
      {renderPriorityFlag({ item: taskDetails })}
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
        <Button type="text" icon={<DeleteOutlined />} />
        <Button type="text" icon={<RightOutlined />} />
      </div>
    </div>
  );
};
export default TaskItem;
