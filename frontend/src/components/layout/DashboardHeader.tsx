import React from 'react';
import { Store, Bell, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../../types';

interface DashboardHeaderProps {
  userType: string;
  cartItems: CartItem[];
  onLogout: () => void;
  setCurrentView: (view: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, cartItems, onLogout, setCurrentView }) => (
  <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-20">
    <div className="flex items-center justify-between max-w-4xl mx-auto">
      <div className="flex items-center space-x-3"><Store className="w-8 h-8" /><div><h1 className="text-xl font-bold">LocalMart</h1><p className="text-sm opacity-90">{userType === 'vendor' ? 'Vendor Dashboard' : 'Supplier Dashboard'}</p></div></div>
      <div className="flex items-center space-x-4">
        <div className="relative"><Bell className="w-6 h-6 cursor-pointer" /><span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-green-600">3</span></div>
        {userType === 'vendor' && (<div className="relative"><ShoppingCart className="w-6 h-6 cursor-pointer" onClick={() => setCurrentView('cart')} />{cartItems.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-green-600">{cartItems.length}</span>)}</div>)}
        <button onClick={onLogout} className="text-sm opacity-90 hover:opacity-100">Logout</button>
      </div>
    </div>
  </header>
);

export { DashboardHeader };