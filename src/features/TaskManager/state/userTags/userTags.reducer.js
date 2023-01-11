export const FETCH_TAGS = "FETCH_TAGS";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";

export const ADD_TAG = "ADD_TAG";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_ERROR = "ADD_TAG_ERROR";

export const EDIT_TAG = "EDIT_TAG";
export const EDIT_TAG_SUCCESS = "EDIT_TAG_SUCCESS";
export const EDIT_TAG_ERROR = "EDIT_TAG_ERROR";

export const DELETE_TAG = "DELETE_TAG";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_ERROR = "DELETE_TAG_ERROR";

export const INITIAL_STATE = {
  isLoadingTags: false,
  totalTags: 0,
  tags: [],
  error: undefined,
};

const fetchLoadingState = ({ state }) => {
  return {
    ...state,
    isLoadingTags: true,
    error: undefined,
  };
};

const modifyTagsAfterEdit = ({ currentTags, editedTag }) => {
  return currentTags.map((each) =>
    each.id === editedTag.id ? editedTag : each
  );
};

const modifyTagsAfterDelete = ({ currentTags, deletedTag }) => {
  return currentTags.filter((each) => {
    return each.id !== deletedTag.id;
  });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TAGS: {
      return fetchLoadingState({ state });
    }

    case FETCH_TAGS_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
        totalTags: action.payload.data.length,
        tags: [...action.payload.data],
      };
    }

    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        isLoadingTags: false,
        error: action.payload.error,
      };
    }

    case ADD_TAG: {
      return fetchLoadingState({ state });
    }

    case ADD_TAG_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
        addTagSuccess: true,
        totalTags: state.totalTags + 1,
        tags: [...state.tags, action.payload],
      };
    }

    case ADD_TAG_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        addTagSuccess: false,
        isLoadingTags: false,
      };
    }

    case EDIT_TAG: {
      return fetchLoadingState({ state });
    }

    case EDIT_TAG_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
        editTagSuccess: true,
        tags: modifyTagsAfterEdit({
          currentTags: state.tags,
          editedTag: action.payload,
        }),
      };
    }

    case EDIT_TAG_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        editTagSuccess: false,
        isLoadingTags: false,
      };
    }

    case DELETE_TAG: {
      return fetchLoadingState({ state });
    }

    case DELETE_TAG_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
        deleteTagSuccess: true,
        totalTags: state.totalTags > 0 ? state.totalTags - 1 : 0,
        tags: modifyTagsAfterDelete({
          currentTags: state.tags,
          deletedTag: action.payload,
        }),
      };
    }

    case DELETE_TAG_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        deleteTagSuccess: false,
        isLoadingTags: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const tagsSelector = (state) => state.taskManager.userTags;

export default reducer;
