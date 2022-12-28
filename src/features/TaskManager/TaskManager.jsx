import React from "react";
import { useParams } from "react-router-dom";

const TaskManager = (props) => {
  const { tasksType } = useParams();
  return <h1>{tasksType} tasks here</h1>;
};
export default TaskManager;
