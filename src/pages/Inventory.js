import { useState, useEffect } from 'react';

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', quantity: 150, price: 89.99 },
    { id: 2, name: 'Office Chair', sku: 'OC-002', quantity: 75, price: 249.99 },
    { id: 3, name: 'Cotton T-Shirt', sku: 'CT-003', quantity: 200, price: 19.99 },
    { id: 4, name: 'Coffee Beans', sku: 'CB-004', quantity: 120, price: 34.99 },
    { id: 5, name: 'Garden Hose', sku: 'GH-005', quantity: 45, price: 29.99 },
    { id: 6, name: 'Smartphone Case', sku: 'SC-006', quantity: 300, price: 14.99 },
    { id: 7, name: 'LED Bulb', sku: 'LB-007', quantity: 500, price: 8.99 },
    { id: 8, name: 'Laptop Stand', sku: 'LS-008', quantity: 60, price: 49.99 },
    { id: 9, name: 'Desk Lamp', sku: 'DL-009', quantity: 85, price: 39.99 },
    { id: 10, name: 'Mouse Pad', sku: 'MP-010', quantity: 180, price: 12.99 },
    { id: 11, name: 'USB Cable', sku: 'UC-011', quantity: 400, price: 9.99 },
    { id: 12, name: 'Water Bottle', sku: 'WB-012', quantity: 90, price: 24.99 },
    { id: 13, name: 'Bluetooth Speaker', sku: 'BS-013', quantity: 65, price: 79.99 },
    { id: 14, name: 'Notebook', sku: 'NB-014', quantity: 250, price: 4.99 },
    { id: 15, name: 'Pen Set', sku: 'PS-015', quantity: 150, price: 16.99 },
    { id: 16, name: 'Desk Organizer', sku: 'DO-016', quantity: 40, price: 34.99 },
    { id: 17, name: 'Monitor Stand', sku: 'MS-017', quantity: 35, price: 69.99 },
    { id: 18, name: 'Keyboard', sku: 'KB-018', quantity: 110, price: 119.99 },
    { id: 19, name: 'Mouse', sku: 'MO-019', quantity: 130, price: 39.99 },
    { id: 20, name: 'External Hard Drive', sku: 'EH-020', quantity: 25, price: 149.99 }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory</h2>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-lg w-64"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add Product
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;