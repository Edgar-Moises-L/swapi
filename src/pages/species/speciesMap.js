export const speciesMap = (data) => {
    return data.map(species => ({
        _id: species._id,
        name: species.name,
        classification: species.classification,
        designation: species.designation,
        average_height: species.average_height,
        average_lifespan: species.average_lifespan,
        eye_color: species.eye_color,
        hair_color: species.hair_color,
        skin_color: species.skin_color,
        language: species.language,
        homeworld: species.homeworld?.name || "Unknown"
    }));
}
