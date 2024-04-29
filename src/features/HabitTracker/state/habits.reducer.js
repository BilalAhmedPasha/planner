import { combineReducers } from "redux";
import userHabitsReducer from "./userHabits/userHabits.reducer";

export default combineReducers({
  userHabits: userHabitsReducer,
});
