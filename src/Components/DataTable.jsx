import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DataTable({ columns, id, rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (row) => {
    console.log('Ver', row);
  };

  const handleEdit = (row) => {
    console.log('Editar', row);
  };

  const handleDelete = (row) => {
    console.log('Eliminar', row);
  };

  return (
    <Paper sx={{ m: 4,background: '#f0efeff3' }}>

      <TableContainer sx={{ maxHeight: 1000 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row[id]}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id} align={column.align}>

                          <IconButton color="primary" onClick={() => handleView(row)}>
                            <VisibilityIcon />
                          </IconButton>

                          <IconButton color="primary" onClick={() => handleEdit(row)}>
                            <EditIcon />
                          </IconButton>

                          <IconButton color="error" onClick={() => handleDelete(row)}>
                            <DeleteIcon />
                          </IconButton>

                        </TableCell>
                      );
                    }

                    return (
                      <TableCell //style={{ whiteSpace: 'normal', wordBreak: 'break-word' }} 
                        key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper>
  );

}
export default DataTable;
