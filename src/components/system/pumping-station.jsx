import { useMap } from 'react-leaflet';
import { PumpStMarker } from '../markers/pump-marker';
import { PumpStElevationMarker } from '../markers/pump-el-marker';
import { useCallback, useEffect, useState } from 'react';
import { pumpStSubTypeEl } from '../../constants/types';
import { newPumpCoord } from '../../utils/shift-coordinates';

export const PumpingStation = ({ pumpSt, sensorsValues }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const coordinates = newPumpCoord(pumpSt.latlong, pumpSt.subtype, pumpSt.shift_index, zoom);

  const onZoom = useCallback(() => {
    let currentZoom = map.getZoom();
    if (currentZoom > 13) {
      setZoom(currentZoom);
    }
  }, [map]);

  useEffect(() => {
    map.on('zoomend', onZoom);

    return () => {
      map.off('zoomend', onZoom);
    };
  }, [map, onZoom]);

  return (
    <div className='system-container'>
      {pumpSt.subtype.toLowerCase() === pumpStSubTypeEl.toLowerCase() ? (
        <PumpStElevationMarker
          position={coordinates}
          pumpSt={pumpSt}
          sensorsValues={sensorsValues}
        />
      ) : (
        <PumpStMarker position={coordinates} pumpSt={pumpSt} sensorsValues={sensorsValues} />
      )}
    </div>
  );
};
