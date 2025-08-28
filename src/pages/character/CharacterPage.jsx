import { columns } from './characterTableColumns.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';

const url = '/people';
const id = "name";

function CharacterPage() {
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
            <h1>Personajes</h1>
            <DataTable columns={columns} id={id} rows={rows} />
        </>
    )
}
export default CharacterPage;