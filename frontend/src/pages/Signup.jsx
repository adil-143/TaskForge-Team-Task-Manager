import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("Signup button clicked");
    console.log(form);

    try {
      const res = await API.post("/auth/signup", form);
      console.log("Response:", res.data);

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>TaskForge Signup</h1>

      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} /><br/><br/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} /><br/><br/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} /><br/><br/>

      <select onChange={(e)=>setForm({...form,role:e.target.value})}>
        <option>Member</option>
        <option>Admin</option>
      </select><br/><br/>

      <button onClick={handleSignup}>Signup</button>

      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;