import { combineReducers } from "redux";
import { toolkitReducer } from "./toolkitReducer";
import { colorReducer } from "./colorReducer";
import { kindReducer } from "./kindSortReducer";
import { sumReducer } from "./sumPriceReducer";
import { searchedReducer } from "./searchReducer";
import { accReducer } from "./accauntReducer";
import { wheelsReducer } from "./infoWheelsReducer";

export const rootReducer = combineReducers<RootReducerType>({
  toolkit: toolkitReducer,
  colorTheme: colorReducer,
  kindSort: kindReducer,
  sum: sumReducer,
  searchedBd: searchedReducer,
  accLog: accReducer,
  wheels: wheelsReducer,
});
