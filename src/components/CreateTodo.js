import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { BiPlusCircle } from "react-icons/bi";
import "./index.css";

const CreateTodo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const companyId = Cookies.get("companyId");
      const accessToken = Cookies.get("token");

      try {
        const response = await fetch(
          `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const users = data.results.data;
          setUserDetails(users);
        } else {
          console.log("Failed to fetch user details");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyId = Cookies.get("companyId");
    const accessToken = Cookies.get("token");

    const payload = {
      assigned_user: selectedUser,
      task_date: date,
      task_time: time,
      seconds: convertTimeToSeconds(time),
      is_completed: 0,
      time_zone: getCurrentTimeZone(),
      task_msg: taskDescription,
    };

    try {
      const response = await fetch(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // TODO: Handle success
        console.log("Task added successfully");
      } else {
        // TODO: Handle error
        console.log("Failed to add task");
      }
      setDate("");
      setTime("");
      setSelectedUser("");
      setTaskDescription("");
      setUserDetails([]);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  // Helper function to convert time to seconds
  const convertTimeToSeconds = (time) => {
    const [hours, minutes] = time.split(":");
    // return parseInt(hours) * 3600 + parseInt(minutes) * 60;
    return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
  };

  // Helper function to get the current timezone in seconds
  const getCurrentTimeZone = () => {
    const currentTimezoneOffset = new Date().getTimezoneOffset();
    return -currentTimezoneOffset * 60;
  };

  return (
    <form className="create-todo-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task">Task Description</label>
        <div className="d-flex flex-row align-items-center">
       <input
    type="text"
    id="task"
    value={taskDescription}
    onChange={handleTaskDescriptionChange}
  />
  {/* <BiPlusCircle size={32} color="blue"  className="plus"/> */}
</div>
      </div>
      <div className="form-group date-time-container">
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
         

        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
          />
           
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="user">Select User</label>
        <select id="user" value={selectedUser} onChange={handleUserChange} className="select-dropdown" >
          <option value="">Select User</option>
          {userDetails.map((each) => (
            <option key={each.id} value={each.first}>
              {each.first}
            </option>
          ))}
        </select>
      </div>
      <div className="display-container d-flex flex-row justify-content-center">
      <button type="cancil-button">cancel</button>
        <button type="submit">save</button>
      </div>
    </form>
  );
};

export default CreateTodo;

  