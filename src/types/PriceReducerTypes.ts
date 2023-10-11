type SumPriceReducerType = {
  sum: {
    sum: number;
    items: ItemsType[];
  };
};

type SumPriceInitialState = {
  sum: number;
  items: ItemsType[];
};
type AddPriceToSumActionsType = {
  payload: {
    price: number;
  };
};

type RemoveToSumActionsType = {
  payload: {
    id: string;
    items: ItemsType[];
  };
};

type AddPricePunctActonType = {
  payload: ItemsType;
};

type RemovePricePunctActionType = {
  payload: {
    id: string;
  };
};

type ItemsType = {
  text: string;
  id: string;
  price: number;
};
