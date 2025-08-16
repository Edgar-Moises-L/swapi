import { fetchDataPersonajes, fetchPlaneta } from "./API";

export const PersonajesMapper = async () => {
    const data = await fetchDataPersonajes();
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
                planetaNacimiento: nombrePlaneta,
                peliculas: p.films ,
                vehiculos: p.vehicles ,
                naves: p.starships , 
            };
        })
    );
    return personajesMappeados;
};