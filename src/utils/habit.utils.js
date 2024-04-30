import { DAY } from "../constants/dateTime.constants";
import { REPEAT_DAYS, REPEAT_INTERVAL } from "../constants/habits.constants";
import dayjs from "../utils/dateTime.utils";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // Prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i).startOf(DAY),
    });
  }

  // Month dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i).startOf(DAY),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  // Suffix dates
  const remaining = 42 - arrayOfDate.length;
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i).startOf(DAY),
    });
  }

  return arrayOfDate;
};

export const getLast7Days = () => {
  const dates = [];
  const today = dayjs().startOf("day");
  for (let i = 0; i < 7; i++) {
    const date = today.subtract(i, "day").toDate();
    dates.unshift(date);
  }
  return dates;
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const checkIfValidDate = ({ date, habit }) => {
  if (dayjs(habit.startDate).isAfter(date)) {
    return false;
  }
  if (habit.endDate && dayjs(habit.endDate).isBefore(date)) {
    return false;
  }
  // Repeat by day check
  if (habit.frequency === REPEAT_DAYS) {
    if (habit.repeatCriteria.days[date.day()] === 0) {
      return false;
    }
  }
  // Repeat by interval check
  if (habit.frequency === REPEAT_INTERVAL) {
    if (
      date.diff(dayjs(habit.startDate), "day") %
        habit.repeatCriteria.interval !==
      0
    ) {
      return false;
    }
  }
  return true;
};
