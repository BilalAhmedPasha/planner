import { Layout, Typography, theme } from "antd";
const { Title } = Typography;
const HabitTracker = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        margin: 5,
        padding: 24,
        background: colorBgContainer,
      }}
    >
      <Title level={2}>Habits</Title>
    </Layout.Content>
  );
};

export default HabitTracker;
