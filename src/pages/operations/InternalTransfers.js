import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterDropdown from '../../components/FilterDropdown';
import Pagination from '../../components/Pagination';

const InternalTransfers = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [transfers, setTransfers] = useState([
    { transfer_id: 'IT/00001', source_location: 'Main Warehouse', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-15', status: 'Done', total_items: 12 },
    { transfer_id: 'IT/00002', source_location: 'Secondary Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-14', status: 'In Transit', total_items: 8 },
    { transfer_id: 'IT/00003', source_location: 'Distribution Center', destination_location: 'Main Warehouse', transfer_date: '2024-01-14', status: 'Ready', total_items: 15 },
    { transfer_id: 'IT/00004', source_location: 'Main Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-13', status: 'Draft', total_items: 20 },
    { transfer_id: 'IT/00005', source_location: 'Secondary Warehouse', destination_location: 'Main Warehouse', transfer_date: '2024-01-13', status: 'Done', total_items: 6 },
    { transfer_id: 'IT/00006', source_location: 'Distribution Center', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-12', status: 'Canceled', total_items: 10 },
    { transfer_id: 'IT/00007', source_location: 'Main Warehouse', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-12', status: 'In Transit', total_items: 18 },
    { transfer_id: 'IT/00008', source_location: 'Secondary Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-11', status: 'Ready', total_items: 14 },
    { transfer_id: 'IT/00009', source_location: 'Distribution Center', destination_location: 'Main Warehouse', transfer_date: '2024-01-11', status: 'Done', total_items: 9 },
    { transfer_id: 'IT/00010', source_location: 'Main Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-10', status: 'Draft', total_items: 22 },
    { transfer_id: 'IT/00011', source_location: 'Secondary Warehouse', destination_location: 'Main Warehouse', transfer_date: '2024-01-09', status: 'Done', total_items: 16 },
    { transfer_id: 'IT/00012', source_location: 'Main Warehouse', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-08', status: 'In Transit', total_items: 11 },
    { transfer_id: 'IT/00013', source_location: 'Distribution Center', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-08', status: 'Ready', total_items: 7 },
    { transfer_id: 'IT/00014', source_location: 'Secondary Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-07', status: 'Done', total_items: 25 },
    { transfer_id: 'IT/00015', source_location: 'Main Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-06', status: 'Draft', total_items: 19 },
    { transfer_id: 'IT/00016', source_location: 'Distribution Center', destination_location: 'Main Warehouse', transfer_date: '2024-01-05', status: 'In Transit', total_items: 13 },
    { transfer_id: 'IT/00017', source_location: 'Secondary Warehouse', destination_location: 'Main Warehouse', transfer_date: '2024-01-04', status: 'Ready', total_items: 21 },
    { transfer_id: 'IT/00018', source_location: 'Main Warehouse', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-03', status: 'Done', total_items: 8 },
    { transfer_id: 'IT/00019', source_location: 'Distribution Center', destination_location: 'Secondary Warehouse', transfer_date: '2024-01-02', status: 'Canceled', total_items: 5 },
    { transfer_id: 'IT/00020', source_location: 'Secondary Warehouse', destination_location: 'Distribution Center', transfer_date: '2024-01-01', status: 'Draft', total_items: 17 },
    { transfer_id: 'IT/00021', source_location: 'Main Warehouse', destination_location: 'Distribution Center', transfer_date: '2023-12-31', status: 'In Transit', total_items: 14 },
    { transfer_id: 'IT/00022', source_location: 'Distribution Center', destination_location: 'Main Warehouse', transfer_date: '2023-12-30', status: 'Ready', total_items: 23 },
    { transfer_id: 'IT/00023', source_location: 'Secondary Warehouse', destination_location: 'Main Warehouse', transfer_date: '2023-12-29', status: 'Done', total_items: 9 },
    { transfer_id: 'IT/00024', source_location: 'Main Warehouse', destination_location: 'Secondary Warehouse', transfer_date: '2023-12-28', status: 'Draft', total_items: 12 },
    { transfer_id: 'IT/00025', source_location: 'Distribution Center', destination_location: 'Secondary Warehouse', transfer_date: '2023-12-27', status: 'In Transit', total_items: 18 }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transfers');
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['Draft', 'Ready', 'In Transit', 'Done', 'Canceled'];

  const filteredTransfers = useMemo(() => {
    return transfers.filter(transfer => {
      return !statusFilter || transfer.status === statusFilter;
    });
  }, [statusFilter, transfers]);

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
        <Link to="/dashboard/internal-transfers/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
          Create Transfer
        </Link>
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-gray-500">Loading transfers...</p>
          </div>
        ) : paginatedTransfers.length > 0 ? (
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
                        {transfer.transfer_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{transfer.source_location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{transfer.destination_location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDate(transfer.transfer_date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{transfer.total_items}</td>
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
              <Link to="/dashboard/internal-transfers/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
                Create Transfer
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalTransfers;