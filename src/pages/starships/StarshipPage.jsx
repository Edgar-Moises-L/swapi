import { columns } from './starshipsTableColumns.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';

const url = '/starships';
const id = "name";

function StarshipPage() {
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
            <h1>Naves Espaciales</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default StarshipPage;