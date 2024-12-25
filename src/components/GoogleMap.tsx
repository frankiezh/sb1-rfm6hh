import { useEffect, useRef, useState } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';

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
          zoom: 15,
          center: { lat: 47.380617, lng: 8.529662 },
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: true,
        });

        // Create marker
        const marker = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          position: { lat: 47.379317, lng: 8.529662 },
          title: "Atelier Grünenwald",
        });

        // Create info window with clickable logo
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; text-align: center;">
              <a 
                href="https://www.google.com/maps/place/Atelier+Gr%C3%BCnenwald/@47.3793172,8.5296619,17z/data=!3m1!4b1!4m6!3m5!1s0x3050b20ed8ad56f:0x5e280514f8c2c979!8m2!3d47.3793172!4d8.5296619!16s%2Fg%2F11y40d8j_d"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  transition: transform 0.2s ease;
                  cursor: pointer;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
              >
                <img 
                  src="/atelier-gruenenwald-logo.svg" 
                  alt="Atelier Grünenwald - ${language === 'de' ? 'Auf Google Maps öffnen' : 'Open in Google Maps'}"
                  style="width: 100px; height: auto;"
                />
              </a>
            </div>
          `,
          disableAutoPan: true
        });

        // Hide the close button using CSS
        google.maps.event.addListener(infoWindow, 'domready', () => {
          const closeButtons = document.querySelectorAll('.gm-ui-hover-effect');
          closeButtons.forEach(button => {
            (button as HTMLElement).style.display = 'none';
          });
        });

        // Create tooltip for hover state
        const tooltip = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 4px; text-align: center; font-size: 14px;">
              ${language === 'de' ? 'Auf Google Maps öffnen' : 'Open in Google Maps'}
            </div>
          `,
          disableAutoPan: true
        });

        // Add hover listeners
        marker.addListener('mouseover', () => {
          if (!infoWindow.getMap()) { // Only show tooltip if info window is closed
            tooltip.open(mapInstanceRef.current, marker);
          }
        });

        marker.addListener('mouseout', () => {
          tooltip.close();
        });

        // Click handler for marker
        marker.addListener('click', () => {
          tooltip.close(); // Close tooltip if open
          infoWindow.open(mapInstanceRef.current, marker);
        });

        // Open info window by default
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