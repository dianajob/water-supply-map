import { CustomMarker } from '../markers/custom-marker';

export const PumpingStation = ({ infrastructure }) => {
  const coordinates = [infrastructure.devices[0].xcoord, infrastructure.devices[0].ycoord];

  return (
    <div className='system-container'>
      <CustomMarker
        position={coordinates}
        pumps={infrastructure.devices}
        pumpStSensor={infrastructure.sensors}
      />
    </div>
  );
};
