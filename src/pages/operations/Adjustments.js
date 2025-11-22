import { useState, useEffect } from 'react';

const Adjustments = () => {
  const [adjustments, setAdjustments] = useState([
    { product_name: 'Wireless Headphones', current_quantity: 150, adjusted_quantity: 145, reason: 'Damaged items', adjustment_date: '2024-01-15', status: 'Applied' },
    { product_name: 'Office Chair', current_quantity: 75, adjusted_quantity: 77, reason: 'Found in storage', adjustment_date: '2024-01-14', status: 'Pending' },
    { product_name: 'Cotton T-Shirt', current_quantity: 200, adjusted_quantity: 195, reason: 'Lost items', adjustment_date: '2024-01-13', status: 'Applied' },
    { product_name: 'Coffee Beans', current_quantity: 120, adjusted_quantity: 125, reason: 'Counting error', adjustment_date: '2024-01-12', status: 'Applied' },
    { product_name: 'Garden Hose', current_quantity: 45, adjusted_quantity: 43, reason: 'Damaged items', adjustment_date: '2024-01-11', status: 'Pending' },
    { product_name: 'Smartphone Case', current_quantity: 300, adjusted_quantity: 295, reason: 'Lost items', adjustment_date: '2024-01-10', status: 'Applied' },
    { product_name: 'LED Bulb', current_quantity: 500, adjusted_quantity: 505, reason: 'Found in storage', adjustment_date: '2024-01-09', status: 'Applied' },
    { product_name: 'Laptop Stand', current_quantity: 60, adjusted_quantity: 65, reason: 'Counting error', adjustment_date: '2024-01-08', status: 'Pending' },
    { product_name: 'Desk Lamp', current_quantity: 85, adjusted_quantity: 82, reason: 'Damaged items', adjustment_date: '2024-01-07', status: 'Applied' },
    { product_name: 'Mouse Pad', current_quantity: 180, adjusted_quantity: 178, reason: 'Lost items', adjustment_date: '2024-01-06', status: 'Applied' },
    { product_name: 'USB Cable', current_quantity: 400, adjusted_quantity: 395, reason: 'Damaged items', adjustment_date: '2024-01-05', status: 'Pending' },
    { product_name: 'Water Bottle', current_quantity: 90, adjusted_quantity: 95, reason: 'Found in storage', adjustment_date: '2024-01-04', status: 'Applied' },
    { product_name: 'Bluetooth Speaker', current_quantity: 65, adjusted_quantity: 63, reason: 'Damaged items', adjustment_date: '2024-01-03', status: 'Applied' },
    { product_name: 'Notebook', current_quantity: 250, adjusted_quantity: 255, reason: 'Counting error', adjustment_date: '2024-01-02', status: 'Pending' },
    { product_name: 'Pen Set', current_quantity: 150, adjusted_quantity: 148, reason: 'Lost items', adjustment_date: '2024-01-01', status: 'Applied' },
    { product_name: 'Desk Organizer', current_quantity: 40, adjusted_quantity: 42, reason: 'Found in storage', adjustment_date: '2023-12-31', status: 'Applied' },
    { product_name: 'Monitor Stand', current_quantity: 35, adjusted_quantity: 33, reason: 'Damaged items', adjustment_date: '2023-12-30', status: 'Pending' },
    { product_name: 'Keyboard', current_quantity: 110, adjusted_quantity: 115, reason: 'Counting error', adjustment_date: '2023-12-29', status: 'Applied' },
    { product_name: 'Mouse', current_quantity: 130, adjusted_quantity: 128, reason: 'Lost items', adjustment_date: '2023-12-28', status: 'Applied' },
    { product_name: 'External Hard Drive', current_quantity: 25, adjusted_quantity: 27, reason: 'Found in storage', adjustment_date: '2023-12-27', status: 'Pending' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdjustments();
  }, []);

  const fetchAdjustments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/adjustments');
      const data = await response.json();
      setAdjustments(data);
    } catch (error) {
      console.error('Error fetching adjustments:', error);
    } finally {
      setLoading(false);
    }
  };

  const [newAdjustment, setNewAdjustment] = useState({
    product: '',
    currentQty: '',
    adjustedQty: '',
    reason: ''
  });

  const reasons = ['Damaged items', 'Found in storage', 'Lost items', 'Counting error', 'Other'];

  const addAdjustment = async () => {
    if (!newAdjustment.product || !newAdjustment.adjustedQty || !newAdjustment.reason) {
      alert('Please fill all fields');
      return;
    }

    try {
      const adjustmentData = {
        product_name: newAdjustment.product,
        current_quantity: parseInt(newAdjustment.currentQty) || 0,
        adjusted_quantity: parseInt(newAdjustment.adjustedQty),
        reason: newAdjustment.reason,
        adjustment_date: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };

      const response = await fetch('http://localhost:5000/api/adjustments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustmentData),
      });

      if (response.ok) {
        const newAdjustmentData = await response.json();
        setAdjustments([...adjustments, newAdjustmentData]);
        setNewAdjustment({ product: '', currentQty: '', adjustedQty: '', reason: '' });
        alert('Adjustment added successfully!');
      } else {
        alert('Failed to add adjustment');
      }
    } catch (error) {
      console.error('Error adding adjustment:', error);
      alert('Error adding adjustment');
    }
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-gray-500">Loading adjustments...</p>
          </div>
        ) : (
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
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{adjustment.product_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.current_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.adjusted_quantity}</td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${getDifferenceColor(adjustment.current_quantity, adjustment.adjusted_quantity)}`}>
                    {getDifference(adjustment.current_quantity, adjustment.adjusted_quantity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{adjustment.adjustment_date}</td>
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
        )}
      </div>
    </div>
  );
};

export default Adjustments;