export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR";

export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_ERROR = "ADD_TASK_ERROR";

export const EDIT_TASK = "EDIT_TASK";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_ERROR = "EDIT_TASK_ERROR";

export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_ERROR = "DELETE_TASK_ERROR";

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

const modifyTasksAfterDelete = ({ currentTasks, deletedTask }) => {
  return currentTasks.filter((each) => {
    return each.id !== deletedTask.id;
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

    case DELETE_TASK: {
      return fetchLoadingState({ state });
    }

    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        isLoadingTasks: false,
        deleteTaskSuccess: true,
        totalTasks: state.totalTasks > 0 ? state.totalTasks - 1 : 0,
        tasks: modifyTasksAfterDelete({
          currentTasks: state.tasks,
          deletedTask: action.payload,
        }),
      };
    }

    case DELETE_TASK_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        deleteTaskSuccess: false,
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
