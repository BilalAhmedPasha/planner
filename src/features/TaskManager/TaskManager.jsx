import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskNav from "./TaskNavigation";
import { fetchListsAction } from "./state/userLists/userLists.actions";
import { fetchTagsAction } from "./state/userTags/userTags.actions";
import TaskListContainer from "./TaskListView/TaskList";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { fetchTasksAction } from "./state/userTasks/userTasks.actions";
import TaskDetailsContainer from "./TaskDetailView";

const TaskManager = ({ user }) => {
  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);

  useEffect(() => {
    if (user && user.uid !== userSetting.id) {
      dispatch(fetchListsAction(user.uid));
      dispatch(fetchTagsAction(user.uid));
      dispatch(fetchTasksAction(user.uid));
    }
  }, [userSetting, dispatch, user]);

  const [messageApi, contextHolder] = message.useMessage();
  const [currentSelectedTaskSection, setCurrentSelectedTaskSection] =
    useState();

  const [selectedTaskDetails, setSelectedTaskDetails] = useState([]);

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isNavDrawerCollapsed, setIsNavDrawerCollapsed] = useState(true);
  const [isTaskDetailsDrawerCollapsed, setIsTaskDetailsDrawerCollapsed] =
    useState(true);

  useEffect(() => {
    selectedTaskDetails.length === 1
      ? setIsTaskDetailsDrawerCollapsed(false)
      : setIsTaskDetailsDrawerCollapsed(true);
  }, [selectedTaskDetails]);

  return (
    <>
      <TaskNav
        user={user}
        messageApi={messageApi}
        currentSelectedTaskSection={currentSelectedTaskSection}
        setCurrentSelectedTaskSection={setCurrentSelectedTaskSection}
        setSelectedTaskDetails={setSelectedTaskDetails}
        isMenuCollapsed={isMenuCollapsed}
        isNavDrawerCollapsed={isNavDrawerCollapsed}
        setIsNavDrawerCollapsed={setIsNavDrawerCollapsed}
      />
      <TaskListContainer
        user={user}
        currentSection={currentSelectedTaskSection}
        selectedTaskDetails={selectedTaskDetails}
        setSelectedTaskDetails={setSelectedTaskDetails}
        isMenuCollapsed={isMenuCollapsed}
        setIsMenuCollapsed={setIsMenuCollapsed}
        isNavDrawerCollapsed={isNavDrawerCollapsed}
        setIsNavDrawerCollapsed={setIsNavDrawerCollapsed}
        setIsTaskDetailsDrawerCollapsed={setIsTaskDetailsDrawerCollapsed}
      />
      <TaskDetailsContainer
        user={user}
        selectedTaskDetails={selectedTaskDetails}
        setSelectedTaskDetails={setSelectedTaskDetails}
        isTaskDetailsDrawerCollapsed={isTaskDetailsDrawerCollapsed}
        setIsTaskDetailsDrawerCollapsed={setIsTaskDetailsDrawerCollapsed}
      />
      {contextHolder}
    </>
  );
};
export default React.memo(TaskManager);
