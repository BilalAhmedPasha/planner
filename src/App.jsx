import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Calendar from "./features/TaskManager/Calendar";
import HabitTracker from "./features/HabitTracker";
import AppLayout from "./features/AppLayout";
import TaskManager from "./features/TaskManager";
import "./App.css";
import LoginPage from "./features/LoginPage";

function App() {
    const [currentTitle, setCurrentTitle] = useState("Inbox");

    return (
        <Routes>
            <Route path="/" exact element={<Navigate to="/login" />} />
            <Route
                path="/login"
                exact
                element={<LoginPage title={currentTitle} />}
            />
            <Route
                path="/calendar"
                exact
                element={
                    <AppLayout setCurrentTitle={setCurrentTitle}>
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
            <Route path="*" element={<Navigate to="/tasks/all" />} />
        </Routes>
    );
}

export default App;
