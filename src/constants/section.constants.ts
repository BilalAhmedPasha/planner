import { ALL } from "./app.constants";
import { HIGH, LOW, MEDIUM, NONE } from "./priority.constants";

export const OVERDUE: string = "overdue";
export const TODAY: string = "today";
export const LATER: string = "later";
export const NODATE: string = "noDate";
export const MARKED: string = "marked";

export const OVERDUE_TITLE: string = "OverDue";
export const TODAY_TITLE: string = "Today";
export const LATER_TITLE: string = "Later";
export const NODATE_TITLE: string = "No Date";
export const MARKED_TITLE: string = "Completed & Won't Do";

interface TimeSection {
  sectionKey: string;
  sectionTitle: string;
  tasks: any[];
  isOpenByDefault: boolean;
}

export const TIME_SECTIONS: { [key: string]: TimeSection } = {
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

interface PrioritySection {
  sectionKey: string;
  sectionTitle: string;
  tasks: any[];
  isOpenByDefault: boolean;
}

export const PRIORITY_SECTIONS: { [key: string]: PrioritySection } = {
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

interface TitleSection {
  sectionKey: string;
  sectionTitle: string;
  tasks: any[];
  isOpenByDefault: boolean;
}

export const TITLE_SECTIONS: { [key: string]: TitleSection } = {
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

export const activePanel: string[] = [
  OVERDUE,
  TODAY,
  LATER,
  NODATE,
  HIGH,
  MEDIUM,
  LOW,
  NONE,
];
