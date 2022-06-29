
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cells: [],
}

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    addCell: (state, action) => {
      state.cells = [...state.cells, action.payload]
    },
    removeCell: (state, action) => {
      state.cells = state.cells.filter((b) => b !== action.payload)
    },
  },
})

export const { addCell, removeCell } = cellsSlice.actions

export default cellsSlice.reducer