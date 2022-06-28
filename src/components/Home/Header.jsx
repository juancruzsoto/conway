import { Stack, Button } from "@mui/material";
import React from "react";
import "./css/header.css";

const Header = () => {
  return (
    <div className="header">
      <Stack spacing={2} direction="row">
        <Button variant="contained">Iniciar</Button>
        <Button variant="contained">Detener</Button>
        <Button variant="contained">Reiniciar</Button>
      </Stack>
    </div>
  );
};

export default Header;
