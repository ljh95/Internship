import dashboardElement from './dashboardElement';
import realtimeElement from './realtimeElement';

const { naver } = window;

export const CustomOverlay = function (options) {
  let el;
  if (options.elementType === 'dashboard') {
    el = dashboardElement(options);
  } else if (options.elementType === 'realtime') {
    el = realtimeElement(options);
  }

  this._element = el;
  this.setPosition(options.position);
  this.setMap(options.map || null);
};

CustomOverlay.prototype = new naver.maps.OverlayView();
CustomOverlay.prototype.constructor = CustomOverlay;
CustomOverlay.prototype.onAdd = function () {
  const overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.appendChild(this._element);
};

CustomOverlay.prototype.setPosition = function (position) {
  this._position = position;
  this.draw();
};

CustomOverlay.prototype.getPosition = function () {
  return this._position;
};

CustomOverlay.prototype.draw = function () {
  // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
  if (!this.getMap()) return;
  // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
  const projection = this.getProjection();
  const position = this.getPosition();
  const pixelPosition = projection.fromCoordToOffset(position);

  this._element.style.left = `${pixelPosition.x - 50}px`;
  this._element.style.top = `${pixelPosition.y - 93}px`;
};

CustomOverlay.prototype.onRemove = function () {
  let overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.innerHTML = '';
};
