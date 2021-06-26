import React, { useEffect, useRef, useState } from 'react';
const { naver } = window;

export default function MapLineMaker({ zoom, center, addDataForTest }) {
  const [map, setMap] = useState(null);
  const mapRef = useRef();

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
    createPolyline(map);
  });

  const createPolyline = map => {
    const polyline = new naver.maps.Polyline({
      map,
      path: [],
      strokeColor: '#5347AA',
      strokeWeight: 2,
    });

    naver.maps.Event.addListener(map, 'click', function (e) {
      addDataForTest(e.coord);
      const point = e.coord;

      const path = polyline.getPath();
      path.push(point);

      new naver.maps.Marker({
        map,
        position: point,
      });
    });
  };

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100%', position: 'relative' }}
      ref={mapRef}
    />
  );
}
