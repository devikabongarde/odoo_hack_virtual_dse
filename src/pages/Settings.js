import { useState } from 'react';

const Settings = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const warehouses = [
    { id: 'WH001', name: 'Main Warehouse', address: '123 Industrial Ave' },
    { id: 'WH002', name: 'Secondary Warehouse', address: '456 Storage Blvd' },
    { id: 'DC001', name: 'Distribution Center', address: '789 Logistics Park' }
  ];

  const locations = [
    { id: 'A1-001', name: 'Aisle A-1', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 'A2-001', name: 'Aisle A-2', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 'RD-001', name: 'Receiving Dock 1', warehouse: 'Main Warehouse', type: 'Receiving' },
    { id: 'CZ-A01', name: 'Cold Zone A', warehouse: 'Secondary Warehouse', type: 'Cold Storage' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouses Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Warehouses</h3>
          </div>
          
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="">Select warehouse...</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
            ))}
          </select>
          
          {selectedWarehouse && (
            <div className="bg-gray-50 p-4 rounded-lg">
              {warehouses.filter(w => w.id === selectedWarehouse).map(warehouse => (
                <div key={warehouse.id}>
                  <div className="font-medium text-gray-900">{warehouse.name}</div>
                  <div className="text-sm text-gray-600">Code: {warehouse.id}</div>
                  <div className="text-sm text-gray-600">Address: {warehouse.address}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
            Add New Warehouse
          </button>
        </div>

        {/* Locations Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Locations</h3>
          </div>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="">Select location...</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
          
          {selectedLocation && (
            <div className="bg-gray-50 p-4 rounded-lg">
              {locations.filter(l => l.id === selectedLocation).map(location => (
                <div key={location.id}>
                  <div className="font-medium text-gray-900">{location.name}</div>
                  <div className="text-sm text-gray-600">Code: {location.id}</div>
                  <div className="text-sm text-gray-600">Warehouse: {location.warehouse}</div>
                  <div className="text-sm text-gray-600">Type: {location.type}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
            Add New Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;