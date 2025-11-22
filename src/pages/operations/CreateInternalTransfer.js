import { useState } from 'react';
import FilterDropdown from '../../components/FilterDropdown';

const CreateInternalTransfer = () => {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [products, setProducts] = useState([{ product: '', quantity: '', availableQty: 0 }]);

  const locations = ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center', 'Storage Room A', 'Storage Room B'];
  const availableProducts = [
    { name: 'Wireless Headphones', stock: { 'Main Warehouse': 75, 'Secondary Warehouse': 45, 'Distribution Center': 30 } },
    { name: 'Office Chair', stock: { 'Main Warehouse': 25, 'Secondary Warehouse': 30, 'Distribution Center': 20 } },
    { name: 'Cotton T-Shirt', stock: { 'Main Warehouse': 100, 'Secondary Warehouse': 50, 'Distribution Center': 50 } },
    { name: 'Coffee Beans', stock: { 'Main Warehouse': 60, 'Secondary Warehouse': 35, 'Distribution Center': 25 } },
    { name: 'Garden Hose', stock: { 'Main Warehouse': 20, 'Secondary Warehouse': 15, 'Distribution Center': 10 } },
    { name: 'Smartphone Case', stock: { 'Main Warehouse': 150, 'Secondary Warehouse': 100, 'Distribution Center': 50 } },
    { name: 'LED Bulb', stock: { 'Main Warehouse': 250, 'Secondary Warehouse': 150, 'Distribution Center': 100 } },
    { name: 'Laptop Stand', stock: { 'Main Warehouse': 30, 'Secondary Warehouse': 20, 'Distribution Center': 10 } },
    { name: 'Desk Lamp', stock: { 'Main Warehouse': 40, 'Secondary Warehouse': 25, 'Distribution Center': 20 } },
    { name: 'Mouse Pad', stock: { 'Main Warehouse': 90, 'Secondary Warehouse': 60, 'Distribution Center': 30 } },
    { name: 'USB Cable', stock: { 'Main Warehouse': 200, 'Secondary Warehouse': 120, 'Distribution Center': 80 } },
    { name: 'Water Bottle', stock: { 'Main Warehouse': 45, 'Secondary Warehouse': 30, 'Distribution Center': 15 } },
    { name: 'Bluetooth Speaker', stock: { 'Main Warehouse': 35, 'Secondary Warehouse': 20, 'Distribution Center': 10 } },
    { name: 'Notebook', stock: { 'Main Warehouse': 125, 'Secondary Warehouse': 75, 'Distribution Center': 50 } },
    { name: 'Pen Set', stock: { 'Main Warehouse': 75, 'Secondary Warehouse': 50, 'Distribution Center': 25 } }
  ];

  const addProduct = () => {
    setProducts([...products, { product: '', quantity: '', availableQty: 0 }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updated = products.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [field]: value };
        if (field === 'product' && sourceLocation) {
          const productData = availableProducts.find(p => p.name === value);
          newItem.availableQty = productData ? (productData.stock[sourceLocation] || 0) : 0;
        }
        return newItem;
      }
      return item;
    });
    setProducts(updated);
  };

  const updateSourceLocation = (location) => {
    setSourceLocation(location);
    const updated = products.map(item => {
      if (item.product) {
        const productData = availableProducts.find(p => p.name === item.product);
        return {
          ...item,
          availableQty: productData ? (productData.stock[location] || 0) : 0
        };
      }
      return item;
    });
    setProducts(updated);
  };

  const validateTransfer = () => {
    if (!sourceLocation || !destinationLocation) {
      alert('Please select both source and destination locations');
      return;
    }
    if (sourceLocation === destinationLocation) {
      alert('Source and destination locations cannot be the same');
      return;
    }
    if (products.some(p => !p.product || !p.quantity)) {
      alert('Please fill all product fields');
      return;
    }
    if (products.some(p => parseInt(p.quantity) > p.availableQty)) {
      alert('Transfer quantity cannot exceed available stock');
      return;
    }
    alert('Internal Transfer created successfully!');
  };

  const getAvailableProducts = () => {
    if (!sourceLocation) return [];
    return availableProducts.filter(p => (p.stock[sourceLocation] || 0) > 0);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Internal Transfer</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FilterDropdown
                label="Source Warehouse/Location"
                options={locations}
                value={sourceLocation}
                onChange={updateSourceLocation}
                placeholder="Select source..."
              />
            </div>
            <div>
              <FilterDropdown
                label="Destination Warehouse/Location"
                options={locations.filter(loc => loc !== sourceLocation)}
                value={destinationLocation}
                onChange={setDestinationLocation}
                placeholder="Select destination..."
              />
            </div>
          </div>
          {sourceLocation && destinationLocation && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-800">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">
                  Transferring from {sourceLocation} to {destinationLocation}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Products to Transfer</h3>
            <button
              onClick={addProduct}
              disabled={!sourceLocation}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Product
            </button>
          </div>

          {!sourceLocation && (
            <div className="text-center py-8 text-gray-500">
              Please select a source location first to see available products
            </div>
          )}

          {sourceLocation && (
            <div className="space-y-4">
              {products.map((item, index) => (
                <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <select
                      value={item.product}
                      onChange={(e) => updateProduct(index, 'product', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select product...</option>
                      {getAvailableProducts().map(product => (
                        <option key={product.name} value={product.name}>
                          {product.name} (Available: {product.stock[sourceLocation]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                      placeholder="0"
                      min="1"
                      max={item.availableQty}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-24 text-sm text-gray-600">
                    <div>Available:</div>
                    <div className="font-medium">{item.availableQty}</div>
                  </div>
                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <div>Total Products: {products.filter(p => p.product && p.quantity).length}</div>
              <div className="text-xs mt-1 text-gray-500">
                Note: Stock quantities remain the same, only location changes
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Save as Draft
              </button>
              <button
                onClick={validateTransfer}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInternalTransfer;