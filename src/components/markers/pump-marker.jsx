import { Marker, Popup, Tooltip } from 'react-leaflet';
import { pumpStIcon } from '../svg/pump-icon';
import { findSensor } from '../../utils/sensors';

export const PumpStMarker = ({ position, pumpSt, sensorsValues }) => {
  const pumpStFlow = pumpSt.sensors?.filter(item => item.measurement.type === 'flow');
  return (
    <Marker
      position={position}
      icon={pumpStIcon(pumpSt.devices, pumpSt.sensors, sensorsValues)}
      riseOnHover={true}
      className={'pump'}
    >
      {/* <Tooltip direction='bottom' permanent={true} offset={[0, 58]} className='pumpSt-tooltip'>
        <span className='pumpSt-tooltip_title'>{name}</span>
      </Tooltip> */}
      <Popup className='pump-popup'>
        <div className='pump_station_name'>{pumpSt.name}</div>
        <div className='pump-popup_station'>
          <span className='pump-popup_title'>Pumping Station:</span>
          {pumpSt.sensors?.length > 0 ? (
            pumpSt.sensors.map(s => (
              <div key={s.id}>
                {s.measurement.name}: {sensorsValues?.[s.id].y}{' '}
                <span className='pump-popup_unit'>{s.measurement.unit_short_pretty}</span>
              </div>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
        <div className='pump-popup_pumps'>
          <span className='pump-popup_title'>Pumps:</span>
          {pumpSt.devices?.map((p, i) => (
            <div className='pump-popup_single-pump' key={p.id}>
              <div
                className='pump-popup_number'
                style={{
                  'background-color': `${
                    p.sensors?.filter(s => sensorsValues?.[s.id].y > 0).length > 0
                      ? 'rgb(98, 143, 101)'
                      : 'rgb(130, 0, 0)'
                  }`
                }}
              >
                {i + 1}
              </div>
              <table>
                {p.sensors?.map(s => (
                  <tr key={s.id}>
                    <th>{s.measurement.name}</th>
                    <td>
                      {sensorsValues?.[s.id].y}{' '}
                      <span className='pump-popup_unit'>{s.measurement.unit_short_pretty}</span>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ))}
        </div>
      </Popup>
    </Marker>
  );
};
