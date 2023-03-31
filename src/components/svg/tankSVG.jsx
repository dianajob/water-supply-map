import L from 'leaflet';

// const waterLevel = 80;

export const tankSVG = (waterLevel, prevWaterLevel) => {
  const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
      <g fill="rgb(178, 178, 178)"> \
          <path  d="M37.6,11.5c-9.3,2.8-22.1,11.2-26.1,17.4c-1.2,1.8,2.1,1.9,39.4,2c22.3,0,40.6-0.5,40.6-1.1c0-1.5-9.2-9.3-15.4-13.1C64.9,9.9,49.9,7.9,37.6,11.5z"/> \
          <path fill="rgb(96, 150, 180)" stroke-width = "4px" stroke = "rgb(178, 178, 178)" d="M17.7,98.3v56.1l32.5,0.2c17.9,0.2,33,0.2,33.8,0l1.3-0.4V98.2V42.2H51.4H17.7V98.3z"/> \
          <path d="M91.4,160.1l-0.2-4.3c0-0.6-0.3-1.1-0.6-1.1H51.4H12.2c-0.3,0-0.6,0.5-0.6,1.1l-0.2,4.3l-0.1,4c0,0.7,0.2,1.2,0.6,1.2h39.5H91c0.3,0,0.6-0.6,0.6-1.2L91.4,160.1z"/> \
          <path d="M65.2,185.5c9.3-2.8,22.1-11.2,26.1-17.4c1.2-1.8-2.1-1.9-39.4-2c-22.3,0-40.6,0.5-40.6,1.1c0,1.5,9.2,9.3,15.4,13.1C37.9,187.1,53,189.1,65.2,185.5z"/> \
          <path d="M11.5,37l0.2,4.3c0,0.6,0.3,1.1,0.6,1.1h39.2h39.2c0.3,0,0.6-0.5,0.6-1.1l0.2-4.3l0.1-4c0-0.7-0.2-1.2-0.6-1.2H51.4H11.9c-0.3,0-0.6,0.6-0.6,1.2L11.5,37z"/> \
        </g> \
        <rect fill="blue" width="8" height="20" x="46.6" y="189.11"/> \
        <rect class="water" fill="black" width="67.5" height="${waterLevel}" x="17.7" y="42.45"> \
          <animate attributeName="height" from="${prevWaterLevel}" to="${waterLevel}" dur="0.5s" fill="freeze" /> \
        </rect> \
        <text x="25" y="100" font-family="Verdana" font-size="20" fill="white">${
          100 - waterLevel
        }%</text> \      
      </svg>`;

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [95, 100], // size of the icon
    iconAnchor: [35, 100], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
