export const OVERDUE = "overdue";
export const TODAY = "today";
export const LATER = "later";
export const NODATE = "noDate";
export const MARKED = "marked";

export const INITIAL_SECTIONS = {
  [OVERDUE]: { sectionTitle: "OverDue", tasks: [] },
  [TODAY]: { sectionTitle: "Today", tasks: [] },
  [LATER]: { sectionTitle: "Later", tasks: [] },
  [NODATE]: { sectionTitle: "No Date", tasks: [] },
  [MARKED]: { sectionTitle: "Completed & Won't Do", tasks: [] },
};
