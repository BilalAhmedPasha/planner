import { PRIORITY, TIME } from "./sort.constants";
import { FlagOutlined, ClockCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledClockCircleOutlined = styled(ClockCircleOutlined)`
    font-size: 1rem;
`;

const StyledFlagOutlined = styled(FlagOutlined)`
    font-size: 1rem;
`;

export const moreMenuItemList = [
    {
        label: "Time",
        key: TIME,
        icon: <StyledClockCircleOutlined />,
    },
    {
        label: "Priority",
        key: PRIORITY,
        icon: <StyledFlagOutlined />,
    },
];
