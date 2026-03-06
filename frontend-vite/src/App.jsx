import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import Landing from "./pages/Landing";
import DashboardHome from "./pages/student/DashboardHome";
import Courses from "./pages/student/Courses";
import TestPage from "./pages/student/TestPage";
import Results from "./pages/student/Results";
import Profile from "./pages/student/Profile";
import CoursePlayer from "./pages/student/CoursePlayer";
import TestSelect from "./pages/student/TestSelect";


function App() {
  const { user, loading } = useAuth();  // ✅ FIXED

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-50">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        

<Route
  path="/student"
  element={
    user?.role === "STUDENT"
      ? <StudentDashboard />
      : <Navigate to="/login" />
  }
>
  <Route index element={<Navigate to="dashboard" />} />
  <Route path="dashboard" element={<DashboardHome />} />
  <Route path="courses" element={<Courses />} />
  <Route path="tests" element={<TestSelect />} />
  <Route path="tests/:courseId" element={<TestPage />} />
  <Route path="results" element={<Results />} />
  <Route path="profile" element={<Profile />} />
  <Route path="course/:courseId" element={<CoursePlayer />} />
</Route>
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;