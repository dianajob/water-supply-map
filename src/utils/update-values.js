export const updateValues = (valueobj, updatedSensors) => {
  return Object.keys(valueobj).reduce((acc, key) => {
    acc[key] = { y: updatedSensors[key].y, prevValue: valueobj[key].y };
    return acc;
  }, {});
};
