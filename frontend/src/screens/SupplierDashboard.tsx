import React, { useState } from 'react';
import { Truck, DollarSign, Star, Plus, BarChart3, Store, Shield, Package, UserIcon } from 'lucide-react';
import type { Product } from '../types';
import { KYCStatus } from '../components/ui/KYCStatus';
import { StatsCard } from '../components/ui/StatsCard';
import { ProductCard } from '../components/ui/ProductCard';
import { TrustScore } from '../components/ui/TrustScore';
import { RatingSystem } from '../components/ui/RatingSystem';

interface SupplierDashboardProps {
  userType: string;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ userType, currentView, setCurrentView }) => {
    const [myProducts, setMyProducts] = useState<Product[]>([
        { id: 1, name: 'Fresh Tomatoes', description: 'Grade A tomatoes', price: 40, unit: 'kg', rating: 4.5, reviews: 23 },
        { id: 2, name: 'Onions', description: 'Red onions, medium size', price: 35, unit: 'kg', rating: 4.2, reviews: 18 }
    ]);

    const handleRestock = (product: Product) => {
        setMyProducts(prev => prev.map(p => p.id === product.id ? { ...p, restocked: true } : p));
    };

    const renderContent = () => {
        switch(currentView) {
            case 'home':
                return (<div><KYCStatus isVerified={true} userType={userType} /><div className="p-4"><div className="grid grid-cols-2 gap-4 mb-6"><StatsCard title="Total Orders" value="156" icon={Truck} color="bg-blue-500" /><StatsCard title="Revenue" value="₹45,230" icon={DollarSign} color="bg-green-500" /><StatsCard title="Products" value="23" icon={Package} color="bg-purple-500" /><StatsCard title="Rating" value="4.6" icon={Star} color="bg-yellow-500" /></div><div className="bg-white rounded-lg shadow-sm p-4"><h3 className="font-semibold mb-3">Quick Actions</h3><div className="grid grid-cols-2 gap-4"><button onClick={() => setCurrentView('products')} className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"><Plus className="w-6 h-6 text-green-600 mb-2" /><span className="text-sm">Add Product</span></button><button onClick={() => setCurrentView('orders')} className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"><Truck className="w-6 h-6 text-blue-600 mb-2" /><span className="text-sm">Manage Orders</span></button></div></div></div></div>);
            case 'products':
                 return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My Products</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
        <div className="space-y-3">
          {myProducts.map(p => <ProductCard key={p.id} product={p} isSupplier={true} onRestock={handleRestock} />)}
        </div>
        <RatingSystem
          title="Rate Your Product Experience"
          criteria={[
            { name: 'Quality', rating: 0 },
            { name: 'Packaging', rating: 0 },
            { name: 'Delivery', rating: 0 }
          ]}
          onRate={() => {}}
        />
      </div>
    );
            case 'analytics':
                 return (<div className="p-4"><h2 className="text-lg font-semibold mb-4">Analytics</h2><div className="text-center py-8 bg-white rounded-lg shadow-sm"><BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-600">Analytics dashboard coming soon.</p></div></div>);
            case 'profile':
                 return (
                  <div className="p-4">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">My Profile</h2>
                        <button className="text-green-600 text-sm font-medium hover:underline">Edit Profile</button>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Store className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">Ram Fresh Supplies</h3>
                          <p className="text-sm text-gray-600">Wholesale Supplier • Noida</p>
                          <div className="flex items-center space-x-1 mt-1 text-green-600">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Verified Supplier</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <h3 className="font-semibold mb-3">Business Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Business Name</span>
                          <span className="text-sm font-medium">Ram Fresh Supplies</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Contact Number</span>
                          <span className="text-sm font-medium">{contactNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Email</span>
                          <span className="text-sm font-medium">ram.supplies@gmail.com</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Business Type</span>
                          <span className="text-sm font-medium">Wholesale Supplier</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Location</span>
                          <span className="text-sm font-medium">Sector 15, Noida</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">GST Number</span>
                          <span className="text-sm font-medium">27AABCU9603R1ZX</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <TrustScore score={87} badges={['Verified Supplier', 'Top Rated', '100+ Orders', 'Fast Delivery']} />

                    {/* Profile Customization */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 mt-4">
                      <h3 className="font-semibold mb-3">Business Customization</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Store className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Update Business Logo</span>
                          </div>
                          <span className="text-gray-400">›</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Package className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Product Categories</span>
                          </div>
                          <span className="text-gray-400">›</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Truck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Delivery Settings</span>
                          </div>
                          <span className="text-gray-400">›</span>
                        </button>
                      </div>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="font-semibold mb-3">Account Settings</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm">Change Password</span>
                          <span className="text-gray-400">›</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm">Payment Settings</span>
                          <span className="text-gray-400">›</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm">Notification Preferences</span>
                          <span className="text-gray-400">›</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-red-50 transition-colors text-red-600">
                          <span className="text-sm">Delete Account</span>
                          <span className="text-red-400">›</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
            default:
                return <div className="p-4">Select a view</div>;
        }
    };
    return <div>{renderContent()}</div>;
};

export { SupplierDashboard };