import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "./color.constants";

export const HIGH: string = "High";
export const MEDIUM: string = "Medium";
export const LOW: string = "Low";
export const NONE: string = "None";

interface PriorityColorMappingsTypes {
  [key: string]: string;
}

export const priorityOptions: PriorityColorMappingsTypes[] = [
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

export const priorityColorMappings: PriorityColorMappingsTypes = {
  [HIGH]: HIGH_COLOR,
  [MEDIUM]: MEDIUM_COLOR,
  [LOW]: LOW_COLOR,
  [NONE]: NONE_COLOR,
};
