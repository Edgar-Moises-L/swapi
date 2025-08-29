export const characterMap = (data) => {
    return data.map(character => ({
        id: character._id,
        name: character.name,
        birth_year: character.birth_year,
        eye_color: character.eye_color,
        gender: character.gender,
        hair_color: character.hair_color,
        height: character.height,
        mass: character.mass,
        skin_color: character.skin_color,
        homeworld: character.homeworld?.name || "Unknown",
        species: character.species?.name || "Unknown",
        films: character.films?.map(f => f.title).join(", ") || "None",
        starships: character.starships?.map(s => s.name).join(", ") || "None",
        vehicles: character.vehicles?.map(v => v.name).join(", ") || "None"
    }));
}
