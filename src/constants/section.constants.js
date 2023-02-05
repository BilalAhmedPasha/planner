import { ALL } from "./app.constants";
import { HIGH, LOW, MEDIUM, NONE } from "./priority.constants";

export const OVERDUE = "overdue";
export const TODAY = "today";
export const LATER = "later";
export const NODATE = "noDate";
export const MARKED = "marked";

export const TIME_SECTIONS = {
  [OVERDUE]: { sectionTitle: "OverDue", tasks: [], isOpenByDefault: true },
  [TODAY]: { sectionTitle: "Today", tasks: [], isOpenByDefault: true },
  [LATER]: { sectionTitle: "Later", tasks: [], isOpenByDefault: false },
  [NODATE]: { sectionTitle: "No Date", tasks: [], isOpenByDefault: false },
  [MARKED]: {
    sectionTitle: "Completed & Won't Do",
    tasks: [],
    isOpenByDefault: false,
  },
};

export const PRIORITY_SECTIONS = {
  [HIGH]: { sectionTitle: "High", tasks: [], isOpenByDefault: true },
  [MEDIUM]: { sectionTitle: "Medium", tasks: [], isOpenByDefault: true },
  [LOW]: { sectionTitle: "Low", tasks: [], isOpenByDefault: true },
  [NONE]: { sectionTitle: "None", tasks: [], isOpenByDefault: true },
  [MARKED]: {
    sectionTitle: "Completed & Won't Do",
    tasks: [],
    isOpenByDefault: false,
  },
};

export const TITLE_SECTIONS = {
  [ALL]: { sectionTitle: "All", tasks: [], isOpenByDefault: true },
  [MARKED]: {
    sectionTitle: "Completed & Won't Do",
    tasks: [],
    isOpenByDefault: false,
  },
};
