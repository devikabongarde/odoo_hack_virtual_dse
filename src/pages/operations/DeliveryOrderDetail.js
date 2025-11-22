import { useState } from 'react';

const DeliveryOrderDetail = () => {
  const [status, setStatus] = useState('Ready');
  const [products, setProducts] = useState([
    { id: 'DESK001', name: 'Desk', quantity: 6, inStock: true },
    { id: 'CHAIR001', name: 'Office Chair', quantity: 2, inStock: false }
  ]);
  const [formData, setFormData] = useState({
    deliveryAddress: '123 Business St, City, State 12345',
    scheduleDate: '2024-01-20',
    responsible: 'John Smith',
    operationType: 'Delivery Orders'
  });

  const statusStages = ['Draft', 'Waiting', 'Ready', 'Done'];
  const operationTypes = ['Delivery Orders', 'Receipts', 'Internal Transfers'];

  const getStatusColor = (currentStatus) => {
    const index = statusStages.indexOf(currentStatus);
    const currentIndex = statusStages.indexOf(status);
    if (index < currentIndex) return 'bg-green-500 text-white';
    if (index === currentIndex) return 'bg-blue-500 text-white';
    return 'bg-gray-300 text-gray-600';
  };

  const addProduct = () => {
    setProducts([...products, { id: '', name: '', quantity: 1, inStock: true }]);
  };

  const updateProduct = (index, field, value) => {
    const updated = products.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setProducts(updated);
  };

  const outOfStockAlert = products.some(p => !p.inStock);

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.location.href = '/dashboard/delivery-orders'}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">WH/OUT/0001</h2>
      </div>

      {/* Out of Stock Alert */}
      {outOfStockAlert && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Some products are out of stock and marked in red below.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Validate
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Print
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Cancel
        </button>
      </div>

      {/* Status Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <div className="flex items-center space-x-4">
          {statusStages.map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stage)}`}>
                {stage}
              </div>
              {index < statusStages.length - 1 && (
                <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
            <textarea
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsible</label>
              <input
                type="text"
                value={formData.responsible}
                onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
              <select
                value={formData.operationType}
                onChange={(e) => setFormData({...formData, operationType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {operationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className={`${!product.inStock ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-4">
                    <div className={`${!product.inStock ? 'text-red-600' : 'text-gray-900'}`}>
                      [{product.id}] {product.name}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                      className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !product.inStock ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      min="1"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setProducts(products.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addProduct}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add New Product
        </button>
      </div>
    </div>
  );
};

export default DeliveryOrderDetail;