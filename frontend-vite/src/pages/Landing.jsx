import { useNavigate } from "react-router-dom";
import logo from "../assets/skillforge-icon.png";
import hero from "../assets/hero.svg";

// ❗If you have hero.svg keep this line
// If not, comment it
// import hero from "../assets/hero.svg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ===== NAVBAR ===== */}
      <nav className="flex justify-between items-center px-16 py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10"/>
          <h2 className="text-2xl font-bold">SkillForge</h2>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-semibold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold"
          >
            Register
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="flex items-center justify-between px-20 mt-16">

        {/* LEFT TEXT */}
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold leading-tight">
            Master Skills.<br/>
            Track Progress.<br/>
             🚀
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            SkillForge helps students learn aptitude, coding and reasoning 
            with structured courses, tests and performance tracking.
          </p>

          <div className="flex gap-6 mt-8">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-bold text-lg"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-10 py-3 rounded-xl border border-indigo-500 text-lg"
            >
              Login
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        {/* If hero.svg not present, comment this whole block */}
        <div className="flex justify-center">
          <img
            src={hero}
            alt="learning"
            className="w-[420px] "
          />
        </div>

      </section>

    </div>
  );
};

export default Landing;