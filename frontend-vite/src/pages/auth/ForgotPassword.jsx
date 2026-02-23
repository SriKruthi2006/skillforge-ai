import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ForgotPassword.css";
import logo from "../../assets/skillforge-icon.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reset link sent to your email (demo)");
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <img src={logo} alt="logo" className="forgot-logo" />

        <h2>SkillForge</h2>
        <p className="subtitle">Reset your password 🔐</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <p className="back" onClick={() => navigate("/login")}>
          ← Back to Login
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;