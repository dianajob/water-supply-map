import L from 'leaflet';
const circle =
  '<circle cx="10" cy="10" r="5" stroke="rgb(178, 178, 178)" stroke-width="1" fill="red" />';

export const pumpSVG = pump => {
  const color = 'green';
  const allCircles = `${
    pump?.length > 0 &&
    pump.map(
      (item, i) =>
        `<circle cx='${
          20 + i * 30
        }' cy='15' r='10' stroke='rgb(178, 178, 178)' stroke-width='2' fill='${
          item === 0 ? 'rgb(130, 0, 0)' : 'rgb(78, 108, 80)'
        }' />`
    )
  }`;
  console.log('circle:', allCircles, pump);
  const pumpString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 ${
        10 + pump.length * 30
      } 50" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
        <rect fill="rgb(230, 229, 229)" stroke="rgb(178, 178, 178)" stroke-width="1" rx="10" ry="10" width="${
          10 + pump.length * 30
        }" height="30" x="0" y="0"/> \
        ${allCircles} \     
        <rect fill="rgb(8, 94, 141)" stroke='rgb(178, 178, 178)' stroke-width='2' width="8" height="20" x="${
          (10 + pump.length * 30) / 2 - 4
        }" y="30"/> \ 
      </svg>`;

  const iconSizeX = (10 + pump.length * 30) / 2;
  const iconAnchorX = iconSizeX / 2;

  const tankIcon = new L.Icon({
    iconUrl: pumpString,
    iconSize: [iconSizeX, 25], // size of the icon
    iconAnchor: [iconAnchorX, 25] // point of the icon which will correspond to marker's location
  });

  return tankIcon;
};
