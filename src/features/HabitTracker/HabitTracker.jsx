import { Layout, Typography, theme } from "antd";

const HabitTracker = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout.Content
        style={{
          marginRight: "0.1rem",
          padding: "1rem 3rem",
          background: colorBgContainer,
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {"Habits"}
        </Typography.Text>
      </Layout.Content>
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "1rem 3rem",
          background: colorBgContainer,
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {"Habit details"}
        </Typography.Text>
      </Layout.Content>
    </>
  );
};

export default HabitTracker;
