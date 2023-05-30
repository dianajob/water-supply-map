import {
  consPointType,
  infrType,
  monPointType,
  pumpStBooster,
  pumpStElevation,
  pumpStType,
  tankType
} from '../constants/types';

export const convertData = systems => {
  const convertedSystems = [];

  for (let system of systems) {
    const subsystems = [];
    const coordinatesList = [];
    const pipes = [];
    const subpipes = [];
    const sensors = {};
    const sensorsID = [];
    const subConnections = {};

    for (let sub of system.subsystems) {
      subConnections[sub.id] = [];

      const tanks = sub.infrastructures
        .filter(infr => infr.class_type?.toLowerCase() === tankType)
        .map((tank, i) => {
          return {
            ...tank,
            devices: tank.tank_cells,
            minimum_level: 0,
            maximum_level: 5,
            latlong: [tank.node.latitude, tank.node.longitude]
          };
        });

      let count = 0;
      const pumpSt = sub.infrastructures
        .filter(infr => infr.class_type?.toLowerCase() === pumpStType)
        .map((p, i) => {
          count =
            p.type.toLowerCase() === pumpStBooster || p.type.toLowerCase() === pumpStElevation
              ? count
              : count + 1;

          const inputTank = tanks.find(t => t.node.next_connections.indexOf(p.node.uuid) >= 0);

          return {
            ...p,
            subtype: p.type,
            devices: p.pumps,
            shift_index: { index: count, tankCells: inputTank ? inputTank.tank_cells.length : 0 },
            latlong:
              inputTank && p.type.toLowerCase() !== pumpStBooster
                ? inputTank.latlong
                : [p.node.latitude, p.node.longitude]
          };
        });

      const consP = [];
      const monP = [];

      for (let infr of sub.infrastructures) {
        if (infr.class_type.toLowerCase() === infrType) {
          for (let dev of infr.devices) {
            if (dev.class_type.toLowerCase() === consPointType) {
              consP.push({
                ...dev,
                latlong: [dev.node.latitude, dev.node.longitude]
              });
            }
            if (dev.class_type.toLowerCase() === monPointType) {
              monP.push({
                ...dev,
                latlong: [dev.node.latitude, dev.node.longitude]
              });
            }
          }
        }
      }

      const sublatlong =
        tanks.length > 0
          ? tanks[0].latlong
          : pumpSt.length > 0
          ? pumpSt[0].latlong
          : consP.length > 0
          ? consP[0].latlong
          : null;

      subsystems.push({
        id: sub.id,
        name: sub.name,
        sublatlong: sublatlong,
        tanks,
        pumpSt,
        consP,
        monP,
        solar_parks: sub.solar_parks
      });
    }

    const addCoordinate = (
      id,
      nodeID,
      type,
      subID,
      sensorslist,
      subtype,
      latlong,
      output_devices,
      shift_index
    ) => {
      coordinatesList.push({
        id,
        nodeID,
        type,
        subID,
        sensorslist,
        subtype,
        latlong,
        output_devices,
        shift_index
      });
    };

    const addSensor = id => {
      sensors[id] = {
        y: 0,
        prevValue: 0
      };
      sensorsID.push(id);
    };

    for (let sub of subsystems) {
      for (let tank of sub.tanks) {
        const sensorslist = [];
        tank.devices.forEach(d =>
          d.sensors.forEach(s => {
            addSensor(s.id);
            sensorslist.push(s.id);
          })
        );
        addCoordinate(
          tank.id,
          tank.node.uuid,
          tank.class_type,
          sub.id,
          sensorslist,
          null,
          tank.latlong,
          tank.node.next_connections,
          null
        );
      }

      for (let pump of sub.pumpSt) {
        const sensorslist = [];
        pump.sensors.forEach(s => {
          addSensor(s.id);
          sensorslist.push(s.id);
        });
        pump.devices.forEach(d =>
          d.sensors.forEach(s => {
            addSensor(s.id);
            sensorslist.push(s.id);
          })
        );

        addCoordinate(
          pump.id,
          pump.node.uuid,
          pump.class_type,
          sub.id,
          sensorslist,
          pump.subtype,
          pump.latlong,
          pump.node.next_connections,
          pump.shift_index
        );
      }

      for (let cons of sub.consP) {
        const sensorslist = [];
        cons.sensors.forEach(s => {
          addSensor(s.id);
          sensorslist.push(s.id);
        });

        addCoordinate(
          cons.id,
          cons.node.uuid,
          cons.class_type,
          sub.id,
          sensorslist,
          null,
          cons.latlong,
          cons.node.next_connections,
          null
        );
      }

      for (let mon of sub.monP) {
        const sensorslist = [];
        mon.sensors.forEach(s => {
          addSensor(s.id);
          sensorslist.push(s.id);
        });
        mon.sensors.forEach(s => addSensor(s.id));
        addCoordinate(
          mon.id,
          mon.node.uuid,
          mon.class_type,
          sub.id,
          sensorslist,
          null,
          mon.latlong,
          mon.node.next_connections,
          null
        );
      }

      for (let generator of sub.solar_parks) {
        const sensorslist = [];
        generator.sensors?.forEach(s => {
          addSensor(s.id);
          sensorslist.push(s.id);
        });
        generator.sensors.forEach(s => addSensor(s.id));
      }
    }

    function extractCoordinates(obj) {
      let extraCoordinates = [];
      let deepestObj = obj;

      function findDeepest(obj) {
        if (typeof obj === 'object') {
          extraCoordinates.push([obj.latitude, obj.longitude]);
        }
        if (typeof obj === 'string') {
          const el = coordinatesList.find(c => c.nodeID === obj);
          extraCoordinates.push(el.latlong);
        }

        if (obj.hasOwnProperty('next_connections') && obj.next_connections.length > 0) {
          obj.next_connections.forEach(connection => {
            findDeepest(connection);
          });
        } else {
          deepestObj = obj;
        }
      }

      findDeepest(obj);
      extraCoordinates.pop();
      return { extraCoordinates, deepestObj };
    }

    for (let el of coordinatesList) {
      if (el.output_devices.length > 0) {
        for (let output of el.output_devices) {
          if (typeof output === 'string') {
            subConnections[el.subID].push(output);
            let endCoord = coordinatesList.find(c => c.nodeID === output);
            pipes.push({
              startnode: el,
              endnode: endCoord,
              isOn: false
            });
          }
          if (typeof output === 'object') {
            const { extraCoordinates, deepestObj } = extractCoordinates(output);
            const lastConnectionID = typeof deepestObj === 'object' ? deepestObj.uuid : deepestObj;
            subConnections[el.subID].push(lastConnectionID);
            let lastConnection = coordinatesList.find(c => c.nodeID === lastConnectionID);
            pipes.push({
              startnode: el,
              between: extraCoordinates,
              endnode: lastConnection,
              isOn: false
            });
          }
        }
      }
    }

    subsystems.forEach(s => {
      const subSensors = coordinatesList
        .filter(c => c.subID === s.id)
        .flatMap(c => c.sensorslist.flat());

      const subPipeStart = { latlong: s.sublatlong, sensors: subSensors };
      const subPipeEnd = coordinatesList.filter(
        c => subConnections[s.id].includes(c.nodeID) && c.subID !== s.id
      );
      subPipeEnd.forEach(p => {
        const subsys = subsystems.find(s => s.id === p.subID);
        const endSensors = coordinatesList
          .filter(c => c.subID === subsys.id)
          .flatMap(c => c.sensorslist.flat());

        subpipes.push({
          start: subPipeStart,
          end: { latlong: subsys.sublatlong, sensors: endSensors },
          isOn: false
        });
      });
    });

    convertedSystems.push({
      ...system,
      subsystems: subsystems,
      coordinatesList,
      pipes,
      subpipes,
      sensors,
      sensorsID
    });
  }

  return convertedSystems;
};
