import { message } from "antd";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card.jsx";
import TaskListSection from "./TaskSection.jsx";
const ItemTypes = {
  CARD: "card",
};

const style = {
  padding: "0rem 1rem",
};

const Container = ({ user, tasks, selectedCardId, setSelectedCardId }) => {
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const completedTemp = [];
    const currentTemp = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isCompleted || tasks[i].isWontDo) {
        completedTemp.push(tasks[i]);
      } else {
        currentTemp.push(tasks[i]);
      }
    }
    setCompletedTasks(completedTemp);
    setCurrentTasks(currentTemp);
  }, [tasks]);

  const findCurrentTask = useCallback(
    (id) => {
      const card = currentTasks.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: currentTasks.indexOf(card),
      };
    },
    [currentTasks]
  );

  const moveCurrentTask = useCallback(
    (id, atIndex) => {
      const { card, index } = findCurrentTask(id);
      setCurrentTasks(
        update(currentTasks, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCurrentTask, currentTasks, setCurrentTasks]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      <div ref={drop} style={style}>
      {currentTasks &&
        currentTasks.map((card) => (
          <Card
            user={user}
            messageApi={messageApi}
            key={card.id}
            cardDetails={card}
            moveCard={moveCurrentTask}
            findCard={findCurrentTask}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
        ))}
      {contextHolder}
      </div>
      <TaskListSection
        sectionTitle={"Completed & Won't Do"}
        sectionTasks={completedTasks}
        setSectionTasks={setCompletedTasks}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        messageApi={messageApi}
        user={user}
      />
    </>
  );
};

export default Container;
