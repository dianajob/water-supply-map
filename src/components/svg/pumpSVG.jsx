import L from 'leaflet';
const circle =
  '<circle cx="10" cy="10" r="5" stroke="rgb(178, 178, 178)" stroke-width="1" fill="red" />';

export const pumpSVG = (pump, isHovering) => {
  const color = 'green';
  const iconSizeX = 30 + pump.length * 60;
  const iconSizeY = 190;
  const allCircles = `${
    pump?.length > 0 &&
    pump.map(
      (item, i) =>
        `<circle transform="translate(${
          i * 60
        },0)" cx='40' cy='40' r='20' stroke='rgb(178, 178, 178)' stroke-width='2' fill='${
          item === 0 ? 'rgb(130, 0, 0)' : 'rgb(78, 108, 80)'
        }' />`
    )
  }`;
  const pumpString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 ${iconSizeX} ${iconSizeY}" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
        <rect fill="rgb(230, 229, 229)" stroke="${
          pump.indexOf(1) < 0 ? 'rgb(220, 9, 9)' : 'rgb(50, 140, 56)'
        }" stroke-width="5" rx="10" ry="10" width="${
    pump.length * 60
  }" height='110' x="10" y="10"/> \
        ${allCircles} \     
        <rect fill="rgb(8, 94, 141)" stroke='rgb(178, 178, 178)' stroke-width='2' width="8" height="20" x="${
          (20 + pump.length * 60) / 2 - 4
        }" y="122"/> \ 
        <text x="20" y="100" font-family="Verdana" font-size="25" font-weight="900" fill="black">1000 m<tspan dy ="-10">3</tspan><tspan dy ="10">/h</tspan></text> \
      </svg>`;

  console.log(pump.indexOf(1), pump);

  /*  const size = isHovering ? 1 : 3.5; */
  const size = 3.5;

  const markerSizeX = iconSizeX / size;
  const markerSizeY = iconSizeY / size;
  const iconAnchorX = markerSizeX / 2;
  console.log(isHovering, size, markerSizeX, markerSizeY);

  const tankIcon = new L.Icon({
    className: 'pump-io',
    iconUrl: pumpString,
    iconSize: [markerSizeX, markerSizeY], // size of the icon
    iconAnchor: [iconAnchorX, 27] // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};

export const pumpSVGbigger = (pump, isHovering) => {
  const color = 'green';
  const iconSizeX = 30 + pump.length * 60;
  const iconSizeY = 190;
  const allCircles = `${
    pump?.length > 0 &&
    pump.map(
      (item, i) =>
        `<circle transform="translate(${
          i * 60
        },0)" cx='40' cy='40' r='20' stroke='rgb(178, 178, 178)' stroke-width='2' fill='${
          item === 0 ? 'rgb(130, 0, 0)' : 'rgb(78, 108, 80)'
        }' />`
    )
  }`;
  const pumpString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 ${iconSizeX} ${iconSizeY}" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
        <rect fill="rgb(230, 229, 229)" stroke="${
          pump.indexOf(1) < 0 ? 'rgb(220, 9, 9)' : 'rgb(50, 140, 56)'
        }" stroke-width="5" rx="10" ry="10" width="${
    pump.length * 60
  }" height='110' x="10" y="10"/> \
        ${allCircles} \     
        <rect fill="rgb(8, 94, 141)" stroke='rgb(178, 178, 178)' stroke-width='2' width="8" height="20" x="${
          (20 + pump.length * 60) / 2 - 4
        }" y="122"/> \ 
        <text x="20" y="100" font-family="Verdana" font-size="25" font-weight="900" fill="black">1000 m<tspan dy ="-10">3</tspan><tspan dy ="10">/h</tspan></text> \
      </svg>`;

  console.log(pump.indexOf(1), pump);

  const size = 1;

  const markerSizeX = iconSizeX / size;
  const markerSizeY = iconSizeY / size;
  const iconAnchorX = markerSizeX / 2;
  console.log(isHovering, size, markerSizeX, markerSizeY);

  const tankIcon = new L.Icon({
    className: 'pump-io',
    iconUrl: pumpString,
    iconSize: [markerSizeX, markerSizeY], // size of the icon
    iconAnchor: [iconAnchorX, 27] // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};
