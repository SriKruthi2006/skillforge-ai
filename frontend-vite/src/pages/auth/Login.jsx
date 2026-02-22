import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await login(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res));

      if (res.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="logo">⚡ SkillForge</h1>
        <h2>Welcome Back</h2>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="extra">
          Forgot password? <Link to="/forgot">Reset</Link>
        </p>

        <p className="extra">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;