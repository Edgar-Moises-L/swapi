import { columns } from './filmTableColumns.js'
import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Buscador from '../../Components/Buscador.jsx';
import CustomModal from '../../Components/Modal.jsx';
import Loading from '../../Components/Loading.jsx';

function FilmPage() {
    const url_base = "/films";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/films?page=${page}&limit=${limit}`);
    const [modalOpen, setModalOpen] = useState(false);
    const { data, loading, error } = useFetch(url);
    const id = "title";
    let rows = Array.isArray(data?.docs) ? data.docs : [];
    console.log(rows)

    const refreshData = () => {
        setUrl(`/films?page=${page}&limit=${limit}&t=${Date.now()}`);
    };

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setModalOpen(true);
            refreshData()
        }
    }, [error]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const search = (title) => {
        if (title.trim() === "") {
            refreshData()
        } else {
            setUrl(`/films/search/${title}`);
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
                title = {"Pelicula"}
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

export default FilmPage;