import {
  InboxOutlined,
  CheckSquareOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteFilled,
  CarryOutOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
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
} from "../../../constants/app.constants";

export const defaultTaskNav1 = [
  {
    label: "All",
    icon: ProfileOutlined,
    redirectUrl: `/tasks/${ALL}`,
    id: "all",
  },
  {
    label: "Inbox",
    icon: InboxOutlined,
    redirectUrl: `/tasks/${INBOX}`,
    id: "inbox",
  },
  {
    label: "Today",
    icon: CheckSquareOutlined,
    redirectUrl: `/tasks/${TODAY}`,
    id: "today",
  },
  {
    label: "Tomorrow",
    icon: RightSquareOutlined,
    redirectUrl: `/tasks/${TOMORROW}`,
    id: "tomorrow",
  },
  {
    label: "Next 7 Days",
    icon: CarryOutOutlined,
    redirectUrl: `/tasks/${NEXT_7_DAYS}`,
    id: "next-7-days",
  },
  {
    label: "No Date",
    icon: ClockCircleOutlined,
    redirectUrl: `/tasks/${NO_DATE}`,
    id: "no-date",
  },
];

export const defaultTaskNav2 = [
  {
    label: "Completed",
    icon: CheckSquareFilled,
    redirectUrl: `/tasks/${COMPLETED}`,
    id: "completed",
  },
  {
    label: "Won't Do",
    icon: CloseSquareFilled,
    redirectUrl: `/tasks/${WONT_DO}`,
    id: "wont-do",
  },
  {
    label: "Deleted",
    icon: DeleteFilled,
    redirectUrl: `/tasks/${DELETED}`,
    id: "deleted",
  },
];
