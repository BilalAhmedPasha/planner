import { Badge, Checkbox, Space, Tag, Typography } from "antd";
import styled from "styled-components";
import {
  FlagFilled,
  SyncOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import { NONE_COLOR } from "../../../constants/color.constants";
import { INBOX } from "../../../constants/app.constants";
import dayjs from "../../../utils/dateTime.uitls";

const StyledCheckBox = styled(Checkbox)`
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(1.25);
  }
`;

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

const TaskItem = () => {
  const date = dayjs.utc().format("DD MMM");
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
        <Typography.Text>{"Task name"}</Typography.Text>
      </Space>
      <Space size="small">
        <FlagFilled style={{ color: NONE_COLOR }} />
        {renderListName({ item: {}, lists: [] })}
        {renderTags({
          item: { tagIds: ["1/#F1AA68", "2/#68F1A6"] },
          tags: [
            { id: "1", label: "Tag Name" },
            { id: "2", label: "Tag" },
          ],
        })}
        <NodeExpandOutlined />
        <SyncOutlined />
        <Typography.Text>{date}</Typography.Text>
      </Space>
    </div>
  );
};
export default TaskItem;
