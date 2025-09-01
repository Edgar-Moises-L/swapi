export const characterMap = (data) => {
    return data.map(character => ({
        _id: character._id,
        name: character.name,
        birth_year: character.birth_year,
        eye_color: character.eye_color,
        gender: character.gender,
        hair_color: character.hair_color,
        height: character.height,
        mass: character.mass,
        skin_color: character.skin_color,
        homeworld: character.homeworld?.name || "Unknown",
        homeworld_id: character.homeworld?._id || "Unknown",
        species: character.species?.name || "Unknown",
        species_id: character.species?._id || "Unknown",
        films: character.films?.map(f => f.title).join(", ") || "None",
        films_id: character.films?.map(f => f._id) || "None",
        starships: character.starships?.map(s => s.name).join(", ") || "None",
        starships_id: character.starships?.map(s => s._id) || "None",
        vehicles: character.vehicles?.map(v => v.name).join(", ") || "None",
        vehicles_id: character.vehicles?.map(v => v._id) || "None"
    }));
}
