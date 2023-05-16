import { useState } from 'react';
import { LeafletContainer } from './leaflet/leaflet';

import dataJSON from '../data/response_locations_sanepar.json';

import './map.scss';

export const Map = () => {
  const [data, setData] = useState(dataJSON);
  //api call for data

  return (
    <div className='map-container'>
      <LeafletContainer systems={data.systems} />
    </div>
  );
};
