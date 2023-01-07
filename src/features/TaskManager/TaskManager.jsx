import React from "react";
import { useParams } from "react-router-dom";

const TaskManager = (props) => {
  const { tasksType, listName } = useParams();
  return <h1>{tasksType || listName} tasks here</h1>;
};
export default TaskManager;
