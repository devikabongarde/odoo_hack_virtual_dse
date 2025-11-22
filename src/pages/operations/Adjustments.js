import { useState } from 'react';

const Adjustments = () => {
  const [adjustments, setAdjustments] = useState([
    { id: 1, product: 'Wireless Headphones', currentQty: 50, adjustedQty: 48, reason: 'Damaged items', date: '2024-01-15', status: 'Applied' },
    { id: 2, product: 'Office Chair', currentQty: 25, adjustedQty: 27, reason: 'Found in storage', date: '2024-01-14', status: 'Pending' },
  ]);

  const [newAdjustment, setNewAdjustment] = useState({
    product: '',
    currentQty: '',
    adjustedQty: '',
    reason: ''
  });

  const reasons = ['Damaged items', 'Found in storage', 'Lost items', 'Counting error', 'Other'];

  const addAdjustment = () => {
    if (!newAdjustment.product || !newAdjustment.adjustedQty || !newAdjustment.reason) {
      alert('Please fill all fields');
      return;
    }
    
    const adjustment = {
      id: adjustments.length + 1,
      ...newAdjustment,
      currentQty: parseInt(newAdjustment.currentQty) || 0,
      adjustedQty: parseInt(newAdjustment.adjustedQty),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    
    setAdjustments([...adjustments, adjustment]);
    setNewAdjustment({ product: '', currentQty: '', adjustedQty: '', reason: '' });
  };

  const getDifference = (current, adjusted) => {
    const diff = adjusted - current;
    return diff > 0 ? `+${diff}` : `${diff}`;
  };

  const getDifferenceColor = (current, adjusted) => {
    return adjusted > current ? 'text-green-600' : adjusted < current ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Adjustments</h2>
        <button 
          onClick={() => document.getElementById('newAdjustmentForm').classList.toggle('hidden')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>NEW ADJUSTMENT</span>
        </button>
      </div>

      {/* New Adjustment Form */}
      <div id="newAdjustmentForm" className="hidden bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Create New Adjustment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <input
              type="text"
              value={newAdjustment.product}
              onChange={(e) => setNewAdjustment({...newAdjustment, product: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Qty</label>
            <input
              type="number"
              value={newAdjustment.currentQty}
              onChange={(e) => setNewAdjustment({...newAdjustment, currentQty: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adjusted Qty</label>
            <input
              type="number"
              value={newAdjustment.adjustedQty}
              onChange={(e) => setNewAdjustment({...newAdjustment, adjustedQty: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <select
              value={newAdjustment.reason}
              onChange={(e) => setNewAdjustment({...newAdjustment, reason: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select reason...</option>
              {reasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={addAdjustment}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adjusted Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adjustments.map((adjustment) => (
                <tr key={adjustment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{adjustment.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.currentQty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.adjustedQty}</td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${getDifferenceColor(adjustment.currentQty, adjustment.adjustedQty)}`}>
                    {getDifference(adjustment.currentQty, adjustment.adjustedQty)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      adjustment.status === 'Applied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {adjustment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adjustments;