import { useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { pumpSVG, pumpSVGbigger } from '../svg/pumpSVG';
import { pumpSVGwithTooltip } from '../svg/pumpSVG-tooltip';
import { pumpDIV } from '../svg/pumpDIV';
import { CustomMarker } from './custom-marker';

export const PumpMarkers = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const pumpStSensor = [
    {
      id: '4ada6593-8aa2-4efb-8cf2-cab6a884e51d',
      structure: '94ee8e58-bcf2-4749-8736-d029c60daa5d',
      measurement: {
        id: 1,
        name: 'flow',
        unit_long_pretty: 'literspersecond',
        unit_short_pretty: 'L/s',
        unit_short: 'L/s',
        type: 'flow'
      },
      name: 'São Braz FT03N',
      description: '',
      notes: ''
    }
  ];

  return (
    <>
      <CustomMarker
        position={[40.642408, -8.645743]}
        pumps={[0, 0, 0]}
        pumpStSensor={pumpStSensor}
      />
      <CustomMarker
        position={[40.639421, -8.650774]}
        pumps={[0, 1, 0]}
        pumpStSensor={pumpStSensor}
      />
      {/*  <Marker
        position={[40.642408, -8.645743]}
        icon={!isHovering ? pumpSVG([0, 0, 0], isHovering) : pumpSVGbigger([0, 0, 0], isHovering)}
        className='pump1'
        zIndexOffset={isHovering ? 1500 : 1000}
      ></Marker> */}
      <CustomMarker position={[40.635657, -8.655663]} pumps={[0, 1]} />
    </>
  );
};
