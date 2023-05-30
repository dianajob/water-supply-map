import { pumpStElevation } from '../constants/types';

export const newPumpCoord = (coord, type, shift, zoom) => {
  const i = zoom > 14 ? Math.pow(2, 18 - zoom) : 16;
  const topMeters = type && type.toLowerCase() === pumpStElevation ? 0 : -18 * i;
  const leftMeters =
    type && type.toLowerCase() === pumpStElevation
      ? shift.tankCells * 10 * i
      : -50 * i + shift.index * 50 * i;

  const earth = 6378.137; //radius of the earth in kilometer
  const pi = Math.PI;
  const m_lat = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree

  const new_latitude = coord[0] + topMeters * m_lat;

  const cos = Math.cos;
  const m_long = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree

  const new_longitude = coord[1] + (leftMeters * m_long) / (cos(coord[0] * (pi / 180)) + 1e-12);
  console.log('inside function shif', new_latitude, new_longitude);
  return [new_latitude, new_longitude];
};
