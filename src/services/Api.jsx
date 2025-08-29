const BASE_URL = 'http://localhost:5100/api';

export const fetchData = async (url, controller) => {
  try {
    const response = await fetch(BASE_URL + url, { signal: controller.signal });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido");
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }
    throw error;
  }
};
