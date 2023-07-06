import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";
import store from "./store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
