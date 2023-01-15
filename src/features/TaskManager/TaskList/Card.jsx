import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import TaskItem from "./TaskItem";

const ItemTypes = {
  CARD: "card",
};

const style = {
  padding: "1rem 1rem",
  margin: "0.5rem 0rem",
  backgroundColor: "white",
  boxShadow: "0px 2px 8px 0px #E8E8E8",
  cursor: "move",
};
const Card = ({ key, cardDetails, moveCard, findCard }) => {
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
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      <TaskItem taskDetails={cardDetails} lists={lists} tags={tags} />
    </div>
  );
};

export default Card;
