export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR";

export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_ERROR = "ADD_TASK_ERROR";

export const EDIT_TASK = "EDIT_TASK";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_ERROR = "EDIT_TASK_ERROR";

export const SOFT_DELETE_TASK = "SOFT_DELETE_TASK";
export const SOFT_DELETE_TASK_SUCCESS = "SOFT_DELETE_TASK_SUCCESS";
export const SOFT_DELETE_TASK_ERROR = "SOFT_DELETE_TASK_ERROR";

export const RESTORE_TASK = "RESTORE_TASK";
export const RESTORE_TASK_SUCCESS = "RESTORE_TASK_SUCCESS";
export const RESTORE_TASK_ERROR = "RESTORE_TASK_ERROR";

export const COMPLETE_TASK = "COMPLETE_TASK";
export const COMPLETE_TASK_SUCCESS = "COMPLETE_TASK_SUCCESS";
export const COMPLETE_TASK_ERROR = "COMPLETE_TASK_ERROR";

export const WONT_DO_TASK = "WONT_DO_TASK";
export const WONT_DO_TASK_SUCCESS = "WONT_DO_TASK_SUCCESS";
export const WONT_DO_TASK_ERROR = "WONT_DO_TASK_ERROR";

export const HARD_DELETE_TASK = "HARD_DELETE_TASK";
export const HARD_DELETE_TASK_SUCCESS = "HARD_DELETE_TASK_SUCCESS";
export const HARD_DELETE_TASK_ERROR = "HARD_DELETE_TASK_ERROR";

export const HARD_DELETE_SINGLE_TASK = "HARD_DELETE_SINGLE_TASK";
export const HARD_DELETE_SINGLE_TASK_SUCCESS =
  "HARD_DELETE_SINGLE_TASK_SUCCESS";
export const HARD_DELETE_SINGLE_TASK_ERROR = "HARD_DELETE_SINGLE_TASK_ERROR";

export const HARD_DELETE_LIST_TASK = "HARD_DELETE_LIST_TASK";
export const HARD_DELETE_LIST_TASK_SUCCESS = "HARD_DELETE_LIST_TASK_SUCCESS";
export const HARD_DELETE_LIST_TASK_ERROR = "HARD_DELETE_LIST_TASK_ERROR";

export const DELETE_TASK_TAG = "DELETE_TASK_TAG";
export const DELETE_TASK_TAG_SUCCESS = "DELETE_TASK_TAG_SUCCESS";
export const DELETE_TASK_TAG_ERROR = "DELETE_TASK_TAG_ERROR";

export const SOFT_DELETE_MULTIPLE_TASK = "SOFT_DELETE_MULTIPLE_TASK";
export const SOFT_DELETE_MULTIPLE_TASK_SUCCESS =
  "SOFT_DELETE_MULTIPLE_TASK_SUCCESS";
export const SOFT_DELETE_MULTIPLE_TASK_ERROR =
  "SOFT_DELETE_MULTIPLE_TASK_ERROR";

export const SOFT_RESTORE_MULTIPLE_TASK = "SOFT_RESTORE_MULTIPLE_TASK";
export const SOFT_RESTORE_MULTIPLE_TASK_SUCCESS =
  "SOFT_RESTORE_MULTIPLE_TASK_SUCCESS";
export const SOFT_RESTORE_MULTIPLE_TASK_ERROR =
  "SOFT_RESTORE_MULTIPLE_TASK_ERROR";

export const HARD_DELETE_MULTIPLE_TASK = "HARD_DELETE_MULTIPLE_TASK";
export const HARD_DELETE_MULTIPLE_TASK_SUCCESS =
  "HARD_DELETE_MULTIPLE_TASK_SUCCESS";
export const HARD_DELETE_MULTIPLE_TASK_ERROR =
  "HARD_DELETE_MULTIPLE_TASK_ERROR";

export const UPDATE_REPEATING_TASK = "UPDATE_REPEATING_TASK";
export const UPDATE_REPEATING_TASK_SUCCESS = "UPDATE_REPEATING_TASK_SUCCESS";
export const UPDATE_REPEATING_TASK_ERROR = "UPDATE_REPEATING_TASK_ERROR";

export const INITIAL_STATE = {
  isLoadingTasks: false,
  totalTasks: 0,
  tasks: [],
  error: undefined,
};

const fetchLoadingState = ({ state }) => {
  return {
    ...state,
    isLoadingTasks: true,
    error: undefined,
  };
};

const modifyTasksAfterEdit = ({ currentTasks, editedTask }) => {
  return currentTasks.map((each) =>
    each.id === editedTask.id ? editedTask : each
  );
};

