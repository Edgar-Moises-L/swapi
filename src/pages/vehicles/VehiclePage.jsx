import { columns } from './vehiclesTableColumns.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';

const url = '/vehicles';
const id = "name";

function VehiclePage() {
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
            <h1>Veiculos</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default VehiclePage;