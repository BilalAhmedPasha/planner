export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
export const FETCH_LISTS_ERROR = "FETCH_LISTS_ERROR";

export const INITIAL_STATE = {
  isLoadingLists: false,
  totalLists: 0,
  lists: [],
  error: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS: {
      return {
        ...state,
        isLoadingLists: true,
      };
    }

    case FETCH_LISTS_SUCCESS: {
      return {
        ...state,
        isLoadingLists: false,
        lists: [...action.payload.data],
      };
    }

    case FETCH_LISTS_ERROR: {
      return {
        ...state,
        isLoadingLists: false,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
};

export const listsSelector = (state) => state.appLayout.userLists;

export default reducer;
