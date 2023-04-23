import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import './leaflet.css';
import darkmap from './../../assets/images/dark-map.png';
import lightmap from '../../assets/images/light-map.png';
import { System } from '../system/system';
import { Prototype } from './ptototype';

export const LeafletContainer = () => {
  const [isBasemapLight, setIsBasemapLight] = useState(true);

  var CartoDB_Positron = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }
  );
  const basemap = {
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  };

  const changeCoordinates = (arr, index) => {
    let newArr = [...arr];
    newArr[1] = newArr[1] + index / 1000;
    return newArr;
  };

  return (
    <div className='leaflet-map-container'>
      <MapContainer
        style={{ height: '100vh' }}
        center={[-25.401983, -49.336037]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          className='map-tiles'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            isBasemapLight
              ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          }
        />

        <button className='switch-mode-btn' onClick={() => setIsBasemapLight(prev => !prev)}>
          <img
            src={isBasemapLight ? darkmap : lightmap}
            width='50px'
            height='50px'
            alt='map view'
          />
        </button>

        <System />
        <Prototype />
      </MapContainer>
    </div>
  );
};
