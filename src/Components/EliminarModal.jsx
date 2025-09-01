import { Modal, Box, Typography, Button } from '@mui/material';
import { deleteData } from '../services/Api.jsx';

function EliminarModal({ open, onClose, url, refreshData }) {
 const handleConfirmDelete = async () => {
  try {
    await deleteData(url);   
    onClose(); 
    if (refreshData) refreshData();
  } catch (error) {
    console.error("Error eliminando:", error.message);
  }
};


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h6" gutterBottom>
          ¿Está seguro que quiere eliminar este registro?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Sí
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EliminarModal;
