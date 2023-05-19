import { Marker } from 'react-leaflet';
import { monitoringPointSVG } from '../svg/monitoring-point-icon';

export const MonitoringPoint = ({ monPoint, sensorsValues }) => {
  return (
    <div className='monitoring-container'>
      <Marker
        position={monPoint.latlong}
        icon={monitoringPointSVG(monPoint.sensors, sensorsValues)}
        riseOnHover={true}
        className='monitoring-point'
      />
    </div>
  );
};
