import { useEffect, useState } from 'react';
import { LayerGroup, Polyline, useMap } from 'react-leaflet';
import { useCallback } from 'react';
import { findSensor } from '../../utils/sensors';
import { newPumpCoord } from '../../utils/shift-coordinates';

export const Pipes = ({ pipes, subpipes, sensorsValues }) => {
  const pipeOptions = status => ({
    color: status ? '#085e8d' : 'rgb(77, 77, 77)',
    weight: 3
  });

  const pipeBorderOptions = { color: 'rgb(129, 128, 128)', weight: 6 };

  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  const onZoom = useCallback(() => {
    let currentZoom = map.getZoom();
    setZoom(currentZoom);
  }, [map]);

  useEffect(() => {
    map.on('zoomend', onZoom);

    return () => {
      map.off('zoomend', onZoom);
    };
  }, [map, onZoom]);

  const returnPosition = position => {
    const startPos =
      position.type === 'PumpingStation'
        ? newPumpCoord(position.latlong, position.subtype, position.shift_index, zoom)
        : position.latlong;

    /*  const endPos =
      end.type === 'PumpingStation'
        ? newPumpCoord(end.latlong, end.subtype, end.shift_index)
        : end.latlong; */

    return startPos;
  };

  const checkPipeIsOn = (start, end) => {
    if (start.type.toLowerCase() === 'tank') {
      return end.sensorslist.filter(s => sensorsValues?.[s].y > 0).length > 0;
    }
    return start.sensorslist.filter(s => sensorsValues?.[s].y > 0).length > 0;
  };

  const pipesShifted = pipes.map(p => ({
    startnode: returnPosition(p.startnode),
    endnode: returnPosition(p.endnode),
    isOn: checkPipeIsOn(p.startnode, p.endnode)
  }));

  return zoom > 13 ? (
    <div className='pipe-container'>
      {pipesShifted.length > 0 &&
        pipesShifted.map((pipe, i) => (
          <LayerGroup key={'pipe' + i}>
            <Polyline pathOptions={pipeBorderOptions} positions={[pipe.startnode, pipe.endnode]} />
            <Polyline
              pathOptions={{
                color: pipe.isOn ? '#085e8d' : 'rgb(77, 77, 77)',
                weight: 3
              }}
              positions={[pipe.startnode, pipe.endnode]}
            />
            {pipe.isOn && (
              <Polyline className='water-flow' positions={[pipe.startnode, pipe.endnode]} />
            )}
          </LayerGroup>
        ))}
    </div>
  ) : (
    <div className='pipe-container'>
      <LayerGroup>
        <Polyline pathOptions={pipeBorderOptions} positions={subpipes} />
        <Polyline
          pathOptions={{
            color: '#085e8d',
            weight: 3
          }}
          positions={subpipes}
        />
        <Polyline className='water-flow' positions={subpipes} />
      </LayerGroup>
    </div>
  );
};
