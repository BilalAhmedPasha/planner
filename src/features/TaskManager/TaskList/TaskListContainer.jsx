import { Button, Layout, message, Spin, theme, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { LOADER_SIZE } from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "./TaskDialogForm";
import Container from "./Container";

const TaskListContainer = ({ user, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi] = message.useMessage();
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
