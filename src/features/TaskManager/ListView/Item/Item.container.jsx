import { theme } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import TaskItem from "./Item";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem ${(props) => (props.$isInCollapse ? "0rem" : "1rem")};
  opacity: ${(props) => props.opacity};
  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? props.$colorPrimaryBg : props.$colorBgTextHover};
  }
  background-color: ${(props) =>
    props.$isSelected ? props.$colorPrimaryBg : props.$colorBgContainer};
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  user-select: none;
  cursor: pointer;
`;

const ItemContainer = ({
  user,
  messageApi,
  taskDetails,
  selectedTaskDetails,
  setSelectedTaskDetails,
  isInCollapse,
}) => {
  const {
    token: {
      colorBgContainer,
      controlItemBgHover,
      colorPrimaryBg,
      colorBgTextHover,
      colorBorder,
    },
  } = theme.useToken();


  const id = taskDetails.id;

  const checkIfSelected = (id) => {
    return selectedTaskDetails?.find((each) => each.id === id);
  };

  const [showCheckBoxMenu, setShowCheckBoxMenu] = useState(false);
  function keyPress(e) {
    if (e.key === "Escape") {
      setShowCheckBoxMenu(false);
    }
  }
  return (
    <StyledDiv
      opacity={1}
      $isSelected={checkIfSelected(id)}
      $isInCollapse={isInCollapse}
      $colorBgContainer={colorBgContainer}
      $colorPrimaryBg={colorPrimaryBg}
      $controlItemBgHover={controlItemBgHover}
      $colorBgTextHover={colorBgTextHover}
      $colorBorder={colorBorder}
      onKeyDown={keyPress}
    >
      <TaskItem
        user={user}
        messageApi={messageApi}
        taskDetails={taskDetails}
        selectedTaskDetails={selectedTaskDetails}
        setSelectedTaskDetails={setSelectedTaskDetails}
        setShowCheckBoxMenu={setShowCheckBoxMenu}
        showCheckBoxMenu={showCheckBoxMenu}
      />
    </StyledDiv>
  );
};

export default ItemContainer;
