import { Button, Layout, message, Spin, theme, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { LOADER_SIZE } from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "./TaskDialogForm";

const TaskList = ({ user, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const { isLoadingTasks } = useSelector(tasksSelector);
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
      </Spin>
    </Layout.Content>
  );
};

export default TaskList;
