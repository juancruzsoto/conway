import React from "react";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Grid, IconButton } from "@mui/material";
import "./css/cellGrid.css";

const CellGrid = () => {
  const putRow = () => {
    let row = [];
    for (let i = 1; i < 50; i++) {
      row.push(
        <IconButton
          aria-label=""
          component="span"
          style={{
            color: "black",
            // backgroundColor: "red",
            padding: "0px",
            marginTop: "7px",
            marginRight: "17px",
          }}
        >
          <CircleOutlinedIcon style={{ fontSize: 20 }} />
        </IconButton>
      );
    }
    return row;
  };

  const putAllRows = () => {
    let rows = [];
    for (let x = 0; x < 30; x++) {
      rows.push(
        <Grid item xs={12}>
          {putRow()}
        </Grid>
      );
    }
    return rows;
  };

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
        {putAllRows()}
      </Grid>
    </div>
  );
};

export default CellGrid;
