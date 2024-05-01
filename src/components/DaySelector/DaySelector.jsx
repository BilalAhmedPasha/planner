import styled from "styled-components";
import { HABIT_MARKED_DONE, HABIT_MARKED_NOT_DONE, HABIT_UNMARKED } from "../../constants/habits.constants";

const DaySelector = styled.div`
  height: ${(props) => props.height}rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  fontsize: 1.15rem;
  cursor: ${(props) => props.cursor};
  border-radius: 50%;
  color: ${(props) => (props.isSelected ? "#ffffff" : props.colorTextBase)};
  background-color: ${(props) => {
    if (props.markedValue === HABIT_MARKED_DONE) {
      return props.colorSuccess;
    } else if (props.markedValue === HABIT_MARKED_NOT_DONE) {
      return props.colorError;
    }
    return !props.isSelected ? props.colorBgContainer : props.colorPrimary;
  }};
  &:hover {
    background-color: ${(props) => {
      if (props.markedValue === HABIT_UNMARKED) {
        return props.isValidDate
          ? props.colorBgTextHover
          : props.isSelected
          ? props.colorPrimary
          : props.colorBgContainer;
      }
    }};
  }
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default DaySelector;
