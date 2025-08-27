import { createBrowserRouter, Navigate } from "react-router-dom";
import CharacterPage from "../pages/character/CharacterPage.jsx";
import FilmPage from "../pages/films/FilmPage.jsx"
import PlanetPage from "../pages/planets/PlanetPage.jsx"
import SpeciesPage from "../pages/species/SpeciesPage.jsx"
import StarshipPage from "../pages/starships/StarshipPage.jsx"
import VehiclePage from "../pages/vehicles/VehiclePage.jsx"

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to={"/characters"} /> },
    { path: "/characters", element: <CharacterPage /> },
    { path: "/films", element: <FilmPage /> },
    { path: "/planets", element: <PlanetPage /> },
    { path: "/species", element: <SpeciesPage /> },

    { path: "/starships", element: <StarshipPage /> },
    { path: "/vehicles", element: <VehiclePage /> },
    { path: "*", element: <Navigate to={"/characters"} /> },
])