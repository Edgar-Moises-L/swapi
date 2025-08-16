import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, content }) {
  const keysPermitidas = ["peliculas", "vehiculos", "naves"];
  if (!content) return null; 

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6"gutterBottom>
          Información del Personaje
        </Typography>

   

{Object.entries(content)
  .filter(([key]) => keysPermitidas.includes(key)) 
  .map(([key, value]) => (
    <Typography key={key}>
      <strong>{key}:</strong> {value}
    </Typography>
))}


        
      </Box>
    </Modal>
  );
}