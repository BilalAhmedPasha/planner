import {
  InboxOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  RedoOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteOutlined,
} from "@ant-design/icons";

export const defaultSideNav1 = [
  {
    label: "All Tasks",
    icon: InboxOutlined,
    redirectUrl: "/tasks/all",
  },
  {
    label: "Today",
    icon: CheckSquareOutlined,
    redirectUrl: "/tasks/today",
  },
  {
    label: "Calendar",
    icon: CalendarOutlined,
    redirectUrl: "/calendar",
  },
  {
    label: "Habits",
    icon: RedoOutlined,
    redirectUrl: "/habits",
  },
];

export const defaultSideNav2 = [
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
    icon: DeleteOutlined,
    redirectUrl: "/tasks/deleted",
  },
];
