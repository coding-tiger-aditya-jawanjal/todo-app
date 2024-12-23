import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useTask } from "../context/TaskProvider";
import { Bounce, toast } from "react-toastify";
import { BACKEND_URL } from "../main";

const SingleTask = ({ title, id, completed, i }) => {
  const { setText, setUpdate, setUpdateId, setIsTaskChanged, setIsDone } =
    useTask();

  const deleteTask = async () => {
    const res = await fetch(
      `${BACKEND_URL}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    toast.warning(data.msg, {
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
  };

  const handleUpdate = () => {
    setText(title);
    setUpdate(true);
    setUpdateId(id);
  };

  const handleCompleted = () => {
    setUpdateId(id);
    setIsDone(!completed);
  };

  return (
    <div className="single-task">
      <p onClick={handleCompleted} className={completed ? "completed" : ""}>
        {i + 1 + ". " + title}
      </p>
      <div className="icons">
        <span onClick={handleUpdate}>
          <FiEdit />
        </span>
        <span onClick={() => deleteTask()}>
          <MdDelete />
        </span>
      </div>
    </div>
  );
};

export default SingleTask;
