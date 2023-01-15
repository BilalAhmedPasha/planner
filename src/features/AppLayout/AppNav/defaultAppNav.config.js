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
    id: "inbox",
  },
  {
    label: "Calendar",
    icon: CalendarOutlined,
    redirectUrl: "/calendar",
    id: "calendar",
  },
  {
    label: "Habits",
    icon: RedoOutlined,
    redirectUrl: "/habits",
    id: "habits",
  },
];
