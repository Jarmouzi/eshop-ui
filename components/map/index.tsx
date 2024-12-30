'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L, { LatLng, Map } from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  onPositionChange: (latlng: LatLng) => void; 
}

const MapComponent: React.FC<MapProps> = ({ onPositionChange }) => {
  const defaultPosition = new LatLng(35.69439, 51.42151);
  const [position, setPosition] = useState(defaultPosition);

  const SetViewOnMove = () => {
    const map = useMap();
    useEffect(() => {
      const handleMove = () => {
        const newPosition = map.getCenter();
        setPosition(newPosition);
        onPositionChange(newPosition);
      };

      map.on('move', handleMove);
      return () => {
        map.off('move', handleMove);
      };
    }, [map]);

    return null;
  };

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}></Marker>
        <SetViewOnMove />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
