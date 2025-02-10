import { useEffect, useRef, useState } from 'react';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const loadMap = () => {
        try {
          if (window.google) {
            initializeMap();
          } else {
            const script = document.createElement('script');
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            
            // Log the API key (remove in production)
            console.log('Using API Key:', apiKey);
            
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            
            // Add error handling
            script.onerror = (error) => {
              console.error('Error loading Google Maps:', error);
              setMapError('Failed to load Google Maps');
            };

            window.initMap = () => {
              initializeMap();
            };

            document.head.appendChild(script);
          }
        } catch (error) {
          console.error('Error in loadMap:', error);
          setMapError('Error initializing map');
        }
      };

      const initializeMap = () => {
        try {
          if (mapRef.current && !mapInstanceRef.current && window.google) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
              center: { lat: 47.378337, lng: 8.533440 },
              zoom: 15,
              gestureHandling: 'cooperative'
            });

            new window.google.maps.Marker({
              position: { lat: 47.378337, lng: 8.533440 },
              map: mapInstanceRef.current,
              title: "Atelier Grünenwald"
            });
          }
        } catch (error) {
          console.error('Error in initializeMap:', error);
          setMapError('Error creating map');
        }
      };

      loadMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      // Clean up global callback
      delete window.initMap;
    };
  }, []);

  if (mapError) {
    return (
      <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center" 
           style={{ height: '400px' }}>
        <div className="text-center p-4">
          <p className="text-gray-600">{mapError}</p>
          <p className="text-sm text-gray-500 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        minHeight: '400px',
        position: 'relative'
      }}
      className="rounded-lg overflow-hidden"
    />
  );
}

// Add to global window type
declare global {
  interface Window {
    initMap: () => void;
  }
} 