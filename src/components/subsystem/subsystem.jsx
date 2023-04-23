import { Infrastructure } from '../infrastructure/infrastructure';
import { PumpingStation } from '../infrastructure/pumping-station';
import { Tank } from '../infrastructure/tank';

export const Subsystem = ({ subsystem }) => {
  /*  const subsystemData = {
    id: sub.id,
    identifier: sub.identifier,
    name: sub.name,
    pretty_abbreviation: sub.pretty_abbreviation,
    system: sub.system,
    solar_parks: sub.solar_parks,
    meteorological_stations: sub.meteorological_stations
  }; */

  return (
    <div className='infrastructure-container'>
      {subsystem.infrastructures.map(infrastructure => {
        if (infrastructure.class_type === 'Infrastructure') {
          return <Infrastructure infrastructure={infrastructure} />;
        }
        if (infrastructure.class_type === 'PumpingStation') {
          return <PumpingStation infrastructure={infrastructure} />;
        }
        if (infrastructure.class_type === 'Tank') {
          return <Tank infrastructure={infrastructure} />;
        }
      })}
    </div>
  );
};
