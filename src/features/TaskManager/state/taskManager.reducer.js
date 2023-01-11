import { combineReducers } from "redux";
import userListsReducer from "./userLists/userLists.reducer";
import userTagsReducer from "./userTags/userTags.reducer";

export default combineReducers({
  userLists: userListsReducer,
  userTags: userTagsReducer,
});
