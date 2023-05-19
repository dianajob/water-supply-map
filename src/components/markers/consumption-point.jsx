import { Marker, Popup } from 'react-leaflet';
import { consumptionSVG } from '../svg/consumption-point-icon';

import './consumption-point.scss';

export const ConsumptionPoint = ({ consPoint, sensorsValues }) => {
  /* const initialSensorsList = consPoint.sensors.map(s => ({
    id: s.id,
    value: 0,
    unit: s.measurement.unit_short_pretty,
    name: s.measurement.name
  }));

  const [sensorsList, setSensorsList] = useState(initialSensorsList);

  useEffect(() => {
    if (sensorsList.filter(s => apiSensors[s.id].value !== s.value).length > 0) {
      setSensorsList(prev => prev.map(s => ({ ...s, value: updatedSensors[s.id].value })));
    }
  }, [apiSensors, consPoint]); */

  return (
    <div className='consumption-container'>
      <Marker
        position={consPoint.latlong}
        icon={consumptionSVG(consPoint.sensors, sensorsValues)}
        riseOnHover={true}
        className={'consumption-point'}
      >
        {/* <Tooltip direction='top' permanent={true} offset={[0, -55]} className='consumption-tooltip'>
          <span className='consumption-tooltip_title'>
            {infrastructure.name.split(' ').slice(4).join(' ')}
          </span>
        </Tooltip> */}
        <Popup className='consumption-popup'>
          <div className='consumption-popup_title'>{consPoint.name}</div>
          <div className='consumption-popup_measurement'>
            {consPoint.sensors.length > 0 ? (
              <table>
                {consPoint.sensors.map(s => (
                  <tr key={s.id}>
                    <th>{s.measurement.name}</th>
                    <td>
                      {sensorsValues?.[s.id].y}{' '}
                      <span className='consumption-popup_unit'>
                        {s.measurement.unit_short_pretty}
                      </span>
                    </td>
                  </tr>
                ))}
              </table>
            ) : (
              <div>No data</div>
            )}
          </div>
        </Popup>
      </Marker>
    </div>
  );
};
