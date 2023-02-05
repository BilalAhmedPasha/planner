import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  TASK_CARD_BG_HOVER_COLOR,
  TASK_CARD_BG_SELECTED_COLOR,
  TASK_CARD_BOX_SHADOW_COLOR,
  WHITE,
} from "../../../../constants/color.constants";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import TaskItem from "./TaskItem";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem ${(props) => (props.isInCollapse ? "0rem" : "1rem")};
  opacity: ${(props) => props.opacity};
  boxshadow: 0px 2px 8px 0px ${TASK_CARD_BOX_SHADOW_COLOR};
  background-color: ${(props) =>
    props.isSelected ? TASK_CARD_BG_SELECTED_COLOR : WHITE};
  opacity: ${(props) => props.opacity};

  :hover {
    background-color: ${(props) =>
      props.isSelected
        ? TASK_CARD_BG_SELECTED_COLOR
        : TASK_CARD_BG_HOVER_COLOR};
  }
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
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
  isInCollapse,
}) => {
  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const id = cardDetails.id;
  const originalIndex = findCard(id).index;

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

  return (
    <StyledDiv
      ref={(node) => drag(drop(node))}
      opacity={opacity}
      isSelected={selectedCardId === id}
      isInCollapse={isInCollapse}
    >
      <TaskItem
        user={user}
        messageApi={messageApi}
        taskDetails={cardDetails}
        lists={lists}
        tags={tags}
        setSelectedCardId={setSelectedCardId}
        setSelectedTaskDetails={setSelectedTaskDetails}
      />
    </StyledDiv>
  );
};

export default Card;
