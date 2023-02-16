import { theme } from "antd";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DELETED } from "../../../constants/app.constants";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import TaskItem from "./TaskItem";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0rem ${(props) => (props.isInCollapse ? "0rem" : "1rem")};
  opacity: ${(props) => props.opacity};
  border-bottom: 0.5px solid ${(props) => props.colorBorder};
  opacity: ${(props) => props.opacity};
  :hover {
    background-color: ${(props) =>
      props.isSelected ? props.colorPrimaryBg : props.colorBgTextHover};
  }
  background-color: ${(props) =>
    props.isSelected ? props.colorPrimaryBg : props.colorBgContainer};
  user-select: none;
`;

const ItemTypes = {
  CARD: "card",
};

const Card = ({
  user,
  messageApi,
  cardDetails,
  moveCard,
  findCard,
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
  const originalIndex = findCard(id)?.index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;
  const { sectionId } = useParams();

  // TODO
  const enableDragAndDrop = false;

  const checkIfSelected = (id) => {
    return selectedTaskDetails?.find((each) => each.id === id);
  };

  return (
    <StyledDiv
      ref={
        !enableDragAndDrop || sectionId === DELETED
          ? null
          : (node) => drag(drop(node)) || null
      }
      opacity={opacity}
      isSelected={checkIfSelected(id)}
      isInCollapse={isInCollapse}
      colorBgContainer={colorBgContainer}
      colorPrimaryBg={colorPrimaryBg}
      controlItemBgHover={controlItemBgHover}
      colorBgTextHover={colorBgTextHover}
      colorBorder={colorBorder}
    >
      <TaskItem
        user={user}
        messageApi={messageApi}
        taskDetails={cardDetails}
        lists={lists}
        tags={tags}
        selectedTaskDetails={selectedTaskDetails}
        setSelectedTaskDetails={setSelectedTaskDetails}
      />
    </StyledDiv>
  );
};

export default Card;
