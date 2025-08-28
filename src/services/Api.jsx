const BASE_URL = 'https://swapi.info/api';

export const fetchData = async (url, controller) => {
  try {
    const response = await fetch(BASE_URL + url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }
    throw error;
  }
};


