"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useRef, useState } from "react";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
  selectedPosition: [number, number] | null,
  information: any,
  resetLocation: boolean,
  filter: any[],
  data: any,
  handleSelectMarker: (information: any, value: [number, number]) => void,
}

const defaults = {
  zoom: 12,
}

const Map = (Map: MapProps) => {
  const { 
    zoom = defaults.zoom, 
    posix, 
    selectedPosition, 
    information, 
    resetLocation, 
    filter, 
    data,
    handleSelectMarker
  } = Map

  const [bounds, setBounds] = useState<[number, number] | null>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (
      selectedPosition &&
      Array.isArray(selectedPosition) &&
      selectedPosition.length === 2 &&
      typeof selectedPosition[0] === 'number' &&
      typeof selectedPosition[1] === 'number' &&
      selectedPosition[0] !== 0 &&
      selectedPosition[1] !== 0 &&
      selectedPosition[0] !== null &&
      selectedPosition[1] !== null
    ) {
      setBounds(selectedPosition);
      mapRef.current?.flyTo(selectedPosition, 18);
      // Show marker logic here
    } else {
      getDefaultBounds()
        .then(defaultBounds => {
          setBounds(defaultBounds);
          mapRef.current?.flyTo(posix, 12);
          // Hide marker logic here
        })
        .catch(error => console.error('Error setting default bounds:', error));
    }
  }, [selectedPosition]);

  useEffect(() => {
    if(resetLocation === true){
      mapRef.current?.flyTo(posix, 12);
    }
  }, [resetLocation])

  const filteredAirports = data && data.filter((airport: any) => {
    return (
      airport.longitude !== null && 
      airport.lattitude !== null &&
      airport.longitude !== '0' &&
      airport.lattitude !== '0'
    );
  });

  const markersToRender = filter.length > 0 ? filteredAirports : [];

  return (
    <div className='h-[70vh] w-[99vw] -z-50'>
      <MapContainer
        ref={mapRef}
        center={posix}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.saptakarya.co.id">Saptakarya</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredAirports.map((airport: any, index: number) => (
          <div key={index}>
            {
              airport.longitude !== null &&
              airport.lattitude !== null &&
              airport.longitude !== '0' &&
              airport.lattitude !== '0' && (
                <Marker 
                  key={index} 
                  position={[airport.longitude, airport.lattitude]} 
                  draggable={false}
                  eventHandlers={{
                    click: () => handleSelectMarker(airport, [airport.longitude, airport.lattitude]),
                  }}
                >
                  <Popup>
                    <h1>{airport.nama}</h1>
                  </Popup>
                </Marker>
              )
            }
          </div>
        ))}
      </MapContainer>
    </div>
  )
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

export default Map