import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { System } from '../system/system';

import darkmap from './../../assets/images/dark-map.jpg';
import lightmap from '../../assets/images/light-map.jpg';

import './leaflet.css';

/* import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js'; */

export const LeafletContainer = ({ systems }) => {
  const [isBasemapLight, setIsBasemapLight] = useState(true);

  const basemap = {
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  /* 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' */

  /*   const [zoomLevel, setZoomLevel] = useState(null);

const zoomLevelHandler = useMapEvent('zoom', e => {
  const zoom = e.target.getZoom();
  setZoomLevel(zoom);
}); */

  return (
    <div className='leaflet-map-container'>
      <MapContainer
        style={{ height: '100vh' }}
        center={[-25.401983, -49.336037]}
        minZoom={2}
        maxZoom={18}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          className='map-tiles'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isBasemapLight ? basemap.light : basemap.dark}
        />

        <button className='switch-mode-btn' onClick={() => setIsBasemapLight(prev => !prev)}>
          <img
            src={isBasemapLight ? darkmap : lightmap}
            width='50px'
            height='50px'
            alt='map view'
          />
        </button>

        {systems.map(s => (
          <System system={s} />
        ))}
      </MapContainer>
    </div>
  );
};
