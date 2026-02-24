import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../services/api";
import Card from "../../components/ui/Card";
import StatsCard from "../../components/ui/StatsCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔐 Role Protection
  if (user?.role !== "ADMIN") {
    return <p style={{ padding: 20 }}>Access Denied</p>;
  }

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard();

      setDashboard(
        response.data || {
          totalUsers: 248,
          totalCourses: 12,
          totalTests: 156,
          activeUsers: 142,
          userGrowth: [
            { month: "Jan", users: 50 },
            { month: "Feb", users: 75 },
            { month: "Mar", users: 120 },
            { month: "Apr", users: 165 },
            { month: "May", users: 200 },
            { month: "Jun", users: 248 },
          ],
          recentActivity: [
            {
              id: 1,
              user: "John Smith",
              action: "Completed JavaScript Test",
              time: "2 hours ago",
            },
            {
              id: 2,
              user: "Jane Doe",
              action: "Enrolled in React Course",
              time: "3 hours ago",
            },
            {
              id: 3,
              user: "Mike Johnson",
              action: "Submitted Assignment",
              time: "5 hours ago",
            },
          ],
          testStatistics: [
            { name: "Easy", attempts: 450 },
            { name: "Medium", attempts: 320 },
            { name: "Hard", attempts: 180 },
          ],
        }
      );
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Platform overview and management
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={dashboard?.totalUsers || 0}
          icon={() => "👥"}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={dashboard?.activeUsers || 0}
          icon={() => "✅"}
          color="green"
        />
        <StatsCard
          title="Total Courses"
          value={dashboard?.totalCourses || 0}
          icon={() => "📚"}
          color="purple"
        />
        <StatsCard
          title="Tests Completed"
          value={dashboard?.totalTests || 0}
          icon={() => "✏️"}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">📈 User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboard?.userGrowth || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Test Statistics */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">📊 Test Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboard?.testStatistics || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="attempts"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">🕐 Recent Activity</h2>
        <div className="space-y-3">
          {dashboard?.recentActivity?.map((activity) => (
            <div
              key={activity.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{activity.user}</p>
                <p className="text-sm text-gray-500">
                  {activity.action}
                </p>
              </div>
              <span className="text-xs text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;