import { Layout, Typography, theme, Button } from "antd";
import React from "react";
// import { useParams } from "react-router-dom";

const TaskManager = ({ title }) => {
  // const { tasksType, listName, tagName } = useParams();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout.Content
        style={{
          marginRight: "0.1rem",
          padding: "0rem 5rem",
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
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "0rem 5rem",
          background: colorBgContainer,
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {"Task details"}
        </Typography.Text>
      </Layout.Content>
    </>
  );
};
export default TaskManager;
