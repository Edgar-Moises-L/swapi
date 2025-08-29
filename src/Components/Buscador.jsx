import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';

function Buscador({ onSearch }) {
    const [input, setInput] = useState('');

    const handleClick = () => {
        if (onSearch) {
            onSearch(input);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <TextField
                variant="outlined"
                placeholder="Buscar"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <Button variant="contained" onClick={handleClick} sx={{ ml: 1 }}>
                Buscar
            </Button>
        </Box>
    );
}

export default Buscador;
