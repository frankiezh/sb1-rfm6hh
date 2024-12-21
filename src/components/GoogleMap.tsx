import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  apiKey: string;
  placeId: string;
  language?: 'de' | 'en';
}

export function GoogleMap({ apiKey, language = 'de' }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scriptId = 'google-maps-script';

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      delete window.google;
    };

    const initializeMap = () => {
      if (!mapContainerRef.current || !window.google?.maps) return;

      try {
        // Create map instance
        mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
          zoom: 16,
          center: { lat: 47.378337, lng: 8.533440 },
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: true,
        });

        // Create marker
        const marker = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          position: { lat: 47.378337, lng: 8.533440 },
          title: "Atelier Grünenwald",
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px; font-size: 16px;">Atelier Grünenwald</h3>
              <p style="margin: 0 0 8px;">Tellstrasse 38<br>8004 Zürich</p>
              <p style="margin: 0; font-size: 14px;">Mo-Fr: 09:00 - 18:00<br>Sa: ${language === 'de' ? 'Nach Vereinbarung' : 'By appointment'}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        infoWindow.open(mapInstanceRef.current, marker);

        // Set language after map is created
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setOptions({ language });
        }

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
        // Continue showing the loading state instead of an error
        // This allows the map to retry loading if it was a temporary error
      }
    };

    const loadScript = () => {
      cleanup();

      const script = document.createElement('script');
      script.id = scriptId;
      // Remove language from URL to avoid referrer issues
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (isMounted) {
          initializeMap();
        }
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [apiKey, language]);

  return (
    <div className="w-full h-[400px] relative rounded-lg">
      <div 
        ref={mapContainerRef}
        className="w-full h-full rounded-lg"
        role="region"
        aria-label="Google Maps showing business location"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600" />
        </div>
      )}
    </div>
  );
} 