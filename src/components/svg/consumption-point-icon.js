import L from 'leaflet';
import { flowType } from '../../constants/types';

const colors = {
  background: 'rgb(230, 229, 229)',
  border: 'rgb(77, 77, 77)',
  tap: 'rgb(100, 100, 100)',
  drop: 'rgb(46, 124, 165)',
  text: 'rgb(0, 0, 0)',
  errorText: 'rgba(219, 146, 22, 1)',
  pipeWater: 'rgb(8, 94, 141)',
  void: 'rgb(77, 77, 77)',
  stroke: 'rgb(178, 178, 178)'
};

export const consumptionSVG = (sensors, sensorsValues) => {
  const flow = sensors.find(s => s.measurement.type.toLowerCase() === flowType);
  const value = flow ? sensorsValues?.[flow.id].y : '';

  const tankString = `data:image/svg+xml;utf-8, 
    <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle fill='${colors.background}' cx="75" cy="75" r="72"/>
        <path fill='${
          colors.border
        }' d="M75,6c38,0,69,31,69,69s-31,69-69,69S6,113,6,75S37,6,75,6 M75,0C33.6,0,0,33.6,0,75s33.6,75,75,75
          s75-33.6,75-75S116.4,0,75,0L75,0z"/>
      </g>
      <g >
        <path fill='${
          colors.tap
        }' d="M73.3,12.9c-0.6,0.3-1.3,0.7-1.6,1c-0.5,0.5-1,0.6-5.9,0.6c-4.7,0-5.5-0.1-6.5-0.6c-0.6-0.3-1.6-0.6-2.2-0.6h-1
          v3v3h1.1c0.6,0,1.7-0.3,2.5-0.6c1.2-0.5,2.1-0.6,6.2-0.6h4.8l1.2,1.1c1.1,1,1.2,1.2,1.2,3.4v2.3l-1.9,0.7c-1.3,0.5-2.5,1.2-3.7,2.3
          c-0.9,0.9-1.7,1.7-1.7,1.9s-3.5,0.3-7.7,0.4c-7.2,0.1-7.9,0.1-9.2,0.7c-3.1,1.4-4,3.2-4,7.5v2.8l-2.4,1.9c-2.2,1.8-2.4,2-2.4,3.1
          v1.2h10.4h10.4v-1.3c0-1.3-0.1-1.3-2.6-3c-2.2-1.5-2.6-1.9-2.6-2.6c0-2.2,1.5-2.9,6.2-2.9c3.3,0,3.4,0,3.8,0.7
          c0.7,1.3,3.3,3.5,5.1,4.3c4.9,2.2,11.7,0.4,14.1-3.6l0.9-1.4h2.9h2.9l3.4,2.6c3.4,2.5,3.4,2.5,5.1,2.5l1.7-0.1l0.1-8.9l0.1-8.9h-2
          l-2,0l-3.3,2.7l-3.3,2.7h-3c-2.9,0-3,0-3.6-0.8c-1-1.5-3.6-3.3-5.5-3.9l-1.8-0.5v-2.2c0-2.2,0.1-2.3,1.3-3.4l1.3-1.2l5.3,0.1
          c4.4,0.1,5.4,0.2,6.2,0.6c0.5,0.3,1.4,0.5,2,0.5h1.1v-3v-3h-0.9c-0.6,0-1.5,0.3-2.1,0.6c-1,0.5-1.7,0.6-6.5,0.6c-5,0-5.4,0-6-0.6
          C77.7,12.5,75.1,12.1,73.3,12.9z"/>
        <path fill='${
          colors.drop
        }' d="M48.4,50.6c-1,1.3-2.4,3.3-3.1,4.5C44.2,57,44,57.6,44,59.2c0,2.1,0.6,3,2.6,3.9c1.7,0.8,6,0.8,7.4,0
          c2.6-1.5,3.3-3.6,2.1-6.4c-0.8-1.8-3.9-6.3-5.2-7.7l-0.7-0.6L48.4,50.6z M46.8,55.9"/>
      </g>
      <rect x="69" y="150" fill='${colors.stroke}' width='12' height="20"/>
      <circle fill='${value > 0 ? colors.pipeWater : colors.void}' stroke-width='5px' stroke='${
    colors.stroke
  }' cx="75" cy="184" r="15"/>
      ${
        value === null
          ? `<text x="75" y="105" text-anchor="middle" font-family='"Open Sans", sans-serif' letter-spacing='2px' font-size="30" font-weight="700" fill="black">N/A</text>`
          : value === ''
          ? `<text x="75" y="105" text-anchor="middle" font-family='"Open Sans", sans-serif' font-size="28" font-weight="700" fill="black">No data</text>`
          : `<text x="75" y="100" text-anchor="middle" font-family='"Open Sans", sans-serif' font-size="40" font-weight="700" fill="${
              colors.text
            }">${value}</text>
      <text x="75" y="130" text-anchor="middle" font-family="Open Sans, sans-serif" font-weight="600" letter-spacing='1px' font-size="24" fill="${
        colors.text
      }"> ${flow ? flow.measurement.unit_short_pretty : ''}</text>`
      }      
  </svg>`;

  const xSize = 150 / 3; //150 is width of svg
  const ySize = 200 / 3; //200 is height of svg
  const xAnchor = xSize / 2;
  const yAnchor = ySize - 3;
  const iconAnchor = [xAnchor, yAnchor];

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xSize, ySize],
    iconAnchor: iconAnchor // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};
