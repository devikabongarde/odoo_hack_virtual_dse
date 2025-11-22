import { useState } from 'react';
import Pagination from '../components/Pagination';

const Locations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [locations, setLocations] = useState([
    { id: 1, name: 'Aisle A-1', code: 'A1-001', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 2, name: 'Aisle A-2', code: 'A2-001', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 3, name: 'Receiving Dock 1', code: 'RD-001', warehouse: 'Main Warehouse', type: 'Receiving' },
    { id: 4, name: 'Shipping Dock 1', code: 'SD-001', warehouse: 'Main Warehouse', type: 'Shipping' },
    { id: 5, name: 'Cold Zone A', code: 'CZ-A01', warehouse: 'Cold Storage Facility', type: 'Cold Storage' },
    { id: 6, name: 'Returns Area', code: 'RT-001', warehouse: 'Returns Processing Center', type: 'Returns' }
  ]);
  const [newLocation, setNewLocation] = useState({ name: '', code: '', warehouse: '', type: '' });
  
  const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Cold Storage Facility', 'Returns Processing Center'];
  const types = ['Storage', 'Receiving', 'Shipping', 'Cold Storage', 'Returns'];

  const addLocation = () => {
    if (!newLocation.name || !newLocation.code || !newLocation.warehouse || !newLocation.type) {
      alert('Please fill all fields');
      return;
    }
    const location = {
      id: locations.length + 1,
      ...newLocation
    };
    setLocations([...locations, location]);
    setNewLocation({ name: '', code: '', warehouse: '', type: '' });
    document.getElementById('locationForm').classList.add('hidden');
  };

  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLocations = locations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Locations</h2>
        <button 
          onClick={() => document.getElementById('locationForm').classList.toggle('hidden')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Location
        </button>
      </div>

      {/* Add Location Form */}
      <div id="locationForm" className="hidden bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newLocation.name}
              onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Location name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
            <input
              type="text"
              value={newLocation.code}
              onChange={(e) => setNewLocation({...newLocation, code: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A1-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
            <select
              value={newLocation.warehouse}
              onChange={(e) => setNewLocation({...newLocation, warehouse: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select warehouse...</option>
              {warehouses.map(warehouse => (
                <option key={warehouse} value={warehouse}>{warehouse}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newLocation.type}
              onChange={(e) => setNewLocation({...newLocation, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type...</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={addLocation}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Location
          </button>
          <button
            onClick={() => document.getElementById('locationForm').classList.add('hidden')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{location.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{location.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{location.warehouse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{location.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Locations;