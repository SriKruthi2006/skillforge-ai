import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillforge-icon.png";

const StudentDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-[#020617] text-white min-h-screen w-full">

      {/* NAVBAR */}
      <nav className="bg-[#0f172a] py-5 px-10 flex justify-between items-center">
        <h2 className="text-xl font-semibold">SkillForge</h2>
        <img
          src={logo}
          alt="logo"
          className="w-14 h-14 object-contain"
        />
      </nav>

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="w-60 bg-[#020617] p-6 flex flex-col border-r border-[#1e293b]">
          <h3 className="text-lg mb-6">Menu</h3>

          <ul className="space-y-3 flex-1">

            <li>
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl capitalize transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                      : "hover:bg-[#111827]"
                  }`
                }
              >
                dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/courses"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl capitalize transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                      : "hover:bg-[#111827]"
                  }`
                }
              >
                courses
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/tests"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl capitalize transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                      : "hover:bg-[#111827]"
                  }`
                }
              >
                tests
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/results"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl capitalize transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                      : "hover:bg-[#111827]"
                  }`
                }
              >
                results
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/profile"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl capitalize transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                      : "hover:bg-[#111827]"
                  }`
                }
              >
                profile
              </NavLink>
            </li>

          </ul>

          <button
            onClick={logout}
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

export default StudentDashboard;