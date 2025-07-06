
import React, { useState } from 'react';
import { MapPin, Navigation, Search, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AutocompleteInput from './AutocompleteInput';

interface LocationInputProps {
  onLocationChange: (pickup: string, drop: string) => void;
}

const LocationInput = ({ onLocationChange }: LocationInputProps) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

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
      {showApiKeyInput && (
        <div className="space-y-2 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Enter Ola Maps API Key</span>
          </div>
          <Input
            placeholder="Your Ola Maps API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-sm"
          />
          <p className="text-xs text-orange-700">
            Get your API key from Ola Maps Developer Console. This enables address autocomplete.
          </p>
          {apiKey && (
            <Button
              onClick={() => setShowApiKeyInput(false)}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Enable Autocomplete
            </Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        <AutocompleteInput
          placeholder="Pickup location"
          value={pickup}
          onChange={setPickup}
          apiKey={apiKey}
          icon={<MapPin className="text-orange-500 w-5 h-5" />}
          rightButton={
            <Button
              onClick={handleCurrentLocation}
              variant="ghost"
              size="sm"
              className="text-orange-500 hover:text-orange-600"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          }
        />
        
        <AutocompleteInput
          placeholder="Drop location"
          value={drop}
          onChange={setDrop}
          apiKey={apiKey}
          icon={<MapPin className="text-blue-600 w-5 h-5" />}
        />
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
