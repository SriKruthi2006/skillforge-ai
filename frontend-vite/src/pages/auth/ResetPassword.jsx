import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import logo from "../../assets/skillforge-icon.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">
          <p className="text-red-300">Invalid request. Please start over.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="mt-4 bg-white text-purple-700 font-bold py-2 px-4 rounded-xl"
          >
            Back to Forgot Password
          </button>
        </div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      alert("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to reset password. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">
        <img src={logo} className="w-20 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Reset your password 🔐</p>

        {error && <p className="text-red-300 mb-4">{error}</p>}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-3 rounded-xl outline-none"
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-white text-purple-700 font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          ← Back to login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;