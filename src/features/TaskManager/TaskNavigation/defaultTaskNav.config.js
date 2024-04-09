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
import { MdOutlineListAlt } from "react-icons/md";
import { MdOutlineInbox } from "react-icons/md";
import { MdOutlineToday } from "react-icons/md";
import { MdOutlineUpcoming } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineEventBusy } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export const defaultTaskNav1 = [
  {
    label: "All",
    icon: MdOutlineListAlt,
    redirectUrl: `/tasks/${ALL}`,
    id: "all",
  },
  {
    label: "Inbox",
    icon: MdOutlineInbox,
    redirectUrl: `/tasks/${INBOX}`,
    id: "inbox",
  },
  {
    label: "Today",
    icon: MdOutlineToday,
    redirectUrl: `/tasks/${TODAY}`,
    id: "today",
  },
  {
    label: "Tomorrow",
    icon: MdOutlineUpcoming,
    redirectUrl: `/tasks/${TOMORROW}`,
    id: "tomorrow",
  },
  {
    label: "Next 7 Days",
    icon: MdOutlineDateRange,
    redirectUrl: `/tasks/${NEXT_7_DAYS}`,
    id: "next-7-days",
  },
  {
    label: "No Date",
    icon: MdOutlineEventBusy,
    redirectUrl: `/tasks/${NO_DATE}`,
    id: "no-date",
  },
];

export const defaultTaskNav2 = [
  {
    label: "Completed",
    icon: MdOutlineDone,
    redirectUrl: `/tasks/${COMPLETED}`,
    id: "completed",
  },
  {
    label: "Won't Do",
    icon: MdOutlineClose,
    redirectUrl: `/tasks/${WONT_DO}`,
    id: "wont-do",
  },
  {
    label: "Deleted",
    icon: MdDeleteOutline,
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
