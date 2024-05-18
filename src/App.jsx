import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./features/AppLayout";
import "./App.css";
import LoginPage from "./features/LoginPage";
import FullPageSpinner from "./components/FullPageSpinner";
import Loading from "./components/Loading";
import { LOADER_SIZE } from "./constants/app.constants";

const TaskManager = React.lazy(() => import("./features/TaskManager"));
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
            <React.Suspense
              fallback={
                <AppLayout setCurrentTitle={setCurrentTitle}>
                  <FullPageSpinner indicator={Loading(LOADER_SIZE)} />
                </AppLayout>
              }
            >
              <AppLayout setCurrentTitle={setCurrentTitle}>
                <TaskManager title={currentTitle} />
              </AppLayout>
            </React.Suspense>
          }
        />
      ))}
      <Route
        path="/calendar"
        exact
        element={
          <React.Suspense
            fallback={
              <AppLayout setCurrentTitle={setCurrentTitle}>
                <FullPageSpinner indicator={Loading(LOADER_SIZE)} />
              </AppLayout>
            }
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
              fallback={
                <AppLayout setCurrentTitle={setCurrentTitle}>
                  <FullPageSpinner indicator={Loading(LOADER_SIZE)} />
                </AppLayout>
              }
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
