import { Layout, Typography, theme, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import TaskList from "./TaskList";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";

const TaskManager = ({ user, title, setCurrentTitle }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);
  useEffect(() => {
    if (user.uid !== userSetting.id) {
      dispatch(fetchListsAction(user.uid));
      dispatch(fetchTagsAction(user.uid));
    }
  }, [userSetting, dispatch, user.uid]);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Layout>
      <TaskNav
        user={user}
        messageApi={messageApi}
        setCurrentTitle={setCurrentTitle}
      />
      <TaskList user={user} title={title} />
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
export default React.memo(TaskManager);
