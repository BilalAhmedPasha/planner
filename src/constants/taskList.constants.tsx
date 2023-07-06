import { PRIORITY, TIME } from "./sort.constants";
import { FlagOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

interface MenuItem {
  label: string;
  key: string;
  icon: ReactNode;
}

export const moreMenuItemList: MenuItem[] = [
  {
    label: "Time",
    key: TIME,
    icon: <ClockCircleOutlined style={{ fontSize: "1rem" }} />,
  },
  {
    label: "Priority",
    key: PRIORITY,
    icon: <FlagOutlined style={{ fontSize: "1rem" }} />,
  },
];
