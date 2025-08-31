import { useState } from 'react';
import { Button } from "@mui/material"
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
import EliminarModal from './EliminarModal.jsx';



function DataTable({ title, columns, id, rows, url, onDeleteSuccess, FormComponent }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [_id, set_id] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formMode, setFormMode] = useState("view");


  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    setFormMode("create");
    setFormOpen(true);
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setFormMode("view");
    setFormOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (row) => {
    setModalOpen(true);
    set_id(row._id);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <Paper sx={{ m: 4, background: '#f0efeff3' }}>
      <h1>{title + "s"}</h1>
      <Button variant="contained" onClick={() => handleCreate()}>+ Agregar</Button>

      {FormComponent && (
        <FormComponent
          open={formOpen}
          onClose={() => setFormOpen(false)}
          initialValues={selectedRow}
          mode={formMode}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}


      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
                <TableRow hover tabIndex={-1} key={row[id]}>
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
                      <TableCell key={column.id} align={column.align}>
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

      <EliminarModal
        open={modalOpen}
        onClose={handleCloseModal}
        url={`${url}/${_id}`}
        onDeleteSuccess={onDeleteSuccess}
      />

    </Paper>
  );
}

export default DataTable;
