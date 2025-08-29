import { columns } from './speciesTableColumns.js'
import { useEffect } from 'react';
import { speciesMap } from './speciesMap.js';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';

function SpeciesPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/species?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? speciesMap(data.docs) : [];

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setUrl(`/species?page=${page}&limit=${limit}`);
        }
    }, [error]);

    const search = (name) => {
        if (name.trim() === "") {
            setUrl(`/species?page=${page}&limit=${limit}`);
        } else {
            setUrl(`/species/search/${name}`);
        }
    };

    if (loading) return <div>Cargando ....</div>

    if (error && error !== "No se encontraron resultados") {
        return <div>Error: {error}</div>;
    }

    return (
        <Paper sx={{ m: 4, background: '#f0efeff3' }}>
            <Menu />
            <Buscador onSearch={search} />
            <h1>Especies</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </Paper>
    )
}
export default SpeciesPage;