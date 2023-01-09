import { Layout, Typography, theme } from "antd";
const { Title } = Typography;

const Calendar = () => {
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
      <Title level={2}>Calendar</Title>
    </Layout.Content>
  );
};

export default Calendar;
