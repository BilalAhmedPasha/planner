import { Layout, Typography, theme } from "antd";

const Calendar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
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
        {"Calendar"}
      </Typography.Text>
    </Layout.Content>
  );
};

export default Calendar;
