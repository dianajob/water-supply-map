import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import systemData from '../../data/response_locations_sanepar.json';

export const Pipes = ({ pipes }) => {
  /* const [systemData, setSystemData] = useState(systemDataProp); */

  const pipeOptions = {
    color: '#085e8d',
    weight: 3
  };
  const pipeBorderOptions = { color: 'rgb(129, 128, 128)', weight: 6 };
  useEffect(() => {
    console.log('update in pipes', pipes, pipes[0]);
  }, [pipes]);

  return (
    <div className='pipe-container'>
      {pipes.length > 0 &&
        pipes.map(pipe => (
          <>
            <Polyline pathOptions={pipeBorderOptions} positions={pipe} />
            <Polyline pathOptions={pipeOptions} positions={pipe} />
            <Polyline className='water-flow' positions={pipe} />
          </>
        ))}
    </div>
  );
};
