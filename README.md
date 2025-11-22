# StockMaster - Inventory Management System

A modern, responsive inventory management system built with React and Tailwind CSS. StockMaster provides comprehensive tools for managing warehouse operations, tracking inventory movements, and handling receipts and deliveries.

## 🚀 Features

### Dashboard
- **KPI Overview**: Total products, low stock alerts, pending operations
- **Summary Cards**: Receipts and delivery metrics with quick actions
- **Recent Activity**: Real-time activity feed

### Operations Management
- **Receipts**: Manage incoming inventory (WH/IN/XXX format)
- **Delivery Orders**: Handle outgoing shipments (WH/OUT/XXX format)
- **Internal Transfers**: Move items between locations
- **Adjustments**: Inventory quantity corrections

### Inventory Tracking
- **Stock Management**: Product inventory with search and filtering
- **Move History**: Complete audit trail of all inventory movements
- **Color-coded Movements**: Green for IN, Red for OUT operations

### Settings & Configuration
- **Warehouses**: Manage warehouse locations and details
- **Locations**: Configure storage locations within warehouses
- **Direct Access**: Dropdown navigation for quick access

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Heroicons (SVG)
- **State Management**: React useState

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd odoo_hack_virtual_dse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Login Credentials

- **Login ID**: `admin`
- **Password**: `admin123`

## 📱 Navigation Structure

- **Dashboard**: Overview and KPIs
- **Operations**: Receipts, Deliveries, Transfers, Adjustments
- **Stock**: Product inventory management
- **Move History**: Complete movement tracking
- **Settings**: Warehouses and Locations (dropdown)

## ✨ Key Features

### Auto-Generated References
- **Receipts**: WH/IN/0001, WH/IN/0002...
- **Deliveries**: WH/OUT/0001, WH/OUT/0002...
- **Format**: `<Warehouse>/<Operation>/<ID>`

### Interactive Views
- **List View**: Detailed table format
- **Kanban View**: Card-based layout
- **Search & Filter**: Real-time filtering
- **Sorting**: Multiple sort options

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Easy navigation on mobile devices
- **Modern UI**: Clean, professional interface

## 🎯 Usage Examples

### Creating a Receipt
1. Navigate to Operations → Receipts
2. Click "NEW" button
3. Fill in: From, To, Contact, Schedule Date
4. Reference auto-generates (WH/IN/XXXX)
5. Click "Create Receipt"

### Managing Inventory
1. Go to Stock page
2. View current inventory levels
3. Use search to find specific products
4. Monitor stock levels and alerts

### Tracking Movements
1. Visit Move History
2. View all IN/OUT movements
3. Filter by reference or contact
4. Sort by date, type, or quantity

## 🔧 Development

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── layouts/       # Layout components
├── routes/        # Routing configuration
└── hooks/         # Custom React hooks
```

### Available Scripts
- `npm start`: Development server
- `npm build`: Production build
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## 🎨 UI Components

- **Cards**: KPI and summary displays
- **Tables**: Data listing with pagination
- **Forms**: Input handling with validation
- **Dropdowns**: Navigation and filtering
- **Buttons**: Actions and navigation
- **Status Indicators**: Color-coded status badges

## 📊 Data Management

- **Local State**: React useState for component data
- **Mock Data**: Sample inventory and operations data
- **Real-time Updates**: Immediate UI updates
- **Form Validation**: Input validation and error handling

## 🚀 Future Enhancements

- Backend API integration
- User authentication system
- Advanced reporting and analytics
- Barcode scanning support
- Multi-warehouse management
- Email notifications
- Export functionality

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**StockMaster** - Efficient inventory management made simple.