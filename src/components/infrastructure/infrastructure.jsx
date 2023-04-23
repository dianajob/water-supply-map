import { InfrastructureDevice } from '../device/device';

export const Infrastructure = ({ infrastructure }) => {
  const infrastructureData = {
    id: infrastructure.id,
    identifier: infrastructure.identifier,
    name: infrastructure.name,
    pretty_abbreviation: infrastructure.pretty_abbreviation,
    class_type: infrastructure.class_type,
    subsystem: infrastructure.subsystem,
    sensors: infrastructure.sensors
  };

  return (
    <div className='system-container'>
      {infrastructure.devices.map(device => {
        if (device.class_type === 'ConsumptionPoint') {
          return <InfrastructureDevice device={device} type='point' />;
        }
        /* if (device.class_type === 'MonitoringPoint') {
          return <InfrastructureDevice device={device} type='rect' />;
        } */
      })}
    </div>
  );
};
