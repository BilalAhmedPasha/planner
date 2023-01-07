import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";

function App() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/tasks/all" />
        </Route>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/habits" exact>
          <HabitTracker />
        </Route>
        <Route path="/tasks/:tasksType">
          <TaskManager />
        </Route>
      </Switch>
    </AppLayout>
  );
}
export default App;
