import { createSlice } from "@reduxjs/toolkit";

interface StatusState {
  status: "ok" | "danger";
  reason: "temp" | "co2" | "co2temp" | "";
}
const initialState: StatusState = {
  status: "ok",
  reason: "",
};

export const userSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    correctStatusDushnila(state, action) {
      if (action.payload.co2 >= 800 && action.payload.temp >= 27) {
        state.status = "danger";
        state.reason = "co2temp";
      } else if (action.payload.co2 >= 800) {
        state.status = "danger";
        state.reason = "co2";
      } else if (action.payload.temp >= 27) {
        state.status = "danger";
        state.reason = "temp";
      } else {
        state.status = "ok";
        state.reason = "";
      }
    },
  },
});

export default userSlice.reducer;
