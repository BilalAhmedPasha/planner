import { message } from "antd";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card.jsx";
import TaskListSection from "./TaskSection.jsx";
import { isTaskOverdue } from "./TaskUtils.js";
const ItemTypes = {
  CARD: "card",
};

const style = {
  padding: "0rem 1rem",
};

const Container = ({
  user,
  tasks,
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
}) => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const overdueTemp = [];
    const currentTemp = [];
    const completedTemp = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isCompleted || tasks[i].isWontDo) {
        completedTemp.push(tasks[i]);
      } else if (isTaskOverdue(tasks[i])) {
        overdueTemp.push(tasks[i]);
      } else {
        currentTemp.push(tasks[i]);
      }
    }
    setOverdueTasks(overdueTemp);
    setCurrentTasks(currentTemp);
    setCompletedTasks(completedTemp);
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
      {overdueTasks.length > 0 ? (
        <TaskListSection
          sectionTitle={"OverDue"}
          sectionTasks={overdueTasks}
          setSectionTasks={setOverdueTasks}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          setSelectedTaskDetails={setSelectedTaskDetails}
          messageApi={messageApi}
          user={user}
          isOpen={true}
        />
      ) : null}
      {overdueTasks.length > 0 ? (
        <TaskListSection
          sectionTitle={"Today & Later"}
          sectionTasks={currentTasks}
          setSectionTasks={setCurrentTasks}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          setSelectedTaskDetails={setSelectedTaskDetails}
          messageApi={messageApi}
          user={user}
          isOpen={true}
        />
      ) : (
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
                setSelectedTaskDetails={setSelectedTaskDetails}
              />
            ))}
        </div>
      )}
      {completedTasks.length > 0 ? (
        <TaskListSection
          sectionTitle={"Completed & Won't Do"}
          sectionTasks={completedTasks}
          setSectionTasks={setCompletedTasks}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          setSelectedTaskDetails={setSelectedTaskDetails}
          messageApi={messageApi}
          user={user}
        />
      ) : null}
      {contextHolder}
    </>
  );
};

export default Container;
