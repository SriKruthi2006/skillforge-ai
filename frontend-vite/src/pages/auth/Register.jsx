import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillforge-icon.png";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form,setForm] = useState({
    name:"", email:"", password:"", role:"STUDENT"
  });

  const change=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit=async(e)=>{
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">

      <div className="backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">

        <img src={logo} className="w-20 mx-auto mb-3"/>
        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Create your account ✨</p>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input name="name" placeholder="Full Name"
            onChange={change} className="p-3 rounded-xl"/>

          <input name="email" placeholder="Email"
            onChange={change} className="p-3 rounded-xl"/>

          <input type="password" name="password" placeholder="Password"
            onChange={change} className="p-3 rounded-xl"/>

          <select name="role" onChange={change}
            className="p-3 rounded-xl">
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="bg-white text-purple-700 font-bold py-3 rounded-xl">
            Create Account
          </button>
        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={()=>navigate("/login")}
        >
          Already have account? Login
        </p>

      </div>
    </div>
  );
};

export default Register;