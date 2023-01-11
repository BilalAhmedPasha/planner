import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";
import LoginPage from "./features/LoginPage";

function App() {
  const [currentTitle, setCurrentTitle] = useState("All Tasks");
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact>
        <LoginPage title={currentTitle} />
      </Route>
      <Route path="/calendar" exact>
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <Calendar title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/habits" exact>
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <HabitTracker title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/:id">
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} setCurrentTitle={setCurrentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/lists/:id">
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} setCurrentTitle={setCurrentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/tags/:id">
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} setCurrentTitle={setCurrentTitle} />
        </AppLayout>
      </Route>
    </Switch>
  );
}
export default App;
