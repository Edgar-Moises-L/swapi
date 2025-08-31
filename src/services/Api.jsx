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

export const deleteData = async (url) => {
  try {
    const response = await fetch(BASE_URL + url, {method: "DELETE"});

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar");
    }

    return await response.json().catch(() => null);
  } catch (error) {
    throw error;
  }
};


export const postData = async (url, data) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al agregar");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al editar");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchList = async (url) => {
  try {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido");
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    throw error;
  }
};
