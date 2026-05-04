import Sidebar from "../components/Sidebar";
import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Tasks() {
  const { user } = useContext(AuthContext);
  if (user?.role !== "Admin") return <Navigate to="/dashboard" />;

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium"
  });

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks/all");
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await API.get("/projects/all");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    await API.post("/tasks/create", form);
    fetchTasks();
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1 className="page-title">Tasks Management</h1>

        <div className="form-box">
          <input placeholder="Task Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
          <input placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})}/>

          <select onChange={(e)=>setForm({...form,projectId:e.target.value})}>
            <option>Select Project</option>
            {projects.map((p)=><option key={p._id} value={p._id}>{p.projectName}</option>)}
          </select>

          <select onChange={(e)=>setForm({...form,assignedTo:e.target.value})}>
            <option>Select User</option>
            {users.map((u)=><option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
          </select>

          <input type="date" onChange={(e)=>setForm({...form,dueDate:e.target.value})}/>

          <select onChange={(e)=>setForm({...form,priority:e.target.value})}>
            <option>Medium</option>
            <option>Low</option>
            <option>High</option>
          </select>

          <button onClick={handleCreate}>Create Task</button>
        </div>

        <div className="task-grid">
          {tasks.map((t)=>(
            <div key={t._id} className="list-card">
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>Project: {t.projectId?.projectName}</p>
              <p>Assigned To: {t.assignedTo?.name}</p>
              <p>Status: {t.status}</p>
              <p>Priority: {t.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;