import { useState, useMemo } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import Pagination from '../../components/Pagination';

const DeliveryOrders = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockDeliveryOrders = [
    { id: 'DO/00001', customer: 'ABC Electronics', date: '2024-01-15', status: 'Ready', totalItems: 15 },
    { id: 'DO/00002', customer: 'Fashion Store', date: '2024-01-14', status: 'Packed', totalItems: 8 },
    { id: 'DO/00003', customer: 'Coffee Shop Chain', date: '2024-01-14', status: 'Picked', totalItems: 25 },
    { id: 'DO/00004', customer: 'Garden Center', date: '2024-01-13', status: 'Draft', totalItems: 12 },
    { id: 'DO/00005', customer: 'Tech Retailer', date: '2024-01-13', status: 'Done', totalItems: 20 },
    { id: 'DO/00006', customer: 'Clothing Boutique', date: '2024-01-12', status: 'Canceled', totalItems: 5 },
    { id: 'DO/00007', customer: 'Restaurant Supply', date: '2024-01-12', status: 'Ready', totalItems: 18 },
    { id: 'DO/00008', customer: 'Home Goods Store', date: '2024-01-11', status: 'Packed', totalItems: 10 },
    { id: 'DO/00009', customer: 'Electronics Hub', date: '2024-01-11', status: 'Done', totalItems: 22 },
    { id: 'DO/00010', customer: 'Fashion Outlet', date: '2024-01-10', status: 'Picked', totalItems: 14 }
  ];

  const statuses = ['Draft', 'Ready', 'Picked', 'Packed', 'Done', 'Canceled'];

  const filteredOrders = useMemo(() => {
    return mockDeliveryOrders.filter(order => {
      return !statusFilter || order.status === statusFilter;
    });
  }, [statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'Packed': return 'bg-blue-100 text-blue-800';
      case 'Picked': return 'bg-purple-100 text-purple-800';
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
        <h2 className="text-2xl font-bold text-gray-800">Delivery Orders</h2>
        <a href="/delivery-orders/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
          Create Delivery Order
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
        {paginatedOrders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDate(order.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.totalItems}</td>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {statusFilter ? 'No delivery orders found' : 'No delivery orders yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {statusFilter
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'Get started by creating your first delivery order.'}
            </p>
            {!statusFilter && (
              <a href="/delivery-orders/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block">
                Create Delivery Order
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryOrders;