import { columns } from './starshipsTableColumns.js'
import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';

function StarshipPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/starships?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? data.docs : [];

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setUrl(`/starships?page=${page}&limit=${limit}`);
        }
    }, [error]);

    const search = (title) => {
        if (title.trim() === "") {
            setUrl(`/starships?page=${page}&limit=${limit}`);
        } else {
            setUrl(`/starships/search/${title}`);
        }
    };

    if (loading) return <div>Cargando ....</div>

    if (error && error !== "No se encontraron resultados") {
        return <div>Error: {error}</div>;
    }

    return (
        <Paper sx={{ m: 4, background: '#f0efeff3' }}>
            <Menu /><Buscador onSearch={search} />
            <h1>Naves Espaciales</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </Paper>
    )
}
export default StarshipPage;