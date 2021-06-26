import React, { useState, useEffect, useRef } from 'react';
import { DashboardCustomOverlay } from '../Utils/Map/DashboardCustomOverlay';
import './Map.css';

const { naver } = window;

export default function Map({ zoom, center, mapData, elementType }) {
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  // Init Map
  useEffect(() => {
    const mapDiv = mapRef.current;
    const mapObj = new naver.maps.Map(mapDiv, {
      zoom: zoom,
      center: new naver.maps.LatLng(center.lat, center.lng),
    });

    setMap(mapObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.setOptions({
      zoom,
      center: new naver.maps.LatLng(center.lat, center.lng),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData, zoom, center]);

  // CreateCustomOveray
  useEffect(() => {
    if (!map) return;
    createCustomOverlay(mapData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData]);

  const createCustomOverlay = workSiteList => {
    for (const {
      site_coordinate,
      site_name,
      progress,
      site_id,
      is_loading,
    } of workSiteList) {
      const position = new naver.maps.LatLng(
        site_coordinate.latitude,
        site_coordinate.longitude
      );

      new DashboardCustomOverlay({
        map,
        position,
        site_id: site_id,
        name: site_name,
        weight: progress.weight,
        percent: progress.percent,
        elementType,
        is_loading: is_loading,
      });
    }
  };

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100%', position: 'relative' }}
      ref={mapRef}
      className="dashboard-map"
    />
  );
}
