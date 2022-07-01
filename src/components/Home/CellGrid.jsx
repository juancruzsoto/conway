import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCell,
  addNeighbors,
  addNeighborsByCell,
  removeCell,
  removeNeighbors,
} from "../../store/cellSlice";
import useDebounce from "../../utilities/useDebounce";

const CellGrid = (props) => {
  //hooks and vars used
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cellsReducer);
  const debouncedGrid = useDebounce(state.cellGrid, 400);
  const [cellsInGridState, setCellsInGridState] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const debouncedDimensions = useDebounce(dimensions, 300);

  const handleResize = () => { //update width and height of the screen
    props.setIsLoading(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const setNeighbors = (x, i, h, w) => { //calculate all neighbors of the cell according to their position
    let neighbors = []; 
    let row;
    let row2;

    if (x - 1 < 0) {
      row = h - 1;
      row2 = x + 1;
    } else {
      row = x - 1;
      if (x + 1 === h) {
        row2 = 0;
      } else {
        row2 = x + 1;
      }
    }

    for (let column = i - 1; column < i + 2; column++) {
      if (column < 0) {
        neighbors.push(`${row},${w - 1}`);
        neighbors.push(`${x},${w - 1}`);
        neighbors.push(`${row2},${w - 1}`);
      } else {
        if (column === w) {
          neighbors.push(`${row},${0}`);
          neighbors.push(`${x},${0}`);
          neighbors.push(`${row2},${0}`);
        } else {
          neighbors.push(`${row},${column}`);
          neighbors.push(`${x},${column}`);
          neighbors.push(`${row2},${column}`);
        }
      }
    }
    neighbors.splice(4, 1); //the cell is not included in its neighbors then it will be delete

    return neighbors;
  };

  const handleChangeState = (x, i, state, setState, h, w) => { //for each cell is added in the grid 
    setState((currentState) => !currentState);

    let neighbors = setNeighbors(x, i, h, w); //calculate all neighbors of the cell according to their position
    let cellsLocalStorage = JSON.parse(localStorage.getItem("Cells"));

    if (state) { //delete cell and its neighbors from state
      dispatch(removeCell(`${x},${i}`));
      dispatch(removeNeighbors(neighbors));
      cellsLocalStorage = cellsLocalStorage.filter((b) => b !== `${x},${i}`);
      localStorage.setItem("Cells", JSON.stringify(cellsLocalStorage));
    } else {  //add cell and its neighbors from state
      dispatch(addCell(`${x},${i}`)); 
      dispatch(addNeighborsByCell({ cell: `${x},${i}`, neighbors: neighbors }));
      dispatch(addNeighbors(neighbors));
      if (cellsLocalStorage) {
        localStorage.setItem(
          "Cells",
          JSON.stringify(cellsLocalStorage.concat(`${x},${i}`))
        );
      } else {
        localStorage.setItem("Cells", JSON.stringify([`${x},${i}`]));
      }
    }
  };

  const Circle = (props) => { //component for each cell
    const [state, setState] = useState(false);

    return (
      <IconButton
        aria-label=""
        id={`${props.x},${props.i}`}
        component="span"
        style={{
          color: "black",
          backgroundColor: state && "#90caf9", //if it is clicked change its color
          padding: "0px",
          marginTop: "5px",
          marginRight: "11px",
        }}
        onClick={() =>
          handleChangeState(props.x, props.i, state, setState, props.h, props.w) //add each cell in the grid 
        }
      >
        <CircleOutlinedIcon
          style={{
            fontSize: //cell size calculated based on screen size
              (dimensions.height - (props.h * 5 + 100)) / props.h >
              (dimensions.width - (props.w * 11 + 40)) / props.w
                ? (dimensions.width - (props.w * 11 + 40)) / props.w
                : (dimensions.height - (props.h * 5 + 100)) / props.h,
          }}
        />
      </IconButton>
    );
  };

  const putAllRows = () => {
    let rows = [];
    let h = debouncedGrid[0];
    let w = debouncedGrid[1];

    for (let x = 0; x < h; x++) { //number of cells in the row
      let row = [];
      for (let i = 0; i < w; i++) {  //number of cells in the column
        row.push(<Circle h={h} w={w} x={x} i={i} />);
      }
      rows.push(
        <Grid item xs={12}>
          {row}
        </Grid>
      );
    }
    return rows;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false); // useEffect for screen changes
    // eslint-disable-next-line
  }, []);

  useEffect(() => {  //update grid if it changes size
    let cellsLocalStorage = JSON.parse(localStorage.getItem("Cells"));
    async function setCellsInGrid() {
      await setCellsInGridState(putAllRows());
      if (cellsLocalStorage) {
        await cellsLocalStorage.forEach((cell) => {
          dispatch(removeCell(cell));
        });
      }
    }
    localStorage.setItem("Cells", JSON.stringify([]));
    setCellsInGrid().then(() => {
      if (cellsLocalStorage) {
        if (document.getElementById("0,0")) {
          cellsLocalStorage.forEach((cell) => {
            document.getElementById(cell).click();
          });
        } else {
        }
      }
    });
    props.setIsLoading(false);
    // eslint-disable-next-line
  }, [debouncedGrid, debouncedDimensions]);

  return (
    <div className="cellGrid">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {cellsInGridState}
      </Grid>
    </div>
  );
};

export default CellGrid;
