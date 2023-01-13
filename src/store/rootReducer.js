import { combineReducers } from "redux";
import globalConfigReducer from "./globalConfig/globalConfig.reducer";
import taskManagerReducer from "../features/TaskManager/state";
import userSettingsReducer from "../features/AppLayout/state";

const reducerMap = {
  globalConfig: globalConfigReducer,
  taskManager: taskManagerReducer,
  userAccount: userSettingsReducer,
};

export default combineReducers(reducerMap);
