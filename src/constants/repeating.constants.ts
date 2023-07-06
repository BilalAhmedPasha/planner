import { DAY, MONTH, WEEK } from "./dateTime.constants";

export const ENDLESS: string = "endless";
export const END_BY_DATE: string = "endByDate";
export const END_BY_REPEAT_COUNT: string = "endByRepeatCount";

interface RepeatMappingTypes {
  [key: string]: string;
}

export const repeatMapping: RepeatMappingTypes = {
  daily: DAY,
  weekly: WEEK,
  monthly: MONTH,
};
