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
  data: any;
}

const OpenStreetMap = ({ myLocation, selectedPosition, information, resetLocation, filter, data }: MarkerProps) => {

  const [bounds, setBounds] = useState<[number, number] | null>(null)

  const mapRef = useRef<any>(null)

  useEffect(() => {
    setBounds(myLocation);
    mapRef.current?.flyTo(myLocation, 13);
  }, [myLocation])

  function parseCoordinates(strings: any) {
    // Ensure selectedPosition is not null and contains valid values
    if (strings && strings.length === 2) {
      // Convert each string to a number
      const latitude = parseFloat(strings[0].replace(',', '.'));
      const longitude = parseFloat(strings[1].replace(',', '.'));
  
      // Check if the conversion is successful
      if (!isNaN(latitude) && !isNaN(longitude)) {
        return [latitude, longitude]; // Return array of parsed numbers
      }
    }
    return null; // Return null if conversion fails
  }

  useEffect(() => {
    if (selectedPosition) {
      setBounds(selectedPosition);
      mapRef.current?.flyTo(parseCoordinates(selectedPosition), 13);
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
        <img src="/assets/icons/marker.png" alt="warehouses icon" height="8" width="8">
      </div>
    `,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  });

  const myIcon = L.divIcon({
    className: 'custom-icon', // Add any custom CSS class for styling if needed
    html: `
      <div class="flex text-center items-center justify-center">
        <img src="/assets/icons/marker-selected.png" alt="warehouses icon" height="8" width="8">
      </div>
    `,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  });

  const filteredAirports = data && data.filter((airport: any) => {
    return (
      filter.includes(airport.kategori) && 
      airport.long !== null && 
      airport.lat !== null &&
      airport.long !== '0' &&
      airport.lat !== '0'
    );
  });

  const markersToRender = filter.length > 0 ? filteredAirports : filteredAirports;

  return (
    <div className='h-[70vh] w-[99vw] -z-50'>
      {bounds ? (
        <MapContainer zoomControl={false} style={{ height: "100%", width: "100%" }} center={bounds} zoom={6} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data && data !== undefined && markersToRender.map((airport: any, index: number) => (
            data && data !== undefined && (
              <div key={index} className='p-4 rounded-full bg-white'>
                <Marker
                  key={index}
                  position={[parseFloat(airport.lat.replace(',', '.')), parseFloat(airport.long.replace(',', '.'))]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className='flex flex-col gap-2'>
                      <h1>Name - {airport.nama}</h1>
                      <h1>Kategori - {airport.kategori}</h1>
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
