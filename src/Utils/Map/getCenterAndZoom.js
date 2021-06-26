export default function getCenterAndZoom(latList, lngList) {
  if (!latList || !lngList) {
    return [null, null];
  }

  let zoom = 10;

  let c_lat =
    (Math.max(...latList) - Math.min(...latList)) / 2 + Math.min(...latList);
  let c_lng =
    (Math.max(...lngList) - Math.min(...lngList)) / 2 + Math.min(...lngList);
  const center = { lat: c_lat, lng: c_lng };

  // let height = Math.max(...latList) - Math.min(...latList); // 110.941
  let width = Math.max(...lngList) - Math.min(...lngList); // 91.290
  width = width * 91.29; // width 25 + 12.5, 12.5
  width = width * 2; // 50

  if (width > 200 && width <= 400) zoom = 9;
  else if (width > 130 && width <= 200) zoom = 10;
  else if (width > 70 && width <= 130) zoom = 10;
  else if (width > 20 && width <= 70) zoom = 11;
  else if (width > 5 && width <= 20) zoom = 12;
  else zoom = 13;

  return [center, zoom];
}
