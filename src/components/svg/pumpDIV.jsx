import L from 'leaflet';
import './pumpDIV.scss';

export const pumpDIV = (pump, onClickprop, isPopupOpen, pumpStSensor) => {
  const iconSizeX = pump.length * 25 - 10;
  const iconSizeY = 58;
  let showPopup = false;
  const pumpStFlow = pumpStSensor?.filter(item => item.measurement?.type === 'flow');

  /*item === 0 ? 'rgb(114, 113, 113)' : 'rgb(54, 117, 159)' 'rgb(130, 0, 0)' : 'rgb(78, 108, 80)'*/
  const allCircles = `${
    pump?.length > 0 &&
    pump.map(
      (item, i) =>
        `<div class='pump' style='background-color: ${
          item.power === 0 ? 'rgb(114, 113, 113)' : 'rgb(54, 117, 159)'
        }'>${i + 1}</div>`
    )
  }`
    .split(',')
    .join('');

  const allPumpsData = `${pump.map(
    (item, i) =>
      `<span>${i + 1} pump: ${i * 100} <span>${item.sensors?.map(
        itemm => itemm.measurement?.unit_short
      )}</span></span>`
  )}`
    .split(',')
    .join('');

  const pumpHTML = `<div class='pump-station' style='border: 2px solid ${
    pump.length < 0 ? 'rgb(220, 9, 9)' : 'rgb(50, 140, 56)'
  }'>
  <div class='pumps-container'>${allCircles}</div>
  <div class='pump-station-flow'>100 <span class='unit'>L/s</span></div>
  <div class='pump-popup ${isPopupOpen ? 'open' : ''}'>${allPumpsData}</div>
  </div>
  <div class='pump-pipe'></div>
  <div class='pump-node'></div>`;

  const size = 1;

  const markerSizeX = iconSizeX < 60 ? 60 : iconSizeX;
  const markerSizeY = iconSizeY;
  const iconAnchorX = markerSizeX / 2;

  const tankIcon = new L.divIcon({
    className: 'pump-icon-container',
    html: pumpHTML,
    iconSize: [markerSizeX, markerSizeY], // size of the icon
    iconAnchor: [iconAnchorX, 55] // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};
