import { createSlice } from "@reduxjs/toolkit";

const toolkit = createSlice({
  name: "toolkit",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count = state.count += 1;
    },
    decrement: (state) => {
      state.count = state.count -= 1;
    },
  },
});
export const toolkitReducer = toolkit.reducer;
export const { increment, decrement } = toolkit.actions;
