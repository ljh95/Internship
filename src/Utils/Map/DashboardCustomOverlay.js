import dashboardElement from './dashboardElement';
import realtimeElement from './realtimeElement';

const sizeArr = [12.5, 17.5, 22.5, 32.5, 37.5];
const { naver } = window;

export const DashboardCustomOverlay = function (options) {
  let el;
  if (options.elementType === 'dashboard') {
    el = dashboardElement(options);
  } else if (options.elementType === 'realtime') {
    el = realtimeElement(options);
  }

  this._element = el;
  this.weight = options.weight - 1;
  this.setPosition(options.position);
  this.setMap(options.map || null);
};

DashboardCustomOverlay.prototype = new naver.maps.OverlayView();
DashboardCustomOverlay.prototype.constructor = DashboardCustomOverlay;
DashboardCustomOverlay.prototype.onAdd = function () {
  const overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.appendChild(this._element);
};

DashboardCustomOverlay.prototype.setPosition = function (position) {
  this._position = position;
  this.draw();
};

DashboardCustomOverlay.prototype.getPosition = function () {
  return this._position;
};

DashboardCustomOverlay.prototype.draw = function () {
  // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
  if (!this.getMap()) return;
  // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
  const projection = this.getProjection();
  const position = this.getPosition();
  const pixelPosition = projection.fromCoordToOffset(position);

  this._element.style.left = `${pixelPosition.x - sizeArr[this.weight]}px`;
  this._element.style.top = `${pixelPosition.y - sizeArr[this.weight]}px`;
};

DashboardCustomOverlay.prototype.onRemove = function () {
  let overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.innerHTML = '';
};
