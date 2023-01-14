import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";
import store from "./store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);
