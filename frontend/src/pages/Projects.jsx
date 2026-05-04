import Sidebar from "../components/Sidebar";
import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Projects() {
  const { user } = useContext(AuthContext);
  if (user?.role !== "Admin") return <Navigate to="/dashboard" />;

  const [form, setForm] = useState({ projectName: "", description: "" });
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await API.get("/projects/all");
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async () => {
    await API.post("/projects/create", form);
    setForm({ projectName: "", description: "" });
    fetchProjects();
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h1 className="page-title">Projects Management</h1>

        <div className="form-box">
          <input
            placeholder="Project Name"
            value={form.projectName}
            onChange={(e)=>setForm({...form, projectName:e.target.value})}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
          />
          <button onClick={handleCreate}>Create Project</button>
        </div>

        <div className="task-grid">
          {projects.map((p)=>(
            <div key={p._id} className="list-card">
              <h3>{p.projectName}</h3>
              <p>{p.description}</p>
              <small>Created By: {p.createdBy?.name}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;