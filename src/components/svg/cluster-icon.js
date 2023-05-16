import L from 'leaflet';
import tap from '../../assets/images/tap-small.svg';
import { findSensor } from '../../utils/sensors';

import './cluster-icon.scss';

export function createClusterCustomIcon(cluster, subsystem) {
  const childMarkers = cluster.getAllChildMarkers();
  const tankChildMarkers = childMarkers.filter(item => item.options.className.includes('tank'));
  const pumpChildMarkers = childMarkers.filter(item => item.options.className.includes('pump'));
  const consumptionChildMarkers = childMarkers.filter(item =>
    item.options.className.includes('consumption-point')
  );
  const pumps = [0, 1, 1];

  const pumpStStatus = (sensors, pumps) => {
    const isSomePumpOn =
      pumps?.filter(p => p.sensors?.filter(s => findSensor(s.id).value > 0).length > 0).length > 0;

    const isPumpStOn =
      (sensors?.length > 0 && sensors?.filter(s => findSensor(s.id).value > 0).length > 0) ||
      isSomePumpOn;
    return isPumpStOn;
  };

  const tank = `${subsystem.tanks.map(
    t =>
      `<div class='tank'>
            <div class='tank-cells-container'>
            ${t.devices.map(
              (d, i) =>
                `<div class='tank-cell-wrapper'>
                  <div class='tank-cell'>
                    <div class='tank-cell-water-level' style='height: ${
                      (findSensor(d.sensors.find(s => s.measurement.type === 'level').id).value /
                        5) *
                      100
                    }%'></div>
                  </div>
                  <div class='water-number'>${
                    findSensor(d.sensors.find(s => s.measurement.type === 'level').id).value
                  } <span class='unit'>${
                  d.sensors?.find(s => s.measurement?.type === 'level')
                    ? d.sensors.find(s => s.measurement.type === 'level').measurement
                        .unit_short_pretty
                    : ''
                }</span></div>
              </div>`
            )} 
            </div>
          </div>`
  )}`
    .split(',')
    .join('');

  const pump = `${subsystem.pumpSt.map(
    p => `<div class='pump-station-container' style='border: ${
      pumpStStatus(p.sensors, p.devices) ? '1px solid rgb(50, 140, 56)' : '1px solid rgb(130, 0, 0)'
    }'>
      <div class='pumps-container'>${p.devices.map(
        (d, i) =>
          `<div class='pump' style='background-color: ${
            d.sensors.filter(s => findSensor(s.id).value > 0).length > 0
              ? 'rgb(98, 143, 101)'
              : 'rgb(130, 0, 0)'
          }'></div>`
      )}</div>
      <span class='flow'>${
        p.sensors?.find(s => s.measurement?.type === 'flow')
          ? findSensor(p.sensors.find(s => s.measurement.type === 'flow').id).value
          : ''
      } <span class='unit'>${
      p.sensors?.find(s => s.measurement?.type === 'flow')
        ? p.sensors.find(s => s.measurement.type === 'flow').measurement.unit_short_pretty
        : ''
    }</span></span>
      </div>`
  )}`
    .split(',')
    .join('');

  const consumption = `${subsystem.consP.map(
    cons => `<div class='consumption'>
          <span class='type'><img src='${tap}'></img></span>
          <span class='flow'>${
            cons.sensors.find(s => s.measurement?.type === 'flow')
              ? findSensor(cons.sensors.find(s => s.measurement.type === 'flow').id).value
              : ''
          } <span class='unit'>${
      cons.sensors?.find(s => s.measurement?.type === 'flow')
        ? cons.sensors.find(s => s.measurement.type === 'flow').measurement.unit_short_pretty
        : ''
    }</span></span>           
          </div>`
  )}`
    .split(',')
    .join('');

  const clusterHTML = `<div class='cluster-container'>
      <div class='subsystem-name'>${subsystem.name}</div>
      <div class='subsystem-devices'>
        <div>${subsystem.tanks.length > 0 ? tank : ''}</div>
        <div>
          <div>${subsystem.pumpSt.length > 0 ? pump : ''}</div>
          <div>${subsystem.consP.length > 0 ? consumption : ''}</div> 
        </div>
      </div>    
    </div>`;

  return L.divIcon({
    html: clusterHTML,
    iconAnchor: [50, 50],
    className: 'marker-cluster-custom'
  });
}
