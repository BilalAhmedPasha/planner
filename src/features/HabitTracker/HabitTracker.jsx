import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import HabitListContainer from "./HabitList/HabitList";
import { fetchListsAction } from "../TaskManager/state/userLists/userLists.actions";
import { fetchTagsAction } from "../TaskManager/state/userTags/userTags.actions";
import { fetchTasksAction } from "../TaskManager/state/userTasks/userTasks.actions";
import { fetchHabitsAction } from "./state/userHabits/userHabits.actions";
import HabitDetailContainer from "./HabitDetail/HabitDetail.container";

const HabitTracker = ({ user }) => {
  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);

  useEffect(() => {
    if (user && user.uid !== userSetting.id) {
      dispatch(fetchListsAction(user.uid));
      dispatch(fetchTagsAction(user.uid));
      dispatch(fetchTasksAction(user.uid));
      dispatch(fetchHabitsAction(user.uid));
    }
  }, [userSetting, dispatch, user]);

  const [selectedHabitDetail, setSelectedHabitDetail] = useState(null);

  const [isHabitDetailsDrawerCollapsed, setIsHabitDetailsDrawerCollapsed] =
    useState(true);

  useEffect(() => {
    selectedHabitDetail
      ? setIsHabitDetailsDrawerCollapsed(false)
      : setIsHabitDetailsDrawerCollapsed(true);
  }, [selectedHabitDetail]);

  return (
    <>
      <HabitListContainer
        user={user}
        selectedHabitDetail={selectedHabitDetail}
        setSelectedHabitDetail={setSelectedHabitDetail}
      />
      <HabitDetailContainer
        user={user}
        selectedHabitDetail={selectedHabitDetail}
        setSelectedHabitDetail={setSelectedHabitDetail}
        isHabitDetailsDrawerCollapsed={isHabitDetailsDrawerCollapsed}
        setIsHabitDetailsDrawerCollapsed={setIsHabitDetailsDrawerCollapsed}
      />
    </>
  );
};

export default HabitTracker;
