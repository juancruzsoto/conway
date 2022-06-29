import React, { useEffect, useState } from "react";
// import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
// import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Grid, IconButton } from "@mui/material";
import "./css/cellGrid.css";

const CellGrid = () => {
  // const [cellsState, setCellsState] = useState({});
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

  const handleChangeState = (x, i, setState) => {
    // document.getElementById(`${0},${0}`).click();
    setState((currentState) => !currentState);
  };



  console.log(dimensions.height, dimensions.height);

  const Circle = (props) => {
    const [state, setState] = useState(false);

    return (
      <IconButton
        aria-label=""
        id={`${props.x},${props.i}`}
        component="span"
        style={{
          color: "black",
          backgroundColor: state && "lightblue",
          padding: "0px",
          marginTop: "5px",
          marginRight: "11px",
        }}
        onClick={() => handleChangeState(props.x, props.i, setState)}
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
    let h = 30;
    let w = 50;
    for (let x = 0; x < h; x++) {
      let row = [];
      for (let i = 0; i < w; i++) {
        row.push(<Circle h={h} w={w} x={x} i={i} />);
      }
      rows.push(row);
    }
    return rows;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    setCellsInGridState(putAllRows());
  }, [dimensions]);

  return (
    <div className="cellGrid">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {cellsInGridState &&
          cellsInGridState.map((row, index) => (
            <Grid item xs={12}>
              {row.map((r, i) => r)}
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default CellGrid;
