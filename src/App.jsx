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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
      <Route
        path="/calendar"
        exact
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
<<<<<<< Updated upstream
            <Calendar title={currentTitle} />
          </AppLayout>
        }
      />
      <Route
        path="/habits"
        exact
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
            <HabitTracker title={currentTitle} />
          </AppLayout>
        }
      />
      <Route
        path="/habits/:habitId"
        exact
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
            <HabitTracker title={currentTitle} />
          </AppLayout>
        }
      />
      <Route
        path="/tasks/:sectionId/:documentId/:taskId"
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
            <TaskManager title={currentTitle} />
          </AppLayout>
        }
      />
      <Route
        path="/tasks/:sectionId/:documentId"
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
            <TaskManager title={currentTitle} />
          </AppLayout>
        }
      />
      <Route
        path="/tasks/:sectionId"
        element={
          <AppLayout setCurrentTitle={setCurrentTitle}>
            <TaskManager title={currentTitle} />
          </AppLayout>
        }
      />
=======
            <React.Suspense
              fallback={<FullPageSpinner indicator={Loading(50)} />}
            >
              <Calendar title={currentTitle} />
            </React.Suspense>
          </AppLayout>
        }
      />
      {["/habits/:habitId", "/habits"].map((path, index) => (
        <Route
          key={index}
          path={path}
          element={
            <AppLayout setCurrentTitle={setCurrentTitle}>
              <React.Suspense
                fallback={<FullPageSpinner indicator={Loading(50)} />}
              >
                <HabitTracker title={currentTitle} />
              </React.Suspense>
            </AppLayout>
          }
        />
      ))}

>>>>>>> Stashed changes
      <Route path="*" element={<Navigate to="/tasks/today" />} />
    </Routes>
  );
}

export default App;
