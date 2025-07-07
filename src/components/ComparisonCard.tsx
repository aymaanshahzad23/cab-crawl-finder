import React from 'react';
import { Car, Clock, Zap, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface ComparisonCardProps {
  ride: RideOption;
  onBook: (service: string) => void;
}

const ComparisonCard = ({ ride, onBook }: ComparisonCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-voom-yellow hover:border-voom-black">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg font-poppins"
            style={{ backgroundColor: ride.color }}
          >
            {ride.service[0]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-voom-black font-poppins">{ride.service}</h3>
            <p className="text-gray-600 text-sm font-poppins">{ride.type}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-1">
          {ride.isCheapest && (
            <Badge className="bg-green-100 text-green-800 text-xs font-poppins">Cheapest</Badge>
          )}
          {ride.isFastest && (
            <Badge className="bg-blue-100 text-blue-800 text-xs font-poppins">Fastest</Badge>
          )}
          {ride.isEco && (
            <Badge className="bg-emerald-100 text-emerald-800 text-xs font-poppins">
              <Zap className="w-3 h-3 mr-1" />
              Eco
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-voom-black font-poppins">₹{ride.price}</p>
            <p className="text-xs text-gray-500 font-poppins">Fare</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <p className="text-lg font-semibold text-gray-700 font-poppins">{ride.eta} min</p>
            </div>
            <p className="text-xs text-gray-500 font-poppins">ETA</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-voom-yellow mr-1" />
              <p className="text-lg font-semibold text-gray-700 font-poppins">{ride.rating}</p>
            </div>
            <p className="text-xs text-gray-500 font-poppins">Rating</p>
          </div>
        </div>
      </div>
      
      <Button
        onClick={() => onBook(ride.service)}
        className="w-full py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] bg-voom-yellow text-voom-black hover:bg-voom-black hover:text-voom-white font-poppins"
      >
        Book on {ride.service}
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ComparisonCard;
