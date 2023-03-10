import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Calendar from "./features/TaskManager/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";
import LoginPage from "./features/LoginPage";

function App() {
  const [currentTitle, setCurrentTitle] = useState("Inbox");
  
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
      <Route path="/tasks/:sectionId/:documentId">
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="/tasks/:sectionId">
        <AppLayout setCurrentTitle={setCurrentTitle}>
          <TaskManager title={currentTitle} />
        </AppLayout>
      </Route>
      <Route path="*">
        <Redirect to="/tasks/all" />
      </Route>
    </Switch>
  );
}

export default App;
