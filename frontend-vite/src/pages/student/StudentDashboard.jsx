import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillforge-icon.png";

const StudentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col">

      {/* NAVBAR */}
      <nav className="bg-[#0f172a] py-5 px-10 flex justify-between items-center">
        <h2 className="text-xl font-semibold">SkillForge</h2>

        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 object-contain"
        />
      </nav>

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-60 bg-[#020617] p-6 flex flex-col border-r border-[#1e293b]">

          <h3 className="text-lg mb-6">Menu</h3>

          <ul className="space-y-3 flex-1">
            <SidebarLink to="/student/dashboard" label="dashboard" />
            <SidebarLink to="/student/courses" label="courses" />
            <SidebarLink to="/student/tests" label="tests" />
            <SidebarLink to="/student/results" label="results" />
            <SidebarLink to="/student/profile" label="profile" />
          </ul>

          <button
            onClick={handleLogout}
            className="mt-auto py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-14">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

const SidebarLink = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl capitalize transition ${
          isActive
            ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
            : "hover:bg-[#111827]"
        }`
      }
    >
      {label}
    </NavLink>
  </li>
);

export default StudentDashboard;