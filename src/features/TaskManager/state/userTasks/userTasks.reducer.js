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

export const COMPLETE_TASK = "COMPLETE_TASK";
export const COMPLETE_TASK_SUCCESS = "COMPLETE_TASK_SUCCESS";
export const COMPLETE_TASK_ERROR = "COMPLETE_TASK_ERROR";

export const WONT_DO_TASK = "WONT_DO_TASK";
export const WONT_DO_TASK_SUCCESS = "WONT_DO_TASK_SUCCESS";
export const WONT_DO_TASK_ERROR = "WONT_DO_TASK_ERROR";

export const HARD_DELETE_TASK = "HARD_DELETE_TASK";
export const HARD_DELETE_TASK_SUCCESS = "HARD_DELETE_TASK_SUCCESS";
export const HARD_DELETE_TASK_ERROR = "HARD_DELETE_TASK_ERROR";

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

const modifyTasksAfterSoftDelete = ({ currentTasks, deletedTask }) => {
  return currentTasks.map((each) => {
    return each.id === deletedTask.id ? { ...each, isDeleted: 1 } : each;
  });
};

const modifyTasksAfterComplete = ({
  currentTasks,
  completedTaskId,
  isCompleted,
}) => {
  const newArr = currentTasks.map((each) =>
    each.id === completedTaskId
      ? {
          ...each,
          isCompleted: isCompleted,
          isWontDo: isCompleted ? false : each.isWontDo,
        }
      : each
  );
  return newArr;
};

const modifyTasksAfterWontDo = ({ currentTasks, wontDoTaskId, isWontDo }) => {
  const newArr = currentTasks.map((each) =>
    each.id === wontDoTaskId
      ? {
          ...each,
          isWontDo: isWontDo,
          isCompleted: isWontDo ? false : each.isCompleted,
        }
      : each
  );
  return newArr;
};

const modifyTasksAfterHardDelete = ({ currentTasks }) => {
  return currentTasks.filter((each) => {
    return each.isDeleted === 0;
  });
};

const countRemainingTasks = ({ currentTasks }) => {
  return currentTasks.filter((each) => {
    return each.isDeleted === 0;
  }).length;
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
          completedTaskId: action.payload.completedTaskId,
          isCompleted: action.payload.isCompleted,
          completedTime: action.payload.markedTime,
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
          wontDoTaskId: action.payload.wontDoTaskId,
          isWontDo: action.payload.isWontDo,
          completedTime: action.payload.markedTime,
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
        hardDeleteTaskSuccess: false,
        isLoadingTasks: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const tasksSelector = (state) => state.taskManager.userTasks;

export default reducer;
