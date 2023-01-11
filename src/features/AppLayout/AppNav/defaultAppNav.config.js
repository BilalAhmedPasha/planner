import {
  FormOutlined,
  CalendarOutlined,
  RedoOutlined,
} from "@ant-design/icons";

export const defaultAppNav = [
  {
    label: "Tasks",
    icon: FormOutlined,
    redirectUrl: "/tasks/all",
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
