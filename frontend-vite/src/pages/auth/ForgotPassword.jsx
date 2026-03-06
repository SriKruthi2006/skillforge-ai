import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendOtp } from "../../services/authService";
import logo from "../../assets/skillforge-icon.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendOtp(email);
      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">

      <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">

        <img src={logo} className="w-20 mx-auto mb-3"/>
        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Reset your password 🔐</p>

        {error && <p className="text-red-300 mb-4">{error}</p>}

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="p-3 rounded-xl outline-none"
            required
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-white text-purple-700 font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={()=>navigate("/login")}
        >
          ← Back to login
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;