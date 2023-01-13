import { ADD_USER_SETTING, REMOVE_USER_SETTING } from "./userSettings.reducer";

export const addUserSetting = (payload) => ({
  type: ADD_USER_SETTING,
  payload,
});

export const removeUserSetting = (payload) => ({
  type: REMOVE_USER_SETTING,
  payload,
});

export const addUserSettingAction = (user) => (dispatch) => {
  dispatch(addUserSetting(user));
};

export const removeUserSettingAction = () => (dispatch) => {
  dispatch(removeUserSetting());
};
