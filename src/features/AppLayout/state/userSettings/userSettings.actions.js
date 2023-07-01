import {
  ADD_USER_SETTING,
  UPDATE_USER_SETTING,
  REMOVE_USER_SETTING,
} from "./userSettings.reducer";

export const addUserSetting = (payload) => ({
  type: ADD_USER_SETTING,
  payload,
});

export const updateUserSetting = (payload) => ({
  type: UPDATE_USER_SETTING,
  payload,
});

export const removeUserSetting = (payload) => ({
  type: REMOVE_USER_SETTING,
  payload,
});

export const addUserSettingAction = (user) => (dispatch) => {
  dispatch(addUserSetting(user));
};

export const updateUserSettingAction = (user) => (dispatch) => {
  dispatch(updateUserSetting(user));
};

export const removeUserSettingAction = () => (dispatch) => {
  dispatch(removeUserSetting());
};
