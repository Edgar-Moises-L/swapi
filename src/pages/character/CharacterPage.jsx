import { columns } from './characterTableColumns.js'
import {characterMap} from './characterMap.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';

function CharacterPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const id = "name";
    const url = `/characters?page=${page}&limit=${limit}`;
    const { data, loading, error } = useFetch(url);
    let rows;

     if (Array.isArray(data.docs)) {
        rows = characterMap(data.docs);
        console.log(rows)
    } else {
        rows = [];
    }

    if (loading) return <div>Cargando ....</div>

    if (error) return <div> Error: {error}</div>

    return (
        <>
            <h1>Personajes</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default CharacterPage;