import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

interface GoogleMapProps {
  apiKey: string;
  placeId: string;
  language: 'de' | 'en';
}

export function GoogleMap({ apiKey, placeId, language }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scriptId = 'google-maps-script';
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  }, [apiKey]);

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      const existingScript = document.getElementById(scriptId);
      const verificationElement = document.querySelector('[name="gmp-internal-element-support-verification"]');
      if (existingScript) existingScript.remove();
      if (verificationElement) verificationElement.remove();
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      if (window.google?.maps) {
        window.google.maps = undefined;
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current || !window.google?.maps) return;

      try {
        mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
          zoom: 15,
          center: { lat: 47.380617, lng: 8.529662 },
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: true,
          language: language as string,
        });

        const marker = new google.maps.Marker({
          map: mapInstanceRef.current,
          position: { lat: 47.379317, lng: 8.529662 },
          title: "Atelier Grünenwald",
        });

        // Create info window with clickable logo
        const infoWindow = new google.maps.InfoWindow({
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
                  src="${window.location.origin}/atelier-gruenenwald-logo.svg"
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
        const tooltip = new google.maps.InfoWindow({
          content: `
            <div style="padding: 4px; text-align: center; font-size: 14px;">
              ${language === 'de' ? 'Auf Google Maps öffnen' : 'Open in Google Maps'}
            </div>
          `,
          disableAutoPan: true
        });

        // Add hover listeners
        marker.addListener('mouseover', () => {
          if (!infoWindow.getMap()) {
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

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
        setError('Error loading map');
      }
    };

    const loadScript = () => {
      cleanup();

      window.initMap = initializeMap;

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
        setError('Failed to load map');
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      isMounted = false;
      cleanup();
      window.initMap = undefined;
    };
  }, [apiKey, language]);

  useEffect(() => {
    const storedPermission = localStorage.getItem('geolocationPermission');

    if (storedPermission) {
    }

    navigator.permissions.query({ name: 'geolocation' })
      .then((permissionStatus) => {
        localStorage.setItem('geolocationPermission', permissionStatus.state);

        permissionStatus.onchange = () => {
          localStorage.setItem('geolocationPermission', permissionStatus.state);
        };

        if (permissionStatus.state === "granted") {
          // ... proceed with using geolocation (if needed) ...
        } else if (permissionStatus.state === "denied") {
          // ... handle denied state ...
        } else {
          // ... handle prompt state ...
        }
      })
      .catch((error) => {
        console.error("Error querying geolocation permission:", error);
      });
  }, []); // Empty dependency array: run this effect only once

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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