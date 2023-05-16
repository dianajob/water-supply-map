import { Marker } from 'react-leaflet';
import { windSVG } from '../svg/wind-energy-icon';

export const WindMarker = () => {
  return <Marker position={[-25.410915, -49.408431]} icon={windSVG()}></Marker>;
};
