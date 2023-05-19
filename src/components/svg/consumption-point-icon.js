import L from 'leaflet';
import { getValue } from '../../utils/sensors';

export const consumptionSVG = (sensors, sensorsValues) => {
  const flow = sensors.find(s => s.name === 'flow');
  const value = flow ? sensorsValues?.[flow.id].y : 0;

  const tankString = `data:image/svg+xml;utf-8, 
    <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        .st0{fill:rgb(219, 219, 219);}
        .st1{fill:rgb(77, 77, 77);}
        .st2{fill:rgb(46, 124, 165);}
        .st3{fill:rgb(96, 150, 180);stroke:rgb(178, 178, 178);stroke-miterlimit:10;}
	      .st4{fill:rgb(178, 178, 178);stroke:rgb(247, 243, 243);stroke-miterlimit:10;}
      </style>
      <g>
        <circle class="st0" cx="75" cy="75" r="72"/>
        <path fill='rgb(77, 77, 77)' d="M75,6c38,0,69,31,69,69s-31,69-69,69S6,113,6,75S37,6,75,6 M75,0C33.6,0,0,33.6,0,75s33.6,75,75,75
          s75-33.6,75-75S116.4,0,75,0L75,0z"/>
      </g>
      <g >
        <path class="st1" d="M72.6,12.5c-0.6,0.3-1.5,0.8-1.8,1.2c-0.6,0.6-1.1,0.7-6.7,0.7c-5.3,0-6.2-0.1-7.3-0.7C56,13.3,54.9,13,54.3,13
        h-1.2v3.4v3.4h1.3c0.7,0,2-0.3,2.8-0.7c1.3-0.6,2.3-0.7,7-0.7h5.4l1.4,1.2c1.3,1.2,1.3,1.4,1.3,3.9v2.6L70.2,27
        c-1.5,0.5-2.8,1.4-4.1,2.7c-1.1,1-2,2-2,2.2s-3.9,0.3-8.7,0.4c-8.1,0.1-8.9,0.2-10.3,0.9c-3.5,1.6-4.5,3.6-4.5,8.6v3.3l-2.8,2.2
        c-2.5,2-2.8,2.3-2.8,3.6V52h11.8h11.8v-1.5c0-1.5-0.1-1.5-2.9-3.5c-2.5-1.7-2.9-2.1-2.9-3c0-2.5,1.7-3.4,7-3.4c3.8,0,3.9,0,4.3,0.9
        c0.8,1.5,3.7,4,5.7,4.9c5.6,2.5,13.2,0.5,16-4.1l1-1.6H90h3.3l3.9,2.9c3.8,2.9,3.9,2.9,5.7,2.8l1.9-0.1l0.1-10.2L105,26h-2.2l-2.3,0
        l-3.7,3L93,32.1h-3.3c-3.3,0-3.4,0-4-1c-1.1-1.7-4.1-3.8-6.2-4.4l-2-0.6v-2.6c0-2.5,0.1-2.6,1.4-3.9l1.4-1.3l5.9,0.1
        c4.9,0.1,6.1,0.2,7,0.7c0.5,0.3,1.5,0.6,2.2,0.6h1.3v-3.4V13h-1.1c-0.6,0-1.7,0.3-2.4,0.7c-1.1,0.6-2,0.7-7.3,0.7
        c-5.7,0-6.1,0-6.8-0.7C77.6,12,74.7,11.5,72.6,12.5z"/>
    
        <path class="st2" d="M43.7,55.6c-1,1.3-2.4,3.3-3.1,4.5c-1.1,1.9-1.3,2.5-1.3,4.1c0,2.1,0.6,3,2.6,3.9c1.7,0.8,6,0.8,7.4,0
        c2.6-1.5,3.3-3.6,2.1-6.4c-0.8-1.8-3.9-6.3-5.2-7.7l-0.7-0.6L43.7,55.6z M42.2,60.9"/>
      
      </g>
      <rect x="69" y="150" fill='${
        value > 0 ? 'rgb(8, 94, 141)' : 'rgb(77, 77, 77)'
      }' stroke-width='2px' stroke='rgb(178, 178, 178)' width='14' height="20"/>
      <circle fill='${
        value > 0 ? 'rgb(8, 94, 141)' : 'rgb(77, 77, 77)'
      }' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="75" cy="184" r="15"/>
      <text x="75" y="110" text-anchor="middle" font-family="Roboto Mono" font-size="45" font-weight="700" fill="black">${value}<tspan font-weight="700" font-size="28"> L/s</tspan></text>
  </svg>`;

  /* stroke-width='5px' stroke='${flow.length > 0 && flow[0].value ? 'rgb(45, 109, 49)' : 'rgb(147, 4, 4)'}' */

  const xSize = 150 / 3.2;
  const ySize = 200 / 3.2;
  const xAnchor = xSize / 2;
  const yAnchor = ySize - 3;
  const iconAnchor = [xAnchor, yAnchor];

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xSize, ySize], // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -150] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
