import { useState, useEffect } from 'react';
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
  const [peliculas, setPeliculas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [naves, setNaves] = useState([]);

  useEffect(() => {
    if (!content) return;

    const cargarDatos = async () => {
      try {
        const titulosPeliculas = await Promise.all(
          content.peliculas.map(url => fetchPelicula(url))
        );
        const nombresVehiculos = await Promise.all(
          content.vehiculos.map(url => fetchVeiculo(url))
        );
        const nombresNaves = await Promise.all(
          content.naves.map(url => fetchNave(url))
        );

        setPeliculas(titulosPeliculas);
        setVehiculos(nombresVehiculos);
        setNaves(nombresNaves);
        console.log(peliculas);
      } catch (e) {
        console.error(e);
      }
    };

    cargarDatos();
  }, [content]);

  if (!content) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h5" fontWeight="bold" gutterBottom>
          Información del Personaje
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Películas:
        </Typography>
        {peliculas.map((title, i) => (
          <Typography key={i}>- {title}</Typography>
        ))}

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Vehículos:
        </Typography>
        {vehiculos.map((name, i) => (
          <Typography key={i}>- {name}</Typography>
        ))}

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Naves:
        </Typography>
        {naves.map((name, i) => (
          <Typography key={i}>- {name}</Typography>
        ))}
      </Box>
    </Modal>
  );
}
