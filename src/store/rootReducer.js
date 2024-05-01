import { combineReducers } from "redux";
import globalConfigReducer from "./globalConfig/globalConfig.reducer";
import taskManagerReducer from "../features/TaskManager/state";
import userSettingsReducer from "../features/AppLayout/state";
import habitsReducer from "../features/HabitTracker/state/habits.reducer";

const reducerMap = {
  globalConfig: globalConfigReducer,
  taskManager: taskManagerReducer,
  userAccount: userSettingsReducer,
  habits: habitsReducer
};

export default combineReducers(reducerMap);
