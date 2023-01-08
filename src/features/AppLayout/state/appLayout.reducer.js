import { combineReducers } from "redux";
import userListsReducer from "../state/userLists/userLists.reducer";
import userTagsReducer from "../state/userTags/userTags.reducer";

export default combineReducers({
  userLists: userListsReducer,
  userTags: userTagsReducer,
});
