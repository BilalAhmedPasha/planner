import { combineReducers } from "redux";
import userListsReducer from "./userLists/userLists.reducer";
import userTagsReducer from "./userTags/userTags.reducer";
import userTasksReducer from "./userTasks/userTasks.reducer";

export default combineReducers({
  userLists: userListsReducer,
  userTags: userTagsReducer,
  userTasks: userTasksReducer
});
