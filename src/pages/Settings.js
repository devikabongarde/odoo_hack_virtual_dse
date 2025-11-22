import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsItems = [
    {
      title: 'Warehouses',
      description: 'Manage warehouse locations and configurations',
      path: '/dashboard/settings/warehouses',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    },
    {
      title: 'Locations',
      description: 'Configure storage locations within warehouses',
      path: '/dashboard/settings/locations',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="text-blue-500 mr-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;