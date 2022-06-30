import { Stack, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCell,
  addNeighbors,
  removeCell,
  removeNeighbors,
} from "../../store/cellSlice";
import "./css/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cellsReducer);

  const nextGeneration = () => {
    console.log(state.cells);
    console.log(state.neighbors);
    Object.keys(state.neighbors).forEach((nb) => {
      if (state.cells.includes(nb)) {
        if (state.neighbors[nb] !== 2 && state.neighbors[nb] !== 3) {
          dispatch(removeCell(nb));
          dispatch(removeNeighbors([nb, ...state.neighborsbycell[nb]]));
          document.getElementById(nb).click();
        }
      } else {
        if (state.neighbors[nb] === 3) {
          document.getElementById(nb).click();
          dispatch(addCell(nb));
          // dispatch(addNeighbors(state.neighborsbycell[nb]));
        }
      }
    });
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className="header">
      <Stack spacing={2} direction="row">
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={nextGeneration}
        >
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
