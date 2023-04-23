import L, { point } from 'leaflet';
import './tankDIV.scss';

// const waterLevel = 80;

export const divIconTank = (waterLevel, prevWaterLevel) => {
  const tankIcon = L.divIcon({
    className: 'tank-icon-container',
    html: `<div class='tank-top'></div>
          <div class='tank-top-rect'></div>
          <div class='cell-container'>
            <div class='cell-level'><span>4.5 m</span><span>0 m</span></div>
            <div class='water-container'>          
              <div class='water' style='height:${waterLevel}%'></div>
              <span class='water-level'>${waterLevel}%</span>
            </div>
          </div>
          <div class='tank-bottom'></div>`,
    iconSize: [50, 52], // size of the icon
    iconAnchor: [12, 42]
  });

  return tankIcon;
};
