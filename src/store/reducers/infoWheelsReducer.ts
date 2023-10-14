import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [
    {
      price: 0,
      model: "",
      name: "",
      id: "",
      text: "",
      img: "",
      initialPriceCount: 0,
    },
  ],
};

const infoWheelsReducer = createSlice({
  name: "wheelReducer",
  initialState,
  reducers: {
    pushInfo(state, actions) {
      state.info = actions.payload;
    },
  },
});

export const wheelsReducer = infoWheelsReducer.reducer;
export const { pushInfo } = infoWheelsReducer.actions;
