import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const companyId = Cookies.get("companyId");
      const accessToken = Cookies.get("token");

      try {
        const response = await fetch(
          `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const tasks = data.results;
          setTasks(tasks);
        } else {
          console.log("Failed to fetch tasks");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task.id === selectedTask ? null : task.id);
  };

  const handleDeleteTask = async (event, task) => {
    event.stopPropagation();

    const companyId = Cookies.get("companyId");
    const accessToken = Cookies.get("token");

    const warning = window.confirm(" Are you sure. You want to delete this task");
    console.log(warning);
    if (warning) {
      try {
        const response = await fetch(
          `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${task.id}?company_id=${companyId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + accessToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          console.log("Task deleted successfully");
          window.location.reload();
        } else {
          console.log("Failed to delete task");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    }
  };

  return (
    <div className="create-todo-container">
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${
              task.id === selectedTask ? "selected" : ""
            }`}
            onClick={() => handleTaskClick(task)}
          >
            {task.id === selectedTask ? (
              <div className="task-details">
                {console.log(task)}
                <p>Task Name: {task.task_msg}</p>
                <p>Task ID: {task.id}</p>
                <p>Assigned User: {task.assigned_user}</p>
                <p>Date: {task.task_date}</p>
                <p>Time: {task.task_time}</p>
                <div>
                  <button>Edit</button>
                  <button onClick={(event) => handleDeleteTask(event, task)}>
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p>Task Name: {task.task_msg}</p>
            )}
          </div>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
