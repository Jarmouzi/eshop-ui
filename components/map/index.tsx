import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';

interface OpenStreetMapProps {
    onLocationSelect: (latlng: LatLng) => void; 
}
const customIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [41, 41] 
});

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ onLocationSelect }) => {
    const defaultPosition: LatLng = L.latLng(35.69439, 51.42151);
    const [position, setPosition] = useState<LatLng>(defaultPosition);
    const markerRef = useRef<L.Marker | null>(null); 

    useEffect(() => {
        if (!navigator.geolocation) {
            setPosition(defaultPosition);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const latLng = L.latLng(latitude, longitude);
                setPosition(latLng);
            },
            (error) => {
                setPosition(defaultPosition);
            }
        );
    }, []);

    
    // Handle dragging of the marker
    const eventHandlers = {
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                setPosition(marker.getLatLng()); // Update position on drag end
                onLocationSelect(marker.getLatLng()); 
            }
        },
    };

    // Handle map events to keep the marker centered
    useMapEvents({
        moveend(e) {
            const map = e.target; // Accessing the Leaflet map instance
            const center = map.getCenter(); // Get the current center of the map
            setPosition(center); // Update marker position to map center
        },
    });
    
    // // Handle map click events
    // const MapClickHandler = () => {
    //     useMapEvents({
    //         click(e) {
    //             e.originalEvent.preventDefault();
    //             const latlng: LatLng = e.latlng;
    //             setPosition(e.latlng); 
    //             onLocationSelect(e.latlng); 
    //         },
    //     });
    //     return null;
    // };

    return (
        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <MapClickHandler /> */}
            {position && (
                // <Marker position={position}  icon={customIcon}>
                // </Marker>
                
                <Marker 
                    position={position} 
                    draggable 
                    eventHandlers={eventHandlers} 
                    ref={markerRef}
                >
                </Marker>
            )}
        </MapContainer>
    );
};

export default OpenStreetMap;