import L from 'leaflet';
import shadow from '../../assets/images/tank-shadow.svg';

// const waterLevel = 80;

export const tankSVGRuben = (waterLevel, prevWaterLevel) => {
  /*  const ellipse = <ellipse fill='rgb(168, 216, 243)' stroke='rgb(255, 255, 255)' stroke-width='3' cx="51.45" cy="${
          42.45 + waterLevel
        }" rx="30" ry="5">
        <animate attributeName="cy" from="${42.45 + prevWaterLevel}" to="${
            42.45 + waterLevel
          }" dur="0.5s" fill="freeze" /> \
        </ellipse> \' */
  const cellAmount = [0];
  /*   const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 ${
        cellAmount.length * 100
      } 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
      ${cellAmount.map(
        (item, i) =>
          `<g transform="translate(${i * 100},0)"> \ 
        <g fill="rgb(178, 178, 178)"> \
          <path  d="M37.6,11.5c-9.3,2.8-22.1,11.2-26.1,17.4c-1.2,1.8,2.1,1.9,39.4,2c22.3,0,40.6-0.5,40.6-1.1c0-1.5-9.2-9.3-15.4-13.1C64.9,9.9,49.9,7.9,37.6,11.5z"/> \
          <path fill="rgb(96, 150, 180)" stroke-width = "4px" stroke = "rgb(178, 178, 178)" d="M17.7,98.3v56.1l32.5,0.2c17.9,0.2,33,0.2,33.8,0l1.3-0.4V98.2V42.2H51.4H17.7V98.3z"/> \
          <path  d="M91.4,160.1l-0.2-4.3c0-0.6-0.3-1.1-0.6-1.1H51.4H12.2c-0.3,0-0.6,0.5-0.6,1.1l-0.2,4.3l-0.1,4c0,0.7,0.2,1.2,0.6,1.2h39.5H91c0.3,0,0.6-0.6,0.6-1.2L91.4,160.1z"/> \
          <path d="M65.2,185.5c9.3-2.8,22.1-11.2,26.1-17.4c1.2-1.8-2.1-1.9-39.4-2c-22.3,0-40.6,0.5-40.6,1.1c0,1.5,9.2,9.3,15.4,13.1C37.9,187.1,53,189.1,65.2,185.5z"/> \
          <path d="M11.5,37l0.2,4.3c0,0.6,0.3,1.1,0.6,1.1h39.2h39.2c0.3,0,0.6-0.5,0.6-1.1l0.2-4.3l0.1-4c0-0.7-0.2-1.2-0.6-1.2H51.4H11.9c-0.3,0-0.6,0.6-0.6,1.2L11.5,37z"/> \
        </g> \
        <rect fill="rgb(29, 133, 202)" stroke-width = "2px" stroke = "rgb(178, 178, 178)" width="10" height="20" x="46.6" y="189.11"/> \
        <rect class="water" fill="black" width="67.5" height="${waterLevel}" x="17.7" y="42.45"> \
          <animate attributeName="height" from="${prevWaterLevel}" to="${waterLevel}" dur="0.5s" fill="freeze" /> \
        </rect> \
        <text x="25" y="100" font-family="Verdana" font-size="20" font-weight="700" fill="white">${
          100 - waterLevel
        }%</text> \
      </g>`
      )}
      </svg>`; */

  const tankString = `data:image/svg+xml;utf-8,
  <svg x="0px" y="0px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<style type="text/css">
	.st0{fill:rgb(129, 128, 128);}
	.st1{fill:rgb(178, 178, 178);}
  .st8{fill:rgb(178, 178, 178);stroke:rgb(92, 92, 92);stroke-width:1;stroke-miterlimit:10;}
	.st2{fill:rgb(178, 178, 178);stroke:rgb(118, 116, 116);stroke-width:1;stroke-miterlimit:10;}
	.st3{opacity:0.84;fill:rgb(102, 102, 102);enable-background:new    ;}
	.st4{fill:rgb(128, 128, 128);stroke:rgb(242, 241, 241));stroke-width:1;stroke-miterlimit:10;}
	.st5{opacity:0.84;fill:rgb(116, 171, 214);enable-background:new    ;}
	.st6{fill:rgb(168, 216, 243);stroke:rgb(205, 237, 249);stroke-width:0.5;stroke-miterlimit:10;}
</style>
<g>
  <path class="st0" d="M95.8,73.3l-0.2-1.8c0-0.3-0.3-0.5-0.7-0.5H50.4H6c-0.3,0-0.7,0.2-0.7,0.5l-0.2,1.8L5,75
		c0,0.3,0.2,0.5,0.7,0.5h44.8h44.9c0.3,0,0.7-0.3,0.7-0.5L95.8,73.3z"/>
	<path class="st0" d="M5.2,8.5l0.2,2c0,0.3,0.3,0.5,0.7,0.5h44.4H95c0.3,0,0.7-0.2,0.7-0.5l0.2-2L96,6.6C96,6.2,95.8,6,95.3,6H50.4
		H5.7C5.3,6,5,6.3,5,6.6L5.2,8.5z"/>
  <rect class="st2" width="84" height="60" x="8.5" y="11"/>
	<ellipse class="st8" cx="50.5" cy="4.8" rx="45.5" ry="2.4"/>
	<g transform="translate(10,0)">
		<path class="st3" d="M55,63.9c0,2.3,4.4,4.1,9.9,4.1s9.9-1.8,9.9-4.1V15.8H55"/>
		<path class="st4" d="M55,16.1c0-1.1,4.4-2.1,9.9-2.1s9.9,0.9,9.9,2.1c0,1.1-4.4,2.1-9.9,2.1S55,17.2,55,16.1"/>
		<path class="st5" d="M55,65.1c0,1.1,4.4,2.1,9.9,2.1s9.9-0.9,9.9-2.1V41H55"/>
		<path class="st6" d="M55.2,41.4c0-0.7,4.3-1.2,9.7-1.2s9.7,0.5,9.7,1.2c0,0.7-4.3,1.2-9.7,1.2S55.2,42,55.2,41.4"/>
	  <text x="60" y="50" font-size="10" font-weight="700" fill="white">2.5</text>
    </g>
  <g transform="translate(-15,0)">
		<path class="st3" d="M55,63.9c0,2.3,4.4,4.1,9.9,4.1s9.9-1.8,9.9-4.1V15.8H55"/>
		<path class="st4" d="M55,16.1c0-1.1,4.4-2.1,9.9-2.1s9.9,0.9,9.9,2.1c0,1.1-4.4,2.1-9.9,2.1S55,17.2,55,16.1"/>
		<path class="st5" d="M55,64.3c0,1.6,4.4,2.8,9.9,2.8s9.9-1.3,9.9-2.8V31.1H55"/>
		<path class="st6" d="M55.2,31.4c0-0.7,4.3-1.2,9.7-1.2s9.7,0.5,9.7,1.2s-4.3,1.2-9.7,1.2S55.2,32,55.2,31.4"/>
	  <text x="60" y="50" font-size="10" font-weight="700" fill="white">3</text>
    </g>
  <text x="12" y="20" font-family="Oswald" font-size="10" font-weight="700" fill="white">4.5 <tspan font-weight="500">m</tspan></text>
  <text x="12" y="65" font-family="Oswald" font-size="10" font-weight="700" fill="white">0 <tspan font-weight="500">m</tspan></text>
  
</g>
  </svg>`;

  const xSize = cellAmount.length * 100;
  const xAnchor = xSize / 2;
  const iconAnchor = [xAnchor, 70];

  console.log('tank svg updated');

  const tankIcon = new L.Icon({
    iconUrl: tankString,
    iconSize: [xSize, 100], // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -150] // point from which the popup should open relative to the iconAnchor
  });

  return tankIcon;
};
