import {
  FormOutlined,
  CalendarOutlined,
  // RedoOutlined,
} from "@ant-design/icons";

export const defaultAppNav = [
  {
    label: "Tasks",
    icon: FormOutlined,
    redirectUrl: "/tasks/all",
    id: "tasks",
  },
  {
    label: "Calendar",
    icon: CalendarOutlined,
    redirectUrl: "/calendar",
    id: "calendar",
  },
  // {
  //   label: "Habits",
  //   icon: RedoOutlined,
  //   redirectUrl: "/habits",
  //   id: "habits",
  // },
];
