export const planetsMap = (data) => {
    return data.map(planet => ({
        id: planet._id,
        name: planet.name,
        diameter: planet.diameter,
        rotation_period: planet.rotation_period,
        orbital_period: planet.orbital_period,
        gravity: planet.gravity,
        surface_water: planet.surface_water,
        population: planet.population,
        climate: planet.climate,
        terrain: planet.terrain,
        residents: planet.residents?.map(r => r.name).join(", ") || []
    }));
}
