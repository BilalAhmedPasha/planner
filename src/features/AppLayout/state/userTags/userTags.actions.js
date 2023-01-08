import { SUCCESS } from "../../../../constants/app.constants";
import { fetchTagsApi, addTagApi } from "../../../../services/userTags.api";
import {
  ADD_TAG,
  ADD_TAG_ERROR,
  ADD_TAG_SUCCESS,
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

export const addTag = (payload) => ({
  type: ADD_TAG,
  payload,
});

export const addTagSuccess = ({ response }) => ({
  type: ADD_TAG_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const addTagFailure = (error) => ({
  type: ADD_TAG_ERROR,
  payload: { error },
});

export const fetchTagsAction = () => async (dispatch) => {
  dispatch(fetchTags());
  try {
    const data = await fetchTagsApi();
    const response = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return dispatch(
      fetchTagsSuccess({ data: response, count: response.length })
    );
  } catch (error) {
    return dispatch(fetchTagsError(error));
  }
};

export const addTagAction = (newTag) => async (dispatch) => {
  dispatch(addTag());
  try {
    const returnValue = await addTagApi(newTag);
    return dispatch(
      addTagSuccess({
        response: { ...newTag, id: returnValue.id },
      })
    );
  } catch (error) {
    return dispatch(addTagFailure(error));
  }
};
