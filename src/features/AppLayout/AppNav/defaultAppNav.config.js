import { MdCalendarMonth } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

export const defaultAppNav = [
    {
        label: "Tasks",
        icon: GoTasklist,
        redirectUrl: "/tasks/all",
        id: "tasks",
    },
    {
        label: "Calendar",
        icon: MdCalendarMonth,
        redirectUrl: "/calendar",
        id: "calendar",
    },
    // {
    //   label: "Habits",
    //   icon: RedoOutlined,
    //   redirectUrl: "/habits",
    //   id: "habits",
    // },
];
