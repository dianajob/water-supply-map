import { useMap } from 'react-leaflet';
import { PumpStMarker } from '../markers/pump-marker';
import { useCallback, useEffect, useState } from 'react';
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

  return <PumpStMarker position={coordinates} pumpSt={pumpSt} sensorsValues={sensorsValues} />;
};
