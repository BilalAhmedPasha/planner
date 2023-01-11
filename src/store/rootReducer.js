import { combineReducers } from "redux";
import globalConfigReducer from "./globalConfig/globalConfig.reducer";
import taskManagerReducer from "../features/TaskManager/state";

const reducerMap = {
  globalConfig: globalConfigReducer,
  taskManager: taskManagerReducer
};

export default combineReducers(reducerMap);
