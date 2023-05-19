import { LayerGroup } from 'react-leaflet';
import { Subsystem } from './subsystem';
import { Pipes } from './pipe';
import { useEffect, useState } from 'react';
import { getUpdatedSensors } from '../../utils/getUpdatedSensors';
import { updateValues } from '../../utils/update-values';

require('@changey/react-leaflet-markercluster/dist/styles.min.css');

export const System = ({ system }) => {
  const [sensorsValues, setSensorsValues] = useState({ ...system.sensors });
  const [isSystemRemoved, setIsSystemRemoved] = useState(false);

  const getSensorsValues = async value => {
    try {
      //const response = await fetch(/* `${API_BASE_URL}`, system.sensorsID */);
      const response = getUpdatedSensors(system.sensorsID, value); // getUpdatedSensors() used for testing without api call
      const updatedValues = updateValues(sensorsValues, response);
      setSensorsValues(updatedValues);
    } catch (error) {
      // error handler
    }
  };

  useEffect(() => {
    getSensorsValues(0);

    let value = 0; // value used for testing without api call

    const intervalCall = setInterval(() => {
      if (isSystemRemoved) {
        clearInterval(intervalCall);
        return;
      }
      value = value + 1; // value used for testing without api call
      getSensorsValues(value);
    }, 300000);

    return () => {
      clearInterval(intervalCall);
    };
  }, [isSystemRemoved]);

  return (
    <LayerGroup
      eventHandlers={{
        add: e => {
          console.log('Added Layer:', system.identifier);
          setIsSystemRemoved(false);
        },
        remove: e => {
          console.log('Removed layer:', system.identifier);
          setIsSystemRemoved(true);
        }
      }}
    >
      {system.subsystems.map(sub => (
        <Subsystem
          subsystem={sub}
          sensorsValues={sensorsValues}
          key={'subsystem' + sub.id}
          name={system.identifier}
        />
      ))}
      <Pipes pipes={system.pipes} subpipes={system.subpipes} sensorsValues={sensorsValues} />
    </LayerGroup>
  );
};
