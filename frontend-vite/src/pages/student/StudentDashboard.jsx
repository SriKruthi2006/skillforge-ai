import { useState } from "react";
import "../../styles/StudentDashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const StudentDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // sample chart data
  const barData = [
    { name: "Java", score: 80 },
    { name: "React", score: 85 },
    { name: "DBMS", score: 70 },
    { name: "Aptitude", score: 75 },
  ];

  const pieData = [
    { name: "Completed", value: 70 },
    { name: "Remaining", value: 30 },
  ];

  const COLORS = ["#6c63ff", "#1f2937"];

  return (
    <div className="dashboard">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>SkillForge</h2>
      </nav>

      <div className="dashboard-body">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>Menu</h3>

          <ul>
            <li className={active==="dashboard"?"active":""}
                onClick={()=>setActive("dashboard")}>Dashboard</li>

            <li className={active==="courses"?"active":""}
                onClick={()=>setActive("courses")}>My Courses</li>

            <li className={active==="tests"?"active":""}
                onClick={()=>setActive("tests")}>Tests</li>

            <li className={active==="results"?"active":""}
                onClick={()=>setActive("results")}>Results</li>

            <li className={active==="profile"?"active":""}
                onClick={()=>setActive("profile")}>Profile</li>
          </ul>

          <button className="logout-btn" onClick={logout}>Logout</button>
        </aside>

        {/* MAIN */}
        <main className="content">

        {/* ================= DASHBOARD ================= */}
        {active === "dashboard" && (
          <>
            <h1 className="page-title">
              Welcome back, {user?.name} 👋
            </h1>

            {/* STATS BOXES */}
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Tests Completed</h4>
                <p>5</p>
              </div>

              <div className="stat-card">
                <h4>Average Score</h4>
                <p>82%</p>
              </div>

              <div className="stat-card">
                <h4>Topics Mastered</h4>
                <p>8</p>
              </div>
            </div>

            {/* CHARTS */}
            <div className="charts-row">

              {/* BAR CHART */}
              <div className="chart-box">
                <h3>Subject Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#ccc"/>
                    <YAxis stroke="#ccc"/>
                    <Tooltip/>
                    <Bar dataKey="score" fill="#6c63ff" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* PIE CHART */}
              <div className="chart-box">
                <h3>Course Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend/>
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>
          </>
        )}

        {/* ================= PROFILE ================= */}
        {active === "profile" && (
          <>
            <h1 className="page-title left">My Profile 👤</h1>

            <div className="profile-wrapper">
              <div className="profile-card">
                <div className="big-avatar">
                  {user?.name?.charAt(0)}
                </div>

                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <p><b>Role:</b> {user?.role}</p>

                <button className="edit-btn">Edit Profile</button>
              </div>
            </div>
          </>
        )}

        {active==="courses" && <h1 className="page-title">My Courses 📚</h1>}
        {active==="tests" && <h1 className="page-title">Tests 📝</h1>}
        {active==="results" && <h1 className="page-title">Results 📊</h1>}

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;