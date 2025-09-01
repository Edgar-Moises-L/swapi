import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";


function Buscador({ onSearch }) {
  const [input, setInput] = useState("");

  const submit = (ev) => {
    ev?.preventDefault();
    onSearch && onSearch(input.trim());
  };
  const clear = () => setInput("");

  return (
    <Box display="flex" justifyContent="center" mb={2}>
      <Paper
        component="form"
        onSubmit={submit}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 520,
          borderRadius: "10px",
          p: "4px 8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          bgcolor: "#fff",
          border: "2px solid #b9b9b9ff",
        }}
      >
        <IconButton sx={{ p: 0.5 }} aria-label="buscar">
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1, "& input::placeholder": { color: "#5a5a5aff" } }}
          placeholder="Búsqueda"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          inputProps={{ "aria-label": "buscar" }}
        />

        {input && (
          <IconButton onClick={clear} sx={{ p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
}

export default Buscador;
