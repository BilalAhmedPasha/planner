import { SUCCESS } from "../../../../constants/app.constants";
import {
  addHabitApi,
  deleteHabitApi,
  editHabitApi,
  fetchHabitsApi,
  markHabitApi,
} from "../../../../services/userHabits.api";
import {
  ADD_HABIT,
  ADD_HABIT_ERROR,
  ADD_HABIT_SUCCESS,
  DELETE_HABIT,
  DELETE_HABIT_ERROR,
  DELETE_HABIT_SUCCESS,
  EDIT_HABIT,
  EDIT_HABIT_ERROR,
  EDIT_HABIT_SUCCESS,
  FETCH_HABITS,
  FETCH_HABITS_ERROR,
  FETCH_HABITS_SUCCESS,
  MARK_HABIT,
  MARK_HABIT_SUCCESS,
  MARK_HABIT_ERROR,
} from "./userHabits.reducer";

export const fetchHabits = () => ({
  type: FETCH_HABITS,
});

export const fetchHabitsSuccess = (payload) => ({
  type: FETCH_HABITS_SUCCESS,
  payload,
});

export const fetchHabitsError = (error) => ({
  type: FETCH_HABITS_ERROR,
  payload: { error },
});

export const addHabit = (payload) => ({
  type: ADD_HABIT,
  payload,
});

export const addHabitSuccess = ({ response }) => ({
  type: ADD_HABIT_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const addHabitFailure = (error) => ({
  type: ADD_HABIT_ERROR,
  payload: { error },
});

export const editHabit = (payload) => ({
  type: EDIT_HABIT,
  payload,
});

export const editHabitSuccess = ({ response }) => ({
  type: EDIT_HABIT_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const editHabitFailure = (error) => ({
  type: EDIT_HABIT_ERROR,
  payload: { error },
});

export const deleteHabit = (payload) => ({
  type: DELETE_HABIT,
  payload,
});

export const deleteHabitSuccess = ({ response }) => ({
  type: DELETE_HABIT_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const deleteHabitFailure = (error) => ({
  type: DELETE_HABIT_ERROR,
  payload: { error },
});

export const markHabit = ({ response }) => ({
  type: MARK_HABIT,
  payload: response,
});

export const markHabitSuccess = ({ response }) => ({
  type: MARK_HABIT_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const markHabitFailure = ({ response }) => ({
  type: MARK_HABIT_ERROR,
  payload: response,
});

export const fetchHabitsAction = (userId) => async (dispatch) => {
  dispatch(fetchHabits());
  try {
    const data = await fetchHabitsApi(userId);
    const response = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return dispatch(
      fetchHabitsSuccess({ data: response, count: response.length })
    );
  } catch (error) {
    return dispatch(fetchHabitsError(error));
  }
};

export const addHabitAction = (userId, newHabit) => async (dispatch) => {
  dispatch(addHabit());
  try {
    const returnValue = await addHabitApi(userId, newHabit);
    return dispatch(
      addHabitSuccess({
        response: { ...newHabit, id: returnValue.id },
      })
    );
  } catch (error) {
    return dispatch(addHabitFailure(error));
  }
};

export const editHabitAction =
  (userId, modifiedHabit, habitId) => async (dispatch) => {
    dispatch(editHabit());
    try {
      await editHabitApi(userId, modifiedHabit, habitId);
      return dispatch(
        editHabitSuccess({
          response: { ...modifiedHabit, id: habitId },
        })
      );
    } catch (error) {
      return dispatch(editHabitFailure(error));
    }
  };

export const deleteHabitAction =
  (userId, currentHabitId) => async (dispatch) => {
    dispatch(deleteHabit());
    try {
      await deleteHabitApi(userId, currentHabitId);
      return dispatch(
        deleteHabitSuccess({
          response: { id: currentHabitId },
        })
      );
    } catch (error) {
      return dispatch(deleteHabitFailure(error));
    }
  };

export const markHabitAction =
  (userId, currentHabitId, date, value) => async (dispatch) => {
    dispatch(
      markHabit({
        response: { id: currentHabitId, date, value },
      })
    );
    try {
      await markHabitApi(userId, currentHabitId, date, value);
      return dispatch(
        markHabitSuccess({
          response: { id: currentHabitId, date, value },
        })
      );
    } catch (error) {
      return dispatch(
        markHabitFailure({
          response: { id: currentHabitId, date, error },
        })
      );
    }
  };
