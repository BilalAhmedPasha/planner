import { combineReducers } from "redux";
import userSettingsReducer from "./userSettings/userSettings.reducer";

export default combineReducers({
  userSettings: userSettingsReducer,
});
