import { useState } from 'react';

const MoveHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [sortOrder, setSortOrder] = useState('date-desc');

  const mockMoves = [
    { reference: 'WH/IN/0001', date: '2024-01-15', contact: 'Azure Interior', from: 'vendor', to: 'WH/Stock1', quantity: 10, status: 'Ready', type: 'IN' },
    { reference: 'WH/IN/0001', date: '2024-01-15', contact: 'Azure Interior', from: 'vendor', to: 'WH/Stock1', quantity: 5, status: 'Ready', type: 'IN' },
    { reference: 'WH/OUT/0002', date: '2024-01-16', contact: 'ABC Electronics', from: 'WH/Stock1', to: 'vendor', quantity: 8, status: 'Ready', type: 'OUT' },
    { reference: 'WH/OUT/0002', date: '2024-01-16', contact: 'ABC Electronics', from: 'WH/Stock1', to: 'vendor', quantity: 3, status: 'Ready', type: 'OUT' },
  ];

  const filteredMoves = mockMoves.filter(move => 
    move.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    move.contact.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch(sortOrder) {
      case 'date-asc': return new Date(a.date) - new Date(b.date);
      case 'date-desc': return new Date(b.date) - new Date(a.date);
      case 'reference-asc': return a.reference.localeCompare(b.reference);
      case 'reference-desc': return b.reference.localeCompare(a.reference);
      case 'quantity-asc': return a.quantity - b.quantity;
      case 'quantity-desc': return b.quantity - a.quantity;
      case 'type-in': return a.type === 'IN' ? -1 : 1;
      case 'type-out': return a.type === 'OUT' ? -1 : 1;
      default: return 0;
    }
  });

  const getRowColor = (type) => {
    return type === 'IN' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500';
  };

  const getStatusByType = (moves) => {
    const statusGroups = {};
    moves.forEach(move => {
      if (!statusGroups[move.status]) {
        statusGroups[move.status] = [];
      }
      statusGroups[move.status].push(move);
    });
    return statusGroups;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Move History</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>NEW</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Search and View Controls */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by reference & contact"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <div className="relative">
              <button 
                onClick={() => document.getElementById('sortDropdown').classList.toggle('hidden')}
                className="p-2 rounded text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </button>
              <div id="sortDropdown" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button onClick={() => {setSortOrder('date-desc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date (Newest)</button>
                  <button onClick={() => {setSortOrder('date-asc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date (Oldest)</button>
                  <button onClick={() => {setSortOrder('reference-asc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reference (A-Z)</button>
                  <button onClick={() => {setSortOrder('reference-desc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reference (Z-A)</button>
                  <button onClick={() => {setSortOrder('quantity-desc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quantity (High-Low)</button>
                  <button onClick={() => {setSortOrder('quantity-asc'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quantity (Low-High)</button>
                  <button onClick={() => {setSortOrder('type-in'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">IN Movements First</button>
                  <button onClick={() => {setSortOrder('type-out'); document.getElementById('sortDropdown').classList.add('hidden');}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OUT Movements First</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMoves.map((move, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${getRowColor(move.type)}`}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{move.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{move.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{move.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{move.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{move.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{move.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {move.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            {Object.entries(getStatusByType(filteredMoves)).map(([status, moves]) => (
              <div key={status} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{status}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moves.map((move, index) => (
                    <div key={index} className={`rounded-lg p-4 border ${getRowColor(move.type)}`}>
                      <div className="font-medium text-blue-600 mb-2">{move.reference}</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Date: {move.date}</div>
                        <div>Contact: {move.contact}</div>
                        <div>From: {move.from} → To: {move.to}</div>
                        <div>Quantity: {move.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;