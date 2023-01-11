import { SUCCESS } from "../../../../constants/app.constants";
import {
  fetchListsApi,
  addListApi,
  deleteListApi,
  editListApi,
} from "../../../../services/userLists.api";
import {
  FETCH_LISTS,
  FETCH_LISTS_ERROR,
  FETCH_LISTS_SUCCESS,
  ADD_LIST,
  ADD_LIST_ERROR,
  ADD_LIST_SUCCESS,
  DELETE_LIST,
  DELETE_LIST_ERROR,
  DELETE_LIST_SUCCESS,
  EDIT_LIST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_ERROR,
} from "./userLists.reducer";


export const fetchLists = () => ({
  type: FETCH_LISTS,
});

export const fetchListsSuccess = (payload) => ({
  type: FETCH_LISTS_SUCCESS,
  payload,
});

export const fetchListsError = (error) => ({
  type: FETCH_LISTS_ERROR,
  payload: { error },
});

export const addList = (payload) => ({
  type: ADD_LIST,
  payload,
});

export const addListSuccess = ({ response }) => ({
  type: ADD_LIST_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const addListFailure = (error) => ({
  type: ADD_LIST_ERROR,
  payload: { error },
});

export const editList = (payload) => ({
  type: EDIT_LIST,
  payload,
});

export const editListSuccess = ({ response }) => ({
  type: EDIT_LIST_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const editListFailure = (error) => ({
  type: EDIT_LIST_ERROR,
  payload: { error },
});

export const deleteList = (payload) => ({
  type: DELETE_LIST,
  payload,
});

export const deleteListSuccess = ({ response }) => ({
  type: DELETE_LIST_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const deleteListFailure = (error) => ({
  type: DELETE_LIST_ERROR,
  payload: { error },
});


export const fetchListsAction = () => async (dispatch) => {
  dispatch(fetchLists());
  try {
    const data = await fetchListsApi();
    const response = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return dispatch(
      fetchListsSuccess({ data: response, count: response.length })
    );
  } catch (error) {
    return dispatch(fetchListsError(error));
  }
};

export const addListAction = (newList) => async (dispatch) => {
  dispatch(addList());
  try {
    const returnValue = await addListApi(newList);
    return dispatch(
      addListSuccess({
        response: { ...newList, id: returnValue.id },
      })
    );
  } catch (error) {
    return dispatch(addListFailure(error));
  }
};

export const editListAction = (modifiedList, listId) => async (dispatch) => {
  dispatch(editList());
  try {
    await editListApi(modifiedList, listId);
    return dispatch(
      editListSuccess({
        response: { ...modifiedList, id: listId },
      })
    );
  } catch (error) {
    return dispatch(editListFailure(error));
  }
};

export const deleteListAction = (currentList) => async (dispatch) => {
  dispatch(deleteList());
  try {
    await deleteListApi(currentList);
    return dispatch(
      deleteListSuccess({
        response: { id: currentList.id },
      })
    );
  } catch (error) {
    return dispatch(deleteListFailure(error));
  }
};
