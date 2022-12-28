import AllInboxIcon from "@mui/icons-material/AllInbox";
import InboxIcon from "@mui/icons-material/Inbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";

const taskNavConfigHeader = [
  {
    name: "All",
    icon: AllInboxIcon,
    redirectUrl: "/all",
  },
  {
    name: "Inbox",
    icon: InboxIcon,
    redirectUrl: "/inbox",
  },
  {
    name: "Today",
    icon: TodayIcon,
    redirectUrl: "/today",
  },
  {
    name: "Next 7 Days",
    icon: DateRangeIcon,
    redirectUrl: "/next-7-days",
  },
];

export default taskNavConfigHeader;
