import { Typography } from "antd";

const NotTaskSelected = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography.Title level={5}>
        Select a task to view details
      </Typography.Title>
    </div>
  );
};

export default NotTaskSelected;
