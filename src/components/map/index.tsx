"use client"

import React, { useEffect, useState } from 'react'

import {
  Warehouse
} from 'lucide-react'

import L from 'leaflet'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const OpenStreetMap = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define marker coordinates
  const markerPosition: [number, number] = [-4.043477, 39.668205];

  const customIcon = L.divIcon({
    className: 'custom-icon', // Add any custom CSS class for styling if needed
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-blue-500">
      <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
    </svg>
    `, // Render Warehouse icon from Lucide as HTML string
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  });

  return (
    <div className='h-[70vh] w-screen -z-50'>
      {isClient && (
      <MapContainer style={{ height: "100%", width: "100%" }} bounds={[markerPosition]} boundsOptions={{padding: [50, 50]}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      )}
    </div>
  )
}

export default OpenStreetMap
