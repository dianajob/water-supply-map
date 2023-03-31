import L from 'leaflet';

// const waterLevel = 80;

export const twoTanksSVG = (waterLevel, prevWaterLevel) => {
  const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
      <g class='left-tank' fill="rgb(178, 178, 178)"> \
          <path d="M22.1,61.7c-6.9,1.9-16.3,7.8-19.3,12C1.9,75,4.4,75,31.9,75.1c16.5,0,30-0.3,30-0.8c0-1-6.8-6.4-11.4-9.1C42.3,60.6,31.2,59.2,22.1,61.7z"/> \
          <path d="M61.8,164.5l-0.1-3c0-0.4-0.2-0.8-0.4-0.8h-29h-29c-0.2,0-0.4,0.3-0.4,0.8l-0.1,3l-0.1,2.8c0,0.5,0.1,0.8,0.4,0.8h29.2h29.2c0.2,0,0.4-0.4,0.4-0.8L61.8,164.5z"/> \
          <path d="M42.5,182.1c6.9-1.9,16.3-7.8,19.3-12c0.9-1.2-1.6-1.3-29.1-1.4c-16.5,0-30,0.3-30,0.8c0,1,6.8,6.4,11.4,9.1C22.3,183.2,33.5,184.6,42.5,182.1z"/> \
          <path d="M2.8,79.3l0.1,3c0,0.4,0.2,0.8,0.4,0.8h29h29c0.2,0,0.4-0.3,0.4-0.8l0.1-3l0.1-2.8c0-0.5-0.1-0.8-0.4-0.8H32.3H3.1c-0.2,0-0.4,0.4-0.4,0.8L2.8,79.3z"/> \
          <path fill="rgb(96, 150, 180)" stroke-width="4" stroke="rgb(178, 178, 178)" d="M7.4,121.7v38.8l24,0.1c13.2,0.1,24.4,0.1,25,0l1-0.3v-38.8V82.9h-25H7.4V121.7z"/> \
      </g> \
      <rect class="water" fill="black" width="46.5" height="${Math.round(
        (75 * waterLevel[0]) / 100
      )}" x="9.1" y="84.23"> \
          <animate attributeName="height" from="${Math.round(
            (75 * prevWaterLevel[0]) / 100
          )}" to="${Math.round((75 * waterLevel[0]) / 100)}" dur="0.5s" fill="freeze" /> \
        </rect> \
        <text x="18" y="121.75" font-family="Verdana" font-size="18" fill="white">${
          100 - waterLevel[0]
        }%</text> \
      <g class='right-tank' fill="rgb(178, 178, 178)"> \
          <path d="M103.2,61.7c-6.9,1.9-16.3,7.8-19.3,12C83,75,85.5,75,113,75.1c16.5,0,30-0.3,30-0.8c0-1-6.8-6.4-11.4-9.1C123.4,60.6,112.3,59.2,103.2,61.7z"/> \
          <path d="M142.9,164.5l-0.1-3c0-0.4-0.2-0.8-0.4-0.8h-29h-29c-0.2,0-0.4,0.3-0.4,0.8l-0.1,3l-0.1,2.8c0,0.5,0.1,0.8,0.4,0.8h29.2h29.2c0.2,0,0.4-0.4,0.4-0.8L142.9,164.5z"/> \
          <path d="M123.6,182.1c6.9-1.9,16.3-7.8,19.3-12c0.9-1.2-1.6-1.3-29.1-1.4c-16.5,0-30,0.3-30,0.8c0,1,6.8,6.4,11.4,9.1C103.4,183.2,114.6,184.6,123.6,182.1z"/> \
          <path d="M83.9,79.3l0.1,3c0,0.4,0.2,0.8,0.4,0.8h29h29c0.2,0,0.4-0.3,0.4-0.8l0.1-3l0.1-2.8c0-0.5-0.1-0.8-0.4-0.8h-29.2H84.2c-0.2,0-0.4,0.4-0.4,0.8L83.9,79.3z"/> \
          <path fill="rgb(96, 150, 180)" stroke-width="4" stroke="rgb(178, 178, 178)" d="M88.5,121.8v38.8l24,0.1c13.2,0.1,24.4,0.1,25,0l1-0.3v-38.8V82.9h-25H88.5V121.8z"/> \
      </g> \
        
        <rect class="water" fill="black" width="46.5" height="${Math.round(
          (75 * waterLevel[1]) / 100
        )}" x="90.1" y="84.23"> \
          <animate attributeName="height" from="${Math.round(
            (75 * prevWaterLevel[1]) / 100
          )}" to="${Math.round((75 * waterLevel[1]) / 100)}" dur="0.5s" fill="freeze" /> \
              </rect> \
              <text x="95" y="121.75" font-family="Verdana" font-size="18" fill="white">${
                100 - waterLevel[1]
              }%</text> \   
        <rect x="59.1" y="147.2" fill="blue" width="27.6" height="6.8"/> \   
        <rect x="68.7" y="154" fill="blue" width="7" height="42.6"/> \   
      </svg>`;

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [95, 100], // size of the icon
    iconAnchor: [45, 95], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
