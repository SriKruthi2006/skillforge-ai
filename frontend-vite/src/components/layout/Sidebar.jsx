import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const studentMenuItems = [
    { label: 'Dashboard', icon: '📊', path: '/student/dashboard' },
    { label: 'Courses', icon: '📚', path: '/student/courses' },
    { label: 'Tests', icon: '✏️', path: '/student/tests' },
    { label: 'Reports', icon: '📈', path: '/student/reports' },
    { label: 'Profile', icon: '👤', path: '/student/profile' },
  ];

  const adminMenuItems = [
    { label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { label: 'Manage Courses', icon: '📚', path: '/admin/courses' },
    { label: 'Manage Questions', icon: '❓', path: '/admin/questions' },
    { label: 'Manage Users', icon: '👥', path: '/admin/users' },
    { label: 'Reports', icon: '📈', path: '/admin/reports' },
  ];

  const menuItems = isAdmin ? adminMenuItems : studentMenuItems;

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } min-h-screen flex flex-col fixed left-0 top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              SF
            </div>
            <span className="font-bold text-lg text-gray-900">SkillForge</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
        >
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
