import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  COMPLETED,
  DELETED,
  WONT_DO,
} from "../../../../constants/app.constants.js";
import {
  MARKED,
  INITIAL_SECTIONS,
  LATER,
  NODATE,
  OVERDUE,
  TODAY,
} from "../../../../constants/section.constants.js";
import TaskListSection from "./TaskSection.jsx";
import { isTaskOverdue, isTaskToday } from "./TaskUtils.js";

const Container = ({
  user,
  tasks,
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
}) => {
  const [sectionalTasks, setSectionalTasks] = useState(INITIAL_SECTIONS);
  const [sectionCount, setSectionCount] = useState(0);
  useEffect(() => {
    const overdueTemp = [];
    const todayTemp = [];
    const laterTemp = [];
    const completedTemp = [];
    const noDateTemp = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isCompleted || tasks[i].isWontDo) {
        completedTemp.push(tasks[i]);
      } else if (tasks[i].taskDate === null) {
        noDateTemp.push(tasks[i]);
      } else if (isTaskOverdue(tasks[i])) {
        overdueTemp.push(tasks[i]);
      } else if (isTaskToday(tasks[i])) {
        todayTemp.push(tasks[i]);
      } else {
        laterTemp.push(tasks[i]);
      }
    }

    setSectionalTasks({
      [OVERDUE]: { ...INITIAL_SECTIONS[OVERDUE], tasks: overdueTemp },
      [TODAY]: { ...INITIAL_SECTIONS[TODAY], tasks: todayTemp },
      [LATER]: { ...INITIAL_SECTIONS[LATER], tasks: laterTemp },
      [NODATE]: { ...INITIAL_SECTIONS[NODATE], tasks: noDateTemp },
      [MARKED]: { ...INITIAL_SECTIONS[MARKED], tasks: completedTemp },
    });
  }, [tasks]);

  useEffect(() => {
    let count = 0;
    Object.keys(sectionalTasks).forEach((each) => {
      if (sectionalTasks[each].tasks.length > 0 && each !== MARKED) {
        count++;
      }
    });
    setSectionCount(count);
  }, [sectionalTasks]);

  const [messageApi, contextHolder] = message.useMessage();
  const { sectionId } = useParams();
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
            isOpen={sectionalTasks[each].isOpenByDefault}
            showInCollapse={
              sectionId === COMPLETED ||
              sectionId === WONT_DO ||
              sectionId === DELETED
                ? false
                : sectionCount > 1 || each === MARKED || each === OVERDUE
            }
          />
        ) : null;
      })}
      {contextHolder}
    </>
  );
};

export default Container;
