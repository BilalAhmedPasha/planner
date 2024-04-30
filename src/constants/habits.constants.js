export const REPEAT_DAYS = "days";
export const REPEAT_INTERVAL = "interval";

export const REPEAT_OPTIONS = [
  {
    value: REPEAT_DAYS,
    label: "Days",
  },
  {
    value: REPEAT_INTERVAL,
    label: "Interval",
  },
];

export const DEFAULT_REPEAT_CRITERIA = {
  days: [1, 1, 1, 1, 1, 1, 1],
  interval: 2,
};

export const HABIT_MARKED_NOT_DONE = -1;
export const HABIT_UNMARKED = 0;
export const HABIT_MARKED_DONE = 1;

