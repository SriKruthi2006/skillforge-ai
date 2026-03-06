import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  BarChart3,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] text-white flex flex-col p-6">

        <h2 className="text-2xl font-bold mb-10">SkillForge Admin</h2>

        <SidebarItem
          icon={<div>📊</div>}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />

        <SidebarItem
          icon={<PlusCircle size={18} />}
          label="Add Course"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />

        <SidebarItem
          icon={<BookOpen size={18} />}
          label="My Courses"
          active={activeTab === "courses"}
          onClick={() => setActiveTab("courses")}
        />

        <SidebarItem
          icon={<BarChart3 size={18} />}
          label="Analytics"
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        />

        <SidebarItem
          icon={<Users size={18} />}
          label="Users"
          active={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        />

        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Tests"
          active={activeTab === "tests"}
          onClick={() => setActiveTab("tests")}
        />

        <SidebarItem
          icon={<Settings size={18} />}
          label="Profile Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        <button
  onClick={() => navigate("/")}
  className="flex items-center gap-2 text-red-400 hover:text-red-500"
>
  <LogOut size={18} />
  Logout
</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "add" && <AddCourse />}
        {activeTab === "courses" && <MyCourses />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "users" && <UsersPanel />}
        {activeTab === "tests" && <TestsPanel />}
        {activeTab === "settings" && <ProfileSettings />}

      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg mb-3 transition ${
      active
        ? "bg-purple-600"
        : "hover:bg-[#1f2937]"
    }`}
  >
    {icon}
    {label}
  </button>
);

/* ================== PAGES ================== */

const DashboardHome = () => {
  const userGrowth = [
    { month: "Jan", users: 40 },
    { month: "Feb", users: 70 },
    { month: "Mar", users: 120 },
    { month: "Apr", users: 180 },
    { month: "May", users: 240 },
  ];

  const enrollments = [
    { course: "Python", students: 120 },
    { course: "Java", students: 95 },
    { course: "Aptitude", students: 80 },
    { course: "Logical", students: 60 },
  ];

  const courseDistribution = [
    { name: "Python", value: 40 },
    { name: "Java", value: 30 },
    { name: "Aptitude", value: 20 },
    { name: "Logical", value: 10 },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Course Enrollments</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollments}>
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Course Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={courseDistribution}
                dataKey="value"
                outerRadius={90}
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Quiz Attempts Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={userGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#f59e0b"
                fill="#fde68a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

const StatBox = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

const AddCourse = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Course Title (e.g., React JS)"
        className="border p-3 rounded w-full"
      />

      <textarea
        placeholder="Course Description"
        className="border p-3 rounded w-full"
      />

      <select className="border p-3 rounded w-full">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button className="bg-purple-600 text-white px-6 py-2 rounded">
        Save Course
      </button>
    </div>
  </div>
);

const MyCourses = () => {
  const courses = [
    { id: 1, title: "Python", students: 120, status: "Active" },
    { id: 2, title: "Java", students: 95, status: "Active" },
    { id: 3, title: "Aptitude", students: 80, status: "Draft" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2">Course</th>
              <th>Students</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b text-center">
                <td className="py-3">{course.title}</td>
                <td>{course.students}</td>
                <td>{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Analytics = () => {
  const quizPerformance = [
    { course: "Python", avg: 85 },
    { course: "Java", avg: 78 },
    { course: "Aptitude", avg: 72 },
    { course: "Logical", avg: 80 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Average Quiz Score</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={quizPerformance}>
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const UsersPanel = () => {
  const users = [
    { name: "Rahul", role: "Student", status: "Active" },
    { name: "Ananya", role: "Student", status: "Active" },
    { name: "Kiran", role: "Admin", status: "Active" },
    { name: "Meena", role: "Student", status: "Blocked" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b text-center">
                <td className="py-3">{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TestsPanel = () => {
  const tests = [
    { course: "Python", attempts: 300, avgScore: "82%" },
    { course: "Java", attempts: 220, avgScore: "78%" },
    { course: "Aptitude", attempts: 150, avgScore: "74%" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Test Management</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2">Course</th>
              <th>Attempts</th>
              <th>Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index} className="border-b text-center">
                <td className="py-3">{test.course}</td>
                <td>{test.attempts}</td>
                <td>{test.avgScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [name, setName] = useState("Admin User");
  const [email] = useState("admin@skillforge.com"); // read-only

  const handleUpdate = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-5 max-w-lg">

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded w-full"
          />
        </div>

        {/* Email (Read Only) */}
        <div>
          <label className="block mb-2 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="border p-3 rounded w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Info Message */}
        <p className="text-sm text-gray-500">
          To change your password, please use the <span className="font-medium">Forgot Password</span> option on the login page.
        </p>

        <button
          onClick={handleUpdate}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Update Profile
        </button>

      </div>
    </div>
  );
};

export default AdminDashboard;