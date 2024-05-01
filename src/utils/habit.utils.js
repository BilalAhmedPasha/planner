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

  let today = dayjs().startOf(DAY);
  // Prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    let ithDate = firstDateOfMonth.day(i).startOf(DAY);
    arrayOfDate.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i).startOf(DAY),
      isPast: ithDate.isBefore(today),
      isToday: ithDate.isSame(today),
      isFuture: ithDate.isAfter(today),
    });
  }

  // Current month dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    let ithDate = firstDateOfMonth.date(i).startOf(DAY);
    arrayOfDate.push({
      currentMonth: true,
      date: ithDate,
      isPast: ithDate.isBefore(today),
      isToday: ithDate.isSame(today),
      isFuture: ithDate.isAfter(today),
    });
  }

  // Suffix dates
  const remaining = 42 - arrayOfDate.length;
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    let ithDate = firstDateOfMonth.day(i).startOf(DAY);
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i).startOf(DAY),
      isPast: ithDate.isBefore(today),
      isToday: ithDate.isSame(today),
      isFuture: ithDate.isAfter(today),
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
