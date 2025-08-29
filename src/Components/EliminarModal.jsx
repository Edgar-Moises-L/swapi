import { Modal, Box, Typography, Button } from '@mui/material';

function EliminarModal({ open, onClose, title }) {
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
                    {title}
                </Typography>
                <Button variant="contained" onClick={onClose}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
}

export default CustomModal;
