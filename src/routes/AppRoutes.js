import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Warehouses from '../pages/Warehouses';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Receipts from '../pages/operations/Receipts';
import CreateReceipt from '../pages/operations/CreateReceipt';
import CreateDeliveryOrder from '../pages/operations/CreateDeliveryOrder';
import CreateInternalTransfer from '../pages/operations/CreateInternalTransfer';
import AddWarehouse from '../pages/AddWarehouse';
import WelcomePage from '../pages/WelcomePage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import DeliveryOrders from '../pages/operations/DeliveryOrders';
import InternalTransfers from '../pages/operations/InternalTransfers';
import Adjustments from '../pages/operations/Adjustments';
import MoveHistory from '../pages/operations/MoveHistory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/dashboard/products" element={<DashboardLayout><Products /></DashboardLayout>} />
      <Route path="/dashboard/receipts" element={<DashboardLayout><Receipts /></DashboardLayout>} />
      <Route path="/dashboard/receipts/create" element={<DashboardLayout><CreateReceipt /></DashboardLayout>} />
      <Route path="/dashboard/delivery-orders/create" element={<DashboardLayout><CreateDeliveryOrder /></DashboardLayout>} />
      <Route path="/dashboard/internal-transfers/create" element={<DashboardLayout><CreateInternalTransfer /></DashboardLayout>} />
      <Route path="/dashboard/warehouses/add" element={<DashboardLayout><AddWarehouse /></DashboardLayout>} />
      <Route path="/dashboard/delivery-orders" element={<DashboardLayout><DeliveryOrders /></DashboardLayout>} />
      <Route path="/dashboard/internal-transfers" element={<DashboardLayout><InternalTransfers /></DashboardLayout>} />
      <Route path="/dashboard/adjustments" element={<DashboardLayout><Adjustments /></DashboardLayout>} />
      <Route path="/dashboard/move-history" element={<DashboardLayout><MoveHistory /></DashboardLayout>} />
      <Route path="/dashboard/warehouses" element={<DashboardLayout><Warehouses /></DashboardLayout>} />
      <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      <Route path="/dashboard/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
    </Routes>
  );
};

export default AppRoutes;