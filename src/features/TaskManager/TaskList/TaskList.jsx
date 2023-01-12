import { Button, Layout, message, theme, Typography } from "antd";
import { useState } from "react";
import { CREATE } from "../../../constants/formType.constants";
import TaskDialogForm from "./TaskDialogForm";

const TaskList = ({ user, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [taskData, setTaskData] = useState();

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  return (
    <Layout.Content
      style={{
        marginRight: "0.1rem",
        padding: "1rem 3rem",
        background: colorBgContainer,
      }}
    >
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
            formValues={taskData}
          />
        )}
      </div>
    </Layout.Content>
  );
};

export default TaskList;
