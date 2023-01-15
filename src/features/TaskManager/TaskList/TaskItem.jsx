import { Badge, Checkbox, Space, Tag, Typography } from "antd";
import styled from "styled-components";
import {
  FlagFilled,
  SyncOutlined,
  NodeExpandOutlined,
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
  return <FlagFilled style={{ color: priorityColor }} />;
};

const renderListName = ({ item, lists }) => {
  const itemInList = lists?.find((each) => each.id === item?.listId);
  return (
    <Typography.Text style={{ textTransform: "capitalize" }}>
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
    return <NodeExpandOutlined />;
  }
};

const renderRepeatIcon = ({ item }) => {
  if (item.isRepeating) {
    return <SyncOutlined />;
  }
};
const renderTaskDate = ({ item }) => {
  const date = dayjs.utc().format("DD MMM");
  if (item.isRepeating) {
    return <Typography.Text>{date}</Typography.Text>;
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
      <Space size="middle">
        <StyledCheckBox />
        <Typography.Text>{taskDetails.name}</Typography.Text>
      </Space>
      <Space size="small">
        {renderPriorityFlag({ item: taskDetails })}
        {renderListName({ item: taskDetails, lists: lists })}
        {renderTags({
          item: taskDetails,
          tags: tags,
        })}
        {renderChildNodeIcon({ item: taskDetails })}
        {renderRepeatIcon({ item: taskDetails })}
        {renderTaskDate({ item: taskDetails })}
      </Space>
    </div>
  );
};
export default TaskItem;
