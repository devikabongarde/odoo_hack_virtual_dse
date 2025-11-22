import { useState } from 'react';
import Pagination from '../components/Pagination';

const Locations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockLocations = [
    { id: 1, name: 'Aisle A-1', code: 'A1-001', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 2, name: 'Aisle A-2', code: 'A2-001', warehouse: 'Main Warehouse', type: 'Storage' },
    { id: 3, name: 'Receiving Dock 1', code: 'RD-001', warehouse: 'Main Warehouse', type: 'Receiving' },
    { id: 4, name: 'Shipping Dock 1', code: 'SD-001', warehouse: 'Main Warehouse', type: 'Shipping' },
    { id: 5, name: 'Cold Zone A', code: 'CZ-A01', warehouse: 'Cold Storage Facility', type: 'Cold Storage' },
    { id: 6, name: 'Returns Area', code: 'RT-001', warehouse: 'Returns Processing Center', type: 'Returns' }
  ];

  const totalPages = Math.ceil(mockLocations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLocations = mockLocations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Locations</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Location
        </button>
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