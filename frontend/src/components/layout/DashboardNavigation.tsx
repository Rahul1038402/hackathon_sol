import React from 'react';
import { Store, Users, Package as PackageIcon, Truck as TruckIcon, User as UserProfileIcon, BarChart3 } from 'lucide-react';

interface DashboardNavigationProps {
  userType: string;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ userType, currentView, setCurrentView }) => {
  const vendorNavItems = [{ id: 'home', icon: Store, label: 'Home' },{ id: 'suppliers', icon: Users, label: 'Suppliers' },{ id: 'products', icon: PackageIcon, label: 'Products' },{ id: 'orders', icon: TruckIcon, label: 'Orders' },{ id: 'profile', icon: UserProfileIcon, label: 'Profile' }];
  const supplierNavItems = [{ id: 'home', icon: Store, label: 'Dashboard' },{ id: 'products', icon: PackageIcon, label: 'Products' },{ id: 'orders', icon: TruckIcon, label: 'Orders' },{ id: 'analytics', icon: BarChart3, label: 'Analytics' },{ id: 'profile', icon: UserProfileIcon, label: 'Profile' }];
  const navItems = userType === 'vendor' ? vendorNavItems : supplierNavItems;

  return (
    <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 z-20">
      <div className="flex justify-around max-w-4xl mx-auto">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setCurrentView(item.id)} className={`flex flex-col items-center justify-center p-2 w-full transition-colors ${currentView === item.id ? 'text-green-600 bg-green-50' : 'text-gray-600'}`}>
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export { DashboardNavigation };