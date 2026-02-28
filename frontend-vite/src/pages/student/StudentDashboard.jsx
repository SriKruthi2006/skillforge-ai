import { useState } from "react";
import Courses from "./Courses";
import TestPage from "./TestPage";
import Results from "./Results";
import Profile from "./Profile";
import Leaderboard from "./LeaderBoard";
import logo from "../../assets/skillforge-icon.png";

const StudentDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen  w-full">

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
            {["dashboard", "courses", "tests", "results", "leaderboard", "profile"].map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer px-4 py-3 rounded-xl capitalize transition
                ${active === item
                    ? "bg-gradient-to-r from-[#6c63ff] to-[#7c3aed]"
                    : "hover:bg-[#111827]"}
                `}
              >
                {item}
              </li>
            ))}
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

          {active === "dashboard" && (
            <>
              <h1 className="text-4xl font-bold mb-10">
                Welcome back, {user?.name} 👋
              </h1>

              <div className="grid grid-cols-4 gap-6 mb-10">
                {[
                  { title: "Courses", value: 4 },
                  { title: "Completed", value: 1 },
                  { title: "Pending", value: 3 },
                  { title: "Avg Score", value: "84%" },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="bg-[#0f172a] p-6 rounded-2xl text-center shadow-lg"
                  >
                    <h4 className="mb-2">{card.title}</h4>
                    <p className="text-3xl font-bold text-purple-400">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0f172a] p-8 rounded-2xl shadow-lg">
                <h3 className="text-lg mb-4">Overall Progress</h3>
                <div className="h-4 bg-[#1e293b] rounded-full">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    style={{ width: "68%" }}
                  />
                </div>
                <p className="mt-4 text-gray-300">
                  68% Learning Completed
                </p>
              </div>
            </>
          )}

          {active === "courses" && <Courses />}
          {active === "tests" && <TestPage />}
          {active === "results" && <Results />}
          {active === "profile" && <Profile />}
          {active === "leaderboard" && <Leaderboard />}

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;