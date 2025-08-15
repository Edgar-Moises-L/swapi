const BASE_URL = 'https://swapi.info/api/people';

export const fetchPersonajes = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const PersonajesMapper = async () => {
    const data = await fetchPersonajes();
    return data.map(p => ({
        nombre: p.name,
        altura: p.height,
        peso: p.mass,
        colorCabello: p.hair_color,
        colorPiel: p.skin_color,
        colorOjos: p.eye_color,
        fechaNacimiento: p.birth_year,
        genero: p.gender,
        planetaNacimiento: p.homeworld
    }));
};

