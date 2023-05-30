import { useEffect, useState } from 'react';
import { LayerGroup, Polyline, useMap } from 'react-leaflet';
import { useCallback } from 'react';
import { newPumpCoord } from '../../utils/shift-coordinates';

import './pipe.scss';

export const Pipes = ({ pipes, subpipes, sensorsValues }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  const onZoom = useCallback(() => {
    let currentZoom = map.getZoom();
    if (currentZoom > 12) {
      setZoom(currentZoom);
    }
  }, [map]);

  useEffect(() => {
    map.on('zoomend', onZoom);

    return () => {
      map.off('zoomend', onZoom);
    };
  }, [map, onZoom]);

  const pipeBorderOptions = { color: 'rgb(129, 128, 128)', weight: 6 };

  const returnPosition = position => {
    const startPos =
      position.type === 'PumpingStation'
        ? newPumpCoord(position.latlong, position.subtype, position.shift_index, zoom)
        : position.latlong;

    return startPos;
  };

  const checkPipeIsOn = (start, end) => {
    if (start.type.toLowerCase() === 'tank') {
      return end.sensorslist.filter(s => sensorsValues?.[s].y > 0).length > 0;
    }
    return start.sensorslist.filter(s => sensorsValues?.[s].y > 0).length > 0;
  };

  const pipesShifted = pipes.map(p => {
    return {
      ...p,
      startnode: returnPosition(p.startnode),
      endnode: returnPosition(p.endnode),
      isOn: checkPipeIsOn(p.startnode, p.endnode)
    };
  });

  const subPipesWithStatus = subpipes.map(p => {
    const isOn =
      p.start.sensors.find(s => sensorsValues?.[s].y > 0) &&
      p.end.sensors.find(s => sensorsValues?.[s].y > 0);
    console.log(isOn);
    return {
      ...p,
      isOn: isOn
    };
  });

  return zoom > 13 ? (
    <div className='pipe-container'>
      {pipesShifted.length > 0 &&
        pipesShifted.map((pipe, i) => (
          <LayerGroup key={'pipe' + i}>
            <Polyline
              pathOptions={pipeBorderOptions}
              positions={
                pipe.between
                  ? [pipe.startnode, ...pipe.between, pipe.endnode]
                  : [pipe.startnode, pipe.endnode]
              }
            />
            <Polyline
              pathOptions={{
                color: pipe.isOn ? '#085e8d' : 'rgb(77, 77, 77)',
                weight: 3
              }}
              positions={
                pipe.between
                  ? [pipe.startnode, ...pipe.between, pipe.endnode]
                  : [pipe.startnode, pipe.endnode]
              }
            />
            {pipe.isOn && (
              <Polyline
                className='water-flow'
                positions={
                  pipe.between
                    ? [pipe.startnode, ...pipe.between, pipe.endnode]
                    : [pipe.startnode, pipe.endnode]
                }
              />
            )}
          </LayerGroup>
        ))}
    </div>
  ) : (
    <div className='pipe-container'>
      {subPipesWithStatus.length > 0 &&
        subPipesWithStatus.map((pipe, i) => (
          <LayerGroup key={'subpipe' + i}>
            <Polyline
              pathOptions={pipeBorderOptions}
              positions={[pipe.start.latlong, pipe.end.latlong]}
            />
            <Polyline
              pathOptions={{
                color: pipe.isOn ? '#085e8d' : 'rgb(77, 77, 77)',
                weight: 3
              }}
              positions={[pipe.start.latlong, pipe.end.latlong]}
            />
            {pipe.isOn && (
              <Polyline className='water-flow' positions={[pipe.start.latlong, pipe.end.latlong]} />
            )}
          </LayerGroup>
        ))}
    </div>
  );
};
