import { useState } from 'react';
import FilterDropdown from '../../components/FilterDropdown';

const CreateReceipt = () => {
  const [supplier, setSupplier] = useState('');
  const [products, setProducts] = useState([{ product: '', quantity: '' }]);

  const suppliers = ['Tech Solutions Inc.', 'Fashion World Ltd.', 'Food Distributors Co.', 'Garden Supplies Pro', 'Electronics Hub'];
  const availableProducts = ['Wireless Headphones', 'Cotton T-Shirt', 'Coffee Beans', 'Garden Hose', 'Smartphone Case', 'Denim Jeans', 'Organic Tea', 'LED Bulb', 'Yoga Mat', 'Winter Jacket'];

  const addProduct = () => {
    setProducts([...products, { product: '', quantity: '' }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updated = products.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setProducts(updated);
  };

  const validateReceipt = () => {
    if (!supplier) {
      alert('Please select a supplier');
      return;
    }
    if (products.some(p => !p.product || !p.quantity)) {
      alert('Please fill all product fields');
      return;
    }
    alert('Receipt validated successfully!');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Receipt</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Step 1: Choose Supplier */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">1. Choose Supplier</h3>
          <div className="w-64">
            <FilterDropdown
              label="Supplier"
              options={suppliers}
              value={supplier}
              onChange={setSupplier}
              placeholder="Select supplier..."
            />
          </div>
        </div>

        {/* Step 2 & 3: Add Products and Quantities */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">2. Add Products & Quantities</h3>
            <button
              onClick={addProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
            >
              + Add Product
            </button>
          </div>

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
                    {availableProducts.map(product => (
                      <option key={product} value={product}>{product}</option>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
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
        </div>

        {/* Step 4: Validate */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total Products: {products.filter(p => p.product && p.quantity).length}
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Save as Draft
              </button>
              <button
                onClick={validateReceipt}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Validate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReceipt;