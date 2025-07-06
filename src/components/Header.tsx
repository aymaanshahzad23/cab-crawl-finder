
import React from 'react';
import { Car } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Car className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">VOOM</h1>
            <p className="text-lg opacity-90">Compare. Choose. Ride.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
