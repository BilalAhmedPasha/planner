import {
  InboxOutlined,
  CheckSquareOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteFilled,
  CarryOutOutlined,
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
    id: "next7Days",
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
    id: "wontDo",
  },
  {
    label: "Deleted",
    icon: DeleteFilled,
    redirectUrl: `/tasks/${DELETED}`,
    id: "deleted",
  },
];
