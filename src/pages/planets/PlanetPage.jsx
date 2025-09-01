import { columns } from './planetsTableColumns.js'
import { useEffect, useState } from 'react';
import { planetsMap } from './PlanetMap.js'
import { useFetch } from '../../hooks/useFetch.jsx';
import DataTable from '../../Components/DataTable.jsx';
import Menu from '../../Components/Menu.jsx';
import Buscador from '../../Components/Buscador.jsx';
import CustomModal from '../../Components/Modal.jsx';
import Loading from '../../Components/Loading.jsx';
import FormComponent from './Formulario.jsx'

function PlanetPage() {
    const url_base = "/planets";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [url, setUrl] = useState(`/planets?page=${page}&limit=${limit}`);
    const { data, loading, error } = useFetch(url);
    const id = "name";
    let rows = Array.isArray(data?.docs) ? planetsMap(data.docs) : [];

    const refreshData = () => {
        setUrl(`/planets?page=${page}&limit=${limit}&t=${Date.now()}`);
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

    const search = (title) => {
        if (title.trim() === "") {
            setPage(1);
            setUrl(`/planets?page=1&limit=${limit}`);
        } else {
            setPage(1);
            setUrl(`/planets/search/${title}?page=1&limit=${limit}`);
        }
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
        setUrl(`/planets?page=${newPage}&limit=${limit}`);
    };

    const handleChangeRowsPerPage = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
        setUrl(`/planets?page=1&limit=${newLimit}`);
    };

    if (loading) return (<Loading />);

    if (error && error !== "No se encontraron resultados") {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Menu />
            <DataTable
                title={"Planetas"}
                columns={columns}
                id={id}
                rows={rows}
                url={url_base}
                refreshData={refreshData}
                FormComponent={FormComponent}
                page={page}
                rowsPerPage={limit}
                totalRows={data?.totalDocs ?? 0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                 searchComponent={<Buscador onSearch={search} />}
            />
            <CustomModal
                open={modalOpen}
                onClose={handleCloseModal}
                title="No se encontraron resultados"
            />
        </>
    )
}
export default PlanetPage;