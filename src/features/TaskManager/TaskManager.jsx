import { Layout, Typography, theme, Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import { listsSelector } from "./state/userLists/userLists.reducer";
import { tagsSelector } from "./state/userTags/userTags.reducer";

const TaskManager = ({ title, setCurrentTitle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  useEffect(() => {
    if (lists.length === 0) dispatch(fetchListsAction());
    if (tags.length === 0) dispatch(fetchTagsAction());
  }, [dispatch, lists, tags]);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Layout>
      <TaskNav messageApi={messageApi} setCurrentTitle={setCurrentTitle} />
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
          {"Task details"}
        </Typography.Text>
      </Layout.Content>
      {contextHolder}
    </Layout>
  );
};
export default TaskManager;
