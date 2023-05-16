import { sensors } from './convert-data';

export const findSensor = id => {
  const sensor = sensors.find(s => s.id === id);
  return sensor;
};

export const getValue = id => {
  const sensor = sensors.find(s => s.id === id);
  return sensor ? sensor.value : null;
};
