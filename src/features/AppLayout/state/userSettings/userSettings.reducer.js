export const ADD_USER_SETTING = "ADD_USER_SETTING";
export const REMOVE_USER_SETTING = "REMOVE_USER_SETTING";

export const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER_SETTING: {
      return action.payload;
    }

    case REMOVE_USER_SETTING: {
      return {};
    }

    default: {
      return state;
    }
  }
};

export const userSelector = (state) => state.userAccount.userSettings;

export default reducer;
