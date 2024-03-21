"use client"

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngBoundsLiteral } from 'leaflet';
import aritports from './dummy.json';

type MarkerProps = {
  selectedPosition: [number, number] | null;
}

const OpenStreetMap = ({ selectedPosition }: MarkerProps) => {
  const [bounds, setBounds] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    getDefaultBounds()
      .then(defaultBounds => setBounds(defaultBounds))
      .catch(error => console.error('Error setting default bounds:', error));
  }, []);

  useEffect(() => {
    if (selectedPosition) {
      setBounds(selectedPosition);
      mapRef.current?.flyTo(selectedPosition, 17);
    } else {
      getDefaultBounds()
        .then(defaultBounds => {
          setBounds(defaultBounds);
          mapRef.current?.flyTo(defaultBounds, 17);
        })
        .catch(error => console.error('Error setting default bounds:', error));
    }
  }, [selectedPosition]);

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
      {bounds && (
        <MapContainer style={{ height: "100%", width: "100%" }} center={bounds} zoom={17} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aritports.map((airport, index) => (
            <div key={index} className='p-4 rounded-full bg-white'>
              <Marker
                key={index}
                position={[Number(airport.lat), Number(airport.lon)]}
                icon={customIcon}
              >
                <Popup>
                  <div className='flex flex-col gap-2'>
                    <h1>Name - {airport.name}</h1>
                    <h1>City - {airport.city}</h1>
                    <h1>State - {airport.state}</h1>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

function getDefaultBounds(): Promise<[number, number]> {
  return new Promise<[number, number]>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error); // Reject the promise if there's an error
      }
    );
  });
}

export default OpenStreetMap;
