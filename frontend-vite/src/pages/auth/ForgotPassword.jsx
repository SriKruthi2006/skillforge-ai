import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/skillforge-icon.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Reset link sent to your email (demo)");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} alt="logo" style={{ width: 100 }} />
          <h1 style={{ color: "white", marginTop: 10 }}>SkillForge</h1>
          <p style={{ color: "white", opacity: 0.9 }}>Reset your password 🔐</p>
        </div>

        {msg && <p style={{color:"lightgreen"}}>{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <div className="links">
          <Link to="/login">⬅ Back to Login</Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;