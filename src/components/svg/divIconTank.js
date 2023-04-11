import L, { point } from 'leaflet';

// const waterLevel = 80;

export const divIconTank = (waterLevel, prevWaterLevel) => {
  const tankIcon = L.divIcon({
    className: 'tank-icon-container',
    html: `<div class='tank-top'></div>
          <div class='water-container'>
          <div class='water' style='height:${waterLevel}%'></div>
          <span class='water-level'>${waterLevel}%</span></div>
          <div class='tank-bottom'></div>`,
    iconSize: [25, 42], // size of the icon
    iconAnchor: [12, 42]
  });

  return tankIcon;
};
