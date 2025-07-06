
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useOlaAutocomplete } from '@/hooks/useOlaAutocomplete';

interface AutocompleteInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  apiKey: string;
  icon: React.ReactNode;
  rightButton?: React.ReactNode;
}

const AutocompleteInput = ({ 
  placeholder, 
  value, 
  onChange, 
  apiKey, 
  icon,
  rightButton 
}: AutocompleteInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, isLoading, searchPlaces, clearSuggestions } = useOlaAutocomplete(apiKey);
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
    onChange(suggestion.display_name);
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
          className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-orange-500 rounded-xl"
          onFocus={() => value.length > 2 && suggestions.length > 0 && setShowSuggestions(true)}
        />
        {rightButton && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {rightButton}
          </div>
        )}
        {isLoading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id || index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-800 truncate">
                  {suggestion.display_name}
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
