import { columns } from './characterTableColumns.js'
import { useEffect } from 'react';
import { characterMap } from './characterMap.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';

function CharacterPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/characters?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? characterMap(data.docs) : [];

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setUrl(`/characters?page=${page}&limit=${limit}`);
        }
    }, [error]);

    const search = (name) => {
        if (name.trim() === "") {
            setUrl(`/characters?page=${page}&limit=${limit}`);
        } else {
            setUrl(`/characters/search/${name}`);
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
            <h1>Personajes</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </Paper>
    )
}
export default CharacterPage;