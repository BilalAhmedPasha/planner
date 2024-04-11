import { Layout, Typography, theme } from "antd";
import styled from "styled-components";

const StyledLayoutContent = styled(Layout.Content)`
  margin-right: 0.1rem;
  padding: 1rem 3rem;
  background: 
  background: ${({ bgColor }) => bgColor};
`;

const StyledText = styled(Typography.Text)`
    font-weight: bold;
    font-size: 24px;
`;

const HabitTracker = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <StyledLayoutContent bgColor={colorBgContainer}>
                <StyledText>{"Habits"}</StyledText>
            </StyledLayoutContent>
            <StyledLayoutContent bgColor={colorBgContainer}>
                <StyledText>{"Habit details"}</StyledText>
            </StyledLayoutContent>
        </>
    );
};

export default HabitTracker;
