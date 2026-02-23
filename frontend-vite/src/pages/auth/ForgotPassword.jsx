import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/skillforge-icon.png";
import "../../styles/Login.css";// reuse same styling + animation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMsg("Please enter email");
      return;
    }

    try {
      setLoading(true);

      // 👉 DEMO RESET (frontend only)
      // later connect backend reset API
      setTimeout(() => {
        setMsg("✅ Reset link sent to your email");
        setLoading(false);
      }, 1000);

    } catch (err) {
      setMsg("❌ Failed to send reset link");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* animated background bubbles */}
      <div className="bg-animation">
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="login-card">

        {/* LOGO */}
        <div className="logo-area">
          <img src={logo} alt="SkillForge" className="logo-img" />
          <h1>SkillForge</h1>
          <p>Reset your password 🔐</p>
        </div>

        {/* message */}
        {msg && <div className="success-msg">{msg}</div>}

        {/* form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* links */}
        <div className="links">
          <Link to="/login">⬅ Back to Login</Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;