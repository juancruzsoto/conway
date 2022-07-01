import { Backdrop, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Loading from "../../utilities/Loading";
import CellGrid from "./CellGrid";
import Header from "./Header";
import gameOfLife from "../../img/game-of-life.gif";

const HomeView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [welcome, setWelcome] = useState(true)

  return (
    <div>
      <Backdrop style={{ zIndex: "10", color: "#fff" }} open={welcome}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid
            item
            xs={11}
            sm={10}
            md={8}
            lg={6}
            // lg={6}
            style={{ width: "100%", height: "100%" }}
          >
            <Paper elevation={3} style={{ opacity: "95%" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography
                    variant={"h5"}
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Bienvenido a Conway's Game of Life
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    width: "90%",
                  }}
                >
                  <img src={gameOfLife} alt={"Game of Life"} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ fontSize: 14, marginBottom: "10px" }}
                    variant="contained"
                    onClick={() => setWelcome(state => !state)}
                  >
                    Empezar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Backdrop>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} style={{ width: "100%", padding: "1.2rem" }}>
          <Header setIsLoading={setIsLoading} />
        </Grid>
        <Grid item xs={12}>
          <CellGrid setIsLoading={setIsLoading} isLoading={isLoading} />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </div>
  );
};

export default HomeView;
