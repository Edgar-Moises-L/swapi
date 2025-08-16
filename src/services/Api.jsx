const BASE_URL = 'https://swapi.info/api/people';
const cachePlanetas = {};

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

export const fetchPlaneta = async (url) => {
    if (cachePlanetas[url]) {
        return cachePlanetas[url];
    }
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        cachePlanetas[url] = data.name;
        return data.name; 
    } catch (error) {
        console.error(error);
        return "Desconocido";
    }
};


export const PersonajesMapper = async () => {
    const data = await fetchPersonajes();
    const personajesMappeados = await Promise.all(

        data.map(async p => {
            const nombrePlaneta = await fetchPlaneta(p.homeworld);

            return {
                nombre: p.name,
                altura: p.height,
                peso: p.mass,
                colorCabello: p.hair_color,
                colorPiel: p.skin_color,
                colorOjos: p.eye_color,
                fechaNacimiento: p.birth_year,
                genero: p.gender,
                planetaNacimiento: nombrePlaneta
            };
        })
    );

    return personajesMappeados;
};
