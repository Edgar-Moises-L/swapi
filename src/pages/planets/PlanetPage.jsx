import { columns } from './planetsTableColumns.js'
import { planetsMap } from './PlanetMap.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';

function PlanetPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const id = "name";
    const url = `/planets?page=${page}&limit=${limit}`;
    const { data, loading, error } = useFetch(url);
    let rows;

    if (Array.isArray(data.docs)) {
        rows = planetsMap(data.docs);
        console.log(rows)
    } else {
        rows = [];
    }

    if (loading) return <div>Cargando ....</div>

    if (error) return <div> Error: {error}</div>

    return (
        <>
            <h1>Planetas</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default PlanetPage;