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
