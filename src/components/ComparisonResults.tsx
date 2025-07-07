
import React from 'react';
import ComparisonCard from './ComparisonCard';
import { Loader2, TrendingDown, Zap, Clock } from 'lucide-react';

interface RideOption {
  id: string;
  service: string;
  type: string;
  price: number;
  eta: number;
  rating: number;
  isEco?: boolean;
  isCheapest?: boolean;
  isFastest?: boolean;
  color: string;
  logo: string;
}

interface ComparisonResultsProps {
  isLoading: boolean;
  pickup: string;
  drop: string;
  rides: RideOption[];
  onBook: (service: string) => void;
}

const ComparisonResults = ({ isLoading, pickup, drop, rides, onBook }: ComparisonResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 animate-spin text-voom-yellow mb-4" />
        <p className="text-lg text-voom-black font-poppins">Comparing rides across platforms...</p>
        <p className="text-sm text-gray-600 mt-2 font-poppins">This might take a few seconds</p>
      </div>
    );
  }

  if (rides.length === 0) {
    return null;
  }

  const cheapestRide = rides.find(r => r.isCheapest);
  const fastestRide = rides.find(r => r.isFastest);
  const ecoRide = rides.find(r => r.isEco);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-voom-black mb-2 font-poppins">
          {pickup} → {drop}
        </h2>
        <p className="text-gray-700 font-poppins">Found {rides.length} ride options</p>
      </div>

      {/* Quick highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cheapestRide && (
          <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 text-center">
            <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-800 font-medium font-poppins">Cheapest Option</p>
            <p className="text-lg font-bold text-green-900 font-poppins">{cheapestRide.service} - ₹{cheapestRide.price}</p>
          </div>
        )}
        
        {fastestRide && (
          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-blue-800 font-medium font-poppins">Fastest Option</p>
            <p className="text-lg font-bold text-blue-900 font-poppins">{fastestRide.service} - {fastestRide.eta} min</p>
          </div>
        )}
        
        {ecoRide && (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 text-center">
            <Zap className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-emerald-800 font-medium font-poppins">Eco-Friendly</p>
            <p className="text-lg font-bold text-emerald-900 font-poppins">{ecoRide.service} EV</p>
          </div>
        )}
      </div>

      {/* All ride options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((ride) => (
          <ComparisonCard
            key={ride.id}
            ride={ride}
            onBook={onBook}
          />
        ))}
      </div>
    </div>
  );
};

export default ComparisonResults;
