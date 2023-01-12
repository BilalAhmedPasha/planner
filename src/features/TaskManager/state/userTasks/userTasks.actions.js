import { SUCCESS } from "../../../../constants/app.constants";
import {
  fetchTasksApi,
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
} from "../../../../services/userTasks.api";
import {
  FETCH_TASKS,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_SUCCESS,
  ADD_TASK,
  ADD_TASK_ERROR,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
} from "./userTasks.reducer";

export const fetchTasks = () => ({
  type: FETCH_TASKS,
});

export const fetchTasksSuccess = (payload) => ({
  type: FETCH_TASKS_SUCCESS,
  payload,
});

export const fetchTasksError = (error) => ({
  type: FETCH_TASKS_ERROR,
  payload: { error },
});

export const addTask = (payload) => ({
  type: ADD_TASK,
  payload,
});

export const addTaskSuccess = ({ response }) => ({
  type: ADD_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const addTaskFailure = (error) => ({
  type: ADD_TASK_ERROR,
  payload: { error },
});

export const editTask = (payload) => ({
  type: EDIT_TASK,
  payload,
});

export const editTaskSuccess = ({ response }) => ({
  type: EDIT_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const editTaskFailure = (error) => ({
  type: EDIT_TASK_ERROR,
  payload: { error },
});

export const deleteTask = (payload) => ({
  type: DELETE_TASK,
  payload,
});

export const deleteTaskSuccess = ({ response }) => ({
  type: DELETE_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: { error },
});

export const fetchTasksAction = (userId) => async (dispatch) => {
  dispatch(fetchTasks());
  try {
    const data = await fetchTasksApi(userId);
    const response = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return dispatch(
      fetchTasksSuccess({ data: response, count: response.length })
    );
  } catch (error) {
    return dispatch(fetchTasksError(error));
  }
};

export const addTaskAction = (userId, newTask) => async (dispatch) => {
  dispatch(addTask());
  try {
    const returnValue = await addTaskApi(userId, newTask);
    return dispatch(
      addTaskSuccess({
        response: { ...newTask, id: returnValue.id },
      })
    );
  } catch (error) {
    return dispatch(addTaskFailure(error));
  }
};

export const editTaskAction =
  (userId, modifiedTask, taskId) => async (dispatch) => {
    dispatch(editTask());
    try {
      await editTaskApi(userId, modifiedTask, taskId);
      return dispatch(
        editTaskSuccess({
          response: { ...modifiedTask, id: taskId },
        })
      );
    } catch (error) {
      return dispatch(editTaskFailure(error));
    }
  };

export const deleteTaskAction = (userId, currentTask) => async (dispatch) => {
  dispatch(deleteTask());
  try {
    await deleteTaskApi(userId, currentTask);
    return dispatch(
      deleteTaskSuccess({
        response: { id: currentTask.id },
      })
    );
  } catch (error) {
    return dispatch(deleteTaskFailure(error));
  }
};
