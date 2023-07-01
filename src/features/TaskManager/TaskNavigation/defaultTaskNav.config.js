import {
  ALL,
  COMPLETED,
  DELETED,
  INBOX,
  NEXT_7_DAYS,
  TODAY,
  TOMORROW,
  NO_DATE,
  WONT_DO,
  DELETE,
} from "../../../constants/app.constants";

import { EDIT } from "../../../constants/formType.constants";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const defaultTaskNav1 = [
  {
    label: "All",
    icon: AssignmentOutlinedIcon,
    redirectUrl: `/tasks/${ALL}`,
    id: "all",
  },
  {
    label: "Inbox",
    icon: InboxOutlinedIcon,
    redirectUrl: `/tasks/${INBOX}`,
    id: "inbox",
  },
  {
    label: "Today",
    icon: TodayOutlinedIcon,
    redirectUrl: `/tasks/${TODAY}`,
    id: "today",
  },
  {
    label: "Tomorrow",
    icon: UpcomingOutlinedIcon,
    redirectUrl: `/tasks/${TOMORROW}`,
    id: "tomorrow",
  },
  {
    label: "Next 7 Days",
    icon: DateRangeOutlinedIcon,
    redirectUrl: `/tasks/${NEXT_7_DAYS}`,
    id: "next-7-days",
  },
  {
    label: "No Date",
    icon: EventBusyOutlinedIcon,
    redirectUrl: `/tasks/${NO_DATE}`,
    id: "no-date",
  },
];

export const defaultTaskNav2 = [
  {
    label: "Completed",
    icon: DoneIcon,
    redirectUrl: `/tasks/${COMPLETED}`,
    id: "completed",
  },
  {
    label: "Won't Do",
    icon: CloseIcon,
    redirectUrl: `/tasks/${WONT_DO}`,
    id: "wont-do",
  },
  {
    label: "Deleted",
    icon: DeleteOutlineIcon,
    redirectUrl: `/tasks/${DELETED}`,
    id: "deleted",
  },
];

export const moreMenuItemList = [
  {
    label: "Edit",
    key: EDIT,
  },
  {
    label: "Delete",
    key: DELETE,
  },
];
