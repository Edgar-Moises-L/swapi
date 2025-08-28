import { columns } from './filmTableColumns.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';

const url = '/films';
const id = "title";

function FilmPage() {
    const { data, loading, error } = useFetch(url);
    let rows;

    if (Array.isArray(data)) {
        rows = data;
    } else {
        rows = [];
    }

    if (loading) return <div>Cargando ....</div>

    if (error) return <div> Error: {error}</div>

    return (
        <>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}

export default FilmPage;