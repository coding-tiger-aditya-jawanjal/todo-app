import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [isTaskChanged, setIsTaskChanged] = useState(false);
  const [isDone, setIsDone] = useState(null);

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
