import { columns } from './speciesTableColumns.js'
import { speciesMap } from './speciesMap.js';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';

function SpeciesPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const id = "name";
    const url = `/species?page=${page}&limit=${limit}`;
    const { data, loading, error } = useFetch(url);
    let rows;

    if (Array.isArray(data.docs)) {
        rows = speciesMap(data.docs);
        console.log(rows)
    } else {
        rows = [];
    }

    if (loading) return <div>Cargando ....</div>

    if (error) return <div> Error: {error}</div>

    return (
        <Paper sx={{ m: 4, background: '#f0efeff3' }}>
            <Menu />
            <h1>Especies</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </Paper>
    )
}
export default SpeciesPage;