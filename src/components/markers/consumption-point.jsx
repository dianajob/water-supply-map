import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { consumptionSVG } from '../svg/consumption-point-icon';
import { findSensor, getValue } from '../../utils/sensors';

import './consumption-point.scss';

export const ConsumptionPoint = ({ consPoint }) => {
  /* const initialSensorsList = consPoint.sensors.map(s => ({
    id: s.id,
    value: 0,
    unit: s.measurement.unit_short_pretty,
    name: s.measurement.name
  }));

  const [sensorsList, setSensorsList] = useState(initialSensorsList);

  useEffect(() => {
    if (consPoint.sensors.filter(s => sensors.find(v => v.id === s.id)).length > 0) {
      setSensorsList(prev => prev.map(s => ({ ...s, value: getValue(s.id, sensors) })));
    }
  }, [sensors, consPoint]); */

  return (
    <div className='consumption-container'>
      <Marker
        position={consPoint.latlong}
        icon={consumptionSVG(consPoint.sensors)}
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
                  <tr>
                    <th>{s.measurement.name}</th>
                    <td>
                      {getValue(s.id)}{' '}
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
