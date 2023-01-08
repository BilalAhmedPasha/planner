import { fetchTagsApi } from "../../../../services/userTags.api";
import {
  FETCH_TAGS,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS,
} from "./userTags.reducer";

export const fetchTags = () => ({
  type: FETCH_TAGS,
});

export const fetchTagsSuccess = (payload) => ({
  type: FETCH_TAGS_SUCCESS,
  payload,
});

export const fetchTagsError = (error) => ({
  type: FETCH_TAGS_ERROR,
  payload: { error },
});

export const tagsAction = () => async (dispatch) => {
  dispatch(fetchTags());
  try {
    const data = await fetchTagsApi();
    const response = { data, total: data.length };
    return dispatch(fetchTagsSuccess(response));
  } catch (error) {
    return dispatch(fetchTagsError(error));
  }
};
