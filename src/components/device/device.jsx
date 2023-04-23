import { Marker, Popup, Tooltip } from 'react-leaflet';
import { consumptionSVG } from '../svg/consumption-point';
import './device.scss';

export const InfrastructureDevice = ({ device, type }) => {
  const deviceData = {
    id: device.id,
    device_infrastructure: device.device_infrastructure,
    meteorological_station: device.meteorological_station,
    identifier: device.identifier,
    name: device.name,
    pretty_abbreviation: device.pretty_abbreviation,
    class_type: device.class_type,
    xcoord: device.xcoord,
    ycoord: device.ycoord,
    is_predicted: device.is_predicted,
    node: device.node
  };

  return (
    <div className='consumption-container'>
      {type === 'point' && (
        <Marker position={[device.xcoord, device.ycoord]} icon={consumptionSVG()}>
          <Tooltip
            direction='top'
            permanent={true}
            offset={[0, -65]}
            className='consumption-tooltip'
          >
            <span className='consumption-tooltip_title'>
              {device.name.split(' ').slice(4).join(' ')}
            </span>
          </Tooltip>
          <Popup className='consumption-popup'>
            <span className='consumption-popup_title'>
              {device.name.split(' ').slice(0, 4).join(' ')}
            </span>
            <div className='consumption-popup_measurement'>
              {device.sensors?.length > 0 ? (
                device.sensors.map(item => (
                  <div>
                    {item.measurement.name}: 0{' '}
                    <span className='consumption-popup_unit'>
                      {item.measurement.unit_short_pretty}
                    </span>
                  </div>
                ))
              ) : (
                <div>No data</div>
              )}
            </div>
          </Popup>
        </Marker>
      )}
      {/* {type === 'rect' && (
        <CircleMarker
          center={[device.xcoord, device.ycoord]}
          pathOptions={{
            stroke: false,
            fillColor: 'green',
            fillOpacity: 1
          }}
          radius={10}
        >
          <Tooltip direction='top'>
            <span>{device.name}</span>
            <span>Monitoring Point</span>
          </Tooltip>
        </CircleMarker>
      )} */}
    </div>
  );
};
