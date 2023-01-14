import { Button, Checkbox, Typography } from "antd";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import TaskItem from "./TaskItem";

const ItemTypes = {
  CARD: "card",
};

const style = {
  border: "1px dashed gray",
  padding: "1rem 1rem",
  margin: "0.5rem 0rem",
  backgroundColor: "white",
  // cursor: "move",
};
const Card = ({ id, text, moveCard, findCard }) => {
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
  const StyledCheckBox = styled(Checkbox)`
    .ant-checkbox-inner,
    .ant-checkbox-input {
      transform: scale(1.25);
    }
  `;
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      <TaskItem />
    </div>
  );
};

export default React.memo(Card);
