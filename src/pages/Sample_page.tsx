import React, { useState } from 'react';
import { 
  Star, 
  Shield, 
  MapPin, 
  Phone, 
  User, 
  Store, 
  Package, 
  CreditCard, 
  Search, 
  Filter, 
  ShoppingCart,
  Plus,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  Bell,
  Settings,
  Eye,
  EyeOff,
  ArrowLeft,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';

// Type definitions for props and state

type KYCStatusProps = { isVerified: boolean };
type StatsCardProps = { title: string; value: string | number; icon: React.ElementType; color: string };
type Product = { id: number; name: string; description: string; price: number; unit: string; rating: number; reviews: number };
type Supplier = { id: number; name: string; location: string; distance: number; rating: number; orders: number; verified: boolean };
type ProductCardProps = { product: Product; onAddToCart?: (product: Product) => void; isSupplier?: boolean };
type SupplierCardProps = { supplier: Supplier };
type TrustScoreProps = { score: number; badges: string[] };
type CartItem = Product & { quantity: number };
type RatingCriterion = { name: string; rating?: number };
type RatingSystemProps = { title: string; criteria: RatingCriterion[]; onRate: (index: number, rating: number) => void };

const HyperlocalMarketplace = () => {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'vendor-dashboard', 'supplier-dashboard'
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ phone: '', password: '' });

  // Login/Selection Screen Component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Store className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">LocalMart</h1>
          <p className="text-gray-600">Hyperlocal B2B Marketplace</p>
        </div>

        {!userType ? (
          <UserTypeSelection />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );

  const UserTypeSelection = () => (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">Choose Your Role</h2>
      <div className="space-y-4">
        <button
          onClick={() => setUserType('vendor')}
          className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
        >
          <User className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-2">Street Vendor</h3>
          <p className="text-gray-600 text-sm">Buy fresh supplies for your food business</p>
        </button>
        
        <button
          onClick={() => setUserType('supplier')}
          className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
        >
          <Store className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-2">Supplier</h3>
          <p className="text-gray-600 text-sm">Sell products to local vendors</p>
        </button>
      </div>
    </div>
  );

  const LoginForm = () => (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={() => setUserType('')} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {userType === 'vendor' ? 'Vendor Login' : 'Supplier Login'}
        </h2>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={loginData.phone}
            onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentScreen(`${userType}-dashboard`)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Login as {userType === 'vendor' ? 'Vendor' : 'Supplier'}
        </button>

        <div className="text-center">
          <a href="#" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-green-600 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );

  // Header Component for Dashboard
  const DashboardHeader = () => (
    <header className="bg-green-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Store className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">LocalMart</h1>
            <p className="text-sm opacity-90">
              {userType === 'vendor' ? 'Vendor Dashboard' : 'Supplier Dashboard'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          {userType === 'vendor' && (
            <div className="relative">
              <ShoppingCart className="w-6 h-6 cursor-pointer" onClick={() => setCurrentView('cart')} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          )}
          <button onClick={() => setCurrentScreen('login')} className="text-sm opacity-90 hover:opacity-100">
            Logout
          </button>
        </div>
      </div>
    </header>
  );

  // Navigation Component for Dashboard
  const DashboardNavigation = () => {
    const vendorNavItems = [
      { id: 'home', icon: Store, label: 'Home' },
      { id: 'suppliers', icon: Users, label: 'Suppliers' },
      { id: 'products', icon: Package, label: 'Products' },
      { id: 'orders', icon: Truck, label: 'Orders' },
      { id: 'profile', icon: User, label: 'Profile' }
    ];

    const supplierNavItems = [
      { id: 'home', icon: Store, label: 'Dashboard' },
      { id: 'products', icon: Package, label: 'My Products' },
      { id: 'orders', icon: Truck, label: 'Orders' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
      { id: 'profile', icon: User, label: 'Profile' }
    ];

    const navItems = userType === 'vendor' ? vendorNavItems : supplierNavItems;

    return (
      <nav className="bg-white border-t shadow-lg fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center p-2 ${currentView === item.id ? 'text-green-600' : 'text-gray-600'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  };

  // KYC Status Component
  const KYCStatus = ({ isVerified }: KYCStatusProps) => (
    <div className={`p-4 m-4 rounded-lg ${isVerified ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
      <div className="flex items-center space-x-2">
        {isVerified ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-600" />
        )}
        <div className="flex-1">
          <div className="font-medium">
            {isVerified ? 'Verified Account' : 'Complete KYC'}
          </div>
          <div className="text-sm text-gray-600">
            {isVerified 
              ? `Verified ${userType === 'vendor' ? 'Vendor' : 'Supplier'} Badge` 
              : 'Upload documents to get verified'
            }
          </div>
        </div>
        {isVerified && <Shield className="w-5 h-5 text-green-600" />}
      </div>
    </div>
  );

  // Stats Card Component for Supplier Dashboard
  const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Product Card Component
  const ProductCard = ({ product, onAddToCart, isSupplier = false }: ProductCardProps) => (
    <div className="bg-white rounded-lg shadow p-4 m-2">
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{product.name}</h4>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="font-bold text-green-600">₹{product.price}</span>
              <span className="text-sm text-gray-500">/{product.unit}</span>
            </div>
            {!isSupplier && (
              <button
                onClick={() => onAddToCart?.(product)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add to Cart
              </button>
            )}
            {isSupplier && (
              <button className="text-green-600 text-sm font-medium">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Supplier Card Component
  const SupplierCard = ({ supplier }: SupplierCardProps) => (
    <div className="bg-white rounded-lg shadow p-4 m-2">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Store className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">{supplier.name}</h4>
            {supplier.verified && <Shield className="w-4 h-4 text-green-600" />}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{supplier.location}</span>
            <span>•</span>
            <span>{supplier.distance} km</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{supplier.rating}</span>
          </div>
          <div className="text-sm text-gray-600">{supplier.orders} orders</div>
        </div>
        <button className="text-green-600 text-sm font-medium">View Products</button>
      </div>
    </div>
  );

  // Trust Score Component
  const TrustScore = ({ score, badges }: TrustScoreProps) => (
    <div className="bg-white rounded-lg shadow p-4 m-4">
      <h3 className="font-semibold mb-3">Trust Score</h3>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-green-600">{score}</div>
        <div className="text-sm text-gray-600">out of 100</div>
      </div>
      <div className="space-y-2">
        {badges.map((badge: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">{badge}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Vendor Dashboard Content
  const VendorDashboardContent = () => {
    const sampleProducts = [
      { id: 1, name: 'Fresh Tomatoes', description: 'Grade A tomatoes', price: 40, unit: 'kg', rating: 4.5, reviews: 23 },
      { id: 2, name: 'Onions', description: 'Red onions, medium size', price: 35, unit: 'kg', rating: 4.2, reviews: 18 },
      { id: 3, name: 'Cooking Oil', description: 'Refined sunflower oil', price: 120, unit: 'L', rating: 4.7, reviews: 41 }
    ];

    const sampleSuppliers = [
      { id: 1, name: 'Ram Suppliers', location: 'Sector 15', distance: 2.5, rating: 4.6, orders: 150, verified: true },
      { id: 2, name: 'Fresh Farm Co.', location: 'Dadri Road', distance: 5.2, rating: 4.3, orders: 89, verified: true }
    ];

    const addToCart = (product: Product) => {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    };

    switch (currentView) {
      case 'home':
        return (
          <div className="pb-20">
            <KYCStatus isVerified={true} />
            
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setCurrentView('suppliers')}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow"
                >
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">Find Suppliers</span>
                </button>
                <button 
                  onClick={() => setCurrentView('products')}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow"
                >
                  <Package className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Browse Products</span>
                </button>
              </div>

              <h2 className="text-lg font-semibold mb-3">Nearby Suppliers</h2>
              {sampleSuppliers.slice(0, 2).map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </div>
        );

      case 'suppliers':
        return (
          <div className="pb-20 p-4">
            <h2 className="text-lg font-semibold mb-4">All Suppliers</h2>
            {sampleSuppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        );

      case 'products':
        return (
          <div className="pb-20">
            <div className="p-4">
              <div className="flex space-x-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                <button className="p-2 border rounded-lg">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {sampleProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="pb-20 p-4">
            <h2 className="text-lg font-semibold mb-4">My Orders</h2>
            <div className="space-y-3">
              {[
                { id: 'ORD001', status: 'Delivered', total: 450, items: 3, date: '2025-07-24' },
                { id: 'ORD002', status: 'In Transit', total: 320, items: 2, date: '2025-07-25' }
              ].map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{order.items} items</span>
                    <span className="font-semibold">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="pb-20 p-4">
            <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price}/{item.unit}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{item.price}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-green-600 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span>Total Amount:</span>
                    <span className="text-xl font-bold">
                      ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                    </span>
                  </div>
                  <button className="w-full bg-white text-green-600 py-2 rounded font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="pb-20 p-4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Rajesh Kumar</h3>
                  <p className="text-sm text-gray-600">Street Vendor • Greater Noida</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Verified</span>
                  </div>
                </div>
              </div>
            </div>
            
            <TrustScore 
              score={92} 
              badges={['Verified Vendor', 'Regular Customer', '50+ Orders', 'Good Payment History']} 
            />
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  // Supplier Dashboard Content
  const SupplierDashboardContent = () => {
    const myProducts = [
      { id: 1, name: 'Fresh Tomatoes', description: 'Grade A tomatoes', price: 40, unit: 'kg', rating: 4.5, reviews: 23 },
      { id: 2, name: 'Onions', description: 'Red onions, medium size', price: 35, unit: 'kg', rating: 4.2, reviews: 18 }
    ];

    switch (currentView) {
      case 'home':
        return (
          <div className="pb-20">
            <KYCStatus isVerified={true} />
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatsCard 
                  title="Total Orders" 
                  value="156" 
                  icon={Truck} 
                  color="bg-blue-500" 
                />
                <StatsCard 
                  title="Revenue" 
                  value="₹45,230" 
                  icon={DollarSign} 
                  color="bg-green-500" 
                />
                <StatsCard 
                  title="Products" 
                  value="23" 
                  icon={Package} 
                  color="bg-purple-500" 
                />
                <StatsCard 
                  title="Rating" 
                  value="4.6" 
                  icon={Star} 
                  color="bg-yellow-500" 
                />
              </div>

              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setCurrentView('products')}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-sm">Add Product</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView('orders')}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <Truck className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-sm">Manage Orders</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="pb-20">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">My Products</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                  Add Product
                </button>
              </div>
              
              <div className="space-y-2">
                {myProducts.map(product => (
                  <ProductCard key={product.id} product={product} isSupplier={true} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="pb-20 p-4">
            <h2 className="text-lg font-semibold mb-4">Order Management</h2>
            <div className="space-y-3">
              {[
                { id: 'ORD003', vendor: 'Rajesh Kumar', status: 'Pending', total: 280, items: 2, date: '2025-07-25' },
                { id: 'ORD004', vendor: 'Amit Singh', status: 'Processing', total: 150, items: 1, date: '2025-07-25' }
              ].map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-600">From: {order.vendor}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{order.items} items</span>
                    <span className="font-semibold">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="pb-20 p-4">
            <h2 className="text-lg font-semibold mb-4">Analytics</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-medium mb-3">Sales Overview</h3>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Analytics dashboard coming soon</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-medium mb-3">Top Products</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Fresh Tomatoes', sales: 45, revenue: '₹1,800' },
                    { name: 'Onions', sales: 32, revenue: '₹1,120' },
                    { name: 'Cooking Oil', sales: 18, revenue: '₹2,160' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.sales} units sold</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{item.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="pb-20 p-4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Ram Suppliers</h3>
                  <p className="text-sm text-gray-600">Wholesale Supplier • Greater Noida</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Verified Supplier</span>
                  </div>
                </div>
              </div>
            </div>
            
            <TrustScore 
              score={87} 
              badges={['Verified Supplier', 'Top Rated', '100+ Orders', 'Fast Delivery']} 
            />
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  // Rating System Component
  const RatingSystem = ({ title, criteria, onRate }: RatingSystemProps) => (
    <div className="bg-white rounded-lg shadow p-4 m-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      {criteria.map((criterion: RatingCriterion, index: number) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{criterion.name}</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${
                    star <= (criterion.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                  onClick={() => onRate(index, star)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      <textarea
        placeholder="Optional review..."
        className="w-full p-2 border rounded-lg text-sm"
        rows={3}
      />
      <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-3 hover:bg-green-700">
        Submit Rating
      </button>
    </div>
  );

  // Main render logic
  if (currentScreen === 'login') {
    return <LoginScreen />;
  }

  // Dashboard render
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="pt-2">
        {currentScreen === 'vendor-dashboard' && <VendorDashboardContent />}
        {currentScreen === 'supplier-dashboard' && <SupplierDashboardContent />}
      </main>
      <DashboardNavigation />
    </div>
  );
};

export default HyperlocalMarketplace;