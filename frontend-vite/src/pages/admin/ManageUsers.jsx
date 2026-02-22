import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      setUsers(response.data || [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'STUDENT', joinDate: '2026-01-10', status: 'Active' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'STUDENT', joinDate: '2026-01-12', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'ADMIN', joinDate: '2025-12-01', status: 'Active' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'STUDENT', joinDate: '2026-02-01', status: 'Inactive' },
      ]);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 Manage Users</h1>
        <p className="text-gray-600 mt-1">View and manage user accounts</p>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Role</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Join Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                    className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{user.joinDate}</td>
                <td className="px-6 py-4 text-sm text-center space-x-2">
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{users.filter(u => u.status === 'Active').length}</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-gray-600 text-sm font-medium">Admins</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{users.filter(u => u.role === 'ADMIN').length}</p>
        </Card>
      </div>
    </div>
  );
};

export default ManageUsers;
