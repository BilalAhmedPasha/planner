import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "./color.constants";

export const HIGH = "HIGH";
export const MEDIUM = "MEDIUM";
export const LOW = "LOW";
export const NONE = "NONE";

export const priorityOptions = [
  {
    key: HIGH,
    value: HIGH,
    label: "High",
    color: HIGH_COLOR,
  },
  {
    key: MEDIUM,
    value: MEDIUM,
    label: "Medium",
    color: MEDIUM_COLOR,
  },
  {
    key: LOW,
    value: LOW,
    label: "Low",
    color: LOW_COLOR,
  },
  {
    key: NONE,
    value: NONE,
    label: "None",
    color: NONE_COLOR,
  },
];

export const priorityColorMappings = {
  [HIGH]: HIGH_COLOR,
  [MEDIUM]: MEDIUM_COLOR,
  [LOW]: LOW_COLOR,
  [NONE]: NONE_COLOR,
};
