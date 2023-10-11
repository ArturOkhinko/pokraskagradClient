type DataType = ColorJSONType | SandblastJSONType | WheelPriceJSONType;

type ColorJSONType = {
  RAL: string;
  HTML: string;
  RGB: string;
};

type SandblastJSONType = {
  id: string;
  nameSandblast: string;
  priceSandblast: number;
};

type WheelPriceJSONType = {
  price: number;
  model?: string;
  name: string;
  id: string;
  text: string;
  img?: string | string[];
  initialPriceCount: number;
};
type SupportsType = {
  name: string;
  text: string;
  price: number;
  id: string;
  initialPriceCount: number;
};

type ReadOnlyWheelPrice = readonly WheelPriceJSONType[];
type ReadOnlySupportsType = readonly SupportsType[];
