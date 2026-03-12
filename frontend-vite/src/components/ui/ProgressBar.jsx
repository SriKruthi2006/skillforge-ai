export default function ProgressBar({ value = 0, max = 100, label = '', size = 'md', color = 'purple', showPercentage = true }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  const colorClasses = {\n    blue: 'from-blue-500 to-blue-600',\n    green: 'from-green-500 to-green-600',\n    yellow: 'from-yellow-500 to-yellow-600',\n    red: 'from-red-500 to-red-600',\n    purple: 'from-purple-500 via-purple-600 to-purple-700',\n  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',\n  };\n\n  return (\n    <div className=\"w-full space-y-1\">\n      {label && <p className=\"text-sm font-semibold text-slate-300\">{label}</p>}\n      <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${sizeClasses[size]} shadow-inner`}>\n        <div\n          className={`bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500 ease-out h-full shadow-lg shadow-purple-500/20`}\n          style={{ width: `${Math.min(percentage, 100)}%` }}\n        >\n          {/* Shimmer effect */}\n          <div className=\"absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse\" />\n        </div>\n      </div>\n      {showPercentage && (\n        <div className=\"flex items-center justify-between text-xs text-slate-400\">\n          <span>{value} of {max}</span>\n          <span className=\"font-semibold text-slate-200\">{percentage}%</span>\n        </div>\n      )}\n    </div>\n  );
