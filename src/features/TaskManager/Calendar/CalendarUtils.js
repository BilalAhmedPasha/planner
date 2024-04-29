import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  MONTHLY,
  WEEKLY,
} from "../../../constants/repeating.constants";
import dayjs from "dayjs";

export const calculateCalendarEvents = ({
  tasks,
  viewStartDate,
  viewEndDate,
}) => {
  const taskEventList = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isDeleted && tasks[i].taskDate !== null) {
      if (tasks[i].isRepeating) {
        for (
          let currentDate = new Date(viewStartDate.getTime());
          currentDate <= viewEndDate;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          // Task is excluded on given date from the repeating cycle
          if (
            tasks[i]?.excludedDates?.some(
              (d) => new Date(d).getTime() === new Date(currentDate).getTime()
            )
          ) {
            continue;
          }

          // Task has ended before the given date
          if (tasks[i].endBy === END_BY_DATE) {
            if (
              currentDate.getTime() > new Date(tasks[i].endByDate).getTime()
            ) {
              continue;
            }
          }
          if (tasks[i].endBy === END_BY_REPEAT_COUNT) {
            if (
              currentDate.getTime() >
              new Date(tasks[i].endByRepeatCountDate).getTime()
            ) {
              continue;
            }
          }

          // If weekly repeating task and current date does not differ by week
          if (tasks[i].repeatFrequency === WEEKLY) {
            if (
              Math.abs(
                currentDate.getTime() - new Date(tasks[i].taskDate).getTime()
              ) %
                604800000 !==
              0
            ) {
              continue;
            }
          }

          // If monthly repeating task and current date does not differ by month
          if (tasks[i].repeatFrequency === MONTHLY) {
            if (
              currentDate.getDate() !== new Date(tasks[i].taskDate).getDate()
            ) {
              continue;
            }
          }

          if (new Date(tasks[i].taskDate).getTime() <= currentDate.getTime()) {
            // Check if tasks[i] is valid on currentDate
            if (tasks[i].isAllDay) {
              taskEventList.push({
                ...tasks[i],
                name: tasks[i].name,
                isPlaceHolderForRepeatingTask:
                  new Date(tasks[i].taskDate).getTime() ===
                  currentDate.getTime()
                    ? false
                    : true,
                repeatingTaskReferenceId:
                  new Date(tasks[i].taskDate).getTime() ===
                  currentDate.getTime()
                    ? null
                    : tasks[i].id,
                taskDate: currentDate.toISOString(),
                start: dayjs(currentDate).toDate(),
                end: dayjs(currentDate).toDate(),
                allDay: true,
              });
            } else {
              const startTimeStamp = new Date(
                currentDate.toString().replace("00:00:00", tasks[i].startTime)
              );
              const endTimeStamp = new Date(
                currentDate.toString().replace("00:00:00", tasks[i].endTime)
              );
              taskEventList.push({
                ...tasks[i],
                name: tasks[i].name,
                isPlaceHolderForRepeatingTask:
                  new Date(tasks[i].taskDate).getTime() ===
                  currentDate.getTime()
                    ? false
                    : true,
                repeatingTaskReferenceId:
                  new Date(tasks[i].taskDate).getTime() ===
                  currentDate.getTime()
                    ? null
                    : tasks[i].id,
                taskDate: currentDate.toISOString(),
                start: dayjs(startTimeStamp).toDate(),
                end: dayjs(endTimeStamp).toDate(),
                allDay: false,
              });
            }
          }
        }
      } else {
        if (tasks[i].isAllDay) {
          taskEventList.push({
            ...tasks[i],
            name: tasks[i].name,
            start: dayjs(tasks[i].taskDate).toDate(),
            end: dayjs(tasks[i].taskDate).toDate(),
            allDay: true,
          });
        } else {
          const startTimeStamp = tasks[i].taskDate.replace(
            "00:00:00",
            tasks[i].startTime
          );
          const endTimeStamp = tasks[i].taskDate.replace(
            "00:00:00",
            tasks[i].endTime
          );
          taskEventList.push({
            ...tasks[i],
            name: tasks[i].name,
            start: dayjs(startTimeStamp).toDate(),
            end: dayjs(endTimeStamp).toDate(),
            allDay: false,
          });
        }
      }
    }
  }
  return taskEventList;
};
