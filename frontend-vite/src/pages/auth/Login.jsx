import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Login.css";
import logo from "../../assets/skillforge-icon.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(form);

console.log("LOGIN RESPONSE:", res);


// ✅ Role based redirect
// if (res.role === "ADMIN") {
//   navigate("/admin/dashboard");
// } else {
//   navigate("/student/dashboard");
// }

if (res.role === "ADMIN" || res.role === "ROLE_ADMIN") {
  navigate("/admin/dashboard");
} else {
  navigate("/student/dashboard");
}

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img 
  src={logo} 
  alt="SkillForge" 
  style={{
    width: "150px",
    height: "auto",
    display: "block",
    margin: "0 auto 20px"
  }} 
/>
        <h2>Welcome Back</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={changeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={changeHandler}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="link" onClick={() => navigate("/forgot-password")}>
          Forgot password? <span>Reset</span>
        </p>

        <p className="link" onClick={() => navigate("/register")}>
          New user? <span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;