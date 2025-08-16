const BASE_URL = 'https://swapi.info/api/people';
const cachePlanetas = {};
const cachePelicula = {};
const cacheVeiculo = {};
const cacheNave = {};

export const fetchDataPersonajes = async () => {
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

export const fetchPelicula = async (url) => {
    if (cachePelicula[url]) {
        return cachePelicula[url];
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        cachePelicula[url] = data.title;
        return data.title;
    } catch (error) {
        console.error(error);
        return "Desconocido";
    }
};

export const fetchVeiculo = async (url) => {
    if (cacheVeiculo[url]) {
        return cacheVeiculo[url];
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        cacheVeiculo[url] = data.name;
        return data.name;
    } catch (error) {
        console.error(error);
        return "Desconocido";
    }
};

export const fetchNave = async (url) => {
    if (cacheNave[url]) {
        return cacheNave[url];
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        cacheNave[url] = data.name;
        return data.name;
    } catch (error) {
        console.error(error);
        return "Desconocido";
    }
};