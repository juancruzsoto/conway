import {
  Stack,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Autocomplete,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLastGeneration,
  setCellGrid,
  setHistoricGeneration,
} from "../../store/cellSlice";
import useDebounce from "../../utilities/useDebounce";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";

const Header = (props) => {
  const state = useSelector((state) => state.cellsReducer); //state storage var

  //organisms showed in Autocomplete component
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
  //organism group by name
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

  //hooks and vars used
  const myTimer = useRef(null);
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);
  const [interval, setInterval] = useState(300);
  const [grid, setGrid] = useState(null);
  const debouncedGrid = useDebounce(grid, 400);
  const [nroGeneration, setNroGeneration] = useState(0);
  const debouncedInterval = useDebounce(interval, 500);

  //function
  function nextGeneration() {
    state.cells.forEach((c) => {
      if (!state.neighbors[c]) {
        document.getElementById(c).click(); //delete single cells
      }
    });
    Object.keys(state.neighbors).forEach((nb) => {
      if (state.cells.includes(nb)) {
        //cells with 2 or 3 neighbors don't die
        if (state.neighbors[nb] !== 2 && state.neighbors[nb] !== 3) {
          document.getElementById(nb).click();
        }
      } else {
        if (state.neighbors[nb] === 3) {
          //a neighbors if it have 3 neighbors live
          document.getElementById(nb).click();
        }
      }
    });
  }

  const handleNextGeneration = () => {
    //this arrow function store the historical generations
    dispatch(setHistoricGeneration(state.cells));
    nextGeneration();
    setNroGeneration((state) => state + 1);
  };

  const handlePreviousGeneration = async () => {
    //this come back to the last generation
    //remove current generation
    await state.cells.forEach((cell) => {
      document.getElementById(cell).click();
    });
    // generate previous generation
    await state.historicGeneration[state.historicGeneration.length - 1].forEach(
      (cell) => {
        document.getElementById(cell).click();
      }
    );
    dispatch(removeLastGeneration()); //remove last generation in the historical generations
    setNroGeneration((state) => state - 1);
  };

  const setOrganism = async (organism) => { //organism selected will be shown
    localStorage.setItem("Cells", JSON.stringify([]));
    if (state.cells.length > 0) { //deleted previous organism
      await restart();
    }
    if (organism.length > 0) {
      patternsByName[organism].forEach((cell) => { //generate new organism
        document.getElementById(cell).click();
      });
    }
  };

  const startGen = () => {
    setRunning((state) => !state); //It indicates if the game is running or not
  };

  const restart = () => { //delete current organism and set nroGeneration to 0
    setNroGeneration(0);
    state.cells.forEach((c) => {
      document.getElementById(c).click();
    });
  };

  useEffect(() => { //grid update in the interval indicated
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
    // eslint-disable-next-line
  }, [nroGeneration, running, debouncedInterval]);

  useEffect(() => { //update the grid values if it changes size
    props.setIsLoading(true);
    if (grid) {
      if (grid.target.id === "row") {
        if (parseInt(grid.target.value) > 30) { //validate values for rows
          document.getElementById("row").value = 30;
          dispatch(setCellGrid([30, state.cellGrid[1]]));
        } else {
          if (parseInt(grid.target.value) < 10) {
            document.getElementById("row").value = 10;
            dispatch(setCellGrid([10, state.cellGrid[1]]));
          } else {
            dispatch(
              setCellGrid([parseInt(grid.target.value), state.cellGrid[1]])
            );
          }
        }
      } else {
        if (parseInt(grid.target.value) > 50) { //validate values for columns
          document.getElementById("column").value = 50;
          dispatch(setCellGrid([state.cellGrid[0], 50]));
        } else {
          if (parseInt(grid.target.value) < 20) {
            document.getElementById("column").value = 20;
            dispatch(setCellGrid([state.cellGrid[0], 20]));
          } else {
            dispatch(
              setCellGrid([state.cellGrid[0], parseInt(grid.target.value)])
            );
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [debouncedGrid]);

  return (
    <Grid  //buttons and selects of header
      container
      spacing={3}
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Grid item xs={12} md={6} lg={4}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <IconButton
            aria-label=""
            id="previous"
            color="primary"
            component="span"
            disabled={
              running ||
              state.historicGeneration.length === 0 ||
              nroGeneration === 0
            }
            style={{
              padding: "0px",
              // marginTop: "5px",
              // marginRight: "11px",
            }}
            onClick={handlePreviousGeneration}
          >
            <SkipPreviousRoundedIcon
              style={{
                fontSize: 40,
              }}
            />
          </IconButton>
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
          <IconButton
            aria-label=""
            id="next"
            component="span"
            color="primary"
            disabled={
              (running && nroGeneration > 0) || state.cells.length === 0
            }
            style={{
              padding: "0px",
              // marginTop: "5px",
              // marginRight: "11px",
            }}
            onClick={handleNextGeneration}
          >
            <SkipNextRoundedIcon
              style={{
                fontSize: 40,
              }}
            />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <TextField
            size="small"
            label="Tiempo de intervalo"
            type="number"
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
            onChange={(e) => setGrid(e)}
            sx={{ fontSize: 10, height: 30, width: 75 }}
          />
          <TextField
            size="small"
            label="Columnas"
            type="number"
            id="column"
            defaultValue={state.cellGrid[1]}
            inputProps={{ min: 20, max: 50 }}
            onChange={(e) => setGrid(e)}
            sx={{ fontSize: 10, height: 30, width: 78 }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
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
            groupBy={(option) => option.type} //group by type
            getOptionLabel={(option) => option.name} // show name's organism
            onChange={(e) => setOrganism(e.target.textContent)}
            sx={{ width: 170 }}
            renderInput={(params) => (
              <TextField {...params} label="Organisms" />
            )}
          />
          <Typography
            style={{ color: "red" }} //show number generation
          >
            Generacion #{nroGeneration}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Header;
