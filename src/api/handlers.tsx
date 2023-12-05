const apiPath = `https://vr-test.vendorobotics.com/api`;

export const getTemperatureData = async () => {
  const response = await fetch(`${apiPath}/temperature-data`);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return await response.json();
};

export const getSalesData = async () => {
  const response = await fetch(`${apiPath}/sales-data`);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return await response.json();
};
