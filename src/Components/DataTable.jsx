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

function DataTable({
  title,
  columns,
  id,
  rows = [],
  url,
  refreshData,
  FormComponent,
  page = 1,
  rowsPerPage = 10,
  totalRows = 0,
  onChangePage,
  onChangeRowsPerPage,
}) {

  const [modalOpen, setModalOpen] = useState(false);
  const [_id, set_id] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formMode, setFormMode] = useState("view");

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

  const handlePageChange = (event, newPageZeroBased) => {
    const newPageOneBased = newPageZeroBased + 1;
    if (onChangePage) onChangePage(newPageOneBased);
  };

  const handleRowsPerPageChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    if (onChangeRowsPerPage) onChangeRowsPerPage(newLimit);
  };

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
          refreshData={refreshData}
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No hay datos
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover tabIndex={-1} key={row[id] ?? row._id}>
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
                        {column.format && typeof value === 'number' ? column.format(value) : (value ?? '')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalRows}     
        rowsPerPage={rowsPerPage}         
        page={Math.max(0, page - 1)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <EliminarModal
        open={modalOpen}
        onClose={handleCloseModal}
        url={`${url}/${_id}`}
        refreshData={refreshData}
      />

    </Paper>
  );
}

export default DataTable;
