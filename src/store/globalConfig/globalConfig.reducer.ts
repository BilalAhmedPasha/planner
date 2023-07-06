export const UPDATE_CONFIG = "UPDATE_CONFIG";

interface ConfigState {
  config: any;
  user: any;
  eventBus: any;
  settings: any;
}

interface UpdateConfigAction {
  type: typeof UPDATE_CONFIG;
  payload: Partial<ConfigState>;
}

const INITIAL_STATE: ConfigState = {
  config: {},
  user: {},
  eventBus: {},
  settings: {},
};

const reducer = (
  state: ConfigState = INITIAL_STATE,
  action: UpdateConfigAction
) => {
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
