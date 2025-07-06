
import React, { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationInputProps {
  onLocationChange: (pickup: string, drop: string) => void;
}

const LocationInput = ({ onLocationChange }: LocationInputProps) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPickup('Current Location');
        console.log('Current location detected:', position.coords);
      });
    }
  };

  const handleSearch = () => {
    if (pickup && drop) {
      onLocationChange(pickup, drop);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-6 bg-white rounded-2xl shadow-lg">
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
          <Input
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-orange-500 rounded-xl"
          />
          <Button
            onClick={handleCurrentLocation}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
          <Input
            placeholder="Drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-blue-600 rounded-xl"
          />
        </div>
      </div>
      
      <Button
        onClick={handleSearch}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        disabled={!pickup || !drop}
      >
        <Search className="w-5 h-5 mr-2" />
        Compare Rides
      </Button>
    </div>
  );
};

export default LocationInput;
