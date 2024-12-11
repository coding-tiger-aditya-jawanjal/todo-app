import { useEffect } from "react";
import { useTask } from "../context/TaskProvider";
import { Bounce, toast } from "react-toastify";
import { BACKEND_URL } from "../main";

const Input = () => {
  const {
    text,
    setText,
    update,
    updateId,
    setIsTaskChanged,
    isDone,
    setIsDone,
    setUpdate,
  } = useTask();

  const addTask = async () => {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: text,
      }),
    });
    const data = await res.json();
    toast.success(data.msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setIsTaskChanged((pre) => !pre);
    setText("");
  };

  const updateTask = async () => {
    const res = await fetch(`${BACKEND_URL}/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        typeof isDone === "boolean"
          ? JSON.stringify({
              complete: isDone,
            })
          : JSON.stringify({
              task: text,
            }),
    });
    const data = await res.json();
    toast.success(data.msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setIsTaskChanged((pre) => !pre);
    setText("");
    setIsDone(null);
    setUpdate(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (update) {
      updateTask();
      return;
    }
    addTask();
  };

  useEffect(() => {
    if (typeof isDone === "boolean") {
      updateTask();
    }
  }, [isDone]);

  return (
    <form>
      <input
        type="text"
        placeholder="✍️ Add new Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>{update ? "Update" : "Add Task"}</button>
    </form>
  );
};

export default Input;
