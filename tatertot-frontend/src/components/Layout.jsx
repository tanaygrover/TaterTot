import Header from './Header';
import Navigation from './Navigation';

function Layout({ children, activeTab, setActiveTab }) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto w-full px-8 lg:px-16 py-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;