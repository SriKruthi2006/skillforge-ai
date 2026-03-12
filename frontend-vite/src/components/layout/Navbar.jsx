import { useAuth } from "../../context/AuthContext";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-200 transition"
        >
          ☰
        </button>

        <h2 className="text-lg font-bold text-slate-800">
          SkillForge
        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="text-sm text-slate-600">
          Welcome, {user?.name || "Student"}
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0) || "S"}
        </div>

      </div>

    </header>
  );
};

export default Navbar;