import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import { tankSVG } from '../svg/tankSVG';
import './leaflet.css';
import data1 from '../../data/water-supply.json';
import data2 from '../../data/water-supply2.json';
import data3 from '../../data/water-supply3.json';
import { twoTanksSVG } from '../svg/two-tanksSVG';

const pipe = [
  [40.641147, -8.642258],
  [40.642408, -8.645743],
  [40.639421, -8.650774],
  [40.635657, -8.655663],
  [40.628415, -8.644215]
];

export const LeafletContainer = () => {
  const [data, setData] = useState(data1);
  const [oldData, setOldData] = useState(data1);

  useEffect(() => {
    const secondData = setTimeout(() => {
      setData(data2);
      setOldData(data1);
    }, 5000);
    return () => {
      clearTimeout(secondData);
    };
  }, []);

  useEffect(() => {
    const thirdData = setTimeout(() => {
      setData(data3);
      setOldData(data2);
    }, 10000);
    return () => {
      clearTimeout(thirdData);
    };
  }, []);

  useEffect(() => {
    const firstData = setTimeout(() => {
      setData(data1);
      setOldData(data3);
    }, 15000);
    return () => {
      clearTimeout(firstData);
    };
  }, []);

  const pipeOptions = { color: 'blue', weight: 4 };

  return (
    <div className='leaflet-map-container'>
      <MapContainer
        style={{ height: '80vh' }}
        center={[40.6368, -8.6493]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          className='map-tiles'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {data.features.map((item, i) => {
          if (item.properties.category === 'tank') {
            return (
              <Marker
                position={item.geometry.coordinates}
                icon={tankSVG(item.properties.value, oldData.features[item.id].properties.value)}
                className='tank1'
                key={item.properties.id}
              ></Marker>
            );
          }
          if (item.properties.category === 'two-tanks') {
            return (
              <Marker
                position={item.geometry.coordinates}
                icon={twoTanksSVG(
                  item.properties.value,
                  oldData.features[item.id].properties.value
                )}
                className='tank1'
                key={item.properties.id}
              ></Marker>
            );
          }
        })}

        <Polyline pathOptions={pipeOptions} positions={pipe} />
      </MapContainer>
    </div>
  );
};
