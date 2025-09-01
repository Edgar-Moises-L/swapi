import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Typography,
  Stack,
  Avatar,
  Tooltip
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import StorageIcon from '@mui/icons-material/Storage';
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
  searchComponent,
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
    set_id(row._id ?? row[id]);
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
    <Paper
      elevation={6}
      sx={{
        m: 9,
        borderRadius: 2,
        p: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
          
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: '#3b5bd3', width: 44, height: 44 }}>
            <StorageIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              textTransform: 'none',
              borderRadius: 6,
              boxShadow: 'none',
              px: 2,
              bgcolor: '#eef2ff',
              color: '#3b5bd3',
              '&:hover': { bgcolor: '#e3e8ff' }
            }}
          >
            Agregar registro
          </Button>

        </Stack>

      </Box>
{searchComponent && (
          <Box sx={{
            width: '100%',
            mt: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            px: 1
          }}>
            {searchComponent}
          </Box>
        )}
      <TableContainer sx={{ maxHeight: 520 }}>
        
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ height: 60 }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    backgroundColor: '#33409E',
                    color: '#fff',
                    fontSize: 14,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow sx={{ height: 360 }}>
                <TableCell colSpan={columns.length} align="center" sx={{ borderBottom: 'none' }}>
                  <Typography variant="h6" sx={{ color: '#cfcfcf', fontWeight: 700 }}>
                    No existen registros
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover tabIndex={-1} key={row[id] ?? row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ px: 2 }}>
                          <Tooltip title="Ver">
                            <IconButton
                              onClick={() => handleView(row)}
                              size="small"
                              sx={{
                                bgcolor: '#eef6ff',
                                width: 36,
                                height: 36,
                                mr: 1
                              }}
                            >
                              <VisibilityIcon sx={{ fontSize: 18, color: '#286cffff' }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Editar">
                            <IconButton
                              onClick={() => handleEdit(row)}
                              size="small"
                              sx={{
                                bgcolor: '#fff7ed',
                                width: 36,
                                height: 36,
                                mr: 1
                              }}
                            >
                              <EditIcon sx={{ fontSize: 18, color: '#db7a00' }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Eliminar">
                            <IconButton
                              onClick={() => handleDelete(row)}
                              size="small"
                              sx={{
                                bgcolor: '#fff5f5',
                                width: 36,
                                height: 36
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: 18, color: '#ff4c4cff' }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align} sx={{ px: 3, py: 2 }}>
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

      <Box
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={Math.max(0, page - 1)}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage={''}
        />
      </Box>

      <EliminarModal
        open={modalOpen}
        onClose={handleCloseModal}
        url={`${url}/${_id}`}
        refreshData={refreshData}
      />

      {FormComponent && (
        <FormComponent
          open={formOpen}
          onClose={() => setFormOpen(false)}
          initialValues={selectedRow}
          mode={formMode}
          refreshData={refreshData}
        />
      )}
    </Paper>
  );
}

export default DataTable;