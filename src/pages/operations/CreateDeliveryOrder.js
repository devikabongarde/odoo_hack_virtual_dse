import { useState } from 'react';

const CreateDeliveryOrder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customer, setCustomer] = useState('');
  const [products, setProducts] = useState([{ product: '', quantity: '', picked: 0, packed: 0 }]);

  const customers = ['ABC Electronics', 'Fashion Store', 'Coffee Shop Chain', 'Garden Center', 'Tech Retailer'];
  const availableProducts = ['Wireless Headphones', 'Cotton T-Shirt', 'Coffee Beans', 'Garden Hose', 'Smartphone Case', 'LED Bulb'];

  const addProduct = () => {
    setProducts([...products, { product: '', quantity: '', picked: 0, packed: 0 }]);
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

  const nextStep = () => {
    if (currentStep === 1 && (!customer || products.some(p => !p.product || !p.quantity))) {
      alert('Please fill all required fields');
      return;
    }
    if (currentStep === 2 && products.some(p => parseInt(p.picked) > parseInt(p.quantity))) {
      alert('Picked quantity cannot exceed ordered quantity');
      return;
    }
    if (currentStep === 3 && products.some(p => parseInt(p.packed) > parseInt(p.picked))) {
      alert('Packed quantity cannot exceed picked quantity');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateOrder = () => {
    alert('Delivery Order validated successfully!');
  };

  const getStepClass = (step) => {
    if (step < currentStep) return 'bg-green-500 text-white';
    if (step === currentStep) return 'bg-blue-500 text-white';
    return 'bg-gray-300 text-gray-600';
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Delivery Order</h2>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepClass(step)}`}>
              {step}
            </div>
            <div className="ml-2 mr-4 text-sm font-medium text-gray-700">
              {step === 1 && 'Select Products'}
              {step === 2 && 'Pick'}
              {step === 3 && 'Pack'}
              {step === 4 && 'Validate'}
            </div>
            {step < 4 && <div className="w-8 h-0.5 bg-gray-300 mr-4" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Step 1: Select Products */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Products</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select customer...</option>
                {customers.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">Products</h4>
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
        )}

        {/* Step 2: Pick */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick Products</h3>
            <div className="space-y-4">
              {products.filter(p => p.product && p.quantity).map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.product}</div>
                    <div className="text-sm text-gray-600">Ordered: {item.quantity}</div>
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Picked</label>
                    <input
                      type="number"
                      value={item.picked}
                      onChange={(e) => updateProduct(index, 'picked', e.target.value)}
                      max={item.quantity}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Pack */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pack Products</h3>
            <div className="space-y-4">
              {products.filter(p => p.product && p.quantity).map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.product}</div>
                    <div className="text-sm text-gray-600">Picked: {item.picked}</div>
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Packed</label>
                    <input
                      type="number"
                      value={item.packed}
                      onChange={(e) => updateProduct(index, 'packed', e.target.value)}
                      max={item.picked}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Validate */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="mb-2"><strong>Customer:</strong> {customer}</div>
              <div><strong>Total Products:</strong> {products.filter(p => p.product).length}</div>
            </div>
            <div className="space-y-2">
              {products.filter(p => p.product && p.quantity).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <span className="font-medium">{item.product}</span>
                  <span className="text-sm text-gray-600">
                    Ordered: {item.quantity} | Picked: {item.picked} | Packed: {item.packed}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save as Draft
            </button>
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={validateOrder}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Validate Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeliveryOrder;