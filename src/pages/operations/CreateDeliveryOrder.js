import { useState } from 'react';

const CreateDeliveryOrder = () => {
  const [formData, setFormData] = useState({
    reference: 'WH/OUT/0003', // Auto-generated
    from: '',
    to: '',
    contact: '',
    scheduleDate: ''
  });

  const fromOptions = ['WH/Stock1', 'WH/Stock2', 'WH/Main'];
  const toOptions = ['vendor', 'supplier', 'partner'];
  const contactOptions = ['ABC Electronics', 'Fashion Store', 'Coffee Shop Chain'];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateOrder = () => {
    if (!formData.from || !formData.to || !formData.contact) {
      alert('Please fill all required fields');
      return;
    }
    alert('Delivery Order created successfully!');
    window.location.href = '/dashboard/delivery-orders';
  };

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
        <h2 className="text-2xl font-bold text-gray-800">Create Delivery Order</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference</label>
            <input
              type="text"
              value={formData.reference}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={formData.from}
              onChange={(e) => handleChange('from', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select from...</option>
              {fromOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={formData.to}
              onChange={(e) => handleChange('to', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select to...</option>
              {toOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
            <select
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select contact...</option>
              {contactOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Schedule Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
            <input
              type="date"
              value={formData.scheduleDate}
              onChange={(e) => handleChange('scheduleDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={() => window.location.href = '/dashboard/delivery-orders'}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={validateOrder}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Delivery Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeliveryOrder;