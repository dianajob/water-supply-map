import L from 'leaflet';
import { findSensor } from '../../utils/sensors';

import './pump-el-icon.scss';

export const pumpStElevationIcon = (pumps, pumpStSensor, sensorsValues) => {
  const isSomePumpOn =
    pumps?.filter(p => p.sensors?.filter(s => sensorsValues?.[s.id].y > 0).length > 0).length > 0;

  const isPumpStOn =
    (pumpStSensor.length > 0 &&
      pumpStSensor?.filter(s => sensorsValues?.[s.id].y > 0).length > 0) ||
    isSomePumpOn;

  const iconSizeX = pumps.length * 25 + 22;
  const iconSizeY = 46;

  const pumpStFlow = pumpStSensor?.find(item => item.measurement?.type === 'flow');

  /*item === 0 ? 'rgb(114, 113, 113)' : 'rgb(54, 117, 159)' 'rgb(130, 0, 0)' : 'rgb(78, 108, 80)'*/

  const allCircles = `${
    pumps?.length > 0 &&
    pumps.map(
      (item, i) =>
        `<div class='pump' style='background-color: ${
          item.sensors.filter(s => sensorsValues?.[s.id].y > 0).length > 0
            ? 'rgb(98, 143, 101)'
            : 'rgb(130, 0, 0)'
        }'>${i + 1}</div>`
    )
  }`
    .split(',')
    .join('');

  const pumpHTML = `<div class='pump-tank-wrapper'>
    <div class='pump-node' style='background-color: ${
      isPumpStOn ? 'rgb(8, 94, 141)' : 'rgb(77,77, 77)'
    }'></div>
    <div class='pump-pipe' style='background-color: ${
      isPumpStOn ? 'rgb(8, 94, 141)' : 'rgb(77,77, 77)'
    }'></div>
    <div class='pump-station' style='border: 2px solid ${
      isPumpStOn ? 'rgb(50, 140, 56)' : 'rgb(130, 0, 0)'
    }'>
      <div class='pumps-container'>${allCircles}</div>
      <div class='pump-station-flow'>${
        pumpStFlow ? sensorsValues?.[pumpStFlow.id].y : ''
      } <span class='unit'>${pumpStFlow ? pumpStFlow.measurement?.unit_short : ''}</span></div>
    </div>
  </div>`;

  const markerSizeX = iconSizeX < 60 ? 60 : iconSizeX;
  const markerSizeY = iconSizeY;
  const iconAnchorY = markerSizeY / 2;

  const tankIcon = new L.divIcon({
    className: 'pump-tank-icon-container',
    html: pumpHTML,
    iconSize: [markerSizeX, markerSizeY], // size of the icon
    iconAnchor: [5, iconAnchorY] // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};