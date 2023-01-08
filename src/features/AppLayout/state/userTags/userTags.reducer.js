export const FETCH_TAGS = "FETCH_TAGS";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR";

const tagNames = [
  {
    label: "Tag 1",
    color: "#6CBBCD",
    redirectUrl: "/tag1",
  },
  {
    label: "Tag 2",
    color: "#966CCD",
    redirectUrl: "/tag2",
  },
];

export const INITIAL_STATE = {
  isLoadingTags: false,
  totalTags: 0,
  tags: [...tagNames],
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

    default: {
      return state;
    }
  }
};

export const tagsSelector = (state) => state.appLayout.userTags;

export default reducer;
