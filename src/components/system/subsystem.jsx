import { LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { createClusterCustomIcon } from '../svg/cluster-icon';
import { ConsumptionPoint } from '../markers/consumption-point';
import { MonitoringPoint } from '../markers/monitoring-point';
import { PumpingStation } from './pumping-station';
import { Tank } from '../markers/tank-marker';

export const Subsystem = ({ subsystem }) => {
  return (
    <MarkerClusterGroup
      spiderfyOnMaxZoom={false}
      disableClusteringAtZoom={14}
      maxClusterRadius={200}
      onClick={e => console.log('cluster-click', e.layer.getAllChildMarkers(), e, e.layer)}
      iconCreateFunction={cluster => createClusterCustomIcon(cluster, subsystem)}
    >
      <LayerGroup>
        {subsystem.tanks.map(infrastructure => (
          <Tank tank={infrastructure} pumpList={subsystem.pumpSt} />
        ))}
        {subsystem.pumpSt.map((infrastructure, i) => (
          <PumpingStation pumpSt={infrastructure} index={i} />
        ))}
        {subsystem.consP.map(infrastructure => (
          <ConsumptionPoint consPoint={infrastructure} />
        ))}
        {subsystem.monP.map(infrastructure => (
          <MonitoringPoint monPoint={infrastructure} />
        ))}
      </LayerGroup>
    </MarkerClusterGroup>
  );
};
