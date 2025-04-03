// src/components/MapViewer.jsx
import React from 'react';
import useGoogleMaps from '../hooks/useGoogleMaps';
import LoadingSpinner from './LoadingSpinner';

const MapViewer = ({ coordinates, address }) => {
  const { mapRef, loading, error } = useGoogleMaps({
    center: coordinates,
    zoom: 15,
    marker: { position: coordinates, title: address }
  });

  return (
    <div className="h-64 relative rounded-lg overflow-hidden border">
      {loading && <LoadingSpinner />}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default MapViewer;