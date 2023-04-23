import L from 'leaflet';
import shadow from '../../assets/images/tank-shadow.svg';

// const waterLevel = 80;
export const tankDivIcon = <div>DivIcon</div>;

export const tankSVGnew = (waterLevel, prevWaterLevel, pump, maxLevel, minLevel) => {
  /*  const ellipse = <ellipse fill='rgb(168, 216, 243)' stroke='rgb(255, 255, 255)' stroke-width='3' cx="51.45" cy="${
          42.45 + waterLevel
        }" rx="30" ry="5">
        <animate attributeName="cy" from="${42.45 + prevWaterLevel}" to="${
            42.45 + waterLevel
          }" dur="0.5s" fill="freeze" /> \
        </ellipse> \' */
  const cellAmount = [0, 1];
  const tankString = `<div>
      ${cellAmount.map(
        (item, i) =>
          `<g transform="translate(${i * 50},0)"> \ 
            <g fill="rgb(178, 178, 178)"> \
              <path  d="M0,10C5,0,30,0,35,10z"/> \
              <path  d="M0,11L35,11L34,15L1,15z"/> \
              <rect fill="rgb(178, 178, 178)" width="31" height="45" x="2" y="15"/>
              <rect fill="rgb(96, 150, 180)" width="27" height="45" x="4" y="15"/>
              <path  d="M1,60L34,60L35,64L0,64z"/> \
              <path  d="M0,65C5,75,30,75,35,65z"/> \    
            </g> \
            <rect class="water" fill="black" width="27" height="20" x="4" y="15"/> \
            <text x="7" y="40" font-size="9" font-weight="600" fill="white">${2.5} m</text> \
          </g>`
      )}
      ${
        cellAmount?.length > 1
          ? `<rect fill='rgb(8, 94, 141)' stroke-width='1px' stroke='rgb(178, 178, 178)' width='4.5' height='15' x='40' y='63'/>
          <rect transform='rotate(90 50 60)' fill='rgb(8, 94, 141)' stroke-width='1px' stroke='rgb(178, 178, 178)' width='4.5' height='15' x='50' y='60'/>`
          : `<rect
          fill='rgb(8, 94, 141)'
          stroke-width='1px'
          stroke='rgb(178, 178, 178)'
          width='4.5'
          height='10'
          x='15.25'
          y='73'
        /> `
      }
      </svg>`;

  /*   <rect fill="blue" width="8" height="20" x="46.6" y="189.11"/> \
        <rect class="water" fill="black" width="67.5" height="${waterLevel}" x="17.7" y="42.45"> \
          <animate attributeName="height" from="${prevWaterLevel}" to="${waterLevel}" dur="0.5s" fill="freeze" /> \
        </rect> \
        <text x="25" y="100" font-family="Verdana" font-size="20" font-weight="700" fill="white">${
          100 - waterLevel
        }%</text> \ */

  const xSize = cellAmount.length * 50 - 15;
  const xAnchor = xSize / 2;
  const iconAnchor = pump?.length > 0 ? [xAnchor, 115] : [xAnchor, 75];

  console.log('tank svg updated');

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xSize, 75], // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -150] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
