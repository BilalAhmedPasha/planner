import {
  Button,
  Checkbox,
  Layout,
  List,
  message,
  Spin,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import { LOADER_SIZE } from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "./TaskDialogForm";

const StyledCheckBox = styled(Checkbox)`
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(1.25);
  }
  .ant-checkbox .ant-checkbox-inner {
    border-color: red;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: red;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: red;
    border-color: red;
  }
  

  .ant-checkbox-checked:hover .ant-checkbox-inner:hover,
  .ant-checkbox-checked-input:hover + .ant-checkbox-inner {
    border-color: red;
    background-color: red;
  }

  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: red;
    border-color: red;
  }
`;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const renderListItem = (item) => {
  return (
    <List.Item
      style={{
        // border: "1px solid grey",
        margin: "0.5rem 0rem",
        padding: "0.5rem 1.5rem 0.5rem 1rem",
      }}
      actions={[
        <Typography.Text>Actions</Typography.Text>,
        <Typography.Text>Actions</Typography.Text>,
      ]}
      extra={<Typography.Text>Extra</Typography.Text>}
    >
      <List.Item.Meta
        avatar={<StyledCheckBox value={item.isCompleted} />}
        title={<Typography.Text>{item.name}</Typography.Text>}
      />
    </List.Item>
  );
};
const TaskList = ({ user, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
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
            Add Task
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
          <List
            itemLayout="horizontal"
            dataSource={[...tasks, ...tasks, ...tasks, ...tasks, ...tasks]}
            renderItem={renderListItem}
          />
        </div>
      </Spin>
    </Layout.Content>
  );
};

export default TaskList;
