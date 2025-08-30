import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RowDetailsDrawer({ open, onClose, row, columns,title }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 400, padding: 20 }}>
        <h2>Detalle {title}</h2>
        {row && columns.map((column) => (
          column.id !== 'actions' && (
            <TextField
              key={column.id}
              label={column.label}
              value={row[column.id] || ''}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          )
        ))}
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: 20 }}
        >
          Guardar
        </Button>
      </div>
    </Drawer>
  );
}

export default RowDetailsDrawer;
