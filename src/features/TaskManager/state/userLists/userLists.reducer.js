export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
export const FETCH_LISTS_ERROR = "FETCH_LISTS_ERROR";

export const ADD_LIST = "ADD_LIST";
export const ADD_LIST_SUCCESS = "ADD_LIST_SUCCESS";
export const ADD_LIST_ERROR = "ADD_LIST_ERROR";

export const EDIT_LIST = "EDIT_LIST";
export const EDIT_LIST_SUCCESS = "EDIT_LIST_SUCCESS";
export const EDIT_LIST_ERROR = "EDIT_LIST_ERROR";

export const DELETE_LIST = "DELETE_LIST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_ERROR = "DELETE_LIST_ERROR";

export const INITIAL_STATE = {
  isLoadingLists: false,
  totalLists: 0,
  lists: [],
  error: undefined,
};

const fetchLoadingState = ({ state }) => {
  return {
    ...state,
    isLoadingLists: true,
    error: undefined,
  };
};

const modifyListsAfterEdit = ({ currentLists, editedList }) => {
  return currentLists.map((each) =>
    each.id === editedList.id ? editedList : each
  );
};

const modifyListsAfterDelete = ({ currentLists, deletedListId }) => {
  return currentLists.filter((each) => {
    return each.id !== deletedListId;
  });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LISTS: {
      return fetchLoadingState({ state });
    }

    case FETCH_LISTS_SUCCESS: {
      return {
        ...state,
        isLoadingLists: false,
        totalLists: action.payload.data.length,
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

    case ADD_LIST: {
      return fetchLoadingState({ state });
    }

    case ADD_LIST_SUCCESS: {
      return {
        ...state,
        isLoadingLists: false,
        addListSuccess: true,
        totalLists: state.totalLists + 1,
        lists: [...state.lists, action.payload],
      };
    }

    case ADD_LIST_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        addListSuccess: false,
        isLoadingLists: false,
      };
    }

    case EDIT_LIST: {
      return fetchLoadingState({ state });
    }

    case EDIT_LIST_SUCCESS: {
      return {
        ...state,
        isLoadingLists: false,
        editListSuccess: true,
        lists: modifyListsAfterEdit({
          currentLists: state.lists,
          editedList: action.payload,
        }),
      };
    }

    case EDIT_LIST_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        editListSuccess: false,
        isLoadingLists: false,
      };
    }

    case DELETE_LIST: {
      return fetchLoadingState({ state });
    }

    case DELETE_LIST_SUCCESS: {
      return {
        ...state,
        isLoadingLists: false,
        deleteListSuccess: true,
        totalLists: state.totalLists > 0 ? state.totalLists - 1 : 0,
        lists: modifyListsAfterDelete({
          currentLists: state.lists,
          deletedListId: action.payload,
        }),
      };
    }

    case DELETE_LIST_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        deleteListSuccess: false,
        isLoadingLists: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const listsSelector = (state) => state.taskManager.userLists;

export default reducer;
