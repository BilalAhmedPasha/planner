import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";

function App() {
  const [currentTitle, setCurrentTitle] = useState("All Tasks");
  return (
    <AppLayout setCurrentTitle={setCurrentTitle}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/tasks/all" />
        </Route>
        <Route path="/calendar" exact>
          <Calendar title={currentTitle} />
        </Route>
        <Route path="/habits" exact>
          <HabitTracker title={currentTitle} />
        </Route>
        <Route path="/tasks/:tasksType">
          <TaskManager title={currentTitle} />
        </Route>
        <Route path="/lists/:listName">
          <TaskManager title={currentTitle} />
        </Route>
        <Route path="/tags/:listName">
          <TaskManager title={currentTitle} />
        </Route>
      </Switch>
    </AppLayout>
  );
}
export default App;
