import { useEffect } from 'react';

export const useLoadGoogleMaps = (apiKey) => {
  useEffect(() => {
    if (window.google) return;

    const existingScript = document.querySelector(
      `script[src^="https://maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);
};