type RootReducerType = {
  toolkit: {
    count: number;
  };
  colorTheme: InitStateColorReducer;
  kindSort: InitStateSortReducer;
  sum: SumPriceInitialState;
  searchedBd: SearchReducerInitialStateType;
  accLog: InitStateAccLog;
  wheels: WheelReducerType;
};
