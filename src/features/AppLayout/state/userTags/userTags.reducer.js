export const FETCH_TAGS = "FETCH_TAGS";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";

export const ADD_TAG = "ADD_TAG";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_ERROR = "ADD_TAG_ERROR";

export const INITIAL_STATE = {
  isLoadingTags: false,
  totalTags: 0,
  tags: [],
  error: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TAGS: {
      return {
        ...state,
        isLoadingTags: true,
      };
    }

    case FETCH_TAGS_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
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
      return {
        ...state,
        isLoadingTags: true,
      };
    }

    case ADD_TAG_SUCCESS: {
      return {
        ...state,
        isLoadingTags: false,
        addTagSuccess: true,
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

    default: {
      return state;
    }
  }
};

export const tagsSelector = (state) => state.appLayout.userTags;

export default reducer;
