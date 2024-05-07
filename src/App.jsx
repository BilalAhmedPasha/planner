import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";
import LoginPage from "./features/LoginPage";
import FullPageSpinner from "./components/FullPageSpinner";
import Loading from "./components/Loading";
const Calendar = React.lazy(() => import("./features/Calendar"));
const HabitTracker = React.lazy(() => import("./features/HabitTracker"));

function App() {
  const [currentTitle, setCurrentTitle] = useState("Inbox");

  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/login" />} />
      <Route path="/login" exact element={<LoginPage title={currentTitle} />} />
      {[
        "/tasks/:sectionId/:documentId/:taskId",
        "/tasks/:sectionId/:documentId",
        "/tasks/:sectionId",
      ].map((path, index) => (
        <Route
          key={index}
          path={path}
          element={
            <AppLayout setCurrentTitle={setCurrentTitle}>
              <TaskManager title={currentTitle} />
            </AppLayout>
          }
        />
      ))}

      <Route
        path="/calendar"
        exact
        element={
          <React.Suspense
            fallback={<FullPageSpinner indicator={Loading(0)} />}
          >
            <AppLayout setCurrentTitle={setCurrentTitle}>
              <Calendar title={currentTitle} />
            </AppLayout>
          </React.Suspense>
        }
      />
      {["/habits/:habitId", "/habits"].map((path, index) => (
        <Route
          key={index}
          path={path}
          element={
            <React.Suspense
              fallback={<FullPageSpinner indicator={Loading(0)} />}
            >
              <AppLayout setCurrentTitle={setCurrentTitle}>
                <HabitTracker title={currentTitle} />
              </AppLayout>
            </React.Suspense>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/tasks/today" />} />
    </Routes>
  );
}

export default App;
