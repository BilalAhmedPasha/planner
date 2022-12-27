import React from "react";
import TaskNavigation from "../../components/TaskNavigation/TaskNavigation";
import classes from "./TaskManager.module.css";

const TaskManager = (props) => {
  return (
    <>
      <TaskNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};
export default TaskManager;
