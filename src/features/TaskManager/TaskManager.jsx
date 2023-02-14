import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskNav from "./TaskNav";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import TaskListContainer from "./TaskList";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { fetchTasksAction } from "./state/userTasks/userTasks.actions";
import TaskDetailsContainer from "./TaskDetail";

const TaskManager = ({ user }) => {
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
  const [selectedCardId, setSelectedCardId] = useState("");
  const [currentSelectedTaskSection, setCurrentSelectedTaskSection] =
    useState();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  return (
    <>
      <TaskNav
        user={user}
        messageApi={messageApi}
        currentSelectedTaskSection={currentSelectedTaskSection}
        setCurrentSelectedTaskSection={setCurrentSelectedTaskSection}
        setSelectedCardId={setSelectedCardId}
        collapsed={isMenuCollapsed}
        setSelectedTaskDetails={setSelectedTaskDetails}
      />
      <TaskListContainer
        user={user}
        currentSection={currentSelectedTaskSection}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        isMenuCollapsed={isMenuCollapsed}
        setIsMenuCollapsed={setIsMenuCollapsed}
        setSelectedTaskDetails={setSelectedTaskDetails}
      />
      <TaskDetailsContainer user={user} taskDetails={selectedTaskDetails} />
      {contextHolder}
    </>
  );
};
export default React.memo(TaskManager);
