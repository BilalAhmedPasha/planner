import { Button, Layout, theme, Typography } from "antd";

const TaskList = ({ title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        <Button type="primary">Add Task</Button>
      </div>
    </Layout.Content>
  );
};

export default TaskList;
