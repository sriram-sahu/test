import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CreateTodo from "./CreateTodo";
import TaskList from "./TaskList";

const Home = () => {
  const [displayTasks, setDisplayTasks] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, );
  return (
    <div>
      <Navbar />
      <div>
        <div className="create-todo-container">
          <button onClick={() => setDisplayTasks(!displayTasks)}>
            {displayTasks ? "Show all tasks" : "Add new Task"}
          </button>
        </div>
        {displayTasks ? <CreateTodo /> : <TaskList />}
      </div>
    </div>
  );
};

export default Home;
