import {
  consPointType,
  infrType,
  monPointType,
  pumpStSubTypeBooster,
  pumpStSubTypeEl,
  pumpStType,
  tankType
} from '../constants/types';

export const convertData = systems => {
  const systemsConverted = [];

  for (let system of systems) {
    const subsystems = [];
    const coordinates = [];
    const pipes = [];
    const subpipes = [];
    const sensors = {};
    const sensorsID = [];

    for (let sub of system.subsystems) {
      const tanks = sub.infrastructures
        .filter(infr => infr.class_type.toLowerCase() === tankType.toLowerCase())
        .map((tank, i) => {
          return {
            ...tank,
            latlong: [tank.devices[0].xcoord, tank.devices[0].ycoord]
          };
        });

      let count = 0;
      const pumpSt = sub.infrastructures
        .filter(infr => infr.class_type.toLowerCase() === pumpStType.toLowerCase())
        .map((p, i) => {
          count =
            p.subtype.toLowerCase() === pumpStSubTypeBooster.toLowerCase() ||
            p.subtype.toLowerCase() === pumpStSubTypeEl.toLowerCase()
              ? count
              : count + 1;

          const inputTank = tanks.find(t => t.output_devices.indexOf(p.id) >= 0);

          return {
            ...p,
            shift_index: { index: count, tankCells: inputTank ? inputTank.tank_cells.length : 0 },
            latlong:
              inputTank && p.subtype.toLowerCase() !== pumpStSubTypeBooster.toLowerCase()
                ? inputTank.latlong
                : [p.devices[0].xcoord, p.devices[0].ycoord]
          };
        });

      const consP = [];
      const monP = [];

      for (let infr of sub.infrastructures) {
        if (infr.class_type.toLowerCase() === infrType.toLowerCase()) {
          for (let dev of infr.devices) {
            if (dev.class_type.toLowerCase() === consPointType.toLowerCase()) {
              consP.push({
                ...dev,
                subsystem: infr.subsystem,
                latlong: [dev.xcoord, dev.ycoord]
              });
            }
            if (dev.class_type.toLowerCase() === monPointType.toLowerCase()) {
              monP.push({
                ...dev,
                subsystem: infr.subsystem,
                latlong: [dev.xcoord, dev.ycoord]
              });
            }
          }
        }
      }

      const sublatlong =
        tanks.length > 0 ? tanks[0].latlong : pumpSt.length > 0 ? pumpSt[0].latlong : null;

      if (sublatlong) {
        subpipes.push(sublatlong);
      }

      subsystems.push({
        id: sub.id,
        name: sub.name,
        sublatlong: sublatlong,
        tanks,
        pumpSt,
        consP,
        monP
      });
    }

    console.log('subsystems after loop:', subsystems); //---------------console

    const addCoordinate = (
      id,
      type,
      sensorslist,
      subtype,
      latlong,
      subsystem,
      output_devices,
      shift_index
    ) => {
      coordinates.push({
        id,
        type,
        sensorslist,
        subtype,
        latlong,
        subsystem,
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
        tank.sensors.forEach(s => {
          addSensor(s.id);
          sensorslist.push(s.id);
        });
        tank.devices.forEach(d =>
          d.sensors.forEach(s => {
            addSensor(s.id);
            sensorslist.push(s.id);
          })
        );
        addCoordinate(
          tank.id,
          tank.class_type,
          sensorslist,
          null,
          tank.latlong,
          tank.subsystem,
          tank.output_devices,
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
          pump.class_type,
          sensorslist,
          pump.subtype,
          pump.latlong,
          pump.subsystem,
          pump.output_devices,
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
          cons.class_type,
          sensorslist,
          null,
          cons.latlong,
          cons.subsystem,
          cons.output_devices,
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
          mon.class_type,
          sensorslist,
          null,
          mon.latlong,
          mon.subsystem,
          mon.output_devices,
          null
        );
      }
    }

    console.log('coordinates after loop:', coordinates); //---------------console

    for (let el of coordinates) {
      if (el.output_devices.length > 0) {
        for (let output of el.output_devices) {
          let endCoord = coordinates.find(c => c.id === output);
          pipes.push({
            startnode: el,
            endnode: endCoord,
            isOn: false
          });
        }
      }
    }
    console.log('pipes:', pipes);
    systemsConverted.push({
      ...system,
      subsystems: subsystems,
      coordinates,
      pipes,
      subpipes,
      sensors,
      sensorsID
    });
  }

  return systemsConverted;
};
