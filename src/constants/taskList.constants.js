import { PRIORITY, TIME } from "./sort.constants";
import { FlagOutlined, ClockCircleOutlined } from "@ant-design/icons";

export const moreMenuItemList = [
    {
        label: "Time",
        key: TIME,
        icon: (
            <ClockCircleOutlined
                style={{
                    fontSize: "1rem",
                }}
            />
        ),
    },
    {
        label: "Priority",
        key: PRIORITY,
        icon: (
            <FlagOutlined
                style={{
                    fontSize: "1rem",
                }}
            />
        ),
    },
];
