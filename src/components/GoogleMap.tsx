import { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

interface GoogleMapProps {
  apiKey: string;
  placeId: string;
  language: string;
}

export function GoogleMap({ apiKey, placeId, language }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is missing");
      setIsLoading(false);
      return;
    }
    
    if (!mapContainerRef.current) return;
    
    const mapContainer = mapContainerRef.current;
    let map: google.maps.Map | null = null;
    let marker: google.maps.Marker | null = null;
    
    const initMap = async () => {
      try {
        setIsLoading(true);
        
        // Load the Google Maps script using the Loader
        const loader = new Loader({
          apiKey,
          version: "weekly",
          language: language,
        });
        
        // Wait for the API to load
        await loader.load();
        
        // Now Google Maps should be available globally
        if (!google || !google.maps) {
          throw new Error("Google Maps API failed to load");
        }
        
        // Initialize the map
        map = new google.maps.Map(mapContainer, {
          zoom: 15,
          center: { lat: 47.380617, lng: 8.529662 },
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: true,
          // @ts-ignore - Language option is valid but not in the TypeScript types
          language: language,
        });
        
        // Add a marker
        marker = new google.maps.Marker({
          map,
          position: { lat: 47.379317, lng: 8.529662 },
          title: "Atelier Grünenwald",
        });
        
        // Wait for the map to be idle before adding the info window
        google.maps.event.addListenerOnce(map, 'idle', () => {
          // Create info window AFTER the map is ready
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; text-align: center;">
                <a 
                  href="https://www.google.com/maps/place/Atelier+Gr%C3%BCnenwald/@47.3793172,8.5296619,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="display: inline-block; transition: transform 0.2s ease; cursor: pointer;"
                >
                  <img 
                    src="${window.location.origin}/atelier-gruenenwald-logo.svg"
                    alt="Atelier Grünenwald - ${language === 'de' ? 'Auf Google Maps öffnen' : 'Open in Google Maps'}"
                    style="width: 100px; height: auto;"
                  />
                </a>
              </div>
            `,
            disableAutoPan: true
          });
          
          // Add click listener to marker
          marker?.addListener('click', () => {
            infoWindow.open({
              anchor: marker,
              map,
            });
          });
          
          // Open info window by default
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load Google Maps');
        setIsLoading(false);
      }
    };
    
    initMap();
    
    // Clean up
    return () => {
      if (map) {
        // No need to explicitly remove the map as React will handle DOM cleanup
        // Just nullify our references
        map = null;
        marker = null;
      }
    };
  }, [apiKey, language, placeId]);
  
  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="animate-pulse w-12 h-12 rounded-full bg-gray-300"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
        aria-hidden={isLoading || !!error}
      ></div>
    </div>
  );
} 