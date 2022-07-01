import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

function Loading(props) {
  return (
    <Backdrop style={{ zIndex: "10", color: "#fff" }} open={props.open}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    </Backdrop>
  );
}

export default Loading;
