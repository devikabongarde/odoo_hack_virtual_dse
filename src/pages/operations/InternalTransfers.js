import { useState, useMemo } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import Pagination from '../../components/Pagination';

const InternalTransfers = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockTransfers = [
    { id: 'IT/00001', source: 'Main Warehouse', destination: 'Secondary Warehouse', date: '2024-01-15', status: 'Done', totalItems: 12 },
    { id: 'IT/00002', source: 'Secondary Warehouse', destination: 'Distribution Center', date: '2024-01-14', status: 'In Transit', totalItems: 8 },
    { id: 'IT/00003', source: 'Distribution Center', destination: 'Main Warehouse', date: '2024-01-14', status: 'Ready', totalItems: 15 },
    { id: 'IT/00004', source: 'Main Warehouse', destination: 'Distribution Center', date: '2024-01-13', status: 'Draft', totalItems: 20 },
    { id: 'IT/00005', source: 'Secondary Warehouse', destination: 'Main Warehouse', date: '2024-01-13', status: 'Done', totalItems: 6 },
    { id: 'IT/00006', source: 'Distribution Center', destination: 'Secondary Warehouse', date: '2024-01-12', status: 'Canceled', totalItems: 10 },
    { id: 'IT/00007', source: 'Main Warehouse', destination: 'Secondary Warehouse', date: '2024-01-12', status: 'In Transit', totalItems: 18 },
    { id: 'IT/00008', source: 'Secondary Warehouse', destination: 'Distribution Center', date: '2024-01-11', status: 'Ready', totalItems: 14 },
    { id: 'IT/00009', source: 'Distribution Center', destination: 'Main Warehouse', date: '2024-01-11', status: 'Done', totalItems: 9 },
    { id: 'IT/00010', source: 'Main Warehouse', destination: 'Distribution Center', date: '2024-01-10', status: 'Draft', totalItems: 22 }
  ];

  const statuses = ['Draft', 'Ready', 'In Transit', 'Done', 'Canceled'];

  const filteredTransfers = useMemo(() => {
    return mockTransfers.filter(transfer => {
      return !statusFilter || transfer.status === statusFilter;
    });
  }, [statusFilter]);

  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransfers = filteredTransfers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Internal Transfers</h2>
        <a href="/internal-transfers/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
          Create Transfer
        </a>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Filters */}
        <div className="p-6 border-b">
          <div className="w-48">
            <FilterDropdown
              label="Status"
              options={statuses}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Table */}
        {paginatedTransfers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transfer ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {transfer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{transfer.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{transfer.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDate(transfer.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{transfer.totalItems}</td>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {statusFilter ? 'No transfers found' : 'No transfers yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {statusFilter
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'Get started by creating your first internal transfer.'}
            </p>
            {!statusFilter && (
              <a href="/internal-transfers/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
                Create Transfer
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalTransfers;