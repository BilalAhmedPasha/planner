import dayjs from "../../../../utils/dateTime.uitls";
import { INBOX } from "../../../../constants/app.constants";

export const getAllTasks = ({ tasks }) => {
  return tasks;
};

export const getInboxTasks = ({ tasks }) => {
  const inboxTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].listId === INBOX) {
      inboxTasks.push(tasks[i]);
    }
  }
  return inboxTasks;
};

export const getTasksByDate = ({ tasks, date }) => {
  const dateStart = date.startOf("day");
  const dateEnd = date.endOf("day");
  const dateTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    // calculate taskDate in dayJS
    const taskDateStart = dayjs(tasks[i].taskDate).startOf("day");
    if (!tasks[i].taskDate) {
      // Not dated tasks
      continue;
    } else if (dateEnd.isBefore(taskDateStart)) {
      // taskDate is future date
      continue;
    } else if (dateStart.isSame(taskDateStart)) {
      // taskDate is date
      dateTasks.push(tasks[i]);
    } else if (tasks[i].isMultiDay) {
      // taskDate lies between startMultiDate && endMultiDate
      const startMultiDate = dayjs(tasks[i].startMultiDate).startOf("day");
      const endMultiDate = dayjs(tasks[i].endMultiDate).endOf("day");
      dateStart.isSameOrAfter(startMultiDate) &&
        dateEnd.isSameOrBefore(endMultiDate) &&
        dateTasks.push(tasks[i]);
    } else if (tasks[i].isRepeating) {
      if (tasks[i].endByDate) {
        // Repeating task end by date
        const endDate = dayjs(tasks[i].endByDate).endOf("day");
        dateStart.isSameOrAfter(taskDateStart) &&
          dateEnd.isSameOrBefore(endDate) &&
          dateTasks.push(tasks[i]);
      } else if (tasks[i].endByRepeatCount) {
        // Repeating task end by count
        const endDate = taskDateStart
          .add(tasks[i].endByRepeatCount, "day")
          .endOf("day");
        dateStart.isSameOrAfter(taskDateStart) &&
          dateEnd.isSameOrBefore(endDate) &&
          dateTasks.push(tasks[i]);
      } else {
        // Endless task
        dateStart.isSameOrAfter(taskDateStart) && dateTasks.push(tasks[i]);
      }
    }
  }
  return dateTasks;
};

export const getTasksByNextXDays = ({ tasks, fromDate, count }) => {
  const startFromDate = fromDate.startOf("day");
  const endByDate = startFromDate.add(count, "day").endOf("day");
  const nextXDayTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    // calculate taskDate in dayJS
    const taskDateStart = dayjs(tasks[i].taskDate).startOf("day");
    if (!taskDateStart) {
      // Not dated tasks
      continue;
    } else if (startFromDate.isAfter(taskDateStart)) {
      // taskDate is past date
      continue;
    } else if (
      startFromDate.isBefore(taskDateStart) &&
      endByDate.isSameOrBefore(taskDateStart)
    ) {
      // taskDate is date
      nextXDayTasks.push(tasks[i]);
    } else if (tasks[i].isMultiDay) {
      // taskDate lies between startMultiDate && endMultiDate
      const startMultiDate = dayjs(tasks[i].startMultiDate).startOf("day");
      const endMultiDate = dayjs(tasks[i].endMultiDate).endOf("day");
      if (
        (startFromDate.isBefore(startMultiDate) &&
          endByDate.isSameOrAfter(endMultiDate)) ||
        (startFromDate.isAfter(startMultiDate) &&
          endByDate.isSameOrBefore(endMultiDate)) ||
        (startFromDate.isBefore(startMultiDate) &&
          endByDate.isSameOrBefore(endMultiDate)) ||
        (startFromDate.isAfter(startMultiDate) &&
          endByDate.isSameOrAfter(endMultiDate))
      ) {
        nextXDayTasks.push(tasks[i]);
      }
    } else if (tasks[i].isRepeating) {
      if (tasks[i].endByDate) {
        // Repeating task end by date
        const endDate = dayjs(tasks[i].endByDate).endOf("day");
        if (
          (startFromDate.isBefore(taskDateStart) &&
            endByDate.isSameOrAfter(endDate)) ||
          (startFromDate.isAfter(taskDateStart) &&
            endByDate.isSameOrBefore(endDate)) ||
          (startFromDate.isBefore(taskDateStart) &&
            endByDate.isSameOrBefore(endDate)) ||
          (startFromDate.isAfter(taskDateStart) &&
            endByDate.isSameOrAfter(endDate))
        ) {
          nextXDayTasks.push(tasks[i]);
        }
      } else if (tasks[i].endByRepeatCount) {
        // Repeating task end by count
        const endDate = taskDateStart
          .add(tasks[i].endByRepeatCount, "day")
          .endOf("day");
        if (
          (startFromDate.isBefore(taskDateStart) &&
            endByDate.isSameOrAfter(endDate)) ||
          (startFromDate.isAfter(taskDateStart) &&
            endByDate.isSameOrBefore(endDate)) ||
          (startFromDate.isBefore(taskDateStart) &&
            endByDate.isSameOrBefore(endDate)) ||
          (startFromDate.isAfter(taskDateStart) &&
            endByDate.isSameOrAfter(endDate))
        ) {
          nextXDayTasks.push(tasks[i]);
        }
      } else {
        // Endless task
        startFromDate.isSameOrAfter(taskDateStart) &&
          nextXDayTasks.push(tasks[i]);
      }
    }
  }
  return nextXDayTasks;
};

export const getCompletedTasks = ({ tasks }) => {
  const completedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isCompleted === true) {
      completedTasks.push(tasks[i]);
    }
  }
  return completedTasks;
};

export const getWontDoTasks = ({ tasks }) => {
  const wontDoTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isWontDo === true) {
      wontDoTasks.push(tasks[i]);
    }
  }
  return wontDoTasks;
};

export const getDeletedTasks = ({ tasks }) => {
  const deletedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isDeleted === true) {
      deletedTasks.push(tasks[i]);
    }
  }
  return deletedTasks;
};

export const getByListId = ({ tasks, listId }) => {
  const listTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].listId === listId) {
      listTasks.push(tasks[i]);
    }
  }
  return listTasks;
};

export const getByTagId = ({ tasks, tagId }) => {
  const tagTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].tagIds.includes(tagId)) {
      tagTasks.push(tasks[i]);
    }
  }
  return tagTasks;
};
