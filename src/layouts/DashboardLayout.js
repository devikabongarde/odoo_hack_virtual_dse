import TopNavbar from '../components/TopNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;