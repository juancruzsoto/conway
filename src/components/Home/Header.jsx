import { Stack, Button, Typography } from "@mui/material";
import React from "react";
import "./css/header.css";

const Header = () => {
  return (
    <div className="header">
      <Stack spacing={2} direction="row">
        <Button size="small" style={{ fontSize: 10 }} variant="contained">
          Iniciar
        </Button>
        <Button size="small" style={{ fontSize: 10 }} variant="contained">
          Detener
        </Button>
        <Button size="small" style={{ fontSize: 10 }} variant="contained">
          Reiniciar
        </Button>
        <Typography className="generacion">Generacion #{"--"}</Typography>
      </Stack>
    </div>
  );
};

export default Header;
