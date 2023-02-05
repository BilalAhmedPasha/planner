import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ALL,
  COMPLETED,
  DELETED,
  WONT_DO,
} from "../../../../constants/app.constants.js";
import {
  HIGH,
  LOW,
  MEDIUM,
  NONE,
} from "../../../../constants/priority.constants.js";
import {
  MARKED,
  LATER,
  NODATE,
  OVERDUE,
  TODAY,
  TIME_SECTIONS,
  TITLE_SECTIONS,
  PRIORITY_SECTIONS,
} from "../../../../constants/section.constants.js";
import { PRIORITY, TITLE } from "../../../../constants/sort.constants.js";
import TaskListSection from "./TaskSection.jsx";
import { isTaskOverdue, isTaskToday } from "./TaskUtils.js";

const Container = ({
  user,
  tasks,
  sortBy,
  selectedCardId,
  setSelectedCardId,
  setSelectedTaskDetails,
}) => {
  const [sectionalTasks, setSectionalTasks] = useState(
    sortBy === TITLE
      ? TITLE_SECTIONS
      : sortBy === PRIORITY
      ? PRIORITY_SECTIONS
      : TIME_SECTIONS
  );

  const [sectionCount, setSectionCount] = useState(0);

  useEffect(() => {
    if (sortBy === TITLE) {
      const allTemp = [];
      const completedTemp = [];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isCompleted || tasks[i].isWontDo) {
          completedTemp.push(tasks[i]);
        } else {
          allTemp.push(tasks[i]);
        }
      }
      setSectionalTasks({
        [ALL]: { ...TITLE_SECTIONS[ALL], tasks: allTemp },
        [MARKED]: { ...TITLE_SECTIONS[MARKED], tasks: completedTemp },
      });
    } else if (sortBy === PRIORITY) {
      const highTemp = [];
      const mediumTemp = [];
      const lowTemp = [];
      const noneTemp = [];
      const completedTemp = [];
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isCompleted || tasks[i].isWontDo) {
          completedTemp.push(tasks[i]);
        } else if (tasks[i].priority === HIGH) {
          highTemp.push(tasks[i]);
        } else if (tasks[i].priority === MEDIUM) {
          mediumTemp.push(tasks[i]);
        } else if (tasks[i].priority === LOW) {
          lowTemp.push(tasks[i]);
        } else {
          noneTemp.push(tasks[i]);
        }
      }
      setSectionalTasks({
        [HIGH]: { ...PRIORITY_SECTIONS[HIGH], tasks: highTemp },
        [MEDIUM]: { ...PRIORITY_SECTIONS[MEDIUM], tasks: mediumTemp },
        [LOW]: { ...PRIORITY_SECTIONS[LOW], tasks: lowTemp },
        [NONE]: { ...PRIORITY_SECTIONS[NONE], tasks: noneTemp },
        [MARKED]: { ...PRIORITY_SECTIONS[MARKED], tasks: completedTemp },
      });
    } else {
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
        [OVERDUE]: { ...TIME_SECTIONS[OVERDUE], tasks: overdueTemp },
        [TODAY]: { ...TIME_SECTIONS[TODAY], tasks: todayTemp },
        [LATER]: { ...TIME_SECTIONS[LATER], tasks: laterTemp },
        [NODATE]: { ...TIME_SECTIONS[NODATE], tasks: noDateTemp },
        [MARKED]: { ...TIME_SECTIONS[MARKED], tasks: completedTemp },
      });
    }
  }, [sortBy, tasks]);

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
