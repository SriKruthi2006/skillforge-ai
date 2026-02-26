import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillforge-icon.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");

  const change = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit = async(e)=>{
    e.preventDefault();
    try{
      const res = await login(form);

      if(res.role === "ADMIN"){
        navigate("/admin/dashboard");
      }else{
        navigate("/student/dashboard");
      }
    }catch{
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">

      <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">

        <img src={logo} className="w-20 mx-auto mb-3"/>
        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Welcome Back!</p>

        {error && <p className="text-red-300">{error}</p>}

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={change}
            className="p-3 rounded-xl outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={change}
            className="p-3 rounded-xl outline-none"
            required
          />

          <button className="bg-white text-purple-700 font-bold py-3 rounded-xl">
            Login
          </button>
        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={()=>navigate("/forgot-password")}
        >
          Forgot password? <span className="text-yellow-300 font-bold">Reset</span>
        </p>

        <p
          className="text-white mt-2 cursor-pointer"
          onClick={()=>navigate("/register")}
        >
          New user? <span className="text-yellow-300 font-bold">Register</span>
        </p>

      </div>
    </div>
  );
};

export default Login;