import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { studentAPI } from "../../services/api";
import Card from "../../components/ui/Card";
import StatsCard from "../../components/ui/StatsCard";
import ProgressBar from "../../components/ui/ProgressBar";
import Button from "../../components/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {
  const { user } = useAuth();

  // 🔐 role protection
  if (user?.role !== "STUDENT") {
    return <p style={{ padding: 20 }}>Access Denied</p>;
  }

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await studentAPI.getDashboard();

      setDashboard(
        response.data || {
          testsCompleted: 12,
          averageScore: 78,
          learningTime: 45,
          topicsMastered: 8,
          upcomingTests: [
            {
              id: 1,
              name: "JavaScript Fundamentals",
              date: "2026-02-25",
              difficulty: "Medium",
            },
            {
              id: 2,
              name: "React Advanced",
              date: "2026-02-28",
              difficulty: "Hard",
            },
          ],
          recommendedTopics: [
            { id: 1, name: "Async/Await in JS", progress: 60 },
            { id: 2, name: "State Management", progress: 45 },
          ],
          performanceData: [
            { week: "Week 1", score: 72 },
            { week: "Week 2", score: 75 },
            { week: "Week 3", score: 78 },
            { week: "Week 4", score: 82 },
          ],
        }
      );
    } catch (err) {
      setError("Failed to load dashboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ loading UI
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
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's your learning journey overview
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Tests Completed"
          value={dashboard?.testsCompleted || 0}
          icon={() => "📝"}
          color="blue"
        />
        <StatsCard
          title="Average Score"
          value={`${dashboard?.averageScore || 0}%`}
          icon={() => "⭐"}
          color="green"
        />
        <StatsCard
          title="Learning Time"
          value={`${dashboard?.learningTime || 0}h`}
          icon={() => "⏱️"}
          color="purple"
        />
        <StatsCard
          title="Topics Mastered"
          value={dashboard?.topicsMastered || 0}
          icon={() => "🎯"}
          color="orange"
        />
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboard?.performanceData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming tests */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">📅 Upcoming Tests</h2>
            <div className="space-y-3">
              {dashboard?.upcomingTests?.map((test) => (
                <div
                  key={test.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{test.name}</p>
                    <p className="text-sm text-gray-500">{test.date}</p>
                  </div>

                  <Button size="sm">Start</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommended */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">🤖 Recommended</h2>
          <div className="space-y-4">
            {dashboard?.recommendedTopics?.map((topic) => (
              <div key={topic.id}>
                <p className="text-sm mb-2">{topic.name}</p>
                <ProgressBar value={topic.progress} max={100} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;