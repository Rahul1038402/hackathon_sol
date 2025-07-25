import React, { useState } from 'react';
import { Store, User as UserIcon, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import type { KYCStatusProps } from '../types';

interface LoginScreenProps {
  userType: string;
  setUserType: (type: string) => void;
  setCurrentScreen: (screen: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ userType, setUserType, setCurrentScreen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ phone: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${userType} with`, loginData);
    setCurrentScreen(`${userType}-dashboard`);
  };

  const UserTypeSelection = () => (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">Choose Your Role</h2>
      <div className="space-y-4">
        <button onClick={() => setUserType('vendor')} className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all focus:outline-none focus:ring-2 focus:ring-green-500">
          <div className="flex items-center"><UserIcon className="w-12 h-12 text-green-600 mr-4" /><div><h3 className="font-semibold text-lg">Street Vendor</h3><p className="text-gray-600 text-sm">Buy fresh supplies for your business</p></div></div>
        </button>
        <button onClick={() => setUserType('supplier')} className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all focus:outline-none focus:ring-2 focus:ring-green-500">
          <div className="flex items-center"><Store className="w-12 h-12 text-green-600 mr-4" /><div><h3 className="font-semibold text-lg">Supplier</h3><p className="text-gray-600 text-sm">Sell products to local vendors</p></div></div>
        </button>
      </div>
    </div>
  );

  const LoginForm = () => (
    <div>
      <div className="flex items-center mb-6"><button onClick={() => setUserType('')} className="p-2 rounded-full hover:bg-gray-100 mr-2"><ArrowLeft className="w-5 h-5" /></button><h2 className="text-xl font-semibold">{userType === 'vendor' ? 'Vendor Login' : 'Supplier Login'}</h2></div>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" value={loginData.phone} onChange={(e) => setLoginData({...loginData, phone: e.target.value})} placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><div className="relative"><input type={showPassword ? 'text' : 'password'} value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Login as {userType === 'vendor' ? 'Vendor' : 'Supplier'}</button>
        <div className="text-center"><a href="#" className="text-sm text-green-600 hover:underline">Forgot Password?</a></div>
        <div className="text-center pt-4 border-t"><p className="text-sm text-gray-600">Don't have an account?{' '}<a href="#" className="text-green-600 font-medium hover:underline">Sign up</a></p></div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"><div className="text-center mb-8"><div className="flex justify-center mb-4"><Store className="w-16 h-16 text-green-600" /></div><h1 className="text-2xl font-bold text-gray-900 mb-2">LocalMart</h1><p className="text-gray-600">Hyperlocal B2B Marketplace</p></div>{!userType ? <UserTypeSelection /> : <LoginForm />}</div></div>
  );
};

export { LoginScreen };