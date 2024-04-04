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
    if (selectedPosition) {
      setBounds(selectedPosition);
      mapRef.current?.flyTo(selectedPosition, 18);
    } else {
      getDefaultBounds()
        .then(defaultBounds => {
          setBounds(defaultBounds);
          mapRef.current?.flyTo(posix, 12);
        })
        .catch(error => console.error('Error setting default bounds:', error));
    }
  }, [selectedPosition]);

  useEffect(() => {
    if(resetLocation === true){
      mapRef.current?.flyTo(posix, 6);
    }
  }, [resetLocation])

  const filteredAirports = data && data.filter((airport: any) => {
    return (
      filter.includes(airport.kategori) && 
      airport.long !== null && 
      airport.lat !== null &&
      airport.long !== '0' &&
      airport.lat !== '0'
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.saptakarya.co.id">Saptakarya</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersToRender.map((airport: any, index: number) => (
          <Marker 
            key={index} 
            position={[airport.long, airport.lat]} 
            draggable={false}
            eventHandlers={{
              click: () => handleSelectMarker(airport, [airport.long, airport.lat]),
            }}
          >
            <Popup>
              <h1>{airport.nama}</h1>
            </Popup>
          </Marker>
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