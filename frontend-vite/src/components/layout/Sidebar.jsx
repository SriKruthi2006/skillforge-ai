import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout, isAdmin } = useAuth();

  const studentMenuItems = [
    { label: 'Dashboard', icon: '📊', path: '/student/dashboard' },
    { label: 'Courses', icon: '📚', path: '/student/courses' },
    { label: 'Tests', icon: '✏️', path: '/student/tests' },
    { label: 'Results', icon: '📈', path: '/student/results' },
    { label: 'Profile', icon: '👤', path: '/student/profile' },
  ];

  const adminMenuItems = [
    { label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { label: 'Courses', icon: '📚', path: '/admin/courses' },
    { label: 'Questions', icon: '❓', path: '/admin/questions' },
    { label: 'Users', icon: '👥', path: '/admin/users' },
    { label: 'Reports', icon: '📈', path: '/admin/reports' },
  ];

  const menuItems = isAdmin ? adminMenuItems : studentMenuItems;
  const isActive = (path) => location.pathname.startsWith(path.split('/').slice(0, -1).join('/'));

  return (
    <aside
      className={`bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-20'
      } min-h-screen flex flex-col sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SF
            </div>
            <span className="font-bold text-lg text-white">SkillForge</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
            }`}
            title={!isOpen ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
          title="Logout"
        >
          <span className="text-xl flex-shrink-0">🚪</span>
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
