import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlay } from '../Utils/Map/CustomOverlay';
const { naver } = window;

export default function MapCarPath({
  zoom,
  center,
  loadingLocation,
  unloadingLocation,
  carPathList,
}) {
  const [map, setMap] = useState();
  const mapRef = useRef();
  const customOverlayListRef = useRef([]);

  // Init Map
  useEffect(() => {
    setTimeout(() => {
      const mapObj = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
      });

      setMap(mapObj);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.setOptions({
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom: zoom,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, center, zoom]);

  useEffect(() => {
    if (loadingLocation && unloadingLocation) {
      if (customOverlayListRef.current.length) {
        deleteCustomOverlay();
      }
      if (carPathList) {
        createPolyline(map);
      }
      createloadingAndUnloadingLocation(map);
    }
  });

  const createPolyline = map => {
    const polyline = new naver.maps.Polyline({
      map: map,
      path: [],
      strokeColor: '#5347AA',
      strokeWeight: 2,
    });

    carPathList.forEach(({ id, latitude, longitude }) => {
      const point = {
        x: longitude,
        y: latitude,
        _lat: latitude,
        _lng: longitude,
      };
      const path = polyline.getPath();
      path.push(point);
    });
  };

  const createloadingAndUnloadingLocation = map => {
    const loadingPosition = new naver.maps.LatLng(
      loadingLocation.latitude,
      loadingLocation.longitude
    );

    const loadingCusotm = new CustomOverlay({
      map,
      position: loadingPosition,
      site_id: loadingLocation.loading_location_id,
      name: loadingLocation.name,
      elementType: 'realtime',
      is_loading: true,
    });

    const unloadingPosition = new naver.maps.LatLng(
      unloadingLocation.latitude,
      unloadingLocation.longitude
    );
    const unloadingCustom = new CustomOverlay({
      map,
      position: unloadingPosition,
      site_id: unloadingLocation.unloading_location_id,
      name: unloadingLocation.name,
      elementType: 'realtime',
      is_loading: false,
    });

    customOverlayListRef.current.push(loadingCusotm);
    customOverlayListRef.current.push(unloadingCustom);
  };

  const deleteCustomOverlay = () => {
    customOverlayListRef.current.forEach(
      customOverlay => customOverlay && customOverlay.setMap(null)
    );
    customOverlayListRef.current = [];
  };

  return (
    <div
      id="map1"
      style={{
        width: '80%',
        height: '80%',
        position: 'relative',
        left: '10vw',
        top: '10vh',
      }}
      ref={mapRef}
    ></div>
  );
}
