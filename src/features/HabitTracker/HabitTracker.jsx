import { Layout, Typography, theme } from "antd";
const { Title } = Typography;
const HabitTracker = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: "1.5rem 5rem",
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
  );
};

export default HabitTracker;
