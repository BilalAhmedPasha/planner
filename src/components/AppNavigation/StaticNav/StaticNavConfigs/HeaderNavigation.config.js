import AllInboxIcon from "@mui/icons-material/AllInbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LoopIcon from "@mui/icons-material/Loop";


const taskNavConfigHeader = [
  {
    name: "All Tasks",
    icon: AllInboxIcon,
    redirectUrl: "/tasks/all",
  },
  {
    name: "Today",
    icon: TodayIcon,
    redirectUrl: "/tasks/today",
  },
  {
    name: "Next 7 Days",
    icon: DateRangeIcon,
    redirectUrl: "/tasks/next-7-days",
  },
  {
    name: "Undated",
    icon: EventBusyIcon,
    redirectUrl: "/tasks/undated",
  },
  {
    name: "Calendar View",
    icon: CalendarMonth,
    redirectUrl: "/calendar",
  },
  {
    name: "Habits",
    icon: LoopIcon,
    redirectUrl: "/habits",
  },
];

export default taskNavConfigHeader;
