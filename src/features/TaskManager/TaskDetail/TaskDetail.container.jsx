import { Layout, theme } from "antd";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetailsView from "./TaskDetailsView";

const TaskDetailsContainer = ({ taskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "1rem 1rem",
        background: colorBgContainer,
      }}
    >
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
        {taskDetails ? (
          <TaskDetailsView taskDetails={taskDetails} />
        ) : (
          <NotTaskSelected />
        )}
      </div>
    </Layout.Content>
  );
};

export default TaskDetailsContainer;
