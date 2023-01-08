export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
export const FETCH_LISTS_ERROR = "FETCH_LISTS_ERROR";

const listNames = [
  {
    label: "List 1",
    color: "#D87C69",
    redirectUrl: "/list1",
  },
  {
    label: "List 2",
    color: "#96CD6C",
    redirectUrl: "/list2",
  },
];

export const INITIAL_STATE = {
  isLoadingLists: false,
  totalLists: 0,
  lists: [...listNames],
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
