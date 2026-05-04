import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import API from "../api/axios";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    const res = await API.get("/tasks/mytasks");
    setTasks(res.data);
  };

  useEffect(() => { fetchMyTasks(); }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/status/${id}`, { status });
    fetchMyTasks();
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1 className="page-title">My Assigned Tasks</h1>

        <div className="task-grid">
          {tasks.map((t)=>(
            <div key={t._id} className="list-card">
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>Project: {t.projectId?.projectName}</p>
              <p>Status: {t.status}</p>
              <p>Priority: {t.priority}</p>
              <p>Due: {new Date(t.dueDate).toLocaleDateString()}</p>

              {new Date(t.dueDate) < new Date() && t.status !== "Completed" && (
                <p style={{color:"red", fontWeight:"bold"}}>⚠ Overdue Task</p>
              )}

              <select value={t.status} onChange={(e)=>updateStatus(t._id, e.target.value)}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;