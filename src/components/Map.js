import React, { useRef, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import mapData from '../data/mapData.json';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../theme';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const isInitialLoad = useRef(true);
  const { mode } = useContext(ThemeContext);

  const initializeMap = () => {
    if (map.current) return;

    const allPointsGeoJSON = {
      type: 'FeatureCollection',
      features: mapData.points.map(point => ({
        type: 'Feature',
        properties: { ...point },
        geometry: { 'type': 'Point', 'coordinates': point.coordinates },
      })),
    };

    const mapStyle = mode === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : 'mapbox://styles/mapbox/light-v11';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      projection: 'globe',
      center: [-74.0060, 40.7128],
      zoom: 4,
    });

    map.current.on('style.load', () => {
      map.current.setFog({});

      const buildSpoke = () => {
        const center = map.current.getCenter();
        const centerPoint = turf.point([center.lng, center.lat]);
        let nearestPoints = { type: 'FeatureCollection', features: [] };
        let nearestLines = { type: 'FeatureCollection', features: [] };
        let availablePoints = JSON.parse(JSON.stringify(allPointsGeoJSON));

        for (let i = 0; i < 10 && availablePoints.features.length > 0; i++) {
          const nearest = turf.nearestPoint(centerPoint, availablePoints);
          const startLng = centerPoint.geometry.coordinates[0];
          const endLng = nearest.geometry.coordinates[0];
          if (startLng >= 90 && endLng <= -90) nearest.geometry.coordinates[0] += 360;
          else if (startLng <= -90 && endLng >= 90) nearest.geometry.coordinates[0] -= 360;
          
          const line = turf.lineString([centerPoint.geometry.coordinates, nearest.geometry.coordinates]);
          nearestPoints.features.push(nearest);
          nearestLines.features.push(line);
          
          const index = availablePoints.features.findIndex(p => p.properties.id === nearest.properties.id);
          if (index !== -1) availablePoints.features.splice(index, 1);
        }
        
        if (isInitialLoad.current) {
          addLayers(nearestPoints, nearestLines);
        } else {
          map.current.getSource('nearest-points').setData(nearestPoints);
          map.current.getSource('spoke-lines').setData(nearestLines);
        }
      };

      const addLayers = (nearest, lines) => {
        isInitialLoad.current = false;
        map.current.addSource('all-points', { type: 'geojson', data: allPointsGeoJSON });
        map.current.addSource('nearest-points', { type: 'geojson', data: nearest });
        map.current.addSource('spoke-lines', { type: 'geojson', data: lines });

        map.current.addLayer({ 'id': 'spoke-lines-layer', 'type': 'line', 'source': 'spoke-lines', 'paint': { 'line-color': '#00bfa0', 'line-width': 1.5, 'line-opacity': 0.8 } });
        map.current.addLayer({ 'id': 'all-points-layer', 'type': 'circle', 'source': 'all-points', 'paint': { 'circle-radius': 3, 'circle-color': mode === 'dark' ? '#ffffff' : '#424242', 'circle-opacity': 0.5 } });
        map.current.addLayer({
          'id': 'nearest-points-layer', 'type': 'circle', 'source': 'nearest-points',
          'paint': {
            'circle-radius': 6,
            'circle-color': ['match', ['get', 'type'], 'work', '#ff7c43', 'travel', '#00bfa0', '#ccc'],
            'circle-stroke-width': 2, 'circle-stroke-color': mode === 'dark' ? '#ffffff' : '#212121'
          }
        });
        
        map.current.on('mouseenter', 'nearest-points-layer', () => { map.current.getCanvas().style.cursor = 'pointer'; });
        map.current.on('mouseleave', 'nearest-points-layer', () => { map.current.getCanvas().style.cursor = ''; });
        
        map.current.on('click', 'nearest-points-layer', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { name, description } = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          
          const popupHTML = `<h3>${name}</h3><p>${description}</p>`;
          
          new mapboxgl.Popup({ className: 'custom-mapbox-popup' })
            .setLngLat(coordinates)
            .setHTML(popupHTML)
            .addTo(map.current);
        });
      };

      buildSpoke();
      map.current.on('move', buildSpoke);
    });
  };

  useEffect(() => {
    const currentTheme = mode === 'dark' ? darkTheme : lightTheme;
    const popupStyles = `
      .custom-mapbox-popup .mapboxgl-popup-content {
        background-color: ${currentTheme.palette.background.paper};
        color: ${currentTheme.palette.text.primary};
        font-family: "Roboto", sans-serif;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        max-width: 250px;
      }
      .custom-mapbox-popup .mapboxgl-popup-tip {
        border-top-color: ${currentTheme.palette.background.paper} !important;
      }
      .custom-mapbox-popup h3 {
        margin: 0 0 5px; font-size: 1rem; font-weight: 600;
      }
      .custom-mapbox-popup p {
        margin: 0; font-size: 0.9rem;
      }
    `;
    const styleEl = document.createElement('style');
    styleEl.id = 'mapbox-popup-dynamic-styles';
    styleEl.innerHTML = popupStyles;
    document.head.appendChild(styleEl);

    const container = mapContainer.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      if (!map.current && container.clientHeight > 0) {
        initializeMap();
        observer.disconnect();
      }
    });
    observer.observe(container);

    return () => {
      const existingStyleEl = document.getElementById('mapbox-popup-dynamic-styles');
      if (existingStyleEl) {
        document.head.removeChild(existingStyleEl);
      }
      observer.disconnect();
      if (map.current) {
        map.current.remove();
        map.current = null;
        isInitialLoad.current = true;
      }
    };
  }, [mode]);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>My Journey</Typography>
      <Box ref={mapContainer} sx={{ height: '70vh', width: '100%', borderRadius: 2 }} />
    </Box>
  );
};

export default Map;