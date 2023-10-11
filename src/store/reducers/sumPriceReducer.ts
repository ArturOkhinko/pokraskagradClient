import { createSlice } from "@reduxjs/toolkit";

const initialState: SumPriceInitialState = {
  sum: 0,
  items: [],
};
const sumPriceReducer = createSlice({
  name: "sumPriceReducer",
  initialState,
  reducers: {
    addPriceToSum(state, actions: AddPriceToSumActionsType) {
      state.sum = state.sum + actions.payload.price;
    },
    removePriceToSum(state, actions: RemoveToSumActionsType) {
      actions.payload.items.forEach((element) => {
        console.log(element.id);
        if (actions.payload.id === element.id) {
          state.sum = state.sum - Number(element.price);
        }
      });
    },
    addPricePunct(state, actions: AddPricePunctActonType) {
      state.items.push({
        text: actions.payload.text,
        id: actions.payload.id,
        price: actions.payload.price,
      });
    },
    removePricePunct(state, actions: RemovePricePunctActionType) {
      state.items = state.items.filter(
        (element) => element.id !== actions.payload.id
      );
    },
  },
});

export const sumReducer = sumPriceReducer.reducer;
export const {
  addPriceToSum,
  removePriceToSum,
  addPricePunct,
  removePricePunct,
} = sumPriceReducer.actions;
