import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setReports({
        coursePerformance: [
          { course: 'JavaScript', avgScore: 78, students: 45 },
          { course: 'React', avgScore: 75, students: 38 },
          { course: 'CSS', avgScore: 82, students: 28 },
          { course: 'Python', avgScore: 76, students: 35 },
        ],
        difficultyCounts: [
          { difficulty: 'Easy', count: 450 },
          { difficulty: 'Medium', count: 320 },
          { difficulty: 'Hard', count: 180 },
        ],
        userEngagement: [
          { week: 'Week 1', active: 120, inactive: 40 },
          { week: 'Week 2', active: 130, inactive: 35 },
          { week: 'Week 3', active: 140, inactive: 30 },
          { week: 'Week 4', active: 142, inactive: 28 },
        ]
      });
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📊 Platform Reports</h1>
        <p className="text-gray-600 mt-1">Analytics and insights</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports?.coursePerformance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Engagement */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports?.userEngagement || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#10b981" name="Active" />
              <Bar dataKey="inactive" fill="#ef4444" name="Inactive" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Question Difficulty Distribution */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Question Distribution by Difficulty</h2>
        <div className="grid grid-cols-3 gap-4">
          {reports?.difficultyCounts.map((item) => (
            <div key={item.difficulty} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-medium">{item.difficulty}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{item.count}</p>
              <p className="text-xs text-gray-600 mt-1">Questions</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Course Statistics Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enrolled Students</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Average Score</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {reports?.coursePerformance.map((course) => (
              <tr key={course.course} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.course}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{course.students}</td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    {course.avgScore}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                    {Math.floor(course.avgScore / 100 * 85)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminReports;
