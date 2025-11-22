import { useState, useMemo } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockProducts = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH001', category: 'Electronics', locations: { 'Main Warehouse': 45, 'Secondary Warehouse': 12 }, status: 'In Stock' },
    { id: 2, name: 'Cotton T-Shirt', sku: 'CT002', category: 'Clothing', locations: { 'Main Warehouse': 120, 'Distribution Center': 80 }, status: 'In Stock' },
    { id: 3, name: 'Coffee Beans', sku: 'CB003', category: 'Food & Beverage', locations: { 'Main Warehouse': 5 }, status: 'Low Stock' },
    { id: 4, name: 'Garden Hose', sku: 'GH004', category: 'Home & Garden', locations: { 'Secondary Warehouse': 0 }, status: 'Out of Stock' },
    { id: 5, name: 'Smartphone Case', sku: 'SC005', category: 'Electronics', locations: { 'Main Warehouse': 200, 'Secondary Warehouse': 150 }, status: 'In Stock' },
    { id: 6, name: 'Denim Jeans', sku: 'DJ006', category: 'Clothing', locations: { 'Distribution Center': 75 }, status: 'In Stock' },
    { id: 7, name: 'Organic Tea', sku: 'OT007', category: 'Food & Beverage', locations: { 'Main Warehouse': 8 }, status: 'Low Stock' },
    { id: 8, name: 'LED Bulb', sku: 'LB008', category: 'Electronics', locations: { 'Main Warehouse': 300 }, status: 'In Stock' },
    { id: 9, name: 'Yoga Mat', sku: 'YM009', category: 'Home & Garden', locations: { 'Secondary Warehouse': 25 }, status: 'In Stock' },
    { id: 10, name: 'Winter Jacket', sku: 'WJ010', category: 'Clothing', locations: { 'Main Warehouse': 0, 'Distribution Center': 0 }, status: 'Out of Stock' },
    { id: 11, name: 'Protein Powder', sku: 'PP011', category: 'Food & Beverage', locations: { 'Main Warehouse': 50 }, status: 'In Stock' },
    { id: 12, name: 'Bluetooth Speaker', sku: 'BS012', category: 'Electronics', locations: { 'Secondary Warehouse': 30 }, status: 'In Stock' }
  ];

  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden'];
  const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center'];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesWarehouse = !warehouseFilter || Object.keys(product.locations).includes(warehouseFilter);
      return matchesSearch && matchesCategory && matchesWarehouse;
    });
  }, [searchTerm, categoryFilter, warehouseFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLocations = (locations) => {
    return Object.entries(locations)
      .map(([location, qty]) => `${location}: ${qty}`)
      .join(', ');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Search and Filters */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by SKU or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-48">
                <FilterDropdown
                  label="Category"
                  options={categories}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                />
              </div>
              <div className="w-48">
                <FilterDropdown
                  label="Warehouse"
                  options={warehouses}
                  value={warehouseFilter}
                  onChange={setWarehouseFilter}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Per Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-gray-600">{formatLocations(product.locations)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
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
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || categoryFilter || warehouseFilter ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || categoryFilter || warehouseFilter 
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Get started by creating your first product.'}
            </p>
            {!(searchTerm || categoryFilter || warehouseFilter) && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Create Product
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;