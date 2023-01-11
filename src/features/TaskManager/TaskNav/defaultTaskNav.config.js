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

export const defaultTaskNav1 = [
  {
    label: "All Tasks",
    icon: ProfileOutlined,
    redirectUrl: "/tasks/all",
  },
  {
    label: "Inbox",
    icon: InboxOutlined,
    redirectUrl: "/tasks/inbox",
  },
  {
    label: "Today",
    icon: CheckSquareOutlined,
    redirectUrl: "/tasks/today",
  },
  {
    label: "Tomorrow",
    icon: RightSquareOutlined,
    redirectUrl: "/tasks/tomorrow",
  },
  {
    label: "Next 7 Days",
    icon: CarryOutOutlined,
    redirectUrl: "/tasks/next-7-days",
  },
];

export const defaultTaskNav2 = [
  {
    label: "Completed",
    icon: CheckSquareFilled,
    redirectUrl: "/tasks/completed",
  },
  {
    label: "Won't Do",
    icon: CloseSquareFilled,
    redirectUrl: "/tasks/wont-do",
  },
  {
    label: "Deleted",
    icon: DeleteFilled,
    redirectUrl: "/tasks/deleted",
  },
];
