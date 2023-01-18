import dayjs from "../../../../utils/dateTime.uitls";
import { INBOX } from "../../../../constants/app.constants";

export const getAllTasks = ({ tasks }) => {
  const allTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].isDeleted === 0) {
      allTasks.push(tasks[i]);
    }
  }
  return allTasks;
};

export const getInboxTasks = ({ tasks }) => {
  const inboxTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].listId === INBOX && tasks[i].isDeleted === 0) {
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
    if (tasks[i].isDeleted === 0) {
      // calculate taskDate in dayJS
      const taskDateStart = dayjs(tasks[i].taskDate).startOf("day");
      if (!tasks[i].taskDate) {
        // Not dated tasks
        continue;
      } else if (dateEnd.isBefore(taskDateStart)) {
        // taskDate is future date
        continue;
      } else if (!tasks[i].isRepeating && dateStart.isSame(taskDateStart)) {
        // taskDate is date
        dateTasks.push(tasks[i]);
      } else if (tasks[i].isRepeating) {
        if (tasks[i].endByDate) {
          // Repeating task end by date
          const taskDateEnd = dayjs(tasks[i].endByDate).endOf("day");
          dateStart.isSameOrAfter(taskDateStart) &&
            dateEnd.isSameOrBefore(taskDateEnd) &&
            dateTasks.push(tasks[i]);
        } else if (tasks[i].endByRepeatCount >= 0) {
          // Repeating task end by count
          const taskDateEnd = taskDateStart
            .add(tasks[i].endByRepeatCount, "day")
            .endOf("day");
          dateStart.isSameOrAfter(taskDateStart) &&
            dateEnd.isSameOrBefore(taskDateEnd) &&
            dateTasks.push(tasks[i]);
        } else {
          // Endless task
          dateStart.isSameOrAfter(taskDateStart) && dateTasks.push(tasks[i]);
        }
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
    if (tasks[i].isDeleted === 0) {
      // calculate taskDate in dayJS
      const taskDateStart = dayjs(tasks[i].taskDate).startOf("day");
      if (!tasks[i].taskDate) {
        // Not dated tasks
        continue;
      } else if (endByDate.isBefore(taskDateStart)) {
        // taskDate is future date
        continue;
      } else if (
        !tasks[i].isRepeating &&
        startFromDate.isSameOrBefore(taskDateStart) &&
        endByDate.isSameOrAfter(taskDateStart)
      ) {
        // taskDate is in given range
        nextXDayTasks.push(tasks[i]);
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
        } else if (tasks[i].endByRepeatCount >= 0) {
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
          if (endByDate.isSameOrAfter(taskDateStart)) {
            nextXDayTasks.push(tasks[i]);
          }
        }
      }
    }
  }
  return nextXDayTasks;
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
    if (tasks[i].listId === listId && tasks[i].isDeleted === 0) {
      listTasks.push(tasks[i]);
    }
  }
  return listTasks;
};

export const getByTagId = ({ tasks, tagId }) => {
  const tagTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].tagIds.includes(tagId) && tasks[i].isDeleted === 0) {
      tagTasks.push(tasks[i]);
    }
  }
  return tagTasks;
};
