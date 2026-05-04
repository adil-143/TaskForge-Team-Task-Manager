import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchData = async () => {
    try {
      const projects = await API.get("/projects/all");
      const tasks = await API.get("/tasks/all");

      setProjectCount(projects.data.length);
      setTaskCount(tasks.data.length);

      const completed = tasks.data.filter(
        (t) => t.status === "Completed"
      ).length;

      setCompletedCount(completed);
    } catch (error) {
      console.log(error);
    }
  };

  const progress = taskCount === 0 ? 0 : Math.floor((completedCount / taskCount) * 100);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />

      <div className="main-content">
        <h1>Welcome, {user?.name}</h1>
        <h3>Role: {user?.role}</h3>

        <div className="dashboard-grid">
          <div className="stat-card">
            <h2>Total Projects</h2>
            <p>{projectCount}</p>
          </div>

          <div className="stat-card">
            <h2>Total Tasks</h2>
            <p>{taskCount}</p>
          </div>

          <div className="stat-card">
            <h2>Completed Tasks</h2>
            <p>{completedCount}</p>
          </div>
        </div>

        <div className="progress-box">
          <h2>Overall Progress</h2>
          <p>{progress}% Completed</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;