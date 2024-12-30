import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import TaskProvider from "./context/TaskProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ToastContainer />
      <App />
    </TaskProvider>
  </StrictMode>
);
