import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cells: [],
  neighbors: {},
  neighborsbycell: {},
  cellGrid: [30, 50],
  historicGeneration: [],
};

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    addCell: (state, action) => {
      state.cells = [...state.cells, action.payload];
    },
    removeCell: (state, action) => {
      state.cells = state.cells.filter((b) => b !== action.payload);
    },
    addNeighbors: (state, action) => {
      action.payload.forEach((element) =>
        state.neighbors[element]
          ? (state.neighbors[element] = state.neighbors[element] + 1)
          : (state.neighbors[element] = 1)
      );
    },
    addNeighborsByCell: (state, action) => {
      state.neighborsbycell[action.payload.cell] = action.payload.neighbors;
    },
    removeNeighbors: (state, action) => {
      if (state.cells.length > 0) {
        action.payload.forEach((element) =>
          state.neighbors[element] - 1 > 0
            ? (state.neighbors[element] = state.neighbors[element] - 1)
            : delete state.neighbors[element]
        );
      } else {
        state.neighbors = {};
      }
    },
    setCellGrid: (state, action) => {
      state.cellGrid = action.payload;
    },
    setHistoricGeneration: (state, action) => {
      state.historicGeneration = [...state.historicGeneration, action.payload];
    },
    removeLastGeneration: (state) => {
      let newHistoric = state.historicGeneration;
      newHistoric.pop();
      state.historicGeneration = newHistoric;
    },
  },
});

export const {
  addCell,
  removeCell,
  addNeighbors,
  removeNeighbors,
  addNeighborsByCell,
  setCellGrid,
  setHistoricGeneration,
  removeLastGeneration,
} = cellsSlice.actions;

export default cellsSlice.reducer;
