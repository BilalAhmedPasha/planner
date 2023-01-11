import {
  InboxOutlined,
  CheckSquareOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteOutlined,
} from "@ant-design/icons";

export const defaultTaskNav1 = [
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
    icon: DeleteOutlined,
    redirectUrl: "/tasks/deleted",
  },
];
