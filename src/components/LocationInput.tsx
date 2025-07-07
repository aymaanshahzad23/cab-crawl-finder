
import React, { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AutocompleteInput from './AutocompleteInput';

interface LocationInputProps {
  onLocationChange: (pickup: string, drop: string) => void;
}

const LocationInput = ({ onLocationChange }: LocationInputProps) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  // Embedded Ola Maps credentials
  const clientId = "5c1d324b-7043-4816-8c20-a269f263561c";
  const clientSecret = "5c6a738b232e4f0681884555df862f3a";

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
    <div className="w-full max-w-md mx-auto space-y-4 p-6 bg-white rounded-2xl shadow-lg border-2 border-voom-yellow">
      <div className="space-y-4">
        <AutocompleteInput
          placeholder="Pickup location"
          value={pickup}
          onChange={setPickup}
          clientId={clientId}
          clientSecret={clientSecret}
          icon={<MapPin className="text-voom-yellow w-5 h-5" />}
          rightButton={
            <Button
              onClick={handleCurrentLocation}
              variant="ghost"
              size="sm"
              className="text-voom-yellow hover:text-voom-black hover:bg-voom-yellow transition-colors"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          }
        />
        
        <AutocompleteInput
          placeholder="Drop location"
          value={drop}
          onChange={setDrop}
          clientId={clientId}
          clientSecret={clientSecret}
          icon={<MapPin className="text-voom-black w-5 h-5" />}
        />
      </div>
      
      <Button
        onClick={handleSearch}
        className="w-full py-3 text-lg font-semibold bg-voom-yellow text-voom-black hover:bg-voom-black hover:text-voom-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-poppins"
        disabled={!pickup || !drop}
      >
        <Search className="w-5 h-5 mr-2" />
        Compare Rides
      </Button>
    </div>
  );
};

export default LocationInput;
