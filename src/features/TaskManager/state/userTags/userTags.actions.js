import { SUCCESS } from "../../../../constants/app.constants";
import {
  fetchTagsApi,
  addTagApi,
  deleteTagApi,
  editTagApi,
} from "../../../../services/userTags.api";
import {
  FETCH_TAGS,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS,
  ADD_TAG,
  ADD_TAG_ERROR,
  ADD_TAG_SUCCESS,
  DELETE_TAG,
  DELETE_TAG_ERROR,
  DELETE_TAG_SUCCESS,
  EDIT_TAG,
  EDIT_TAG_SUCCESS,
  EDIT_TAG_ERROR,
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

export const editTag = (payload) => ({
  type: EDIT_TAG,
  payload,
});

export const editTagSuccess = ({ response }) => ({
  type: EDIT_TAG_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const editTagFailure = (error) => ({
  type: EDIT_TAG_ERROR,
  payload: { error },
});

export const deleteTag = (payload) => ({
  type: DELETE_TAG,
  payload,
});

export const deleteTagSuccess = ({ response }) => ({
  type: DELETE_TAG_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const deleteTagFailure = (error) => ({
  type: DELETE_TAG_ERROR,
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

export const editTagAction = (modifiedTag, tagId) => async (dispatch) => {
  dispatch(editTag());
  try {
    await editTagApi(modifiedTag, tagId);
    return dispatch(
      editTagSuccess({
        response: { ...modifiedTag, id: tagId },
      })
    );
  } catch (error) {
    return dispatch(editTagFailure(error));
  }
};

export const deleteTagAction = (currentTag) => async (dispatch) => {
  dispatch(deleteTag());
  try {
    await deleteTagApi(currentTag);
    return dispatch(
      deleteTagSuccess({
        response: { id: currentTag.id },
      })
    );
  } catch (error) {
    return dispatch(deleteTagFailure(error));
  }
};
