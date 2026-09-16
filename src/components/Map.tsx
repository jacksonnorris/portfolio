import React, { useRef, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import AccentRule from './AccentRule';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, GeoJsonProperties, LineString, Point, Position } from 'geojson';
import { mapData } from '../data/portfolio';
import type { MapPoint } from '../types/portfolio';
import { ThemeContext } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../theme';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN ?? '';

type PointCollection = FeatureCollection<Point, MapPoint>;
type LineCollection = FeatureCollection<LineString, GeoJsonProperties>;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isInitialLoad = useRef(true);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const initializeMap = (container: HTMLDivElement) => {
      if (map.current) return;

      const allPointsGeoJSON: PointCollection = {
        type: 'FeatureCollection',
        features: mapData.points.map(point => ({
          type: 'Feature',
          properties: { ...point },
          geometry: { type: 'Point', coordinates: point.coordinates },
        })),
      };

      const mapStyle = mode === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11';

      const instance = new mapboxgl.Map({
        container,
        style: mapStyle,
        projection: 'globe',
        center: [-80.8392, 35.2252],
        zoom: 4,
      });
      map.current = instance;

      instance.on('style.load', () => {
        instance.setFog({});

        const buildSpoke = () => {
          const center = instance.getCenter();
          const centerPoint = turf.point([center.lng, center.lat]);
          const nearestPoints: PointCollection = { type: 'FeatureCollection', features: [] };
          const nearestLines: LineCollection = { type: 'FeatureCollection', features: [] };
          const availablePoints: PointCollection = JSON.parse(JSON.stringify(allPointsGeoJSON));

          for (let i = 0; i < 10 && availablePoints.features.length > 0; i++) {
            const nearest = turf.nearestPoint(centerPoint, availablePoints);
            const startLng = centerPoint.geometry.coordinates[0];
            const endLng = nearest.geometry.coordinates[0];
            if (startLng >= 90 && endLng <= -90) nearest.geometry.coordinates[0] += 360;
            else if (startLng <= -90 && endLng >= 90) nearest.geometry.coordinates[0] -= 360;

            const line = turf.lineString([centerPoint.geometry.coordinates, nearest.geometry.coordinates]);
            // nearestPoint copies the source feature's properties and adds
            // featureIndex/distanceToPoint, so MapPoint fields are present at
            // runtime even though turf's return type doesn't say so.
            nearestPoints.features.push(nearest as unknown as Feature<Point, MapPoint>);
            nearestLines.features.push(line);

            const index = availablePoints.features.findIndex(p => p.properties.id === nearest.properties.id);
            if (index !== -1) availablePoints.features.splice(index, 1);
          }

          if (isInitialLoad.current) {
            addLayers(nearestPoints, nearestLines);
          } else {
            (instance.getSource('nearest-points') as mapboxgl.GeoJSONSource | undefined)?.setData(nearestPoints);
            (instance.getSource('spoke-lines') as mapboxgl.GeoJSONSource | undefined)?.setData(nearestLines);
          }
        };

        const addLayers = (nearest: PointCollection, lines: LineCollection) => {
          isInitialLoad.current = false;
          instance.addSource('all-points', { type: 'geojson', data: allPointsGeoJSON });
          instance.addSource('nearest-points', { type: 'geojson', data: nearest });
          instance.addSource('spoke-lines', { type: 'geojson', data: lines });

          instance.addLayer({ 'id': 'spoke-lines-layer', 'type': 'line', 'source': 'spoke-lines', 'paint': { 'line-color': '#00bfa0', 'line-width': 1.5, 'line-opacity': 0.8 } });
          instance.addLayer({ 'id': 'all-points-layer', 'type': 'circle', 'source': 'all-points', 'paint': { 'circle-radius': 3, 'circle-color': mode === 'dark' ? '#ffffff' : '#424242', 'circle-opacity': 0.5 } });
          instance.addLayer({
            'id': 'nearest-points-layer', 'type': 'circle', 'source': 'nearest-points',
            'paint': {
              'circle-radius': 6,
              'circle-color': ['match', ['get', 'type'], 'work', '#ff7c43', 'travel', '#00bfa0', '#ccc'],
              'circle-stroke-width': 2, 'circle-stroke-color': mode === 'dark' ? '#ffffff' : '#212121'
            }
          });

          instance.on('mouseenter', 'nearest-points-layer', () => { instance.getCanvas().style.cursor = 'pointer'; });
          instance.on('mouseleave', 'nearest-points-layer', () => { instance.getCanvas().style.cursor = ''; });

          instance.on('click', 'nearest-points-layer', (e) => {
            const feature = e.features?.[0];
            if (!feature || feature.geometry.type !== 'Point') return;

            const coordinates = feature.geometry.coordinates.slice() as Position;
            const { name, description } = feature.properties as unknown as MapPoint;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            const popupHTML = `<h3>${name}</h3><p>${description}</p>`;

            new mapboxgl.Popup({ className: 'custom-mapbox-popup' })
              .setLngLat([coordinates[0], coordinates[1]])
              .setHTML(popupHTML)
              .addTo(instance);
          });
        };

        buildSpoke();
        instance.on('move', buildSpoke);
      });
    };

    const currentTheme = mode === 'dark' ? darkTheme : lightTheme;
    const popupStyles = `
      .custom-mapbox-popup .mapboxgl-popup-content {
        background-color: ${currentTheme.palette.background.paper};
        color: ${currentTheme.palette.text.primary};
        font-family: "Inter", "Roboto", sans-serif;
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
        initializeMap(container);
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
      <Typography variant="h2" align="center" sx={{ mb: 1.5 }}>My Journey</Typography>
      <AccentRule mb={4} />
      <Box ref={mapContainer} sx={{ height: '70vh', width: '100%', borderRadius: 2 }} />
    </Box>
  );
};

export default Map;
