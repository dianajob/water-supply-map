import { useEffect, useState } from 'react';
import {
  Circle,
  CircleMarker,
  LayerGroup,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  SVGOverlay,
  TileLayer,
  Tooltip,
  useMap
} from 'react-leaflet';
import svgTank from '../../assets/images/tankfull.svg';
import { SvgTankComponent, tankSVG } from '../svg/tankSVG';
import L, { point } from 'leaflet';
import './leaflet.css';
import data1 from '../../data/water-supply.json';
import data2 from '../../data/water-supply2.json';
import data3 from '../../data/water-supply3.json';
import { twoTanksSVG } from '../svg/two-tanksSVG';
import { divIconTank } from '../svg/divIconTank';
import darkmap from './../../assets/images/dark-map.png';
import lightmap from '../../assets/images/light-map.png';
import { pumpSVG } from '../svg/pumpSVG';
import { pumpSVGwithTooltip } from '../svg/pumpSVG-tooltip';
import { PumpMarkers } from '../markers/pump-markers';
import { tankSVGnew } from '../svg/tankSVGnew';
import { tankDivIcon } from '../svg/tankDIV';
import { tankSVGRuben } from '../svg/tankSVGruben';

const bounds = [
  [40.641147, -8.642258],
  [40.642408, -8.645743]
];

const waterLevel = 80;
const pipe = [
  [40.641147, -8.642258],
  [40.642408, -8.645743],
  [40.639421, -8.650774],
  [40.635657, -8.655663],
  [40.628415, -8.644215]
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

export const Prototype = () => {
  const [data, setData] = useState(data1);
  const [oldData, setOldData] = useState(data1);
  const [isBasemapLight, setIsBasemapLight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  // const [dashOffset, setDashOffset] = useState(0);
  /*   let dashOffset = 1000;

  useEffect(() => {
    const setOffset = setInterval(() => {
      dashOffset = dashOffset + 100;
      console.log('interval', dashOffset);
    }, 1000);
    return () => {
      clearTimeout(setOffset);
    };
  }, []); */
  /* 
  useEffect(() => {
    console.log('update data');
    const secondData = setTimeout(() => {
      setData(data2);
      setOldData(data1);
      console.log('second data');
    }, 5000);
    return () => {
      clearTimeout(secondData);
    };
  }, []);

  useEffect(() => {
    console.log('update data2');

    const thirdData = setTimeout(() => {
      setData(data3);
      setOldData(data2);
      console.log('third data');
    }, 10000);
    return () => {
      clearTimeout(thirdData);
    };
  }, []);

  useEffect(() => {
    console.log('update data1');

    const firstData = setTimeout(() => {
      setData(data1);
      setOldData(data3);
      console.log('first data');
    }, 15000);
    return () => {
      clearTimeout(firstData);
    };
  }, []); */
  /* let tankIcon = L.divIcon({ className: 'my-div-icon' }); */
  const pipeOptions = {
    color: '#085e8d',
    weight: 3
  };
  const pipeBorderOptions = { color: '#B2B2B2', weight: 6 };

  const changeCoordinates = (arr, index) => {
    let newArr = [...arr];
    newArr[1] = newArr[1] + index / 1000;
    return newArr;
  };

  const map = useMap();
  console.log(map);

  return (
    <div className='system-container'>
      <Polyline pathOptions={pipeBorderOptions} positions={pipe} />
      <Polyline pathOptions={pipeOptions} positions={pipe} />
      <Polyline className='water-flow' positions={pipe} />

      {data.features.map((item, i) => {
        if (item.properties.category === 'tank') {
          return (
            <Marker
              position={item.geometry.coordinates}
              icon={tankSVG(
                item.properties.value,
                oldData.features[item.id].properties.value,
                item.properties.pump,
                [0, 1]
              )}
              className='tank1'
              key={item.properties.id}
              eventHandlers={{
                click: () => {
                  console.log('marker clicked');
                }
              }}
            >
              <Tooltip
                permanent={true}
                direction='top'
                offset={item.properties.pump?.length > 0 ? [2, -90] : [2, -70]}
                className='tank-tooltip'
              >
                <span>Name</span>
                {/* <span className='tank-tooltip-water-level'>{100 - item.properties.value}%</span> */}
              </Tooltip>
            </Marker>
          );
        }
        if (item.properties.category === 'ConsumptionPoint') {
          return (
            <Marker
              position={item.geometry.coordinates}
              icon={tankSVGnew(item.properties.value, oldData.features[item.id].properties.value)}
              className='tank1'
              key={item.properties.id}
            ></Marker>
          );
        }
      })}

      {/* {data.features.map((item, i) => {
          if (item.properties.category === 'tank' && item.properties.pump?.length > 0) {
            return (
              <Marker
                position={item.geometry.coordinates}
                icon={pumpSVG(item.properties.pump)}
                className='pump1'
                key={item.properties.id}
              ></Marker>
            );
          }
        })} */}

      <PumpMarkers />

      {/* {data.features.map((item, i) => {
          if (item.properties.category === 'tank' && item.properties.pump?.length > 0) {
            return (
             
               <LayerGroup>
                {item.properties.pump.map((pumpItem, i) => {
                  return (
                    <CircleMarker
                      center={changeCoordinates(item.geometry.coordinates, i)}
                      pathOptions={{
                        stroke: false,
                        fillColor: `${pumpItem === 0 ? 'red' : 'green'}`,
                        fillOpacity: 1
                      }}
                      radius={5}
                    />
                  );
                })}
              </LayerGroup> 
            );
          }
        })} */}
      <Marker position={[40.635381, -8.635123]} icon={tankSVGRuben(50)}></Marker>
      {/*   <Marker position={[40.641147, -8.642258]} icon={tankSVG(50)} className='tank2'></Marker>
        <Marker position={[40.639421, -8.650774]} icon={tankSVG(10)} className='tank3'></Marker>
        <Marker position={[40.635657, -8.655663]} icon={tankSVG(0)} className='tank4'></Marker> */}
    </div>
  );
};
