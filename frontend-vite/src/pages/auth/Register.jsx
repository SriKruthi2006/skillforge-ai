import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import logo from "../../assets/skillforge-icon.png";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      const message = err.response?.data || "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">

      <div className="relative z-10 backdrop-blur-lg bg-white/20 p-10 rounded-3xl w-[380px] text-center shadow-2xl">

        <img
          src={logo}
          alt="SkillForge Logo"
          className="w-20 mx-auto mb-3"
        />

        <h1 className="text-2xl font-bold text-white">SkillForge</h1>
        <p className="text-white mb-6">Create your account ✨</p>

        <form onSubmit={submit} className="flex flex-col gap-4">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={change}
            className="w-full p-3 rounded-xl outline-none bg-white text-black placeholder-gray-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            className="w-full p-3 rounded-xl outline-none bg-white text-black placeholder-gray-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={change}
            className="w-full p-3 rounded-xl outline-none bg-white text-black placeholder-gray-500"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={change}
            className="w-full p-3 rounded-xl outline-none bg-white text-black"
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="bg-white text-purple-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Create Account
          </button>

        </form>

        <p
          className="text-white mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have account?{" "}
          <span className="text-yellow-300 font-bold">Login</span>
        </p>

      </div>
    </div>
  );
};

export default Register;