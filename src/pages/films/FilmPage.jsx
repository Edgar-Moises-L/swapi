import { columns } from './filmTableColumns.js'
import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useState } from 'react';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Paper from '@mui/material/Paper';
import Buscador from '../../Components/Buscador.jsx';
import CustomModal from '../../Components/Modal.jsx';
import Loading from '../../Components/Loading.jsx';

function FilmPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [url, setUrl] = useState(`/films?page=${page}&limit=${limit}`);
    const [modalOpen, setModalOpen] = useState(false);
    const { data, loading, error } = useFetch(url);
    const id = "title";
    let rows = Array.isArray(data?.docs) ? data.docs : [];
    console.log(rows)

    useEffect(() => {
        if (error === "No se encontraron resultados") {
            setModalOpen(true);
            setUrl(`/films?page=${page}&limit=${limit}`);
        }
    }, [error]);
        const handleCloseModal = () => {
        setModalOpen(false);
    };

    const search = (title) => {
        if (title.trim() === "") {
            setUrl(`/films?page=${page}&limit=${limit}`);
        } else {
            setUrl(`/films/search/${title}`);
        }
    };

      if (loading)return (<Loading/>);

    if (error && error !== "No se encontraron resultados") {
        return <div>Error: {error}</div>;
    }

    return (
        <Paper sx={{ m: 4, background: '#f0efeff3' }}>
            <Menu />
            <h1>Peliculas</h1>
            <Buscador onSearch={search} />
            <DataTable columns={columns} id={id} rows={rows} />
                        <CustomModal
                open={modalOpen}
                onClose={handleCloseModal}
                title="No se encontraron resultados"
            />
        </Paper>
    )
}

export default FilmPage;