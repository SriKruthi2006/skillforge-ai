import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const StudentProfile = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👤 My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="text-2xl font-bold text-gray-900">John Doe</p>
          </div>
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
            JD
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-900">student@skillforge.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Account Type</p>
            <p className="font-medium text-gray-900">Student</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Member Since</p>
            <p className="font-medium text-gray-900">January 10, 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Learning Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Tests Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">78%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">45h</p>
              <p className="text-sm text-gray-600">Learning Time</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">⚙️ Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-900">Email Notifications</p>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-900">Learning Reminders</p>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <p className="font-medium text-gray-900">Public Profile</p>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 bg-red-50">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🚨 Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">Irreversible actions</p>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  );
};

export default StudentProfile;
