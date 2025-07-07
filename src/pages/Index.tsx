
import React, { useState } from 'react';
import Header from '../components/Header';
import LocationInput from '../components/LocationInput';
import ComparisonResults from '../components/ComparisonResults';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rides, setRides] = useState<RideOption[]>([]);
  const { toast } = useToast();

  // Mock data for demonstration
  const generateMockRides = (pickup: string, drop: string): RideOption[] => {
    const basePrice = Math.floor(Math.random() * 50) + 80;
    const baseEta = Math.floor(Math.random() * 5) + 3;
    
    const mockRides: RideOption[] = [
      {
        id: '1',
        service: 'Uber',
        type: 'UberGo',
        price: basePrice + 20,
        eta: baseEta + 2,
        rating: 4.5,
        color: '#000000',
        logo: 'uber'
      },
      {
        id: '2',
        service: 'Ola',
        type: 'Mini',
        price: basePrice,
        eta: baseEta + 1,
        rating: 4.2,
        color: '#00C853',
        logo: 'ola'
      },
      {
        id: '3',
        service: 'Rapido',
        type: 'Auto',
        price: basePrice - 30,
        eta: baseEta,
        rating: 4.1,
        color: '#FFB300',
        logo: 'rapido'
      },
      {
        id: '4',
        service: 'BluSmart',
        type: 'EV Sedan',
        price: basePrice + 15,
        eta: baseEta + 3,
        rating: 4.7,
        isEco: true,
        color: '#2196F3',
        logo: 'blusmart'
      },
      {
        id: '5',
        service: 'InDrive',
        type: 'Economy',
        price: basePrice - 10,
        eta: baseEta + 4,
        rating: 4.0,
        color: '#FF5722',
        logo: 'indrive'
      }
    ];

    // Mark cheapest and fastest
    const cheapest = mockRides.reduce((prev, current) => 
      prev.price < current.price ? prev : current
    );
    const fastest = mockRides.reduce((prev, current) => 
      prev.eta < current.eta ? prev : current
    );

    mockRides.forEach(ride => {
      if (ride.id === cheapest.id) ride.isCheapest = true;
      if (ride.id === fastest.id) ride.isFastest = true;
    });

    return mockRides;
  };

  const handleLocationChange = async (pickupLocation: string, dropLocation: string) => {
    setIsLoading(true);
    setPickup(pickupLocation);
    setDrop(dropLocation);
    
    console.log('Searching rides from', pickupLocation, 'to', dropLocation);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockRides = generateMockRides(pickupLocation, dropLocation);
      setRides(mockRides);
      setIsLoading(false);
      
      toast({
        title: "Rides loaded!",
        description: `Found ${mockRides.length} ride options for your route.`,
      });
    }, 2000);
  };

  const handleBookRide = (service: string) => {
    console.log(`Redirecting to ${service} app for booking`);
    
    toast({
      title: `Redirecting to ${service}`,
      description: "Opening the app to complete your booking...",
    });

    // Mock deep linking - in real app, this would use actual deep links
    const deepLinks: { [key: string]: string } = {
      'Uber': 'uber://',
      'Ola': 'olacabs://',
      'Rapido': 'rapido://',
      'BluSmart': 'blusmart://',
      'InDrive': 'indrive://'
    };

    // Simulate opening external app
    setTimeout(() => {
      window.open(deepLinks[service] || '#', '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-voom-light-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-voom-black mb-4 font-poppins">
              Compare rides across all platforms
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-poppins">
              Get the best deals on Uber, Ola, Rapido, BluSmart, and InDrive all in one place. 
              Save time and money with instant comparisons.
            </p>
          </div>
          
          <LocationInput onLocationChange={handleLocationChange} />
          
          <ComparisonResults
            isLoading={isLoading}
            pickup={pickup}
            drop={drop}
            rides={rides}
            onBook={handleBookRide}
          />
        </div>
      </main>
      
      <footer className="bg-voom-black text-voom-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/assets/logo-icon.png" 
              alt="Voom Logo" 
              className="w-8 h-8 filter brightness-0 invert"
            />
            <h3 className="text-2xl font-bold font-poppins">VOOM</h3>
          </div>
          <p className="text-gray-300 font-poppins">
            Your one-stop solution for comparing cab rides across platforms
          </p>
          <p className="text-sm text-gray-400 mt-4 font-poppins">
            * Prices and availability are fetched in real-time from respective platforms
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
