import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" color="textSecondary">
        Cargando...
      </Typography>
    </Box>
  );
}
