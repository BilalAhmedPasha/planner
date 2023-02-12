import { ALL } from "./app.constants";
import { HIGH, LOW, MEDIUM, NONE } from "./priority.constants";

export const OVERDUE = "overdue";
export const TODAY = "today";
export const LATER = "later";
export const NODATE = "noDate";
export const MARKED = "marked";

export const OVERDUE_TITLE = "OverDue";
export const TODAY_TITLE = "Today";
export const LATER_TITLE = "Later";
export const NODATE_TITLE = "No Date";
export const MARKED_TITLE = "Completed & Won't Do";

export const TIME_SECTIONS = {
  [OVERDUE]: {
    sectionKey: OVERDUE,
    sectionTitle: OVERDUE_TITLE,
    tasks: [],
    isOpenByDefault: true,
  },
  [TODAY]: {
    sectionKey: TODAY,
    sectionTitle: TODAY_TITLE,
    tasks: [],
    isOpenByDefault: true,
  },
  [LATER]: {
    sectionKey: LATER,
    sectionTitle: LATER_TITLE,
    tasks: [],
    isOpenByDefault: false,
  },
  [NODATE]: {
    sectionKey: NODATE,
    sectionTitle: NODATE_TITLE,
    tasks: [],
    isOpenByDefault: false,
  },
  [MARKED]: {
    sectionKey: MARKED,
    sectionTitle: MARKED_TITLE,
    tasks: [],
    isOpenByDefault: false,
  },
};

export const PRIORITY_SECTIONS = {
  [HIGH]: {
    sectionKey: HIGH,
    sectionTitle: HIGH,
    tasks: [],
    isOpenByDefault: true,
  },
  [MEDIUM]: {
    sectionKey: MEDIUM,
    sectionTitle: MEDIUM,
    tasks: [],
    isOpenByDefault: true,
  },
  [LOW]: {
    sectionKey: LOW,
    sectionTitle: LOW,
    tasks: [],
    isOpenByDefault: true,
  },
  [NONE]: {
    sectionKey: NONE,
    sectionTitle: NONE,
    tasks: [],
    isOpenByDefault: true,
  },
  [MARKED]: {
    sectionKey: MARKED,
    sectionTitle: MARKED_TITLE,
    tasks: [],
    isOpenByDefault: false,
  },
};

export const TITLE_SECTIONS = {
  [ALL]: {
    sectionKey: ALL,
    sectionTitle: "All",
    tasks: [],
    isOpenByDefault: true,
  },
  [MARKED]: {
    sectionKey: MARKED,
    sectionTitle: MARKED_TITLE,
    tasks: [],
    isOpenByDefault: false,
  },
};

export const activePanel = [OVERDUE, TODAY, LATER, NODATE, HIGH, MEDIUM, LOW, NONE];
