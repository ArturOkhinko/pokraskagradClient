import { createSlice } from "@reduxjs/toolkit";

const initialState: InitStateColorReducer = {
  color: "white",
};

const colorThemeReducer = createSlice({
  name: "color",
  initialState,
  reducers: {
    red: (state) => {
      state.color = "rgb(255, 88, 51)";
    },
    blue: (state) => {
      state.color = "rgb(51, 174, 255)";
    },
    green: (state) => {
      state.color = "greenyellow";
    },
    orange: (state) => {
      state.color = "orange";
    },
    yellow: (state) => {
      state.color = "yellow";
    },
    white: (state) => {
      state.color = "white";
    },
  },
});

export const colorReducer = colorThemeReducer.reducer;
export const { red, blue, green, orange, yellow, white } =
  colorThemeReducer.actions;
