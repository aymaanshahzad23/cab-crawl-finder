
import { useState, useCallback } from 'react';

interface AutocompleteResult {
  place_id: string;
  description: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const useOlaAutocomplete = (clientId: string, clientSecret: string) => {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');

  const getOAuthToken = useCallback(async () => {
    if (!clientId || !clientSecret) return null;

    try {
      const response = await fetch('https://api.olamaps.io/auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      if (response.ok) {
        const data: OAuthTokenResponse = await response.json();
        setAccessToken(data.access_token);
        return data.access_token;
      } else {
        console.error('OAuth token error:', response.status);
        return null;
      }
    } catch (error) {
      console.error('OAuth token fetch error:', error);
      return null;
    }
  }, [clientId, clientSecret]);

  const searchPlaces = useCallback(async (query: string) => {
    if (!query.trim() || !clientId || !clientSecret) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      let token = accessToken;
      if (!token) {
        token = await getOAuthToken() || '';
        if (!token) {
          setSuggestions([]);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Request-Id': crypto.randomUUID(),
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.predictions || []);
      } else if (response.status === 401) {
        // Token expired, get new one and retry
        const newToken = await getOAuthToken();
        if (newToken) {
          const retryResponse = await fetch(
            `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(query)}`,
            {
              headers: {
                'Authorization': `Bearer ${newToken}`,
                'X-Request-Id': crypto.randomUUID(),
              },
            }
          );
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            setSuggestions(retryData.predictions || []);
          } else {
            console.error('Autocomplete API retry error:', retryResponse.status);
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
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
  }, [clientId, clientSecret, accessToken, getOAuthToken]);

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
