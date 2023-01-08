import { combineReducers } from "redux";
import globalConfigReducer from "./globalConfig/globalConfig.reducer";
import appLayoutReducer from "../features/AppLayout/state";

const reducerMap = {
  globalConfig: globalConfigReducer,
  appLayout: appLayoutReducer
};

export default combineReducers(reducerMap);
