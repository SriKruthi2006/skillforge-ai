import Card from './Card';

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue',
  subcontent = null 
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  const trendColor = trend?.isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <Card className={`p-6 border-l-4 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subcontent && <p className="text-xs text-gray-600 mt-2">{subcontent}</p>}
        </div>
        {Icon && (
          <div className={`p-3 bg-white rounded-lg text-2xl`}>
            <Icon />
          </div>
        )}
      </div>
      {trend && (
        <div className={`text-sm mt-4 ${trendColor}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.text}
        </div>
      )}
    </Card>
  );
}
