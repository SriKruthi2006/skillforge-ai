import { useEffect, useState } from 'react';
import { studentAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Report = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await studentAPI.getReports();
      setReports(response.data || {
        overall: {
          totalTests: 15,
          averageScore: 78,
          accuracy: 82,
          timeSpent: 145,
        },
        weakAreas: [
          { topic: 'Async/Await', accuracy: 65, questionsAttempted: 12 },
          { topic: 'Closures', accuracy: 70, questionsAttempted: 10 },
          { topic: 'Prototypes', accuracy: 72, questionsAttempted: 8 },
        ],
        strongAreas: [
          { topic: 'Variables & Types', accuracy: 95 },
          { topic: 'Functions', accuracy: 92 },
          { topic: 'Array Methods', accuracy: 88 },
        ],
        topicProgress: [
          { topic: 'JavaScript', mastery: 78 },
          { topic: 'React', mastery: 65 },
          { topic: 'CSS', mastery: 85 },
          { topic: 'HTML', mastery: 90 },
        ],
        suggestedPractice: [
          { topic: 'Async/Await', reason: 'Low accuracy (65%)', priority: 'High' },
          { topic: 'Error Handling', reason: 'Not yet attempted', priority: 'Medium' },
          { topic: 'Advanced Selectors', reason: 'Low accuracy (72%)', priority: 'Medium' },
        ],
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
        <h1 className="text-3xl font-bold text-gray-900">📈 Performance Report</h1>
        <p className="text-gray-600 mt-1">Your learning analytics and progress</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Total Tests</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{reports?.overall.totalTests}</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Average Score</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{reports?.overall.averageScore}%</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Accuracy</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{reports?.overall.accuracy}%</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Time Spent</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{reports?.overall.timeSpent}h</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Progress */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Topic Mastery</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports?.topicProgress || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mastery" fill="#3b82f6" name="Mastery %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Accuracy Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Strong (85%+)', value: 45 },
                  { name: 'Good (70-85%)', value: 35 },
                  { name: 'Needs Work (<70%)', value: 20 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔴 Areas for Improvement</h2>
          <div className="space-y-4">
            {reports?.weakAreas.map((area, idx) => (
              <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{area.topic}</p>
                  <span className="text-sm text-red-700 font-bold">{area.accuracy}%</span>
                </div>
                <ProgressBar value={area.accuracy} max={100} color="red" />
                <p className="text-xs text-gray-600 mt-2">{area.questionsAttempted} questions attempted</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Strong Areas */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🟢 Strong Areas</h2>
          <div className="space-y-4">
            {reports?.strongAreas.map((area, idx) => (
              <div key={idx} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{area.topic}</p>
                  <span className="text-sm text-green-700 font-bold">{area.accuracy}%</span>
                </div>
                <ProgressBar value={area.accuracy} max={100} color="green" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Suggested Practice */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 AI-Recommended Practice Areas</h2>
        <div className="space-y-3">
          {reports?.suggestedPractice.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.topic}</p>
                <p className="text-sm text-gray-600">{item.reason}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.priority === 'High' ? 'bg-red-100 text-red-800' :
                item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Report;