const modifyTasksAfterUpdatingRepeatingTasks = ({
  currentTasks,
  modifiedTaskDetails,
}) => {
  return currentTasks.map((each) =>
    each.id === modifiedTaskDetails.id
      ? {
          ...each,
          excludedDates: each.excludedDates ? [...each.excludedDates, modifiedTaskDetails.excludeDate] : [modifiedTaskDetails.excludeDate],
        }
      : each
  );
};

const modifyTasksAfterSoftDelete = ({ currentTasks, deletedTask }) => {
  return currentTasks.map((each) => {
    return each.id === deletedTask.id ? { ...each, isDeleted: 1 } : each;
  });
};

const modifyTasksAfterRestore = ({ currentTasks, restoredTask }) => {
  return currentTasks.map((each) => {
    return each.id === restoredTask.id ? { ...each, isDeleted: 0 } : each;
  });
};

const modifyTasksAfterListDelete = ({ currentTasks, listId }) => {
  return currentTasks.filter((each) => each.listId !== listId);
};

const modifyTasksAfterTagDelete = ({ currentTasks, tagId }) => {
  return currentTasks.map((each) => {
    return { ...each, tagIds: each.tagIds.filter((tag) => tag !== tagId) };
  });
};

const modifyTasksAfterComplete = ({
  currentTasks,
  completedTaskId,
  isCompleted,
  completedTime,
  updatedTaskDate,
  newTaskId,
  shouldCreateNewTask,
}) => {
  const newArr = currentTasks.reduce((accumulator, each) => {
    if (each.id === completedTaskId) {
      if (!each.isRepeating) {
        const isWontDoNew = isCompleted ? false : each.isWontDo;
        accumulator.push({
          ...each,
          isCompleted: isCompleted,
          completedTime: isCompleted || isWontDoNew ? completedTime : null,
          isWontDo: isWontDoNew,
          modifiedTime: completedTime,
        });
        return accumulator;
      } else {
        const isWontDoNew = isCompleted ? false : each.isWontDo;
        if (shouldCreateNewTask) {
          accumulator.push({
            ...each,
            taskDate: updatedTaskDate,
          });
          accumulator.push({
            ...each,
            id: newTaskId,
            isCompleted: isCompleted,
            completedTime: completedTime,
            modifiedTime: completedTime,
            isWontDo: isWontDoNew,
            isRepeating: false,
            endBy: null,
            endByDate: null,
            endByRepeatCount: null,
            repeatFrequency: null,
          });
          return accumulator;
        } else {
          accumulator.push({
            ...each,
            isCompleted: isCompleted,
            completedTime: completedTime,
            modifiedTime: completedTime,
            isWontDo: isWontDoNew,
            isRepeating: false,
            endBy: null,
            endByDate: null,
            endByRepeatCount: null,
            repeatFrequency: null,
          });
          return accumulator;
        }
      }
    } else {
      accumulator.push(each);
      return accumulator;
    }
  }, []);
  return newArr;
};

const modifyTasksAfterWontDo = ({
  currentTasks,
  wontDoTaskId,
  isWontDo,
  wontDoTime,
  updatedTaskDate,
  newTaskId,
  shouldCreateNewTask,
}) => {
  const newArr = currentTasks.reduce((accumulator, each) => {
    if (each.id === wontDoTaskId) {
      if (!each.isRepeating) {
        const isCompletedNew = isWontDo ? false : each.isCompleted;
        accumulator.push({
          ...each,
          completedTime: isWontDo || isCompletedNew ? wontDoTime : null,
          isWontDo: isWontDo,
          isCompleted: isCompletedNew,
          modifiedTime: wontDoTime,
        });
        return accumulator;
      } else {
        const isCompletedNew = isWontDo ? false : each.isCompleted;
        if (shouldCreateNewTask) {
          accumulator.push({
            ...each,
            taskDate: updatedTaskDate,
          });
          accumulator.push({
            ...each,
            id: newTaskId,
            isCompleted: isCompletedNew,
            completedTime: wontDoTime,
            modifiedTime: wontDoTime,
            isWontDo: isWontDo,
            isRepeating: false,
            endBy: null,
            endByDate: null,
            endByRepeatCount: null,
            repeatFrequency: null,
          });
          return accumulator;
        } else {
          accumulator.push({
            ...each,
            isCompleted: isCompletedNew,
            completedTime: wontDoTime,
            modifiedTime: wontDoTime,
            isWontDo: isWontDo,
            isRepeating: false,
            endBy: null,
            endByDate: null,
            endByRepeatCount: null,
            repeatFrequency: null,
          });
          return accumulator;
        }
      }
    } else {
      accumulator.push(each);
      return accumulator;
    }
  }, []);
  return newArr;
};

