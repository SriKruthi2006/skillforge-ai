import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import logo from "../../assets/skillforge-icon.png"; // ✅ correct path

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STUDENT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(res.data);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login successful 🚀");

      // redirect based on role
      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={submit}>

        {/* LOGO */}
        <img src={logo} alt="SkillForge Logo" className="logo" />

        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Login</button>

        <p className="forgot">
          Forgot password? <span>Reset</span>
        </p>

        <p>
          New user? <Link to="/register">Register</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;