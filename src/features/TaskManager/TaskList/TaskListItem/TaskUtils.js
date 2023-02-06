import dayjs from "../../../../utils/dateTime.uitls";
import { INBOX } from "../../../../constants/app.constants";
import { DAY, TIME_ZONE } from "../../../../constants/dateTime.constants";

export const getAllTasks = ({ tasks }) => {
  const allTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isDeleted) {
      allTasks.push(tasks[i]);
    }
  }
  return allTasks;
};

export const getInboxTasks = ({ tasks }) => {
  const inboxTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isDeleted && tasks[i].listId === INBOX) {
      inboxTasks.push(tasks[i]);
    }
  }
  return inboxTasks;
};

export const getTasksByDate = ({ tasks, date, includeOverDue }) => {
  const currentDateStart = date.startOf(DAY);
  const currentDateEnd = date.endOf(DAY);
  const currentDateTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isDeleted) {
      // calculate taskDate in dayJS
      const taskDateStart = dayjs(tasks[i].taskDate).startOf(DAY);
      if (!tasks[i].taskDate) {
        // Not dated tasks
        continue;
      } else if (currentDateEnd.isBefore(taskDateStart)) {
        // taskDate is future date
        continue;
      } else if (includeOverDue && currentDateEnd.isAfter(taskDateStart)) {
        // taskDate is overdue
        currentDateTasks.push(tasks[i]);
      } else if (
        !tasks[i].isRepeating &&
        currentDateStart.isSame(taskDateStart)
      ) {
        // taskDate is date
        currentDateTasks.push(tasks[i]);
      } else if (tasks[i].isRepeating) {
        if (tasks[i].endByDate) {
          // Repeating task end by date
          const taskDateEnd = dayjs(tasks[i].endByDate).endOf(DAY);
          currentDateStart.isSameOrAfter(taskDateStart) &&
            currentDateEnd.isSameOrBefore(taskDateEnd) &&
            currentDateTasks.push(tasks[i]);
        } else if (tasks[i].endByRepeatCount >= 0) {
          // Repeating task end by count
          const taskDateEnd = dayjs(tasks[i].endByRepeatCountDate).endOf(DAY);
          currentDateStart.isSameOrAfter(taskDateStart) &&
            currentDateEnd.isSameOrBefore(taskDateEnd) &&
            currentDateTasks.push(tasks[i]);
        } else {
          // Endless task
          currentDateStart.isSameOrAfter(taskDateStart) &&
            currentDateTasks.push(tasks[i]);
        }
      }
    }
  }
  return currentDateTasks;
};

export const getTasksByNextXDays = ({ tasks, fromDate, count }) => {
  const startDate = fromDate.startOf(DAY);
  const endDate = startDate.add(count,DAY).endOf(DAY);
  const nextXDayTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isDeleted) {
      // calculate taskDate in dayJS
      const taskDateStart = dayjs(tasks[i].taskDate).startOf(DAY);
      if (!tasks[i].taskDate) {
        // Not dated tasks
        continue;
      } else if (endDate.isBefore(taskDateStart)) {
        // taskDate is future date
        continue;
      } else if (
        !tasks[i].isRepeating &&
        startDate.isSameOrBefore(taskDateStart) &&
        endDate.isSameOrAfter(taskDateStart)
      ) {
        // taskDate is in given range
        nextXDayTasks.push(tasks[i]);
      } else if (tasks[i].isRepeating) {
        if (tasks[i].endByDate) {
          // Repeating task end by date
          const endDate = dayjs(tasks[i].endByDate).endOf(DAY);
          if (
            (startDate.isBefore(taskDateStart) &&
              endDate.isSameOrAfter(endDate)) ||
            (startDate.isAfter(taskDateStart) &&
              endDate.isSameOrBefore(endDate)) ||
            (startDate.isBefore(taskDateStart) &&
              endDate.isSameOrBefore(endDate)) ||
            (startDate.isAfter(taskDateStart) && endDate.isSameOrAfter(endDate))
          ) {
            nextXDayTasks.push(tasks[i]);
          }
        } else if (tasks[i].endByRepeatCount >= 0) {
          // Repeating task end by count
          const endDate = dayjs(tasks[i].endByRepeatCountDate).endOf(DAY);
          if (
            (startDate.isBefore(taskDateStart) &&
              endDate.isSameOrAfter(endDate)) ||
            (startDate.isAfter(taskDateStart) &&
              endDate.isSameOrBefore(endDate)) ||
            (startDate.isBefore(taskDateStart) &&
              endDate.isSameOrBefore(endDate)) ||
            (startDate.isAfter(taskDateStart) && endDate.isSameOrAfter(endDate))
          ) {
            nextXDayTasks.push(tasks[i]);
          }
        } else {
          // Endless task
          if (endDate.isSameOrAfter(taskDateStart)) {
            nextXDayTasks.push(tasks[i]);
          }
        }
      }
    }
  }
  return nextXDayTasks;
};

export const getNoDateTasks = ({ tasks }) => {
  const noDateTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskDate === null && tasks[i].isDeleted === 0) {
      noDateTasks.push(tasks[i]);
    }
  }
  return noDateTasks;
};

export const getCompletedTasks = ({ tasks }) => {
  const completedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isCompleted === true && tasks[i].isDeleted === 0) {
      completedTasks.push(tasks[i]);
    }
  }
  return completedTasks;
};

export const getWontDoTasks = ({ tasks }) => {
  const wontDoTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isWontDo === true && tasks[i].isDeleted === 0) {
      wontDoTasks.push(tasks[i]);
    }
  }
  return wontDoTasks;
};

export const getDeletedTasks = ({ tasks }) => {
  const deletedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isDeleted === 1) {
      deletedTasks.push(tasks[i]);
    }
  }
  return deletedTasks;
};

export const getByListId = ({ tasks, listId }) => {
  const listTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].listId === listId && !tasks[i].isDeleted) {
      listTasks.push(tasks[i]);
    }
  }
  return listTasks;
};

export const getByTagId = ({ tasks, tagId }) => {
  const tagTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].tagIds.includes(tagId) && !tasks[i].isDeleted) {
      tagTasks.push(tasks[i]);
    }
  }
  return tagTasks;
};

export const isTaskOverdue = (task) => {
  const todayTS = dayjs.utc().tz(TIME_ZONE).startOf(DAY);
  if (task.taskDate !== null) {
    // If scheduled
    const taskDateTS = dayjs(task.taskDate).endOf(DAY);
    return taskDateTS.isBefore(todayTS);
  }
};

export const isTaskToday = (task) => {
  const todayTS = dayjs.utc().tz(TIME_ZONE).startOf(DAY);
  if (task.taskDate !== null) {
    // If scheduled
    const taskDateTS = dayjs(task.taskDate).startOf(DAY);
    return taskDateTS.isSame(todayTS);
  }
};
