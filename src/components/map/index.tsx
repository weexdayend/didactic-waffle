"use client"

import React, { useEffect, useState } from 'react'

import {
  Warehouse
} from 'lucide-react'

import Image from 'next/image'
import L from 'leaflet'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import aritports from './dummy.json'

const OpenStreetMap = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define marker coordinates
  const markerPosition: [number, number] = [43.665, 142.453];

  // const customIcon = L.icon({
  //   iconUrl: '/assets/icons/marker.png', // Provide the URL of your PNG image
  //   iconSize: [32, 32], // Size of the icon
  //   iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  // });

  const customIcon = L.divIcon({
    className: 'custom-icon', // Add any custom CSS class for styling if needed
    html: `
      <div class="flex px-4 py-4 w-24 h-24 rounded-full bg-white text-center items-center justify-center">
        <img src="/assets/icons/marker.png" alt="warehouses icon" height="24" width="24">
      </div>
    `,
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
        {aritports.map((airport, index) => {
          return (
            <div key={index} className='p-4 rounded-full bg-white'>
              <Marker
                key={index}
                position={[Number(airport.lat), Number(airport.lon)]}
                icon={customIcon}
                
              >
                <Popup>
                  {airport.name}
                </Popup>
              </Marker>
            </div>
          )
        })}
      </MapContainer>
      )}
    </div>
  )
}

export default OpenStreetMap
