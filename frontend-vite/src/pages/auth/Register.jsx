import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillforge-icon.png";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "STUDENT" // must match backend enum EXACTLY
      });

      // go to login after register
      navigate("/login");

    } catch (err) {
  console.error("REGISTER ERROR:", err);

  // 🔥 SHOW REAL BACKEND ERROR FROM SPRING
  if (err?.response?.data?.message) {
    setError(err.response.data.message);
  } 
  else if (typeof err?.response?.data === "string") {
    setError(err.response.data);
  } 
  else {
    setError("Registration failed. Try again.");
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} alt="logo" style={{ width: 100 }} />
          <h1 style={{ color: "white", marginTop: 10 }}>SkillForge</h1>
          <p style={{ color: "white", opacity: 0.9 }}>
            Create your account ✨
          </p>
        </div>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="links">
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;