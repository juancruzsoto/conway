import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Grid, IconButton } from "@mui/material";
import "./css/cellGrid.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCell,
  addNeighbors,
  addNeighborsByCell,
  removeCell,
  removeNeighbors,
} from "../../store/cellSlice";
import useDebounce from "../../utilities/useDebounce";

const CellGrid = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cellsReducer);
  const debouncedGrid = useDebounce(state.cellGrid, 400);
  const [cellsInGridState, setCellsInGridState] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const setNeighbors = (x, i, h, w) => {
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
    neighbors.splice(4, 1);
    // neighbors.push(`${x},${i - 1}`);
    // neighbors.push(`${x},${i + 1}`);
    // for (let column = i - 1; column < i + 2; column++) {
    //   neighbors.push(`${x + 1},${column}`);
    // }

    return neighbors;
  };

  const handleChangeState = (x, i, state, setState, h, w) => {
    // document.getElementById(`${0},${0}`).click();
    setState((currentState) => !currentState);

    let neighbors = setNeighbors(x, i, h, w);
    if (state) {
      dispatch(removeCell(`${x},${i}`));
      dispatch(removeNeighbors(neighbors));
    } else {
      dispatch(addCell(`${x},${i}`));
      dispatch(addNeighborsByCell({ cell: `${x},${i}`, neighbors: neighbors }));
      dispatch(addNeighbors(neighbors));
    }
  };

  const Circle = (props) => {
    const [state, setState] = useState(false);

    return (
      <IconButton
        aria-label=""
        id={`${props.x},${props.i}`}
        component="span"
        style={{
          color: "black",
          backgroundColor: state && "blue",
          padding: "0px",
          marginTop: "5px",
          marginRight: "11px",
        }}
        onClick={() =>
          handleChangeState(props.x, props.i, state, setState, props.h, props.w)
        }
      >
        <CircleOutlinedIcon
          style={{
            fontSize:
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
    let h, w;
    if (debouncedGrid[0] < 10) {
      h = 10;
      document.getElementById("row").value = 10;
    } else {
      h = debouncedGrid[0];
    }
    if (debouncedGrid[1] < 20) {
      w = 20;
      document.getElementById("column").value = 20;
    } else {
      w = debouncedGrid[1];
    }
    for (let x = 0; x < h; x++) {
      let row = [];
      for (let i = 0; i < w; i++) {
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

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize, false);
  // }, []);

  useEffect(() => {
    setCellsInGridState(putAllRows());
  }, [debouncedGrid]);

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
