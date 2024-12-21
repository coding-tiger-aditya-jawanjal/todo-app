import { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import { useTask } from "../context/TaskProvider";
import { BACKEND_URL } from "../main";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const { isTaskChanged } = useTask();

  const fetchTasks = async () => {
    const res = await fetch(BACKEND_URL+'/task');
    const data = await res.json();

    if (data) {
      setTasks(data?.tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isTaskChanged]);

  return (
    <div className="tasks">
      {tasks?.length > 0 ? (
        tasks.map((e, i) => {
          return (
            <div key={e._id}>
              <SingleTask
                title={e.task}
                id={e._id}
                completed={e.isCompleted}
                i={i}
              />
            </div>
          );
        })
      ) : (
        <p className="null-msg">No Task in database !</p>
      )}
    </div>
  );
};

export default Tasks;
