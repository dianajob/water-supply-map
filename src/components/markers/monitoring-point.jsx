import { Marker } from 'react-leaflet';
import { monitoringPointSVG } from '../svg/monitoring-point-icon';

export const MonitoringPoint = ({ monPoint }) => {
  /*   const initialSensorsList = monPoint.sensors.map(s => ({
    id: s.id,
    value: 0,
    unit: s.measurement.unit_short_pretty,
    name: s.measurement.name
  }));

  const [sensorsList, setSensorsList] = useState(initialSensorsList);

  useEffect(() => {
    if (monPoint.sensors.filter(s => sensors.find(v => v.id === s.id)).length > 0) {
      setSensorsList(prev => prev.map(s => ({ ...s, value: getValue(s.id, sensors) })));
    }
  }, [sensors, monPoint]); */

  return (
    <div className='monitoring-container'>
      <Marker
        position={monPoint.latlong}
        icon={monitoringPointSVG(monPoint.sensors)}
        riseOnHover={true}
        className='monitoring-point'
      />
    </div>
  );
};
