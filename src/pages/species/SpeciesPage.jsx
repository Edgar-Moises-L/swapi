import { columns } from './speciesTableColumns.js'
import { useEffect } from 'react';
import { speciesMap } from './speciesMap.js';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';
import CustomModal from '../../Components/Modal.jsx';
import Loading from '../../Components/Loading.jsx';

function SpeciesPage() {
    const url_base = "/species";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [url, setUrl] = useState(`/species?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? speciesMap(data.docs) : [];

    const refreshData = () => {
        setUrl(`/species?page=${page}&limit=${limit}&t=${Date.now()}`);
    };

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setModalOpen(true);
            refreshData();
        }
    }, [error]);
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const search = (name) => {
        if (name.trim() === "") {
           refreshData();
        } else {
            setUrl(`/species/search/${name}`);
        }
    };

    if (loading) return (<Loading />);

    if (error && error !== "No se encontraron resultados") {
        return <div>Error: {error}</div>;
    }

    return (
        <Paper sx={{ m: 4, background: '#f0efeff3' }}>
            <Menu />
            <Buscador onSearch={search} />
             <DataTable
                title = {"Especie"}
                columns={columns}
                id={id}
                rows={rows}
                url={url_base}
                onDeleteSuccess={refreshData}
            />
            <CustomModal
                open={modalOpen}
                onClose={handleCloseModal}
                title="No se encontraron resultados"
            />
        </Paper>
    )
}
export default SpeciesPage;