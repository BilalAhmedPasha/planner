import { Button, Layout, message, Space, Spin, theme, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { LOADER_SIZE } from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "./TaskDialogForm";
import Container from "./Container";
import {
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const TaskListContainer = ({
  user,
  currentSection,
  selectedCardId,
  setSelectedCardId,
  isMenuCollapsed,
  setIsMenuCollapsed,
}) => {
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
        padding: "1rem 1rem",
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
            height: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Space>
            <Button
              type="text"
              icon={
                isMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={() => {
                setIsMenuCollapsed((prevState) => !prevState);
              }}
              size="large"
            />
            <Typography.Text
              style={{
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {currentSection?.label}
            </Typography.Text>
          </Space>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
          />
        </div>
        {openAddTaskDialog && (
          <TaskDialogForm
            user={user}
            messageApi={messageApi}
            openDialog={openAddTaskDialog}
            setOpenDialog={setOpenAddTaskDialog}
            formType={CREATE}
          />
        )}
        <div
          style={{
            overflowY: "scroll",
            height: "91vh",
            padding: "1rem 2rem",
            marginTop: "0.5rem",
          }}
        >
          <Container
            user={user}
            tasks={tasks}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
        </div>
      </Spin>
    </Layout.Content>
  );
};

export default TaskListContainer;
