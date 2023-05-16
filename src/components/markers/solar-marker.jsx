import { Marker } from 'react-leaflet';
import { solarSVG } from '../svg/solar-energy-icon';

export const SolarMarker = () => {
  return <Marker position={[-25.439628, -49.408816]} icon={solarSVG()}></Marker>;
};
