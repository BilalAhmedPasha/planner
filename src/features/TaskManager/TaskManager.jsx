import { Layout, Typography, theme, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import TaskListContainer from "./TaskList";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { fetchTasksAction } from "./state/userTasks/userTasks.actions";
import { tasksSelector } from "./state/userTasks/userTasks.reducer";
import Loading from "../../components/Loading";
import { LOADER_SIZE } from "../../constants/app.constants";

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
      dispatch(fetchTasksAction(user.uid));
    }
  }, [userSetting, dispatch, user.uid]);

  const [messageApi, contextHolder] = message.useMessage();
  const { isLoadingTasks } = useSelector(tasksSelector);
  const [selectedCardId, setSelectedCardId] = useState("");
  return (
    <Layout>
      <TaskNav
        user={user}
        messageApi={messageApi}
        setCurrentTitle={setCurrentTitle}
      />
      <TaskListContainer
        user={user}
        title={title}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
      />
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "1rem 3rem",
          background: colorBgContainer,
        }}
      >
        <Spin spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
          <Typography.Text
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            {"Task details"}
          </Typography.Text>
        </Spin>
      </Layout.Content>
      {contextHolder}
    </Layout>
  );
};
export default React.memo(TaskManager);
