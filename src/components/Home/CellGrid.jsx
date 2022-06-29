import React, { useEffect, useState } from "react";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Grid, IconButton } from "@mui/material";
import "./css/cellGrid.css";

const CellGrid = () => {
  const [cellsState, setCellsState] = useState({});
  const [cellsInGridState, setCellsInGridState] = useState([]);

  const handleChangeState = (x, i) => {
    setCellsState({ ...cellsState, [`${x},${i}`]: true });
    // let updatedState = cellsState;
    // updatedState[`${x},${i}`] = !updatedState[`${x},${i}`];

    // setCellsState(updatedState);
  };

  const putRow = (x, cells) => {
    let row = [];
    for (let i = 0; i < 50; i++) {
      cells[`${x},${i}`] = true;
      row.push(
        <IconButton
          aria-label=""
          key={`${x},${i}`}
          component="span"
          value={[x, i]}
          style={{
            color: "black",
            backgroundColor: cellsState[`${x},${i}`] && "lightblue",
            padding: "0px",
            marginTop: "5px",
            marginRight: "11px",
          }}
          onClick={() => handleChangeState(x, i)}
        >
          {console.log("AAAAAAAAA", cellsState[`${x},${i}`])}
          <CircleOutlinedIcon style={{ fontSize: 13 }} />
        </IconButton>
      );
    }
    return row;
  };

  const putAllRows = () => {
    let rows = [];
    let cells = {};
    for (let x = 0; x < 30; x++) {
      rows.push(
        <Grid item xs={12}>
          {putRow(x, cells)}
        </Grid>
      );
    }
    console.log(cells);

    return { cells, rows };
  };

  useEffect(() => {
    let { cells, rows } = putAllRows();
    setCellsState(cells);
    setCellsInGridState(rows);
  }, []);

  return (
    <div className="cellGrid">
      {/* <IconButton color="primary" aria-label="" component="span" onClick={() => console.log("hola")}>
        <CircleRoundedIcon  />
      </IconButton> */}
      {/* <IconButton aria-label="" component="span" style={{color:"gray", padding:"0px"}}>
        <CircleTwoToneIcon />
      </IconButton> */}
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
