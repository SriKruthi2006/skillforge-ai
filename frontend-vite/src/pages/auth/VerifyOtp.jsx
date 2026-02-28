import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../services/authService";
import logo from "../../assets/skillforge-icon.png";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">
          <p className="text-red-300">Email not found. Please start over.</p>
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
      await verifyOtp(email, otp);
      alert("OTP verified successfully!");
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to verify OTP. Please try again.";
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
        <p className="text-white mb-6">Verify OTP 🔐</p>

        {error && <p className="text-red-300 mb-4">{error}</p>}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 rounded-xl outline-none"
            maxLength="6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-purple-700 font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          ← Back to Forgot Password
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
