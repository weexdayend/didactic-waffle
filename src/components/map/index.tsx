"use client"

import React, { useEffect, useState, useRef } from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import airports from './dummy.json';

type MarkerProps = {
  myLocation: [number, number] | null;
  selectedPosition: [number, number] | null;
  information: any;
  resetLocation: boolean;
  filter: any[];
}

const OpenStreetMap = ({ myLocation, selectedPosition, information, resetLocation, filter }: MarkerProps) => {

  const [bounds, setBounds] = useState<[number, number] | null>(null)

  const mapRef = useRef<any>(null)

  useEffect(() => {
    setBounds(myLocation);
    mapRef.current?.flyTo(myLocation, 6);
  }, [myLocation])

  useEffect(() => {
    if (selectedPosition) {
      setBounds(selectedPosition);
      mapRef.current?.flyTo(selectedPosition, 13);
    } else {
      getDefaultBounds()
        .then(defaultBounds => {
          setBounds(defaultBounds);
          mapRef.current?.flyTo(defaultBounds, 16);
        })
        .catch(error => console.error('Error setting default bounds:', error));
    }
  }, [selectedPosition]);

  useEffect(() => {
    if(resetLocation === true){
      mapRef.current?.flyTo(myLocation, 6);
    }
  }, [resetLocation])

  const customIcon = L.divIcon({
    className: 'custom-icon', // Add any custom CSS class for styling if needed
    html: `
      <div class="flex text-center items-center justify-center">
        <img src="/assets/icons/marker.png" alt="warehouses icon" height="24" width="24">
      </div>
    `,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  });

  const myIcon = L.divIcon({
    className: 'custom-icon', // Add any custom CSS class for styling if needed
    html: `
      <div class="flex text-center items-center justify-center">
        <img src="/assets/icons/marker-selected.png" alt="warehouses icon" height="24" width="24">
      </div>
    `,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  });

  const filteredAirports = airports.filter((airport) => {
    return filter.includes(airport.cat);
  });

  const markersToRender = filter.length > 0 ? filteredAirports : [information];

  return (
    <div className='h-[70vh] w-[99vw] -z-50'>
      {bounds ? (
        <MapContainer zoomControl={false} style={{ height: "100%", width: "100%" }} center={bounds} zoom={6} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markersToRender && markersToRender.map((airport: any, index: number) => (
            airport && (
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
            )
          ))}
        </MapContainer>
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <h1 className='text-center px-6'>Mohon untuk beri izin deteksi lokasi terlebih dahulu.</h1>
        </div>
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
