import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { PersonajesMapper } from '../services/API';

const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 10 },
  { id: 'altura', label: 'Altura', minWidth: 10 },
  { id: 'peso', label: 'Peso', minWidth: 10 },
  { id: 'colorCabello', label: 'Color de Cabello', minWidth: 10 },
  { id: 'colorPiel', label: 'Color de Piel', minWidth: 10 },
  { id: 'colorOjos', label: 'Color de los Ojos', minWidth: 10 },
  { id: 'fechaNacimiento', label: 'Fecha de Naciemiento', minWidth: 10 },
  { id: 'genero', label: 'Genero', minWidth: 10 },
  { id: 'planetaNacimiento', label: 'Planeta de Nacimiento', minWidth: 10 }
];

function TablaPersonaje() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const cargarPersonajes = async () => {
      const data = await PersonajesMapper();
      setPersonajes(data);
    };
    cargarPersonajes();
  }, []);

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
      m: 10
    }}>

      <TableContainer sx={{
        maxHeight: 600,
      }}>

        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {personajes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nombre}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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

    </Paper>
  );
}

export default TablaPersonaje