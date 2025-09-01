import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import PeopleIcon from "@mui/icons-material/People";
import MovieIcon from "@mui/icons-material/Movie";
import PublicIcon from "@mui/icons-material/Public";
import PetsIcon from "@mui/icons-material/Pets";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function SideMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("drawerOpen");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("drawerOpen", open);
  }, [open]);

  const menuItems = [
    { text: "Personajes", icon: <PeopleIcon />, path: "/characters" },
    { text: "Películas", icon: <MovieIcon />, path: "/films" },
    { text: "Planetas", icon: <PublicIcon />, path: "/planets" },
    { text: "Especies", icon: <PetsIcon />, path: "/species" },
    { text: "Vehículos", icon: <DirectionsCarIcon />, path: "/vehicles" },
    { text: "Naves Espaciales", icon: <RocketLaunchIcon />, path: "/starships" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 50,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 200 : 50,
          boxSizing: "border-box",
          backgroundColor: "#000",
          color: "#fff",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },

      }}
    >
      <Box sx={{ mt: 1, display: "flex", justifyContent: open ? "flex-end" : "center", px: 1 }}>
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: "#020202ff", backgroundColor: "#fffdfdff", borderRadius: "50%", "&:hover": { backgroundColor: "#333" } }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>


      <Box sx={{ mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
