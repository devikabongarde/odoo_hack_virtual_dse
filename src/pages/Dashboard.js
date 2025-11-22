import { useState } from 'react';
import Card from '../components/Card';
import FilterDropdown from '../components/FilterDropdown';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    documentType: '',
    status: '',
    warehouse: '',
    category: ''
  });

  const kpiData = {
    totalProducts: { value: 2847, trend: { positive: true, value: '+12%' } },
    lowStock: { value: 23, outOfStock: 8 },
    pendingReceipts: { value: 15, trend: { positive: false, value: '-3%' } },
    pendingDeliveries: { value: 32, trend: { positive: true, value: '+8%' } },
    internalTransfers: { value: 7, trend: { positive: true, value: '+2%' } }
  };

  const filterOptions = {
    documentType: ['Receipts', 'Delivery', 'Internal', 'Adjustments'],
    status: ['Draft', 'Waiting', 'Ready', 'Done', 'Canceled'],
    warehouse: ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center'],
    category: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden']
  };

  const recentActivity = [
    { action: 'Receipt RCP/00045 confirmed', time: '5 min ago', type: 'receipt' },
    { action: 'Delivery DO/00123 shipped', time: '12 min ago', type: 'delivery' },
    { action: 'Internal transfer IT/00089 completed', time: '25 min ago', type: 'transfer' },
    { action: 'Stock adjustment for Product XYZ', time: '1 hour ago', type: 'adjustment' },
    { action: 'Low stock alert: Product ABC', time: '2 hours ago', type: 'alert' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card
          title="Total Products in Stock"
          value={kpiData.totalProducts.value.toLocaleString()}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          color="blue"
          trend={kpiData.totalProducts.trend}
        />
        <Card
          title="Low Stock / Out of Stock"
          value={kpiData.lowStock.value}
          subtitle={`${kpiData.lowStock.outOfStock} out of stock`}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}
          color="red"
        />
        <Card
          title="Pending Receipts"
          value={kpiData.pendingReceipts.value}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>}
          color="yellow"
          trend={kpiData.pendingReceipts.trend}
        />
        <Card
          title="Pending Deliveries"
          value={kpiData.pendingDeliveries.value}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" /></svg>}
          color="green"
          trend={kpiData.pendingDeliveries.trend}
        />
        <Card
          title="Internal Transfers Scheduled"
          value={kpiData.internalTransfers.value}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
          color="purple"
          trend={kpiData.internalTransfers.trend}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterDropdown
            label="Document Type"
            options={filterOptions.documentType}
            value={filters.documentType}
            onChange={(value) => setFilters({...filters, documentType: value})}
          />
          <FilterDropdown
            label="Status"
            options={filterOptions.status}
            value={filters.status}
            onChange={(value) => setFilters({...filters, status: value})}
          />
          <FilterDropdown
            label="Warehouse / Location"
            options={filterOptions.warehouse}
            value={filters.warehouse}
            onChange={(value) => setFilters({...filters, warehouse: value})}
          />
          <FilterDropdown
            label="Product Category"
            options={filterOptions.category}
            value={filters.category}
            onChange={(value) => setFilters({...filters, category: value})}
          />
        </div>
        {(filters.documentType || filters.status || filters.warehouse || filters.category) && (
          <div className="mt-4">
            <button
              onClick={() => setFilters({ documentType: '', status: '', warehouse: '', category: '' })}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'receipt' ? 'bg-blue-500' :
                  activity.type === 'delivery' ? 'bg-green-500' :
                  activity.type === 'transfer' ? 'bg-purple-500' :
                  activity.type === 'adjustment' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-gray-600">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;