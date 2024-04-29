import { Layout, Typography, theme } from "antd";
import HabitList from "./HabitList/HabitList";
import HabitCalendar from "./HabitCalendar/HabitCalendar";

const HabitTracker = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout.Content
        style={{
          marginRight: "0.1rem",
          padding: "0.25rem 0.75rem",
          background: colorBgContainer,
          height: "100vh",
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
        <HabitList />
      </Layout.Content>
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "0.25rem 0.75rem",
          background: colorBgContainer,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <HabitCalendar />
      </Layout.Content>
    </>
  );
};

export default HabitTracker;
