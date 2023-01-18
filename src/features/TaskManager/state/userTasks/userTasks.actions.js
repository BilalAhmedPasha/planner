import { SUCCESS } from "../../../../constants/app.constants";
import {
  fetchTasksApi,
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  completeTaskApi,
  wontDoTaskApi,
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
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_ERROR,
  WONT_DO_TASK,
  WONT_DO_TASK_SUCCESS,
  WONT_DO_TASK_ERROR,
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

export const completeTask = (payload) => ({
  type: COMPLETE_TASK,
  payload,
});

export const completeTaskSuccess = ({ response }) => ({
  type: COMPLETE_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const completeTaskFailure = (error) => ({
  type: COMPLETE_TASK_ERROR,
  payload: { error },
});

export const wontDoTask = (payload) => ({
  type: WONT_DO_TASK,
  payload,
});

export const wontDoTaskSuccess = ({ response }) => ({
  type: WONT_DO_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const wontDoTaskFailure = (error) => ({
  type: WONT_DO_TASK_ERROR,
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

export const completeTaskAction =
  (userId, taskDetails, isCompleted) => async (dispatch) => {
    dispatch(completeTask());
    try {
      await completeTaskApi(userId, taskDetails, isCompleted);
      return dispatch(
        completeTaskSuccess({
          response: { completedTaskId: taskDetails.id, isCompleted },
        })
      );
    } catch (error) {
      return dispatch(completeTaskFailure(error));
    }
  };

export const wontDoTaskAction =
  (userId, taskDetails, isWontDo) => async (dispatch) => {
    dispatch(wontDoTask());
    try {
      await wontDoTaskApi(userId, taskDetails, isWontDo);
      return dispatch(
        wontDoTaskSuccess({
          response: { wontDoTaskId: taskDetails.id, isWontDo },
        })
      );
    } catch (error) {
      return dispatch(wontDoTaskFailure(error));
    }
  };
