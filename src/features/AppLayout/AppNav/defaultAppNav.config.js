import { MdCalendarMonth } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { TbRepeat } from "react-icons/tb";

export const defaultAppNav = [
  {
    label: "Tasks",
    icon: GoTasklist,
    redirectUrl: "/tasks/today",
    id: "tasks",
  },
  {
    label: "Calendar",
    icon: MdCalendarMonth,
    redirectUrl: "/calendar",
    id: "calendar",
  },
  {
    label: "Habits",
    icon: TbRepeat,
    redirectUrl: "/habits",
    id: "habits",
  },
];
