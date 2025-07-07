
import React from 'react';

const Header = () => {
  return (
    <header className="bg-voom-yellow text-voom-black py-6 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-voom-black bg-opacity-10 p-3 rounded-full">
            <img 
              src="/assets/logo-icon.png" 
              alt="Voom Logo" 
              className="w-8 h-8"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight font-poppins">VOOM</h1>
            <p className="text-lg opacity-90 font-medium">Cabs Made Easy</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
