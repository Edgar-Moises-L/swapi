import { columns } from './characterTableColumns.js';
import { useEffect, useState } from 'react';
import { characterMap } from './characterMap.js';
import { useFetch } from '../../hooks/useFetch.jsx';

import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';
import CustomModal from '../../Components/Modal.jsx';
import Loading from '../../Components/Loading.jsx';

function CharacterPage() {
    const url_base = "/characters";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/characters?page=${page}&limit=${limit}`);
    const [modalOpen, setModalOpen] = useState(false);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? characterMap(data.docs) : [];

    const refreshData = () => {
        setUrl(`/characters?page=${page}&limit=${limit}&t=${Date.now()}`);
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
            setUrl(`/characters/search/${name}`);
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
                title = {"Personaje"}
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
    );
}

export default CharacterPage;
