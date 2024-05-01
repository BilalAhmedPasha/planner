import { theme } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LISTS, TAGS } from "../../../../constants/app.constants";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import TaskItem from "./TaskItem";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem ${(props) => (props.isInCollapse ? "0rem" : "1rem")};
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

const Card = ({
  user,
  messageApi,
  cardDetails,
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

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const id = cardDetails.id;

  const checkIfSelected = (id) => {
    return selectedTaskDetails?.find((each) => each.id === id);
  };

  const [showCheckBoxMenu, setShowCheckBoxMenu] = useState(false);
  function keyPress(e) {
    if (e.key === "Escape") {
      setShowCheckBoxMenu(false);
    }
  }
  const currentURL = useLocation();
  const navigateTo = useNavigate();
  return (
    <StyledDiv
      opacity={1}
      isSelected={checkIfSelected(id)}
      isInCollapse={isInCollapse}
      colorBgContainer={colorBgContainer}
      colorPrimaryBg={colorPrimaryBg}
      controlItemBgHover={controlItemBgHover}
      colorBgTextHover={colorBgTextHover}
      colorBorder={colorBorder}
      onClick={(e) => {
        e.stopPropagation();
        setShowCheckBoxMenu(false);
        if (e.nativeEvent.shiftKey) {
          setSelectedTaskDetails((prevState) => {
            if (!prevState.find((each) => each.id === cardDetails.id)) {
              return [...prevState, cardDetails];
            } else {
              if (selectedTaskDetails.length !== 1) {
                return prevState.filter((each) => each.id !== cardDetails.id);
              } else {
                return [...prevState];
              }
            }
          });
        } else {
          // TODO Check here
          const urlPath = currentURL.pathname.split("/");
          if (
            urlPath.length >= 4 &&
            (urlPath[2] === LISTS || urlPath[2] === TAGS)
          ) {
            navigateTo(
              `/${urlPath[1]}/${urlPath[2]}/${urlPath[3]}/${cardDetails.id}`
            );
          } else {
            navigateTo(`/${urlPath[1]}/${urlPath[2]}/${cardDetails.id}`);
          }
          setSelectedTaskDetails([cardDetails]);
        }
      }}
      onKeyDown={keyPress}
    >
      <TaskItem
        user={user}
        messageApi={messageApi}
        taskDetails={cardDetails}
        lists={lists}
        tags={tags}
        selectedTaskDetails={selectedTaskDetails}
        setSelectedTaskDetails={setSelectedTaskDetails}
        setShowCheckBoxMenu={setShowCheckBoxMenu}
        showCheckBoxMenu={showCheckBoxMenu}
      />
    </StyledDiv>
  );
};

export default Card;
