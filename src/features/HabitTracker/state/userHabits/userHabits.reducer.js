export const FETCH_HABITS = "FETCH_HABITS";
export const FETCH_HABITS_SUCCESS = "FETCH_HABITS_SUCCESS";
export const FETCH_HABITS_ERROR = "FETCH_HABITS_ERROR";

export const ADD_HABIT = "ADD_HABIT";
export const ADD_HABIT_SUCCESS = "ADD_HABIT_SUCCESS";
export const ADD_HABIT_ERROR = "ADD_HABIT_ERROR";

export const EDIT_HABIT = "EDIT_HABIT";
export const EDIT_HABIT_SUCCESS = "EDIT_HABIT_SUCCESS";
export const EDIT_HABIT_ERROR = "EDIT_HABIT_ERROR";

export const DELETE_HABIT = "DELETE_HABIT";
export const DELETE_HABIT_SUCCESS = "DELETE_HABIT_SUCCESS";
export const DELETE_HABIT_ERROR = "DELETE_HABIT_ERROR";

export const MARK_HABIT = "MARK_HABIT";
export const MARK_HABIT_SUCCESS = "MARK_HABIT_SUCCESS";
export const MARK_HABIT_ERROR = "MARK_HABIT_ERROR";

export const INITIAL_STATE = {
  isLoadingHabits: false,
  totalHabits: 0,
  habits: [],
  error: undefined,
};

const fetchLoadingState = ({ state }) => {
  return {
    ...state,
    isLoadingHabits: true,
    error: undefined,
  };
};

const modifyHabitsAfterEdit = ({ currentHabits, editedHabit }) => {
  return currentHabits.map((each) =>
    each.id === editedHabit.id ? editedHabit : each
  );
};

const modifyHabitsAfterDelete = ({ currentHabits, deletedHabit }) => {
  return currentHabits.filter((each) => {
    return each.id !== deletedHabit.id;
  });
};

const modifyHabitsAfterMarking = ({ currentHabits, editedHabit }) => {
  return currentHabits.map((each) =>
    each.id === editedHabit.id
      ? {
          ...each,
          history: { ...each.history, [editedHabit.date]: editedHabit.value },
        }
      : each
  );
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HABITS: {
      return fetchLoadingState({ state });
    }

    case FETCH_HABITS_SUCCESS: {
      return {
        ...state,
        isLoadingHabits: false,
        totalHabits: action.payload.data.length,
        habits: [...action.payload.data],
      };
    }

    case FETCH_HABITS_ERROR: {
      return {
        ...state,
        isLoadingHabits: false,
        error: action.payload.error,
      };
    }

    case ADD_HABIT: {
      return fetchLoadingState({ state });
    }

    case ADD_HABIT_SUCCESS: {
      return {
        ...state,
        isLoadingHabits: false,
        addHabitSuccess: true,
        totalHabits: state.totalHabits + 1,
        habits: [...state.habits, action.payload],
      };
    }

    case ADD_HABIT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        addHabitSuccess: false,
        isLoadingHabits: false,
      };
    }

    case EDIT_HABIT: {
      return fetchLoadingState({ state });
    }

    case EDIT_HABIT_SUCCESS: {
      return {
        ...state,
        isLoadingHabits: false,
        editHabitSuccess: true,
        habits: modifyHabitsAfterEdit({
          currentHabits: state.habits,
          editedHabit: action.payload,
        }),
      };
    }

    case EDIT_HABIT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        editHabitSuccess: false,
        isLoadingHabits: false,
      };
    }

    case DELETE_HABIT: {
      return fetchLoadingState({ state });
    }

    case DELETE_HABIT_SUCCESS: {
      return {
        ...state,
        isLoadingHabits: false,
        deleteHabitSuccess: true,
        totalHabits: state.totalHabits > 0 ? state.totalHabits - 1 : 0,
        habits: modifyHabitsAfterDelete({
          currentHabits: state.habits,
          deletedHabit: action.payload,
        }),
      };
    }

    case DELETE_HABIT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        softDeleteHabitSuccess: false,
        isLoadingHabits: false,
      };
    }

    case MARK_HABIT: {
      return fetchLoadingState({ state });
    }

    case MARK_HABIT_SUCCESS: {
      return {
        ...state,
        isLoadingHabits: false,
        markHabitSuccess: true,
        habits: modifyHabitsAfterMarking({
          currentHabits: state.habits,
          editedHabit: action.payload,
        }),
      };
    }

    case MARK_HABIT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        markHabitSuccess: false,
        isLoadingHabits: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const habitsSelector = (state) => state.habits.userHabits;

export default reducer;
