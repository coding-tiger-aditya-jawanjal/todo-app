import { createContext, useContext, useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [isTaskChanged, setIsTaskChanged] = useState(false);
  const [isDone, setIsDone] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch(BACKEND_URL + "/user/auth", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.data.msg);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider
      value={{
        text,
        setText,
        update,
        setUpdate,
        updateId,
        setUpdateId,
        isTaskChanged,
        setIsTaskChanged,
        isDone,
        setIsDone,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
