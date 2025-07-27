import React, { useEffect, useRef } from 'react';
import { Store, Bell, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../../types';
import './DashboardHeader.css';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  userType: string;
  cartItems: CartItem[];
  onLogout: () => void;
  setCurrentView: (view: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userType, cartItems, onLogout, setCurrentView }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!textRef.current) return;

    const shadowConfig = {
      layers: 11,
      falloff: 1.0,
      distance: 1.5,
      color: {
        r: 255,
        g: 255,
        b: 255,
        a: 0.1
      },
      blur: 10.4
    };

    const updateShadow = () => {
      if (!textRef.current) return;

      const textElement = textRef.current;
      const fixedLightX = window.innerWidth * 0.05;
      const fixedLightY = window.innerHeight * 0;

      const distanceX = fixedLightX - textElement.offsetLeft - textElement.offsetWidth / 2;
      const distanceY = fixedLightY - textElement.offsetTop - textElement.offsetHeight / 2;

      let newShadow = '';
      for (let i = 0; i < shadowConfig.layers; i++) {
        const progress = i / shadowConfig.layers;
        const shadowX = -distanceX * progress * shadowConfig.distance;
        const shadowY = -distanceY * progress * shadowConfig.distance;

        const opacity = Math.pow(1 - progress, shadowConfig.falloff);

        newShadow += (newShadow ? ',' : '') +
          `${shadowX}px ${shadowY}px ${shadowConfig.blur}px rgba(${shadowConfig.color.r}, ${shadowConfig.color.g}, ${shadowConfig.color.b}, ${opacity})`;
      }
      textElement.style.textShadow = newShadow;
    };

    updateShadow();
    window.addEventListener('resize', updateShadow);

    return () => {
      window.removeEventListener('resize', updateShadow);
    };
  }, []);

  const handleLogoClick = () => {
    setCurrentView('home'); // Set the current view to 'home'
    navigate('/dashboard'); // Navigate to the dashboard route
  };

  return (
    <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-20">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        {/* Left side - Logo and Vendor Setu (aligned more to the left) */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-95 transition-opacity ml-4"
          onClick={handleLogoClick}
        >
          <Store className="w-10 h-11" />
          <h1 ref={textRef} className="vendor-setu-text">Vendor Setu</h1>
        </div>
 
        {/* Middle - Dashboard title */}
        <div className="flex-1 text-center">
          <p className="text-sm opacity-100 inline-block bg-green-700 px-5 py-2 rounded-full">
            {userType === 'vendor' ? 'Vendor Dashboard' : 'Supplier Dashboard'}
          </p>
        </div>

        {/* Right side - Icons and logout */}
        <div className="flex items-center space-x-6 mr-4">
          <div className="flex items-center space-x-4">
            <div className="relative icon-container">
              <Bell className="w-8 h-9 cursor-pointer icon-hover" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-green-600">3</span>
            </div>
            {userType === 'vendor' && (
              <div className="relative icon-container">
                <ShoppingCart 
                  className="w-8 h-8 cursor-pointer icon-hover" 
                  onClick={() => setCurrentView('cart')} 
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center border-2 border-green-600">
                    {cartItems.length}
                  </span>
                )}
              </div>
            )}
          </div>
          <button 
            onClick={onLogout} 
            className="text-lg opacity-90 hover:opacity-100 hover:scale-110"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export { DashboardHeader };