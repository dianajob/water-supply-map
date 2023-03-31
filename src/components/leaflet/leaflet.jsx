import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, SVGOverlay, TileLayer } from 'react-leaflet';
import svgTank from '../../assets/images/tankfull.svg';
import { SvgTankComponent, tankSVG } from '../svg/tankSVG';
import L from 'leaflet';
import './leaflet.css';
import data1 from '../../data/water-supply.json';
import data2 from '../../data/water-supply2.json';
import data3 from '../../data/water-supply3.json';

const bounds = [
  [40.641147, -8.642258],
  [40.642408, -8.645743]
];

const waterLevel = 80;
const pipe = [
  [40.641147, -8.642258],
  [40.642408, -8.645743],
  [40.639421, -8.650774],
  [40.635657, -8.655663]
];

/* const tankString = `data:image/svg+xml;utf-8, \
      <svg viewBox="0 0 150 200" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> \
      <g fill="rgb(178, 178, 178)"> \
          <path  d="M37.6,11.5c-9.3,2.8-22.1,11.2-26.1,17.4c-1.2,1.8,2.1,1.9,39.4,2c22.3,0,40.6-0.5,40.6-1.1c0-1.5-9.2-9.3-15.4-13.1C64.9,9.9,49.9,7.9,37.6,11.5z"/> \
          <path fill="rgb(96, 150, 180)" stroke-width = "4px" stroke = "rgb(178, 178, 178)" d="M17.7,98.3v56.1l32.5,0.2c17.9,0.2,33,0.2,33.8,0l1.3-0.4V98.2V42.2H51.4H17.7V98.3z"/> \
          <path d="M91.4,160.1l-0.2-4.3c0-0.6-0.3-1.1-0.6-1.1H51.4H12.2c-0.3,0-0.6,0.5-0.6,1.1l-0.2,4.3l-0.1,4c0,0.7,0.2,1.2,0.6,1.2h39.5H91c0.3,0,0.6-0.6,0.6-1.2L91.4,160.1z"/> \
          <path d="M65.2,185.5c9.3-2.8,22.1-11.2,26.1-17.4c1.2-1.8-2.1-1.9-39.4-2c-22.3,0-40.6,0.5-40.6,1.1c0,1.5,9.2,9.3,15.4,13.1C37.9,187.1,53,189.1,65.2,185.5z"/> \
          <path d="M11.5,37l0.2,4.3c0,0.6,0.3,1.1,0.6,1.1h39.2h39.2c0.3,0,0.6-0.5,0.6-1.1l0.2-4.3l0.1-4c0-0.7-0.2-1.2-0.6-1.2H51.4H11.9c-0.3,0-0.6,0.6-0.6,1.2L11.5,37z"/> \
        </g> \
        <rect class="water" fill="rgb(178, 178, 178)" width="67.5" height="${waterLevel}" x="17.7" y="42.45"/> \        
      </svg>`; */

export const LeafletContainer = () => {
  const [data, setData] = useState(data1);

  useEffect(() => {
    console.log('update data');
    const secondData = setTimeout(() => {
      setData(data2);
      console.log('second data');
    }, 10000);
    return () => {
      clearTimeout(secondData);
    };
  }, []);

  useEffect(() => {
    console.log('update data2');

    const thirdData = setTimeout(() => {
      setData(data3);
      console.log('third data');
    }, 20000);
    return () => {
      clearTimeout(thirdData);
    };
  }, []);
  /* let tankIcon = L.divIcon({ className: 'my-div-icon' }); */
  const pipeOptions = { color: 'blue', weight: 4 };

  return (
    <div className='leaflet-map-container'>
      {/* <img src={svgTank} alt='f' /> */}
      <MapContainer
        style={{ height: '80vh' }}
        center={[40.6368, -8.6493]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          className='map-tiles'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {data.features.map((item, i) => {
          if (item.properties.category === 'tank') {
            return (
              <Marker
                position={item.geometry.coordinates}
                icon={tankSVG(item.properties.value)}
                className='tank1'
                key={item.properties.id}
              ></Marker>
            );
          }
        })}

        {/*   <Marker position={[40.641147, -8.642258]} icon={tankSVG(50)} className='tank2'></Marker>
        <Marker position={[40.639421, -8.650774]} icon={tankSVG(10)} className='tank3'></Marker>
        <Marker position={[40.635657, -8.655663]} icon={tankSVG(0)} className='tank4'></Marker> */}

        <Polyline pathOptions={pipeOptions} positions={pipe} />
      </MapContainer>
    </div>
  );
};
