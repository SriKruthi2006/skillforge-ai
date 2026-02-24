import { useState } from "react";
import "../../styles/StudentDashboard.css";
import Courses from "./Courses";
import TestPage from "./TestPage";
import Report from "./Report";
import Profile from "./Profile";
import Leaderboard from "./LeaderBoard";

import logo from "../../assets/skillforge-icon.png";

const StudentDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>SkillForge</h2>
        </div>

        <div className="nav-right">
          <img src={logo} alt="logo" className="nav-logo" />
        </div>
      </nav>

      <div className="dashboard-body">

        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <h3>Menu</h3>
          <ul>
            <li className={active==="dashboard"?"active":""}
                onClick={()=>setActive("dashboard")}>Dashboard</li>

            <li className={active==="courses"?"active":""}
                onClick={()=>setActive("courses")}>Courses</li>

            <li className={active==="tests"?"active":""}
                onClick={()=>setActive("tests")}>Tests</li>

            <li className={active==="results"?"active":""}
                onClick={()=>setActive("results")}>Results</li>

            {/* 🏆 NEW */}
            <li className={active==="leaderboard"?"active":""}
                onClick={()=>setActive("leaderboard")}>Leaderboard</li>

            <li className={active==="profile"?"active":""}
                onClick={()=>setActive("profile")}>Profile</li>
          </ul>

          <button className="logout-btn" onClick={logout}>Logout</button>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="content">

          {active==="dashboard" && (
            <>
              <h1 className="page-title">
                Welcome back, {user?.name} 👋
              </h1>

              <div className="stats-grid">
                <div className="stat-card"><h4>Courses</h4><p>4</p></div>
                <div className="stat-card"><h4>Completed</h4><p>1</p></div>
                <div className="stat-card"><h4>Pending</h4><p>3</p></div>
                <div className="stat-card"><h4>Avg Score</h4><p>84%</p></div>
              </div>

              <div className="dashboard-progress">
                <h3>Overall Progress</h3>
                <div className="progress-bar-big">
                  <div className="progress-fill" style={{width:"68%"}}></div>
                </div>
                <p>68% Learning Completed</p>
              </div>
            </>
          )}

          {active==="courses" && <Courses/>}
          {active==="tests" && <TestPage/>}
          {active==="results" && <Report/>}
          {active==="profile" && <Profile/>}
          {active==="leaderboard" && <Leaderboard/>}

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;