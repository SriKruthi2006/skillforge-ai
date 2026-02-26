import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/skillforge-icon.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const submit=(e)=>{
    e.preventDefault();
    alert("Reset link sent to "+email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">

      <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">

        <img src={logo} className="w-20 mx-auto mb-3"/>
        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Reset your password 🔐</p>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input
            placeholder="Enter registered email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="p-3 rounded-xl"
          />

          <button className="bg-white text-purple-700 font-bold py-3 rounded-xl">
            Send Reset Link
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