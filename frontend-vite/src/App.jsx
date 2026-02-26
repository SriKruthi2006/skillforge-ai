import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Landing from "./pages/Landing";

function App() {
  const { user } = useAuth();   // ✅ use context instead

  return (
    <Routes>
      <Route path="/" element={<Landing/>} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/student/dashboard"
        element={
          user?.role === "STUDENT"
            ? <StudentDashboard />
            : <Navigate to="/login" />
        }
      />

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