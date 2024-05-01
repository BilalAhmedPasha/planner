import {
  ALL,
  COMPLETED,
  DELETED,
  INBOX,
  LISTS,
  NEXT_7_DAYS,
  NO_DATE,
  SUCCESS,
  TAGS,
  TODAY,
  TOMORROW,
  WONT_DO,
} from "../../../constants/app.constants";
import { DAY } from "../../../constants/calendar.constants";
import {
  DB_TIME_STAMP_FORMAT,
  TIME_FORMAT_IN_DB,
  TIME_ZONE,
  DAY as DATETIME_DAY,
} from "../../../constants/dateTime.constants";
import { VIEW } from "../../../constants/formType.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../constants/repeating.constants";
import dayjs from "../../../utils/dateTime.utils";
import {
  getAllTasks,
  getByListId,
  getByTagId,
  getCompletedTasks,
  getDeletedTasks,
  getInboxTasks,
  getNoDateTasks,
  getTasksByDate,
  getTasksByNextXDays,
  getWontDoTasks,
} from "../TaskListView/TaskListItem/TaskUtils";
import {
  addTaskAction,
  editTaskAction,
  updateRepeatingTaskAction,
} from "../state/userTasks/userTasks.actions";

export const getFormValueFromTaskDetail = ({ taskDetails }) => {
  return {
    ...taskDetails,
    taskDate: taskDetails?.taskDate ? dayjs(taskDetails?.taskDate) : null,
    duration:
      taskDetails?.startTime && taskDetails?.endTime
        ? [
            dayjs(taskDetails.startTime, TIME_FORMAT_IN_DB),
            dayjs(taskDetails.endTime, TIME_FORMAT_IN_DB),
          ]
        : null,
    endByDate: taskDetails?.endByDate ? dayjs(taskDetails?.endByDate) : null,
  };
};

export const handleAddTask = ({
  formValues,
  dispatch,
  user,
  createTaskSuccess,
  setOpenDialog,
  createTaskFailed,
}) => {
  const createdTime = dayjs.utc().format();
  const thisTaskDate = formValues.taskDate
    ? formValues.taskDate.startOf(DAY).format()
    : null;
  const thisTaskStartTime =
    formValues.taskDate && formValues.duration && formValues.duration[0]
      ? formValues.duration[0].format(TIME_FORMAT_IN_DB)
      : null;
  const thisTaskEndTime =
    formValues.taskDate && formValues.duration && formValues.duration[1]
      ? formValues.duration[1].format(TIME_FORMAT_IN_DB)
      : null;
  const newTask = {
    name: formValues.name,
    description: formValues.description || null,
    listId: formValues.listId,
    priority: formValues.priority,
    tagIds: formValues.tagIds || [],
    taskDate: thisTaskDate,
    isAllDay:
      thisTaskDate && !thisTaskStartTime && !thisTaskEndTime ? true : false,
    startTime: thisTaskStartTime,
    endTime: thisTaskEndTime,
    isRepeating:
      formValues.taskDate && formValues.repeatFrequency ? true : false,
    repeatFrequency:
      formValues.taskDate && formValues.repeatFrequency
        ? formValues.repeatFrequency
        : null,
    endBy:
      formValues.taskDate && formValues.repeatFrequency && formValues.endBy
        ? formValues.endBy
        : null,
    endByDate:
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_DATE &&
      formValues.endByDate
        ? formValues.endByDate.endOf(DAY).format()
        : null,
    endByRepeatCount:
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_REPEAT_COUNT &&
      formValues.endByRepeatCount !== undefined &&
      parseInt(formValues.endByRepeatCount) >= 0
        ? parseInt(formValues.endByRepeatCount)
        : null,
    endByRepeatCountDate:
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_REPEAT_COUNT &&
      formValues.endByRepeatCount !== undefined &&
      parseInt(formValues.endByRepeatCount) >= 0
        ? formValues.taskDate
            .startOf(DAY)
            .add(
              parseInt(formValues.endByRepeatCount - 1),
              repeatMapping[formValues.repeatFrequency]
            )
            .endOf(DAY)
            .format()
        : null,
    isMultiDay: formValues.dateRange ? true : false,
    startMultiDate:
      (formValues.dateRange && formValues.dateRange[0].startOf(DAY).format()) ||
      null,
    endMultiDate:
      (formValues.dateRange && formValues.dateRange[1].endOf(DAY).format()) ||
      null,
    isCompleted: false,
    isWontDo: false,
    isDeleted: 0,
    completedTime: null,
    progress: 0,
    parentTaskId: null,
    childTaskIds: [],
    createdTime: createdTime,
    modifiedTime: createdTime,
  };
  delete newTask.start;
  delete newTask.end;
  dispatch(addTaskAction(user.uid, newTask)).then((response) => {
    if (response.success === SUCCESS) {
      createTaskSuccess();
      setOpenDialog(false);
    } else {
      createTaskFailed();
    }
  });
};

