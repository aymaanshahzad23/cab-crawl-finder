
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useOlaAutocomplete } from '@/hooks/useOlaAutocomplete';

interface AutocompleteInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clientId: string;
  clientSecret: string;
  icon: React.ReactNode;
  rightButton?: React.ReactNode;
}

const AutocompleteInput = ({ 
  placeholder, 
  value, 
  onChange, 
  clientId, 
  clientSecret,
  icon,
  rightButton 
}: AutocompleteInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, isLoading, searchPlaces, clearSuggestions } = useOlaAutocomplete(clientId, clientSecret);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.length > 2) {
        searchPlaces(value);
        setShowSuggestions(true);
      } else {
        clearSuggestions();
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, searchPlaces, clearSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: any) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    clearSuggestions();
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
          {icon}
        </div>
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 py-3 text-lg border-2 border-voom-yellow focus:border-voom-black focus:ring-voom-black rounded-xl font-poppins placeholder:text-gray-500"
          onFocus={() => value.length > 2 && suggestions.length > 0 && setShowSuggestions(true)}
        />
        {rightButton && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {rightButton}
          </div>
        )}
        {isLoading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-voom-yellow" />
          </div>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-voom-yellow rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id || index}
              className="px-4 py-3 hover:bg-voom-yellow hover:bg-opacity-20 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-voom-yellow flex-shrink-0" />
                <span className="text-sm text-voom-black truncate font-poppins">
                  {suggestion.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
