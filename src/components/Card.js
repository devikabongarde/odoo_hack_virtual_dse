const Card = ({ title, value, subtitle, icon, color = "blue", trend }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600", 
    red: "text-red-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600"
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.positive ? '↗' : '↘'}</span>
              <span className="ml-1">{trend.value}</span>
            </div>
          )}
        </div>
        {icon && <div className="text-gray-600">{icon}</div>}
      </div>
    </div>
  );
};

export default Card;