const modifyTasksAfterHardDelete = ({ currentTasks }) => {
  return currentTasks.filter((each) => {
    return each.isDeleted === 0;
  });
};

const modifyAfterHardDeleteSingleTask = ({ currentTasks, deletedTask }) => {
  return currentTasks.filter((each) => {
    return each.id !== deletedTask.id;
  });
};

const countRemainingTasks = ({ currentTasks }) => {
  return currentTasks.filter((each) => {
    return each.isDeleted === 0;
  }).length;
};

const modifyTasksAfterMultipleSoftDelete = ({ currentTasks, deletedTasks }) => {
  return currentTasks.map((task) => {
    if (deletedTasks.find((deletedTask) => deletedTask.id === task.id)) {
      return { ...task, isDeleted: 1 };
    } else {
      return task;
    }
  });
};

const modifyTasksAfterMultipleHardDelete = ({ currentTasks, deletedTasks }) => {
  return currentTasks.filter(
    (task) => !deletedTasks.some((deletedTask) => task.id === deletedTask.id)
  );
};

const modifyTasksAfterMultipleSoftRestore = ({
  currentTasks,
  deletedTasks,
}) => {
  return currentTasks.map((task) => {
    if (deletedTasks.find((deletedTask) => deletedTask.id === task.id)) {
      return { ...task, isDeleted: 0 };
    } else {
      return task;
    }
  });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASKS: {
      return fetchLoadingState({ state });
    }

    case FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        totalTasks: action.payload.data.length,
        tasks: [...action.payload.data],
      };
    }

    case FETCH_TASKS_ERROR: {
      return {
        ...state,
        isLoadingTasks: false,
        error: action.payload.error,
      };
    }

    case ADD_TASK: {
      return fetchLoadingState({ state });
    }

    case ADD_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        addTaskSuccess: true,
        totalTasks: state.totalTasks + 1,
        tasks: [action.payload, ...state.tasks],
      };
    }

    case ADD_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        addTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case EDIT_TASK: {
      return fetchLoadingState({ state });
    }

    case EDIT_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        editTaskSuccess: true,
        tasks: modifyTasksAfterEdit({
          currentTasks: state.tasks,
          editedTask: action.payload,
        }),
      };
    }

    case EDIT_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        editTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case UPDATE_REPEATING_TASK: {
      return fetchLoadingState({ state });
    }

    case UPDATE_REPEATING_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        updateRepeatingSuccess: true,
        tasks: modifyTasksAfterUpdatingRepeatingTasks({
          currentTasks: state.tasks,
          modifiedTaskDetails: action.payload,
        }),
      };
    }

    case UPDATE_REPEATING_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        updateRepeatingSuccess: false,
        isLoadingTasks: false,
      };
    }

    case SOFT_DELETE_TASK: {
      return fetchLoadingState({ state });
    }

    case SOFT_DELETE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        softDeleteTaskSuccess: true,
        totalTasks: state.totalTasks > 0 ? state.totalTasks - 1 : 0,
        tasks: modifyTasksAfterSoftDelete({
          currentTasks: state.tasks,
          deletedTask: action.payload,
        }),
      };
    }

    case SOFT_DELETE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        softDeleteTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case RESTORE_TASK: {
      return fetchLoadingState({ state });
    }

    case RESTORE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        restoreTaskSuccess: true,
        totalTasks: state.totalTasks > 0 ? state.totalTasks - 1 : 0,
        tasks: modifyTasksAfterRestore({
          currentTasks: state.tasks,
          restoredTask: action.payload,
        }),
      };
    }

    case RESTORE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        restoreTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case COMPLETE_TASK: {
      return fetchLoadingState({ state });
    }

    case COMPLETE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        completeTaskSuccess: true,
        tasks: modifyTasksAfterComplete({
          currentTasks: state.tasks,
          taskDetails: action.payload.taskDetails,
          completedTaskId: action.payload.completedTaskId,
          isCompleted: action.payload.isCompleted,
          completedTime: action.payload.markedTime,
          updatedTaskDate: action.payload.updatedTaskDate,
          newTaskId: action.payload.newTaskId,
          shouldCreateNewTask: action.payload.shouldCreateNewTask,
        }),
      };
    }

    case COMPLETE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        completeTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case WONT_DO_TASK: {
      return fetchLoadingState({ state });
    }

    case WONT_DO_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        wontDoTaskSuccess: true,
        tasks: modifyTasksAfterWontDo({
          currentTasks: state.tasks,
          taskDetails: action.payload.taskDetails,
          wontDoTaskId: action.payload.wontDoTaskId,
          isWontDo: action.payload.isWontDo,
          wontDoTime: action.payload.markedTime,
          updatedTaskDate: action.payload.updatedTaskDate,
          newTaskId: action.payload.newTaskId,
          shouldCreateNewTask: action.payload.shouldCreateNewTask,
        }),
      };
    }

    case WONT_DO_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        wontDoTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case HARD_DELETE_TASK: {
      return fetchLoadingState({ state });
    }

    case HARD_DELETE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        hardDeleteTaskSuccess: true,
        totalTasks: countRemainingTasks({ currentTasks: state.tasks }),
        tasks: modifyTasksAfterHardDelete({
          currentTasks: state.tasks,
        }),
      };
    }

    case HARD_DELETE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        hardDeleteSingleTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case HARD_DELETE_SINGLE_TASK: {
      return fetchLoadingState({ state });
    }

    case HARD_DELETE_SINGLE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        hardDeleteSingleTaskSuccess: true,
        totalTasks: countRemainingTasks({ currentTasks: state.tasks }),
        tasks: modifyAfterHardDeleteSingleTask({
          currentTasks: state.tasks,
          deletedTask: action.payload,
        }),
      };
    }

    case HARD_DELETE_SINGLE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        hardDeleteSingleTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case HARD_DELETE_LIST_TASK: {
      return fetchLoadingState({ state });
    }

    case HARD_DELETE_LIST_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        hardDeleteListTaskSuccess: true,
        totalTasks: countRemainingTasks({ currentTasks: state.tasks }),
        tasks: modifyTasksAfterListDelete({
          currentTasks: state.tasks,
          listId: action.payload,
        }),
      };
    }

    case HARD_DELETE_LIST_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        hardDeleteListTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    case DELETE_TASK_TAG: {
      return fetchLoadingState({ state });
    }

    case DELETE_TASK_TAG_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        deleteTaskTagSuccess: true,
        totalTasks: countRemainingTasks({ currentTasks: state.tasks }),
        tasks: modifyTasksAfterTagDelete({
          currentTasks: state.tasks,
          tagId: action.payload,
        }),
      };
    }

    case DELETE_TASK_TAG_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        deleteTaskTagSuccess: false,
        isLoadingTasks: false,
      };
    }

    case SOFT_DELETE_MULTIPLE_TASK: {
      return fetchLoadingState({ state });
    }

    case SOFT_DELETE_MULTIPLE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        softDeleteMultipleTaskSuccess: true,
        totalTasks:
          state.tasks.length > 0
            ? state.tasks.length - action.payload.length
            : 0,
        tasks: modifyTasksAfterMultipleSoftDelete({
          currentTasks: state.tasks,
          deletedTasks: action.payload,
        }),
      };
    }

    case SOFT_DELETE_MULTIPLE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        softDeleteMultipleTaskSuccess: false,
        isLoadingTasks: true,
      };
    }

    case SOFT_RESTORE_MULTIPLE_TASK: {
      return fetchLoadingState({ state });
    }

    case SOFT_RESTORE_MULTIPLE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        softRestoreMultipleTaskSuccess: true,
        totalTasks:
          state.tasks.length > 0
            ? state.tasks.length - action.payload.length
            : 0,
        tasks: modifyTasksAfterMultipleSoftRestore({
          currentTasks: state.tasks,
          deletedTasks: action.payload,
        }),
      };
    }

    case SOFT_RESTORE_MULTIPLE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        softRestoreMultipleTaskSuccess: false,
        isLoadingTasks: true,
      };
    }

    case HARD_DELETE_MULTIPLE_TASK: {
      return fetchLoadingState({ state });
    }

    case HARD_DELETE_MULTIPLE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        hardDeleteMultipleTaskSuccess: true,
        totalTasks:
          state.tasks.length > 0
            ? state.tasks.length - action.payload.length
            : 0,
        tasks: modifyTasksAfterMultipleHardDelete({
          currentTasks: state.tasks,
          deletedTasks: action.payload,
        }),
      };
    }

    case HARD_DELETE_MULTIPLE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        hardDeleteMultipleTaskSuccess: false,
        isLoadingTasks: true,
      };
    }

    default: {
      return state;
    }
  }
};

export const tasksSelector = (state) => state.taskManager.userTasks;

export default reducer;
