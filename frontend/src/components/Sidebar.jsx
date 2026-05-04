import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{
      width: "230px",
      height: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "22px",
      position: "fixed",
      top: 0,
      left: 0
    }}>
      <h1 style={{fontSize:"22px"}}>TaskForge</h1>

      <div style={{marginTop:"30px", marginBottom:"25px"}}>
            <p style={{margin:"5px 0"}}><strong>User:</strong> {user?.name}</p>
            <p style={{margin:"5px 0", color:"#94a3b8"}}><strong>Role:</strong> {user?.role}</p>
        </div>

      <hr />

      <div style={{display:"flex", flexDirection:"column", gap:"18px", marginTop:"25px"}}>
        <Link to="/dashboard" style={{color:"white"}}>Dashboard</Link>

        {user?.role === "Admin" && (
          <>
            <Link to="/projects" style={{color:"white"}}>Projects</Link>
            <Link to="/tasks" style={{color:"white"}}>Tasks</Link>
          </>
        )}

        <Link to="/mytasks" style={{color:"white"}}>My Tasks</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;