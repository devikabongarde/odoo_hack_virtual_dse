import { useState, useMemo } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import Pagination from '../../components/Pagination';

const Receipts = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockReceipts = [
    { id: 'RCP/00001', supplier: 'Tech Solutions Inc.', date: '2024-01-15', status: 'Done', totalItems: 25 },
    { id: 'RCP/00002', supplier: 'Fashion World Ltd.', date: '2024-01-14', status: 'Waiting', totalItems: 18 },
    { id: 'RCP/00003', supplier: 'Food Distributors Co.', date: '2024-01-14', status: 'Ready', totalItems: 42 },
    { id: 'RCP/00004', supplier: 'Garden Supplies Pro', date: '2024-01-13', status: 'Draft', totalItems: 12 },
    { id: 'RCP/00005', supplier: 'Electronics Hub', date: '2024-01-13', status: 'Done', totalItems: 35 },
    { id: 'RCP/00006', supplier: 'Clothing Central', date: '2024-01-12', status: 'Canceled', totalItems: 8 },
    { id: 'RCP/00007', supplier: 'Beverage Masters', date: '2024-01-12', status: 'Ready', totalItems: 28 },
    { id: 'RCP/00008', supplier: 'Home Essentials', date: '2024-01-11', status: 'Waiting', totalItems: 15 },
    { id: 'RCP/00009', supplier: 'Tech Solutions Inc.', date: '2024-01-11', status: 'Done', totalItems: 22 },
    { id: 'RCP/00010', supplier: 'Fashion World Ltd.', date: '2024-01-10', status: 'Draft', totalItems: 31 },
    { id: 'RCP/00011', supplier: 'Food Distributors Co.', date: '2024-01-10', status: 'Ready', totalItems: 19 },
    { id: 'RCP/00012', supplier: 'Garden Supplies Pro', date: '2024-01-09', status: 'Done', totalItems: 14 }
  ];

  const statuses = ['Draft', 'Waiting', 'Ready', 'Done', 'Canceled'];
  const dateRanges = ['Today', 'This Week', 'This Month', 'Last Month'];

  const filteredReceipts = useMemo(() => {
    return mockReceipts.filter(receipt => {
      const matchesStatus = !statusFilter || receipt.status === statusFilter;
      const matchesDate = !dateFilter || (
        dateFilter === 'Today' && receipt.date === '2024-01-15' ||
        dateFilter === 'This Week' && new Date(receipt.date) >= new Date('2024-01-09') ||
        dateFilter === 'This Month' && receipt.date.startsWith('2024-01') ||
        dateFilter === 'Last Month' && receipt.date.startsWith('2023-12')
      );
      return matchesStatus && matchesDate;
    });
  }, [statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReceipts = filteredReceipts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'Ready': return 'bg-blue-100 text-blue-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
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
        <h2 className="text-2xl font-bold text-gray-800">Receipts</h2>
        <a href="/receipts/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
          Create Receipt
        </a>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Filters */}
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="w-48">
              <FilterDropdown
                label="Status"
                options={statuses}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>
            <div className="w-48">
              <FilterDropdown
                label="Date Range"
                options={dateRanges}
                value={dateFilter}
                onChange={setDateFilter}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        {paginatedReceipts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedReceipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {receipt.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{receipt.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDate(receipt.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(receipt.status)}`}>
                          {receipt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{receipt.totalItems}</td>
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
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {statusFilter || dateFilter ? 'No receipts found' : 'No receipts yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {statusFilter || dateFilter
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'Get started by creating your first receipt.'}
            </p>
            {!(statusFilter || dateFilter) && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Create Receipt
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipts;