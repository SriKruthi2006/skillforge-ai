import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <div className="flex h-screen bg-[#020617] text-white">

      {/* SIDEBAR */}

      <aside className="w-64 bg-[#020617] border-r border-[#1e293b] flex flex-col justify-between">

        <div>

          <div className="p-6 text-xl font-bold">
            SkillForge
          </div>

          <ul className="px-4 space-y-3">

            <SidebarLink to="/student/dashboard" label="Dashboard" />
            <SidebarLink to="/student/courses" label="Courses" />
            <SidebarLink to="/student/tests" label="Tests" />
            <SidebarLink to="/student/results" label="Results" />
            <SidebarLink to="/student/profile" label="Profile" />

          </ul>

        </div>

        {/* LOGOUT */}

        <div className="p-6">

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 font-semibold"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>

  );
};

/* SIDEBAR LINK */

const SidebarLink = ({ to, label }) => (

  <li>

    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-indigo-500"
            : "hover:bg-[#1e293b]"
        }`
      }
    >
      {label}
    </NavLink>

  </li>

);

export default StudentDashboard;