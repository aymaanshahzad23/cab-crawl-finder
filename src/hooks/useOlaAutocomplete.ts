
import { useState, useCallback } from 'react';

interface AutocompleteResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export const useOlaAutocomplete = (apiKey: string) => {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPlaces = useCallback(async (query: string) => {
    if (!query.trim() || !apiKey) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(query)}&api_key=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.predictions || []);
      } else {
        console.error('Autocomplete API error:', response.status);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    searchPlaces,
    clearSuggestions
  };
};
