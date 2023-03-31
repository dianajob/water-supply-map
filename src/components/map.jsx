import { LeafletContainer } from './leaflet/leaflet';
import './map.scss';

export const Map = () => {
  return (
    <div className='map-container'>
      <LeafletContainer />
    </div>
  );
};
