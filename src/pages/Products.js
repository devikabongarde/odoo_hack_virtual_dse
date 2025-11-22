import { useState, useMemo, useEffect } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';

const Products = () => {
  const mockProducts = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', locations: { 'Main Warehouse': 75, 'Secondary Warehouse': 45, 'Distribution Center': 30 }, status: 'In Stock' },
    { id: 2, name: 'Office Chair', sku: 'OC-002', category: 'Furniture', locations: { 'Main Warehouse': 25, 'Secondary Warehouse': 30, 'Distribution Center': 20 }, status: 'In Stock' },
    { id: 3, name: 'Cotton T-Shirt', sku: 'CT-003', category: 'Clothing', locations: { 'Main Warehouse': 100, 'Secondary Warehouse': 50, 'Distribution Center': 50 }, status: 'In Stock' },
    { id: 4, name: 'Coffee Beans', sku: 'CB-004', category: 'Food & Beverage', locations: { 'Main Warehouse': 60, 'Secondary Warehouse': 35, 'Distribution Center': 25 }, status: 'In Stock' },
    { id: 5, name: 'Garden Hose', sku: 'GH-005', category: 'Home & Garden', locations: { 'Main Warehouse': 20, 'Secondary Warehouse': 15, 'Distribution Center': 10 }, status: 'In Stock' },
    { id: 6, name: 'Smartphone Case', sku: 'SC-006', category: 'Electronics', locations: { 'Main Warehouse': 150, 'Secondary Warehouse': 100, 'Distribution Center': 50 }, status: 'In Stock' },
    { id: 7, name: 'LED Bulb', sku: 'LB-007', category: 'Electronics', locations: { 'Main Warehouse': 250, 'Secondary Warehouse': 150, 'Distribution Center': 100 }, status: 'In Stock' },
    { id: 8, name: 'Laptop Stand', sku: 'LS-008', category: 'Electronics', locations: { 'Main Warehouse': 30, 'Secondary Warehouse': 20, 'Distribution Center': 10 }, status: 'In Stock' },
    { id: 9, name: 'Desk Lamp', sku: 'DL-009', category: 'Electronics', locations: { 'Main Warehouse': 40, 'Secondary Warehouse': 25, 'Distribution Center': 20 }, status: 'In Stock' },
    { id: 10, name: 'Mouse Pad', sku: 'MP-010', category: 'Electronics', locations: { 'Main Warehouse': 90, 'Secondary Warehouse': 60, 'Distribution Center': 30 }, status: 'In Stock' },
    { id: 11, name: 'USB Cable', sku: 'UC-011', category: 'Electronics', locations: { 'Main Warehouse': 200, 'Secondary Warehouse': 120, 'Distribution Center': 80 }, status: 'In Stock' },
    { id: 12, name: 'Water Bottle', sku: 'WB-012', category: 'Sports & Outdoors', locations: { 'Main Warehouse': 45, 'Secondary Warehouse': 30, 'Distribution Center': 15 }, status: 'In Stock' },
    { id: 13, name: 'Bluetooth Speaker', sku: 'BS-013', category: 'Electronics', locations: { 'Main Warehouse': 35, 'Secondary Warehouse': 20, 'Distribution Center': 10 }, status: 'In Stock' },
    { id: 14, name: 'Notebook', sku: 'NB-014', category: 'Office Supplies', locations: { 'Main Warehouse': 125, 'Secondary Warehouse': 75, 'Distribution Center': 50 }, status: 'In Stock' },
    { id: 15, name: 'Pen Set', sku: 'PS-015', category: 'Office Supplies', locations: { 'Main Warehouse': 75, 'Secondary Warehouse': 50, 'Distribution Center': 25 }, status: 'In Stock' },
    { id: 16, name: 'Desk Organizer', sku: 'DO-016', category: 'Office Supplies', locations: { 'Main Warehouse': 20, 'Secondary Warehouse': 10, 'Distribution Center': 10 }, status: 'Low Stock' },
    { id: 17, name: 'Monitor Stand', sku: 'MS-017', category: 'Electronics', locations: { 'Main Warehouse': 15, 'Secondary Warehouse': 10, 'Distribution Center': 10 }, status: 'Low Stock' },
    { id: 18, name: 'Keyboard', sku: 'KB-018', category: 'Electronics', locations: { 'Main Warehouse': 55, 'Secondary Warehouse': 35, 'Distribution Center': 20 }, status: 'In Stock' },
    { id: 19, name: 'Mouse', sku: 'MO-019', category: 'Electronics', locations: { 'Main Warehouse': 65, 'Secondary Warehouse': 40, 'Distribution Center': 25 }, status: 'In Stock' },
    { id: 20, name: 'External Hard Drive', sku: 'EH-020', category: 'Electronics', locations: { 'Main Warehouse': 12, 'Secondary Warehouse': 8, 'Distribution Center': 5 }, status: 'Low Stock' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: '', price: '' });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (Array.isArray(data)) {
        // Transform the data to match the expected format
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          sku: product.sku,
          category: 'Electronics', // Since we don't have category in the current schema
          locations: {
            'Main Warehouse': product.quantity,
            'Secondary Warehouse': 0,
            'Distribution Center': 0
          },
          status: product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock'
        }));
        setProducts(transformedProducts);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports & Outdoors', 'Office Supplies'];
  const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesWarehouse = !warehouseFilter || Object.keys(product.locations).includes(warehouseFilter);
      return matchesSearch && matchesCategory && matchesWarehouse;
    });
  }, [searchTerm, categoryFilter, warehouseFilter, products]);

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

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.quantity || !newProduct.price) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          sku: newProduct.sku,
          quantity: parseInt(newProduct.quantity) || 0,
          price: parseFloat(newProduct.price) || 0
        })
      });

      if (response.ok) {
        const createdProduct = await response.json();
        const transformed = {
          id: createdProduct.id,
          name: createdProduct.name,
          sku: createdProduct.sku,
          category: 'Electronics',
          locations: { 'Main Warehouse': createdProduct.quantity, 'Secondary Warehouse': 0, 'Distribution Center': 0 },
          status: createdProduct.quantity > 10 ? 'In Stock' : createdProduct.quantity > 0 ? 'Low Stock' : 'Out of Stock'
        };
        setProducts([...products, transformed]);
        setNewProduct({ name: '', sku: '', quantity: '', price: '' });
        document.getElementById('productForm').classList.add('hidden');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => document.getElementById('productForm').classList.toggle('hidden')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </div>

      {/* Create Product Form */}
      <div id="productForm" className="hidden bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Create New Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
            <input
              type="text"
              value={newProduct.sku}
              onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="SKU"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={createProduct}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Create Product
          </button>
          <button
            onClick={() => document.getElementById('productForm').classList.add('hidden')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : paginatedProducts.length > 0 ? (
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