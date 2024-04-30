import styled from "styled-components";

const DaySelector = styled.div`
  height: ${props => props.height}rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  fontsize: 1.15rem;
  cursor: pointer;
  border-radius: 50%;
  color: ${(props) => (props.isSelected ? "#ffffff" : props.colorTextBase)};
  background-color: ${(props) =>
    !props.isSelected ? props.colorBgContainer : props.colorPrimary};
  &:hover {
    background-color: ${(props) =>
      !props.isSelected ? props.colorBgTextHover : props.colorPrimary};
  }
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default DaySelector;
