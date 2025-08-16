import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import { PersonajesMapper } from '../services/PersonajesMapper';
import BasicModal from "../Components/Modal";
import Buscador from '../Components/buscador';

const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 150, align: 'left' },
  { id: 'altura', label: 'Altura', minWidth: 70, align: 'center' },
  { id: 'peso', label: 'Peso', minWidth: 70, align: 'center' },
  { id: 'colorCabello', label: 'Color de Cabello', minWidth: 120, align: 'center' },
  { id: 'colorPiel', label: 'Color de Piel', minWidth: 120, align: 'center' },
  { id: 'colorOjos', label: 'Color de los Ojos', minWidth: 120, align: 'center' },
  { id: 'fechaNacimiento', label: 'Fecha de Nacimiento', minWidth: 110, align: 'center' },
  { id: 'genero', label: 'Género', minWidth: 100, align: 'center' },
  { id: 'planetaNacimiento', label: 'Planeta de Nacimiento', minWidth: 150, align: 'center' },
  { id: 'informacionAdicional', label: 'Información Adicional', minWidth: 130, align: 'center' },
];


function TablaPersonaje() {
  const [personajes, setPersonajes] = useState([]);
  const [allPersonajes, setAllPersonajes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const cargarPersonajes = async () => {
      const data = await PersonajesMapper();
      setPersonajes(data);
      setAllPersonajes(data);
    };
    cargarPersonajes();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setPersonajes(allPersonajes);
    } else {
      const filtered = allPersonajes.filter((p) =>
        p.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setPersonajes(filtered);
    }
    setPage(0);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{
      width: '90%',
      overflow: 'hidden',
      m: 10,
      background: '#f0efeff3'
    }}>
      <Buscador onSearch={handleSearch} />

      <TableContainer sx={{
        maxHeight: 700
      }}>

        <Table stickyHeader aria-label="tabla de personajes">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#b0ccd3e3', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {personajes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.nombre}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "informacionAdicional") {
                      return (
                        <TableCell key={column.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleOpenModal(row)}
                          >
                            Ver más
                          </Button>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={personajes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <BasicModal
        open={openModal}
        handleClose={handleCloseModal}
        content={selectedRow}
      />
    </Paper>
  );
}

export default TablaPersonaje;