export const handleEditTask = ({
  taskDetails,
  formValues,
  dispatch,
  user,
  editTaskSuccess,
  editTaskFailed,
  form,
  setFormType,
  setLastSavedFormValues,
  isFromCalendar = false,
  setOpenDialog,
}) => {
  const modifiedTime = dayjs.utc().format();
  const newTaskDate = formValues.taskDate
    ? formValues.taskDate.startOf(DAY).format()
    : null;
  const newTaskStartTime =
    formValues.taskDate && formValues.duration && formValues.duration[0]
      ? formValues.duration[0].format(TIME_FORMAT_IN_DB)
      : null;
  const newTaskEndTime =
    formValues.taskDate && formValues.duration && formValues.duration[1]
      ? formValues.duration[1].format(TIME_FORMAT_IN_DB)
      : null;
  const modifiedTask = {
    ...taskDetails,
    name: formValues.name,
    description: formValues.description || null,
    listId: formValues.listId,
    priority: formValues.priority,
    tagIds: formValues.tagIds || [],
    taskDate: newTaskDate,
    isAllDay:
      newTaskDate && !newTaskStartTime && !newTaskEndTime ? true : false,
    startTime: newTaskStartTime,
    endTime: newTaskEndTime,
    isRepeating:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency
        ? true
        : false,
    repeatFrequency:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency
        ? formValues.repeatFrequency
        : null,
    endBy:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy
        ? formValues.endBy
        : null,
    endByDate:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_DATE &&
      formValues.endByDate
        ? formValues.endByDate.endOf(DAY).format()
        : null,
    endByRepeatCount:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_REPEAT_COUNT &&
      formValues.endByRepeatCount !== undefined &&
      parseInt(formValues.endByRepeatCount) >= 0
        ? parseInt(formValues.endByRepeatCount)
        : null,
    endByRepeatCountDate:
      !taskDetails.isPlaceHolderForRepeatingTask &&
      formValues.taskDate &&
      formValues.repeatFrequency &&
      formValues.endBy === END_BY_REPEAT_COUNT &&
      formValues.endByRepeatCount !== undefined &&
      parseInt(formValues.endByRepeatCount) >= 0
        ? formValues.taskDate
            .startOf(DAY)
            .add(
              parseInt(formValues.endByRepeatCount - 1),
              repeatMapping[formValues.repeatFrequency]
            )
            .endOf(DAY)
            .format()
        : null,
    progress: parseInt(formValues.progress),
    modifiedTime: modifiedTime,
  };
  // Here if was a placeholder for a future repeating task and we are seperating it from the repeat cycle
  // Add this task date to exclude from repeat cycle
  delete modifiedTask.start;
  delete modifiedTask.end;
  if (!modifiedTask.isPlaceHolderForRepeatingTask) {
    dispatch(editTaskAction(user.uid, modifiedTask, modifiedTask.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          const newFormValues = getFormValueFromTaskDetail({
            taskDetails: modifiedTask,
          });
          editTaskSuccess();
          if (isFromCalendar) {
            setOpenDialog(false);
          } else {
            setFormType(VIEW);
            form.setFieldsValue(newFormValues);
            setLastSavedFormValues(newFormValues);
          }
        } else {
          editTaskFailed();
        }
      }
    );
  } else {
    dispatch(
      addTaskAction(user.uid, {
        ...modifiedTask,
        isPlaceHolderForRepeatingTask: false,
      })
    ).then((response) => {
      if (response.success === SUCCESS) {
        // Update the reference task edited exclusion date
        dispatch(
          updateRepeatingTaskAction(
            user.uid,
            modifiedTask.repeatingTaskReferenceId,
            newTaskDate
          )
        ).then((response) => {
          if (response.success === SUCCESS) {
            const newFormValues = getFormValueFromTaskDetail({
              taskDetails: modifiedTask,
            });
            editTaskSuccess();
            if (isFromCalendar) {
              setOpenDialog(false);
            } else {
              setFormType(VIEW);
              form.setFieldsValue(newFormValues);
              setLastSavedFormValues(newFormValues);
            }
          } else {
            editTaskFailed();
          }
        });
      } else {
        editTaskFailed();
      }
    });
  }
};

