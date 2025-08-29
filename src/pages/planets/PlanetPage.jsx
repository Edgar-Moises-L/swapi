import { columns } from './planetsTableColumns.js'
import { useEffect } from 'react';
import { planetsMap } from './PlanetMap.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';

function PlanetPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/planets?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? planetsMap(data.docs) : [];

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setUrl(`/planets?page=${page}&limit=${limit}`);
        }
    }, [error]);

    const search = (name) => {
        if (name.trim() === "") {
            setUrl(`/planets?page=${page}&limit=${limit}`);
        } else {
            setUrl(`/planets/search/${name}`);
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
            <h1>Planetas</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </Paper>
    )
}
export default PlanetPage;