import { columns } from './speciesTableColumns.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';

const url = '/species';
const id = "name";

function SpeciesPage() {
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
            <h1>Especies</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default SpeciesPage;