import { useEffect, useState } from 'react';

import data1 from '../../data/water-supply.json';
import data2 from '../../data/water-supply2.json';
import data3 from '../../data/water-supply3.json';
import { Subsystem } from '../subsystem/subsystem';
import systemData from '../../data/response_locations_sanepar.json';
import { Pipes } from './pipe';

export const System = () => {
  console.log(systemData, systemData.systems[0].subsystems);

  const coordinates = [];
  const tankList = [];
  const pipeList = [];
  const [pipes, setPipes] = useState(pipeList);

  const arrSystem = systemData.systems[0].subsystems;

  for (let sub in arrSystem) {
    for (let inf in arrSystem[sub].infrastructures) {
      if (arrSystem[sub].infrastructures[inf].class_type === 'PumpingStation') {
        for (let pump in arrSystem[sub].infrastructures[inf].pumps) {
          coordinates.push({
            id: arrSystem[sub].infrastructures[inf].pumps[pump],
            type: 'pump',
            latlong: [
              arrSystem[sub].infrastructures[inf].devices[0].xcoord,
              arrSystem[sub].infrastructures[inf].devices[0].ycoord
            ]
          });
        }
      } else if (arrSystem[sub].infrastructures[inf].class_type === 'Infrastructure') {
        coordinates.push({
          id: arrSystem[sub].infrastructures[inf].devices[0].id,
          type: arrSystem[sub].infrastructures[inf].devices[0].class_type,
          latlong: [
            arrSystem[sub].infrastructures[inf].devices[0].xcoord,
            arrSystem[sub].infrastructures[inf].devices[0].ycoord
          ]
        });
      } else if (arrSystem[sub].infrastructures[inf].class_type === 'Tank') {
        tankList.push({
          id: arrSystem[sub].infrastructures[inf].id,
          type: 'tank',
          latlong: [
            arrSystem[sub].infrastructures[inf].devices[0].xcoord,
            arrSystem[sub].infrastructures[inf].devices[0].ycoord
          ],
          input_devices: arrSystem[sub].infrastructures[inf].input_devices,
          output_devices: arrSystem[sub].infrastructures[inf].output_devices
        });
      }
    }
  }

  for (let tank in tankList) {
    console.log(tank, 'least tank');
    let tankCoord = tankList[tank].latlong;
    for (let input in tankList[tank].input_devices) {
      let coord = coordinates.filter(item => item.id === tankList[tank].input_devices[input])[0]
        .latlong;
      pipeList.push([coord, tankCoord]);
    }
    for (let output in tankList[tank].output_devices) {
      let coord = coordinates.filter(item => item.id === tankList[tank].output_devices[output])[0]
        .latlong;
      pipeList.push([tankCoord, coord]);
    }
    if (tank === tankList.length - 2) {
      console.log(tank, 'least tank');
      setPipes(pipeList);
    }
  }

  console.log('coordinates: ', coordinates, 'tank list: ', tankList, 'pipeList: ', pipeList, pipes);

  return (
    <div className='system-container'>
      {systemData.systems[0].subsystems.map(sub => (
        <Subsystem subsystem={sub} />
      ))}
      <Pipes pipes={pipeList} />
    </div>
  );
};
