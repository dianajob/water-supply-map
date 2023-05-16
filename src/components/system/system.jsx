import { LayerGroup, LayersControl } from 'react-leaflet';
import { useConvertData } from '../../utils/convert-data';
import { Subsystem } from './subsystem';
import { Pipes } from './pipe';

require('@changey/react-leaflet-markercluster/dist/styles.min.css');

export const System = ({ system }) => {
  const { subsystems, coordinates, sensors, pipes, subpipes } = useConvertData(system.subsystems);

  console.log(
    'subsystems: ',
    subsystems,
    'coordinates: ',
    coordinates,
    'pipes: ',
    pipes,
    'sensors: ',
    sensors
  );

  return (
    <div className='system-container'>
      <LayersControl position='topright'>
        <LayersControl.Overlay checked name={system.name}>
          <LayerGroup>
            {subsystems.map(sub => (
              <Subsystem subsystem={sub} />
            ))}
            <Pipes pipes={pipes} subpipes={subpipes} />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </div>
  );
};
