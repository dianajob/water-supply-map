import { useState } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { pumpSVG, pumpSVGbigger } from '../svg/pumpSVG';
import { pumpSVGwithTooltip } from '../svg/pumpSVG-tooltip';
import { pumpDIV } from '../svg/pumpDIV';
import { point } from 'leaflet';

export const CustomMarker = ({ position, pumps, pumpStSensor }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const onPumpClickHandler = () => {
    setIsPopupOpen(prev => !prev);
    console.log('popup', isPopupOpen);
  };
  const pumpStFlow = pumpStSensor?.filter(item => item.measurement.type === 'flow');
  return (
    <Marker
      position={position}
      icon={pumpDIV(pumps, onPumpClickHandler, isPopupOpen, pumpStSensor)}
      className='pump1'
      /* eventHandlers={{
        click: () => {
          setIsPopupOpen(prev => !prev);
          console.log('popup', isPopupOpen);
        }
      }} */
    >
      <Popup className='pump-popup'>
        <div className='pump-popup_station'>
          <span className='pump-popup_title'>Pump Station:</span>
          {pumpStSensor?.length > 0 ? (
            pumpStSensor.map(item => (
              <div>
                {item.measurement.name}: 0{' '}
                <span className='pump-popup_unit'>{item.measurement.unit_short_pretty}</span>
              </div>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
        <div className='pump-popup_pumps'>
          <span className='pump-popup_title'>Pumps:</span>
          {pumps?.map((item, i) => (
            <div className='pump-popup_single-pump'>
              <div className='pump-popup_number'>{i + 1}</div>
              <div>
                {item.sensors?.map(item => (
                  <div>
                    {item.measurement.name}: 0{' '}
                    <span className='pump-popup_unit'>{item.measurement.unit_short_pretty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Popup>
    </Marker>
  );
};
