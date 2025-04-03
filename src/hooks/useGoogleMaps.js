// src/hooks/useGoogleMaps.js
import { useEffect, useRef, useState } from 'react';

const useGoogleMaps = ({ center, zoom, marker }) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = () => {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom
        });
        
        if (marker) {
          new window.google.maps.Marker({
            position: marker.position,
            map,
            title: marker.title
          });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load map');
        setLoading(false);
      }
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_KEY}`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        setError('Failed to load Google Maps');
        setLoading(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, [center, zoom, marker]);

  return { mapRef, loading, error };
};

export default useGoogleMaps;