import { Marker, Tooltip } from 'react-leaflet';
import { CustomMarker } from '../markers/custom-marker';
import { tankSVG } from '../svg/tankSVG';

export const Tank = ({ infrastructure }) => {
  const coordinates = [infrastructure.devices[0].xcoord, infrastructure.devices[0].ycoord];
  const pump = [0, 1];

  return (
    <Marker
      position={coordinates}
      icon={tankSVG(
        2.5,
        0,
        pump,
        infrastructure.devices,
        infrastructure.maximum_level,
        infrastructure.minimum_level
      )}
      className='tank1'
      key={infrastructure.id}
      eventHandlers={{
        click: () => {
          console.log('marker clicked');
        }
      }}
    >
      <Tooltip
        permanent={true}
        direction='top'
        offset={pump?.length > 0 ? [2, -118] : [2, -83]}
        className='tank-tooltip'
      >
        <span className='tank-tooltip_title'>
          {infrastructure.name.replace('Reservatório ', '')}
        </span>
        <div className='tank-tooltip_level'>
          <span className='tank-tooltip_max-min'>max:</span>
          <span className='tank-tooltip_number'>
            {' '}
            {infrastructure.maximum_level} <span className='tank-tooltip_number_unit'>m</span>
          </span>
          <span className='hyphen' />
          <span className='tank-tooltip_max-min'>min:</span>
          <span className='tank-tooltip_number'>
            {' '}
            {infrastructure.minimum_level} <span className='tank-tooltip_number_unit'>m</span>
          </span>
        </div>
        {/* <span className='tank-tooltip-water-level'>{100 - item.properties.value}%</span> */}
      </Tooltip>
    </Marker>
  );
};
