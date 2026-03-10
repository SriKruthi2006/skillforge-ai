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
import LessonViewer from "./pages/student/LessonViewer";
import TestSelect from "./pages/student/TestSelect";
import CoursePlayer from "./pages/student/CoursePlayer";

function App() {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020617]">
        <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* STUDENT ROUTES */}
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
          <Route path="courses/:courseId/player" element={<CoursePlayer />} />
          <Route path="tests" element={<TestSelect />} />
          <Route path="tests/:courseId" element={<TestPage />} />
          {/* legacy single-topic viewer, still supported */}
          <Route path="lesson/:topicId" element={<LessonViewer />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ADMIN */}
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