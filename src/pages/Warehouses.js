import { useState } from 'react';
import Pagination from '../components/Pagination';

const Warehouses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Warehouse', code: 'WH001', address: '123 Industrial Ave, City Center, NY 10001' },
    { id: 2, name: 'Secondary Warehouse', code: 'WH002', address: '456 Storage Blvd, East District, NY 10002' },
    { id: 3, name: 'Distribution Center', code: 'DC001', address: '789 Logistics Park, West Side, NY 10003' },
    { id: 4, name: 'Cold Storage Facility', code: 'CS001', address: '321 Refrigeration Way, North Zone, NY 10004' },
    { id: 5, name: 'Returns Processing Center', code: 'RPC001', address: '654 Return Lane, South Area, NY 10005' },
    { id: 6, name: 'Overflow Storage', code: 'OS001', address: '987 Backup Street, Suburban, NY 10006' }
  ]);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', code: '', address: '' });

  const addWarehouse = () => {
    if (!newWarehouse.name || !newWarehouse.code || !newWarehouse.address) {
      alert('Please fill all fields');
      return;
    }
    const warehouse = {
      id: warehouses.length + 1,
      ...newWarehouse
    };
    setWarehouses([...warehouses, warehouse]);
    setNewWarehouse({ name: '', code: '', address: '' });
    document.getElementById('warehouseForm').classList.add('hidden');
  };

  const totalPages = Math.ceil(warehouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWarehouses = warehouses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Warehouses</h2>
        <button 
          onClick={() => document.getElementById('warehouseForm').classList.toggle('hidden')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Warehouse
        </button>
      </div>

      {/* Add Warehouse Form */}
      <div id="warehouseForm" className="hidden bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Warehouse</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newWarehouse.name}
              onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Warehouse name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
            <input
              type="text"
              value={newWarehouse.code}
              onChange={(e) => setNewWarehouse({...newWarehouse, code: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="WH001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={newWarehouse.address}
              onChange={(e) => setNewWarehouse({...newWarehouse, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full address"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={addWarehouse}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Warehouse
          </button>
          <button
            onClick={() => document.getElementById('warehouseForm').classList.add('hidden')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {paginatedWarehouses.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedWarehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{warehouse.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{warehouse.code}</td>
                      <td className="px-6 py-4 text-gray-600">{warehouse.address}</td>
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
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No warehouses yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first warehouse.</p>
            <button 
              onClick={() => document.getElementById('warehouseForm').classList.remove('hidden')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Warehouse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Warehouses;