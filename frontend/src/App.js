import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      description: "New Task",
      status: "Pending",
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, {
      status: "Completed",
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.status}</p>
            </div>

            <div>
              <button
                className="complete"
                onClick={() => completeTask(task._id)}
              >
                Complete
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;