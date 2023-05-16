import L from 'leaflet';
import { findSensor } from '../../utils/sensors';

export const tankSVG = (cells, max, min) => {
  const convertLevelToHeight = lev => {
    const value = lev > max ? max : lev;
    const level = (value / (max - min)) * 100;
    return 110 - (level * 110) / 100;
  };

  const isTankWithWater =
    cells.filter(c => findSensor(c.sensors.find(s => s.measurement.type === 'level').id).value > 0)
      .length > 0;

  const xSize = cells.length * 100;
  const ySize = 250;

  const tankString = `data:image/svg+xml;utf-8,
      <svg viewBox="0 0 ${xSize} ${ySize}" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
      ${cells?.map(
        (cell, i) =>
          `<g transform="translate(${i * 100},0)"> 
            <g fill="rgb(178, 178, 178)">
              <path  d="M37.6,11.5c-9.3,2.8-22.1,11.2-26.1,17.4c-1.2,1.8,2.1,1.9,39.4,2c22.3,0,40.6-0.5,40.6-1.1c0-1.5-9.2-9.3-15.4-13.1C64.9,9.9,49.9,7.9,37.6,11.5z"/> \
              <path fill="rgb(96, 150, 180)" stroke-width="4px" stroke="rgb(178, 178, 178)" d="M17.7,98.3v56.1l32.5,0.2c17.9,0.2,33,0.2,33.8,0l1.3-0.4V98.2V42.2H51.4H17.7V98.3z"/> \
              <path  d="M91.4,160.1l-0.2-4.3c0-0.6-0.3-1.1-0.6-1.1H51.4H12.2c-0.3,0-0.6,0.5-0.6,1.1l-0.2,4.3l-0.1,4c0,0.7,0.2,1.2,0.6,1.2h39.5H91c0.3,0,0.6-0.6,0.6-1.2L91.4,160.1z"/> \
              <path d="M65.2,185.5c9.3-2.8,22.1-11.2,26.1-17.4c1.2-1.8-2.1-1.9-39.4-2c-22.3,0-40.6,0.5-40.6,1.1c0,1.5,9.2,9.3,15.4,13.1C37.9,187.1,53,189.1,65.2,185.5z"/> \
              <path d="M11.5,37l0.2,4.3c0,0.6,0.3,1.1,0.6,1.1h39.2h39.2c0.3,0,0.6-0.5,0.6-1.1l0.2-4.3l0.1-4c0-0.7-0.2-1.2-0.6-1.2H51.4H11.9c-0.3,0-0.6,0.6-0.6,1.2L11.5,37z"/> \
            </g> 
            <rect class="water" fill="rgb(77, 77, 77)" width="63" height="${convertLevelToHeight(
              findSensor(cell.sensors.find(s => s.measurement.type === 'level').id).value
            )}" x="20" y="42.45"> 
              <animate attributeName="height" from="${convertLevelToHeight(
                findSensor(cell.sensors.find(s => s.measurement.type === 'level').id).prevValue
              )}" to="${convertLevelToHeight(
            findSensor(cell.sensors.find(s => s.measurement.type === 'level').id).value
          )}" dur="0.5s" fill="freeze" /> 
            </rect> 
            <text x="52" y="104" text-anchor="middle" font-family="Roboto Mono" font-size="32" font-weight="700" fill="rgb(237, 237, 237)">${
              findSensor(cell.sensors.find(s => s.measurement.type === 'level').id).value
            }</text> 
          </g>`
      )}
      ${
        cells.length > 1 &&
        cells.slice(1).map(
          (item, i) =>
            `<g transform="translate(${i * 100},0)">
              <rect transform='rotate(90 111 157)' fill='${
                isTankWithWater ? 'rgb(8, 94, 141)' : 'rgb(77, 77, 77)'
              }' stroke-width='2px' stroke='rgb(178, 178, 178)' width='6' height='20' x='111' y='157'/>
              </g>`
        )
      }
      ${
        cells.length > 1 && cells.length % 2 === 0
          ? `<g transform="translate(${(cells.length - 2) * 50},0)">
          <rect fill="${
            isTankWithWater ? 'rgb(23, 98, 148)' : 'rgb(77, 77, 77)'
          }" stroke-width = "1px" stroke = "rgb(178, 178, 178)" width="10" height="55" x="97" y="162.5"/>
          <circle fill='${
            isTankWithWater ? 'rgb(8, 94, 141)' : 'rgb(77, 77, 77)'
          }' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="100" cy="230" r="16"/>
          </g>`
          : `<g transform="translate(${(cells.length - 1) * 50},0)">
          <rect  fill="${
            isTankWithWater ? 'rgb(23, 98, 148)' : 'rgb(77, 77, 77)'
          }" stroke-width = "2px" stroke = "rgb(178, 178, 178)" width="10" height="30" x="48" y="188"/>
            <circle fill='${
              isTankWithWater ? 'rgb(8, 94, 141)' : 'rgb(77, 77, 77)'
            }' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="50.5" cy="230" r="15"/>
            </g>`
      }
      </svg>`;

  /* <tspan font-weight="500" font-size="20"> ${cell.unit}</tspan> */

  /*   const tankString = `data:image/svg+xml;utf-8,
  <svg x="0px" y="0px" viewBox="0 0 250 600" xmlns="http://www.w3.org/2000/svg">
  <rect x="17.94" y="96.08" fill='rgb(216, 215, 215)' stroke='rgb(15, 14, 14)' stroke-width='2' width="214" height="408"/>
  <path fill='rgb(77, 77, 77)' stroke='rgb(255, 255, 255)' stroke-width='2' d="M231.94,74.08h-214v22h0.05c-0.03,0.17-0.05,0.33-0.05,0.5c0,9.11,47.91,16.5,107,16.5s107-7.39,107-16.5c0-0.17-0.02-0.33-0.05-0.5h0.05V74.08z"/>
  <ellipse fill='rgb(77, 77, 77)' stroke='rgb(255, 255, 255)' stroke-width='2' cx="124.94" cy="74.08" rx="107" ry="16.5"/>
  <path fill='rgb(77, 77, 77)' stroke='rgb(255, 255, 255)' stroke-width='2' d="M232.06,504.42h-214v22h0.05c-0.03,0.17-0.05,0.33-0.05,0.5c0,9.11,47.91,16.5,107,16.5s107-7.39,107-16.5c0-0.17-0.02-0.33-0.05-0.5h0.05V504.42z"/>
  <ellipse fill='rgb(77, 77, 77)' stroke='rgb(255, 255, 255)' stroke-width='2' cx="125.06" cy="504.42" rx="107" ry="16.5"/>
  <path fill='rgb(116, 171, 214)' d="M36.94,316.08v175c0,8.28,39.18,15,87.5,15s87.5-6.72,87.5-15v-175H36.94z"/>
  <ellipse fill='rgb(168, 216, 243)' stroke='rgb(255, 255, 255)' stroke-width='3' cx="124.44" cy="314.33" rx="88" ry="11.75"/>
  </svg>`; */

  /*         
             ${
         pumpList?.length > 0 &&
         pumpList.map(
           (item, i) =>
             `<g transform="translate(${cellAmount.length * 100 + 30},${-(i * 50 + 50)})">
              <rect transform='rotate(90 50 146)' fill='rgb(8, 94, 141)' stroke-width='2px' stroke='rgb(178, 178, 178)' width='8' height='30' x='50' y='146'/>
              </g>`
         )
       }  
       
      <g transform="translate(${cellAmount.length * 100 + 30},0)">
              <rect fill="rgb(23, 98, 148)" stroke-width = "1px" stroke = "rgb(178, 178, 178)" width="10" height="${
                (pumpList?.length - 1) * 100 + 50
              }" x="20" y="${100 - (pumpList?.length - 1) * 100}"/>
        </g>
              <g>
          <rect transform='rotate(90 40 157)' fill='rgb(8, 94, 141)' stroke-width='2px' stroke='rgb(178, 178, 178)' width='8' height='25' x='40' rx='4' y='157'/>
          <rect fill="rgb(23, 98, 148)" stroke-width = "1px" stroke = "rgb(178, 178, 178)" width="10" height="40" x="15" y="162.5"/>
          <circle fill='rgb(8, 94, 141)' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="20" cy="215" r="15"/>
      </g>
      <g transform="translate(${cellAmount.length * 100},0)">
        <rect transform='rotate(90 50 157)' fill='rgb(8, 94, 141)' stroke-width='2px' stroke='rgb(178, 178, 178)' width='8' height='30' x='50' y='157'/>
        <circle fill='rgb(8, 94, 141)' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="60" cy="161" r="15"/>
      </g>
      }  */

  const xMarkerSize = xSize / 2.5;
  const yMarkerSize = ySize / 2.5;
  const xAnchor = xMarkerSize / 2;
  const yAnchor = yMarkerSize - 7;

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xMarkerSize, yMarkerSize], // size of the icon
    iconAnchor: [xAnchor, yAnchor] // point of the icon which will correspond to marker's location
    //popupAnchor: [-3, -150] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
