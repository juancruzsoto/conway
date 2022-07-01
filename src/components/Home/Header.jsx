import {
  Stack,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCellGrid } from "../../store/cellSlice";
import useDebounce from "../../utilities/useDebounce";
// import {
//   addCell,
//   addNeighbors,
//   removeCell,
//   removeNeighbors,
// } from "../../store/cellSlice";
import "./css/header.css";

const Header = () => {
  const state = useSelector((state) => state.cellsReducer);
  const organismPatterns = [
    {
      name: "Block",
      type: "Still lifes",
      pattern: ["3,8", "3,9", "4,9", "4,8"],
    },
    {
      name: "Bee-hive",
      type: "Still lifes",
      pattern: ["3,8", "3,9", "4,7", "4,10", "5,8", "5,9"],
    },
    {
      name: "Loaf",
      type: "Still lifes",
      pattern: ["3,7", "4,8", "5,9", "4,10", "3,10", "2,9", "2,8"],
    },
    {
      name: "Boat",
      type: "Still lifes",
      pattern: ["3,8", "4,8", "3,9", "4,10", "5,9"],
    },
    {
      name: "Blinker",
      type: "Oscillators",
      pattern: ["3,9", "4,9", "5,9"],
    },
    {
      name: "Toad",
      type: "Oscillators",
      pattern: ["5,8", "5,9", "5,10", "4,9", "4,10", "4,11"],
    },
    {
      name: "Beacon",
      type: "Oscillators",
      pattern: ["3,8", "4,8", "4,9", "3,9", "5,10", "6,10", "6,11", "5,11"],
    },
    {
      name: "Pulsar",
      type: "Oscillators",
      pattern: [
        "2,9",
        "2,10",
        "2,11",
        "4,12",
        "5,12",
        "6,12",
        "7,11",
        "7,9",
        "7,10",
        "6,7",
        "5,7",
        "4,7",
        "4,14",
        "5,14",
        "6,14",
        "7,15",
        "7,16",
        "7,17",
        "6,19",
        "5,19",
        "4,19",
        "2,15",
        "2,16",
        "2,17",
        "9,11",
        "9,9",
        "9,10",
        "10,12",
        "11,12",
        "12,12",
        "10,14",
        "11,14",
        "12,14",
        "9,15",
        "9,16",
        "9,17",
        "10,19",
        "11,19",
        "12,19",
        "14,15",
        "14,16",
        "14,17",
        "14,11",
        "14,10",
        "14,9",
        "10,7",
        "11,7",
        "12,7",
      ],
    },
    {
      name: "Penta-decathlon",
      type: "Oscillators",
      pattern: [
        "6,14",
        "8,14",
        "9,14",
        "11,14",
        "5,14",
        "7,13",
        "7,15",
        "10,14",
        "12,13",
        "12,15",
        "13,14",
        "14,14",
      ],
    },
    {
      name: "Glider",
      type: "Spaceships",
      pattern: ["3,8", "4,9", "5,9", "4,10", "3,10"],
    },
    {
      name: "Light spaceship",
      type: "Spaceships",
      pattern: [
        "6,9",
        "6,10",
        "5,8",
        "5,9",
        "5,10",
        "5,11",
        "4,9",
        "4,8",
        "4,11",
        "4,12",
        "3,11",
        "3,10",
      ],
    },
    {
      name: "Middle spaceship",
      type: "Spaceships",
      pattern: [
        "5,8",
        "5,9",
        "5,10",
        "4,9",
        "4,8",
        "4,11",
        "4,12",
        "3,11",
        "3,10",
        "3,9",
        "4,10",
        "5,12",
        "5,13",
        "6,11",
        "6,12",
      ],
    },
    {
      name: "Heavy spaceship",
      type: "Spaceships",
      pattern: [
        "4,8",
        "3,11",
        "3,10",
        "3,9",
        "3,12",
        "3,13",
        "3,14",
        "4,14",
        "5,14",
        "6,13",
        "7,11",
        "7,10",
        "6,8",
      ],
    },
    {
      name: "Gosper glider gun",
      type: "Spaceships",
      pattern: [
        "7,2",
        "8,2",
        "8,3",
        "7,3",
        "7,12",
        "8,12",
        "9,12",
        "6,13",
        "5,14",
        "5,15",
        "6,17",
        "7,18",
        "8,18",
        "9,18",
        "8,19",
        "8,16",
        "10,17",
        "11,15",
        "11,14",
        "10,13",
        "7,22",
        "7,23",
        "6,23",
        "6,22",
        "5,22",
        "5,23",
        "4,24",
        "8,24",
        "4,26",
        "3,26",
        "8,26",
        "9,26",
        "5,36",
        "5,37",
        "6,37",
        "6,36",
      ],
    },
  ];
  const patternsByName = {
    Block: ["3,8", "3,9", "4,9", "4,8"],

    "Bee-hive": ["3,8", "3,9", "4,7", "4,10", "5,8", "5,9"],

    Loaf: ["3,7", "4,8", "5,9", "4,10", "3,10", "2,9", "2,8"],

    Boat: ["3,8", "4,8", "3,9", "4,10", "5,9"],

    Blinker: ["3,9", "4,9", "5,9"],

    Toad: ["5,8", "5,9", "5,10", "4,9", "4,10", "4,11"],

    Beacon: ["3,8", "4,8", "4,9", "3,9", "5,10", "6,10", "6,11", "5,11"],

    Pulsar: [
      "2,9",
      "2,10",
      "2,11",
      "4,12",
      "5,12",
      "6,12",
      "7,11",
      "7,9",
      "7,10",
      "6,7",
      "5,7",
      "4,7",
      "4,14",
      "5,14",
      "6,14",
      "7,15",
      "7,16",
      "7,17",
      "6,19",
      "5,19",
      "4,19",
      "2,15",
      "2,16",
      "2,17",
      "9,11",
      "9,9",
      "9,10",
      "10,12",
      "11,12",
      "12,12",
      "10,14",
      "11,14",
      "12,14",
      "9,15",
      "9,16",
      "9,17",
      "10,19",
      "11,19",
      "12,19",
      "14,15",
      "14,16",
      "14,17",
      "14,11",
      "14,10",
      "14,9",
      "10,7",
      "11,7",
      "12,7",
    ],

    "Penta-decathlon": [
      "6,14",
      "8,14",
      "9,14",
      "11,14",
      "5,14",
      "7,13",
      "7,15",
      "10,14",
      "12,13",
      "12,15",
      "13,14",
      "14,14",
    ],

    Glider: ["3,8", "4,9", "5,9", "4,10", "3,10"],

    "Light spaceship": [
      "6,9",
      "6,10",
      "5,8",
      "5,9",
      "5,10",
      "5,11",
      "4,9",
      "4,8",
      "4,11",
      "4,12",
      "3,11",
      "3,10",
    ],

    "Middle spaceship": [
      "5,8",
      "5,9",
      "5,10",
      "4,9",
      "4,8",
      "4,11",
      "4,12",
      "3,11",
      "3,10",
      "3,9",
      "4,10",
      "5,12",
      "5,13",
      "6,11",
      "6,12",
    ],

    "Heavy spaceship": [
      "4,8",
      "3,11",
      "3,10",
      "3,9",
      "3,12",
      "3,13",
      "3,14",
      "4,14",
      "5,14",
      "6,13",
      "7,11",
      "7,10",
      "6,8",
    ],

    "Gosper glider gun": [
      "7,2",
      "8,2",
      "8,3",
      "7,3",
      "7,12",
      "8,12",
      "9,12",
      "6,13",
      "5,14",
      "5,15",
      "6,17",
      "7,18",
      "8,18",
      "9,18",
      "8,19",
      "8,16",
      "10,17",
      "11,15",
      "11,14",
      "10,13",
      "7,22",
      "7,23",
      "6,23",
      "6,22",
      "5,22",
      "5,23",
      "4,24",
      "8,24",
      "4,26",
      "3,26",
      "8,26",
      "9,26",
      "5,36",
      "5,37",
      "6,37",
      "6,36",
    ],
  };
  const myTimer = useRef(null);
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);
  const [interval, setInterval] = useState(300);
  const [nroGeneration, setNroGeneration] = useState(0);
  const [organism, setOrganism] = useState("");
  const debouncedInterval = useDebounce(interval, 500);

  function nextGeneration() {
    state.cells.forEach((c) => {
      if (!state.neighbors[c]) {
        document.getElementById(c).click();
      }
    });
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

  useEffect(() => {
    if (state.cells.length > 0) {
      restart();
    }
    if (organism.length > 0) {
      patternsByName[organism].forEach((cell) => {
        document.getElementById(cell).click();
      });
    }
  }, [organism]);

  const handleChangeGrid = (e) => {
    if (e.target.id === "row") {
      if (parseInt(e.target.value) > 30) {
        document.getElementById("row").value = 30;
        dispatch(setCellGrid([30, state.cellGrid[1]]));
      } else {
        dispatch(setCellGrid([parseInt(e.target.value), state.cellGrid[1]]));
      }
    } else {
      if (parseInt(e.target.value) > 50) {
        document.getElementById("column").value = 50;
        dispatch(setCellGrid([state.cellGrid[0], 50]));
      } else {
        dispatch(setCellGrid([state.cellGrid[0], parseInt(e.target.value)]));
      }
    }
  };

  const startGen = () => {
    setRunning((state) => !state);
  };

  const restart = () => {
    setNroGeneration(0);
    state.cells.forEach((c) => {
      document.getElementById(c).click();
    });
  };

  useEffect(() => {
    function startGeneration() {
      myTimer.current = setTimeout(() => {
        nextGeneration();
        setNroGeneration((state) => state + 1);
      }, debouncedInterval);
    }

    if (running && state.cells.length > 0) {
      startGeneration();
    } else {
      if (running && state.cells.length === 0) {
        startGen();
        setNroGeneration(0);
      }
    }

    return () => clearTimeout(myTimer.current);
  }, [nroGeneration, running, debouncedInterval]);

  return (
    <div className="header">
      <Stack spacing={2} direction="row">
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={startGen}
          disabled={running || state.cells.length === 0}
        >
          Iniciar
        </Button>
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={startGen}
          disabled={!running}
        >
          Detener
        </Button>
        <Button
          size="small"
          style={{ fontSize: 10 }}
          variant="contained"
          onClick={restart}
          disabled={running || state.cells.length === 0}
        >
          Reiniciar
        </Button>
        <TextField
          size="small"
          label="Tiempo de intervalo"
          id="outlined-start-adornment"
          defaultValue={interval}
          onChange={(e) => setInterval(e.target.value)}
          sx={{ fontSize: 10, height: 30, width: 200 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">ms</InputAdornment>,
          }}
        />
        <TextField
          size="small"
          label="Filas"
          type="number"
          id="row"
          defaultValue={state.cellGrid[0]}
          inputProps={{ min: 10, max: 30 }}
          onChange={(e) => handleChangeGrid(e)}
          sx={{ fontSize: 10, height: 30, width: 75 }}
          // InputProps={{
          //   endAdornment: <InputAdornment position="end">ms</InputAdornment>,
          // }}
        />
        <TextField
          size="small"
          label="Columnas"
          type="number"
          id="column"
          defaultValue={state.cellGrid[1]}
          inputProps={{ min: 20, max: 50 }}
          onChange={(e) => handleChangeGrid(e)}
          sx={{ fontSize: 10, height: 30, width: 78 }}
          // InputProps={{
          //   endAdornment: <InputAdornment position="end">ms</InputAdornment>,
          // }}
        />
        <Autocomplete
          id="grouped-demo"
          size={"small"}
          options={organismPatterns.sort(
            (a, b) => -b.type.localeCompare(a.type)
          )}
          getOptionDisabled={(
            option //remove from list by grid size
          ) =>
            option.name === (state.cellGrid[0] < 20 && "Pulsar") ||
            option.name === (state.cellGrid[0] < 20 && "Penta-decathlon") ||
            option.name === (state.cellGrid[0] < 20 && "Gosper glider gun") ||
            option.name === (state.cellGrid[1] < 30 && "Pulsar") ||
            option.name === (state.cellGrid[1] < 30 && "Penta-decathlon") ||
            option.name === (state.cellGrid[1] < 40 && "Gosper glider gun")
          }
          groupBy={(option) => option.type}
          getOptionLabel={(option) => option.name}
          onChange={(e) => setOrganism(e.target.textContent)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Organisms" />}
        />
        <Typography className="generacion">
          Generacion #{nroGeneration}
        </Typography>
      </Stack>
    </div>
  );
};

export default Header;
