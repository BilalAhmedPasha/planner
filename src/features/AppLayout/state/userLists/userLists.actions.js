import { fetchListsApi } from "../../../../services/appLayout.api";
import {
  FETCH_LISTS,
  FETCH_LISTS_ERROR,
  FETCH_LISTS_SUCCESS,
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

export const listsAction = () => async (dispatch) => {
  dispatch(fetchLists());
  try {
    const { data } = await fetchListsApi();
    const response = { data, total: data.length };
    return dispatch(fetchListsSuccess(response));
  } catch (error) {
    return dispatch(fetchListsError(error));
  }
};
