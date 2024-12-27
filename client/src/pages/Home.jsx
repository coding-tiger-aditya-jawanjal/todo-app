import { useEffect, useState } from "react";
import { BACKEND_URL } from "../main";
import Input from "../components/Input";
import Tasks from "../components/Tasks";

const Home = () => {
  const [url, setUrl] = useState("");

  const fetchImg = async () => {
    const res = await fetch(BACKEND_URL + "/pic", {
      credentials: "include",
    });
    const data = await res.json();
    setUrl(data.picUrl);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <>
      <div className="profile">
        <img src={url} alt="cat" id="profile-pic" />
      </div>
      <div className="app">
        <main>
          <h2 className="title">Task Manager</h2>
          <Input />
          <Tasks />
        </main>
      </div>
    </>
  );
};

export default Home;
