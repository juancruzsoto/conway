import { Stack, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {useSelector } from "react-redux";
// import {
//   addCell,
//   addNeighbors,
//   removeCell,
//   removeNeighbors,
// } from "../../store/cellSlice";
import "./css/header.css";

const Header = () => {
  const state = useSelector((state) => state.cellsReducer);
  const myTimer = useRef(null);
  const [running, setRunning] = useState(false);
  const [nroGeneration, setNroGeneration] = useState(0);

  function nextGeneration() {
    console.log(state.cells);
    console.log(state.neighbors);
    state.cells.forEach((c)=>{
      if(!state.neighbors[c]){
        document.getElementById(c).click();
      }
    })
    Object.keys(state.neighbors).forEach((nb) => {
      if (state.cells.includes(nb)) {
        if (state.neighbors[nb] !== 2 && state.neighbors[nb] !== 3) {
          document.getElementById(nb).click();
        }
      } else {
        if (state.neighbors[nb] === 3) {
          document.getElementById(nb).click();
        }
      }
    });
  }

  const startGen = () => {
    setRunning((state) => !state);
  };

  const restart = () => {
    setNroGeneration(0)
    state.cells.forEach((c) => {
      document.getElementById(c).click();
    });

  };

  useEffect(() => {
    function startGeneration() {
      myTimer.current = setTimeout(() => {
        nextGeneration();
        setNroGeneration((state) => state + 1);
      }, 1000);
    }

    if (running) {
      startGeneration();
    }

    return () => clearTimeout(myTimer.current);
  }, [nroGeneration, running]);

  return (
    <div className="header">
      <Stack spacing={2} direction="row">
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={startGen}
        >
          Iniciar
        </Button>
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={startGen}
        >
          Detener
        </Button>
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={restart}
        >
          Reiniciar
        </Button>
        <Typography className="generacion">
          Generacion #{nroGeneration}
        </Typography>
      </Stack>
    </div>
  );
};

export default Header;
