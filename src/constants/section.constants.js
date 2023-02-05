export const OVERDUE = "overdue";
export const TODAY = "today";
export const LATER = "later";
export const NODATE = "noDate";
export const MARKED = "marked";

export const INITIAL_SECTIONS = {
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
