import { message } from "antd";
import React, { useEffect, useState } from "react";
import {
  MARKED,
  INITIAL_SECTIONS,
  LATER,
  NODATE,
  OVERDUE,
  TODAY,
} from "../../../../constants/section.constants.js";
import TaskListSection from "./TaskSection.jsx";
import { isTaskOverdue } from "./TaskUtils.js";

const Container = ({
  user,
  tasks,
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
}) => {
  const [sectionalTasks, setSectionalTasks] = useState(INITIAL_SECTIONS);

  useEffect(() => {
    const overdueTemp = [];
    const currentTemp = [];
    const completedTemp = [];
    const noDateTemp = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isCompleted || tasks[i].isWontDo) {
        completedTemp.push(tasks[i]);
      } else if (tasks[i].taskDate === null) {
        noDateTemp.push(tasks[i]);
      } else if (isTaskOverdue(tasks[i])) {
        overdueTemp.push(tasks[i]);
      } else {
        currentTemp.push(tasks[i]);
      }
    }
    setSectionalTasks({
      [OVERDUE]: { ...INITIAL_SECTIONS[OVERDUE], tasks: overdueTemp },
      [TODAY]: { ...INITIAL_SECTIONS[TODAY], tasks: currentTemp },
      [LATER]: { ...INITIAL_SECTIONS[LATER], tasks: currentTemp },
      [NODATE]: { ...INITIAL_SECTIONS[NODATE], tasks: noDateTemp },
      [MARKED]: { ...INITIAL_SECTIONS[MARKED], tasks: completedTemp },
    });
  }, [tasks]);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {Object.keys(sectionalTasks).map((each) => {
        return sectionalTasks[each].tasks.length > 0 ? (
          <TaskListSection
            sectionTitle={sectionalTasks[each].sectionTitle}
            sectionId={each}
            sectionTasks={sectionalTasks[each].tasks}
            setSectionTasks={setSectionalTasks}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            setSelectedTaskDetails={setSelectedTaskDetails}
            messageApi={messageApi}
            user={user}
            isOpen={true}
          />
        ) : null;
      })}
      {contextHolder}
    </>
  );
};

export default Container;
