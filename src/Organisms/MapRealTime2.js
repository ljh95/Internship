import React, { useState, useEffect, useRef } from 'react';
import isEmptyToken from '../Utils/isEmptyToken';
import { CustomOverlay } from '../Utils/Map/CustomOverlay';
import './Map.css';

const { naver } = window;

export default function Map({ zoom, center, mapData }) {
  const [map, setMap] = useState(null);
  const mapRef = useRef();
  const markersRef = useRef([]);

  // Init Map
  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    const mapDiv = mapRef.current;
    const mapObj = new naver.maps.Map(mapDiv, {
      zoom: zoom,
      center: new naver.maps.LatLng(center.lat, center.lng),
    });

    setMap(mapObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CreateCustomOveray
  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    if (!map) return;
    if (markersRef.current.length) {
      deleteMarker();
    }

    createCustomOverlay(mapData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData]);

  const createCustomOverlay = ({ loading_location, unloading_location }) => {
    // loading location
    markersRef.current.push(makeCustomOverlay(loading_location, true));
    // unloading location
    markersRef.current.push(makeCustomOverlay(unloading_location, false));
    // drive_route
    // makeCustomOverlay(drive_route);
  };

  const makeCustomOverlay = (location, is_loading) => {
    const position = new naver.maps.LatLng(
      location.latitude,
      location.longitude
    );

    const customOverlay = new CustomOverlay({
      site_id: location.pk,
      map,
      position,
      name: location.name,
      elementType: 'realtime',
      is_loading: is_loading,
    });

    return customOverlay;
  };

  const deleteMarker = () => {
    markersRef.current.forEach(marker => marker && marker.setMap(null));
    markersRef.current = [];
  };

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100%', position: 'relative' }}
      ref={mapRef}
    />
  );
}
