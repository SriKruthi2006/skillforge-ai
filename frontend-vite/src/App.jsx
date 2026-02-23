import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {

  // 🔥 get user from localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* student */}
      <Route
        path="/student/dashboard"
        element={
          user?.role === "STUDENT"
            ? <StudentDashboard />
            : <Navigate to="/login" />
        }
      />

      {/* admin */}
      <Route
        path="/admin/dashboard"
        element={
          user?.role === "ADMIN"
            ? <AdminDashboard />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;