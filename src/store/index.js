import { configureStore } from "@reduxjs/toolkit";

import cellsReducer from "./cellSlice";

export const store = configureStore({
  reducer: {
    cellsReducer,
  },
});
