import { Typography, theme } from "antd";
import styled from "styled-components";
import { generateDate } from "../../../utils/habit.utils";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.5rem;
  opacity: ${(props) => props.opacity};
  &:hover {
    background-color: ${(props) =>
      props.isSelected ? props.colorPrimaryBg : props.colorBgTextHover};
  }
  background-color: ${(props) =>
    props.isSelected ? props.colorPrimaryBg : props.colorBgContainer};
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  user-select: none;
  cursor: pointer;
`;

const HabitItem = ({ details }) => {
  const {
    token: {
      colorBgContainer,
      controlItemBgHover,
      colorPrimaryBg,
      colorBgTextHover,
      colorBorder,
    },
  } = theme.useToken();

  const dates = generateDate();
  console.log(dates);
  
  return (
    <StyledDiv
      opacity={1}
      isSelected={false}
      colorBgContainer={colorBgContainer}
      colorPrimaryBg={colorPrimaryBg}
      controlItemBgHover={controlItemBgHover}
      colorBgTextHover={colorBgTextHover}
      colorBorder={colorBorder}
    >
      <div>
        <Typography.Text
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
          }}
          ellipsis={true}
        >
          {"Habit 1"}
        </Typography.Text>
      </div>
    </StyledDiv>
  );
};

export default HabitItem;