export const computeSectionData = ({ tasks, currentSection }) => {
  if (currentSection.id === ALL) {
    return getAllTasks({ tasks });
  } else if (currentSection.id === INBOX) {
    return getInboxTasks({ tasks });
  } else if (currentSection.id === TODAY) {
    const today = dayjs.utc().tz(TIME_ZONE);
    return getTasksByDate({ tasks, date: today, includeOverDue: true });
  } else if (currentSection.id === TOMORROW) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, DAY);
    return getTasksByDate({ tasks, date: tomorrow, includeOverDue: false });
  } else if (currentSection.id === NEXT_7_DAYS) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, DAY);
    return getTasksByNextXDays({ tasks, fromDate: tomorrow, count: 6 });
  } else if (currentSection.id === NO_DATE) {
    return getNoDateTasks({ tasks });
  } else if (currentSection.id === COMPLETED) {
    return getCompletedTasks({ tasks });
  } else if (currentSection.id === WONT_DO) {
    return getWontDoTasks({ tasks });
  } else if (currentSection.id === DELETED) {
    return getDeletedTasks({ tasks });
  } else if (currentSection.type === LISTS) {
    return getByListId({ tasks, listId: currentSection.id });
  } else if (currentSection.type === TAGS) {
    return getByTagId({ tasks, tagId: currentSection.id });
  }
  return [];
};

export const handleCompletePlaceholderRepeatingTask = ({
  user,
  taskDetails,
  dispatch,
}) => {
  const repeatingTaskReferenceId = taskDetails.id;
  const newTask = { ...taskDetails };
  newTask.createdTime = dayjs(new Date())
    .tz()
    .startOf(DATETIME_DAY)
    .format(DB_TIME_STAMP_FORMAT);
  newTask.endBy = null;
  newTask.endByDate = null;
  newTask.endByRepeatCount = null;
  newTask.endByRepeatCountDate = null;
  newTask.endBy = null;
  newTask.id = null;
  newTask.isCompleted = true;
  newTask.isWontDo = false;
  newTask.isPlaceHolderForRepeatingTask = false;
  newTask.isRepeating = false;
  newTask.modifiedTime =  dayjs(new Date())
    .tz()
    .startOf(DATETIME_DAY)
    .format(DB_TIME_STAMP_FORMAT);
  newTask.repeatFrequency = null;
  newTask.repeatingTaskReferenceId = null;

  delete newTask.start;
  delete newTask.end;

  return dispatch(addTaskAction(user.uid, newTask)).then((response) => {
    if (response.success === SUCCESS) {
      // Add this task date to excludedDates array
      return dispatch(
        updateRepeatingTaskAction(
          user.uid,
          repeatingTaskReferenceId,
          newTask.taskDate
        )
      );
    }
  });
};


export const handleWontDoPlaceholderRepeatingTask = ({
  user,
  taskDetails,
  dispatch,
}) => {
  const repeatingTaskReferenceId = taskDetails.id;
  const newTask = { ...taskDetails };
  newTask.createdTime = dayjs(new Date())
    .tz()
    .startOf(DATETIME_DAY)
    .format(DB_TIME_STAMP_FORMAT);
  newTask.endBy = null;
  newTask.endByDate = null;
  newTask.endByRepeatCount = null;
  newTask.endByRepeatCountDate = null;
  newTask.endBy = null;
  newTask.id = null;
  newTask.isCompleted = false;
  newTask.isWontDo = true;
  newTask.isPlaceHolderForRepeatingTask = false;
  newTask.isRepeating = false;
  newTask.modifiedTime =  dayjs(new Date())
    .tz()
    .startOf(DATETIME_DAY)
    .format(DB_TIME_STAMP_FORMAT);
  newTask.repeatFrequency = null;
  newTask.repeatingTaskReferenceId = null;

  delete newTask.start;
  delete newTask.end;

  return dispatch(addTaskAction(user.uid, newTask)).then((response) => {
    if (response.success === SUCCESS) {
      // Add this task date to excludedDates array
      return dispatch(
        updateRepeatingTaskAction(
          user.uid,
          repeatingTaskReferenceId,
          newTask.taskDate
        )
      );
    }
  });
};