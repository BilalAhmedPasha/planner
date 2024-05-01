import { SUCCESS } from "../../../../constants/app.constants";
import {
  fetchTasksApi,
  addTaskApi,
  softDeleteTaskApi,
  editTaskApi,
  updateRepeatingTaskApi,
  completeTaskApi,
  wontDoTaskApi,
  hardDeleteTaskApi,
  restoreTaskApi,
  hardDeleteSingleTaskApi,
  hardDeleteListTaskApi,
  deleteTaskTagApi,
  softDeleteMultipleTaskApi,
  hardDeleteMultipleTaskApi,
  softRestoreMultipleTaskApi,
} from "../../../../services/userTasks.api";
import {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  SOFT_DELETE_TASK,
  SOFT_DELETE_TASK_SUCCESS,
  SOFT_DELETE_TASK_ERROR,
  HARD_DELETE_SINGLE_TASK,
  HARD_DELETE_SINGLE_TASK_SUCCESS,
  HARD_DELETE_SINGLE_TASK_ERROR,
  RESTORE_TASK,
  RESTORE_TASK_SUCCESS,
  RESTORE_TASK_ERROR,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  UPDATE_REPEATING_TASK,
  UPDATE_REPEATING_TASK_SUCCESS,
  UPDATE_REPEATING_TASK_ERROR,
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  COMPLETE_TASK_ERROR,
  WONT_DO_TASK,
  WONT_DO_TASK_SUCCESS,
  WONT_DO_TASK_ERROR,
  HARD_DELETE_TASK,
  HARD_DELETE_TASK_SUCCESS,
  HARD_DELETE_TASK_ERROR,
  HARD_DELETE_LIST_TASK,
  HARD_DELETE_LIST_TASK_SUCCESS,
  HARD_DELETE_LIST_TASK_ERROR,
  DELETE_TASK_TAG,
  DELETE_TASK_TAG_SUCCESS,
  DELETE_TASK_TAG_ERROR,
  SOFT_DELETE_MULTIPLE_TASK,
  SOFT_DELETE_MULTIPLE_TASK_SUCCESS,
  SOFT_DELETE_MULTIPLE_TASK_ERROR,
  SOFT_RESTORE_MULTIPLE_TASK,
  SOFT_RESTORE_MULTIPLE_TASK_SUCCESS,
  SOFT_RESTORE_MULTIPLE_TASK_ERROR,
  HARD_DELETE_MULTIPLE_TASK,
  HARD_DELETE_MULTIPLE_TASK_SUCCESS,
  HARD_DELETE_MULTIPLE_TASK_ERROR,
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

export const updateRepeatingTask = (payload) => ({
  type: UPDATE_REPEATING_TASK,
  payload,
});

export const updateRepeatingTaskSuccess = ({ response }) => ({
  type: UPDATE_REPEATING_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const updateRepeatingTaskFailure = (error) => ({
  type: UPDATE_REPEATING_TASK_ERROR,
  payload: { error },
});

export const softDeleteTask = (payload) => ({
  type: SOFT_DELETE_TASK,
  payload,
});

export const softDeleteTaskSuccess = ({ response }) => ({
  type: SOFT_DELETE_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const softDeleteTaskFailure = (error) => ({
  type: SOFT_DELETE_TASK_ERROR,
  payload: { error },
});

export const hardDeleteSingleTask = (payload) => ({
  type: HARD_DELETE_SINGLE_TASK,
  payload,
});

export const hardDeleteSingleTaskSuccess = ({ response }) => ({
  type: HARD_DELETE_SINGLE_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const hardDeleteSingleTaskFailure = (error) => ({
  type: HARD_DELETE_SINGLE_TASK_ERROR,
  payload: { error },
});

export const restoreTask = (payload) => ({
  type: RESTORE_TASK,
  payload,
});

export const restoreTaskSuccess = ({ response }) => ({
  type: RESTORE_TASK_SUCCESS,
  payload: response,
  success: SUCCESS,
});

export const restoreTaskFailure = (error) => ({
  type: RESTORE_TASK_ERROR,
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

export const hardDeleteTask = (payload) => ({
  type: HARD_DELETE_TASK,
  payload,
});

export const hardDeleteTaskSuccess = () => ({
  type: HARD_DELETE_TASK_SUCCESS,
  success: SUCCESS,
});

export const hardDeleteTaskFailure = (error) => ({
  type: HARD_DELETE_TASK_ERROR,
  payload: { error },
});

export const hardDeleteListTask = (payload) => ({
  type: HARD_DELETE_LIST_TASK,
  payload,
});

export const hardDeleteListTaskSuccess = (payload) => ({
  type: HARD_DELETE_LIST_TASK_SUCCESS,
  payload: payload,
  success: SUCCESS,
});

export const hardDeleteListTaskFailure = (error) => ({
  type: HARD_DELETE_LIST_TASK_ERROR,
  payload: { error },
});

export const deleteTaskTag = (payload) => ({
  type: DELETE_TASK_TAG,
  payload,
});

export const deleteTaskTagSuccess = (payload) => ({
  type: DELETE_TASK_TAG_SUCCESS,
  payload: payload,
  success: SUCCESS,
});

export const deleteTaskTagFailure = (error) => ({
  type: DELETE_TASK_TAG_ERROR,
  payload: { error },
});

export const softDeleteMultipleTask = (payload) => ({
  type: SOFT_DELETE_MULTIPLE_TASK,
  payload,
});

export const softDeleteMultipleTaskSuccess = (payload) => ({
  type: SOFT_DELETE_MULTIPLE_TASK_SUCCESS,
  payload: payload,
  success: SUCCESS,
});

export const softDeleteMultipleTaskFailure = (error) => ({
  type: SOFT_DELETE_MULTIPLE_TASK_ERROR,
  payload: { error },
});

export const softRestoreMultipleTask = (payload) => ({
  type: SOFT_RESTORE_MULTIPLE_TASK,
  payload,
});

export const softRestoreMultipleTaskSuccess = (payload) => ({
  type: SOFT_RESTORE_MULTIPLE_TASK_SUCCESS,
  payload: payload,
  success: SUCCESS,
});

export const softRestoreMultipleTaskFailure = (error) => ({
  type: SOFT_RESTORE_MULTIPLE_TASK_ERROR,
  payload: { error },
});

export const hardDeleteMultipleTask = (payload) => ({
  type: HARD_DELETE_MULTIPLE_TASK,
  payload,
});

export const hardDeleteMultipleTaskSuccess = (payload) => ({
  type: HARD_DELETE_MULTIPLE_TASK_SUCCESS,
  payload: payload,
  success: SUCCESS,
});

export const hardDeleteMultipleTaskFailure = (error) => ({
  type: HARD_DELETE_MULTIPLE_TASK_ERROR,
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

export const updateRepeatingTaskAction =
  (userId,referenceTaskId, excludeDate) => async (dispatch) => {
    dispatch(updateRepeatingTask());
    try {
      await updateRepeatingTaskApi(userId, referenceTaskId, excludeDate);
      return dispatch(
        updateRepeatingTaskSuccess({
          response: { id: referenceTaskId, excludeDate: excludeDate },
        })
      );
    } catch (error) {
      return dispatch(updateRepeatingTaskFailure(error));
    }
  };


export const softDeleteTaskAction =
  (userId, currentTask) => async (dispatch) => {
    dispatch(softDeleteTask());
    try {
      await softDeleteTaskApi(userId, currentTask);
      return dispatch(
        softDeleteTaskSuccess({
          response: { id: currentTask.id },
        })
      );
    } catch (error) {
      return dispatch(softDeleteTaskFailure(error));
    }
  };

export const restoreTaskAction = (userId, currentTask) => async (dispatch) => {
  dispatch(restoreTask());
  try {
    await restoreTaskApi(userId, currentTask);
    return dispatch(
      restoreTaskSuccess({
        response: { id: currentTask.id },
      })
    );
  } catch (error) {
    return dispatch(restoreTaskFailure(error));
  }
};

export const hardDeleteSingleTaskAction =
  (userId, currentTask) => async (dispatch) => {
    dispatch(hardDeleteSingleTask());
    try {
      await hardDeleteSingleTaskApi(userId, currentTask);
      return dispatch(
        hardDeleteSingleTaskSuccess({
          response: { id: currentTask.id },
        })
      );
    } catch (error) {
      return dispatch(hardDeleteSingleTaskFailure(error));
    }
  };

export const completeTaskAction =
  (
    userId,
    taskDetails,
    isCompleted,
    markedTime,
    updatedTaskDate,
    shouldCreateNewTask
  ) =>
  async (dispatch) => {
    dispatch(completeTask());
    try {
      const newTask = await completeTaskApi(
        userId,
        taskDetails,
        isCompleted,
        markedTime,
        updatedTaskDate,
        shouldCreateNewTask
      );
      return dispatch(
        completeTaskSuccess({
          response: {
            taskDetails: taskDetails,
            completedTaskId: taskDetails.id,
            isCompleted,
            markedTime,
            updatedTaskDate,
            newTaskId: newTask?.id,
            shouldCreateNewTask,
          },
        })
      );
    } catch (error) {
      return dispatch(completeTaskFailure(error));
    }
  };

export const wontDoTaskAction =
  (
    userId,
    taskDetails,
    isWontDo,
    markedTime,
    updatedTaskDate,
    shouldCreateNewTask
  ) =>
  async (dispatch) => {
    dispatch(wontDoTask());
    try {
      const newTask = await wontDoTaskApi(
        userId,
        taskDetails,
        isWontDo,
        markedTime,
        updatedTaskDate,
        shouldCreateNewTask
      );
      return dispatch(
        wontDoTaskSuccess({
          response: {
            taskDetails: taskDetails,
            wontDoTaskId: taskDetails.id,
            isWontDo,
            markedTime,
            updatedTaskDate,
            newTaskId: newTask?.id,
            shouldCreateNewTask,
          },
        })
      );
    } catch (error) {
      return dispatch(wontDoTaskFailure(error));
    }
  };

export const hardDeleteTaskAction = (userId) => async (dispatch) => {
  dispatch(hardDeleteTask());
  try {
    await hardDeleteTaskApi(userId);
    return dispatch(hardDeleteTaskSuccess());
  } catch (error) {
    return dispatch(hardDeleteTaskFailure(error));
  }
};

export const hardDeleteListTaskAction =
  (userId, currentList) => async (dispatch) => {
    dispatch(hardDeleteListTask());
    try {
      await hardDeleteListTaskApi(userId, currentList);
      return dispatch(hardDeleteListTaskSuccess(currentList.id));
    } catch (error) {
      return dispatch(hardDeleteListTaskFailure(error));
    }
  };

export const deleteTaskTagAction = (userId, currentTag) => async (dispatch) => {
  dispatch(deleteTaskTag());
  try {
    await deleteTaskTagApi(userId, currentTag);
    return dispatch(deleteTaskTagSuccess(currentTag.id));
  } catch (error) {
    return dispatch(deleteTaskTagFailure(error));
  }
};

export const softDeleteMultipleTaskAction =
  (userId, selectedTasks) => async (dispatch) => {
    dispatch(softDeleteMultipleTask());
    try {
      await softDeleteMultipleTaskApi(userId, selectedTasks);
      return dispatch(softDeleteMultipleTaskSuccess(selectedTasks));
    } catch (error) {
      return dispatch(softDeleteMultipleTaskFailure(error));
    }
  };

export const softRestoreMultipleTaskAction =
  (userId, selectedTasks) => async (dispatch) => {
    dispatch(softRestoreMultipleTask());
    try {
      await softRestoreMultipleTaskApi(userId, selectedTasks);
      return dispatch(softRestoreMultipleTaskSuccess(selectedTasks));
    } catch (error) {
      return dispatch(softRestoreMultipleTaskFailure(error));
    }
  };

export const hardDeleteMultipleTaskAction =
  (userId, selectedTasks) => async (dispatch) => {
    dispatch(hardDeleteMultipleTask());
    try {
      await hardDeleteMultipleTaskApi(userId, selectedTasks);
      return dispatch(hardDeleteMultipleTaskSuccess(selectedTasks));
    } catch (error) {
      return dispatch(hardDeleteMultipleTaskFailure(error));
    }
  };
