import L from 'leaflet';
import shadow from '../../assets/images/tank-shadow.svg';
import './tankSVGnew.scss';
import { useState } from 'react';
import { WaterTank, WaterTankString } from './tankGPT';
import ReactDOMServer from 'react-dom/server';

// const waterLevel = 80;

export const tankSVGnew = (waterLevel, prevWaterLevel, pump, maxLevel, minLevel) => {
  /*  const ellipse = <ellipse fill='rgb(168, 216, 243)' stroke='rgb(255, 255, 255)' stroke-width='3' cx="51.45" cy="${
          42.45 + waterLevel
        }" rx="30" ry="5">
        <animate attributeName="cy" from="${42.45 + prevWaterLevel}" to="${
            42.45 + waterLevel
          }" dur="0.5s" fill="freeze" /> \
        </ellipse> \' */
  const cellAmount = [0, 1];
  const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 ${
        cellAmount.length * 50 - 15
      } 85" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
      ${cellAmount.map(
        (item, i) =>
          `<g transform="translate(${i * 50},0)"> \
            <g fill="rgb(178, 178, 178)"> 
              <path  d="M0,10C5,0,30,0,35,10z"/> 
              <path  d="M0,11L35,11L34,20L1,20z"/> 
              <rect fill="rgb(178, 178, 178)" width="31" height="45" x="2" y="20"/>
              <rect fill="rgb(96, 150, 180)" width="27" height="45" x="4" y="20"/>
              <path  d="M1,65L34,65L35,74L0,74z"/> 
              <path  d="M0,75C5,85,30,85,35,75z"/>     
            </g> 
            <rect class="water" fill="black" width="27" height="10" x="4" y="20"/> 
            <text x="7" y="40" font-size="9" font-weight="600" fill="white">${2.5} m</text> 
            <text x="8" y="19" font-size="9" font-weight="600" fill="rgb(102, 102, 102)">${4.5} m</text>
            <text x="9" y="73" font-size="9" font-weight="600" fill="rgb(102, 102, 102)">${0} m</text>
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

  {
    /* <rect class="waterMaxLevel" fill="rgb(178, 178, 178)" width="25" height="9" x="0" y="16"/> 
      <text x="2" y="22" font-size="9" font-weight="600" fill="white">${2.5} m</text>
      <rect class="waterMinLevel" fill="rgb(178, 178, 178)" width="25" height="9" x="0" y="50"/> 
      <text x="2" y="56" font-size="9" font-weight="600" fill="white">${0} m</text> */
  }

  /*   <rect fill="blue" width="8" height="20" x="46.6" y="189.11"/> \
        <rect class="water" fill="black" width="67.5" height="${waterLevel}" x="17.7" y="42.45"> \
          <animate attributeName="height" from="${prevWaterLevel}" to="${waterLevel}" dur="0.5s" fill="freeze" /> \
        </rect> \
        <text x="25" y="100" font-family="Verdana" font-size="20" font-weight="700" fill="white">${
          100 - waterLevel
        }%</text> \ */
  let waterL = 50;
  const tankGPT = ReactDOMServer.renderToString(<WaterTank />);

  const setWaterLevel = percentage => {
    const tankHeight = 260;
    const waterHeight = (percentage / 100) * tankHeight;
    waterL = waterHeight;
  };
  // Example usage: set the water level to 50%
  setWaterLevel(60);

  const xSize = cellAmount.length * 50 - 15;
  const xAnchor = xSize / 2;
  const iconAnchor = pump?.length > 0 ? [xAnchor, 115] : [xAnchor, 75];

  /* const tankIcon = new L.divIcon({
    className: 'pump-icon-container',
    html: tankGPT,
    iconSize: [200, 300], // size of the icon
    iconAnchor: [-3, 44] // point of the icon which will correspond to marker's location
  }); */

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xSize, 85], // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -150] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
