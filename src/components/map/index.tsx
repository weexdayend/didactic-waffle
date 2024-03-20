"use client"

import React, { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const OpenStreetMap = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    // Make sure Leaflet components are only instantiated on the client-side
    const L = require('leaflet');
    if (typeof window !== 'undefined' && mapRef.current === null) {
      // Initialize Leaflet map
      mapRef.current = L.map('map', {
        zoomControl: false
      }).setView([-4.043477, 39.668205], 9);

      // Add TileLayer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }
  }, []);

  return (
    <div className='h-[70vh] w-screen -z-[100]' id='map'></div>
  )
}

export default OpenStreetMap
