import { SUCCESS } from "../../../constants/app.constants";
import { DAY } from "../../../constants/calendar.constants";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { VIEW } from "../../../constants/formType.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../constants/repeating.constants";
import dayjs from "../../../utils/dateTime.utils";
import {
  addTaskAction,
  editTaskAction,
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
  e,
  dispatch,
  user,
  createTaskSuccess,
  setOpenDialog,
  createTaskFailed,
}) => {
  const createdTime = dayjs.utc().format();
  const newTask = {
    name: e.name,
    description: e.description || null,
    listId: e.list,
    priority: e.priority,
    tagIds: e.tags || [],
    taskDate: (e.taskDate && e.taskDate.startOf(DAY).format()) || null,
    isAllDay: e.duration?.length > 0 ? false : true,
    startTime:
      e.taskDate && e.duration ? e.duration[0].format(TIME_FORMAT_IN_DB) : null,
    endTime:
      e.taskDate && e.duration ? e.duration[1].format(TIME_FORMAT_IN_DB) : null,
    isRepeating: e.taskDate && e.repeatFrequency ? true : false,
    repeatFrequency: e.taskDate && e.repeatFrequency ? e.repeatFrequency : null,
    endBy: e.taskDate && e.repeatFrequency && e.endBy ? e.endBy : null,
    endByDate:
      e.taskDate && e.repeatFrequency && e.endBy === END_BY_DATE && e.endByDate
        ? e.endByDate.endOf(DAY).format()
        : null,
    endByRepeatCount:
      e.taskDate &&
      e.repeatFrequency &&
      e.endBy === END_BY_REPEAT_COUNT &&
      e.endByRepeatCount !== undefined &&
      parseInt(e.endByRepeatCount) >= 0
        ? parseInt(e.endByRepeatCount)
        : null,
    endByRepeatCountDate:
      e.taskDate &&
      e.repeatFrequency &&
      e.endBy === END_BY_REPEAT_COUNT &&
      e.endByRepeatCount !== undefined &&
      parseInt(e.endByRepeatCount) >= 0
        ? e.taskDate
            .startOf(DAY)
            .add(
              parseInt(e.endByRepeatCount - 1),
              repeatMapping[e.repeatFrequency]
            )
            .endOf(DAY)
            .format()
        : null,
    isMultiDay: e.dateRange ? true : false,
    startMultiDate:
      (e.dateRange && e.dateRange[0].startOf(DAY).format()) || null,
    endMultiDate: (e.dateRange && e.dateRange[1].endOf(DAY).format()) || null,
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
  setFormType,
  form,
  setLastSavedFormValues,
  editTaskFailed,
}) => {
  const modifiedTime = dayjs.utc().format();
  const modifiedTask = {
    ...taskDetails,
    name: formValues.name,
    description: formValues.description || null,
    listId: formValues.listId,
    priority: formValues.priority,
    tagIds: formValues.tagIds || [],
    taskDate:
      (formValues.taskDate && formValues.taskDate.startOf(DAY).format()) ||
      null,
    isAllDay: formValues.duration?.length > 0 ? false : true,
    startTime:
      formValues.taskDate && formValues.duration
        ? formValues.duration[0].format(TIME_FORMAT_IN_DB)
        : null,
    endTime:
      formValues.taskDate && formValues.duration
        ? formValues.duration[1].format(TIME_FORMAT_IN_DB)
        : null,
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
    progress: parseInt(formValues.progress),
    modifiedTime: modifiedTime,
  };
  dispatch(editTaskAction(user.uid, modifiedTask, modifiedTask.id)).then(
    (response) => {
      if (response.success === SUCCESS) {
        const newFormValues = getFormValueFromTaskDetail({
          taskDetails: modifiedTask,
        });
        editTaskSuccess();
        setFormType(VIEW);
        form.setFieldsValue(newFormValues);
        setLastSavedFormValues(newFormValues);
      } else {
        editTaskFailed();
      }
    }
  );
};

