import { createSlice } from "@reduxjs/toolkit";

type SearchReducerInitialStateType = {
  bD: DataType[];
};
const initialState: SearchReducerInitialStateType = {
  bD: [],
};
type AddInfoToBdActionsType = {
  payload: {
    info: DataType;
  };
};
const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    addInfoToBd: (state, actions: AddInfoToBdActionsType) => {
      state.bD.push(actions.payload.info);
    },
  },
});

export const searchedReducer = searchReducer.reducer;
export const { addInfoToBd } = searchReducer.actions;
