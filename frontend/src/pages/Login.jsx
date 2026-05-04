import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="auth-container">
      <h1>TaskForge Login</h1>

      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} /><br/><br/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} /><br/><br/>

      <button onClick={handleLogin}>Login</button>

      <p>Don't have account? <Link to="/">Signup</Link></p>
    </div>
  );
}

export default Login;