import { Grid } from "@mui/material";
import React, { useState } from "react";
import Loading from "../../utilities/Loading";
import CellGrid from "./CellGrid";
import Header from "./Header";

const HomeView = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Header setIsLoading={setIsLoading} />
        </Grid>
        <Grid item xs={12}>
          <CellGrid setIsLoading={setIsLoading} />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </div>
  );
};

export default HomeView;
