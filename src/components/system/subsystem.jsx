import { LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { createClusterCustomIcon } from '../svg/cluster-icon';
import { ConsumptionPoint } from '../markers/consumption-point';
import { MonitoringPoint } from '../markers/monitoring-point';
import { PumpingStation } from './pumping-station';
import { Tank } from '../markers/tank-marker';

export const Subsystem = ({ subsystem, sensorsValues, name }) => {
  return (
    <MarkerClusterGroup
      spiderfyOnMaxZoom={false}
      disableClusteringAtZoom={14}
      maxClusterRadius={200}
      onClick={e => console.log('cluster-click', e.layer.getAllChildMarkers(), e, e.layer)}
      iconCreateFunction={cluster => createClusterCustomIcon(cluster, subsystem, sensorsValues)}
    >
      <LayerGroup>
        {subsystem.tanks.map(t => (
          <Tank
            tank={t}
            pumpList={subsystem.pumpSt}
            sensorsValues={sensorsValues}
            key={'tank' + t.id}
          />
        ))}
        {subsystem.pumpSt.map((p, i) => (
          <PumpingStation
            pumpSt={p}
            index={i}
            sensorsValues={sensorsValues}
            key={'pumpst' + p.id}
          />
        ))}
        {subsystem.consP.map(c => (
          <ConsumptionPoint consPoint={c} sensorsValues={sensorsValues} key={'cons' + c.id} />
        ))}
        {subsystem.monP.map(m => (
          <MonitoringPoint monPoint={m} sensorsValues={sensorsValues} key={'mon' + m.id} />
        ))}
      </LayerGroup>
    </MarkerClusterGroup>
  );
};
