import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";
import LoginPage from "./features/LoginPage";
import { UserAuth } from "./context/AuthContext";

function App() {
  const [currentTitle, setCurrentTitle] = useState("All Tasks");
  const { user } = UserAuth();

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact>
        <LoginPage title={currentTitle} />
      </Route>
      <Route path="/calendar" exact>
        <AppLayout user={user} setCurrentTitle={setCurrentTitle}>
          <Calendar title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/habits" exact>
        <AppLayout user={user} setCurrentTitle={setCurrentTitle}>
          <HabitTracker title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/:id">
        <AppLayout user={user} setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/lists/:id">
        <AppLayout user={user} setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/tags/:id">
        <AppLayout user={user} setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} />
        </AppLayout>
      </Route>
    </Switch>
  );
}
export default App;
