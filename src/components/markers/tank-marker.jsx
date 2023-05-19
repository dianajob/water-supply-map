import { Marker, Tooltip } from 'react-leaflet';
import { tankSVG } from '../svg/tankSVG';

import './tank.scss';
import { useEffect, useState } from 'react';

export const Tank = ({ tank, sensorsValues }) => {
  const tooltipOffsetX = 0;
  const tooltipOffsetY = -92;

  /* const cells = tank.devices.map(d => {
    const sensorLevelID = d.sensors.find(s => s.measurement.type === 'level').id;
    return {
      sensorLevelID,
      value: sensorsValues?.[sensorLevelID].y,
      prevValue: 0
    };
  });

  const [cellsList, setCellsList] = useState(cells);

  useEffect(() => {
    setCellsList(prev =>
      prev.map(p => {
        const sensorLevelID = p.sensorLevelID;
        const prevValue = p.value;
        return {
          sensorLevelID,
          value: sensorsValues?.[sensorLevelID].y,
          prevValue
        };
      })
    );
  }, [sensorsValues]);

  console.log('cells: ', cells, cellsList); */

  return (
    <Marker
      position={tank.latlong}
      icon={tankSVG(tank.devices, tank.maximum_level, tank.minimum_level, sensorsValues)}
    >
      <Tooltip
        permanent={true}
        direction='top'
        offset={[tooltipOffsetX, tooltipOffsetY]}
        className='tank-tooltip'
      >
        <span className='tank-tooltip_title'>{tank.name.replace('Reservatório ', '')}</span>
        <div className='tank-tooltip_level'>
          <span className='tank-tooltip_level_max-min'>min: </span>
          <span className='tank-tooltip_level_number'>
            {tank.lower_operational_level}
            <span className='tank-tooltip_level_number_unit'> m</span>
          </span>
          <span className='tank-tooltip_level_hyphen' />
          <span className='tank-tooltip_level_max-min'>max: </span>
          <span className='tank-tooltip_level_number'>
            {tank.upper_operational_level}
            <span className='tank-tooltip_level_number_unit'> m</span>
          </span>
        </div>
      </Tooltip>
    </Marker>
  );
};
