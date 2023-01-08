export const UPDATE_CONFIG = 'UPDATE_CONFIG';

const INITIAL_STATE = {
  config: {},
  user: {},
  eventBus: {},
  settings: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CONFIG: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
