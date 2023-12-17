import { createSlice } from "@reduxjs/toolkit";

const initialState: InitStateAccLog = {
  user: {
    login: false,
    email: "",
    role: "",
    accessToken: "",
  },
};

const accLogReducer = createSlice({
  name: "accReducer",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.user.login = true;
      state.user.email = actions.payload.email;
      state.user.role = actions.payload.role;
      state.user.accessToken = actions.payload.accessToken;
    },

    token: (state, actions) => {
      state.user.accessToken = actions.payload.accessToken;
    },

    logoutAction: (state) => {
      state.user.accessToken = "";
      state.user.email = "";
      state.user.login = false;
      state.user.role = "";
    },
  },
});

export const accReducer = accLogReducer.reducer;
export const { login, token, logoutAction } = accLogReducer.actions;
