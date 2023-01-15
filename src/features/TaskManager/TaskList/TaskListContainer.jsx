import {
  Badge,
  Button,
  Checkbox,
  Layout,
  List,
  message,
  Spin,
  Tag,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import { INBOX, LOADER_SIZE } from "../../../constants/app.constants";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import { CREATE } from "../../../constants/formType.constants";
import { HIGH, LOW, MEDIUM } from "../../../constants/priority.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "./TaskDialogForm";
import {
  FlagFilled,
  SyncOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import Container from "./Container";

const StyledCheckBox = styled(Checkbox)`
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(1.25);
  }
`;

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
          {tagDetails.label.length > 8
            ? `${tagDetails.label.slice(0, 1)}...`
            : tagDetails.label}
        </Tag>
      </Badge>
    );
  }
};

const renderListName = ({ item, lists }) => {
  const itemInList = lists.find((each) => each.id === item.listId);
  return (
    <Typography.Text style={{ textTransform: "capitalize" }}>
      {itemInList?.label || INBOX}
    </Typography.Text>
  );
};

const getListItemActions = ({ item, lists, tags }) => {
  let priorityColor = NONE_COLOR;
  if (item.priority === HIGH) {
    priorityColor = HIGH_COLOR;
  } else if (item.priority === MEDIUM) {
    priorityColor = MEDIUM_COLOR;
  } else if (item.priority === LOW) {
    priorityColor = LOW_COLOR;
  }
  const responseArray = [];
  responseArray.push(<FlagFilled style={{ color: priorityColor }} />);
  responseArray.push(renderListName({ item, lists }));
  if (item.tagIds.length > 0) {
    responseArray.push(renderTags({ item, tags }));
  }
  if (item.childTaskIds.length > 0) {
    responseArray.push(<NodeExpandOutlined />);
  }
  if (item.isRepeating) {
    responseArray.push(<SyncOutlined />);
  }
  return [...responseArray];
};

const renderListItem = ({ item, lists, tags }) => {
  return (
    <List.Item
      style={{
        margin: "0.5rem 0rem",
        padding: "0.5rem 1.5rem 0.5rem 1rem",
      }}
      actions={getListItemActions({ item, lists, tags })}
    >
      <List.Item.Meta
        avatar={<StyledCheckBox />}
        title={<Typography.Text>{item.name}</Typography.Text>}
      />
    </List.Item>
  );
};

const TaskListContainer = ({ user, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  return (
    <Layout.Content
      style={{
        marginRight: "0.1rem",
        padding: "1rem 3rem",
        background: colorBgContainer,
      }}
    >
      <Spin spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {title}
          </Typography.Text>
          <Button type="primary" onClick={handleAddTask}>
            {"Add Task"}
          </Button>
          {openAddTaskDialog && (
            <TaskDialogForm
              user={user}
              messageApi={messageApi}
              openDialog={openAddTaskDialog}
              setOpenDialog={setOpenAddTaskDialog}
              formType={CREATE}
            />
          )}
        </div>
        <div
          style={{ overflowY: "scroll", height: "90vh", padding: "1rem 0rem" }}
        >
          <Container tasks={tasks} />
        </div>
      </Spin>
    </Layout.Content>
  );
};

export default TaskListContainer;
