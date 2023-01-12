import {
  FormOutlined,
  CalendarOutlined,
  RedoOutlined,
} from "@ant-design/icons";

export const defaultAppNav = [
  {
    label: "Inbox",
    icon: FormOutlined,
    redirectUrl: "/tasks/inbox",
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
