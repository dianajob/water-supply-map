import L from 'leaflet';

export const consumptionSVG = () => {
  /*  const ellipse = <ellipse fill='rgb(168, 216, 243)' stroke='rgb(255, 255, 255)' stroke-width='3' cx="51.45" cy="${
          42.45 + waterLevel
        }" rx="30" ry="5">
        <animate attributeName="cy" from="${42.45 + prevWaterLevel}" to="${
            42.45 + waterLevel
          }" dur="0.5s" fill="freeze" /> \
        </ellipse> \' */
  const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        .st0{fill:rgb(178, 178, 178);}
        .st1{fill:rgb(77, 77, 77);}
        .st2{fill:rgb(46, 124, 165);}
        .st3{fill:rgb(96, 150, 180);stroke:rgb(178, 178, 178);stroke-miterlimit:10;}
	      .st4{fill:rgb(178, 178, 178);stroke:rgb(247, 243, 243);stroke-miterlimit:10;}
      </style>
<g>
	<circle class="st0" cx="75" cy="75" r="72"/>
	<path class="st1" d="M75,6c38,0,69,31,69,69s-31,69-69,69S6,113,6,75S37,6,75,6 M75,0C33.6,0,0,33.6,0,75s33.6,75,75,75
		s75-33.6,75-75S116.4,0,75,0L75,0z"/>
</g>
<path class="st1" d="M76.2,13.7c-0.7,0.4-1.6,1.1-2.1,1.6c-0.7,0.8-1.3,0.9-7.4,0.9c-5.9,0-6.9-0.1-8.2-0.9c-0.8-0.5-2-0.9-2.7-0.9
	h-1.3v4.5v4.5H56c0.8,0,2.2-0.4,3.2-0.9c1.5-0.8,2.6-0.9,7.8-0.9h6l1.5,1.6c1.4,1.6,1.5,1.8,1.5,5.1v3.4l-2.4,1
	C72,33.3,70.5,34.4,69,36c-1.2,1.3-2.2,2.6-2.2,2.8c0,0.2-4.4,0.4-9.7,0.5c-9,0.1-9.9,0.2-11.5,1.1c-3.9,2.1-5,4.7-5,11.1v4.2
	l-3.1,2.9c-2.8,2.6-3.1,3-3.1,4.6v1.7h13.1h13.1v-2c0-1.9-0.1-2-3.3-4.5c-2.8-2.2-3.3-2.8-3.3-3.9c0-3.3,1.9-4.4,7.8-4.4
	c4.2,0,4.3,0,4.8,1.1c0.9,2,4.1,5.2,6.4,6.3c6.2,3.2,14.7,0.6,17.8-5.4l1.1-2h3.7h3.6l4.3,3.8c4.3,3.7,4.3,3.8,6.4,3.6l2.1-0.1
	l0.1-13.3l0.1-13.2h-2.5l-2.5,0l-4.2,4l-4.2,4h-3.7c-3.7,0-3.8,0-4.5-1.2c-1.3-2.2-4.5-4.9-6.9-5.7l-2.2-0.8v-3.3
	c0-3.2,0.1-3.4,1.6-5l1.6-1.7l6.6,0.2c5.5,0.1,6.8,0.3,7.8,0.9c0.6,0.4,1.7,0.8,2.5,0.8h1.4v-4.5v-4.5H102c-0.7,0-1.9,0.4-2.7,0.9
	c-1.3,0.8-2.2,0.9-8.2,0.9c-6.3,0-6.7,0-7.5-0.9C81.8,13.2,78.6,12.5,76.2,13.7z"/>
<path class="st2" d="M45.1,68.6c-1,1.3-2.4,3.3-3.1,4.5c-1.1,1.9-1.3,2.5-1.3,4.1c0,2.1,0.6,3,2.6,3.9c1.7,0.8,6,0.8,7.4,0
	c2.6-1.5,3.3-3.6,2.1-6.4c-0.8-1.8-3.9-6.3-5.2-7.7l-0.7-0.6L45.1,68.6z M43.5,73.9"/>
<rect x="69" y="150" fill='rgb(8, 94, 141)' stroke-width='2px' stroke='rgb(178, 178, 178)' width='14' height="20"/>
<circle fill='rgb(8, 94, 141)' stroke-width='5px' stroke='rgb(178, 178, 178)' cx="75" cy="184" r="15"/>
<text x="40" y="120" font-family="Roboto Mono" font-size="38" font-weight="700" fill="white">${50}<tspan font-weight="500" font-size="25"> L/s</tspan></text>
</svg>`;

  const xSize = 150 / 3;
  const ySize = 200 / 3;
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
