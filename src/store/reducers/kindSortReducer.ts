import { createSlice } from "@reduxjs/toolkit";

const initialState: InitStateSortReducer = {
  placeholder: "Поиск...",
};
const kindSortReducer = createSlice({
  name: "kindSort",
  initialState,
  reducers: {
    ral(state) {
      state.placeholder = "0000";
    },
    rgb(state) {
      state.placeholder = "000 000 000";
    },
    html(state) {
      state.placeholder = "#000000";
    },
    otherMianing(state, actions) {
      state.placeholder = actions.payload.mianing;
    },
  },
});

export const kindReducer = kindSortReducer.reducer;
export const { ral, rgb, html, otherMianing } = kindSortReducer.actions;
