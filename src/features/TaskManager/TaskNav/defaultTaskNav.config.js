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
  },
  {
    label: "Inbox",
    icon: InboxOutlined,
    redirectUrl: `/tasks/${INBOX}`,
  },
  {
    label: "Today",
    icon: CheckSquareOutlined,
    redirectUrl: `/tasks/${TODAY}`,
  },
  {
    label: "Tomorrow",
    icon: RightSquareOutlined,
    redirectUrl: `/tasks/${TOMORROW}`,
  },
  {
    label: "Next 7 Days",
    icon: CarryOutOutlined,
    redirectUrl: `/tasks/${NEXT_7_DAYS}`,
  },
];

export const defaultTaskNav2 = [
  {
    label: "Completed",
    icon: CheckSquareFilled,
    redirectUrl: `/tasks/${COMPLETED}`,
  },
  {
    label: "Won't Do",
    icon: CloseSquareFilled,
    redirectUrl: `/tasks/${WONT_DO}`,
  },
  {
    label: "Deleted",
    icon: DeleteFilled,
    redirectUrl: `/tasks/${DELETED}`,
  },
];
