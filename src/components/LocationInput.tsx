
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
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showCredentialsInput, setShowCredentialsInput] = useState(true);

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
      {showCredentialsInput && (
        <div className="space-y-3 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Enter Ola Maps OAuth Credentials</span>
          </div>
          <Input
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="text-sm"
          />
          <Input
            placeholder="Client Secret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            className="text-sm"
            type="password"
          />
          <p className="text-xs text-orange-700">
            Get your OAuth credentials from Ola Maps Developer Console. This enables address autocomplete with OAuth authentication.
          </p>
          {clientId && clientSecret && (
            <Button
              onClick={() => setShowCredentialsInput(false)}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Enable OAuth Autocomplete
            </Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        <AutocompleteInput
          placeholder="Pickup location"
          value={pickup}
          onChange={setPickup}
          clientId={clientId}
          clientSecret={clientSecret}
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
          clientId={clientId}
          clientSecret={clientSecret}
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
